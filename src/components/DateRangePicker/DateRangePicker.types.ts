import type { DatePickerProps } from "../DatePicker/DatePicker.types";

/**
 * Props for DateRangePicker
 * Extends DatePickerProps but forces useRange to true
 */
export interface DateRangePickerProps extends Omit<DatePickerProps, "useRange" | "asSingle"> {
  /**
   * Start date of the range
   */
  startDate?: Date | null;
  /**
   * End date of the range
   */
  endDate?: Date | null;
  /**
   * Callback fired when range changes
   */
  onRangeChange?: (startDate: Date | null, endDate: Date | null) => void;
}
