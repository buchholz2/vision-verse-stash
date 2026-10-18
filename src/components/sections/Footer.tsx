import { Instagram, MessageCircle } from "lucide-react";
import logoFull from "@/assets/brand/logo-full-web.png";
import { whatsappLink, ADDRESS_DISPLAY, GOOGLE_MAPS_URL, INSTAGRAM_URL, PHONE_DISPLAY } from "@/lib/contact";

const links = [
  { href: "/#alinhadores", label: "Alinhadores" },
  { href: "/#sobre", label: "Dr. Gabriel" },
  { href: "/#tratamentos", label: "Tratamentos" },
  { href: "/#atendimento", label: "Atendimento" },
  { href: "/#etapas", label: "Etapas" },
  { href: "/#perguntas-frequentes", label: "Dúvidas" },
  { href: "/#contato", label: "Contato" },
];

const localLinks = [
  { href: "/ortodontista-em-ijui", label: "Ortodontista em Ijuí" },
  { href: "/invisalign-em-ijui", label: "Invisalign em Ijuí" },
  { href: "/aparelho-transparente-em-ijui", label: "Aparelho transparente" },
  { href: "/dentista-em-ijui", label: "Dentista em Ijuí" },
];

const linkClass = "text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="container-wide layout-grid py-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-5">
          <img
            src={logoFull}
            alt="Gabriel Paulo Rockenbach - cirurgião-dentista e ortodontista"
            width={900}
            height={249}
            className="h-14 w-auto max-w-full object-contain brightness-0 invert opacity-90 md:h-14"
            loading="lazy"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            Cirurgião-dentista e especialista em Ortodontia, em Ijuí/RS. Alinhadores Invisalign® e planejamento digital.
          </p>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {ADDRESS_DISPLAY}
            </a>
          </address>
          <div className="mt-6 flex gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white" aria-label={`WhatsApp ${PHONE_DISPLAY}`}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white" aria-label="Instagram">
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav className="lg:col-span-3" aria-label="Rodapé: seções">
          <h2 className="flex min-h-14 items-center font-serif text-lg leading-snug text-white">Navegação</h2>
          <ul className="mt-5 space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-4" aria-label="Rodapé: páginas locais">
          <h2 className="flex min-h-14 items-center font-serif text-lg leading-snug text-white">Atendimento em Ijuí</h2>
          <ul className="mt-5 space-y-2.5">
            {localLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/60 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="space-y-2 lg:col-span-5">
            <p>© {new Date().getFullYear()} Dr. Gabriel Paulo Rockenbach. Todos os direitos reservados.</p>
            <p>
              <a href="/politica-de-privacidade" className="underline underline-offset-2 hover:text-white">
                Política de Privacidade
              </a>
            </p>
          </div>
          <div className="space-y-2 lg:col-span-7">
            <p>As informações deste site têm caráter informativo e não substituem avaliação profissional individualizada.</p>
            <p>Invisalign® é marca registrada da Align Technology, Inc. As demais marcas citadas pertencem aos seus titulares.</p>
            <p>Animação ilustrativa dos alinhadores, feita sobre um modelo 3D adaptado. O alinhador foi criado para este site.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
