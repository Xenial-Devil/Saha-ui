import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { BadgeProps } from "./Badge.types";

/**
 * Badge variants using CVA for type-safe styling
 */
const badgeVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-200 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700",
        primary:
          "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 hover:scale-105",
        secondary:
          "bg-gradient-to-r from-secondary/90 to-secondary text-secondary-foreground shadow-sm shadow-secondary/20 hover:shadow-md hover:shadow-secondary/30 hover:scale-105",
        success:
          "bg-gradient-to-r from-green-500/90 to-green-600 text-white shadow-sm shadow-green-500/20 hover:shadow-md hover:shadow-green-500/30 hover:scale-105",
        warning:
          "bg-gradient-to-r from-yellow-500/90 to-yellow-600 text-white shadow-sm shadow-yellow-500/20 hover:shadow-md hover:shadow-yellow-500/30 hover:scale-105",
        error:
          "bg-gradient-to-r from-red-500/90 to-red-600 text-white shadow-sm shadow-red-500/20 hover:shadow-md hover:shadow-red-500/30 hover:scale-105",
        info: "bg-gradient-to-r from-blue-500/90 to-blue-600 text-white shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 hover:scale-105",
        outline:
          "border-2 border-current text-foreground bg-transparent hover:bg-foreground/5 dark:hover:bg-foreground/10",
        glass:
          "backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-lg hover:bg-white/20 dark:hover:bg-black/20 hover:scale-105",
      },
      size: {
        sm: "text-xs px-2 py-0.5 min-h-[20px]",
        md: "text-sm px-2.5 py-1 min-h-[24px]",
        lg: "text-base px-3 py-1.5 min-h-[28px]",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded",
    },
  }
);

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
 * // Removable badge
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
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, size, shape }),
          pulse && "animate-pulse",
          className
        )}
        {...props}
      >
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
              size === "lg" && "w-5 h-5"
            )}
            aria-label="Remove badge"
          >
            <svg
              className={cn(
                size === "sm" && "w-2.5 h-2.5",
                size === "md" && "w-3 h-3",
                size === "lg" && "w-3.5 h-3.5"
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
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
export { badgeVariants };
