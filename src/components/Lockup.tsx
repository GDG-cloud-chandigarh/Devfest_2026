/**
 * `{ DevFest }` wordmark with the Chandigarh chapter pill.
 * Drawn in CSS — swap for an <Image> once the licensed brand asset lands.
 */
export function Lockup({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-1 ${className ?? ""}`}>
      <span aria-hidden="true" className="font-heading text-5xl font-bold leading-none text-google-yellow">
        &#123;
      </span>
      <span className="flex flex-col items-center gap-1">
        <span className="font-heading text-2xl font-bold leading-none text-neutral-dark">DevFest</span>
        <span className="rounded-full border border-neutral-dark bg-white px-3 py-0.5 text-[0.6rem] font-medium leading-tight text-neutral-dark">
          Chandigarh
        </span>
      </span>
      <span aria-hidden="true" className="font-heading text-5xl font-bold leading-none text-google-yellow">
        &#125;
      </span>
    </span>
  );
}
