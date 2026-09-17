const CORNERS = ["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"];

/** Decorative squares that make an item read like a selected design-tool node. */
export function CornerHandles() {
  return (
    <>
      {CORNERS.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute ${position} h-3 w-3 rounded-[2px] border-2 border-neutral-dark bg-white`}
        />
      ))}
    </>
  );
}
