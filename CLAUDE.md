# Site Dr. Gabriel — instruções para Claude Code

## Uso econômico dos modelos de IA

Escolha o menor modelo capaz de concluir cada tarefa com qualidade. Esta política trata dos modelos de IA; os requisitos do modelo dentário 3D continuam no briefing de redesign.

A sessão principal usa `sonnet`, configurado em `.claude/settings.json`. Para variar o modelo por tarefa, use os agentes locais de `.claude/agents/`; não afirme ter trocado o modelo da sessão apenas por seguir este documento.

| Complexidade | Modelo | Como executar |
| --- | --- | --- |
| Simples, mecânica e bem delimitada | `haiku` | Delegar ao agente `tarefas-simples`: localizar arquivos, resumir trechos, editar texto, ajustar classes e espaçamentos ou executar uma verificação definida. |
| Implementação normal | `sonnet` | Resolver na sessão principal: componentes React, responsividade, integração de assets, animações usuais e correções com causa conhecida. |
| Raciocínio difícil ou problema persistente | `opus` | Consultar o agente `especialista-complexo`: arquitetura, deformação da arcada, sincronização do alinhador, transparência WebGL, desempenho difícil e diagnóstico de falhas sem causa clara. |

### Regras para controlar consumo

- Classifique a tarefa antes de executá-la. Use os perfis configurados e não passe um override de modelo que contradiga o perfil escolhido.
- Agrupe pequenas tarefas relacionadas em uma única delegação ao Haiku. Para uma ação trivial já resolvida no contexto da sessão, executar diretamente pode custar menos do que abrir outro agente; não delegue apenas por formalidade.
- Dê ao agente somente o objetivo, os arquivos relevantes, as restrições e o critério de aceite. Solicite uma resposta curta com alterações, verificações e impedimentos. Não envie todo o repositório ou histórico indiscriminadamente.
- Se Haiku encontrar uma dificuldade que exceda seu escopo ou falhar na validação, continue em Sonnet. Se Sonnet continuar bloqueado após duas tentativas fundamentadas, ou se a complexidade já justificar, consulte Opus com as evidências reunidas. Não repita tentativas idênticas para cumprir uma contagem.
- Use Opus para uma análise delimitada ou para definir a solução difícil. Depois, implemente e valide com Sonnet; use Haiku para verificações mecânicas quando compensar. Não envie toda a execução rotineira ao Opus.
- Não abra agentes em paralelo por padrão nem duplique a mesma investigação em modelos diferentes. Delegue sequencialmente, com escopo fechado, para limitar consumo e conflitos de edição.
- Os subagentes devem concluir o escopo recebido ou devolver um impedimento claro; não devem iniciar uma árvore de novas delegações.
- Leia trechos relevantes antes de arquivos inteiros. Execute verificações proporcionais à mudança e não repita build, lint ou auditoria sem mudanças ou novas evidências que justifiquem.
- Aplique a política sem solicitar confirmação para cada escolha de modelo dentro do trabalho autorizado. Restrições reais da conta, ferramentas ou permissões continuam valendo.
- Se um modelo não estiver disponível, não entre em repetição de chamadas nem aceite silenciosamente um substituto mais caro para uma tarefa simples. Informe a limitação e use o menor modelo disponível adequado. Não altere assinatura, créditos, conta ou configuração global.
- Os aliases `haiku`, `sonnet` e `opus` seguem a resolução do Claude Code/provedor e não fixam preços. Confira o modelo efetivo nas informações da execução quando disponíveis. Não invente economia, custo ou uso de um modelo que não pôde verificar.

## Contexto e briefing

Este projeto usa React 18, TypeScript, Vite, Tailwind e Framer Motion. Inspecione `package.json` antes de escolher dependências novas.

O briefing ativo é `../PROMPT-CLAUDE-V3-ASSETS-E-LAYOUT.md`. A direção visual está em `../REFERENCIAS-DIRECAO-V3.md` e os assets baixados e inspecionados em `../assets-source/README.md`. Preserve as melhorias úteis da V2; os briefings e a análise anteriores são histórico e contexto. A existência dos briefings não autoriza iniciar o redesign durante uma solicitação limitada à análise ou configuração.

O usuário rejeitou o dente decorativo do hero: ele já foi removido de `Hero.tsx` e não deve ser reintroduzido. A direção atual é conteúdo centralizado, largura controlada e arcada em um painel contido, sem ocupar a viewport inteira. O Codex refinou essa composição em 17/10/2026: retrato integrado ao hero, conteúdo mais compacto e botões para explorar as quatro etapas da arcada. Preserve essas melhorias ao continuar.

A skill oficial de direção de arte está instalada localmente em `.claude/skills/frontend-design/SKILL.md`. Leia-a no upgrade visual e aplique-a respeitando o briefing e os dados reais do profissional. Não trate a skill como uma fonte de modelos dentários prontos.

## Vídeos de referência: proibição de uso no site

Os dois vídeos já usados no site, `/videos/reels-atendimento-01.mp4` e `/videos/reels-atendimento-02.mp4`, devem ser preservados e reproduzir automaticamente, sem clique inicial, com `autoPlay`, `muted`, `loop` e `playsInline`. Mantenha controles para o visitante pausar ou retomar. Essa autorização se aplica aos vídeos de atendimento existentes, não aos cinco vídeos de referência abaixo. Preserve o autoplay no próximo redesign.

Os cinco vídeos de WhatsApp enviados pelo usuário em 13 e 16 de outubro de 2026, listados no briefing, são exclusivamente referências para entender a ideia. O usuário rejeitou sua qualidade visual. Não os incorpore ao site, mesmo renomeados, recortados, tratados ou comprimidos. Não use frames, screenshots, posters, texturas ou outros derivados, incluindo as prévias em `../references-preview/`.

Crie uma nova experiência visual com cena e animação próprias ou assets adequados com licença compatível. A versão leve para celular deve usar renders da nova cena. No redesign, audite `public/videos/` e `VideoExperience.tsx` para retirar da exibição qualquer cópia ou derivado desses vídeos. Preserve os arquivos originais de referência; esta restrição não exige excluir os vídeos do usuário.

## Interação da arcada

A direção mudou de novo em 17/10/2026, a pedido do usuário (substitui a versão anterior de reprodução automática sem scroll): a seção `AlignerExperience.tsx` é uma **cena fixada dirigida pelo scroll**. Uma trilha alta (500/540svh) mantém um palco `sticky` de tela cheia com a arcada grande no centro (inferior com alinhador e superior aberta como modelo de estudo, que fecha no final). Cada etapa (`BEATS` em `src/lib/dental/timeline.ts`) mostra um balão (`AlignerCallouts.tsx`) ligado por uma linha ao dente real projetado na tela (`anchors` de `AlignerScene.tsx`); ao rolar, o balão some e entra o próximo. O scroll é nativo e reversível, sem reprodução automática nem timeline manual. A câmera segue `cameraPose` e a abertura da mandíbula segue `jawAngle`. Com movimento reduzido ou sem 3D, `AlignerFallback.tsx` mostra uma lista com os quatro quadros estáticos. A arcada superior é apenas contexto estático (sem alinhador). Pedido de 17/10/2026: a seção é toda clara (sem fundo azul nem rampas de transição), a mandíbula superior abre e nunca é cortada (o enquadramento interpola entre a esfera fechada e a aberta) e o texto não pode se repetir: legenda só uma vez e CTAs de agendamento apenas no hero, no contato final e na barra flutuante.

## Modelo 3D atual (17/10/2026)

O modelo vem do OBJ "ya" (32 dentes separados com raiz e duas gengivas), fora do repositório em `../assets-source/ya-tooth-model/ya.obj`; **uso confirmado pelo responsável em 18/10/2026, sem exigência de crédito** (ver `public/models/ATTRIBUTION.md`). `scripts/build-dental-model-ya.mjs` (`npm run model:build`) nivela o plano oclusal, espelha o lado esquerdo no direito, cria um osso por dente inferior, decima a gengiva inferior e achata a superior (ambas estáticas), gera o alinhador por traçado de raios nas coroas e monta a arcada superior articulada. A mordida é a do modelo, com a arcada superior elevada 1,15 mm; meça com `npx vite-node scripts/collision-check.ts` (`P=0,0.5,1` colisão entre vizinhos; `OCC="jaw,dy,dz"` mordida) e `npx vite-node scripts/bite-report.ts` (linha média, overjet, overbite). Meta: nenhuma penetração relevante entre vizinhos (≤ 0,02 cm) nem entre as arcadas. O material do esmalte não usa textura: o gradiente colo → borda vem do atributo `_edge`. Não volte ao modelo FBX antigo nem à gengiva procedural. Ao alterar a cena, regenere também os quatro WebPs com `/dev/aligner?p=0.02&w=1100&h=825&z=1.05` (progressos `0.02`, `0.3`, `0.55` e `1`).

## Dados reais e validação

Endereço de atendimento confirmado pelo usuário em 16/10/2026: **Rua Benjamin Constant, 109, Ijuí/RS**. Está centralizado em `src/lib/contact.ts` e deve permanecer consistente com os dados estruturados do site. Não invente CEP, complemento ou coordenadas. O link do site abre uma busca pelo endereço no Google Maps; não é um pin oficial confirmado.

Preserve os dados reais de `src/lib/contact.ts`, as fotos e a identidade do profissional. Mantenha as rotas e a coerência entre SEO e `scripts/seo-routes.mjs`. Regras de SEO (17–18/10/2026): FAQ só em `src/data/faqs.json` (mesma fonte da página e do JSON-LD); o JSON-LD compartilhado (Dentist, Person, WebSite) vive em `seo-routes.mjs` e é injetado no build junto com WebPage, Service, BreadcrumbList e FAQPage; títulos até 65 e descrições até 160 caracteres, únicos por página; `npm run seo:audit` valida tudo isso, mais hreflang, og:image, links internos, 404.html e sitemap (gerado no build, com lastmod). O nginx devolve 404 de verdade (`/404.html`, noindex). Não invente resultados, credenciais ou depoimentos.

Para mudanças de implementação, valide o comportamento afetado. Antes de entregar o redesign, execute `npm run build` e `npm run seo:audit`; faça a validação visual descrita no briefing. Para edições apenas de documentação/configuração, valide a configuração sem rodar testes do site desnecessariamente.

Não publique nem execute scripts de deploy sem uma solicitação explícita.

## Como esta configuração funciona

Inicie Claude Code nesta pasta (`vision-verse-stash`) para carregar `.claude/settings.json` e os agentes locais. Em uma sessão já aberta, confira os perfis em `/agents`; reabra a sessão nesta pasta caso não apareçam. Uma seleção explícita de modelo, variáveis de ambiente, configuração local ou políticas da organização podem prevalecer sobre o padrão do projeto.

O roteamento por complexidade é uma instrução de trabalho para o Claude usar os agentes, não um classificador automático imposto pela plataforma. Não execute `claude -p` recursivamente nem tente mudar a sessão principal via shell. Se estiver usando apenas o chat do Claude sem acesso ao projeto e sem agentes, a seleção fica no seletor de modelos do aplicativo.

Documentação oficial: https://code.claude.com/docs/en/model-config e https://code.claude.com/docs/en/sub-agents.
