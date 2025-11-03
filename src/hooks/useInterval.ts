import { useEffect, useRef } from "react";

/**
 * Custom hook for setting up an interval
 * @param callback - Function to call on each interval
 * @param delay - Delay in milliseconds (null to pause)
 *
 * @example
 * useInterval(() => {
 *   setCount(count + 1);
 * }, 1000);
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
}

/**
 * Custom hook for setting up a timeout
 * @param callback - Function to call after delay
 * @param delay - Delay in milliseconds (null to cancel)
 *
 * @example
 * useTimeout(() => {
 *   console.log('Delayed action');
 * }, 3000);
 */
export function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setTimeout(() => {
      savedCallback.current();
    }, delay);

    return () => clearTimeout(id);
  }, [delay]);
}
