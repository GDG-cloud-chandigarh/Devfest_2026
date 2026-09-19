import { Glyph } from "@/components/Glyph";

/** Section title and the decorative glyph pill. */
export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-4 px-4 sm:px-8">
      <h2 className="font-heading text-2xl font-bold sm:text-3xl">{title}</h2>

      <span
        aria-hidden="true"
        className="ml-auto hidden items-center gap-6 rounded-full border border-neutral-dark/10 bg-neutral-light px-8 py-3 text-neutral-dark lg:flex"
      >
        <Glyph name="asterisk" className="h-5" />
        <Glyph name="arrow" className="h-5" />
        <Glyph name="globe" className="h-6" />
        <Glyph name="wave" className="h-3" />
        <Glyph name="asterisk" className="h-5" />
      </span>
    </div>
  );
}
