import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

/**
 * Inverted twin of SiteBackground for the dark sections: same grid, same
 * fading squares, on the dark ground. Drop it as the first child of a
 * section that is `relative isolate`; it fills the section and sits behind
 * the content.
 */
export function DarkGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-neutral-dark">
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.35}
        duration={3}
        repeatDelay={1}
        className="fill-white/10 stroke-white/10 text-white/30 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)] inset-y-[-20%] h-[140%]"
      />
    </div>
  );
}
