import { CalendarDays, MapPin, Mic } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { GlowButton } from "@/components/GlowButton";
import { Sticker } from "@/components/Sticker";
import { DynamicTextSlider } from "@/components/ui/dynamic-text-slider";
import { SITE_TAGLINE, SPEAKER_CFP_URL, TICKETS_URL } from "@/lib/constants";

const FACTS = [
  { Icon: CalendarDays, text: "Sat, 24 October 2026" },
  { Icon: MapPin, text: "Chandigarh" },
];

const CHIP = "flex items-center gap-2 rounded-full border-2 border-neutral-dark bg-white px-4 py-2 text-sm font-semibold";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4.5rem)] w-full flex-col items-center justify-center gap-8 overflow-hidden py-12 text-center sm:min-h-[calc(100dvh-5rem)]">
      <Sticker name="plus" className="left-[7%] top-[14%] hidden h-14 lg:block" rotate={-12} />
      <Sticker name="halfRight" className="right-[6%] top-[20%] hidden h-24 lg:block" delay={2} />
      <Sticker name="hash" className="bottom-[16%] left-[10%] hidden h-12 lg:block" rotate={10} delay={4} />
      <Sticker name="cross" className="bottom-[12%] right-[11%] hidden h-10 lg:block" rotate={15} delay={1} />
      <Sticker name="curly" className="left-[4%] top-[45%] hidden h-16 lg:block" rotate={-6} delay={3} />
      <Sticker name="bubbles" className="right-[4%] top-[52%] hidden h-7 lg:block" delay={5} />
      <Sticker name="colon" className="left-[22%] top-[8%] hidden h-10 lg:block" rotate={12} delay={2} />
      <Sticker name="quote" className="right-[22%] top-[9%] hidden h-8 lg:block" rotate={-10} delay={4} />

      {/* Date and place before the name, so the two things people look for are first. */}
      <div className="flex flex-wrap items-center justify-center gap-3 px-6">
        {FACTS.map(({ Icon, text }) => (
          <span key={text} className={CHIP}>
            <Icon className="h-4 w-4" aria-hidden="true" />
            {text}
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <DynamicTextSlider topLine="DevFest" sliderWord="Chandigarh" subheading={SITE_TAGLINE}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GlowButton href={TICKETS_URL}>Get Tickets</GlowButton>
            <a
              href={SPEAKER_CFP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-dark px-7 py-3 text-sm font-semibold text-neutral-dark transition-colors hover:bg-neutral-dark hover:text-white"
            >
              <Mic className="h-4 w-4" aria-hidden="true" />
              Call for Speakers
            </a>
          </div>
        </DynamicTextSlider>
      </div>

      <Countdown compact />
    </section>
  );
}
