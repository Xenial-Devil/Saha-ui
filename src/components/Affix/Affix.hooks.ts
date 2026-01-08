"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import type {
  ScrollInfo,
  ScrollDirection,
  PerformanceMetrics,
  ResponsiveValue,
  OffsetValue,
  AffixTarget,
} from "./Affix.types";

/**
 * Breakpoint values in pixels
 */
const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Hook to get current breakpoint
 */
export function useBreakpoint(): BreakpointKey {
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>("xs");

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      let current: BreakpointKey = "xs";

      for (const [bp, minWidth] of Object.entries(BREAKPOINTS)) {
        if (width >= minWidth) {
          current = bp as BreakpointKey;
        }
      }

      setBreakpoint(current);
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}

/**
 * Hook to get responsive value based on current breakpoint
 */
export function useResponsiveValue<T>(
  value: T | ResponsiveValue<T>,
  defaultValue: T
): T {
  const breakpoint = useBreakpoint();

  return useMemo(() => {
    if (typeof value !== "object" || value === null) {
      return value as T;
    }

    const responsiveValue = value as ResponsiveValue<T>;
    const breakpointOrder: BreakpointKey[] = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
    ];
    const currentIndex = breakpointOrder.indexOf(breakpoint);

    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i];
      if (responsiveValue[bp] !== undefined) {
        return responsiveValue[bp] as T;
      }
    }

    return defaultValue;
  }, [value, breakpoint, defaultValue]);
}

/**
 * Default scroll info
 */
const DEFAULT_SCROLL_INFO: ScrollInfo = {
  scrollTop: 0,
  scrollLeft: 0,
  scrollHeight: 0,
  scrollWidth: 0,
  clientHeight: 0,
  clientWidth: 0,
  scrollProgress: 0,
  scrollProgressX: 0,
  direction: "none",
  directionX: "none",
  velocity: 0,
  velocityX: 0,
  isAtTop: true,
  isAtBottom: false,
  isAtLeft: true,
  isAtRight: false,
};

/**
 * Hook to resolve offset value
 */
export function useOffsetValue(
  offset: OffsetValue | undefined,
  scrollInfo: ScrollInfo
): number | undefined {
  const breakpoint = useBreakpoint();

  return useMemo(() => {
    if (offset === undefined) return undefined;

    if (typeof offset === "function") {
      return offset(scrollInfo);
    }

    if (typeof offset === "number") {
      return offset;
    }

    const breakpointOrder: BreakpointKey[] = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
    ];
    const currentIndex = breakpointOrder.indexOf(breakpoint);

    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i];
      if (offset[bp] !== undefined) {
        return offset[bp];
      }
    }

    return undefined;
  }, [offset, breakpoint, scrollInfo]);
}

/**
 * Hook to get comprehensive scroll info - works with both window and container elements
 */
export function useScrollInfo(target?: AffixTarget): ScrollInfo {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>(DEFAULT_SCROLL_INFO);

  const lastScrollRef = useRef({ top: 0, left: 0 });
  const lastTimeRef = useRef(Date.now());
  const rafRef = useRef<number | null>(null);

  // Resolve target to actual element
  const getTargetElement = useCallback((): HTMLElement | Window => {
    if (!target) return window;
    if (typeof target === "function") {
      const result = target();
      return result || window;
    }
    return target;
  }, [target]);

  useEffect(() => {
    const updateScrollInfo = () => {
      const targetElement = getTargetElement();
      const now = Date.now();
      const timeDelta = Math.max(now - lastTimeRef.current, 1);

      let scrollTop = 0;
      let scrollLeft = 0;
      let scrollHeight = 0;
      let scrollWidth = 0;
      let clientHeight = 0;
      let clientWidth = 0;

      if (
        targetElement === window ||
        targetElement === document.documentElement
      ) {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        scrollHeight = document.documentElement.scrollHeight;
        scrollWidth = document.documentElement.scrollWidth;
        clientHeight = window.innerHeight;
        clientWidth = window.innerWidth;
      } else {
        const element = targetElement as HTMLElement;
        scrollTop = element.scrollTop;
        scrollLeft = element.scrollLeft;
        scrollHeight = element.scrollHeight;
        scrollWidth = element.scrollWidth;
        clientHeight = element.clientHeight;
        clientWidth = element.clientWidth;
      }

      const maxScrollTop = Math.max(scrollHeight - clientHeight, 1);
      const maxScrollLeft = Math.max(scrollWidth - clientWidth, 1);

      const scrollDeltaY = scrollTop - lastScrollRef.current.top;
      const scrollDeltaX = scrollLeft - lastScrollRef.current.left;

      let direction: ScrollDirection = "none";
      let directionX: ScrollDirection = "none";

      // Only update direction if there's meaningful scroll
      if (Math.abs(scrollDeltaY) > 0.5) {
        direction = scrollDeltaY > 0 ? "down" : "up";
      }

      if (Math.abs(scrollDeltaX) > 0.5) {
        directionX = scrollDeltaX > 0 ? "down" : "up";
      }

      const velocity = Math.abs(scrollDeltaY) / (timeDelta / 1000);
      const velocityX = Math.abs(scrollDeltaX) / (timeDelta / 1000);

      setScrollInfo({
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth,
        clientHeight,
        clientWidth,
        scrollProgress: scrollTop / maxScrollTop,
        scrollProgressX: scrollLeft / maxScrollLeft,
        direction,
        directionX,
        velocity,
        velocityX,
        isAtTop: scrollTop <= 1,
        isAtBottom: scrollTop >= maxScrollTop - 1,
        isAtLeft: scrollLeft <= 1,
        isAtRight: scrollLeft >= maxScrollLeft - 1,
      });

      lastScrollRef.current = { top: scrollTop, left: scrollLeft };
      lastTimeRef.current = now;
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateScrollInfo);
    };

    // Initial update
    updateScrollInfo();

    const targetElement = getTargetElement();

    if (
      targetElement === window ||
      targetElement === document.documentElement
    ) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      (targetElement as HTMLElement).addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (
        targetElement === window ||
        targetElement === document.documentElement
      ) {
        window.removeEventListener("scroll", handleScroll);
      } else {
        (targetElement as HTMLElement).removeEventListener(
          "scroll",
          handleScroll
        );
      }
    };
  }, [getTargetElement]);

  return scrollInfo;
}

/**
 * Hook for throttled callback
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastRan = useRef(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    ((...args) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRan.current;

      if (timeSinceLastRun >= delay) {
        callback(...args);
        lastRan.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRan.current = Date.now();
        }, delay - timeSinceLastRun);
      }
    }) as T,
    [callback, delay]
  );
}

/**
 * Hook for debounced callback
 */
export function useDebounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    ((...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

/**
 * Hook to track performance metrics
 */
export function usePerformanceMetrics(enabled: boolean = false): {
  recordUpdate: (startTime: number) => void;
  recordScrollEvent: () => void;
  recordResizeEvent: () => void;
  getMetrics: () => PerformanceMetrics;
  resetMetrics: () => void;
} {
  const metricsRef = useRef<PerformanceMetrics>({
    lastUpdateTime: 0,
    averageUpdateTime: 0,
    updateCount: 0,
    scrollEventCount: 0,
    resizeEventCount: 0,
  });

  const recordUpdate = useCallback(
    (startTime: number) => {
      if (!enabled) return;

      const updateTime = performance.now() - startTime;
      const metrics = metricsRef.current;

      metrics.updateCount++;
      metrics.lastUpdateTime = updateTime;
      metrics.averageUpdateTime =
        (metrics.averageUpdateTime * (metrics.updateCount - 1) + updateTime) /
        metrics.updateCount;
    },
    [enabled]
  );

  const recordScrollEvent = useCallback(() => {
    if (!enabled) return;
    metricsRef.current.scrollEventCount++;
  }, [enabled]);

  const recordResizeEvent = useCallback(() => {
    if (!enabled) return;
    metricsRef.current.resizeEventCount++;
  }, [enabled]);

  const getMetrics = useCallback(() => {
    return { ...metricsRef.current };
  }, []);

  const resetMetrics = useCallback(() => {
    metricsRef.current = {
      lastUpdateTime: 0,
      averageUpdateTime: 0,
      updateCount: 0,
      scrollEventCount: 0,
      resizeEventCount: 0,
    };
  }, []);

  return {
    recordUpdate,
    recordScrollEvent,
    recordResizeEvent,
    getMetrics,
    resetMetrics,
  };
}

/**
 * Hook to check if component prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook to detect orientation
 */
export function useOrientation(): "portrait" | "landscape" {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? "portrait" : "landscape"
      );
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  return orientation;
}

/**
 * Hook for IntersectionObserver
 */
export function useIntersectionObserver(
  ref: React.RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit,
  enabled: boolean = true
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([observerEntry]) => {
      setEntry(observerEntry);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options, enabled]);

  return entry;
}

/**
 * Hook for ResizeObserver
 */
export function useResizeObserver(
  ref: React.RefObject<HTMLElement | null>,
  callback?: (entry: ResizeObserverEntry) => void,
  enabled: boolean = true
): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([observerEntry]) => {
      const { width, height } = observerEntry.contentRect;
      setSize({ width, height });
      callback?.(observerEntry);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback, enabled]);

  return size;
}

/**
 * Hook for sticky support detection
 */
export function useStickySupport(): boolean {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const element = document.createElement("div");
    element.style.cssText = "position: sticky; position: -webkit-sticky;";
    setSupported(element.style.position.includes("sticky"));
  }, []);

  return supported;
}

/**
 * Hook for SSR-safe state initialization
 */
export function useIsomorphicLayoutEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList
): void {
  const useIsomorphicEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useIsomorphicEffect(effect, deps);
}

/**
 * Hook to track hydration state
 */
export function useHydration(): boolean {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
