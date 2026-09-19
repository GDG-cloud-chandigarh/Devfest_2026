import { Calendar } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { SectionHeader } from "@/components/SectionHeader";
import { TICKETS_URL } from "@/lib/constants";

type Venue = {
  name: string;
  dates: string;
  /** Date pill fill and border, keyed to the venue's accent. */
  pill: string;
};

const VENUES: Venue[] = [
  {
    name: "Innovation Hub Chandigarh",
    dates: "30th - 31st Oct 2026",
    pill: "border-google-blue bg-google-blue/20",
  },
  {
    name: "Diamond Arena",
    dates: "1st Nov 2026",
    pill: "border-google-yellow bg-google-yellow/25",
  },
];

const TICKETS = ["Day 1 Ticket", "Day 2 Ticket", "Both Day Ticket"];

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="relative flex h-[26rem] flex-col justify-between overflow-hidden rounded-3xl bg-cream p-6 sm:h-[30rem]">
      {/*
        Outline-only lettering: a transparent fill over a hairline stroke. The
        name runs wide and clips at the card edge, as in the design.
      */}
      <h3
        className="font-heading text-5xl font-bold uppercase leading-[0.95] tracking-tight text-transparent sm:text-6xl"
        style={{ WebkitTextStroke: "2px rgba(30,30,30,0.18)" }}
      >
        {venue.name}
      </h3>

      <p
        className={`flex w-fit items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold text-neutral-dark ${venue.pill}`}
      >
        <Calendar className="h-4 w-4" aria-hidden="true" />
        {venue.dates}
      </p>
    </article>
  );
}

export function VenuesSection() {
  return (
    <section className="flex min-h-dvh flex-col justify-center bg-neutral-dark py-16 text-white">
      <SectionHeader title="Venues" />

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 sm:px-8 md:grid-cols-2">
        {VENUES.map((venue) => (
          <VenueCard key={venue.name} venue={venue} />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4 px-4">
        {TICKETS.map((ticket) => (
          <GlowButton
            key={ticket}
            href={TICKETS_URL}
            size="sm"
            className="bg-white text-neutral-dark hover:bg-white/90"
          >
            {ticket}
          </GlowButton>
        ))}
      </div>
    </section>
  );
}
