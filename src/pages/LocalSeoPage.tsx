import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Home, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { getLocalPageByPath, LocalPage } from "@/data/localPages";
import { breadcrumbSchema, dentistSchema, faqSchema, personSchema, websiteSchema } from "@/lib/seo";

type LocalSeoPageProps = {
  page: LocalPage;
};

const relatedAnchorByPath: Record<string, string> = {
  "/ortodontista-em-ijui": "ortodontista em Ijuí",
  "/invisalign-em-ijui": "Invisalign em Ijuí",
  "/aparelho-transparente-em-ijui": "aparelho transparente em Ijuí",
  "/dentista-em-ijui": "dentista em Ijuí",
};

export function LocalSeoPage({ page }: LocalSeoPageProps) {
  const relatedPages = page.relatedPaths
    .map((path) => getLocalPageByPath(path))
    .filter((item): item is LocalPage => Boolean(item));

  const schemas = [
    dentistSchema,
    personSchema,
    websiteSchema,
    breadcrumbSchema([
      { name: "Início", path: "/" },
      { name: page.h1, path: page.path },
    ]),
    faqSchema(page.faq),
  ];

  return (
    <main className="min-h-screen bg-background">
      <SEO title={page.title} description={page.description} path={page.path} jsonLd={schemas} />
      <Header />

      <section className="relative overflow-hidden pt-32 md:pt-40" style={{ background: "var(--gradient-hero)" }}>
        <div className="pointer-events-none absolute inset-0 dot-pattern opacity-40" aria-hidden="true" />
        <div className="container-wide relative pb-20 md:pb-24">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-primary">
              <Home className="h-4 w-4" />
              Início
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{page.eyebrow}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{page.eyebrow}</p>
              <h1 className="mt-5 max-w-5xl font-serif text-4xl leading-[1.05] text-foreground md:text-6xl text-balance">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground text-pretty">
                {page.intro}
              </p>
            </div>

            <aside className="rounded-[1.75rem] border border-border/60 bg-card/85 p-6 shadow-card lg:col-span-4">
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/8 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xl leading-tight text-foreground">Atendimento local</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Ijuí/RS e região, com agendamento pelo WhatsApp e avaliação profissional individualizada.
                  </p>
                  <p className="mt-3 rounded-xl border border-dashed border-border bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
                    TODO: Adicionar endereço completo do consultório aqui.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <WhatsAppButton message={page.whatsappMessage} size="lg" className="w-full">
                  Agendar avaliação
                </WhatsAppButton>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-12">
          <article className="space-y-12 lg:col-span-8">
            {page.sections.map((section) => (
              <section key={section.title} className="scroll-mt-28">
                <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">{section.title}</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-[1.75rem] border border-border/60 bg-card p-6 shadow-soft">
                <h2 className="text-2xl leading-tight text-foreground">Páginas relacionadas</h2>
                <div className="mt-5 space-y-3">
                  {relatedPages.map((relatedPage) => (
                    <Link
                      key={relatedPage.path}
                      to={relatedPage.path}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-secondary/45 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/25 hover:bg-primary/5 hover:text-primary"
                    >
                      <span>{relatedAnchorByPath[relatedPage.path]}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
                <Link
                  to="/"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Voltar para a página inicial <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6">
                <h2 className="text-2xl leading-tight text-foreground">Avaliação ortodôntica</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Envie uma mensagem para conversar sobre sintomas, expectativas e possibilidades antes de iniciar o tratamento.
                </p>
                <div className="mt-5">
                  <WhatsAppButton message={page.whatsappMessage} className="w-full">
                    Falar pelo WhatsApp
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-secondary/70 py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Dúvidas frequentes</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground md:text-5xl">
              Perguntas comuns antes da avaliação
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {page.faq.map((item) => (
              <details key={item.question} className="group rounded-[1.5rem] border border-border/60 bg-card p-5 shadow-soft">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-foreground">
                  {item.question}
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-primary-foreground md:py-20" style={{ background: "var(--gradient-cta)" }}>
        <div className="container-wide flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Agendamento</p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">
              Agende uma avaliação em Ijuí/RS
            </h2>
            <p className="mt-4 max-w-2xl text-primary-foreground/70">
              O atendimento começa por uma conversa clara sobre o seu caso e sobre as possibilidades mais adequadas.
            </p>
          </div>
          <WhatsAppButton
            message={page.whatsappMessage}
            size="lg"
            variant="outline"
            className="border-white/25 bg-white/10 text-primary-foreground hover:bg-white/18 hover:border-white/35"
          >
            Agendar pelo WhatsApp
          </WhatsAppButton>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
