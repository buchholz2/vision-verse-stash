import { Link } from "react-router-dom";
import { FaqList } from "@/components/FaqList";
import { homeFaqs } from "@/data/localPages";

const serviceLinks = [
  { path: "/ortodontista-em-ijui", label: "Ortodontista em Ijuí" },
  { path: "/invisalign-em-ijui", label: "Invisalign em Ijuí" },
  { path: "/aparelho-transparente-em-ijui", label: "Aparelho transparente em Ijuí" },
  { path: "/dentista-em-ijui", label: "Dentista em Ijuí" },
];

export function LocalSeoSection() {
  return (
    <section id="seo-local" className="section-y scroll-mt-20 bg-card">
      <div className="container-wide layout-grid lg:items-start">
        <div className="min-w-0 lg:col-span-5">
          <h2 className="section-title">Dúvidas frequentes.</h2>
          <p className="lead mt-6">Atendimento em Ijuí e no Noroeste do Rio Grande do Sul.</p>
          <nav aria-label="Atendimento em Ijuí" className="mt-8">
            <h3 className="text-sm font-semibold text-accent-text">Atendimento em Ijuí</h3>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {serviceLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="flex min-h-12 items-center justify-between gap-3 py-3 text-[0.95rem] font-medium text-foreground transition-colors hover:text-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {item.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div id="perguntas-frequentes" className="min-w-0 scroll-mt-24 lg:col-span-7">
          <FaqList items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
