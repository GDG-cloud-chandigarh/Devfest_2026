import Image from "next/image";
import { Calendar } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { SectionHeader } from "@/components/SectionHeader";
import { CODE_FOR_COMMUNITIES_URL, TICKETS_URL } from "@/lib/constants";

type Event = {
  name: string;
  date: string;
  blurb: string;
  href: string;
  cta: string;
  /** Date pill fill and border, keyed to the event's accent. */
  pill: string;
  /** Poster art. Without one the card falls back to outlined lettering. */
  poster?: string;
};

const EVENTS: Event[] = [
  {
    name: "Cloud Community Day",
    date: "23rd Oct 2026",
    blurb: "A full day on Google Cloud and AI, the day before DevFest.",
    href: TICKETS_URL,
    cta: "Register",
    pill: "border-google-blue bg-google-blue/20",
  },
  {
    name: "Code for Communities",
    date: "23rd Oct 2026",
    blurb: "A hackathon building for the community, run with HackCulture.",
    href: CODE_FOR_COMMUNITIES_URL,
    cta: "Register",
    pill: "border-google-yellow bg-google-yellow/25",
    poster: "/images/code-for-communities.png",
  },
];

function EventCard({ event }: { event: Event }) {
  return (
    <article className="relative h-[26rem] overflow-hidden rounded-3xl bg-cream text-neutral-dark sm:h-[30rem]">
      {event.poster ? (
        <Image
          src={event.poster}
          alt={event.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        /*
          Outline-only lettering: a transparent fill over a hairline stroke.
          Pure decoration, so it is drawn by a pseudo-element rather than being
          text: at 18% it is too faint to read the name from, and as a text node
          it would be indexed and contrast-checked like content. The real
          heading is in the overlay below.
        */
        <div
          aria-hidden="true"
          data-label={event.name}
          className="p-6 font-heading text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl before:text-transparent before:content-[attr(data-label)] before:[-webkit-text-stroke:2px_rgba(30,30,30,0.18)]"
        />
      )}

      {/* Overlaid on the art, so the scrim keeps it readable whatever the poster does there. */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cream via-cream/90 to-transparent p-6 pt-16">
        <h3 className="font-heading text-xl font-bold">{event.name}</h3>
        <p className="mt-1 text-sm text-neutral-dark/75">{event.blurb}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className={`flex w-fit items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold ${event.pill}`}>
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {event.date}
          </p>
          <GlowButton href={event.href} size="sm">
            {event.cta}
          </GlowButton>
        </div>
      </div>
    </article>
  );
}

export function OtherEvents() {
  return (
    <section className="flex min-h-dvh flex-col justify-center py-16">
      <SectionHeader title="Other Events" />
      <p className="mx-auto mt-4 w-full max-w-6xl px-4 text-white/70 sm:px-8">
        DevFest is the 24th. The day before it, two more things are running.
      </p>

      <div className="mx-auto mt-10 grid w-full max-w-6xl gap-6 px-4 sm:px-8 md:grid-cols-2">
        {EVENTS.map((event) => (
          <EventCard key={event.name} event={event} />
        ))}
      </div>
    </section>
  );
}
