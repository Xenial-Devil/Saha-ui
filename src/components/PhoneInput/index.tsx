"use client";

import React, { forwardRef, useState, useMemo, useCallback } from "react";
import { cn } from "../../lib/utils";
import type { PhoneInputProps, CountryCode } from "./PhoneInput.types";
import {
  phoneInputContainerVariants,
  phoneInputSelectVariants,
  phoneInputFieldVariants,
} from "./PhoneInput.styles";
import {
  inputLabelVariants as labelVariants,
  helperTextVariants,
} from "../Input/Input.styles";
import Popover from "../Popover";

// A small subset of default countries for the example
const defaultCountries: CountryCode[] = [
  { name: "United States", code: "US", dialCode: "+1" },
  { name: "United Kingdom", code: "GB", dialCode: "+44" },
  { name: "Canada", code: "CA", dialCode: "+1" },
  { name: "Australia", code: "AU", dialCode: "+61" },
  { name: "Germany", code: "DE", dialCode: "+49" },
  { name: "France", code: "FR", dialCode: "+33" },
  { name: "India", code: "IN", dialCode: "+91" },
  { name: "Japan", code: "JP", dialCode: "+81" },
];

const ChevronDownIcon = ({ className }: { className?: string }) => (
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
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/**
 * PhoneInput Component
 *
 * A specialized input composing a country code selector and phone number field.
 *
 * @example
 * ```tsx
 * <PhoneInput
 *   label="Phone Number"
 *   onPhoneChange={(val, country) => console.log(val, country.dialCode)}
 * />
 * ```
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onPhoneChange,
      countryCode,
      defaultCountryCode = "US",
      countries = defaultCountries,
      variant = "default",
      size = "md",
      label,
      helperText,
      error,
      disabled = false,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    // Determine controlled status
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const currentValue = isControlled ? value : internalValue;

    const [selectedCountryCode, setSelectedCountryCode] = useState(
      countryCode || defaultCountryCode,
    );
    const [popoverOpen, setPopoverOpen] = useState(false);

    const fallbackId = React.useId();
    const inputId = id || `phone-input-${fallbackId}`;

    const currentCountry = useMemo(() => {
      const activeCode = countryCode || selectedCountryCode;
      return countries.find((c) => c.code === activeCode) || countries[0]!;
    }, [countryCode, selectedCountryCode, countries]);

    const handlePhoneChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        // Basic strip down to numbers, spaces, minimal formatting
        const val = e.target.value.replace(/[^0-9 \-()]/g, "");
        if (!isControlled) setInternalValue(val);
        onChange?.(e);
        onPhoneChange?.(val, currentCountry);
      },
      [isControlled, onChange, onPhoneChange, currentCountry],
    );

    const handleCountrySelect = useCallback(
      (country: CountryCode) => {
        if (!countryCode) setSelectedCountryCode(country.code);
        onPhoneChange?.(currentValue, country);
        setPopoverOpen(false);
      },
      [countryCode, onPhoneChange, currentValue],
    );

    const CountryTrigger = (
      <button
        type="button"
        className={phoneInputSelectVariants({ disabled })}
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          if (!disabled) setPopoverOpen((prev) => !prev);
        }}
        aria-haspopup="listbox"
        aria-expanded={popoverOpen}
      >
        <span className="font-medium mr-1">{currentCountry.code}</span>
        <span className="text-muted-foreground mr-1">
          {currentCountry.dialCode}
        </span>
        <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
      </button>
    );

    const CountryList = (
      <div
        className="flex flex-col max-h-[250px] overflow-y-auto w-[250px] p-1"
        role="listbox"
      >
        {countries.map((c) => (
          <button
            key={c.code}
            type="button"
            role="option"
            aria-selected={c.code === currentCountry.code}
            onClick={() => handleCountrySelect(c)}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2 text-left text-sm rounded-md transition-colors",
              c.code === currentCountry.code
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted",
            )}
          >
            <span>
              {c.name} ({c.code})
            </span>
            <span
              className={cn(
                "text-xs",
                c.code === currentCountry.code
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground",
              )}
            >
              {c.dialCode}
            </span>
          </button>
        ))}
      </div>
    );

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className={labelVariants({ disabled })}>
            {label}
          </label>
        )}

        <div
          className={phoneInputContainerVariants({
            variant: variant as any,
            size: size as any,
            error: !!error,
            disabled,
          })}
        >
          {/* Country Selector Popover */}
          <Popover
            content={CountryList}
            position="bottom-start"
            open={popoverOpen}
            onOpenChange={setPopoverOpen}
          >
            {CountryTrigger}
          </Popover>

          {/* Number Input */}
          <input
            ref={ref}
            id={inputId}
            type="tel"
            disabled={disabled}
            value={currentValue}
            onChange={handlePhoneChange}
            placeholder={props.placeholder || "(555) 000-0000"}
            className={cn(
              phoneInputFieldVariants({ size: size as any }),
              className,
            )}
            aria-invalid={!!error}
            {...props}
          />
        </div>

        {(error || helperText) && (
          <p className={helperTextVariants({ error: !!error })}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
