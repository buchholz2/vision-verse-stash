export const SITE_URL = "https://dentistagabrielrockenbach.com.br";
export const SITE_NAME = "Dr. Gabriel Paulo Rockenbach";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const OG_IMAGE_ALT = "Dr. Gabriel Paulo Rockenbach, ortodontista em Ijuí/RS";
export const DEFAULT_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

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
