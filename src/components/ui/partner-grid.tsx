import Image from "next/image";
import { Handshake } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Partner {
  name: string;
  /** e.g. "Community partner". Leave out when a heading already says it. */
  type?: string;
  /** Path under /public, e.g. "/partners/acme.svg". Without one the tile shows a placeholder. */
  logo?: string;
  url?: string;
  /** For logos drawn in white, which vanish on the default white tile. */
  darkTile?: boolean;
}

/** Partner logos as tiles, each linking out when the partner has a site. */
export function PartnerGrid({ partners, className }: { partners: Partner[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {partners.map((p, i) => {
        const tile = (
          <>
            <div
              className={`relative flex aspect-[3/2] w-full items-center justify-center rounded-2xl border border-neutral-dark/10 p-6 ${p.darkTile ? "bg-neutral-dark" : "bg-white"}`}
            >
              {p.logo ? (
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  // The optimizer rejects SVG, and a vector needs no resizing anyway.
                  unoptimized={p.logo.endsWith(".svg")}
                  className="object-contain p-3 sm:p-4"
                />
              ) : (
                <Handshake aria-hidden="true" strokeWidth={1.25} className="h-1/2 w-1/2 text-neutral-dark/20" />
              )}
            </div>
            <p className="mt-3 font-heading font-bold text-neutral-dark">{p.name}</p>
            {p.type && <p className="text-sm text-neutral-dark/70">{p.type}</p>}
          </>
        );
        return (
          <li key={i} className="text-center">
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-80">
                {tile}
              </a>
            ) : (
              tile
            )}
          </li>
        );
      })}
    </ul>
  );
}
