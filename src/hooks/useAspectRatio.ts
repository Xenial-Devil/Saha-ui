import { useMemo, useCallback, useRef } from "react";

/**
 * Aspect ratio value mapping
 */
const aspectRatioMap = {
  "1/1": 1,
  "4/3": 4 / 3,
  "16/9": 16 / 9,
  "21/9": 21 / 9,
  "3/2": 3 / 2,
  "2/3": 2 / 3,
  "9/16": 9 / 16,
  "3/4": 3 / 4,
  custom: 0, // Will be overridden by customRatio prop
} as const;

export type AspectRatioType = keyof typeof aspectRatioMap;

export interface UseAspectRatioProps {
  /**
   * Preset ratio or 'custom' for customRatio
   */
  ratio?: AspectRatioType;

  /**
   * Custom ratio value (number or string like "16:9")
   * Only used when ratio is 'custom'
   */
  customRatio?: number | string;

  /**
   * Enable zoom on hover
   */
  zoomOnHover?: boolean;

  /**
   * Zoom scale factor (1.0 - 2.0)
   */
  zoomScale?: number;
}

export interface UseAspectRatioReturn {
  /**
   * Calculated aspect ratio value
   */
  ratioValue: number;

  /**
   * Padding bottom percentage for CSS
   */
  paddingBottom: string;

  /**
   * Safe zoom scale (clamped between 1.0 and 2.0)
   */
  safeZoomScale: number;

  /**
   * Ref for the content wrapper element
   */
  contentRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Mouse enter handler for zoom effect
   */
  handleMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Mouse leave handler for zoom effect
   */
  handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Parse custom ratio string to number
 * Supports formats: "16:9", "1.3:2.3", or number
 */
const parseRatio = (ratio: number | string | undefined): number => {
  if (!ratio) return 16 / 9;

  if (typeof ratio === "number") return ratio;

  // Parse string format like "16:9" or "1.3:2.3"
  if (typeof ratio === "string" && ratio.includes(":")) {
    const [width, height] = ratio.split(":").map(Number);
    if (!isNaN(width) && !isNaN(height) && height !== 0) {
      return width / height;
    }
  }

  // Try to parse as number
  const parsed = parseFloat(ratio);
  return isNaN(parsed) ? 16 / 9 : parsed;
};

/**
 * Custom hook for managing AspectRatio component logic
 *
 * This hook handles aspect ratio calculations, padding calculations,
 * zoom effects, and hover interactions for aspect ratio containers.
 *
 * @example
 * ```tsx
 * const {
 *   paddingBottom,
 *   safeZoomScale,
 *   contentRef,
 *   handleMouseEnter,
 *   handleMouseLeave
 * } = useAspectRatio({
 *   ratio: "16/9",
 *   zoomOnHover: true,
 *   zoomScale: 1.2
 * });
 * ```
 */
export function useAspectRatio({
  ratio = "16/9",
  customRatio,
  zoomOnHover = false,
  zoomScale = 1.1,
}: UseAspectRatioProps = {}): UseAspectRatioReturn {
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Calculate the aspect ratio value
  const ratioValue = useMemo(() => {
    if (ratio === "custom") {
      return parseRatio(customRatio);
    }
    return aspectRatioMap[ratio] || aspectRatioMap["16/9"];
  }, [ratio, customRatio]);

  // Calculate padding-bottom percentage for aspect ratio
  const paddingBottom = useMemo(() => {
    return `${(1 / ratioValue) * 100}%`;
  }, [ratioValue]);

  // Clamp zoom scale between 1.0 and 2.0
  const safeZoomScale = useMemo(() => {
    return Math.max(1.0, Math.min(2.0, zoomScale));
  }, [zoomScale]);

  // Handle mouse enter for zoom effect
  const handleMouseEnter = useCallback(
    (_e: React.MouseEvent<HTMLDivElement>) => {
      if (zoomOnHover && contentRef.current) {
        contentRef.current.style.transform = `scale(${safeZoomScale})`;
      }
    },
    [zoomOnHover, safeZoomScale]
  );

  // Handle mouse leave for zoom effect
  const handleMouseLeave = useCallback(
    (_e: React.MouseEvent<HTMLDivElement>) => {
      if (zoomOnHover && contentRef.current) {
        contentRef.current.style.transform = "scale(1)";
      }
    },
    [zoomOnHover]
  );

  return {
    ratioValue,
    paddingBottom,
    safeZoomScale,
    contentRef,
    handleMouseEnter,
    handleMouseLeave,
  };
}
