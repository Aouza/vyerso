/**
 * Copy da landing /nos. Fonte única de texto da página: os componentes só
 * apresentam. A copy é DRAFT e exige validação com PRIVACY.md e MONETIZATION.md
 * (LANDING_BRIEF.md §4). Itens entre colchetes são placeholders visíveis até
 * a decisão correspondente existir.
 */

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
    cta: "Entrar na lista",
  },

  hero: {
    eyebrow: "Para quem sentiu e não sabe dizer quando",
    lead: "Talvez você tenha percebido nas conversas. Talvez só não consiga dizer quando.",
    // O trecho "Nós" é destacado pelo componente.
    productBefore: "O ",
    productAfter:
      " analisa a história das suas conversas para mostrar como a forma de vocês se comunicarem mudou ao longo do tempo.",
    cta: "Quero descobrir",
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

  reframe: {
    eyebrow: "Uma mensagem não conta uma relação",
    titleBefore: "Um dia corrido explica uma resposta demorada. ",
    titleAccent: "Meses contam outra história.",
    body: "Uma semana diferente pode não significar nada. É quando olhamos meses ou anos que certos padrões começam a aparecer.",
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

  preview: {
    eyebrow: "Prévia gratuita",
    titleBefore: "A prova de que analisamos a ",
    titleAccent: "sua",
    titleAfter: " conversa",
    body: "Antes de qualquer cobrança, você vê que o Vyerso encontrou algo real na história de vocês. O restante fica no relatório completo.",
    freeLabel: "De graça",
    free: [
      "O que foi analisado: mensagens, tempo e dias com interação",
      "Uma observação sobre a sua conversa, em linguagem neutra",
      "Quantos períodos importantes encontramos",
    ],
    fullLabel: "No relatório completo",
    full: [
      "Qual foi a mudança: quando, o quanto e por quanto tempo",
      "Todos os períodos e a linha do tempo",
      "O que mudou junto, evidências e interpretação",
    ],
    panelLabel: "Sua análise",
    exampleBadge: "Exemplo ilustrativo",
    metrics: [
      { label: "Mensagens analisadas", value: "38.421" },
      { label: "Tempo de conversa", value: "2 anos e 7 meses" },
      { label: "Dias com interação", value: "847" },
    ],
    findingLabel: "O que encontramos",
    findingBadge: "Grátis",
    findingBefore: "Encontramos uma ",
    findingAccent: "mudança consistente",
    findingAfter: " na forma como vocês iniciam conversas.",
    findingNote:
      "Para ver quando começou, o quanto mudou e por quanto tempo, abra a análise completa.",
    periodsTitle: "Encontramos 4 períodos importantes na história de vocês.",
    periodsNote: "Veja quando as mudanças começaram e como a dinâmica evoluiu.",
    periodsCta: "Ver minha análise completa",
    locked: [
      { title: "Quando começou", label: "Quando e o quanto" },
      { title: "Linha do tempo", label: "Todos os períodos" },
      { title: "Evidências", label: "O que mudou junto" },
    ],
    disclaimer:
      "Exemplo com dados fictícios. Os números só aparecem quando são achados reais da sua análise.",
  },

  discoveries: {
    eyebrow: "O que você vai descobrir",
    titleBefore: "A relação por uma perspectiva ",
    titleAccent: "difícil de enxergar",
    titleAfter: " vivendo ela.",
    items: [
      {
        title: "Quem procura quem?",
        text: "Como a iniciativa se distribuiu e se isso mudou.",
      },
      {
        title: "O ritmo mudou?",
        text: "Períodos em que vocês conversavam mais ou menos.",
      },
      {
        title: "Quando as mudanças começaram?",
        text: "Pontos em que certos padrões deixaram de ser como antes.",
      },
      {
        title: "Existiram fases diferentes?",
        text: "Como a dinâmica da conversa evoluiu ao longo do tempo.",
      },
      {
        title: "O que permaneceu?",
        text: "Padrões que continuaram consistentes apesar das mudanças.",
      },
    ],
  },

  mechanism: {
    titleBefore: "Você lembra do que marcou. ",
    titleAccent: "A conversa guarda tudo.",
    items: [
      {
        title: "Foi uma fase ou um dia ruim?",
        text: "Um dia ruim passa. Quando a mudança dura meses, vale prestar atenção.",
      },
      {
        title: "Saber quando começou",
        text: "Com a data na mão, fica mais fácil lembrar o que estava acontecendo naquela época.",
      },
      {
        title: "Tudo vem com prova",
        text: "Mostramos de onde cada resultado saiu, para você conferir.",
      },
    ],
  },

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
          " analisa a evolução ao longo do tempo e mostra o que a história revela.",
      },
    ],
    note: "Não precisa selecionar mensagens nem explicar sua relação antes.",
    alts: {
      export: "Um celular com uma conversa exportando um arquivo de texto",
      confirm: "O arquivo chega e você escolhe qual participante é você",
      analysis: "Uma linha do tempo com 4 períodos importantes encontrados",
    },
  },

  notATest: {
    titleBefore: "Não é um teste de ",
    titleAccent: "compatibilidade.",
    before: "O ",
    after:
      " não vai dizer se vocês “combinam” nem tentar adivinhar o que a outra pessoa sente. Ele encontra padrões nas conversas disponíveis e mostra as evidências para que você enxergue a relação com mais contexto. Menos julgamento, mais trajetória.",
    notSayLabel: "Não dizemos",
    notSay: "“Ela perdeu o interesse em você.”",
    sayLabel: "Dizemos",
    say: "“A participação dela em abrir conversas caiu nas últimas três semanas.”",
  },

  privacy: {
    badge: "Privacidade",
    titleBefore: "Sua conversa é íntima. ",
    titleAccent: "O controle é seu.",
    body: "Suas conversas não deveriam virar nosso banco de dados. O Vyerso processa a conversa e guarda só o mínimo necessário para produzir a sua análise. Veja o caminho do seu arquivo, sem letra miúda.",
    policyLink: "Ler a política de privacidade",
    flowAlt:
      "Ilustração: o arquivo é enviado, vira números, é apagado e fica só o essencial",
    flowLabels: [
      "Você envia",
      "Calculamos os números",
      "Arquivo apagado",
      "Fica só o essencial",
    ],
    pathLabel: "O caminho do seu arquivo",
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
        q: "A IA vai dizer se meu relacionamento é bom ou ruim?",
        before: "Não. O ",
        after:
          " mostra padrões e mudanças observáveis; não sentencia a sua relação.",
      },
      {
        q: "Vocês ficam com as minhas mensagens?",
        a: "[Resposta conforme a política final de privacidade]",
        placeholder: true,
      },
      {
        q: "A outra pessoa precisa participar?",
        a: "[A definir: decisão legal e de produto]",
        placeholder: true,
      },
      {
        q: "Como exporto a conversa do WhatsApp?",
        a: "Na conversa, abra o menu, escolha Exportar conversa e selecione “Sem mídia”. Vamos mostrar o passo a passo completo para Android e iPhone.",
      },
    ],
  },

  offer: {
    eyebrow: "A oferta",
    titleBefore: "Veja a relação de vocês ",
    titleAccent: "pelas conversas.",
    body: "Você começa por uma prévia gratuita. O relatório completo vem depois, com o preço informado antes de qualquer cobrança.",
    planSuffix: ": análise completa",
    items: [
      "Evolução da comunicação",
      "Mudanças relevantes",
      "Períodos e padrões",
      "Evidências da conversa",
    ],
    pendingItems: "[Demais itens: só o que existir no produto]",
    // Preço fora da página até a MONETIZATION.md fechar (LANDING_BRIEF §6).
    price: "[R$ a definir]",
    cta: "Quero ser avisado",
  },

  finalCta: {
    body: "Você não precisa continuar tentando lembrar quando começou, nem comparar conversa por conversa. Veja o que a história das conversas mostra. O Vyerso abre em breve: entre na lista e avisamos.",
    emailLabel: "Seu e-mail",
    emailPlaceholder: "seu@email.com",
    submit: "Quero descobrir",
    consent:
      "Usamos seu e-mail só para avisar da abertura. Sem spam, e você sai quando quiser.",
    policy: "Política de privacidade",
    // Captura de e-mail depende da OD-11; até lá o formulário fica desativado.
    pending: "A lista de espera abre em breve.",
  },

  footer: {
    tagline: "Sua história está nas conversas.",
    disclaimer:
      "Uma leitura de trajetória, não um veredito. Não substitui terapia ou aconselhamento profissional.",
    links: [
      { href: "#privacidade", label: "Privacidade" },
      { href: "#faq", label: "Perguntas" },
      { href: "#lista", label: "Lista de espera" },
    ],
  },
} as const;
