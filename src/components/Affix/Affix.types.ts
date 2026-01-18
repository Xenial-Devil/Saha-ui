import type { VariantProps } from "class-variance-authority";
import type { affixVariants } from "./Affix.styles";

/**
 * Affix target type
 */
export type AffixTarget = Window | HTMLElement | (() => HTMLElement | Window);

/**
 * Scroll direction type
 */
export type ScrollDirection = "up" | "down" | "none";

/**
 * Affix position type
 */
export type AffixPosition = "top" | "bottom" | "left" | "right" | "none";

/**
 * Width calculation mode
 */
export type WidthMode = "inherit" | "auto" | "full" | "content" | number;

/**
 * Responsive breakpoint values
 */
export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}

/**
 * Offset value - can be number, responsive object, or function
 */
export type OffsetValue =
  | number
  | ResponsiveValue<number>
  | ((scrollInfo: ScrollInfo) => number);

/**
 * Scroll info passed to callbacks and dynamic functions
 */
export interface ScrollInfo {
  scrollTop: number;
  scrollLeft: number;
  scrollHeight: number;
  scrollWidth: number;
  clientHeight: number;
  clientWidth: number;
  scrollProgress: number;
  scrollProgressX: number;
  direction: ScrollDirection;
  directionX: ScrollDirection;
  velocity: number;
  velocityX: number;
  isAtTop: boolean;
  isAtBottom: boolean;
  isAtLeft: boolean;
  isAtRight: boolean;
}

/**
 * Position info for callbacks
 */
export interface PositionInfo {
  top: number;
  left: number;
  width: number;
  height: number;
  affixedTop?: number;
  affixedLeft?: number;
}

/**
 * Boundary reached info
 */
export interface BoundaryInfo {
  boundary: "top" | "bottom" | "element";
  element?: HTMLElement;
  position: PositionInfo;
}

/**
 * Transition configuration
 */
export interface TransitionConfig {
  duration?: number;
  easing?: string;
  delay?: number;
  property?: string | string[];
}

/**
 * Shadow configuration when affixed
 */
export interface ShadowConfig {
  enabled?: boolean;
  color?: string;
  blur?: number;
  spread?: number;
  offsetX?: number;
  offsetY?: number;
  opacity?: number;
}

/**
 * Backdrop configuration when affixed
 */
export interface BackdropConfig {
  enabled?: boolean;
  blur?: number;
  saturate?: number;
  brightness?: number;
  backgroundColor?: string;
  opacity?: number;
}

/**
 * Physics configuration for elastic/spring animations
 */
export interface PhysicsConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
}

/**
 * Debug configuration
 */
export interface DebugConfig {
  enabled?: boolean;
  showBoundaries?: boolean;
  showScrollInfo?: boolean;
  showPositionInfo?: boolean;
  logStateChanges?: boolean;
  highlightColor?: string;
}

/**
 * Performance metrics
 */
export interface PerformanceMetrics {
  lastUpdateTime: number;
  averageUpdateTime: number;
  updateCount: number;
  scrollEventCount: number;
  resizeEventCount: number;
}

/**
 * Imperative handle for Affix component
 */
export interface AffixHandle {
  /** Force update position calculation */
  updatePosition: () => void;
  /** Force affix state */
  forceAffix: (affixed: boolean) => void;
  /** Reset to initial state */
  reset: () => void;
  /** Get current state */
  getState: () => AffixState;
  /** Get scroll info */
  getScrollInfo: () => ScrollInfo;
  /** Get performance metrics */
  getMetrics: () => PerformanceMetrics;
  /** Check if element is affixed */
  isAffixed: () => boolean;
  /** Scroll to make element visible */
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}

/**
 * Affix group context value
 */
export interface AffixGroupContextValue {
  registerAffix: (id: string, priority: number, height: number, element?: HTMLElement | null) => void;
  unregisterAffix: (id: string) => void;
  getStackOffset: (id: string) => number;
  getAffixedElements: () => Map<string, { priority: number; height: number }>;
  notifyStateChange: (id: string, affixed: boolean, height?: number) => void;
  /** Trigger for re-renders when stack changes */
  updateTrigger?: number;
}

/**
 * Internal state for tracking affix status
 */
export interface AffixState {
  affixed: boolean;
  position: AffixPosition;
  placeholderHeight: number;
  placeholderWidth: number;
  scrollDirection: ScrollDirection;
  scrollDirectionX: ScrollDirection;
  scrollProgress: number;
  scrollVelocity: number;
  boundaryReached: boolean;
  boundaryElement: HTMLElement | null;
  isInitialized: boolean;
  isHydrated: boolean;
  springValue?: number;
  springVelocity?: number;
}

/**
 * SSR configuration
 */
export interface SSRConfig {
  initialAffixed?: boolean;
  initialPosition?: AffixPosition;
  deferInitialization?: boolean;
  hydrateOnIdle?: boolean;
}

/**
 * Base HTML div props with excluded overridden props
 */
type BaseAffixDivProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "onScroll"
>;

/**
 * Props for the Affix component
 */
export interface AffixProps
  extends BaseAffixDivProps,
    VariantProps<typeof affixVariants> {
  /**
   * Children to be affixed
   */
  children: React.ReactNode;

  // ============================================
  // BASIC POSITIONING
  // ============================================

  /**
   * Offset from the top of the viewport when affixed
   */
  offsetTop?: OffsetValue;

  /**
   * Offset from the bottom of the viewport when affixed
   */
  offsetBottom?: OffsetValue;

  /**
   * Offset from the left of the viewport when affixed (horizontal mode)
   */
  offsetLeft?: OffsetValue;

  /**
   * Offset from the right of the viewport when affixed (horizontal mode)
   */
  offsetRight?: OffsetValue;

  /**
   * Target element or window to listen for scroll events
   * @default window
   */
  target?: AffixTarget;

  // ============================================
  // BOUNDARIES & CONSTRAINTS
  // ============================================

  /**
   * Element that acts as the bottom boundary (stops affixing when reached)
   */
  boundaryElement?: HTMLElement | (() => HTMLElement | null) | string;

  /**
   * Container to limit affix within
   */
  containerBounds?: HTMLElement | (() => HTMLElement | null) | string;

  /**
   * Minimum scroll position to start affixing
   */
  minScrollPosition?: number;

  /**
   * Maximum scroll position to stop affixing
   */
  maxScrollPosition?: number;

  /**
   * Don't affix if element is taller than viewport
   * @default true
   */
  respectViewportHeight?: boolean;

  /**
   * Don't affix if element is wider than viewport (horizontal mode)
   * @default true
   */
  respectViewportWidth?: boolean;

  // ============================================
  // SCROLL BEHAVIOR
  // ============================================

  /**
   * Only affix when scrolling up
   * @default false
   */
  affixOnScrollUp?: boolean;

  /**
   * Only affix when scrolling down
   * @default false
   */
  affixOnScrollDown?: boolean;

  /**
   * Minimum scroll velocity to trigger affix (pixels per second)
   */
  minVelocity?: number;

  /**
   * Maximum scroll velocity to trigger affix (pixels per second)
   */
  maxVelocity?: number;

  /**
   * Enable snap behavior (snaps to affixed or unaffixed)
   * @default false
   */
  snap?: boolean;

  /**
   * Snap threshold (0-1, percentage of element height)
   * @default 0.5
   */
  snapThreshold?: number;

  /**
   * Enable bi-directional affix (top when scrolling up, bottom when down)
   * @default false
   */
  biDirectional?: boolean;

  // ============================================
  // RESPONSIVE & BREAKPOINTS
  // ============================================

  /**
   * Breakpoints where affix should be disabled
   */
  disabledBreakpoints?: Array<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">;

  /**
   * Only enable affix at these breakpoints
   */
  enabledBreakpoints?: Array<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">;

  /**
   * Disable in landscape orientation
   * @default false
   */
  disableInLandscape?: boolean;

  /**
   * Disable in portrait orientation
   * @default false
   */
  disableInPortrait?: boolean;

  // ============================================
  // PERFORMANCE & OPTIMIZATION
  // ============================================

  /**
   * Throttle scroll handler (ms)
   */
  throttle?: number;

  /**
   * Debounce scroll handler (ms)
   */
  debounce?: number;

  /**
   * Use IntersectionObserver instead of scroll events
   * @default false
   */
  useIntersectionObserver?: boolean;

  /**
   * IntersectionObserver threshold(s)
   * @default [0, 1]
   */
  intersectionThreshold?: number | number[];

  /**
   * IntersectionObserver root margin
   */
  intersectionRootMargin?: string;

  /**
   * Use ResizeObserver to detect content size changes
   * @default true
   */
  useResizeObserver?: boolean;

  /**
   * Use requestAnimationFrame for updates
   * @default true
   */
  useRAF?: boolean;

  /**
   * Use passive event listeners
   * @default true
   */
  passive?: boolean;

  // ============================================
  // VISUAL & ANIMATION
  // ============================================

  /**
   * Custom transition configuration
   */
  transition?: TransitionConfig | false;

  /**
   * Add shadow when affixed
   */
  shadow?: boolean | ShadowConfig;

  /**
   * Add backdrop blur when affixed
   */
  backdrop?: boolean | BackdropConfig;

  /**
   * Custom indicator element when affixed
   */
  indicator?: React.ReactNode | ((affixed: boolean) => React.ReactNode);

  /**
   * Use CSS transform instead of top/bottom for GPU acceleration
   * @default false
   */
  useTransform?: boolean;

  /**
   * Enable elastic/spring physics animation
   */
  physics?: boolean | PhysicsConfig;

  // ============================================
  // SIZING & LAYOUT
  // ============================================

  /**
   * Width calculation mode when affixed
   * @default 'inherit'
   */
  widthMode?: WidthMode;

  /**
   * Max height when affixed
   */
  maxHeight?: number | string;

  /**
   * Preserve aspect ratio when affixed
   * @default false
   */
  preserveAspectRatio?: boolean;

  /**
   * z-index value for the affixed element
   * @default 10
   */
  zIndex?: number;

  // ============================================
  // STACKING & COORDINATION
  // ============================================

  /**
   * Unique ID for stack management
   */
  stackId?: string;

  /**
   * Priority for stacking (higher = on top)
   * @default 0
   */
  stackPriority?: number;

  /**
   * Enable automatic stack offset calculation
   * @default false
   */
  autoStack?: boolean;

  /**
   * Group ID for coordinating multiple Affix components
   */
  groupId?: string;

  // ============================================
  // CONTROL & STATE
  // ============================================

  /**
   * Disable the affix behavior
   * @default false
   */
  disabled?: boolean;

  /**
   * Controlled affix state
   */
  affixed?: boolean;

  /**
   * Use CSS position: sticky instead of fixed
   * @default false
   */
  useSticky?: boolean;

  /**
   * Use sticky with fixed as fallback for unsupported browsers
   * @default false
   */
  stickyWithFallback?: boolean;

  /**
   * Render affixed content in a portal
   */
  portal?: boolean | HTMLElement | string;

  /**
   * Custom positioning function
   */
  customPosition?: (
    scrollInfo: ScrollInfo,
    elementRect: DOMRect,
    containerRect: DOMRect | null
  ) => { top?: number; left?: number; right?: number; bottom?: number } | null;

  // ============================================
  // SSR & HYDRATION
  // ============================================

  /**
   * SSR configuration
   */
  ssr?: SSRConfig;

  /**
   * Force re-render after hydration
   * @default true
   */
  hydrateOnMount?: boolean;

  // ============================================
  // ACCESSIBILITY
  // ============================================

  /**
   * Announce affix state changes to screen readers
   * @default false
   */
  announceStateChange?: boolean;

  /**
   * Custom announcement message
   */
  stateChangeAnnouncement?: (affixed: boolean) => string;

  /**
   * Respect prefers-reduced-motion
   * @default true
   */
  respectReducedMotion?: boolean;

  /**
   * Preserve focus when affixing
   * @default true
   */
  preserveFocus?: boolean;

  /**
   * Tab index for affixed element
   */
  affixedTabIndex?: number;

  // ============================================
  // DEBUG & DEVELOPMENT
  // ============================================

  /**
   * Debug configuration
   */
  debug?: boolean | DebugConfig;

  /**
   * Expose performance metrics
   * @default false
   */
  exposeMetrics?: boolean;

  // ============================================
  // CALLBACKS
  // ============================================

  /**
   * Callback when affix state changes
   */
  onChange?: (affixed: boolean, position: AffixPosition) => void;

  /**
   * Callback on scroll with scroll info
   */
  onScroll?: (scrollInfo: ScrollInfo) => void;

  /**
   * Callback when position updates
   */
  onPositionChange?: (position: PositionInfo) => void;

  /**
   * Callback when boundary is reached
   */
  onBoundaryReached?: (info: BoundaryInfo) => void;

  /**
   * Callback when scroll direction changes
   */
  onDirectionChange?: (
    direction: ScrollDirection,
    prevDirection: ScrollDirection
  ) => void;

  /**
   * Callback when entering viewport
   */
  onEnterViewport?: () => void;

  /**
   * Callback when leaving viewport
   */
  onLeaveViewport?: () => void;

  /**
   * Callback with performance metrics
   */
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;

  // ============================================
  // STYLING
  // ============================================

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Custom className for the content wrapper
   */
  contentClassName?: string;

  /**
   * Custom className for placeholder
   */
  placeholderClassName?: string;

  /**
   * Custom className when affixed
   */
  affixedClassName?: string;

  /**
   * Custom style when affixed
   */
  affixedStyle?: React.CSSProperties;

  /**
   * When true, the Affix will render its child element and merge props
   * @default false
   */
  asChild?: boolean;
}

/**
 * Props for AffixGroup component
 */
export interface AffixGroupProps {
  children: React.ReactNode;
  /**
   * Group ID
   */
  id?: string;
  /**
   * Stacking direction
   * @default 'vertical'
   */
  direction?: "vertical" | "horizontal";
  /**
   * Gap between stacked elements
   * @default 0
   */
  gap?: number;
  /**
   * Callback when any affix in group changes state
   */
  onGroupChange?: (affixedIds: string[]) => void;
}
