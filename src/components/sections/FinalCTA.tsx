import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";
import { WhatsAppButton } from "../WhatsAppButton";
import { INSTAGRAM_URL, PHONE_DISPLAY } from "@/lib/contact";

const circles = [
  { cx: 80, cy: 80, r: 60, opacity: 0.04 },
  { cx: 80, cy: 80, r: 40, opacity: 0.06 },
  { cx: 80, cy: 80, r: 20, opacity: 0.09 },
];

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Circles drift in opposite directions
  const circleLeftY  = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const circleRightY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  // Central glow scale
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="relative overflow-hidden py-20 text-primary-foreground md:py-32"
      style={{ background: "var(--gradient-cta)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(hsl(0 0% 100%) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* SVG decorative circles — opposite parallax */}
      <motion.svg
        className="pointer-events-none absolute -left-24 -top-24 opacity-20"
        width="300" height="300" viewBox="0 0 160 160" fill="none"
        style={{ y: circleLeftY }}
        aria-hidden="true"
      >
        {circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} stroke="white" strokeWidth="1" fill="white" fillOpacity={c.opacity} />
        ))}
      </motion.svg>

      <motion.svg
        className="pointer-events-none absolute -bottom-16 -right-16 opacity-15"
        width="280" height="280" viewBox="0 0 160 160" fill="none"
        style={{ y: circleRightY }}
        aria-hidden="true"
      >
        {circles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} stroke="white" strokeWidth="1" fill="white" fillOpacity={c.opacity} />
        ))}
      </motion.svg>

      {/* Central radial glow — scales with scroll */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[600px] opacity-[0.12]"
        style={{
          background: "radial-gradient(ellipse 60% 70% at center, hsl(210 42% 55%) 0%, transparent 70%)",
          scale: glowScale,
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 top-0 gold-divider opacity-60" aria-hidden="true" />

      <div className="container-wide relative text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="inline-block rounded-full border border-accent/30 bg-accent/12 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-accent"
        >
          Agende sua avaliação
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-[1.05] md:text-6xl text-balance"
        >
          Pronto para cuidar do{" "}
          <em
            className="not-italic"
            style={{
              background: "var(--gradient-gold)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            seu sorriso?
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/75 text-pretty"
        >
          Agende sua avaliação e descubra o tratamento mais indicado para o seu caso.
          Atendimento humanizado, planejamento digital e resultado natural.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.24 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <WhatsAppButton
            variant="whatsapp" size="lg"
            className="shadow-[0_0_40px_hsl(142_70%_38%/0.5)] hover:shadow-[0_0_60px_hsl(142_70%_38%/0.65)] transition-shadow duration-500"
          >
            WhatsApp {PHONE_DISPLAY}
          </WhatsAppButton>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-sm font-medium text-primary-foreground/90 transition-all duration-300 hover:bg-white/15 hover:border-white/35 hover:text-white backdrop-blur-sm"
            aria-label="Abrir Instagram do Dr. Gabriel"
          >
            <Instagram className="h-4 w-4" />
            <span>@gabirockenbachp</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-5 border-t border-white/10 pt-10 text-sm text-primary-foreground/50"
        >
          <span>CRO 29705</span>
          <span className="h-px w-5 bg-white/20 sm:h-3.5 sm:w-px" aria-hidden="true" />
          <span>Ijuí/RS</span>
          <span className="h-px w-5 bg-white/20 sm:h-3.5 sm:w-px" aria-hidden="true" />
          <span>Invisalign® Provider</span>
          <span className="h-px w-5 bg-white/20 sm:h-3.5 sm:w-px" aria-hidden="true" />
          <span>Especialista em Ortodontia</span>
        </motion.div>
      </div>
    </section>
  );
}
