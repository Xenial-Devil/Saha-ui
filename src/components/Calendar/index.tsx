import { forwardRef, useState, useMemo, useCallback, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { createValidator, isValidDate } from "../../lib/validation";
import type { CalendarProps, PickerMode } from "./Calendar.types";

/**
 * Calendar Container Variants
 */
const calendarVariants = cva(
  [
    "relative w-full max-w-md",
    "transition-all duration-300 ease-out",
    "select-none isolate",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card/95 shadow-[0_4px_20px_0] shadow-black/5 dark:shadow-black/20",
          "border border-border/30 backdrop-blur-sm",
          "before:absolute before:inset-0 before:bg-gradient-to-br",
          "before:from-primary/5 before:via-transparent before:to-accent/5",
          "before:opacity-50 before:transition-opacity before:duration-500",
        ],
        bordered: [
          "bg-card/90 shadow-sm backdrop-blur-sm",
          "before:absolute before:inset-0 before:bg-gradient-to-br",
          "before:from-primary/3 before:to-accent/3",
          "before:opacity-50 before:transition-opacity before:duration-500",
        ],
        glass: [
          "glass backdrop-blur-2xl",
          "border border-white/10 dark:border-white/5",
          "shadow-[0_8px_32px_0] shadow-black/10 dark:shadow-black/30",
          "before:absolute before:inset-0 before:bg-gradient-to-br",
          "before:from-white/5 before:to-transparent",
          "before:opacity-70 before:transition-opacity before:duration-500",
        ],
        "glass-strong": [
          "glass-strong backdrop-blur-3xl",
          "border-2 border-white/20 dark:border-white/10",
          "shadow-[0_12px_48px_0] shadow-black/15 dark:shadow-black/40",
          "before:absolute before:inset-0 before:bg-gradient-to-br",
          "before:from-white/10 before:to-transparent",
          "before:opacity-80 before:transition-opacity before:duration-500",
        ],
        gradient: [
          "bg-gradient-to-br from-primary/20 via-background to-accent/20",
          "border-2 border-transparent relative",
          "before:absolute before:inset-0 before:-z-10",
          "before:bg-gradient-to-r before:from-primary before:via-accent before:to-secondary",
          "before:opacity-50 before:blur-xl",
          "after:absolute after:inset-[2px] after:bg-background/95 after:rounded-[inherit]",
        ],
      },
      color: {
        primary: "",
        secondary: "",
        accent: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      bordered: {
        true: "border-2",
        false: "",
      },
      size: {
        sm: "p-3 text-sm",
        md: "p-4 text-base",
        lg: "p-6 text-lg",
      },
      rounded: {
        none: "rounded-none before:rounded-none after:rounded-none",
        sm: "rounded-sm before:rounded-sm after:rounded-sm",
        md: "rounded-md before:rounded-md after:rounded-md",
        lg: "rounded-lg before:rounded-lg after:rounded-lg",
        xl: "rounded-xl before:rounded-xl after:rounded-xl",
        "2xl": "rounded-2xl before:rounded-2xl after:rounded-2xl",
      },
    },
    compoundVariants: [
      // Bordered with color variants
      { bordered: true, color: "primary", className: "border-primary/50" },
      { bordered: true, color: "secondary", className: "border-secondary/50" },
      { bordered: true, color: "accent", className: "border-accent/50" },
      { bordered: true, color: "success", className: "border-green-500/50" },
      { bordered: true, color: "warning", className: "border-yellow-500/50" },
      { bordered: true, color: "error", className: "border-red-500/50" },
      { bordered: true, color: "info", className: "border-blue-500/50" },
    ],
    defaultVariants: {
      variant: "default",
      color: "primary",
      bordered: false,
      size: "md",
      rounded: "lg",
    },
  }
);

/**
 * Day cell variants
 */
const dayVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "font-medium transition-all duration-200",
    "cursor-pointer focus:outline-none focus:z-10",
    "before:absolute before:inset-0 before:rounded-lg",
    "before:transition-all before:duration-200",
  ],
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
      },
      color: {
        primary: "",
        secondary: "",
        accent: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      state: {
        default: ["text-foreground", "before:bg-transparent", "before:scale-0"],
        selected: [
          "font-bold",
          "before:scale-100 before:shadow-lg",
          "hover:before:scale-110",
        ],
        today: ["font-semibold", "ring-2 ring-inset"],
        disabled: [
          "text-muted-foreground/40 cursor-not-allowed",
          "before:bg-transparent hover:before:bg-transparent",
          "before:scale-0",
        ],
        inRange: [
          "font-medium",
          "before:scale-100 before:rounded-none",
          "after:absolute after:inset-y-0 after:-left-px after:-right-px",
          "after:-z-10",
        ],
        rangeStart: [
          "font-bold",
          "before:scale-100 before:shadow-lg",
          "hover:before:scale-105",
          "after:absolute after:inset-y-0 after:left-1/2 after:-right-px",
          "after:-z-10",
        ],
        rangeEnd: [
          "font-bold",
          "before:scale-100 before:shadow-lg",
          "hover:before:scale-105",
          "after:absolute after:inset-y-0 after:-left-px after:right-1/2",
          "after:-z-10",
        ],
        rangeBoth: [
          "font-bold",
          "before:scale-100 before:shadow-lg",
          "hover:before:scale-110",
        ],
        outside: ["text-muted-foreground/30", "hover:text-muted-foreground/50"],
      },
    },
    compoundVariants: [
      // Default state - hover effects for all colors
      {
        state: "default",
        color: "primary",
        className:
          "hover:text-primary hover:before:bg-primary/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "secondary",
        className:
          "hover:text-secondary hover:before:bg-secondary/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "accent",
        className:
          "hover:text-accent hover:before:bg-accent/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "success",
        className:
          "hover:text-green-600 dark:hover:text-green-400 hover:before:bg-green-500/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "warning",
        className:
          "hover:text-yellow-600 dark:hover:text-yellow-400 hover:before:bg-yellow-500/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "error",
        className:
          "hover:text-red-600 dark:hover:text-red-400 hover:before:bg-red-500/10 hover:before:scale-100",
      },
      {
        state: "default",
        color: "info",
        className:
          "hover:text-blue-600 dark:hover:text-blue-400 hover:before:bg-blue-500/10 hover:before:scale-100",
      },

      // Selected state colors
      {
        state: "selected",
        color: "primary",
        className:
          "text-primary-foreground before:bg-primary before:shadow-primary/30",
      },
      {
        state: "selected",
        color: "secondary",
        className:
          "text-secondary-foreground before:bg-secondary before:shadow-secondary/30",
      },
      {
        state: "selected",
        color: "accent",
        className:
          "text-accent-foreground before:bg-accent before:shadow-accent/30",
      },
      {
        state: "selected",
        color: "success",
        className: "text-white before:bg-green-500 before:shadow-green-500/30",
      },
      {
        state: "selected",
        color: "warning",
        className:
          "text-white before:bg-yellow-500 before:shadow-yellow-500/30",
      },
      {
        state: "selected",
        color: "error",
        className: "text-white before:bg-red-500 before:shadow-red-500/30",
      },
      {
        state: "selected",
        color: "info",
        className: "text-white before:bg-blue-500 before:shadow-blue-500/30",
      },

      // Today state colors
      {
        state: "today",
        color: "primary",
        className: "text-primary ring-primary/40 hover:ring-primary/60",
      },
      {
        state: "today",
        color: "secondary",
        className: "text-secondary ring-secondary/40 hover:ring-secondary/60",
      },
      {
        state: "today",
        color: "accent",
        className: "text-accent ring-accent/40 hover:ring-accent/60",
      },
      {
        state: "today",
        color: "success",
        className:
          "text-green-600 dark:text-green-400 ring-green-500/40 hover:ring-green-500/60",
      },
      {
        state: "today",
        color: "warning",
        className:
          "text-yellow-600 dark:text-yellow-400 ring-yellow-500/40 hover:ring-yellow-500/60",
      },
      {
        state: "today",
        color: "error",
        className:
          "text-red-600 dark:text-red-400 ring-red-500/40 hover:ring-red-500/60",
      },
      {
        state: "today",
        color: "info",
        className:
          "text-blue-600 dark:text-blue-400 ring-blue-500/40 hover:ring-blue-500/60",
      },

      // InRange state colors
      {
        state: "inRange",
        color: "primary",
        className:
          "text-primary before:bg-primary/20 hover:before:bg-primary/30 after:bg-primary/10",
      },
      {
        state: "inRange",
        color: "secondary",
        className:
          "text-secondary before:bg-secondary/20 hover:before:bg-secondary/30 after:bg-secondary/10",
      },
      {
        state: "inRange",
        color: "accent",
        className:
          "text-accent before:bg-accent/20 hover:before:bg-accent/30 after:bg-accent/10",
      },
      {
        state: "inRange",
        color: "success",
        className:
          "text-green-600 dark:text-green-400 before:bg-green-500/20 hover:before:bg-green-500/30 after:bg-green-500/10",
      },
      {
        state: "inRange",
        color: "warning",
        className:
          "text-yellow-600 dark:text-yellow-400 before:bg-yellow-500/20 hover:before:bg-yellow-500/30 after:bg-yellow-500/10",
      },
      {
        state: "inRange",
        color: "error",
        className:
          "text-red-600 dark:text-red-400 before:bg-red-500/20 hover:before:bg-red-500/30 after:bg-red-500/10",
      },
      {
        state: "inRange",
        color: "info",
        className:
          "text-blue-600 dark:text-blue-400 before:bg-blue-500/20 hover:before:bg-blue-500/30 after:bg-blue-500/10",
      },

      // RangeStart state colors
      {
        state: "rangeStart",
        color: "primary",
        className:
          "text-primary-foreground before:bg-primary before:shadow-primary/30 after:bg-primary/10",
      },
      {
        state: "rangeStart",
        color: "secondary",
        className:
          "text-secondary-foreground before:bg-secondary before:shadow-secondary/30 after:bg-secondary/10",
      },
      {
        state: "rangeStart",
        color: "accent",
        className:
          "text-accent-foreground before:bg-accent before:shadow-accent/30 after:bg-accent/10",
      },
      {
        state: "rangeStart",
        color: "success",
        className:
          "text-white before:bg-green-500 before:shadow-green-500/30 after:bg-green-500/10",
      },
      {
        state: "rangeStart",
        color: "warning",
        className:
          "text-white before:bg-yellow-500 before:shadow-yellow-500/30 after:bg-yellow-500/10",
      },
      {
        state: "rangeStart",
        color: "error",
        className:
          "text-white before:bg-red-500 before:shadow-red-500/30 after:bg-red-500/10",
      },
      {
        state: "rangeStart",
        color: "info",
        className:
          "text-white before:bg-blue-500 before:shadow-blue-500/30 after:bg-blue-500/10",
      },

      // RangeEnd state colors
      {
        state: "rangeEnd",
        color: "primary",
        className:
          "text-primary-foreground before:bg-primary before:shadow-primary/30 after:bg-primary/10",
      },
      {
        state: "rangeEnd",
        color: "secondary",
        className:
          "text-secondary-foreground before:bg-secondary before:shadow-secondary/30 after:bg-secondary/10",
      },
      {
        state: "rangeEnd",
        color: "accent",
        className:
          "text-accent-foreground before:bg-accent before:shadow-accent/30 after:bg-accent/10",
      },
      {
        state: "rangeEnd",
        color: "success",
        className:
          "text-white before:bg-green-500 before:shadow-green-500/30 after:bg-green-500/10",
      },
      {
        state: "rangeEnd",
        color: "warning",
        className:
          "text-white before:bg-yellow-500 before:shadow-yellow-500/30 after:bg-yellow-500/10",
      },
      {
        state: "rangeEnd",
        color: "error",
        className:
          "text-white before:bg-red-500 before:shadow-red-500/30 after:bg-red-500/10",
      },
      {
        state: "rangeEnd",
        color: "info",
        className:
          "text-white before:bg-blue-500 before:shadow-blue-500/30 after:bg-blue-500/10",
      },

      // RangeBoth state colors
      {
        state: "rangeBoth",
        color: "primary",
        className:
          "text-primary-foreground before:bg-primary before:shadow-primary/30",
      },
      {
        state: "rangeBoth",
        color: "secondary",
        className:
          "text-secondary-foreground before:bg-secondary before:shadow-secondary/30",
      },
      {
        state: "rangeBoth",
        color: "accent",
        className:
          "text-accent-foreground before:bg-accent before:shadow-accent/30",
      },
      {
        state: "rangeBoth",
        color: "success",
        className: "text-white before:bg-green-500 before:shadow-green-500/30",
      },
      {
        state: "rangeBoth",
        color: "warning",
        className:
          "text-white before:bg-yellow-500 before:shadow-yellow-500/30",
      },
      {
        state: "rangeBoth",
        color: "error",
        className: "text-white before:bg-red-500 before:shadow-red-500/30",
      },
      {
        state: "rangeBoth",
        color: "info",
        className: "text-white before:bg-blue-500 before:shadow-blue-500/30",
      },
    ],
    defaultVariants: {
      size: "md",
      state: "default",
      color: "primary",
    },
  }
);

/**
 * Utility functions
 */
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const isDateInRange = (
  date: Date,
  range: { from: Date; to?: Date } | undefined
): boolean => {
  if (!range || !range.to) return false;
  return date >= range.from && date <= range.to;
};

/**
 * Calendar Component
 *
 * Advanced calendar component with multiple selection modes, beautiful styling,
 * and comprehensive features including range selection, disabled dates, and
 * custom day rendering.
 *
 * @example
 * ```tsx
 * // Single date selection
 * <Calendar
 *   mode="single"
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 *   variant="glass"
 * />
 *
 * // Range selection
 * <Calendar
 *   mode="range"
 *   range={dateRange}
 *   onRangeChange={setDateRange}
 *   variant="gradient"
 * />
 *
 * // Multiple dates
 * <Calendar
 *   mode="multiple"
 *   values={selectedDates}
 *   onChange={setSelectedDates}
 * />
 * ```
 */
const Calendar = forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const {
    variant = "default",
    color = "primary",
    bordered = false,
    rounded = "lg",
    size = "md",
    weekdayFormat = "short",
    firstDayOfWeek = 0,
    minDate,
    maxDate,
    disabledDates = [],
    isDateDisabled,
    showWeekNumbers = false,
    showTodayButton = true,
    showClearButton = true,
    enablePicker = true,
    renderDay,
    headerContent,
    footerContent,
    animated = true,
    className,
    dayClassName,
    locale = "en-US",
  } = props;

  // Determine mode and mode-specific props
  const mode = props.mode || "single";
  const value = "value" in props ? props.value : undefined;
  const values = "values" in props ? props.values : undefined;
  const range = "range" in props ? props.range : undefined;

  // Type-safe onChange handlers
  const onChange =
    mode === "single" && "onChange" in props
      ? (props.onChange as (date: Date | undefined) => void)
      : undefined;
  const onChangeMultiple =
    mode === "multiple" && "onChange" in props
      ? (props.onChange as (dates: Date[]) => void)
      : undefined;
  const onRangeChange =
    mode === "range" && "onRangeChange" in props
      ? props.onRangeChange
      : undefined;

  const currentMonthProp =
    "currentMonth" in props ? props.currentMonth : undefined;
  const onMonthChange =
    "onMonthChange" in props ? props.onMonthChange : undefined;

  // ===== PROP VALIDATION =====
  // Validate that correct props are used for each mode
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const validator = createValidator("Calendar");

      // Validate single mode
      if (mode === "single") {
        if ("values" in props && props.values !== undefined) {
          validator.error(
            "Invalid prop: 'values' should not be used in mode='single'. Use 'value' instead."
          );
        }
        if ("range" in props && props.range !== undefined) {
          validator.error(
            "Invalid prop: 'range' should not be used in mode='single'. Use 'value' instead."
          );
        }
        if ("onRangeChange" in props && props.onRangeChange !== undefined) {
          validator.error(
            "Invalid prop: 'onRangeChange' should not be used in mode='single'. Use 'onChange' instead."
          );
        }
        if (value && !isValidDate(value)) {
          validator.error(
            "Invalid prop: 'value' must be a valid Date object in mode='single'."
          );
        }
        if (value && Array.isArray(value)) {
          validator.error(
            "Invalid prop: 'value' should be a Date object, not an array, in mode='single'."
          );
        }
      }

      // Validate multiple mode
      if (mode === "multiple") {
        if ("value" in props && props.value !== undefined) {
          validator.error(
            "Invalid prop: 'value' should not be used in mode='multiple'. Use 'values' instead."
          );
        }
        if ("range" in props && props.range !== undefined) {
          validator.error(
            "Invalid prop: 'range' should not be used in mode='multiple'. Use 'values' instead."
          );
        }
        if ("onRangeChange" in props && props.onRangeChange !== undefined) {
          validator.error(
            "Invalid prop: 'onRangeChange' should not be used in mode='multiple'. Use 'onChange' instead."
          );
        }
        validator.validateArray("values", values, isValidDate);
      }

      // Validate range mode
      if (mode === "range") {
        if ("value" in props && props.value !== undefined) {
          validator.error(
            "Invalid prop: 'value' should not be used in mode='range'. Use 'range' instead."
          );
        }
        if ("values" in props && props.values !== undefined) {
          validator.error(
            "Invalid prop: 'values' should not be used in mode='range'. Use 'range' instead."
          );
        }
        if ("onChange" in props && props.onChange !== undefined) {
          validator.error(
            "Invalid prop: 'onChange' should not be used in mode='range'. Use 'onRangeChange' instead."
          );
        }
        if (range) {
          if (typeof range !== "object" || !range.from) {
            validator.error(
              "Invalid prop: 'range' must be an object with 'from' property of type Date."
            );
          }
          validator.validateDate("range.from", range.from);
          validator.validateDate("range.to", range.to);

          if (
            range.from &&
            range.to &&
            isValidDate(range.from) &&
            isValidDate(range.to) &&
            range.to < range.from
          ) {
            validator.warn(
              "Warning: 'range.to' should not be before 'range.from'. The dates will be auto-corrected."
            );
          }
        }
      }

      // Validate general props
      validator.validateDate("minDate", minDate);
      validator.validateDate("maxDate", maxDate);

      if (
        minDate &&
        maxDate &&
        isValidDate(minDate) &&
        isValidDate(maxDate) &&
        maxDate < minDate
      ) {
        validator.error(
          "Invalid prop: 'maxDate' should not be before 'minDate'."
        );
      }

      validator.validateArray("disabledDates", disabledDates, isValidDate);
      validator.validateDate("currentMonth", currentMonthProp);
    }
  }, [
    mode,
    value,
    values,
    range,
    minDate,
    maxDate,
    disabledDates,
    currentMonthProp,
    props,
  ]);
  // ===== END PROP VALIDATION =====

  // State
  const [currentMonth, setCurrentMonth] = useState<Date>(
    currentMonthProp || value || new Date()
  );
  const [pickerMode, setPickerMode] = useState<PickerMode>(null);

  // Update current month when prop changes
  useEffect(() => {
    if (currentMonthProp) {
      setCurrentMonth(currentMonthProp);
    }
  }, [currentMonthProp]);

  // Generate weekday labels
  const weekdayLabels = useMemo(() => {
    const labels: string[] = [];
    const baseDate = new Date(2024, 0, 7); // A Sunday

    for (let i = 0; i < 7; i++) {
      const day = new Date(baseDate);
      day.setDate(baseDate.getDate() + ((i + firstDayOfWeek) % 7));

      const label = new Intl.DateTimeFormat(locale, {
        weekday: weekdayFormat,
      }).format(day);

      labels.push(label);
    }

    return labels;
  }, [locale, weekdayFormat, firstDayOfWeek]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days: (Date | null)[] = [];

    // Calculate offset based on first day of week
    const offset = (firstDay - firstDayOfWeek + 7) % 7;

    // Previous month days
    const prevMonthDays = getDaysInMonth(
      month === 0 ? year - 1 : year,
      month === 0 ? 11 : month - 1
    );

    for (let i = offset - 1; i >= 0; i--) {
      const date = new Date(
        month === 0 ? year - 1 : year,
        month === 0 ? 11 : month - 1,
        prevMonthDays - i
      );
      days.push(date);
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(
        month === 11 ? year + 1 : year,
        month === 11 ? 0 : month + 1,
        i
      );
      days.push(date);
    }

    return days;
  }, [currentMonth, firstDayOfWeek]);

  // Check if date is disabled
  const isDisabled = useCallback(
    (date: Date): boolean => {
      if (isDateDisabled && isDateDisabled(date)) return true;
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      if (disabledDates.some((d) => isSameDay(d, date))) return true;
      return false;
    },
    [minDate, maxDate, disabledDates, isDateDisabled]
  );

  // Check if date is selected
  const isSelected = useCallback(
    (date: Date): boolean => {
      if (mode === "single" && value) {
        return isSameDay(date, value);
      }
      if (mode === "multiple" && values) {
        return values.some((d) => isSameDay(d, date));
      }
      if (mode === "range" && range) {
        if (!range.to) return isSameDay(date, range.from);
        return isSameDay(date, range.from) || isSameDay(date, range.to);
      }
      return false;
    },
    [mode, value, values, range]
  );

  // Handle date selection
  const handleDateSelect = useCallback(
    (date: Date) => {
      if (isDisabled(date)) return;

      if (mode === "single") {
        onChange?.(isSameDay(date, value!) ? undefined : date);
      } else if (mode === "multiple") {
        const currentValues = values || [];
        const isAlreadySelected = currentValues.some((d) => isSameDay(d, date));

        if (isAlreadySelected) {
          onChangeMultiple?.(currentValues.filter((d) => !isSameDay(d, date)));
        } else {
          onChangeMultiple?.([...currentValues, date]);
        }
      } else if (mode === "range") {
        if (!range || !range.from || (range.from && range.to)) {
          onRangeChange?.({ from: date });
        } else {
          if (date < range.from) {
            onRangeChange?.({ from: date, to: range.from });
          } else {
            onRangeChange?.({ from: range.from, to: date });
          }
        }
      }
    },
    [
      mode,
      value,
      values,
      range,
      onChange,
      onChangeMultiple,
      onRangeChange,
      isDisabled,
    ]
  );

  // Navigate months
  const navigateMonth = useCallback(
    (direction: "prev" | "next") => {
      const newMonth = new Date(currentMonth);

      if (direction === "prev") {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }

      setCurrentMonth(newMonth);
      onMonthChange?.(newMonth);
    },
    [currentMonth, onMonthChange]
  );

  // Go to today
  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentMonth(today);
    onMonthChange?.(today);

    if (mode === "single") {
      onChange?.(today);
    }
  }, [mode, onChange, onMonthChange]);

  // Clear selection
  const clearSelection = useCallback(() => {
    if (mode === "single") {
      onChange?.(undefined);
    } else if (mode === "multiple") {
      onChangeMultiple?.([]);
    } else if (mode === "range") {
      onRangeChange?.(undefined);
    }
  }, [mode, onChange, onChangeMultiple, onRangeChange]);

  // Month/Year picker
  const handleMonthYearSelect = useCallback(
    (type: "month" | "year", value: number) => {
      const newMonth = new Date(currentMonth);

      if (type === "month") {
        newMonth.setMonth(value);
      } else {
        newMonth.setFullYear(value);
      }

      setCurrentMonth(newMonth);
      onMonthChange?.(newMonth);
      setPickerMode(null);
    },
    [currentMonth, onMonthChange]
  );

  // Render day cell
  const renderDayCell = (date: Date | null, index: number) => {
    if (!date) return <div key={index} className="h-10 w-10" />;

    const today = new Date();
    const isToday = isSameDay(date, today);
    const selected = isSelected(date);
    const disabled = isDisabled(date);
    const isOutside = !isSameMonth(date, currentMonth);
    const inRange = mode === "range" ? isDateInRange(date, range) : false;

    // Determine the state with proper range handling
    let state: any = "default";
    if (disabled) {
      state = "disabled";
    } else if (mode === "range" && range?.from) {
      const isStart = isSameDay(date, range.from);
      const isEnd = range.to && isSameDay(date, range.to);

      if (isStart && isEnd) {
        // Same day selected for both start and end
        state = "rangeBoth";
      } else if (isStart) {
        state = "rangeStart";
      } else if (isEnd) {
        state = "rangeEnd";
      } else if (inRange) {
        // Date is in between start and end
        state = "inRange";
      } else if (isToday) {
        state = "today";
      } else if (isOutside) {
        state = "outside";
      }
    } else if (selected) {
      state = "selected";
    } else if (isToday) {
      state = "today";
    } else if (isOutside) {
      state = "outside";
    }

    const content = renderDay
      ? renderDay(date, selected, isToday, disabled, inRange)
      : date.getDate();

    return (
      <button
        key={index}
        type="button"
        onClick={() => handleDateSelect(date)}
        disabled={disabled}
        className={cn(
          dayVariants({ size, state, color }),
          dayClassName,
          animated && "hover:scale-110"
        )}
        aria-label={date.toLocaleDateString(locale)}
        aria-selected={selected}
        aria-disabled={disabled}
      >
        <span className="relative z-10">{content}</span>
      </button>
    );
  };

  // Month picker
  const renderMonthPicker = () => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentMonth.getFullYear(), i, 1);
      return new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
    });

    return (
      <div className="grid grid-cols-3 gap-2 p-4">
        {months.map((month, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleMonthYearSelect("month", index)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all",
              "hover:bg-primary/10 hover:text-primary",
              currentMonth.getMonth() === index &&
                "bg-primary text-primary-foreground"
            )}
          >
            {month}
          </button>
        ))}
      </div>
    );
  };

  // Year picker
  const renderYearPicker = () => {
    const currentYear = currentMonth.getFullYear();
    const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);

    return (
      <div className="grid grid-cols-3 gap-2 p-4">
        {years.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => handleMonthYearSelect("year", year)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all",
              "hover:bg-primary/10 hover:text-primary",
              currentYear === year && "bg-primary text-primary-foreground"
            )}
          >
            {year}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={cn(
        calendarVariants({ variant, color, bordered, size, rounded }),
        className
      )}
      role="application"
      aria-label="Calendar"
    >
      {/* Header */}
      <div className="relative z-10 mb-4">
        {headerContent || (
          <div className="flex items-center justify-between">
            {/* Previous month button */}
            <button
              type="button"
              onClick={() => navigateMonth("prev")}
              className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
              aria-label="Previous month"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Month/Year selector */}
            <div className="flex items-center gap-2">
              {enablePicker ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setPickerMode(pickerMode === "month" ? null : "month")
                    }
                    className="px-3 py-1.5 rounded-lg font-semibold hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    {new Intl.DateTimeFormat(locale, {
                      month: "long",
                    }).format(currentMonth)}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPickerMode(pickerMode === "year" ? null : "year")
                    }
                    className="px-3 py-1.5 rounded-lg font-semibold hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    {currentMonth.getFullYear()}
                  </button>
                </>
              ) : (
                <div className="px-3 py-1.5 font-semibold">
                  {new Intl.DateTimeFormat(locale, {
                    month: "long",
                    year: "numeric",
                  }).format(currentMonth)}
                </div>
              )}
            </div>

            {/* Next month button */}
            <button
              type="button"
              onClick={() => navigateMonth("next")}
              className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
              aria-label="Next month"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Month/Year Picker */}
      {pickerMode === "month" && renderMonthPicker()}
      {pickerMode === "year" && renderYearPicker()}

      {/* Calendar Grid */}
      {!pickerMode && (
        <div className="relative z-10">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {showWeekNumbers && (
              <div className="h-8 w-8 flex items-center justify-center text-xs font-semibold text-muted-foreground">
                #
              </div>
            )}
            {weekdayLabels.map((label, index) => (
              <div
                key={index}
                className="h-8 flex items-center justify-center text-xs font-semibold text-muted-foreground uppercase"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => renderDayCell(date, index))}
          </div>
        </div>
      )}

      {/* Footer */}
      {(showTodayButton || showClearButton || footerContent) && (
        <div className="relative z-10 mt-4 pt-4 border-t border-border/30">
          {footerContent || (
            <div className="flex items-center justify-between gap-2">
              {showTodayButton && (
                <button
                  type="button"
                  onClick={goToToday}
                  className="px-3 py-1.5 text-sm rounded-lg font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                >
                  Today
                </button>
              )}
              {showClearButton && (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="px-3 py-1.5 text-sm rounded-lg font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

Calendar.displayName = "Calendar";

export default Calendar;
