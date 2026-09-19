"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Github, Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import { DarkGrid } from "@/components/DarkGrid";
import { Ticker } from "@/components/Ticker";
import { CODE_OF_CONDUCT_URL, CONTACT_EMAIL, EVENTS_URL, SOCIAL_LINKS, TICKETS_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
  Footer-scoped styles. The glass and glow recipes below were written against
  shadcn's --foreground / --background / --primary tokens, so those are set
  here from the site palette rather than rewriting every color-mix() call.
*/
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-body), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;

  --foreground: #ffffff;
  --background: #1E1E1E;
  --primary: #4285F4;
  --secondary: #FBBC04;

  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}


.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }

@media (prefers-reduced-motion: reduce) {
  .animate-footer-breathe { animation: none; }
}


.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 15%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 15%, transparent) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 20px 40px -10px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-family: var(--font-heading), system-ui, sans-serif;
  font-size: 12vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 8%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
}
`;

// -------------------------------------------------------------------------
// Magnetic button: leans toward the cursor, springs back on leave.
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const element = localRef.current;
      if (!element) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);
        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// Content
// -------------------------------------------------------------------------
const SOCIALS = [
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SOCIAL_LINKS.twitter, label: "X", Icon: Twitter },
  { href: SOCIAL_LINKS.instagram, label: "Instagram", Icon: Instagram },
  { href: SOCIAL_LINKS.youtube, label: "YouTube", Icon: Youtube },
  { href: SOCIAL_LINKS.github, label: "GitHub", Icon: Github },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Email", Icon: Mail },
];


const PILL = "footer-glass-pill rounded-full flex items-center gap-3 text-white";

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 95%", end: "bottom bottom", scrub: 1 },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 85%", end: "bottom bottom", scrub: 1 },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/*
        Curtain reveal. The wrapper sits in normal flow and clips its subtree,
        so the fixed footer beneath only paints inside the wrapper's box and
        appears to slide out from under the page as the wrapper scrolls in.
      */}
      <div ref={wrapperRef} className="relative h-[50vh] w-full" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-[50vh] w-full flex-col justify-between overflow-hidden bg-neutral-dark text-white">
          <div className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[40vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px]" />
          <DarkGrid />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text pointer-events-none absolute -bottom-[2vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
            aria-hidden="true"
          >
            DEVFEST
          </div>

          <Ticker className="absolute left-0 top-6 z-10 bg-neutral-dark/60 backdrop-blur-md" />

          {/* Centre */}
          <div className="relative z-10 mx-auto mt-14 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
            <h2
              ref={headingRef}
              className="footer-text-glow mb-6 text-center font-heading text-3xl font-black tracking-tighter md:text-5xl"
            >
              See you in Chandigarh.
            </h2>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-3">
              <div className="flex w-full flex-wrap justify-center gap-4">
                <MagneticButton as="a" href={TICKETS_URL} className={cn(PILL, "px-7 py-3 text-sm font-bold")}>
                  Get Tickets
                </MagneticButton>
                <MagneticButton as="a" href={EVENTS_URL} className={cn(PILL, "px-7 py-3 text-sm font-bold")}>
                  View all events
                </MagneticButton>
              </div>

              <div className="flex w-full flex-wrap justify-center gap-2 md:gap-3">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <MagneticButton
                    key={label}
                    as="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(PILL, "h-10 w-10 justify-center text-white/60 hover:text-white")}
                  >
                    <Icon className="h-5 w-5" />
                  </MagneticButton>
                ))}
                <MagneticButton
                  as="a"
                  href={CODE_OF_CONDUCT_URL}
                  className={cn(PILL, "px-5 py-2.5 text-xs font-medium text-white/60 hover:text-white")}
                >
                  Code of Conduct
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-4 px-6 pb-5 md:flex-row md:px-12">
            <p className="max-w-md text-center text-[10px] font-semibold uppercase tracking-widest text-white/50 md:text-left md:text-xs">
              &copy; 2026 GDG Cloud Chandigarh.
            </p>


            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className={cn(PILL, "group h-12 w-12 justify-center text-white/60 hover:text-white")}
            >
              <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
