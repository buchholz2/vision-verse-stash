import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-40"
        style={{ background: "hsl(var(--whatsapp))" }}
        aria-hidden="true"
      />
      {/* Main button */}
      <span
        className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_4px_24px_hsl(142_70%_38%/0.5)] transition-all duration-400 group-hover:scale-110 group-hover:shadow-[0_8px_36px_hsl(142_70%_38%/0.65)]"
        style={{
          background: "linear-gradient(135deg, hsl(142 70% 42%) 0%, hsl(142 60% 32%) 100%)",
        }}
      >
        <MessageCircle className="h-7 w-7 text-white" fill="currentColor" fillOpacity={0.15} />
      </span>

      {/* Tooltip */}
      <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border/60 bg-card px-4 py-2 text-xs font-medium text-foreground shadow-card opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1">
        Falar pelo WhatsApp
      </span>
    </a>
  );
}
