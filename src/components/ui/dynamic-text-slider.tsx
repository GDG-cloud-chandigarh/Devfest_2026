"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * Slider constants
 */
const MIN_RANGE = 50; // px – minimum gap between the two handles
const ROTATION_DEG = -2.76; // matches CSS transform
const THETA = ROTATION_DEG * (Math.PI / 180);
const COS_THETA = Math.cos(THETA);
const SIN_THETA = Math.sin(THETA);

/** Utility */
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

type Handle = "left" | "right";

interface DragState {
  handle: Handle;
  startX: number;
  startY: number;
  initialLeft: number;
  initialRight: number;
}

export interface DynamicTextSliderProps {
  /** Static first line of the headline. */
  topLine?: string;
  /** Second line — the word the slider reveals/clips. */
  sliderWord?: string;
  /** Optional supporting copy under the headline. */
  subheading?: string;
  /** Optional call-to-action (e.g. a button) rendered below the copy. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * A two-line headline whose second line is housed inside an interactive,
 * rotated range-slider. The visible width is measured from an off-screen copy
 * of the word so the clip aligns precisely regardless of font-loading or
 * viewport size.
 */
export function DynamicTextSlider({
  topLine = "GDG Cloud",
  sliderWord = "Chandigarh",
  subheading,
  children,
  className,
}: DynamicTextSliderProps) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(408); // sensible default until measured

  // Re-measure whenever fonts load, the word changes, or the viewport resizes
  useEffect(() => {
    const measure = () => setTextWidth(measureRef.current?.clientWidth ?? 408);
    measure();
    window.addEventListener("resize", measure);
    const node = measureRef.current;
    const ro = new ResizeObserver(measure);
    if (node) ro.observe(node);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [sliderWord]);

  const wordClasses =
    "font-heading font-bold tracking-tighter text-2xl text-neutral-dark sm:text-4xl md:text-6xl lg:text-7xl";

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <div className="max-w-5xl">
        {/* Headline on a single line: static word + the framed slider word */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <h1 className={wordClasses}>{topLine}</h1>
          <WordSlider width={textWidth} word={sliderWord} wordClasses={wordClasses} />
        </div>

        {/* Hidden copy for width-measurement. Font metrics must match the visible slider text. */}
        <span ref={measureRef} className={cn("absolute -left-[9999px] px-4 whitespace-nowrap", wordClasses)}>
          {sliderWord}
        </span>

        {subheading && (
          <p className="mx-auto mt-6 max-w-2xl px-2 text-base text-neutral-dark/70 sm:mt-8 md:text-xl">
            {subheading}
          </p>
        )}

        {children && <div className="mt-6 flex justify-center">{children}</div>}
      </div>
    </div>
  );
}

interface WordSliderProps {
  width: number;
  word: string;
  wordClasses: string;
  handleSize?: number;
  onChange?: (state: { left: number; right: number; range: number }) => void;
}

/**
 * A two-handle slider that is itself rotated. The rotation angle changes
 * dynamically based on handle positions; dragging is projected onto the
 * rotated axis so the handles feel natural.
 */
function WordSlider({ width: initialWidth, word, wordClasses, handleSize = 28, onChange }: WordSliderProps) {
  const width = initialWidth > 0 ? initialWidth + 35 : 0;

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(width);
  const [draggingHandle, setDraggingHandle] = useState<Handle | null>(null);
  const [dynamicRotation, setDynamicRotation] = useState(ROTATION_DEG);

  const leftRef = useRef(left);
  const rightRef = useRef(right);
  const dragRef = useRef<DragState | null>(null);

  useEffect(() => {
    leftRef.current = left;
    rightRef.current = right;
    onChange?.({ left, right, range: right - left });
  }, [left, right, onChange]);

  // Calculate and set the dynamic rotation from the handle midpoint
  useEffect(() => {
    if (width > 0) {
      const handleMidpoint = (left + right) / 2;
      const sliderCenter = width / 2;
      const deviationFactor = (handleMidpoint - sliderCenter) / sliderCenter;
      const maxAdditionalTilt = 3;
      setDynamicRotation(ROTATION_DEG + deviationFactor * maxAdditionalTilt);
    }
  }, [left, right, width]);

  useEffect(() => setRight(width), [width]);

  const startDrag = (handle: Handle, e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: leftRef.current,
      initialRight: rightRef.current,
    };
    setDraggingHandle(handle);
  };

  const moveDrag = useCallback(
    (e: PointerEvent) => {
      if (!dragRef.current) return;
      const { handle, startX, startY, initialLeft, initialRight } = dragRef.current;
      const dX = e.clientX - startX;
      const dY = e.clientY - startY;
      // Project onto the original angle for consistent drag feel
      const projected = dX * COS_THETA + dY * SIN_THETA;
      if (handle === "left") {
        setLeft(clamp(initialLeft + projected, 0, rightRef.current - MIN_RANGE));
      } else {
        setRight(clamp(initialRight + projected, leftRef.current + MIN_RANGE, width));
      }
    },
    [width]
  );

  const endDrag = useCallback(() => {
    dragRef.current = null;
    setDraggingHandle(null);
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

  const nudgeHandle = (handle: Handle) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const delta = e.key === "ArrowLeft" ? -10 : 10;
    if (handle === "left") {
      setLeft((prev) => clamp(prev + delta, 0, rightRef.current - MIN_RANGE));
    } else {
      setRight((prev) => clamp(prev + delta, leftRef.current + MIN_RANGE, width));
    }
  };

  return (
    <div
      className="relative h-11 select-none transition-transform duration-300 ease-out sm:h-16 md:h-[68px]"
      style={{ width, transform: `rotate(${dynamicRotation}deg)` }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-neutral-dark" />
      {(["left", "right"] as const).map((handle) => {
        const x = handle === "left" ? left : right - handleSize;
        const scaleClass = draggingHandle === handle ? "scale-125" : "hover:scale-110";

        return (
          <button
            key={handle}
            type="button"
            aria-label={handle === "left" ? "Adjust start" : "Adjust end"}
            onPointerDown={(e) => startDrag(handle, e)}
            onKeyDown={nudgeHandle(handle)}
            className={cn(
              "absolute top-0 z-20 flex h-full w-7 cursor-ew-resize items-center justify-center rounded-full",
              "border-2 border-neutral-dark bg-neutral-dark transition-transform duration-150 ease-in-out",
              "focus:outline-none focus:ring-2 focus:ring-google-blue",
              scaleClass
            )}
            style={{ left: x, touchAction: "none" }}
          >
            <span className="h-8 w-1 rounded-full bg-white" />
          </button>
        );
      })}
      <div
        className={cn("z-10 flex h-full w-full items-center justify-center overflow-hidden whitespace-nowrap px-4", wordClasses)}
        style={{ clipPath: `inset(0 ${width - right}px 0 ${left}px round 1rem)` }}
      >
        {word}
      </div>
    </div>
  );
}

export default DynamicTextSlider;
