"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useMemo,
  forwardRef,
} from "react";
import { cn } from "../../lib/utils";
import { createValidator } from "../../lib/validation";
import type {
  InputOTPProps,
  InputOTPContextValue,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
  InputOTPGroupProps,
} from "./InputOTP.types";
import {
  otpContainerVariants,
  otpLabelVariants,
  otpGroupVariants,
  otpSlotVariants,
  otpSeparatorVariants,
  otpHelperTextVariants,
} from "./InputOTP.styles";

// Create context for InputOTP
const InputOTPContext = createContext<InputOTPContextValue | null>(null);

/**
 * Hook to access InputOTP context
 */
const useInputOTP = () => {
  const context = useContext(InputOTPContext);
  if (!context) {
    throw new Error(
      "InputOTP components must be used within an InputOTP component"
    );
  }
  return context;
};

/**
 * InputOTP Component - Advanced OTP input with dual API support
 *
 * @example
 * // Compact props-based API
 * <InputOTP length={6} variant="primary" onComplete={(value) => console.log(value)} />
 *
 * @example
 * // Composable component API
 * <InputOTP value={otp} onChange={setOtp}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup>
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 */
export const InputOTP = forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      length = 6,
      variant = "outline",
      size = "md",
      type = "numeric",
      value: controlledValue,
      defaultValue = "",
      onChange,
      onComplete,
      mask = false,
      maskChar = "•",
      disabled = false,
      autoFocus = false,
      pattern,
      label,
      helperText,
      error,
      required = false,
      containerClassName,
      labelClassName,
      className,
      onBlur,
      onFocus,
      showSeparator = false,
      groupSize = 3,
      separator = "-",
      allowPaste = true,
      children,
    },
    ref
  ) => {
    // Runtime validation (development only)
    if (process.env.NODE_ENV === "development") {
      const validator = createValidator("InputOTP");
      validator.validateEnum("variant", variant, [
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
      ]);
      validator.validateEnum("size", size, ["sm", "md", "lg", "xl"]);
      validator.validateEnum("type", type, ["numeric", "alphanumeric", "text"]);

      if (length < 1 || length > 12) {
        console.error(
          `[InputOTP] Invalid prop 'length': must be between 1 and 12, received ${length}`
        );
      }

      if (controlledValue !== undefined && onChange === undefined) {
        console.warn(
          "[InputOTP] Component is controlled (value prop provided) but no onChange handler is provided. " +
            "This will result in a read-only input. Did you forget to add an onChange prop?"
        );
      }
    }

    const [internalValue, setInternalValue] = useState(defaultValue);
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Determine if controlled or uncontrolled
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    // Auto-focus first input on mount
    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    // Call onComplete when value reaches length
    useEffect(() => {
      if (value.length === length && onComplete) {
        onComplete(value);
      }
    }, [value, length, onComplete]);

    /**
     * Get pattern based on type
     */
    const getPattern = (): RegExp => {
      if (pattern) return pattern;
      switch (type) {
        case "numeric":
          return /^[0-9]$/;
        case "alphanumeric":
          return /^[a-zA-Z0-9]$/;
        case "text":
          return /^.$/;
        default:
          return /^[0-9]$/;
      }
    };

    /**
     * Handle character input
     */
    const handleChange = (index: number, char: string) => {
      if (disabled) return;

      const charPattern = getPattern();

      // Validate character
      if (char && !charPattern.test(char)) {
        return;
      }

      const newValue = value.split("");
      newValue[index] = char.toUpperCase();
      const updatedValue = newValue.join("");

      if (isControlled) {
        onChange?.(updatedValue);
      } else {
        setInternalValue(updatedValue);
        onChange?.(updatedValue);
      }

      // Move to next input if character was entered
      if (char && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    /**
     * Handle key down events
     */
    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (disabled) return;

      // Handle backspace
      if (e.key === "Backspace") {
        e.preventDefault();
        const newValue = value.split("");

        if (newValue[index]) {
          // Clear current value
          newValue[index] = "";
          const updatedValue = newValue.join("");
          if (isControlled) {
            onChange?.(updatedValue);
          } else {
            setInternalValue(updatedValue);
            onChange?.(updatedValue);
          }
        } else if (index > 0) {
          // Move to previous and clear
          newValue[index - 1] = "";
          const updatedValue = newValue.join("");
          if (isControlled) {
            onChange?.(updatedValue);
          } else {
            setInternalValue(updatedValue);
            onChange?.(updatedValue);
          }
          inputRefs.current[index - 1]?.focus();
        }
      }

      // Handle delete
      if (e.key === "Delete") {
        e.preventDefault();
        const newValue = value.split("");
        newValue[index] = "";
        const updatedValue = newValue.join("");
        if (isControlled) {
          onChange?.(updatedValue);
        } else {
          setInternalValue(updatedValue);
          onChange?.(updatedValue);
        }
      }

      // Handle arrow keys
      if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      }

      if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      }

      // Handle home/end
      if (e.key === "Home") {
        e.preventDefault();
        inputRefs.current[0]?.focus();
      }

      if (e.key === "End") {
        e.preventDefault();
        inputRefs.current[length - 1]?.focus();
      }
    };

    /**
     * Handle paste event
     */
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (!allowPaste || disabled) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
      const charPattern = getPattern();

      // Validate pasted data
      const validChars = pastedData
        .split("")
        .filter((char) => charPattern.test(char))
        .slice(0, length);

      const newValue = validChars.join("").toUpperCase();

      if (isControlled) {
        onChange?.(newValue);
      } else {
        setInternalValue(newValue);
        onChange?.(newValue);
      }

      // Focus last filled input or first empty
      const nextIndex = Math.min(validChars.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    };

    /**
     * Handle focus
     */
    const handleFocus = (index: number) => {
      setActiveIndex(index);
      onFocus?.(new FocusEvent("focus") as any);
    };

    /**
     * Handle blur
     */
    const handleBlur = () => {
      setActiveIndex(-1);
      onBlur?.(new FocusEvent("blur") as any);
    };

    // Context value
    const contextValue: InputOTPContextValue = useMemo(
      () => ({
        value,
        variant,
        size,
        type,
        disabled,
        mask,
        maskChar,
        activeIndex,
        handleChange,
        handleKeyDown,
        handleFocus,
        handleBlur,
        inputRefs,
      }),
      [value, variant, size, type, disabled, mask, maskChar, activeIndex]
    );

    // If children are provided, use composable API
    if (children) {
      return (
        <InputOTPContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn(otpContainerVariants(), containerClassName)}
          >
            {label && (
              <label
                className={cn(otpLabelVariants({ disabled }), labelClassName)}
              >
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </label>
            )}
            <div className={cn("flex items-center", className)}>{children}</div>
            {(error || helperText) && (
              <p className={otpHelperTextVariants({ error: !!error })}>
                {error || helperText}
              </p>
            )}
          </div>
        </InputOTPContext.Provider>
      );
    }

    // Compact props-based API
    const slots = Array.from({ length }, (_, index) => {
      const isLastInGroup =
        showSeparator && (index + 1) % groupSize === 0 && index < length - 1;

      return (
        <React.Fragment key={index}>
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode={type === "numeric" ? "numeric" : "text"}
            maxLength={1}
            value={mask && value[index] ? maskChar : value[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            disabled={disabled}
            aria-label={`OTP digit ${index + 1}`}
            className={cn(
              otpSlotVariants({
                variant,
                size,
                hasValue: !!value[index],
                isActive: activeIndex === index,
              })
            )}
          />
          {isLastInGroup && (
            <div className={cn(otpSeparatorVariants({ size }))}>
              {separator}
            </div>
          )}
        </React.Fragment>
      );
    });

    return (
      <InputOTPContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(otpContainerVariants(), containerClassName)}
        >
          {label && (
            <label
              className={cn(otpLabelVariants({ disabled }), labelClassName)}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}
          <div className={cn(otpGroupVariants({ size }), className)}>
            {slots}
          </div>
          {(error || helperText) && (
            <p className={otpHelperTextVariants({ error: !!error })}>
              {error || helperText}
            </p>
          )}
        </div>
      </InputOTPContext.Provider>
    );
  }
);

InputOTP.displayName = "InputOTP";

/**
 * InputOTPGroup - Groups OTP slots together (composable API)
 */
export const InputOTPGroup: React.FC<InputOTPGroupProps> = ({
  className,
  children,
}) => {
  const { size } = useInputOTP();

  return (
    <div className={cn(otpGroupVariants({ size }), className)}>{children}</div>
  );
};

InputOTPGroup.displayName = "InputOTPGroup";

/**
 * InputOTPSlot - Individual OTP input slot (composable API)
 */
export const InputOTPSlot: React.FC<InputOTPSlotProps> = ({
  index,
  className,
}) => {
  const {
    value,
    variant,
    size,
    type,
    disabled,
    mask,
    maskChar,
    activeIndex,
    handleChange,
    handleKeyDown,
    handleFocus,
    handleBlur,
    inputRefs,
  } = useInputOTP();

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");

    // Let the first slot handle paste logic through parent
    if (index === 0) {
      const charPattern = type === "numeric" ? /^[0-9]$/ : /^[a-zA-Z0-9]$/;
      const validChars = pastedData
        .split("")
        .filter((char) => charPattern.test(char));

      validChars.forEach((char, i) => {
        if (i < inputRefs.current.length) {
          handleChange(i, char);
        }
      });

      const nextIndex = Math.min(
        validChars.length,
        inputRefs.current.length - 1
      );
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <input
      ref={(el) => {
        inputRefs.current[index] = el;
      }}
      type="text"
      inputMode={type === "numeric" ? "numeric" : "text"}
      maxLength={1}
      value={mask && value[index] ? maskChar : value[index] || ""}
      onChange={(e) => handleChange(index, e.target.value)}
      onKeyDown={(e) => handleKeyDown(index, e)}
      onPaste={index === 0 ? handlePaste : undefined}
      onFocus={() => handleFocus(index)}
      onBlur={handleBlur}
      disabled={disabled}
      aria-label={`OTP digit ${index + 1}`}
      className={cn(
        otpSlotVariants({
          variant,
          size,
          hasValue: !!value[index],
          isActive: activeIndex === index,
        }),
        className
      )}
    />
  );
};

InputOTPSlot.displayName = "InputOTPSlot";

/**
 * InputOTPSeparator - Visual separator between OTP groups (composable API)
 */
export const InputOTPSeparator: React.FC<InputOTPSeparatorProps> = ({
  className,
  children = "-",
}) => {
  const { size } = useInputOTP();

  return (
    <div className={cn(otpSeparatorVariants({ size }), className)}>
      {children}
    </div>
  );
};

InputOTPSeparator.displayName = "InputOTPSeparator";

export default InputOTP;
