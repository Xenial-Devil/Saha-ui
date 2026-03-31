import type { TimeValue, TimeFormat } from "./TimePicker.types";

/**
 * Format time according to format string
 */
export const formatTime = (
  time: TimeValue | null | undefined,
  format: string,
  timeFormat: TimeFormat = "24h"
): string => {
  if (!time) return "";

  let hours = time.hours;
  const minutes = time.minutes;
  const seconds = time.seconds ?? 0;
  let period = "";

  if (timeFormat === "12h") {
    period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
  }

  const tokens: Record<string, string> = {
    HH: String(time.hours).padStart(2, "0"),
    H: String(time.hours),
    hh: String(hours).padStart(2, "0"),
    h: String(hours),
    mm: String(minutes).padStart(2, "0"),
    m: String(minutes),
    ss: String(seconds).padStart(2, "0"),
    s: String(seconds),
    A: period,
    a: period.toLowerCase(),
  };

  let result = format;
  const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);

  for (const token of sortedTokens) {
    result = result.replace(new RegExp(token, "g"), tokens[token]);
  }

  return result;
};

/**
 * Parse time string
 */
export const parseTime = (
  timeStr: string,
  _format: string
): TimeValue | null => {
  if (!timeStr) return null;

  try {
    const timeRegex =
      /(\d{1,2})[:\s]?(\d{1,2})?[:\s]?(\d{1,2})?\s?(AM|PM|am|pm)?/i;
    const match = timeStr.match(timeRegex);

    if (match) {
      let hours = parseInt(match[1], 10) || 0;
      const minutes = parseInt(match[2], 10) || 0;
      const seconds = parseInt(match[3], 10) || 0;

      const period = match[4];
      if (period) {
        const isPM = period.toLowerCase() === "pm";
        if (isPM && hours !== 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;
      }

      return { hours, minutes, seconds };
    }

    return null;
  } catch {
    return null;
  }
};

/**
 * Check if two time values are equal
 */
export const isSameTime = (
  time1: TimeValue | null | undefined,
  time2: TimeValue | null | undefined
): boolean => {
  if (!time1 || !time2) return false;
  return (
    time1.hours === time2.hours &&
    time1.minutes === time2.minutes &&
    (time1.seconds ?? 0) === (time2.seconds ?? 0)
  );
};

/**
 * Check if time1 is before time2
 */
export const isTimeBefore = (time1: TimeValue, time2: TimeValue): boolean => {
  const t1 = time1.hours * 3600 + time1.minutes * 60 + (time1.seconds ?? 0);
  const t2 = time2.hours * 3600 + time2.minutes * 60 + (time2.seconds ?? 0);
  return t1 < t2;
};

/**
 * Check if time1 is after time2
 */
export const isTimeAfter = (time1: TimeValue, time2: TimeValue): boolean => {
  const t1 = time1.hours * 3600 + time1.minutes * 60 + (time1.seconds ?? 0);
  const t2 = time2.hours * 3600 + time2.minutes * 60 + (time2.seconds ?? 0);
  return t1 > t2;
};

/**
 * Check if time is between start and end
 */
export const isTimeBetween = (
  time: TimeValue,
  start: TimeValue,
  end: TimeValue
): boolean => {
  const t = time.hours * 3600 + time.minutes * 60 + (time.seconds ?? 0);
  const s = start.hours * 3600 + start.minutes * 60 + (start.seconds ?? 0);
  const e = end.hours * 3600 + end.minutes * 60 + (end.seconds ?? 0);
  return t >= s && t <= e;
};

/**
 * Check if time is disabled
 */
export const isTimeDisabled = (
  time: TimeValue,
  minTime?: TimeValue,
  maxTime?: TimeValue
): boolean => {
  if (minTime && isTimeBefore(time, minTime)) return true;
  if (maxTime && isTimeAfter(time, maxTime)) return true;
  return false;
};

/**
 * Clamp time between min and max
 */
export const clampTime = (
  time: TimeValue,
  minTime?: TimeValue,
  maxTime?: TimeValue
): TimeValue => {
  let result = { ...time };
  if (minTime && isTimeBefore(result, minTime)) {
    result = { ...minTime };
  }
  if (maxTime && isTimeAfter(result, maxTime)) {
    result = { ...maxTime };
  }
  return result;
};

/**
 * Generate hours array
 */
export const generateHours = (format: TimeFormat = "24h"): number[] => {
  if (format === "12h") {
    // return 1..12 so display shows 01-12 in order for 12h format
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }
  return Array.from({ length: 24 }, (_, i) => i);
};

/**
 * Generate minutes array with interval
 */
export const generateMinutes = (interval: number = 1): number[] => {
  const minutes: number[] = [];
  for (let i = 0; i < 60; i += interval) {
    minutes.push(i);
  }
  return minutes;
};

/**
 * Generate seconds array with interval
 */
export const generateSeconds = (interval: number = 1): number[] => {
  return generateMinutes(interval);
};

/**
 * Convert 24h to 12h format
 */
export const to12Hour = (
  hours: number
): { hours: number; period: "AM" | "PM" } => {
  const period = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return { hours: h, period };
};

/**
 * Convert 12h to 24h format
 */
export const to24Hour = (hours: number, period: "AM" | "PM"): number => {
  if (period === "PM" && hours !== 12) return hours + 12;
  if (period === "AM" && hours === 12) return 0;
  return hours;
};

/**
 * Get current time
 */
export const getCurrentTime = (showSeconds: boolean = false): TimeValue => {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: showSeconds ? now.getSeconds() : undefined,
  };
};

/**
 * Pad number with leading zero
 */
export const padZero = (num: number, length: number = 2): string => {
  return String(num).padStart(length, "0");
};

/**
 * Get default display format
 */
export const getDefaultDisplayFormat = (
  showSeconds: boolean = false,
  format: TimeFormat = "24h"
): string => {
  if (format === "12h") {
    return showSeconds ? "hh:mm:ss A" : "hh:mm A";
  }
  return showSeconds ? "HH:mm:ss" : "HH:mm";
};

/**
 * Add time
 */
export const addTime = (
  time: TimeValue,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0
): TimeValue => {
  let totalSeconds =
    time.hours * 3600 +
    time.minutes * 60 +
    (time.seconds ?? 0) +
    hours * 3600 +
    minutes * 60 +
    seconds;

  // Wrap around 24 hours
  totalSeconds = ((totalSeconds % 86400) + 86400) % 86400;

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: time.seconds !== undefined ? totalSeconds % 60 : undefined,
  };
};

/**
 * Get time difference in seconds
 */
export const getTimeDifference = (
  time1: TimeValue,
  time2: TimeValue
): number => {
  const t1 = time1.hours * 3600 + time1.minutes * 60 + (time1.seconds ?? 0);
  const t2 = time2.hours * 3600 + time2.minutes * 60 + (time2.seconds ?? 0);
  return Math.abs(t1 - t2);
};

/**
 * Format time difference as string
 */
export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);

  return parts.join(" ");
};
