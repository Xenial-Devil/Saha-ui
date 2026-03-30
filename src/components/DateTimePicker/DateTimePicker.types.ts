import React from "react";
import type { DatePickerProps } from "../DatePicker/DatePicker.types";
import type { TimePickerProps } from "../TimePicker/TimePicker.types";

export interface DateTimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * The combined Date and Time as a Date object or ISO string 
   */
  value?: Date | string | null;

  /**
   * Callback fired when either date or time changes
   */
  onChange?: (date: Date | null) => void;

  /**
   * Use range mode. If true, value/onChange expects `{ start: Date, end: Date }`
   * @default false
   */
  useRange?: boolean;

  /**
   * Props to pass down to DatePicker
   */
  datePickerProps?: Partial<DatePickerProps>;

  /**
   * Props to pass down to TimePicker
   */
  timePickerProps?: Partial<TimePickerProps>;

  /**
   * Variant for the visual style
   */
  variant?: DatePickerProps["variant"];

  /**
   * Size configuration
   */
  size?: DatePickerProps["size"];

  /**
   * Label for the field combo
   */
  label?: string;

  /**
   * Helper text or error message
   */
  helperText?: string;
  error?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;
}
