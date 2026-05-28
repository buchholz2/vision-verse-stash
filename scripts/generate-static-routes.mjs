import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { routes, siteUrl } from "./seo-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");

const escapeAttribute = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const setTitle = (html, title) => html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(title)}</title>`);

const setMetaName = (html, name, content) =>
  html.replace(
    new RegExp(`<meta\\s+name="${name}"\\s+content="[\\s\\S]*?"\\s*/>`),
    `<meta name="${name}" content="${escapeAttribute(content)}" />`,
  );

const setMetaProperty = (html, property, content) =>
  html.replace(
    new RegExp(`<meta\\s+property="${property}"\\s+content="[\\s\\S]*?"\\s*/>`),
    `<meta property="${property}" content="${escapeAttribute(content)}" />`,
  );

const setCanonical = (html, href) =>
  html.replace(/<link rel="canonical" href="[\s\S]*?" \/>/, `<link rel="canonical" href="${escapeAttribute(href)}" />`);

const breadcrumbSchema = (route) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement:
    route.path === "/"
      ? [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: `${siteUrl}/`,
          },
        ]
      : [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: route.h1,
            item: `${siteUrl}${route.path}`,
          },
        ],
});

const faqSchema = (route) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: route.faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

const routeSchemas = (route) => {
  return [breadcrumbSchema(route), faqSchema(route)];
};

const removeStaticSeoSchemas = (html) =>
  html.replace(/\n\s*<script type="application\/ld\+json" data-static-seo="true">[\s\S]*?<\/script>/g, "");

const injectSchemas = (html, route) => {
  const schemaTags = routeSchemas(route)
    .map(
      (schema) =>
        `    <script type="application/ld+json" data-static-seo="true">${JSON.stringify(schema)}</script>`,
    )
    .join("\n");

  return removeStaticSeoSchemas(html).replace("</head>", `${schemaTags}\n  </head>`);
};

const buildRouteHtml = (baseHtml, route) => {
  const canonical = route.path === "/" ? `${siteUrl}/` : `${siteUrl}${route.path}`;
  let html = baseHtml;

  html = setTitle(html, route.title);
  html = setMetaName(html, "description", route.description);
  html = setCanonical(html, canonical);
  html = setMetaProperty(html, "og:title", route.title);
  html = setMetaProperty(html, "og:description", route.description);
  html = setMetaProperty(html, "og:url", canonical);
  html = setMetaName(html, "twitter:title", route.title);
  html = setMetaName(html, "twitter:description", route.description);
  html = injectSchemas(html, route);

  return html;
};

const baseHtml = await readFile(join(distDir, "index.html"), "utf8");

await Promise.all(
  routes.map(async (route) => {
    if (route.path === "/") {
      await writeFile(join(distDir, "index.html"), buildRouteHtml(baseHtml, route), "utf8");
      return;
    }

    const routeDir = join(distDir, route.path.replace(/^\//, ""));
    await mkdir(routeDir, { recursive: true });
    await writeFile(join(routeDir, "index.html"), buildRouteHtml(baseHtml, route), "utf8");
  }),
);

console.log(`Generated ${routes.length} static SEO HTML files.`);
