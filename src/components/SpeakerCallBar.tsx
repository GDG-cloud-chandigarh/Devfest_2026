import { Fragment } from "react";
import { Glyph } from "@/components/Glyph";
import { SPEAKER_CFP_URL } from "@/lib/constants";

const PHRASE = "\u{1F3A4} Call for Speakers | DevFest Chandigarh 2026";

/*
  The loop slides the track by half its width, so each run has to be at least
  a screenful wide or the seam shows as a gap. One phrase is nowhere near
  that, hence the repeats: enough to overflow a wide desktop.
*/
const PER_RUN = 8;

function Run() {
  return (
    <div className="flex items-center gap-8 px-4">
      {Array.from({ length: PER_RUN }, (_, i) => (
        <Fragment key={i}>
          <span>{PHRASE}</span>
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
