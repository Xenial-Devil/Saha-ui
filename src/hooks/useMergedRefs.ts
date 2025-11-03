import { useCallback, MutableRefObject, RefCallback } from "react";

/**
 * Type for ref that can be either a callback ref or a mutable ref object
 */
export type PossibleRef<T> =
  | MutableRefObject<T>
  | RefCallback<T>
  | null
  | undefined;

/**
 * Custom hook to merge multiple refs into a single ref callback
 * Useful when you need to forward a ref and also use it internally
 *
 * @param refs - Array of refs to merge
 * @returns Merged ref callback
 *
 * @example
 * const Component = forwardRef((props, ref) => {
 *   const internalRef = useRef();
 *   const mergedRef = useMergedRefs(ref, internalRef);
 *   return <div ref={mergedRef} />;
 * });
 */
export function useMergedRefs<T = any>(
  ...refs: PossibleRef<T>[]
): RefCallback<T> {
  return useCallback(
    (value: T) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          (ref as MutableRefObject<T>).current = value;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
