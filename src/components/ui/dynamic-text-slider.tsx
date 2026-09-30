"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const MIN_RANGE = 50; // px: minimum gap kept between the two handles
const ROTATION_DEG = -2.76; // resting tilt of the slider
const MAX_EXTRA_TILT = 3; // extra degrees when the window is pushed to one side
const THETA = ROTATION_DEG * (Math.PI / 180);
const COS_THETA = Math.cos(THETA);
const SIN_THETA = Math.sin(THETA);

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

type Handle = "left" | "right";

interface DragState {
  handle: Handle;
  startX: number;
  startY: number;
  startInset: number;
}

export interface DynamicTextSliderProps {
  /** Static first line of the headline. */
  topLine?: string;
  /** Second line: the word the slider reveals or clips. */
  sliderWord?: string;
  /** Optional supporting copy under the headline. */
  subheading?: string;
  /** Optional call-to-action (e.g. a button) rendered below the copy. */
  children?: React.ReactNode;
  className?: string;
}

/** A two-line headline whose second word sits inside a rotated range slider. */
export function DynamicTextSlider({
  topLine = "GDG Cloud",
  sliderWord = "Chandigarh",
  subheading,
  children,
  className,
}: DynamicTextSliderProps) {
  const wordClasses =
    "font-heading font-bold tracking-tighter text-2xl text-neutral-dark sm:text-4xl md:text-6xl lg:text-7xl";

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <div className="max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {/* The full name lives in the heading; the slider's copy is visual only. */}
          <h1 className={wordClasses}>
            {topLine}
            <span className="sr-only"> {sliderWord}</span>
          </h1>
          <WordSlider word={sliderWord} wordClasses={wordClasses} />
        </div>

        {subheading && (
          <p className="mx-auto mt-6 max-w-2xl px-2 text-base text-neutral-dark/70 sm:mt-8 md:text-xl">{subheading}</p>
        )}

        {children && <div className="mt-6 flex justify-center">{children}</div>}
      </div>
    </div>
  );
}

/**
 * The slider sizes itself to its word with CSS, and the handles and clip are
 * stored as distances in from each edge, both starting at 0. So the first
 * paint is already correct at any screen size or font, with no JavaScript
 * measurement to wait for. (Measuring after load and then resizing was a
 * visible layout shift, the worst one on the page.) The box width is read
 * only when someone actually drags or nudges a handle.
 */
function WordSlider({ word, wordClasses }: { word: string; wordClasses: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [insetL, setInsetL] = useState(0);
  const [insetR, setInsetR] = useState(0);
  const [width, setWidth] = useState(0);
  const [dragging, setDragging] = useState<Handle | null>(null);

  // Current values for the window-level listeners, which would otherwise see stale state.
  const insets = useRef({ l: 0, r: 0 });
  insets.current = { l: insetL, r: insetR };
  const dragRef = useRef<DragState | null>(null);
  // Handlers read the width here: state would not update until the next
  // render, so the first moves of a drag would clamp against a width of 0.
  const widthRef = useRef(0);

  // offsetWidth is the layout width, unaffected by the rotation transform.
  const measure = () => {
    const w = rootRef.current?.offsetWidth ?? 0;
    widthRef.current = w;
    setWidth(w);
    return w;
  };

  // Tilt further the more the window is pushed off centre. At rest both insets
  // are 0, so this is the resting tilt whether or not the width is known yet.
  const rotation = width > 0 ? ROTATION_DEG + ((insetL - insetR) / width) * MAX_EXTRA_TILT : ROTATION_DEG;

  const startDrag = (handle: Handle, e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    measure();
    dragRef.current = {
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startInset: handle === "left" ? insets.current.l : insets.current.r,
    };
    setDragging(handle);
  };

  const moveDrag = useCallback(
    (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      // Project onto the slider's own axis so dragging feels natural at the tilt.
      const projected = (e.clientX - drag.startX) * COS_THETA + (e.clientY - drag.startY) * SIN_THETA;
      const { l, r } = insets.current;
      const w = widthRef.current;
      if (drag.handle === "left") {
        setInsetL(clamp(drag.startInset + projected, 0, w - r - MIN_RANGE));
      } else {
        // Moving the right handle rightwards shrinks its inset.
        setInsetR(clamp(drag.startInset - projected, 0, w - l - MIN_RANGE));
      }
    },
    []
  );

  const endDrag = useCallback(() => {
    dragRef.current = null;
    setDragging(null);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointermove", moveDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [moveDrag, endDrag]);

  const nudge = (handle: Handle) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const w = measure();
    const delta = e.key === "ArrowLeft" ? -10 : 10;
    const { l, r } = insets.current;
    if (handle === "left") setInsetL(clamp(l + delta, 0, w - r - MIN_RANGE));
    else setInsetR(clamp(r - delta, 0, w - l - MIN_RANGE));
  };

  return (
    <div
      ref={rootRef}
      className="relative h-11 select-none transition-transform duration-300 ease-out sm:h-16 md:h-[68px]"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-neutral-dark" />
      {(["left", "right"] as const).map((handle) => (
        <button
          key={handle}
          type="button"
          aria-label={handle === "left" ? "Adjust start" : "Adjust end"}
          onPointerDown={(e) => startDrag(handle, e)}
          onKeyDown={nudge(handle)}
          className={cn(
            "absolute top-0 z-20 flex h-full w-7 cursor-ew-resize items-center justify-center rounded-full",
            "border-2 border-neutral-dark bg-neutral-dark transition-transform duration-150 ease-in-out",
            "focus:outline-none focus:ring-2 focus:ring-google-blue",
            dragging === handle ? "scale-125" : "hover:scale-110"
          )}
          style={handle === "left" ? { left: insetL, touchAction: "none" } : { right: insetR, touchAction: "none" }}
        >
          <span className="h-8 w-1 rounded-full bg-white" />
        </button>
      ))}
      {/* In flow, so this word is what gives the slider its width. */}
      <div
        aria-hidden="true"
        className={cn("relative z-10 flex h-full items-center justify-center whitespace-nowrap px-8", wordClasses)}
        style={{ clipPath: `inset(0 ${insetR}px 0 ${insetL}px round 1rem)` }}
      >
        {word}
      </div>
    </div>
  );
}

export default DynamicTextSlider;
