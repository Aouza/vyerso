# Vyerso — Product Flows

**Status:** CANONICAL  
**Owner:** Product  
**Last updated:** 2026-10-06

## Agent rules
- Preserve the asymmetry between the products.
- Do not automatically cross-sell Nós after Nossa História.
- Do not offer Próximo Passo merely to increase revenue.
- Analytical classification must finish before offer selection begins.

## 0. Brand layer and entry routing

**Vyerso is the brand/platform above the products.** Nós and Nossa História are independent products with independent acquisition funnels, running on one shared platform (User/Connection → import → processing → Relationship Snapshot). They are not two applications or two brands.

### 0.1 Public surface (intended direction)
```text
vyerso.com.br                  Brand Home — sells the Vyerso thesis, lets undecided visitors choose
vyerso.com.br/nos              Product landing — Nós
vyerso.com.br/nossa-historia   Product landing — Nossa História
```
Product landings convert **their own product**. The Home does not replicate them.

### 0.2 Routing by intent
- Content/ads about a product go **directly to that product's landing**, never through the Home: the intent is already known.
- Traffic without defined intent (bio link, brand search, referral, typed domain) goes to the **Home**, then to a product.
- Initially the bio link is `vyerso.com.br`; no link aggregator is needed.

### 0.3 Navigation is not cross-sell
A discreet global navigation may exist, but a product landing must not interrupt its narrative to suggest the other product. `/nos` does not introduce emotional framing of Nossa História; `/nossa-historia` does not introduce analytical doubts from Nós.

### 0.4 Connection is a domain concept, not UI language
Internally `User → Connection → Import`; the UX may simply say "send your conversation". When and how the account is created, and whether Connection is ever exposed, is **deferred** (OD-20): there is not yet a product that benefits from login.
## 1. Primary acquisition flow: Nós
```text
Traffic / hook
      ↓
Product landing — /nos
      ↓
Account / Connection (internal; UX and auth timing TBD, OD-20)
      ↓
Conversation import
      ↓
Parse + participant confirmation
      ↓
Sufficiency checks
      ↓
Analytics (complete result frozen)
      ↓
Free Reveal (Nós only — see FREE_REVEAL.md)
      ↓
Paywall (Nós)
      ↓
Nós result (full)
      ↓
Post-result offer routing
```

### 1.1 Result language
The result must describe **findings**, not pronounce a verdict on the relationship.

Preferred concepts:
- stable/consistent patterns;
- reciprocity indicators;
- meaningful changes;
- persistent versus temporary variation;
- points that deserve attention;
- insufficient or mixed evidence.

Avoid:
- “your relationship is healthy/unhealthy” as a factual diagnosis;
- “they no longer love you”;
- “43/100 relationship score” as an authoritative verdict.

## 2. Post-Nós offer routing
The offer engine consumes a finalized analytical result. It does not alter it.

```text
                            NÓS
                             │
                       Final result
                             │
               ┌─────────────┴─────────────┐
               │                           │
      No relevant attention         Relevant points
      findings / stable pattern      deserve attention
               │                           │
               ▼                           ▼
       NOSSA HISTÓRIA             User chooses next need
       primary upsell              ┌────────┼─────────┐
                                   ▼        ▼         ▼
                              PRÓXIMO   NOSSA      BUNDLE
                               PASSO   HISTÓRIA   BOTH
```

### 2.1 Stable/no relevant attention findings
Primary post-purchase offer: **Nossa História**.

Narrative transition: understanding → celebration/recollection.

Do not manufacture a problem to sell Próximo Passo.

### 2.2 Findings that deserve attention
Offer three meaningful choices:

**Próximo Passo** — “I want help thinking about what to do or how to talk about this.”

**Nossa História** — “I want to revisit what we built and the positive history present in these conversations.”

**Bundle** — “I want both: look back at what we built and think about what comes next.”

The bundle narrative is **past + future**, not merely “X% off”.

## 3. Direct acquisition: Nossa História
```text
Romantic / nostalgic / gift traffic
             ↓
       Nossa História
             ↓
       Import / process
             ↓
   Narrative experience
             ↓
 Share / gift / keep private
             ↓
            End
```

Do **not** automatically follow this experience with a Nós upsell. The user entered seeking a positive/emotional experience; introducing suspicion or analysis afterward can undermine the value just delivered.

### 3.1 Commercial model is undefined
The teaser/preview, payment moment and delivery of Nossa História are **not specified** (OD-19). Do not assume `Free Reveal → Paywall` because Nós works that way.

## 4. Future recurrence: update Nós
A future capability may let a user provide newer messages and compare them with a previous analysis.

Working concept: **Desde a Última Vez**.

This is currently a retention mechanism within Nós, not a separate top-level product.

## 5. Edge cases
### Insufficient data
Return an honest insufficiency state. Do not force insights or route to Próximo Passo based on weak evidence.

### Mixed/ambiguous findings
Use calibrated language. Nossa História may remain available; Próximo Passo should only appear when there is enough evidence/context for it to provide genuine utility.

### Potentially severe interpersonal situations
Do not position Vyerso as an arbiter, therapist or safety professional. Product copy and future safety policies must define escalation/limitations before launch.
