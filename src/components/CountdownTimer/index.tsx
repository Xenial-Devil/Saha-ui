"use client";

import { forwardRef, useState, useEffect, useMemo } from "react";
import { cn } from "../../lib/utils";
import type { CountdownTimerProps } from "./CountdownTimer.types";
import {
  countdownTimerVariants,
  countdownDigitVariants,
  countdownLabelVariants,
  countdownSeparatorVariants,
} from "./CountdownTimer.styles";

/**
 * CountdownTimer Component
 *
 * Displays a countdown to a specific date or time.
 * Uses a basic `setInterval` internally.
 *
 * @example
 * ```tsx
 * <CountdownTimer 
 *   targetDate={new Date("2026-01-01T00:00:00")}
 *   onComplete={() => alert("Happy New Year!")}
 * />
 * ```
 */
export const CountdownTimer = forwardRef<HTMLDivElement, CountdownTimerProps>(
  (
    {
      targetDate,
      onComplete,
      showLabels = true,
      variant = "default",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    
    const parseTargetDate = () => {
      if (targetDate instanceof Date) return targetDate;
      return new Date(targetDate);
    };

    const target = useMemo(parseTargetDate, [targetDate]);
    
    const [timeLeft, setTimeLeft] = useState<{
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
      isExpired: boolean;
    }>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: false,
    });

    useEffect(() => {
      const calculateTimeLeft = () => {
        const difference = target.getTime() - new Date().getTime();
        
        if (difference <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
          return true;
        }

        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false,
        });
        
        return false;
      };

      // Initial Call
      const expired = calculateTimeLeft();
      
      if (expired) {
        onComplete?.();
        return;
      }

      const intervalId = setInterval(() => {
        const isDone = calculateTimeLeft();
        if (isDone) {
          clearInterval(intervalId);
          onComplete?.();
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }, [target, onComplete]);

    const Box = ({ value, label }: { value: number; label: string }) => (
      <div className="flex flex-col items-center justify-center min-w-[50px]">
        <span className={countdownDigitVariants({ size })}>
          {String(value).padStart(2, '0')}
        </span>
        {showLabels && <span className={countdownLabelVariants({ size })}>{label}</span>}
      </div>
    );

    const Separator = () => (
      <div className={countdownSeparatorVariants({ size })}>:</div>
    );

    return (
      <div 
        ref={ref} 
        className={cn(countdownTimerVariants({ variant }), className)} 
        {...props}
      >
        {timeLeft.days > 0 && (
          <>
            <Box value={timeLeft.days} label="Days" />
            <Separator />
          </>
        )}
        <Box value={timeLeft.hours} label="Hours" />
        <Separator />
        <Box value={timeLeft.minutes} label="Mins" />
        <Separator />
        <Box value={timeLeft.seconds} label="Secs" />
      </div>
    );
  }
);

CountdownTimer.displayName = "CountdownTimer";

export default CountdownTimer;
