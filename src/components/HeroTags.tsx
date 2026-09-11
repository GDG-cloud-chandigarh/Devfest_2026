"use client";

import { useEffect, useState } from "react";
import { Gravity, MatterBody } from "@/components/ui/gravity";

// Audience/topic tags that pile up at the foot of the hero. Drag them around.
const TAGS: { label: string; className: string }[] = [
  { label: "Hackathon", className: "bg-[#E9E9E9]" },
  { label: "Cybersecurity", className: "bg-[#A8D8F0]" },
  { label: "Gemini", className: "bg-[#FCC934]" },
  { label: "Firebase studio", className: "bg-[#2E9BE8] text-white" },
  { label: "Cloud", className: "bg-[#F06898] text-white" },
  { label: "AI Enthusiast", className: "bg-[#CDE9F7]" },
  { label: "VR & AR", className: "bg-[#FDE8A8]" },
  { label: "AI Enthusiast", className: "bg-[#C8EBD4]" },
  { label: "Web3 Enthusiasts", className: "bg-[#FADCE1]" },
  { label: "AI Developers", className: "bg-[#C5E8CE]" },
  { label: "Product Designers", className: "bg-[#FDE9B8]" },
  { label: "Web", className: "bg-[#57BB63] text-white" },
  { label: "Developers", className: "bg-[#E9E9E9]" },
  { label: "Vibe coding", className: "bg-[#F0559A] text-white" },
  { label: "+ more", className: "bg-[#CDE9F7]" },
  { label: "Brand Designers", className: "bg-[#FADCE1]" },
  { label: "Mobile", className: "bg-[#FBC02D]" },
  { label: "Techies", className: "bg-[#C8EBD4]" },
  { label: "AI/ML", className: "bg-[#4CAF50] text-white" },
];

const PILL = "whitespace-nowrap rounded-full border border-ink/10 px-5 py-2.5 text-xs font-semibold shadow-sm sm:text-sm";

export function HeroTags() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reducedMotion) {
    return (
      <div className="flex flex-wrap items-end justify-center gap-2 p-4">
        {TAGS.map((tag, i) => (
          <span key={`${tag.label}-${i}`} className={`${tag.className} ${PILL}`}>
            {tag.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Screen readers get the plain list; the physics layer is decorative. */}
      <ul className="sr-only">
        {TAGS.map((tag, i) => (
          <li key={`${tag.label}-${i}`}>{tag.label}</li>
        ))}
      </ul>
      <div className="absolute inset-0" aria-hidden="true">
        <Gravity gravity={{ x: 0, y: 1 }} className="h-full w-full">
          {TAGS.map((tag, i) => (
            <MatterBody
              key={`${tag.label}-${i}`}
              matterBodyOptions={{ friction: 0.6, restitution: 0.15 }}
              x={`${8 + ((i * 17) % 80)}%`}
              y={`${-20 - i * 8}%`}
              angle={((i % 5) - 2) * 12}
            >
              <div className={`${tag.className} ${PILL} cursor-grab active:cursor-grabbing`}>
                {tag.label}
              </div>
            </MatterBody>
          ))}
        </Gravity>
      </div>
    </>
  );
}
