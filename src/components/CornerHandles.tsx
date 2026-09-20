const CORNERS = ["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"];

/**
 * Decorative squares that make an item read like a selected design-tool node.
 *
 * White fill, dark border, and a hairline white ring outside the border. On a
 * light ground the ring is invisible and the box reads as white-with-outline.
 * On a dark ground the dark border would otherwise melt into the background
 * and leave a plain white square; the ring keeps the outline legible there.
 */
export function CornerHandles() {
  return (
    <>
      {CORNERS.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute ${position} h-3 w-3 rounded-[2px] border-2 border-neutral-dark bg-white ring-1 ring-white`}
        />
      ))}
    </>
  );
}
