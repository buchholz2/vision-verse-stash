import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ADDRESS_DISPLAY, CRO, PHONE_DISPLAY } from "@/lib/contact";
import { breadcrumbSchema } from "@/lib/seo";

const PRIVACY_PATH = "/politica-de-privacidade";
const PRIVACY_TITLE = "Política de Privacidade | Dr. Gabriel Rockenbach";
const PRIVACY_DESCRIPTION =
  "Como este site trata dados pessoais: o que é coletado, links externos, seus direitos pela LGPD e como falar com o consultório.";
const UPDATED_AT = "17 de outubro de 2026";

const sections: { title: string; body: string[] }[] = [
  {
    title: "Quem é o responsável",
    body: [
      `O responsável por este site é o Dr. Gabriel Paulo Rockenbach, cirurgião-dentista (${CRO}), com consultório em ${ADDRESS_DISPLAY}.`,
      `Para qualquer assunto sobre privacidade, fale pelo WhatsApp ${PHONE_DISPLAY}.`,
    ],
  },
  {
    title: "O que este site coleta",
    body: [
      "O site não tem formulários, não cria contas e não grava cookies de rastreamento ou de publicidade.",
      "Como acontece em qualquer site, o provedor de hospedagem pode registrar dados técnicos de acesso, como endereço IP, navegador e horário, para manter a segurança e o funcionamento do serviço.",
      "No momento, o site não usa ferramentas de análise de audiência com cookies. Se isso mudar, esta página será atualizada e, quando necessário, você será consultado antes.",
    ],
  },
  {
    title: "Contato por WhatsApp, telefone e Instagram",
    body: [
      "Os botões de contato abrem o WhatsApp, o aplicativo de telefone ou o Instagram. A partir desse momento, você está usando o serviço de terceiros, que segue as próprias regras de privacidade.",
      "O que você enviar (nome, telefone, dúvidas e fotos, se quiser) é usado para responder, orientar e agendar a avaliação. Informações de saúde recebidas no atendimento são protegidas pelo sigilo profissional.",
      "Os dados do atendimento são guardados pelo tempo necessário para o cuidado com o paciente e para cumprir obrigações legais, inclusive as do prontuário odontológico.",
    ],
  },
  {
    title: "Mapa e links externos",
    body: [
      "O link “Como chegar” abre o Google Maps em outro endereço. O site não carrega mapas nem vídeos de terceiros dentro das páginas.",
    ],
  },
  {
    title: "Seus direitos",
    body: [
      "A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) garante a você, entre outros direitos: confirmar se há tratamento de dados, acessá-los, corrigi-los, pedir a eliminação quando cabível, obter informações sobre compartilhamento e revogar um consentimento.",
      `Para exercer esses direitos, envie uma mensagem pelo WhatsApp ${PHONE_DISPLAY}.`,
    ],
  },
  {
    title: "Marcas e créditos",
    body: [
      "Invisalign® é marca registrada da Align Technology, Inc. As demais marcas citadas pertencem aos seus titulares.",
      "A animação dos alinhadores usa um modelo 3D adaptado para este site. É uma ilustração: o planejamento e os resultados variam conforme cada caso.",
    ],
  },
  {
    title: "Atualizações",
    body: [`Esta política foi atualizada em ${UPDATED_AT}. Mudanças futuras serão publicadas nesta página.`],
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={PRIVACY_TITLE}
        description={PRIVACY_DESCRIPTION}
        path={PRIVACY_PATH}
        jsonLd={[
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Política de Privacidade", path: PRIVACY_PATH },
          ]),
        ]}
      />
      <Header />
      <main id="conteudo" className="container-wide pb-20 pt-28 md:pb-28 md:pt-36">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            <Home className="h-4 w-4" aria-hidden="true" />
            Início
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">Política de Privacidade</span>
        </nav>

        <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] text-foreground md:text-5xl text-balance">
          Política de Privacidade
        </h1>
        <p className="lead mt-5">Este texto explica, em linguagem simples, como este site trata dados pessoais.</p>

        <div className="mt-12 max-w-3xl divide-y divide-border border-y border-border">
          {sections.map((section) => (
            <section key={section.title} className="py-8">
              <h2 className="font-serif text-2xl text-foreground">{section.title}</h2>
              <div className="mt-4 space-y-3 text-base leading-[1.75] text-muted-foreground">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10">
          <WhatsAppButton size="lg" message="Olá, Dr. Gabriel! Tenho uma dúvida sobre privacidade." className="w-full sm:w-auto">
            Falar sobre privacidade
          </WhatsAppButton>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default PrivacyPage;
