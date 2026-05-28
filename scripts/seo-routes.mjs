export const siteUrl = "https://dentistagabrielrockenbach.com.br";
export const oldDomainParts = ["dentista-gabriel", "buchholz", "net", "br"];
export const oldDomain = oldDomainParts.join(".");

export const sharedSchemas = [
  {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness"],
    "@id": `${siteUrl}/#dentist`,
    name: "Dr. Gabriel Paulo Rockenbach",
    url: `${siteUrl}/`,
    image: `${siteUrl}/og-image.png`,
    description:
      "Atendimento odontológico em Ijuí/RS com foco em ortodontia, Invisalign, alinhadores transparentes e aparelho transparente.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ijuí",
      addressRegion: "RS",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Ijuí" },
      { "@type": "AdministrativeArea", name: "Rio Grande do Sul" },
    ],
    medicalSpecialty: "Orthodontics",
    knowsAbout: ["Ortodontia", "Invisalign", "Alinhadores transparentes", "Aparelho transparente"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#gabriel-rockenbach`,
    name: "Dr. Gabriel Paulo Rockenbach",
    jobTitle: "Cirurgião-dentista com atuação em ortodontia",
    knowsAbout: ["Ortodontia", "Invisalign", "Alinhadores transparentes", "Aparelho transparente"],
    worksFor: { "@id": `${siteUrl}/#dentist` },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Dr. Gabriel Paulo Rockenbach",
    url: `${siteUrl}/`,
    inLanguage: "pt-BR",
    publisher: { "@id": `${siteUrl}/#dentist` },
  },
];

export const routes = [
  {
    path: "/",
    title: "Ortodontista em Ijuí | Invisalign e Aparelho Transparente | Dr. Gabriel Rockenbach",
    description:
      "Ortodontista em Ijuí/RS com atendimento em Invisalign, alinhadores transparentes e aparelho ortodôntico. Agende sua avaliação com o Dr. Gabriel Rockenbach.",
    h1: "Ortodontista em Ijuí especializado em Invisalign e aparelho transparente",
    faq: [
      {
        question: "Quanto tempo dura um tratamento ortodôntico?",
        answer:
          "A duração varia conforme o diagnóstico, a complexidade do caso e a resposta biológica de cada paciente. A estimativa mais adequada é feita após avaliação profissional.",
      },
      {
        question: "Invisalign substitui o aparelho fixo?",
        answer:
          "Em alguns casos, Invisalign pode ser indicado como alternativa ao aparelho fixo. A escolha depende da avaliação clínica e dos objetivos do tratamento.",
      },
      {
        question: "Como agendar uma avaliação em Ijuí?",
        answer:
          "O agendamento pode ser feito pelo canal informado no site. Na avaliação, o Dr. Gabriel analisa o caso e explica as possibilidades de tratamento.",
      },
    ],
  },
  {
    path: "/ortodontista-em-ijui",
    title: "Ortodontista em Ijuí | Tratamento Ortodôntico | Dr. Gabriel Rockenbach",
    description:
      "Procura ortodontista em Ijuí/RS? Conheça o atendimento do Dr. Gabriel Rockenbach com foco em ortodontia, aparelho e alinhadores transparentes.",
    h1: "Ortodontista em Ijuí para tratamento com aparelho e alinhadores",
    faq: [
      {
        question: "Ortodontista atende apenas casos estéticos?",
        answer:
          "Não. A ortodontia também avalia função, mordida, estabilidade e saúde bucal. A estética pode fazer parte do objetivo, mas o diagnóstico deve considerar o conjunto.",
      },
      {
        question: "Preciso fazer exames antes de colocar aparelho?",
        answer:
          "Em muitos casos, exames são necessários para planejar com segurança. A solicitação depende da avaliação clínica inicial.",
      },
    ],
  },
  {
    path: "/invisalign-em-ijui",
    title: "Invisalign em Ijuí | Alinhadores Transparentes | Dr. Gabriel Rockenbach",
    description:
      "Invisalign em Ijuí/RS com avaliação profissional para alinhadores transparentes. Saiba como funciona o tratamento com o Dr. Gabriel Rockenbach.",
    h1: "Invisalign em Ijuí: alinhadores transparentes para o seu sorriso",
    faq: [
      {
        question: "Invisalign substitui o aparelho fixo?",
        answer:
          "Em alguns casos, Invisalign pode ser indicado como alternativa ao aparelho fixo. A escolha depende da avaliação clínica e dos objetivos do tratamento.",
      },
      {
        question: "Como saber se posso usar alinhadores transparentes?",
        answer:
          "É necessário avaliar mordida, posição dos dentes, saúde gengival e exames complementares. Cada caso deve ser analisado individualmente.",
      },
    ],
  },
  {
    path: "/aparelho-transparente-em-ijui",
    title: "Aparelho Transparente em Ijuí | Ortodontia Discreta | Dr. Gabriel Rockenbach",
    description:
      "Aparelho transparente em Ijuí/RS para quem busca uma opção mais discreta de tratamento ortodôntico. Agende uma avaliação profissional.",
    h1: "Aparelho transparente em Ijuí: opção discreta para tratamento ortodôntico",
    faq: [
      {
        question: "Aparelho transparente dói?",
        answer:
          "Pode haver pressão ou desconforto leve nos primeiros dias de uso ou após ajustes. Se houver dor persistente, o caso deve ser reavaliado pelo dentista.",
      },
      {
        question: "Alinhador transparente é igual a aparelho estético?",
        answer:
          "Não. Alinhadores são removíveis; aparelho estético é fixo. A indicação depende do caso e deve ser definida em consulta.",
      },
    ],
  },
  {
    path: "/dentista-em-ijui",
    title: "Dentista em Ijuí | Ortodontia e Alinhadores | Dr. Gabriel Rockenbach",
    description:
      "Dentista em Ijuí/RS com atendimento voltado à ortodontia, alinhadores transparentes e avaliação odontológica personalizada.",
    h1: "Dentista em Ijuí com atendimento em ortodontia e alinhadores",
    faq: [
      {
        question: "O Dr. Gabriel atende ortodontia em Ijuí?",
        answer:
          "Sim. O site informa atuação em Ijuí/RS com foco em ortodontia, Invisalign e alinhadores transparentes.",
      },
      {
        question: "Como agendar uma avaliação em Ijuí?",
        answer:
          "O agendamento pode ser feito pelo canal informado no site. Na avaliação, o Dr. Gabriel analisa o caso e explica as possibilidades de tratamento.",
      },
    ],
  },
];

export const sitemapPaths = routes.map((route) => route.path);
