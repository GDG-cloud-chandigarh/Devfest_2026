import Image from "next/image";
import { Asterisk, ArrowRight, Globe, Waves } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { EVENTS_URL } from "@/lib/constants";

/**
 * Items scrolled by the marquee. Colour blocks sit between the photos so the
 * band keeps the Google palette moving even where photos are sparse.
 */
const RECAP_ITEMS: ({ photo: string; alt: string } | { color: string; stat: string; label: string })[] = [
  { color: "bg-google-green", stat: "3000+", label: "attendees" },
  { photo: "/images/devfest_2024.jpg", alt: "DevFest Chandigarh 2024" },
  { photo: "/images/devfest_2025.webp", alt: "DevFest Chandigarh 2025" },
  { photo: "/images/ccd_2025.jpg", alt: "Cloud Community Days 2025" },
  { color: "bg-google-yellow", stat: "50+", label: "sessions" },
  { photo: "/images/build_with_ai_2024.webp", alt: "Build with AI 2024" },
  { photo: "/images/ccd_2024.jpg", alt: "Cloud Community Days 2024" },
  { color: "bg-google-red", stat: "20+", label: "speakers" },
  { photo: "/images/i_o_extended_2023.webp", alt: "Google I/O Extended 2023" },
];

// Height is driven off the viewport so the band fills the screen; the 3:4 ratio
// then sets the width, which keeps every item portrait at any size.
const ITEM_SIZE = "h-[46vh] aspect-[3/4] shrink-0 sm:h-[54vh] lg:h-[60vh]";

const CORNERS = ["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"];

/** Decorative squares that make each item read like a selected design-tool node. */
function CornerHandles() {
  return (
    <>
      {CORNERS.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute ${position} h-3 w-3 rounded-[2px] border border-neutral-dark bg-white`}
        />
      ))}
    </>
  );
}

function RecapItem({ item }: { item: (typeof RECAP_ITEMS)[number] }) {
  return (
    <div className={`${ITEM_SIZE} relative`}>
      {"color" in item ? (
        <div
          className={`flex h-full w-full flex-col items-center justify-center border-4 border-white text-neutral-dark ${item.color}`}
        >
          <span className="font-heading text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">{item.stat}</span>
          <span className="mt-2 text-lg font-medium sm:text-xl">{item.label}</span>
        </div>
      ) : (
        <div className="relative h-full w-full overflow-hidden border-4 border-white">
          <Image
            src={item.photo}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 600px, (min-width: 640px) 500px, 400px"
            className="object-cover"
          />
        </div>
      )}
      <CornerHandles />
    </div>
  );
}

export function RecapsMarquee() {
  return (
    <section className="flex min-h-dvh flex-col justify-center bg-neutral-dark py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 sm:px-8">
        <h2 className="font-heading text-xl font-bold sm:text-2xl">Previous Events:</h2>
        <span className="flex items-center gap-3">
          <Image src="/images/gdg_logo.png" alt="" width={96} height={96} className="h-10 w-auto sm:h-12" />
          <span className="text-base leading-tight text-white/80 sm:text-lg">
            Google Developer Groups
            <br />
            Cloud Chandigarh
          </span>
        </span>
        <span
          aria-hidden="true"
          className="ml-auto hidden items-center gap-6 rounded-full bg-neutral-light px-8 py-3 text-neutral-dark lg:flex"
        >
          <Asterisk className="h-5 w-5" />
          <ArrowRight className="h-5 w-5" />
          <Globe className="h-5 w-5" />
          <Waves className="h-5 w-5" />
          <Asterisk className="h-5 w-5" />
        </span>
      </div>

      {/*
        Infinite scroll: the item list is rendered twice and the track slides by
        exactly half its width, so the seam lands back at the starting frame.
      */}
      <div className="marquee mt-8 overflow-hidden">
        <div className="marquee-track flex w-max gap-4">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-4" aria-hidden={copy === 1}>
              {RECAP_ITEMS.map((item, i) => (
                <RecapItem key={i} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl justify-end px-4 sm:px-8">
        <GlowButton href={EVENTS_URL} size="sm">
          View all events
        </GlowButton>
      </div>
    </section>
  );
}
