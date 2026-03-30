"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../InputOTP";
import type { OTPDisplayBlockProps } from "./OTPDisplayBlock.types";
import { otpDisplayBlockVariants } from "./OTPDisplayBlock.styles";

/**
 * OTPDisplayBlock component
 *
 * A high-level layout block component that wraps InputOTP for easy out-of-the-box usage.
 * Automatically handles sizing, grouping logic, and error displaying.
 *
 * @component
 * @example
 * // Basic usage
 * <OTPDisplayBlock
 *   length={6}
 *   value={otp}
 *   onChange={setOtp}
 * />
 *
 * @example
 * // Error state handling
 * <OTPDisplayBlock
 *   length={4}
 *   error="Invalid code provided"
 * />
 */
export const OTPDisplayBlock = forwardRef<HTMLDivElement, OTPDisplayBlockProps>(
  (
    {
      value,
      length = 6,
      onChange,
      onComplete,
      error,
      secure = false,
      className,
      ...props
    },
    ref,
  ) => {
    // Generate arrays of length/2 if length is even and > 3, to split into two groups cleanly
    // Otherwise just one group
    const isSplit = length % 2 === 0 && length > 3;
    const half = Math.floor(length / 2);

    return (
      <div
        ref={ref}
        className={cn(otpDisplayBlockVariants(), className)}
        {...props}
      >
        <InputOTP
          length={length}
          value={value}
          onChange={onChange}
          onComplete={onComplete}
          error={error}
          mask={secure}
        >
          {isSplit ? (
            <div className="flex gap-2 items-center">
              <InputOTPGroup>
                {Array.from({ length: half }).map((_, index) => (
                  <InputOTPSlot key={`first-${index}`} index={index} />
                ))}
              </InputOTPGroup>
              <div className="w-4 h-1 bg-border rounded" />
              <InputOTPGroup>
                {Array.from({ length: half }).map((_, index) => (
                  <InputOTPSlot key={`second-${index}`} index={index + half} />
                ))}
              </InputOTPGroup>
            </div>
          ) : (
            <InputOTPGroup>
              {Array.from({ length }).map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          )}
        </InputOTP>
        {error && (
          <p className="text-sm font-medium text-destructive mt-2">{error}</p>
        )}
      </div>
    );
  },
);
OTPDisplayBlock.displayName = "OTPDisplayBlock";
