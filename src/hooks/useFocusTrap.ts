import { useEffect, RefObject } from "react";

/**
 * useFocusTrap - Trap focus within an element
 * @param containerRef - Ref to the container element
 * @param options - Configuration options
 * @param options.enabled - Whether the focus trap is active
 * @param options.returnFocus - Ref to element that should receive focus on unmount
 * @param options.initialFocus - CSS selector for element to focus initially (default: first focusable)
 */

const FOCUSABLE_ELEMENTS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface UseFocusTrapOptions {
  enabled?: boolean;
  returnFocus?: RefObject<HTMLElement | null>;
  initialFocus?: string;
}

export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  containerRef: RefObject<T | null>,
  options: UseFocusTrapOptions = {}
): void {
  const { enabled = true, returnFocus, initialFocus } = options;

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const element = containerRef.current;
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

    // Focus initial element after short delay (animation)
    const focusTimer = setTimeout(() => {
      if (initialFocus) {
        const target = element.querySelector(initialFocus) as HTMLElement;
        target?.focus();
      } else {
        firstElement?.focus();
      }
    }, 100);

    return () => {
      element.removeEventListener("keydown", handleKeyDown);
      clearTimeout(focusTimer);

      // Return focus to trigger if specified
      if (returnFocus?.current) {
        returnFocus.current.focus();
      }
    };
  }, [enabled, containerRef, returnFocus, initialFocus]);
}
