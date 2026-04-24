# Site institucional do Gabriel — PT-BR

## Visão geral
Você enviou um pacote completo (`gabriel_site_assets_lovable.zip`) com prompts, identidade de marca, conteúdo, mídia, referências 3D e notas. O plano abaixo trata esse pacote como **fonte da verdade**: nada de cores, copy, nomes de serviço ou fotos inventadas — tudo virá do que estiver dentro do zip.

## Etapa 1 — Extrair e inventariar o pacote
Antes de escrever qualquer linha de UI, vou:
1. Descompactar `gabriel_site_assets_lovable.zip` em uma pasta de trabalho.
2. Ler **integralmente** o `README.md` e tudo dentro de:
   - `00_prompts/` — instruções de como o site deve ser
   - `01_brand/` — logo, paleta, tipografia, manual de marca
   - `02_content/` — textos, copy, bio, serviços, depoimentos
   - `03_media/` — fotos, vídeos, ícones
   - `04_3d_references/` — referências visuais / estilo 3D
   - `05_notes/` — notas adicionais do Gabriel
3. Te mandar um **resumo curto do que encontrei** (estrutura de páginas pedida, tom de voz, paleta, principais peças de mídia) antes de começar a construir, para confirmar que entendi certo.

> Observação: estou em modo de planejamento agora, então não consigo abrir o zip ainda. Assim que você aprovar este plano, essa extração e leitura é a primeira coisa que faço.

## Etapa 2 — Sistema de design a partir da marca
Com base no que estiver em `01_brand/`:
- Definir paleta completa em `index.css` como tokens HSL (primária, secundária, neutros, fundo, texto, destaque).
- Configurar tipografia (importar fontes do pacote ou Google Fonts equivalentes).
- Ajustar `tailwind.config.ts` com tokens semânticos (cores, raios, sombras, espaçamentos próprios da marca).
- Aplicar logo do pacote como SVG/PNG otimizado em `src/assets/`.
- Definir estilo geral: institucional, alinhado às referências 3D do `04_3d_references/` (provavelmente um visual mais sofisticado / com profundidade).

## Etapa 3 — Estrutura do site
Estrutura padrão para site institucional em PT-BR (vou ajustar conforme os prompts pedirem outra coisa):
- **Header** com logo, navegação âncora e CTA principal
- **Hero** com headline, subheadline, CTA e visual principal (foto/vídeo/3D do pacote)
- **Sobre / Quem é o Gabriel** — bio e proposta de valor
- **Serviços** — cards com cada serviço descrito no conteúdo
- **Diferenciais / Como trabalho** — seção de método ou pilares
- **Galeria / Cases** — usando fotos e vídeos de `03_media/`
- **Depoimentos** (se existirem no conteúdo)
- **Contato** — formulário + redes sociais + e-mail/WhatsApp
- **Footer** com logo, links, redes e copyright

Todas as seções na home (single page com âncoras), responsivo mobile-first, com microanimações sutis.

## Etapa 4 — Mídia
- Copiar fotos e logos para `src/assets/` (importadas como módulos ES6 para otimização do Vite).
- Vídeos curtos vão para `public/` e entram como `<video>` com `autoplay muted loop playsinline` quando forem de fundo/ambientação.
- Garantir `alt` descritivo em todas as imagens, lazy-loading onde fizer sentido.

## Etapa 5 — Contato
- Formulário com nome, e-mail, telefone/WhatsApp, mensagem.
- Para o envio funcionar de verdade (salvar lead + enviar e-mail), vou ativar **Lovable Cloud** e criar:
  - tabela `contact_messages` com RLS
  - edge function opcional para notificação por e-mail
- Se você preferir só um `mailto:` ou link direto pro WhatsApp por enquanto, é só me dizer depois da extração.

## Etapa 6 — Polimento
- SEO básico: `<title>`, meta description, Open Graph, favicon a partir do logo do pacote.
- Acessibilidade: contraste, foco visível, navegação por teclado, semântica correta.
- Performance: imagens otimizadas, sem libs pesadas desnecessárias.
- QA visual no preview em mobile e desktop.

## O que eu vou confirmar com você depois da extração
1. Resumo do que os prompts pedem (caso difiram do escopo institucional padrão).
2. Paleta e tipografia que extraí da marca.
3. Lista de serviços e seções que vou montar.
4. Se o formulário de contato deve usar Lovable Cloud (banco + e-mail) ou só WhatsApp/e-mail direto.

Posso começar?