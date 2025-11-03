import React, { forwardRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import {
  createValidator,
  commonValidators,
  isValidNumber,
} from "../../lib/validation";
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
 *
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
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      defaultValue?.toString() || ""
    );
    const currentValue = value !== undefined ? value : internalValue;

    // ===== PROP VALIDATION =====
    useEffect(() => {
      if (process.env.NODE_ENV !== "production") {
        const validator = createValidator("Input");

        // Common validators
        commonValidators.size(validator, size);
        const inputVariants = [
          "primary",
          "secondary",
          "accent",
          "info",
          "success",
          "warning",
          "error",
          "outline",
          "ghost",
          "glass",
        ] as const;
        commonValidators.variant(validator, variant, inputVariants);
        commonValidators.disabled(validator, disabled);
        commonValidators.className(validator, className);

        // Input-specific validations
        if (maxLength !== undefined) {
          if (!isValidNumber(maxLength)) {
            validator.error("Invalid prop: 'maxLength' must be a number.");
          } else if (maxLength < 0) {
            validator.error(
              "Invalid prop: 'maxLength' must be a positive number."
            );
          }
        }

        if (showCounter && !maxLength) {
          validator.warn(
            "Warning: 'showCounter' is enabled but 'maxLength' is not set. Counter will not be displayed."
          );
        }

        if (fullWidth !== undefined && typeof fullWidth !== "boolean") {
          validator.error("Invalid prop: 'fullWidth' must be a boolean.");
        }

        if (required !== undefined && typeof required !== "boolean") {
          validator.error("Invalid prop: 'required' must be a boolean.");
        }
      }
    }, [
      variant,
      size,
      disabled,
      className,
      maxLength,
      showCounter,
      fullWidth,
      required,
    ]);
    // ===== END PROP VALIDATION =====

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const characterCount =
      typeof currentValue === "string" ? currentValue.length : 0;

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
            className={cn(
              inputLabelVariants({ disabled: !!disabled }),
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
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
          <p className={cn(helperTextVariants({ error: !!error }))}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
