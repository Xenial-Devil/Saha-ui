import { useEffect, useRef, useCallback, useMemo, RefObject } from "react";

/**
 * Custom hook for handling click outside of an element
 * Useful for dropdowns, modals, popovers, etc.
 *
 * @param refOrHandler - Either a ref object or a handler function
 * @param handler - Optional handler when first param is a ref
 * @param excludeRefs - Additional refs to exclude from outside clicks
 *
 * @example
 * // Pattern 1: Hook creates and returns ref
 * const ref = useClickOutside(() => setIsOpen(false));
 *
 * // Pattern 2: Pass existing ref
 * useClickOutside(myRef, () => setIsOpen(false));
 */

// Overload signatures
/* eslint-disable no-redeclare */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  excludeRefs?: RefObject<HTMLElement>[],
): RefObject<T | null>;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  excludeRefs?: RefObject<HTMLElement>[],
): void;

// Implementation
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  refOrHandler: RefObject<T | null> | (() => void),
  handlerOrExcludeRefs?: (() => void) | RefObject<HTMLElement>[],
  excludeRefsParam?: RefObject<HTMLElement>[],
): RefObject<T | null> | void {
  // Determine which pattern is being used
  const isRefPattern =
    typeof refOrHandler === "object" && "current" in refOrHandler;

  const internalRef = useRef<T>(null);
  const ref = isRefPattern
    ? (refOrHandler as RefObject<T | null>)
    : internalRef;

  const handler = isRefPattern
    ? (handlerOrExcludeRefs as () => void)
    : (refOrHandler as () => void);

  const excludeRefs: RefObject<HTMLElement>[] = useMemo(() => {
    return isRefPattern
      ? excludeRefsParam || []
      : Array.isArray(handlerOrExcludeRefs)
        ? (handlerOrExcludeRefs as RefObject<HTMLElement>[])
        : [];
  }, [isRefPattern, excludeRefsParam, handlerOrExcludeRefs]);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is outside the main ref
      if (ref.current && !ref.current.contains(target)) {
        // Check if click is outside all excluded refs
        const isOutsideExcludedRefs = excludeRefs.every(
          (excludeRef: RefObject<HTMLElement>) =>
            !excludeRef.current || !excludeRef.current.contains(target),
        );

        if (isOutsideExcludedRefs) {
          handler();
        }
      }
    },
    [handler, excludeRefs, ref],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick as any);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick as any);
    };
  }, [handleClick]);

  // Return ref only in non-ref pattern
  if (!isRefPattern) {
    return ref as RefObject<T | null>;
  }
}
/* eslint-enable no-redeclare */
