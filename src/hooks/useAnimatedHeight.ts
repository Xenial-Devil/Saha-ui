import { useRef, useState, useEffect, useCallback } from "react";

export interface UseAnimatedHeightProps {
  /**
   * Whether the element is currently open/expanded
   */
  isOpen: boolean;

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  duration?: number;

  /**
   * Easing function for the animation
   * @default "ease-out"
   */
  easing?: string;

  /**
   * Callback when animation starts
   */
  onAnimationStart?: () => void;

  /**
   * Callback when animation ends
   */
  onAnimationEnd?: () => void;
}

export interface UseAnimatedHeightReturn {
  /**
   * Ref to attach to the content container
   */
  contentRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Style object to apply to the content container
   */
  style: React.CSSProperties;

  /**
   * Whether animation is currently in progress
   */
  isAnimating: boolean;

  /**
   * Current height value
   */
  height: number | "auto";

  /**
   * Manually trigger height recalculation
   */
  recalculate: () => void;
}

/**
 * Hook for animating height changes with dynamic content support
 */
export function useAnimatedHeight({
  isOpen,
  duration = 300,
  easing = "ease-out",
  onAnimationStart,
  onAnimationEnd,
}: UseAnimatedHeightProps): UseAnimatedHeightReturn {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">(isOpen ? "auto" : 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevIsOpenRef = useRef(isOpen);
  const isInitialMount = useRef(true);

  /**
   * Get the scroll height of the content
   */
  const getScrollHeight = useCallback((): number => {
    return contentRef.current?.scrollHeight ?? 0;
  }, []);

  /**
   * Manually recalculate height (useful for dynamic content)
   */
  const recalculate = useCallback(() => {
    if (isOpen && !isAnimating) {
      setHeight(getScrollHeight());
      requestAnimationFrame(() => {
        setHeight("auto");
      });
    }
  }, [isOpen, isAnimating, getScrollHeight]);

  /**
   * Handle opening animation
   */
  const animateOpen = useCallback(() => {
    const scrollHeight = getScrollHeight();

    onAnimationStart?.();
    setIsAnimating(true);
    setHeight(scrollHeight);

    timeoutRef.current = setTimeout(() => {
      setHeight("auto");
      setIsAnimating(false);
      onAnimationEnd?.();
    }, duration);
  }, [duration, getScrollHeight, onAnimationStart, onAnimationEnd]);

  /**
   * Handle closing animation
   */
  const animateClose = useCallback(() => {
    const scrollHeight = getScrollHeight();

    onAnimationStart?.();
    setIsAnimating(true);
    setHeight(scrollHeight);

    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = requestAnimationFrame(() => {
        setHeight(0);
      });
    });

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      onAnimationEnd?.();
    }, duration);
  }, [duration, getScrollHeight, onAnimationStart, onAnimationEnd]);

  /**
   * Effect to handle open/close state changes
   */
  useEffect(() => {
    // Skip initial mount animation
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevIsOpenRef.current = isOpen;
      return;
    }

    // Skip if no change
    if (prevIsOpenRef.current === isOpen) {
      return;
    }

    prevIsOpenRef.current = isOpen;

    // Clear any pending animations
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isOpen) {
      animateOpen();
    } else {
      animateClose();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, animateOpen, animateClose]);

  /**
   * Handle window resize
   */
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && !isAnimating) {
        recalculate();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, isAnimating, recalculate]);

  const style: React.CSSProperties = {
    height: height === "auto" ? "auto" : `${height}px`,
    overflow: "hidden",
    transition: isAnimating
      ? `height ${duration}ms ${easing}, opacity ${duration}ms ${easing}`
      : undefined,
  };

  return {
    contentRef,
    style,
    isAnimating,
    height,
    recalculate,
  };
}
