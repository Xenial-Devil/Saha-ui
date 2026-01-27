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
  DatePickerProps,
  DateRange,
  ShortcutConfig,
  DatePickerView,
  DatePickerConfigs,
} from "./DatePicker.types";
import {
  calendarVariants,
  datePickerVariants,
  calendarContainerVariants,
  calendarHeaderVariants,
  calendarHeaderButtonVariants,
  calendarNavButtonVariants,
  weekDayLabelVariants,
  dayCellVariants,
  dayCellColorVariants,
  monthYearCellVariants,
  monthYearCellColorVariants,
  gridContentHeightClass,
  shortcutsSidebarVariants,
  shortcutButtonVariants,
  footerVariants,
  footerCancelButtonVariants,
  footerApplyButtonVariants,
  arrowVariants,
  toggleButtonVariants,
} from "./DatePicker.styles";
import { getLocale } from "./DatePicker.locales";

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

const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number): number =>
  new Date(year, month, 1).getDay();
const isDateBefore = (date1: Date, date2: Date): boolean =>
  date1.getTime() < date2.getTime();
const isDateAfter = (date1: Date, date2: Date): boolean =>
  date1.getTime() > date2.getTime();
const isDateBetween = (date: Date, start: Date, end: Date): boolean =>
  date.getTime() >= start.getTime() && date.getTime() <= end.getTime();

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const startOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

const getDefaultShortcuts = (config: DatePickerConfigs| null ,locales: ReturnType<typeof getLocale>): Record<string, ShortcutConfig> => {
  const today = new Date();
  const yesterday = addDays(today, -1);
  return {
    today: { text: config?.shortcuts?.today as string ?? locales.shortcuts.today, period: { start: today, end: today } },
    yesterday: {
      text: config?.shortcuts?.yesterday as string ?? locales.shortcuts.yesterday,
      period: { start: yesterday, end: yesterday },
    },
    last7Days: {
      text: config?.shortcuts?.last7Days as string ?? locales.shortcuts.last7Days,
      period: { start: addDays(today, -6), end: today },
    },
    last30Days: {
      text: config?.shortcuts?.last30Days as string ?? locales.shortcuts.last30Days,
      period: { start: addDays(today, -29), end: today },
    },
    thisMonth: {
      text: config?.shortcuts?.thisMonth as string ?? locales.shortcuts.thisMonth,
      period: { start: startOfMonth(today), end: endOfMonth(today) },
    },
    lastMonth: {
      text: config?.shortcuts?.lastMonth as string ?? locales.shortcuts.lastMonth,
      period: {
        start: startOfMonth(addDays(startOfMonth(today), -1)),
        end: endOfMonth(addDays(startOfMonth(today), -1)),
      },
    },
  };
};

const YEARS_PER_PAGE = 12;

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
      required: _required = false,
      placeholder,
      displayFormat = "MM/DD/YYYY",
      separator = " ~ ",
      startWeekOn = 0,
      showShortcuts = false,
      showFooter = false,
      showClear: _showClear = false,
      showToday: _showToday = false,
      configs,
      disabledDates = [],
      startFrom,
      popoverDirection = "down",
      i18n: _i18n = "en",
      inputClassName,
      containerClassName,
      inputId: _inputId,
      inputName: _inputName,
      className,
      ...props
    },
    ref
  ) => {
    const locales = getLocale(_i18n);
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

    const [firstCalendarView, setFirstCalendarView] =
      useState<DatePickerView>("days");
    const [secondCalendarView, setSecondCalendarView] =
      useState<DatePickerView>("days");

    const [firstMonth, setFirstMonth] = useState(
      () => value.startDate || startFrom || new Date()
    );
    const [secondMonth, setSecondMonth] = useState(() => {
      const first = value.startDate || startFrom || new Date();
      const result = new Date(first);
      result.setMonth(result.getMonth() + 1);
      return result;
    });

    const [firstYearRangeStart, setFirstYearRangeStart] = useState(() => {
      const year = (value.startDate || startFrom || new Date()).getFullYear();
      return Math.floor(year / YEARS_PER_PAGE) * YEARS_PER_PAGE;
    });

    const [secondYearRangeStart, setSecondYearRangeStart] = useState(() => {
      const first = value.startDate || startFrom || new Date();
      const result = new Date(first);
      result.setMonth(result.getMonth() + 1);
      return Math.floor(result.getFullYear() / YEARS_PER_PAGE) * YEARS_PER_PAGE;
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!isOpen) {
        setFirstCalendarView("days");
        setSecondCalendarView("days");
      }
    }, [isOpen]);

    useEffect(() => {
      if (isOpen && containerRef.current) {
        const updatePosition = () => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const spaceBelow = windowHeight - rect.bottom;
          const spaceAbove = rect.top;
          const shouldOpenAbove =
            popoverDirection === "up" ||
            (popoverDirection !== "down" &&
              spaceBelow < 350 &&
              spaceAbove > spaceBelow);
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

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(target)
        ) {
          if (showFooter && useRange) setTempRange(value);
          setIsOpen(false);
        }
      };
      if (isOpen) document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, showFooter, useRange, value]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          setIsOpen(false);
          if (showFooter && useRange) setTempRange(value);
        }
      };
      if (isOpen) document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
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

    const isMonthDisabled = useCallback(
      (year: number, month: number): boolean => {
        if (minDate) {
          if (
            year < minDate.getFullYear() ||
            (year === minDate.getFullYear() && month < minDate.getMonth())
          )
            return true;
        }
        if (maxDate) {
          if (
            year > maxDate.getFullYear() ||
            (year === maxDate.getFullYear() && month > maxDate.getMonth())
          )
            return true;
        }
        return false;
      },
      [minDate, maxDate]
    );

    const isYearDisabled = useCallback(
      (year: number): boolean => {
        if (minDate && year < minDate.getFullYear()) return true;
        if (maxDate && year > maxDate.getFullYear()) return true;
        return false;
      },
      [minDate, maxDate]
    );

    const handleDateSelect = useCallback(
      (date: Date) => {
        if (isDateDisabled(date) || readOnly) return;
        if (!useRange || asSingle) {
          onChange({ startDate: date, endDate: date });
          if (!showFooter) setIsOpen(false);
        } else {
          const currentRange = showFooter ? tempRange : value;
          if (
            !currentRange.startDate ||
            (currentRange.startDate && currentRange.endDate)
          ) {
            const newRange = { startDate: date, endDate: null };
            if (showFooter) setTempRange(newRange);
            else onChange(newRange);
          } else {
            const newRange = isDateBefore(date, currentRange.startDate)
              ? { startDate: date, endDate: currentRange.startDate }
              : { startDate: currentRange.startDate, endDate: date };
            if (showFooter) setTempRange(newRange);
            else {
              onChange(newRange);
              setIsOpen(false);
            }
          }
        }
      },
      [
        isDateDisabled,
        readOnly,
        useRange,
        asSingle,
        onChange,
        showFooter,
        tempRange,
        value,
      ]
    );

    const handleMonthSelect = useCallback(
      (
        monthIndex: number,
        calendarMonth: Date,
        setMonth: (d: Date) => void,
        setView: (v: DatePickerView) => void
      ) => {
        if (isMonthDisabled(calendarMonth.getFullYear(), monthIndex)) return;
        setMonth(new Date(calendarMonth.getFullYear(), monthIndex, 1));
        setView("days");
      },
      [isMonthDisabled]
    );

    const handleYearSelect = useCallback(
      (
        year: number,
        calendarMonth: Date,
        setMonth: (d: Date) => void,
        setView: (v: DatePickerView) => void
      ) => {
        if (isYearDisabled(year)) return;
        setMonth(new Date(year, calendarMonth.getMonth(), 1));
        setView("months");
      },
      [isYearDisabled]
    );

    const handleShortcutClick = (shortcut: ShortcutConfig) => {
      const newRange = {
        startDate: shortcut.period.start,
        endDate: shortcut.period.end,
      };
      if (showFooter && useRange) setTempRange(newRange);
      else {
        onChange(newRange);
        setIsOpen(false);
      }
    };

    const handleApply = () => {
      onChange(tempRange);
      setIsOpen(false);
    };

    const handleCancel = () => {
      setTempRange(value);
      setIsOpen(false);
    };

    const weekDays = useMemo(
      () => locales.weekdaysMin,
      [locales]
    );
    const months = useMemo(
      () => locales.months,
      [locales]
    );
    const monthsShort = useMemo(
      () => locales.monthsShort,
      [locales]
    );
    const rotatedWeekDays = useMemo(
      () => [...weekDays.slice(startWeekOn), ...weekDays.slice(0, startWeekOn)],
      [startWeekOn, weekDays]
    );

    const generateCalendarDays = useCallback(
      (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay =
          (getFirstDayOfMonth(year, month) - startWeekOn + 7) % 7;
        const days: (Date | null)[] = [];
        for (let i = 0; i < firstDay; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++)
          days.push(new Date(year, month, i));
        while (days.length < 42) days.push(null);
        return days;
      },
      [startWeekOn]
    );

    const getDayCellState = useCallback(
      (
        day: Date
      ):
        | "default"
        | "selected"
        | "rangeStart"
        | "rangeEnd"
        | "inRange"
        | "today" => {
        const currentRange = showFooter && useRange ? tempRange : value;
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
        const isToday = isSameDay(day, new Date());

        if (isStart && isEnd) return "selected";
        if (isStart) return "rangeStart";
        if (isEnd) return "rangeEnd";
        if (isInRange || isHoverInRange) return "inRange";
        if (isToday) return "today";
        return "default";
      },
      [showFooter, useRange, tempRange, value, hoveredDate]
    );

    const getMonthYearState = useCallback(
      (
        monthOrYear: number,
        isMonth: boolean,
        year?: number
      ): "default" | "selected" | "current" => {
        const currentRange = showFooter && useRange ? tempRange : value;
        const now = new Date();

        if (isMonth && year !== undefined) {
          const isCurrentMonth =
            now.getMonth() === monthOrYear && now.getFullYear() === year;
          const isSelected =
            currentRange.startDate &&
            currentRange.startDate.getMonth() === monthOrYear &&
            currentRange.startDate.getFullYear() === year;
          if (isSelected) return "selected";
          if (isCurrentMonth) return "current";
        } else {
          const isCurrentYear = now.getFullYear() === monthOrYear;
          const isSelected =
            currentRange.startDate &&
            currentRange.startDate.getFullYear() === monthOrYear;
          if (isSelected) return "selected";
          if (isCurrentYear) return "current";
        }
        return "default";
      },
      [showFooter, useRange, tempRange, value]
    );

    const shortcuts = useMemo(() => {
      const defaultShortcuts = getDefaultShortcuts(configs??null,locales);
      const customShortcuts = configs?.shortcuts || {};
      return Object.entries({ ...defaultShortcuts, ...customShortcuts }).map(
        ([key, config]) => {
          if (typeof config === "string")
            return { key, ...defaultShortcuts[key] } as ShortcutConfig & {
              key: string;
            };
          return { key, ...config } as ShortcutConfig & { key: string };
        }
      );
    }, [configs, locales]);

    const displayValue = useMemo(() => {
      if (!value.startDate && !value.endDate) return "";
      if (asSingle || !useRange || !value.endDate)
        return formatDate(value.startDate, displayFormat);
      return `${formatDate(
        value.startDate,
        displayFormat
      )}${locales.separator||separator}${formatDate(value.endDate, displayFormat)}`;
    }, [value, asSingle, useRange, displayFormat, separator, locales]);

    // Navigation icon component
    const NavIcon = ({ direction }: { direction: "left" | "right" }) => (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline
          points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
        />
      </svg>
    );

    const renderMonthsView = useCallback(
      (
        calendarMonth: Date,
        setMonth: (d: Date) => void,
        setView: (v: DatePickerView) => void
      ) => {
        const year = calendarMonth.getFullYear();

        return (
          <div className={calendarContainerVariants()}>
            <div className={calendarHeaderVariants()}>
              <button
                type="button"
                onClick={() => {
                  const newDate = new Date(calendarMonth);
                  newDate.setFullYear(newDate.getFullYear() - 1);
                  setMonth(newDate);
                }}
                className={calendarNavButtonVariants()}
                aria-label="Previous year"
              >
                <NavIcon direction="left" />
              </button>

              <button
                type="button"
                onClick={() => setView("years")}
                className={calendarHeaderButtonVariants()}
              >
                {year}
              </button>

              <button
                type="button"
                onClick={() => {
                  const newDate = new Date(calendarMonth);
                  newDate.setFullYear(newDate.getFullYear() + 1);
                  setMonth(newDate);
                }}
                className={calendarNavButtonVariants()}
                aria-label="Next year"
              >
                <NavIcon direction="right" />
              </button>
            </div>

            <div
              className={cn("grid grid-cols-3 gap-2", gridContentHeightClass)}
            >
              {monthsShort.map((monthName, index) => (
                <button
                  key={monthName}
                  type="button"
                  onClick={() =>
                    handleMonthSelect(index, calendarMonth, setMonth, setView)
                  }
                  className={cn(
                    monthYearCellVariants({
                      state: isMonthDisabled(year, index)
                        ? "disabled"
                        : "default",
                    }),
                    monthYearCellColorVariants({
                      variant,
                      state: getMonthYearState(index, true, year),
                    })
                  )}
                  disabled={isMonthDisabled(year, index)}
                >
                  {monthName}
                </button>
              ))}
            </div>
          </div>
        );
      },
      [
        monthsShort,
        handleMonthSelect,
        isMonthDisabled,
        variant,
        getMonthYearState,
      ]
    );

    const renderYearsView = useCallback(
      (
        calendarMonth: Date,
        setMonth: (d: Date) => void,
        yearRangeStart: number,
        setYearRangeStart: (y: number) => void,
        setView: (v: DatePickerView) => void
      ) => {
        const years = Array.from(
          { length: YEARS_PER_PAGE },
          (_, i) => yearRangeStart + i
        );

        return (
          <div className={calendarContainerVariants()}>
            <div className={calendarHeaderVariants()}>
              <button
                type="button"
                onClick={() =>
                  setYearRangeStart(yearRangeStart - YEARS_PER_PAGE)
                }
                className={calendarNavButtonVariants()}
                aria-label="Previous years"
              >
                <NavIcon direction="left" />
              </button>

              <span className="text-[15px] font-semibold tracking-tight">
                {yearRangeStart} – {yearRangeStart + YEARS_PER_PAGE - 1}
              </span>

              <button
                type="button"
                onClick={() =>
                  setYearRangeStart(yearRangeStart + YEARS_PER_PAGE)
                }
                className={calendarNavButtonVariants()}
                aria-label="Next years"
              >
                <NavIcon direction="right" />
              </button>
            </div>

            <div
              className={cn("grid grid-cols-3 gap-2", gridContentHeightClass)}
            >
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() =>
                    handleYearSelect(year, calendarMonth, setMonth, setView)
                  }
                  className={cn(
                    monthYearCellVariants({
                      state: isYearDisabled(year) ? "disabled" : "default",
                    }),
                    monthYearCellColorVariants({
                      variant,
                      state: getMonthYearState(year, false),
                    })
                  )}
                  disabled={isYearDisabled(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        );
      },
      [handleYearSelect, isYearDisabled, variant, getMonthYearState]
    );

    const renderDaysView = useCallback(
      (
        month: Date,
        setMonth: (d: Date) => void,
        setView: (v: DatePickerView) => void
      ) => {
        const calendarDays = generateCalendarDays(month);

        return (
          <div className={calendarContainerVariants()}>
            <div className={calendarHeaderVariants()}>
              <button
                type="button"
                onClick={() => {
                  const newDate = new Date(month);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setMonth(newDate);
                }}
                className={calendarNavButtonVariants()}
                aria-label="Previous month"
              >
                <NavIcon direction="left" />
              </button>

              <button
                type="button"
                onClick={() => setView("months")}
                className={calendarHeaderButtonVariants()}
              >
                {months[month.getMonth()]}&nbsp;&nbsp;&nbsp;{" "}
                {month.getFullYear()}
              </button>

              <button
                type="button"
                onClick={() => {
                  const newDate = new Date(month);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setMonth(newDate);
                }}
                className={calendarNavButtonVariants()}
                aria-label="Next month"
              >
                <NavIcon direction="right" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-1">
              {rotatedWeekDays.map((day) => (
                <div key={day} className={weekDayLabelVariants()}>
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return ;
                }

                const dayState = getDayCellState(day);
                const isDisabled = isDateDisabled(day);

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDateSelect(day)}
                    onMouseEnter={() => setHoveredDate(day)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className={cn(
                      dayCellVariants({
                        state: isDisabled ? "disabled" : "default",
                      }),
                      !isDisabled &&
                        dayCellColorVariants({ variant, state: dayState })
                    )}
                    disabled={isDisabled}
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
        months,
        rotatedWeekDays,
        isDateDisabled,
        handleDateSelect,
        generateCalendarDays,
        getDayCellState,
        variant,
      ]
    );

    const renderCalendar = useCallback(
      (
        calendarMonth: Date,
        setMonth: (d: Date) => void,
        view: DatePickerView,
        setView: (v: DatePickerView) => void,
        yearRangeStart: number,
        setYearRangeStart: (y: number) => void
      ) => {
        switch (view) {
          case "months":
            return renderMonthsView(calendarMonth, setMonth, setView);
          case "years":
            return renderYearsView(
              calendarMonth,
              setMonth,
              yearRangeStart,
              setYearRangeStart,
              setView
            );
          default:
            return renderDaysView(calendarMonth, setMonth, setView);
        }
      },
      [renderMonthsView, renderYearsView, renderDaysView]
    );

    return (
      <div
        ref={containerRef}
        className={cn("relative w-full z-20", containerClassName, className)}
        {...props}
      >
        <input
          ref={ref}
          type="text"
          className={cn(datePickerVariants({ variant, size }), inputClassName)}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={
            placeholder ??
            locales.placeholder ??
            `${displayFormat}${
              useRange ? ` ${locales.separator||separator} ${displayFormat}` : ""
            }`
          }
          value={displayValue}
          onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
          onChange={() => {}}
          autoComplete="off"
          role="presentation"
          aria-label="Date picker input"
        />

        <button
          type="button"
          onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
          className={toggleButtonVariants()}
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

        {isOpen &&
          isPositioned &&
          createPortal(
            <div
              ref={dropdownRef}
              className="fixed z-[9999] transition-opacity duration-150 will-change-transform opacity-100 w-fit"
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                transform: isAbove ? "translateY(-100%)" : "translateY(0)",
              }}
            >
              <div
                className={arrowVariants({
                  variant,
                  position: isAbove ? "above" : "below",
                })}
              />

              <div
                className={cn(
                  calendarVariants({ variant }),
                  isAbove ? "mb-2" : "mt-2",
                  "w-fit will-change-transform"
                )}
              >
                <div className="flex w-fit">
                  {showShortcuts && (
                    <div className={shortcutsSidebarVariants({ variant })}>
                      <div className="flex flex-col gap-0.5">
                        {shortcuts.map((shortcut) => (
                          <button
                            key={shortcut.key}
                            type="button"
                            onClick={() => handleShortcutClick(shortcut)}
                            className={shortcutButtonVariants({ variant })}
                          >
                            {shortcut.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    className={cn(
                      "flex",
                      asSingle || !useRange ? "w-auto" : ""
                    )}
                  >
                    {renderCalendar(
                      firstMonth,
                      setFirstMonth,
                      firstCalendarView,
                      setFirstCalendarView,
                      firstYearRangeStart,
                      setFirstYearRangeStart
                    )}
                    {!asSingle &&
                      useRange &&
                      renderCalendar(
                        secondMonth,
                        setSecondMonth,
                        secondCalendarView,
                        setSecondCalendarView,
                        secondYearRangeStart,
                        setSecondYearRangeStart
                      )}
                  </div>
                </div>

                {showFooter && useRange && (
                  <div className={footerVariants({ variant })}>
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
            </div>,
            document.body
          )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
