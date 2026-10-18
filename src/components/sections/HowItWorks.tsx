const steps = [
  { title: "Primeiro contato", desc: "Você envia uma mensagem pelo WhatsApp e conta o que gostaria de resolver." },
  { title: "Avaliação clínica", desc: "Consulta para entender o seu caso, o histórico e os objetivos do tratamento." },
  { title: "Plano individual", desc: "O caminho é definido a partir do diagnóstico: ortodontia, alinhadores, estética ou prevenção." },
  { title: "Acompanhamento", desc: "Cada etapa é acompanhada de perto, com explicação clara do que vem a seguir." },
];

/** Sequência real de quatro passos: linha do tempo horizontal no desktop, vertical no celular. */
export function HowItWorks() {
  return (
    <section id="etapas" className="section-y scroll-mt-20 bg-background">
      <div className="container-wide">
        <div className="max-w-2xl">
          <h2 className="section-title">Um caminho claro, do início ao fim.</h2>
          <p className="lead mt-5">Da primeira mensagem ao acompanhamento, você sabe o que vem a seguir.</p>
        </div>

        <ol className="relative mt-12 grid gap-8 lg:grid-cols-4 lg:gap-8 before:absolute before:left-[0.95rem] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border lg:before:left-0 lg:before:top-[0.95rem] lg:before:h-px lg:before:w-full">
          {steps.map((step, index) => (
            <li key={step.title} className="relative pl-12 lg:pl-0 lg:pt-12">
              <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="font-serif text-2xl leading-snug text-foreground lg:min-h-[4.125rem] xl:min-h-0">{step.title}</h3>
              <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
