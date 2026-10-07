# Vyerso — AI / Decision Layer

**Status:** EXPERIMENT  
**Owner:** Product + Engineering  
**Last updated:** 2026-10-06

## Agent rules
- Nothing in this document authorizes production dependency on Jev.
- Do not implement Jev into the core architecture without an explicit decision after evaluation.
- LLM provider is also not yet canonically selected.

## 1. Problem
Vyerso needs to bridge three different tasks:
1. objectively measuring conversation behavior;
2. judging whether combinations of signals support a bounded interpretation;
3. explaining results naturally to a user.

A single generative LLM should not silently own all three responsibilities.

## 2. Target conceptual separation
```text
CODE / ANALYTICS
measures observable behavior
        ↓
PROBABILISTIC DECISION LAYER (candidate: Jev)
classifies bounded questions / estimates uncertainty
        ↓
LLM
explains, narrates and personalizes within the evidence
```

Short form:
> Code measures. Decision layer judges bounded questions. LLM explains.

## 3. Jev hypothesis
Jev is being evaluated as a possible probabilistic decision layer for structured judgments such as:
- Is there sufficient evidence of a persistent change?
- Which bounded pattern best describes a period: stable / approaching / distancing / inconclusive?
- Is evidence of reduced reciprocity strong enough to surface?

Potential advantages:
- typed/bounded decisions rather than unrestricted prose;
- probabilities/confidence;
- ability to make “inconclusive” behavior part of system policy;
- separation between analytical judgment and narrative generation.

## 4. What Jev must NOT do
- receive the entire conversation and output “relationship health = 43/100”;
- determine commercial offers;
- decide that a partner loves/does not love the user;
- replace deterministic measurements;
- become a production dependency before validation on Vyerso-like data.

## 5. Required POC
Evaluate on controlled synthetic datasets with known ground truth.

Measure:
- classification accuracy for bounded questions;
- calibration of probabilities;
- stability/repeatability;
- false-positive behavior;
- PT-BR performance;
- behavior on insufficient/ambiguous evidence;
- latency;
- cost;
- operational/vendor risk.

Compare against:
- deterministic rules where applicable;
- selected LLM baseline(s);
- human-labeled expected outcomes for test cases.

## 6. Decision gate
Only adopt a probabilistic provider if it improves reliability or product capability enough to justify complexity and dependency.

The architecture should preserve a provider boundary so the domain model is not coupled to Jev-specific concepts unless explicitly approved.
