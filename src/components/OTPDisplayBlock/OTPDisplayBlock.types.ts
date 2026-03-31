import type { HTMLAttributes } from "react";

export interface OTPDisplayBlockProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** The value of the OTP */
  value?: string;
  /** Length of the OTP (default 6) */
  length?: number;
  /** Function triggered when OTP value changes */
  onChange?: (value: string) => void;
  /** Function triggered when OTP is complete */
  onComplete?: (value: string) => void;
  /** Error message to display */
  error?: string;
  /** Hide the digits */
  secure?: boolean;
}
