import Image from "next/image";
import { CornerHandles } from "@/components/CornerHandles";
import { GlowButton } from "@/components/GlowButton";
import { MarqueeTrack } from "@/components/MarqueeTrack";
import { SectionHeader } from "@/components/SectionHeader";
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
      <SectionHeader title="Previous Events:" />

      <MarqueeTrack>
        {[0, 1].map((copy) => (
          <div key={copy} data-copy className="flex shrink-0 gap-4" aria-hidden={copy === 1}>
            {RECAP_ITEMS.map((item, i) => (
              <RecapItem key={i} item={item} />
            ))}
          </div>
        ))}
      </MarqueeTrack>

      <div className="mx-auto mt-8 flex max-w-6xl justify-end px-4 sm:px-8">
        <GlowButton href={EVENTS_URL} size="sm">
          View all events
        </GlowButton>
      </div>
    </section>
  );
}
