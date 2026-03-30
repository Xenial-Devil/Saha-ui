"use client";

import React, {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { cn } from "../../lib/utils";
import type { NumberInputProps } from "./NumberInput.types";
import {
  numberInputContainerVariants,
  numberInputLabelVariants,
  numberInputWrapperVariants,
  numberInputFieldVariants,
  numberInputButtonVariants,
  helperTextVariants,
} from "./NumberInput.styles";

/**
 * Chevron Up icon
 * @private
 */
const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

/**
 * Chevron Down icon
 * @private
 */
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/**
 * Minus icon
 * @private
 */
const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M5 12h14" />
  </svg>
);

/**
 * Plus icon
 * @private
 */
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const clamp = (value: number, min?: number, max?: number): number => {
  let clamped = value;
  if (min !== undefined && clamped < min) clamped = min;
  if (max !== undefined && clamped > max) clamped = max;
  return clamped;
};

const roundToPrecision = (value: number, precision: number): number => {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};

/**
 * NumberInput Component
 *
 * A number input with increment/decrement controls, min/max/step,
 * precision, keyboard support, and customizable formatting.
 *
 * @component
 * @example
 * <NumberInput label="Quantity" min={0} max={100} step={1} />
 *
 * @example
 * <NumberInput label="Price" precision={2} step={0.01} formatter={(v) => `$${v}`} />
 *
 * @example
 * <NumberInput controlsPosition="sides" size="lg" />
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      precision = 0,
      variant = "default",
      size = "md",
      showControls = true,
      controlsPosition = "right",
      label,
      helperText,
      error,
      allowEmpty = true,
      clampOnBlur = true,
      formatter,
      parser,
      fullWidth = false,
      disabled = false,
      required = false,
      placeholder,
      containerClassName,
      labelClassName,
      className,
      incrementIcon,
      decrementIcon,
      id,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<number | null>(
      defaultValue ?? null,
    );
    const [displayValue, setDisplayValue] = useState<string>(() => {
      const val = isControlled ? controlledValue : defaultValue;
      if (val == null) return "";
      const rounded = roundToPrecision(val, precision);
      return formatter ? formatter(rounded) : rounded.toFixed(precision);
    });
    const [isFocused, setIsFocused] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const currentValue = isControlled ? controlledValue : internalValue;

    const updateValue = useCallback(
      (newValue: number | null) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);

        if (newValue == null) {
          setDisplayValue("");
        } else {
          const rounded = roundToPrecision(newValue, precision);
          setDisplayValue(
            formatter ? formatter(rounded) : rounded.toFixed(precision),
          );
        }
      },
      [isControlled, onChange, precision, formatter],
    );

    // Sync display value when controlled value changes
    useEffect(() => {
      if (isControlled && !isFocused) {
        if (controlledValue == null) {
          setDisplayValue("");
        } else {
          const rounded = roundToPrecision(controlledValue, precision);
          setDisplayValue(
            formatter ? formatter(rounded) : rounded.toFixed(precision),
          );
        }
      }
    }, [controlledValue, isControlled, isFocused, precision, formatter]);

    const increment = useCallback(() => {
      const current = currentValue ?? min ?? 0;
      const next = roundToPrecision(current + step, precision);
      const clamped = clamp(next, min, max);
      updateValue(clamped);
    }, [currentValue, step, precision, min, max, updateValue]);

    const decrement = useCallback(() => {
      const current = currentValue ?? max ?? 0;
      const next = roundToPrecision(current - step, precision);
      const clamped = clamp(next, min, max);
      updateValue(clamped);
    }, [currentValue, step, precision, min, max, updateValue]);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        setDisplayValue(raw);

        if (raw === "" || raw === "-") {
          if (allowEmpty) updateValue(null);
          return;
        }

        const parsed = parser ? parser(raw) : parseFloat(raw);
        if (!isNaN(parsed)) {
          updateValue(roundToPrecision(parsed, precision));
        }
      },
      [allowEmpty, parser, precision, updateValue],
    );

    const handleBlur = useCallback(() => {
      setIsFocused(false);
      if (displayValue === "" || displayValue === "-") {
        if (!allowEmpty && min !== undefined) {
          updateValue(min);
        }
        return;
      }

      let val = currentValue;
      if (val != null && clampOnBlur) {
        val = clamp(val, min, max);
        updateValue(val);
      } else if (val != null) {
        const rounded = roundToPrecision(val, precision);
        setDisplayValue(
          formatter ? formatter(rounded) : rounded.toFixed(precision),
        );
      }
    }, [
      displayValue,
      currentValue,
      clampOnBlur,
      min,
      max,
      allowEmpty,
      precision,
      formatter,
      updateValue,
    ]);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      // Show raw number on focus for editing
      if (currentValue != null && formatter) {
        setDisplayValue(
          roundToPrecision(currentValue, precision).toFixed(precision),
        );
      }
    }, [currentValue, formatter, precision]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          increment();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          decrement();
        }
      },
      [increment, decrement],
    );

    // Long press support for buttons
    const startRepeat = useCallback((action: () => void) => {
      action();
      intervalRef.current = setInterval(action, 100);
    }, []);

    const stopRepeat = useCallback(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, []);

    useEffect(() => {
      return stopRepeat;
    }, [stopRepeat]);

    const isAtMin = currentValue != null && min != null && currentValue <= min;
    const isAtMax = currentValue != null && max != null && currentValue >= max;
    const fallbackId = React.useId();
    const inputId = id || `number-input-${fallbackId}`;

    const decrementButton = (position: "left" | "bottom") => (
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled || isAtMin}
        onMouseDown={() => startRepeat(decrement)}
        onMouseUp={stopRepeat}
        onMouseLeave={stopRepeat}
        className={numberInputButtonVariants({ position, size })}
        aria-label="Decrease value"
      >
        {decrementIcon ||
          (position === "left" ? <MinusIcon /> : <ChevronDownIcon />)}
      </button>
    );

    const incrementButton = (position: "right" | "top") => (
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled || isAtMax}
        onMouseDown={() => startRepeat(increment)}
        onMouseUp={stopRepeat}
        onMouseLeave={stopRepeat}
        className={numberInputButtonVariants({ position, size })}
        aria-label="Increase value"
      >
        {incrementIcon ||
          (position === "right" ? <PlusIcon /> : <ChevronUpIcon />)}
      </button>
    );

    return (
      <div
        className={cn(
          numberInputContainerVariants({ fullWidth }),
          containerClassName,
        )}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              numberInputLabelVariants({ disabled }),
              labelClassName,
            )}
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div
          className={numberInputWrapperVariants({
            variant,
            size,
            error: !!error,
            disabled,
          })}
        >
          {/* Left button (sides mode) */}
          {showControls &&
            controlsPosition === "sides" &&
            decrementButton("left")}

          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="decimal"
            role="spinbutton"
            aria-valuenow={currentValue ?? undefined}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-invalid={error ? "true" : undefined}
            aria-required={required ? "true" : undefined}
            disabled={disabled}
            placeholder={
              placeholder ??
              (precision > 0 ? `0.${"0".repeat(precision)}` : "0")
            }
            value={displayValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            className={cn(numberInputFieldVariants({ size }), className)}
            {...props}
          />

          {/* Right controls (stacked or single) */}
          {showControls && controlsPosition === "right" && (
            <div className="flex flex-col">
              {incrementButton("top")}
              {decrementButton("bottom")}
            </div>
          )}

          {/* Right button (sides mode) */}
          {showControls &&
            controlsPosition === "sides" &&
            incrementButton("right")}
        </div>

        {(error || helperText) && (
          <p
            className={helperTextVariants({ error: !!error })}
            role={error ? "alert" : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
