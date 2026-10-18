import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface Props {
  message?: string;
  children?: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "primary" | "whatsapp" | "light";
  ariaLabel?: string;
  showIcon?: boolean;
}

/** CTA único do site: sempre abre o WhatsApp do consultório (dados em src/lib/contact.ts). */
export function WhatsAppButton({
  message,
  children = "Agendar avaliação",
  className,
  size = "default",
  variant = "primary",
  ariaLabel = "Agendar avaliação pelo WhatsApp",
  showIcon = true,
}: Props) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-soft",
    whatsapp: "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90",
    light: "bg-white text-primary hover:bg-white/90",
  };

  return (
    <Button
      asChild
      size={size}
      className={cn(
        "h-auto min-h-10 min-w-0 max-w-full whitespace-normal rounded-full text-center font-semibold tracking-normal shadow-none transition-colors duration-200",
        size === "lg" && "min-h-[3.25rem] px-6 py-3 text-[0.95rem]",
        variants[variant],
        className,
      )}
    >
      <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {showIcon && <MessageCircle aria-hidden="true" />}
        {children}
      </a>
    </Button>
  );
}
