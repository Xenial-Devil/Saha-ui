import { useState, useEffect, useCallback } from "react";

/**
 * useAnimation - CSS animation control hook
 * @param animationName - CSS animation name
 * @param duration - Animation duration in ms
 * @returns Animation state and controls
 */

export interface UseAnimationOptions {
  autoPlay?: boolean;
  loop?: boolean;
  delay?: number;
}

export function useAnimation(
  animationName: string,
  duration: number,
  options: UseAnimationOptions = {}
) {
  const { autoPlay = false, loop = false, delay = 0 } = options;
  const [isAnimating, setIsAnimating] = useState(autoPlay);
  const [iterations, setIterations] = useState(0);

  const play = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const pause = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const reset = useCallback(() => {
    setIsAnimating(false);
    setIterations(0);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;

    const timeout = setTimeout(() => {
      setIterations((prev) => prev + 1);
      if (!loop) {
        setIsAnimating(false);
      }
    }, duration + delay);

    return () => clearTimeout(timeout);
  }, [isAnimating, duration, delay, loop, iterations]);

  const animationStyles = {
    animationName: isAnimating ? animationName : "none",
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    animationIterationCount: loop ? "infinite" : 1,
  };

  return {
    isAnimating,
    iterations,
    play,
    pause,
    reset,
    animationStyles,
  };
}
