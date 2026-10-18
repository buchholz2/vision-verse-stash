import { describe, expect, it } from "vitest";
import { routes } from "../../scripts/seo-routes.mjs";
import { render } from "@/entry-server";

const text = (html: string) => html.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").replace(/\s+([.,;:!?])/g, "$1");

describe("pré-renderização das rotas de SEO", () => {
  it.each(routes.map((route) => [route.path, route.h1]))("%s renderiza em Node com o H1 do mapa de SEO", (path, h1) => {
    const html = render(path);
    const headings = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
    expect(headings).toHaveLength(1);
    expect(text(headings[0][1]).trim()).toBe(h1);
    expect(text(html).length).toBeGreaterThan(1500);
  });

  it("mantém o autoplay mudo dos vídeos de atendimento no HTML da home", () => {
    const videos = [...render("/").matchAll(/<video[^>]*>/g)].map((match) => match[0]);
    expect(videos).toHaveLength(2);
    for (const tag of videos) for (const attr of ["autoplay", "muted", "loop", "playsinline"]) expect(tag).toContain(attr);
  });
});
