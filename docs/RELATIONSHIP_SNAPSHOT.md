# Vyerso — Relationship Snapshot

**Status:** DRAFT — REQUIRED BEFORE M2/M3 PRODUCT-DERIVED PERSISTENCE
**Owner:** Product + Engineering + Privacy
**Last updated:** 2026-10-06

## Agent rules
- This document defines the boundary between ephemeral conversation data and persistent relationship-derived data.
- Do not persist new raw-message-like structures unless this document and PRIVACY.md explicitly allow them.
- DRAFT sections do not authorize schema/migration work.
- If a desired feature requires data not present in the approved snapshot, require re-upload or raise a product decision; do not expand retention silently.

## 1. Purpose
A **Relationship Snapshot** is the persistent, versioned and deliberately non-reconstructible representation derived from a Connection's temporary conversation import.

It exists so the Vyerso can support the known product family after the original conversation is purged:

- **Nós** — understand the relationship;
- **Nossa História** — relive the relationship;
- **Próximo Passo** — act using already-finalized findings.

The snapshot is not a transcript, message archive, semantic backup or replacement for the original export.

## 2. Core invariant
> After raw purge, the persisted Vyerso dataset must not allow substantial reconstruction of the original conversation.

This invariant has priority over convenience, future feature optionality and avoidance of re-upload.

## 3. Processing model
```text
Original export
      ↓
Client-side validation / PII redaction where feasible
      ↓
Private temporary raw
      ↓
Parse + normalize in ephemeral processing context
      ↓
┌─────────────────────────────────────────────┐
│ One processing window                       │
│                                             │
│ deterministic metrics / temporal signals    │
│ phases / change points / sufficiency        │
│ selected evidence                           │
│ milestones / narrative candidates           │
│ recurring-pattern aggregates                │
│ product-safe derived artifacts              │
└─────────────────────────────────────────────┘
      ↓
Validate derived persistence
      ↓
Purge raw + ephemeral normalized dataset
      ↓
Relationship Snapshot + product results
```

Purging must happen only after required derived writes are durably completed or the import reaches a defined failure/expiry path.

## 4. What the snapshot may represent
Exact schema is TBD, but the approved conceptual families are:

### 4.1 Temporal summary
- known conversation date range;
- activity volumes by bounded time bucket;
- session/rhythm aggregates;
- statistically useful temporal distributions.

### 4.2 Interaction metrics
- initiative;
- reciprocity;
- response dynamics;
- frequency/rhythm;
- other deterministic metrics approved in ANALYTICS_ENGINE.md.

### 4.3 Analytical structure
- sufficiency;
- phases;
- change points;
- persistence/magnitude/confidence metadata;
- evidence references and minimal selected excerpts where approved.

### 4.4 Narrative-safe artifacts
Needed primarily for Nossa História. Candidate classes may include:
- relationship milestones represented as structured events;
- bounded “story candidate” records with date/range, type, relevance and minimal supporting text only when necessary;
- recurring expression/pattern aggregates without retaining full message sets;
- positive/meaningful period signals;
- counts and facts suitable for retrospective cards.

The exact set must be designed from Nossa História's approved experience before schema implementation.

### 4.5 Provenance/versioning
The snapshot must identify at least:
- snapshot schema version;
- parser/normalizer version where relevant;
- analytics/extraction version(s);
- source import id;
- creation/completion timestamps;
- date range represented.

## 5. Explicitly forbidden
The snapshot must not contain:
- the complete raw export;
- a persistent `messages` collection/table;
- all normalized messages;
- embeddings or vectors that effectively encode every message merely to preserve future optionality;
- large sequential excerpts;
- adjacent excerpts whose combination reconstructs passages;
- an unbounded collection of “candidate moments”;
- arbitrary raw text hidden inside JSON/metadata;
- message content in logs, telemetry or error payloads.

Changing any of these requires an explicit new privacy/product ADR.

## 6. Product consumption
### Nós
Consumes deterministic metrics, phases, change points, evidence and bounded interpretation outputs. It is the primary analytical product.

### Nossa História
Consumes narrative-safe artifacts, temporal facts, milestones and permitted selected text. It must not require the original transcript for the experience promised at purchase time.

The first extraction pass may create these artifacts even when Nossa História has not been purchased. This is preprocessing, not entitlement.

### Próximo Passo
Consumes the finalized Nós result: findings, attention points, confidence and supporting evidence. It should not require raw conversation access by default.

## 7. Entitlement boundary
Persistence and purchase are separate concerns.

A derived artifact may exist because it was required during the one-time processing window. Its existence does not mean the user is entitled to retrieve the corresponding premium experience.

The entitlement layer determines which product outputs may be accessed. It must not influence what the analysis concludes.

## 8. Re-upload policy
If a future feature requires information not preserved by the snapshot version associated with the Connection:

1. do not infer unavailable facts;
2. do not reconstruct from insufficient excerpts;
3. do not silently extend retention for new imports;
4. ask for a new conversation export when required.

User-facing rationale may explicitly state that the original conversation was deleted to protect privacy.

## 9. Non-reconstructibility acceptance criteria — TO FINALIZE
Before implementing narrative persistence, PRIVACY.md + this document must define testable ceilings for:
- maximum persisted text per analysis/Connection;
- maximum narrative candidates;
- excerpt adjacency/separation;
- cumulative retention across repeated analyses;
- free-text fields allowed in snapshot structures;
- deletion/expiry behavior;
- redaction before persistence.

The current evidence limits in DATABASE.md are proposals, not a complete snapshot policy.

## 10. Open decisions before schema implementation
- exact Nossa História experience and therefore minimum narrative artifacts;
- whether narrative candidates share `evidence_excerpts` or require a separate tightly bounded entity;
- hard ceilings per import/analysis/Connection;
- cumulative behavior when a Connection is re-uploaded;
- whether some derived narrative artifacts expire sooner than analytical aggregates;
- browser-side redaction scope and failure behavior;
- whether any provider may receive text and under what policy;
- physical schema: normalized tables vs. bounded/versioned JSON for specific artifact families.

## 11. Design principle
The snapshot should preserve **meaningful structure**, not **future optionality at any cost**.

When forced to choose between “we may build a future feature without re-upload” and “we retain substantially less intimate data,” Vyerso chooses the latter unless a new explicit product/privacy decision changes this boundary.
