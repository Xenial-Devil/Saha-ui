import { useEffect, useRef } from "react";

/**
 * Custom hook for adding event listeners to DOM elements or window
 * @param eventName - Name of the event to listen for
 * @param handler - Event handler function
 * @param element - Target element (defaults to window)
 * @param options - Event listener options
 *
 * @example
 * useEventListener('keydown', handleKeyDown);
 * useEventListener('resize', handleResize, window);
 * useEventListener('click', handleClick, buttonRef);
 */
export function useEventListener<
  K extends keyof WindowEventMap,
  T extends HTMLElement = HTMLDivElement
>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: React.RefObject<T> | Window | null,
  options?: boolean | AddEventListenerOptions
): void {
  // Store handler in a ref to avoid recreating effect on handler change
  const savedHandler = useRef(handler);

  // Update ref when handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Get target element (window by default)
    const targetElement =
      element && "current" in element ? element.current : element || window;

    if (!targetElement || !targetElement.addEventListener) {
      return;
    }

    // Create event listener that calls the latest handler
    const eventListener = (event: Event) => {
      savedHandler.current(event as WindowEventMap[K]);
    };

    targetElement.addEventListener(eventName, eventListener, options);

    // Cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}

/**
 * Hook for listening to keyboard events
 */
export function useKeyPress(
  targetKey: string,
  handler: (event: KeyboardEvent) => void,
  options?: { ctrl?: boolean; alt?: boolean; shift?: boolean; meta?: boolean }
): void {
  useEventListener("keydown", (event) => {
    const {
      ctrl = false,
      alt = false,
      shift = false,
      meta = false,
    } = options || {};

    const isMatch =
      event.key === targetKey &&
      event.ctrlKey === ctrl &&
      event.altKey === alt &&
      event.shiftKey === shift &&
      event.metaKey === meta;

    if (isMatch) {
      handler(event);
    }
  });
}
