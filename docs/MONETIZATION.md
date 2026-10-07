# Vyerso — Monetization Strategy

**Status:** CANONICAL STRATEGY / PRICING TBD  
**Owner:** Product  
**Last updated:** 2026-10-06

## 1. Objective
Increase conversion, AOV and eventual LTV without compromising analytical integrity or creating artificial relationship problems.

## 2. Core rule
> **Analysis first. Offers second.**

The analytics pipeline must finalize findings before any monetization logic evaluates which post-result products are relevant.

The system must never make a finding more negative, certain or dramatic because a negative finding enables an upsell.

## 3. Revenue surfaces
### Nós
Primary paid analytical product and likely primary performance-marketing acquisition product.

### Nossa História
Two acquisition modes:
1. standalone purchase from romantic/nostalgic/gift traffic;
2. discounted contextual upsell after Nós.

### Próximo Passo
Contextual product after Nós only when findings justify its utility.

### Bundle
Available in the “points deserve attention” path:
- Próximo Passo;
- Nossa História;
- both at a better combined price.

The bundle's conceptual value is **past + future**:
- Nossa História: look back at what was built;
- Próximo Passo: think constructively about what comes next.

## 4. Pricing principles
Exact prices are **TBD and must be tested**.

Current principles:
- post-Nós products may receive a lower price because acquisition and processing have already occurred;
- use legitimate contextual urgency, not fake countdown timers;
- example concept: “special price together with this analysis”;
- standalone Nossa História can have its own price and acquisition economics;
- bundle discount should increase perceived value without making individual offers look fake.

Do not hard-code provisional prices into product logic.

## 5. Free experience
Do not give the complete core analysis away as a one-time free product. The **Free Reveal belongs to Nós** (`FREE_REVEAL.md`): a safe subset of the single frozen analysis that proves value on that specific relationship while preserving meaningful paid depth. It is not a universal Vyerso pattern: Nossa História's teaser and payment moment are undefined (OD-19) and Próximo Passo is contextual.

Paywall enforcement must occur at the API/data-access layer, not merely by hiding UI.

## 6. Metrics to track

Do not use one universal funnel; it presumes every product monetizes the same way. Track three separate dimensions:

```text
BRAND
bio/profile → home → product selected → product landing

NÓS
/nos → CTA → import started → import completed → sufficiency
→ free reveal viewed → paywall viewed → purchase
→ result consumed → contextual offer

NOSSA HISTÓRIA
/nossa-historia → CTA → import started → import completed → sufficiency
→ [COMMERCIAL FUNNEL TBD — OD-19]
→ experience consumed → share / save / gift
```

### Additional metrics
- landing → import start;
- import completion;
- payment conversion;
- analysis completion;
- result consumption;
- Nossa História upsell take rate by result segment;
- Próximo Passo take rate;
- bundle take rate;
- AOV;
- CAC by acquisition angle/product;
- refund/support rate;
- direct Nossa História share rate;
- future repeat-analysis rate.

Do not optimize only revenue metrics. Track trust proxies such as refunds, complaints, low-confidence outputs and user disagreement with conclusions.
