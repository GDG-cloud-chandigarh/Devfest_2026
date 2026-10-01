import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { Sticker } from "@/components/Sticker";
import { TeamShowcase, type TeamMember } from "@/components/ui/team-showcase";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the GDG Cloud Chandigarh volunteers organising DevFest Chandigarh 2026.",
  alternates: { canonical: "/team" },
};

const TEAM: TeamMember[] = [
  { id: "cherish", name: "Cherish Santoshi", role: "Organizer", image: "/team/cherish.jpeg", linkedin: "https://www.linkedin.com/in/cherishsantoshi/" },
  { id: "tushar", name: "Tushar Shah", role: "Co-Organizer", image: "/team/tushar.jpeg", linkedin: "https://www.linkedin.com/in/tushar21shah/" },
  { id: "purahan", name: "Purahan Gupta", role: "Core Team", image: "/team/purahan.jpg", linkedin: "https://www.linkedin.com/in/purahan/" },
  { id: "divanshi", name: "Divanshi Arora", role: "Core Team", image: "/team/divanshi.jpeg", linkedin: "https://www.linkedin.com/in/divanshi-arora-/" },
  { id: "shatakshi", name: "Shatakshi", role: "Core Team", image: "/team/shatakshi.jpeg", linkedin: "https://www.linkedin.com/in/shatakshi-bhardwaj-445295281/" },
  { id: "krishanu", name: "Krishanu Mishra", role: "Core Team", image: "/team/krishanu.jpg", linkedin: "https://www.linkedin.com/in/krishanu-mishra-aa531b276/" },
  { id: "sarang", name: "Sarang Ahlawat", role: "Core Team", image: "/team/sarang.jpeg", linkedin: "https://www.linkedin.com/in/sarangahlawat/" },
];

export default function TeamPage() {
  return (
    <div className="relative py-12 sm:py-16">
      <Sticker name="quote" className="left-[2%] top-[34%] hidden h-10 min-[1300px]:block" rotate={-8} />
      <Sticker name="minus" className="right-[3%] top-[72%] hidden h-6 min-[1300px]:block" rotate={12} delay={2} />
      <Sticker name="hash" className="right-[2.5%] top-[30%] hidden h-10 min-[1300px]:block" rotate={-12} delay={4} />
      <Sticker name="halfLeft" className="left-[3%] top-[68%] hidden h-14 min-[1300px]:block" delay={1} />
      <SectionHeader title="The team" />
      <p className="mx-auto mt-4 max-w-6xl px-4 text-neutral-dark/80 sm:px-8">
        DevFest Chandigarh is run by the volunteers of GDG Cloud Chandigarh, who plan the sessions, find the speakers and
        partners, and keep the day running.
      </p>
      <div className="mt-12 px-4 sm:px-8">
        <TeamShowcase members={TEAM} />
      </div>
    </div>
  );
}
