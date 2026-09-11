import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

/**
 * Fixed, full-viewport grid backdrop rendered behind all page content.
 * The grid lines stay static while random squares fade in and out, masked to
 * fade toward the edges.
 */
export function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.35}
        duration={3}
        repeatDelay={1}
        className="fill-neutral-dark/10 stroke-neutral-dark/10 text-neutral-dark/30 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] inset-y-[-20%] h-[140%]"
      />
    </div>
  );
}
