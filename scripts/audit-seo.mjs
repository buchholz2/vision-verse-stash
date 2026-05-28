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
    if (robots !== "index, follow") fail(`${route.path}: robots não está index, follow.`);
    if (!route.h1) fail(`${route.path}: H1 esperado não configurado no mapa de SEO.`);
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

if (failures.length) {
  console.error("SEO audit failed:");
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log(`SEO audit passed for ${routes.length} pages on ${siteUrl}.`);
