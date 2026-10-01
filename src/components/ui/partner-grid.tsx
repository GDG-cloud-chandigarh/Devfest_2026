import Image from "next/image";
import { Handshake } from "lucide-react";

export interface Partner {
  name: string;
  /** e.g. "Community partner". */
  type: string;
  /** Path under /public, e.g. "/partners/acme.svg". Without one the tile shows a placeholder. */
  logo?: string;
  url?: string;
}

/** Partner logos as tiles, each linking out when the partner has a site. */
export function PartnerGrid({ partners }: { partners: Partner[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {partners.map((p, i) => {
        const tile = (
          <>
            <div className="relative flex aspect-[3/2] w-full items-center justify-center rounded-2xl border border-neutral-dark/10 bg-white p-6">
              {p.logo ? (
                <Image src={p.logo} alt={p.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-6" />
              ) : (
                <Handshake aria-hidden="true" strokeWidth={1.25} className="h-1/2 w-1/2 text-neutral-dark/20" />
              )}
            </div>
            <p className="mt-3 font-heading font-bold text-neutral-dark">{p.name}</p>
            <p className="text-sm text-neutral-dark/70">{p.type}</p>
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
