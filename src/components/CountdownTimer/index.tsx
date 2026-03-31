"use client";

import { forwardRef, useState, useEffect, useMemo } from "react";
import { cn } from "../../lib/utils";
import type { CountdownTimerProps } from "./CountdownTimer.types";

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

    // Tailwind Mapping for size and variant
    const wrapperClass = {
      default: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      glass: "bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 p-4 rounded-xl",
      outline: "border-2 border-border p-4 rounded-xl",
    }[variant];

    const digitClass = {
      sm: "text-xl font-bold font-mono",
      md: "text-3xl font-bold font-mono tracking-tight",
      lg: "text-5xl font-black font-mono tracking-tighter",
      xl: "text-7xl font-black font-mono tracking-tighter",
    }[size];

    const labelClass = {
      sm: "text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mt-1",
      md: "text-xs uppercase font-semibold text-muted-foreground tracking-wider mt-1",
      lg: "text-sm uppercase font-semibold text-muted-foreground tracking-wider mt-2",
      xl: "text-base uppercase font-semibold text-muted-foreground tracking-widest mt-3",
    }[size];

    const Box = ({ value, label }: { value: number; label: string }) => (
      <div className="flex flex-col items-center justify-center min-w-[50px]">
        <span className={cn(digitClass, "tabular-nums leading-none")}>
          {String(value).padStart(2, '0')}
        </span>
        {showLabels && <span className={labelClass}>{label}</span>}
      </div>
    );

    const Separator = () => (
      <div className={cn(digitClass, "mt-[-2px] sm:mt-[-4px] opacity-50")}>:</div>
    );

    return (
      <div 
        ref={ref} 
        className={cn("inline-flex items-start gap-2", wrapperClass, className)} 
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
