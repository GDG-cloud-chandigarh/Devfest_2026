const NAV_LINKS = ["Speakers", "Schedule", "Sponsors", "Team"];

// Scattered audience/topic tags at the foot of the hero. `rotate` is a Tailwind
// arbitrary value so the pile looks hand-tossed rather than grid-aligned.
const TAGS: { label: string; className: string; rotate: string }[] = [
  { label: "Hackathon", className: "bg-[#E9E9E9]", rotate: "-rotate-[7deg]" },
  { label: "Cybersecurity", className: "bg-[#A8D8F0]", rotate: "-rotate-[14deg]" },
  { label: "Gemini", className: "bg-[#FCC934]", rotate: "-rotate-[72deg]" },
  { label: "Firebase studio", className: "bg-[#2E9BE8] text-white", rotate: "rotate-[2deg]" },
  { label: "Cloud", className: "bg-[#F06898] text-white", rotate: "-rotate-[4deg]" },
  { label: "AI Enthusiast", className: "bg-[#CDE9F7]", rotate: "rotate-[3deg]" },
  { label: "VR & AR", className: "bg-[#FDE8A8]", rotate: "-rotate-[5deg]" },
  { label: "AI Enthusiast", className: "bg-[#C8EBD4]", rotate: "rotate-[4deg]" },
  { label: "Web3 Enthusiasts", className: "bg-[#FADCE1]", rotate: "-rotate-[12deg]" },
  { label: "AI Developers", className: "bg-[#C5E8CE]", rotate: "rotate-[2deg]" },
  { label: "Product Designers", className: "bg-[#FDE9B8]", rotate: "rotate-[6deg]" },
  { label: "Web", className: "bg-[#57BB63] text-white", rotate: "-rotate-[9deg]" },
  { label: "Developers", className: "bg-[#E9E9E9]", rotate: "rotate-[8deg]" },
  { label: "Vibe coding", className: "bg-[#F0559A] text-white", rotate: "-rotate-[6deg]" },
  { label: "+ more", className: "bg-[#CDE9F7]", rotate: "rotate-[11deg]" },
  { label: "Brand Designers", className: "bg-[#FADCE1]", rotate: "-rotate-[3deg]" },
  { label: "Mobile", className: "bg-[#FBC02D]", rotate: "rotate-[7deg]" },
  { label: "Techies", className: "bg-[#C8EBD4]", rotate: "-rotate-[5deg]" },
  { label: "AI/ML", className: "bg-[#4CAF50] text-white", rotate: "rotate-[10deg]" },
];

function ArrowPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 text-sm font-semibold text-white transition hover:bg-ink/85"
    >
      {children}
      <span
        aria-hidden="true"
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-base leading-none text-ink"
      >
        &#8599;
      </span>
    </a>
  );
}

function Lockup() {
  return (
    <a href="/" className="flex items-center gap-1" aria-label="DevFest Chandigarh">
      <span aria-hidden="true" className="text-5xl font-bold leading-none text-[#FBC02D]">
        &#123;
      </span>
      <span className="flex flex-col items-center gap-1">
        <span className="text-2xl font-bold leading-none">DevFest</span>
        <span className="rounded-full border border-ink bg-white px-3 py-0.5 text-[0.6rem] font-medium leading-tight">
          Chandigarh
        </span>
      </span>
      <span aria-hidden="true" className="text-5xl font-bold leading-none text-[#FBC02D]">
        &#125;
      </span>
    </a>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col overflow-hidden">
      <header className="px-5 pt-6 sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Lockup />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-ink/80 transition hover:text-ink"
              >
                {link}
              </a>
            ))}
          </nav>
          <ArrowPill href="#tickets">Get Tickets</ArrowPill>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-5 pt-12 text-center sm:pt-16">
        <p className="text-xs font-medium text-ink/60">headline Sponsor</p>
        {/* Placeholder slot — drop the real sponsor wordmark in once it's confirmed. */}
        <p className="mt-2 text-xl font-bold tracking-tight text-ink/30">your logo here</p>

        <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          DevFest Chandigarh
        </h1>
        <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-ink/60 sm:text-base">
          Join us at DevFest Chandigarh 2026 from October 23rd &ndash; 25th. Chandigarh&apos;s largest
          tech celebration of the year!
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ArrowPill href="#tickets">Get Tickets Day 1 &amp; 2</ArrowPill>
          <ArrowPill href="#tickets">Get Tickets Day 3</ArrowPill>
        </div>

        <ul className="mx-auto mt-14 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-1 pb-8">
          {TAGS.map((tag, i) => (
            <li
              key={`${tag.label}-${i}`}
              className={`${tag.className} ${tag.rotate} whitespace-nowrap rounded-full border border-ink/10 px-5 py-2.5 text-xs font-semibold shadow-sm sm:text-sm`}
            >
              {tag.label}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
