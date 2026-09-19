"use client";

import { useEffect, useState } from "react";
import { Gravity, MatterBody } from "@/components/ui/gravity";

const HERO_TAGS = [
  { label: "Hackathon", bg: "bg-[#E9E9E9]", text: "text-neutral-dark" },
  { label: "Gemini", bg: "bg-google-yellow", text: "text-neutral-dark" },
  { label: "Firebase studio", bg: "bg-google-blue", text: "text-neutral-dark" },
  { label: "Cloud", bg: "bg-[#F06898]", text: "text-neutral-dark" },
  { label: "AI Enthusiast", bg: "bg-[#CDE9F7]", text: "text-neutral-dark" },
  { label: "VR & AR", bg: "bg-[#FDE8A8]", text: "text-neutral-dark" },
  { label: "AI Agents", bg: "bg-[#C8EBD4]", text: "text-neutral-dark" },
  { label: "AI Developers", bg: "bg-google-red", text: "text-neutral-dark" },
  { label: "Product Designers", bg: "bg-[#FDE8A8]", text: "text-neutral-dark" },
  { label: "Web", bg: "bg-google-green", text: "text-neutral-dark" },
  { label: "Orchestration", bg: "bg-[#FADCE1]", text: "text-neutral-dark" },
  { label: "Mobile", bg: "bg-google-yellow", text: "text-neutral-dark" },
  { label: "AI/ML", bg: "bg-google-green", text: "text-neutral-dark" },
];

// Smaller than the GDG hero's pills: 13 tags instead of 8 have to share the screen.
const PILL = "rounded-full border-2 border-neutral-dark px-5 py-3 text-sm font-bold sm:px-8 sm:py-5 sm:text-xl md:px-12 md:py-6 md:text-2xl lg:px-14 lg:py-7 lg:text-3xl";

export function HeroTags() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
  }, []);

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-3 p-8">
        {HERO_TAGS.map((tag, i) => (
          <span key={`${tag.label}-${i}`} className={`${PILL} ${tag.bg} ${tag.text}`}>
            {tag.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <>
      <ul className="sr-only">
        {HERO_TAGS.map((tag, i) => (
          <li key={`${tag.label}-${i}`}>{tag.label}</li>
        ))}
      </ul>
      <div className="absolute inset-0" aria-hidden="true">
        {/*
          No top wall, and every pill starts above the frame on its own row, so
          they drop in one at a time. Spawning them inside the canvas (as the
          GDG hero does with 8 small pills) makes 19 pills this size overlap at
          rest, and Matter resolves that overlap by firing them through the
          walls, which leaves the hero empty.
        */}
        <Gravity gravity={{ x: 0, y: 1 }} addTopWall={false} className="h-full w-full">
          {HERO_TAGS.map((tag, i) => (
            <MatterBody
              key={`${tag.label}-${i}`}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x={`${8 + ((i * 23) % 84)}%`}
              y={`${-10 - i * 14}%`}
              angle={((i % 5) - 2) * 12}
            >
              <div className={`${PILL} ${tag.bg} ${tag.text} shadow-md`}>{tag.label}</div>
            </MatterBody>
          ))}
        </Gravity>
      </div>
    </>
  );
}
