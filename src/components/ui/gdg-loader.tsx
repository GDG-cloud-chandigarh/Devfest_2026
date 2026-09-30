import { cn } from "@/lib/utils";

/*
  The GDG mark as SVG, in the logo's own pixel units (fitted to
  public/images/gdg_logo.png), so the 1.8:1 aspect and 35.7 degree tilt are
  exact.

  Construction: each chevron is two equal capsules sharing an end point at
  the vertex, one drawn over the other. Red and yellow only look short
  because blue and green cover their first stretch; drawing them the full
  length is what gives the sharp, flush point where the two meet.

  Each capsule is a rect with fully rounded ends, grown by the outline width
  because an SVG stroke straddles the edge and would otherwise eat into the
  colour. Draw order: red and yellow first, then blue and green over them.
*/
const OUTLINE = 41;
const LENGTH = 742;
const THICK = 287;
const ANGLE = 35.7;

// Two columns and two rows, symmetric about the vertex line.
const LEFT = 377;
const RIGHT = 1268;
const TOP = 324.15;
const BOTTOM = 589.35;

/*
  Grouped by chevron, because the mark is built from overlap: any fade or
  scale applied to one capsule exposes the hidden stretch of the one beneath
  it. Each group animates as a unit, so its tuck stays intact at every frame.
  Within a group the tucked capsule is listed first so it draws underneath.
*/
const CHEVRONS = [
  {
    key: "left",
    delay: "0s",
    capsules: [
      { key: "red", fill: "fill-google-red", cx: LEFT, cy: TOP, angle: -ANGLE },
      { key: "blue", fill: "fill-google-blue", cx: LEFT, cy: BOTTOM, angle: ANGLE },
    ],
  },
  {
    key: "right",
    delay: "-0.6s",
    capsules: [
      { key: "yellow", fill: "fill-google-yellow", cx: RIGHT, cy: BOTTOM, angle: -ANGLE },
      { key: "green", fill: "fill-google-green", cx: RIGHT, cy: TOP, angle: ANGLE },
    ],
  },
];

const W = LENGTH + OUTLINE;
const H = THICK + OUTLINE;

export function GdgLoader({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <div role="status" aria-label={label} className={cn("w-16", className)}>
      <svg viewBox="-12 -12 1670 940" className="block h-auto w-full overflow-visible" aria-hidden="true">
        {CHEVRONS.map((chevron) => (
          <g key={chevron.key} className="gdg-chevron" style={{ animationDelay: chevron.delay }}>
            {chevron.capsules.map((c) => (
              <rect
                key={c.key}
                className={cn("stroke-neutral-dark", c.fill)}
                transform={`translate(${c.cx} ${c.cy}) rotate(${c.angle})`}
                x={-W / 2}
                y={-H / 2}
                width={W}
                height={H}
                rx={H / 2}
                strokeWidth={OUTLINE}
              />
            ))}
          </g>
        ))}
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
