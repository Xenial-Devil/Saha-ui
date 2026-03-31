import React from "react";
import type { InputSize, InputVariant } from "../Input/Input.types";

export interface CountryCode {
  name: string;
  code: string;
  dialCode: string;
}

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Phone number value (controlled)
   */
  value?: string;

  /**
   * Default phone number value (uncontrolled)
   */
  defaultValue?: string;

  /**
   * Callback fired when the value or selected country changes
   */
  onPhoneChange?: (value: string, country: CountryCode) => void;

  /**
   * Currently selected country code (e.g., "US", "GB")
   */
  countryCode?: string;

  /**
   * Default country code to select initially
   * @default "US"
   */
  defaultCountryCode?: string;

  /**
   * Supported countries array. If not provided, uses a default list.
   */
  countries?: CountryCode[];

  /**
   * Visual style variant
   * @default "default"
   */
  variant?: InputVariant;

  /**
   * Component size
   * @default "md"
   */
  size?: InputSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text below the input
   */
  helperText?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Disable the input
   */
  disabled?: boolean;
}
