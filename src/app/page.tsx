import { DarkBand } from "@/components/DarkBand";
import { Hero } from "@/components/Hero";
import { Faqs } from "@/components/Faqs";
import { FocusAreas } from "@/components/FocusAreas";
import { FormatsGrid } from "@/components/FormatsGrid";
import { RecapsMarquee } from "@/components/RecapsMarquee";
import { OtherEvents } from "@/components/OtherEvents";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { STRUCTURED_DATA } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      {/* Event and organiser details for search: what Google's event results read. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
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
