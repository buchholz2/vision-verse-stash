// Eventos de conversão sem dependência de fornecedor. Não carrega nenhum script de terceiros.
//
// Cada clique em WhatsApp, telefone, Instagram ou mapa dispara um CustomEvent "site:conversion" no document e,
// se existirem, é repassado para `window.dataLayer` (Google Tag Manager/GA4) ou `window.plausible`.
// Para ativar a medição, basta incluir o script do fornecedor escolhido (e o aviso de consentimento, se usar cookies).

export type ConversionKind = "whatsapp" | "telefone" | "instagram" | "mapa";

export interface ConversionEvent {
  kind: ConversionKind;
  /** Texto do botão/link, para distinguir os CTAs. */
  label: string;
  /** Seção da página em que o clique ocorreu. */
  section: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function classifyLink(href: string): ConversionKind | null {
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return "whatsapp";
  if (href.startsWith("tel:")) return "telefone";
  if (/^https?:\/\/(www\.)?instagram\.com\//.test(href)) return "instagram";
  if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl/.test(href)) return "mapa";
  return null;
}

export function trackConversion(event: ConversionEvent) {
  document.dispatchEvent(new CustomEvent<ConversionEvent>("site:conversion", { detail: event }));
  window.dataLayer?.push({ event: "conversion", conversion_type: event.kind, label: event.label, section: event.section });
  window.plausible?.("Conversão", { props: { tipo: event.kind, rotulo: event.label, secao: event.section } });
}

/** Delegação de eventos: um único listener cobre todos os links de contato, inclusive os futuros. */
export function startConversionTracking(): () => void {
  const onClick = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;
    const kind = classifyLink(link.href);
    if (!kind) return;
    trackConversion({
      kind,
      label: (link.getAttribute("aria-label") || link.textContent || "").trim().slice(0, 80),
      section: link.closest("section[id], footer, header")?.id || link.closest("footer")?.tagName.toLowerCase() || "pagina",
    });
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
