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
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding, rounded, hoverable }),
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Content wrapper */}
        <div className="relative">{children}</div>
      </div>
    );
  }
);

Card.displayName = "Card";

/**
 * CardHeader component - Container for card title and description
 *
 * @param children - Header content (typically CardTitle and CardDescription)
 * @param className - Additional CSS classes
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  return <div className={cn("mb-4", className)}>{children}</div>;
};

CardHeader.displayName = "CardHeader";

/**
 * CardTitle component - Main heading for the card
 *
 * @param children - Title text content
 * @param className - Additional CSS classes
 */
export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = "",
}) => {
  return (
    <h3
      className={cn(
        "text-xl font-semibold text-foreground tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
};

CardTitle.displayName = "CardTitle";

/**
 * CardDescription component - Subtitle or description text
 *
 * @param children - Description text content
 * @param className - Additional CSS classes
 */
export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = "",
}) => {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground mt-1.5 leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
};

CardDescription.displayName = "CardDescription";

/**
 * CardContent component - Main content area of the card
 *
 * @param children - Content to display
 * @param className - Additional CSS classes
 */
export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={cn("text-foreground", className)}>{children}</div>;
};

CardContent.displayName = "CardContent";

/**
 * CardFooter component - Footer section with divider
 *
 * @param children - Footer content (typically buttons or actions)
 * @param className - Additional CSS classes
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "mt-4 pt-4 border-t border-border/50 flex items-center gap-2",
        className
      )}
    >
      {children}
    </div>
  );
};

CardFooter.displayName = "CardFooter";

export default Card;
