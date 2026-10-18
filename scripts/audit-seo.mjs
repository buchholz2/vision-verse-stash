import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { oldDomain, routes, siteUrl, sitemapPaths } from "./seo-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");
const oldUrl = `https://${oldDomain}`;

const failures = [];

const fail = (message) => failures.push(message);

const readText = (path) => readFile(path, "utf8");

const walk = async (dir, ignored = new Set()) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(path, ignored)));
    } else if (entry.isFile()) {
      files.push(path);
    }
  }

  return files;
};

const match = (html, regex) => html.match(regex)?.[1]?.trim() ?? "";

const pageHtmlPath = (routePath) =>
  routePath === "/" ? join(distDir, "index.html") : join(distDir, routePath.slice(1), "index.html");

const decodeEntities = (text) =>
  text
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const textContent = (fragment) =>
  decodeEntities(fragment.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();

const extractSchemas = (html) => {
  const matches = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const schemas = [];

  for (const item of matches) {
    try {
      const parsed = JSON.parse(item[1]);
      if (parsed["@graph"]) schemas.push(...parsed["@graph"]);
      else schemas.push(parsed);
    } catch {
      fail("JSON-LD inválido encontrado no HTML gerado.");
    }
  }

  return schemas;
};

const schemaTypes = (schemas) =>
  new Set(
    schemas.flatMap((schema) => {
      const type = schema["@type"];
      return Array.isArray(type) ? type : [type].filter(Boolean);
    }),
  );

const scanForOldDomain = async () => {
  const targets = [
    join(rootDir, "index.html"),
    join(rootDir, "public"),
    join(rootDir, "src"),
    join(rootDir, "scripts"),
    distDir,
  ];

  for (const target of targets) {
    try {
      const targetStat = await stat(target);
      const files = targetStat.isDirectory()
        ? await walk(target, new Set(["node_modules", ".git"]))
        : [target];

      for (const file of files) {
        const content = await readText(file);
        if (content.includes(oldDomain) || content.includes(oldUrl)) {
          fail(`Domínio antigo encontrado em ${relative(rootDir, file)}`);
        }
      }
    } catch {
      fail(`Não foi possível auditar ${relative(rootDir, target)}.`);
    }
  }
};

const auditSitemap = async () => {
  const sitemap = await readText(join(distDir, "sitemap.xml"));
  const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((item) => item[1]);
  const expected = sitemapPaths.map((path) => (path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`));

  for (const url of expected) {
    if (!locs.includes(url)) fail(`Sitemap não contém ${url}`);
  }

  if (locs.some((url) => !url.startsWith(siteUrl))) {
    fail("Sitemap contém URL fora do domínio canônico novo.");
  }
};

const auditExtras = async () => {
  const titles = new Set();
  const descriptions = new Set();
  const known = new Set(routes.map((route) => route.path));

  for (const route of routes) {
    const html = await readText(pageHtmlPath(route.path));
    const schemas = extractSchemas(html);
    const types = schemaTypes(schemas);

    // Título e descrição: únicos e dentro do tamanho que os buscadores exibem.
    if (route.title.length > 65) fail(`${route.path}: título com ${route.title.length} caracteres (máximo 65).`);
    if (route.description.length > 160) fail(`${route.path}: descrição com ${route.description.length} caracteres (máximo 160).`);
    if (titles.has(route.title)) fail(`${route.path}: título repetido em outra página.`);
    if (descriptions.has(route.description)) fail(`${route.path}: descrição repetida em outra página.`);
    titles.add(route.title);
    descriptions.add(route.description);

    // Open Graph e idioma.
    if (!/<meta property="og:image:width" content="1200"/.test(html)) fail(`${route.path}: og:image:width ausente.`);
    if (!/<meta property="og:image:alt"/.test(html)) fail(`${route.path}: og:image:alt ausente.`);
    if (!/<link rel="alternate" hreflang="pt-BR"/.test(html)) fail(`${route.path}: hreflang pt-BR ausente.`);
    if (!/<html lang="pt-BR"/.test(html)) fail(`${route.path}: lang pt-BR ausente.`);
    if (!types.has("WebPage")) fail(`${route.path}: WebPage ausente.`);
    if (route.service && !types.has("Service")) fail(`${route.path}: Service ausente.`);

    // JSON-LD de FAQ igual ao texto visível: cada pergunta e resposta aparece na página pré-renderizada.
    const visible = textContent(html.match(/<div id="root"[^>]*>([\s\S]*)<\/div>\s*<\/body>/)?.[1] ?? "");
    for (const item of route.faq) {
      if (!visible.includes(item.question)) fail(`${route.path}: pergunta do FAQ ausente do texto visível ("${item.question}").`);
    }
    const faqSchemas = schemas.filter((schema) => schema["@type"] === "FAQPage");
    if (faqSchemas.length > 1) fail(`${route.path}: mais de um FAQPage no HTML.`);

    // Imagens com texto alternativo e dimensões (evita CLS); links internos apontam para páginas existentes.
    for (const img of html.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt=/.test(img[0])) fail(`${route.path}: imagem sem alt (${img[0].slice(0, 80)}).`);
      if (!/\bwidth=/.test(img[0]) || !/\bheight=/.test(img[0])) fail(`${route.path}: imagem sem width/height (${img[0].slice(0, 80)}).`);
    }
    for (const link of html.matchAll(/<a\b[^>]*\bhref="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
      const path = link[1].replace(/\/$/, "") || "/";
      if (!known.has(path)) fail(`${route.path}: link interno para página inexistente (${link[1]}).`);
    }
  }

  const home = await readText(pageHtmlPath("/"));
  const internalTargets = new Set([...home.matchAll(/<a\b[^>]*\bhref="(\/[a-z-]+)"/g)].map((item) => item[1]));
  for (const route of routes) {
    if (route.path !== "/" && route.service && !internalTargets.has(route.path)) fail(`Home não linka para ${route.path}.`);
  }

  const notFound = await readText(join(distDir, "404.html")).catch(() => "");
  if (!notFound) fail("404.html ausente no build.");
  else if (!/<meta\s+name="robots"\s+content="noindex/.test(notFound)) fail("404.html sem noindex.");

  const sitemap = await readText(join(distDir, "sitemap.xml"));
  if (!/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(sitemap)) fail("Sitemap sem lastmod.");
};

const auditRobots = async () => {
  const robots = await readText(join(distDir, "robots.txt"));

  if (!robots.includes("User-agent: *")) fail("robots.txt sem User-agent: *");
  if (!robots.includes("Allow: /")) fail("robots.txt sem Allow: /");
  if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
    fail("robots.txt não aponta para o sitemap do domínio novo.");
  }
};

const auditPages = async () => {
  for (const route of routes) {
    const html = await readText(pageHtmlPath(route.path));
    const canonical = route.path === "/" ? `${siteUrl}/` : `${siteUrl}${route.path}`;
    const title = match(html, /<title>([\s\S]*?)<\/title>/);
    const description = match(html, /<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/>/);
    const canonicalHref = match(html, /<link rel="canonical" href="([\s\S]*?)"\s*\/>/);
    const robots = match(html, /<meta\s+name="robots"\s+content="([\s\S]*?)"\s*\/>/);
    const ogUrl = match(html, /<meta\s+property="og:url"\s+content="([\s\S]*?)"\s*\/>/);
    const schemas = extractSchemas(html);
    const types = schemaTypes(schemas);

    if (title !== route.title) fail(`${route.path}: title inesperado.`);
    if (description !== route.description) fail(`${route.path}: meta description inesperada.`);
    if (canonicalHref !== canonical) fail(`${route.path}: canonical inesperado.`);
    if (ogUrl !== canonical) fail(`${route.path}: og:url inesperado.`);
    if (!robots.startsWith("index, follow")) fail(`${route.path}: robots não está index, follow.`);
    if (!route.h1) fail(`${route.path}: H1 esperado não configurado no mapa de SEO.`);

    // O HTML estático precisa trazer o conteúdo pré-renderizado: um único H1 igual ao do mapa de SEO e texto real.
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((item) => textContent(item[1]));
    if (h1s.length !== 1) fail(`${route.path}: esperado 1 H1 no HTML estático, encontrado ${h1s.length}.`);
    else if (h1s[0] !== route.h1) fail(`${route.path}: H1 do HTML estático difere do mapa de SEO ("${h1s[0]}").`);
    if (!html.includes(`data-prerendered-path="${route.path}"`)) fail(`${route.path}: conteúdo pré-renderizado ausente em #root.`);
    const visibleText = textContent(html.match(/<div id="root"[^>]*>([\s\S]*)<\/div>\s*<\/body>/)?.[1] ?? "");
    if (visibleText.length < 1500) fail(`${route.path}: texto pré-renderizado curto demais (${visibleText.length} caracteres).`);
    if (!types.has("Dentist")) fail(`${route.path}: Dentist ausente.`);
    if (!types.has("LocalBusiness")) fail(`${route.path}: LocalBusiness ausente.`);
    if (!types.has("Person")) fail(`${route.path}: Person ausente.`);
    if (!types.has("WebSite")) fail(`${route.path}: WebSite ausente.`);
    if (!types.has("BreadcrumbList")) fail(`${route.path}: BreadcrumbList ausente.`);
    if (route.faq.length > 0 && !types.has("FAQPage")) fail(`${route.path}: FAQPage ausente.`);
  }
};

await scanForOldDomain();
await auditSitemap();
await auditRobots();
await auditPages();
await auditExtras();

if (failures.length) {
  console.error("SEO audit failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log(`SEO audit passed for ${routes.length} pages on ${siteUrl}.`);
