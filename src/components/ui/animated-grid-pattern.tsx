"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string | number;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

type Square = { col: number; row: number; delay: number };

/*
  Grid lines plus squares that fade in and out.

  The fading is a CSS keyframe (grid-square in globals.css), so it runs with no
  JavaScript at all once the squares are placed. It used to be framer-motion:
  one JS animation per square, and every square that finished re-rendered the
  whole grid to move it, which across four grids kept React busy nonstop.

  Squares now stay put. Each runs the same cycle from a different offset, so
  the set that is lit keeps shifting, which is what reads as "random".
*/
export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
}: AnimatedGridPatternProps) {
  const id = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [squares, setSquares] = useState<Square[]>([]);

  // In, out, then a pause: the pause is what makes them twinkle, not pulse.
  const cycle = duration * 2 + repeatDelay;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let placed = { cols: 0, rows: 0 };

    // Only re-place when the number of cells actually changes. A mobile address
    // bar showing and hiding resizes a fixed background constantly, and
    // reshuffling on every one of those would flicker.
    const place = () => {
      const rect = svg.getBoundingClientRect();
      const cols = Math.max(1, Math.floor(rect.width / width));
      const rows = Math.max(1, Math.floor(rect.height / height));
      if (cols === placed.cols && rows === placed.rows) return;
      placed = { cols, rows };
      setSquares(
        Array.from({ length: numSquares }, (_, i) => ({
          col: Math.floor(Math.random() * cols),
          row: Math.floor(Math.random() * rows),
          // Spread evenly through the cycle so some are already lit on arrival.
          delay: -(i / numSquares) * cycle,
        }))
      );
    };

    const observer = new ResizeObserver(place);
    observer.observe(svg);
    return () => observer.disconnect();
  }, [numSquares, width, height, cycle]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30", className)}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map((sq, i) => (
          <rect
            key={i}
            className="grid-square"
            width={width - 1}
            height={height - 1}
            x={sq.col * width + 1}
            y={sq.row * height + 1}
            fill="currentColor"
            strokeWidth="0"
            style={
              {
                "--grid-max": maxOpacity,
                animationDuration: `${cycle}s`,
                animationDelay: `${sq.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
    </svg>
  );
}
