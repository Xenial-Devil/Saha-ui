import React, { useState, useRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { RatingProps } from "./Rating.types";
import { Star, Heart, Circle, Diamond } from "lucide-react";

/**
 * Rating variants using CVA for type-safe styling
 */
const ratingVariants = cva(
  // Base styles
  "inline-flex items-center gap-1",
  {
    variants: {
      variant: {
        default: "",
        primary: "",
        secondary: "",
        gradient: "",
        glass: "",
        outline: "",
      },
      size: {
        sm: "text-sm gap-0.5",
        md: "text-base gap-1",
        lg: "text-xl gap-1.5",
        xl: "text-2xl gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Icon variants for different rating states
 */
const iconVariants = cva(
  "transition-all duration-300 cursor-pointer select-none relative drop-shadow-sm",
  {
    variants: {
      variant: {
        default:
          "text-yellow-500 dark:text-yellow-400 hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]",
        primary:
          "text-primary hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]",
        secondary:
          "text-secondary hover:drop-shadow-[0_0_8px_rgba(var(--secondary),0.6)]",
        gradient:
          "text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]",
        glass:
          "text-white/80 dark:text-white/60 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]",
        outline: "text-foreground hover:drop-shadow-[0_0_6px_rgba(0,0,0,0.3)]",
      },
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8",
      },
      state: {
        empty: "opacity-30",
        filled: "opacity-100 filter brightness-110",
        half: "opacity-70",
      },
      interactive: {
        true: "hover:scale-125 hover:rotate-[10deg] active:scale-95 active:rotate-0",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "empty",
      interactive: false,
    },
  }
);

/**
 * Get icon component based on icon type
 */
const getIconComponent = (icon: RatingProps["icon"]) => {
  switch (icon) {
    case "heart":
      return Heart;
    case "circle":
      return Circle;
    case "diamond":
      return Diamond;
    case "star":
    default:
      return Star;
  }
};

/**
 * Rating Component
 *
 * A flexible rating component with support for different icons, variants, and interactions.
 *
 * @example
 * ```tsx
 * <Rating value={4} max={5} />
 * <Rating value={3.5} precision="half" showValue />
 * <Rating value={4} variant="gradient" size="lg" icon="heart" />
 * ```
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

      // For half precision, check if click was on left or right half
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

      // Allow clearing by clicking the same value
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
     * Handle mouse move on icon (for half precision)
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
        default:
          // Handle number keys 1-9
          const num = parseInt(event.key);
          if (!isNaN(num) && num >= 0 && num <= max) {
            event.preventDefault();
            newValue = num;
          }
          break;
      }

      if (newValue !== value) {
        onChange?.(newValue);
      }
    };

    /**
     * Render individual icon
     */
    const renderIcon = (index: number) => {
      const iconState = getIconState(index);
      const isFilled = iconState === "filled" || iconState === "half";
      const iconValue = index + 1;

      const iconElement =
        customIcon || customEmptyIcon ? (
          isFilled ? (
            customIcon
          ) : (
            customEmptyIcon
          )
        ) : (
          <IconComponent
            className={cn(
              iconVariants({
                variant,
                size,
                state: iconState,
                interactive: isInteractive && hoverable,
              }),
              isFilled && "fill-current",
              iconState === "half" && "opacity-70",
              disabled && "opacity-50 cursor-not-allowed",
              animated && "transition-all duration-200",
              iconClassName
            )}
            style={{
              color: isFilled ? color : emptyColor,
              ...(iconState === "half" && {
                clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
              }),
            }}
          />
        );

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

          {/* Half fill overlay for half stars */}
          {iconState === "half" && !customIcon && (
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
                color: color,
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
          className={cn(ratingVariants({ variant, size }))}
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
export { ratingVariants };
