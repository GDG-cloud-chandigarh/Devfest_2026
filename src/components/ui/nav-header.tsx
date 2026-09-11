"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavHeaderItem {
  href: string;
  label: string;
}

interface CursorPosition {
  left: number;
  width: number;
  opacity: number;
  [key: string]: number;
}

interface NavHeaderProps {
  items: NavHeaderItem[];
  className?: string;
}

export function NavHeader({ items, className }: NavHeaderProps) {
  const [position, setPosition] = useState<CursorPosition>({ left: 0, width: 0, opacity: 0 });
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <ul
      className={cn("relative flex items-center rounded-full border border-neutral-light p-1", className)}
      onMouseLeave={() => {
        setPosition((pv) => ({ ...pv, opacity: 0 }));
        setHoveredHref(null);
      }}
    >
      {items.map((item) => (
        <Tab
          key={item.href}
          href={item.href}
          isActive={hoveredHref === item.href}
          onHover={(left, width) => {
            setPosition({ left, width, opacity: 1 });
            setHoveredHref(item.href);
          }}
        >
          {item.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

interface TabProps {
  href: string;
  children: ReactNode;
  isActive: boolean;
  onHover: (left: number, width: number) => void;
}

function Tab({ href, children, isActive, onHover }: TabProps) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      className="relative z-10"
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        onHover(ref.current.offsetLeft, width);
      }}
    >
      <Link
        href={href}
        className={cn(
          "block rounded-full px-4 py-2 text-sm font-medium transition-colors",
          isActive ? "text-white" : "text-neutral-dark"
        )}
      >
        {children}
      </Link>
    </li>
  );
}

function Cursor({ position }: { position: CursorPosition }) {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="absolute inset-y-1 z-0 rounded-full bg-neutral-dark"
    />
  );
}
