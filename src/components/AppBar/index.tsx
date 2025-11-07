"use client";

import React, { useEffect, useState } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { AppBarProps } from "./AppBar.types";
import {
  appBarVariants,
  appBarContentVariants,
  appBarScrollVariants,
} from "./AppBar.styles";
import { Slot } from "../../lib/Slot";

export type AppBarVariantsProps = VariantProps<typeof appBarVariants>;

/**
 * AppBar Component
 *
 * A top app bar that provides content and actions related to the current screen.
 * Perfect for navigation headers, toolbars, and branding.
 *
 * @example
 * ```tsx
 * // Basic app bar
 * <AppBar>
 *   <div className="flex items-center justify-between w-full px-4">
 *     <h1>My App</h1>
 *     <nav>Menu</nav>
 *   </div>
 * </AppBar>
 *
 * // Fixed position with primary color
 * <AppBar position="fixed" color="primary" variant="elevated">
 *   <div className="container mx-auto flex items-center justify-between">
 *     <div>Logo</div>
 *     <nav>Navigation</nav>
 *   </div>
 * </AppBar>
 *
 * // Transparent with blur (hero section)
 * <AppBar variant="transparent" blur position="fixed">
 *   <div className="flex items-center justify-between w-full px-6">
 *     <div>Brand</div>
 *     <div>Actions</div>
 *   </div>
 * </AppBar>
 *
 * // With hide on scroll
 * <AppBar position="fixed" hideOnScroll>
 *   <div>Content</div>
 * </AppBar>
 *
 * // Different sizes
 * <AppBar size="sm">Small AppBar</AppBar>
 * <AppBar size="lg">Large AppBar</AppBar>
 *
 * // With max width container
 * <AppBar maxWidth="xl" centered>
 *   Centered content with max width
 * </AppBar>
 * ```
 */
const AppBar = React.forwardRef<HTMLElement, AppBarProps>(
  (
    {
      position = "static",
      variant = "default",
      color = "default",
      elevation = 2,
      size = "md",
      blur = false,
      fullWidth = true,
      centered = false,
      maxWidth = "full",
      hideOnScroll = false,
      zIndex = 1100,
      children,
      className,
      asChild = false,
      style,
      ...props
    },
    ref,
  ) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    // Handle hide on scroll
    useEffect(() => {
      if (!hideOnScroll) return;

      const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        // Show when scrolling up, hide when scrolling down
        if (currentScrollPos < prevScrollPos || currentScrollPos < 10) {
          setVisible(true);
        } else {
          setVisible(false);
        }

        setPrevScrollPos(currentScrollPos);
        setIsScrolled(currentScrollPos > 10);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [hideOnScroll, prevScrollPos]);

    const Comp = asChild ? Slot : "header";

    // Determine if we should apply scroll-based elevation
    const currentElevation = variant === "elevated" && isScrolled ? Math.min((elevation || 2) + 1, 4) : elevation;

    return (
      <Comp
        ref={ref}
        className={cn(
          appBarVariants({
            position,
            variant,
            color,
            elevation: currentElevation as 0 | 1 | 2 | 3 | 4,
            size,
            blur,
            fullWidth,
          }),
          hideOnScroll && appBarScrollVariants({ hidden: !visible }),
          className,
        )}
        style={{ zIndex, ...style }}
        role="banner"
        {...props}
      >
        {maxWidth || centered ? (
          <div
            className={cn(
              appBarContentVariants({
                centered,
                maxWidth,
              }),
            )}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  },
);

AppBar.displayName = "AppBar";

export { AppBar };
export default AppBar;
export type { AppBarProps };
