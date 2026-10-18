import { readFileSync } from "node:fs";
import { join } from "node:path";

// FAQ: mesma fonte da página (src/data/faqs.json), para o JSON-LD nunca divergir do texto visível.
const faqs = JSON.parse(readFileSync(join(process.cwd(), "src", "data", "faqs.json"), "utf8"));

export const siteUrl = "https://dentistagabrielrockenbach.com.br";
export const oldDomainParts = ["dentista-gabriel", "buchholz", "net", "br"];
export const oldDomain = oldDomainParts.join(".");

const dentistId = `${siteUrl}/#dentist`;
const personId = `${siteUrl}/#gabriel-rockenbach`;
const websiteId = `${siteUrl}/#website`;
const phone = "+5555996693480";
const whatsapp = "https://wa.me/5555996693480";

// Serviços listados no site (Treatments.tsx): o catálogo do JSON-LD espelha o texto visível.
const services = [
  ["Alinhadores Invisalign®", "Alinhadores transparentes, removíveis e planejados digitalmente."],
  ["Aparelhos estéticos", "Alternativa em cerâmica para quem busca mais discrição."],
  ["Aparelhos autoligados", "Sistema moderno, com acompanhamento ajustado ao plano do caso."],
  ["Aparelhos convencionais", "Indicação clássica para alinhamento e correções ortodônticas."],
  ["Profilaxia", "Limpeza profissional para controlar biofilme e preservar a gengiva."],
  ["Clareamento", "Indicação segura para iluminar o sorriso, respeitando sensibilidade e rotina."],
  ["Facetas", "Planejamento estético para ajustar forma, cor e proporção do sorriso."],
  ["Restaurações", "Recuperação de dentes com materiais atuais, buscando naturalidade e função."],
  ["Próteses", "Soluções para repor dentes ausentes e devolver conforto e estabilidade mastigatória."],
  ["Exodontia de sisos", "Procedimento planejado com avaliação clínica e orientação prévia."],
];

export const sharedSchemas = [
  {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness"],
    "@id": dentistId,
    name: "Dr. Gabriel Paulo Rockenbach",
    alternateName: "Gabriel Rockenbach Ortodontia",
    url: `${siteUrl}/`,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/logo-dr-gabriel-rockenbach.png`,
      width: 900,
      height: 249,
    },
    image: [`${siteUrl}/og-image.png`, `${siteUrl}/images/dr-gabriel-rockenbach.jpg`],
    description:
      "Atendimento odontológico em Ijuí/RS com foco em ortodontia, Invisalign, alinhadores transparentes e aparelho transparente.",
    telephone: phone,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "agendamento",
      telephone: phone,
      url: whatsapp,
      availableLanguage: "pt-BR",
      areaServed: "BR",
    },
    hasMap: "https://www.google.com/maps/search/?api=1&query=Rua%20Benjamin%20Constant%2C%20109%2C%20Iju%C3%AD%2FRS",
    sameAs: ["https://www.instagram.com/gabirockenbachp/"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Benjamin Constant, 109",
      addressLocality: "Ijuí",
      addressRegion: "RS",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Ijuí" },
      { "@type": "AdministrativeArea", name: "Noroeste do Rio Grande do Sul" },
      { "@type": "AdministrativeArea", name: "Rio Grande do Sul" },
    ],
    medicalSpecialty: "Orthodontics",
    founder: { "@id": personId },
    employee: { "@id": personId },
    knowsAbout: ["Ortodontia", "Invisalign", "Alinhadores transparentes", "Aparelho transparente", "Miniimplantes"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tratamentos odontológicos e ortodônticos",
      itemListElement: services.map(([name, description]) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, description, provider: { "@id": dentistId } },
      })),
    },
    potentialAction: {
      "@type": "ReserveAction",
      name: "Agendar avaliação pelo WhatsApp",
      target: { "@type": "EntryPoint", urlTemplate: whatsapp, inLanguage: "pt-BR", actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: "Dr. Gabriel Paulo Rockenbach",
    givenName: "Gabriel Paulo",
    familyName: "Rockenbach",
    honorificPrefix: "Dr.",
    jobTitle: "Cirurgião-dentista, especialista em Ortodontia",
    description: "Cirurgião-dentista e especialista em Ortodontia, com atuação em alinhadores Invisalign® e miniimplantes em Ijuí/RS.",
    url: `${siteUrl}/`,
    image: `${siteUrl}/images/dr-gabriel-rockenbach.jpg`,
    sameAs: ["https://www.instagram.com/gabirockenbachp/"],
    alumniOf: { "@type": "EducationalOrganization", name: "FASURGS" },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Registro profissional",
      name: "CRO 29705",
    },
    knowsAbout: ["Ortodontia", "Invisalign", "Alinhadores transparentes", "Aparelho transparente", "Miniimplantes"],
    worksFor: { "@id": dentistId },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: "Dr. Gabriel Paulo Rockenbach",
    description: "Ortodontista em Ijuí/RS: Invisalign, alinhadores transparentes e aparelho ortodôntico.",
    url: `${siteUrl}/`,
    inLanguage: "pt-BR",
    publisher: { "@id": dentistId },
  },
];

export const routes = [
  {
    path: "/",
    title: "Ortodontista em Ijuí | Invisalign | Dr. Gabriel Rockenbach",
    description:
      "Ortodontista em Ijuí/RS com atendimento em Invisalign, alinhadores transparentes e aparelho ortodôntico. Agende sua avaliação com o Dr. Gabriel Rockenbach.",
    h1: "Seu sorriso, planejado em cada detalhe. Ortodontista em Ijuí/RS, especialista em Invisalign® e aparelho transparente.",
    faq: faqs["/"] ?? [],
  },
  {
    path: "/ortodontista-em-ijui",
    service: { name: "Tratamento ortodôntico em Ijuí", description: "Avaliação e tratamento ortodôntico com aparelho fixo, estético, autoligado ou alinhadores transparentes." },
    title: "Ortodontista em Ijuí | Aparelho e Alinhadores | Dr. Gabriel",
    description:
      "Procura ortodontista em Ijuí/RS? Conheça o atendimento do Dr. Gabriel Rockenbach com foco em ortodontia, aparelho e alinhadores transparentes.",
    h1: "Ortodontista em Ijuí para tratamento com aparelho e alinhadores",
    faq: faqs["/ortodontista-em-ijui"] ?? [],
  },
  {
    path: "/invisalign-em-ijui",
    service: { name: "Invisalign em Ijuí", description: "Avaliação e planejamento digital com alinhadores transparentes Invisalign®." },
    title: "Invisalign em Ijuí | Alinhadores Transparentes | Dr. Gabriel",
    description:
      "Invisalign em Ijuí/RS com avaliação profissional para alinhadores transparentes. Saiba como funciona o tratamento com o Dr. Gabriel Rockenbach.",
    h1: "Invisalign em Ijuí: alinhadores transparentes para o seu sorriso",
    faq: faqs["/invisalign-em-ijui"] ?? [],
  },
  {
    path: "/aparelho-transparente-em-ijui",
    service: { name: "Aparelho transparente em Ijuí", description: "Alinhadores transparentes e aparelho estético como opções discretas de tratamento ortodôntico." },
    title: "Aparelho Transparente em Ijuí | Ortodontia | Dr. Gabriel",
    description:
      "Aparelho transparente em Ijuí/RS para quem busca uma opção mais discreta de tratamento ortodôntico. Agende uma avaliação profissional.",
    h1: "Aparelho transparente em Ijuí: opção discreta para tratamento ortodôntico",
    faq: faqs["/aparelho-transparente-em-ijui"] ?? [],
  },
  {
    path: "/dentista-em-ijui",
    title: "Dentista em Ijuí | Ortodontia e Alinhadores | Dr. Gabriel",
    description:
      "Dentista em Ijuí/RS com atendimento voltado à ortodontia, alinhadores transparentes e avaliação odontológica personalizada.",
    h1: "Dentista em Ijuí com atendimento em ortodontia e alinhadores",
    faq: faqs["/dentista-em-ijui"] ?? [],
  },
  {
    path: "/politica-de-privacidade",
    title: "Política de Privacidade | Dr. Gabriel Rockenbach",
    description:
      "Como este site trata dados pessoais: o que é coletado, links externos, seus direitos pela LGPD e como falar com o consultório.",
    h1: "Política de Privacidade",
    faq: faqs["/politica-de-privacidade"] ?? [],
  },
];

export const staticAssets = {
  ogImage: `${siteUrl}/og-image.png`,
};

export const sitemapPaths = routes.map((route) => route.path);
