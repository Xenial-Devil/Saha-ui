"use client";

import { forwardRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import type { TagProps, TagGroupProps } from "./Tag.types";
import { X, Loader2 } from "lucide-react";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";
import { tagVariants, badgeVariants } from "./Tag.styles";

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
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Tag");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "info",
        "outline",
        "ghost",
        "glass",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate rounded
      validator.validateEnum("rounded", rounded, [
        "none",
        "sm",
        "default",
        "lg",
        "full",
      ] as const);

      // Validate dotPosition
      validator.validateEnum("dotPosition", dotPosition, [
        "left",
        "right",
      ] as const);

      // Validate badgeVariant
      validator.validateEnum("badgeVariant", badgeVariant, [
        "default",
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "info",
      ] as const);

      // Validate boolean props
      validator.validateType("removable", removable, "boolean", isValidBoolean);
      validator.validateType("clickable", clickable, "boolean", isValidBoolean);
      validator.validateType("disabled", disabled, "boolean", isValidBoolean);
      validator.validateType("selected", selected, "boolean", isValidBoolean);
      validator.validateType("dot", dot, "boolean", isValidBoolean);
      validator.validateType("animated", animated, "boolean", isValidBoolean);
      validator.validateType("loading", loading, "boolean", isValidBoolean);

      // Validate removable logic
      if (removable && !onRemove) {
        validator.warn(
          "removable is true but onRemove callback is not provided"
        );
      }

      // Validate content
      if (!children && !label) {
        validator.warn(
          "Tag should have either children or label for accessibility"
        );
      }

      // Common validators
      commonValidators.className(validator, className);
      commonValidators.disabled(validator, disabled);
    }, [
      variant,
      size,
      rounded,
      dotPosition,
      badgeVariant,
      removable,
      clickable,
      disabled,
      selected,
      dot,
      animated,
      loading,
      onRemove,
      children,
      label,
      className,
    ]);

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
