import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type {
  SliderProps,
  SliderSize,
  SliderVariant,
  SliderOrientation,
  SliderMark,
} from "./Slider.types";

// Context for composable components
interface SliderContextValue {
  value: number | number[];
  min: number;
  max: number;
  step: number;
  size: SliderSize;
  variant: SliderVariant;
  orientation: SliderOrientation;
  disabled: boolean;
  showTooltip: boolean;
  tooltipFormat?: (value: number) => string;
  handleChange: (newValue: number | number[]) => void;
  marks?: boolean | SliderMark[];
}

const SliderContext = createContext<SliderContextValue | undefined>(undefined);

const useSlider = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("Slider subcomponents must be used within <Slider>");
  }
  return context;
};

// Variants
const containerVariants = cva("relative w-full", {
  variants: {
    orientation: {
      horizontal: "h-auto",
      vertical: "w-auto h-full min-h-[200px]",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    disabled: false,
  },
});

const trackVariants = cva(
  "relative rounded-full transition-all duration-300 shadow-inner",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-muted via-muted/80 to-muted",
        primary:
          "bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        secondary:
          "bg-gradient-to-r from-secondary/15 via-secondary/10 to-secondary/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        accent:
          "bg-gradient-to-r from-accent/20 via-accent/15 to-accent/20 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        success:
          "bg-gradient-to-r from-success/15 via-success/10 to-success/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        warning:
          "bg-gradient-to-r from-warning/15 via-warning/10 to-warning/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        error:
          "bg-gradient-to-r from-danger/15 via-danger/10 to-danger/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]",
        ghost: "bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40",
        glass:
          "bg-gradient-to-r from-background/20 via-background/30 to-background/20 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      orientation: {
        horizontal: "w-full",
        vertical: "h-full",
      },
    },
    compoundVariants: [
      // Horizontal sizes
      { orientation: "horizontal", size: "sm", className: "h-1.5" },
      { orientation: "horizontal", size: "md", className: "h-2.5" },
      { orientation: "horizontal", size: "lg", className: "h-4" },
      // Vertical sizes
      { orientation: "vertical", size: "sm", className: "w-1.5" },
      { orientation: "vertical", size: "md", className: "w-2.5" },
      { orientation: "vertical", size: "lg", className: "w-4" },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      orientation: "horizontal",
    },
  }
);

const filledTrackVariants = cva(
  "absolute rounded-full transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary/90 via-primary to-primary/90 shadow-[0_0_12px_oklch(var(--primary)/0.4)]",
        primary:
          "bg-gradient-to-r from-primary/90 via-primary to-primary/90 shadow-[0_0_12px_oklch(var(--primary)/0.4)]",
        secondary:
          "bg-gradient-to-r from-secondary/90 via-secondary to-secondary/90 shadow-[0_0_12px_oklch(var(--secondary)/0.4)]",
        accent:
          "bg-gradient-to-r from-accent/90 via-accent to-accent/90 shadow-[0_0_14px_oklch(var(--accent)/0.5)]",
        success:
          "bg-gradient-to-r from-success/90 via-success to-success/90 shadow-[0_0_12px_oklch(var(--success)/0.4)]",
        warning:
          "bg-gradient-to-r from-warning/90 via-warning to-warning/90 shadow-[0_0_12px_oklch(var(--warning)/0.4)]",
        error:
          "bg-gradient-to-r from-danger/90 via-danger to-danger/90 shadow-[0_0_12px_oklch(var(--danger)/0.4)]",
        ghost:
          "bg-gradient-to-r from-foreground/50 via-foreground/60 to-foreground/50 shadow-[0_0_8px_oklch(var(--foreground)/0.2)]",
        glass:
          "bg-gradient-to-r from-primary/70 via-primary/80 to-primary/70 backdrop-blur-sm shadow-[0_0_12px_oklch(var(--primary)/0.3)]",
      },
      orientation: {
        horizontal: "h-full",
        vertical: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  }
);

const thumbVariants = cva(
  [
    "absolute rounded-full border-2",
    "transition-all duration-300 ease-out",
    "cursor-grab active:cursor-grabbing",
    "hover:scale-110 active:scale-125",
    "focus:outline-none focus:ring-4 focus:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary/20 via-background to-primary/10 border-primary shadow-[0_0_16px_oklch(var(--primary)/0.5)] hover:shadow-[0_0_20px_oklch(var(--primary)/0.6)] active:shadow-[0_0_24px_oklch(var(--primary)/0.7)] focus:ring-primary/30",
        primary:
          "bg-gradient-to-br from-primary/20 via-background to-primary/10 border-primary shadow-[0_0_16px_oklch(var(--primary)/0.5)] hover:shadow-[0_0_20px_oklch(var(--primary)/0.6)] active:shadow-[0_0_24px_oklch(var(--primary)/0.7)] focus:ring-primary/30",
        secondary:
          "bg-gradient-to-br from-secondary/20 via-background to-secondary/10 border-secondary shadow-[0_0_16px_oklch(var(--secondary)/0.5)] hover:shadow-[0_0_20px_oklch(var(--secondary)/0.6)] active:shadow-[0_0_24px_oklch(var(--secondary)/0.7)] focus:ring-secondary/30",
        accent:
          "bg-gradient-to-br from-accent/25 via-background to-accent/15 border-accent shadow-[0_0_18px_oklch(var(--accent)/0.6)] hover:shadow-[0_0_24px_oklch(var(--accent)/0.7)] active:shadow-[0_0_28px_oklch(var(--accent)/0.8)] focus:ring-accent/35",
        success:
          "bg-gradient-to-br from-success/20 via-background to-success/10 border-success shadow-[0_0_16px_oklch(var(--success)/0.5)] hover:shadow-[0_0_20px_oklch(var(--success)/0.6)] active:shadow-[0_0_24px_oklch(var(--success)/0.7)] focus:ring-success/30",
        warning:
          "bg-gradient-to-br from-warning/20 via-background to-warning/10 border-warning shadow-[0_0_16px_oklch(var(--warning)/0.5)] hover:shadow-[0_0_20px_oklch(var(--warning)/0.6)] active:shadow-[0_0_24px_oklch(var(--warning)/0.7)] focus:ring-warning/30",
        error:
          "bg-gradient-to-br from-danger/20 via-background to-danger/10 border-danger shadow-[0_0_16px_oklch(var(--danger)/0.5)] hover:shadow-[0_0_20px_oklch(var(--danger)/0.6)] active:shadow-[0_0_24px_oklch(var(--danger)/0.7)] focus:ring-danger/30",
        ghost:
          "bg-gradient-to-br from-foreground/15 via-background to-foreground/8 border-foreground/60 shadow-[0_0_12px_oklch(var(--foreground)/0.3)] hover:shadow-[0_0_16px_oklch(var(--foreground)/0.4)] active:shadow-[0_0_20px_oklch(var(--foreground)/0.5)] focus:ring-foreground/20",
        glass:
          "bg-gradient-to-br from-primary/15 via-background/80 to-primary/10 border-primary/80 backdrop-blur-sm shadow-[0_0_14px_oklch(var(--primary)/0.4)] hover:shadow-[0_0_18px_oklch(var(--primary)/0.5)] active:shadow-[0_0_22px_oklch(var(--primary)/0.6)] focus:ring-primary/25",
      },
      size: {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
      },
      disabled: {
        true: "cursor-not-allowed hover:scale-100 active:scale-100 opacity-50 shadow-none",
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

const tooltipVariants = cva(
  [
    "absolute whitespace-nowrap px-2.5 py-1.5 text-xs font-semibold",
    "bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-background rounded-md",
    "shadow-[0_0_16px_oklch(var(--foreground)/0.4)]",
    "transition-all duration-300 ease-out",
    "pointer-events-none",
    "border border-background/10",
  ],
  {
    variants: {
      orientation: {
        horizontal: "-top-10 left-1/2 -translate-x-1/2",
        vertical: "-left-14 top-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const markVariants = cva(
  "absolute w-1 h-1 rounded-full bg-foreground/50 shadow-[0_0_4px_oklch(var(--foreground)/0.3)] transition-all duration-200 hover:bg-foreground/70 hover:shadow-[0_0_6px_oklch(var(--foreground)/0.5)]",
  {
    variants: {
      orientation: {
        horizontal: "top-1/2 -translate-y-1/2",
        vertical: "left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const markLabelVariants = cva(
  "absolute text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground",
  {
    variants: {
      orientation: {
        horizontal: "top-full mt-2 left-1/2 -translate-x-1/2",
        vertical: "left-full ml-2 top-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const labelVariants = cva("block mb-2 font-medium text-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    required: {
      true: "after:content-['*'] after:ml-1 after:text-danger",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    required: false,
  },
});

// Helper functions
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const roundToStep = (value: number, step: number) =>
  Math.round(value / step) * step;

const getPercentage = (value: number, min: number, max: number) =>
  ((value - min) / (max - min)) * 100;

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      onChange,
      onChangeCommitted,
      min = 0,
      max = 100,
      step = 1,
      variant = "default",
      size = "md",
      orientation = "horizontal",
      disabled = false,
      marks = false,
      showValue = false,
      showTooltip = false,
      tooltipFormat = (value: number) => value.toString(),
      range = false,
      label,
      helperText,
      error,
      required = false,
      trackColor,
      thumbColor,
      className,
      trackClassName,
      thumbClassName,
      valueLabelDisplay = "auto",
      getAriaLabel,
      getAriaValueText,
      name,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<number | number[]>(
      defaultValue
    );
    const value = isControlled ? controlledValue : internalValue;

    const [isDragging, setIsDragging] = useState(false);
    const [activeThumb, setActiveThumb] = useState<number | null>(null);
    const [showTooltipState, setShowTooltipState] = useState(false);

    const trackRef = useRef<HTMLDivElement>(null);

    // Normalize value to array for consistent handling
    const normalizedValue = Array.isArray(value) ? value : [value];

    // Calculate position from mouse/touch event
    const getValueFromPosition = useCallback(
      (clientX: number, clientY: number) => {
        if (!trackRef.current) return min;

        const rect = trackRef.current.getBoundingClientRect();
        let percentage: number;

        if (orientation === "horizontal") {
          percentage = (clientX - rect.left) / rect.width;
        } else {
          percentage = 1 - (clientY - rect.top) / rect.height;
        }

        percentage = clamp(percentage, 0, 1);
        const rawValue = min + percentage * (max - min);
        return roundToStep(clamp(rawValue, min, max), step);
      },
      [min, max, step, orientation]
    );

    // Handle value change
    const handleChange = useCallback(
      (newValue: number | number[]) => {
        if (disabled) return;

        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [disabled, isControlled, onChange]
    );

    // Handle mouse/touch move
    const handleMove = useCallback(
      (clientX: number, clientY: number) => {
        if (!isDragging || activeThumb === null) return;

        const newValue = getValueFromPosition(clientX, clientY);

        if (range && Array.isArray(value)) {
          const newValues = [...value];
          newValues[activeThumb] = newValue;
          newValues.sort((a, b) => a - b);
          handleChange(newValues);
        } else {
          handleChange(newValue);
        }
      },
      [
        isDragging,
        activeThumb,
        getValueFromPosition,
        range,
        value,
        handleChange,
      ]
    );

    // Mouse events
    const handleMouseDown = (thumbIndex: number) => (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      setActiveThumb(thumbIndex);
      setShowTooltipState(true);
    };

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
      },
      [handleMove]
    );

    const handleMouseUp = useCallback(() => {
      if (isDragging) {
        setIsDragging(false);
        setActiveThumb(null);
        setShowTooltipState(false);
        onChangeCommitted?.(value);
      }
    }, [isDragging, value, onChangeCommitted]);

    // Touch events
    const handleTouchStart = (thumbIndex: number) => (e: React.TouchEvent) => {
      if (disabled) return;
      setIsDragging(true);
      setActiveThumb(thumbIndex);
      setShowTooltipState(true);
    };

    const handleTouchMove = useCallback(
      (e: TouchEvent) => {
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      },
      [handleMove]
    );

    // Track click
    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isDragging) return;

      const newValue = getValueFromPosition(e.clientX, e.clientY);

      if (range && Array.isArray(value)) {
        // Find closest thumb
        const distances = value.map((v) => Math.abs(v - newValue));
        const closestIndex = distances.indexOf(Math.min(...distances));
        const newValues = [...value];
        newValues[closestIndex] = newValue;
        newValues.sort((a, b) => a - b);
        handleChange(newValues);
      } else {
        handleChange(newValue);
      }

      onChangeCommitted?.(value);
    };

    // Keyboard navigation
    const handleKeyDown = (thumbIndex: number) => (e: React.KeyboardEvent) => {
      if (disabled) return;

      let delta = 0;
      const largeStep = (max - min) / 10;

      switch (e.key) {
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
          delta = min - normalizedValue[thumbIndex];
          break;
        case "End":
          delta = max - normalizedValue[thumbIndex];
          break;
        default:
          return;
      }

      e.preventDefault();

      if (range && Array.isArray(value)) {
        const newValues = [...value];
        newValues[thumbIndex] = clamp(
          roundToStep(value[thumbIndex] + delta, step),
          min,
          max
        );
        newValues.sort((a, b) => a - b);
        handleChange(newValues);
      } else {
        const newValue = clamp(
          roundToStep(normalizedValue[0] + delta, step),
          min,
          max
        );
        handleChange(newValue);
      }
    };

    // Event listeners
    useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleMouseUp);

        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          document.removeEventListener("touchmove", handleTouchMove);
          document.removeEventListener("touchend", handleMouseUp);
        };
      }
    }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

    // Generate marks
    const generateMarks = (): SliderMark[] => {
      if (!marks) return [];
      if (Array.isArray(marks)) return marks;

      const markArray: SliderMark[] = [];
      for (let i = min; i <= max; i += step) {
        markArray.push({ value: i });
      }
      return markArray;
    };

    const markArray = generateMarks();

    const contextValue: SliderContextValue = {
      value,
      min,
      max,
      step,
      size,
      variant,
      orientation,
      disabled,
      showTooltip,
      tooltipFormat,
      handleChange,
      marks,
    };

    // If using composable API
    if (children) {
      return (
        <SliderContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn(
              containerVariants({ orientation, disabled }),
              className
            )}
            {...props}
          >
            {children}
          </div>
        </SliderContext.Provider>
      );
    }

    // Props API
    const renderThumb = (thumbValue: number, thumbIndex: number) => {
      const percentage = getPercentage(thumbValue, min, max);
      const positionStyle =
        orientation === "horizontal"
          ? { left: `${percentage}%` }
          : { bottom: `${percentage}%` };

      const showThumbTooltip =
        showTooltip ||
        valueLabelDisplay === "on" ||
        (valueLabelDisplay === "auto" && (isDragging || showTooltipState));

      return (
        <div
          key={thumbIndex}
          className={cn(
            thumbVariants({ variant, size, disabled }),
            thumbClassName
          )}
          style={{
            ...positionStyle,
            ...(orientation === "horizontal"
              ? { transform: "translate(-50%, -50%)", top: "50%" }
              : { transform: "translate(-50%, 50%)", left: "50%" }),
            ...(thumbColor ? { borderColor: thumbColor } : {}),
          }}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={thumbValue}
          aria-valuetext={
            getAriaValueText
              ? getAriaValueText(thumbValue, thumbIndex)
              : undefined
          }
          aria-label={getAriaLabel ? getAriaLabel(thumbIndex) : undefined}
          aria-orientation={orientation}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onMouseDown={handleMouseDown(thumbIndex)}
          onTouchStart={handleTouchStart(thumbIndex)}
          onKeyDown={handleKeyDown(thumbIndex)}
        >
          {showThumbTooltip && (
            <div
              className={cn(tooltipVariants({ orientation }))}
              style={{
                opacity: isDragging && activeThumb === thumbIndex ? 1 : 0,
              }}
            >
              {tooltipFormat(thumbValue)}
            </div>
          )}
        </div>
      );
    };

    return (
      <SliderContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            containerVariants({ orientation, disabled }),
            className
          )}
          {...props}
        >
          {/* Label */}
          {label && (
            <label htmlFor={id} className={labelVariants({ size, required })}>
              {label}
            </label>
          )}

          {/* Slider container */}
          <div
            className={cn(
              "relative flex items-center",
              orientation === "vertical" && "flex-col h-full"
            )}
          >
            {/* Value display */}
            {showValue && orientation === "horizontal" && (
              <div className="mr-4 min-w-[3rem] text-sm font-medium text-foreground">
                {Array.isArray(value) ? value.join(" - ") : value}
              </div>
            )}

            {/* Track wrapper */}
            <div
              className={cn(
                "relative flex-1",
                orientation === "vertical" && "w-auto h-full"
              )}
            >
              {/* Track */}
              <div
                ref={trackRef}
                className={cn(
                  trackVariants({ variant, size, orientation }),
                  trackClassName
                )}
                style={trackColor ? { backgroundColor: trackColor } : {}}
                onClick={handleTrackClick}
              >
                {/* Filled track */}
                <div
                  className={cn(filledTrackVariants({ variant, orientation }))}
                  style={
                    orientation === "horizontal"
                      ? {
                          left: range
                            ? `${getPercentage(
                                Math.min(...normalizedValue),
                                min,
                                max
                              )}%`
                            : "0%",
                          width: range
                            ? `${
                                getPercentage(
                                  Math.max(...normalizedValue),
                                  min,
                                  max
                                ) -
                                getPercentage(
                                  Math.min(...normalizedValue),
                                  min,
                                  max
                                )
                              }%`
                            : `${getPercentage(normalizedValue[0], min, max)}%`,
                        }
                      : {
                          bottom: range
                            ? `${getPercentage(
                                Math.min(...normalizedValue),
                                min,
                                max
                              )}%`
                            : "0%",
                          height: range
                            ? `${
                                getPercentage(
                                  Math.max(...normalizedValue),
                                  min,
                                  max
                                ) -
                                getPercentage(
                                  Math.min(...normalizedValue),
                                  min,
                                  max
                                )
                              }%`
                            : `${getPercentage(normalizedValue[0], min, max)}%`,
                        }
                  }
                />

                {/* Marks */}
                {markArray.map((mark) => {
                  const markPercentage = getPercentage(mark.value, min, max);
                  return (
                    <div
                      key={mark.value}
                      className="absolute"
                      style={
                        orientation === "horizontal"
                          ? { left: `${markPercentage}%` }
                          : { bottom: `${markPercentage}%` }
                      }
                    >
                      <div className={markVariants({ orientation })} />
                      {mark.label && (
                        <div className={markLabelVariants({ orientation })}>
                          {mark.label}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Thumbs */}
                {normalizedValue.map((thumbValue, index) =>
                  renderThumb(thumbValue, index)
                )}
              </div>
            </div>

            {/* Value display (vertical) */}
            {showValue && orientation === "vertical" && (
              <div className="mt-4 text-sm font-medium text-foreground">
                {Array.isArray(value) ? value.join(" - ") : value}
              </div>
            )}
          </div>

          {/* Helper text / Error */}
          {(helperText || error) && (
            <p
              className={cn(
                "mt-1.5 text-xs",
                error ? "text-danger" : "text-muted-foreground"
              )}
            >
              {error || helperText}
            </p>
          )}

          {/* Hidden input for form submission */}
          {name && (
            <input
              type="hidden"
              name={name}
              value={Array.isArray(value) ? value.join(",") : value.toString()}
            />
          )}
        </div>
      </SliderContext.Provider>
    );
  }
);

Slider.displayName = "Slider";

// ===== Composable Subcomponents =====

export interface SliderTrackProps {
  children?: React.ReactNode;
  className?: string;
}

export const SliderTrack = React.forwardRef<HTMLDivElement, SliderTrackProps>(
  ({ children, className }, ref) => {
    const {
      variant,
      size,
      orientation,
      value,
      min,
      max,
      disabled,
      handleChange,
    } = useSlider();

    const trackRef = useRef<HTMLDivElement>(null);

    const normalizedValue = Array.isArray(value) ? value : [value];

    const getValueFromPosition = useCallback(
      (clientX: number, clientY: number) => {
        if (!trackRef.current) return min;

        const rect = trackRef.current.getBoundingClientRect();
        let percentage: number;

        if (orientation === "horizontal") {
          percentage = (clientX - rect.left) / rect.width;
        } else {
          percentage = 1 - (clientY - rect.top) / rect.height;
        }

        percentage = clamp(percentage, 0, 1);
        const rawValue = min + percentage * (max - min);
        return clamp(rawValue, min, max);
      },
      [min, max, orientation]
    );

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      const newValue = getValueFromPosition(e.clientX, e.clientY);
      handleChange(newValue);
    };

    return (
      <div
        ref={ref || trackRef}
        className={cn(trackVariants({ variant, size, orientation }), className)}
        onClick={handleTrackClick}
      >
        {children}
      </div>
    );
  }
);

SliderTrack.displayName = "SliderTrack";

export interface SliderFilledTrackProps {
  className?: string;
}

export const SliderFilledTrack = React.forwardRef<
  HTMLDivElement,
  SliderFilledTrackProps
>(({ className }, ref) => {
  const { variant, orientation, value, min, max } = useSlider();

  const normalizedValue = Array.isArray(value) ? value : [value];

  return (
    <div
      ref={ref}
      className={cn(filledTrackVariants({ variant, orientation }), className)}
      style={
        orientation === "horizontal"
          ? {
              width: `${getPercentage(normalizedValue[0], min, max)}%`,
            }
          : {
              height: `${getPercentage(normalizedValue[0], min, max)}%`,
            }
      }
    />
  );
});

SliderFilledTrack.displayName = "SliderFilledTrack";

export interface SliderThumbProps {
  index?: number;
  className?: string;
}

export const SliderThumb = React.forwardRef<HTMLDivElement, SliderThumbProps>(
  ({ index = 0, className }, ref) => {
    const {
      value,
      min,
      max,
      variant,
      size,
      orientation,
      disabled,
      showTooltip,
      tooltipFormat,
    } = useSlider();

    const [showThumbTooltip, setShowThumbTooltip] = useState(false);

    const normalizedValue = Array.isArray(value) ? value : [value];
    const thumbValue = normalizedValue[index] || normalizedValue[0];
    const percentage = getPercentage(thumbValue, min, max);

    const positionStyle =
      orientation === "horizontal"
        ? { left: `${percentage}%` }
        : { bottom: `${percentage}%` };

    return (
      <div
        ref={ref}
        className={cn(thumbVariants({ variant, size, disabled }), className)}
        style={{
          ...positionStyle,
          ...(orientation === "horizontal"
            ? { transform: "translate(-50%, -50%)", top: "50%" }
            : { transform: "translate(-50%, 50%)", left: "50%" }),
        }}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={thumbValue}
        aria-orientation={orientation}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onMouseEnter={() => setShowThumbTooltip(true)}
        onMouseLeave={() => setShowThumbTooltip(false)}
      >
        {showTooltip && showThumbTooltip && tooltipFormat && (
          <div className={cn(tooltipVariants({ orientation }))}>
            {tooltipFormat(thumbValue)}
          </div>
        )}
      </div>
    );
  }
);

SliderThumb.displayName = "SliderThumb";

export type { SliderProps, SliderMark };
