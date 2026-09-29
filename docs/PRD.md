# PRD — Vyerso

**Versão:** 5.0  
**Status:** Product Definition / pré-implementação  
**Mercado inicial:** Brasil  
**Plataforma inicial:** Web mobile-first  
**Aquisição principal:** TikTok / Reels / conteúdo orgânico e pago  
**Modelo inicial:** experiência gratuita limitada + compras avulsas  
**Assinatura:** hipótese futura, não MVP

---

## 0. Escopo operacional atual

Este documento descreve a visão do Vyerso, inclusive produtos futuros. **A presença de uma funcionalidade neste PRD não autoriza sua implementação agora.**

O primeiro produto a ser construído é **O Que Mudou?**.

### MVP inclui

- autenticação;
- múltiplas conexões persistentes por usuário;
- importação de conversa do WhatsApp via `.txt`;
- parser e normalização;
- confirmação dos participantes;
- Data Sufficiency;
- métricas temporais/comportamentais determinísticas;
- detecção inicial de mudanças;
- detecção inicial de fases;
- camada de evidências;
- Free Reveal;
- paywall/pagamento;
- relatório **O Que Mudou?**;
- persistência dos resultados da conexão/análises;
- cards compartilháveis básicos, sem expor mensagens privadas por padrão.

### NÃO implementar sem decisão explícita

- Nossa História;
- Nossas Memórias / Memory Mining completo;
- Nosso Cantinho completo;
- Tá Rolando?;
- Como Chegamos Aqui?;
- Pergunte ao Vyerso;
- Desde a Última Vez / atualização incremental completa;
- assinatura;
- Instagram, screenshots ou áudio;
- integração direta com WhatsApp;
- astrologia;
- scores de amor, toxicidade, compatibilidade ou interesse;
- recomendações, soundtrack ou arte gerada.

---

## 1. Visão

# Vyerso

**Sua história está nas conversas.**

Vyerso transforma históricos de conversa entre duas pessoas em uma representação estruturada de como aquela conexão evoluiu ao longo do tempo.

O objetivo não é simplesmente pedir para uma IA “analisar um relacionamento”. O produto deve reconstruir trajetória, detectar mudanças observáveis, organizar fases e conectar descobertas a dados e evidências.

A visão de longo prazo é permitir que o usuário tenha **várias conexões persistidas** e possa continuar explorando ou atualizando cada uma delas ao longo do tempo.

---

## 2. Problema

Milhares de mensagens contêm sinais sobre a evolução de uma conexão, mas são praticamente impossíveis de compreender longitudinalmente.

As pessoas conseguem sentir:

> “Alguma coisa mudou.”

Mas dificilmente conseguem responder com clareza:

- quando começou a mudar?
- o que mudou junto?
- quem passou a iniciar mais conversas?
- a frequência mudou?
- esse padrão já aconteceu antes?
- foi uma oscilação curta ou uma nova fase?
- como chegamos até aqui?

LLMs genéricos são bons em interpretar trechos. O Vyerso deve ser especialmente bom em **reconstruir e comparar períodos inteiros**.

---

## 3. Tese central

Não construir:

`upload → prompt → texto de IA → fim`

Construir:

`conversa → dados estruturados → métricas → mudanças → fases → evidências → modelo da conexão → experiência`

A primeira análise é apenas o começo potencial do ciclo de vida da conexão.

---

## 4. Entidade central: Conexão

Um usuário pode analisar conversas com **mais de uma pessoa**.

Exemplo conceitual:

```text
Usuário
├── Conexão A
│   ├── participantes
│   ├── imports
│   ├── análises
│   ├── métricas
│   ├── fases
│   ├── mudanças
│   └── evidências
├── Conexão B
└── Conexão C
```

**Conexão** é o objeto persistente que representa o histórico conhecido entre o usuário e outra pessoa.

Tipos iniciais de contexto podem incluir internamente `partner`, `dating` e `ex`, mas o MVP não precisa oferecer experiências separadas para cada tipo.

Na UX, evitar linguagem de CRM. Preferir termos humanos como **Suas histórias**, **Suas conversas** ou outra nomenclatura a validar.

---

## 5. Aprendizado competitivo

O benchmark do ThirdPerson mostrou que concorrentes já oferecem combinações de:

- upload de WhatsApp;
- métricas;
- reciprocidade;
- timeline;
- eventos;
- evidências;
- perfis;
- red/green flags;
- scores;
- recomendações;
- experiências personalizadas.

Essas features isoladas não são diferenciação suficiente.

Também identificamos um **Retention Gap**: uma experiência muito completa pode entregar todo o valor em uma única sessão e deixar pouco motivo para retorno.

Vyerso deve vencer primeiro na análise inicial, mas sua arquitetura deve permitir que o histórico persistido gere valor futuro.

---

## 6. Posicionamento

Concorrentes frequentemente respondem:

> “O que essa conversa diz sobre vocês?”

Vyerso deve ser especialmente bom em responder:

> **“O que aconteceu entre vocês ao longo do tempo?”**

E futuramente:

> **“O que aconteceu desde a última vez?”**

Princípio: **menos julgamento, mais trajetória.**

---

## 7. Portfólio em PT-BR

### MVP

#### O Que Mudou?

Hero product.

> **Descubra quando a dinâmica entre vocês começou a mudar — e o que mudou junto.**

### Futuro

#### Nossa História

Experiência emocional e nostálgica que transforma anos de conversa em narrativa e memórias.

#### Tá Rolando?

Experiência para conexões recentes, orientada à evolução observável da conversa.

#### Como Chegamos Aqui?

Experiência orientada à trajetória, especialmente útil para ex ou relações em transição.

#### Pergunte ao Vyerso

Exploração conversacional do modelo persistido da conexão, sempre baseada em dados/evidências disponíveis.

#### A Gente em Números

Recap compartilhável com estatísticas e curiosidades seguras.

#### Nosso Cantinho

Camada persistente e emocional para guardar história e memórias.

#### Desde a Última Vez

Atualização de uma conexão já conhecida para identificar novas mensagens, mudanças e fases.

---

## 8. Relationship / Connection Data Engine

Todos os produtos devem compartilhar o mesmo núcleo analítico.

```text
Input
 ↓
Parser
 ↓
Normalização
 ↓
Participantes
 ↓
Sessionization
 ↓
Time Buckets
 ↓
Métricas determinísticas
 ↓
Data Sufficiency
 ↓
Change Detection
 ↓
Phase Detection
 ↓
Evidence Layer
 ↓
Connection Model
 ↓
LLM / Narrative Layer
 ↓
Experiência
```

### Regra fundamental

**LLM não calcula métricas determinísticas.**

O modelo de linguagem pode auxiliar em classificação semântica, síntese e narrativa, mas números, períodos, deltas e evidências devem vir de estruturas calculadas e auditáveis.

---

## 9. O Que Mudou? — experiência do MVP

### Job to be done

> “Sinto que alguma coisa mudou entre nós. Quero entender quando e o quê.”

### Fluxo

```text
Landing
 ↓
Conta / autenticação
 ↓
Criar nova conexão
 ↓
Contexto básico
 ↓
Upload WhatsApp .txt
 ↓
Parse + proteção de dados
 ↓
Confirmar participantes / quem é você
 ↓
Review + Data Sufficiency
 ↓
Processamento
 ↓
Free Reveal
 ↓
Paywall
 ↓
Relatório completo
 ↓
Conexão permanece salva
```

### Resultado esperado

O relatório deve priorizar:

1. **o que mudou**;
2. **quando mudou**;
3. **magnitude da mudança**;
4. **o que mudou junto**;
5. **se a mudança persistiu**;
6. **se há padrão semelhante em outro período**, quando houver base suficiente;
7. **dados/evidências que sustentam a descoberta**.

Exemplo:

> **Encontramos uma mudança importante em maio.**
>
> Antes desse período, a iniciativa estava aproximadamente equilibrada. Depois, sua participação na abertura de novas conversas passou de 49% para 68%.

Abaixo, mostrar métricas correlacionadas e permitir explorar o período.

---

## 10. Fases

O sistema deve tentar segmentar o histórico em períodos comportamentalmente distintos.

Exemplo conceitual:

1. primeiros contatos;
2. aproximação;
3. maior reciprocidade;
4. mudança relevante;
5. nova dinâmica.

Os rótulos apresentados ao usuário devem ser cuidadosos e não afirmar estados psicológicos não observáveis.

---

## 11. Evidence-first

Toda descoberta importante deve ser rastreável.

```text
Insight
 ↓
Métrica / sinal
 ↓
Período
 ↓
Evidência disponível
```

Evitar afirmações como:

- “ela perdeu o interesse”;
- “ele é tóxico”;
- “vocês são 82% compatíveis”.

Preferir:

> “A participação dela na abertura de novas conversas caiu nas últimas três semanas.”

---

## 12. Data Sufficiency

Antes de oferecer uma conclusão, avaliar pelo menos:

- número de mensagens;
- duração coberta;
- número e identificação de participantes;
- distribuição temporal;
- continuidade;
- qualidade do parse;
- densidade;
- timestamps disponíveis;
- cobertura necessária para a métrica/insight.

O produto deve saber dizer **“não temos dados suficientes para concluir isso”**.

---

## 13. Free Reveal

Não entregar o relatório completo gratuitamente.

O gratuito deve provar que o Vyerso encontrou algo real, sem consumir todo o valor.

Exemplo:

> **38.491 mensagens**  
> **17 meses**  
> **5 fases identificadas**  
> **4 mudanças relevantes**

Entregar uma descoberta real e deixar a exploração completa bloqueada.

Hipótese inicial de preço para **O Que Mudou?**: **R$19,90**.

Preço ainda é hipótese e deve ser testado.

---

## 14. Persistência e recorrência

Desde o MVP, persistir a **Conexão** e seus resultados derivados.

Isso permite:

- o usuário retornar à análise comprada;
- manter várias pessoas/conexões;
- futuras atualizações incrementais;
- produtos futuros sobre a mesma conexão;
- recompra sem depender de assinatura.

### Dois loops potenciais

**Profundidade:** mesma conexão → novas análises → atualização → história/memórias.

**Amplitude:** usuário → nova conexão → nova compra/análise.

Assinatura só deve ser considerada se comportamento recorrente real justificar.

---

## 15. Dados brutos não são iguais a modelo persistido

Decisão de produto:

- **Conexão e resultados derivados:** persistentes;
- **arquivo `.txt` original:** não assumir retenção indefinida;
- **mensagens normalizadas em texto puro:** política ainda precisa ser fechada em `PRIVACY.md`/`DATABASE.md`.

Não armazenar conteúdo sensível indefinidamente apenas por conveniência técnica.

---

## 16. Privacidade como parte do produto

O Vyerso processa dados extremamente íntimos. Privacidade não pode ficar apenas nos Termos.

Princípios:

- privado por padrão;
- Storage nunca público para conversas;
- RLS em todos os dados do usuário;
- não registrar conteúdo de mensagens em logs;
- minimizar dados enviados a provedores externos;
- permitir exclusão;
- deixar claro o que é armazenado e por quanto tempo;
- nenhuma mensagem privada em card compartilhável por padrão.

Uma política técnica detalhada será definida em `docs/PRIVACY.md` antes do upload real entrar em produção.

---

## 17. Processamento percebido

Evitar spinner genérico. Comunicar etapas reais do pipeline, sem fingir operações inexistentes.

Exemplo:

- Organizando a conversa
- Reconstruindo a linha do tempo
- Calculando padrões
- Comparando períodos
- Procurando mudanças relevantes
- Conectando descobertas aos dados
- Preparando sua análise

---

## 18. Aquisição

Não vender “IA que analisa WhatsApp”.

Vender perguntas/dor:

> “Você sente que alguma coisa mudou, mas não sabe exatamente quando?”

> “O que 80 mil mensagens dizem sobre como vocês chegaram até aqui?”

> “Dá para enxergar quando a dinâmica começou a mudar?”

TikTok/Reels são canais prioritários de validação e aquisição.

---

## 19. Monetização inicial

### MVP

- Free Reveal: grátis;
- O Que Mudou?: hipótese R$19,90;
- nova conexão: nova oportunidade de compra.

### Futuro

- Nossa História;
- Desde a Última Vez;
- experiências específicas por contexto;
- possível plano recorrente apenas após validar frequência e disposição a pagar.

---

## 20. Métricas do MVP

```text
landing_view
→ analysis_started
→ file_uploaded
→ parse_completed
→ participants_confirmed
→ dataset_eligible
→ free_reveal_viewed
→ paywall_viewed
→ checkout_started
→ purchase_completed
→ analysis_completed
→ insight_explored
→ share_card_generated
→ share_clicked
```

### North Star inicial

**Paid Insight Rate:** percentual de datasets elegíveis que recebem Free Reveal, compram e exploram pelo menos um insight/evidência.

---

## 21. Hipóteses críticas

1. usuários brasileiros aceitam exportar WhatsApp;
2. o engine encontra mudanças percebidas como reais e relevantes;
3. evidências aumentam confiança;
4. Free Reveal gera curiosidade sem matar conversão;
5. usuários pagam aproximadamente R$20;
6. análise longitudinal é percebida como superior a jogar um trecho em um chatbot;
7. usuários valorizam manter suas conexões/análises salvas;
8. parte dos usuários analisa mais de uma pessoa;
9. futuramente, parte dos usuários aceita reenviar a conversa para atualizar a mesma conexão.

---

## 22. Fora de escopo do MVP

- app nativo;
- Instagram;
- screenshot OCR;
- áudio;
- monitoramento automático;
- integração direta com WhatsApp;
- astrologia;
- diagnóstico psicológico;
- red/green flag engine como produto principal;
- scores arbitrários;
- terapia;
- assinatura;
- Nossa História completa;
- Nosso Cantinho completo;
- Memory Mining completo;
- Pergunte ao Vyerso;
- Tá Rolando?;
- Como Chegamos Aqui?.

---

## 23. Regra estratégica

Toda nova feature deve responder:

1. resolve uma dor ou desejo real?
2. usa nosso histórico longitudinal de forma relevante?
3. aumenta aquisição, conversão, valor, compartilhamento ou retenção?
4. um chatbot genérico com um trecho de conversa reproduziria facilmente isso?

Se a resposta à quarta for “sim” e não existir outra vantagem clara, **não construir**.

---

## 24. Definição final

# Vyerso

**Sua história está nas conversas.**

Primeiro produto:

# O Que Mudou?

**Descubra quando a dinâmica entre vocês começou a mudar — e o que mudou junto.**

O objetivo do MVP não é provar que conseguimos gerar um relatório bonito. É provar que conseguimos encontrar mudanças úteis, explicáveis e valiosas o suficiente para alguém pagar por elas.
