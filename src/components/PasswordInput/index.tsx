"use client";

import React, { forwardRef, useState, useMemo, useCallback } from "react";
import { cn } from "../../lib/utils";
import { Input } from "../Input";
import type { PasswordInputProps, PasswordStrength } from "./PasswordInput.types";
import {
  strengthBarContainerVariants,
  strengthBarSegmentVariants,
  strengthLabelVariants,
  toggleButtonVariants,
} from "./PasswordInput.styles";

/**
 * Calculates password strength based on common rules
 * @private
 */
const defaultStrengthFn = (value: string): PasswordStrength => {
  if (!value || value.length < 4) return "weak";

  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^a-zA-Z0-9]/.test(value)) score++;

  if (score <= 1) return "weak";
  if (score <= 2) return "fair";
  if (score <= 3) return "good";
  return "strong";
};

const strengthLabels: Record<PasswordStrength, string> = {
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
};

const strengthSegmentCount: Record<PasswordStrength, number> = {
  weak: 1,
  fair: 2,
  good: 3,
  strong: 4,
};

/**
 * Eye icon (visible)
 * @private
 */
const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/**
 * Eye-off icon (hidden)
 * @private
 */
const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
    <path d="m2 2 20 20" />
  </svg>
);

/**
 * PasswordInput Component
 *
 * A password input field with visibility toggle and optional strength indicator.
 * Built by composing the existing Input component.
 *
 * @component
 * @example
 * // Basic password input
 * <PasswordInput label="Password" />
 *
 * @example
 * // With strength indicator
 * <PasswordInput label="Password" strengthIndicator />
 *
 * @example
 * // Controlled with custom strength function
 * <PasswordInput
 *   label="Password"
 *   strengthIndicator
 *   strengthFn={(val) => val.length > 12 ? "strong" : "weak"}
 * />
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      showToggle = true,
      strengthIndicator = false,
      strengthLevel,
      strengthFn,
      toggleAriaLabel = "Toggle password visibility",
      value,
      defaultValue,
      onChange,
      size = "md",
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [internalValue, setInternalValue] = useState(
      () => (defaultValue as string) || ""
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value ?? "") : internalValue;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [isControlled, onChange]
    );

    const computedStrength = useMemo<PasswordStrength>(() => {
      if (strengthLevel) return strengthLevel;
      const fn = strengthFn || defaultStrengthFn;
      return fn(currentValue);
    }, [strengthLevel, strengthFn, currentValue]);

    const activeSegments = strengthSegmentCount[computedStrength];

    const toggleButton = showToggle ? (
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className={toggleButtonVariants({ size })}
        aria-label={toggleAriaLabel}
        tabIndex={-1}
      >
        {visible ? (
          <EyeOffIcon className="h-full w-full" />
        ) : (
          <EyeIcon className="h-full w-full" />
        )}
      </button>
    ) : undefined;

    return (
      <div className={cn("flex flex-col", containerClassName)}>
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          size={size}
          endIcon={toggleButton}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={handleChange}
          className={className}
          {...props}
        />

        {/* Strength Indicator */}
        {strengthIndicator && currentValue.length > 0 && (
          <div>
            <div className={strengthBarContainerVariants({ size })}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={strengthBarSegmentVariants({
                    active: i < activeSegments,
                    strength: i < activeSegments ? computedStrength : undefined,
                  })}
                />
              ))}
            </div>
            <p className={strengthLabelVariants({ strength: computedStrength })}>
              {strengthLabels[computedStrength]}
            </p>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
