# Vyerso — Decisões em aberto e conflitos entre docs

**Status:** CANONICAL (registro vivo)  
**Owner:** Product + Engineering  
**Última atualização:** 2026-10-07

## Como usar
- Este arquivo reúne, num só lugar, o que os outros docs deixam como TBD/DRAFT e os conflitos entre eles (regra: conflito entre docs canônicos = parar e reportar, ADR-019).
- Quando uma decisão for tomada: registrar a ADR em `DECISIONS.md`, atualizar o doc de origem e marcar aqui como **Decidida** (não apagar a linha).
- Agentes: não resolver itens abertos por conta própria; propor opções e esperar aprovação.
- O **estado de maturidade** (o que está pronto, em definição ou bloqueado) vive em `PRODUCT_READINESS.md`; este arquivo é só o registro das decisões.

## 1. Decisões em aberto

| ID | Decisão | Doc de origem | Bloqueia | Recomendação / opções |
|---|---|---|---|---|
| **OD-01** | ~~Nossa História × retenção~~ | `DECISIONS.md` ADR-020, `RELATIONSHIP_SNAPSHOT.md` | — | **Decidida (direção, 2026-10-06):** conversa efêmera + **Relationship Snapshot** versionado e não reconstruível; produto que precisar de dado ausente do snapshot exige re-upload. O schema continua bloqueado: ver OD-16. |
| **OD-02** | Definições do engine: sessão, iniciativa, latência, baseline, mudança significativa, persistência, confiança, fases, evidência, suficiência (13 perguntas). | `ANALYTICS_ENGINE.md` §4 | EPIC 03 e 04 (nenhum código analítico antes) | Escrever `ANALYTICS_ENGINE` v1 junto com os datasets sintéticos de §5 (verdade conhecida). |
| **OD-03** | Privacidade final: base legal LGPD e dados de terceiros, dados sensíveis, limites de excertos, cifra por coluna, exclusão só dos excertos, expiração por inatividade, backups/PITR, processadores. | `PRIVACY.md` §7 | Upload real em produção; copy de privacidade da landing | Fechar o `PRIVACY.md` com revisão jurídica antes do primeiro upload real. A redação no navegador antes do upload é direção a investigar (`PRIVACY.md` §8), ainda não é capacidade do produto. A revisão deve cobrir também o **pré-processamento para produtos ainda não comprados** (finalidade e minimização na LGPD). |
| **OD-04** | Provedor de LLM e que dados ele pode receber. | `DECISIONS.md` ADR-008, `PRIVACY.md` §4 | Camada narrativa | Padrão: agregados/estruturados, nunca excertos sem decisão explícita. |
| **OD-05** | Jev como camada de decisão probabilística (POC com datasets sintéticos, PT-BR, calibração, custo). | `AI_DECISION_LAYER.md` | Nada hoje (EXPERIMENT) | Só adotar se melhorar confiabilidade o bastante para justificar a dependência; manter fronteira de provider. |
| **OD-06** | Provedor de pagamento e schema de entitlement **por produto** (Nós, Nossa História, Próximo Passo, bundle). | `DECISIONS.md` ADR-009/015, `MONETIZATION.md` | EPIC 05 (paywall) | Pix é essencial no Brasil. Entitlement por produto, com enforcement na camada de dados. |
| **OD-07** | Job runner / processamento assíncrono (e varredura de purga do bruto). | `DECISIONS.md` ADR-010, `ARCHITECTURE.md` §10 | Imports grandes; purga automática | Medir primeiro o tempo do engine em arquivo grande; só então escolher. |
| **OD-08** | Preços (a profundidade e o conteúdo do Free Reveal agora são OD-23). | `MONETIZATION.md` §4–5 | Landing (não mostrar preço), EPIC 05 | Testar. Não fixar preço em lógica. |
| **OD-09** | Postura sobre assinatura. O PRD antigo dizia "não no MVP"; os docs novos são omissos. | `archive/PRD_v5_superseded.md`, `MONETIZATION.md` | Copy de FAQ da landing | Decidir ou não afirmar nada sobre assinatura. |
| **OD-10** | Fontes de conversa além do `.txt` do WhatsApp (Instagram etc.). | (nenhum doc novo) | Copy da landing | Landing diz só WhatsApp até haver decisão. |
| **OD-11** | Onde guardar os e-mails da lista de espera, por **produto de interesse** e **página de origem** (home, `/nos`, `/nossa-historia`). | `LANDING_BRIEF.md` | Implementação da landing | (1) tabela Supabase escrita só pelo servidor (recomendado); (2) insert direto por `anon`; (3) serviço externo. Exige decisão sobre uso da secret key num fluxo de produto e base legal LGPD. |
| **OD-12** | SMTP próprio para o magic link em produção (o padrão do Supabase tem limite baixo). | `DECISIONS.md` ADR-017 | Auth em produção | Provedor transacional + domínio verificado. |
| **OD-13** | Nome "Nós" (palavra comum: SEO, marca registrada) e disponibilidade de `vyerso.com.br` e das rotas `/nos`, `/nossa-historia`. | `PRODUCT.md` | Marca/landing | Verificar disponibilidade antes de investir em aquisição. |
| **OD-14** | Política de segurança para situações interpessoais graves (escalonamento e limites). | `PRODUCT_FLOWS.md` §5 | Lançamento público | Definir copy e limites antes do lançamento. |
| **OD-15** | Supabase local/CI para os testes de RLS (hoje contra o DEV). | `DECISIONS.md` ADR-016 | Nada hoje | Revisitar quando houver Docker ou CI com banco efêmero. |
| **OD-16** | Especificar o Relationship Snapshot: experiência exata da Nossa História (artefatos mínimos), teto de texto por análise/conexão, adjacência/separação, acúmulo em re-uploads, campos de texto livre permitidos, expiração de artefatos narrativos, entidade própria vs. `evidence_excerpts`, jsonb limitado vs. tabelas, escopo da redação no navegador. | `RELATIONSHIP_SNAPSHOT.md` §9–10, `PRIVACY.md` §7–10 | M2/M3 com persistência derivada por produto; EPIC 02 em diante | Fechar `RELATIONSHIP_SNAPSHOT.md` + `PRIVACY.md` com critérios **testáveis** de não reconstrução antes de qualquer schema narrativo. |
| **OD-17** | **O schema de resultados do Nós (M3: `analyses`, métricas, fases, `change_points`, `evidence`, `evidence_excerpts`) também espera o contrato do snapshot?** O `PRIVACY.md` §10 exige o contrato "antes de M2/M3 introduzirem persistência derivada por produto", o que é ambíguo para o Nós. | `PRIVACY.md` §10, `DATABASE.md` §15, `ADR-020` | Início do M3 / EPIC 04 | **Proposta (a decidir):** M2 não espera. No M3, as tabelas sem texto (`analyses`, métricas, fases, `change_points`, `evidence` agregada) podem começar; `evidence_excerpts` e qualquer artefato narrativo esperam o contrato (tetos de texto, adjacência, acúmulo). |
| **OD-18** | Formulação final da **tese de marca** do Vyerso (território mais amplo que Nós ou Nossa História). | `MARKETING.md` §1.1, ADR-021 | Copy da Brand Home | Direção decidida; o texto pode evoluir. |
| **OD-19** | **Modelo comercial da Nossa História:** experiência detalhada, teaser/preview, momento do pagamento e entrega. Não assumir Free Reveal → paywall. | `PRODUCT_FLOWS.md` §3.1, `PRODUCT_READINESS.md` | Landing `/nossa-historia`, EPIC 07 | Criar `NOSSA_HISTORIA_SPEC.md` primeiro. |
| **OD-20** | **Conta, login e onboarding:** quando a conta nasce (antes do import ou sessão anônima) e se Connection aparece na interface. | `PRODUCT_FLOWS.md` §0.4, ADR-021 | Onboarding do import | **Adiado de propósito** (⚪): ainda não há produto que se beneficie de login. Reabrir quando import e análise existirem. O modelo atual exige dono (`owner_user_id`). |
| **OD-21** | Ferramenta de **analytics de produto** para os três funis (Brand, Nós, Nossa História), sem nunca receber dado de conversa. | `MONETIZATION.md` §6, `PRIVACY.md` §5 | Medição de aquisição | Decidir antes do primeiro tráfego pago. |
| **OD-22** | Estrutura final das rotas públicas e do deploy (domínio, `/`, `/nos`, `/nossa-historia`, separação da área logada). | `ARCHITECTURE.md` §13 | Implementação de landings | Direção em ADR-021; detalhes na implementação. |
| **OD-23** | **Conteúdo exato do Free Reveal do Nós:** cards, métricas e insights, regra do insight limitado, casos de borda (estável, ambíguo, insuficiente) e payload de `reveal_summary`. | `FREE_REVEAL.md` §8 | EPIC 05; alinhamento da landing | Definir depois do Analytics v1 (OD-02). |

## 2. Conflitos e inconsistências entre docs

| ID | Conflito | Estado |
|---|---|---|
| **C-01** | `CLAUDE.md` apontava para docs removidos e dizia que o único produto era "O Que Mudou?", contra `PRODUCT.md` (Nós). | **Resolvido** em 2026-10-06 (CLAUDE.md atualizado; ADR-018). |
| **C-02** | `ARCHITECTURE.md` §12 dizia que o EPIC 01 dependia de configuração do Supabase. | **Resolvido** (EPIC 01 concluído; §12 atualizado). |
| **C-03** | `DATABASE.md` e `DECISIONS.md` apagados do working tree sem substituto. | **Resolvido**: restaurados e alinhados; PRD arquivado. |
| **C-04** | A copy da landing afirmava "apagado em até 7 dias", "sem assinatura", "Instagram em breve" e "excluir conta inteira" como fatos. | **Resolvido** na copy (placeholders/remoção); regra em `LANDING_BRIEF.md` §4. |
| **C-05** | Estados da análise: `pending` (ARCHITECTURE §10) vs `queued` (DATABASE). | **Aberto**, baixa prioridade: fixar os nomes na M3. |
| **C-06** | Limites de excertos aparecem em `DATABASE.md` §7.6 e em `PRIVACY.md` §2 (DRAFT). | **Regra:** `PRIVACY.md` manda; só o teto de 280 caracteres vira `CHECK` por ora. |
| **C-07** | O pacote `docs/updated/` estava atrás do `docs/` em alguns pontos (estado do EPIC 01, índice, ponteiro do DATABASE) e à frente em outros (ADR-020, Relationship Snapshot, PRIVACY §2/§7/§8/§10). | **Resolvido** em 2026-10-06: conteúdo de `updated/` incorporado ao `docs/` preservando o que estava mais novo aqui; a pasta `updated/` foi removida em 2026-10-07. |
| **C-08** | Os docs não tinham Brand Home, roteamento por intenção, métricas separadas por funil nem Free Reveal próprio. | **Resolvido** em 2026-10-07 (ADR-021/022; `PRODUCT_FLOWS` §0, `MARKETING` §9, `MONETIZATION` §5–6, `ARCHITECTURE` §13, `FREE_REVEAL.md`). |
| **C-09** | O design da landing `/nos` (seção "Prévia gratuita") mostra de graça uma descoberta completa (o que mudou, magnitude, duração, sinais juntos) e a linha do tempo de fases, mais do que `FREE_REVEAL.md` §4 reserva ao premium. | **Resolvido** em 2026-10-07: a seção "Prévia gratuita" foi refeita no design só com prova de processamento, uma observação neutra, a contagem de períodos e o restante bloqueado. |
| **C-10** | `PRODUCT.md` (canônico, do dono do produto) não tem a camada de marca nem a nota "Connection é domínio, não linguagem de UI". | **Resolvido** em 2026-10-07: dono do produto aprovou; camada de marca (§2.1), Connection como domínio e Free Reveal do Nós adicionados ao `PRODUCT.md`. |
