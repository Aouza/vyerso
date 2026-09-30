# Vyerso

Sua história está nas conversas. Primeiro produto: **O Que Mudou?**.

Leia `CLAUDE.md` e `docs/` (PRD, ARCHITECTURE, DATABASE, DECISIONS) antes de contribuir.

## Setup local

1. `npm install`
2. Crie `.env.local` (veja `.env.example`) com as chaves do projeto Supabase DEV:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY` (somente testes de integração; nunca no browser)
3. No dashboard do Supabase (Auth): habilite e-mail, Site URL `http://localhost:3000`, Redirect URL `http://localhost:3000/**` e ajuste o template Magic Link para
   `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`.
4. `npx supabase login` e `npx supabase link --project-ref <ref>`.
5. `npm run db:push` aplica as migrations de `supabase/migrations`.
6. `npm run dev`

## Scripts

| Script                            | O que faz                                             |
| --------------------------------- | ----------------------------------------------------- |
| `npm run check`                   | typecheck + lint + testes unitários (offline)         |
| `npm run test:integration`        | testes de RLS/queries contra o Supabase DEV (ADR-016) |
| `npm run db:new -- <nome>`        | cria migration                                        |
| `npm run db:push`                 | aplica migrations no projeto linkado                  |
| `npm run format` / `format:check` | Prettier                                              |
