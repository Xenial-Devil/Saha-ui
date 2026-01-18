"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";

/**
 * Debounce function
 */
function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle function
 */
function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

interface UseScrollOptions {
  threshold?: number;
  hideOnScroll?: boolean;
  shrinkOnScroll?: boolean;
  elevateOnScroll?: boolean;
  colorOnScroll?: boolean;
  scrollContainer?: React.RefObject<HTMLElement> | string;
  debounceMs?: number;
  throttleMs?: number;
  useIntersectionObserver?: boolean;
}

interface ScrollState {
  isScrolled: boolean;
  isVisible: boolean;
  isShrunk: boolean;
  isElevated: boolean;
  shouldChangeColor: boolean;
  scrollProgress: number;
  scrollY: number;
  scrollDirection: "up" | "down" | null;
}

export function useAppBarScroll(options: UseScrollOptions = {}): ScrollState {
  const {
    threshold = 50,
    hideOnScroll = false,
    shrinkOnScroll = false,
    elevateOnScroll = false,
    colorOnScroll = false,
    scrollContainer,
    debounceMs,
    throttleMs,
    useIntersectionObserver = false,
  } = options;

  const [state, setState] = useState<ScrollState>({
    isScrolled: false,
    isVisible: true,
    isShrunk: false,
    isElevated: false,
    shouldChangeColor: false,
    scrollProgress: 0,
    scrollY: 0,
    scrollDirection: null,
  });

  const prevScrollY = useRef(0);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Get scroll container element
  const getScrollContainer = useCallback((): HTMLElement | Window => {
    if (!scrollContainer) return window;
    if (typeof scrollContainer === "string") {
      return (document.querySelector(scrollContainer) as HTMLElement) || window;
    }
    return scrollContainer.current || window;
  }, [scrollContainer]);

  // Handle scroll with Intersection Observer
  useEffect(() => {
    if (!useIntersectionObserver) return;

    // Create sentinel element
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = `${threshold}px`;
    sentinel.style.height = "1px";
    sentinel.style.width = "1px";
    sentinel.style.pointerEvents = "none";
    document.body.prepend(sentinel);
    sentinelRef.current = sentinel;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isScrolled = !entry.isIntersecting;
        setState((prev) => ({
          ...prev,
          isScrolled,
          shouldChangeColor: colorOnScroll && isScrolled,
          isElevated: elevateOnScroll && isScrolled,
          isShrunk: shrinkOnScroll && isScrolled,
        }));
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, [
    useIntersectionObserver,
    threshold,
    colorOnScroll,
    elevateOnScroll,
    shrinkOnScroll,
  ]);

  // Handle scroll with scroll listener
  useEffect(() => {
    if (useIntersectionObserver) return;

    const container = getScrollContainer();

    const handleScroll = () => {
      const scrollY =
        container === window
          ? window.scrollY
          : (container as HTMLElement).scrollTop;

      const maxScroll =
        container === window
          ? document.documentElement.scrollHeight - window.innerHeight
          : (container as HTMLElement).scrollHeight -
            (container as HTMLElement).clientHeight;

      const scrollProgress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      const scrollDirection = scrollY > prevScrollY.current ? "down" : "up";
      const isScrolled = scrollY > threshold;

      let isVisible = true;
      if (hideOnScroll) {
        if (scrollY < 10) {
          isVisible = true;
        } else if (scrollDirection === "down" && scrollY > threshold) {
          isVisible = false;
        } else if (scrollDirection === "up") {
          isVisible = true;
        }
      }

      setState({
        isScrolled,
        isVisible,
        isShrunk: shrinkOnScroll && isScrolled,
        isElevated: elevateOnScroll && isScrolled,
        shouldChangeColor: colorOnScroll && isScrolled,
        scrollProgress,
        scrollY,
        scrollDirection,
      });

      prevScrollY.current = scrollY;
    };

    let scrollHandler = handleScroll;
    if (debounceMs) {
      scrollHandler = debounce(handleScroll, debounceMs);
    } else if (throttleMs) {
      scrollHandler = throttle(handleScroll, throttleMs);
    }

    container.addEventListener("scroll", scrollHandler, { passive: true });
    handleScroll(); // Initial check

    return () => {
      container.removeEventListener("scroll", scrollHandler);
    };
  }, [
    getScrollContainer,
    threshold,
    hideOnScroll,
    shrinkOnScroll,
    elevateOnScroll,
    colorOnScroll,
    debounceMs,
    throttleMs,
    useIntersectionObserver,
  ]);

  return state;
}

interface UseMediaQueryOptions {
  defaultValue?: boolean;
}

export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): boolean {
  const { defaultValue = false } = options;
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export function useIsMobile(breakpoint: number = 768): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

interface UseResizeObserverResult {
  width: number;
  height: number;
  ref: React.RefCallback<HTMLElement>;
}

export function useResizeObserver(): UseResizeObserverResult {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((element: HTMLElement | null) => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!element) return;

    // Create new observer
    observerRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observerRef.current.observe(element);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { ...size, ref };
}

export function useBodyScrollLock(lock: boolean): void {
  useEffect(() => {
    if (!lock) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = "";
    };
  }, [lock]);
}

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  handler: () => void;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        const metaMatch = shortcut.meta ? event.metaKey : !event.metaKey;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch) {
          event.preventDefault();
          shortcut.handler();
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
}

export function useCommandPalette(
  enabled: boolean,
  shortcut: string,
  onOpen: () => void
): void {
  const shortcuts = useMemo(() => {
    if (!enabled) return [];

    // Parse shortcut string like "mod+k" or "ctrl+shift+p"
    const parts = shortcut.toLowerCase().split("+");
    const key = parts[parts.length - 1];
    const modifiers = parts.slice(0, -1);

    const isMac =
      typeof navigator !== "undefined" &&
      /Mac|iPod|iPhone|iPad/.test(navigator.platform);

    return [
      {
        key,
        ctrl:
          modifiers.includes("ctrl") || (modifiers.includes("mod") && !isMac),
        meta:
          modifiers.includes("meta") || (modifiers.includes("mod") && isMac),
        shift: modifiers.includes("shift"),
        alt: modifiers.includes("alt"),
        handler: onOpen,
      },
    ];
  }, [enabled, shortcut, onOpen]);

  useKeyboardShortcuts(shortcuts);
}

export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  enabled: boolean
): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [containerRef, enabled]);
}

export function useEntranceAnimation(
  entrance: "none" | "slideDown" | "fadeIn" | "slideUp"
): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (entrance === "none") {
      setMounted(true);
      return;
    }

    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, [entrance]);

  return mounted;
}
