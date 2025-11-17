"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "../../lib/utils";
// validation removed
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
 * A flexible and customizable input field with multiple variants,
 * sizes, validation states, icons, and helper text support.
 *
 * Supports all HTML input types except file.
 * Fully accessible with ARIA attributes and screen reader support.
 *
 * @component
 * @example
 * ```tsx
 * // Basic input
 * <Input placeholder="Enter your name" />
 *
 * // With label and helper text
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   helperText="We'll never share your email"
 * />
 *
 * // With icons
 * <Input
 *   label="Search"
 *   startIcon={<Search />}
 *   placeholder="Search..."
 * />
 *
 * // With validation
 * <Input
 *   label="Password"
 *   type="password"
 *   variant="error"
 *   error="Password must be at least 8 characters"
 * />
 *
 * // With accessibility
 * <Input
 *   aria-label="Search articles"
 *   placeholder="Search..."
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outline",
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
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      "aria-required": ariaRequired,
      "aria-errormessage": ariaErrorMessage,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      defaultValue?.toString() || ""
    );
    const currentValue = value !== undefined ? value : internalValue;

    // development-only validation removed

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const characterCount =
      typeof currentValue === "string" ? currentValue.length : 0;

    // Generate unique IDs for accessibility
    const helperId =
      helperText || error ? `${props.id || "input"}-helper` : undefined;
    const errorId = error ? `${props.id || "input"}-error` : undefined;

    // Determine aria-describedby - combine custom and auto-generated
    const describedBy =
      [ariaDescribedBy, helperId || errorId].filter(Boolean).join(" ") ||
      undefined;

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
            htmlFor={props.id}
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
                  ...(size && { size }),
                })
              )}
            >
              {startIcon}
            </span>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={type}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
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
                ...(size && { size }),
                hasStartIcon: !!startIcon,
                hasEndIcon: !!endIcon || showCounter,
              }),
              className
            )}
            {...props}
          />

          {/* End Icon or Counter */}
          {(endIcon || showCounter) && (
            <span
              className={cn(
                inputIconVariants({
                  position: "end",
                  ...(size && { size }),
                })
              )}
            >
              {showCounter && maxLength ? (
                <span className="text-xs font-medium pointer-events-auto">
                  {characterCount}/{maxLength}
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
