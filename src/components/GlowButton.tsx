import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeStyles = {
  sm: { button: "tracking-wide px-5 py-2.5 text-sm", icon: "h-3.5 w-3.5" },
  md: { button: "tracking-wide px-8 py-3.5 text-base", icon: "h-4 w-4" },
} as const;

interface GlowButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizeStyles;
  /** Hide the trailing arrow icon. */
  hideIcon?: boolean;
}

export function GlowButton({ href, children, className, size = "md", hideIcon = false }: GlowButtonProps) {
  const styles = sizeStyles[size];
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  const content = (
    <>
      {children}
      {!hideIcon && <ArrowRight className={styles.icon} />}
    </>
  );

  const classes = cn(
    "relative inline-flex items-center rounded-full bg-neutral-dark",
    "font-semibold text-white outline outline-1 outline-white/10",
    "transition-colors hover:bg-neutral-dark/90",
    styles.button,
    className
  );

  return (
    <div className="relative inline-block">
      {/* Colour-shifting halo in the Google palette; a CSS animation, see .gdg-glow. */}
      <span aria-hidden="true" className="gdg-glow pointer-events-none absolute inset-0 scale-95 rounded-full blur" />
      {isExternal ? (
        <a href={href} className={classes}>
          {content}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {content}
        </Link>
      )}
    </div>
  );
}
