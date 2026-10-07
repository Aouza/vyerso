# Vyerso — Product Definition

**Status:** CANONICAL  
**Owner:** Product  
**Last updated:** 2026-10-07

## How agents should use this document
- CANONICAL decisions are binding unless explicitly changed by the product owner.
- Do not infer new product behavior from marketing copy.
- Do not turn hypotheses into implementation requirements.
- If this document conflicts with another canonical document, flag the conflict before implementing.

## 1. Product thesis
Vyerso transforms long private conversation histories into understandable experiences about a relationship over time.

The core value is **longitudinal analysis**. Vyerso is not a tool for pasting a few messages and receiving a generic AI opinion. It processes months or years of conversation to surface patterns, phases, changes and evidence that are difficult to perceive message by message.

### Core promise
> Turn thousands of messages into a view of the relationship that the user could not easily see while living it.

## 2. Product principles
1. **Evidence before interpretation.** Observable conversation data comes before narrative conclusions.
2. **No relationship diagnosis.** Vyerso must not reduce a relationship to “good/bad”, predict feelings as facts, or claim to know what happens outside the conversation.
3. **Uncertainty is a valid result.** When evidence is insufficient or ambiguous, say so.
4. **Longitudinal differentiation.** The defensible value is analysis across time, not generic LLM commentary.
5. **One connection, multiple experiences.** A conversation/relationship is the reusable product asset; products are experiences derived from it.
6. **Privacy by design.** Minimize raw conversation retention and avoid unnecessary exposure of third-party personal data.
7. **Analysis and monetization are separate.** Commercial incentives must never influence analytical findings.

### 2.1 Brand layer
**Vyerso is the brand/platform above the products.** It is not reduced to Nós ("discover if something changed") nor to Nossa História ("turn your chats into a story"). The brand thesis occupies a wider territory: conversations carry the history of a relationship, and Vyerso turns that history into experiences to **understand** it (Nós) and **revisit** it (Nossa História). The exact wording may evolve.

Nós and Nossa História are independent products with independent acquisition funnels over one shared platform. Routing, public surface and metrics are defined in `PRODUCT_FLOWS.md` §0 and ADR-021.

## 3. Core object: Connection
A **Connection** represents a persistent relationship/conversation context owned by a Vyerso user.

Examples: “Eu + Ana”, “Eu + João”.

A Connection may generate multiple product experiences and analyses over time. It must not imply that the other participant is a Vyerso account holder or has consented to use the service.

Connection is a **domain concept, not necessarily UI language**. The UX may simply say "send your conversation"; whether and when Connection is exposed to the user is deferred (see OD-20).

## 4. Product portfolio

### 4.1 Nós — Understand
**Role:** Primary analytical product / principal acquisition product.

**Job to be done:** “I want to understand how our relationship appears through our conversations over time.”

Nós analyzes long conversation histories and surfaces evidence-based patterns such as:
- initiative and reciprocity;
- conversation frequency and rhythm;
- response dynamics;
- periods of greater or lower interaction;
- persistent changes versus temporary variation;
- phases in the conversation history;
- recurring communication patterns;
- evidence supporting significant findings.

Nós must not output a single authoritative “relationship score”. Multi-dimensional indicators may exist internally or in UX when defensible, but must not be presented as an objective measure of relationship quality.

**Product verb:** ENTENDER.

Nós has a **Free Reveal**: a safe subset of the single frozen analysis that proves value on that specific relationship before purchase (FREE_REVEAL.md). It is specific to Nós, not a pattern for the other products.

### 4.2 Nossa História — Relive
**Role:** Emotional/narrative product. Can be purchased directly or offered after Nós.

**Job to be done:** “I want to revisit and experience the story contained in our conversations.”

Nossa História turns conversation history into a positive, nostalgic retrospective. Potential elements include:
- beginning of the conversation/history;
- timeline and phases;
- periods of high interaction;
- memorable moments and selected excerpts;
- recurring expressions or shared language;
- dates and milestones supported by the data;
- shareable/private visual moments.

It is not a diagnostic report. The experience should favor affection, memory and celebration without fabricating positivity that is not present in the source data.

**Product verb:** REVIVER.

### 4.3 Próximo Passo — Act
**Role:** Contextual post-Nós product, offered only when the analysis contains findings that reasonably justify action or reflection.

**Job to be done:** “Given what I learned, how can I approach what is happening more clearly?”

Próximo Passo may help the user:
- understand which findings deserve attention;
- distinguish observation from interpretation;
- prepare a constructive conversation;
- identify questions worth asking;
- consider possible approaches and trade-offs;
- avoid impulsive conclusions unsupported by the data.

It must not promise to save a relationship, prescribe manipulation, diagnose either participant, or state that one behavior will produce a desired romantic outcome.

**Product verb:** AGIR.

## 5. Non-products / acquisition concepts
The following are not standalone products unless explicitly promoted later:
- “O Que Mudou?” — acquisition angle and possible report section.
- Ex mode — context/personalization for Nós.
- Dating/ficante mode — context/personalization for Nós.
- “Quem procura quem?”, “quando começou a esfriar?”, etc. — hooks/questions, not separate products.
- “Desde a Última Vez” — currently a future recurrence/update capability of Nós, not a top-level product.

## 6. Current product hierarchy
```text
VYERSO
├── NÓS — entender
│   ├── first analysis
│   └── future: update / desde a última vez
├── NOSSA HISTÓRIA — reviver
└── PRÓXIMO PASSO — agir (contextual, post-Nós)
```

## 7. MVP priority
1. Build the Connection foundation.
2. Build reliable import/parsing and participant confirmation.
3. Define and validate the analytics engine.
4. Deliver Nós with trustworthy evidence and uncertainty handling.
5. Add post-analysis monetization only after analytical integrity is established.
6. Nossa História and Próximo Passo reuse shared processing where privacy/retention architecture permits.

## 8. Explicit non-goals for the initial product
- couples therapy replacement;
- mental-health or personality diagnosis;
- infidelity detection;
- certainty about a participant's intentions or feelings;
- compatibility score presented as scientific truth;
- surveillance or continuous ingestion of another person's messages;
- social network/public profile.
