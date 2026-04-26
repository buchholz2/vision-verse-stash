import { Instagram, MessageCircle, MapPin, Clock } from "lucide-react";
import logoFull from "@/assets/brand/logo-full.png";
import { whatsappLink, INSTAGRAM_URL, PHONE_DISPLAY } from "@/lib/contact";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#ortodontia", label: "Ortodontia" },
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground/70">
      <div className="container-wide grid grid-cols-1 gap-12 py-16 md:grid-cols-12">

        {/* Brand column */}
        <div className="md:col-span-5">
          <img
            src={logoFull}
            alt="Gabriel Paulo Rockenbach - cirurgião-dentista e ortodontista"
            className="h-16 w-auto max-w-full object-contain brightness-0 invert opacity-90 md:h-20"
            loading="lazy"
          />
          <p className="mt-5 text-sm leading-relaxed text-primary-foreground/55 max-w-sm">
            Cirurgião-dentista e especialista em Ortodontia. Cuidado humanizado,
            alinhadores Invisalign® e planejamento digital para o seu sorriso.
          </p>

          {/* Credential chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["CRO 29705", "Invisalign® Provider", "Ijuí/RS"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs text-primary-foreground/60"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Social */}
          <div className="mt-7 flex gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-primary-foreground/60 transition-all duration-300 hover:bg-white/14 hover:text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-primary-foreground/60 transition-all duration-300 hover:bg-white/14 hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Navigation column */}
        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground/80">Navegação</h4>
          <ul className="mt-5 space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-primary-foreground/50 transition-colors duration-200 hover:text-primary-foreground/90"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div className="md:col-span-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground/80">Contato</h4>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm text-primary-foreground/55 transition-colors hover:text-primary-foreground/90"
                aria-label="Falar pelo WhatsApp"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/6 transition-colors group-hover:bg-white/12">
                  <MessageCircle className="h-4 w-4 text-accent" />
                </span>
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm text-primary-foreground/55 transition-colors hover:text-primary-foreground/90"
                aria-label="Abrir Instagram"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/6 transition-colors group-hover:bg-white/12">
                  <Instagram className="h-4 w-4 text-accent" />
                </span>
                @gabirockenbachp
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-primary-foreground/50">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/6">
                <MapPin className="h-4 w-4 text-accent" />
              </span>
              Ijuí, Rio Grande do Sul — RS
            </li>
            <li className="flex items-start gap-3 text-sm text-primary-foreground/50">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/6">
                <Clock className="h-4 w-4 text-accent" />
              </span>
              <span>
                Seg–Sex: 8h às 18h<br />
                Sob agendamento
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Gold divider */}
      <div className="gold-divider opacity-30" aria-hidden="true" />

      {/* Bottom bar */}
      <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/35">
        <p>© {new Date().getFullYear()} Dr. Gabriel Paulo Rockenbach. Todos os direitos reservados.</p>
        <p className="max-w-xl text-center md:text-right">
          As informações deste site têm caráter informativo e não substituem
          avaliação profissional individualizada.
        </p>
      </div>
    </footer>
  );
}
