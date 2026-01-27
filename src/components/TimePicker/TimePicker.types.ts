import React from "react";

/**
 * TimePicker variant types
 */
export type TimePickerVariant =
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
  | "minimal"
  | "gradient"
  | "neon"
  | "aurora"
  | "cosmic";

/**
 * TimePicker size types
 */
export type TimePickerSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/**
 * Popover direction types
 */
export type PopoverDirection = "up" | "down" | "auto";

/**
 * Time format types
 */
export type TimeFormat = "12h" | "24h";

/**
 * Animation types
 */
export type AnimationType = "fade" | "scale" | "slide" | "none";

/**
 * Time value type
 */
export interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

/**
 * Time range value type
 */
export interface TimeRange {
  startTime: TimeValue | null;
  endTime: TimeValue | null;
}

/**
 * Shortcut configuration
 */
export interface TimeShortcutConfig {
  text: string;
  time: TimeValue;
  icon?: React.ReactNode;
}

/**
 * Built-in shortcuts configuration
 */
export interface TimeShortcutsConfig {
  now?: string | TimeShortcutConfig;
  midnight?: string | TimeShortcutConfig;
  noon?: string | TimeShortcutConfig;
  morning?: string | TimeShortcutConfig;
  evening?: string | TimeShortcutConfig;
  [key: string]: string | TimeShortcutConfig | undefined;
}

/**
 * Footer configuration
 */
export interface FooterConfig {
  cancel?: string;
  apply?: string;
  clear?: string;
  now?: string;
}

/**
 * TimePicker configuration options
 */
export interface TimePickerConfigs {
  shortcuts?: TimeShortcutsConfig;
  footer?: FooterConfig;
}

/**
 * Props for the TimePicker component
 */
export interface TimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Selected time or time range value */
  value: TimeValue | TimeRange | null;

  /** Callback when time/range changes */
  onChange: (value: TimeValue | TimeRange | null) => void;

  /** Visual style variant of the time picker */
  variant?: TimePickerVariant;

  /** Size of the time picker */
  size?: TimePickerSize;

  /** Use range selection mode */
  useRange?: boolean;

  /** Time format (12h or 24h) */
  format?: TimeFormat;

  /** Show seconds selector */
  showSeconds?: boolean;

  /** Time interval for minute/second selection */
  minuteInterval?: number;

  /** Minimum selectable time */
  minTime?: TimeValue;

  /** Maximum selectable time */
  maxTime?: TimeValue;

  /** Disable all interactions */
  disabled?: boolean;

  /** Read-only mode */
  readOnly?: boolean;

  /** Mark as required field */
  required?: boolean;

  /** Placeholder text */
  placeholder?: string;

  /** Time format for display */
  displayFormat?: string;

  /** Separator for time range display */
  separator?: string;

  /** Show shortcuts sidebar */
  showShortcuts?: boolean;

  /** Show footer with buttons */
  showFooter?: boolean;

  /** Show clear button */
  showClear?: boolean;

  /** Show "Now" button */
  showNow?: boolean;

  /** Show increment/decrement spinners */
  showSpinners?: boolean;

  /** Show live clock */
  showLiveClock?: boolean;

  /** Configuration for shortcuts and footer */
  configs?: TimePickerConfigs;

  /** Popover direction */
  popoverDirection?: PopoverDirection;

  /** Animation type */
  animation?: AnimationType;

  /** Localization code */
  i18n?: string;

  /** Custom input class name */
  inputClassName?: string;

  /** Custom container class name */
  containerClassName?: string;

  /** Custom dropdown class name */
  dropdownClassName?: string;

  /** Input ID attribute */
  inputId?: string;

  /** Input name attribute */
  inputName?: string;

  /** Close on select (for single time mode) */
  closeOnSelect?: boolean;

  /** Enable keyboard navigation */
  enableKeyboardNav?: boolean;

  /** Custom time validation function */
  validateTime?: (time: TimeValue) => boolean;

  /** Error state */
  error?: boolean;

  /** Error message */
  errorMessage?: string;

  /** Success state */
  success?: boolean;

  /** Helper text */
  helperText?: string;

  /** Label */
  label?: string;

  /** Show format toggle button */
  showFormatToggle?: boolean;

  /** On format change callback */
  onFormatChange?: (format: TimeFormat) => void;

  /** Custom render for time items */
  renderTimeItem?: (
    value: number,
    type: "hour" | "minute" | "second",
    isSelected: boolean
  ) => React.ReactNode;
}

/**
 * Locale configuration for internationalization
 */
export interface TimePickerLocale {
  code: string;
  am: string;
  pm: string;
  hour: string;
  minute: string;
  second: string;
  today: string;
  clear: string;
  cancel: string;
  apply: string;
  now: string;
  placeholder: string;
  separator: string;
  rtl?: boolean;
  shortcuts: TimeShortcutsLocale;
}

interface TimeShortcutsLocale {
  now: string;
  midnight: string;
  noon: string;
  morning: string;
  evening: string;
}
