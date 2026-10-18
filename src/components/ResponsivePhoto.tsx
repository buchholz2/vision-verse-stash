import type { ImgHTMLAttributes } from "react";

// Variantes geradas por scripts/generate-photo-variants.mjs a partir dos JPGs originais em assets/photos/real.
const variants = import.meta.glob<string>("/src/assets/photos/real/responsive/*.{avif,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const WIDTHS = [480, 800, 1200] as const;

const srcSet = (name: string, format: "avif" | "webp") =>
  WIDTHS.map((width) => `${variants[`/src/assets/photos/real/responsive/${name}-${width}.${format}`]} ${width}w`).join(", ");

type ResponsivePhotoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes"> & {
  /** Nome base do arquivo em assets/photos/real (sem extensão). */
  name: string;
  sizes: string;
  alt: string;
};

/** AVIF/WebP com srcset; mesmas dimensões intrínsecas (2:3) dos JPGs originais, o recorte segue por CSS. */
export function ResponsivePhoto({ name, sizes, alt, width = 1600, height = 2400, ...rest }: ResponsivePhotoProps) {
  const fallback = variants[`/src/assets/photos/real/responsive/${name}-800.webp`];
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(name, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, "webp")} sizes={sizes} />
      <img src={fallback} alt={alt} width={width} height={height} decoding="async" {...rest} />
    </picture>
  );
}
