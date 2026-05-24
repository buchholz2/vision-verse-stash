import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");
const siteUrl = "https://dentista-gabriel.buchholz.net.br";

const routes = [
  {
    path: "/ortodontista-em-ijui",
    title: "Ortodontista em Ijuí | Aparelhos e Alinhadores | Dr. Gabriel Rockenbach",
    description:
      "Tratamento ortodôntico em Ijuí/RS com avaliação profissional, aparelho fixo, aparelho estético e alinhadores transparentes. Fale com o Dr. Gabriel Rockenbach.",
  },
  {
    path: "/invisalign-em-ijui",
    title: "Invisalign em Ijuí | Alinhadores Transparentes | Dr. Gabriel Rockenbach",
    description:
      "Invisalign em Ijuí/RS com avaliação profissional, planejamento digital e acompanhamento ortodôntico individualizado com o Dr. Gabriel Rockenbach.",
  },
  {
    path: "/aparelho-transparente-em-ijui",
    title: "Aparelho Transparente em Ijuí | Ortodontia Discreta | Dr. Gabriel Rockenbach",
    description:
      "Aparelho transparente em Ijuí/RS: entenda diferenças entre alinhadores transparentes e aparelho estético, cuidados e avaliação profissional.",
  },
  {
    path: "/dentista-em-ijui",
    title: "Dentista em Ijuí | Ortodontia e Alinhadores | Dr. Gabriel Rockenbach",
    description:
      "Dentista em Ijuí/RS com atendimento odontológico, foco em ortodontia moderna, Invisalign, alinhadores transparentes e avaliação personalizada.",
  },
];

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

const buildRouteHtml = (baseHtml, route) => {
  const canonical = `${siteUrl}${route.path}`;
  let html = baseHtml;

  html = setTitle(html, route.title);
  html = setMetaName(html, "description", route.description);
  html = setCanonical(html, canonical);
  html = setMetaProperty(html, "og:title", route.title);
  html = setMetaProperty(html, "og:description", route.description);
  html = setMetaProperty(html, "og:url", canonical);
  html = setMetaName(html, "twitter:title", route.title);
  html = setMetaName(html, "twitter:description", route.description);

  return html;
};

const baseHtml = await readFile(join(distDir, "index.html"), "utf8");

await Promise.all(
  routes.map(async (route) => {
    const routeDir = join(distDir, route.path.replace(/^\//, ""));
    await mkdir(routeDir, { recursive: true });
    await writeFile(join(routeDir, "index.html"), buildRouteHtml(baseHtml, route), "utf8");
  }),
);

console.log(`Generated ${routes.length} static SEO route HTML files.`);
