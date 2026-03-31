"use client";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useMemo,
  useCallback,
} from "react";
import { createPortal } from "react-dom";

const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

import type {
  TimePickerProps,
  TimeValue,
  TimeRange,
  TimeShortcutConfig,
  TimePickerConfigs,
  TimeFormat,
  AnimationType,
} from "./TimePicker.types";
import {
  timePickerVariants,
  timeDropdownVariants,
  timePickerContainerVariants,
  timeColumnsContainerVariants,
  timeColumnVariants,
  timeItemVariants,
  amPmSelectorVariants,
  amPmButtonVariants,
  columnLabelVariants,
  columnSeparatorVariants,
  shortcutsSidebarVariants,
  shortcutButtonVariants,
  footerVariants,
  footerCancelButtonVariants,
  footerApplyButtonVariants,
  arrowVariants,
  toggleButtonVariants,
  spinnerButtonVariants,
  liveClockVariants,
  formatToggleVariants,
} from "./TimePicker.styles";
import { getLocale } from "./TimePicker.locales";
import {
  formatTime,
  isTimeBefore,
  isTimeDisabled,
  generateHours,
  generateMinutes,
  generateSeconds,
  to12Hour,
  to24Hour,
  getCurrentTime,
  getDefaultDisplayFormat,
  addTime,
  padZero,
  parseTime,
} from "./TimePicker.utils";

// Icons
const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const CoffeeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8h1a4 4 0 010 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zm10-4H7v4h6V4z"
    />
  </svg>
);

const SunsetIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m-9-9h1m16 0h1M5.636 5.636l.707.707m12.02 12.02l.707.707M18.364 5.636l-.707.707M5.636 18.364l.707-.707"
    />
  </svg>
);

const BoltIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

// Helper to check if value is TimeRange
const isTimeRange = (
  value: TimeValue | TimeRange | null
): value is TimeRange => {
  if (!value) return false;
  return "startTime" in value && "endTime" in value;
};

// Get animation class
const getAnimationClass = (
  animation: AnimationType,
  isAbove: boolean
): string => {
  switch (animation) {
    case "slide":
      return isAbove
        ? "timepicker-animate-slide-down"
        : "timepicker-animate-slide-up";
    case "scale":
      return "timepicker-animate-scale";
    case "fade":
      return "timepicker-animate-fade";
    default:
      return "";
  }
};

// Get default shortcuts
const getDefaultShortcuts = (
  configs: TimePickerConfigs | null,
  locales: ReturnType<typeof getLocale>,
  showSeconds: boolean
): Record<string, TimeShortcutConfig> => {
  return {
    now: {
      text: (configs?.shortcuts?.now as string) ?? locales.shortcuts.now,
      time: getCurrentTime(showSeconds),
      icon: <BoltIcon className="w-4 h-4" />,
    },
    midnight: {
      text:
        (configs?.shortcuts?.midnight as string) ?? locales.shortcuts.midnight,
      time: { hours: 0, minutes: 0, seconds: showSeconds ? 0 : undefined },
      icon: <MoonIcon className="w-4 h-4" />,
    },
    noon: {
      text: (configs?.shortcuts?.noon as string) ?? locales.shortcuts.noon,
      time: { hours: 12, minutes: 0, seconds: showSeconds ? 0 : undefined },
      icon: <SunIcon className="w-4 h-4" />,
    },
    morning: {
      text:
        (configs?.shortcuts?.morning as string) ?? locales.shortcuts.morning,
      time: { hours: 8, minutes: 0, seconds: showSeconds ? 0 : undefined },
      icon: <CoffeeIcon className="w-4 h-4" />,
    },
    evening: {
      text:
        (configs?.shortcuts?.evening as string) ?? locales.shortcuts.evening,
      time: { hours: 18, minutes: 0, seconds: showSeconds ? 0 : undefined },
      icon: <SunsetIcon className="w-4 h-4" />,
    },
  };
};

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      variant = "default",
      size = "md",
      useRange = false,
      format: initialFormat = "24h",
      showSeconds = false,
      minuteInterval = 1,
      minTime,
      maxTime,
      disabled = false,
      readOnly = false,
      required: _required = false,
      placeholder,
      displayFormat,
      separator = " → ",
      showShortcuts = false,
      showFooter = false,
      showClear = true,
      showNow = false,
      showSpinners = false,
      showLiveClock = false,
      showFormatToggle = false,
      configs,
      popoverDirection = "auto",
      animation = "slide",
      i18n = "en",
      inputClassName,
      containerClassName,
      dropdownClassName,
      inputId: _inputId,
      inputName: _inputName,
      error = false,
      errorMessage,
      success = false,
      helperText,
      label,
      closeOnSelect = true,
      enableKeyboardNav = true,
      validateTime,
      onFormatChange,
      renderTimeItem,
      className,
      ...props
    },
    ref
  ) => {
    const locales = getLocale(i18n);
    const [rawInput, setRawInput] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isAbove, setIsAbove] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
    });
    const [isPositioned, setIsPositioned] = useState(false);
    const [format, setFormat] = useState<TimeFormat>(initialFormat);
    const [liveTime, setLiveTime] = useState<Date>(new Date());

    // For range mode
    const [tempRange, setTempRange] = useState<TimeRange>(
      isTimeRange(value) ? value : { startTime: value, endTime: null }
    );

    // Local state for time selection
    const [localTime, setLocalTime] = useState<TimeValue | null>(
      isTimeRange(value) ? value?.startTime : value
    );

    // AM/PM state for 12h format
    const [period, setPeriod] = useState<"AM" | "PM">(() => {
      const time = isTimeRange(value) ? value?.startTime : value;
      if (!time) return "AM";
      return time.hours >= 12 ? "PM" : "AM";
    });

    // Focused column for keyboard navigation
    const [focusedColumn, setFocusedColumn] = useState<
      "hour" | "minute" | "second" | "period"
    >("hour");
    const [_focusedIndex, setFocusedIndex] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hoursRef = useRef<HTMLDivElement>(null);
    const minutesRef = useRef<HTMLDivElement>(null);
    const secondsRef = useRef<HTMLDivElement>(null);

    // Update local state when value changes
    useEffect(() => {
      if (isTimeRange(value)) {
        setTempRange(value);
        setLocalTime(value.startTime);
      } else {
        setLocalTime(value);
      }
    }, [value]);

    // Update format when initialFormat changes
    useEffect(() => {
      setFormat(initialFormat);
    }, [initialFormat]);

    // Live clock update
    useEffect(() => {
      if (showLiveClock && isOpen) {
        const interval = setInterval(() => {
          setLiveTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
      }
      return undefined;
    }, [showLiveClock, isOpen]);

    // Position dropdown
    useEffect(() => {
      if (isOpen && containerRef.current) {
        const updatePosition = () => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const spaceBelow = windowHeight - rect.bottom;
          const spaceAbove = rect.top;
          const dropdownHeight = 400;

          let shouldOpenAbove = false;
          if (popoverDirection === "up") {
            shouldOpenAbove = true;
          } else if (popoverDirection === "down") {
            shouldOpenAbove = false;
          } else {
            shouldOpenAbove =
              spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
          }

          setIsAbove(shouldOpenAbove);
          setDropdownPosition({
            top: shouldOpenAbove ? rect.top : rect.bottom,
            left: rect.left,
            width: rect.width,
          });
          setIsPositioned(true);
        };

        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
        return () => {
          window.removeEventListener("scroll", updatePosition, true);
          window.removeEventListener("resize", updatePosition);
        };
      } else {
        setIsPositioned(false);
      }
      return undefined;
    }, [isOpen, popoverDirection]);

    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(target)
        ) {
          if (showFooter && useRange) {
            setTempRange(
              isTimeRange(value) ? value : { startTime: null, endTime: null }
            );
          }
          setIsOpen(false);
        }
      };
      if (isOpen) document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, showFooter, useRange, value]);

    // Keyboard navigation
    useEffect(() => {
      if (!enableKeyboardNav || !isOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "Escape":
            setIsOpen(false);
            if (showFooter && useRange) {
              setTempRange(
                isTimeRange(value) ? value : { startTime: null, endTime: null }
              );
            }
            break;
          case "ArrowUp":
            event.preventDefault();
            setFocusedIndex((prev) => Math.max(0, prev - 1));
            break;
          case "ArrowDown":
            event.preventDefault();
            setFocusedIndex((prev) => prev + 1);
            break;
          case "ArrowLeft":
            event.preventDefault();
            if (focusedColumn === "minute") setFocusedColumn("hour");
            else if (focusedColumn === "second") setFocusedColumn("minute");
            else if (focusedColumn === "period")
              setFocusedColumn(showSeconds ? "second" : "minute");
            break;
          case "ArrowRight":
            event.preventDefault();
            if (focusedColumn === "hour") setFocusedColumn("minute");
            else if (focusedColumn === "minute")
              setFocusedColumn(
                showSeconds ? "second" : format === "12h" ? "period" : "minute"
              );
            else if (focusedColumn === "second")
              setFocusedColumn(format === "12h" ? "period" : "second");
            break;
          case "Enter":
          case " ":
            event.preventDefault();
            // Select focused item
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [
      isOpen,
      enableKeyboardNav,
      focusedColumn,
      showSeconds,
      format,
      showFooter,
      useRange,
      value,
    ]);

    // Scroll to selected items when dropdown opens
    useEffect(() => {
      if (isOpen && isPositioned) {
        const scrollOptions: ScrollIntoViewOptions = {
          block: "center",
          behavior: "smooth",
        };
        setTimeout(() => {
          const scrollToSelected = (container: HTMLDivElement | null) => {
            if (!container) return;
            const selected = container.querySelector('[data-selected="true"]');
            if (selected) {
              selected.scrollIntoView(scrollOptions);
            }
          };
          scrollToSelected(hoursRef.current);
          scrollToSelected(minutesRef.current);
          scrollToSelected(secondsRef.current);
        }, 100);
      }
    }, [isOpen, isPositioned]);

    // Generate time arrays
    const hours = useMemo(() => generateHours(format), [format]);
    const minutes = useMemo(
      () => generateMinutes(minuteInterval),
      [minuteInterval]
    );
    const seconds = useMemo(
      () => generateSeconds(minuteInterval),
      [minuteInterval]
    );

    // Get current effective time
    const getEffectiveTime = useCallback((): TimeValue | null => {
      if (useRange && showFooter) {
        return tempRange.startTime;
      }
      return localTime;
    }, [useRange, showFooter, tempRange, localTime]);

    // Handle time selection
    const handleTimeSelect = useCallback(
      (newTime: TimeValue) => {
        // Custom validation
        if (validateTime && !validateTime(newTime)) return;
        if (isTimeDisabled(newTime, minTime, maxTime) || readOnly) return;

        if (!useRange) {
          setLocalTime(newTime);
          onChange(newTime);
          if (closeOnSelect && !showFooter) setIsOpen(false);
        } else {
          const currentRange = showFooter
            ? tempRange
            : isTimeRange(value)
            ? value
            : { startTime: null, endTime: null };

          if (
            !currentRange.startTime ||
            (currentRange.startTime && currentRange.endTime)
          ) {
            const newRange = { startTime: newTime, endTime: null };
            if (showFooter) setTempRange(newRange);
            else onChange(newRange);
          } else {
            const newRange = isTimeBefore(newTime, currentRange.startTime)
              ? { startTime: newTime, endTime: currentRange.startTime }
              : { startTime: currentRange.startTime, endTime: newTime };
            if (showFooter) {
              setTempRange(newRange);
            } else {
              onChange(newRange);
              if (closeOnSelect) setIsOpen(false);
            }
          }
        }
      },
      [
        minTime,
        maxTime,
        readOnly,
        useRange,
        showFooter,
        tempRange,
        value,
        onChange,
        closeOnSelect,
        validateTime,
      ]
    );

    // Handle hour selection
    const handleHourSelect = useCallback(
      (hour: number) => {
        const currentTime = getEffectiveTime();
        let actualHour = hour;

        if (format === "12h") {
          actualHour = to24Hour(hour, period);
        }

        const newTime: TimeValue = {
          hours: actualHour,
          minutes: currentTime?.minutes ?? 0,
          seconds: showSeconds ? currentTime?.seconds ?? 0 : undefined,
        };
        handleTimeSelect(newTime);
      },
      [format, period, showSeconds, getEffectiveTime, handleTimeSelect]
    );

    // Handle minute selection
    const handleMinuteSelect = useCallback(
      (minute: number) => {
        const currentTime = getEffectiveTime();
        const newTime: TimeValue = {
          hours: currentTime?.hours ?? 0,
          minutes: minute,
          seconds: showSeconds ? currentTime?.seconds ?? 0 : undefined,
        };
        handleTimeSelect(newTime);
      },
      [showSeconds, getEffectiveTime, handleTimeSelect]
    );

    // Handle second selection
    const handleSecondSelect = useCallback(
      (second: number) => {
        const currentTime = getEffectiveTime();
        const newTime: TimeValue = {
          hours: currentTime?.hours ?? 0,
          minutes: currentTime?.minutes ?? 0,
          seconds: second,
        };
        handleTimeSelect(newTime);
      },
      [getEffectiveTime, handleTimeSelect]
    );

    // Handle AM/PM toggle
    const handlePeriodChange = useCallback(
      (newPeriod: "AM" | "PM") => {
        setPeriod(newPeriod);
        const currentTime = getEffectiveTime();
        if (currentTime) {
          const newHours = to24Hour(
            to12Hour(currentTime.hours).hours,
            newPeriod
          );
          handleTimeSelect({
            ...currentTime,
            hours: newHours,
          });
        }
      },
      [getEffectiveTime, handleTimeSelect]
    );

    // Handle spinner increment/decrement
    const handleSpinner = useCallback(
      (type: "hour" | "minute" | "second", direction: "up" | "down") => {
        const currentTime = getEffectiveTime() ?? {
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
        const increment = direction === "up" ? 1 : -1;

        let newTime: TimeValue;
        if (type === "hour") {
          newTime = addTime(currentTime, increment, 0, 0);
        } else if (type === "minute") {
          newTime = addTime(currentTime, 0, increment * minuteInterval, 0);
        } else {
          newTime = addTime(currentTime, 0, 0, increment * minuteInterval);
        }

        handleTimeSelect(newTime);
      },
      [getEffectiveTime, minuteInterval, handleTimeSelect]
    );

    // Handle shortcut click
    const handleShortcutClick = (shortcut: TimeShortcutConfig) => {
      if (!useRange) {
        setLocalTime(shortcut.time);
        onChange(shortcut.time);
        if (closeOnSelect && !showFooter) setIsOpen(false);
      } else {
        const currentRange = showFooter
          ? tempRange
          : isTimeRange(value)
          ? value
          : { startTime: null, endTime: null };

        if (
          !currentRange.startTime ||
          (currentRange.startTime && currentRange.endTime)
        ) {
          const newRange = { startTime: shortcut.time, endTime: null };
          if (showFooter) setTempRange(newRange);
          else onChange(newRange);
        } else {
          const newRange = isTimeBefore(shortcut.time, currentRange.startTime)
            ? { startTime: shortcut.time, endTime: currentRange.startTime }
            : { startTime: currentRange.startTime, endTime: shortcut.time };
          if (showFooter) {
            setTempRange(newRange);
          } else {
            onChange(newRange);
            if (closeOnSelect) setIsOpen(false);
          }
        }
      }
    };

    // Handle now button
    const handleNow = () => {
      const now = getCurrentTime(showSeconds);
      setPeriod(now.hours >= 12 ? "PM" : "AM");
      if (!useRange) {
        setLocalTime(now);
        onChange(now);
      } else {
        handleShortcutClick({ text: "", time: now });
      }
    };

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (useRange) {
        // If footer is enabled, clear the temporary range (preview) and
        // wait for user to Apply. Otherwise commit an empty range.
        if (showFooter) {
          setTempRange({ startTime: null, endTime: null });
        } else {
          onChange({ startTime: null, endTime: null });
        }
      } else {
        onChange(null);
      }
      setLocalTime(null);
      setRawInput("");
    };

    // Handle apply/cancel for range mode
    const handleApply = () => {
      onChange(tempRange);
      setIsOpen(false);
    };

    const handleCancel = () => {
      setTempRange(
        isTimeRange(value) ? value : { startTime: null, endTime: null }
      );
      setIsOpen(false);
    };

    // Handle format toggle
    const handleFormatToggle = () => {
      const newFormat = format === "12h" ? "24h" : "12h";
      setFormat(newFormat);
      onFormatChange?.(newFormat);
    };

    // Get shortcuts
    const shortcuts = useMemo(() => {
      const defaultShortcuts = getDefaultShortcuts(
        configs ?? null,
        locales,
        showSeconds
      );
      const customShortcuts = configs?.shortcuts || {};
      return Object.entries({ ...defaultShortcuts, ...customShortcuts }).map(
        ([key, config]) => {
          if (typeof config === "string")
            return { key, ...defaultShortcuts[key] } as TimeShortcutConfig & {
              key: string;
            };
          return { key, ...config } as TimeShortcutConfig & { key: string };
        }
      );
    }, [configs, locales, showSeconds]);

    // Format display value
    const displayValue = useMemo(() => {
      const actualDisplayFormat =
        displayFormat || getDefaultDisplayFormat(showSeconds, format);

      if (!useRange) {
        const singleValue = isTimeRange(value) ? value?.startTime : value;
        return singleValue
          ? formatTime(singleValue, actualDisplayFormat, format)
          : "";
      }

      // When using range with footer, show the temporary range (preview)
      const rangeValue =
        useRange && showFooter
          ? tempRange
          : isTimeRange(value)
          ? value
          : { startTime: value as TimeValue | null, endTime: null };

      if (!rangeValue?.startTime) return "";

      const startStr = formatTime(
        rangeValue.startTime,
        actualDisplayFormat,
        format
      );
      const endStr = rangeValue.endTime
        ? formatTime(rangeValue.endTime, actualDisplayFormat, format)
        : "";
      return endStr ? `${startStr}${separator}${endStr}` : startStr;
    }, [
      value,
      useRange,
      displayFormat,
      showSeconds,
      format,
      separator,
      tempRange,
      showFooter,
    ]);

    // Get effective time for display
    const effectiveTime = getEffectiveTime();

    // Check if item is selected
    const isHourSelected = (hour: number) => {
      if (!effectiveTime) return false;
      const h =
        format === "12h"
          ? to12Hour(effectiveTime.hours).hours
          : effectiveTime.hours;
      return h === hour;
    };

    const isMinuteSelected = (minute: number) => {
      return effectiveTime?.minutes === minute;
    };

    const isSecondSelected = (second: number) => {
      return effectiveTime?.seconds === second;
    };

    // Check if time is disabled
    const isHourDisabled = (hour: number) => {
      let actualHour = hour;
      if (format === "12h") {
        actualHour = to24Hour(hour, period);
      }
      const testTime: TimeValue = {
        hours: actualHour,
        minutes: effectiveTime?.minutes ?? 0,
        seconds: showSeconds ? effectiveTime?.seconds ?? 0 : undefined,
      };
      return isTimeDisabled(testTime, minTime, maxTime);
    };

    // Has value check
    const hasValue = useMemo(() => {
      if (useRange) {
        if (showFooter) return tempRange?.startTime !== null;
        const rangeValue = isTimeRange(value)
          ? value
          : { startTime: null, endTime: null };
        return rangeValue?.startTime !== null;
      }
      return value !== null;
    }, [value, useRange, tempRange, showFooter]);

    return (
      <div
        ref={containerRef}
        className={cn("relative w-full", containerClassName, className)}
        {...props}
      >
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {label}
            {_required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}

        {/* Input */}
        <div className="relative">
          <input
            ref={ref}
            type="text"
            className={cn(
              // cast variant to any to avoid narrow cva-generated union mismatch
              timePickerVariants({ variant: variant as any, size }),
              error
                ? "border-rose-500 text-rose-600"
                : success
                ? "border-emerald-500 text-emerald-600"
                : "",
              "pr-20",
              inputClassName
            )}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={
              placeholder ??
              locales.placeholder ??
              (format === "12h" ? "12:00 PM" : "14:00")
            }
            value={isEditing ? rawInput : displayValue}
            onChange={(e) => setRawInput(e.target.value)}
            onFocus={() => {
              setIsEditing(true);
              setRawInput(displayValue);
            }}
            onBlur={() => {
              setIsEditing(false);
              // parse input and commit
              const actualDisplayFormat =
                displayFormat || getDefaultDisplayFormat(showSeconds, format);
              const parsed = parseTime(rawInput, actualDisplayFormat);
              if (parsed) {
                // if 12h format, update period
                if (format === "12h") {
                  setPeriod(parsed.hours >= 12 ? "PM" : "AM");
                }
                setLocalTime(parsed);
                onChange(parsed);
              } else {
                // reset input to previous display value
                setRawInput("");
              }
            }}
            onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                (e.target as HTMLInputElement).blur();
              }
            }}
            autoComplete="off"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label="Time picker"
          />

          {/* Action buttons */}
          <div className="absolute right-0 top-0 bottom-0 flex items-center gap-1 pr-2">
            {/* Clear button */}
            {showClear && hasValue && !disabled && !readOnly && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Clear time"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}

            {/* Toggle button */}
            <button
              type="button"
              onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
              className={toggleButtonVariants()}
              disabled={disabled}
              aria-label="Toggle time picker"
            >
              <ClockIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Helper text / Error message */}
        {(helperText || errorMessage) && (
          <p
            className={cn(
              "mt-1.5 text-sm",
              error
                ? "text-rose-500"
                : success
                ? "text-emerald-500"
                : "text-slate-500 dark:text-slate-400"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}

        {/* Dropdown Portal */}
        {isOpen &&
          isPositioned &&
          createPortal(
            <div
              ref={dropdownRef}
              className={cn(
                "fixed z-[9999]",
                getAnimationClass(animation, isAbove),
                "w-fit"
              )}
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                transform: isAbove ? "translateY(-100%)" : "translateY(0)",
              }}
            >
              {/* Arrow */}
              <div
                className={arrowVariants({
                  variant,
                  position: isAbove ? "above" : "below",
                })}
              />

              {/* Dropdown content */}
              <div
                className={cn(
                  timeDropdownVariants({ variant }),
                  isAbove ? "mb-2" : "mt-2",
                  dropdownClassName
                )}
              >
                {/* Live Clock */}
                {showLiveClock && (
                  <div className={liveClockVariants()}>
                    <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                      <ClockIcon className="h-4 w-4 timepicker-pulse" />
                      <span className="font-mono text-lg font-semibold tabular-nums">
                        {padZero(liveTime.getHours())}:
                        {padZero(liveTime.getMinutes())}:
                        {padZero(liveTime.getSeconds())}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex w-fit">
                  {/* Shortcuts Sidebar */}
                  {showShortcuts && (
                    <div className={shortcutsSidebarVariants({ variant })}>
                      <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">
                        Quick Select
                      </div>
                      <div className="flex flex-col">
                        {shortcuts.map((shortcut) => (
                          <button
                            key={shortcut.key}
                            type="button"
                            onClick={() => handleShortcutClick(shortcut)}
                            className={shortcutButtonVariants({ variant })}
                          >
                            {shortcut.icon && (
                              <span className="text-slate-400 dark:text-slate-500">
                                {shortcut.icon}
                              </span>
                            )}
                            <span>{shortcut.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Main Time Picker */}
                  <div className={timePickerContainerVariants()}>
                    {/* Header with labels and format toggle */}
                    <div className="flex items-center justify-evenly mb-3">
                      <div className="flex gap-7 items-center">
                        <div className="w-[56px] text-center">
                          <span className={columnLabelVariants()}>
                            {locales.hour}
                          </span>
                        </div>
                        <div className="w-3" />
                        <div className="w-[56px] text-center">
                          <span className={columnLabelVariants()}>
                            {locales.minute}
                          </span>
                        </div>
                        {showSeconds && (
                          <>
                            <div className="w-3" />
                            <div className="w-[56px] text-center">
                              <span className={columnLabelVariants()}>
                                {locales.second}
                              </span>
                            </div>
                          </>
                        )}
                        {format === "12h" && (
                          <div className="w-[56px] text-center">
                            <span className={columnLabelVariants()}>AM/PM</span>
                          </div>
                        )}
                      </div>

                      {showFormatToggle && (
                        <button
                          type="button"
                          onClick={handleFormatToggle}
                          className={cn(
                            formatToggleVariants(),
                            "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                          )}
                        >
                          {format}
                        </button>
                      )}
                    </div>

                    {/* Spinners (optional) */}
                    {showSpinners && (
                      <div className="flex gap-1 items-center justify-center mb-2">
                        <button
                          type="button"
                          onClick={() => handleSpinner("hour", "up")}
                          className={spinnerButtonVariants()}
                        >
                          <ChevronUpIcon className="h-4 w-4" />
                        </button>
                        <div className="w-3" />
                        <button
                          type="button"
                          onClick={() => handleSpinner("minute", "up")}
                          className={spinnerButtonVariants()}
                        >
                          <ChevronUpIcon className="h-4 w-4" />
                        </button>
                        {showSeconds && (
                          <>
                            <div className="w-3" />
                            <button
                              type="button"
                              onClick={() => handleSpinner("second", "up")}
                              className={spinnerButtonVariants()}
                            >
                              <ChevronUpIcon className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    {/* Time Columns */}
                    <div className={timeColumnsContainerVariants()}>
                      {/* Hours Column */}
                      <div
                        ref={hoursRef}
                        className={cn(
                          timeColumnVariants({ variant }),
                          "timepicker-scrollbar"
                        )}
                      >
                        <div
                          className={cn(
                            timeItemVariants({ variant, state: "selected" }),
                            "pointer-events-none mx-2 h-12 rounded-md opacity-20 absolute left-0 right-0 top-1/2 -translate-y-1/2"
                          )}
                        />
                        {hours.map((hour) => (
                          <button
                            key={hour}
                            type="button"
                            onClick={() => handleHourSelect(hour)}
                            data-selected={isHourSelected(hour)}
                            className={cn(
                              timeItemVariants({
                                variant,
                                state: isHourDisabled(hour)
                                  ? "disabled"
                                  : "default",
                              }),
                              isHourSelected(hour) &&
                                timeItemVariants({ variant, state: "selected" })
                            )}
                            disabled={isHourDisabled(hour)}
                          >
                            {renderTimeItem
                              ? renderTimeItem(
                                  hour,
                                  "hour",
                                  isHourSelected(hour)
                                )
                              : padZero(hour)}
                          </button>
                        ))}
                      </div>

                      <div className={columnSeparatorVariants()}>:</div>

                      {/* Minutes Column */}
                      <div
                        ref={minutesRef}
                        className={cn(
                          timeColumnVariants({ variant }),
                          "timepicker-scrollbar"
                        )}
                      >
                        <div
                          className={cn(
                            timeItemVariants({ variant, state: "selected" }),
                            "pointer-events-none mx-2 h-12 rounded-md opacity-20 absolute left-0 right-0 top-1/2 -translate-y-1/2"
                          )}
                        />
                        {minutes.map((minute) => (
                          <button
                            key={minute}
                            type="button"
                            onClick={() => handleMinuteSelect(minute)}
                            data-selected={isMinuteSelected(minute)}
                            className={cn(
                              timeItemVariants({ variant, state: "default" }),
                              isMinuteSelected(minute) &&
                                timeItemVariants({ variant, state: "selected" })
                            )}
                          >
                            {renderTimeItem
                              ? renderTimeItem(
                                  minute,
                                  "minute",
                                  isMinuteSelected(minute)
                                )
                              : padZero(minute)}
                          </button>
                        ))}
                      </div>

                      {/* Seconds Column */}
                      {showSeconds && (
                        <>
                          <div className={columnSeparatorVariants()}>:</div>
                          <div
                            ref={secondsRef}
                            className={cn(
                              timeColumnVariants({ variant }),
                              "timepicker-scrollbar"
                            )}
                          >
                            <div
                              className={cn(
                                timeItemVariants({
                                  variant,
                                  state: "selected",
                                }),
                                "pointer-events-none mx-2 h-12 rounded-md opacity-20 absolute left-0 right-0 top-1/2 -translate-y-1/2"
                              )}
                            />
                            {seconds.map((second) => (
                              <button
                                key={second}
                                type="button"
                                onClick={() => handleSecondSelect(second)}
                                data-selected={isSecondSelected(second)}
                                className={cn(
                                  timeItemVariants({
                                    variant,
                                    state: "default",
                                  }),
                                  isSecondSelected(second) &&
                                    timeItemVariants({
                                      variant,
                                      state: "selected",
                                    })
                                )}
                              >
                                {renderTimeItem
                                  ? renderTimeItem(
                                      second,
                                      "second",
                                      isSecondSelected(second)
                                    )
                                  : padZero(second)}
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      {/* AM/PM Selector */}
                      {format === "12h" && (
                        <div className={amPmSelectorVariants({ variant })}>
                          <button
                            type="button"
                            onClick={() => handlePeriodChange("AM")}
                            className={cn(
                              amPmButtonVariants({ variant, state: "default" }),
                              period === "AM" &&
                                amPmButtonVariants({
                                  variant,
                                  state: "selected",
                                })
                            )}
                          >
                            {locales.am}
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePeriodChange("PM")}
                            className={cn(
                              amPmButtonVariants({ variant, state: "default" }),
                              period === "PM" &&
                                amPmButtonVariants({
                                  variant,
                                  state: "selected",
                                })
                            )}
                          >
                            {locales.pm}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Spinners bottom (optional) */}
                    {showSpinners && (
                      <div className="flex gap-1 items-center justify-center mt-2">
                        <button
                          type="button"
                          onClick={() => handleSpinner("hour", "down")}
                          className={spinnerButtonVariants()}
                        >
                          <ChevronDownIcon className="h-4 w-4" />
                        </button>
                        <div className="w-3" />
                        <button
                          type="button"
                          onClick={() => handleSpinner("minute", "down")}
                          className={spinnerButtonVariants()}
                        >
                          <ChevronDownIcon className="h-4 w-4" />
                        </button>
                        {showSeconds && (
                          <>
                            <div className="w-3" />
                            <button
                              type="button"
                              onClick={() => handleSpinner("second", "down")}
                              className={spinnerButtonVariants()}
                            >
                              <ChevronDownIcon className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                {(showFooter || showNow) && (
                  <div className={footerVariants({ variant })}>
                    <div className="flex items-center gap-2">
                      {showNow && (
                        <button
                          type="button"
                          onClick={handleNow}
                          className={cn(
                            "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                            "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                          )}
                        >
                          <span className="flex items-center gap-1.5">
                            <BoltIcon className="h-4 w-4" />
                            {locales.now}
                          </span>
                        </button>
                      )}
                    </div>

                    {showFooter && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className={footerCancelButtonVariants({ variant })}
                        >
                          {configs?.footer?.cancel || locales.cancel}
                        </button>
                        <button
                          type="button"
                          onClick={handleApply}
                          className={footerApplyButtonVariants({ variant })}
                        >
                          {configs?.footer?.apply || locales.apply}
                        </button>
                      </div>
                    )}
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

TimePicker.displayName = "TimePicker";

export default TimePicker;
