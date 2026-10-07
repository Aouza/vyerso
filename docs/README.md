# Vyerso Documentation

Index of the documents under `docs/`. Statuses are defined below.

## Reading order for coding agents
1. `PRODUCT.md` — what Vyerso is and canonical product semantics.
2. `PRODUCT_FLOWS.md` — user journeys and offer routing.
3. `ARCHITECTURE.md` — technical boundaries and system direction.
4. `DATABASE.md` — persistence, ownership and RLS (approved; M1 implemented).
5. `DECISIONS.md` — ADR history (what was decided and why).
6. `OPEN_DECISIONS.md` — open decisions and known conflicts between docs. **Check before starting any work.**
7. `PRODUCT_READINESS.md` — maturity map: what is defined, incomplete, blocked, and what Product works on next (status layer; not part of the precedence chain).
8. `ROADMAP.md` — EPIC sequence and dependencies (status lives in `PRODUCT_READINESS.md`).
9. `ANALYTICS_ENGINE.md` — analytics contract; currently draft and intentionally incomplete.
10. `PRIVACY.md` — data minimization/retention constraints (owns the final retention numbers).
11. `RELATIONSHIP_SNAPSHOT.md` — boundary between the ephemeral conversation and persistent cross-product derivatives (DRAFT, required before M2/M3 product-derived persistence).
12. `MONETIZATION.md` — commercial rules and separation from analytics.
13. `FREE_REVEAL.md` — the Nós-only free demonstration: principles and position in the funnel (contents NEEDS DEFINITION).
14. `AI_DECISION_LAYER.md` — experimental Jev/AI decision-layer direction.
15. `MARKETING.md` — acquisition positioning and hypotheses.
16. `LANDING_BRIEF.md` — landing page goal, structure and allowed claims.
17. `archive/` — superseded documents, history only (`PRD_v5_superseded.md`).

## Precedence (ADR-019)
Product semantics: `PRODUCT.md`/`PRODUCT_FLOWS.md`. Retention, text limits and persistent derivatives: `PRIVACY.md` and `RELATIONSHIP_SNAPSHOT.md`. Persistence and RLS: `DATABASE.md`. If canonical docs conflict, stop and report in `OPEN_DECISIONS.md`.

## Status semantics
- **CANONICAL:** binding product/architecture decision.
- **CANONICAL DIRECTION:** binding principle; implementation details may evolve.
- **STRATEGIC DIRECTION:** approved strategy but individual tactics require experimentation.
- **DRAFT:** incomplete; agents must not invent missing decisions.
- **EXPERIMENT:** hypothesis/POC only; not authorization to implement in production.

## Suggested CLAUDE.md / AGENTS.md instruction
```md
## Vyerso canonical docs
Before implementing product behavior, read only the relevant documents under `docs/`:
- Product semantics: `docs/PRODUCT.md`
- User/product flows: `docs/PRODUCT_FLOWS.md`
- Architecture/security: `docs/ARCHITECTURE.md`
- Analytics work: `docs/ANALYTICS_ENGINE.md`
- Persistence/RLS: `docs/DATABASE.md`; decisions: `docs/DECISIONS.md`; open items: `docs/OPEN_DECISIONS.md`; status/next work: `docs/PRODUCT_READINESS.md`; sequence: `docs/ROADMAP.md`
- Privacy/data retention: `docs/PRIVACY.md`; persistent derivatives: `docs/RELATIONSHIP_SNAPSHOT.md`
- Monetization/paywall/offers: `docs/MONETIZATION.md`; Free Reveal: `docs/FREE_REVEAL.md`
- AI/Jev work: `docs/AI_DECISION_LAYER.md`
- Marketing/growth work: `docs/MARKETING.md`

Respect each document's status. DRAFT and EXPERIMENT content is not an implementation requirement. If canonical docs conflict, stop and report the conflict instead of resolving it silently.
```


## Relationship Snapshot
`RELATIONSHIP_SNAPSHOT.md` defines the privacy/architecture boundary between the ephemeral conversation and persistent cross-product derivatives. Agents must read it before changing import retention, narrative artifact persistence, evidence limits, or multi-product reuse.
