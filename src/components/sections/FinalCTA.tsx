import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { WhatsAppButton } from "../WhatsAppButton";
import { INSTAGRAM_URL } from "@/lib/contact";

export function FinalCTA() {
  return (
    <section
      id="contato"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(137 7% 24%) 0%, hsl(137 7% 39%) 60%, hsl(131 7% 51%) 100%)",
      }}
    >
      {/* texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(38 47% 70%/0.2), transparent 40%), radial-gradient(circle at 80% 80%, hsl(38 47% 70%/0.18), transparent 40%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 gold-divider opacity-70" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 gold-divider opacity-70" aria-hidden="true" />

      <div className="container-narrow relative text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.25em] text-accent"
        >
          Vamos começar
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-serif text-4xl md:text-6xl text-primary-foreground text-balance leading-[1.05]"
        >
          Pronto para cuidar <br className="hidden md:block" />
          do <span className="italic text-accent">seu sorriso?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl mx-auto text-primary-foreground/80 leading-relaxed text-pretty"
        >
          Agende sua avaliação e dê o primeiro passo com segurança, conforto
          e planejamento individualizado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <WhatsAppButton variant="whatsapp" size="lg">
            Falar pelo WhatsApp
          </WhatsAppButton>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-accent transition-colors duration-300"
            aria-label="Abrir Instagram do Dr. Gabriel"
          >
            <Instagram className="h-5 w-5" />
            <span className="text-sm tracking-wide">@gabirockenbachp</span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-xs text-primary-foreground/60 tracking-wide"
        >
          CRO 29705 · Ijuí/RS · Endereço a confirmar
        </motion.p>
      </div>
    </section>
  );
}
