import { useCallback, useRef } from "react";

/**
 * useThrottle - Throttles a function to be called at most once per specified interval
 * @param callback - Function to throttle
 * @param delay - Minimum time between function calls in milliseconds
 * @returns Throttled function
 */

export interface UseThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  options: UseThrottleOptions = {}
): (...args: Parameters<T>) => void {
  const { leading = true, trailing = true } = options;
  const lastRan = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (lastRan.current === 0 && !leading) {
        lastRan.current = now;
      }

      const shouldCall = now - lastRan.current >= delay;

      if (shouldCall) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = undefined;
        }
        callback(...args);
        lastRan.current = now;
      } else if (trailing && !timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRan.current = Date.now();
          timeoutRef.current = undefined;
        }, delay - (now - lastRan.current));
      }
    },
    [callback, delay, leading, trailing]
  );
}
