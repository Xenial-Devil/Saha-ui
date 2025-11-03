import { useState, useEffect } from "react";

/**
 * useWindowSize - Track window dimensions
 * @returns Current window width and height
 */

export interface UseWindowSizeOptions {
  debounceMs?: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(options: UseWindowSizeOptions = {}): WindowSize {
  const { debounceMs = 0 } = options;

  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      if (debounceMs > 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }, debounceMs);
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [debounceMs]);

  return windowSize;
}
