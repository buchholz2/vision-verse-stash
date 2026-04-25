import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoIcon from "@/assets/brand/logo-icon.png";
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
        scrolled ? "glass border-b border-border/50 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container-narrow flex items-center justify-between gap-6">
        <a href="#inicio" className="group flex items-center gap-3" aria-label="Página inicial">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-card/75 shadow-soft transition-all duration-500 group-hover:border-primary/30">
            <img src={logoIcon} alt="" className="h-6 w-6 object-contain" loading="eager" />
          </span>
          <span className="font-serif text-lg leading-none text-foreground md:text-xl">
            Gabriel Paulo Rockenbach
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/75 transition-colors duration-300 hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <WhatsAppButton size="default">Agendar avaliação</WhatsAppButton>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "glass overflow-hidden border-b border-border/50 transition-[max-height,opacity] duration-500 ease-smooth lg:hidden",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-narrow flex flex-col gap-2 py-6" aria-label="Navegação mobile">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/40 py-3 text-base text-foreground/90 last:border-0"
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
