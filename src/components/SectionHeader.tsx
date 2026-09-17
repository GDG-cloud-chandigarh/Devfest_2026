import Image from "next/image";
import { Asterisk, ArrowRight, Globe, Waves } from "lucide-react";

/**
 * Section title, chapter lockup and the decorative glyph pill.
 * Text colour is inherited so the same header works on the cream and the dark
 * sections without a theme flag.
 */
export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 sm:px-8">
      <h2 className="font-heading text-2xl font-bold sm:text-3xl">{title}</h2>
      <span className="flex items-center gap-3">
        <Image src="/images/gdg_logo.png" alt="" width={96} height={96} className="h-10 w-auto sm:h-12" />
        <span className="text-base leading-tight opacity-70 sm:text-lg">
          Google Developer Groups
          <br />
          Cloud Chandigarh
        </span>
      </span>
      <span
        aria-hidden="true"
        className="ml-auto hidden items-center gap-6 rounded-full border border-neutral-dark/10 bg-neutral-light px-8 py-3 text-neutral-dark lg:flex"
      >
        <Asterisk className="h-5 w-5" />
        <ArrowRight className="h-5 w-5" />
        <Globe className="h-5 w-5" />
        <Waves className="h-5 w-5" />
        <Asterisk className="h-5 w-5" />
      </span>
    </div>
  );
}
