import { Instagram, MessageCircle } from "lucide-react";
import logoWordmark from "@/assets/brand/logo-wordmark.png";
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
    <footer className="bg-background border-t border-border/60">
      <div className="container-narrow grid grid-cols-1 gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <img
            src={logoWordmark}
            alt="Gabriel Paulo Rockenbach"
            className="h-12 w-auto"
            loading="lazy"
          />
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-sm">
            Cirurgião-dentista e especialista em Ortodontia. Cuidado humanizado,
            alinhadores Invisalign® e planejamento digital para o seu sorriso.
          </p>
          <p className="mt-4 text-xs text-muted-foreground tracking-wider">CRO 29705 · Ijuí/RS</p>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-serif text-base text-foreground">Navegação</h4>
          <ul className="mt-4 space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-serif text-base text-foreground">Contato</h4>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-label="Falar pelo WhatsApp"
              >
                <MessageCircle className="h-4 w-4 text-primary" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-label="Abrir Instagram"
              >
                <Instagram className="h-4 w-4 text-primary" />
                @gabirockenbachp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-narrow py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Gabriel Paulo Rockenbach. Todos os direitos reservados.</p>
          <p className="max-w-xl text-center md:text-right">
            As informações deste site têm caráter informativo e não substituem
            avaliação profissional individualizada.
          </p>
        </div>
      </div>
    </footer>
  );
}
