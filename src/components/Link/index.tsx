import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LinkProps } from "./Link.types";

// CVA variants for Link
const linkVariants = cva(
  "inline-flex items-center gap-1.5 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative group cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "text-primary hover:text-primary/80 underline-offset-4 hover:underline font-medium",
        primary:
          "text-primary font-semibold hover:text-primary/80 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-primary after:to-primary/60 after:transition-all after:duration-300 hover:after:w-full after:rounded-full",
        secondary:
          "text-secondary font-semibold hover:text-secondary/80 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-secondary after:to-secondary/60 after:transition-all after:duration-300 hover:after:w-full after:rounded-full",
        accent:
          "text-accent font-semibold hover:text-accent/80 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-accent after:to-accent/60 after:transition-all after:duration-300 hover:after:w-full after:rounded-full",
        muted:
          "text-muted-foreground hover:text-foreground transition-colors duration-200",
        underline:
          "text-foreground underline underline-offset-4 decoration-2 decoration-primary/30 hover:decoration-primary transition-all duration-200 hover:text-primary",
        ghost:
          "text-foreground hover:bg-accent/15 hover:text-accent rounded-lg px-3 py-1.5 transition-all duration-200 hover:shadow-sm",
        button:
          "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg hover:shadow-primary/30 hover:brightness-110 active:brightness-90 transition-all duration-200 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:rounded-xl",
        glass:
          "backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 px-3 py-1.5 rounded-lg shadow-lg hover:bg-white/20 dark:hover:bg-black/20 hover:shadow-xl transition-all duration-200 text-foreground font-medium",
      },
      size: {
        sm: "text-sm gap-1",
        md: "text-base gap-1.5",
        lg: "text-lg gap-2",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none saturate-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false,
    },
  }
);

/**
 * Link Component
 *
 * A versatile link component with multiple variants, external link detection,
 * and accessibility features.
 *
 * @example
 * ```tsx
 * // Basic link
 * <Link href="/about">About</Link>
 *
 * // Primary variant with animated underline
 * <Link variant="primary" href="/docs">
 *   Documentation
 * </Link>
 *
 * // External link (auto-detects and shows icon)
 * <Link external href="https://example.com">
 *   Visit Site
 * </Link>
 *
 * // Button style link
 * <Link variant="button" href="/get-started">
 *   Get Started
 * </Link>
 *
 * // With custom icon
 * <Link icon={<Star size={16} />} href="/featured">
 *   Featured Content
 * </Link>
 * ```
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = "default",
      size = "md",
      external = false,
      disabled = false,
      showUnderline = false,
      icon,
      children,
      className,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    // Auto-set target and rel for external links
    const isExternal = external || target === "_blank";
    const finalTarget = isExternal ? "_blank" : target;
    const finalRel = isExternal ? rel || "noopener noreferrer" : rel;

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        target={finalTarget}
        rel={finalRel}
        className={cn(
          linkVariants({ variant, size, disabled }),
          showUnderline &&
            variant !== "primary" &&
            variant !== "secondary" &&
            variant !== "accent" &&
            "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full",
          className
        )}
        aria-disabled={disabled}
        {...props}
      >
        {/* Custom icon */}
        {icon && (
          <span className="inline-flex items-center justify-center transition-transform group-hover:scale-110">
            {icon}
          </span>
        )}

        {/* Link text */}
        <span className="relative">{children}</span>

        {/* External link icon */}
        {isExternal && !disabled && (
          <svg
            className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}

        {/* Glow effect for button variant */}
        {variant === "button" && (
          <span className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 -z-10 rounded-xl"></span>
        )}
      </a>
    );
  }
);

Link.displayName = "Link";

export default Link;
export { linkVariants };
