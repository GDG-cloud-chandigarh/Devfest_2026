import Image from "next/image";
import { Asterisk, Globe, Waves } from "lucide-react";
import { CornerHandles } from "@/components/CornerHandles";
import { SectionHeader } from "@/components/SectionHeader";
import { GlowButton } from "@/components/GlowButton";
import { TICKETS_URL } from "@/lib/constants";

const STROKE = "#1E1E1E"; // matches the card border

type Format = {
  title: string;
  photo: string;
  /** Colour wash over the photo. */
  tint: string;
  /** Label fill. */
  text: string;
  /** Grid placement from md up. */
  span: string;
};

const FORMATS: Format[] = [
  {
    title: "Workshops",
    photo: "/images/build_with_ai_2024.webp",
    tint: "bg-google-red/55",
    text: "text-google-red",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Conference",
    photo: "/images/ccd_2025.jpg",
    tint: "bg-google-yellow/60",
    text: "text-google-yellow",
    span: "md:col-span-2",
  },
  {
    title: "Hackathon",
    photo: "/images/devfest_2025.webp",
    tint: "bg-google-green/55",
    text: "text-google-green",
    span: "md:col-span-1",
  },
  {
    title: "Private Network",
    photo: "/images/ccd_2024.jpg",
    tint: "bg-google-blue/55",
    text: "text-google-blue",
    span: "md:col-span-1",
  },
];

function CardGlyphs() {
  return (
    <span aria-hidden="true" className="flex items-center gap-3 text-neutral-dark/50">
      <Image src="/images/gdg_logo.png" alt="" width={48} height={48} className="h-5 w-auto" />
      <Asterisk className="h-4 w-4" />
      <Globe className="h-4 w-4" />
      <Waves className="h-4 w-4" />
      <Asterisk className="h-4 w-4 max-sm:hidden" />
    </span>
  );
}

function FormatCard({ format }: { format: Format }) {
  return (
    <article className={`relative h-64 md:h-auto ${format.span}`}>
      <div className="relative h-full w-full overflow-hidden border-2 border-neutral-dark">
        <Image
          src={format.photo}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className={`absolute inset-0 ${format.tint}`} />
        <div className="relative flex h-full flex-col justify-between p-5">
          <CardGlyphs />
          {/*
            paint-order keeps the stroke behind the fill, otherwise the
            stroke eats into the letterforms and the label looks thin.
          */}
          <h3
            className={`font-heading text-4xl font-bold sm:text-5xl ${format.text} [paint-order:stroke_fill]`}
            style={{ WebkitTextStroke: `3px ${STROKE}` }}
          >
            {format.title}
          </h3>
        </div>
      </div>
      <CornerHandles />
    </article>
  );
}

export function FormatsGrid() {
  return (
    <section className="bg-cream py-16 text-neutral-dark">
      <SectionHeader title="DevFest 2026" />

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:px-8 md:auto-rows-[17rem] md:grid-cols-4">
        {FORMATS.map((format) => (
          <FormatCard key={format.title} format={format} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <GlowButton href={TICKETS_URL}>Get Tickets</GlowButton>
      </div>
    </section>
  );
}
