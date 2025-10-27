import * as React from "react";
import { cn } from "../../lib/utils";
import { typographyVariants } from "./Typography.styles";
import type { TypographyProps, TypographyElement } from "./Typography.types";

// ============================================================================
// TYPOGRAPHY COMPONENT
// ============================================================================

/**
 * Typography Component
 *
 * A flexible typography component that renders semantic HTML elements with
 * beautiful styling and advanced customization options.
 *
 * @example
 * ```tsx
 * // Compact API
 * <Typography variant="h1">Heading 1</Typography>
 * <Typography variant="p" color="muted">Paragraph text</Typography>
 *
 * // With customization
 * <Typography
 *   variant="h2"
 *   color="primary"
 *   align="center"
 *   weight="bold"
 * >
 *   Custom Heading
 * </Typography>
 *
 * // Component API
 * <H1>Heading 1</H1>
 * <P color="muted">Paragraph</P>
 * <Lead>Lead text</Lead>
 * ```
 */
export const Typography = React.forwardRef<TypographyElement, TypographyProps>(
  (
    {
      variant = "p",
      color,
      align,
      weight,
      transform,
      decoration,
      truncate,
      as,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the HTML element to render
    const getElement = (): React.ElementType => {
      if (as) return as;

      switch (variant) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return variant;
        case "blockquote":
          return "blockquote";
        case "code":
          return "code";
        case "list":
          return "ul";
        case "inlineCode":
          return "code";
        default:
          return "p";
      }
    };

    const Element = getElement();

    return React.createElement(
      Element,
      {
        ref,
        className: cn(
          typographyVariants({
            variant,
            color,
            align,
            weight,
            transform,
            decoration,
            truncate,
          }),
          className
        ),
        ...props,
      },
      children
    );
  }
);

Typography.displayName = "Typography";

// ============================================================================
// COMPONENT API - SEMANTIC ELEMENTS
// ============================================================================

/**
 * H1 Component - Main heading
 */
export const H1 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, "variant">
>((props, ref) => <Typography ref={ref as any} variant="h1" {...props} />);
H1.displayName = "H1";

/**
 * H2 Component - Section heading
 */
export const H2 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, "variant">
>((props, ref) => <Typography ref={ref as any} variant="h2" {...props} />);
H2.displayName = "H2";

/**
 * H3 Component - Subsection heading
 */
export const H3 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, "variant">
>((props, ref) => <Typography ref={ref as any} variant="h3" {...props} />);
H3.displayName = "H3";

/**
 * H4 Component
 */
export const H4 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, "variant">
>((props, ref) => <Typography ref={ref as any} variant="h4" {...props} />);
H4.displayName = "H4";

/**
 * H5 Component
 */
export const H5 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, "variant">
>((props, ref) => <Typography ref={ref as any} variant="h5" {...props} />);
H5.displayName = "H5";

/**
 * H6 Component
 */
export const H6 = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, "variant">
>((props, ref) => <Typography ref={ref as any} variant="h6" {...props} />);
H6.displayName = "H6";

/**
 * P Component - Paragraph
 */
export const P = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, "variant">
>((props, ref) => <Typography ref={ref as any} variant="p" {...props} />);
P.displayName = "P";

/**
 * Lead Component - Lead paragraph for emphasis
 */
export const Lead = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, "variant">
>((props, ref) => <Typography ref={ref as any} variant="lead" {...props} />);
Lead.displayName = "Lead";

/**
 * Large Component - Large text
 */
export const Large = React.forwardRef<
  HTMLDivElement,
  Omit<TypographyProps, "variant">
>((props, ref) => (
  <Typography ref={ref as any} variant="large" as="div" {...props} />
));
Large.displayName = "Large";

/**
 * Small Component - Small text
 */
export const Small = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, "variant">
>((props, ref) => (
  <Typography ref={ref as any} variant="small" as="small" {...props} />
));
Small.displayName = "Small";

/**
 * Muted Component - Muted/secondary text
 */
export const Muted = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, "variant">
>((props, ref) => <Typography ref={ref as any} variant="muted" {...props} />);
Muted.displayName = "Muted";

/**
 * Blockquote Component - Quote block
 */
export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  Omit<TypographyProps, "variant">
>((props, ref) => (
  <Typography ref={ref as any} variant="blockquote" {...props} />
));
Blockquote.displayName = "Blockquote";

/**
 * Code Component - Code block
 */
export const Code = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, "variant">
>((props, ref) => <Typography ref={ref as any} variant="code" {...props} />);
Code.displayName = "Code";

/**
 * InlineCode Component - Inline code snippet
 */
export const InlineCode = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, "variant">
>((props, ref) => (
  <Typography ref={ref as any} variant="inlineCode" {...props} />
));
InlineCode.displayName = "InlineCode";

/**
 * List Component - Unordered list
 */
export const List = React.forwardRef<
  HTMLUListElement,
  Omit<TypographyProps, "variant">
>((props, ref) => <Typography ref={ref as any} variant="list" {...props} />);
List.displayName = "List";

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  TypographyProps,
  TypographyVariant,
  TypographyColor,
  TypographyAlign,
  TypographyWeight,
  TypographyTransform,
  TypographyDecoration,
  TypographyTruncate,
  TypographyElement,
} from "./Typography.types";

export { typographyVariants };
