import Image from "next/image";

/**
 * The DevFest brand glyphs from public/element.
 *
 * Each file has its own aspect ratio, so callers set a height and the width
 * follows. Strokes are baked to #1E1E1E, which is why every glyph sits on a
 * light surface rather than being tinted per section.
 */
const GLYPHS = {
  asterisk: { src: "/element/asterisk.svg", width: 122, height: 119 },
  arrow: { src: "/element/right_point.svg", width: 183, height: 134 },
  globe: { src: "/element/globe.svg", width: 229, height: 206 },
  wave: { src: "/element/four_sem_horizontal.svg", width: 274, height: 45 },
  at: { src: "/element/at.svg", width: 127, height: 139 },
} as const;

export type GlyphName = keyof typeof GLYPHS;

export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  const glyph = GLYPHS[name];
  return (
    <Image
      src={glyph.src}
      alt=""
      width={glyph.width}
      height={glyph.height}
      // Static local vectors a few hundred bytes each. The optimizer has
      // nothing to gain here and rejects SVG without a relaxed config.
      unoptimized
      className={`w-auto ${className ?? ""}`}
    />
  );
}
