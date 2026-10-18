import { CRO } from "@/lib/contact";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

const credentials = [
  { term: "Registro", detail: CRO },
  { term: "Formação", detail: "Odontologia, FASURGS" },
  { term: "Especialidade", detail: "Ortodontia, com foco em Invisalign® e miniimplantes" },
];

export function About() {
  return (
    <section id="sobre" className="section-y scroll-mt-20 bg-background">
      <div className="container-wide layout-grid lg:items-start">
        <div className="relative lg:col-span-5">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-muted">
            <ResponsivePhoto
              name="gabriel-sobre-sofa"
              alt="Dr. Gabriel Paulo Rockenbach em retrato institucional"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[5/4] sm:aspect-[4/5] w-full object-cover object-[center_30%]"
              loading="lazy"
            />
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <h2 className="section-title">Conheça quem cuida do seu sorriso.</h2>
          <div className="mt-7 max-w-xl space-y-4 text-base leading-[1.75] text-muted-foreground md:text-lg">
            <p>
              Sou cirurgião-dentista e especialista em Ortodontia, com atuação em alinhadores Invisalign® e uso de
              miniimplantes.
            </p>
            <p>
              Cada plano parte do diagnóstico, da função, da estética e da rotina do paciente, com acompanhamento
              próximo do início ao fim.
            </p>
          </div>

          <dl className="mt-10 max-w-xl divide-y divide-border border-y border-border">
            {credentials.map((item) => (
              <div key={item.term} className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-4 py-4">
                <dt className="eyebrow">{item.term}</dt>
                <dd className="text-base text-foreground">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
