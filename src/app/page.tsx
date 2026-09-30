import { Countdown } from "@/components/Countdown";
import { DarkBand } from "@/components/DarkBand";
import { GlowButton } from "@/components/GlowButton";
import { Faqs } from "@/components/Faqs";
import { FocusAreas } from "@/components/FocusAreas";
import { FormatsGrid } from "@/components/FormatsGrid";
import { RecapsMarquee } from "@/components/RecapsMarquee";
import { OtherEvents } from "@/components/OtherEvents";
import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { SITE_TAGLINE, TICKETS_URL } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[calc(100dvh-4.5rem)] w-full items-center justify-center overflow-hidden text-center sm:min-h-[calc(100dvh-5rem)]">
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <DynamicTextSlider topLine="DevFest" sliderWord="Chandigarh" subheading={SITE_TAGLINE}>
            <GlowButton href={TICKETS_URL}>Get Tickets</GlowButton>
          </DynamicTextSlider>
        </div>
      </section>

      <DarkBand bottom="normal">
        <div className="flex min-h-dvh flex-col justify-center">
          <Countdown />
          <RecapsMarquee />
        </div>
      </DarkBand>

      <FormatsGrid />

      <DarkBand top="reverse" bottom="reverse">
        <OtherEvents />
      </DarkBand>

      <FocusAreas />

      <DarkBand>
        <Faqs />
        <CinematicFooter />
      </DarkBand>
    </>
  );
}
