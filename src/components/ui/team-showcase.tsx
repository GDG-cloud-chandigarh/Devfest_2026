"use client";

import { useState } from "react";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

type HoverProps = { hoveredId: string | null; onHover: (id: string | null) => void };

/*
  Staggered photo columns beside a list of names. Hovering either side
  lights up that person in both: photo in colour, name in full, the rest dim.
  Focus does the same, so keyboard users get the LinkedIn link too.
*/
export function TeamShowcase({ members }: { members: TeamMember[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hover = { hoveredId, onHover: setHoveredId };

  const columns = [0, 1, 2].map((c) => members.filter((_, i) => i % 3 === c));
  // Slightly different sizes and drops per column give the collage its stagger.
  const sizes = [
    "w-[100px] h-[110px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]",
    "w-[108px] h-[118px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]",
    "w-[104px] h-[114px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]",
  ];
  const drops = ["", "mt-[48px] sm:mt-[56px] md:mt-[68px]", "mt-[22px] sm:mt-[26px] md:mt-[32px]"];

  return (
    <div className="mx-auto flex w-full max-w-5xl select-none flex-col items-center gap-10 md:flex-row md:items-start lg:gap-14">
      <div aria-hidden="true" className="flex flex-shrink-0 gap-2 md:gap-3">
        {columns.map((col, c) => (
          <div key={c} className={cn("flex flex-col gap-2 md:gap-3", drops[c])}>
            {col.map((member) => (
              <PhotoCard key={member.id} member={member} className={sizes[c]} {...hover} />
            ))}
          </div>
        ))}
      </div>

      <ul className="grid w-full flex-1 gap-5 sm:grid-cols-2 md:flex md:flex-col md:pt-2">
        {members.map((member) => (
          <MemberRow key={member.id} member={member} {...hover} />
        ))}
      </ul>
    </div>
  );
}

function PhotoCard({ member, className, hoveredId, onHover }: { member: TeamMember; className: string } & HoverProps) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        "relative flex-shrink-0 overflow-hidden rounded-xl transition-opacity duration-300",
        className,
        isDimmed ? "opacity-60" : "opacity-100"
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Image
        src={member.image}
        alt=""
        fill
        sizes="180px"
        className={cn(
          "object-cover transition-[filter] duration-500",
          isActive ? "grayscale-0 brightness-100" : "grayscale brightness-[0.8]"
        )}
      />
    </div>
  );
}

function MemberRow({ member, hoveredId, onHover }: { member: TeamMember } & HoverProps) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <li
      className={cn("transition-opacity duration-300", isDimmed ? "opacity-50" : "opacity-100")}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(member.id)}
      onBlur={() => onHover(null)}
    >
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className={cn(
            "h-3 flex-shrink-0 rounded-[5px] transition-all duration-300",
            isActive ? "w-5 bg-neutral-dark" : "w-4 bg-neutral-dark/25"
          )}
        />
        <span className="font-heading text-base font-semibold leading-none tracking-tight text-neutral-dark md:text-lg">
          {member.name}
        </span>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className={cn(
              "rounded p-1 text-neutral-dark/70 transition-all duration-200 hover:bg-neutral-dark/10 hover:text-neutral-dark",
              isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
            )}
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      <p className="mt-1.5 pl-[26px] text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-dark/70">
        {member.role}
      </p>
    </li>
  );
}
