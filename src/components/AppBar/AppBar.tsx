"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { Slot } from "../../lib/Slot";
import type { AppBarProps } from "./AppBar.types";
import {
  appBarVariants,
  appBarInnerVariants,
  appBarContentVariants,
  appBarScrollVariants,
  appBarEntranceVariants,
  appBarSecondaryRowVariants,
} from "./AppBar.styles";
import { AppBarProvider } from "./AppBar.context";
import {
  useAppBarScroll,
  useIsMobile,
  useReducedMotion,
  useBodyScrollLock,
  useResizeObserver,
  useCommandPalette,
  useKeyboardShortcuts,
  useFocusTrap,
  useEntranceAnimation,
} from "./AppBar.hooks";
import {
  AppBarProgress,
  AppBarSearch,
  AppBarAnnouncement,
  AppBarTitle,
  AppBarBreadcrumbs,
  SkipToContent,
  AppBarSlot,
  AppBarBackButton,
  AppBarMenuButton,
} from "./AppBar.components";

// ============================================================================
// Helper: Combine Refs
// ============================================================================

function useCombinedRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return useCallback(
    (element: T) => {
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref === "function") {
          ref(element);
        } else {
          (ref as React.MutableRefObject<T | null>).current = element;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}

// ============================================================================
// Main AppBar Component
// ============================================================================

const AppBar = React.forwardRef<HTMLElement, AppBarProps>(
  (
    {
      // Position & Layout
      position = "static",
      fullWidth = true,
      centered = false,
      maxWidth = "full",
      size = "md",
      zIndex = 1100,

      // Visual Style
      variant = "default",
      color = "default",
      elevation = 0,
      blur = false,
      glass = false,
      glassIntensity = 0.8,
      gradient,
      gradientDirection = "right",
      lightShadow: _lightShadow,
      darkShadow: _darkShadow,

      // Scroll Behavior
      hideOnScroll = false,
      colorOnScroll = false,
      scrollThreshold = 50,
      shrinkOnScroll = false,
      elevateOnScroll = false,
      scrollContainer,
      scrollDebounce,
      scrollThrottle,
      useIntersectionObserver = false,

      // Progress
      showProgress = false,
      progressValue,
      progressVariant = "indeterminate",
      progressColor,
      progressPosition = "bottom",

      // Slots & Content
      startContent,
      centerContent,
      endContent,
      secondaryContent,
      bottomContent,
      children,

      // Title & Navigation
      title,
      titleTruncate = true,
      titleMaxWidth,
      subtitle,
      breadcrumbs,
      showBackButton = false,
      onBack,
      backIcon,
      backLabel,
      navigationIcon,
      onNavigationClick,

      // Announcement
      announcement,
      announcementDismissible = true,
      onAnnouncementDismiss,
      announcementColor,
      announcementTextColor,

      // Search
      searchable = false,
      searchExpanded = false,
      onSearchToggle,
      onSearch,
      onSearchChange,
      searchPlaceholder,
      defaultSearchValue,
      searchContent,
      searchIcon,

      // Mobile
      safeAreaInsets = false,
      mobileMenuOpen = false,
      onMobileMenuToggle,
      lockScroll = true,
      mobileBreakpoint = 768,
      collapsible: _collapsible,
      collapsed = false,
      onCollapseToggle: _onCollapseToggle,

      // Responsive
      responsive,

      // Accessibility
      skipToContent = true,
      skipToContentLabel,
      mainContentId = "main-content",
      trapFocus = false,
      restoreFocus = true,
      ariaLabel,

      // Animation
      animation = "slide",
      animationDuration = 300,
      entrance = "none",
      easing = "ease-out",
      respectReducedMotion = true,

      // Tabs
      tabs,
      tabsPosition = "bottom",

      // Secondary
      secondary = false,
      parentOffset,

      // Keyboard
      shortcuts = [],
      commandPalette = false,
      onCommandPaletteOpen,
      commandPaletteShortcut = "mod+k",

      // Portal & Rendering
      portal = false,
      portalContainer,
      renderWhen = true,
      hideOnPrint = true,

      // Resize
      onResize,
      onHeightChange,
      observeResize = false,

      // Composition
      asChild = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // ========================================================================
    // Refs
    // ========================================================================
    const appBarRef = useRef<HTMLElement | null>(null);
    const combinedRef = useCombinedRefs(ref, appBarRef);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    // ========================================================================
    // Hooks
    // ========================================================================
    const isMobile = useIsMobile(mobileBreakpoint);
    const prefersReducedMotion = useReducedMotion();
    const shouldReduceMotion = respectReducedMotion && prefersReducedMotion;

    const scrollState = useAppBarScroll({
      threshold: scrollThreshold,
      hideOnScroll,
      shrinkOnScroll,
      elevateOnScroll,
      colorOnScroll,
      scrollContainer,
      debounceMs: scrollDebounce,
      throttleMs: scrollThrottle,
      useIntersectionObserver,
    });

    const { height: appBarHeight, ref: resizeRef } = useResizeObserver();

    const entranceMounted = useEntranceAnimation(
      shouldReduceMotion ? "none" : entrance
    );

    useBodyScrollLock(lockScroll && mobileMenuOpen);
    useFocusTrap(appBarRef, trapFocus && mobileMenuOpen);
    useCommandPalette(
      commandPalette && !!onCommandPaletteOpen,
      commandPaletteShortcut,
      onCommandPaletteOpen || (() => {})
    );
    useKeyboardShortcuts(shortcuts);

    // ========================================================================
    // Computed Values
    // ========================================================================

    const shouldRender = useMemo(() => {
      return typeof renderWhen === "function" ? renderWhen() : renderWhen;
    }, [renderWhen]);

    const responsiveProps = useMemo(() => {
      if (!responsive) return {};
      const breakpoint = isMobile ? "sm" : "lg";
      return responsive[breakpoint] || {};
    }, [responsive, isMobile]);

    const effectiveSize = responsiveProps.size || size;
    const effectiveVariant = responsiveProps.variant || variant;
    const effectiveBlur = responsiveProps.blur ?? blur;
    const effectiveHideOnScroll = responsiveProps.hideOnScroll ?? hideOnScroll;

    const currentElevation = useMemo(() => {
      if (
        scrollState.isElevated ||
        (elevateOnScroll && scrollState.isScrolled)
      ) {
        return Math.min((elevation || 0) + 2, 4) as 0 | 1 | 2 | 3 | 4;
      }
      return elevation;
    }, [
      elevation,
      scrollState.isElevated,
      scrollState.isScrolled,
      elevateOnScroll,
    ]);

    const currentColor = useMemo(() => {
      if (colorOnScroll && scrollState.shouldChangeColor) {
        return "default";
      }
      return color;
    }, [color, colorOnScroll, scrollState.shouldChangeColor]);

    const animationStyle = useMemo(
      () => ({
        transitionDuration: shouldReduceMotion
          ? "0ms"
          : `${animationDuration}ms`,
        transitionTimingFunction:
          easing === "spring"
            ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            : easing,
      }),
      [shouldReduceMotion, animationDuration, easing]
    );

    const gradientStyle = useMemo(() => {
      if (!gradient) return {};
      const directions: Record<string, string> = {
        left: "to left",
        right: "to right",
        top: "to top",
        bottom: "to bottom",
        diagonal: "to bottom right",
      };
      return {
        background: `linear-gradient(${directions[gradientDirection]}, ${gradient})`,
      };
    }, [gradient, gradientDirection]);

    const glassStyle = useMemo(() => {
      if (!glass) return {};
      return {
        backgroundColor: `rgba(var(--background), ${glassIntensity})`,
      };
    }, [glass, glassIntensity]);

    const contextValue = useMemo(
      () => ({
        isScrolled: scrollState.isScrolled,
        isVisible: scrollState.isVisible,
        isShrunk: scrollState.isShrunk,
        height: appBarHeight,
        variant: effectiveVariant,
        color: currentColor,
        mobileMenuOpen,
        searchExpanded,
        collapsed,
        isMobile,
        scrollProgress: scrollState.scrollProgress,
      }),
      [
        scrollState.isScrolled,
        scrollState.isVisible,
        scrollState.isShrunk,
        scrollState.scrollProgress,
        appBarHeight,
        effectiveVariant,
        currentColor,
        mobileMenuOpen,
        searchExpanded,
        collapsed,
        isMobile,
      ]
    );

    const hasSlots = !!(startContent || centerContent || endContent);
    const hasTitle = !!(title || showBackButton || navigationIcon);
    const hasSecondaryContent = !!(
      secondaryContent ||
      bottomContent ||
      (tabs && tabsPosition === "bottom") ||
      breadcrumbs
    );

    // ========================================================================
    // Effects
    // ========================================================================

    useEffect(() => {
      if (observeResize && onHeightChange && appBarHeight > 0) {
        onHeightChange(appBarHeight);
      }
    }, [appBarHeight, observeResize, onHeightChange]);

    useEffect(() => {
      if (!onResize) return;
      const handleResize = () => {
        onResize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [onResize]);

    useEffect(() => {
      if (mobileMenuOpen) {
        previousFocusRef.current = document.activeElement as HTMLElement;
      } else if (restoreFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }, [mobileMenuOpen, restoreFocus]);

    // ========================================================================
    // Conditional Return
    // ========================================================================

    if (!shouldRender) return null;

    // ========================================================================
    // Render
    // ========================================================================

    const Comp = asChild ? Slot : "header";

    const appBarElement = (
      <AppBarProvider value={contextValue}>
        {skipToContent && (
          <SkipToContent label={skipToContentLabel} targetId={mainContentId} />
        )}

        <Comp
          ref={combinedRef}
          className={cn(
            appBarVariants({
              position,
              variant: effectiveVariant,
              color: currentColor,
              elevation: currentElevation,
              blur: effectiveBlur,
              fullWidth,
              secondary,
              safeArea: safeAreaInsets,
              hideOnPrint,
            }),
            effectiveHideOnScroll &&
              appBarScrollVariants({
                hidden: !scrollState.isVisible,
                animation: shouldReduceMotion ? "none" : animation,
              }),
            entrance !== "none" &&
              entranceMounted &&
              appBarEntranceVariants({ entrance }),
            !entranceMounted &&
              entrance !== "none" &&
              "opacity-0 -translate-y-full",
            className
          )}
          style={{
            zIndex,
            top: secondary && parentOffset ? parentOffset : undefined,
            ...animationStyle,
            ...gradientStyle,
            ...glassStyle,
            ...style,
          }}
          role="banner"
          aria-label={ariaLabel}
          {...props}
        >
          {/* Announcement Bar */}
          {announcement && (
            <AppBarAnnouncement
              dismissible={announcementDismissible}
              onDismiss={onAnnouncementDismiss}
              color={announcementColor}
              textColor={announcementTextColor}
            >
              {announcement}
            </AppBarAnnouncement>
          )}

          {/* Progress Bar - Top */}
          {showProgress && progressPosition === "top" && (
            <AppBarProgress
              value={progressValue}
              variant={progressVariant}
              color={progressColor}
              position="top"
            />
          )}

          {/* Main Content Area */}
          <div
            ref={resizeRef}
            className={cn(
              appBarInnerVariants({
                size: scrollState.isShrunk ? "sm" : effectiveSize,
                shrunk: scrollState.isShrunk,
                centered: centered && !hasSlots && !hasTitle,
              })
            )}
          >
            <div
              className={cn(
                appBarContentVariants({
                  maxWidth,
                  hasSlots: hasSlots || hasTitle,
                })
              )}
            >
              {hasSlots ? (
                <>
                  <AppBarSlot position="start">
                    {showBackButton && (
                      <AppBarBackButton
                        onClick={onBack}
                        icon={backIcon}
                        label={backLabel}
                      />
                    )}
                    {navigationIcon && (
                      <button
                        type="button"
                        onClick={onNavigationClick}
                        className="p-2 rounded-full hover:bg-accent/80 transition-colors"
                      >
                        {navigationIcon}
                      </button>
                    )}
                    {isMobile && onMobileMenuToggle && (
                      <AppBarMenuButton
                        open={mobileMenuOpen}
                        onClick={onMobileMenuToggle}
                      />
                    )}
                    {startContent}
                  </AppBarSlot>

                  <AppBarSlot position="center">
                    {searchable && searchExpanded ? (
                      searchContent || (
                        <AppBarSearch
                          expanded={searchExpanded}
                          onToggle={onSearchToggle}
                          onSearch={onSearch}
                          onChange={onSearchChange}
                          placeholder={searchPlaceholder}
                          defaultValue={defaultSearchValue}
                          icon={searchIcon}
                        />
                      )
                    ) : (
                      <>
                        {title && (
                          <AppBarTitle
                            subtitle={subtitle}
                            truncate={titleTruncate}
                            maxWidth={titleMaxWidth}
                          >
                            {title}
                          </AppBarTitle>
                        )}
                        {centerContent}
                      </>
                    )}
                  </AppBarSlot>

                  <AppBarSlot position="end">
                    {searchable && !searchExpanded && (
                      <AppBarSearch
                        expanded={false}
                        onToggle={onSearchToggle}
                        icon={searchIcon}
                      />
                    )}
                    {tabs && tabsPosition === "inline" && tabs}
                    {endContent}
                  </AppBarSlot>
                </>
              ) : hasTitle ? (
                <>
                  <AppBarSlot position="start">
                    {showBackButton && (
                      <AppBarBackButton
                        onClick={onBack}
                        icon={backIcon}
                        label={backLabel}
                      />
                    )}
                    {navigationIcon && (
                      <button
                        type="button"
                        onClick={onNavigationClick}
                        className="p-2 rounded-full hover:bg-accent/80 transition-colors"
                      >
                        {navigationIcon}
                      </button>
                    )}
                    {isMobile && onMobileMenuToggle && (
                      <AppBarMenuButton
                        open={mobileMenuOpen}
                        onClick={onMobileMenuToggle}
                      />
                    )}
                  </AppBarSlot>

                  <AppBarSlot position="center">
                    {title && (
                      <AppBarTitle
                        subtitle={subtitle}
                        truncate={titleTruncate}
                        maxWidth={titleMaxWidth}
                      >
                        {title}
                      </AppBarTitle>
                    )}
                  </AppBarSlot>

                  <AppBarSlot position="end">
                    {searchable && (
                      <AppBarSearch
                        expanded={searchExpanded}
                        onToggle={onSearchToggle}
                        onSearch={onSearch}
                        onChange={onSearchChange}
                        placeholder={searchPlaceholder}
                        defaultValue={defaultSearchValue}
                        icon={searchIcon}
                      />
                    )}
                    {tabs && tabsPosition === "inline" && tabs}
                  </AppBarSlot>
                </>
              ) : (
                children
              )}
            </div>
          </div>

          {/* Secondary Content Row */}
          {hasSecondaryContent && (
            <div
              className={cn(
                appBarSecondaryRowVariants({ size: effectiveSize })
              )}
            >
              <div
                className={cn(
                  appBarContentVariants({ maxWidth }),
                  "flex-wrap gap-2"
                )}
              >
                {breadcrumbs && <AppBarBreadcrumbs items={breadcrumbs} />}
                {tabs && tabsPosition === "bottom" && tabs}
                {secondaryContent}
                {bottomContent}
              </div>
            </div>
          )}

          {/* Progress Bar - Bottom */}
          {showProgress && progressPosition === "bottom" && (
            <AppBarProgress
              value={progressValue}
              variant={progressVariant}
              color={progressColor}
              position="bottom"
            />
          )}
        </Comp>
      </AppBarProvider>
    );

    if (portal) {
      const container = portalContainer || document.body;
      return createPortal(appBarElement, container);
    }

    return appBarElement;
  }
);

AppBar.displayName = "AppBar";

// ============================================================================
// Exports
// ============================================================================

export { AppBar };
export default AppBar;

export {
  AppBarProgress,
  AppBarSearch,
  AppBarAnnouncement,
  AppBarTitle,
  AppBarBreadcrumbs,
  SkipToContent,
  AppBarSlot,
  AppBarBackButton,
  AppBarMenuButton,
} from "./AppBar.components";

export { AppBarProvider, useAppBar, useAppBarOptional } from "./AppBar.context";

export {
  useAppBarScroll,
  useIsMobile,
  useReducedMotion,
  useBodyScrollLock,
  useResizeObserver,
  useKeyboardShortcuts,
  useCommandPalette,
  useFocusTrap,
  useEntranceAnimation,
} from "./AppBar.hooks";

export type { AppBarProps } from "./AppBar.types";
