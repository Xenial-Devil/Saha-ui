import React from "react";

/**
 * Visual style variants for the Calendar component
 */
export type CalendarVariant =
  | "default"
  | "bordered"
  | "glass"
  | "glass-strong"
  | "gradient";

/**
 * Color variants for the Calendar component
 */
export type CalendarColor =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * Rounding options for the Calendar
 */
export type CalendarRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Size variants for the Calendar
 */
export type CalendarSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/**
 * Selection mode for the Calendar
 */
export type CalendarMode = "single" | "multiple" | "range";

/**
 * Day of week display format
 */
export type WeekdayFormat = "short" | "narrow" | "long";

/**
 * Month/Year picker mode
 */
export type PickerMode = "month" | "year" | null;

/**
 * Custom day renderer function
 */
export type DayRenderer = (
  date: Date,
  isSelected: boolean,
  isToday: boolean,
  isDisabled: boolean,
  isInRange: boolean
) => React.ReactNode;

/**
 * Props for Calendar in single selection mode
 */
interface CalendarSingleProps extends CalendarBaseProps {
  /**
   * Selection mode
   */
  mode?: "single";

  /**
   * Selected date
   */
  value?: Date;

  /**
   * Callback when date is selected
   */
  onChange?: (date: Date | undefined) => void;

  /**
   * Multiple dates (not allowed in single mode)
   */
  values?: never;

  /**
   * Range (not allowed in single mode)
   */
  range?: never;

  /**
   * Range change callback (not allowed in single mode)
   */
  onRangeChange?: never;
}

/**
 * Props for Calendar in multiple selection mode
 */
interface CalendarMultipleProps extends CalendarBaseProps {
  /**
   * Selection mode
   */
  mode: "multiple";

  /**
   * Selected dates array
   */
  values?: Date[];

  /**
   * Callback when dates are selected
   */
  onChange?: (dates: Date[]) => void;

  /**
   * Single date (not allowed in multiple mode)
   */
  value?: never;

  /**
   * Range (not allowed in multiple mode)
   */
  range?: never;

  /**
   * Range change callback (not allowed in multiple mode)
   */
  onRangeChange?: never;
}

/**
 * Props for Calendar in range selection mode
 */
interface CalendarRangeProps extends CalendarBaseProps {
  /**
   * Selection mode
   */
  mode: "range";

  /**
   * Selected date range
   */
  range?: { from: Date; to?: Date };

  /**
   * Callback when range is selected
   */
  onRangeChange?: (range: { from: Date; to?: Date } | undefined) => void;

  /**
   * Single date (not allowed in range mode)
   */
  value?: never;

  /**
   * Multiple dates (not allowed in range mode)
   */
  values?: never;

  /**
   * Single date change callback (not allowed in range mode)
   */
  onChange?: never;
}

/**
 * Base props shared by all Calendar modes
 */
interface CalendarBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "color"> {
  /**
   * Visual style variant
   * @default "default"
   */
  variant?: CalendarVariant;

  /**
   * Color scheme
   * @default "primary"
   */
  color?: CalendarColor;

  /**
   * Show colored border matching the color variant
   * @default false
   */
  bordered?: boolean;

  /**
   * Border radius size
   * @default "lg"
   */
  rounded?: CalendarRounded;

  /**
   * Size of the calendar
   * @default "md"
   */
  size?: CalendarSize;

  /**
   * Weekday display format
   * @default "short"
   */
  weekdayFormat?: WeekdayFormat;

  /**
   * First day of week (0 = Sunday, 1 = Monday, etc.)
   * @default 0
   */
  firstDayOfWeek?: number;

  /**
   * Currently displayed month
   */
  currentMonth?: Date;

  /**
   * Callback when month changes
   */
  onMonthChange?: (month: Date) => void;

  /**
   * Minimum selectable date
   */
  minDate?: Date;

  /**
   * Maximum selectable date
   */
  maxDate?: Date;

  /**
   * Disabled dates
   */
  disabledDates?: Date[];

  /**
   * Custom function to disable specific dates
   */
  isDateDisabled?: (date: Date) => boolean;

  /**
   * Show week numbers
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Show today button
   * @default true
   */
  showTodayButton?: boolean;

  /**
   * Show clear button
   * @default true
   */
  showClearButton?: boolean;

  /**
   * Enable month/year picker
   * @default true
   */
  enablePicker?: boolean;

  /**
   * Custom day renderer
   */
  renderDay?: DayRenderer;

  /**
   * Custom header content
   */
  headerContent?: React.ReactNode;

  /**
   * Custom footer content
   */
  footerContent?: React.ReactNode;

  /**
   * Enable keyboard navigation
   * @default true
   */
  enableKeyboard?: boolean;

  /**
   * Enable animations
   * @default true
   */
  animated?: boolean;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Additional CSS classes for days
   */
  dayClassName?: string;

  /**
   * Locale for month/day names
   * @default "en-US"
   */
  locale?: string;
}

/**
 * Calendar component props
 *
 * Type-safe union that ensures correct props based on selection mode
 *
 * @example
 * ```tsx
 * // Single selection
 * <Calendar mode="single" value={date} onChange={setDate} />
 *
 * // Multiple selection
 * <Calendar mode="multiple" values={dates} onChange={setDates} />
 *
 * // Range selection
 * <Calendar mode="range" range={range} onRangeChange={setRange} />
 * ```
 */
export type CalendarProps =
  | CalendarSingleProps
  | CalendarMultipleProps
  | CalendarRangeProps;

/**
 * Export base props for extensions
 */
export type { CalendarBaseProps };
