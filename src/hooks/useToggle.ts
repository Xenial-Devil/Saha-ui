import { useState, useCallback } from "react";

/**
 * Custom hook for managing boolean state with toggle functionality
 * @param initialValue - Initial boolean value (default: false)
 * @returns [value, toggle, setTrue, setFalse, setValue]
 *
 * @example
 * const [isOpen, toggle, open, close] = useToggle();
 */
export function useToggle(
  initialValue = false
): [boolean, () => void, () => void, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse, setValue];
}
