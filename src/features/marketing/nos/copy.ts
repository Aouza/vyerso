/**
 * Copy da landing /nos. Fonte única de texto da página: os componentes só
 * apresentam. A copy é DRAFT e exige validação com PRIVACY.md e MONETIZATION.md
 * (LANDING_BRIEF.md §4). Itens entre colchetes são placeholders visíveis até
 * a decisão correspondente existir.
 */

/**
 * Fake door: mede interesse em EXPERIMENTAR, não intenção de compra (o funil
 * real é Free Reveal → paywall). Todo CTA leva à tela de interesse, onde (e só
 * ali) se pede o e-mail. A página não mostra preço (LANDING_BRIEF §6, OD-08).
 */
export const INTEREST_PATH = "/nos/interesse";

const CTA = {
  header: "Analisar minha conversa",
  main: "Quero analisar minha conversa",
} as const;

export type HeadlineVariant = "controle" | "variacao";

export const HEADLINES: Record<
  HeadlineVariant,
  { lead: string; accent: string }
> = {
  controle: { lead: "Algo mudou", accent: "entre vocês?" },
  variacao: { lead: "Mudou mesmo ou você está", accent: "pensando demais?" },
};

export const nosCopy = {
  nav: {
    brand: "Vyerso",
    links: [
      { href: "#como", label: "Como funciona" },
      { href: "#previa", label: "Prévia" },
      { href: "#privacidade", label: "Privacidade" },
      { href: "#faq", label: "Perguntas" },
    ],
    cta: CTA.header,
  },

  // 01 · Hero: a dúvida que já existe.
  hero: {
    eyebrow: "Para quem sentiu e não sabe dizer quando",
    lead: "Talvez você tenha percebido nas conversas. Talvez só não consiga dizer quando.",
    // O trecho "Nós" é destacado pelo componente.
    productBefore: "O ",
    productAfter:
      " analisa a história das suas conversas para mostrar como a forma de vocês se comunicarem mudou ao longo do tempo.",
    cta: CTA.main,
    privacyBefore: "Sua conversa é privada. ",
    privacyLink: "Saiba como protegemos seus dados.",
    sourceLabel: "Comece por uma conversa do",
    source: "WhatsApp",
    card: {
      kicker: "Uma perspectiva com dados",
      badge: "Relatório de exemplo",
      title: "Você & [Pessoa]",
      subtitle: "38 mil mensagens. 17 meses.",
      baseLabel: "Base de dados",
      baseValue: "Dados suficientes",
      findingLabel: "O que encontramos",
      findingBefore: "Encontramos uma ",
      findingAccent: "mudança consistente",
      findingAfter: " na forma como vocês iniciam conversas.",
      periods: "Encontramos 4 períodos importantes.",
      lockedTitle: "Quando essa mudança começou",
      lockedLabel: "Na análise completa",
      chipPeriods: "4 períodos",
      chipEvidence: "com evidências",
    },
    floatTitle: "Da dúvida ao dado",
    floatBefore: "De “será que mudou?” para ",
    floatAccent: "“encontramos uma mudança”.",
    bubbles: { you: "Bom dia!", person: "ok" },
  },

  // 02 · Espelho emocional.
  mirror: {
    eyebrow: "Você já percebeu isso?",
    titleBefore: "Às vezes não acontece ",
    titleAccent: "de uma vez.",
    lines: [
      "As respostas ficam diferentes.",
      "Um começa a procurar mais que o outro.",
      "As conversas diminuem.",
      "Alguns hábitos simplesmente desaparecem.",
    ],
    question: "E fica aquela dúvida: mudou mesmo ou estou pensando demais?",
    note: "Não estamos dizendo que isso significa desinteresse. Só reconhecemos a pergunta que está na sua cabeça.",
  },

  // 03 · O paradoxo da mensagem isolada.
  reframe: {
    titleBefore: "Um dia corrido explica uma resposta demorada. ",
    titleAccent: "Meses contam outra história.",
    body: "Uma semana diferente pode não significar nada. Você lembra do que marcou. A conversa guarda tudo.",
    singleLabel: "Uma mensagem",
    singleMessage: "“ok”",
    singleNote: "não significa quase nada.",
    manyLabel: "18 meses de conversa",
    manyTitle: "começam a formar contexto.",
    chips: [
      "iniciativa",
      "frequência",
      "ritmo",
      "respostas",
      "períodos",
      "mudanças",
    ],
    barsAlt:
      "Ilustração: o volume de mensagens de cada um dos 18 meses formando um desenho",
    barsStart: "mês 1",
    barsEnd: "mês 18",
  },

  // 04 · A descoberta do mecanismo: a evolução, visível.
  mechanism: {
    eyebrowBefore: "Como o ",
    eyebrowAfter: " enxerga",
    titleBefore: "E se você pudesse enxergar a ",
    titleAccent: "evolução das conversas?",
    bodyBefore: "Meses de conversa são difíceis de observar à mão. O ",
    bodyAfter:
      " organiza a história em períodos, mostra onde algo mudou e o que continuou igual.",
    badge: "Exemplo ilustrativo do relatório completo",
    alt: "Ilustração: duas linhas mostram quem inicia as conversas ao longo de 31 meses, dividido em 4 períodos, com um ponto de mudança marcado",
    periods: ["Período 1", "Período 2", "Período 3", "Período 4"],
    changeLabel: "algo mudou",
    start: "mês 1",
    end: "mês 31",
    legendYou: "Quem inicia (você)",
    legendPerson: "Quem inicia (outra pessoa)",
    captions: [
      {
        title: "Períodos",
        text: "A história dividida em fases, em vez de um bloco só.",
      },
      {
        title: "Mudanças",
        text: "O ponto em que algo deixou de ser como antes.",
      },
      {
        title: "Continuidade",
        text: "O que permaneceu igual, apesar das mudanças.",
      },
    ],
  },

  // 05 · Demonstração do Free Reveal (só o formato; OD-23 define o conteúdo).
  preview: {
    eyebrow: "Prévia gratuita",
    titleBefore: "Veja como o ",
    titleMid: " transforma conversas em ",
    titleAccent: "descobertas.",
    steps: [
      "Analisamos o histórico.",
      "Encontramos uma mudança.",
      "O relatório mostra quando e como ela aconteceu.",
    ],
    note: "Nem toda conversa terá uma mudança. O relatório mostra o que for encontrado.",
    cta: CTA.main,
    panelLabel: "Sua análise",
    exampleBadge: "Exemplo ilustrativo",
    processing: "Analisando 38.421 mensagens · 2 anos e 7 meses",
    tiles: [
      { value: "38.421", label: "mensagens" },
      { value: "2a 7m", label: "de histórico" },
      { value: "4", label: "períodos" },
    ],
    findingLabel: "O que encontramos",
    findingBadge: "Grátis",
    findingBefore: "Encontramos uma ",
    findingAccent: "mudança consistente",
    findingAfter: " na forma como vocês iniciam conversas.",
    periods: "Encontramos 4 períodos importantes na história de vocês.",
    fullLabel: "No relatório completo você recebe:",
    locked: [
      { title: "Quando começou", label: "Quando começou e como evoluiu" },
      { title: "Linha do tempo", label: "Todos os períodos" },
      { title: "Evidências", label: "O que mudou junto" },
    ],
    disclaimer:
      "Dados fictícios para demonstrar o formato. Uma análise real pode encontrar padrões diferentes.",
  },

  // 06 · O que você pode descobrir, cada pergunta com uma microdemonstração.
  discoveries: {
    eyebrow: "O que você pode descobrir",
    titleBefore: "A relação por uma perspectiva ",
    titleAccent: "difícil de enxergar",
    titleAfter: " vivendo ela.",
    badge: "Desenhos ilustrativos",
    items: [
      {
        key: "initiative",
        title: "Quem procura quem?",
        text: "Como a iniciativa se distribuiu e se isso mudou.",
        alt: "Duas linhas de iniciativa se aproximando e se afastando",
      },
      {
        key: "rhythm",
        title: "O ritmo mudou?",
        text: "Períodos em que vocês conversavam mais ou menos.",
        alt: "Barras de volume de mensagens com um período mais baixo no meio",
      },
      {
        key: "start",
        title: "Quando as mudanças começaram?",
        text: "Pontos em que certos padrões deixaram de ser como antes.",
        alt: "Uma linha com um degrau e um ponto marcando quando a mudança começou",
      },
      {
        key: "phase",
        title: "Foi uma fase ou um dia ruim?",
        text: "Um dia ruim passa. Quando a mudança dura meses, vale prestar atenção.",
        alt: "Dois gráficos: uma queda que passa e uma mudança que continua",
        labels: ["passou", "ficou"],
      },
      {
        key: "constant",
        title: "O que permaneceu?",
        text: "Padrões que continuaram consistentes apesar das mudanças.",
        alt: "Três linhas constantes que representam o que permaneceu igual",
      },
    ],
    callout:
      "Cada descoberta mostra de onde saiu: período, números e trechos curtos.",
    cta: CTA.main,
  },

  // 07 · Por que isso é diferente.
  different: {
    eyebrow: "Por que isso é diferente",
    titleBefore: "Não é um teste de compatibilidade. ",
    titleAccent: "Nem uma opinião sobre uma mensagem.",
    before: "O ",
    after:
      " não vai dizer se vocês “combinam” nem tentar adivinhar o que a outra pessoa sente. Ele encontra padrões nas conversas disponíveis e mostra as evidências, para você enxergar a relação com mais contexto.",
    items: [
      {
        title: "Análise ao longo do tempo",
        text: "Meses ou anos de conversa, organizados por período. Não só um trecho.",
      },
      {
        title: "Evidências verificáveis",
        text: "Cada descoberta aponta o período, os números e os trechos curtos de onde saiu.",
      },
      {
        title: "Limites explícitos",
        text: "Quando não há dados suficientes, dizemos isso em vez de forçar uma conclusão.",
      },
    ],
    genericLabel: "Colar algumas mensagens numa IA genérica",
    generic:
      "Dá uma opinião sobre aquele trecho, sem contexto de meses de conversa.",
    nosText:
      "Organiza a história por período, com números e evidências que você pode conferir.",
    notSayLabel: "Não dizemos",
    notSay: "“Ela perdeu o interesse em você.”",
    sayLabel: "Dizemos",
    say: "“A participação dela em abrir conversas caiu nas últimas três semanas.”",
  },

  // 08 · Como funciona.
  how: {
    titleBefore: "Sua história já está nas conversas. ",
    titleAccent: "Sem quiz.",
    steps: [
      {
        title: "Exporte a conversa",
        text: "Um arquivo .txt do WhatsApp, sem mídia. Mostramos o passo a passo para Android e iPhone.",
      },
      {
        title: "Envie e confirme quem é quem",
        text: "Você indica qual participante é você e vê se há dados suficientes para uma leitura confiável.",
      },
      {
        // "Nós" destacado pelo componente.
        titleAfter: "Receba sua análise",
        textBefore: "O ",
        textAfter:
          " analisa a evolução ao longo do tempo e mostra uma prévia gratuita. Só depois você decide se quer o relatório completo.",
      },
    ],
    note: "Não precisa selecionar mensagens nem explicar sua relação antes.",
    alts: {
      export: "Um celular com uma conversa exportando um arquivo de texto",
      confirm: "O arquivo chega e você escolhe qual participante é você",
      analysis: "Uma linha do tempo com 4 períodos importantes encontrados",
    },
  },

  // 09 · Privacidade e controle, em duas camadas. O que ainda não existe é
  // apresentado como "será assim" (nada foi enviado nem processado ainda).
  privacy: {
    badge: "Privacidade",
    titleBefore: "Sua conversa é íntima. ",
    titleAccent: "O controle é seu.",
    body: "Suas conversas não deveriam virar nosso banco de dados. Quando o Vyerso abrir, será assim:",
    policyLink: "Ler a política de privacidade",
    guarantees: [
      "O arquivo é apagado depois da análise",
      "Guardamos só resultados e trechos curtos, nunca a conversa inteira",
      "Só você acessa, e pode excluir tudo quando quiser",
    ],
    note: "Quando o Vyerso abrir, será assim. Os prazos e detalhes finais estarão na Política de Privacidade.",
    more: "Ver o caminho do seu arquivo e o que fica",
    flowAlt:
      "Ilustração: o arquivo é enviado, vira números, é apagado e fica só o essencial",
    flowLabels: [
      "Você envia",
      "Calculamos os números",
      "Arquivo apagado",
      "Fica só o essencial",
    ],
    pathLabel: "Como será o caminho do seu arquivo",
    steps: [
      {
        tag: "PASSO 1",
        title: "Você envia o arquivo",
        text: "Ele vai para um espaço privado, acessível só pela sua conta.",
      },
      {
        tag: "PASSO 2",
        title: "Calculamos os números",
        text: "O arquivo é lido uma vez para encontrar mudanças, fases e evidências.",
      },
      {
        tag: "APAGADO",
        title: "O arquivo original é apagado",
        // [X] é placeholder até o PRIVACY.md fechar o prazo.
        text: "Assim que a análise termina. Se você abandonar o envio, em até [X] dias.",
      },
      {
        tag: "PASSO 4",
        title: "Fica só o necessário",
        text: "Números e trechos curtos que sustentam cada descoberta do relatório.",
      },
    ],
    keepLabel: "O que fica",
    keep: [
      "Métricas e números do período",
      "Fases e mudanças encontradas",
      "Trechos curtos como evidência",
    ],
    neverLabel: "O que nunca fica",
    never: [
      "A conversa inteira",
      "O arquivo original, depois da análise",
      "Acesso de outras pessoas ao seu relatório",
    ],
    control: {
      title: "Seu controle",
      badge: "Como será no app",
      items: [
        {
          title: "Privado por padrão",
          text: "Só você acessa suas conexões e relatórios.",
          action: "Ativo",
        },
        {
          title: "Conexão “Ana”",
          text: "Apaga resultados e trechos desta conexão.",
          action: "Excluir",
        },
        {
          title: "Minha conta",
          text: "Apaga tudo: conexões, resultados e trechos.",
          action: "Excluir tudo",
        },
      ],
    },
    footnote:
      "Os prazos e detalhes finais estarão na Política de Privacidade, antes de qualquer envio de arquivo.",
  },

  // 10 · Convite à descoberta (substitui a oferta: sem preço nesta fase).
  invite: {
    eyebrow: "Convite",
    titleBefore: "Veja o que o ",
    titleAccent: "encontraria na sua conversa.",
    body: "Você começa pela prévia gratuita. O relatório completo é opcional e vem depois, se você quiser ver o restante.",
    listTitle: "O que você poderá ver",
    items: [
      "A evolução da comunicação ao longo do tempo",
      "As mudanças relevantes e quando começaram",
      "Os períodos e os padrões de cada um",
      "As evidências da conversa, para você conferir",
    ],
    note: "Nenhum arquivo precisa ser enviado agora.",
    cta: CTA.main,
  },

  // 11 · Objeções reais.
  objections: {
    titleBefore: "Antes de enviar uma conversa, ",
    titleAccent: "é normal ter dúvidas.",
    items: [
      {
        q: "Minha conversa tem anos. Isso atrapalha?",
        a: "Pelo contrário: é esse histórico que permite observar mudanças ao longo do tempo.",
      },
      {
        q: "E se o histórico não começar no início da relação?",
        before: "Tudo bem. O ",
        after:
          " analisa só o período disponível e deixa isso claro no resultado.",
      },
      {
        q: "E se não houver nenhuma mudança?",
        before: "Tudo bem. Estabilidade também é uma descoberta: o ",
        after:
          " mostra o que permaneceu e diz quando não há mudança relevante.",
      },
      {
        q: "A IA vai dizer se meu relacionamento é bom ou ruim?",
        before: "Não. O ",
        after:
          " mostra padrões e mudanças observáveis; não sentencia a sua relação.",
      },
      {
        q: "Dá para confiar nos resultados?",
        a: "Cada descoberta mostra de onde saiu: período, números e trechos curtos. Quando não há dados suficientes, dizemos isso.",
      },
      {
        q: "Vocês ficam com as minhas mensagens?",
        before: "Quando o ",
        after:
          " abrir, será assim: guardamos resultados e trechos curtos, nunca a conversa inteira, e o arquivo original é apagado depois da análise.",
      },
      {
        q: "A outra pessoa precisa participar?",
        before: "Ela não precisa fazer nada. O ",
        after:
          " analisa só a conversa que você exporta do seu WhatsApp. Estamos definindo com cuidado as regras de uso e consentimento antes de abrir.",
      },
      {
        q: "Preciso criar uma conta?",
        a: "Ainda estamos definindo o formato de acesso. Você será avisado antes de qualquer etapa.",
      },
      {
        q: "Como exporto a conversa do WhatsApp?",
        a: "Na conversa, abra o menu, escolha Exportar conversa e selecione “Sem mídia”. Vamos mostrar o passo a passo completo para Android e iPhone.",
      },
    ],
  },

  // 12 · Fechamento.
  finalCta: {
    titleBefore: "Você conhece as mensagens. ",
    titleAccent: "Talvez ainda não tenha visto a trajetória.",
    body: "Você não precisa continuar tentando lembrar quando começou, nem comparar conversa por conversa. Veja o que a história das conversas mostra.",
    cta: CTA.main,
  },

  footer: {
    tagline: "Sua história está nas conversas.",
    disclaimer:
      "Uma leitura de trajetória, não um veredito. Não substitui terapia ou aconselhamento profissional.",
    links: [
      { href: "#privacidade", label: "Privacidade" },
      { href: "#faq", label: "Perguntas" },
      { href: INTEREST_PATH, label: "Tenho interesse" },
    ],
  },

  // Tela de interesse (fake door): primeira vez que pedimos o e-mail.
  interest: {
    back: "Voltar",
    eyebrow: "Quase lá",
    titleBefore: "Você quer ver a sua análise. ",
    titleAccent: "Ainda estamos abrindo.",
    // "Nós" destacado pelo componente.
    bodyBefore: "Obrigado pelo interesse. Para ser transparente: o ",
    bodyAfter: " ainda não está disponível.",
    truth: [
      "Nada foi cobrado de você.",
      "Nenhuma conversa foi enviada, e nenhum arquivo precisa ser enviado agora.",
      "Seu e-mail só é usado para avisar da abertura.",
    ],
    emailTitle: "Quer ser avisado quando abrir?",
    emailLabel: "Seu e-mail",
    emailPlaceholder: "seu@email.com",
    submit: "Avisar quando abrir",
    consent: "Sem spam, e você sai quando quiser.",
    policy: "Política de privacidade",
    questionLabel: "O que você mais quer descobrir? (opcional)",
    options: [
      "Quem procura quem",
      "Quando a conversa mudou",
      "Se foi uma fase ou um dia ruim",
      "O que continuou igual",
    ],
    // Captura depende da OD-11 (onde guardar); até lá o formulário fica desativado.
    pending: "Estamos preparando a lista. Volte em breve.",
  },
} as const;
