import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/seo";

/** Mesma coluna de texto e de ícone em todas as perguntas, na home e nas páginas locais. */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map(item => (
        <details key={item.question} className="group">
          <summary className="grid min-h-[5.5rem] cursor-pointer list-none grid-cols-[minmax(0,1fr)_2rem] items-center gap-4 py-5 text-left text-base font-medium leading-relaxed text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-20 sm:text-lg">
            <span className="min-w-0">{item.question}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-primary-soft transition-transform duration-200 group-open:rotate-45">
              <Plus className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="pb-6 pr-12 text-[0.95rem] leading-relaxed text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
