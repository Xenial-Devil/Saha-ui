import { useState, useCallback, useEffect } from "react";

/**
 * Custom hook for managing both controlled and uncontrolled state
 * Optimizes components that can work in both controlled and uncontrolled modes
 *
 * @param defaultValue - Initial value for uncontrolled mode
 * @param value - Controlled value (if provided)
 * @param onChange - Callback for value changes
 * @returns [currentValue, setValue] tuple
 *
 * @example
 * const [value, setValue] = useControllableState(defaultValue, propValue, onChange);
 */
export function useControllableState<T>(
  defaultValue: T | undefined,
  value: T | undefined,
  onChange?: (value: T) => void
): [T, (value: T) => void] {
  const [internalValue, setInternalValue] = useState<T>(
    value !== undefined ? value : (defaultValue as T)
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange]
  );

  // Sync internal value when controlled value changes
  useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [value, isControlled]);

  return [currentValue, setValue];
}
