import { useRef, useEffect } from "react";

/**
 * Custom hook to store the previous value of a variable
 * @param value - Current value to track
 * @returns Previous value
 *
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * // prevCount will be the previous value of count
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
