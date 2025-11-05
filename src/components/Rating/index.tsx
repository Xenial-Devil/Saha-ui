"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import type { RatingProps } from "./Rating.types";
import { Star, Heart, Circle, Diamond } from "lucide-react";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";
import { ratingVariants, iconVariants } from "./Rating.styles";

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
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Rating");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "primary",
        "secondary",
        "gradient",
        "glass",
        "outline",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg", "xl"] as const);

      // Validate icon
      validator.validateEnum("icon", icon, [
        "star",
        "heart",
        "circle",
        "diamond",
      ] as const);

      // Validate precision
      validator.validateEnum("precision", precision, ["full", "half"] as const);

      // Validate numeric props
      validator.validateType("value", value, "number", isValidNumber);
      validator.validateType("max", max, "number", isValidNumber);

      if (max <= 0) {
        validator.error("max must be greater than 0");
      }

      if (value < 0) {
        validator.warn("value should not be negative");
      }

      if (value > max) {
        validator.warn("value should not exceed max");
      }

      if (count !== undefined) {
        validator.validateType("count", count, "number", isValidNumber);
        if (count < 0) {
          validator.warn("count should not be negative");
        }
      }

      // Validate boolean props
      validator.validateType("readOnly", readOnly, "boolean", isValidBoolean);
      validator.validateType("disabled", disabled, "boolean", isValidBoolean);
      validator.validateType("showValue", showValue, "boolean", isValidBoolean);
      validator.validateType("hoverable", hoverable, "boolean", isValidBoolean);
      validator.validateType(
        "showTooltip",
        showTooltip,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "allowClear",
        allowClear,
        "boolean",
        isValidBoolean
      );
      validator.validateType("animated", animated, "boolean", isValidBoolean);

      // Common validators
      commonValidators.className(validator, className);
    }, [
      variant,
      size,
      icon,
      precision,
      value,
      max,
      count,
      readOnly,
      disabled,
      showValue,
      hoverable,
      showTooltip,
      allowClear,
      animated,
      className,
    ]);

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
