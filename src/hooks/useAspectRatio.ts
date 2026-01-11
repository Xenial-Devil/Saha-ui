"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import type {
  AspectRatioPreset,
  LoadingState,
  UseAspectRatioConfig,
  UseAspectRatioReturn,
} from "../components/AspectRatio/AspectRatio.types";

/**
 * Ratio presets mapped to padding-bottom percentages
 */
const RATIO_MAP: Record<AspectRatioPreset, number> = {
  "1/1": 100,
  "4/3": 75,
  "16/9": 56.25,
  "21/9": 42.857,
  "3/2": 66.667,
  "2/3": 150,
  "9/16": 177.778,
  "3/4": 133.333,
  "5/4": 80,
  "2/1": 50,
  "1/2": 200,
};

/**
 * Parse custom ratio string to number
 */
const parseRatioString = (ratio: string): number => {
  // Handle formats: "16:9", "16/9", "1.78"
  if (ratio.includes(":")) {
    const [width, height] = ratio.split(":").map(Number);
    return width / height;
  }
  if (ratio.includes("/")) {
    const [width, height] = ratio.split("/").map(Number);
    return width / height;
  }
  return parseFloat(ratio);
};

/**
 * Calculate padding bottom from ratio
 */
const calculatePaddingBottom = (
  ratio: AspectRatioPreset | "custom" | undefined,
  customRatio?: number | string
): string => {
  if (ratio === "custom" && customRatio !== undefined) {
    const numericRatio =
      typeof customRatio === "string"
        ? parseRatioString(customRatio)
        : customRatio;
    return `${(1 / numericRatio) * 100}%`;
  }

  if (ratio && ratio in RATIO_MAP) {
    return `${RATIO_MAP[ratio as AspectRatioPreset]}%`;
  }

  return `${RATIO_MAP["16/9"]}%`; // Default
};

/**
 * Clamp a value between min and max
 */
const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Custom hook for AspectRatio component
 * Handles intersection observer, animations, and mouse interactions
 */
export function useAspectRatio(
  config: UseAspectRatioConfig
): UseAspectRatioReturn {
  const {
    ratio = "16/9",
    customRatio,
    zoomOnHover = false,
    zoomScale = 1.05,
    lazy = false,
    lazyThreshold = 0.1,
    lazyRootMargin = "50px",
    parallax = false,
    parallaxIntensity = 0.1,
    tilt = false,
    maxTilt = 10,
    glare = false,
    maxGlare = 0.35,
    animation = "fade",
    animationDuration = 300,
    onInView,
    onLoad,
    onLoadError,
  } = config;

  // Refs - allow null
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // State
  const [isInView, setIsInView] = useState(!lazy);
  const [isHovered, setIsHovered] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    lazy ? "idle" : "loading"
  );
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Memoized values
  const paddingBottom = useMemo(
    () => calculatePaddingBottom(ratio, customRatio),
    [ratio, customRatio]
  );

  const safeZoomScale = useMemo(() => clamp(zoomScale, 1, 2), [zoomScale]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setLoadingState("loading");
            onInView?.();
            observer.disconnect();
          }
        });
      },
      {
        threshold: lazyThreshold,
        rootMargin: lazyRootMargin,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [lazy, lazyThreshold, lazyRootMargin, onInView]);

  // Parallax scroll effect
  useEffect(() => {
    if (!parallax || !containerRef.current) return;

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const scrollPercent = (windowHeight / 2 - elementCenter) / windowHeight;

        setScrollY(scrollPercent * parallaxIntensity * 100);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [parallax, parallaxIntensity]);

  // Mouse event handlers - removed unused parameter
  const handleMouseEnter = useCallback(
    (_e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true);
    },
    []
  );

  const handleMouseLeave = useCallback(
    (_e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);
      setMousePosition({ x: 0.5, y: 0.5 });
      setTiltValues({ x: 0, y: 0 });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || (!tilt && !glare)) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setMousePosition({ x, y });

      if (tilt) {
        const tiltX = (y - 0.5) * maxTilt * 2;
        const tiltY = (0.5 - x) * maxTilt * 2;
        setTiltValues({ x: tiltX, y: tiltY });
      }
    },
    [tilt, glare, maxTilt]
  );

  // Load handlers
  const handleLoad = useCallback(() => {
    setLoadingState("loaded");
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(
    (error: Error) => {
      setLoadingState("error");
      onLoadError?.(error);
    },
    [onLoadError]
  );

  // Computed styles
  const tiltStyle = useMemo((): React.CSSProperties => {
    if (!tilt || !isHovered) {
      return {
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.5s ease-out",
      };
    }

    return {
      transform: `perspective(1000px) rotateX(${tiltValues.x}deg) rotateY(${tiltValues.y}deg)`,
      transition: "transform 0.1s ease-out",
    };
  }, [tilt, isHovered, tiltValues]);

  const glareStyle = useMemo((): React.CSSProperties => {
    if (!glare || !isHovered) {
      return {
        opacity: 0,
        transition: "opacity 0.3s ease-out",
      };
    }

    const angle = Math.atan2(mousePosition.y - 0.5, mousePosition.x - 0.5);
    const angleDeg = (angle * 180) / Math.PI + 90;

    return {
      opacity: maxGlare,
      background: `linear-gradient(${angleDeg}deg, rgba(255,255,255,${maxGlare}) 0%, transparent 80%)`,
      transition: "opacity 0.1s ease-out",
    };
  }, [glare, isHovered, mousePosition, maxGlare]);

  const contentStyle = useMemo((): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      transition: `transform ${animationDuration}ms cubic-bezier(0.33, 1, 0.68, 1), opacity ${animationDuration}ms ease-out, filter ${animationDuration}ms ease-out`,
    };

    // Apply zoom on hover
    if (zoomOnHover && isHovered) {
      baseStyle.transform = `scale(${safeZoomScale})`;
    } else {
      baseStyle.transform = "scale(1)";
    }

    // Apply parallax
    if (parallax) {
      const currentTransform = baseStyle.transform || "";
      baseStyle.transform = `${currentTransform} translateY(${scrollY}px)`;
    }

    // Animation states
    if (animation !== "none" && loadingState !== "loaded") {
      switch (animation) {
        case "fade":
          baseStyle.opacity = 0;
          break;
        case "scale":
          baseStyle.transform = `${baseStyle.transform || ""} scale(0.9)`;
          baseStyle.opacity = 0;
          break;
        case "slide-up":
          baseStyle.transform = `${baseStyle.transform || ""} translateY(20px)`;
          baseStyle.opacity = 0;
          break;
        case "slide-down":
          baseStyle.transform = `${
            baseStyle.transform || ""
          } translateY(-20px)`;
          baseStyle.opacity = 0;
          break;
        case "blur":
          baseStyle.filter = "blur(10px)";
          baseStyle.opacity = 0;
          break;
        case "reveal":
          baseStyle.clipPath = "inset(100% 0 0 0)";
          break;
      }
    } else if (animation !== "none" && loadingState === "loaded") {
      baseStyle.opacity = 1;
      baseStyle.filter = "blur(0)";
      baseStyle.clipPath = "inset(0 0 0 0)";
    }

    return baseStyle;
  }, [
    zoomOnHover,
    isHovered,
    safeZoomScale,
    parallax,
    scrollY,
    animation,
    loadingState,
    animationDuration,
  ]);

  return {
    containerRef,
    contentRef,
    paddingBottom,
    isInView,
    isHovered,
    loadingState,
    tiltStyle,
    glareStyle,
    contentStyle,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    handleLoad,
    handleError,
    safeZoomScale,
  };
}

export default useAspectRatio;
