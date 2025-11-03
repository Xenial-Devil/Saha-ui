import { useState, useEffect, useRef, RefObject } from "react";

/**
 * Hook to track if an element is visible in the viewport
 * Uses Intersection Observer API
 *
 * @param ref - React ref object for the element to observe
 * @param options - Intersection Observer options
 * @returns boolean indicating if element is visible
 *
 * @example
 * const elementRef = useRef(null);
 * const isVisible = useIntersectionObserver(elementRef);
 */
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

/**
 * Hook for infinite scroll implementation
 * @param callback - Function to call when element becomes visible
 * @param hasMore - Whether there are more items to load
 * @param options - Intersection Observer options
 * @returns ref to attach to the sentinel element
 *
 * @example
 * const sentinelRef = useInfiniteScroll(() => loadMore(), hasMore);
 * return <div ref={sentinelRef}>Loading...</div>
 */
export function useInfiniteScroll(
  callback: () => void,
  hasMore: boolean,
  options: IntersectionObserverInit = {}
): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [callback, hasMore, options]);

  return ref;
}
