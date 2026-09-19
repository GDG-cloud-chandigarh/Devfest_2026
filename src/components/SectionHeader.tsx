import Image from "next/image";
import { Asterisk, ArrowRight, Globe, Waves } from "lucide-react";

/**
 * Section title, chapter lockup and the decorative glyph pill.
 *
 * The lockup ships as two fixed-colour files rather than one tintable mark, so
 * sections on the dark band have to ask for the white one.
 */
export function SectionHeader({ title, onDark = false }: { title: string; onDark?: boolean }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-4 px-4 sm:px-8">
      <h2 className="font-heading text-2xl font-bold sm:text-3xl">{title}</h2>

      <Image
        src={onDark ? "/images/gdgcchd_white.png" : "/images/gdgcchd_black.png"}
        alt="Google Developer Groups Cloud Chandigarh"
        width={1863}
        height={312}
        className="h-9 w-auto sm:h-11"
      />

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
