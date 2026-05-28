import type { FaqItem } from "@/lib/seo";

export type LocalPageSection = {
  title: string;
  paragraphs: string[];
};

export type LocalPage = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: LocalPageSection[];
  faq: FaqItem[];
  relatedPaths: string[];
  whatsappMessage: string;
};

export const homeFaqs: FaqItem[] = [
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
    question: "Aparelho transparente dói?",
    answer:
      "Pode haver pressão ou desconforto leve nos primeiros dias de uso ou após ajustes. Se houver dor persistente, o caso deve ser reavaliado pelo dentista.",
  },
  {
    question: "Como saber se posso usar alinhadores transparentes?",
    answer:
      "É necessário avaliar mordida, posição dos dentes, saúde gengival e exames complementares. Cada caso deve ser analisado individualmente.",
  },
  {
    question: "Como agendar uma avaliação em Ijuí?",
    answer:
      "O agendamento pode ser feito pelo WhatsApp do consultório. Na avaliação, o Dr. Gabriel analisa o caso e explica as possibilidades de tratamento.",
  },
];

export const localPages: Record<string, LocalPage> = {
  "ortodontista-em-ijui": {
    path: "/ortodontista-em-ijui",
    title: "Ortodontista em Ijuí | Tratamento Ortodôntico | Dr. Gabriel Rockenbach",
    description:
      "Procura ortodontista em Ijuí/RS? Conheça o atendimento do Dr. Gabriel Rockenbach com foco em ortodontia, aparelho e alinhadores transparentes.",
    eyebrow: "Ortodontia em Ijuí/RS",
    h1: "Ortodontista em Ijuí para tratamento com aparelho e alinhadores",
    intro:
      "A ortodontia exige diagnóstico cuidadoso, planejamento e acompanhamento próximo. Em Ijuí/RS, o Dr. Gabriel Rockenbach atende pacientes que buscam alinhar o sorriso com aparelho fixo, aparelho estético ou alinhadores transparentes, sempre a partir de uma avaliação individual.",
    sections: [
      {
        title: "Atendimento ortodôntico em Ijuí/RS",
        paragraphs: [
          "O atendimento ortodôntico começa pela escuta do paciente e pela análise da mordida, do posicionamento dos dentes, da saúde gengival e da rotina de uso do aparelho. Esse contexto ajuda a definir uma conduta compatível com cada caso.",
          "Pacientes de Ijuí e região podem buscar avaliação para entender se há indicação de aparelho convencional, aparelho estético, autoligado ou alinhadores transparentes.",
        ],
      },
      {
        title: "Quando procurar um ortodontista?",
        paragraphs: [
          "A avaliação com ortodontista pode ser indicada quando há dentes desalinhados, mordida aberta, mordida cruzada, espaços entre os dentes, apinhamento, dificuldade de higienização ou incômodo estético com o sorriso.",
          "Também é comum procurar atendimento antes de iniciar tratamentos estéticos, pois o alinhamento dentário pode influenciar função, proporção e estabilidade do resultado planejado.",
        ],
      },
      {
        title: "Aparelho fixo, aparelho estético e alinhadores transparentes",
        paragraphs: [
          "O aparelho fixo segue sendo uma opção importante em muitos planejamentos. O aparelho estético pode oferecer uma alternativa mais discreta, enquanto os alinhadores transparentes são removíveis e planejados digitalmente.",
          "A indicação depende da complexidade do movimento dentário, da disciplina de uso, da saúde bucal e dos objetivos do paciente. Não existe uma única opção ideal para todos os casos.",
        ],
      },
      {
        title: "Avaliação ortodôntica",
        paragraphs: [
          "Na avaliação, o Dr. Gabriel observa o quadro clínico, conversa sobre expectativas e pode solicitar exames para aprofundar o diagnóstico. A partir disso, explica possibilidades, limitações e próximos passos.",
          "Essa etapa é essencial para evitar promessas genéricas e construir um plano realista para o tratamento ortodôntico.",
        ],
      },
      {
        title: "Agende sua avaliação",
        paragraphs: [
          "Para conversar sobre ortodontia em Ijuí, envie uma mensagem pelo WhatsApp e informe sua principal dúvida. O agendamento é feito de forma direta para avaliação profissional.",
        ],
      },
    ],
    faq: [
      homeFaqs[0],
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
      homeFaqs[4],
    ],
    relatedPaths: ["/invisalign-em-ijui", "/aparelho-transparente-em-ijui", "/dentista-em-ijui"],
    whatsappMessage: "Olá, Dr. Gabriel! Gostaria de agendar uma avaliação ortodôntica em Ijuí.",
  },
  "invisalign-em-ijui": {
    path: "/invisalign-em-ijui",
    title: "Invisalign em Ijuí | Alinhadores Transparentes | Dr. Gabriel Rockenbach",
    description:
      "Invisalign em Ijuí/RS com avaliação profissional para alinhadores transparentes. Saiba como funciona o tratamento com o Dr. Gabriel Rockenbach.",
    eyebrow: "Alinhadores Invisalign em Ijuí/RS",
    h1: "Invisalign em Ijuí: alinhadores transparentes para o seu sorriso",
    intro:
      "Invisalign é uma opção de alinhadores transparentes removíveis que pode ser indicada para determinados casos ortodônticos. Em Ijuí/RS, a indicação depende de avaliação profissional, planejamento digital e acompanhamento durante todas as etapas.",
    sections: [
      {
        title: "O que é Invisalign?",
        paragraphs: [
          "Invisalign é um sistema de alinhadores transparentes feitos sob planejamento digital. Eles são usados em sequência para promover movimentos dentários de forma gradual, conforme a indicação de cada caso.",
          "Por serem removíveis, os alinhadores facilitam a alimentação e a higiene, mas exigem disciplina de uso para que o tratamento siga o planejamento.",
        ],
      },
      {
        title: "Como funciona o tratamento?",
        paragraphs: [
          "O tratamento começa com avaliação clínica, registro do caso e planejamento dos movimentos. Depois, o paciente recebe orientações sobre uso diário, troca dos alinhadores e consultas de acompanhamento.",
          "Cada etapa deve ser monitorada para verificar adaptação, evolução e necessidade de ajustes no plano.",
        ],
      },
      {
        title: "Diferença entre Invisalign e aparelho tradicional",
        paragraphs: [
          "O aparelho tradicional fica fixo aos dentes e utiliza bráquetes e fios. O Invisalign utiliza placas transparentes removíveis, planejadas para movimentar os dentes em sequência.",
          "A escolha mais adequada depende da mordida, dos movimentos necessários, da rotina do paciente e da avaliação do ortodontista.",
        ],
      },
      {
        title: "Para quem pode ser indicado?",
        paragraphs: [
          "Invisalign pode ser indicado para diferentes tipos de desalinhamento, mas nem todo caso é resolvido da mesma maneira. Saúde gengival, padrão de mordida e colaboração do paciente influenciam a indicação.",
          "A avaliação individual é indispensável para entender possibilidades, limitações e tempo estimado de tratamento.",
        ],
      },
      {
        title: "Avaliação em Ijuí/RS",
        paragraphs: [
          "Pacientes de Ijuí e região podem agendar uma avaliação para entender se Invisalign ou outro tipo de aparelho transparente faz sentido para o seu caso.",
        ],
      },
      {
        title: "Agendamento",
        paragraphs: [
          "O contato pode ser feito pelo WhatsApp para tirar dúvidas iniciais e marcar uma consulta com o Dr. Gabriel Rockenbach em Ijuí/RS.",
        ],
      },
    ],
    faq: [
      homeFaqs[1],
      homeFaqs[3],
      {
        question: "Preciso usar Invisalign o dia todo?",
        answer:
          "O tempo diário de uso é orientado pelo profissional e costuma ser decisivo para o tratamento. A rotina deve ser explicada durante a avaliação.",
      },
      homeFaqs[4],
    ],
    relatedPaths: ["/ortodontista-em-ijui", "/aparelho-transparente-em-ijui", "/dentista-em-ijui"],
    whatsappMessage: "Olá, Dr. Gabriel! Gostaria de saber se Invisalign pode ser indicado para o meu caso em Ijuí.",
  },
  "aparelho-transparente-em-ijui": {
    path: "/aparelho-transparente-em-ijui",
    title: "Aparelho Transparente em Ijuí | Ortodontia Discreta | Dr. Gabriel Rockenbach",
    description:
      "Aparelho transparente em Ijuí/RS para quem busca uma opção mais discreta de tratamento ortodôntico. Agende uma avaliação profissional.",
    eyebrow: "Aparelho transparente em Ijuí/RS",
    h1: "Aparelho transparente em Ijuí: opção discreta para tratamento ortodôntico",
    intro:
      "Quem busca uma alternativa mais discreta para alinhar os dentes pode avaliar opções como alinhadores transparentes e aparelho estético. Em Ijuí/RS, a escolha deve considerar diagnóstico, rotina, saúde bucal e objetivos do tratamento.",
    sections: [
      {
        title: "O que é aparelho transparente?",
        paragraphs: [
          "A expressão aparelho transparente pode se referir tanto aos alinhadores removíveis quanto ao aparelho estético com bráquetes de cerâmica ou materiais mais discretos.",
          "Apesar de terem aparência mais sutil, as opções funcionam de maneiras diferentes e precisam de avaliação para indicação correta.",
        ],
      },
      {
        title: "Diferença entre alinhadores transparentes e aparelho estético",
        paragraphs: [
          "Os alinhadores transparentes são placas removíveis trocadas em sequência. O aparelho estético é fixo aos dentes, parecido com o aparelho convencional, mas com bráquetes mais discretos.",
          "Ambas as opções podem fazer parte da ortodontia moderna, porém a escolha depende dos movimentos necessários e da colaboração do paciente.",
        ],
      },
      {
        title: "Benefícios da opção mais discreta",
        paragraphs: [
          "A principal vantagem é a aparência mais sutil durante o tratamento. No caso dos alinhadores, a remoção para alimentação e higiene também pode facilitar a rotina.",
          "Esses benefícios precisam ser equilibrados com a indicação clínica e com as responsabilidades de uso e manutenção.",
        ],
      },
      {
        title: "Cuidados durante o tratamento",
        paragraphs: [
          "O tratamento exige higiene cuidadosa, comparecimento às consultas e atenção às orientações sobre alimentação, uso dos alinhadores ou manutenção do aparelho fixo.",
          "Desconfortos, quebras, perda de alinhadores ou dificuldade de adaptação devem ser comunicados ao profissional.",
        ],
      },
      {
        title: "Avaliação profissional",
        paragraphs: [
          "A avaliação com o Dr. Gabriel Rockenbach em Ijuí/RS ajuda a diferenciar o que é possível tratar com alinhadores, aparelho estético ou outros recursos ortodônticos.",
        ],
      },
    ],
    faq: [
      homeFaqs[2],
      {
        question: "Aparelho transparente mancha?",
        answer:
          "Alguns materiais podem sofrer alteração de cor conforme hábitos alimentares e higiene. O profissional orienta cuidados para reduzir esse risco.",
      },
      {
        question: "Alinhador transparente é igual a aparelho estético?",
        answer:
          "Não. Alinhadores são removíveis; aparelho estético é fixo. A indicação depende do caso e deve ser definida em consulta.",
      },
      homeFaqs[4],
    ],
    relatedPaths: ["/invisalign-em-ijui", "/ortodontista-em-ijui", "/dentista-em-ijui"],
    whatsappMessage: "Olá, Dr. Gabriel! Gostaria de avaliar opções de aparelho transparente em Ijuí.",
  },
  "dentista-em-ijui": {
    path: "/dentista-em-ijui",
    title: "Dentista em Ijuí | Ortodontia e Alinhadores | Dr. Gabriel Rockenbach",
    description:
      "Dentista em Ijuí/RS com atendimento voltado à ortodontia, alinhadores transparentes e avaliação odontológica personalizada.",
    eyebrow: "Dentista em Ijuí/RS",
    h1: "Dentista em Ijuí com atendimento em ortodontia e alinhadores",
    intro:
      "O Dr. Gabriel Paulo Rockenbach é cirurgião-dentista e especialista em Ortodontia, com atendimento em Ijuí/RS. O foco é orientar cada paciente com clareza, diagnóstico individual e planejamento adequado ao caso.",
    sections: [
      {
        title: "Atendimento odontológico em Ijuí/RS",
        paragraphs: [
          "O atendimento reúne prevenção, avaliação clínica, cuidado restaurador, estética e ortodontia. A consulta inicial ajuda a entender prioridades, queixas e possibilidades de tratamento.",
          "Pacientes de Ijuí e região podem buscar orientação para cuidar da saúde bucal e avaliar opções para alinhamento do sorriso.",
        ],
      },
      {
        title: "Foco em ortodontia moderna",
        paragraphs: [
          "A atuação em ortodontia inclui aparelhos convencionais, aparelhos estéticos, autoligados e alinhadores Invisalign, sempre com indicação individualizada.",
          "A escolha da técnica não deve ser baseada apenas na aparência do aparelho, mas também na mordida, na função, na saúde periodontal e na previsibilidade do plano.",
        ],
      },
      {
        title: "Avaliação personalizada",
        paragraphs: [
          "Durante a avaliação, o Dr. Gabriel conversa sobre histórico, rotina e expectativas, além de observar sinais clínicos que podem influenciar o tratamento.",
          "Quando necessário, exames complementares ajudam a construir um planejamento mais preciso.",
        ],
      },
      {
        title: "Localização e agendamento",
        paragraphs: [
          "O atendimento é realizado em Ijuí/RS, com agendamento pelo WhatsApp. O endereço completo deve ser adicionado no site quando confirmado para publicação.",
          "TODO: Adicionar endereço completo do consultório aqui.",
        ],
      },
    ],
    faq: [
      {
        question: "O Dr. Gabriel atende ortodontia em Ijuí?",
        answer:
          "Sim. O site informa atuação em Ijuí/RS com foco em ortodontia, Invisalign e alinhadores transparentes.",
      },
      homeFaqs[0],
      homeFaqs[3],
      homeFaqs[4],
    ],
    relatedPaths: ["/ortodontista-em-ijui", "/invisalign-em-ijui", "/aparelho-transparente-em-ijui"],
    whatsappMessage: "Olá, Dr. Gabriel! Gostaria de agendar uma avaliação odontológica em Ijuí.",
  },
};

export const localPageList = Object.values(localPages);

export const getLocalPageByPath = (path: string) => localPageList.find((page) => page.path === path);
