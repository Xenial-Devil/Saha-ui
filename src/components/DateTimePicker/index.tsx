"use client";

import { forwardRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { DatePicker } from "../DatePicker";
import { TimePicker } from "../TimePicker";
import type { DateRange } from "../DatePicker/DatePicker.types";
import type { TimeValue } from "../TimePicker/TimePicker.types";
import type { DateTimePickerProps } from "./DateTimePicker.types";

/**
 * DateTimePicker Component
 *
 * Composes DatePicker and TimePicker to provide a unified Date/Time selection
 *
 * @example
 * ```tsx
 * <DateTimePicker
 *   value={new Date()}
 *   onChange={(date) => console.log(date)}
 * />
 * ```
 */
export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(
  (
    {
      value,
      onChange,
      useRange: _useRange = false,
      datePickerProps,
      timePickerProps,
      variant = "default",
      size = "md",
      label,
      helperText,
      error,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    // We only support single date/time composition for this basic implementation.
    // If you need ranges, you'd usually render two DateTimePickers.
    // We will map simple Date objects back and forth.
    const [dateValue, setDateValue] = useState<DateRange>({
      startDate: null,
      endDate: null,
    });
    const [timeValue, setTimeValue] = useState<TimeValue | null>(null);

    // Sync input value prop to internal states
    useEffect(() => {
      if (
        value &&
        typeof value !== "string" &&
        value instanceof Date &&
        !isNaN(value.getTime())
      ) {
        setDateValue({ startDate: value, endDate: value });
        setTimeValue({
          hours: value.getHours(),
          minutes: value.getMinutes(),
          seconds: value.getSeconds(),
        });
      } else if (typeof value === "string") {
        const d = new Date(value);
        if (!isNaN(d.getTime())) {
          setDateValue({ startDate: d, endDate: d });
          setTimeValue({
            hours: d.getHours(),
            minutes: d.getMinutes(),
            seconds: d.getSeconds(),
          });
        }
      } else if (!value) {
        setDateValue({ startDate: null, endDate: null });
        setTimeValue(null);
      }
    }, [value]);

    const handleDateChange = (range: DateRange) => {
      setDateValue(range);
      notifyChange(range.startDate, timeValue);
    };

    const handleTimeChange = (time: any) => {
      // TimePicker onChange sends TimeValue or TimeRange depending on its config.
      // We expect single TimeValue here.
      const t = time as TimeValue | null;
      setTimeValue(t);
      notifyChange(dateValue.startDate, t);
    };

    const notifyChange = (d: Date | null, t: TimeValue | null) => {
      if (!onChange) return;
      if (!d) {
        onChange(null);
        return;
      }

      const combined = new Date(d);
      if (t) {
        combined.setHours(t.hours, t.minutes, t.seconds || 0, 0);
      } else {
        // default to start of day if no time selected yet
        combined.setHours(0, 0, 0, 0);
      }
      onChange(combined);
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1.5 w-full", className)}
        {...props}
      >
        {label && (
          <label
            className={cn("text-sm font-medium", disabled && "opacity-50")}
          >
            {label}
            {datePickerProps?.required && (
              <span className="text-destructive ml-1">*</span>
            )}
          </label>
        )}

        <div className="flex items-center gap-2 relative">
          <div className="flex-1 min-w-[200px]">
            <DatePicker
              value={dateValue}
              onChange={handleDateChange}
              useRange={false}
              asSingle={true}
              variant={variant}
              size={size}
              disabled={disabled}
              {...datePickerProps}
            />
          </div>

          <div className="w-[140px] shrink-0">
            <TimePicker
              value={timeValue}
              onChange={handleTimeChange}
              variant={variant as any}
              size={size as any}
              disabled={disabled}
              useRange={false}
              {...timePickerProps}
            />
          </div>
        </div>

        {(helperText || error) && (
          <p
            className={cn(
              "text-xs transition-colors",
              error ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {helperText || "Invalid selection"}
          </p>
        )}
      </div>
    );
  },
);

DateTimePicker.displayName = "DateTimePicker";

export default DateTimePicker;
