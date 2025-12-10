/**
 * Number of columns for the Grid
 * @example
 * <Grid cols={3}>Three columns</Grid>
 * <Grid cols={12}>Twelve columns</Grid>
 */
export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Gap size between grid items
 * @example
 * <Grid gap="sm">Small gap</Grid>
 * <Grid gap="lg">Large gap</Grid>
 * <Grid gap={16}>16px gap</Grid>
 * <Grid gap="2rem">Custom gap</Grid>
 */
export type GridGap =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | number
  | string;

/**
 * Alignment of items on the cross axis
 * @example
 * <Grid align="center">Centered items</Grid>
 * <Grid align="start">Top aligned items</Grid>
 */
export type GridAlign = "start" | "center" | "end" | "stretch" | "baseline";

/**
 * Justification of content on the main axis
 * @example
 * <Grid justify="center">Centered content</Grid>
 * <Grid justify="between">Space between</Grid>
 */
export type GridJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

/**
 * Props for the Grid component
 *
 * A flexible CSS Grid layout component with responsive column configuration,
 * gap control, and alignment options. Supports both fixed and auto-fit layouts.
 * Fully accessible with ARIA attributes and semantic HTML support.
 *
 * @component
 * @example
 * ```tsx
 * // Basic 3-column grid
 * <Grid cols={3} gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 *
 * // Responsive grid
 * <Grid responsive={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
 *   <GridItem>Card 1</GridItem>
 *   <GridItem>Card 2</GridItem>
 *   <GridItem>Card 3</GridItem>
 * </Grid>
 *
 * // Auto-fit grid
 * <Grid autoFit minColWidth="300px" gap="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 *
 * // With alignment
 * <Grid cols={3} align="center" justify="between">
 *   <div>Aligned content</div>
 * </Grid>
 *
 * // As semantic element
 * <Grid asChild>
 *   <section role="list">
 *     <div role="listitem">Item</div>
 *   </section>
 * </Grid>
 * ```
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns in the grid
   * Sets the grid-template-columns property
   * @default 12
   * @example
   * ```tsx
   * <Grid cols={1}>Single column</Grid>
   * <Grid cols={2}>Two columns</Grid>
   * <Grid cols={3}>Three columns</Grid>
   * <Grid cols={4}>Four columns</Grid>
   * <Grid cols={12}>Twelve columns (default)</Grid>
   * ```
   */
  cols?: GridCols;

  /**
   * Responsive column configuration
   * Defines column count at different breakpoints
   * @example
   * ```tsx
   * <Grid responsive={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
   *   Responsive grid: 1 col on mobile, 4 on desktop
   * </Grid>
   * ```
   */
  responsive?: {
    sm?: GridCols;
    md?: GridCols;
    lg?: GridCols;
    xl?: GridCols;
  };

  /**
   * Gap between grid items
   * Accepts predefined tokens, numbers (px), or string with units
   * @default 'md'
   * @example
   * ```tsx
   * <Grid gap="sm">Small gaps</Grid>
   * <Grid gap="lg">Large gaps</Grid>
   * <Grid gap={20}>20px gaps</Grid>
   * <Grid gap="1.5rem">Custom gaps</Grid>
   * ```
   */
  gap?: GridGap;

  /**
   * Align items on the cross axis
   * @default 'stretch'
   * @example
   * ```tsx
   * <Grid align="center">Centered items</Grid>
   * ```
   */
  align?: GridAlign;

  /**
   * Justify content on the main axis
   * @example
   * ```tsx
   * <Grid justify="between">Space between</Grid>
   * ```
   */
  justify?: GridJustify;

  /**
   * Enable auto-fit layout
   * Automatically fits as many columns as possible
   * @default false
   */
  autoFit?: boolean;

  /**
   * Minimum column width for auto-fit
   * @default '250px'
   */
  minColWidth?: string;

  /**
   * Render as a different element
   */
  asChild?: boolean;
}

/**
 * Column span options for GridItem
 * @example
 * <GridItem colSpan={2}>Spans 2 columns</GridItem>
 * <GridItem colSpan="full">Spans all columns</GridItem>
 */
export type GridItemColSpan =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | "full";

/**
 * Row span options for GridItem
 */
export type GridItemRowSpan = 1 | 2 | 3 | 4 | 5 | 6 | "full";

/**
 * Props for the GridItem component
 *
 * A flexible grid item that can span multiple columns and rows.
 * Works within a Grid parent component to create complex layouts.
 * Fully accessible with ARIA attributes and semantic HTML support.
 *
 * @component
 * @example
 * ```tsx
 * // Basic grid item
 * <Grid cols={4}>
 *   <GridItem>Item 1</GridItem>
 *   <GridItem colSpan={2}>Item 2 (spans 2 columns)</GridItem>
 * </Grid>
 *
 * // Spanning columns and rows
 * <Grid cols={3}>
 *   <GridItem colSpan={2} rowSpan={2}>
 *     Featured item
 *   </GridItem>
 *   <GridItem>Regular item</GridItem>
 * </Grid>
 *
 * // Responsive spans
 * <Grid cols={12}>
 *   <GridItem responsive={{ sm: 12, md: 6, lg: 4 }}>
 *     Responsive width item
 *   </GridItem>
 * </Grid>
 *
 * // With accessibility
 * <Grid role="list">
 *   <GridItem role="listitem" aria-label="Featured product">
 *     <ProductCard featured />
 *   </GridItem>
 * </Grid>
 * ```
 */
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns this item should span
   * Use 'full' to span all available columns
   * @default 1
   * @example
   * ```tsx
   * <GridItem colSpan={1}>Single column</GridItem>
   * <GridItem colSpan={2}>Spans 2 columns</GridItem>
   * <GridItem colSpan={6}>Spans 6 columns</GridItem>
   * <GridItem colSpan="full">Spans all columns</GridItem>
   * ```
   */
  colSpan?: GridItemColSpan;

  /**
   * Number of rows this item should span
   * Use 'full' to span all available rows
   * @default 1
   * @example
   * ```tsx
   * <GridItem rowSpan={1}>Single row</GridItem>
   * <GridItem rowSpan={2}>Spans 2 rows</GridItem>
   * <GridItem rowSpan="full">Spans all rows</GridItem>
   * ```
   */
  rowSpan?: GridItemRowSpan;

  /**
   * Responsive column span configuration for different breakpoints
   * Allows different spans at different screen sizes
   * @example
   * ```tsx
   * <GridItem responsive={{ sm: 12, md: 6, lg: 4, xl: 3 }}>
   *   Full width on mobile, half on tablet, third on desktop
   * </GridItem>
   *
   * <GridItem responsive={{ sm: 'full', md: 6, lg: 4 }}>
   *   Full width mobile, adaptive on larger screens
   * </GridItem>
   * ```
   */
  responsive?: {
    sm?: GridItemColSpan;
    md?: GridItemColSpan;
    lg?: GridItemColSpan;
    xl?: GridItemColSpan;
  };

  /**
   * Render as a child element using the Slot pattern
   * When true, merges props with the child element
   * @default false
   * @example
   * ```tsx
   * <GridItem asChild colSpan={2}>
   *   <article>
   *     Article that spans 2 columns
   *   </article>
   * </GridItem>
   * ```
   */
  asChild?: boolean;

  /**
   * Content to render inside the grid item
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes to apply to the grid item
   * @example
   * ```tsx
   * <GridItem className="bg-white shadow-lg rounded-lg">
   *   Styled grid item
   * </GridItem>
   * ```
   */
  className?: string;

  /**
   * Accessible label for the grid item
   * @example
   * ```tsx
   * <GridItem role="listitem" aria-label="Featured product">
   *   <ProductCard />
   * </GridItem>
   * ```
   */
  "aria-label"?: string;

  /**
   * ID of element that labels this grid item
   * @example
   * ```tsx
   * <h3 id="item-title">Product Name</h3>
   * <GridItem aria-labelledby="item-title">
   *   <ProductDetails />
   * </GridItem>
   * ```
   */
  "aria-labelledby"?: string;

  /**
   * ID of element that describes this grid item
   * @example
   * ```tsx
   * <GridItem aria-describedby="item-desc">
   *   <ProductCard />
   * </GridItem>
   * <p id="item-desc">This product is on sale</p>
   * ```
   */
  "aria-describedby"?: string;

  /**
   * ARIA role for the grid item
   * Use 'listitem' when Grid has role="list"
   * @example
   * ```tsx
   * <Grid role="list">
   *   <GridItem role="listitem">Item 1</GridItem>
   *   <GridItem role="listitem">Item 2</GridItem>
   * </Grid>
   * ```
   */
  role?: string;
}
