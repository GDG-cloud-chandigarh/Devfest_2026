import { DarkBand } from "@/components/DarkBand";
import { Hero } from "@/components/Hero";
import { Faqs } from "@/components/Faqs";
import { FocusAreas } from "@/components/FocusAreas";
import { FormatsGrid } from "@/components/FormatsGrid";
import { RecapsMarquee } from "@/components/RecapsMarquee";
import { OtherEvents } from "@/components/OtherEvents";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function HomePage() {
  return (
    <>
      <Hero />

      <DarkBand bottom="normal">
        <RecapsMarquee />
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
