import { Fragment } from "react";
import { Glyph } from "@/components/Glyph";
import { cn } from "@/lib/utils";

const ITEMS = ["Workshops", "Conference", "Hackathon", "Private Network", "17 and 18 Oct 2026", "Chandigarh"];

function Run() {
  return (
    <div className="flex items-center gap-10 px-5">
      {ITEMS.map((item) => (
        <Fragment key={item}>
          <span>{item}</span>
          <Glyph name="asterisk" className="h-3 opacity-60 invert" />
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Tilted dark ticker strip. The list is rendered twice and the track slides
 * half its width, so the loop is seamless. Callers position it; on its own it
 * is a full-width in-flow strip.
 */
export function Ticker({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full -rotate-2 scale-110 overflow-hidden border-y border-white/10 bg-neutral-dark py-2.5 shadow-2xl",
        className
      )}
    >
      <div className="ticker-track flex w-max text-xs font-bold uppercase tracking-[0.3em] text-white/60 md:text-sm">
        <Run />
        <div aria-hidden="true">
          <Run />
        </div>
      </div>
    </div>
  );
}

/**
 * Seam between a dark section and the light one after it.
 *
 * Apply SEAM to the dark section and render <SeamTicker /> as its last child.
 * The section's bottom edge is cut at the strip's angle (3.5vw over the full
 * width is about 2 degrees), so the boundary runs parallel to the ticker and
 * hides beneath it. Keeping the strip inside the section means it sits on
 * that section's own grid, with no second grid instance to misalign at the
 * join. The cut-away corner reveals the page grid for the light section.
 */
export const SEAM = "overflow-hidden pb-28 [clip-path:polygon(0_0,100%_0,100%_calc(100%-3.5vw),0_100%)]";

export function SeamTicker() {
  return <Ticker className="absolute bottom-8 left-0" />;
}
