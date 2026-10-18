import { Clock, Instagram, MapPin, MessageCircle } from "lucide-react";
import { WhatsAppButton } from "../WhatsAppButton";
import { GOOGLE_MAPS_URL, INSTAGRAM_URL, PHONE_DISPLAY, STREET_ADDRESS, whatsappLink } from "@/lib/contact";

export function FinalCTA() {
  return (
    <section id="contato" className="scroll-mt-24 py-14 md:py-20 bg-navy text-white">
      <div className="container-wide layout-grid lg:items-start">
        <div className="min-w-0 lg:col-span-5">
          <h2 className="section-title text-white">
            Vamos avaliar o seu sorriso?
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
            Agende uma avaliação e descubra o tratamento mais indicado para o seu caso.
          </p>
          <WhatsAppButton variant="light" size="lg" className="mt-8 w-full sm:w-auto">
            Agendar pelo WhatsApp
          </WhatsAppButton>
        </div>

        <ul className="grid min-w-0 gap-6 rounded-2xl border border-white/15 p-6 text-sm leading-relaxed sm:grid-cols-2 sm:p-8 lg:col-span-7">
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-start gap-3 py-1 text-white/90 hover:text-white">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-start gap-3 py-1 text-white/90 hover:text-white" aria-label="Instagram do Dr. Gabriel">
              <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              @gabirockenbachp
            </a>
          </li>
          <li>
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-start gap-3 py-1 text-white/90 hover:text-white">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span>{STREET_ADDRESS}<br />Ijuí, Rio Grande do Sul</span>
            </a>
          </li>
          <li className="flex items-start gap-3 text-white/90">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <span className="min-w-0">Segunda a sexta, 8h às 18h, sob agendamento</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
