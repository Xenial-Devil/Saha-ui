import React from "react";

/**
 * DatePicker variant types
 */
export type DatePickerVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "glass"
  | "bordered"
  | "elevated"
  | "flat"
  | "outlined"
  | "minimal";

/**
 * DatePicker size types
 */
export type DatePickerSize = "sm" | "md" | "lg";

/**
 * DatePicker view mode types
 */
export type DatePickerView = "days" | "months" | "years";

/**
 * Popover direction types
 */
export type PopoverDirection = "up" | "down";

/**
 * Date range value type
 */
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

/**
 * Disabled date range type
 */
export interface DisabledDateRange {
  startDate: Date;
  endDate: Date;
}

/**
 * Shortcut configuration
 */
export interface ShortcutConfig {
  text: string;
  period: {
    start: Date;
    end: Date;
  };
}

/**
 * Built-in shortcuts configuration
 */
export interface ShortcutsConfig {
  today?: string | ShortcutConfig;
  yesterday?: string | ShortcutConfig;
  last7Days?: string | ShortcutConfig;
  last30Days?: string | ShortcutConfig;
  thisMonth?: string | ShortcutConfig;
  lastMonth?: string | ShortcutConfig;
  [key: string]: string | ShortcutConfig | undefined;
}

/**
 * Footer configuration
 */
export interface FooterConfig {
  cancel?: string;
  apply?: string;
}

/**
 * DatePicker configuration options
 */
export interface DatePickerConfigs {
  shortcuts?: ShortcutsConfig;
  footer?: FooterConfig;
}

/**
 * Props for the DatePicker component
 *
 * @example
 * ```tsx
 * // Single date picker
 * <DatePicker
 *   value={{ startDate: date, endDate: date }}
 *   onChange={(range) => setDate(range.startDate)}
 *   asSingle
 * />
 *
 * // Date range picker with shortcuts
 * <DatePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   useRange
 *   showShortcuts
 * />
 *
 * // With disabled dates and footer
 * <DatePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   disabledDates={disabledRanges}
 *   showFooter
 * />
 * ```
 */
export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Selected date or date range value
   */
  value: DateRange;

  /**
   * Callback when date/range changes
   */
  onChange: (value: DateRange) => void;

  /**
   * Visual style variant of the date picker
   * @default "default"
   */
  variant?: DatePickerVariant;

  /**
   * Size of the date picker
   * @default "md"
   */
  size?: DatePickerSize;

  /**
   * Use range selection mode (allows selecting start and end dates)
   * @default true
   */
  useRange?: boolean;

  /**
   * Use as single date picker (shows only one calendar even in range mode)
   * @default false
   */
  asSingle?: boolean;

  /**
   * Minimum selectable date
   */
  minDate?: Date;

  /**
   * Maximum selectable date
   */
  maxDate?: Date;

  /**
   * Disable all interactions
   * @default false
   */
  disabled?: boolean;

  /**
   * Read-only mode (cannot change date)
   * @default false
   */
  readOnly?: boolean;

  /**
   * Mark as required field
   * @default false
   */
  required?: boolean;

  /**
   * Placeholder text when no date is selected
   * @default "Select date"
   */
  placeholder?: string;

  /**
   * Date format for display
   * @default "MM/DD/YYYY"
   */
  displayFormat?: string;

  /**
   * Separator for date range display
   * @default " ~ "
   */
  separator?: string;

  /**
   * First day of week (0 = Sunday, 1 = Monday, etc.)
   * @default 0
   */
  startWeekOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Show shortcuts sidebar
   * @default false
   */
  showShortcuts?: boolean;

  /**
   * Show footer with apply/cancel buttons (only works with useRange)
   * @default false
   */
  showFooter?: boolean;

  /**
   * Show clear button when date is selected
   * @default true
   */
  showClear?: boolean;

  /**
   * Show today button in calendar
   * @default true
   */
  showToday?: boolean;

  /**
   * Configuration for shortcuts and footer text
   */
  configs?: DatePickerConfigs;

  /**
   * Array of disabled date ranges
   */
  disabledDates?: DisabledDateRange[];

  /**
   * Starting calendar month
   */
  startFrom?: Date;

  /**
   * Popover direction
   * @default "down"
   */
  popoverDirection?: PopoverDirection;

  /**
   * Localization code (e.g., 'en', 'es', 'fr', 'de')
   * @default "en"
   */
  i18n?: string;

  /**
   * Custom input class name
   */
  inputClassName?: string;

  /**
   * Custom container class name
   */
  containerClassName?: string;

  /**
   * Input ID attribute
   */
  inputId?: string;

  /**
   * Input name attribute
   */
  inputName?: string;
}
