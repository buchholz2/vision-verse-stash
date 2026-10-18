import { describe, expect, it, vi } from "vitest";
import { classifyLink, startConversionTracking } from "@/lib/analytics";

describe("medição de conversões", () => {
  it("classifica os links de contato", () => {
    expect(classifyLink("https://wa.me/5555996693480?text=oi")).toBe("whatsapp");
    expect(classifyLink("tel:+5555996693480")).toBe("telefone");
    expect(classifyLink("https://www.instagram.com/gabirockenbachp/")).toBe("instagram");
    expect(classifyLink("https://www.google.com/maps/search/?api=1&query=x")).toBe("mapa");
    expect(classifyLink("https://example.com/")).toBeNull();
  });

  it("dispara um evento por clique em link de contato e ignora os demais", () => {
    document.body.innerHTML = `<section id="contato"><a id="w" href="https://wa.me/5555996693480" aria-label="Agendar">Agendar</a><a id="o" href="/outra">Outra</a></section>`;
    const noNavigation = (e: Event) => e.preventDefault(); // jsdom não implementa navegação
    document.addEventListener("click", noNavigation);
    const stop = startConversionTracking();
    const handler = vi.fn();
    document.addEventListener("site:conversion", handler as EventListener);
    document.getElementById("o")!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    document.getElementById("w")!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    stop();
    document.removeEventListener("click", noNavigation);
    document.removeEventListener("site:conversion", handler as EventListener);
    expect(handler).toHaveBeenCalledTimes(1);
    expect((handler.mock.calls[0][0] as CustomEvent).detail).toMatchObject({ kind: "whatsapp", section: "contato" });
  });
});
