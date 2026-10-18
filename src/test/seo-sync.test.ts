import { describe, expect, it } from "vitest";
import { homeFaqs, localPages } from "@/data/localPages";
import { routes } from "../../scripts/seo-routes.mjs";

type Route = { path: string; title: string; description: string; h1: string; faq: { question: string; answer: string }[] };

describe("mapa de SEO x conteúdo das páginas", () => {
  const byPath = new Map((routes as Route[]).map((route) => [route.path, route]));

  it("título, descrição e H1 das páginas locais coincidem com o HTML gerado no build", () => {
    for (const page of Object.values(localPages)) {
      const route = byPath.get(page.path);
      expect(route, page.path).toBeDefined();
      expect(page.title, `${page.path} título`).toBe(route!.title);
      expect(page.description, `${page.path} descrição`).toBe(route!.description);
      expect(page.h1, `${page.path} h1`).toBe(route!.h1);
    }
  });

  it("o FAQ visível é o mesmo do JSON-LD (uma única fonte)", () => {
    expect(byPath.get("/")!.faq).toEqual(homeFaqs);
    for (const page of Object.values(localPages)) expect(byPath.get(page.path)!.faq).toEqual(page.faq);
  });

  it("títulos cabem em 65 caracteres e descrições em 160", () => {
    for (const route of routes as Route[]) {
      expect(route.title.length, route.path).toBeLessThanOrEqual(65);
      expect(route.description.length, route.path).toBeLessThanOrEqual(160);
    }
  });
});
