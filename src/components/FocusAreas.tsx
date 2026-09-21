import { CornerHandles } from "@/components/CornerHandles";
import { SectionHeader } from "@/components/SectionHeader";

type Track = {
  title: string;
  blurb: string;
  /** Tag fill, keyed to the Google palette the rest of the page runs on. */
  pill: string;
};

const TRACKS: Track[] = [
  {
    title: "AI & ML",
    blurb: "Applied machine learning on Google's stack, from a weekend prototype to something that survives production.",
    pill: "bg-google-blue",
  },
  {
    title: "Gemini & Agents",
    blurb: "Building with Gemini: tool use, agents that act on your behalf, and the guardrails that keep them useful.",
    pill: "bg-google-red",
  },
  {
    title: "Google Cloud",
    blurb: "Architecture, data and platform work on Google Cloud, told through what actually ran and what had to be rebuilt.",
    pill: "bg-google-green",
  },
  {
    title: "Firebase",
    blurb: "Firebase Studio, auth, data and hosting: the shortest path from an idea to an app with real users.",
    pill: "bg-google-yellow",
  },
  {
    title: "Android",
    blurb: "Modern Android with Kotlin and Compose, and the craft of an app people keep on their home screen.",
    pill: "bg-google-green",
  },
  {
    title: "Web",
    blurb: "The modern web platform, performance budgets, and the frameworks the community actually ships with.",
    pill: "bg-google-blue",
  },
  {
    title: "Flutter",
    blurb: "One codebase across mobile, web and desktop, and an honest look at where that trade-off earns its place.",
    pill: "bg-google-yellow",
  },
  {
    title: "Security & DevOps",
    blurb: "Pipelines, observability and the security work that stops being optional the moment you have real users.",
    pill: "bg-google-red",
  },
];

function TrackCard({ track }: { track: Track }) {
  return (
    <article className="relative">
      <div className="flex h-full flex-col border-2 border-neutral-dark bg-white p-6">
        <span aria-hidden="true" className={`h-2 w-16 rounded-full ${track.pill}`} />
        <h3 className="mt-5 font-heading text-2xl font-bold">{track.title}</h3>
        <p className="mt-3 text-neutral-dark/70">{track.blurb}</p>
      </div>
      <CornerHandles />
    </article>
  );
}

export function FocusAreas() {
  return (
    <section className="flex min-h-dvh flex-col justify-center py-16 text-neutral-dark">
      <SectionHeader title="Focus Areas" />
      <p className="mx-auto mt-4 w-full max-w-6xl px-4 text-neutral-dark/70 sm:px-8">
        Eight tracks across the Google stack. Pick a lane for the day, or wander between them.
      </p>

      <div className="mx-auto w-full mt-10 grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {TRACKS.map((track) => (
          <TrackCard key={track.title} track={track} />
        ))}
      </div>
    </section>
  );
}
