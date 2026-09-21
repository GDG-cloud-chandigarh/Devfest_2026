import { CSSProperties, Fragment } from "react";
import { Glyph } from "@/components/Glyph";
import { cn } from "@/lib/utils";

const ITEMS = ["Workshops", "Conference", "Hackathon", "Private Network", "18 Oct 2026", "Chandigarh"];

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
export function Ticker({ className, reverse = false }: { className?: string; reverse?: boolean }) {
  return (
    <div
      className={cn(
        "w-full scale-110 overflow-hidden border-y border-white/10 bg-neutral-dark py-2.5 shadow-2xl",
        reverse ? "rotate-2" : "-rotate-2",
        className
      )}
    >
      <div
        className={cn(
          "ticker-track flex w-max text-xs font-bold uppercase tracking-[0.3em] text-white/60 md:text-sm",
          reverse && "ticker-track-reverse"
        )}
      >
        <Run />
        <div aria-hidden="true">
          <Run />
        </div>
      </div>
    </div>
  );
}

/**
 * Seams between a dark band and its light neighbours; DarkBand wires these up.
 *
 * Each cut edge runs at the strip's angle (3.5vw over the full width is about
 * 2 degrees), so the boundary is parallel to the ticker and hides beneath it.
 * The cut-away corner reveals the page grid for the light section.
 *
 * "normal" tilts like <Ticker />, "reverse" like <Ticker reverse />.
 */
export type Tilt = "none" | "normal" | "reverse";

const DROP = "3.5vw";

export function seamClip(top: Tilt, bottom: Tilt): CSSProperties {
  const tl = top === "normal" ? DROP : "0";
  const tr = top === "reverse" ? DROP : "0";
  const bl = bottom === "reverse" ? `calc(100% - ${DROP})` : "100%";
  const br = bottom === "normal" ? `calc(100% - ${DROP})` : "100%";
  return { clipPath: `polygon(0 ${tl}, 100% ${tr}, 100% ${br}, 0 ${bl})` };
}

export function SeamTicker({ reverse = false, edge = "bottom" }: { reverse?: boolean; edge?: "top" | "bottom" }) {
  return <Ticker reverse={reverse} className={cn("absolute left-0", edge === "top" ? "top-8" : "bottom-8")} />;
}
