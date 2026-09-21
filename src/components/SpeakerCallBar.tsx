import { Fragment } from "react";
import { Glyph } from "@/components/Glyph";
import { SPEAKER_CFP_URL } from "@/lib/constants";

const ITEMS = [
  "\u{1F3A4} Call for Speakers | DevFest Chandigarh 2026",
  "Got a tech idea or a story to share? Take the stage and inspire the developer community",
  "Submit your session →",
];

function Run() {
  return (
    <div className="flex items-center gap-8 px-4">
      {ITEMS.map((item) => (
        <Fragment key={item}>
          <span>{item}</span>
          <Glyph name="asterisk" className="h-2.5 opacity-60 invert" />
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Announcement strip above the navbar. The whole bar is the link, since a
 * moving anchor inside a marquee is hard to hit; hovering pauses the scroll.
 */
export function SpeakerCallBar() {
  return (
    <a
      href={SPEAKER_CFP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full overflow-hidden bg-neutral-dark py-2 text-white hover:bg-neutral-dark/90"
    >
      <div className="ticker-track flex w-max text-xs font-bold uppercase tracking-[0.25em] text-white/80 group-hover:[animation-play-state:paused]">
        <Run />
        <div aria-hidden="true">
          <Run />
        </div>
      </div>
    </a>
  );
}
