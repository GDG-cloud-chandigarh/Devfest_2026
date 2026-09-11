import { HeroTags } from "@/components/HeroTags";

const NAV_LINKS = ["Speakers", "Schedule", "Sponsors", "Team"];


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

      <main className="flex flex-col items-center px-5 pt-12 text-center sm:pt-16">
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

      </main>

      {/* Drag the pills around — matter-js drops them into a pile here. */}
      <div className="relative w-full flex-1 min-h-[240px]">
        <HeroTags />
      </div>
    </div>
  );
}
