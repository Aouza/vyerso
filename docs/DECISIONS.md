# Architecture Decision Records — Vyerso

Este arquivo registra decisões que devem sobreviver às sessões de desenvolvimento.

---

## ADR-001 — Nome do produto

**Status:** Accepted  
**Decisão:** o produto se chama **Vyerso**.

A marca, produtos e UX voltados ao usuário serão prioritariamente em PT-BR.

---

## ADR-002 — Produto inicial

**Status:** Superseded by ADR-018 (2026-10-06)  
**Decisão original:** o primeiro produto/MVP é **O Que Mudou?**.

Substituída: o produto principal passou a ser **Nós**, e "O Que Mudou?" virou gancho de aquisição/seção do relatório (`docs/PRODUCT.md`). A regra "features futuras não estão automaticamente autorizadas" continua valendo.

---

## ADR-003 — Backend platform

**Status:** Accepted

Vyerso utilizará **Supabase** como plataforma principal de backend.

Responsabilidades:

- PostgreSQL;
- Authentication;
- Row Level Security;
- Storage;
- migrations.

### Boundary

Supabase é infraestrutura de persistência/autenticação. O analytics engine deve permanecer independente e testável sem Supabase.

---

## ADR-004 — Frontend/application stack

**Status:** Accepted

- Next.js
- TypeScript strict
- App Router
- Tailwind CSS
- Zod
- Vitest

---

## ADR-005 — Multiple persistent connections

**Status:** Accepted

Um usuário pode possuir múltiplas **Connections**, cada uma representando o histórico conhecido entre o usuário e outra pessoa.

A conexão e seus resultados derivados devem persistir desde o MVP.

Isso suporta dois loops futuros:

- profundidade: continuar/atualizar a mesma conexão;
- amplitude: analisar outra pessoa/conexão.

---

## ADR-006 — Evidence-first analytics

**Status:** Accepted

Métricas, deltas e períodos são calculados por código determinístico quando aplicável. LLM não é fonte de verdade para números.

Insights importantes devem ser rastreáveis a dados e evidências.

---

## ADR-007 — Raw conversation retention

**Status:** Superseded by ADR-012 (direção decidida; números finais ainda em `docs/PRIVACY.md`, DRAFT)

Pergunta original: por quanto tempo `.txt` e mensagens normalizadas seriam armazenados. Resposta: ver ADR-012. Não assumir retenção indefinida.

---

## ADR-008 — LLM provider

**Status:** Open

Provider/modelo ainda não escolhido. O domínio não deve depender diretamente de SDK específico.

---

## ADR-009 — Payment provider

**Status:** Open

Provider de pagamento ainda não escolhido.

---

## ADR-010 — Background processing

**Status:** Open

O sistema deve permitir análise assíncrona, mas queue/job runner ainda não foi escolhido. Não adicionar infraestrutura prematuramente.

---

## ADR-011 — Foundation tooling e isolamento do domínio

**Status:** Accepted

- Gerenciador de pacotes: **npm**.
- Dependências do Foundation: `zod`, `vitest`, `prettier`, `@supabase/supabase-js`, `@supabase/ssr`, `server-only`. `@types/node` fixado em `^24` por exigência de peer do Vitest.
- `src/domain/**` não pode importar React, Next, Supabase, `infrastructure`, `features`, `components`, `app` ou `application`. Aplicado por `no-restricted-imports` no ESLint.
- Env validada com Zod em `src/lib/env.ts`; `SUPABASE_SECRET_KEY` (`sb_secret_…`, substitui o service role legado) só é lido em `src/lib/env.server.ts` (`server-only`).
- Fixtures de conversa real são ignoradas pelo git (`tests/fixtures/whatsapp/real-*`).

---

## ADR-012 — Retenção: bruto efêmero + excertos mínimos de evidência

**Status:** Accepted (direção); refinada pela ADR-020. Valores finais pendentes em `docs/PRIVACY.md` (DRAFT, bloqueia upload real em produção).

Aprovada em DB-Q1 (`docs/DATABASE.md` §7):

- O `.txt` fica em Storage privado só durante parse → confirmação de participantes → análise; é apagado após análise concluída; máximo proposto de 7 dias para imports abandonados.
- Não existe tabela `messages` no MVP; o dataset normalizado vive em memória.
- `source_index` sozinho não sustenta evidência depois que o original some: persiste-se **somente** um conjunto mínimo de excertos selecionados (`evidence_excerpts`), sem permitir reconstruir a conversa.
- Limites propostos (NÃO finais): ≤280 caracteres por excerto, ≤3 por evidência, ≤30 por análise, ≤60 por conexão, não adjacentes.
- Tensão com Nossa História: resolvida em direção pela ADR-020 (Relationship Snapshot); o schema depende de `docs/RELATIONSHIP_SNAPSHOT.md`.

---

## ADR-013 — Ownership denormalizado e RLS deny-by-default

**Status:** Accepted (implementado na M1 do EPIC 01)

- Toda tabela de dado do usuário carrega `owner_user_id` (default `auth.uid()`, FK para `auth.users` com `on delete cascade`). Filhos futuros usarão FK composta `(parent_id, owner_user_id)`; `connections` já expõe `unique (id, owner_user_id)` para isso.
- `ENABLE` + `FORCE ROW LEVEL SECURITY`; policies `TO authenticated` com `(select auth.uid())`. A migration aborta se a RLS não estiver ativa e forçada.
- **Privilégios por coluna:** `authenticated` recebe `INSERT/UPDATE` apenas em `display_name` e `context_type`. `owner_user_id` não pode ser forjado nem alterado pelo cliente (`42501`).
- **Deny-by-default global:** `alter default privileges in schema public revoke all on tables from anon, authenticated`. Toda tabela futura nasce sem acesso e precisa de `GRANT` explícito.
- **`service_role` (secret key) não recebe DML por padrão** nesta plataforma. Em `connections` recebe apenas `SELECT` (pipeline server-side e testes). Tabelas futuras devem conceder ao `service_role` exatamente o que o servidor precisa.
- Nenhum fluxo de produto do EPIC 01 usa a secret key; ela existe apenas nos testes de integração (criar/remover usuários e verificar cascata).
- Migrations: `20260930023535_connections.sql` e `20260930023715_connections_service_role_select.sql` (correção de grant, aplicada em seguida).

---

## ADR-014 — Resultados: tabelas + séries em jsonb; escrita só pelo servidor

**Status:** Accepted (DB-Q3/DB-Q4)

- Entidades que se relacionam (`change_points`, `analysis_phases`, `evidence`) são tabelas; séries temporais grandes ficam em jsonb validado por Zod com `schema_version`.
- Clientes (`authenticated`) só têm `SELECT` em resultados. Inserir/alterar resultados e evidências é exclusivo do servidor.
- Todo uso do cliente admin valida ownership explicitamente (nunca confia só em IDs do cliente) e tem testes próprios.

---

## ADR-015 — Paywall nunca só na UI

**Status:** Accepted (requisito de segurança; reforçado em `docs/MONETIZATION.md` §5 e `docs/ARCHITECTURE.md` §9)

Resultados premium não podem ser recuperáveis pela API (PostgREST) antes do entitlement/unlock correspondente. Antes de qualquer ambiente com usuários reais e cobrança: predicado de unlock na RLS ou endpoint server-side, com teste de acesso direto retornando zero linhas para análise não desbloqueada (`docs/DATABASE.md` §9.1). Com os três produtos (Nós, Nossa História, Próximo Passo), o entitlement deve ser por produto.

---

## ADR-016 — Testes de RLS por integração contra o Supabase DEV

**Status:** Accepted (pragmática, revisitável)

Não há Docker/Supabase local neste ambiente, então os testes de isolamento (`npm run test:integration`) rodam contra o projeto DEV, com usuários descartáveis (`rls-*@example.invalid`) criados e removidos pelo próprio teste.

**Isto é uma decisão pragmática do ambiente atual e não torna o projeto permanentemente dependente de testes contra DEV remoto.** Deve ser revisitada quando houver Supabase local (Docker) ou CI com banco efêmero; nesse momento os mesmos testes passam a rodar contra o banco local e pgTAP pode ser considerado (DB-Q7).

- `npm test` (unitário) continua offline; o config unitário não inclui `tests/integration`.
- O setup carrega `.env.local` com `process.loadEnvFile` (com `NODE_ENV=test` o `@next/env` ignora `.env.local`).

---

## ADR-017 — Autenticação por link de e-mail (passwordless)

**Status:** Accepted

- Login por magic link/OTP de e-mail (`signInWithOtp`, `shouldCreateUser: true`). Google OAuth fora do EPIC 01.
- `/auth/confirm` valida `token_hash` com `verifyOtp({ type: "email" })` e redireciona para destino **fixo** (`/connections`); não existe parâmetro `next` (sem open redirect).
- `src/proxy.ts` (Next 16) renova a sessão e aplica um gate otimista (`resolveGate`). A autorização real é `requireUser()` (valida o token no Auth server) nas páginas, mais RLS nos dados.
- A resposta do login é a mesma exista ou não a conta (sem enumeração de usuários).
- Requisito de configuração no dashboard: template Magic Link apontando para `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`.
- Produção exigirá SMTP próprio (o SMTP padrão do Supabase tem limite baixo de envios).

---

## ADR-018 — Hierarquia de produtos: Nós, Nossa História, Próximo Passo

**Status:** Accepted (por `docs/PRODUCT.md`, CANONICAL, 2026-10-06)

- O produto principal e de aquisição é **Nós** (entender). **Nossa História** (reviver) e **Próximo Passo** (agir, só pós-Nós) são os outros dois.
- **"O Que Mudou?" deixa de ser produto**: é gancho de aquisição e possível seção do relatório do Nós.
- `docs/PRD.md` (v5.0) está **superado** e arquivado em `docs/archive/PRD_v5_superseded.md`.
- O objeto central continua **Connection** (ADR-005); produtos são experiências derivadas dela.
- Substitui ADR-002.

---

## ADR-019 — Governança dos docs: status e precedência

**Status:** Accepted

- Cada doc declara um status (CANONICAL, CANONICAL DIRECTION, STRATEGIC DIRECTION, DRAFT, EXPERIMENT; semântica em `docs/README.md`). Conteúdo DRAFT ou EXPERIMENT não autoriza implementação.
- Se docs canônicos conflitarem, **parar e reportar**; não resolver em silêncio. Conflitos conhecidos e decisões abertas ficam em `docs/OPEN_DECISIONS.md`.
- Produto e fluxos: `PRODUCT.md`/`PRODUCT_FLOWS.md`. Free Reveal: `FREE_REVEAL.md`. Retenção, limites de texto e derivados persistentes: `PRIVACY.md` e `RELATIONSHIP_SNAPSHOT.md` (os números do `DATABASE.md` §7.6 são propostas). Persistência e RLS: `DATABASE.md`. Histórico de decisões: este arquivo.

---

## ADR-020 — Conversa efêmera + Relationship Snapshot

**Status:** Accepted (direção; schema do snapshot depende de especificação própria)

**Decisão:** a conversa completa não é um ativo persistente do Vyerso. O Vyerso adota processamento efêmero do arquivo de conversa e persiste apenas resultados e derivados estruturados, deliberadamente não reconstruíveis, reunidos conceitualmente em um **Relationship Snapshot**.

Princípios:

- o raw permanece privado e temporário e é purgado após a conclusão segura do processamento necessário;
- não haverá tabela persistente com a conversa completa nem coleção de mensagens normalizadas no MVP;
- durante a janela em que o raw está disponível, o pipeline pode extrair artefatos necessários aos produtos conhecidos — Nós, Nossa História e Próximo Passo — mesmo que nem todos tenham sido comprados naquele momento;
- extrair um artefato não concede entitlement nem entrega o produto ao usuário;
- o Relationship Snapshot deve conter sinais, agregados, marcos, candidatos narrativos e evidências mínimas suficientes para experiências derivadas, mas nunca uma representação que permita reconstruir substancialmente a conversa;
- se um produto futuro exigir informação que o snapshot versionado não preservou, o comportamento correto é pedir novo upload, e não ampliar silenciosamente a retenção;
- o snapshot é versionado e sua composição é definida em `docs/RELATIONSHIP_SNAPSHOT.md`;
- `PRIVACY.md` governa limites de texto, retenção, redação e critérios de não reconstruibilidade.

**Referência de produto/privacidade:** a decisão é inspirada no princípio público adotado pelo ThirdPerson: processamento da conversa para gerar derivados e descarte posterior do chat, preservando resultados/contagens/trechos limitados. Isso é uma referência de direção, não uma afirmação sobre a arquitetura interna do ThirdPerson nem uma dependência técnica.

**Consequência aceita:** novas análises que precisem de sinais ausentes do snapshot podem exigir re-upload. Essa limitação é preferível à retenção indefinida de conversas privadas “para uso futuro”.

**Substitui/resolve:** a direção aberta descrita no ADR-012 e a lacuna de Nossa História registrada no DATABASE v0.4 passam a ser resolvidas por esta estratégia. Limites concretos e schema continuam pendentes até `RELATIONSHIP_SNAPSHOT.md`/`PRIVACY.md` serem aprovados.
- `PRODUCT_READINESS.md` é camada de status/índice: não define comportamento nem entra na precedência acima; é a fonte única do estado de maturidade (`ROADMAP.md` só guarda sequência e dependências).

---

## ADR-021 — Marca, arquitetura pública e funis independentes

**Status:** Accepted (direção). A formulação final da tese de marca segue aberta (OD-18).

- **Vyerso é a marca/plataforma** acima dos produtos. Nós (entender) e Nossa História (reviver) são produtos de entrada independentes, cada um com funil de aquisição próprio, sobre uma plataforma compartilhada (User/Connection → import → processamento → Relationship Snapshot). Não são duas aplicações nem duas marcas.
- **Superfície pública pretendida:** `vyerso.com.br` (Brand Home), `/nos` e `/nossa-historia` (landings de produto, responsáveis pela conversão do seu produto).
- **Roteamento por intenção:** conteúdo de um produto vai direto à sua landing, sem passar pela Home; tráfego sem intenção (bio, busca, indicação, domínio digitado) vai para a Home. Link inicial da bio: `vyerso.com.br`.
- **Navegação não é cross-sell:** uma landing vende o produto que trouxe a pessoa e não interrompe a narrativa para oferecer o outro.
- **Métricas separadas** em três dimensões (Brand, Nós, Nossa História), sem funil universal (`MONETIZATION.md` §6).
- **Connection é conceito de domínio, não necessariamente linguagem da interface.** Quando a conta nasce e se Connection aparece na UX está **adiado** (OD-20): ainda não há produto que se beneficie de login. As telas `/login` e `/connections` do EPIC 01 são andaime.
- A landing de Nossa História só pode ser feita depois da spec da experiência (`NOSSA_HISTORIA_SPEC.md`, OD-19); não inventar funcionalidades.

---

## ADR-022 — Free Reveal: só do Nós, depois da análise, subconjunto seguro

**Status:** Accepted (direção); conteúdo exato NEEDS DEFINITION (`docs/FREE_REVEAL.md`, OD-23).

- O Free Reveal é do **Nós**. Não é padrão universal de monetização: o preview e o momento de pagamento da Nossa História são indefinidos (OD-19).
- Ele acontece **depois** da análise completa, sobre o resultado congelado. Existe **uma única análise**; o Reveal é um subconjunto seguro dela, nunca um "algoritmo grátis" seguido de outro pago.
- Nenhum número artificial: só aparece o que for achado real do Analytics Engine.
- Sem teaser alarmista ou manipulador; linguagem de observação, não de veredito.
- **O premium nunca chega ao cliente sem entitlement:** o payload do Reveal é separado e a camada de dados sem entitlement só devolve o Reveal (reforça ADR-015). Esconder no React não é paywall.
