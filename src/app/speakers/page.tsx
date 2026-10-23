import type { Metadata } from "next";
import { Mic } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Sticker } from "@/components/Sticker";
import { SpeakerGrid, type Speaker } from "@/components/ui/speaker-grid";
import { SPEAKER_CFP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Speakers",
  description: "The speakers at DevFest Chandigarh 2026 on 24th October: Google, Google Developer Experts and engineers on agentic AI, Firebase, sandboxing agents and serverless.",
  alternates: { canonical: "/speakers" },
};

// Speakers on 24th October, in agenda order. Photos go in public/speakers/.
const SPEAKERS: Speaker[] = [
  { name: "Abhishek Verma", role: "Senior Software Engineer, Exerp", topic: "Serverless Computing with Spring Cloud Function", image: "/speakers/abhishek-verma.webp" },
  { name: "Aprajita Verma", role: "Frontend Architect, Mycom | WTM Ambassador", topic: "The Cheapest Token (Is the One You Never Send)", image: "/speakers/aprajita-verma.webp", linkedin: "https://www.linkedin.com/in/aprajita-verma-19522814a/" },
  { name: "Hemant Gupta", role: "Senior Software Engineer, Agoda", topic: "The Agent Worked. The System Didn't.", image: "/speakers/hemant-gupta.webp", linkedin: "https://www.linkedin.com/in/hemant-gupta-8b1674177/" },
  { name: "Belal Khan", role: "Google Developer Expert | YouTube @SimplifiedCoding", topic: "Building AI-Powered Android Apps with Gemma and RAG", image: "/speakers/belal-khan.webp", linkedin: "https://www.linkedin.com/in/probelalkhan", website: "https://simplifiedcoding.net" },
  { name: "Srushti Raybhoge", role: "SDE-2, Addepar | Google Developer Expert", topic: "Guardrails & Gatekeepers: Bulletproof Your AI Applications with Firebase", image: "/speakers/srushti-raybhoge.webp", linkedin: "https://www.linkedin.com/in/srushti-raybhoge/", website: "https://srushti-raybhoge.in" },
  {
    name: "Rajani Ekunde",
    role: "Google Developer Expert | Docker Captain | WTM Ambassador",
    topic: "Your Agent Just Ran rm -rf: Sandboxing AI Agents from Docker to GKE Agent Sandbox",
    image: "/speakers/rajani-ekunde.webp",
    linkedin: "https://www.linkedin.com/in/rajani103/",
  },
  { name: "Rishi Mondal", role: "SRE, Obmondo | CNCF KubeStellar Maintainer | Docker Captain", topic: "Your Agent Just Ran rm -rf: Sandboxing AI Agents from Docker to GKE Agent Sandbox", image: "/speakers/rishi-mondal.webp", linkedin: "https://www.linkedin.com/in/rishi-mondal-5238b2282/" },
  { name: "Mohit Gulati", role: "Senior Product Manager, Google", topic: "Safely Succeeding in the Age of Agentic AI", image: "/speakers/mohit-gulati.webp" },
];

export default function SpeakersPage() {
  return (
    <div className="relative py-12 sm:py-16">
      <Sticker name="plus" className="left-[2%] top-[30%] hidden h-12 min-[1300px]:block" rotate={14} />
      <Sticker name="bubbles" className="right-[1.5%] top-[52%] hidden h-8 min-[1300px]:block" delay={3} />
      <Sticker name="minus" className="right-[2.5%] top-[24%] hidden h-5 min-[1300px]:block" rotate={-10} delay={1} />
      <Sticker name="arrow" className="left-[1.5%] top-[72%] hidden h-7 min-[1300px]:block" rotate={-8} delay={4} />
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
