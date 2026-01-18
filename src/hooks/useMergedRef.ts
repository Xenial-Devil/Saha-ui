import {
  useCallback,
  type Ref,
  type RefCallback,
  type MutableRefObject,
} from "react";

type PossibleRef<T> = Ref<T> | MutableRefObject<T | null> | undefined | null;

/**
 * Set a ref value, handling both callback refs and ref objects
 */
function setRef<T>(ref: PossibleRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as MutableRefObject<T | null>).current = value;
  }
}

/**
 * Merge multiple refs into a single callback ref
 * Useful when you need to use multiple refs on a single element
 *
 * @example
 * ```tsx
 * const Component = React.forwardRef((props, forwardedRef) => {
 *   const localRef = useRef(null);
 *   const mergedRef = useMergedRef(forwardedRef, localRef);
 *   return <div ref={mergedRef} />;
 * });
 * ```
 */
export function useMergedRef<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  return useCallback(
    (node: T | null) => {
      refs.forEach((ref) => setRef(ref, node));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}

/**
 * Compose multiple refs without using hooks
 * Useful outside of component context
 */
export function composeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  return (node: T | null) => {
    refs.forEach((ref) => setRef(ref, node));
  };
}
