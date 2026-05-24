import { Link } from "react-router-dom";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { homeFaqs, localPageList } from "@/data/localPages";

const serviceLinks = [
  { path: "/ortodontista-em-ijui", label: "ortodontista em Ijuí" },
  { path: "/invisalign-em-ijui", label: "Invisalign em Ijuí" },
  { path: "/aparelho-transparente-em-ijui", label: "aparelho transparente em Ijuí" },
  { path: "/dentista-em-ijui", label: "dentista em Ijuí" },
];

export function LocalSeoSection() {
  return (
    <section id="seo-local" className="relative overflow-hidden bg-secondary/70 py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 blue-divider opacity-60" aria-hidden="true" />
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              Atendimento em Ijuí/RS
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.06] text-foreground md:text-6xl text-balance">
              Dentista e ortodontista em Ijuí com foco em alinhadores transparentes
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                O consultório atende pacientes de Ijuí/RS e região que buscam avaliação odontológica,
                ortodontia moderna, Invisalign e alternativas de aparelho transparente com planejamento individualizado.
              </p>
              <p>
                A escolha do tratamento depende de diagnóstico profissional. Por isso, cada caso é avaliado com
                atenção à saúde bucal, à mordida, à rotina do paciente e aos objetivos do sorriso.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {serviceLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card px-5 py-4 text-sm font-medium text-foreground shadow-soft transition-all hover:border-primary/25 hover:bg-primary/5 hover:text-primary"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-5 lg:col-span-5">
            <div className="rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-card">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/8 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-2xl leading-tight text-foreground">Localização e região atendida</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Cidade atendida: Ijuí/RS. Região atendida: Ijuí e municípios próximos do Noroeste do Rio Grande do Sul.
                  </p>
                  <p className="mt-3 rounded-xl border border-dashed border-border bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
                    TODO: Adicionar endereço completo do consultório aqui.
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    TODO: Adicionar link real do Google Maps quando disponível.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <WhatsAppButton size="lg" className="w-full">
                  Agendar avaliação em Ijuí
                </WhatsAppButton>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h3 className="text-2xl leading-tight text-foreground">Tratamentos e informações</h3>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {localPageList.map((page) => (
                  <li key={page.path}>
                    <Link to={page.path} className="text-primary underline-offset-4 hover:underline">
                      {page.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Dúvidas frequentes</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-foreground md:text-5xl">
            Perguntas comuns sobre ortodontia, Invisalign e aparelho transparente
          </h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {homeFaqs.map((item) => (
              <details key={item.question} className="group rounded-[1.5rem] border border-border/60 bg-card p-5 shadow-soft">
                <summary className="cursor-pointer list-none text-base font-semibold text-foreground">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
