import logoIcon from "@/assets/brand/logo-icon.png";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "hero" | "soft";
  showWatermark?: boolean;
  className?: string;
}

/**
 * Decorative layered background:
 * - Warm radial gradient orbs (sage + gold)
 * - Subtle SVG grain to break the flat off-white
 * - Optional soft watermark of the brand tooth icon
 */
export function DecorBackground({
  variant = "hero",
  showWatermark = false,
  className,
}: Props) {
  return (
    <div
      className={cn("absolute inset-0 -z-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {/* Soft grain overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="decor-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#decor-noise)" />
      </svg>

      {/* Glow orbs */}
      {variant === "hero" && (
        <>
          <div
            className="absolute -top-32 -right-32 h-[640px] w-[640px] rounded-full blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, hsl(131 18% 78% / 0.55), transparent 65%)",
            }}
          />
          <div
            className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(circle, hsl(38 60% 80% / 0.45), transparent 65%)",
            }}
          />
          <div
            className="absolute -bottom-40 right-1/4 h-[480px] w-[480px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle, hsl(137 12% 60% / 0.35), transparent 70%)",
            }}
          />
        </>
      )}

      {variant === "soft" && (
        <>
          <div
            className="absolute -top-20 left-1/3 h-[420px] w-[420px] rounded-full blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(circle, hsl(131 18% 82% / 0.4), transparent 65%)",
            }}
          />
          <div
            className="absolute -bottom-24 -right-20 h-[420px] w-[420px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle, hsl(38 50% 85% / 0.4), transparent 65%)",
            }}
          />
        </>
      )}

      {/* Brand tooth watermark */}
      {showWatermark && (
        <img
          src={logoIcon}
          alt=""
          aria-hidden="true"
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-[760px] max-w-none opacity-[0.045] select-none"
        />
      )}

      {/* Bottom fade to next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background/60" />
    </div>
  );
}
