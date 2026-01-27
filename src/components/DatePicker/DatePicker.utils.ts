import type { DatePickerLocale } from "./DatePicker.types";

/**
 * Format date according to format string
 * Supports: YYYY, MM, DD, M, D, etc.
 */
export const formatDate = (
  date: Date | null | undefined,
  format: string,
  locale?: DatePickerLocale
): string => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  const tokens: Record<string, string> = {
    YYYY: String(year),
    YY: String(year).slice(-2),
    MMMM: locale?.months[month] || "",
    MMM: locale?.monthsShort[month] || "",
    MM: String(month + 1).padStart(2, "0"),
    M: String(month + 1),
    DD: String(day).padStart(2, "0"),
    D: String(day),
    dddd: locale?.weekdays[dayOfWeek] || "",
    ddd: locale?.weekdaysShort[dayOfWeek] || "",
    dd: locale?.weekdaysMin[dayOfWeek] || "",
    d: String(dayOfWeek),
  };

  let result = format;
  // Sort by length descending to replace longer tokens first
  const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);

  for (const token of sortedTokens) {
    result = result.replace(new RegExp(token, "g"), tokens[token]);
  }

  return result;
};

/**
 * Parse date string according to format
 */
export const parseDate = (dateStr: string, format: string): Date | null => {
  if (!dateStr) return null;

  try {
    // Extract positions of year, month, day from format
    const yearMatch = format.match(/YYYY/);
    const monthMatch = format.match(/MM/);
    const dayMatch = format.match(/DD/);

    if (!yearMatch || !monthMatch || !dayMatch) {
      // Try native parsing as fallback
      const parsed = new Date(dateStr);
      return isNaN(parsed.getTime()) ? null : parsed;
    }

    const yearIndex = format.indexOf("YYYY");
    const monthIndex = format.indexOf("MM");
    const dayIndex = format.indexOf("DD");

    // Create mapping of positions
    const positions = [
      { type: "year", index: yearIndex, length: 4 },
      { type: "month", index: monthIndex, length: 2 },
      { type: "day", index: dayIndex, length: 2 },
    ].sort((a, b) => a.index - b.index);

    // Remove separators and extract values
    const cleanStr = dateStr.replace(/[^0-9]/g, "");

    let year = 0,
      month = 0,
      day = 0;
    let currentPos = 0;

    for (const pos of positions) {
      const value = parseInt(
        cleanStr.slice(currentPos, currentPos + pos.length),
        10
      );
      if (pos.type === "year") year = value;
      if (pos.type === "month") month = value - 1;
      if (pos.type === "day") day = value;
      currentPos += pos.length;
    }

    const date = new Date(year, month, day);

    // Validate the date
    if (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    ) {
      return date;
    }

    return null;
  } catch {
    return null;
  }
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (
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

/**
 * Check if two dates are in the same month
 */
export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

/**
 * Get days in a month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Get first day of month (0-6, Sunday-Saturday)
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

/**
 * Check if date1 is before date2
 */
export const isDateBefore = (date1: Date, date2: Date): boolean => {
  return date1.getTime() < date2.getTime();
};

/**
 * Check if date1 is after date2
 */
export const isDateAfter = (date1: Date, date2: Date): boolean => {
  return date1.getTime() > date2.getTime();
};

/**
 * Check if date is between start and end (inclusive)
 */
export const isDateBetween = (date: Date, start: Date, end: Date): boolean => {
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
};

/**
 * Add days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add months to a date
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Add years to a date
 */
export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/**
 * Get start of month
 */
export const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get end of month
 */
export const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Get start of week
 */
export const startOfWeek = (date: Date, firstDayOfWeek: number = 0): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day - firstDayOfWeek + 7) % 7;
  result.setDate(result.getDate() - diff);
  return result;
};

/**
 * Get end of week
 */
export const endOfWeek = (date: Date, firstDayOfWeek: number = 0): Date => {
  const result = startOfWeek(date, firstDayOfWeek);
  result.setDate(result.getDate() + 6);
  return result;
};

/**
 * Clamp date between min and max
 */
export const clampDate = (date: Date, minDate?: Date, maxDate?: Date): Date => {
  let result = new Date(date);
  if (minDate && isDateBefore(result, minDate)) {
    result = new Date(minDate);
  }
  if (maxDate && isDateAfter(result, maxDate)) {
    result = new Date(maxDate);
  }
  return result;
};

/**
 * Generate calendar days for a month
 */
export const generateCalendarDays = (
  year: number,
  month: number,
  firstDayOfWeek: number = 0
): (Date | null)[] => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = (getFirstDayOfMonth(year, month) - firstDayOfWeek + 7) % 7;
  const days: (Date | null)[] = [];

  // Previous month padding
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  // Pad to 42 cells (6 rows)
  while (days.length < 42) {
    days.push(null);
  }

  return days;
};

/**
 * Get week number of the year
 */
export const getWeekNumber = (date: Date): number => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};
