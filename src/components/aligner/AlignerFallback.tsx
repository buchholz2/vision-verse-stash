import { BEATS, CAPTION } from "@/lib/dental/timeline";
import stepOne from "@/assets/aligner/aligner-1-partida.webp";
import stepTwo from "@/assets/aligner/aligner-2-encaixe.webp";
import stepThree from "@/assets/aligner/aligner-3-movimento.webp";
import stepFour from "@/assets/aligner/aligner-4-resultado.webp";

const IMAGES = [
  { src: stepOne, alt: "Arcada com os dentes desalinhados, antes do tratamento." },
  { src: stepTwo, alt: "Alinhador transparente encaixando sobre a arcada." },
  { src: stepThree, alt: "Dentes se movendo gradualmente sob o alinhador." },
  { src: stepFour, alt: "Arcada alinhada, com o alinhador se afastando." },
];

/** Alternativa sem WebGL ou com movimento reduzido: as mesmas etapas, com renders da cena 3D. */
export function AlignerFallback() {
  const steps = BEATS.filter((beat) => beat.still !== undefined);
  return (
    <div className="container-wide mt-8 pb-4">
      <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {steps.map((beat) => (
          <li key={beat.id}>
            <div className="rounded-2xl bg-secondary p-4">
              <img
                src={IMAGES[beat.still!].src}
                alt={IMAGES[beat.still!].alt}
                width={1100}
                height={825}
                loading="lazy"
                className="aspect-[4/3] w-full object-contain"
              />
            </div>
            <p className="mt-5 text-sm font-semibold text-accent-text">{beat.kicker}</p>
            <h3 className="mt-2 font-serif text-2xl leading-tight text-foreground">{beat.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{beat.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 max-w-sm text-xs leading-relaxed text-muted-foreground">{CAPTION}</p>
    </div>
  );
}
