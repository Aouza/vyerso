# Vyerso — Architecture Direction

**Status:** CANONICAL DIRECTION; IMPLEMENTATION DETAILS MAY EVOLVE  
**Owner:** Engineering / Product  
**Last updated:** 2026-10-06

## Agent rules
- Preserve domain independence from Next.js/React/Supabase.
- Security and RLS are not optional implementation details.
- Do not introduce a provider dependency for LLM/Jev/payment/job runner without an explicit decision.
- Read PRODUCT.md and PRODUCT_FLOWS.md before implementing behavior that affects product semantics.

## 1. Current stack
- Next.js 16 App Router
- TypeScript strict
- Tailwind 4
- Zod 4
- Vitest 5
- Supabase Auth / Postgres / Storage / RLS
- `@supabase/supabase-js`
- `@supabase/ssr`
- `server-only`
- npm
- ESLint + Prettier

## 2. Domain boundary
`src/domain/connection/*` must remain framework-agnostic.

The domain must not import React, Next.js, Supabase, infrastructure, UI/components or feature modules.

Analytics should be deterministic/testable where possible and expose structured contracts to application/infrastructure layers.

## 3. High-level system
```text
Client
  │
  ▼
Next.js application layer
  │
  ├── Auth/session boundary
  ├── Connection use cases
  ├── Import orchestration
  ├── Product entitlement / offer presentation
  │
  ▼
Domain
  ├── parsing contracts
  ├── normalization
  ├── participants
  ├── sessions
  ├── metrics
  ├── sufficiency
  ├── changes/phases
  └── evidence
  │
  ▼
Infrastructure
  ├── Supabase/Postgres
  ├── private Storage
  ├── future async/job runner [TBD]
  ├── future LLM provider [TBD]
  └── optional decision provider [EXPERIMENT]
```

## 4. Data model direction
Core concepts:
- Connection: persistent user-owned relationship context.
- ConversationImport: temporary import lifecycle metadata.
- Participant: confirmed participants/roles.
- Analysis: versioned analytical execution over a Connection.
- Metrics / phases / change points: structured results.
- Evidence: links findings to support without message text.
- EvidenceExcerpt: minimal persisted text supporting an insight.
- RelationshipSnapshot: conceptual/versioned boundary for persistent, non-reconstructible cross-product derivatives. Exact physical schema is TBD in `RELATIONSHIP_SNAPSHOT.md`.

No full persistent messages table in MVP. The snapshot must not become a transcript disguised as JSON, vectors or candidate records.

Schema, ownership and RLS are specified in `DATABASE.md` (the numeric retention/excerpt limits are owned by `PRIVACY.md` and `RELATIONSHIP_SNAPSHOT.md`).

## 5. Ownership and RLS
- all user data carries `owner_user_id` where appropriate;
- denormalized ownership enables simple RLS checks;
- composite foreign keys should prevent child-owner mismatch;
- RLS ENABLE + FORCE;
- deny by default;
- new tables should not automatically gain broad Data API privileges;
- authenticated clients receive only explicitly required grants;
- analytics/result writes are server-side only;
- premium data must not be retrievable directly before entitlement.

## 6. Supabase client policy
- browser/server session clients operate under the user's auth context and RLS;
- service-role/admin client is server-only;
- service role is not used in ordinary product flows unless explicitly justified;
- integration tests may use service role for disposable test-user setup/cleanup where necessary;
- admin functions must explicitly validate ownership and never trust client-provided IDs alone.

## 7. Product pipeline direction
```text
Original export
   ↓
Browser validation + PII redaction where feasible
   ↓
Private temporary raw
   ↓
Parse / normalize in ephemeral processing context
   ↓
Confirm participants + sufficiency
   ↓
┌──────────────────────────────────────┐
│ One processing window                │
│ deterministic analytics              │
│ optional bounded decision layer      │
│ evidence selection                   │
│ narrative-safe artifact extraction   │
└──────────────────────────────────────┘
   ↓
Persist finalized results + Relationship Snapshot
   ↓
Verify durable persistence
   ↓
PURGE RAW + normalized ephemeral dataset
   ↓
Product rendering / entitlements
   ↓
Offer engine
```

The raw must not be purged before required approved derivatives are durably persisted. The Offer Engine is downstream of finalized analysis and must not influence analytics.

## 8. Multi-product reuse
Shared processing should support multiple product experiences where compatible with privacy policy.

```text
                  CONNECTION
                      │
            shared processing/artifacts
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
       NÓS      NOSSA HISTÓRIA  PRÓXIMO PASSO
   analysis       narrative        guidance
```

Product reuse operates from the approved **Relationship Snapshot**, not from retained raw conversation data. During the one processing window, the system may extract product-safe artifacts needed by known products even if those products have not yet been purchased. Extraction does not grant entitlement.

If a later feature requires information absent from the snapshot version, require re-upload rather than silently expanding retention.

## 9. Product entitlements
Keep product purchase/entitlement separate from analytical results.

Requirements:
- Free Reveal (Nós only; `FREE_REVEAL.md`) exposes only explicitly allowed summary data, generated from the same frozen analysis as the premium result;
- premium result tables/details cannot be fetched through PostgREST before entitlement;
- post-Nós offer routing consumes analytical result metadata but does not modify it;
- exact payment provider and entitlement schema remain TBD.

## 10. Async processing
Long imports/analytics should be designed as asynchronous work. Exact job runner is TBD. Do not couple the domain to a particular queue vendor before the decision.

Expected analysis lifecycle direction:
`pending → processing → completed | failed | insufficient_data`

Exact states/schema require approval.

## 11. Versioning
Analytics behavior will evolve. Analyses should be versioned so historical results can identify which engine/version produced them.

Because raw data may be deleted, a new engine version may require a user re-upload rather than silently recomputing old analyses.

## 12. Current implementation state / near-term plan
- EPIC 00 foundation completed.
- EPIC 01 Connection Foundation completed: passwordless email auth (magic link, PKCE and token_hash), `connections` table (migrations applied to the Supabase DEV project) with RLS ENABLE+FORCE and column-level grants, integration tests for user isolation, Connection create/list UI. See DECISIONS ADR-013/016/017.
- Persistence/RLS details live in `DATABASE.md`; decision history in `DECISIONS.md`; sequence and blockers in `ROADMAP.md` and `OPEN_DECISIONS.md`.
- Do not skip ahead into analytics implementation before ANALYTICS_ENGINE.md is finalized enough to support reliable tests, into M2/M3 product-derived persistence before RELATIONSHIP_SNAPSHOT.md is approved, nor into real production uploads before PRIVACY.md is final.

## 13. Public surface and entry routes (intended direction)
```text
Public (marketing, no auth)          Authenticated app
/                 Brand Home          /login, /auth/confirm   (EPIC 01 scaffolding)
/nos              Product landing     /connections            (EPIC 01 scaffolding)
/nossa-historia   Product landing     (future import/analysis/report routes)
```
- Marketing routes are public and carry no conversation data; product analytics must never receive conversation content.
- The current `/login` and `/connections` screens are EPIC 01 scaffolding, **not** the final onboarding. Account timing and whether Connection is exposed in the UX are deferred (OD-20).
- Exact route names and the Home/landing split follow ADR-021; the proxy gate (`PROTECTED_PREFIXES`) must keep marketing routes public.
