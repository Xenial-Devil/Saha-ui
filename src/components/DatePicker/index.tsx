import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useMemo,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";
// local cn helper to avoid external dependency
const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

import type {
  DatePickerProps,
  DateRange,
  ShortcutConfig,
} from "./DatePicker.types";

/**
 * DatePicker input variant styles using CVA
 */
export const datePickerVariants = cva(
  [
    "w-full",
    "inline-flex",
    "items-center",
    "justify-between",
    "gap-2",
    "font-medium",
    "transition-all",
    "duration-200",
    "border",
    "cursor-pointer",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-base-200",
          "text-base-content",
          "border-base-300",
          "hover:bg-base-300",
          "focus:ring-primary",
        ],
        primary: [
          "bg-primary/10",
          "text-primary",
          "border-primary/20",
          "hover:bg-primary/20",
          "focus:ring-primary",
        ],
        secondary: [
          "bg-secondary/10",
          "text-secondary",
          "border-secondary/20",
          "hover:bg-secondary/20",
          "focus:ring-secondary",
        ],
        accent: [
          "bg-accent/10",
          "text-accent",
          "border-accent/20",
          "hover:bg-accent/20",
          "focus:ring-accent",
        ],
        success: [
          "bg-success/10",
          "text-success",
          "border-success/20",
          "hover:bg-success/20",
          "focus:ring-success",
        ],
        warning: [
          "bg-warning/10",
          "text-warning",
          "border-warning/20",
          "hover:bg-warning/20",
          "focus:ring-warning",
        ],
        danger: [
          "bg-destructive/10",
          "text-destructive",
          "border-destructive/20",
          "hover:bg-destructive/20",
          "focus:ring-destructive",
        ],
        info: [
          "bg-info/10",
          "text-info",
          "border-info/20",
          "hover:bg-info/20",
          "focus:ring-info",
        ],
        glass: [
          "backdrop-blur-xl",
          "bg-white/30 dark:bg-gray-900/40",
          "border-white/40 dark:border-white/20",
          "text-base-content",
          "hover:bg-white/40 dark:hover:bg-gray-900/50",
          "focus:ring-primary",
        ],
        bordered: [
          "bg-base-100",
          "text-base-content",
          "border-2 border-base-300",
          "hover:bg-base-200",
          "focus:ring-primary",
        ],
        elevated: [
          "bg-base-100",
          "text-base-content",
          "border-base-300",
          "shadow-lg",
          "hover:shadow-xl",
          "focus:ring-primary",
        ],
        flat: [
          "bg-base-200",
          "text-base-content",
          "border-transparent",
          "hover:bg-base-300",
          "focus:ring-primary",
        ],
        outlined: [
          "bg-transparent",
          "text-base-content",
          "border-base-content/20",
          "hover:bg-base-content/5",
          "hover:border-base-content/30",
          "focus:ring-base-content/20",
        ],
        minimal: [
          "bg-transparent",
          "text-base-content",
          "border-transparent",
          "hover:bg-base-200",
          "focus:ring-primary",
        ],
      },
      size: {
        sm: ["h-8", "px-2", "text-sm", "rounded-md"],
        md: ["h-10", "px-3", "text-base", "rounded-lg"],
        lg: ["h-12", "px-4", "text-lg", "rounded-lg"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Calendar dropdown variant styles
 */
export const calendarVariants = cva(
  ["shadow-lg", "border", "px-1", "py-0.5", "rounded-lg"],
  {
    variants: {
      variant: {
        default: [
          "bg-white dark:bg-gray-800",
          "border-base-300",
          "text-base-content",
        ],
        primary: [
          "bg-white dark:bg-gray-800",
          "border-primary/20",
          "text-base-content",
        ],
        secondary: [
          "bg-white dark:bg-gray-800",
          "border-secondary/20",
          "text-base-content",
        ],
        accent: [
          "bg-white dark:bg-gray-800",
          "border-accent/20",
          "text-base-content",
        ],
        success: [
          "bg-white dark:bg-gray-800",
          "border-success/20",
          "text-base-content",
        ],
        warning: [
          "bg-white dark:bg-gray-800",
          "border-warning/20",
          "text-base-content",
        ],
        danger: [
          "bg-white dark:bg-gray-800",
          "border-destructive/20",
          "text-base-content",
        ],
        info: [
          "bg-white dark:bg-gray-800",
          "border-info/20",
          "text-base-content",
        ],
        glass: [
          "backdrop-blur-xl",
          "bg-white/30 dark:bg-gray-900/40",
          "border-white/40 dark:border-white/20",
          "text-base-content",
        ],
        bordered: [
          "bg-white dark:bg-gray-800",
          "border-2 border-base-300",
          "text-base-content",
        ],
        elevated: [
          "bg-white dark:bg-gray-800",
          "border-base-300",
          "text-base-content",
          "shadow-2xl",
        ],
        flat: [
          "bg-white dark:bg-gray-800",
          "border-base-300",
          "text-base-content",
        ],
        outlined: [
          "bg-white dark:bg-gray-800",
          "border-base-content/20",
          "text-base-content",
        ],
        minimal: [
          "bg-white dark:bg-gray-800",
          "border-base-300",
          "text-base-content",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Helper functions
const formatDate = (date: Date | null | undefined, format: string): string => {
  if (!date) return "";

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return format
    .replace("MM", month)
    .replace("DD", day)
    .replace("YYYY", String(year));
};

const isSameDay = (
  date1: Date | null | undefined,
  date2: Date | null | undefined
): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const isDateBefore = (date1: Date, date2: Date): boolean => {
  return date1.getTime() < date2.getTime();
};

const isDateAfter = (date1: Date, date2: Date): boolean => {
  return date1.getTime() > date2.getTime();
};

const isDateBetween = (date: Date, start: Date, end: Date): boolean => {
  return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

// Default shortcuts
const getDefaultShortcuts = (): Record<string, ShortcutConfig> => {
  const today = new Date();
  const yesterday = addDays(today, -1);

  return {
    today: {
      text: "Today",
      period: { start: today, end: today },
    },
    yesterday: {
      text: "Yesterday",
      period: { start: yesterday, end: yesterday },
    },
    last7Days: {
      text: "Last 7 days",
      period: { start: addDays(today, -6), end: today },
    },
    last30Days: {
      text: "Last 30 days",
      period: { start: addDays(today, -29), end: today },
    },
    thisMonth: {
      text: "This month",
      period: { start: startOfMonth(today), end: endOfMonth(today) },
    },
    lastMonth: {
      text: "Last month",
      period: {
        start: startOfMonth(addDays(startOfMonth(today), -1)),
        end: endOfMonth(addDays(startOfMonth(today), -1)),
      },
    },
  };
};

/**
 * DatePicker Component
 *
 * A comprehensive date picker with range selection, shortcuts, and advanced features.
 * Based on react-tailwindcss-datepicker with custom theme support.
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      variant = "default",
      size = "md",
      useRange = true,
      asSingle = false,
      minDate,
      maxDate,
      disabled = false,
      readOnly = false,
      required = false,
      placeholder = "Select date",
      displayFormat = "MM/DD/YYYY",
      separator = " ~ ",
      startWeekOn = 0,
      showShortcuts = false,
      showFooter = false,
      showClear = true,
      showToday = true,
      configs,
      disabledDates = [],
      startFrom,
      popoverDirection = "down",
      i18n = "en",
      inputClassName,
      containerClassName,
      inputId,
      inputName,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
    const [tempRange, setTempRange] = useState<DateRange>(value);
    const [isAbove, setIsAbove] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
    });
    const [isPositioned, setIsPositioned] = useState(false);

    // Determine calendar months to display
    const [firstMonth, setFirstMonth] = useState(() => {
      if (value.startDate) return value.startDate;
      if (startFrom) return startFrom;
      return new Date();
    });

    const [secondMonth, setSecondMonth] = useState(() => {
      const first = value.startDate || startFrom || new Date();
      const result = new Date(first);
      result.setMonth(result.getMonth() + 1);
      return result;
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Calculate dropdown position and update when opening
    useEffect(() => {
      if (isOpen && containerRef.current) {
        const updatePosition = () => {
          if (!containerRef.current) return;

          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const spaceBelow = windowHeight - rect.bottom;
          const spaceAbove = rect.top;

          // Determine if should open above or below
          const shouldOpenAbove =
            popoverDirection === "up" ||
            (popoverDirection !== "down" &&
              spaceBelow < 350 &&
              spaceAbove > spaceBelow);

          setIsAbove(shouldOpenAbove);

          // Set position for fixed positioning
          setDropdownPosition({
            top: shouldOpenAbove ? rect.top : rect.bottom,
            left: rect.left,
            width: rect.width,
          });

          // Mark as positioned to show the dropdown
          setIsPositioned(true);
        };

        updatePosition();

        // Update position on scroll and resize
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);

        return () => {
          window.removeEventListener("scroll", updatePosition, true);
          window.removeEventListener("resize", updatePosition);
        };
      } else {
        // Reset positioned state when closed
        setIsPositioned(false);
      }
    }, [isOpen, popoverDirection]);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;

        // Check if click is outside both the input container and the dropdown portal
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(target)
        ) {
          if (showFooter && useRange) {
            // Reset temp range if footer is shown
            setTempRange(value);
          }
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, showFooter, useRange, value]);

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          setIsOpen(false);
          if (showFooter && useRange) {
            setTempRange(value);
          }
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, showFooter, useRange, value]);

    const isDateDisabled = useCallback(
      (date: Date): boolean => {
        if (minDate && isDateBefore(date, minDate)) return true;
        if (maxDate && isDateAfter(date, maxDate)) return true;

        return disabledDates.some((range) =>
          isDateBetween(date, range.startDate, range.endDate)
        );
      },
      [minDate, maxDate, disabledDates]
    );

    const handleDateSelect = (date: Date) => {
      if (isDateDisabled(date) || readOnly) return;

      if (!useRange || asSingle) {
        // Single date selection
        onChange({ startDate: date, endDate: date });
        if (!showFooter) {
          setIsOpen(false);
        }
      } else {
        // Range selection
        const currentRange = showFooter ? tempRange : value;

        if (
          !currentRange.startDate ||
          (currentRange.startDate && currentRange.endDate)
        ) {
          // Start new range
          const newRange = { startDate: date, endDate: null };
          if (showFooter) {
            setTempRange(newRange);
          } else {
            onChange(newRange);
          }
        } else {
          // Complete range
          const newRange = isDateBefore(date, currentRange.startDate)
            ? { startDate: date, endDate: currentRange.startDate }
            : { startDate: currentRange.startDate, endDate: date };

          if (showFooter) {
            setTempRange(newRange);
          } else {
            onChange(newRange);
            setIsOpen(false);
          }
        }
      }
    };

    const handleShortcutClick = (shortcut: ShortcutConfig) => {
      const newRange = {
        startDate: shortcut.period.start,
        endDate: shortcut.period.end,
      };

      if (showFooter && useRange) {
        setTempRange(newRange);
      } else {
        onChange(newRange);
        setIsOpen(false);
      }
    };

    const handleToday = () => {
      const today = new Date();
      handleDateSelect(today);
    };

    const handleApply = () => {
      onChange(tempRange);
      setIsOpen(false);
    };

    const handleCancel = () => {
      setTempRange(value);
      setIsOpen(false);
    };

    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Rotate week days based on startWeekOn
    const rotatedWeekDays = useMemo(
      () => [...weekDays.slice(startWeekOn), ...weekDays.slice(0, startWeekOn)],
      [startWeekOn]
    );

    // Generate calendar days for a month
    const generateCalendarDays = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const firstDay = (getFirstDayOfMonth(year, month) - startWeekOn + 7) % 7;
      const days: (Date | null)[] = [];

      // Previous month days
      for (let i = 0; i < firstDay; i++) {
        days.push(null);
      }

      // Current month days
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
      }

      return days;
    };

    const getDateClassName = (day: Date, isCurrentMonth: boolean = true) => {
      const currentRange = showFooter && useRange ? tempRange : value;
      const baseClass =
        "flex items-center justify-center w-10 h-10 rounded-lg transition-colors";

      if (!isCurrentMonth) {
        return cn(baseClass, "text-base-content/30 hover:bg-base-200/50");
      }

      const isDisabled = isDateDisabled(day);
      const isToday = isSameDay(day, new Date());
      const isStart =
        currentRange.startDate && isSameDay(day, currentRange.startDate);
      const isEnd =
        currentRange.endDate && isSameDay(day, currentRange.endDate);
      const isInRange =
        useRange &&
        currentRange.startDate &&
        currentRange.endDate &&
        isDateBetween(day, currentRange.startDate, currentRange.endDate);
      const isHoverInRange =
        useRange &&
        hoveredDate &&
        currentRange.startDate &&
        !currentRange.endDate &&
        ((isDateAfter(hoveredDate, currentRange.startDate) &&
          isDateBetween(day, currentRange.startDate, hoveredDate)) ||
          (isDateBefore(hoveredDate, currentRange.startDate) &&
            isDateBetween(day, hoveredDate, currentRange.startDate)));

      // Variant-based color classes
      const variantClasses = {
        default: {
          selected: "bg-primary text-white",
          range: "bg-primary/20 text-primary",
          today: "border-2 border-primary text-primary hover:bg-primary/10",
          hover: "hover:bg-base-200",
        },
        primary: {
          selected: "bg-primary text-white",
          range: "bg-primary/20 text-primary",
          today: "border-2 border-primary text-primary hover:bg-primary/10",
          hover: "hover:bg-primary/10",
        },
        secondary: {
          selected: "bg-secondary text-white",
          range: "bg-secondary/20 text-secondary",
          today:
            "border-2 border-secondary text-secondary hover:bg-secondary/10",
          hover: "hover:bg-secondary/10",
        },
        accent: {
          selected: "bg-accent text-white",
          range: "bg-accent/20 text-accent",
          today: "border-2 border-accent text-accent hover:bg-accent/10",
          hover: "hover:bg-accent/10",
        },
        success: {
          selected: "bg-success text-white",
          range: "bg-success/20 text-success",
          today: "border-2 border-success text-success hover:bg-success/10",
          hover: "hover:bg-success/10",
        },
        warning: {
          selected: "bg-warning text-white",
          range: "bg-warning/20 text-warning",
          today: "border-2 border-warning text-warning hover:bg-warning/10",
          hover: "hover:bg-warning/10",
        },
        danger: {
          selected: "bg-destructive text-white",
          range: "bg-destructive/20 text-destructive",
          today:
            "border-2 border-destructive text-destructive hover:bg-destructive/10",
          hover: "hover:bg-destructive/10",
        },
        info: {
          selected: "bg-info text-white",
          range: "bg-info/20 text-info",
          today: "border-2 border-info text-info hover:bg-info/10",
          hover: "hover:bg-info/10",
        },
        glass: {
          selected: "bg-primary text-white",
          range: "bg-primary/20 text-primary",
          today:
            "border-2 border-primary text-primary hover:bg-white/10 dark:hover:bg-gray-900/10",
          hover: "hover:bg-white/10 dark:hover:bg-gray-900/10",
        },
        bordered: {
          selected: "bg-primary text-white",
          range: "bg-primary/20 text-primary",
          today: "border-2 border-primary text-primary hover:bg-primary/10",
          hover: "hover:bg-base-200",
        },
        elevated: {
          selected: "bg-primary text-white",
          range: "bg-primary/20 text-primary",
          today: "border-2 border-primary text-primary hover:bg-primary/10",
          hover: "hover:bg-base-200",
        },
        flat: {
          selected: "bg-primary text-white",
          range: "bg-primary/20 text-primary",
          today: "border-2 border-primary text-primary hover:bg-primary/10",
          hover: "hover:bg-base-200",
        },
        outlined: {
          selected: "bg-base-content text-base-100",
          range: "bg-base-content/20 text-base-content",
          today:
            "border-2 border-base-content text-base-content hover:bg-base-content/10",
          hover: "hover:bg-base-200",
        },
        minimal: {
          selected: "bg-primary text-white",
          range: "bg-primary/20 text-primary",
          today: "border-2 border-primary text-primary hover:bg-primary/10",
          hover: "hover:bg-base-200",
        },
      };

      const colors = variantClasses[variant];

      if (isDisabled) {
        return cn(
          baseClass,
          "text-base-content/30 cursor-not-allowed line-through"
        );
      }

      if (isStart && isEnd) {
        return cn(baseClass, colors.selected, "font-semibold");
      }

      if (isStart) {
        return cn(
          baseClass,
          colors.selected,
          "font-semibold",
          useRange && "rounded-r-none"
        );
      }

      if (isEnd) {
        return cn(
          baseClass,
          colors.selected,
          "font-semibold",
          useRange && "rounded-l-none"
        );
      }

      if (isInRange || isHoverInRange) {
        return cn(baseClass, colors.range, "rounded-none");
      }

      if (isToday) {
        return cn(baseClass, colors.today, "font-semibold");
      }

      return cn(baseClass, colors.hover, "cursor-pointer");
    };

    const shortcuts = useMemo(() => {
      const defaultShortcuts = getDefaultShortcuts();
      const customShortcuts = configs?.shortcuts || {};

      return Object.entries({ ...defaultShortcuts, ...customShortcuts }).map(
        ([key, config]) => {
          if (typeof config === "string") {
            return { key, ...defaultShortcuts[key] } as ShortcutConfig & {
              key: string;
            };
          }
          return { key, ...config } as ShortcutConfig & { key: string };
        }
      );
    }, [configs?.shortcuts]);

    const displayValue = useMemo(() => {
      if (!value.startDate && !value.endDate) return "";

      if (asSingle || !useRange || !value.endDate) {
        return formatDate(value.startDate, displayFormat);
      }

      return `${formatDate(
        value.startDate,
        displayFormat
      )}${separator}${formatDate(value.endDate, displayFormat)}`;
    }, [value, asSingle, useRange, displayFormat, separator]);

    const renderCalendar = useCallback(
      (month: Date) => {
        const calendarDays = generateCalendarDays(month);

        return (
          <div className="p-4 min-w-[280px]">
            {/* Month/Year Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => {
                  const newDate = new Date(month);
                  newDate.setMonth(newDate.getMonth() - 1);
                  if (month === firstMonth) {
                    setFirstMonth(newDate);
                  } else {
                    setSecondMonth(newDate);
                  }
                }}
                className="p-1.5 hover:bg-base-200 rounded-lg transition-colors"
                aria-label="Previous month"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => {
                  // Month/year selection can be implemented here
                  // setView("months");
                }}
                className="font-semibold hover:bg-base-200 px-3 py-1.5 rounded-lg transition-colors text-sm"
              >
                {months[month.getMonth()]} {month.getFullYear()}
              </button>

              <button
                type="button"
                onClick={() => {
                  const newDate = new Date(month);
                  newDate.setMonth(newDate.getMonth() + 1);
                  if (month === firstMonth) {
                    setFirstMonth(newDate);
                  } else {
                    setSecondMonth(newDate);
                  }
                }}
                className="p-1.5 hover:bg-base-200 rounded-lg transition-colors"
                aria-label="Next month"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Week days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {rotatedWeekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-base-content/60 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="w-10 h-10" />;
                }

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDateSelect(day)}
                    onMouseEnter={() => setHoveredDate(day)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className={getDateClassName(day)}
                    disabled={isDateDisabled(day)}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        );
      },
      [
        firstMonth,
        secondMonth,
        rotatedWeekDays,
        months,
        hoveredDate,
        showFooter,
        useRange,
        value,
        tempRange,
        variant,
        isDateDisabled,
        handleDateSelect,
        getDateClassName,
      ]
    );

    return (
      <div
        ref={containerRef}
        className={cn("relative w-full z-20", containerClassName, className)}
        {...props}
      >
        {/* Input */}
        <input
          ref={ref}
          type="text"
          className={cn(datePickerVariants({ variant, size }), inputClassName)}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={
            placeholder ||
            `${displayFormat}${
              useRange ? ` ${separator} ${displayFormat}` : ""
            }`
          }
          value={displayValue}
          onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
          onChange={() => {}} // Controlled input
          autoComplete="off"
          role="presentation"
          aria-label="Date picker input"
        />

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
          className="absolute right-0 h-full px-3 text-base-content/60 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={disabled}
          aria-label="Toggle date picker"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </button>

        {/* Calendar Dropdown - Portal Rendered */}
        {isOpen &&
          isPositioned &&
          createPortal(
            <div
              ref={dropdownRef}
              className={cn(
                "fixed z-[9999] text-sm lg:text-xs 2xl:text-sm",
                "transition-opacity duration-150 will-change-transform",
                "opacity-100",
                "w-fit"
              )}
              style={{
                top: isAbove
                  ? `${dropdownPosition.top}px`
                  : `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                transform: isAbove ? "translateY(-100%)" : "translateY(0)",
              }}
            >
              {/* Arrow/Triangle pointer */}
              <div
                className={cn(
                  "absolute h-5 w-5 rotate-45 border-l border-t",
                  isAbove ? "bottom-[.1rem] left-6" : "top-[0.1rem] left-6",
                  variant === "default" &&
                    "bg-white dark:bg-gray-800 border-primary/20",
                  variant === "primary" &&
                    "bg-white dark:bg-gray-800 border-primary/20",
                  variant === "secondary" &&
                    "bg-white dark:bg-gray-800 border-secondary/20",
                  variant === "accent" &&
                    "bg-white dark:bg-gray-800 border-accent/20",
                  variant === "success" &&
                    "bg-white dark:bg-gray-800 border-success/20",
                  variant === "warning" &&
                    "bg-white dark:bg-gray-800 border-warning/20",
                  variant === "danger" &&
                    "bg-white dark:bg-gray-800 border-destructive/20",
                  variant === "info" &&
                    "bg-white dark:bg-gray-800 border-info/20",
                  variant === "glass" &&
                    "border-white/40 dark:border-white/20 backdrop-blur-xl bg-white/30 dark:bg-gray-900/40",
                  variant === "bordered" &&
                    "border-2 bg-white dark:bg-gray-800 border-base-300",
                  variant === "elevated" &&
                    "bg-white dark:bg-gray-800 border-base-300",
                  variant === "flat" &&
                    "bg-white dark:bg-gray-800 border-base-300",
                  variant === "outlined" &&
                    "bg-white dark:bg-gray-800 border-base-content/20",
                  variant === "minimal" &&
                    "bg-white dark:bg-gray-800 border-base-300"
                )}
                style={{
                  clipPath: isAbove
                    ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                    : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                }}
              />

              {/* Dropdown content */}
              <div
                className={cn(
                  calendarVariants({ variant }),
                  isAbove ? "mb-2.5" : "mt-2.5",
                  "w-fit will-change-transform contain-layout contain-paint"
                )}
              >
                <div className="flex w-fit">
                  {/* Shortcuts Sidebar */}
                  {showShortcuts && (
                    <div
                      className={cn(
                        "border-r p-2 min-w-[160px]",
                        variant === "default" && "border-base-300",
                        variant === "primary" && "border-primary/20",
                        variant === "secondary" && "border-secondary/20",
                        variant === "accent" && "border-accent/20",
                        variant === "success" && "border-success/20",
                        variant === "warning" && "border-warning/20",
                        variant === "danger" && "border-destructive/20",
                        variant === "info" && "border-info/20",
                        variant === "glass" &&
                          "border-white/40 dark:border-white/20",
                        variant === "bordered" && "border-base-300",
                        variant === "elevated" && "border-base-300",
                        variant === "flat" && "border-base-300",
                        variant === "outlined" && "border-base-content/20",
                        variant === "minimal" && "border-base-300"
                      )}
                    >
                      <div className="flex flex-col gap-1">
                        {shortcuts.map((shortcut) => (
                          <button
                            key={shortcut.key}
                            type="button"
                            onClick={() => handleShortcutClick(shortcut)}
                            className={cn(
                              "text-left px-3 py-2 rounded-lg text-sm transition-colors",
                              variant === "default" && "hover:bg-base-200",
                              variant === "primary" &&
                                "hover:bg-primary/10 hover:text-primary",
                              variant === "secondary" &&
                                "hover:bg-secondary/10 hover:text-secondary",
                              variant === "accent" &&
                                "hover:bg-accent/10 hover:text-accent",
                              variant === "success" &&
                                "hover:bg-success/10 hover:text-success",
                              variant === "warning" &&
                                "hover:bg-warning/10 hover:text-warning",
                              variant === "danger" &&
                                "hover:bg-destructive/10 hover:text-destructive",
                              variant === "info" &&
                                "hover:bg-info/10 hover:text-info",
                              variant === "glass" &&
                                "hover:bg-white/10 dark:hover:bg-gray-900/10",
                              variant === "bordered" && "hover:bg-base-200",
                              variant === "elevated" && "hover:bg-base-200",
                              variant === "flat" && "hover:bg-base-200",
                              variant === "outlined" && "hover:bg-base-200",
                              variant === "minimal" && "hover:bg-base-200"
                            )}
                          >
                            {shortcut.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Calendar(s) */}
                  <div
                    className={cn(
                      "flex transform-gpu",
                      asSingle || !useRange ? "w-auto" : ""
                    )}
                  >
                    {renderCalendar(firstMonth)}
                    {!asSingle && useRange && renderCalendar(secondMonth)}
                  </div>
                </div>

                {/* Footer */}
                {showFooter && useRange && (
                  <div
                    className={cn(
                      "border-t px-4 py-3 flex items-center justify-between gap-2",
                      variant === "default" && "border-base-300",
                      variant === "primary" && "border-primary/20",
                      variant === "secondary" && "border-secondary/20",
                      variant === "accent" && "border-accent/20",
                      variant === "success" && "border-success/20",
                      variant === "warning" && "border-warning/20",
                      variant === "danger" && "border-destructive/20",
                      variant === "info" && "border-info/20",
                      variant === "glass" &&
                        "border-white/40 dark:border-white/20",
                      variant === "bordered" && "border-base-300",
                      variant === "elevated" && "border-base-300",
                      variant === "flat" && "border-base-300",
                      variant === "outlined" && "border-base-content/20",
                      variant === "minimal" && "border-base-300"
                    )}
                  >
                    {showToday && (
                      <button
                        type="button"
                        onClick={handleToday}
                        className={cn(
                          "text-sm hover:underline",
                          variant === "default" && "text-primary",
                          variant === "primary" && "text-primary",
                          variant === "secondary" && "text-secondary",
                          variant === "accent" && "text-accent",
                          variant === "success" && "text-success",
                          variant === "warning" && "text-warning",
                          variant === "danger" && "text-destructive",
                          variant === "info" && "text-info",
                          variant === "glass" && "text-primary",
                          variant === "bordered" && "text-primary",
                          variant === "elevated" && "text-primary",
                          variant === "flat" && "text-primary",
                          variant === "outlined" && "text-base-content",
                          variant === "minimal" && "text-primary"
                        )}
                      >
                        Today
                      </button>
                    )}
                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className={cn(
                          "px-4 py-2 text-sm border rounded-lg transition-colors",
                          variant === "default" &&
                            "border-base-300 hover:bg-base-200",
                          variant === "primary" &&
                            "border-primary/20 hover:bg-primary/10",
                          variant === "secondary" &&
                            "border-secondary/20 hover:bg-secondary/10",
                          variant === "accent" &&
                            "border-accent/20 hover:bg-accent/10",
                          variant === "success" &&
                            "border-success/20 hover:bg-success/10",
                          variant === "warning" &&
                            "border-warning/20 hover:bg-warning/10",
                          variant === "danger" &&
                            "border-destructive/20 hover:bg-destructive/10",
                          variant === "info" &&
                            "border-info/20 hover:bg-info/10",
                          variant === "glass" &&
                            "border-white/40 dark:border-white/20 hover:bg-white/10 dark:hover:bg-gray-900/10",
                          variant === "bordered" &&
                            "border-base-300 hover:bg-base-200",
                          variant === "elevated" &&
                            "border-base-300 hover:bg-base-200",
                          variant === "flat" &&
                            "border-base-300 hover:bg-base-200",
                          variant === "outlined" &&
                            "border-base-content/20 hover:bg-base-200",
                          variant === "minimal" &&
                            "border-base-300 hover:bg-base-200"
                        )}
                      >
                        {configs?.footer?.cancel || "Cancel"}
                      </button>
                      <button
                        type="button"
                        onClick={handleApply}
                        className={cn(
                          "px-4 py-2 text-sm text-white rounded-lg transition-colors",
                          variant === "default" &&
                            "bg-primary hover:bg-primary/90",
                          variant === "primary" &&
                            "bg-primary hover:bg-primary/90",
                          variant === "secondary" &&
                            "bg-secondary hover:bg-secondary/90",
                          variant === "accent" &&
                            "bg-accent hover:bg-accent/90",
                          variant === "success" &&
                            "bg-success hover:bg-success/90",
                          variant === "warning" &&
                            "bg-warning hover:bg-warning/90",
                          variant === "danger" &&
                            "bg-destructive hover:bg-destructive/90",
                          variant === "info" && "bg-info hover:bg-info/90",
                          variant === "glass" &&
                            "bg-primary hover:bg-primary/90",
                          variant === "bordered" &&
                            "bg-primary hover:bg-primary/90",
                          variant === "elevated" &&
                            "bg-primary hover:bg-primary/90",
                          variant === "flat" &&
                            "bg-primary hover:bg-primary/90",
                          variant === "outlined" &&
                            "bg-base-content hover:bg-base-content/90",
                          variant === "minimal" &&
                            "bg-primary hover:bg-primary/90"
                        )}
                      >
                        {configs?.footer?.apply || "Apply"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Today button (when no footer) */}
                {!showFooter && showToday && (
                  <div
                    className={cn(
                      "border-t px-4 py-2",
                      variant === "default" && "border-base-300",
                      variant === "primary" && "border-primary/20",
                      variant === "secondary" && "border-secondary/20",
                      variant === "accent" && "border-accent/20",
                      variant === "success" && "border-success/20",
                      variant === "warning" && "border-warning/20",
                      variant === "danger" && "border-destructive/20",
                      variant === "info" && "border-info/20",
                      variant === "glass" &&
                        "border-white/40 dark:border-white/20",
                      variant === "bordered" && "border-base-300",
                      variant === "elevated" && "border-base-300",
                      variant === "flat" && "border-base-300",
                      variant === "outlined" && "border-base-content/20",
                      variant === "minimal" && "border-base-300"
                    )}
                  >
                    <button
                      type="button"
                      onClick={handleToday}
                      className={cn(
                        "text-sm hover:underline",
                        variant === "default" && "text-primary",
                        variant === "primary" && "text-primary",
                        variant === "secondary" && "text-secondary",
                        variant === "accent" && "text-accent",
                        variant === "success" && "text-success",
                        variant === "warning" && "text-warning",
                        variant === "danger" && "text-destructive",
                        variant === "info" && "text-info",
                        variant === "glass" && "text-primary",
                        variant === "bordered" && "text-primary",
                        variant === "elevated" && "text-primary",
                        variant === "flat" && "text-primary",
                        variant === "outlined" && "text-base-content",
                        variant === "minimal" && "text-primary"
                      )}
                    >
                      Today
                    </button>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
