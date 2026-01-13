"use client";

import React, { forwardRef, useState, useCallback, useMemo } from "react";
import { cn } from "../../lib/utils";
import type { InputProps } from "./Input.types";
import {
  inputVariants,
  inputContainerVariants,
  inputLabelVariants,
  inputWrapperVariants,
  inputIconVariants,
  helperTextVariants,
} from "./Input.styles";

/**
 * Input Component
 *
 * A flexible and customizable input field that supports:
 * - Controlled mode (React Hook Form Controller, custom state)
 * - Uncontrolled mode (React Hook Form register, traditional forms)
 * - Hybrid patterns with character counting
 *
 * @component
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      size = "md",
      type = "text",
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      showCounter = false,
      required = false,
      fullWidth = false,
      containerClassName,
      labelClassName,
      className,
      disabled,
      maxLength,
      value,
      defaultValue,
      onChange,
      onBlur,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      "aria-required": ariaRequired,
      "aria-errormessage": ariaErrorMessage,
      id,
      ...props
    },
    ref
  ) => {
    // =========================================================================
    // CONTROLLED VS UNCONTROLLED MODE DETECTION
    // =========================================================================
    // Key insight: Check if value prop is provided (not just truthy)
    // This handles empty strings correctly ("" is a valid controlled value)
    const isControlled = value !== undefined;

    // =========================================================================
    // INTERNAL STATE FOR UNCONTROLLED MODE
    // =========================================================================
    // This state serves two purposes:
    // 1. Tracking value in uncontrolled mode for character counter
    // 2. Providing a fallback when no defaultValue is specified
    const [internalValue, setInternalValue] = useState<string>(() => {
      if (defaultValue !== undefined) {
        return String(defaultValue);
      }
      return "";
    });

    // =========================================================================
    // DERIVED VALUES
    // =========================================================================
    // Compute display value based on mode
    const displayValue = useMemo(() => {
      if (isControlled) {
        // In controlled mode, always use the provided value
        return value ?? "";
      }
      // In uncontrolled mode, use internal tracking for counter
      return internalValue;
    }, [isControlled, value, internalValue]);

    // Character count for counter display
    const characterCount = useMemo(() => {
      const val = displayValue;
      if (typeof val === "string") return val.length;
      if (typeof val === "number") return String(val).length;
      if (Array.isArray(val)) return val.join("").length;
      return 0;
    }, [displayValue]);

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    /**
     * Handles input changes while supporting both controlled and uncontrolled modes
     *
     * Key behaviors:
     * - In uncontrolled mode: Updates internal state for counter functionality
     * - In both modes: Forwards the native event to the parent onChange handler
     *
     * This approach ensures compatibility with:
     * - React Hook Form's register() which expects native events
     * - React Hook Form's Controller which also accepts native events
     * - Custom controlled implementations
     */
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        // Update internal state only in uncontrolled mode
        // This is essential for character counter functionality
        if (!isControlled) {
          setInternalValue(e.target.value);
        }

        // Forward the event to the provided onChange handler
        // Both register() and Controller's field.onChange accept the event object
        onChange?.(e);
      },
      [isControlled, onChange]
    );

    /**
     * Handles blur events
     *
     * Important for:
     * - React Hook Form's touched tracking via Controller
     * - Custom validation triggers
     * - Accessibility focus management
     */
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);
      },
      [onBlur]
    );

    // =========================================================================
    // ACCESSIBILITY
    // =========================================================================
    const inputId =
      id || `input-${React?.useId?.() || Math.random().toString(36).slice(2)}`;
    const helperId = helperText || error ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    // Combine custom aria-describedby with auto-generated IDs
    const describedBy = useMemo(() => {
      return (
        [ariaDescribedBy, helperId || errorId].filter(Boolean).join(" ") ||
        undefined
      );
    }, [ariaDescribedBy, helperId, errorId]);

    // =========================================================================
    // COMPUTE INPUT PROPS BASED ON MODE
    // =========================================================================
    /**
     * Critical: Conditionally construct value-related props
     *
     * This prevents React warnings about switching between controlled/uncontrolled
     * and ensures proper behavior in each mode:
     *
     * - Controlled mode: Only pass `value` prop
     * - Uncontrolled mode: Only pass `defaultValue` prop (if provided)
     */
    const valueProps = useMemo(() => {
      if (isControlled) {
        // Controlled mode: Use value prop
        // Ensure we never pass undefined to avoid React warnings
        return { value: value ?? "" };
      }

      // Uncontrolled mode: Use defaultValue if provided
      if (defaultValue !== undefined) {
        return { defaultValue };
      }

      // No value props needed - input will be naturally uncontrolled
      return {};
    }, [isControlled, value, defaultValue]);

    // =========================================================================
    // RENDER
    // =========================================================================
    return (
      <div
        className={cn(
          inputContainerVariants({ fullWidth }),
          containerClassName
        )}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              inputLabelVariants({ disabled: !!disabled }),
              labelClassName
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

        {/* Input Wrapper */}
        <div className={cn(inputWrapperVariants({ fullWidth }))}>
          {/* Start Icon */}
          {startIcon && (
            <span
              className={cn(
                inputIconVariants({
                  position: "start",
                  size,
                })
              )}
              aria-hidden="true"
            >
              {startIcon}
            </span>
          )}

          {/* Input Element */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={describedBy}
            aria-invalid={
              ariaInvalid !== undefined
                ? ariaInvalid
                : error
                ? "true"
                : undefined
            }
            aria-required={
              ariaRequired !== undefined
                ? ariaRequired
                : required
                ? "true"
                : undefined
            }
            aria-errormessage={ariaErrorMessage || errorId}
            className={cn(
              inputVariants({
                variant,
                size,
                hasStartIcon: !!startIcon,
                hasEndIcon: !!endIcon || showCounter,
              }),
              className
            )}
            // Spread value props conditionally based on mode
            {...valueProps}
            // Event handlers
            onChange={handleChange}
            onBlur={handleBlur}
            // Spread remaining props last to allow overrides if needed
            // This includes: name, onFocus, placeholder, pattern, etc.
            {...props}
          />

          {/* End Icon or Counter */}
          {(endIcon || showCounter) && (
            <span
              className={cn(
                inputIconVariants({
                  position: "end",
                  size,
                })
              )}
              aria-hidden={!showCounter}
            >
              {showCounter && maxLength ? (
                <span
                  className="text-xs font-medium pointer-events-auto"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="sr-only">
                    {characterCount} of {maxLength} characters used
                  </span>
                  <span aria-hidden="true">
                    {characterCount}/{maxLength}
                  </span>
                </span>
              ) : (
                endIcon
              )}
            </span>
          )}
        </div>

        {/* Helper Text / Error Message */}
        {(helperText || error) && (
          <p
            id={helperId || errorId}
            className={cn(helperTextVariants({ error: !!error }))}
            role={error ? "alert" : undefined}
            aria-live={error ? "polite" : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
