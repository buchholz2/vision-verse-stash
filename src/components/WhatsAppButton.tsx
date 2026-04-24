import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface Props {
  message?: string;
  children?: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "primary" | "whatsapp" | "outline";
  ariaLabel?: string;
  showIcon?: boolean;
}

export function WhatsAppButton({
  message,
  children = "Agende sua avaliação",
  className,
  size = "default",
  variant = "primary",
  ariaLabel = "Agendar avaliação pelo WhatsApp",
  showIcon = true,
}: Props) {
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant hover:shadow-gold",
    whatsapp:
      "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 shadow-elegant",
    outline:
      "border border-primary/30 bg-transparent text-foreground hover:bg-primary/5",
  };

  return (
    <Button
      asChild
      size={size}
      className={cn(
        "rounded-full font-medium tracking-wide transition-all duration-500 ease-smooth",
        size === "lg" && "h-14 px-8 text-base",
        variants[variant],
        className
      )}
    >
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {showIcon && <MessageCircle className="opacity-90" />}
        {children}
      </a>
    </Button>
  );
}
