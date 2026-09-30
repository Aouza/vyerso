# DATABASE — Vyerso

**Versão:** 0.2
**Status:** Aprovado com alterações (DB-Q1, DB-Q4, DB-Q6) — nenhuma migration foi criada
**Histórico:** ver §14
**Escopo:** modelo de dados do MVP **O Que Mudou?** (EPIC 01 → EPIC 05)
**Relaciona-se com:** PRD §4/§14–16, ARCHITECTURE §6/§12–16, DECISIONS ADR-003/005/006/007

---

## 0. Entendimento do pedido

**Objetivo:** desenhar o modelo de dados antes de qualquer migration, de forma que o MVP funcione sem antecipar features futuras.

**O que foi dito (requisitos):** usuário autenticado; várias conexões por usuário; várias análises por conexão ao longo do tempo; origem/importação da conversa; lifecycle da análise; resultados estruturados; evidências ligadas a insights; isolamento por usuário; RLS deny-by-default; separar o que persiste do que é re-derivável; privacidade das mensagens; abertura futura para créditos/entitlements sem implementar billing.

**Critério de sucesso:** um schema em que (a) nenhuma linha é legível por outro usuário, nem por engano de UI; (b) cada insight chega a métrica → período → evidência; (c) a decisão sobre reter conversa bruta é **explícita e reversível**, não um efeito colateral do schema.

**Suposições minhas (corrija se erradas):**

1. Uma Conexão é sempre entre **duas** pessoas (o PRD diz "entre duas pessoas"). Grupos estão fora do MVP.
2. O usuário só lê os próprios dados. Não existe compartilhamento entre contas no MVP (cards compartilháveis não dão acesso ao dado, só imagem).
3. O `.txt` do WhatsApp é sempre um export **completo** da conversa (não incremental). "Desde a Última Vez" no futuro = novo upload completo, deduplicado por timestamp.
4. Exclusão de conta e de conexão deve apagar tudo, inclusive o Storage (LGPD).

**Como o EPIC 01 se encaixa:** o EPIC 01 só precisa de auth + `connections` + RLS. O modelo completo é desenhado aqui, mas **migrado em fases** (§10.1).

---

## 1. Modelo conceitual

```text
auth.users (Supabase)
   │ 1
   │
   │ N
connections ──────────────────────────────┐
   │ 1            │ 1                     │
   │ 2            │ N                     │ N
participants   conversation_imports    analyses ──── 1:1 ──► (reveal_summary, embutido)
                  │ 1                     │ 1
                  │                       ├─ N  analysis_metrics   (séries temporais)
                  └─ 0..1 objeto          ├─ N  analysis_phases
                     no Storage           ├─ N  change_points
                     (efêmero)            └─ N  evidence  ──► aponta para change_point OU phase
                                                    │ 1
                                                    └─ 0..N evidence_excerpts (trechos mínimos, limitados)
```

Ideia central: **a Conexão é o objeto persistente; a Análise é uma execução versionada sobre ela; os resultados pertencem à Análise.** O arquivo bruto e o dataset completo **não fazem parte do modelo persistente** (§7, DB-Q1). A única forma de texto de conversa que persiste são os **excerpts de evidência selecionados** (§7.6), isolados em tabela própria e sujeitos a limites rígidos.

---

## 2. Entidades e responsabilidades

| Entidade | Responsabilidade | Natureza |
|---|---|---|
| `auth.users` | Identidade (Supabase Auth). Não é alterada por nós. | Persistente |
| `connections` | Histórico conhecido entre o usuário e outra pessoa. Raiz de ownership. | Persistente |
| `participants` | As 2 pessoas da conversa; qual delas é o usuário (`is_self`). Referenciadas pelos resultados. | Persistente |
| `conversation_imports` | Uma importação de arquivo: metadados de processamento, estado, ponteiro efêmero para o Storage. **Nunca contém texto de mensagem.** | Persistente (metadados) |
| `analyses` | Uma execução versionada do engine sobre uma conexão. Guarda estado, versão do engine, parâmetros, sufficiency e o sumário do Free Reveal. | Persistente |
| `analysis_metrics` | Séries temporais determinísticas (uma linha por métrica/granularidade). | Ver §7: *fonte de verdade* se o raw for purgado |
| `analysis_phases` | Segmentação em fases. | idem |
| `change_points` | Mudanças detectadas (antes/depois, magnitude, persistência, confiança). | idem |
| `evidence` | Dados que sustentam um insight: janela, métrica e valores agregados. **Não contém texto de mensagem.** | idem |
| `evidence_excerpts` | Conjunto mínimo de trechos selecionados que fundamentam uma evidência (excerpt curto, papel do falante, timestamp, `source_index`, metadata). **Única tabela com texto de conversa.** Limites e implicações em §7.6. | Persistente; dado sensível de terceiros |
| *(fora do MVP-DB)* `entitlements`/`purchases` | Billing. Não criar agora (§9). | — |

**Deliberadamente ausentes:** tabela `messages`; tabela `profiles` (DB-Q6, decidido: usar apenas `auth.users` até existir requisito concreto); qualquer tabela de billing; `insights` genérica (change_points e phases já são os insights do MVP).

---

## 3. Relacionamentos e cardinalidades

| Relação | Cardinalidade | Regra |
|---|---|---|
| user → connections | 1 : N | `connections.owner_user_id` |
| connection → participants | 1 : **2** | exatamente 2; exatamente 1 com `is_self = true` após confirmação |
| connection → conversation_imports | 1 : N | MVP usa 1 import por análise; N permite reenvio/atualização futura |
| connection → analyses | 1 : N | histórico ao longo do tempo; a "atual" = última `completed` (derivada, não armazenada) |
| conversation_import → analyses | 1 : N | uma análise referencia **um** import no MVP (`import_id`). Se um dia uma análise cobrir vários, cria-se `analysis_imports`. |
| analysis → metrics/phases/change_points/evidence | 1 : N | todos filhos diretos da análise |
| evidence → (change_point \| phase) | N : 1 | exatamente um dos dois (CHECK) |
| evidence → evidence_excerpts | 1 : 0..N | N limitado (§7.6); evidência puramente agregada tem 0 excerpts |
| máximo de análises ativas | 1 por conexão | índice único parcial em `status IN (queued, processing)` — idempotência |

Exclusão: **hard delete em cascata** a partir de `connections` e de `auth.users`. Sem soft-delete (soft-delete de dado íntimo contradiz o direito de exclusão). O Storage não cascateia — exige purga explícita (§6, §7).

---

## 4. Estratégia de ownership

**Padrão:** toda tabela de dado do usuário carrega `owner_user_id uuid not null references auth.users(id) on delete cascade`, **denormalizado** em todos os níveis (não só na raiz).

**Consistência forçada pelo banco, não pela aplicação:**

```text
connections      UNIQUE (id, owner_user_id)
participants     FK (connection_id, owner_user_id) → connections (id, owner_user_id)
conversation_imports   idem
analyses         idem;  UNIQUE (id, owner_user_id)
analysis_*       FK (analysis_id, owner_user_id) → analyses (id, owner_user_id)
```

Efeito: é impossível criar um filho com `owner_user_id` diferente do pai. Isso permite que **toda policy RLS seja `owner_user_id = (select auth.uid())` sem JOIN** — mais simples de auditar, mais barata, e sem risco de policy recursiva.

Custo: uma coluna e uma FK composta a mais por tabela. Aceito.

---

## 5. Estratégia de RLS

**Regras gerais**

1. `ENABLE` e `FORCE ROW LEVEL SECURITY` em **todas** as tabelas do schema `public` que criarmos.
2. **Deny-by-default:** sem policy = sem acesso. `REVOKE ALL` de `anon` e `PUBLIC`; `GRANT` mínimo apenas a `authenticated`, coluna/operação a operação.
3. Policies sempre `TO authenticated`, usando `(select auth.uid())` (avaliado uma vez por query).
4. Nenhuma tabela depende de `user_metadata` ou claims editáveis pelo usuário.
5. Nenhum acesso via `anon`. O app não tem área pública que leia dados.

**Matriz de operações (proposta)**

| Tabela | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| `connections` | dono | dono | dono (`display_name`, `context_type`) | dono |
| `participants` | dono | **servidor** | dono (apenas `is_self`) | — (cascata) |
| `conversation_imports` | dono | **servidor** | **servidor** | — (cascata) |
| `analyses` | dono | **servidor** | **servidor** | — (cascata) |
| `analysis_metrics/phases/change_points/evidence/evidence_excerpts` | dono* | **servidor** | **servidor** | — (cascata) |

\* **Requisito de segurança vinculante:** o SELECT do dono nas tabelas de detalhe é provisório. Ver §9.1: antes de qualquer lançamento com o paywall, resultados premium não podem ser recuperáveis pela API sem o unlock correspondente.

**"Servidor"** = código server-side com um cliente admin estreito. **DB-Q4 (aprovado):** a escrita de resultados analíticos (`analyses`, `analysis_*`, `change_points`, `evidence`, `evidence_excerpts`) e das transições de estado dos imports é **exclusivamente do servidor**. Regras:

1. **Nível de privilégio, não só de policy:** `authenticated` recebe apenas `GRANT SELECT` nessas tabelas. Nenhum `INSERT/UPDATE/DELETE` é concedido, e portanto nenhuma policy de escrita existe para clientes. Um cliente não consegue inserir ou alterar resultados/evidências mesmo que uma policy seja escrita errada por engano.
2. **Todo uso do cliente admin valida ownership explicitamente.** Funções que escrevem resultados recebem `ownerUserId` e verificam, antes de gravar, que a `connection`/`import`/`analysis` alvo pertence a esse usuário. Não confiar em ids vindos do cliente.
3. **Cada função com cliente admin tem testes próprios**: sucesso para o dono; falha quando o alvo é de outro usuário; falha para id inexistente.
4. O cliente admin fica em `server-only` (como já está no Foundation) e nunca é importado por código que rode no browser. Route handlers/Server Actions não repassam entrada do usuário diretamente ao cliente admin.

**Testes de RLS (obrigatórios no EPIC 01):** usuário A não lê, não insere e não altera dados de B; `anon` não lê nada; filho com `owner_user_id` divergente é rejeitado pelo banco. Ferramenta a definir (pgTAP via `supabase test db` é a candidata natural; DB-Q7).

---

## 6. Estratégia de Storage

- **Um bucket privado** `conversation-imports`. `public = false`. Sem URL pública jamais.
- **Caminho do objeto:** `{owner_user_id}/{import_id}.txt`. **O nome original do arquivo não entra no caminho** (costuma conter o nome da pessoa: "Conversa do WhatsApp com Fulana.txt").
- **Limites no bucket:** `file_size_limit` e `allowed_mime_types = text/plain`, além da validação server-side.
- **Upload:** o servidor cria uma *signed upload URL* para o caminho exato depois de validar tamanho/tipo e criar a linha `conversation_imports`. Motivo prático: exports grandes (dezenas de milhares de mensagens ≈ vários MB) podem exceder o limite de body de funções serverless, então passar o arquivo pelo Next é frágil. Com signed upload URL, **não precisamos de nenhuma policy de INSERT em `storage.objects` para usuários** — o bucket fica deny-by-default.
- **Leitura:** somente pelo servidor (pipeline). O usuário nunca baixa o raw de volta.
- **Purga:** o banco **não** apaga objetos do Storage em cascata. A remoção deve ser feita pela **API de Storage** (não por SQL direto), disparada por: fim do processamento/TTL (§7), exclusão de conexão, exclusão de conta. Precisa de um mecanismo de varredura para órfãos (objeto sem linha) — definido junto com a decisão de job runner (ADR-010).
- `conversation_imports.storage_path` é **nullable**; `raw_purged_at` registra a purga. Assim o estado "raw ainda existe?" é consultável e auditável.

---

## 7. Lifecycle dos dados e a decisão de retenção

### 7.1 A pergunta que não pode ser decidida em silêncio

> Precisamos persistir mensagens (brutas ou normalizadas) depois da análise, ou trabalhamos com retenção temporária + derivados?

Ela muda o significado de "derivado":

- Se o raw **é retido**, os resultados são *re-deriváveis* (rodar o engine de novo com nova versão).
- Se o raw **é purgado**, os resultados **deixam de ser re-deriváveis** e viram **dado primário**. Um bug no engine v1 só é corrigido pedindo novo upload.

### 7.2 Opções

| | A. Efêmero | B. Persistir normalizado | C. Efêmero com janela curta |
|---|---|---|---|
| Raw `.txt` | apagado ao concluir a análise (ou falhar) | apagado ou não | apagado após N dias / ao concluir |
| Tabela `messages` | não | **sim** (volume alto) | não |
| Re-análise com engine novo | pede novo upload | automática | automática **dentro** da janela; depois pede upload |
| Evidência com trecho de texto | não (só agregados + refs) | sim | **sim, só excerpts mínimos selecionados (§7.6) — decisão adotada** |
| "Desde a Última Vez" | novo export completo, dedupe por timestamp | incremental barato | idem A |
| Exposição LGPD / superfície de vazamento | **mínima** | **máxima** (conversas íntimas de terceiros, indefinidamente) | baixa e limitada no tempo |
| Complexidade | baixa | alta (particionamento, índices, criptografia, exclusão) | baixa–média (TTL + varredura) |
| Reversibilidade | fácil ir de A→B depois (basta começar a guardar) | difícil ir de B→A (dado já acumulado) | fácil |

### 7.3 Decisão — DB-Q1 (aprovada, com alteração)

**Opção C, com janela curta e ceiling rígido**, sem tabela `messages`:

1. O `.txt` fica no Storage privado **somente durante o processamento**: parse → **confirmação de participantes** → análise.
2. **Apagar após a análise concluída.** Ceiling de **no máximo 7 dias** para imports abandonados ou falhos (contados a partir do upload; `raw_expires_at`).
3. O dataset normalizado existe **só em memória** durante o processamento.
4. **Não criar tabela `messages` no MVP.**
5. **Alteração aprovada:** referências como `source_index` **não bastam** depois que o original é destruído. O sistema **pode persistir somente o conjunto mínimo de evidências selecionadas** necessário para fundamentar os insights do relatório: pequenos excerpts, papel do falante, timestamp, `source_index` e metadata relevante. Esse conjunto **não pode representar uma cópia reconstruível da conversa completa**. Modelo, limites, implicações de privacidade e retenção em **§7.6**.
6. Por ser reversível (A/C → B é fácil; B → A não), continua sendo a escolha de menor arrependimento para um MVP que valida hipótese de mercado.

**Custos assumidos (explícitos):**

- O relatório "explorar o período" mostra métricas, agregados e **um conjunto pequeno de trechos selecionados**, nunca "as mensagens daquele dia" em geral.
- Correção de engine exige reenvio do arquivo (`analyses.engine_version` identifica análises "antigas"). Os excerpts persistidos **não** servem para re-executar o engine: são evidência de apresentação, não dataset.
- Como o Free Reveal é gerado antes do pagamento, a análise completa é calculada e **persistida** antes da compra, **incluindo os excerpts** (que são conteúdo premium, ver §9.1).
- A retenção do conteúdo íntimo deixa de ser "zero após a análise": passa a ser "excerpts mínimos, por tempo de vida da análise/conexão". Isso é uma exposição real e está tratada em §7.6 e §8.

### 7.4 Classificação final dos dados

| Classe | Itens | Regra |
|---|---|---|
| **Persistente (primário)** | connections, participants, imports (metadados), analyses (meta + sufficiency + reveal) | vida = da conexão |
| **Persistente (primário sob Opção C)** | metrics, phases, change_points, evidence | deixam de ser regeneráveis após purga do raw |
| **Persistente, sensível (limitado)** | `evidence_excerpts` | vida = da análise; limites de quantidade/tamanho; ver §7.6 |
| **Efêmero** | `.txt` no Storage; dataset normalizado em memória | apagado ao concluir a análise; teto de 7 dias |
| **Nunca persistido** | conversa completa/reconstruível; texto de mensagem em logs, analytics, `jsonb` de estatísticas (`parse_stats`, `dataset_summary`, `params`), nomes de arquivo, mensagens de erro com trecho | ver §8 |

### 7.5 Máquinas de estado (conceituais, não enum final)

```text
conversation_imports:
  created → uploaded → parsing → needs_participant_confirmation
          → ready → (insufficient_data | consumed) ;  qualquer → failed ;  → purged (raw_purged_at)

analyses:
  queued → processing → completed | failed | insufficient_data
```

`insufficient_data` é resultado legítimo, não erro (PRD §12). Erros guardam `error_code` (enum curto) — **nunca** mensagem de exceção com trecho de conversa.

### 7.6 Evidências selecionadas (`evidence_excerpts`): modelo, limites e implicações

**Princípio:** persistir o **mínimo necessário para o usuário entender e confiar em um insight**, não um arquivo morto da conversa. Um excerpt existe porque um insight específico precisa dele; se o insight puder ser sustentado só por agregados, **não há excerpt**.

**Conteúdo permitido por excerpt** (colunas em §10.2): `excerpt` (texto curto), `speaker_role` (`self` | `other`; **sem nome**), `sent_at`, `source_index`, `truncated`, `redacted`, e `metadata` jsonb pequeno e sem texto livre (ex.: tipo de sinal, posição relativa na janela).

**Limites (hard ceiling no banco; valores finais fechados em `ANALYTICS_ENGINE.md`/`PRIVACY.md`, DB-Q12):**

| Limite | Proposta inicial | Aplicação |
|---|---|---|
| Tamanho do excerpt | ≤ 280 caracteres | `CHECK` no banco |
| Excerpts por evidência | ≤ 3 | validação server-side + teste |
| Excerpts por análise | ≤ 30 e orçamento total de caracteres | validação server-side + teste (trigger se surgir bypass) |
| Excerpts por conexão (somando todas as análises) | ≤ 60; ao criar nova análise, os da análise anterior mais antiga são descartados ou o teto é respeitado | validação server-side + teste |
| Não-contiguidade | excerpts da mesma evidência **não** podem ser mensagens adjacentes (`source_index` com lacuna) | validação server-side + teste |
| Origem | selecionados por regra determinística do engine, ligados a um `change_point`/`phase`; nunca "amostra aleatória" nem "melhores momentos" sem insight associado | desenho do engine |

O objetivo dos limites é **impedir reconstrução**: com no máximo algumas dezenas de trechos curtos, espaçados e desconectados, não é possível remontar a conversa, mesmo somando todas as análises de uma conexão (há teto por conexão justamente para que várias análises ao longo do tempo não acumulem cobertura — ver R12).

**Redação antes de persistir:** um passo de redação remove/mascara identificadores óbvios (telefones, e-mails, CPF/CNPJ, URLs, endereços quando detectáveis) e descarta candidatos a excerpt que sejam mídia omitida ou mensagens de sistema. O flag `redacted` registra que houve mascaramento. A redação **reduz**, não elimina, o risco: texto livre pode conter saúde, sexualidade, terceiros citados, etc.

**Implicações de privacidade**

1. É **conteúdo íntimo de duas pessoas**, sendo uma delas terceira e sem consentimento (R2). O excerpt reintroduz o problema que a Opção C evitava, em escala muito menor. A base legal (LGPD) e o aviso ao usuário sobre isso pertencem ao `PRIVACY.md` e **devem estar resolvidos antes de upload real em produção**.
2. É a **única** tabela com texto de conversa; isolá-la permite RLS/privilégios/exclusão/auditoria dedicados e mantém `evidence` livre de texto.
3. **Nunca** vai para logs, analytics de produto, mensagens de erro, nem para `jsonb` de outras tabelas.
4. **LLM (ADR-008, aberto):** enviar excerpts a um provider é envio de dado sensível a terceiro. Por padrão, o engine e a narrativa devem funcionar com agregados; qualquer envio de excerpt ao LLM exige decisão explícita e registro em `PRIVACY.md`.
5. **Cards compartilháveis não incluem excerpts por padrão** (PRD §16). Compartilhar um excerpt só por ação explícita do usuário, item a item.
6. **Conteúdo premium:** excerpts são detalhe do relatório completo e seguem o requisito de §9.1.

**Implicações de retenção**

1. **Ciclo de vida:** o excerpt vive **tanto quanto a análise a que pertence**; é apagado em cascata com a análise, a conexão e a conta. Nenhuma cópia fora dessa tabela.
2. **Não é re-derivável:** após a purga do raw, o excerpt não pode ser regenerado. Apagá-lo é definitivo e o relatório passa a exibir só agregados naquele insight.
3. **Exclusão granular (a decidir, DB-Q13):** permitir que o usuário apague **apenas os excerpts** de uma análise/conexão, mantendo métricas e fases. Como a tabela é isolada, isso é um `DELETE` simples via servidor.
4. **Expiração por inatividade (a decidir, DB-Q13):** política opcional para apagar excerpts de conexões sem acesso por N meses.
5. **Backups/PITR (DB-Q11):** excerpts apagados podem existir em backups até o ciclo de retenção deles. Documentar em `PRIVACY.md`.
6. **Auditabilidade:** é possível contar excerpts por análise e por usuário para verificar que os tetos são respeitados.

---

## 8. Riscos de privacidade

| # | Risco | Mitigação proposta |
|---|---|---|
| R1 | Raw retido além do necessário | Opção C, TTL, `raw_purged_at`, varredura de órfãos |
| R2 | Dados de **terceiros** que não consentiram (a outra pessoa da conversa) | minimizar; `PRIVACY.md` precisa tratar base legal LGPD; possibilidade de exclusão pelo usuário |
| R3 | Nome do participante é dado pessoal | guardar só o rótulo necessário; permitir apelido em vez do nome do export |
| R4 | Nome do arquivo com nome de pessoa | nunca no path nem em coluna; só tamanho + hash |
| R5 | Vazamento por logs / erros / `jsonb` | proibido texto em logs e em `parse_stats`; colunas `jsonb` só com contagens/agregados; validar com Zod na escrita |
| R6 | Bypass do paywall via API direta (incluindo excerpts premium) | requisito vinculante §9.1: nenhum resultado premium legível pela API sem unlock; teste de aceitação obrigatório |
| R7 | Service role usado em caminho errado | cliente admin `server-only`, validação explícita de ownership, testes por função (DB-Q4, §5) |
| R8 | Exclusão incompleta (Storage, backups) | purga via API de Storage na exclusão de conta/conexão; política de backup/PITR documentada em `PRIVACY.md` |
| R9 | Hash do arquivo como identificador | SHA-256 do conteúdo é aceitável para detectar reenvio; não é reversível, mas avaliar se é necessário (DB-Q5) |
| R10 | **Excerpts persistidos** (texto íntimo de terceiro, retido após a purga do raw) | tabela isolada, limites rígidos, redação, exclusão em cascata/granular, vida = da análise; detalhado em §7.6. Cifrar em repouso a nível de coluna fica como avaliação em `PRIVACY.md` (DB-Q12) |
| R11 | Card compartilhável vazando dado | cards renderizados a partir de agregados; nenhum excerpt por padrão (PRD §16) |
| R12 | **Reconstrução por acúmulo:** várias análises da mesma conexão somando excerpts até cobrir boa parte da conversa | teto por análise **e por conexão**, não-contiguidade, seleção só ligada a insight |
| R13 | Excerpt enviado a provider de LLM | proibido por padrão; exige decisão explícita (ADR-008 aberto) e registro em `PRIVACY.md` |
| R14 | Redação falha (identificador ou dado sensível passa) | redação é redução de risco, não garantia; limites de quantidade/tamanho limitam o dano; exclusão granular pelo usuário |

---

## 9. Créditos / entitlements (sem implementar)

Nada de billing no schema agora. Duas concessões de design, ambas baratas:

1. **`analyses.reveal_summary` (jsonb pequeno)** guarda o que o Free Reveal mostra (contagens, nº de fases/mudanças, 1 descoberta). As tabelas de detalhe ficam separadas, de modo que a RLS de detalhe possa ganhar um predicado de desbloqueio depois **sem mover dados**.
2. **`analyses.id` é a unidade natural de compra** ("O Que Mudou?" de uma conexão). Um futuro `entitlements(analysis_id | connection_id, kind, granted_at, source)` se pluga sem alterar as tabelas existentes.

Como o provedor de pagamento (ADR-009) e o modelo (compra por análise vs. por conexão vs. créditos) estão abertos, **não** reservar colunas `is_paid`/`credits` agora.

### 9.1 Requisito de segurança futuro (vinculante): o paywall não existe só na UI

**Regra:** resultados premium **não podem ser recuperáveis diretamente pela API** (PostgREST/Supabase client com a sessão do usuário) antes do entitlement/unlock correspondente. Esconder o conteúdo no front-end **não** conta como paywall.

**Escopo do "premium":** tudo que estiver nas tabelas de detalhe — `analysis_metrics`, `analysis_phases`, `change_points`, `evidence` e `evidence_excerpts` — além de qualquer campo de `analyses` que ultrapasse `reveal_summary`. O que o Free Reveal mostra **só** pode vir de `reveal_summary`.

**Mecanismos aceitáveis (escolha adiada para o EPIC 05/ADR do modelo de compra):**

- (a) policy de SELECT das tabelas de detalhe com predicado de unlock (ex.: existe entitlement válido para a análise/conexão); ou
- (b) revogar `SELECT` de `authenticated` nas tabelas de detalhe e servir o relatório apenas por endpoint server-side que verifica o entitlement.

**Critérios de aceitação (obrigatórios antes de qualquer lançamento com paywall):**

1. Teste automatizado: com a sessão de um usuário dono de análise **não desbloqueada**, consultas diretas a cada tabela de detalhe retornam **zero linhas** (ou erro de permissão).
2. O mesmo teste com a análise desbloqueada retorna os dados.
3. `reveal_summary` não contém nada além do que o Free Reveal promete.
4. Nenhum endpoint server-side retorna dado premium sem checar unlock.

**Restrição de sequenciamento:** as tabelas de detalhe nascem em M3 (antes do paywall). **Nenhum ambiente com usuários reais e cobrança pode ir ao ar com o SELECT provisório do dono (§5)** — o predicado de unlock (M4) ou o endpoint server-side precisa existir antes.

---

## 10. Proposta de schema inicial (rascunho — não é migration)

Convenções: `uuid` PK com `gen_random_uuid()`; `timestamptz`; nomes em inglês/`snake_case` (alinhado ao ARCHITECTURE); enums como `text + CHECK` no início (mais fácil de evoluir que `CREATE TYPE`); trigger `set_updated_at` onde houver `updated_at`.

### 10.1 Fases de migration

| Migration | Epic | Conteúdo |
|---|---|---|
| **M1** | EPIC 01 | `connections` + RLS + testes de RLS |
| **M2** | EPIC 02 | `participants`, `conversation_imports`, bucket `conversation-imports` |
| **M3** | EPIC 03/04 | `analyses`, `analysis_metrics`, `analysis_phases`, `change_points`, `evidence`, `evidence_excerpts` |
| **M4** | EPIC 05 | predicado de desbloqueio (depende do provider) |

O EPIC 01 implementa **apenas M1**.

### 10.2 DDL de referência

```sql
-- M1 --------------------------------------------------------------
create table connections (
  id             uuid primary key default gen_random_uuid(),
  owner_user_id  uuid not null default auth.uid()
                   references auth.users(id) on delete cascade,
  display_name   text not null check (char_length(display_name) between 1 and 80),
  context_type   text check (context_type in ('partner','dating','ex')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique (id, owner_user_id)
);
create index on connections (owner_user_id, created_at desc);
-- known_date_range e last_analyzed_at NÃO são colunas: derivam de imports/analyses.

-- M2 --------------------------------------------------------------
create table participants (
  id             uuid primary key default gen_random_uuid(),
  connection_id  uuid not null,
  owner_user_id  uuid not null,
  label          text not null check (char_length(label) between 1 and 80),
  is_self        boolean not null default false,
  created_at     timestamptz not null default now(),
  foreign key (connection_id, owner_user_id)
    references connections (id, owner_user_id) on delete cascade,
  unique (id, owner_user_id)
);
create unique index participants_one_self on participants (connection_id) where is_self;
-- "exatamente 2 por conexão": validado no fluxo de confirmação (ou trigger deferido, DB-Q8).

create table conversation_imports (
  id               uuid primary key default gen_random_uuid(),
  connection_id    uuid not null,
  owner_user_id    uuid not null,
  source           text not null default 'whatsapp_txt' check (source in ('whatsapp_txt')),
  status           text not null default 'created',
  file_size_bytes  bigint check (file_size_bytes > 0),
  content_sha256   text,                      -- opcional (DB-Q5)
  parser_version   text,
  detected_locale  text,
  message_count    integer,
  first_message_at timestamptz,
  last_message_at  timestamptz,
  parse_stats      jsonb,                     -- somente contagens; nunca texto
  storage_path     text,                      -- null após purga
  raw_expires_at   timestamptz,
  raw_purged_at    timestamptz,
  error_code       text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  foreign key (connection_id, owner_user_id)
    references connections (id, owner_user_id) on delete cascade,
  unique (id, owner_user_id)
);
create index on conversation_imports (connection_id, created_at desc);
create index on conversation_imports (raw_expires_at) where raw_purged_at is null;

-- M3 --------------------------------------------------------------
create table analyses (
  id              uuid primary key default gen_random_uuid(),
  connection_id   uuid not null,
  owner_user_id   uuid not null,
  import_id       uuid not null,
  status          text not null default 'queued',
  engine_version  text not null,
  params          jsonb not null,             -- janelas, limiares efetivos (reprodutibilidade)
  dataset_summary jsonb not null,             -- contagens/intervalo; sem texto
  sufficiency     jsonb,
  reveal_summary  jsonb,
  error_code      text,
  started_at      timestamptz,
  completed_at    timestamptz,
  created_at      timestamptz not null default now(),
  foreign key (connection_id, owner_user_id)
    references connections (id, owner_user_id) on delete cascade,
  foreign key (import_id, owner_user_id)
    references conversation_imports (id, owner_user_id) on delete cascade,
  unique (id, owner_user_id)
);
create unique index analyses_one_active on analyses (connection_id)
  where status in ('queued','processing');
create index on analyses (connection_id, created_at desc);

create table analysis_metrics (
  id            uuid primary key default gen_random_uuid(),
  analysis_id   uuid not null,
  owner_user_id uuid not null,
  metric_key    text not null,
  granularity   text not null check (granularity in ('day','week','month')),
  participant_id uuid,                        -- null = métrica da conversa
  series        jsonb not null,               -- [{t, v, n}] validado por Zod
  schema_version int not null default 1,
  foreign key (analysis_id, owner_user_id)
    references analyses (id, owner_user_id) on delete cascade,
  foreign key (participant_id, owner_user_id)
    references participants (id, owner_user_id) on delete cascade,
  unique (analysis_id, metric_key, granularity, participant_id)
);

create table analysis_phases (
  id            uuid primary key default gen_random_uuid(),
  analysis_id   uuid not null,
  owner_user_id uuid not null,
  ordinal       int not null,
  starts_at     timestamptz not null,
  ends_at       timestamptz not null check (ends_at > starts_at),
  label         text,                         -- rótulo cuidadoso; sem estado psicológico
  characteristics jsonb not null,             -- métricas que definem a fase
  confidence    numeric(4,3) check (confidence between 0 and 1),
  foreign key (analysis_id, owner_user_id)
    references analyses (id, owner_user_id) on delete cascade,
  unique (analysis_id, ordinal),
  unique (id, owner_user_id)
);

create table change_points (
  id            uuid primary key default gen_random_uuid(),
  analysis_id   uuid not null,
  owner_user_id uuid not null,
  metric_key    text not null,
  participant_id uuid,
  before_start  timestamptz not null,
  before_end    timestamptz not null,
  after_start   timestamptz not null,
  after_end     timestamptz not null,
  before_value  numeric not null,
  after_value   numeric not null,
  magnitude     numeric not null,
  persistence   numeric,
  confidence    numeric(4,3) check (confidence between 0 and 1),
  rank          int not null,                 -- relevância dentro da análise
  foreign key (analysis_id, owner_user_id)
    references analyses (id, owner_user_id) on delete cascade,
  unique (id, owner_user_id)
);

create table evidence (
  id              uuid primary key default gen_random_uuid(),
  analysis_id     uuid not null,
  owner_user_id   uuid not null,
  change_point_id uuid,
  phase_id        uuid,
  kind            text not null check (kind in ('metric_window','message_sample')),
  metric_key      text,
  period_start    timestamptz not null,
  period_end      timestamptz not null,
  values          jsonb not null,             -- agregados; NUNCA texto de mensagem
  foreign key (analysis_id, owner_user_id)
    references analyses (id, owner_user_id) on delete cascade,
  foreign key (change_point_id, owner_user_id)
    references change_points (id, owner_user_id) on delete cascade,
  foreign key (phase_id, owner_user_id)
    references analysis_phases (id, owner_user_id) on delete cascade,
  check (num_nonnulls(change_point_id, phase_id) = 1),
  unique (id, owner_user_id)
);

-- Única tabela com texto de conversa. Ver §7.6 (limites, redação, retenção).
create table evidence_excerpts (
  id            uuid primary key default gen_random_uuid(),
  evidence_id   uuid not null,
  analysis_id   uuid not null,
  owner_user_id uuid not null,
  source_index  integer not null check (source_index >= 0),
  sent_at       timestamptz not null,
  speaker_role  text not null check (speaker_role in ('self','other')),  -- sem nome
  excerpt       text not null check (char_length(excerpt) between 1 and 280),
  truncated     boolean not null default false,
  redacted      boolean not null default false,
  metadata      jsonb,                        -- pequeno, sem texto livre
  created_at    timestamptz not null default now(),
  foreign key (evidence_id, owner_user_id)
    references evidence (id, owner_user_id) on delete cascade,
  foreign key (analysis_id, owner_user_id)
    references analyses (id, owner_user_id) on delete cascade,
  unique (evidence_id, source_index)
);
create index on evidence_excerpts (analysis_id);
-- Tetos por evidência/análise/conexão e não-contiguidade: validação server-side + testes (DB-Q12).
-- Privilégios: authenticated só recebe SELECT (e, antes do paywall, sujeito a §9.1).
```

### 10.3 Por que resultados normalizados (e não um único JSON)

Alternativa considerada: um `analyses.result jsonb` único. Simples, mas: não dá para impor integridade evidência→insight, não dá para ter RLS/entitlement granular no detalhe, e qualquer mudança de formato quebra análises antigas sem ponto de migração. A proposta usa **tabelas para as entidades que se relacionam (change_points, phases, evidence)** e **jsonb validado por Zod com `schema_version` apenas para séries temporais** (grandes, sempre lidas inteiras, nunca consultadas por ponto).

---

## 11. Decisões ainda abertas

| ID | Decisão | Status / recomendação | Bloqueia |
|---|---|---|---|
| **DB-Q1** | Retenção do raw/normalizado (§7) | **DECIDIDO:** Opção C (apagar após análise; máx. 7 dias para abandonados; sem `messages`), **com** persistência de excerpts mínimos selecionados (§7.6) | — |
| **DB-Q2** | Evidência pode conter trecho de texto? | **DECIDIDO (via DB-Q1):** sim, só em `evidence_excerpts`, com limites rígidos; `evidence` segue sem texto | — |
| **DB-Q3** | Resultados normalizados vs. JSON único | Híbrido (§10.3) — não revisitado | M3 |
| **DB-Q4** | Escrita de status/resultados | **DECIDIDO:** exclusivamente servidor; clientes só `SELECT`; admin valida ownership e tem testes (§5) | — |
| **DB-Q5** | Guardar `content_sha256`? | Sim, só para detectar reenvio; remover se `PRIVACY.md` julgar desnecessário | M2 |
| **DB-Q6** | Precisamos de `profiles`? | **DECIDIDO:** não no MVP; usar `auth.users` até existir requisito concreto. Consentimento LGPD pode forçar isso antes de produção; reabrir então | — |
| **DB-Q7** | Ferramenta de teste de RLS | pgTAP via Supabase CLI local | M1 |
| **DB-Q8** | "Exatamente 2 participantes": trigger deferido ou validação no fluxo? | validação no fluxo + teste; trigger só se aparecer bypass | M2 |
| **DB-Q9** | Job runner / varredura de purga (ADR-010) | separado; M2 só precisa dos campos `raw_expires_at`/`raw_purged_at` | purga real |
| **DB-Q10** | Modelo de compra (por análise / conexão / créditos), provider (ADR-009) | adiar; §9 mantém o encaixe | M4 |
| **DB-Q11** | Backups/PITR e exclusão | tratar em `PRIVACY.md` | produção |
| **DB-Q12** | Valores finais dos limites de excerpt (tamanho, por evidência/análise/conexão), regras de redação, cifra a nível de coluna | propostas em §7.6; fechar em `ANALYTICS_ENGINE.md`/`PRIVACY.md` | M3 |
| **DB-Q13** | Exclusão granular só dos excerpts pelo usuário; expiração por inatividade | recomendável oferecer exclusão granular; expiração a decidir em `PRIVACY.md` | produção |

---

## 12. ADRs a registrar após a aprovação

- **ADR-012** — Retenção: raw efêmero (apagar após análise, máx. 7 dias para abandonados), sem `messages`, **com excerpts mínimos selecionados** e seus limites (resolve ADR-007; fecha DB-Q1/Q2)
- **ADR-013** — Padrão de ownership denormalizado com FK composta + RLS deny-by-default
- **ADR-014** — Forma dos resultados (tabelas + séries em jsonb) e escrita exclusivamente pelo servidor com validação explícita de ownership (DB-Q3/Q4)
- **ADR-015** — Requisito: paywall nunca só na UI; resultados premium não recuperáveis pela API sem unlock (§9.1)

---

## 13. O que o EPIC 01 implementa se este documento for aprovado

1. Projeto Supabase local (Supabase CLI) e `supabase/migrations` versionado.
2. **M1:** tabela `connections`, trigger `updated_at`, RLS `ENABLE+FORCE`, grants mínimos.
3. Testes de RLS (A×B, `anon`, owner divergente).
4. Auth (e-mail/magic link — método a confirmar), listagem e criação de conexão.
5. ADR-013.

Fora do EPIC 01: participants, imports, Storage, analyses, resultados, excerpts, billing, `profiles`.

---

## 14. Histórico

- **0.1** — proposta inicial.
- **0.2** — aprovado com alterações:
  - **DB-Q1:** retenção efêmera do raw confirmada, mas `source_index` sozinho é insuficiente; adicionada `evidence_excerpts` (excerpts mínimos, `speaker_role`, timestamp, `source_index`, metadata), com limites, redação e implicações de privacidade/retenção (§7.3, §7.6, §8 R10–R14).
  - **DB-Q4:** escrita de resultados exclusivamente pelo servidor; clientes só `SELECT`; admin valida ownership com testes (§5).
  - **DB-Q6:** sem `profiles` no MVP.
  - **Novo requisito de segurança:** paywall não pode existir só na UI (§9.1, R6).
  - `evidence.message_ref` removido; `kind` passou de `message_ref` para `message_sample`.

- **0.3 (EPIC 01)** — M1 `connections` implementada; ver ADR-013/016/017. DB-Q7 resolvido de forma pragmática (integração contra DEV, ADR-016).
