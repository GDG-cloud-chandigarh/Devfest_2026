import { DarkGrid } from "@/components/DarkGrid";
import { seamClip, SeamTicker, type Tilt } from "@/components/Ticker";
import { cn } from "@/lib/utils";

/**
 * A run of one or more dark sections on a single grid.
 *
 * Owns the grid, the white text, and the optional seam on each edge, so the
 * sections inside stay plain. Grouping neighbouring dark sections here rather
 * than giving each its own grid is what keeps the grid lines continuous at
 * the join between them.
 */
export function DarkBand({
  top = "none",
  bottom = "none",
  children,
}: {
  top?: Tilt;
  bottom?: Tilt;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("relative isolate overflow-hidden text-white", top !== "none" && "pt-28", bottom !== "none" && "pb-28")}
      style={seamClip(top, bottom)}
    >
      <DarkGrid />
      {children}
      {top !== "none" && <SeamTicker reverse={top === "reverse"} edge="top" />}
      {bottom !== "none" && <SeamTicker reverse={bottom === "reverse"} />}
    </div>
  );
}
