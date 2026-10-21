import type { Metadata } from "next";
import { Brain, DoorOpen, Flag, Laptop, Mic, PartyPopper, Presentation, Utensils } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Sticker } from "@/components/Sticker";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import { TICKETS_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Schedule",
  description: "The DevFest Chandigarh 2026 agenda for Saturday 24th October at C2 Auditorium, Chandigarh University, 9:00 AM to 5:15 PM: talks on agentic AI, Firebase, sandboxing agents and serverless, a panel, a quiz and swags.",
  alternates: { canonical: "/schedule" },
};

// Running order for Saturday 24 October 2026, C2 Auditorium, Chandigarh University.
const ITEMS: TimelineItem[] = [
  {
    id: "registration",
    label: "9:00 AM to 9:45 AM",
    title: "Registration & Entry",
    description: "Badge collection, community welcome and partner showcase.",
    icon: <DoorOpen />,
    accent: "bg-google-blue/20",
  },
  {
    id: "opening",
    label: "9:45 AM to 10:00 AM",
    title: "Opening Address",
    description: "Welcome remarks and day overview by the DevFest team.",
    icon: <Flag />,
    accent: "bg-google-red/20",
  },
  {
    id: "mohit",
    label: "10:00 AM to 10:45 AM",
    title: "Safely Succeeding in the Age of Agentic AI",
    description: "Mohit Gulati, Senior Product Manager @ Google",
    icon: <Mic />,
    accent: "bg-google-yellow/30",
  },
  {
    id: "aprajita",
    label: "10:45 AM to 11:30 AM",
    title: "The Cheapest Token (Is the One You Never Send)",
    description: "Aprajita Verma, Frontend Architect @ Mycom, WTM Ambassador",
    icon: <Presentation />,
    accent: "bg-google-green/20",
  },
  {
    id: "hemant",
    label: "11:30 AM to 12:15 PM",
    title: "The Agent Worked. The System Didn't.",
    description: "Hemant Gupta, Senior Software Engineer @ Agoda",
    icon: <Presentation />,
    accent: "bg-google-red/20",
  },
  {
    id: "belal",
    label: "12:15 PM to 1:00 PM",
    title: "Technical Talk: Modern Software Workflows",
    description: "Belal Khan, Google Developer Expert, YouTube @SimplifiedCoding. Topic to be announced.",
    icon: <Presentation />,
    accent: "bg-google-blue/20",
  },
  {
    id: "lunch",
    label: "1:00 PM to 2:00 PM",
    title: "Lunch & Networking Break",
    description: "Lunch, networking and partner booth explorations.",
    icon: <Utensils />,
    accent: "bg-google-yellow/30",
  },
  {
    id: "srushti",
    label: "2:00 PM to 2:45 PM",
    title: "Guardrails & Gatekeepers: Bulletproof Your AI Applications with Firebase",
    description: "Srushti, SDE-2 @ Addepar, Google Developer Expert",
    icon: <Laptop />,
    accent: "bg-google-green/20",
  },
  {
    id: "rajani-rishi",
    label: "2:45 PM to 3:30 PM",
    title: "Your Agent Just Ran rm -rf: Sandboxing AI Agents from Docker to GKE Agent Sandbox",
    description: "Rajani Ekunde (Google Developer Expert, Docker Captain, WTM Ambassador) & Rishi",
    icon: <Presentation />,
    accent: "bg-google-red/20",
  },
  {
    id: "abhishek",
    label: "3:30 PM to 4:15 PM",
    title: "Serverless Computing with Spring Cloud Function",
    description: "Abhishek Verma, Senior Software Engineer @ Exerp",
    icon: <Presentation />,
    accent: "bg-google-blue/20",
  },
  {
    id: "panel",
    label: "4:15 PM to 4:45 PM",
    title: "Panel Discussion & Quiz",
    description: "Industry trends, career insights and an attendee tech quiz.",
    icon: <Brain />,
    accent: "bg-google-yellow/30",
  },
  {
    id: "closing",
    label: "4:45 PM to 5:15 PM",
    title: "Closing Ceremony & Swags",
    description: "Event wrap-up, community feedback and swag giveaways.",
    icon: <PartyPopper />,
    accent: "bg-google-blue/20",
  },
];

export default function SchedulePage() {
  return (
    <div className="relative py-12 sm:py-16">
      {/* The timeline is narrow, so the page has room either side from lg up. */}
      <Sticker name="halfLeft" className="right-[8%] top-[32%] hidden h-24 lg:block" />
      <Sticker name="hash" className="left-[9%] top-[58%] hidden h-12 lg:block" rotate={-10} delay={3} />
      <Sticker name="minus" className="right-[4%] top-[82%] hidden h-5 lg:block" rotate={-6} delay={1} />
      <Sticker name="quote" className="left-[10%] top-[30%] hidden h-8 lg:block" rotate={-8} delay={2} />
      <Sticker name="plus" className="right-[9%] top-[56%] hidden h-10 lg:block" rotate={14} delay={4} />
      <Sticker name="bubbles" className="left-[7%] top-[86%] hidden h-7 lg:block" delay={5} />
      <SectionHeader title="Schedule" />
      <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-8">
        <p className="text-neutral-dark/80">
          Saturday, 24th October 2026. Gates open at 9:00 AM at C2 Auditorium, Chandigarh University.
        </p>
        <p className="mt-2 text-neutral-dark/80">
          7 speakers, mentorship from Googlers, and the finale of the Code for Communities hackathon, where teams present
          their solutions to the jury.
        </p>
        <div className="mt-6">
          <GlowButton href={TICKETS_URL} size="sm">
            Get tickets
          </GlowButton>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-8">
        <Timeline items={ITEMS} />
      </div>
    </div>
  );
}
