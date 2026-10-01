import Image from "next/image";
import { Globe, Linkedin, UserRound } from "lucide-react";

export interface Speaker {
  name: string;
  /** Job title and company, e.g. "Developer Advocate, Google". */
  role: string;
  /** Talk title, once confirmed. */
  topic?: string;
  /** Path under /public, e.g. "/speakers/jane.jpg". Without one the card shows a placeholder. */
  image?: string;
  linkedin?: string;
  website?: string;
}

const iconLink = "rounded-full p-2 text-neutral-dark transition-colors hover:bg-neutral-light";

/** Speaker cards in a responsive grid: photo, name, role, talk and links. */
export function SpeakerGrid({ speakers }: { speakers: Speaker[] }) {
  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {speakers.map((s, i) => (
        <li key={i} className="group flex flex-col items-center text-center">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-neutral-light">
            {s.image ? (
              <Image
                src={s.image}
                alt={s.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-[filter] duration-300 group-hover:grayscale"
              />
            ) : (
              <UserRound aria-hidden="true" strokeWidth={1.25} className="absolute inset-0 m-auto h-1/2 w-1/2 text-neutral-dark/20" />
            )}
          </div>
          <h3 className="mt-5 font-heading text-xl font-bold text-neutral-dark">{s.name}</h3>
          <p className="mt-1 text-sm text-neutral-dark/70">{s.role}</p>
          {s.topic && <p className="mt-2 text-sm font-medium text-neutral-dark">{s.topic}</p>}
          {(s.linkedin || s.website) && (
            <div className="mt-3 flex gap-1">
              {s.website && (
                <a href={s.website} target="_blank" rel="noopener noreferrer" aria-label={`${s.name}'s website`} className={iconLink}>
                  <Globe className="h-4 w-4" />
                </a>
              )}
              {s.linkedin && (
                <a href={s.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} on LinkedIn`} className={iconLink}>
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
