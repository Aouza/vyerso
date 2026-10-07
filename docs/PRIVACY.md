# Vyerso — Privacy & Data Handling

**Status:** DRAFT — BLOCKING FOR REAL PRODUCTION UPLOADS  
**Owner:** Product + Engineering + Legal review recommended  
**Last updated:** 2026-10-06

## Agent rules
- Treat conversation content as highly sensitive product data.
- Data minimization is the default.
- Do not expand retention for convenience without an explicit product/privacy decision.
- This document is product/engineering direction, not legal advice.

## 1. Core privacy problem
Conversation exports contain personal data belonging to the account holder and potentially to other people who did not upload the data or create a Vyerso account.

This requires explicit decisions around legal basis, notice, minimization, retention, deletion, processors/providers, sensitive content and user rights before real production launch.

## 2. Accepted retention direction

Vyerso adopts **ephemeral conversation processing + persistent non-reconstructible derivatives** (ADR-020). This direction is inspired by the public privacy principle used by ThirdPerson: use the conversation to create derived experiences, then discard the original chat while retaining limited results/evidence. It is a product/privacy reference only; Vyerso does not assume or copy ThirdPerson's internal architecture.

The persistent cross-product representation is called the **Relationship Snapshot** and is specified in `RELATIONSHIP_SNAPSHOT.md`.
### Raw conversation file
- private;
- temporary;
- retained only through import → parsing → participant confirmation → analysis;
- delete after successful processing;
- maximum proposed TTL for abandoned/failed imports: 7 days.

### Normalized messages
- process ephemerally/in memory where practical;
- no persistent full `messages` table in MVP.

### Evidence
Persist only a minimal selected set of excerpts needed to support specific insights.

Current proposed, NOT FINAL constraints:
- <= 280 characters per excerpt;
- <= 3 excerpts per evidence item;
- <= 30 excerpts per analysis;
- <= 60 excerpts per Connection across analyses;
- avoid adjacent excerpts that reconstruct long conversation passages;
- excerpt must be tied to a specific insight.

These numbers require validation before implementation.

## 3. Evidence excerpt direction
Potential fields:
- short excerpt;
- speaker_role: `self` / `other`, not participant name;
- sent_at;
- source_index;
- truncated;
- redacted;
- limited metadata without arbitrary free text.

Redact obvious identifiers where feasible (phone numbers, email, CPF/CNPJ, URLs, etc.), recognizing that redaction does not remove all privacy risk.

## 4. Provider policy
Do not send conversation excerpts to an LLM or decision provider by default merely because integration is convenient.

Before any provider receives message text, explicitly decide:
- minimum data required;
- provider retention/training policy;
- region/data transfer implications;
- redaction strategy;
- logging policy;
- contractual/privacy implications.

Prefer sending structured/aggregated features when they are sufficient.

## 5. Logging / analytics
Never place raw messages or evidence excerpts in routine logs, error tracking, product analytics, URLs or client telemetry.

## 6. Deletion
Deleting a Connection should cascade through its analyses/results/evidence according to the database design. User-facing deletion behavior, backup/PITR implications and retention windows must be documented before production.

## 7. Relationship Snapshot privacy boundary
The Relationship Snapshot may persist structured aggregates, temporal signals, analytical structures, milestones/narrative candidates and tightly bounded evidence required by known products. It must be deliberately non-reconstructible.

Forbidden by default: a full messages table, all normalized messages, unbounded narrative candidates, sequential/adjacent passages, arbitrary message text hidden in JSON, or embeddings of the entire transcript retained merely for future optionality.

If a future product needs data that the approved snapshot did not preserve, re-upload is the default privacy-preserving behavior.

## 8. Client-side redaction direction
Vyerso should investigate and prefer redaction of obvious identifiers **in the user's browser before upload**, where technically reliable, so unnecessary PII never reaches Vyerso infrastructure. Candidate classes include phone numbers, email addresses, CPF/CNPJ, payment/card-like identifiers and URLs.

This is defense-in-depth, not anonymization: free text may still reveal identities, health, sexuality, addresses, third parties or other sensitive information. Server-side validation/redaction before persistence remains necessary for retained excerpts/artifacts. Exact scope and fallback behavior must be specified before production.

## 9. Open privacy decisions
- LGPD/legal basis and notices;
- treatment of sensitive personal data;
- exact evidence limits;
- whether column-level encryption adds meaningful protection;
- deletion of excerpts independently of the full analysis;
- inactivity expiration;
- backup/PITR deletion semantics;
- processor/vendor policy;
- direct Nossa História processing requirements;
- how reuse across products works after raw deletion.

## 10. Cross-product reuse decision
The previous product/architecture tension is resolved by ADR-020: known products should reuse the approved Relationship Snapshot rather than the raw conversation. Raw retention must not be extended merely to avoid re-upload.

Before M2/M3 introduces product-derived persistence, `RELATIONSHIP_SNAPSHOT.md` must define the minimum artifacts and testable non-reconstructibility ceilings.
