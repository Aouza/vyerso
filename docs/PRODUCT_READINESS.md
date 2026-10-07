# Vyerso — Product Readiness

**Status:** CANONICAL — living document (status layer, not part of the precedence chain)  
**Owner:** Product  
**Last updated:** 2026-10-07

## Purpose
This document tracks the **maturity** of Vyerso's product and architecture areas. It is the **single source of status**.

It does not define product behavior. Canonical decisions stay in their documents (`PRODUCT.md`, `ARCHITECTURE.md`, `DATABASE.md`, `PRIVACY.md`, ...). `ROADMAP.md` holds the EPIC sequence and dependencies (no status). `OPEN_DECISIONS.md` holds the decision register (OD-xx).

It answers:
- What is already defined?
- What is incomplete?
- What blocks implementation?
- What should Product work on next?

**"Concept defined" does not mean "ready to implement".** Each product is tracked across dimensions (concept → experience → data → schema → implemented).

## Status legend
| Tag | Meaning |
|---|---|
| 🟢 `READY` | Sufficiently defined for the current stage. |
| 🟡 `NEEDS_DEFINITION` | Direction exists; important product/technical decisions remain. |
| 🧪 `EXPERIMENT` | Hypothesis under evaluation. Not a production dependency. |
| ⚪ `OPEN_BY_DESIGN` | Intentionally deferred until needed. Has a trigger ("decide before ...") |
| 🔴 `BLOCKED` | A required decision prevents planned implementation. |
| ✅ `DONE` | Implemented and verified. |
| — | Not started / not applicable. |

## 1. Products by dimension

| Dimension | Nós | Nossa História | Próximo Passo |
|---|---|---|---|
| Concept | 🟢 `PRODUCT.md` | 🟢 `PRODUCT.md` | 🟢 `PRODUCT.md` |
| Role in portfolio | 🟢 primary / acquisition | 🟢 narrative; direct or post-Nós | 🟢 contextual, post-Nós only |
| Commercial flow | 🟢 `PRODUCT_FLOWS.md` (price ⚪) | 🟢 two entry modes (price ⚪) | 🟢 only when findings justify it |
| Experience | 🟡 report content and Free Reveal contents (`FREE_REVEAL.md`, OD-23) depend on analytics | 🟡 no spec → `NOSSA_HISTORIA_SPEC.md` | 🟡 detail after Nós outputs exist; safety policy (OD-14) |
| Data needs | 🟡 `ANALYTICS_ENGINE.md` v1 (OD-02) | 🟡 follows the experience spec | 🟡 consumes the finalized Nós result |
| Schema | 🟡 M3 approved in `DATABASE.md`; evidence-excerpt ceilings pending (OD-16/OD-17) | 🔴 blocked by experience + snapshot contract | ⚪ none expected (reads Nós result) |
| Implemented | — (only the Connection foundation, see §2) | — | — |

## 2. Platform and cross-cutting areas

| Area | Status | Source of truth | Next action | Decides |
|---|---|---|---|---|
| Vision, portfolio, flows | 🟢 | `PRODUCT.md`, `PRODUCT_FLOWS.md` | — | Product |
| Monetization strategy | 🟢 | `MONETIZATION.md` | Validate pricing later (OD-08) | Product |
| Marketing / positioning | 🟢 | `MARKETING.md` | Validate acquisition hypotheses | Product |
| Macro architecture | 🟢 | `ARCHITECTURE.md` | — | Eng |
| Connection foundation (auth, `connections`, RLS, create/list) | ✅ | `DATABASE.md` M1, ADR-013/016/017 | Production SMTP before launch (OD-12) | Eng |
| Persistence/RLS design (M2: participants, imports, Storage) | 🟢 | `DATABASE.md` | Plan EPIC 02 | Eng |
| Persistence design (M3: Nós results) | 🟡 | `DATABASE.md`, `PRIVACY.md` | Decide whether M3 tables without text can start before the snapshot contract (OD-17) | Product + Eng |
| Ephemeral privacy strategy | 🟢 | ADR-020, `PRIVACY.md` | — | Product |
| Final privacy policy (LGPD basis, limits, deletion, backups) | 🔴 for production uploads | `PRIVACY.md` (DRAFT) | Close with legal review (OD-03) | Product + Legal |
| Relationship Snapshot principle | 🟢 | ADR-020, `RELATIONSHIP_SNAPSHOT.md` | — | Product |
| Relationship Snapshot contract | 🟡 | `RELATIONSHIP_SNAPSHOT.md` (DRAFT) | Define after Nossa História spec + Analytics v1 (OD-16) | Product + Eng + Privacy |
| Analytics Engine | 🟡 | `ANALYTICS_ENGINE.md` (DRAFT) | Resolve the 13 definitions (OD-02) | Product + Eng |
| Paywall requirement (never UI-only) | 🟢 | ADR-015, `MONETIZATION.md` | — | Eng |
| Payment provider and entitlement schema (per product) | ⚪ | ADR-009, OD-06 | Decide before EPIC 05 | Product |
| LLM provider | ⚪ | ADR-008, OD-04 | Decide before the narrative layer | Product |
| Job runner / async pipeline | ⚪ | ADR-010, OD-07 | Measure engine time first | Eng |
| Client-side PII redaction | 🧪 | `PRIVACY.md` §8 | Investigate feasibility; not a product claim yet | Eng |
| Jev decision layer | 🧪 | `AI_DECISION_LAYER.md` | POC on synthetic datasets | Product + Eng |
| Brand Home (`/`) | 🟡 | `PRODUCT_FLOWS.md` §0, `MARKETING.md` §9, ADR-021 | Settle the brand thesis (OD-18); show Nossa História only as "coming soon" | Product |
| Nós landing (`/nos`) + waitlist | 🟡 | `LANDING_BRIEF.md` | Decide waitlist storage per interest/origin (OD-11); the free-preview section already follows `FREE_REVEAL.md` | Product |
| Nossa História landing (`/nossa-historia`) | 🔴 | `LANDING_BRIEF.md` §8 | Blocked by `NOSSA_HISTORIA_SPEC.md` and OD-19 | Product |
| Free Reveal (Nós only) | 🟡 principles 🟢 | `FREE_REVEAL.md`, ADR-022 | Define contents after Analytics v1 (OD-23) | Product |
| Account / login / onboarding | ⚪ | ADR-021, OD-20 | Deferred on purpose: no product benefits from login yet; revisit when import/analysis exist | Product |
| Product analytics for the three funnels | ⚪ | `MONETIZATION.md` §6, OD-21 | Decide before the first paid traffic; never receives conversation data | Eng + Product |
| Brand name "Nós" (SEO, domain, trademark) | 🟡 | OD-13 | Check availability | Product |
| Safety policy for severe interpersonal situations | 🟡 | `PRODUCT_FLOWS.md` §5, OD-14 | Define before public launch | Product |
| RLS test infrastructure (local/CI) | ⚪ | ADR-016, OD-15 | Revisit when Docker/CI exists | Eng |

## 3. Critical path

```text
PRODUCT TRACK                        ANALYTICS TRACK

NOSSA_HISTORIA_SPEC                  ANALYTICS_ENGINE v1
        │                                   │
        ▼                                   ▼
data needed by the experience        metrics / phases / evidence
        │                                   │
        └──────────────┬────────────────────┘
                       ▼
        RELATIONSHIP_SNAPSHOT contract
                       │
                       ▼
        persistence/schema of derived artifacts
                       │
                       ▼
                Processing pipeline
```

The tracks progress independently until they converge at the snapshot contract.

### Not on the critical path (can proceed)
- **EPIC 02** parser/import/participants and M2 (`participants`, `conversation_imports`, private bucket): they do not depend on the snapshot.
- **EPIC 03 domain code** (pure, no persistence): can start once Analytics v1 is defined enough to test.
- **Landing + waitlist**: only needs OD-11 and the claims table in `LANDING_BRIEF.md`.

## 4. Product work queue

### P0 — Nossa História experience
**Goal:** define exactly what the user buys and experiences.  
**Output:** `NOSSA_HISTORIA_SPEC.md`  
**Must answer:** contents and screens; what makes it emotionally valuable; which facts are deterministic; which elements need original text; which may be generated; what can be shared; what must survive raw deletion.  
**Unlocks:** snapshot contract, narrative artifact model, EPIC 07.  
**Decides:** Product.

### P0 — Analytics Engine v1
**Goal:** turn the analytical promise of Nós into an explicit, testable contract.  
**Output:** `ANALYTICS_ENGINE.md` v1 plus the synthetic datasets in its §5.  
**Must resolve:** sessions; initiative; response dynamics; reciprocity; baselines; significant change; persistence; phases; confidence; evidence; sufficiency.  
**Unlocks:** EPIC 03 and 04, Jev evaluation.  
**Decides:** Product + Eng.

### P1 — Relationship Snapshot contract
**Depends on:** `NOSSA_HISTORIA_SPEC.md` + `ANALYTICS_ENGINE.md`.  
**Goal:** the minimum persistent representation that supports the known products without retaining the transcript.  
**Must define:** artifact families; text budgets; retention; versioning; accumulation across analyses; non-reconstructibility tests; deletion behavior.  
**Unlocks:** snapshot schema, cross-product persistence, final evidence ceilings.  
**Decides:** Product + Eng + Privacy.

### P1 — Final privacy policy
**Goal:** legal basis, third-party data, deletion, backups, provider policy.  
**Output:** `PRIVACY.md` final, with legal review.  
**Unlocks:** real production uploads and the landing's privacy copy.  
**Decides:** Product + Legal.

### P1 — Free Reveal contents
**Depends on:** `ANALYTICS_ENGINE.md` v1.  
**Goal:** define exactly what the Free Reveal shows (cards, metrics, the one limited insight, edge cases) without giving away the premium value.  
**Output:** `FREE_REVEAL.md` §3/§8 refined; `reveal_summary` payload.  
**Unlocks:** EPIC 05, landing example alignment (C-09).  
**Decides:** Product.

### P2 — Próximo Passo specification
Only after the Nós outputs and the safety policy (OD-14) are defined. Reason: it consumes finalized Nós findings; designing it earlier risks inventing a second analytical system.

### Product-owner decisions waiting
OD-11 (waitlist storage), OD-13 (brand "Nós" and domain), OD-14 (safety policy), OD-17 (does M3 wait for the snapshot?), OD-18 (brand thesis), OD-19 (Nossa História commercial model), OD-23 (Free Reveal contents).

## 5. Deferred intentionally
Not current blockers; do not resolve opportunistically while implementing unrelated work:
payment provider, exact pricing, LLM provider, Jev production adoption, job runner, "Desde a Última Vez", additional conversation sources (OD-10), subscriptions (OD-09), account/login timing (OD-20).

## 6. Rules for agents
- This document tracks readiness; it does not override canonical specs.
- 🟢 does not authorize implementation beyond its source document.
- 🟡 means: read the source document and `OPEN_DECISIONS.md` before implementing related behavior.
- 🔴 means: stop and report; do not work around it.
- 🧪 and ⚪ must not become production dependencies without an explicit decision.
- **Maintenance:** when an ADR or OD changes state, update the matching row here in the same change and bump "Last updated". A stale readiness map is worse than none.
