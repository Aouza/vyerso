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
- Env validada com Zod em `src/lib/env.ts`; `SUPABASE_SECRET_KEY` (`sb_secret_…`, substitui o service role legado) só é lido em `src/lib/env.server.ts` (`server-only`).
- Fixtures de conversa real são ignoradas pelo git (`tests/fixtures/whatsapp/real-*`).

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
