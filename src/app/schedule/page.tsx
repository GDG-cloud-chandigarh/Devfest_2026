import type { Metadata } from "next";
import { Brain, DoorOpen, Flag, Gift, Laptop, Mic, PartyPopper, Presentation, Utensils, Zap } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import { TICKETS_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Schedule",
  description: "The DevFest Chandigarh 2026 day on 24th October, from 9:30 AM to 4:30 PM: keynote, talks, workshops and more.",
  alternates: { canonical: "/schedule" },
};

// Tentative slots for the 24th. Swap in sessions and speakers as they are confirmed.
const ITEMS: TimelineItem[] = [
  {
    id: "registration",
    label: "9:30 AM",
    title: "Registration and networking",
    description: "Collect your badge, grab a coffee and meet the community.",
    icon: <DoorOpen />,
    accent: "bg-google-blue/20",
  },
  {
    id: "welcome",
    label: "10:15 AM",
    title: "Welcome to DevFest Chandigarh",
    description: "Opening words from the GDG Cloud Chandigarh organisers.",
    icon: <Flag />,
    accent: "bg-google-red/20",
  },
  {
    id: "keynote",
    label: "10:30 AM",
    title: "Keynote",
    icon: <Mic />,
    accent: "bg-google-yellow/30",
  },
  {
    id: "talks-1",
    label: "11:15 AM",
    title: "Tech talks: AI and Google Cloud",
    icon: <Presentation />,
    accent: "bg-google-green/20",
  },
  {
    id: "quiz",
    label: "12:00 PM",
    title: "Tech quiz",
    description: "A quick-fire quiz on everything Google, with prizes for the sharpest answers.",
    icon: <Brain />,
    accent: "bg-google-red/20",
  },
  {
    id: "lunch",
    label: "12:30 PM",
    title: "Lunch and networking",
    icon: <Utensils />,
    accent: "bg-google-blue/20",
  },
  {
    id: "workshops",
    label: "1:30 PM",
    title: "Hands-on workshops",
    description: "Bring your laptop and build along with the speakers.",
    icon: <Laptop />,
    accent: "bg-google-red/20",
  },
  {
    id: "talks-2",
    label: "2:30 PM",
    title: "Tech talks: Android, Web and Firebase",
    icon: <Presentation />,
    accent: "bg-google-yellow/30",
  },
  {
    id: "games",
    label: "3:00 PM",
    title: "Games and giveaways",
    description: "A breather between sessions: community games, swag and a few surprises.",
    icon: <Gift />,
    accent: "bg-google-blue/20",
  },
  {
    id: "lightning",
    label: "3:30 PM",
    title: "Lightning talks",
    description: "Short, fast talks from the community.",
    icon: <Zap />,
    accent: "bg-google-green/20",
  },
  {
    id: "closing",
    label: "4:00 PM to 4:30 PM",
    title: "Closing, swag and group photo",
    icon: <PartyPopper />,
    accent: "bg-google-blue/20",
  },
];

export default function SchedulePage() {
  return (
    <div className="py-12 sm:py-16">
      <SectionHeader title="Schedule" />
      <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-8">
        <p className="text-neutral-dark/80">
          24th October 2026, 9:30 AM to 4:30 PM. Timings are tentative; sessions and speakers will be announced soon.
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
