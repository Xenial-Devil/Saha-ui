"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { Slot } from "../../lib/Slot";
import type {
  AffixProps,
  AffixState,
  AffixHandle,
  AffixPosition,
  ScrollInfo,
  PerformanceMetrics,
  PhysicsConfig,
  ScrollDirection,
} from "./Affix.types";
import {
  affixPlaceholderVariants,
  affixContentVariants,
  affixIndicatorVariants,
  affixDebugVariants,
} from "./Affix.styles";
import { useAffixGroup } from "./Affix.context";
import {
  useBreakpoint,
  useOffsetValue,
  useThrottle,
  useDebounce,
  usePerformanceMetrics,
  useReducedMotion,
  useOrientation,
  useResizeObserver,
  useIntersectionObserver,
  useHydration,
  useStickySupport,
  type BreakpointKey,
} from "./Affix.hooks";
import {
  getElement,
  buildTransitionStyle,
  buildShadowStyle,
  buildBackdropStyle,
  calculateWidth,
  generateId,
  announceToScreenReader,
  parseDebugConfig,
  isWithinContainerBounds,
  calculateSpringValue,
  isSpringSettled,
  applyAspectRatioConstraint,
} from "./Affix.utils";

/**
 * Default scroll info
 */
const DEFAULT_SCROLL_INFO: ScrollInfo = {
  scrollTop: 0,
  scrollLeft: 0,
  scrollHeight: 0,
  scrollWidth: 0,
  clientHeight: 0,
  clientWidth: 0,
  scrollProgress: 0,
  scrollProgressX: 0,
  direction: "none",
  directionX: "none",
  velocity: 0,
  velocityX: 0,
  isAtTop: true,
  isAtBottom: false,
  isAtLeft: true,
  isAtRight: false,
};

/**
 * Affix Component
 */
const Affix = forwardRef<AffixHandle, AffixProps>(
  (
    {
      children,
      offsetTop,
      offsetBottom,
      offsetLeft,
      offsetRight,
      target,
      boundaryElement,
      containerBounds,
      minScrollPosition,
      maxScrollPosition,
      respectViewportHeight = true,
      respectViewportWidth = true,
      affixOnScrollUp = false,
      affixOnScrollDown = false,
      minVelocity,
      maxVelocity,
      snap = false, // eslint-disable-line @typescript-eslint/no-unused-vars
      snapThreshold = 0.5, // eslint-disable-line @typescript-eslint/no-unused-vars
      biDirectional = false,
      disabledBreakpoints,
      enabledBreakpoints,
      disableInLandscape = false,
      disableInPortrait = false,
      throttle: throttleMs,
      debounce: debounceMs,
      useIntersectionObserver: useIO = false,
      intersectionThreshold = [0, 1],
      intersectionRootMargin,
      useResizeObserver: useRO = true,
      useRAF = true,
      passive = true,
      transition,
      shadow,
      backdrop,
      indicator,
      useTransform = false,
      physics,
      widthMode = "inherit",
      maxHeight,
      preserveAspectRatio = false,
      zIndex = 10,
      stackId,
      stackPriority = 0,
      autoStack = false,
      groupId,
      disabled = false,
      affixed: controlledAffixed,
      useSticky = false,
      stickyWithFallback = false,
      portal,
      customPosition,
      ssr,
      hydrateOnMount = true,
      announceStateChange = false,
      stateChangeAnnouncement,
      respectReducedMotion = true,
      preserveFocus = true,
      affixedTabIndex,
      debug,
      exposeMetrics = false,
      onChange,
      onScroll,
      onPositionChange,
      onBoundaryReached,
      onDirectionChange,
      onEnterViewport,
      onLeaveViewport,
      onMetricsUpdate,
      className,
      contentClassName,
      placeholderClassName,
      affixedClassName,
      affixedStyle,
      asChild = false,
      ...props
    },
    ref
  ) => {
    // ============================================
    // HOOKS
    // ============================================

    const affixId = useMemo(
      () => stackId || groupId || generateId(),
      [stackId, groupId]
    );

    // Refs
    const elementRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);
    const previousDirectionRef = useRef<ScrollDirection>("none");
    const wasInViewportRef = useRef(false);
    const focusedElementRef = useRef<HTMLElement | null>(null);
    const springAnimationRef = useRef<number | null>(null);
    const originalDimensionsRef = useRef<{
      width: number;
      height: number;
    } | null>(null);
    const lastScrollTopRef = useRef(0);

    // State
    const [localScrollInfo, setLocalScrollInfo] =
      useState<ScrollInfo>(DEFAULT_SCROLL_INFO);
    const [isVisible, setIsVisible] = useState(true);
    const [state, setState] = useState<AffixState>(() => ({
      affixed: ssr?.initialAffixed ?? false,
      position: ssr?.initialPosition ?? "none",
      placeholderHeight: 0,
      placeholderWidth: 0,
      scrollDirection: "none",
      scrollDirectionX: "none",
      scrollProgress: 0,
      scrollVelocity: 0,
      boundaryReached: false,
      boundaryElement: null,
      isInitialized: false,
      isHydrated: false,
      springValue: 0,
      springVelocity: 0,
    }));
    const [forcedAffixState, setForcedAffixState] = useState<boolean | null>(
      null
    );
    const [currentStackOffset, setCurrentStackOffset] = useState(0);

    // External Hooks
    const breakpoint = useBreakpoint();
    const orientation = useOrientation();
    const prefersReducedMotion = useReducedMotion();
    const isHydrated = useHydration();
    const stickySupported = useStickySupport();
    const groupContext = useAffixGroup();

    const {
      recordUpdate,
      recordScrollEvent,
      recordResizeEvent,
      getMetrics,
      resetMetrics,
    } = usePerformanceMetrics(exposeMetrics);

    const resolvedOffsetTop = useOffsetValue(offsetTop, localScrollInfo);
    const resolvedOffsetBottom = useOffsetValue(offsetBottom, localScrollInfo);
    const resolvedOffsetLeft = useOffsetValue(offsetLeft, localScrollInfo);
    const resolvedOffsetRight = useOffsetValue(offsetRight, localScrollInfo);

    const debugConfig = useMemo(() => parseDebugConfig(debug), [debug]);

    const physicsConfig = useMemo<PhysicsConfig | null>(() => {
      if (!physics) return null;
      if (physics === true) return { stiffness: 100, damping: 10, mass: 1 };
      return physics;
    }, [physics]);

    const initialState = useMemo<AffixState>(
      () => ({
        affixed: ssr?.initialAffixed ?? false,
        position: ssr?.initialPosition ?? "none",
        placeholderHeight: 0,
        placeholderWidth: 0,
        scrollDirection: "none",
        scrollDirectionX: "none",
        scrollProgress: 0,
        scrollVelocity: 0,
        boundaryReached: false,
        boundaryElement: null,
        isInitialized: false,
        isHydrated: false,
        springValue: 0,
        springVelocity: 0,
      }),
      [ssr]
    );

    // Computed values
    const isUsingContainer = target !== undefined;
    const hasDirectionBasedVisibility = affixOnScrollUp || affixOnScrollDown;

    // Use sticky for container-based targets
    const shouldUseSticky = useMemo(() => {
      if (isUsingContainer) return true;
      if (useSticky) return true;
      if (stickyWithFallback) return stickySupported;
      return false;
    }, [isUsingContainer, useSticky, stickyWithFallback, stickySupported]);

    const shouldDisable = useMemo(() => {
      if (disabled) return true;
      if (disabledBreakpoints?.includes(breakpoint as BreakpointKey))
        return true;
      if (
        enabledBreakpoints &&
        !enabledBreakpoints.includes(breakpoint as BreakpointKey)
      )
        return true;
      if (disableInLandscape && orientation === "landscape") return true;
      if (disableInPortrait && orientation === "portrait") return true;
      return false;
    }, [
      disabled,
      disabledBreakpoints,
      enabledBreakpoints,
      breakpoint,
      disableInLandscape,
      disableInPortrait,
      orientation,
    ]);

    const shouldAnimate = !(respectReducedMotion && prefersReducedMotion);

    const transitionStyle = useMemo(
      () =>
        buildTransitionStyle(
          shouldAnimate ? transition : false,
          prefersReducedMotion && respectReducedMotion
        ),
      [shouldAnimate, transition, prefersReducedMotion, respectReducedMotion]
    );

    const intersectionOptions = useMemo(
      () =>
        useIO
          ? {
              threshold: intersectionThreshold as number | number[],
              rootMargin: intersectionRootMargin,
            }
          : undefined,
      [useIO, intersectionThreshold, intersectionRootMargin]
    );

    const Comp = asChild ? Slot : "div";

    const portalContainer = useMemo(() => {
      if (!portal || !state.affixed) return null;
      if (typeof window === "undefined") return null;
      if (portal === true) return document.body;
      if (typeof portal === "string") return document.querySelector(portal);
      return portal;
    }, [portal, state.affixed]);

    // ============================================
    // CALLBACKS
    // ============================================

    const getTarget = useCallback((): HTMLElement | Window => {
      if (!target) return window;
      if (typeof target === "function") return target() || window;
      return target;
    }, [target]);

    const calculateDimensions = useCallback(() => {
      if (!preserveAspectRatio || !originalDimensionsRef.current) {
        return {
          width: state.placeholderWidth,
          height: state.placeholderHeight,
        };
      }
      const { width: origWidth, height: origHeight } =
        originalDimensionsRef.current;
      return applyAspectRatioConstraint(
        state.placeholderWidth,
        origWidth,
        origHeight
      );
    }, [preserveAspectRatio, state.placeholderWidth, state.placeholderHeight]);

    const dimensions = useMemo(
      () => calculateDimensions(),
      [calculateDimensions]
    );

    const checkBoundary = useCallback((): {
      reached: boolean;
      element: HTMLElement | null;
    } => {
      if (!boundaryElement) return { reached: false, element: null };
      const boundaryEl = getElement(boundaryElement);
      if (!boundaryEl || !elementRef.current)
        return { reached: false, element: null };
      const boundaryRect = boundaryEl.getBoundingClientRect();
      const contentRect = elementRef.current.getBoundingClientRect();
      const offset = resolvedOffsetTop || 0;
      return {
        reached: boundaryRect.top <= contentRect.height + offset,
        element: boundaryEl,
      };
    }, [boundaryElement, resolvedOffsetTop]);

    // Main scroll handler
    const handleScrollUpdate = useCallback(() => {
      const targetElement = getTarget();

      let scrollTop = 0;
      let scrollHeight = 0;
      let clientHeight = 0;

      if (targetElement === window) {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      } else {
        const element = targetElement as HTMLElement;
        scrollTop = element.scrollTop;
        scrollHeight = element.scrollHeight;
        clientHeight = element.clientHeight;
      }

      const scrollDelta = scrollTop - lastScrollTopRef.current;
      let direction: ScrollDirection = "none";

      // Threshold to avoid jitter
      if (Math.abs(scrollDelta) > 2) {
        direction = scrollDelta > 0 ? "down" : "up";
      }

      const maxScrollTop = Math.max(scrollHeight - clientHeight, 1);
      const scrollProgress = scrollTop / maxScrollTop;

      const newScrollInfo: ScrollInfo = {
        ...DEFAULT_SCROLL_INFO,
        scrollTop,
        scrollHeight,
        clientHeight,
        scrollProgress,
        direction,
        velocity: Math.abs(scrollDelta),
        isAtTop: scrollTop <= 1,
        isAtBottom: scrollTop >= maxScrollTop - 1,
      };

      setLocalScrollInfo(newScrollInfo);

      // Direction-based visibility
      if (hasDirectionBasedVisibility && direction !== "none") {
        const shouldBeVisible =
          (affixOnScrollUp && direction === "up") ||
          (affixOnScrollDown && direction === "down");
        setIsVisible(shouldBeVisible);

        if (debugConfig.logStateChanges) {
          console.log("[Affix Direction]", {
            direction,
            shouldBeVisible,
            scrollDelta,
          });
        }
      }

      if (
        onDirectionChange &&
        direction !== "none" &&
        direction !== previousDirectionRef.current
      ) {
        onDirectionChange(direction, previousDirectionRef.current);
        previousDirectionRef.current = direction;
      }

      if (onScroll) onScroll(newScrollInfo);

      lastScrollTopRef.current = scrollTop;
      return { scrollTop, direction, scrollProgress };
    }, [
      getTarget,
      hasDirectionBasedVisibility,
      affixOnScrollUp,
      affixOnScrollDown,
      onDirectionChange,
      onScroll,
      debugConfig.logStateChanges,
    ]);

    // Calculate affix state
    const calculateAffixState = useCallback(() => {
      if (!elementRef.current) return;

      if (forcedAffixState !== null) {
        setState((prev) => ({
          ...prev,
          affixed: forcedAffixState,
          position: forcedAffixState
            ? resolvedOffsetTop !== undefined
              ? "top"
              : "bottom"
            : "none",
          isInitialized: true,
          isHydrated: true,
        }));
        return;
      }

      if (shouldDisable) {
        setState((prev) => ({ ...prev, affixed: false, position: "none" }));
        return;
      }

      const startTime = performance.now();
      recordScrollEvent();

      const { scrollTop } = handleScrollUpdate();
      const targetElement = getTarget();
      const contentRect = elementRef.current.getBoundingClientRect();

      if (!originalDimensionsRef.current) {
        originalDimensionsRef.current = {
          width: contentRect.width,
          height: contentRect.height,
        };
      }

      let clientHeight = 0;
      let clientWidth = 0;

      if (targetElement === window) {
        clientHeight = window.innerHeight;
        clientWidth = window.innerWidth;
      } else {
        const element = targetElement as HTMLElement;
        clientHeight = element.clientHeight;
        clientWidth = element.clientWidth;
      }

      if (respectViewportHeight && contentRect.height > clientHeight) {
        setState((prev) => ({ ...prev, affixed: false, position: "none" }));
        return;
      }
      if (respectViewportWidth && contentRect.width > clientWidth) {
        setState((prev) => ({ ...prev, affixed: false, position: "none" }));
        return;
      }

      if (minScrollPosition !== undefined && scrollTop < minScrollPosition) {
        setState((prev) => ({ ...prev, affixed: false, position: "none" }));
        return;
      }
      if (maxScrollPosition !== undefined && scrollTop > maxScrollPosition) {
        setState((prev) => ({ ...prev, affixed: false, position: "none" }));
        return;
      }

      if (minVelocity !== undefined && localScrollInfo.velocity < minVelocity)
        return;
      if (maxVelocity !== undefined && localScrollInfo.velocity > maxVelocity)
        return;

      if (containerBounds) {
        const boundsElement = getElement(containerBounds);
        if (
          boundsElement &&
          !isWithinContainerBounds(
            contentRect,
            boundsElement.getBoundingClientRect()
          )
        ) {
          setState((prev) => ({ ...prev, affixed: false, position: "none" }));
          return;
        }
      }

      // For sticky, we're always "affixed" once it's initialized
      let newAffixed = true;
      let newPosition: AffixPosition =
        resolvedOffsetTop !== undefined ? "top" : "bottom";

      if (customPosition) {
        const customResult = customPosition(localScrollInfo, contentRect, null);
        if (customResult) {
          newAffixed = true;
          if (customResult.top !== undefined) newPosition = "top";
          else if (customResult.bottom !== undefined) newPosition = "bottom";
          else if (customResult.left !== undefined) newPosition = "left";
          else if (customResult.right !== undefined) newPosition = "right";
        }
      }

      if (biDirectional) {
        if (localScrollInfo.direction === "up") newPosition = "top";
        else if (localScrollInfo.direction === "down") newPosition = "bottom";
      }

      const { reached: boundaryReached, element: boundaryEl } = checkBoundary();

      const finalAffixed =
        controlledAffixed !== undefined ? controlledAffixed : newAffixed;

      setState((prev) => {
        const stateChanged =
          prev.affixed !== finalAffixed ||
          prev.position !== newPosition ||
          prev.boundaryReached !== boundaryReached;
        if (!stateChanged) return prev;

        if (preserveFocus && prev.affixed !== finalAffixed) {
          if (finalAffixed)
            focusedElementRef.current = document.activeElement as HTMLElement;
          else if (focusedElementRef.current) {
            focusedElementRef.current.focus();
            focusedElementRef.current = null;
          }
        }

        if (announceStateChange && prev.affixed !== finalAffixed) {
          const message = stateChangeAnnouncement
            ? stateChangeAnnouncement(finalAffixed)
            : finalAffixed
            ? "Element is now fixed to viewport"
            : "Element is no longer fixed";
          announceToScreenReader(message);
        }

        if (onChange && prev.affixed !== finalAffixed)
          onChange(finalAffixed, newPosition);

        if (onBoundaryReached && boundaryReached && !prev.boundaryReached) {
          onBoundaryReached({
            boundary: "element",
            element: boundaryEl || undefined,
            position: {
              top: contentRect.top,
              left: contentRect.left,
              width: contentRect.width,
              height: contentRect.height,
            },
          });
        }

        if (groupContext && prev.affixed !== finalAffixed) {
          groupContext.notifyStateChange(
            affixId,
            finalAffixed,
            contentRect.height
          );
        }

        if (debugConfig.logStateChanges) {
          console.log("[Affix State]", {
            affixed: finalAffixed,
            position: newPosition,
            boundaryReached,
            isVisible,
          });
        }

        return {
          ...prev,
          affixed: finalAffixed,
          position: newPosition,
          placeholderHeight: contentRect.height,
          placeholderWidth: contentRect.width,
          scrollDirection: localScrollInfo.direction,
          scrollProgress: localScrollInfo.scrollProgress,
          scrollVelocity: localScrollInfo.velocity,
          boundaryReached,
          boundaryElement: boundaryEl,
          isInitialized: true,
          isHydrated: true,
        };
      });

      if (onPositionChange) {
        onPositionChange({
          top: contentRect.top,
          left: contentRect.left,
          width: contentRect.width,
          height: contentRect.height,
          affixedTop: finalAffixed ? resolvedOffsetTop : undefined,
          affixedLeft: finalAffixed ? resolvedOffsetLeft : undefined,
        });
      }

      recordUpdate(startTime);
    }, [
      forcedAffixState,
      shouldDisable,
      getTarget,
      handleScrollUpdate,
      localScrollInfo,
      resolvedOffsetTop,
      resolvedOffsetLeft,
      respectViewportHeight,
      respectViewportWidth,
      minScrollPosition,
      maxScrollPosition,
      minVelocity,
      maxVelocity,
      biDirectional,
      containerBounds,
      controlledAffixed,
      customPosition,
      preserveFocus,
      announceStateChange,
      stateChangeAnnouncement,
      onChange,
      onBoundaryReached,
      onPositionChange,
      groupContext,
      affixId,
      debugConfig,
      recordScrollEvent,
      recordUpdate,
      checkBoundary,
      isVisible,
    ]);

    const updateSpringAnimation = useCallback(() => {
      if (!physicsConfig || !state.affixed) {
        if (springAnimationRef.current) {
          cancelAnimationFrame(springAnimationRef.current);
          springAnimationRef.current = null;
        }
        return;
      }
      const targetValue = resolvedOffsetTop || 0;
      const { value: newValue, velocity: newVelocity } = calculateSpringValue(
        state.springValue || 0,
        targetValue,
        state.springVelocity || 0,
        physicsConfig
      );
      if (isSpringSettled(newValue, targetValue, newVelocity)) {
        setState((prev) => ({
          ...prev,
          springValue: targetValue,
          springVelocity: 0,
        }));
        springAnimationRef.current = null;
        return;
      }
      setState((prev) => ({
        ...prev,
        springValue: newValue,
        springVelocity: newVelocity,
      }));
      springAnimationRef.current = requestAnimationFrame(updateSpringAnimation);
    }, [
      physicsConfig,
      state.affixed,
      state.springValue,
      state.springVelocity,
      resolvedOffsetTop,
    ]);

    const throttledUpdate = useThrottle(calculateAffixState, throttleMs || 16);
    const debouncedUpdate = useDebounce(calculateAffixState, debounceMs || 0);

    const updateFunction = useMemo(() => {
      if (debounceMs) return debouncedUpdate;
      if (throttleMs) return throttledUpdate;
      return calculateAffixState;
    }, [
      debounceMs,
      throttleMs,
      debouncedUpdate,
      throttledUpdate,
      calculateAffixState,
    ]);

    const handleResize = useCallback(() => {
      recordResizeEvent();
      originalDimensionsRef.current = null;
      updateFunction();
    }, [recordResizeEvent, updateFunction]);

    useResizeObserver(elementRef, handleResize, useRO);

    const intersectionEntry = useIntersectionObserver(
      elementRef,
      intersectionOptions,
      useIO
    );

    // ============================================
    // EFFECTS
    // ============================================

    useEffect(() => {
      if (!useIO || !intersectionEntry) return;
      const isIntersecting = intersectionEntry.isIntersecting;
      if (isIntersecting && !wasInViewportRef.current) {
        wasInViewportRef.current = true;
        onEnterViewport?.();
      } else if (!isIntersecting && wasInViewportRef.current) {
        wasInViewportRef.current = false;
        onLeaveViewport?.();
      }
    }, [useIO, intersectionEntry, onEnterViewport, onLeaveViewport]);

    useEffect(() => {
      if (physicsConfig && state.affixed && !springAnimationRef.current) {
        springAnimationRef.current = requestAnimationFrame(
          updateSpringAnimation
        );
      }
      return () => {
        if (springAnimationRef.current)
          cancelAnimationFrame(springAnimationRef.current);
      };
    }, [physicsConfig, state.affixed, updateSpringAnimation]);

    useEffect(() => {
      if (groupContext && autoStack)
        setCurrentStackOffset(groupContext.getStackOffset(affixId));
    }, [
      groupContext,
      autoStack,
      affixId,
      groupContext?.updateTrigger,
      state.affixed,
    ]);

    useEffect(() => {
      if (shouldDisable) return;
      const targetElement = getTarget();
      updateFunction();

      const handleScroll = () =>
        useRAF ? requestAnimationFrame(updateFunction) : updateFunction();
      const handleResizeEvent = () => {
        recordResizeEvent();
        updateFunction();
      };
      const options = { passive };

      if (targetElement === window) {
        window.addEventListener("scroll", handleScroll, options);
        window.addEventListener("resize", handleResizeEvent, options);
      } else {
        (targetElement as HTMLElement).addEventListener(
          "scroll",
          handleScroll,
          options
        );
        window.addEventListener("resize", handleResizeEvent, options);
      }

      return () => {
        if (targetElement === window) {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", handleResizeEvent);
        } else {
          (targetElement as HTMLElement).removeEventListener(
            "scroll",
            handleScroll
          );
          window.removeEventListener("resize", handleResizeEvent);
        }
      };
    }, [
      getTarget,
      updateFunction,
      shouldDisable,
      useRAF,
      passive,
      recordResizeEvent,
    ]);

    useEffect(() => {
      if (!groupContext || !autoStack) return;
      const height = elementRef.current?.getBoundingClientRect().height || 0;
      groupContext.registerAffix(
        affixId,
        stackPriority,
        height,
        elementRef.current
      );
      return () => groupContext.unregisterAffix(affixId);
    }, [groupContext, autoStack, affixId, stackPriority]);

    useEffect(() => {
      if (groupContext && autoStack) {
        const height = elementRef.current?.getBoundingClientRect().height || 0;
        groupContext.notifyStateChange(affixId, state.affixed, height);
      }
    }, [groupContext, autoStack, affixId, state.affixed]);

    useEffect(() => {
      if (hydrateOnMount && isHydrated && !state.isInitialized)
        updateFunction();
    }, [hydrateOnMount, isHydrated, state.isInitialized, updateFunction]);

    useEffect(() => {
      if (exposeMetrics && onMetricsUpdate) {
        const interval = setInterval(() => onMetricsUpdate(getMetrics()), 1000);
        return () => clearInterval(interval);
      }
      return undefined;
    }, [exposeMetrics, onMetricsUpdate, getMetrics]);

    // Imperative handle
    useImperativeHandle(
      ref,
      () => ({
        updatePosition: () => {
          setForcedAffixState(null);
          updateFunction();
        },
        forceAffix: (affixed: boolean) => {
          setForcedAffixState(affixed);
          setIsVisible(true);
          setState((prev) => ({
            ...prev,
            affixed,
            position: affixed
              ? resolvedOffsetTop !== undefined
                ? "top"
                : "bottom"
              : "none",
          }));
          if (groupContext && autoStack) {
            const height =
              elementRef.current?.getBoundingClientRect().height || 0;
            groupContext.notifyStateChange(affixId, affixed, height);
          }
          if (onChange)
            onChange(
              affixed,
              affixed
                ? resolvedOffsetTop !== undefined
                  ? "top"
                  : "bottom"
                : "none"
            );
        },
        reset: () => {
          setForcedAffixState(null);
          setIsVisible(true);
          setState(initialState);
          resetMetrics();
          originalDimensionsRef.current = null;
          lastScrollTopRef.current = 0;
        },
        getState: () => state,
        getScrollInfo: () => localScrollInfo,
        getMetrics: (): PerformanceMetrics => getMetrics(),
        isAffixed: () => state.affixed && isVisible,
        scrollIntoView: (options?: ScrollIntoViewOptions) =>
          elementRef.current?.scrollIntoView(options),
      }),
      [
        updateFunction,
        state,
        localScrollInfo,
        getMetrics,
        resetMetrics,
        initialState,
        resolvedOffsetTop,
        isVisible,
        groupContext,
        autoStack,
        affixId,
        onChange,
      ]
    );

    // ============================================
    // RENDER HELPERS
    // ============================================

    const effectiveOffset = (resolvedOffsetTop || 0) + currentStackOffset;
    const showContent = !hasDirectionBasedVisibility || isVisible;
    const shadowStyle = buildShadowStyle(
      shadow,
      showContent && !state.boundaryReached
    );
    const backdropStyle = buildBackdropStyle(
      backdrop,
      showContent && !state.boundaryReached
    );

    const renderIndicator = () => {
      if (!indicator) return null;
      if (typeof indicator === "function") return indicator(showContent);
      return (
        <div
          className={cn(
            affixIndicatorVariants({
              position: state.position === "none" ? undefined : state.position,
              visible: showContent,
            })
          )}
        >
          {indicator}
        </div>
      );
    };

    const renderDebug = () => {
      if (!debugConfig.enabled) return null;
      return (
        <div className={cn(affixDebugVariants({ position: "topRight" }))}>
          <div
            className="p-2 rounded bg-black/90 text-white space-y-0.5 text-[10px] leading-tight"
            style={{ minWidth: 160 }}
          >
            <div className="font-bold border-b border-white/20 pb-1 mb-1">
              Affix Debug
            </div>
            {debugConfig.showScrollInfo && (
              <>
                <div>Scroll: {localScrollInfo.scrollTop.toFixed(0)}px</div>
                <div>
                  Dir:{" "}
                  <span
                    className={
                      localScrollInfo.direction === "up"
                        ? "text-green-400"
                        : localScrollInfo.direction === "down"
                        ? "text-red-400"
                        : "text-gray-400"
                    }
                  >
                    {localScrollInfo.direction}
                  </span>
                </div>
                <div>
                  Progress: {(localScrollInfo.scrollProgress * 100).toFixed(0)}%
                </div>
              </>
            )}
            {debugConfig.showPositionInfo && (
              <>
                <div>
                  Mode:{" "}
                  <span className="text-yellow-400">
                    {shouldUseSticky ? "STICKY" : "FIXED"}
                  </span>
                </div>
                <div>Visible: {isVisible ? "✓" : "✗"}</div>
                <div>showContent: {showContent ? "✓" : "✗"}</div>
                <div>Boundary: {state.boundaryReached ? "✓" : "✗"}</div>
                <div>Offset: {effectiveOffset}px</div>
                <div>↑ Up: {affixOnScrollUp ? "✓" : "✗"}</div>
                <div>↓ Down: {affixOnScrollDown ? "✓" : "✗"}</div>
              </>
            )}
          </div>
        </div>
      );
    };

    // ============================================
    // STICKY MODE RENDER
    // ============================================

    if (shouldUseSticky) {
      // For sticky mode, we render a SINGLE element without wrapper
      // This is critical for sticky positioning to work correctly
      const stickyStyles: React.CSSProperties = {
        position: state.boundaryReached ? "relative" : "sticky",
        top:
          resolvedOffsetTop !== undefined && !state.boundaryReached
            ? `${effectiveOffset}px`
            : undefined,
        bottom:
          resolvedOffsetBottom !== undefined && !state.boundaryReached
            ? `${resolvedOffsetBottom}px`
            : undefined,
        left:
          resolvedOffsetLeft !== undefined
            ? `${resolvedOffsetLeft}px`
            : undefined,
        right:
          resolvedOffsetRight !== undefined
            ? `${resolvedOffsetRight}px`
            : undefined,
        zIndex: state.boundaryReached ? undefined : zIndex,
        // Visibility transition for direction-based hiding
        transition:
          "transform 0.25s ease-out, opacity 0.25s ease-out, box-shadow 0.25s ease-out",
        transform:
          hasDirectionBasedVisibility && !isVisible
            ? "translateY(-100%)"
            : "translateY(0)",
        opacity: hasDirectionBasedVisibility && !isVisible ? 0 : 1,
        pointerEvents:
          hasDirectionBasedVisibility && !isVisible ? "none" : "auto",
        // Visual effects
        boxShadow:
          showContent && !state.boundaryReached ? shadowStyle : undefined,
        backdropFilter:
          showContent && !state.boundaryReached ? backdropStyle : undefined,
        backgroundColor:
          backdrop &&
          typeof backdrop === "object" &&
          backdrop.backgroundColor &&
          showContent &&
          !state.boundaryReached
            ? backdrop.backgroundColor
            : undefined,
        // Max height
        maxHeight: maxHeight,
        overflow: maxHeight ? "auto" : undefined,
        ...affixedStyle,
      };

      return (
        <Comp
          ref={elementRef}
          className={cn(
            affixContentVariants({ useTransform }),
            className,
            contentClassName,
            showContent && !state.boundaryReached && affixedClassName
          )}
          style={stickyStyles}
          data-affix-id={affixId}
          data-affix-mode="sticky"
          data-affix-visible={isVisible}
          data-affix-boundary={state.boundaryReached}
          tabIndex={showContent ? affixedTabIndex : undefined}
          {...props}
        >
          {children}
          {renderIndicator()}
          {renderDebug()}
        </Comp>
      );
    }

    // ============================================
    // FIXED MODE RENDER (Window scroll)
    // ============================================

    const fixedStyles: React.CSSProperties = {
      transition: transitionStyle,
    };

    const isActivelyFixed =
      state.affixed && showContent && !state.boundaryReached;

    if (isActivelyFixed) {
      fixedStyles.position = "fixed";
      fixedStyles.zIndex = zIndex;

      const offsetValue = physicsConfig
        ? state.springValue || resolvedOffsetTop || 0
        : effectiveOffset;

      if (state.position === "top" && resolvedOffsetTop !== undefined) {
        fixedStyles.top = useTransform ? 0 : `${offsetValue}px`;
        if (useTransform)
          fixedStyles.transform = `translateY(${offsetValue}px)`;
      }
      if (state.position === "bottom" && resolvedOffsetBottom !== undefined) {
        fixedStyles.bottom = useTransform ? 0 : `${resolvedOffsetBottom}px`;
        if (useTransform)
          fixedStyles.transform = `translateY(-${resolvedOffsetBottom}px)`;
      }
      if (state.position === "left" && resolvedOffsetLeft !== undefined)
        fixedStyles.left = `${resolvedOffsetLeft}px`;
      if (state.position === "right" && resolvedOffsetRight !== undefined)
        fixedStyles.right = `${resolvedOffsetRight}px`;

      fixedStyles.width = calculateWidth(
        widthMode,
        state.placeholderWidth,
        typeof window !== "undefined" ? window.innerWidth : 0
      );
      if (maxHeight) {
        fixedStyles.maxHeight = maxHeight;
        fixedStyles.overflow = "auto";
      }
      if (preserveAspectRatio && originalDimensionsRef.current)
        fixedStyles.height = `${dimensions.height}px`;
      if (shadow) fixedStyles.boxShadow = shadowStyle;
      if (backdrop) {
        fixedStyles.backdropFilter = backdropStyle;
        if (typeof backdrop === "object" && backdrop.backgroundColor)
          fixedStyles.backgroundColor = backdrop.backgroundColor;
      }
      Object.assign(fixedStyles, affixedStyle);
    }

    const contentElement = (
      <Comp
        ref={elementRef}
        className={cn(
          affixContentVariants({ useTransform }),
          isActivelyFixed && affixedClassName,
          contentClassName
        )}
        style={fixedStyles}
        tabIndex={isActivelyFixed ? affixedTabIndex : undefined}
        aria-hidden={shouldDisable}
        data-affix-mode="fixed"
        data-affix-active={isActivelyFixed}
      >
        {children}
        {renderIndicator()}
        {renderDebug()}
      </Comp>
    );

    return (
      <div className={className} data-affix-id={affixId} {...props}>
        {/* Placeholder for layout stability when fixed */}
        {isActivelyFixed && (
          <div
            ref={placeholderRef}
            className={cn(
              affixPlaceholderVariants({ visible: true }),
              placeholderClassName
            )}
            style={{
              height: `${dimensions.height}px`,
              width: `${dimensions.width}px`,
            }}
            aria-hidden="true"
          />
        )}
        {portalContainer
          ? createPortal(contentElement, portalContainer)
          : contentElement}
      </div>
    );
  }
);

Affix.displayName = "Affix";

export { Affix };
export default Affix;
