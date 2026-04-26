import { useEffect, useState, useRef } from "react";
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
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("#inicio");
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrolled(scrollTop > 24);
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const sectionIds = NAV.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        ref={progressRef}
        className="scroll-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth",
          scrolled
            ? "glass border-b border-border/40 py-3 shadow-soft"
            : "bg-background/60 py-4 backdrop-blur-sm"
        )}
      >
        <div className="container-wide flex items-center justify-between gap-6">
          <a href="#inicio" className="group flex min-w-0 items-center" aria-label="Página inicial">
            <img
              src={logoFull}
              alt="Gabriel Paulo Rockenbach - cirurgião-dentista e ortodontista"
              className="h-11 w-auto max-w-[235px] object-contain transition-all duration-500 group-hover:opacity-80 group-hover:scale-[0.98] sm:h-12 sm:max-w-[330px] lg:h-13 lg:max-w-[380px]"
              loading="eager"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação principal">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm transition-colors duration-300 pb-0.5",
                  activeSection === item.href
                    ? "text-primary font-medium"
                    : "text-foreground/65 hover:text-primary"
                )}
              >
                {item.label}
                {activeSection === item.href && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-gold animate-fade-in" aria-hidden="true" />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <WhatsAppButton size="default" className="border border-accent/30 shadow-card hover:shadow-gold">
              Agendar avaliação
            </WhatsAppButton>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-all hover:bg-primary/8 hover:text-primary lg:hidden"
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          className={cn(
            "glass overflow-hidden border-b border-border/40 transition-[max-height,opacity] duration-500 ease-smooth lg:hidden",
            open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="container-narrow flex flex-col gap-1 py-6" aria-label="Navegação mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 border-b border-border/30 py-4 text-base last:border-0 transition-colors duration-200",
                  activeSection === item.href
                    ? "text-primary font-medium"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {activeSection === item.href && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                )}
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
    </>
  );
}
