import Image from "next/image";
import { Asterisk, ArrowRight, Globe, Waves } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { RECAPS_URL } from "@/lib/constants";

/**
 * Items scrolled by the marquee. Colour blocks sit between the photos so the
 * band keeps the Google palette moving even where photos are sparse.
 */
const RECAP_ITEMS: ({ photo: string; alt: string } | { color: string })[] = [
  { color: "bg-google-green" },
  { photo: "/images/devfest_2024.jpg", alt: "DevFest Chandigarh 2024" },
  { photo: "/images/devfest_2025.webp", alt: "DevFest Chandigarh 2025" },
  { photo: "/images/ccd_2025.jpg", alt: "Cloud Community Days 2025" },
  { color: "bg-google-yellow" },
  { photo: "/images/build_with_ai_2024.webp", alt: "Build with AI 2024" },
  { photo: "/images/ccd_2024.jpg", alt: "Cloud Community Days 2024" },
  { color: "bg-google-red" },
  { photo: "/images/i_o_extended_2023.webp", alt: "Google I/O Extended 2023" },
];

function RecapItem({ item }: { item: (typeof RECAP_ITEMS)[number] }) {
  if ("color" in item) {
    return <div className={`h-64 w-48 shrink-0 rounded-sm sm:h-80 sm:w-60 ${item.color}`} />;
  }
  return (
    <div className="relative h-64 w-48 shrink-0 overflow-hidden rounded-sm border-4 border-white sm:h-80 sm:w-60">
      <Image src={item.photo} alt={item.alt} fill sizes="240px" className="object-cover" />
    </div>
  );
}

export function RecapsMarquee() {
  return (
    <section className="bg-neutral-dark py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 sm:px-8">
        <h2 className="font-heading text-lg font-bold sm:text-xl">Previous Devfest Recaps:</h2>
        <span className="flex items-center gap-2">
          <Image src="/images/gdg_logo.png" alt="" width={32} height={32} className="h-6 w-auto" />
          <span className="text-sm text-white/80">Google Developer Groups Chandigarh</span>
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
        <GlowButton href={RECAPS_URL} size="sm">
          View 2024
        </GlowButton>
      </div>
    </section>
  );
}
