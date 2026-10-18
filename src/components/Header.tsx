import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import logoFull from "@/assets/brand/logo-full-web.png";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#alinhadores", sectionId: "alinhadores", label: "Alinhadores" },
  { href: "/#sobre", sectionId: "sobre", label: "Dr. Gabriel" },
  { href: "/#tratamentos", sectionId: "tratamentos", label: "Tratamentos" },
  { href: "/#atendimento", sectionId: "atendimento", label: "Atendimento" },
  { href: "/#contato", sectionId: "contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((item) => {
      const el = document.getElementById(item.sectionId);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Menu móvel: foco no primeiro link ao abrir, Esc fecha e devolve o foco ao botão.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-border/70 bg-background/95 backdrop-blur-md" : "bg-background/95",
      )}
    >
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-5 focus:py-3 focus:text-primary">Pular para o conteúdo</a>
      <div className="container-wide flex h-[4.25rem] items-center justify-between gap-6 lg:h-[4.75rem]">
        <a href="/" className="flex min-w-0 items-center" aria-label="Dr. Gabriel Rockenbach, página inicial">
          <img
            src={logoFull}
            alt="Gabriel Paulo Rockenbach - cirurgião-dentista e ortodontista"
            width={900}
            height={249}
            className="h-10 w-auto max-w-[220px] object-contain sm:h-11 sm:max-w-[290px] lg:h-11"
            loading="eager"
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeSection === item.sectionId ? "location" : undefined}
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === item.sectionId ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          ref={buttonRef}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-muted lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-movel"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="menu-movel"
        ref={menuRef}
        {...(open ? {} : ({ inert: "" } as object))}
        style={{
          // Visível de imediato ao abrir (o foco precisa de um elemento visível); some só depois de recolher.
          transition: `max-height 300ms ease, visibility 0s linear ${open ? "0s" : "300ms"}`,
        }}
        className={cn(
          "overflow-hidden bg-background/95 lg:hidden",
          open ? "visible max-h-[32rem]" : "invisible max-h-0",
        )}
      >
        <nav className="container-wide flex flex-col py-4" aria-label="Navegação mobile">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-4 text-base font-medium text-foreground last:border-0"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
