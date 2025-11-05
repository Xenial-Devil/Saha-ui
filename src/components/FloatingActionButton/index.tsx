"use client";

import React from "react";
import { cn } from "../../lib/utils";
import type { FloatingActionButtonProps } from "./FloatingActionButton.types";
import { fabVariants, labelVariants } from "./FloatingActionButton.styles";

/**
 * Floating Action Button Component
 *
 * A modern floating action button (FAB) with beautiful visual effects.
 * Features position variants, size options, and smooth animations.
 *
 * Icon can be passed either via the `icon` prop or as children:
 * @example
 * // Using children (recommended)
 * <FloatingActionButton><Plus size={24} /></FloatingActionButton>
 *
 * // Using icon prop
 * <FloatingActionButton icon={<Plus size={24} />} />
 *
 * @variant default - Standard style
 * @variant primary - Primary color theme
 * @variant secondary - Secondary color theme
 * @variant accent - Accent color theme
 * @variant info - Info color theme
 * @variant success - Success color theme
 * @variant warning - Warning color theme
 * @variant error - Error color theme
 * @variant glass - Glassmorphism effect
 *
 * @size sm | md | lg | xl - Size variations
 * @position bottom-right | bottom-left | top-right | top-left - Screen position
 */

/**
 * Position variants for FAB
 */
const positionVariants: Record<
  "bottom-right" | "bottom-left" | "top-right" | "top-left",
  string
> = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
};

const FloatingActionButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      position = "bottom-right",
      icon,
      label,
      showLabel = false,
      extended = false,
      offset,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Calculate position with custom offset
    const getPositionStyle = () => {
      if (!offset) return {};
      const style: React.CSSProperties = {};

      if (position.includes("bottom")) {
        style.bottom = offset.y ? `${24 + offset.y}px` : undefined;
      } else {
        style.top = offset.y ? `${24 + offset.y}px` : undefined;
      }

      if (position.includes("right")) {
        style.right = offset.x ? `${24 + offset.x}px` : undefined;
      } else {
        style.left = offset.x ? `${24 + offset.x}px` : undefined;
      }

      return style;
    };

    const showLabelTooltip = (showLabel || isHovered) && label && !extended;
    const isExtended = extended && label;
    const fabPosition:
      | "bottom-right"
      | "bottom-left"
      | "top-right"
      | "top-left" = position || "bottom-right";

    return (
      <button
        ref={ref}
        className={cn(
          fabVariants({ variant, size }),
          positionVariants[fabPosition],
          isExtended && "w-auto px-6",
          className
        )}
        style={getPositionStyle()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Label tooltip (non-extended mode) */}
        {showLabelTooltip && (
          <span
            className={cn(
              labelVariants({ position }),
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            {label}
          </span>
        )}

        {/* Icon */}
        <span className="relative z-10 inline-flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
          {children || icon}
        </span>

        {/* Extended label */}
        {isExtended && (
          <span className="relative z-10 font-semibold">{label}</span>
        )}
      </button>
    );
  }
);

FloatingActionButton.displayName = "FloatingActionButton";

export default FloatingActionButton;
