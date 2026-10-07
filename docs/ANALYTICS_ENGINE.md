# Vyerso — Analytics Engine Specification

**Status:** DRAFT — MUST BE DEFINED/VALIDATED BEFORE CORE ANALYTICS IMPLEMENTATION  
**Owner:** Product + Engineering  
**Last updated:** 2026-10-06

## Agent rules
- Do not invent analytics formulas from this draft.
- Do not implement a relationship-quality score.
- Deterministic measurements should be preferred where the concept is objectively measurable.
- Every interpretive insight must be traceable to evidence and carry uncertainty when appropriate.

## 1. Purpose
Convert normalized long-form conversation history into structured, longitudinal evidence used by Vyerso products.

## 2. Architectural principle
```text
Raw export
   ↓
Parser / normalization
   ↓
Sessions + temporal features
   ↓
Deterministic measurements
   ↓
Change / phase / sufficiency analysis
   ↓
Optional probabilistic decision layer
   ↓
Evidence-backed insights
   ↓
Narrative generation / product presentation
```

## 3. Candidate deterministic domains
Exact definitions are TBD and must be specified before implementation:
- message counts by participant/time bucket;
- conversation/session definition;
- session initiator;
- initiative distribution;
- response latency distribution;
- consecutive messages / bursts;
- activity by day/week/month/time-of-day;
- gaps/silence periods;
- longitudinal baselines;
- persistence of change;
- trend and change-point candidates;
- data sufficiency.

## 4. Required design questions
Before implementation, define:
1. What constitutes a conversation session?
2. What gap closes a session, and should it vary by dataset?
3. What exactly counts as initiative?
4. How are response times calculated around sleep/work gaps?
5. What time buckets are used for longitudinal comparisons?
6. How is baseline behavior established?
7. What constitutes a meaningful change?
8. How much persistence is required before a change becomes a finding?
9. How are temporary dips distinguished from phase changes?
10. How is confidence calculated?
11. How are phases detected and named without overinterpretation?
12. What evidence must accompany each insight?
13. What makes a dataset insufficient?

## 5. Synthetic validation datasets
At minimum create controlled datasets for:
- stable relationship → no material change;
- abrupt change around a known date → detect approximate change;
- gradual decline → identify trend without inventing a precise event;
- short dip followed by recovery → avoid false new phase;
- initiative imbalance → measure correctly;
- routine change with ambiguous relational meaning → remain cautious;
- sparse history → insufficient_data;
- noisy/irregular messaging → avoid overconfidence.

Ground truth should be known for synthetic tests.

## 6. Output contract direction
An insight should eventually resemble a structured object rather than free text only:
```text
finding_type
period
observations
magnitude
persistence
confidence
supporting_evidence[]
limitations[]
```
Exact schema is TBD.

## 7. Language policy
Separate:
- **measurement:** “A initiated 72% of detected sessions in this period.”
- **interpretation:** “Initiative became less balanced during this period.”
- **unsupported inference:** “B stopped caring.” ← prohibited as a factual conclusion.

## 8. Relationship score
No canonical single `relationship_score` should determine whether a relationship is good or bad.

If scores are used, they should describe bounded dimensions with defensible definitions (for example, an internal evidence strength or a measurable balance metric), not total relationship quality.

## 9. Evidence persistence
Current privacy direction:
- no persistent full `messages` table in MVP;
- raw import is temporary;
- normalized full dataset is processed ephemerally;
- persist only selected evidence excerpts necessary to support insights;
- exact excerpt limits/redaction rules belong in PRIVACY.md and final engine specification.
