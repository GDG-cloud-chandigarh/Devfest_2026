"use client";

import { useEffect, useRef } from "react";

const GAP = 16; // must match the gap-4 on the track below
const SPEED = 1.5; // px per frame, roughly 90px/s at 60Hz

/**
 * Horizontally scrolling band that drifts on its own and hands control to the
 * reader on hover. Driven by scrollLeft rather than a CSS transform, so the
 * automatic drift and the reader's own scrolling share one coordinate system.
 *
 * Children are expected to be two identical copies of the list, each marked
 * with data-copy. Resting position is one copy in, leaving a full copy of
 * slack either side so the reader can scroll both ways without hitting an end.
 */
export function MarqueeTrack({ children }: { children: React.ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let held = false;
    let width = 0;
    let frame = 0;

    const measure = () => {
      const copy = el.querySelector<HTMLElement>("[data-copy]");
      width = copy ? copy.offsetWidth + GAP : 0;
    };

    const wrap = () => {
      if (!width) return;
      if (el.scrollLeft >= width * 2) el.scrollLeft -= width;
      else if (el.scrollLeft <= 0) el.scrollLeft += width;
    };

    measure();
    if (width) el.scrollLeft = width;

    const step = () => {
      if (!held && !reduced.matches && width) {
        el.scrollLeft += SPEED;
        wrap();
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    const hold = () => {
      held = true;
    };
    const release = () => {
      held = false;
    };

    // While held, a plain vertical wheel drives the band sideways, so a mouse
    // without a horizontal axis can still steer it.
    const onWheel = (event: WheelEvent) => {
      if (!held) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!delta) return;
      event.preventDefault();
      el.scrollLeft += delta;
      wrap();
    };

    const onResize = () => {
      measure();
      wrap();
    };

    el.addEventListener("pointerenter", hold);
    el.addEventListener("pointerleave", release);
    el.addEventListener("focusin", hold);
    el.addEventListener("focusout", release);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", wrap);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", hold);
      el.removeEventListener("pointerleave", release);
      el.removeEventListener("focusin", hold);
      el.removeEventListener("focusout", release);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", wrap);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={viewport} className="marquee mt-8 overflow-x-auto overscroll-x-contain">
      <div className="flex w-max gap-4">{children}</div>
    </div>
  );
}
