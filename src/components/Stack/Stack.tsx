import React from "react";
import { Slot } from "../../lib/Slot";
import { cn } from "../../lib/utils";
import { stackVariants } from "./Stack.styles";
import { StackProps } from "./Stack.types";

/**
 * Stack - A flexible layout primitive for arranging elements with consistent spacing.
 *
 * Stack provides a simple way to create vertical or horizontal layouts with various
 * alignment, spacing, and responsive options. It handles common layout patterns
 * while maintaining semantic HTML and accessibility.
 *
 * @example
 * // Basic usage
 * <Stack spacing="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </Stack>
 *
 * @example
 * // Horizontal toolbar
 * <Stack
 *   direction="horizontal"
 *   role="toolbar"
 *   aria-label="Text formatting"
 * >
 *   <Button>Bold</Button>
 *   <Button>Italic</Button>
 * </Stack>
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "vertical",
      spacing = "md",
      align = "stretch",
      justify = "start",
      wrap = false,
      responsive = false,
      divide = false,
      asChild = false,
      role,
      children,
      style,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-describedby": ariaDescribedby,
      "aria-orientation": ariaOrientation,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    // Determine the effective direction for ARIA
    const effectiveDirection = responsive ? "vertical" : direction;

    // Auto-set aria-orientation if role is provided but orientation isn't
    const computedAriaOrientation =
      ariaOrientation ||
      (role === "toolbar" ||
      role === "tablist" ||
      role === "listbox" ||
      role === "menu"
        ? effectiveDirection
        : undefined);

    // Handle numeric or custom string spacing values
    const isTokenSpacing =
      typeof spacing === "string" &&
      ["none", "xs", "sm", "md", "lg", "xl", "2xl"].includes(spacing);

    const customStyle =
      !isTokenSpacing && spacing !== undefined
        ? {
            gap: typeof spacing === "number" ? `${spacing}px` : spacing,
            ...style,
          }
        : style;

    return (
      <Comp
        ref={ref}
        className={cn(
          stackVariants({
            direction: responsive ? "vertical" : direction,
            spacing: isTokenSpacing ? (spacing as any) : undefined,
            align,
            justify,
            wrap,
            responsive,
            divide,
          }),
          !isTokenSpacing && spacing !== undefined && "gap-0", // Reset gap when using custom value
          className
        )}
        style={customStyle}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-orientation={computedAriaOrientation}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Stack.displayName = "Stack";
