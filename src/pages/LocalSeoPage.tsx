import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import { FaqList } from "@/components/FaqList";
import { Header } from "@/components/Header";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { getLocalPageByPath, LocalPage } from "@/data/localPages";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { ADDRESS_DISPLAY, GOOGLE_MAPS_URL } from "@/lib/contact";

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
    breadcrumbSchema([
      { name: "Início", path: "/" },
      { name: page.h1, path: page.path },
    ]),
    faqSchema(page.faq),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title={page.title} description={page.description} path={page.path} jsonLd={schemas} />
      <Header />

      <main id="conteudo">
        <section className="bg-background pt-28 md:pt-36">
          <div className="container-wide pb-16 md:pb-20">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                <Home className="h-4 w-4" aria-hidden="true" />
                Início
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-foreground">{page.eyebrow}</span>
            </nav>

            <div className="layout-grid lg:items-start">
              <div className="min-w-0 lg:col-span-8">
                <p className="eyebrow">{page.eyebrow}</p>
                <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.05] text-foreground md:text-[3.4rem] text-balance">
                  {page.h1}
                </h1>
                <p className="lead mt-6 max-w-3xl">{page.intro}</p>
              </div>

              <aside className="min-w-0 rounded-2xl bg-navy p-6 text-white sm:p-8 lg:col-span-4">
                <h2 className="font-serif text-2xl leading-tight">Atendimento local</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Ijuí/RS e região, com agendamento pelo WhatsApp e avaliação profissional individualizada.
                </p>
                <address className="mt-4 text-sm not-italic leading-relaxed">
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white/75">
                    {ADDRESS_DISPLAY}
                  </a>
                </address>
                <WhatsAppButton message={page.whatsappMessage} size="lg" variant="light" className="mt-6 w-full">
                  Agendar avaliação
                </WhatsAppButton>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-background pb-16 md:pb-24">
          <div className="container-wide">
            <div className="layout-grid border-t border-border pt-14">
              <article className="space-y-12 lg:col-span-8">
                {page.sections.map((section) => (
                  <section key={section.title} className="scroll-mt-28">
                    <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">{section.title}</h2>
                    <div className="mt-5 max-w-3xl space-y-4 text-base leading-[1.75] text-muted-foreground md:text-lg">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </article>

              <aside className="min-w-0 lg:col-span-4">
                <div className="sticky top-28 space-y-6">
                  <div className="rounded-2xl bg-ivory p-6 sm:p-8">
                    <h2 className="font-serif text-2xl leading-tight text-foreground">Páginas relacionadas</h2>
                    <ul className="mt-4 divide-y divide-foreground/10">
                      {relatedPages.map((relatedPage) => (
                        <li key={relatedPage.path}>
                          <Link
                            to={relatedPage.path}
                            className="group flex items-center justify-between gap-4 py-3 text-sm font-semibold text-foreground hover:text-primary-soft"
                          >
                            <span>{relatedAnchorByPath[relatedPage.path]}</span>
                            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link to="/" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary-soft hover:underline">
                      Voltar para a página inicial <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-border p-6 sm:p-8">
                    <h2 className="font-serif text-2xl leading-tight text-foreground">Avaliação ortodôntica</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Envie uma mensagem para conversar sobre sintomas, expectativas e possibilidades antes de iniciar o tratamento.
                    </p>
                    <WhatsAppButton message={page.whatsappMessage} className="mt-5 w-full">
                      Falar pelo WhatsApp
                    </WhatsAppButton>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="perguntas-frequentes" className="scroll-mt-24 bg-card py-16 md:py-24">
          <div className="container-wide layout-grid">
            <h2 className="section-subtitle lg:col-span-4">
              Perguntas comuns antes da avaliação
            </h2>
            <div className="min-w-0 lg:col-span-8">
              <FaqList items={page.faq} />
            </div>
          </div>
        </section>

        <section className="bg-navy py-16 text-white md:py-20">
          <div className="container-wide layout-grid lg:items-center">
            <div className="min-w-0 lg:col-span-8">
              <h2 className="font-serif text-3xl leading-tight text-balance md:text-5xl">Agende uma avaliação em Ijuí/RS</h2>
              <p className="mt-4 max-w-2xl text-white/75">
                O atendimento começa por uma conversa clara sobre o seu caso e sobre as possibilidades mais adequadas.
              </p>
            </div>
            <div className="min-w-0 lg:col-span-4">
              <WhatsAppButton message={page.whatsappMessage} size="lg" variant="light" className="w-full sm:w-auto lg:w-full">
                Agendar pelo WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
