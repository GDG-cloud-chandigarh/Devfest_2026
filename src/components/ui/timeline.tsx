import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  title: string;
  /** Shown above the title: a date, "Open now", a session time. */
  label?: string;
  description?: string;
  icon: ReactNode;
  /** Marker colour, e.g. "bg-google-blue". */
  accent: string;
  content?: ReactNode;
}

/** A vertical timeline: a marker per item, joined by a line. */
export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol className={cn("relative flex flex-col gap-10", className)}>
      {items.map((item, index) => (
        <li key={item.id} className="relative flex gap-5">
          {index < items.length - 1 && (
            <span aria-hidden="true" className="absolute left-5 top-12 h-[calc(100%-1rem)] w-px bg-neutral-dark/15" />
          )}

          <span
            aria-hidden="true"
            className={cn(
              "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-neutral-dark text-neutral-dark [&_svg]:h-4 [&_svg]:w-4",
              item.accent
            )}
          >
            {item.icon}
          </span>

          <div className="min-w-0 flex-1 pt-1">
            {item.label && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-dark/70">{item.label}</p>
            )}
            <h3 className="mt-1 font-heading text-xl font-bold leading-tight text-neutral-dark">{item.title}</h3>
            {item.description && <p className="mt-2 leading-relaxed text-neutral-dark/80">{item.description}</p>}
            {item.content && <div className="mt-4">{item.content}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
