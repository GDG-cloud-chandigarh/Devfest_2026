"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Lockup } from "./Lockup";
import { NavHeader } from "./ui/nav-header";

const NAV_LINKS = [
  { href: "#speakers", label: "Speakers" },
  { href: "#schedule", label: "Schedule" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#team", label: "Team" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 pt-4 sm:pt-6">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-center px-4">
        <Link
          href="/"
          className="absolute inset-y-0 left-4 flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <Lockup />
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Primary">
          <NavHeader items={NAV_LINKS} className="border-2 border-neutral-dark bg-white/90 shadow-sm backdrop-blur" />
        </nav>

        {/* Chapter lockup, moved here so it appears once rather than in every section. */}
        <Image
          src="/images/gdgcchd_black.png"
          alt="Google Developer Groups Cloud Chandigarh"
          width={1863}
          height={312}
          className="absolute right-4 hidden h-8 w-auto md:block"
        />

        <button
          type="button"
          className="absolute inset-y-0 right-4 flex items-center md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-neutral-light bg-white px-4 pb-4 md:hidden" aria-label="Primary mobile">
          <ul className="flex flex-col gap-3 pt-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block text-sm font-medium text-neutral-dark" onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
