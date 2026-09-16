import dynamic from "next/dynamic";
import { GlowButton } from "@/components/GlowButton";
import { RecapsMarquee } from "@/components/RecapsMarquee";
import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider";
import { SITE_TAGLINE, TICKETS_URL } from "@/lib/constants";

const HeroTags = dynamic(() => import("@/components/HeroTags").then((mod) => mod.HeroTags), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[calc(100dvh-4.5rem)] w-full items-center justify-center overflow-hidden text-center sm:min-h-[calc(100dvh-5rem)]">
        <HeroTags />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <DynamicTextSlider topLine="DevFest" sliderWord="Chandigarh" subheading={SITE_TAGLINE}>
            <GlowButton href={TICKETS_URL}>Get Tickets</GlowButton>
          </DynamicTextSlider>
        </div>
      </section>

      <RecapsMarquee />
    </>
  );
}
