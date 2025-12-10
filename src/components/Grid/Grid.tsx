import React from "react";
import { Slot } from "../../lib/Slot";
import { cn } from "../../lib/utils";
import { gridVariants, gridItemVariants } from "./Grid.styles";
import { GridProps, GridItemProps } from "./Grid.types";

/**
 * Grid Component
 *
 * A flexible CSS Grid layout component with responsive columns, gap control,
 * alignment, and auto-fit capabilities. Supports 1-12 column layouts with
 * responsive breakpoints and auto-fit for fluid layouts.
 *
 * Fully accessible with ARIA attributes and semantic HTML support.
 *
 * @component
 * @example
 * ```tsx
 * // Basic grid
 * <Grid cols={3} gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 *
 * // Responsive grid
 * <Grid responsive={{ sm: 1, md: 2, lg: 4 }} gap="lg">
 *   <Card>Card 1</Card>
 *   <Card>Card 2</Card>
 * </Grid>
 *
 * // Auto-fit grid (fluid columns)
 * <Grid autoFit minColWidth="250px" gap="md">
 *   <ProductCard />
 *   <ProductCard />
 *   <ProductCard />
 * </Grid>
 *
 * // With GridItems for complex layouts
 * <Grid cols={12}>
 *   <GridItem colSpan={8}>Main content</GridItem>
 *   <GridItem colSpan={4}>Sidebar</GridItem>
 * </Grid>
 *
 * // With accessibility
 * <Grid role="list" cols={3}>
 *   <GridItem role="listitem">Item 1</GridItem>
 *   <GridItem role="listitem">Item 2</GridItem>
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = 12,
      responsive,
      gap = "md",
      align = "stretch",
      justify = "start",
      autoFit = false,
      minColWidth = "250px",
      asChild = false,
      children,
      style,
      role,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    // Build responsive classes
    const responsiveClasses = responsive
      ? [
          responsive.sm && `sm:grid-cols-${responsive.sm}`,
          responsive.md && `md:grid-cols-${responsive.md}`,
          responsive.lg && `lg:grid-cols-${responsive.lg}`,
          responsive.xl && `xl:grid-cols-${responsive.xl}`,
        ]
          .filter(Boolean)
          .join(" ")
      : "";

    // Handle numeric or custom string gap values
    const isTokenGap =
      typeof gap === "string" &&
      ["none", "xs", "sm", "md", "lg", "xl", "2xl"].includes(gap);

    // Auto-fit grid using CSS custom properties
    const autoFitStyle = autoFit
      ? {
          gridTemplateColumns: `repeat(auto-fit, minmax(min(${minColWidth}, 100%), 1fr))`,
          ...(!isTokenGap && gap !== undefined
            ? { gap: typeof gap === "number" ? `${gap}px` : gap }
            : {}),
          ...style,
        }
      : !isTokenGap && gap !== undefined
      ? { gap: typeof gap === "number" ? `${gap}px` : gap, ...style }
      : style;

    return (
      <Comp
        ref={ref}
        className={cn(
          gridVariants({
            cols: autoFit ? undefined : cols,
            gap: isTokenGap ? (gap as any) : undefined,
            align,
            justify,
            autoFit,
          }),
          !isTokenGap && gap !== undefined && "gap-0", // Reset gap when using custom value
          responsiveClasses,
          className
        )}
        style={autoFitStyle}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Grid.displayName = "Grid";

/**
 * GridItem Component
 *
 * A flexible grid item component that can span multiple columns and rows.
 * Works within a Grid parent to create complex, responsive layouts.
 *
 * Fully accessible with ARIA attributes and semantic HTML support.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Grid cols={4}>
 *   <GridItem>Item 1</GridItem>
 *   <GridItem colSpan={2}>Spans 2 columns</GridItem>
 * </Grid>
 *
 * // Spanning columns and rows
 * <Grid cols={3}>
 *   <GridItem colSpan={2} rowSpan={2}>
 *     Featured content
 *   </GridItem>
 *   <GridItem>Regular item</GridItem>
 * </Grid>
 *
 * // Responsive spans
 * <Grid cols={12}>
 *   <GridItem responsive={{ sm: 12, md: 6, lg: 4 }}>
 *     Mobile full, tablet half, desktop third
 *   </GridItem>
 * </Grid>
 *
 * // As semantic HTML
 * <Grid role="list">
 *   <GridItem asChild role="listitem">
 *     <article>Article content</article>
 *   </GridItem>
 * </Grid>
 * ```
 */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      className,
      colSpan = 1,
      rowSpan = 1,
      responsive,
      asChild = false,
      children,
      role,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    // Build responsive classes
    const responsiveClasses = responsive
      ? [
          responsive.sm &&
            `sm:col-span-${responsive.sm === "full" ? "full" : responsive.sm}`,
          responsive.md &&
            `md:col-span-${responsive.md === "full" ? "full" : responsive.md}`,
          responsive.lg &&
            `lg:col-span-${responsive.lg === "full" ? "full" : responsive.lg}`,
          responsive.xl &&
            `xl:col-span-${responsive.xl === "full" ? "full" : responsive.xl}`,
        ]
          .filter(Boolean)
          .join(" ")
      : "";

    return (
      <Comp
        ref={ref}
        className={cn(
          gridItemVariants({ colSpan, rowSpan }),
          responsiveClasses,
          className
        )}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

GridItem.displayName = "GridItem";
