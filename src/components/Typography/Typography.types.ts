import type React from "react";
import type {
  TypographyVariant,
  TypographyColor,
  TypographyAlign,
  TypographyWeight,
  TypographyTransform,
  TypographyDecoration,
  TypographyTruncate,
} from "./Typography.styles";

// ============================================================================
// TYPOGRAPHY TYPES
// ============================================================================

export type TypographyElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLQuoteElement
  | HTMLElement
  | HTMLUListElement
  | HTMLDivElement;

export interface TypographyProps
  extends React.HTMLAttributes<TypographyElement> {
  /**
   * The typography variant to render
   * @default "p"
   */
  variant?: TypographyVariant;

  /**
   * The color of the text
   * @default "default"
   */
  color?: TypographyColor;

  /**
   * Text alignment
   * @default "left"
   */
  align?: TypographyAlign;

  /**
   * Font weight
   */
  weight?: TypographyWeight;

  /**
   * Text transform
   */
  transform?: TypographyTransform;

  /**
   * Text decoration
   */
  decoration?: TypographyDecoration;

  /**
   * Text truncation behavior
   */
  truncate?: TypographyTruncate;

  /**
   * Custom HTML element to render
   */
  as?: React.ElementType;

  /**
   * Content to render
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

// Re-export types from styles
export type {
  TypographyVariant,
  TypographyColor,
  TypographyAlign,
  TypographyWeight,
  TypographyTransform,
  TypographyDecoration,
  TypographyTruncate,
};
