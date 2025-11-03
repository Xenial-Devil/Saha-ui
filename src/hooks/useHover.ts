import { useState, useCallback, useRef, RefObject } from "react";

/**
 * useHover - Track hover state of an element
 * @returns [hoverRef, isHovered]
 */

export function useHover<T extends HTMLElement = HTMLElement>(): [
  RefObject<T>,
  boolean
] {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const callbackRef = useCallback(
    (node: T | null) => {
      if (ref.current) {
        ref.current.removeEventListener("mouseenter", handleMouseEnter);
        ref.current.removeEventListener("mouseleave", handleMouseLeave);
      }

      ref.current = node;

      if (ref.current) {
        ref.current.addEventListener("mouseenter", handleMouseEnter);
        ref.current.addEventListener("mouseleave", handleMouseLeave);
      }
    },
    [handleMouseEnter, handleMouseLeave]
  );

  return [callbackRef as any, isHovered];
}
