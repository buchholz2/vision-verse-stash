import { useEffect } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_NUMBER, whatsappLink } from "@/lib/contact";
import { startConversionTracking } from "@/lib/analytics";

/**
 * Desktop: botão flutuante do WhatsApp. Celular: barra inferior com "Ligar" e "Agendar".
 * Ficam sempre visíveis, do início ao fim da página (inclusive durante a seção 3D).
 * Também liga a medição de cliques de contato (src/lib/analytics.ts), que vale para o site todo.
 */
export function FloatingWhatsApp() {
  useEffect(() => startConversionTracking(), []);

  return (
    <>
      {/* Desktop */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        className="group fixed bottom-6 right-6 z-50 hidden md:block"
      >
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-card transition-transform duration-300 group-hover:scale-105">
          <MessageCircle className="h-7 w-7" aria-hidden="true" />
        </span>
      </a>

      {/* Celular */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
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
      {/* Espaço no fim da página para a barra fixa do celular não cobrir o rodapé */}
      <div aria-hidden="true" className="h-[calc(4.5rem+env(safe-area-inset-bottom))] bg-navy-deep md:hidden" />
    </>
  );
}
