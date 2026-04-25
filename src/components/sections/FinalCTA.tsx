import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { WhatsAppButton } from "../WhatsAppButton";
import { INSTAGRAM_URL, PHONE_DISPLAY } from "@/lib/contact";

export function FinalCTA() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-28"
    >
      <div className="absolute inset-x-0 top-0 gold-divider opacity-70" aria-hidden="true" />
      <div className="absolute inset-0 hairline-panel opacity-[0.08]" aria-hidden="true" />

      <div className="container-narrow relative text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-xs uppercase tracking-[0.25em] text-accent"
        >
          Agende sua avaliação
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-[1.08] md:text-6xl text-balance"
        >
          Pronto para cuidar do <span className="italic text-accent">seu sorriso?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mx-auto mt-5 max-w-xl leading-relaxed text-primary-foreground/90 text-pretty"
        >
          Agende sua avaliação e descubra o tratamento mais indicado para o seu caso.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.24 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <WhatsAppButton variant="whatsapp" size="lg">
            WhatsApp {PHONE_DISPLAY}
          </WhatsAppButton>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-foreground/90 transition-colors duration-300 hover:text-accent"
            aria-label="Abrir Instagram do Dr. Gabriel"
          >
            <Instagram className="h-5 w-5" />
            <span className="text-sm tracking-wide">@gabirockenbachp</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
