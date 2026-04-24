import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com Dr. Gabriel pelo WhatsApp"
      className={cn(
        "fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full",
        "bg-whatsapp text-whatsapp-foreground shadow-elegant transition-all duration-500 ease-smooth",
        "hover:scale-110 hover:shadow-gold",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <MessageCircle className="h-6 w-6" />
      <span
        className="absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-40 animate-ping"
        aria-hidden="true"
      />
    </a>
  );
}
