# Vyerso — Claude Code Instructions

Vyerso é um produto brasileiro que transforma históricos de conversa em experiências longitudinais explicáveis sobre uma relação. O produto principal e de aquisição é **Nós**; "O Que Mudou?" é gancho de aquisição, não produto (`docs/PRODUCT.md`, ADR-018).

## Leia antes de trabalhar

Comece por `docs/README.md` (ordem de leitura e semântica de status). Leia só o relevante:

- Produto e fluxos: `docs/PRODUCT.md`, `docs/PRODUCT_FLOWS.md`
- Arquitetura e segurança: `docs/ARCHITECTURE.md`
- Banco, migrations e RLS: `docs/DATABASE.md`
- Decisões já tomadas: `docs/DECISIONS.md`
- Decisões em aberto e conflitos: `docs/OPEN_DECISIONS.md`
- Estado de maturidade e próximo trabalho (fonte única de status): `docs/PRODUCT_READINESS.md`
- Sequência de EPICs: `docs/ROADMAP.md`
- Analytics: `docs/ANALYTICS_ENGINE.md` (DRAFT)
- Upload, retenção, LLM ou logs com dados de conversa: `docs/PRIVACY.md` (DRAFT)
- Derivados persistentes, retenção de texto e reuso entre produtos: `docs/RELATIONSHIP_SNAPSHOT.md` (DRAFT; leia antes de mexer em retenção do import, artefatos narrativos ou evidências)
- Monetização e paywall: `docs/MONETIZATION.md`; Free Reveal (só do Nós): `docs/FREE_REVEAL.md`
- Landings (`/nos`, Brand Home, `/nossa-historia`) e marketing: `docs/LANDING_BRIEF.md`, `docs/MARKETING.md`
- IA/Jev: `docs/AI_DECISION_LAYER.md` (EXPERIMENT)

Respeite o status de cada doc. DRAFT e EXPERIMENT não autorizam implementação. Se docs canônicos conflitarem, **pare e reporte** em vez de resolver em silêncio. `docs/archive/` é só histórico.

## Fase atual

EPIC 00 (Foundation) e EPIC 01 (Connection foundation) concluídos. Próximos passos e bloqueios: `docs/ROADMAP.md` e `docs/OPEN_DECISIONS.md`.

Não implementar analytics antes de `docs/ANALYTICS_ENGINE.md` estar definido, nem persistência de derivados por produto (M2/M3) antes de `docs/RELATIONSHIP_SNAPSHOT.md` aprovado, nem upload real em produção antes de `docs/PRIVACY.md` final. Não implementar features só porque aparecem em docs de estratégia.

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

## Como iniciar uma nova EPIC

Não comece implementando.

1. leia os docs relevantes e confira `docs/OPEN_DECISIONS.md` e `docs/ROADMAP.md`;
2. para modelagem, RLS, privacidade ou analytics, use o workflow rigoroso (ver "Superpowers usage");
3. proponha um plano pequeno e liste as decisões que dependem do dono do produto;
4. aguarde aprovação antes de decisões estruturais não documentadas.

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
