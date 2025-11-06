"use client";

import React from "react";

import { cn } from "../../lib/utils";
import type { BadgeProps } from "./Badge.types";
import { badgeVariants } from "./Badge.styles";
import { Slot } from "../../lib/Slot";

/**
 * Badge Component
 *
 * A small, inline status indicator or label component with various styles and options.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Badge>New</Badge>
 *
 * // With variants
 * <Badge variant="primary">Premium</Badge>
 * <Badge variant="success" dot>Online</Badge>
 *
 * // With sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="lg">Large</Badge>
 *
 * // Removable badge (requires "use client" in your component)
 * <Badge removable onRemove={() => handleRemove()}>
 *   Tag
 * </Badge>
 *
 * // With custom icon
 * <Badge icon={<Star size={12} />}>Featured</Badge>
 *
 * // Glass effect with pulse
 * <Badge variant="glass" pulse>Live</Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      shape = "rounded",
      children,
      className,
      dot = false,
      removable = false,
      onRemove,
      icon,
      pulse = false,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        className={cn(
          badgeVariants({ variant, size, shape }),
          pulse && "animate-pulse",
          className,
        )}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {/* Icon or Dot indicator */}
            {icon ? (
              <span className="inline-flex items-center justify-center">
                {icon}
              </span>
            ) : dot ? (
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            ) : null}

            {/* Badge content */}
            {children && <span className="leading-none">{children}</span>}

            {/* Remove button */}
            {removable && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.();
                }}
                className={cn(
                  "inline-flex items-center justify-center",
                  "ml-0.5 -mr-0.5",
                  "rounded-full",
                  "hover:bg-black/10 dark:hover:bg-white/10",
                  "transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1",
                  size === "sm" && "w-3 h-3",
                  size === "md" && "w-4 h-4",
                  size === "lg" && "w-5 h-5",
                )}
                aria-label="Remove badge"
              >
                <svg
                  className={cn(
                    size === "sm" && "w-2.5 h-2.5",
                    size === "md" && "w-3 h-3",
                    size === "lg" && "w-3.5 h-3.5",
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </>
        )}
      </Comp>
    );
  },
);

Badge.displayName = "Badge";

export default Badge;
export { badgeVariants };
