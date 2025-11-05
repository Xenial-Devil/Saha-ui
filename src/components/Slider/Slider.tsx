"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { cn } from "../../lib/utils";
import type {
  SliderProps,
  SliderSize,
  SliderVariant,
  SliderOrientation,
  SliderMark,
} from "./Slider.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";
import {
  containerVariants,
  trackVariants,
  thumbVariants,
  tooltipVariants,
  markVariants,
  markLabelVariants,
  labelVariants,
  filledTrackVariants,
} from "./Slider.styles";

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
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Slider");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "ghost",
        "glass",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate orientation
      validator.validateEnum("orientation", orientation, [
        "horizontal",
        "vertical",
      ] as const);

      // Validate valueLabelDisplay
      validator.validateEnum("valueLabelDisplay", valueLabelDisplay, [
        "auto",
        "on",
        "off",
      ] as const);

      // Validate numeric props
      validator.validateType("min", min, "number", isValidNumber);
      validator.validateType("max", max, "number", isValidNumber);
      validator.validateType("step", step, "number", isValidNumber);

      if (min >= max) {
        validator.error("min must be less than max");
      }

      if (step <= 0) {
        validator.error("step must be greater than 0");
      }

      if (step > max - min) {
        validator.warn("step is larger than the range (max - min)");
      }

      // Validate value range
      if (controlledValue !== undefined) {
        const values = Array.isArray(controlledValue)
          ? controlledValue
          : [controlledValue];
        values.forEach((val, index) => {
          if (val < min || val > max) {
            validator.error(
              `value[${index}] (${val}) is outside the range [${min}, ${max}]`
            );
          }
        });
      }

      // Validate boolean props
      validator.validateType("disabled", disabled, "boolean", isValidBoolean);
      validator.validateType("showValue", showValue, "boolean", isValidBoolean);
      validator.validateType(
        "showTooltip",
        showTooltip,
        "boolean",
        isValidBoolean
      );
      validator.validateType("range", range, "boolean", isValidBoolean);
      validator.validateType("required", required, "boolean", isValidBoolean);

      // Common validators
      commonValidators.className(validator, className);
    }, [
      variant,
      size,
      orientation,
      valueLabelDisplay,
      min,
      max,
      step,
      controlledValue,
      disabled,
      showValue,
      showTooltip,
      range,
      required,
      className,
    ]);

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
    const handleTouchStart = (thumbIndex: number) => (_e: React.TouchEvent) => {
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
      return undefined;
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
    const { variant, size, orientation, min, max, disabled, handleChange } =
      useSlider();

    const trackRef = useRef<HTMLDivElement>(null);

    // const normalizedValue = Array.isArray(value) ? value : [value];

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
