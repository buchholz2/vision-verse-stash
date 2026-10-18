# Modelo 3D da arcada (`dental-arch.glb`)

## Origem e licença

- **Origem:** modelo de dentes "ya" (arquivos `ya.obj`, `ya.stl`, `ya.3mf`, cerca de 32 dentes separados com raiz e duas
  gengivas), recebido em `牙齿模型Tooth+model.zip`. O 3MF é uma reexportação do Bambu Studio de 31/07/2024 e **não traz
  título, autor nem licença** nos metadados.
- **Licença: não confirmada.** O responsável pelo site vai confirmar origem, autor e termos de uso comercial com quem enviou
  o arquivo. Se a licença exigir crédito, incluir no rodapé e em `PrivacyPage.tsx`. Se não permitir uso comercial, substituir o
  modelo (a cena aceita outro GLB com a mesma estrutura de nós, ver abaixo).
- O arquivo-fonte fica fora do repositório, em `../assets-source/ya-tooth-model/ya.obj`.

## Adaptações feitas (obra derivada)

O arquivo distribuído em `public/models/` **não é o modelo original**. É gerado por `npm run model:build`
(`scripts/build-dental-model-ya.mjs`):

1. O plano oclusal do modelo vem inclinado cerca de 8°; ele é nivelado e a escala é normalizada (cm).
2. O lado direito de cada arcada passa a ser o espelho do esquerdo (sorriso simétrico, mordida igual dos dois lados).
3. Cada dente inferior ganha um osso, com pivô no centro da coroa. Os dentes superiores formam uma malha única.
4. A gengiva inferior (163 mil faces) é decimada para 30 mil e a gengiva superior é achatada e suavizada. Ambas ficam
   **estáticas**: só os dentes se movem. A cor da gengiva é por vértice (margem mais clara perto do dente).
5. O **alinhador não existe no modelo original**: é construído por traçado de raios sobre as coroas inferiores
   (espessura de ~0,5 mm), como SkinnedMesh deformado pelos ossos dos dentes.
6. O atributo `_EDGE` (0 no colo, 1 na borda oclusal) alimenta o gradiente do esmalte no shader.
7. A mordida fechada é a do modelo original, com a arcada superior elevada em 1,15 mm. Foi verificada com
   `scripts/collision-check.ts` e `scripts/bite-report.ts` (sem penetração entre as arcadas nem entre dentes vizinhos).

## Limites

É uma representação **ilustrativa**: não é escaneamento do paciente nem simulação clínica validada. O movimento mostrado
resume uma sequência de alinhadores e não promete resultado individual.

## Estrutura efetiva do GLB

| Nó | Tipo | Descrição |
| --- | --- | --- |
| `DentalArch` | Group | Raiz sem transformação. Arcada inferior na pose alinhada. |
| `tooth_31` … `tooth_38`, `tooth_41` … `tooth_48` | Bone | Um osso por dente inferior. |
| `crown_31` … `crown_48` | Mesh | Dente inferior completo (coroa e raiz). Filho do osso correspondente. |
| `gum` | Mesh | Gengiva inferior, estática. |
| `aligner` | SkinnedMesh | Alinhador gerado, ligado aos dentes por pesos suaves ao longo do arco. |
| `upper_arch` | Group | Arcada superior estática, com pivô na dobradiça posterior (`upper_teeth` + `upper_gum`). |

Poses iniciais (desalinhadas) e atrasos por dente: `src/lib/dental/dentalModelConfig.ts`. Ritmo da narrativa:
`src/lib/dental/timeline.ts`.

## Arquivos distribuídos

| Arquivo | Tamanho |
| --- | --- |
| `dental-arch.glb` | ≈ 1,1 MiB (compressão meshopt) |

Os quadros de fallback (`src/assets/aligner/*.webp`) foram gerados da própria cena, com a rota de desenvolvimento
`/dev/aligner?p=…&z=…` (`z` afasta a câmera).

## Referências visuais (não usadas como asset)

Os vídeos e fotos de alinhadores/estojos enviados pelo cliente orientaram apenas forma, transparência e movimento.
Nenhum vídeo, quadro, miniatura ou textura deles faz parte do site.
