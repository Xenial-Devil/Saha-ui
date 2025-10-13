import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Sparkles } from "lucide-react";
import type { DividerProps } from "./Divider.types";

/**
 * Divider component variants using CVA
 *
 * Provides 5 modern divider variants with flexible orientation,
 * thickness options, label support, and decorative elements.
 *
 * @variant solid - Solid line divider (default)
 * @variant dashed - Dashed line pattern
 * @variant dotted - Dotted line pattern
 * @variant gradient - Gradient color transition
 * @variant glass - Glassmorphism effect with backdrop blur
 *
 * @orientation horizontal | vertical - Direction of the divider
 * @thickness thin | medium | thick - Line thickness
 * @spacing none | xs | sm | md | lg | xl - Margin around divider
 */
export const dividerVariants = cva(
  "relative flex items-center justify-center",
  {
    variants: {
      orientation: {
        horizontal: "w-full flex-row",
        vertical: "h-full flex-col",
      },
      spacing: {
        none: "",
        xs: "",
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
    },
    compoundVariants: [
      // Horizontal spacing
      {
        orientation: "horizontal",
        spacing: "xs",
        className: "my-2",
      },
      {
        orientation: "horizontal",
        spacing: "sm",
        className: "my-3",
      },
      {
        orientation: "horizontal",
        spacing: "md",
        className: "my-4",
      },
      {
        orientation: "horizontal",
        spacing: "lg",
        className: "my-6",
      },
      {
        orientation: "horizontal",
        spacing: "xl",
        className: "my-8",
      },
      // Vertical spacing
      {
        orientation: "vertical",
        spacing: "xs",
        className: "mx-2",
      },
      {
        orientation: "vertical",
        spacing: "sm",
        className: "mx-3",
      },
      {
        orientation: "vertical",
        spacing: "md",
        className: "mx-4",
      },
      {
        orientation: "vertical",
        spacing: "lg",
        className: "mx-6",
      },
      {
        orientation: "vertical",
        spacing: "xl",
        className: "mx-8",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      spacing: "md",
    },
  }
);

/**
 * Divider line variants
 */
export const dividerLineVariants = cva("transition-all duration-300 relative", {
  variants: {
    variant: {
      solid: "border-gray-400 dark:border-gray-600 shadow-sm",
      dashed: "border-gray-400 dark:border-gray-600 border-dashed shadow-sm",
      dotted: "border-gray-400 dark:border-gray-600 border-dotted shadow-sm",
      gradient:
        "border-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent dark:from-transparent dark:via-primary/40 dark:to-transparent shadow-[0_2px_8px_0] shadow-primary/20",
      glass:
        "border-0 bg-gradient-to-r from-transparent via-gray-300/80 to-transparent dark:from-transparent dark:via-gray-700/80 dark:to-transparent backdrop-blur-sm shadow-lg after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:opacity-50",
    },
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
    thickness: {
      thin: "",
      medium: "",
      thick: "",
    },
  },
  compoundVariants: [
    // Horizontal thickness
    {
      orientation: "horizontal",
      thickness: "thin",
      variant: ["solid", "dashed", "dotted"],
      className: "border-t",
    },
    {
      orientation: "horizontal",
      thickness: "medium",
      variant: ["solid", "dashed", "dotted"],
      className: "border-t-2",
    },
    {
      orientation: "horizontal",
      thickness: "thick",
      variant: ["solid", "dashed", "dotted"],
      className: "border-t-4",
    },
    // Vertical thickness
    {
      orientation: "vertical",
      thickness: "thin",
      variant: ["solid", "dashed", "dotted"],
      className: "border-l",
    },
    {
      orientation: "vertical",
      thickness: "medium",
      variant: ["solid", "dashed", "dotted"],
      className: "border-l-2",
    },
    {
      orientation: "vertical",
      thickness: "thick",
      variant: ["solid", "dashed", "dotted"],
      className: "border-l-4",
    },
    // Gradient & Glass horizontal thickness
    {
      orientation: "horizontal",
      thickness: "thin",
      variant: ["gradient", "glass"],
      className: "h-px",
    },
    {
      orientation: "horizontal",
      thickness: "medium",
      variant: ["gradient", "glass"],
      className: "h-0.5",
    },
    {
      orientation: "horizontal",
      thickness: "thick",
      variant: ["gradient", "glass"],
      className: "h-1",
    },
    // Gradient & Glass vertical thickness
    {
      orientation: "vertical",
      thickness: "thin",
      variant: ["gradient", "glass"],
      className: "w-px",
    },
    {
      orientation: "vertical",
      thickness: "medium",
      variant: ["gradient", "glass"],
      className: "w-0.5",
    },
    {
      orientation: "vertical",
      thickness: "thick",
      variant: ["gradient", "glass"],
      className: "w-1",
    },
  ],
  defaultVariants: {
    variant: "solid",
    orientation: "horizontal",
    thickness: "thin",
  },
});

/**
 * Divider label variants
 */
export const dividerLabelVariants = cva(
  "bg-background px-3 text-sm font-medium text-muted-foreground flex items-center gap-2 shrink-0",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col py-3 px-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export type DividerVariantsProps = VariantProps<typeof dividerVariants>;

/**
 * Divider Component
 *
 * A versatile divider component for separating content with multiple visual styles,
 * optional labels, and decorative elements.
 *
 * @example
 * ```tsx
 * // Basic divider
 * <Divider />
 *
 * // With label
 * <Divider label="OR" />
 *
 * // Gradient variant
 * <Divider variant="gradient" thickness="medium" />
 *
 * // Vertical divider
 * <Divider orientation="vertical" className="h-24" />
 *
 * // Decorative with label
 * <Divider label="Continue" decorative />
 * ```
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      variant = "solid",
      orientation = "horizontal",
      thickness = "thin",
      spacing = "md",
      label,
      labelPosition = "center",
      decorative = false,
      className,
      ...props
    },
    ref
  ) => {
    // For vertical dividers, override justify-content based on label position
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
            dividerVariants({ orientation, spacing }),
            justifyClass,
            className
          )}
          role="separator"
          aria-orientation={orientation}
          {...props}
        >
          {/* Line before label (or above for vertical) */}
          {labelPosition !== "left" && (
            <div
              className={cn(
                dividerLineVariants({ variant, orientation, thickness }),
                orientation === "horizontal" ? "flex-1" : "flex-1"
              )}
            />
          )}

          {/* Label */}
          <div className={cn(dividerLabelVariants({ orientation }))}>
            {decorative && <Sparkles size={14} className="text-primary/70" />}
            {label}
            {decorative && <Sparkles size={14} className="text-primary/70" />}
          </div>

          {/* Line after label (or below for vertical) */}
          {labelPosition !== "right" && (
            <div
              className={cn(
                dividerLineVariants({ variant, orientation, thickness }),
                orientation === "horizontal" ? "flex-1" : "flex-1"
              )}
            />
          )}
        </div>
      );
    }

    // Simple divider without label
    return (
      <div
        ref={ref}
        className={cn(dividerVariants({ orientation, spacing }), className)}
        role="separator"
        aria-orientation={orientation}
        {...props}
      >
        <div
          className={cn(
            dividerLineVariants({ variant, orientation, thickness })
          )}
        />
      </div>
    );
  }
);

Divider.displayName = "Divider";

export default Divider;
