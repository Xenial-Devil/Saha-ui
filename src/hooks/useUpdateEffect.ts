import { useEffect, useRef, DependencyList, EffectCallback } from "react";

/**
 * Custom hook that skips the effect on initial mount
 * Only runs the effect on subsequent renders
 *
 * @param effect - Effect callback to run
 * @param deps - Dependency array
 *
 * @example
 * useUpdateEffect(() => {
 *   console.log('Value changed!', value);
 * }, [value]);
 */
export function useUpdateEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
