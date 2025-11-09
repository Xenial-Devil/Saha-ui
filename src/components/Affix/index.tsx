"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { AffixProps, AffixState, AffixTarget } from "./Affix.types";
import {
  affixVariants,
  affixPlaceholderVariants,
  affixContentVariants,
} from "./Affix.styles";
import { Slot } from "../../lib/Slot";

export type AffixVariantsProps = VariantProps<typeof affixVariants>;

/**
 * Affix Component
 *
 * Makes an element stick to the viewport when scrolling.
 * Perfect for sticky headers, navigation, or floating action buttons.
 * Supports both top and bottom positioning.
 *
 * @example
 * ```tsx
 * // Basic affix to top
 * <Affix offsetTop={10}>
 *   <Button>Sticky Button</Button>
 * </Affix>
 *
 * // Affix to bottom
 * <Affix offsetBottom={20}>
 *   <Card>Sticky Card</Card>
 * </Affix>
 *
 * // With custom target container
 * <Affix offsetTop={0} target={() => document.getElementById('container')}>
 *   <div>Sticky Content</div>
 * </Affix>
 *
 * // With change callback
 * <Affix
 *   offsetTop={10}
 *   onChange={(affixed) => console.log('Affixed:', affixed)}
 * >
 *   <Navigation />
 * </Affix>
 *
 * // Using CSS sticky (better performance)
 * <Affix offsetTop={0} useSticky>
 *   <Header />
 * </Affix>
 * ```
 */
const Affix = React.forwardRef<HTMLDivElement, AffixProps>(
  (
    {
      children,
      offsetTop,
      offsetBottom,
      target,
      onChange,
      className,
      contentClassName,
      zIndex = 10,
      useSticky = false,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const [state, setState] = useState<AffixState>({
      affixed: false,
      position: null,
      placeholderHeight: 0,
      placeholderWidth: 0,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Get target element
    const getTarget = useCallback((): HTMLElement | Window => {
      if (!target) return window;
      if (typeof target === "function") return target();
      return target;
    }, [target]);

    // Calculate affix state
    const updateAffixState = useCallback(() => {
      if (!contentRef.current) return;

      const targetElement = getTarget();
      const contentRect = contentRef.current.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();

      let scrollTop = 0;
      let clientHeight = 0;

      if (targetElement === window) {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        clientHeight = window.innerHeight;
      } else {
        const element = targetElement as HTMLElement;
        scrollTop = element.scrollTop;
        clientHeight = element.clientHeight;
      }

      const elementTop = containerRect ? containerRect.top + scrollTop : contentRect.top + scrollTop;

      let newAffixed = false;
      let newPosition: "top" | "bottom" | null = null;

      // Check top affix
      if (offsetTop !== undefined) {
        const shouldAffixTop = scrollTop > elementTop - offsetTop;
        if (shouldAffixTop) {
          newAffixed = true;
          newPosition = "top";
        }
      }

      // Check bottom affix
      if (offsetBottom !== undefined && !newAffixed) {
        const elementBottom = elementTop + contentRect.height;
        const viewportBottom = scrollTop + clientHeight;
        const shouldAffixBottom = viewportBottom < elementBottom + offsetBottom;
        if (shouldAffixBottom) {
          newAffixed = true;
          newPosition = "bottom";
        }
      }

      // Update state if changed
      setState((prev) => {
        if (prev.affixed !== newAffixed || prev.position !== newPosition) {
          const newState = {
            affixed: newAffixed,
            position: newPosition,
            placeholderHeight: contentRect.height,
            placeholderWidth: contentRect.width,
          };

          // Call onChange callback
          if (onChange && prev.affixed !== newAffixed) {
            onChange(newAffixed);
          }

          return newState;
        }
        return prev;
      });
    }, [offsetTop, offsetBottom, getTarget, onChange]);

    // Setup scroll listeners
    useEffect(() => {
      if (useSticky) return;

      const targetElement = getTarget();

      // Initial check
      updateAffixState();

      // Add scroll listener
      const handleScroll = () => {
        updateAffixState();
      };

      const handleResize = () => {
        updateAffixState();
      };

      if (targetElement === window) {
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });
      } else {
        (targetElement as HTMLElement).addEventListener("scroll", handleScroll, {
          passive: true,
        });
        window.addEventListener("resize", handleResize, { passive: true });
      }

      return () => {
        if (targetElement === window) {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", handleResize);
        } else {
          (targetElement as HTMLElement).removeEventListener(
            "scroll",
            handleScroll,
          );
          window.removeEventListener("resize", handleResize);
        }
      };
    }, [getTarget, updateAffixState, useSticky]);

    const Comp = asChild ? Slot : "div";

    // CSS sticky mode
    if (useSticky) {
      const stickyStyle: React.CSSProperties = {
        position: "sticky",
        zIndex,
      };

      if (offsetTop !== undefined) {
        stickyStyle.top = `${offsetTop}px`;
      }
      if (offsetBottom !== undefined) {
        stickyStyle.bottom = `${offsetBottom}px`;
      }

      return (
        <Comp
          ref={ref}
          className={cn(affixContentVariants({ sticky: true }), className)}
          style={stickyStyle}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    // Fixed positioning mode
    const contentStyle: React.CSSProperties = {};
    if (state.affixed) {
      if (state.position === "top" && offsetTop !== undefined) {
        contentStyle.top = `${offsetTop}px`;
      }
      if (state.position === "bottom" && offsetBottom !== undefined) {
        contentStyle.bottom = `${offsetBottom}px`;
      }
      contentStyle.zIndex = zIndex;
      contentStyle.width = `${state.placeholderWidth}px`;
    }

    return (
      <div
        ref={(node) => {
          // Handle both refs
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
        }}
        className={className}
        {...props}
      >
        {/* Placeholder to prevent layout shift */}
        {state.affixed && (
          <div
            className={cn(affixPlaceholderVariants({ visible: true }))}
            style={{
              height: `${state.placeholderHeight}px`,
              width: `${state.placeholderWidth}px`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <Comp
          ref={contentRef}
          className={cn(
            affixVariants({
              affixed: state.affixed,
              position: state.position || "none",
            }),
            contentClassName,
          )}
          style={contentStyle}
        >
          {children}
        </Comp>
      </div>
    );
  },
);

Affix.displayName = "Affix";

export { Affix };
export default Affix;
export type { AffixProps, AffixState, AffixTarget };
