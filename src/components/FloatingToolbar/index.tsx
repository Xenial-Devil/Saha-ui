"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { ButtonGroup } from "../ButtonGroup";
import { floatingToolbarVariants } from "./FloatingToolbar.styles";
import type { FloatingToolbarProps } from "./FloatingToolbar.types";

/**
 * FloatingToolbar component
 *
 * A highly visible toolbar that floats on the screen, useful for quick actions.
 * Wraps a ButtonGroup internally to manage action buttons.
 *
 * @component
 * @example
 * // Basic usage at bottom of screen
 * <FloatingToolbar position="bottom">
 *   <Button variant="ghost">Action 1</Button>
 *   <Button variant="ghost">Action 2</Button>
 * </FloatingToolbar>
 *
 * @example
 * // Positioned on the right side (vertical)
 * <FloatingToolbar position="right">
 *   <IconButton icon={<Icon1 />} />
 *   <IconButton icon={<Icon2 />} />
 * </FloatingToolbar>
 */
export const FloatingToolbar = forwardRef<HTMLDivElement, FloatingToolbarProps>(
  (
    { className, position = "bottom", buttonGroupProps, children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(floatingToolbarVariants({ position }), className)}
        {...props}
      >
        <ButtonGroup
          orientation={
            position === "left" || position === "right"
              ? "vertical"
              : "horizontal"
          }
          className={cn("gap-1 shadow-none", buttonGroupProps?.className)}
          {...buttonGroupProps}
        >
          {children}
        </ButtonGroup>
      </div>
    );
  },
);

FloatingToolbar.displayName = "FloatingToolbar";

FloatingToolbar.displayName = "FloatingToolbar";
