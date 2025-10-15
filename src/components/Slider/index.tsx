import React, { forwardRef, useState, useRef, useCallback, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { SliderProps, SliderMark } from "./Slider.types";

/**
 * Slider Component
 *
 * A modern, accessible slider component with range support, marks, tooltips, and smooth animations.
 * Built with CVA for type-safe variants and responsive design.
 *
 * Features:
 * - Single and range slider modes
 * - Multiple variants and sizes
 * - Horizontal and vertical orientation
 * - Custom marks and labels
 * - Tooltips with custom formatters
 * - Keyboard navigation
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * // Basic slider
 * <Slider value={50} onChange={(val) => console.log(val)} />
 *
 * // Range slider with marks
 * <Slider
 *   range
 *   value={[20, 80]}
 *   marks={[0, 25, 50, 75, 100]}
 *   showMarks
 *   onChange={(val) => console.log(val)}
 * />
 * ```
 */

/**
 * Slider container variants
 */
const sliderVariants = cva(
  [
    "relative flex items-center",
    "touch-none select-none",
  ],
  {
    variants: {
      orientation: {
        horizontal: "w-full h-auto flex-row",
        vertical: "h-full w-auto flex-col",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      disabled: false,
    },
  }
);

/**
 * Slider track variants (background rail)
 */
const trackVariants = cva(
  [
    "relative rounded-full",
    "bg-black/[0.08] dark:bg-white/[0.08]",
    "shadow-inner",
    "transition-all duration-300",
  ],
  {
    variants: {
      orientation: {
        horizontal: "w-full",
        vertical: "h-full",
      },
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
    },
    compoundVariants: [
      // Horizontal sizes
      { orientation: "horizontal", size: "xs", className: "h-1" },
      { orientation: "horizontal", size: "sm", className: "h-1.5" },
      { orientation: "horizontal", size: "md", className: "h-2" },
      { orientation: "horizontal", size: "lg", className: "h-3" },
      { orientation: "horizontal", size: "xl", className: "h-4" },
      // Vertical sizes
      { orientation: "vertical", size: "xs", className: "w-1" },
      { orientation: "vertical", size: "sm", className: "w-1.5" },
      { orientation: "vertical", size: "md", className: "w-2" },
      { orientation: "vertical", size: "lg", className: "w-3" },
      { orientation: "vertical", size: "xl", className: "w-4" },
    ],
    defaultVariants: {
      orientation: "horizontal",
      size: "md",
    },
  }
);

/**
 * Slider filled track variants (active portion)
 */
const filledTrackVariants = cva(
  [
    "absolute rounded-full",
    "transition-all duration-300",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[oklch(0.60_0.24_250)]",
          "dark:bg-[oklch(0.70_0.20_250)]",
          "shadow-lg shadow-[oklch(0.60_0.24_250)]/50",
        ],
        primary: "bg-primary shadow-lg shadow-primary/50",
        secondary: "bg-secondary shadow-lg shadow-secondary/50",
        accent: "bg-accent shadow-lg shadow-accent/50",
        success: [
          "bg-[oklch(0.70_0.20_145)]",
          "dark:bg-[oklch(0.75_0.18_145)]",
          "shadow-lg shadow-[oklch(0.70_0.20_145)]/50",
        ],
        warning: [
          "bg-[oklch(0.80_0.16_75)]",
          "dark:bg-[oklch(0.82_0.16_75)]",
          "shadow-lg shadow-[oklch(0.80_0.16_75)]/50",
        ],
        error: [
          "bg-[oklch(0.64_0.26_15)]",
          "dark:bg-[oklch(0.68_0.24_15)]",
          "shadow-lg shadow-[oklch(0.64_0.26_15)]/50",
        ],
        gradient: [
          "bg-gradient-to-r",
          "from-[oklch(0.65_0.25_250)] via-[oklch(0.60_0.28_300)] to-[oklch(0.68_0.26_330)]",
          "dark:from-[oklch(0.70_0.22_250)] dark:via-[oklch(0.65_0.25_300)] dark:to-[oklch(0.72_0.24_330)]",
          "shadow-xl shadow-[oklch(0.65_0.25_250)]/60",
        ],
        glass: [
          "backdrop-blur-xl bg-white/40 dark:bg-white/20",
          "border border-white/60 dark:border-white/30",
          "shadow-xl shadow-white/30",
        ],
      },
      orientation: {
        horizontal: "h-full",
        vertical: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      orientation: "horizontal",
    },
  }
);

/**
 * Slider thumb variants (draggable handle)
 */
const thumbVariants = cva(
  [
    "absolute rounded-full",
    "bg-white dark:bg-white",
    "border-2",
    "shadow-lg",
    "transition-all duration-200",
    "hover:scale-110",
    "active:scale-95",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
    "cursor-grab active:cursor-grabbing",
    "z-10",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-[oklch(0.60_0.24_250)]",
          "dark:border-[oklch(0.70_0.20_250)]",
          "focus-visible:ring-[oklch(0.60_0.24_250)]/50",
        ],
        primary: "border-primary focus-visible:ring-primary/50",
        secondary: "border-secondary focus-visible:ring-secondary/50",
        accent: "border-accent focus-visible:ring-accent/50",
        success: [
          "border-[oklch(0.70_0.20_145)]",
          "dark:border-[oklch(0.75_0.18_145)]",
          "focus-visible:ring-[oklch(0.70_0.20_145)]/50",
        ],
        warning: [
          "border-[oklch(0.80_0.16_75)]",
          "dark:border-[oklch(0.82_0.16_75)]",
          "focus-visible:ring-[oklch(0.80_0.16_75)]/50",
        ],
        error: [
          "border-[oklch(0.64_0.26_15)]",
          "dark:border-[oklch(0.68_0.24_15)]",
          "focus-visible:ring-[oklch(0.64_0.26_15)]/50",
        ],
        gradient: [
          "border-[oklch(0.65_0.25_250)]",
          "dark:border-[oklch(0.70_0.22_250)]",
          "focus-visible:ring-[oklch(0.65_0.25_250)]/50",
        ],
        glass: "border-white/60 dark:border-white/30 focus-visible:ring-white/50",
      },
      size: {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-7 h-7",
      },
      disabled: {
        true: "cursor-not-allowed hover:scale-100 active:scale-100",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  }
);

/**
 * Slider tooltip variants
 */
const tooltipVariants = cva(
  [
    "absolute px-2 py-1 rounded-md text-xs font-medium",
    "bg-gray-900 dark:bg-gray-100",
    "text-white dark:text-gray-900",
    "shadow-lg",
    "pointer-events-none",
    "whitespace-nowrap",
    "transition-opacity duration-200",
  ],
  {
    variants: {
      orientation: {
        horizontal: "bottom-full mb-2 left-1/2 -translate-x-1/2",
        vertical: "left-full ml-2 top-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

/**
 * Slider mark variants
 */
const markVariants = cva(
  [
    "absolute w-1.5 h-1.5 rounded-full",
    "bg-gray-400 dark:bg-gray-600",
    "transition-colors duration-200",
  ],
  {
    variants: {
      orientation: {
        horizontal: "top-1/2 -translate-y-1/2",
        vertical: "left-1/2 -translate-x-1/2",
      },
      active: {
        true: "bg-white dark:bg-white",
        false: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      active: false,
    },
  }
);

/**
 * Main Slider Component
 */
const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      variant = "default",
      size = "md",
      orientation = "horizontal",
      value: controlledValue,
      defaultValue = 0,
      range = false,
      min = 0,
      max = 100,
      step = 1,
      showValue = false,
      showTooltip = false,
      marks,
      showMarks = false,
      valueFormatter,
      onChange,
      onChangeCommitted,
      disabled = false,
      trackClassName,
      filledTrackClassName,
      thumbClassName,
      marksClassName,
      animated = true,
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    // State management
    const [internalValue, setInternalValue] = useState<number | number[]>(() => {
      if (controlledValue !== undefined) return controlledValue;
      if (defaultValue !== undefined) return defaultValue;
      return range ? [min, min] : min;
    });

    const [activeThumb, setActiveThumb] = useState<number | null>(null);
    const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<number | number[]>(
      controlledValue !== undefined ? controlledValue : internalValue
    );

    // Use controlled value if provided
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    // Update value ref whenever value changes
    useEffect(() => {
      valueRef.current = value;
    }, [value]);

    // Normalize value to array for consistent handling
    const normalizedValue = Array.isArray(value) ? value : [value];

    // Format value for display
    const formatValue = useCallback(
      (val: number) => {
        if (valueFormatter) return valueFormatter(val);
        return String(val);
      },
      [valueFormatter]
    );

    // Calculate percentage from value
    const valueToPercent = useCallback(
      (val: number) => {
        return ((val - min) / (max - min)) * 100;
      },
      [min, max]
    );

    // Calculate value from position
    const positionToValue = useCallback(
      (position: number) => {
        const percent = orientation === "horizontal" ? position : 100 - position;
        const rawValue = (percent / 100) * (max - min) + min;
        const steppedValue = Math.round(rawValue / step) * step;
        return Math.min(Math.max(steppedValue, min), max);
      },
      [min, max, step, orientation]
    );

    // Get position from event
    const getPositionFromEvent = useCallback(
      (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!trackRef.current) return 0;

        const rect = trackRef.current.getBoundingClientRect();
        let clientPos: number;

        if ("touches" in event) {
          clientPos =
            orientation === "horizontal"
              ? event.touches[0].clientX
              : event.touches[0].clientY;
        } else {
          clientPos = orientation === "horizontal" ? event.clientX : event.clientY;
        }

        const trackSize =
          orientation === "horizontal" ? rect.width : rect.height;
        const trackStart =
          orientation === "horizontal" ? rect.left : rect.top;

        const position = ((clientPos - trackStart) / trackSize) * 100;
        return Math.min(Math.max(position, 0), 100);
      },
      [orientation]
    );

    // Handle value change
    const handleValueChange = useCallback(
      (newValue: number | number[]) => {
        if (disabled) return;

        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }

        onChange?.(newValue);
      },
      [disabled, controlledValue, onChange]
    );

    // Handle mouse/touch down on thumb
    const handleThumbMouseDown = useCallback(
      (thumbIndex: number) => (event: React.MouseEvent | React.TouchEvent) => {
        if (disabled) return;

        event.preventDefault();
        event.stopPropagation();
        setActiveThumb(thumbIndex);

        const handleMove = (e: MouseEvent | TouchEvent) => {
          const position = getPositionFromEvent(e);
          const newValue = positionToValue(position);
          const currentValue = valueRef.current;

          if (range && Array.isArray(currentValue)) {
            const newValues = [...currentValue];
            newValues[thumbIndex] = newValue;

            // Ensure values don't cross
            if (thumbIndex === 0 && newValue > newValues[1]) {
              newValues[0] = newValues[1];
            } else if (thumbIndex === 1 && newValue < newValues[0]) {
              newValues[1] = newValues[0];
            }

            handleValueChange(newValues);
          } else {
            handleValueChange(newValue);
          }
        };

        const handleUp = () => {
          setActiveThumb(null);
          onChangeCommitted?.(valueRef.current);
          document.removeEventListener("mousemove", handleMove);
          document.removeEventListener("mouseup", handleUp);
          document.removeEventListener("touchmove", handleMove);
          document.removeEventListener("touchend", handleUp);
        };

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleUp);
        document.addEventListener("touchmove", handleMove);
        document.addEventListener("touchend", handleUp);
      },
      [disabled, range, getPositionFromEvent, positionToValue, handleValueChange, onChangeCommitted]
    );

    // Handle click on track
    const handleTrackClick = useCallback(
      (event: React.MouseEvent) => {
        if (disabled) return;

        const position = getPositionFromEvent(event);
        const newValue = positionToValue(position);
        const currentValue = valueRef.current;

        if (range && Array.isArray(currentValue)) {
          // Find closest thumb
          const [val1, val2] = currentValue;
          const dist1 = Math.abs(newValue - val1);
          const dist2 = Math.abs(newValue - val2);

          const thumbIndex = dist1 < dist2 ? 0 : 1;
          const newValues = [...currentValue];
          newValues[thumbIndex] = newValue;

          // Ensure values don't cross
          if (thumbIndex === 0 && newValue > newValues[1]) {
            newValues[0] = newValues[1];
          } else if (thumbIndex === 1 && newValue < newValues[0]) {
            newValues[1] = newValues[0];
          }

          handleValueChange(newValues);
          onChangeCommitted?.(newValues);
        } else {
          handleValueChange(newValue);
          onChangeCommitted?.(newValue);
        }
      },
      [disabled, range, getPositionFromEvent, positionToValue, handleValueChange, onChangeCommitted]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (thumbIndex: number) => (event: React.KeyboardEvent) => {
        if (disabled) return;

        let delta = 0;
        const largeStep = step * 10;
        const currentValue = valueRef.current;

        switch (event.key) {
          case "ArrowRight":
          case "ArrowUp":
            delta = step;
            break;
          case "ArrowLeft":
          case "ArrowDown":
            delta = -step;
            break;
          case "PageUp":
            delta = largeStep;
            break;
          case "PageDown":
            delta = -largeStep;
            break;
          case "Home":
            delta = min - (Array.isArray(currentValue) ? currentValue[thumbIndex] : currentValue);
            break;
          case "End":
            delta = max - (Array.isArray(currentValue) ? currentValue[thumbIndex] : currentValue);
            break;
          default:
            return;
        }

        event.preventDefault();

        if (range && Array.isArray(currentValue)) {
          const newValues = [...currentValue];
          newValues[thumbIndex] = Math.min(
            Math.max(newValues[thumbIndex] + delta, min),
            max
          );

          // Ensure values don't cross
          if (thumbIndex === 0 && newValues[0] > newValues[1]) {
            newValues[0] = newValues[1];
          } else if (thumbIndex === 1 && newValues[1] < newValues[0]) {
            newValues[1] = newValues[0];
          }

          handleValueChange(newValues);
        } else {
          const currentVal = Array.isArray(currentValue) ? currentValue[0] : currentValue;
          const newValue = Math.min(Math.max(currentVal + delta, min), max);
          handleValueChange(newValue);
        }
      },
      [disabled, step, min, max, range, handleValueChange]
    );

    // Parse marks
    const parsedMarks: SliderMark[] = React.useMemo(() => {
      if (!marks) return [];
      return marks.map((mark) =>
        typeof mark === "number" ? { value: mark } : mark
      );
    }, [marks]);

    // Calculate filled track style
    const filledTrackStyle = React.useMemo(() => {
      if (range && normalizedValue.length === 2) {
        const [val1, val2] = normalizedValue;
        const start = valueToPercent(Math.min(val1, val2));
        const end = valueToPercent(Math.max(val1, val2));

        if (orientation === "horizontal") {
          return {
            left: `${start}%`,
            right: `${100 - end}%`,
          };
        } else {
          return {
            bottom: `${start}%`,
            top: `${100 - end}%`,
          };
        }
      } else {
        const percent = valueToPercent(normalizedValue[0]);

        if (orientation === "horizontal") {
          return {
            left: 0,
            right: `${100 - percent}%`,
          };
        } else {
          return {
            bottom: 0,
            top: `${100 - percent}%`,
          };
        }
      }
    }, [range, normalizedValue, valueToPercent, orientation]);

    // Calculate thumb positions
    const thumbPositions = React.useMemo(() => {
      return normalizedValue.map((val) => valueToPercent(val));
    }, [normalizedValue, valueToPercent]);

    return (
      <div
        ref={ref}
        className={cn(
          sliderVariants({ orientation, disabled }),
          orientation === "horizontal" ? "py-4" : "px-4",
          className
        )}
        {...props}
      >
        {/* Value label */}
        {showValue && !showTooltip && (
          <div
            className={cn(
              "text-sm font-medium mb-2",
              orientation === "vertical" && "mb-0 mr-2"
            )}
          >
            {range && Array.isArray(value)
              ? `${formatValue(value[0])} - ${formatValue(value[1])}`
              : formatValue(normalizedValue[0])}
          </div>
        )}

        <div
          className={cn(
            "relative",
            orientation === "horizontal" ? "w-full" : "h-full"
          )}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className={cn(
              trackVariants({ orientation, size }),
              trackClassName
            )}
            onClick={handleTrackClick}
          >
            {/* Filled track */}
            <div
              className={cn(
                filledTrackVariants({ variant, orientation }),
                filledTrackClassName
              )}
              style={filledTrackStyle}
            />

            {/* Marks */}
            {showMarks && parsedMarks.length > 0 && (
              <>
                {parsedMarks.map((mark, index) => {
                  const percent = valueToPercent(mark.value);
                  const isActive = range
                    ? normalizedValue.length === 2 &&
                      mark.value >= Math.min(...normalizedValue) &&
                      mark.value <= Math.max(...normalizedValue)
                    : mark.value <= normalizedValue[0];

                  return (
                    <div key={index}>
                      <div
                        className={cn(
                          markVariants({ orientation, active: isActive }),
                          marksClassName
                        )}
                        style={
                          orientation === "horizontal"
                            ? { left: `${percent}%` }
                            : { bottom: `${percent}%` }
                        }
                      />
                      {mark.label && (
                        <div
                          className={cn(
                            "absolute text-xs text-gray-600 dark:text-gray-400",
                            orientation === "horizontal"
                              ? "top-full mt-2 left-1/2 -translate-x-1/2"
                              : "left-full ml-2 top-1/2 -translate-y-1/2"
                          )}
                          style={
                            orientation === "horizontal"
                              ? { left: `${percent}%` }
                              : { bottom: `${percent}%` }
                          }
                        >
                          {mark.label}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Thumbs */}
          {thumbPositions.map((position, index) => (
            <div
              key={index}
              className={cn(
                thumbVariants({ variant, size, disabled }),
                thumbClassName
              )}
              style={
                orientation === "horizontal"
                  ? {
                      left: `${position}%`,
                      transform: "translate(-50%, -50%)",
                      top: "50%",
                    }
                  : {
                      bottom: `${position}%`,
                      transform: "translate(-50%, 50%)",
                      left: "50%",
                    }
              }
              onMouseDown={handleThumbMouseDown(index)}
              onTouchStart={handleThumbMouseDown(index)}
              onMouseEnter={() => setHoveredThumb(index)}
              onMouseLeave={() => setHoveredThumb(null)}
              onKeyDown={handleKeyDown(index)}
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-label={
                ariaLabel ||
                (range
                  ? `Slider ${index === 0 ? "minimum" : "maximum"} value`
                  : "Slider value")
              }
              aria-labelledby={ariaLabelledBy}
              aria-describedby={ariaDescribedBy}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={normalizedValue[index]}
              aria-orientation={orientation}
              aria-disabled={disabled}
            >
              {/* Tooltip */}
              {showTooltip && (hoveredThumb === index || activeThumb === index) && (
                <div className={cn(tooltipVariants({ orientation }))}>
                  {formatValue(normalizedValue[index])}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
export {
  sliderVariants,
  trackVariants,
  filledTrackVariants,
  thumbVariants,
  tooltipVariants,
  markVariants,
};
