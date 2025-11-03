import React, { useEffect } from "react";

import { cn } from "../../lib/utils";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";
import type { BadgeProps } from "./Badge.types";
import { badgeVariants } from "./Badge.styles";

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
    // ===== PROP VALIDATION =====
    useEffect(() => {
      if (process.env.NODE_ENV !== "production") {
        const validator = createValidator("Badge");

        // Common validators
        commonValidators.size(validator, size);
        const badgeVariants = [
          "default",
          "primary",
          "secondary",
          "accent",
          "success",
          "warning",
          "error",
          "info",
          "outline",
          "glass",
        ] as const;
        commonValidators.variant(validator, variant, badgeVariants);
        commonValidators.className(validator, className);

        // Shape validation
        if (shape && !["rounded", "pill", "square"].includes(shape)) {
          validator.error(
            "Invalid prop: 'shape' must be one of: 'rounded', 'pill', 'square'."
          );
        }

        // Boolean validations
        if (dot !== undefined && !isValidBoolean(dot)) {
          validator.error("Invalid prop: 'dot' must be a boolean.");
        }
        if (removable !== undefined && !isValidBoolean(removable)) {
          validator.error("Invalid prop: 'removable' must be a boolean.");
        }
        if (pulse !== undefined && !isValidBoolean(pulse)) {
          validator.error("Invalid prop: 'pulse' must be a boolean.");
        }

        // Conditional validation
        if (removable && !onRemove) {
          validator.warn(
            "Warning: 'removable' is true but 'onRemove' callback is not provided."
          );
        }
      }
    }, [variant, size, shape, className, dot, removable, pulse, onRemove]);
    // ===== END PROP VALIDATION =====

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
