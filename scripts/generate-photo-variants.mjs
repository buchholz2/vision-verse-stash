// Gera as variantes responsivas (AVIF e WebP) das fotos reais a partir dos JPGs originais em
// src/assets/photos/real, sem alterar proporção nem recorte (o crop continua sendo feito por CSS, object-fit/object-position).
// Requer as ferramentas de linha de comando `magick` (ImageMagick), `cwebp` e `avifenc`.
// Uso: node scripts/generate-photo-variants.mjs [nome-base ...]   (sem argumentos, processa todas as fotos usadas no site)
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "src/assets/photos/real");
const outDir = join(srcDir, "responsive");

const WIDTHS = [480, 800, 1200];
const DEFAULT_PHOTOS = ["gabriel-hero-clinica", "gabriel-sobre-sofa", "gabriel-tratamentos-clinica"];
const photos = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_PHOTOS;

const run = (cmd, args) => execFileSync(cmd, args, { stdio: ["ignore", "ignore", "inherit"] });
const kb = (file) => (statSync(file).size / 1024).toFixed(1);

mkdirSync(outDir, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "photo-variants-"));

try {
  for (const name of photos) {
    const source = join(srcDir, `${name}.jpg`);
    for (const width of WIDTHS) {
      const png = join(tmp, `${name}-${width}.png`);
      run("magick", [source, "-auto-orient", "-filter", "Lanczos", "-resize", `${width}x`, "-strip", png]);

      const webp = join(outDir, `${name}-${width}.webp`);
      run("cwebp", ["-quiet", "-q", "78", "-m", "6", "-sharp_yuv", png, "-o", webp]);

      const avif = join(outDir, `${name}-${width}.avif`);
      run("avifenc", ["-q", "58", "--speed", "4", "--jobs", "all", "-y", "420", png, avif]);

      console.log(`${name}-${width}: webp ${kb(webp)} KB, avif ${kb(avif)} KB`);
    }
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
