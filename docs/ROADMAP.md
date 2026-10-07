# Vyerso — Roadmap técnico

**Status:** STRATEGIC DIRECTION (sequência indicativa; itens exigem aprovação antes de implementar)  
**Owner:** Engineering / Product  
**Última atualização:** 2026-10-07

Define a **sequência e as dependências** dos EPICs. O **estado** (pronto, bloqueado, em definição) vive só em `PRODUCT_READINESS.md`; as decisões em aberto, em `OPEN_DECISIONS.md`. Fonte dos produtos: `PRODUCT.md`.

| EPIC | Entrega | Depende de |
|---|---|---|
| **00 Foundation** | Next 16, TypeScript strict, Tailwind, Vitest, clientes Supabase, isolamento do domínio | — |
| **01 Connection foundation** | Auth por link de e-mail, `connections`, ownership, RLS, testes de isolamento, criar e listar conexões (ADR-013/016/017) | EPIC 00 |
| **L1 Landing `/nos` + lista de espera** | Landing do Nós para validar demanda (`LANDING_BRIEF.md`) | OD-11 (e-mails por interesse e origem); copy conforme a tabela de afirmações |
| **L2 Brand Home (`/`)** | Home da marca: tese, escolha de produto, privacidade | L1; OD-18; Nossa História só como "em breve" |
| **L3 Landing `/nossa-historia`** | Landing da Nossa História | `NOSSA_HISTORIA_SPEC.md`; OD-19 |
| **02 Import e parser** | Upload privado, parser isolado com fixtures, participantes e "quem é você?", ciclo de vida do import, purga do bruto | M2 (`participants`, `conversation_imports`, bucket); TTL final (OD-03). **Não depende do snapshot.** |
| **03 Analytics foundation** | Sessões, buckets de tempo, métricas, suficiência, datasets sintéticos. Código de domínio puro, sem persistência | **OD-02** (`ANALYTICS_ENGINE` v1) |
| **04 Engine do Nós** | Mudanças, fases, persistência, confiança, evidências (com excertos mínimos) | EPIC 03; tetos de excertos (OD-03, OD-16, OD-17) |
| **05 Experiência do Nós** | Review, processamento, Free Reveal, paywall, relatório completo | EPIC 04; `FREE_REVEAL.md` (OD-23); OD-06 (pagamento e entitlement por produto); OD-08; ADR-015/022 |
| **06 Ofertas pós-Nós** | Roteamento a partir do resultado final, sem alterá-lo | EPIC 05; classificação "pontos que merecem atenção" calculada pela análise |
| **07 Nossa História** | Experiência narrativa, entrada direta e pós-Nós | `NOSSA_HISTORIA_SPEC.md`; **OD-16** (artefatos narrativos do snapshot); OD-04 |
| **08 Próximo Passo** | Orientação contextual pós-Nós | EPIC 06; OD-04; OD-14 |
| **X Experimento Jev** | POC da camada de decisão (`AI_DECISION_LAYER.md`) | Datasets sintéticos do EPIC 03 |

## Regras de sequenciamento
- Nenhum código analítico antes do `ANALYTICS_ENGINE.md` fechado o bastante para testar (OD-02).
- Nenhum upload real em produção antes do `PRIVACY.md` final (OD-03).
- Nenhum schema de artefatos narrativos ou derivados por produto antes do `RELATIONSHIP_SNAPSHOT.md` aprovado (OD-16); o bruto só é purgado depois que os derivados aprovados forem gravados de forma durável (ADR-020).
- Nenhum ambiente com cobrança antes do paywall na camada de dados e do teste de acesso direto (ADR-015).
- As landings podem andar em paralelo, mas não prometem nada que os EPICs 02–05 ainda não entregam; a landing de Nossa História espera a spec (ADR-021).
- Login/onboarding do usuário final fica adiado até haver produto que se beneficie dele (OD-20).
