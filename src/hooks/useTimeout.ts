import { useEffect, useRef } from "react";

/**
 * useTimeout - Declarative setTimeout hook
 * @param callback - Function to call after delay
 * @param delay - Delay in milliseconds (null to cancel)
 */

export function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  useEffect(() => {
    // Don't schedule if no delay is specified
    if (delay === null) {
      return;
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}
