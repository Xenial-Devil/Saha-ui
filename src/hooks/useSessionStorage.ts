import { useState, useCallback } from "react";
import { useEventListener } from "./useEventListener";

/**
 * useSessionStorage - Persist state in sessionStorage with SSR support
 * @param key - Storage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns [value, setValue, removeValue]
 */

export interface UseSessionStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options: UseSessionStorageOptions<T> = {}
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const { serializer = JSON.stringify, deserializer = JSON.parse } = options;

  // Get from session storage then parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "sessionStorage is not defined" when running in SSR
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key, deserializer]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that persists the new value to sessionStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      // Prevent build error "sessionStorage is not defined" when running in SSR
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting sessionStorage key "${key}" even though environment is not a client`
        );
      }

      try {
        // Allow value to be a function so we have the same API as useState
        const newValue = value instanceof Function ? value(storedValue) : value;

        // Save to session storage
        window.sessionStorage.setItem(key, serializer(newValue));

        // Save state
        setStoredValue(newValue);

        // Dispatch a custom event so every useSessionStorage hook are notified
        window.dispatchEvent(new Event("session-storage"));
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, storedValue, serializer]
  );

  const removeValue = useCallback(() => {
    if (typeof window === "undefined") {
      console.warn(
        `Tried removing sessionStorage key "${key}" even though environment is not a client`
      );
    }

    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
      window.dispatchEvent(new Event("session-storage"));
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Handle storage changes from other tabs/windows
  useEventListener("storage", (event: StorageEvent) => {
    if (event.key === key && event.newValue !== null) {
      try {
        setStoredValue(deserializer(event.newValue));
      } catch (error) {
        console.warn(`Error parsing sessionStorage key "${key}":`, error);
      }
    }
  });

  // Handle storage changes within the same tab
  useEventListener("session-storage" as any, () => {
    setStoredValue(readValue());
  });

  return [storedValue, setValue, removeValue];
}
