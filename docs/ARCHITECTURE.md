# ARCHITECTURE — Vyerso

**Versão:** 0.1  
**Status:** arquitetura inicial para bootstrap  
**Objetivo:** permitir que Claude Code inicie o projeto sem tomar silenciosamente decisões estruturais que ainda não foram aprovadas.

---

## 1. Princípios

1. **Dados primeiro, LLM depois.**
2. **Lógica analítica independente de UI, Supabase e provider de IA.**
3. **Métricas determinísticas nunca são inventadas por LLM.**
4. **Toda descoberta importante deve ser rastreável a dados/período/evidência.**
5. **Privacidade por padrão.**
6. **Persistir o modelo da conexão; não assumir retenção eterna do conteúdo bruto.**
7. **MVP pequeno. Arquitetura extensível sem construir features futuras agora.**
8. **Testabilidade do engine é requisito de produto.**

---

## 2. Stack aprovada

### Aplicação

- Next.js
- TypeScript strict
- App Router
- Tailwind CSS
- Zod para validação de fronteiras
- Vitest para domínio/engine

### Backend / dados

- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase Row Level Security
- migrations versionadas no repositório

### Ainda NÃO decidido

- provider/modelo LLM;
- provider de pagamentos;
- fila/job runner para análises longas;
- observabilidade de produção;
- retenção exata de raw/normalized messages;
- hosting além da preferência natural por ambiente compatível com Next.js;
- analytics de produto.

Claude **não deve escolher silenciosamente** itens desta lista. Deve propor opções quando uma tarefa depender deles.

---

## 3. Limite arquitetural principal

Supabase é infraestrutura de persistência/autenticação. **Não é o analytics engine.**

Errado:

```ts
async function calculateInitiative() {
  const rows = await supabase.from('messages').select('*')
  // regra de negócio acoplada ao banco
}
```

Preferido:

```ts
const dataset = await repository.loadDataset(connectionId)
const result = calculateInitiative(dataset.messages)
```

O domínio deve poder ser testado com objetos/fixtures locais sem Supabase, rede ou LLM.

---

## 4. Arquitetura de alto nível

```text
Browser
  ↓
Next.js Application
  ├── UI / Product Flows
  ├── Application Services / Use Cases
  ├── Domain: Connection Analytics
  └── Infrastructure Adapters
        ├── Supabase Auth
        ├── Supabase Postgres
        ├── Supabase Storage
        ├── LLM Provider (futuro)
        └── Payment Provider (futuro)
```

Pipeline analítico:

```text
WhatsApp .txt
  ↓
Parser
  ↓
Normalized Dataset
  ↓
Participant Resolution
  ↓
Sessionization
  ↓
Time Buckets
  ↓
Deterministic Metrics
  ↓
Data Sufficiency
  ↓
Change Detection
  ↓
Phase Detection
  ↓
Evidence Selection
  ↓
Connection Analysis DTO
  ↓
Narrative Layer / LLM
  ↓
Product View Model
```

---

## 5. Organização inicial sugerida

A estrutura exata pode ser refinada no bootstrap, mas deve preservar estes limites:

```text
src/
├── app/
├── components/
├── features/
│   ├── auth/
│   ├── connections/
│   ├── imports/
│   ├── analysis/
│   └── billing/          # somente quando entrar no escopo
├── domain/
│   └── connection/
│       ├── parser/
│       ├── normalization/
│       ├── participants/
│       ├── sessions/
│       ├── metrics/
│       ├── sufficiency/
│       ├── changes/
│       ├── phases/
│       └── evidence/
├── application/
├── infrastructure/
│   ├── supabase/
│   ├── storage/
│   ├── ai/
│   └── payments/
└── lib/

tests/
├── fixtures/
│   └── whatsapp/
└── datasets/
```

Evitar arquitetura cerimonial excessiva. A separação existe para proteger o engine, não para criar abstrações sem uso.

---

## 6. Modelo de domínio inicial

### User

Usuário autenticado, proprietário das conexões.

### Connection

Histórico persistente entre o usuário e outra pessoa.

Campos conceituais:

- id;
- ownerUserId;
- displayName;
- contextType opcional;
- createdAt;
- updatedAt;
- knownDateRange;
- lastAnalyzedAt.

### Participant

Pessoa identificada em uma conversa. O usuário deve confirmar qual participante representa a si mesmo.

### ConversationImport

Uma importação específica de arquivo/conversa.

Deve registrar metadados de processamento sem exigir retenção permanente do arquivo bruto.

### Analysis

Execução/versionamento de uma análise sobre uma conexão.

### Derived Results

Métricas, fases, mudanças e evidências associadas a uma análise/conexão.

---

## 7. Contratos centrais do engine

Os nomes finais podem mudar, mas o engine precisa operar sobre estruturas explícitas.

Exemplo conceitual:

```ts
export type NormalizedMessage = {
  id: string
  timestamp: Date
  participantId: string
  text: string
  sourceIndex: number
}

export type ConversationDataset = {
  participants: Participant[]
  messages: NormalizedMessage[]
  dateRange: {
    start: Date
    end: Date
  }
  metadata: {
    source: 'whatsapp'
    locale?: string
    messageCount: number
  }
}
```

Resultados também devem ser estruturados antes da narrativa:

```ts
export type ChangeCandidate = {
  id: string
  metric: string
  beforeWindow: DateRange
  afterWindow: DateRange
  beforeValue: number
  afterValue: number
  magnitude: number
  confidence: number
  evidenceRefs: string[]
}
```

Esses exemplos são direcionais, não API congelada.

---

## 8. Parser do WhatsApp

Primeiro source suportado: export `.txt` do WhatsApp.

O parser deve ser isolado e testado com fixtures.

Cobrir progressivamente:

- formatos de data/hora relevantes para PT-BR;
- mensagens multiline;
- emojis/unicode;
- mídia omitida;
- mensagens de sistema;
- nomes com caracteres especiais;
- alterações de nome/número quando possível;
- linhas malformadas;
- arquivos grandes.

O parser não deve depender de componentes React ou Supabase.

---

## 9. Sessionization e métricas

As definições exatas serão formalizadas em `docs/ANALYTICS_ENGINE.md` antes da implementação completa.

Até lá, não congelar arbitrariamente regras como:

- quantas horas encerram uma sessão;
- como calcular tempo de resposta;
- como definir iniciativa;
- como tratar mensagens consecutivas;
- o que constitui silêncio relevante;
- qual janela usar para change detection.

O bootstrap pode criar interfaces/placeholders e fixtures, mas regras analíticas relevantes devem ser documentadas e testadas antes de virar comportamento de produção.

---

## 10. Change Detection

É o coração do MVP.

Não deve ser implementado como thresholds arbitrários espalhados pela aplicação.

Deve considerar, conforme a métrica:

- baseline;
- janelas temporais;
- volume mínimo;
- magnitude;
- persistência;
- robustez a períodos esparsos;
- múltiplos sinais correlacionados;
- confiança/qualidade do dataset.

O output é estruturado e só depois transformado em narrativa.

---

## 11. LLM boundary

O LLM poderá futuramente:

- sintetizar descobertas estruturadas;
- nomear fases com linguagem natural cuidadosa;
- classificar tópicos/semântica quando necessário;
- produzir narrativa a partir de fatos calculados;
- selecionar/explicar evidências dentro de limites definidos.

O LLM **não deve**:

- inventar métricas;
- recalcular números fornecidos pelo engine;
- diagnosticar psicologicamente participantes;
- afirmar intenção, amor, toxicidade ou traição como fato;
- produzir conclusões não rastreáveis.

Criar uma interface/adaptador de provider quando a integração for introduzida. Não espalhar SDK de provider pelo domínio.

---

## 12. Supabase — responsabilidades

### Auth

- autenticação do usuário;
- sessão;
- ownership.

### PostgreSQL

Persistir:

- connections;
- participants;
- conversation_imports;
- analyses;
- resultados derivados necessários;
- compras/status quando pagamento entrar.

### Storage

- bucket privado para imports quando necessário;
- nunca usar URL pública para conversas;
- lifecycle/retention será definido antes de produção.

### RLS

Todo registro pertencente ao usuário deve ser protegido por RLS. Nenhuma autorização deve depender apenas da UI.

---

## 13. Banco — direção inicial, não migration final

Entidades prováveis:

```text
profiles
connections
participants
conversation_imports
analyses
analysis_metrics
analysis_phases
change_points
evidence
purchases (quando necessário)
```

Não criar todas automaticamente no bootstrap sem `DATABASE.md` ou necessidade do primeiro epic.

Especialmente: **não criar uma tabela gigante de `messages` como decisão implícita.** A estratégia de persistência de conteúdo bruto/normalizado ainda está aberta.

---

## 14. Lifecycle dos dados

Direção desejada:

```text
.txt privado
 ↓
parse
 ↓
dataset normalizado
 ↓
analytics
 ↓
resultados derivados persistidos
 ↓
raw/normalized seguem política explícita de retenção
```

Antes de produção, criar `docs/PRIVACY.md` definindo:

- retenção do raw;
- retenção de mensagens normalizadas;
- anonimização/redação;
- dados enviados ao LLM;
- exclusão;
- logs;
- observabilidade;
- backups;
- tratamento LGPD.

---

## 15. Processamento assíncrono

Análises grandes podem ultrapassar uma request HTTP convencional. Portanto, a arquitetura deve **permitir** processamento assíncrono.

Porém o provider/job runner ainda não foi decidido.

No bootstrap:

- modelar status de import/análise (`pending`, `processing`, `completed`, `failed` ou equivalente);
- evitar acoplar o domínio ao runtime de uma request;
- não adicionar Redis/queue/provider sem decisão explícita.

---

## 16. Estados importantes

ConversationImport / Analysis deve suportar estados explícitos e erros recuperáveis.

Exemplos:

- uploaded;
- parsing;
- needs_participant_confirmation;
- insufficient_data;
- ready;
- analyzing;
- completed;
- failed.

Não usar esses nomes como enum definitivo sem revisão; preservar o conceito de state machine explícita.

---

## 17. Test strategy

### Engine

Prioridade máxima.

Fixtures de WhatsApp:

```text
tests/fixtures/whatsapp/
├── simple-ptbr.txt
├── multiline.txt
├── emoji.txt
├── media-omitted.txt
├── system-messages.txt
├── malformed.txt
└── large-synthetic.txt
```

Datasets sintéticos:

```text
tests/datasets/
├── balanced.json
├── initiative-shift.json
├── gradual-distance.json
├── reconnection.json
└── insufficient-data.json
```

Cada dataset sintético deve ter comportamento esperado documentado.

Exemplo:

> `initiative-shift.json` contém uma mudança conhecida a partir do período X; o detector deve encontrá-la dentro de tolerância definida.

### UI

Testar fluxos críticos, não snapshot de tudo.

---

## 18. Segurança / privacidade mínima desde o bootstrap

- nunca `console.log` de conteúdo de conversa;
- nunca enviar conteúdo para analytics de produto;
- nunca usar bucket público;
- secrets apenas server-side;
- validar tamanho/tipo de upload;
- sanitizar nomes de arquivo;
- não expor service role ao browser;
- RLS obrigatória para dados persistidos;
- cards compartilháveis não incluem mensagem privada por padrão.

---

## 19. Primeiros epics técnicos

### EPIC 00 — Foundation

- bootstrap Next.js/TS/App Router/Tailwind;
- lint/format/typecheck;
- Vitest;
- env validation;
- clientes Supabase server/browser corretamente separados;
- estrutura de docs;
- CI mínima se solicitado.

**Não implementar produto ainda.**

### EPIC 01 — Connection foundation

- auth;
- modelo mínimo de Connection;
- RLS;
- tela/listagem mínima de conexões;
- criar nova conexão.

### EPIC 02 — WhatsApp import/parser

- upload privado;
- parser isolado;
- fixtures/testes;
- participant detection;
- confirmação de “quem é você?”.

### EPIC 03 — Analytics foundation

- sessionization definida;
- time buckets;
- métricas iniciais;
- Data Sufficiency;
- datasets sintéticos/testes.

### EPIC 04 — O Que Mudou? engine

- baseline/windows;
- change candidates;
- magnitude/persistência;
- phase detection inicial;
- evidence refs.

### EPIC 05 — Product experience

- review;
- processing state;
- Free Reveal;
- paywall;
- relatório completo;
- persistência dos resultados.

Pagamento entra somente quando provider for decidido.

---

## 20. Regras para decisões futuras

Antes de adicionar dependência, serviço ou abstração relevante:

1. qual problema concreto resolve agora?
2. existe alternativa mais simples?
3. cria lock-in desnecessário?
4. toca dados sensíveis?
5. precisa de ADR em `DECISIONS.md`?

Significant decisions devem ser registradas em `docs/DECISIONS.md`.

---

## 21. O que Claude deve fazer primeiro

Ao receber estes documentos:

1. ler `CLAUDE.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md` e `docs/DECISIONS.md`;
2. **não implementar features imediatamente**;
3. auditar a arquitetura contra o MVP **O Que Mudou?**;
4. listar riscos, decisões abertas e inconsistências;
5. propor o plano do EPIC 00;
6. aguardar aprovação antes de alterações estruturais relevantes.

A meta inicial é um foundation limpo e um engine testável — não quantidade de telas.
