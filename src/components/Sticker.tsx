import Image from "next/image";

/** The coloured brand shapes in public/element, at their native sizes. */
const STICKERS = {
  arrow: { src: "/element/arrow_yellow.svg", width: 340, height: 206 },
  brackets: { src: "/element/brackets_yellow.svg", width: 279, height: 240 },
  bubbles: { src: "/element/bubbles_pink.svg", width: 583, height: 207 },
  colon: { src: "/element/colon_blue.svg", width: 97, height: 206 },
  cross: { src: "/element/cross_pink.svg", width: 246, height: 240 },
  curly: { src: "/element/curly_brace_green.svg", width: 127, height: 306 },
  equals: { src: "/element/equals_blue.svg", width: 188, height: 173 },
  halfLeft: { src: "/element/half_circle_left_yellow.svg", width: 157, height: 306 },
  halfRight: { src: "/element/half_circle_right_pink.svg", width: 157, height: 306 },
  hash: { src: "/element/hash_green.svg", width: 249, height: 240 },
  minus: { src: "/element/minus_blue.svg", width: 249, height: 72 },
  plus: { src: "/element/plus_blue.svg", width: 188, height: 173 },
  quote: { src: "/element/quote_green.svg", width: 103, height: 72 },
} as const;

interface StickerProps {
  name: keyof typeof STICKERS;
  /** Position, height and visibility, e.g. "left-[6%] top-[20%] h-14 hidden lg:block". */
  className: string;
  rotate?: number;
  /** Seconds into the float cycle, so neighbours don't bob in step. */
  delay?: number;
}

/**
 * A decorative shape pinned inside the nearest positioned parent. Placed in
 * margins only, and hidden by the caller where a screen has no margin to spare.
 * The float is transform-only (see .sticker), so it never moves layout.
 */
export function Sticker({ name, className, rotate = 0, delay = 0 }: StickerProps) {
  const s = STICKERS[name];
  return (
    <Image
      src={s.src}
      alt=""
      width={s.width}
      height={s.height}
      unoptimized
      className={`sticker pointer-events-none absolute w-auto select-none ${className}`}
      style={{ "--r": `${rotate}deg`, animationDelay: `${-delay}s` } as React.CSSProperties}
    />
  );
}
