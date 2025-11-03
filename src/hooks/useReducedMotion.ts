import { useMediaQuery } from "./useMediaQuery";

/**
 * useReducedMotion - Detect if user prefers reduced motion
 * @returns boolean indicating if reduced motion is preferred
 */

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
