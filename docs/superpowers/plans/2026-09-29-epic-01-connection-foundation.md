# EPIC 01 â€” Connection Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** UsuÃ¡rio autenticado cria e lista suas Connections, com ownership e RLS deny-by-default provados por testes de isolamento contra o Supabase DEV.

**Architecture:** Migration versionada (M1) cria apenas `public.connections`. Acesso do usuÃ¡rio sempre pelo cliente com sessÃ£o (anon key + cookies), portanto sob RLS. FunÃ§Ãµes de dados recebem o cliente como parÃ¢metro (testÃ¡veis sem Next). AutenticaÃ§Ã£o por link/OTP de e-mail via `@supabase/ssr` + `proxy.ts` (Next 16).

**Tech Stack:** Next 16 (App Router, `proxy.ts`), Supabase (Auth/Postgres/RLS), `@supabase/ssr` 0.12, `@supabase/supabase-js` 2.117, Zod 4, Vitest 5, Supabase CLI (devDependency, decisÃ£o D2).

**Spec:** `docs/DATABASE.md` v0.2 (Â§4 ownership, Â§5 RLS, Â§10.2 M1, Â§13) Â· `docs/ARCHITECTURE.md` Â§12/Â§19 Â· `docs/DECISIONS.md` ADR-003/005/011

## Global Constraints

- Escopo: **somente** auth, `connections`, ownership, RLS, testes de isolamento e criaÃ§Ã£o/listagem. Nada de participants, imports, Storage, analyses, evidence, billing, analytics, `profiles`.
- `connections` conforme DATABASE.md Â§10.2 M1: `id`, `owner_user_id not null default auth.uid() references auth.users on delete cascade`, `display_name` 1â€“80 chars, `context_type in ('partner','dating','ex')` nullable, `created_at`, `updated_at`, `unique (id, owner_user_id)`. **Sem** `known_date_range`/`last_analyzed_at`.
- `ENABLE` + `FORCE ROW LEVEL SECURITY`; `anon` sem nenhum privilÃ©gio; `authenticated` com privilÃ©gio mÃ­nimo por coluna/operaÃ§Ã£o; policies `TO authenticated` com `(select auth.uid())`.
- Hard delete em cascata; sem soft-delete.
- Service role **somente** em testes de integraÃ§Ã£o e `server-only`; nunca no browser; nenhum caminho de produto usa admin nesta epic.
- `src/domain/**` nÃ£o importa Supabase/Next/React (ADR-011). Esta epic nÃ£o cria cÃ³digo de domÃ­nio.
- Nunca logar conteÃºdo de conversa (nÃ£o hÃ¡ conteÃºdo nesta epic); nunca commitar `.env.local`.
- DependÃªncia nova sÃ³ com necessidade concreta: apenas `supabase` (CLI) como devDependency.
- Copy de UI em PT-BR, sem linguagem de CRM (PRD Â§4). Termo provisÃ³rio: "Suas histÃ³rias" (D3).
- Ler `node_modules/next/dist/docs/` antes de escrever cÃ³digo Next (AGENTS.md).
- Commits pequenos, um por task, com `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.

## Review Focus

Entradas/condiÃ§Ãµes que o spec nÃ£o cita e que mais provavelmente quebram:

1. **Nome com emoji/acentos no limite de 80**: Postgres `char_length` conta code points, JS `.length` conta UTF-16. Esperado: 80 emojis aceitos, 81 rejeitados, igual no Zod e no banco. â†’ Task 3 (unit) e Task 2 (banco).
2. **Nome sÃ³ com espaÃ§os / com espaÃ§os nas pontas**: rejeitar vazio apÃ³s `trim`; persistir jÃ¡ aparado. â†’ Task 3.
3. **UsuÃ¡rio sem nenhuma Connection**: lista vazia com estado vazio, nÃ£o erro. â†’ Task 5.
4. **Acesso sem sessÃ£o / sessÃ£o expirada** a `/connections`: redireciona para `/login`, sem erro 500 e sem vazar HTML de dados. â†’ Task 4.
5. **Link de confirmaÃ§Ã£o invÃ¡lido, expirado ou sem `token_hash`**: mensagem amigÃ¡vel e volta ao login; sem open redirect (nÃ£o hÃ¡ parÃ¢metro `next`). â†’ Task 4.
6. **Duplo clique em "Criar"**: botÃ£o desabilitado durante o envio; duplicatas de nome **sÃ£o permitidas** (duas pessoas podem ter o mesmo nome), entÃ£o a proteÃ§Ã£o Ã© sÃ³ de UI. â†’ Task 5.
7. **ExclusÃ£o do usuÃ¡rio** apaga suas connections (cascata). â†’ Task 2.

---

## DecisÃµes que dependem de aprovaÃ§Ã£o

**Todas aprovadas em 2026-09-29, com os ajustes abaixo.**

- **D1 â€” MÃ©todo de login (aprovado):** link/OTP por e-mail, sem senha. Google OAuth fora do EPIC 01. Limite do SMTP padrÃ£o do Supabase serve ao DEV; produÃ§Ã£o exigirÃ¡ SMTP prÃ³prio (ADR futura).
- **D2 â€” Infra de banco/testes sem Docker (aprovado com ressalva):** Supabase CLI como devDependency + `db push` para o DEV; testes de RLS como integraÃ§Ã£o contra o DEV (usuÃ¡rios descartÃ¡veis `rls-*@example.invalid`, removidos no `afterAll`). **Ã‰ uma decisÃ£o pragmÃ¡tica do ambiente atual, nÃ£o uma dependÃªncia permanente de testes contra DEV remoto**; deve ser registrada assim na ADR-016 e revisitada quando houver Docker/Supabase local ou CI. Desvio consciente de DB-Q7 (pgTAP local).
- **D3 â€” Nome na UI (alterado):** **"ConexÃµes" / "Nova conexÃ£o"**. NÃ£o usar "histÃ³ria" como sinÃ´nimo de Connection: "Nossa HistÃ³ria" pertence ao domÃ­nio dos produtos/relatÃ³rios. Isolado em `copy.ts`. Onde este plano diz "Suas histÃ³rias"/"Nova histÃ³ria", ler "ConexÃµes"/"Nova conexÃ£o".
- **D4 â€” Hardening global (aprovado):** `alter default privileges ... revoke all from anon, authenticated` na M1, para que toda tabela futura nasÃ§a deny-by-default.
- **D5 â€” Service role (verificaÃ§Ã£o pedida):** o service role **nÃ£o Ã© usado por nenhum fluxo do produto** no EPIC 01 (auth e Connection usam sessÃ£o + anon key + RLS). Uso concreto e **restrito aos testes de integraÃ§Ã£o**: criar/remover usuÃ¡rios de teste e verificar a cascata de exclusÃ£o â€” nÃ£o hÃ¡ como fazer isso sÃ³ com a anon key sem enviar e-mails reais. `env.server.ts` nÃ£o Ã© importado por cÃ³digo de produto.

## PrÃ©-requisitos (bloqueiam a Task 1)

- [ ] **P1.** `.env.local` **nÃ£o existe** neste diretÃ³rio (sÃ³ `.env.example`). Criar com `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` do projeto DEV (ou informar onde estÃ¡).
- [ ] **P2.** Docker **nÃ£o estÃ¡ instalado** â†’ sem Supabase local. Plano usa o projeto DEV remoto (D2).
- [ ] **P3.** Para `db push`: ref do projeto DEV, senha do banco e login do CLI (`! npx supabase login`, interativo, feito pelo usuÃ¡rio).
- [ ] **P4.** No dashboard DEV, o usuÃ¡rio configura: Auth â†’ Email habilitado; URL Configuration: Site URL `http://localhost:3000`, Redirect URL `http://localhost:3000/**`; template "Magic Link" com link `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`.
- [ ] **P5.** Housekeeping: commitar a alteraÃ§Ã£o pendente de `CLAUDE.md` (seÃ§Ã£o Output discipline) em commit prÃ³prio.

---

## File Structure

```text
supabase/config.toml                                   # gerado por `supabase init`
supabase/migrations/<ts>_connections.sql               # M1
src/proxy.ts                                           # refresh de sessÃ£o + gate otimista
src/lib/env.ts                                         # (existente) sem mudanÃ§as
src/infrastructure/supabase/proxy-client.ts            # cliente Supabase p/ request/response do proxy
src/features/auth/session.ts                           # requireUser() (getUser, autoritativo)
src/features/auth/actions.ts                           # signInWithEmail, signOut
src/features/auth/login-form.tsx                       # form client (useActionState)
src/app/login/page.tsx
src/app/auth/confirm/route.ts                          # verifyOtp(token_hash)
src/features/connections/schema.ts                     # Zod: entrada + linha do banco
src/features/connections/queries.ts                    # listConnections(client), createConnection(client, input)
src/features/connections/actions.ts                    # createConnectionAction
src/features/connections/copy.ts                       # textos PT-BR (D3)
src/app/(app)/layout.tsx                               # requireUser + header + sair
src/app/(app)/connections/page.tsx                     # lista
src/app/(app)/connections/new/page.tsx                 # criar
tests/integration/helpers/supabase.ts                  # admin, usuÃ¡rios de teste, clientes autenticados
tests/integration/connections.rls.test.ts
tests/integration/setup-env.ts                         # carrega .env.local
vitest.integration.config.mts
```

SeparaÃ§Ã£o de testes: `npm test` = unitÃ¡rio, offline. `npm run test:integration` = contra DEV, exige `.env.local`.

---

### Task 1: Supabase CLI e projeto versionado

**Files:**
- Modify: `package.json` (devDependency `supabase`, scripts `db:push`, `db:new`)
- Create: `supabase/config.toml` (via `supabase init`), `supabase/migrations/.gitkeep`

**Interfaces:**
- Produces: comandos `npm run db:new -- <name>` e `npm run db:push`.

- [ ] **Step 1:** `npm i -D supabase` (confirmar que baixa o binÃ¡rio no Windows).
- [ ] **Step 2:** `npx supabase init` (responder **nÃ£o** para VS Code/IntelliJ settings).
- [ ] **Step 3:** `npm pkg set scripts.db:new="supabase migration new" scripts.db:push="supabase db push"`.
- [ ] **Step 4:** UsuÃ¡rio roda `! npx supabase login`; depois `npx supabase link --project-ref <ref>` (pede a senha do banco).
- [ ] **Step 5:** `npx supabase migration list` â†’ deve conectar sem erro e listar 0 migrations locais/remotas. Se o DEV jÃ¡ tiver migrations, **parar** e reportar.
- [ ] **Step 6:** Commit: `chore(db): add supabase cli and project config`.

**Aceite:** `migration list` conecta ao DEV; `supabase/.temp` estÃ¡ no `.gitignore` (verificar; adicionar se nÃ£o estiver).

---

### Task 2: Migration M1 `connections` + testes de isolamento (TDD)

**Files:**
- Create: `vitest.integration.config.mts`, `tests/integration/setup-env.ts`, `tests/integration/helpers/supabase.ts`, `tests/integration/connections.rls.test.ts`, `supabase/migrations/<ts>_connections.sql`
- Modify: `package.json` (script `test:integration`)

**Interfaces:**
- Produces (`helpers/supabase.ts`):
  - `adminClient(): SupabaseClient`
  - `anonClient(): SupabaseClient`
  - `createTestUser(): Promise<{ id: string; email: string; client: SupabaseClient }>` â€” cliente jÃ¡ autenticado como o usuÃ¡rio
  - `deleteTestUser(id: string): Promise<void>`

- [ ] **Step 1: Config e helpers**

`vitest.integration.config.mts`:
```ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    environment: "node",
    include: ["tests/integration/**/*.test.ts"],
    setupFiles: ["tests/integration/setup-env.ts"],
    testTimeout: 30_000,
    fileParallelism: false,
  },
});
```
`tests/integration/setup-env.ts`:
```ts
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());
```
`tests/integration/helpers/supabase.ts`:
```ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const url = () => process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const service = () => process.env.SUPABASE_SERVICE_ROLE_KEY!;
const opts = { auth: { persistSession: false, autoRefreshToken: false } };

export const adminClient = () => createClient(url(), service(), opts);
export const anonClient = () => createClient(url(), anon(), opts);

export async function createTestUser() {
  const email = `rls-${randomUUID()}@example.invalid`;
  const admin = adminClient();
  const created = await admin.auth.admin.createUser({ email, email_confirm: true });
  if (created.error || !created.data.user) throw created.error ?? new Error("no user");
  const link = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (link.error) throw link.error;
  const client = anonClient();
  const session = await client.auth.verifyOtp({
    type: "magiclink",
    token_hash: link.data.properties.hashed_token,
  });
  if (session.error) throw session.error;
  return { id: created.data.user.id, email, client };
}

export const deleteTestUser = async (id: string) => {
  await adminClient().auth.admin.deleteUser(id);
};
```
- [ ] **Step 2: Escrever os testes (vÃ£o falhar: tabela nÃ£o existe)** em `tests/integration/connections.rls.test.ts`. Casos, cada um assertando o resultado exato:
  1. dono insere `{display_name:"Ana"}` e lÃª de volta; `owner_user_id === user.id` (default de `auth.uid()`).
  2. inserir com `owner_user_id` forjado (id de B) â†’ erro `42501` (coluna sem privilÃ©gio de INSERT).
  3. B faz `select` das connections de A â†’ `[]`; B `update` de linha de A â†’ 0 linhas afetadas e nome inalterado (verificado por A); B `delete` â†’ linha de A continua existindo.
  4. dono tenta `update({owner_user_id: outro})` â†’ erro `42501`.
  5. `anonClient().from("connections").select()` â†’ erro `42501`; `insert` â†’ `42501`.
  6. constraints: `display_name` `""` â†’ `23514`; 81 caracteres â†’ `23514`; 80 emojis (`"ðŸ˜€".repeat(80)`) â†’ aceito; 81 emojis â†’ `23514`; `context_type:"x"` â†’ `23514`; `context_type:"ex"` aceito.
  7. `updated_at` aumenta apÃ³s update do dono.
  8. `adminClient().auth.admin.deleteUser(A)` â†’ connections de A somem (contagem via admin = 0).
  9. `unique (id, owner_user_id)` existe: admin insere duas linhas com mesmo `id` â†’ erro `23505` (chave primÃ¡ria; garante que ids nÃ£o colidem entre donos).
  `beforeAll` cria usuÃ¡rios A e B; `afterAll` chama `deleteTestUser` para ambos.
- [ ] **Step 3:** `npm pkg set scripts.test:integration="vitest run --config vitest.integration.config.mts"` e rodar: esperado **FAIL** (`relation "public.connections" does not exist`).
- [ ] **Step 4: Migration** `npm run db:new -- connections` e preencher:
```sql
-- M1: connections (DATABASE.md Â§10.2). Deny-by-default.

-- Novas tabelas em public nÃ£o herdam grants para anon/authenticated.
alter default privileges in schema public revoke all on tables from anon, authenticated;

create function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end $$;
revoke all on function public.set_updated_at() from public, anon, authenticated;

create table public.connections (
  id            uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null default auth.uid()
                  references auth.users(id) on delete cascade,
  display_name  text not null check (char_length(display_name) between 1 and 80),
  context_type  text check (context_type in ('partner','dating','ex')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (id, owner_user_id)
);
create index connections_owner_created_idx
  on public.connections (owner_user_id, created_at desc);

create trigger connections_set_updated_at
  before update on public.connections
  for each row execute function public.set_updated_at();

alter table public.connections enable row level security;
alter table public.connections force row level security;

revoke all on public.connections from public, anon, authenticated;
grant select on public.connections to authenticated;
grant insert (display_name, context_type) on public.connections to authenticated;
grant update (display_name, context_type) on public.connections to authenticated;
grant delete on public.connections to authenticated;

create policy connections_select_own on public.connections
  for select to authenticated using (owner_user_id = (select auth.uid()));
create policy connections_insert_own on public.connections
  for insert to authenticated with check (owner_user_id = (select auth.uid()));
create policy connections_update_own on public.connections
  for update to authenticated
  using (owner_user_id = (select auth.uid()))
  with check (owner_user_id = (select auth.uid()));
create policy connections_delete_own on public.connections
  for delete to authenticated using (owner_user_id = (select auth.uid()));

-- Falha a migration se RLS nÃ£o estiver ativa e forÃ§ada.
do $$
begin
  if not exists (
    select 1 from pg_class
    where oid = 'public.connections'::regclass
      and relrowsecurity and relforcerowsecurity
  ) then raise exception 'RLS not enabled+forced on public.connections'; end if;
end $$;
```
- [ ] **Step 5:** `npm run db:push` (mostrar o SQL pendente e confirmar; Ã© o DEV).
- [ ] **Step 6:** `npm run test:integration` â†’ esperado **PASS** (9 casos). Se o caso 2 ou 4 falhar por outro cÃ³digo de erro, investigar o comportamento real do PostgREST antes de ajustar o teste.
- [ ] **Step 7:** Commit: `feat(db): add connections table with RLS and isolation tests`.

**Aceite:** todos os 9 casos passam; a migration aborta se RLS nÃ£o estiver forÃ§ada; `anon` sem acesso; nenhuma policy de escrita para `owner_user_id`.

---

### Task 3: Schema Zod da Connection

**Files:**
- Create: `src/features/connections/schema.ts`, `src/features/connections/schema.test.ts`

**Interfaces:**
- Produces:
  - `createConnectionInputSchema` â†’ `{ displayName: string; contextType?: "partner"|"dating"|"ex" }`
  - `type CreateConnectionInput`
  - `connectionRowSchema.transform(...)` â†’ `type Connection = { id: string; displayName: string; contextType: ContextType | null; createdAt: Date; updatedAt: Date }`

- [ ] **Step 1: Testes que falham** (`schema.test.ts`): `" Ana "` â†’ `"Ana"`; `"   "` â†’ erro; `""` â†’ erro; 80 emojis ok; 81 emojis erro; 80 `"a"` ok, 81 erro; `contextType:"ex"` ok; `"x"` erro; string vazia de contexto (`""`, vem de `<select>`) vira `undefined`; linha do banco `{id, display_name, context_type:null, created_at, updated_at}` â†’ `Connection` camelCase com `Date`.
- [ ] **Step 2:** `npx vitest run src/features/connections` â†’ FAIL (mÃ³dulo inexistente).
- [ ] **Step 3: Implementar.** Limite por **code points**: `[...s].length`.
```ts
import { z } from "zod";

export const CONTEXT_TYPES = ["partner", "dating", "ex"] as const;
export type ContextType = (typeof CONTEXT_TYPES)[number];

const codePoints = (s: string) => [...s].length;

export const createConnectionInputSchema = z.object({
  displayName: z
    .string()
    .trim()
    .refine((s) => codePoints(s) >= 1, "Informe um nome.")
    .refine((s) => codePoints(s) <= 80, "Use no mÃ¡ximo 80 caracteres."),
  contextType: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.enum(CONTEXT_TYPES).optional(),
  ),
});
export type CreateConnectionInput = z.infer<typeof createConnectionInputSchema>;

export const connectionRowSchema = z
  .object({
    id: z.uuid(),
    display_name: z.string(),
    context_type: z.enum(CONTEXT_TYPES).nullable(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
  })
  .transform((r) => ({
    id: r.id,
    displayName: r.display_name,
    contextType: r.context_type,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
export type Connection = z.output<typeof connectionRowSchema>;
```
- [ ] **Step 4:** testes passam; `npm run check` verde.
- [ ] **Step 5:** Commit: `feat(connections): add zod schemas`.

**Aceite:** limites idÃªnticos aos do banco (Task 2, caso 6).

---

### Task 4: AutenticaÃ§Ã£o (link por e-mail)

**Files:**
- Create: `src/infrastructure/supabase/proxy-client.ts`, `src/proxy.ts`, `src/features/auth/session.ts`, `src/features/auth/actions.ts`, `src/features/auth/login-form.tsx`, `src/app/login/page.tsx`, `src/app/auth/confirm/route.ts`, `src/features/auth/redirect.ts`, `src/features/auth/redirect.test.ts`
- Antes de codar: ler `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` e o guia de autenticaÃ§Ã£o em `01-app/02-guides/`.

**Interfaces:**
- Produces:
  - `requireUser(): Promise<{ id: string; email: string }>` â€” usa `supabase.auth.getUser()`; sem sessÃ£o faz `redirect("/login")`.
  - `resolveGate(pathname: string, hasSession: boolean): "allow" | "redirect-login" | "redirect-app"` (puro, testÃ¡vel)
  - `signInWithEmail(prev, formData)` e `signOut()` (Server Actions)

- [ ] **Step 1: Teste do gate puro** (`redirect.test.ts`): `/connections` e `/connections/new` sem sessÃ£o â†’ `redirect-login`; `/login` com sessÃ£o â†’ `redirect-app`; `/login` sem sessÃ£o â†’ `allow`; `/auth/confirm` sempre `allow`; `/` sempre `allow`.
- [ ] **Step 2:** rodar â†’ FAIL. Implementar `resolveGate` (rotas protegidas = prefixo `/connections`).
- [ ] **Step 3:** `proxy-client.ts` + `proxy.ts`: renova a sessÃ£o com `createServerClient` usando `request.cookies.getAll()` / `response.cookies.set`, lÃª claims com `supabase.auth.getClaims()`, aplica `resolveGate`. `matcher` exclui `_next/static`, `_next/image`, favicon. **O proxy Ã© gate otimista; a autorizaÃ§Ã£o real Ã© `requireUser()` nas pÃ¡ginas** (o proxy nÃ£o substitui RLS).
- [ ] **Step 4:** `session.ts` (`requireUser`), `actions.ts`:
  - `signInWithEmail`: valida e-mail com Zod; `supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })`; retorna estado `{ status: "sent" | "error", message }`. Mensagem de sucesso **idÃªntica** exista ou nÃ£o a conta (sem enumeraÃ§Ã£o). Nunca loga o e-mail.
  - `signOut`: `supabase.auth.signOut()` + `redirect("/login")`.
- [ ] **Step 5:** `login-form.tsx` (client, `useActionState`), `login/page.tsx`, botÃ£o desabilitado enquanto envia.
- [ ] **Step 6:** `auth/confirm/route.ts` (GET): lÃª `token_hash` e `type`; ausente ou `type !== "email"` â†’ redirect `/login?erro=link`; `verifyOtp({ type, token_hash })`; erro â†’ `/login?erro=link`; sucesso â†’ redirect fixo `/connections`. **Sem parÃ¢metro `next`.** `login/page.tsx` mostra "Link invÃ¡lido ou expirado. PeÃ§a um novo." quando `erro=link`.
- [ ] **Step 7:** `npm run check`. Smoke manual: subir `npm run dev`, pedir link, clicar, cair em `/connections`; abrir `/connections` em janela anÃ´nima â†’ `/login`; abrir link jÃ¡ usado â†’ mensagem amigÃ¡vel.
- [ ] **Step 8:** Commit: `feat(auth): email link sign-in with session proxy`.

**Aceite:** sem sessÃ£o nunca renderiza `/connections`; link invÃ¡lido/expirado/sem token nÃ£o gera 500; sem open redirect; sair encerra a sessÃ£o; sucesso do login nÃ£o revela se o e-mail existia.

---

### Task 5: Criar e listar Connections

**Files:**
- Create: `src/features/connections/queries.ts`, `src/features/connections/actions.ts`, `src/features/connections/copy.ts`, `src/app/(app)/layout.tsx`, `src/app/(app)/connections/page.tsx`, `src/app/(app)/connections/new/page.tsx`, `src/features/connections/create-form.tsx`
- Modify: `src/app/page.tsx` (link "Entrar" / "Suas histÃ³rias" conforme sessÃ£o â€” opcional mÃ­nimo), `tests/integration/connections.rls.test.ts` (novos casos)

**Interfaces:**
- Consumes: `Connection`, `createConnectionInputSchema`, `connectionRowSchema` (Task 3); `requireUser` (Task 4); `createSupabaseServerClient` (Foundation).
- Produces:
  - `listConnections(client: SupabaseClient): Promise<Connection[]>` â€” `order by created_at desc`; erro do Supabase Ã© lanÃ§ado, sem incluir dados no erro.
  - `createConnection(client: SupabaseClient, input: CreateConnectionInput): Promise<Connection>` â€” **nÃ£o envia `owner_user_id`**; o banco define.
  - `createConnectionAction(prev, formData)` â€” valida com Zod; em sucesso `redirect("/connections")`; erros de campo devolvidos ao form.

- [ ] **Step 1: Testes de integraÃ§Ã£o que falham** (acrescentar em `connections.rls.test.ts` ou novo `connections.queries.test.ts`): `createConnection(A.client, {displayName:"Ana"})` retorna `Connection` com `displayName:"Ana"`; `listConnections(A.client)` contÃ©m e `listConnections(B.client)` **nÃ£o** contÃ©m; usuÃ¡rio novo â†’ `[]`; ordem decrescente por `createdAt` apÃ³s duas criaÃ§Ãµes.
- [ ] **Step 2:** rodar â†’ FAIL. Implementar `queries.ts` (`select("id, display_name, context_type, created_at, updated_at")`, parse com `connectionRowSchema`).
- [ ] **Step 3:** `actions.ts` + `create-form.tsx` (client, `useActionState`, botÃ£o desabilitado com `useFormStatus`, campos: nome e contexto opcional com opÃ§Ãµes "Sem contexto / Parceiro(a) / Conversando / Ex", erro por campo).
- [ ] **Step 4:** `(app)/layout.tsx` chama `requireUser()`, mostra cabeÃ§alho com e-mail e botÃ£o "Sair". `connections/page.tsx` lista (estado vazio: "VocÃª ainda nÃ£o tem histÃ³rias. Crie a primeira.") com link para `/connections/new`. Textos em `copy.ts`.
- [ ] **Step 5:** `npm run check` e `npm run test:integration` verdes.
- [ ] **Step 6:** Smoke manual: criar duas histÃ³rias (uma com 80 emojis), ver ordem, criar com nome vazio (erro de campo), segundo usuÃ¡rio nÃ£o vÃª as do primeiro.
- [ ] **Step 7:** Commit: `feat(connections): create and list connections`.

**Aceite:** criaÃ§Ã£o e listagem funcionam sob RLS com o cliente do usuÃ¡rio; nenhum cÃ³digo de produto usa service role; estado vazio; validaÃ§Ã£o idÃªntica ao banco.

---

### Task 6: DocumentaÃ§Ã£o e verificaÃ§Ã£o final

**Files:**
- Modify: `docs/DECISIONS.md` (ADR-013), `docs/DATABASE.md` (histÃ³rico Â§14 + DB-Q7 resolvido), `README.md` (setup dev), `.env.example` (sem mudanÃ§as de chaves; comentÃ¡rio)

- [ ] **Step 1:** ADR-013 â€” ownership denormalizado + RLS deny-by-default + default privileges revogados; nota de M1 aplicada. ADR-016 â€” testes de RLS por integraÃ§Ã£o contra Supabase DEV (sem Docker), substituindo pgTAP planejado em DB-Q7; e ADR de auth por link de e-mail (D1).
- [ ] **Step 2:** `README.md`: passos P1â€“P4, scripts (`check`, `test:integration`, `db:push`).
- [ ] **Step 3:** Rodar `superpowers:verification-before-completion`: `npm run check`, `npm run format:check`, `npm run test:integration`, `npm run build`; confirmar `git status` limpo.
- [ ] **Step 4:** Commit: `docs: record EPIC 01 decisions`. Depois, `superpowers:requesting-code-review` sobre o branch (foco: RLS, grants, proxy, redirects).

**CritÃ©rios de aceitaÃ§Ã£o da EPIC 01 (checklist final)**

- [ ] `connections` existe no DEV via migration versionada; RLS `ENABLE+FORCE`; `anon` sem privilÃ©gios.
- [ ] UsuÃ¡rio A nÃ£o lÃª/insere/altera/apaga dados de B (testes 1â€“5, 8).
- [ ] `owner_user_id` nÃ£o pode ser forjado nem alterado pelo cliente.
- [ ] Login por link funciona; `/connections` exige sessÃ£o; logout funciona.
- [ ] Criar e listar Connection funcionam; estado vazio; validaÃ§Ã£o Zod = constraints do banco.
- [ ] `npm run check`, `test:integration` e `build` verdes; nenhum segredo commitado; sem uso de service role fora dos testes.

---

## Self-Review

- **Cobertura do spec:** DATABASE.md Â§4 (ownership â†’ Task 2 FK/unique/default), Â§5 (RLS/grants â†’ Task 2), Â§10.2 M1 â†’ Task 2, Â§13 itens 1â€“5 â†’ Tasks 1â€“6; DB-Q7 tratado com desvio (D2). Sem tabelas fora do M1.
- **Placeholders:** SQL, helpers, schema e testes tÃªm cÃ³digo; Tasks 4â€“5 descrevem UI/proxy sem colar todo o TSX porque dependem de ler a doc do Next 16 instalada (AGENTS.md); os contratos (assinaturas) estÃ£o fixados em **Interfaces**.
- **ConsistÃªncia de tipos:** `Connection`, `CreateConnectionInput`, `listConnections`, `createConnection`, `requireUser`, `resolveGate` usados com os mesmos nomes nas Tasks 3â€“5.
- **Review Focus:** itens 1â€“2 â†’ Task 3; 1, 7 â†’ Task 2; 3, 6 â†’ Task 5; 4â€“5 â†’ Task 4.

