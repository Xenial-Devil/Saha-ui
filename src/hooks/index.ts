// ============================================================================
// CUSTOM HOOKS EXPORTS
// ============================================================================

// Core Hooks
export { useClickOutside } from "./useClickOutside";
export { useDebounce } from "./useDebounce";
export { useThrottle } from "./useThrottle";
export { useLocalStorage } from "./useLocalStorage";
export { useSessionStorage } from "./useSessionStorage";
export { useMediaQuery } from "./useMediaQuery";
export { useEventListener } from "./useEventListener";
export { useInterval } from "./useInterval";
export { useTimeout } from "./useTimeout";
export { usePrevious } from "./usePrevious";
export { useToggle } from "./useToggle";
export { useCounter } from "./useCounter";
export { useMergedRefs } from "./useMergedRefs";
export { useScrollLock } from "./useScrollLock";
export { useArray } from "./useArray";
export { useIntersectionObserver } from "./useIntersectionObserver";

// DOM Hooks
export { useWindowSize } from "./useWindowSize";
export { useHover } from "./useHover";
export { useClipboard } from "./useClipboard";
export { useFocusTrap } from "./useFocusTrap";

// Form Hooks
export { useForm } from "./useForm";
export { useValidation } from "./useValidation";

// Animation Hooks
export { useAnimation } from "./useAnimation";
export { useReducedMotion } from "./useReducedMotion";

// Async Hooks
export { useAsync } from "./useAsync";
export { useFetch } from "./useFetch";

// Component Hooks
export { useDisclosure } from "./useDisclosure";
export { usePagination } from "./usePagination";
export { useSearchFilter } from "./useSearchFilter";
export { useColorMode } from "./useColorMode";
export { useAccordion } from "./useAccordion";
export { useAspectRatio } from "./useAspectRatio";
export { useAvatar } from "./useAvatar";

// Re-export types
export type { UseThrottleOptions } from "./useThrottle";
export type { UseSessionStorageOptions } from "./useSessionStorage";
export type { UseWindowSizeOptions } from "./useWindowSize";
export type {
  UseValidationOptions,
  ValidationRule,
  ValidationResult,
} from "./useValidation";
export type { UseAnimationOptions } from "./useAnimation";
export type { UseAsyncOptions, AsyncState } from "./useAsync";
export type { UseFetchOptions, UseFetchResult } from "./useFetch";
export type { UsePaginationOptions, PaginationState } from "./usePagination";
export type { UseSearchFilterOptions } from "./useSearchFilter";
export type {
  ColorMode,
  UseColorModeOptions,
  UseColorModeReturn,
} from "./useColorMode";
export type { UseDisclosureReturn } from "./useDisclosure";
export type { UseAccordionProps, UseAccordionReturn } from "./useAccordion";
export type {
  UseAspectRatioConfig,
  UseAspectRatioReturn,
} from "../components/AspectRatio/AspectRatio.types";

