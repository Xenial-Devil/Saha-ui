import { useEffect, useRef, RefObject } from "react";

/**
 * useFocusTrap - Trap focus within an element
 * @param active - Whether the focus trap is active
 * @returns Ref to attach to the container element
 */

const FOCUSABLE_ELEMENTS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  active = true
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(FOCUSABLE_ELEMENTS);
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener("keydown", handleKeyDown);

    // Focus first element on mount
    firstElement?.focus();

    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);

  return ref;
}
