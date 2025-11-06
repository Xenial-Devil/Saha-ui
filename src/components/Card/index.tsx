"use client";

import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./Card.types";
import { cardVariants } from "./Card.styles";
import { Slot } from "../../lib/Slot";

/**
 * Card component variants using CVA (Class Variance Authority)
 *
 * Provides 5 modern card variants with advanced glass morphism effects,
 * flexible padding and rounded corner options, and smooth hover animations.
 *
 * @variant default - Standard card with subtle shadow and border
 * @variant glass - Medium glass effect with backdrop blur
 * @variant glass-strong - Strong glass effect with enhanced blur and border
 * @variant glass-subtle - Subtle glass effect for delicate designs
 * @variant bordered - Clean bordered design with hover effects
 *
 * @padding none | sm | md | lg | xl - Configurable padding sizes
 * @rounded sm | md | lg | xl | 2xl - Configurable border radius
 * @hoverable boolean - Adds scale and cursor effects on hover
 */

export type CardVariantsProps = VariantProps<typeof cardVariants>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant,
      padding,
      rounded,
      hoverable,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding, rounded, hoverable }),
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {/* Content wrapper */}
        <div className="relative">{children}</div>
      </div>
    );
  },
);

Card.displayName = "Card";

/**
 * CardHeader component - Container for card title and description
 *
 * @param children - Header content (typically CardTitle and CardDescription)
 * @param className - Additional CSS classes
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = "", asChild = false }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp ref={ref} className={cn("mb-4", className)}>
        {children}
      </Comp>
    );
  },
);

CardHeader.displayName = "CardHeader";

/**
 * CardTitle component - Main heading for the card
 *
 * @param children - Title text content
 * @param className - Additional CSS classes
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className = "", asChild = false }, ref) => {
    const Comp = asChild ? Slot : "h3";
    return (
      <Comp
        ref={ref}
        className={cn(
          "text-xl font-semibold text-foreground tracking-tight",
          className,
        )}
      >
        {children}
      </Comp>
    );
  },
);

CardTitle.displayName = "CardTitle";

/**
 * CardDescription component - Subtitle or description text
 *
 * @param children - Description text content
 * @param className - Additional CSS classes
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ children, className = "", asChild = false }, ref) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      ref={ref}
      className={cn(
        "text-sm text-muted-foreground mt-1.5 leading-relaxed",
        className,
      )}
    >
      {children}
    </Comp>
  );
});

CardDescription.displayName = "CardDescription";

/**
 * CardContent component - Main content area of the card
 *
 * @param children - Content to display
 * @param className - Additional CSS classes
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = "", asChild = false }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp ref={ref} className={cn("text-foreground", className)}>
        {children}
      </Comp>
    );
  },
);

CardContent.displayName = "CardContent";

/**
 * CardFooter component - Footer section with divider
 *
 * @param children - Footer content (typically buttons or actions)
 * @param className - Additional CSS classes
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = "", asChild = false }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(
          "mt-4 pt-4 border-t border-border/50 flex items-center gap-2",
          className,
        )}
      >
        {children}
      </Comp>
    );
  },
);

CardFooter.displayName = "CardFooter";

export default Card;
