import { useEffect } from "react";
import { absoluteAssetUrl, absoluteUrl, DEFAULT_OG_IMAGE, DEFAULT_ROBOTS, OG_IMAGE_ALT, SITE_NAME } from "@/lib/seo";
import type { JsonLdSchema } from "@/lib/seo";

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  robots?: string;
  jsonLd?: JsonLdSchema[];
};

const setMeta = (attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const setCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const setAlternate = (hreflang: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "alternate");
    element.setAttribute("hreflang", hreflang);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const removeManagedJsonLd = () => {
  document.head.querySelectorAll('script[type="application/ld+json"][data-managed-seo="true"]').forEach((node) => {
    node.remove();
  });
};

export function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  robots = DEFAULT_ROBOTS,
  jsonLd = [],
}: SEOProps) {
  useEffect(() => {
    const canonical = absoluteUrl(path);
    const ogImage = absoluteAssetUrl(image);

    document.documentElement.lang = "pt-BR";
    document.title = title;

    setCanonical(canonical);
    setMeta("name", "description", description);
    setMeta("name", "author", "Gabriel Paulo Rockenbach");
    setMeta("name", "robots", robots);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:locale", "pt_BR");
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:alt", OG_IMAGE_ALT);
    setAlternate("pt-BR", canonical);
    setAlternate("x-default", canonical);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:image:alt", OG_IMAGE_ALT);

    // O HTML gerado no build já traz o JSON-LD; ao montar o app, os tipos que o React também gera (FAQ e breadcrumb) não duplicam.
    const managedTypes = new Set(jsonLd.map((schema) => schema["@type"]));
    document.head.querySelectorAll('script[data-static-seo="true"]').forEach((node) => {
      try {
        if (managedTypes.has(JSON.parse(node.textContent ?? "{}")["@type"])) node.remove();
      } catch {
        /* JSON-LD inválido não é removido */
      }
    });
    removeManagedJsonLd();
    jsonLd.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.managedSeo = "true";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return removeManagedJsonLd;
  }, [description, image, jsonLd, path, robots, title]);

  return null;
}
