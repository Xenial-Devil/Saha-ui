import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LinkProps } from "./Link.types";

// CVA variants for Link
const linkVariants = cva(
  "inline-flex items-center gap-1.5 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative group",
  {
    variants: {
      variant: {
        default:
          "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
        primary:
          "text-primary font-medium hover:text-primary/80 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
        muted: "text-muted-foreground hover:text-foreground transition-colors",
        underline:
          "text-foreground underline underline-offset-4 decoration-2 decoration-primary/30 hover:decoration-primary transition-colors",
        ghost:
          "text-foreground hover:bg-accent/10 hover:text-accent rounded-md px-3 py-1.5 transition-all",
        button:
          "bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg hover:brightness-110 active:brightness-90 transition-all",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
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

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = "default",
      size = "md",
      external = false,
      disabled = false,
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
        className={cn(linkVariants({ variant, size, disabled }), className)}
        aria-disabled={disabled}
        {...props}
      >
        {children}

        {/* External link icon */}
        {isExternal && !disabled && (
          <svg
            className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity"
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
      </a>
    );
  }
);

Link.displayName = "Link";

export default Link;
