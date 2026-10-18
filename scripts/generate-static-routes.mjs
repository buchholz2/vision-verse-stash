import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { routes, sharedSchemas, siteUrl } from "./seo-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");
const ssrDir = join(rootDir, "dist-ssr");

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

const setAlternate = (html, hreflang, href) =>
  html.replace(
    new RegExp(`<link rel="alternate" hreflang="${hreflang}" href="[\\s\\S]*?" />`),
    `<link rel="alternate" hreflang="${hreflang}" href="${escapeAttribute(href)}" />`,
  );

const buildDate = new Date().toISOString().slice(0, 10);

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

const webPageSchema = (route) => {
  const url = route.path === "/" ? `${siteUrl}/` : `${siteUrl}${route.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#dentist` },
    author: { "@id": `${siteUrl}/#gabriel-rockenbach` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}/og-image.png`, width: 1200, height: 630 },
    dateModified: buildDate,
  };
};

const serviceSchema = (route) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}${route.path}#service`,
  name: route.service.name,
  description: route.service.description,
  serviceType: route.service.name,
  provider: { "@id": `${siteUrl}/#dentist` },
  areaServed: [
    { "@type": "City", name: "Ijuí" },
    { "@type": "AdministrativeArea", name: "Noroeste do Rio Grande do Sul" },
  ],
  url: `${siteUrl}${route.path}`,
});

const routeSchemas = (route) => {
  const list = [...sharedSchemas, webPageSchema(route), breadcrumbSchema(route)];
  if (route.service) list.push(serviceSchema(route));
  if (route.faq.length > 0) list.push(faqSchema(route));
  return list;
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

const rootPlaceholder = '<div id="root"></div>';

// Conteúdo real da rota (React renderizado em Node pelo build SSR), para o HTML estático já trazer H1 e texto.
const setPrerenderedRoot = (html, route, markup) => {
  if (!html.includes(rootPlaceholder)) throw new Error("Placeholder <div id=\"root\"></div> não encontrado no HTML do build.");
  return html.replace(rootPlaceholder, () => `<div id="root" data-prerendered-path="${escapeAttribute(route.path)}">${markup}</div>`);
};

const buildRouteHtml = (baseHtml, route, render) => {
  const canonical = route.path === "/" ? `${siteUrl}/` : `${siteUrl}${route.path}`;
  let html = baseHtml;

  html = setTitle(html, route.title);
  html = setMetaName(html, "description", route.description);
  html = setCanonical(html, canonical);
  html = setAlternate(html, "pt-BR", canonical);
  html = setAlternate(html, "x-default", canonical);
  html = setMetaProperty(html, "og:title", route.title);
  html = setMetaProperty(html, "og:description", route.description);
  html = setMetaProperty(html, "og:url", canonical);
  html = setMetaName(html, "twitter:title", route.title);
  html = setMetaName(html, "twitter:description", route.description);
  html = injectSchemas(html, route);
  html = setPrerenderedRoot(html, route, render(route.path));

  // LCP da home: pré-carrega a foto do hero (a primeira <source> AVIF do HTML pré-renderizado), com o mesmo srcset/sizes.
  if (route.path === "/") {
    const source = html.match(/<source type="image\/avif" srcSet="([^"]+)" sizes="([^"]+)"/);
    if (source) {
      const preload = `    <link rel="preload" as="image" type="image/avif" imagesrcset="${source[1]}" imagesizes="${source[2]}" fetchpriority="high" />\n`;
      html = html.replace("</head>", `${preload}  </head>`);
    }
  }

  return html;
};

const { render } = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);

// app-shell.html guarda o HTML sem pré-renderização: serve de base (inclusive em reexecuções) e de fallback do nginx
// para URLs sem página estática, que não devem exibir o conteúdo da home antes do app renderizar.
const shellPath = join(distDir, "app-shell.html");
const baseHtml = await readFile(join(distDir, "index.html"), "utf8").then(
  async (html) => {
    if (html.includes("data-prerendered-path")) return readFile(shellPath, "utf8");
    await writeFile(shellPath, html, "utf8");
    return html;
  },
);

await Promise.all(
  routes.map(async (route) => {
    if (route.path === "/") {
      await writeFile(join(distDir, "index.html"), buildRouteHtml(baseHtml, route, render), "utf8");
      return;
    }

    const routeDir = join(distDir, route.path.replace(/^\//, ""));
    await mkdir(routeDir, { recursive: true });
    await writeFile(join(routeDir, "index.html"), buildRouteHtml(baseHtml, route, render), "utf8");
  }),
);

// 404 de verdade: o nginx devolve este HTML com status 404 (sem ele, URLs inexistentes respondiam 200 com a página vazia).
const notFoundHtml = baseHtml
  .replace(/<title>[\s\S]*?<\/title>/, "<title>Página não encontrada | Dr. Gabriel Rockenbach</title>")
  .replace(/<meta\s+name="robots"\s+content="[\s\S]*?"\s*\/>/, '<meta name="robots" content="noindex, follow" />')
  .replace(/\n\s*<link rel="(canonical|alternate)"[^>]*\/>/g, "");
await writeFile(join(distDir, "404.html"), notFoundHtml, "utf8");

// Sitemap com data de atualização e a imagem principal de cada página.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map((route) => {
    const loc = route.path === "/" ? `${siteUrl}/` : `${siteUrl}${route.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${buildDate}</lastmod>
    <image:image>
      <image:loc>${siteUrl}/og-image.png</image:loc>
    </image:image>
  </url>`;
  })
  .join("\n")}
</urlset>
`;
await writeFile(join(distDir, "sitemap.xml"), sitemap, "utf8");

await rm(ssrDir, { recursive: true, force: true });

console.log(`Generated ${routes.length} static SEO HTML files.`);
