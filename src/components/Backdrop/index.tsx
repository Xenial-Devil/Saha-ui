"use client";

import React, { useEffect } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { BackdropProps } from "./Backdrop.types";
import { backdropVariants, backdropContentVariants } from "./Backdrop.styles";

export type BackdropVariantsProps = VariantProps<typeof backdropVariants>;

/**
 * Backdrop Component
 *
 * A full-screen overlay component typically used behind modals, drawers, and dialogs.
 * Supports blur effects, gradients, and custom opacity. Can contain children like
 * loading spinners or messages. Handles body scroll locking automatically.
 *
 * @example
 * ```tsx
 * // Basic backdrop
 * <Backdrop open />
 *
 * // With blur effect
 * <Backdrop open variant="blur" blur="lg" />
 *
 * // With click to close
 * <Backdrop open onClick={() => setOpen(false)} />
 *
 * // With custom opacity
 * <Backdrop open opacity={0.8} />
 *
 * // Invisible but clickable (for modals)
 * <Backdrop open invisible onClick={handleClose} />
 *
 * // With loading spinner
 * <Backdrop open>
 *   <Spinner size="lg" color="white" />
 * </Backdrop>
 *
 * // Gradient backdrop
 * <Backdrop open variant="gradient" blur="sm" />
 *
 * // Custom z-index
 * <Backdrop open zIndex={1400} />
 *
 * // Disable pointer events (for nested backdrops)
 * <Backdrop open disablePointerEvents />
 *
 * // Unmount when closed
 * <Backdrop open={isOpen} unmountOnExit>
 *   <div>Loading...</div>
 * </Backdrop>
 * ```
 */
const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  (
    {
      open,
      variant = "solid",
      blur = "none",
      opacity = 0.5,
      invisible = false,
      disablePointerEvents = false,
      zIndex = 1000,
      children,
      className,
      onClick,
      preventScroll = true,
      transitionDuration = 300,
      unmountOnExit = false,
      style,
      ...props
    },
    ref,
  ) => {
    // Handle body scroll locking
    useEffect(() => {
      if (!preventScroll || !open) return;

      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      // Check if scrollbar is present
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Lock scroll and add padding to prevent layout shift
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }, [open, preventScroll]);

    // Don't render if unmountOnExit is true and not open
    if (unmountOnExit && !open) {
      return null;
    }

    // Create custom styles
    const customStyles: React.CSSProperties = {
      zIndex,
      transitionDuration: `${transitionDuration}ms`,
      ...style,
    };

    // Apply custom opacity if not invisible
    if (!invisible && opacity !== 0.5) {
      customStyles.opacity = open ? opacity : 0;
    }

    // Handle backdrop click
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      // Only trigger onClick if clicking the backdrop itself, not children
      if (event.target === event.currentTarget && onClick) {
        onClick(event);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          backdropVariants({
            variant,
            blur,
            invisible,
            open,
          }),
          disablePointerEvents && "pointer-events-none",
          className,
        )}
        style={customStyles}
        onClick={handleClick}
        aria-hidden="true"
        {...props}
      >
        {children && (
          <div
            className={cn(
              backdropContentVariants({ open }),
              "pointer-events-auto",
            )}
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);

Backdrop.displayName = "Backdrop";

export { Backdrop };
export default Backdrop;
export type { BackdropProps };
