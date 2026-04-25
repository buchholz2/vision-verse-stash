import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoFull from "@/assets/brand/logo-full.png";
import { WhatsAppButton } from "./WhatsAppButton";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#ortodontia", label: "Ortodontia" },
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth",
        scrolled
          ? "glass border-b border-border/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-narrow flex items-center justify-between gap-6">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Página inicial">
          <img
            src={logoFull}
            alt="Gabriel Paulo Rockenbach — Cirurgião-dentista | Ortodontista"
            className={cn(
              "transition-all duration-500 ease-smooth w-auto",
              scrolled ? "h-9 md:h-10" : "h-10 md:h-12"
            )}
            loading="eager"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton size="default">Agendar avaliação</WhatsAppButton>
        </div>

        <button
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full text-foreground hover:bg-muted transition-colors"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden glass border-b border-border/50 overflow-hidden transition-[max-height,opacity] duration-500 ease-smooth",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-narrow py-6 flex flex-col gap-2" aria-label="Navegação mobile">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-foreground/90 border-b border-border/40 last:border-0"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4">
            <WhatsAppButton size="lg" className="w-full">
              Agendar avaliação
            </WhatsAppButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
