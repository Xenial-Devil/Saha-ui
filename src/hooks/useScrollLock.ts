import { useEffect } from "react";

/**
 * Custom hook to lock/unlock body scroll
 * Useful for modals, drawers, and other overlay components
 *
 * @param isLocked - Whether scroll should be locked
 *
 * @example
 * useScrollLock(isModalOpen);
 */
export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    // Save original body overflow
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Get scrollbar width to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Lock scroll
    document.body.style.overflow = "hidden";

    // Add padding to compensate for scrollbar width
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Cleanup
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}
