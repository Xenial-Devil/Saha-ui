"use client";
import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Sparkles } from "lucide-react";
import type { SeparatorProps } from "./Separator.types";
import {
  SeparatorVariants,
  SeparatorLineVariants,
  SeparatorLabelVariants,
} from "./Separator.styles";

export type SeparatorVariantsProps = VariantProps<typeof SeparatorVariants>;

/**
 * Separator Component
 *
 * A versatile Separator component for separating content with multiple visual styles,
 * optional labels, and decorative elements.
 *
 * @example
 * ```tsx
 * // Basic Separator
 * <Separator />
 *
 * // With label
 * <Separator label="OR" />
 *
 * // Gradient variant
 * <Separator variant="gradient" thickness="medium" />
 *
 * // Vertical Separator
 * <Separator orientation="vertical" className="h-24" />
 *
 * // Decorative with label
 * <Separator label="Continue" decorative />
 * ```
 */
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      variant = "default",
      orientation = "horizontal",
      thickness = "thin",
      spacing = "md",
      label,
      labelPosition = "center",
      decorative = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Development-only validation removed for server/component readiness

    // Handle numeric or custom string spacing values
    const isTokenSpacing =
      typeof spacing === "string" &&
      ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"].includes(spacing);

    const customStyle =
      !isTokenSpacing && spacing !== undefined
        ? {
            [orientation === "horizontal" ? "marginTop" : "marginLeft"]:
              typeof spacing === "number" ? `${spacing}px` : spacing,
            [orientation === "horizontal" ? "marginBottom" : "marginRight"]:
              typeof spacing === "number" ? `${spacing}px` : spacing,
            ...style,
          }
        : style;

    // For vertical Separators, override justify-content based on label position
    const justifyClass =
      orientation === "horizontal"
        ? labelPosition === "left"
          ? "justify-start"
          : labelPosition === "right"
          ? "justify-end"
          : "justify-center"
        : labelPosition === "left"
        ? "justify-start"
        : labelPosition === "right"
        ? "justify-end"
        : "justify-center";

    if (label) {
      return (
        <div
          ref={ref}
          className={cn(
            SeparatorVariants({
              orientation,
              spacing: isTokenSpacing ? (spacing as any) : undefined,
            }),
            justifyClass,
            className
          )}
          style={customStyle}
          role="separator"
          aria-orientation={orientation}
          {...props}
        >
          {/* Line before label (or above for vertical) */}
          {labelPosition !== "left" && (
            <div
              className={cn(
                SeparatorLineVariants({ variant, orientation, thickness }),
                orientation === "horizontal" ? "flex-1" : "flex-1"
              )}
            />
          )}

          {/* Label */}
          <div className={cn(SeparatorLabelVariants({ orientation }))}>
            {decorative && <Sparkles size={14} className="text-primary/70" />}
            {label}
            {decorative && <Sparkles size={14} className="text-primary/70" />}
          </div>

          {/* Line after label (or below for vertical) */}
          {labelPosition !== "right" && (
            <div
              className={cn(
                SeparatorLineVariants({ variant, orientation, thickness }),
                orientation === "horizontal" ? "flex-1" : "flex-1"
              )}
            />
          )}
        </div>
      );
    }

    // Simple Separator without label
    return (
      <div
        ref={ref}
        className={cn(
          SeparatorVariants({
            orientation,
            spacing: isTokenSpacing ? (spacing as any) : undefined,
          }),
          className
        )}
        style={customStyle}
        role="separator"
        aria-orientation={orientation}
        {...props}
      >
        <div
          className={cn(
            SeparatorLineVariants({ variant, orientation, thickness })
          )}
        />
      </div>
    );
  }
);

Separator.displayName = "Separator";

export default Separator;
