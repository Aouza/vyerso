# Vyerso — Free Reveal

**Status:** CANONICAL DIRECTION (principles, scope and position in the funnel). **Exact contents: NEEDS DEFINITION.**  
**Product scope:** Nós only  
**Owner:** Product  
**Last updated:** 2026-10-07

## Agent rules
- The Free Reveal belongs to **Nós**. It is not a universal Vyerso monetization pattern. Do not copy it to Nossa História or Próximo Passo (their preview mechanisms are undefined; see `OPEN_DECISIONS.md` OD-19).
- Do not decide the Reveal's exact cards, metrics or insights. They are NEEDS DEFINITION and depend on `ANALYTICS_ENGINE.md`.
- Never show a number that is not a real output of the analysis. No artificial counts to raise conversion.
- Premium data must never reach a client without entitlement (ADR-015).

## 1. Definition
The Free Reveal is the free demonstration that Vyerso **actually found something relevant in the history of that specific relationship**: enough to build trust and curiosity, without delivering the core value of the full report.

It is not a simplified free analysis and not "a screen before the paywall".

## 2. Position in the Nós funnel
```text
Import → Processing → Sufficiency → Analysis complete
                                         ↓
                              Result frozen (complete)
                                         ↓
                    ┌────────────────────┴───────────────────┐
                    │ FREE REVEAL        │ PREMIUM RESULT    │
                    │ safe subset        │ protected         │
                    └─────────┬──────────┴───────────────────┘
                              ↓
                          PAYWALL (Nós)
                              ↓
                       Full Nós report
                              ↓
                         Offer Engine
```
Each step answers a different question: landing "does this look interesting?", import "is it worth handing over my conversation?", **Free Reveal "did it really find something about us?"**, paywall "is it worth paying for the rest?", Nós "did this help me understand?", upsell "do I want to do more with this history?".

## 2.1 One analysis, two views
There is a **single complete analysis**. The Reveal is a safe subset of the frozen result. We never run a "free algorithm" and then a different "paid algorithm". Monetization does not influence the findings (`MONETIZATION.md` §2).

## 3. Content layers (illustrative, NOT final)
1. **Proof of processing** — e.g. messages analyzed, time span covered, days with interaction.
2. **A small personalized insight**, phrased neutrally — e.g. "We found a consistent change in how you start conversations." or "Reciprocity stayed relatively stable through most of this history."
3. **A pointer to the larger analysis** — e.g. "We found N important periods in your history", with a call to see the full analysis.

Numbers shown here (messages, months, days, periods) are examples only. A figure such as "N periods" appears **only if it is a real finding** of the Analytics Engine.

## 4. What the Reveal must NOT give away
All periods/phases; the full explanation of the change; all evidence; the complete analytical timeline; detailed interpretation; the conclusion of each insight; all patterns found.

The Reveal says that a consistent change exists from a period. The premium result says **which** change, its magnitude, duration, evidence and context.

## 5. Language rules
- No manipulative teasers or alarm ("We found something worrying in your relationship…").
- Observation, not verdict: same language policy as `ANALYTICS_ENGINE.md` §7.
- Honest insufficiency: if the data is insufficient, show that instead of a Reveal (`PRODUCT_FLOWS.md` §5).

## 6. Data and security boundary
- The Reveal payload is stored separately from premium detail (`DATABASE.md` §9: `analyses.reveal_summary` vs. detail tables) and generated from the **same frozen analysis**.
- The user-level data layer (API/PostgREST) **without entitlement must return only the Reveal payload**. Hiding premium content in React (`{paid && <Premium/>}`) is not a paywall: the browser must never receive it (ADR-015, `DATABASE.md` §9.1).
- Entitlement is **per product** (`MONETIZATION.md`).
- The Offer Engine runs only after the finalized result and does not alter it.

## 7. Metrics
`analysis completed → free reveal viewed → paywall viewed → purchase → result consumed → contextual offer` (full set in `MONETIZATION.md` §6, Nós dimension). Reveal depth is an experiment (OD-08/OD-23); track trust proxies (refunds, complaints, disagreement with conclusions) alongside conversion.

## 8. NEEDS DEFINITION
- Exact cards, metrics and insight types shown (depends on Analytics v1, OD-02).
- Selection rule for "the one limited insight" and what happens when none is strong enough.
- Reveal depth and its test plan (OD-08).
- Reveal for edge cases: stable relationship, ambiguous findings, insufficient data.
- Exact payload schema for `reveal_summary` (M3).
- How the example on the landing page may represent the Reveal without promising more than it gives (`LANDING_BRIEF.md`).

Not part of this document: Nossa História preview/payment moment (OD-19) and the exact paywall price (OD-08).
