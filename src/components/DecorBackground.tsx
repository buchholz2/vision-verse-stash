import { cn } from "@/lib/utils";

interface Props {
  variant?: "hero" | "soft";
  className?: string;
}

export function DecorBackground({
  variant = "hero",
  className,
}: Props) {
  return (
    <div
      className={cn("absolute inset-0 -z-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {/* Soft grain overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.045] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="decor-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#decor-noise)" />
      </svg>

      <div
        className={cn(
          "absolute inset-0 opacity-[0.14]",
          variant === "hero" ? "hairline-panel" : "hairline-panel opacity-[0.09]"
        )}
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"
      />
      <div
        className="absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-border/60 to-transparent"
      />

      {/* Bottom fade to next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background/60" />
    </div>
  );
}
