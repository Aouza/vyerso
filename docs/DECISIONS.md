# Architecture Decision Records — Vyerso

Este arquivo registra decisões que devem sobreviver às sessões de desenvolvimento.

---

## ADR-001 — Nome do produto

**Status:** Accepted  
**Decisão:** o produto se chama **Vyerso**.

A marca, produtos e UX voltados ao usuário serão prioritariamente em PT-BR.

---

## ADR-002 — Produto inicial

**Status:** Accepted  
**Decisão:** o primeiro produto/MVP é **O Que Mudou?**.

Features futuras descritas no PRD não estão automaticamente autorizadas para implementação.

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

**Status:** Open

Ainda não foi decidido por quanto tempo arquivos `.txt` e mensagens normalizadas em texto puro serão armazenados.

Não assumir retenção indefinida. Definir em `PRIVACY.md` e `DATABASE.md` antes de produção.

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
- Env validada com Zod em `src/lib/env.ts`; `SUPABASE_SECRET_KEY (`sb_secret_…`, substitui o service role legado)` só é lido em `src/lib/env.server.ts` (`server-only`).
- Fixtures de conversa real são ignoradas pelo git (`tests/fixtures/whatsapp/real-*`).
