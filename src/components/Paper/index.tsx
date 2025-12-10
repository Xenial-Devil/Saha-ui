"use client";

import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { PaperProps } from "./Paper.types";
import { paperVariants } from "./Paper.styles";
import { Slot } from "../../lib/Slot";

export type PaperVariantsProps = VariantProps<typeof paperVariants>;

/**
 * Paper Component
 *
 * A versatile surface component that provides elevation and visual hierarchy.
 * Perfect for cards, containers, and any content that needs to stand out.
 * Supports multiple variants, elevation levels, and customization options.
 *
 * @example
 * ```tsx
 * // Basic paper
 * <Paper>
 *   <h2>Title</h2>
 *   <p>Content goes here</p>
 * </Paper>
 *
 * // With elevation
 * <Paper elevation={3}>
 *   Elevated content with shadow
 * </Paper>
 *
 * // Outlined variant
 * <Paper variant="outlined" padding="lg">
 *   Outlined content with large padding
 * </Paper>
 *
 * // Rounded corners
 * <Paper rounded="xl" elevation={2}>
 *   Highly rounded content
 * </Paper>
 *
 * // Interactive/hoverable
 * <Paper hoverable onClick={() => console.log('clicked')}>
 *   Click me
 * </Paper>
 *
 * // Glass morphism effect
 * <Paper variant="glass" elevation={4}>
 *   Modern glass effect
 * </Paper>
 *
 * // Gradient surface
 * <Paper variant="gradient" elevation={2}>
 *   Gradient background
 * </Paper>
 *
 * // Centered with max width
 * <Paper centered maxWidth="lg">
 *   Centered content with max width
 * </Paper>
 *
 * // No padding (for custom layouts)
 * <Paper padding="none">
 *   <img src="..." alt="..." />
 *   <div className="p-4">Custom layout</div>
 * </Paper>
 *
 * // As different element
 * <Paper asChild>
 *   <article>Article content</article>
 * </Paper>
 * ```
 */
const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  (
    {
      variant = "filled",
      elevation = 1,
      padding = "md",
      rounded = "md",
      hoverable = false,
      centered = false,
      maxWidth,
      children,
      className,
      asChild = false,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    // Handle numeric or custom string padding values
    const isTokenPadding =
      typeof padding === "string" &&
      ["none", "sm", "md", "lg", "xl"].includes(padding);

    const customStyle =
      !isTokenPadding && padding !== undefined
        ? {
            padding: typeof padding === "number" ? `${padding}px` : padding,
            ...style,
          }
        : style;

    return (
      <Comp
        ref={ref}
        className={cn(
          paperVariants({
            variant,
            elevation,
            padding: isTokenPadding ? (padding as any) : undefined,
            rounded,
            hoverable,
            centered,
            maxWidth,
          }),
          className
        )}
        style={customStyle}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Paper.displayName = "Paper";

export { Paper };
export default Paper;
export type { PaperProps };
