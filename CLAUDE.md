# Vyerso — Claude Code Instructions

Vyerso é um produto brasileiro que transforma históricos de conversa em análises longitudinais explicáveis. O primeiro produto é **O Que Mudou?**.

## Leia antes de trabalhar

Sempre leia:

- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`

Para trabalho analítico, leia também `docs/ANALYTICS_ENGINE.md` quando existir.
Para banco/migrations, leia `docs/DATABASE.md` quando existir.
Para upload, retenção, LLM ou logs com dados de conversa, leia `docs/PRIVACY.md` quando existir.

## Fase atual

Pré-implementação / Foundation.

O único produto autorizado para o MVP é **O Que Mudou?**.

Não implementar features de roadmap apenas porque aparecem no PRD.

## Stack aprovada

- Next.js
- TypeScript strict
- App Router
- Tailwind CSS
- Zod
- Vitest
- Supabase: Auth, PostgreSQL, Storage, RLS, migrations

## Princípios obrigatórios

- Business/analytics logic não vive em componentes React.
- Relationship/Connection engine deve ser testável sem Supabase, rede ou LLM.
- LLM não gera métricas determinísticas.
- Toda descoberta relevante deve ser rastreável a dados/período/evidência.
- Nunca logar conteúdo de conversa.
- Nunca usar Storage público para conversa.
- Nunca expor Supabase service role no cliente.
- Todo dado persistente do usuário deve ter autorização/RLS adequada.
- Não criar `messages` persistente em massa sem decisão documentada.
- Não escolher silenciosamente provider de LLM, pagamento, queue/job runner ou política de retenção.
- Não adicionar dependências sem necessidade concreta.
- Preferir soluções simples e reversíveis no MVP.
- Atualizar `docs/DECISIONS.md` para decisões arquiteturais significativas.

## Antes de codar uma task

1. confirme o objetivo e o escopo;
2. identifique docs relevantes;
3. indique migrations/dependências necessárias;
4. preserve compatibilidade com o MVP;
5. não amplie escopo sem autorização.

## Primeira missão

Não comece implementando features.

Primeiro:

1. audite criticamente `PRD.md` e `ARCHITECTURE.md`;
2. identifique riscos e decisões ainda abertas;
3. proponha um plano pequeno para **EPIC 00 — Foundation**;
4. explique qualquer alteração arquitetural sugerida;
5. aguarde aprovação antes de decisões estruturais não documentadas.

## Superpowers usage

Use rigorous planning / Superpowers workflows for:

- architectural changes
- database schema changes
- RLS and security
- privacy-sensitive flows
- analytics engine changes
- parser changes
- change/phase detection
- large refactors
- complex debugging

Do not introduce extended planning workflows for:

- trivial UI changes
- copy changes
- styling
- simple components
- mechanical refactors
- straightforward fixes

Prefer the smallest workflow appropriate to the task.

## Output discipline

Be concise in terminal responses.

- Do not narrate routine edits.
- Do not print file contents or diffs unless explicitly requested.
- Do not repeat tool output that is already visible.
- Do not provide long implementation summaries.
- After completing a task, report only:
  1. what was completed;
  2. important decisions or deviations;
  3. validation status;
  4. blockers or decisions required from the user.
- Keep completion summaries under 10 lines unless more detail is explicitly requested.
- If there are no blockers, stop after the summary.

@AGENTS.md
