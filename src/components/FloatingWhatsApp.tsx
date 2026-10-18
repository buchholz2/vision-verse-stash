import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_NUMBER, whatsappLink } from "@/lib/contact";
import { startConversionTracking } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// Os atalhos de contato somem enquanto o CTA principal já está na tela (abertura, painel, FAQ, contato e rodapé).
const WATCHED = ["inicio", "contato", "painel-alinhadores", "perguntas-frequentes"];

/**
 * Desktop: botão flutuante do WhatsApp. Celular: barra inferior com "Ligar" e "Agendar".
 * Também liga a medição de cliques de contato (src/lib/analytics.ts), que vale para o site todo.
 */
export function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => startConversionTracking(), []);

  useEffect(() => {
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)));
        setHidden(visible.size > 0);
      },
      { threshold: 0.35 },
    );
    [...WATCHED.map((id) => document.getElementById(id)), document.querySelector("footer")].forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        tabIndex={hidden ? -1 : 0}
        className={cn(
          "group fixed bottom-6 right-6 z-50 hidden transition-all duration-300 md:block",
          hidden ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-card transition-transform duration-300 group-hover:scale-105">
          <MessageCircle className="h-7 w-7" aria-hidden="true" />
        </span>
      </a>

      {/* Celular */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-all duration-300 md:hidden",
          hidden ? "pointer-events-none translate-y-full opacity-0" : "translate-y-0 opacity-100",
        )}
        {...(hidden ? ({ inert: "" } as object) : {})}
      >
        <div className="mx-auto grid max-w-md grid-cols-[auto_1fr] gap-3">
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            aria-label="Ligar para o consultório"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold text-foreground"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Ligar
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar avaliação pelo WhatsApp"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Agendar avaliação
          </a>
        </div>
      </div>
    </>
  );
}
