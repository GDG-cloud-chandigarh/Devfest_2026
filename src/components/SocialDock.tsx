import { Linkedin, Twitter, Instagram, Github, Mail } from "lucide-react";
import { GlassEffect, GlassFilter } from "@/components/ui/liquid-glass";
import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";

const SOCIALS = [
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: Linkedin, hover: "group-hover:text-[#0A66C2]" },
  { href: SOCIAL_LINKS.twitter, label: "X (Twitter)", Icon: Twitter, hover: "group-hover:text-black" },
  { href: SOCIAL_LINKS.instagram, label: "Instagram", Icon: Instagram, hover: "group-hover:text-[#E4405F]" },
  { href: SOCIAL_LINKS.github, label: "GitHub", Icon: Github, hover: "group-hover:text-black" },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Email", Icon: Mail, hover: "group-hover:text-google-red" },
];

/** Floating liquid-glass social dock, pinned bottom-center on every page. */
export function SocialDock() {
  return (
    <>
      <GlassFilter />
      <div className="pointer-events-none fixed inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-40 flex justify-center">
        <GlassEffect className="pointer-events-auto rounded-full p-2">
          <nav aria-label="Social links" className="flex items-center gap-1 px-2">
            {SOCIALS.map(({ href, label, Icon, hover }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
              >
                <Icon className={`h-5 w-5 text-neutral-dark transition-colors ${hover}`} />
              </a>
            ))}
          </nav>
        </GlassEffect>
      </div>
    </>
  );
}
