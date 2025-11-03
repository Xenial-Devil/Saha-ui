import { useState, useEffect } from "react";

/**
 * Hook to detect if user is hovering over an element
 * @param ref - React ref object for the element
 * @returns boolean indicating if element is being hovered
 *
 * @example
 * const buttonRef = useRef(null);
 * const isHovered = useHover(buttonRef);
 */
export function useHover<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>
): boolean {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  return isHovered;
}

/**
 * Hook to detect if element has focus
 * @param ref - React ref object for the element
 * @returns boolean indicating if element has focus
 *
 * @example
 * const inputRef = useRef(null);
 * const isFocused = useFocus(inputRef);
 */
export function useFocus<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>
): boolean {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    element.addEventListener("focus", handleFocus);
    element.addEventListener("blur", handleBlur);

    return () => {
      element.removeEventListener("focus", handleFocus);
      element.removeEventListener("blur", handleBlur);
    };
  }, [ref]);

  return isFocused;
}

/**
 * Hook to track window scroll position
 * @returns { x, y } scroll position
 *
 * @example
 * const { y } = useWindowScroll();
 * const showBackToTop = y > 300;
 */
export function useWindowScroll(): { x: number; y: number } {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScroll({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial value

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
}

/**
 * Hook to track window size
 * @returns { width, height } window dimensions
 *
 * @example
 * const { width } = useWindowSize();
 * const isMobile = width < 768;
 */
export function useWindowSize(): { width: number; height: number } {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
