import { forwardRef, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { TagProps, TagGroupProps } from "./Tag.types";
import { X, Loader2 } from "lucide-react";

/**
 * Tag Component
 *
 * A versatile tag component for labels, categories, status indicators, and more.
 * Features removable tags, clickable actions, badges, dots, and animations.
 *
 * @variant default | primary | secondary | accent | success | warning | error | info | outline | ghost | glass
 * @size sm | md | lg
 */

/**
 * Tag variants using CVA
 */
export const tagVariants = cva(
  [
    "inline-flex items-center gap-2 font-medium select-none",
    "transition-all duration-300 ease-out",
    "border-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-muted text-foreground",
          "hover:bg-muted/80",
        ],
        primary: [
          "border-primary/40 bg-primary/10 text-primary",
          "hover:bg-primary/20",
          "dark:bg-primary/20 dark:hover:bg-primary/30",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/10 text-secondary",
          "hover:bg-secondary/20",
          "dark:bg-secondary/20 dark:hover:bg-secondary/30",
        ],
        accent: [
          "border-accent/40 bg-accent/10 text-accent",
          "hover:bg-accent/20",
          "dark:bg-accent/20 dark:hover:bg-accent/30",
        ],
        success: [
          "border-success/40 bg-success/10 text-success",
          "hover:bg-success/20",
          "dark:bg-success/20 dark:hover:bg-success/30",
        ],
        warning: [
          "border-warning/40 bg-warning/10 text-warning",
          "hover:bg-warning/20",
          "dark:bg-warning/20 dark:hover:bg-warning/30",
        ],
        error: [
          "border-destructive/40 bg-destructive/10 text-destructive",
          "hover:bg-destructive/20",
          "dark:bg-destructive/20 dark:hover:bg-destructive/30",
        ],
        info: [
          "border-info/40 bg-info/10 text-info",
          "hover:bg-info/20",
          "dark:bg-info/20 dark:hover:bg-info/30",
        ],
        outline: [
          "border-border bg-transparent text-foreground",
          "hover:bg-muted/50",
        ],
        ghost: [
          "border-transparent bg-transparent text-foreground",
          "hover:bg-muted/50",
        ],
        glass: [
          "border-border/50 glass text-foreground",
          "hover:border-border",
        ],
      },
      size: {
        sm: "px-2 py-0.5 text-xs gap-1",
        md: "px-3 py-1 text-sm gap-1.5",
        lg: "px-4 py-1.5 text-base gap-2",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-full",
        none: "rounded-none",
      },
      clickable: {
        true: "cursor-pointer hover:scale-105 active:scale-95",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
      selected: {
        true: "ring-2 ring-offset-2 ring-primary",
        false: "",
      },
      animated: {
        true: "animate-in fade-in-0 zoom-in-95 duration-300",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
      clickable: false,
      disabled: false,
      selected: false,
      animated: false,
    },
  }
);

/**
 * Badge variants for tags
 */
const badgeVariants = cva(
  [
    "flex items-center justify-center min-w-[1.25rem] h-5 px-1.5",
    "text-xs font-bold rounded-full",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: "bg-muted-foreground text-background",
        primary: "bg-primary text-primary-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        error: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Tag Component
 */
export const Tag = forwardRef<HTMLElement, TagProps>(
  (
    {
      children,
      label,
      icon,
      avatar,
      variant = "default",
      size = "md",
      rounded = "default",
      removable = false,
      onRemove,
      clickable = false,
      onClick,
      disabled = false,
      selected = false,
      dot = false,
      dotPosition = "left",
      dotColor,
      badge,
      badgeVariant = "default",
      animated = false,
      loading = false,
      className,
      as = "span",
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || loading) return;

      setIsRemoving(true);
      setTimeout(() => {
        onRemove?.();
      }, 300);
    };

    const handleClick = () => {
      if (disabled || loading) return;
      onClick?.();
    };

    // Determine component type
    const Component =
      as === "a" && href ? "a" : as === "button" ? "button" : as;

    // Dot indicator
    const dotElement = dot && (
      <span
        className={cn(
          "h-2 w-2 rounded-full shrink-0",
          dotColor ? "" : "bg-current"
        )}
        style={dotColor ? { backgroundColor: dotColor } : undefined}
      />
    );

    return (
      <Component
        ref={ref as any}
        onClick={clickable || onClick ? handleClick : undefined}
        href={href}
        target={target}
        rel={rel}
        className={cn(
          tagVariants({
            variant,
            size,
            rounded,
            clickable: clickable || !!onClick,
            disabled: disabled || loading,
            selected,
            animated: animated || isRemoving,
          }),
          isRemoving && "animate-out fade-out-0 zoom-out-95 duration-300",
          className
        )}
        {...props}
      >
        {/* Left Dot */}
        {dot && dotPosition === "left" && dotElement}

        {/* Avatar */}
        {avatar && (
          <img
            src={avatar}
            alt={label || "avatar"}
            className={cn(
              "shrink-0 rounded-full object-cover",
              size === "sm" && "h-4 w-4",
              size === "md" && "h-5 w-5",
              size === "lg" && "h-6 w-6"
            )}
          />
        )}

        {/* Icon or Loading */}
        {loading ? (
          <Loader2
            className={cn(
              "shrink-0 animate-spin",
              size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5"
            )}
          />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}

        {/* Label */}
        <span className="truncate">{label || children}</span>

        {/* Badge */}
        {badge !== undefined && (
          <span className={badgeVariants({ variant: badgeVariant })}>
            {badge}
          </span>
        )}

        {/* Right Dot */}
        {dot && dotPosition === "right" && dotElement}

        {/* Remove Button */}
        {removable && !loading && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className={cn(
              "shrink-0 rounded-full p-0.5 transition-colors",
              "hover:bg-current/20 focus:outline-none focus:ring-2 focus:ring-current/50",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Remove tag"
          >
            <X
              className={cn(
                size === "sm"
                  ? "h-3 w-3"
                  : size === "md"
                  ? "h-3.5 w-3.5"
                  : "h-4 w-4"
              )}
            />
          </button>
        )}
      </Component>
    );
  }
);

Tag.displayName = "Tag";

/**
 * TagGroup Component
 */
export const TagGroup = forwardRef<HTMLDivElement, TagGroupProps>(
  (
    {
      children,
      className,
      spacing = "md",
      wrap = true,
      max,
      onMaxReached,
      ...props
    },
    ref
  ) => {
    const childArray = Array.isArray(children) ? children : [children];
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const hiddenCount = max ? Math.max(0, childArray.length - max) : 0;

    // Notify parent when max is reached
    if (hiddenCount > 0 && onMaxReached) {
      onMaxReached(hiddenCount);
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          wrap && "flex-wrap",
          spacing === "sm" && "gap-1",
          spacing === "md" && "gap-2",
          spacing === "lg" && "gap-3",
          className
        )}
        {...props}
      >
        {visibleChildren}
        {hiddenCount > 0 && (
          <Tag variant="ghost" size="sm">
            +{hiddenCount} more
          </Tag>
        )}
      </div>
    );
  }
);

TagGroup.displayName = "TagGroup";

export default Tag;
