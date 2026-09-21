"use client";

import { useEffect, useState } from "react";
import { CornerHandles } from "@/components/CornerHandles";
import { EVENT_START } from "@/lib/constants";

const UNITS = [
  ["days", 86_400_000],
  ["hours", 3_600_000],
  ["minutes", 60_000],
  ["seconds", 1_000],
] as const;

function split(ms: number) {
  let rest = Math.max(0, ms);
  return UNITS.map(([label, size]) => {
    const value = Math.floor(rest / size);
    rest -= value * size;
    return { label, value };
  });
}

export function Countdown() {
  // Null until mounted: the server and the first client paint agree on the
  // placeholder, and real digits only appear once a clock is available.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts = now === null ? null : split(EVENT_START - now);

  return (
    <section className="py-6">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-8">
        {UNITS.map(([label], i) => (
          <div key={label} className="relative">
            <div className="border-2 border-neutral-dark bg-white px-4 py-5 text-center text-neutral-dark">
              <span className="block font-heading text-4xl font-bold tabular-nums sm:text-5xl lg:text-6xl">
                {parts ? String(parts[i].value).padStart(2, "0") : "--"}
              </span>
              <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.3em] text-neutral-dark/60">
                {label}
              </span>
            </div>
            <CornerHandles />
          </div>
        ))}
      </div>
    </section>
  );
}
