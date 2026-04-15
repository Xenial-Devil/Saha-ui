"use client";

import { forwardRef } from "react";
import { DatePicker } from "../DatePicker";
import type { DateRangePickerProps } from "./DateRangePicker.types";
import type { DateRange } from "../DatePicker/DatePicker.types";
import { dateRangePickerVariants } from "./DateRangePicker.styles";
import { cn } from "../../lib/utils";

/**
 * DateRangePicker Component
 *
 * A thin wrapper around DatePicker pre-configured for date ranges.
 * 
 * @example
 * ```tsx
 * <DateRangePicker
 *   startDate={new Date()}
 *   endDate={new Date(Date.now() + 86400000)}
 *   onRangeChange={(start, end) => console.log(start, end)}
 * />
 * ```
 */
export const DateRangePicker = forwardRef<HTMLInputElement, DateRangePickerProps>(
  ({ startDate = null, endDate = null, onRangeChange, value, onChange, ...props }, ref) => {
    
    const handleRangeChange = (range: DateRange) => {
      // Support parent controlling via value/onChange directly or via start/endDate/onRangeChange
      onChange?.(range);
      onRangeChange?.(range.startDate, range.endDate);
    };

    const combinedValue: DateRange = value || {
      startDate,
      endDate,
    };

    return (
      <DatePicker
        ref={ref}
        useRange={true}
        asSingle={false}
        value={combinedValue}
        onChange={handleRangeChange}
        className={cn(dateRangePickerVariants(), props.className)}
        {...props}
      />
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";

export default DateRangePicker;
