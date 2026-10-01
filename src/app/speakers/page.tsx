import type { Metadata } from "next";
import { Mic } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { SectionHeader } from "@/components/SectionHeader";
import { SpeakerGrid, type Speaker } from "@/components/ui/speaker-grid";
import { SPEAKER_CFP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Speakers",
  description: "The speakers at DevFest Chandigarh 2026, and how to submit a talk.",
  alternates: { canonical: "/speakers" },
};

// One slot per track until speakers are confirmed. Replace each with the real
// speaker (name, role, topic, photo in public/speakers/) as they are announced.
const SPEAKERS: Speaker[] = ["AI & ML", "Gemini & Agents", "Google Cloud", "Firebase", "Android", "Web", "Flutter", "Security & DevOps"].map(
  (track) => ({ name: "Speaker TBA", role: track })
);

export default function SpeakersPage() {
  return (
    <div className="py-12 sm:py-16">
      <SectionHeader title="Speakers" />
      <p className="mx-auto mt-4 max-w-6xl px-4 text-neutral-dark/80 sm:px-8">
        Developers, researchers and community leaders sharing what they have built on AI, Google Cloud, Android, Web and
        Firebase.
      </p>

      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-8">
        {/* Two rows of four at most; extra entries are left off. */}
        {SPEAKERS.length > 0 && <SpeakerGrid speakers={SPEAKERS.slice(0, 8)} />}

        {/* The Call for Speakers stays on the page while it is open, speakers or not. */}
        <div
          className={`flex flex-col items-center rounded-3xl border border-neutral-dark/10 bg-cream px-6 py-16 text-center ${SPEAKERS.length > 0 ? "mt-16" : ""}`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-dark bg-google-yellow/30">
            <Mic className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="mt-6 font-heading text-2xl font-bold text-neutral-dark sm:text-3xl">
            {SPEAKERS.length > 0 ? "Want to speak at DevFest?" : "Speakers announced soon"}
          </h2>
          <p className="mt-3 max-w-md text-neutral-dark/80">
            The Call for Speakers is open. Have something worth sharing? Submit a talk and you could be on this page.
          </p>
          <div className="mt-8">
            <GlowButton href={SPEAKER_CFP_URL}>Submit a talk</GlowButton>
          </div>
        </div>
      </div>
    </div>
  );
}
