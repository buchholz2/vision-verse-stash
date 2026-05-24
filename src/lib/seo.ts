import { CRO, INSTAGRAM_URL, PROFESSIONAL_NAME, PROFESSIONAL_TITLE, WHATSAPP_NUMBER } from "@/lib/contact";

export const SITE_URL = "https://dentista-gabriel.buchholz.net.br";
export const SITE_NAME = "Dr. Gabriel Paulo Rockenbach";
export const DEFAULT_OG_IMAGE = "/og-image.png";

export type FaqItem = {
  question: string;
  answer: string;
};

export type JsonLdSchema = Record<string, unknown>;

export const absoluteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};

export const absoluteAssetUrl = (path = DEFAULT_OG_IMAGE) => {
  if (path.startsWith("http")) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};

export const dentistSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "LocalBusiness"],
  "@id": `${SITE_URL}/#dentist`,
  name: "Dr. Gabriel Paulo Rockenbach",
  url: `${SITE_URL}/`,
  image: absoluteAssetUrl(DEFAULT_OG_IMAGE),
  telephone: `+${WHATSAPP_NUMBER}`,
  // TODO: Adicionar endereço completo do consultório quando o dado real estiver disponível.
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: [INSTAGRAM_URL],
};

export const personSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#gabriel-rockenbach`,
  name: `Dr. ${PROFESSIONAL_NAME}`,
  jobTitle: PROFESSIONAL_TITLE,
  identifier: CRO,
  worksFor: { "@id": `${SITE_URL}/#dentist` },
  sameAs: [INSTAGRAM_URL],
};

export const websiteSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE_URL}/#dentist` },
};

export const breadcrumbSchema = (items: Array<{ name: string; path: string }>): JsonLdSchema => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const faqSchema = (items: FaqItem[]): JsonLdSchema => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});
