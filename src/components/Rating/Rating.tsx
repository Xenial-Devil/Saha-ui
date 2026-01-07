"use client";

import React, { useState, useRef, useMemo } from "react";
import { cn } from "../../lib/utils";
import type {
  RatingProps,
  CustomIconComponent,
  IconProps,
} from "./Rating.types";
import { getIconComponent } from "./Rating.icons";
import { getColorScheme } from "./Rating.colors";
import { ratingVariants, iconVariants } from "./Rating.styles";

/**
 * Type guard: Check if value is a valid React element (already rendered)
 */
const isReactElement = (
  value: CustomIconComponent
): value is React.ReactElement<IconProps> => {
  return React.isValidElement(value);
};

/**
 * Type guard: Check if value is a component type
 */
const isComponentType = (
  value: CustomIconComponent
): value is React.ComponentType<IconProps> => {
  if (React.isValidElement(value)) {
    return false;
  }

  if (typeof value === "function") {
    return true;
  }

  if (typeof value === "object" && value !== null) {
    const hasTypeOf = "$$typeof" in value;
    const hasRender = "render" in value;
    const hasType = "type" in value;

    if (hasTypeOf && (hasRender || hasType)) {
      return true;
    }

    if (hasTypeOf) {
      const typeString = String((value as { $$typeof: symbol }).$$typeof);
      return (
        typeString.includes("forward_ref") ||
        typeString.includes("memo") ||
        typeString.includes("react")
      );
    }
  }

  return false;
};

/**
 * Render custom icon with proper props handling
 */
const renderCustomIcon = (
  icon: CustomIconComponent,
  props: IconProps
): React.ReactNode => {
  // Case 1: Already a React element (e.g., <Icon icon="mdi:star" />)
  if (isReactElement(icon)) {
    const existingProps = icon.props as IconProps;
    return React.cloneElement(icon, {
      className: cn(existingProps?.className, props.className),
      style: { ...existingProps?.style, ...props.style },
      // Pass color for Iconify-like libraries
      color: props.color || existingProps?.color,
    } as IconProps);
  }

  // Case 2: Component type (Lucide icons, custom components)
  if (isComponentType(icon)) {
    const IconComponent = icon as React.ComponentType<IconProps>;
    return <IconComponent {...props} />;
  }

  if (process.env.NODE_ENV === "development") {
    console.warn("Rating: Unable to render custom icon", {
      icon,
      type: typeof icon,
    });
  }

  return null;
};

/**
 * Rating Component
 */
const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value = 0,
      max = 5,
      variant = "default",
      size = "md",
      icon = "star",
      precision = "full",
      colorScheme = "yellow",
      readOnly = false,
      disabled = false,
      showValue = false,
      valueFormat,
      count,
      countLabel = "reviews",
      color,
      emptyColor,
      hoverable = !readOnly,
      showTooltip = false,
      tooltipLabels,
      onChange,
      onHover,
      allowClear = true,
      customIcon,
      customEmptyIcon,
      className,
      iconClassName,
      animated = true,
      highlightOnHover = false,
      direction = "horizontal",
      gap = "sm",
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const IconComponent = getIconComponent(icon);
    const displayValue = hoverValue !== null ? hoverValue : value;
    const isInteractive = !readOnly && !disabled;
    const hasCustomIcon = Boolean(customIcon || customEmptyIcon);

    // Resolve colors: custom props override colorScheme
    const resolvedColors = useMemo(() => {
      const scheme = getColorScheme(colorScheme);
      return {
        filled: color || scheme.filled,
        empty: emptyColor || scheme.empty,
        glow: scheme.glow,
      };
    }, [colorScheme, color, emptyColor]);

    /**
     * Calculate the fill state of an icon
     */
    const getIconState = (index: number): "empty" | "filled" | "half" => {
      const iconValue = index + 1;

      if (precision === "half") {
        if (displayValue >= iconValue) return "filled";
        if (displayValue >= iconValue - 0.5) return "half";
        return "empty";
      }

      return displayValue >= iconValue ? "filled" : "empty";
    };

    /**
     * Calculate rating value based on click position
     */
    const calculateRating = (
      index: number,
      event: React.MouseEvent
    ): number => {
      if (precision === "full") {
        return index + 1;
      }

      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const halfWidth = rect.width / 2;

      return clickX < halfWidth ? index + 0.5 : index + 1;
    };

    /**
     * Handle icon click
     */
    const handleClick = (index: number, event: React.MouseEvent) => {
      if (!isInteractive) return;

      const newValue = calculateRating(index, event);

      if (allowClear && newValue === value) {
        onChange?.(0);
      } else {
        onChange?.(newValue);
      }
    };

    /**
     * Handle mouse enter on icon
     */
    const handleMouseEnter = (index: number, event: React.MouseEvent) => {
      if (!isInteractive || !hoverable) return;

      const newValue = calculateRating(index, event);
      setHoverValue(newValue);
      onHover?.(newValue);
    };

    /**
     * Handle mouse move on icon
     */
    const handleMouseMove = (index: number, event: React.MouseEvent) => {
      if (!isInteractive || !hoverable || precision === "full") return;

      const newValue = calculateRating(index, event);
      if (newValue !== hoverValue) {
        setHoverValue(newValue);
        onHover?.(newValue);
      }
    };

    /**
     * Handle mouse leave
     */
    const handleMouseLeave = () => {
      if (!isInteractive) return;
      setHoverValue(null);
    };

    /**
     * Handle keyboard navigation
     */
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (!isInteractive) return;

      let newValue = value;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          event.preventDefault();
          newValue = Math.min(max, value + (precision === "half" ? 0.5 : 1));
          break;
        case "ArrowLeft":
        case "ArrowDown":
          event.preventDefault();
          newValue = Math.max(0, value - (precision === "half" ? 0.5 : 1));
          break;
        case "Home":
          event.preventDefault();
          newValue = precision === "half" ? 0.5 : 1;
          break;
        case "End":
          event.preventDefault();
          newValue = max;
          break;
        case "0":
        case "Backspace":
        case "Delete":
          if (allowClear) {
            event.preventDefault();
            newValue = 0;
          }
          break;
        default: {
          const num = parseInt(event.key);
          if (!isNaN(num) && num >= 0 && num <= max) {
            event.preventDefault();
            newValue = num;
          }
          break;
        }
      }

      if (newValue !== value) {
        onChange?.(newValue);
      }
    };

    /**
     * Get icon classes based on state
     * NOTE: Don't add fill-current for custom icons (they're typically stroke-based)
     */
    const getIconClasses = (
      state: "empty" | "filled" | "half",
      isCustom: boolean
    ) => {
      const isFilled = state === "filled" || state === "half";

      return cn(
        iconVariants({
          variant,
          size,
          state,
          interactive: isInteractive && hoverable,
        }),
        // Only add fill-current for built-in icons, not custom icons
        isFilled && !isCustom && "fill-current",
        disabled && "opacity-50 cursor-not-allowed",
        animated && "transition-all duration-200",
        highlightOnHover && hoverValue !== null && "filter brightness-110",
        variant === "neon" && isFilled && "drop-shadow-[0_0_10px_currentColor]",
        iconClassName
      );
    };

    /**
     * Get icon style based on state
     */
    const getIconStyle = (
      state: "empty" | "filled" | "half"
    ): React.CSSProperties => {
      const isFilled = state === "filled" || state === "half";
      const isGradient = resolvedColors.filled.includes("gradient");

      return {
        color: isFilled
          ? isGradient
            ? undefined
            : resolvedColors.filled
          : resolvedColors.empty,
        ...(isGradient &&
          isFilled && {
            background: resolvedColors.filled,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }),
        ...(state === "half" && {
          clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
        }),
      };
    };

    /**
     * Get current color for an icon state
     */
    const getIconColor = (state: "empty" | "filled" | "half"): string => {
      const isFilled = state === "filled" || state === "half";
      return isFilled ? resolvedColors.filled : resolvedColors.empty;
    };

    /**
     * Render individual icon
     */
    const renderIcon = (index: number) => {
      const iconState = getIconState(index);
      const isFilled = iconState === "filled" || iconState === "half";
      const iconValue = index + 1;

      // Determine which custom icon to use (if any)
      const activeCustomIcon = isFilled
        ? customIcon || customEmptyIcon
        : customEmptyIcon || customIcon;

      const isCustom = Boolean(activeCustomIcon);
      const iconClasses = getIconClasses(iconState, isCustom);
      const iconStyle = getIconStyle(iconState);
      const iconColor = getIconColor(iconState);

      let iconElement: React.ReactNode;

      if (activeCustomIcon) {
        // Custom icon props - include color prop directly for Lucide icons
        const customIconProps: IconProps = {
          className: iconClasses,
          style: iconStyle,
          color: iconColor, // Direct color prop for Lucide/similar icons
        };

        iconElement = renderCustomIcon(activeCustomIcon, customIconProps);
      } else {
        // Built-in icon
        iconElement = (
          <IconComponent className={iconClasses} style={iconStyle} />
        );
      }

      return (
        <span
          key={index}
          role="radio"
          aria-checked={value >= iconValue}
          aria-label={
            tooltipLabels?.[index] ||
            `${iconValue} ${iconValue === 1 ? "star" : "stars"}`
          }
          tabIndex={
            isInteractive ? (focusedIndex === index ? 0 : -1) : undefined
          }
          className={cn(
            "relative inline-flex items-center justify-center",
            isInteractive && "cursor-pointer",
            disabled && "cursor-not-allowed"
          )}
          onClick={(e) => handleClick(index, e)}
          onMouseEnter={(e) => handleMouseEnter(index, e)}
          onMouseMove={(e) => handleMouseMove(index, e)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          title={showTooltip ? tooltipLabels?.[index] : undefined}
        >
          {iconElement}

          {/* Half fill overlay for half state - only for built-in icons */}
          {iconState === "half" && !hasCustomIcon && (
            <IconComponent
              className={cn(
                iconVariants({
                  variant,
                  size,
                  state: "filled",
                  interactive: false,
                }),
                "fill-current absolute top-0 left-0 pointer-events-none",
                animated && "transition-all duration-200"
              )}
              style={{
                color: resolvedColors.filled,
                clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
              }}
            />
          )}
        </span>
      );
    };

    const formattedValue = valueFormat
      ? valueFormat(value, max)
      : `${value.toFixed(precision === "half" ? 1 : 0)}`;

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2",
          direction === "vertical" && "flex-col",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div
          ref={containerRef}
          role="radiogroup"
          aria-label="Rating"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(ratingVariants({ variant, size, direction, gap }))}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={isInteractive ? 0 : undefined}
        >
          {Array.from({ length: max }, (_, i) => renderIcon(i))}
        </div>

        {/* Value Display */}
        {showValue && (
          <span className="text-sm font-medium text-foreground">
            {formattedValue}
            {max !== 5 && <span className="text-muted-foreground">/{max}</span>}
          </span>
        )}

        {/* Review Count */}
        {count !== undefined && (
          <span className="text-sm text-muted-foreground">
            ({count.toLocaleString()} {countLabel})
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = "Rating";

export default Rating;

// Re-export utilities
export { getAllIconNames, iconCategories } from "./Rating.icons";
export { getAllColorSchemes, colorSchemeCategories } from "./Rating.colors";
