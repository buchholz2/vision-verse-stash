import { Gem, Link2, ScanSearch, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

const orthodontics = [
  { icon: ScanSearch, title: "Alinhadores Invisalign®", desc: "Transparentes, removíveis e planejados digitalmente.", href: "/invisalign-em-ijui", more: "Invisalign em Ijuí" },
  { icon: Gem, title: "Aparelhos estéticos", desc: "Alternativa em cerâmica para quem busca mais discrição.", href: "/aparelho-transparente-em-ijui", more: "Aparelho transparente em Ijuí" },
  { icon: Settings2, title: "Aparelhos autoligados", desc: "Sistema moderno, com acompanhamento ajustado ao plano do caso." },
  { icon: Link2, title: "Aparelhos convencionais", desc: "Indicação clássica para alinhamento e correções ortodônticas.", href: "/ortodontista-em-ijui", more: "Ortodontista em Ijuí" },
];

const groups = [
  {
    title: "Prevenção e estética",
    items: [
      { title: "Profilaxia", desc: "Limpeza profissional para controlar biofilme, preservar a gengiva e manter o sorriso saudável." },
      { title: "Clareamento", desc: "Indicação segura para iluminar o sorriso, respeitando sensibilidade, rotina e expectativa estética." },
      { title: "Facetas", desc: "Planejamento estético para ajustar forma, cor e proporção do sorriso com indicação criteriosa." },
    ],
  },
  {
    title: "Restauração e reabilitação",
    items: [
      { title: "Restaurações", desc: "Recuperação de dentes com materiais atuais, buscando naturalidade, função e acabamento discreto." },
      { title: "Próteses", desc: "Soluções para repor dentes ausentes e devolver conforto, confiança e estabilidade mastigatória." },
      { title: "Exodontia de sisos", desc: "Procedimento planejado com avaliação clínica, orientação prévia e cuidado no pós-operatório." },
    ],
  },
];

export function Treatments() {
  return (
    <section id="tratamentos" className="section-y scroll-mt-20 bg-background">
      <div className="container-wide">
        {/* Bloco 1: texto e foto à esquerda, lista alinhada ao topo à direita */}
        <div className="layout-grid lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="section-title">O tratamento certo começa pelo seu caso.</h2>
            <p className="lead mt-6">
              Aparelhos e alinhadores são escolhidos após avaliação clínica e diagnóstico, com um caminho compatível com
              a rotina e o objetivo de cada paciente.
            </p>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-muted">
              <ResponsivePhoto
                name="gabriel-tratamentos-clinica"
                alt="Dr. Gabriel em consultório odontológico"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <h3 className="font-serif text-3xl leading-tight text-foreground md:text-[2.2rem]">Como alinhar o sorriso</h3>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {orthodontics.map((item) => (
                <li key={item.title} className="flex items-start gap-5 py-7">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary-soft">
                    <item.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-serif text-xl leading-snug text-foreground">{item.title}</h4>
                    <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">{item.desc}</p>
                    {item.href && (
                      <Link to={item.href} className="mt-2 inline-block text-sm font-semibold text-primary-soft underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        {item.more}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bloco 2: mesmo ritmo, texto à esquerda e conteúdo à direita */}
        <div className="mt-20 layout-grid border-t border-border pt-16 lg:items-start">
          <div className="lg:col-span-5">
            <h3 className="font-serif text-3xl leading-tight text-foreground md:text-[2.2rem]">Outros tratamentos</h3>
            <p className="lead mt-5">Prevenção, estética e reabilitação no mesmo consultório, com indicação feita caso a caso.</p>
          </div>
          <div className="space-y-12 lg:col-span-7">
            {groups.map((group) => (
              <div key={group.title}>
                <h4 className="font-serif text-2xl leading-snug text-foreground">{group.title}</h4>
                <ul className="mt-5 divide-y divide-border border-y border-border">
                  {group.items.map((item) => (
                    <li key={item.title} className="grid gap-1 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
                      <h5 className="font-semibold text-foreground">{item.title}</h5>
                      <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
