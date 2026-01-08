import { useState, useEffect, useCallback } from "react";

export interface UseLazyMountProps {
  /**
   * Whether the component is currently visible/open
   */
  isOpen: boolean;

  /**
   * Enable lazy mounting (only mount when first opened)
   * @default false
   */
  lazyMount?: boolean;

  /**
   * Unmount when closed (after animation completes)
   * @default false
   */
  unmountOnClose?: boolean;

  /**
   * Delay before unmounting (for exit animations)
   * @default 0
   */
  unmountDelay?: number;
}

export interface UseLazyMountReturn {
  /**
   * Whether the component should be mounted in DOM
   */
  shouldMount: boolean;

  /**
   * Whether the component has ever been opened
   */
  hasBeenOpened: boolean;

  /**
   * Whether the component is currently in the process of unmounting
   */
  isUnmounting: boolean;

  /**
   * Force mount the component
   */
  forceMount: () => void;

  /**
   * Force unmount the component
   */
  forceUnmount: () => void;
}

/**
 * Hook for lazy mounting and unmounting components
 * Useful for performance optimization and exit animations
 */
export function useLazyMount({
  isOpen,
  lazyMount = false,
  unmountOnClose = false,
  unmountDelay = 0,
}: UseLazyMountProps): UseLazyMountReturn {
  const [hasBeenOpened, setHasBeenOpened] = useState(isOpen);
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [isMounted, setIsMounted] = useState(!lazyMount || isOpen);

  // Track if component has ever been opened
  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [isOpen, hasBeenOpened]);

  // Handle mounting when opening
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsUnmounting(false);
    }
  }, [isOpen]);

  // Handle unmounting when closing
  useEffect(() => {
    if (!isOpen && unmountOnClose && isMounted) {
      setIsUnmounting(true);

      const timer = setTimeout(() => {
        setIsMounted(false);
        setIsUnmounting(false);
      }, unmountDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, unmountOnClose, unmountDelay, isMounted]);

  // Calculate if should mount
  const shouldMount = (() => {
    if (!lazyMount) {
      if (unmountOnClose && !isOpen && !isUnmounting) {
        return false;
      }
      return true;
    }

    if (!hasBeenOpened) {
      return false;
    }

    if (unmountOnClose && !isOpen && !isUnmounting) {
      return false;
    }

    return true;
  })();

  const forceMount = useCallback(() => {
    setIsMounted(true);
    setHasBeenOpened(true);
  }, []);

  const forceUnmount = useCallback(() => {
    setIsMounted(false);
    setIsUnmounting(false);
  }, []);

  return {
    shouldMount,
    hasBeenOpened,
    isUnmounting,
    forceMount,
    forceUnmount,
  };
}
