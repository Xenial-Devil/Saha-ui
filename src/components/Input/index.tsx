import React, { forwardRef, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { InputProps } from "./Input.types";

/**
 * Input container variants
 */
const inputContainerVariants = cva("relative flex flex-col gap-1.5", {
  variants: {
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

/**
 * Input label variants
 */
const inputLabelVariants = cva(
  "text-sm font-medium transition-colors duration-200",
  {
    variants: {
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

/**
 * Input wrapper variants
 */
const inputWrapperVariants = cva(
  "relative flex items-center transition-all duration-200",
  {
    variants: {
      fullWidth: {
        true: "w-full",
        false: "w-auto min-w-[200px]",
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  }
);

/**
 * Input field variants using CVA with standard variants
 */
const inputVariants = cva(
  "w-full font-medium transition-all duration-200 focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/80 focus:ring-2 focus:ring-secondary/20",
        accent:
          "bg-accent text-accent-foreground border-2 border-accent hover:bg-accent/90 focus:ring-2 focus:ring-accent/20",
        info: "bg-info/10 text-info border-2 border-info hover:bg-info/20 focus:border-info focus:ring-2 focus:ring-info/20",
        success:
          "bg-success/10 text-success border-2 border-success hover:bg-success/20 focus:border-success focus:ring-2 focus:ring-success/20",
        warning:
          "bg-warning/10 text-warning border-2 border-warning hover:bg-warning/20 focus:border-warning focus:ring-2 focus:ring-warning/20",
        error:
          "bg-destructive/10 text-destructive border-2 border-destructive hover:bg-destructive/20 focus:border-destructive focus:ring-2 focus:ring-destructive/20",
        outline:
          "bg-transparent border-2 border-border focus:border-primary hover:border-primary/60 shadow-sm focus:shadow-md",
        ghost:
          "bg-transparent border-2 border-transparent hover:bg-accent/10 focus:bg-accent/10 focus:border-accent/30",
        glass:
          "bg-background/30 backdrop-blur-xl border-2 border-white/10 focus:border-primary/50 hover:border-white/20 shadow-lg focus:shadow-2xl",
      },
      size: {
        sm: "h-9 px-3 text-sm gap-2 rounded-lg",
        md: "h-11 px-4 text-base gap-2.5 rounded-xl",
        lg: "h-13 px-5 text-lg gap-3 rounded-xl",
        xl: "h-16 px-6 text-xl gap-4 rounded-2xl",
      },
      hasStartIcon: {
        true: "",
        false: "",
      },
      hasEndIcon: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        hasStartIcon: true,
        className: "pl-9",
      },
      {
        size: "md",
        hasStartIcon: true,
        className: "pl-11",
      },
      {
        size: "lg",
        hasStartIcon: true,
        className: "pl-12",
      },
      {
        size: "xl",
        hasStartIcon: true,
        className: "pl-14",
      },
      {
        size: "sm",
        hasEndIcon: true,
        className: "pr-9",
      },
      {
        size: "md",
        hasEndIcon: true,
        className: "pr-11",
      },
      {
        size: "lg",
        hasEndIcon: true,
        className: "pr-12",
      },
      {
        size: "xl",
        hasEndIcon: true,
        className: "pr-14",
      },
    ],
    defaultVariants: {
      variant: "outline",
      size: "md",
      hasStartIcon: false,
      hasEndIcon: false,
    },
  }
);

/**
 * Input icon variants
 */
const inputIconVariants = cva(
  "absolute top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200",
  {
    variants: {
      position: {
        start: "",
        end: "",
      },
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-7 h-7",
      },
    },
    compoundVariants: [
      {
        position: "start",
        size: "sm",
        className: "left-3",
      },
      {
        position: "start",
        size: "md",
        className: "left-3.5",
      },
      {
        position: "start",
        size: "lg",
        className: "left-4",
      },
      {
        position: "start",
        size: "xl",
        className: "left-5",
      },
      {
        position: "end",
        size: "sm",
        className: "right-3",
      },
      {
        position: "end",
        size: "md",
        className: "right-3.5",
      },
      {
        position: "end",
        size: "lg",
        className: "right-4",
      },
      {
        position: "end",
        size: "xl",
        className: "right-5",
      },
    ],
    defaultVariants: {
      position: "start",
      size: "md",
    },
  }
);

/**
 * Helper text variants
 */
const helperTextVariants = cva("text-xs transition-colors duration-200", {
  variants: {
    error: {
      true: "text-destructive",
      false: "text-muted-foreground",
    },
  },
  defaultVariants: {
    error: false,
  },
});

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
