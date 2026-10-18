import { motion, useTransform, type MotionValue } from "framer-motion";
import { BEATS, type Beat } from "@/lib/dental/timeline";
import type { AnchorOutputs } from "./AlignerScene";

const FADE = 0.035;

interface Layout {
  width: number;
  height: number;
}

/** Telas largas: balões nas laterais da arcada. Estreitas: balão centralizado abaixo da arcada. */
export function usesSideBalloons({ width }: Layout) {
  return width >= 900;
}

/** Largura do cartão do balão (px) nas telas largas. */
export function sideCardWidth(width: number) {
  return Math.min(304, width * 0.24);
}

/** Margem lateral do container do site (mesma regra de `.container-wide`): os balões alinham a ela. */
function containerEdge(width: number) {
  const pad = Math.min(40, Math.max(20, 6.4 + width * 0.034));
  return Math.max(0, (width - 1200) / 2) + pad;
}

/** Ponto em que a linha de chamada encontra o balão (borda do cartão). */
export function balloonEndpoint(beat: Beat, { width, height }: Layout) {
  if (!usesSideBalloons({ width, height })) return { x: width / 2, y: height * 0.65 };
  const card = sideCardWidth(width);
  const edge = containerEdge(width);
  return { x: beat.side === "left" ? edge + card : width - edge - card, y: height * 0.36 };
}

function useBeatOpacity(progress: MotionValue<number>, index: number) {
  const beat = BEATS[index];
  const first = index === 0;
  const last = index === BEATS.length - 1;
  const inputs = first
    ? [0, beat.to - FADE, beat.to]
    : last
      ? [beat.from - FADE, beat.from + FADE, 1]
      : [beat.from - FADE, beat.from + FADE, beat.to - FADE, beat.to];
  return useTransform(progress, inputs, first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0]);
}

function Callout({ index, progress, anchors, layout }: { index: number; progress: MotionValue<number>; anchors: AnchorOutputs; layout: Layout }) {
  const beat = BEATS[index];
  const opacity = useBeatOpacity(progress, index);
  const visibility = useTransform(opacity, (v) => (v > 0.02 ? "visible" : "hidden"));
  // A linha "se desenha" enquanto o balão aparece.
  const draw = useTransform(opacity, [0, 0.9], [0, 1]);
  const end = balloonEndpoint(beat, layout);
  const side = usesSideBalloons(layout);
  const ax = anchors[beat.anchor].x;
  const ay = anchors[beat.anchor].y;
  const path = useTransform([ax, ay], ([x, y]: number[]) => `M ${x} ${y} L ${end.x} ${end.y}`);
  const cardTransform = side ? (beat.side === "left" ? "translate(-100%, -50%)" : "translate(0, -50%)") : "translate(-50%, 0)";
  const slide = useTransform(opacity, [0, 1], [side ? (beat.side === "left" ? 14 : -14) : 0, 0]);
  const rise = useTransform(opacity, [0, 1], [side ? 0 : 14, 0]);

  return (
    <motion.div style={{ opacity, visibility }} className="pointer-events-none absolute inset-0">
      <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <motion.path d={path} fill="none" stroke="hsl(var(--accent-text))" strokeWidth={1.5} strokeLinecap="round" style={{ pathLength: draw }} />
        <motion.circle cx={ax} cy={ay} r={5} fill="hsl(var(--accent-text))" />
        <motion.circle cx={ax} cy={ay} r={11} fill="none" stroke="hsl(var(--accent-text))" strokeOpacity={0.45} strokeWidth={1.5} />
        <circle cx={end.x} cy={end.y} r={3.5} fill="hsl(var(--accent-text))" />
      </svg>
      <div style={{ position: "absolute", left: end.x, top: end.y, transform: cardTransform }}>
        <motion.div
          style={{ x: slide, y: rise, width: side ? sideCardWidth(layout.width) : "min(22rem, calc(100vw - 2.5rem))" }}
          className="pointer-events-auto rounded-2xl border border-border bg-card p-5 text-foreground shadow-elegant sm:p-6"
        >
          <p className="text-xs font-semibold text-accent-text">{beat.kicker}</p>
          <h3 className="mt-2 font-serif text-[1.3rem] leading-[1.15] sm:text-2xl">{beat.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{beat.text}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function RailSegment({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const beat = BEATS[index];
  const scaleX = useTransform(progress, [beat.from, beat.to], [0, 1]);
  return (
    <span className="relative block h-[3px] flex-1 overflow-hidden rounded-full bg-border">
      <motion.span style={{ scaleX }} className="absolute inset-0 origin-left bg-primary-soft" />
    </span>
  );
}

/** Balões com linha de chamada: um por momento da transformação, em sincronia com a rolagem. */
export function AlignerCallouts({ progress, anchors, layout }: { progress: MotionValue<number>; anchors: AnchorOutputs; layout: Layout }) {
  const hint = useTransform(progress, [0, 0.04], [1, 0]);
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-[5.25rem] lg:pt-[5.75rem]" aria-hidden="true">
        <div className="container-wide flex gap-2">
          {BEATS.map((beat, i) => (
            <RailSegment key={beat.id} index={i} progress={progress} />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 z-10">
        {layout.width > 0 && BEATS.map((beat, i) => <Callout key={beat.id} index={i} progress={progress} anchors={anchors} layout={layout} />)}
      </div>
      <motion.p
        style={{ opacity: hint }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-14 z-10 flex animate-bounce justify-center text-xs font-medium text-muted-foreground"
      >
        Role para continuar ↓
      </motion.p>
    </>
  );
}
