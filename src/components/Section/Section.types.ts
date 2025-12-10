/**
 * Visual style variants for the Section component
 * @example
 * <Section variant="default">Default section</Section>
 * <Section variant="muted">Muted section</Section>
 * <Section variant="accent">Accent section</Section>
 */
export type SectionVariant = "default" | "muted" | "accent" | "gradient";

/**
 * Padding size variants for the Section component
 * Accepts predefined tokens, numbers (px), or string with units
 * @example
 * <Section padding="sm">Small padding</Section>
 * <Section padding="lg">Large padding</Section>
 * <Section padding={32}>32px padding</Section>
 * <Section padding="2rem">Custom padding</Section>
 */
export type SectionPadding =
  | "none"
  | "sm"
  | "default"
  | "lg"
  | "xl"
  | number
  | string;

/**
 * Maximum width variants for the Section component
 * @example
 * <Section maxWidth="md">Medium width</Section>
 * <Section maxWidth="full">Full width</Section>
 */
export type SectionMaxWidth = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

/**
 * Props for the Section component
 *
 * A semantic section component with visual variants, padding options, and
 * max-width constraints. Perfect for creating distinct page sections with
 * consistent styling and spacing.
 *
 * Fully accessible with ARIA attributes and semantic HTML support.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Section>
 *   <h2>Section Title</h2>
 *   <p>Section content</p>
 * </Section>
 *
 * // With variant and padding
 * <Section variant="muted" padding="lg">
 *   <Container>
 *     <h2>Features</h2>
 *     <Grid cols={3}>
 *       <FeatureCard />
 *     </Grid>
 *   </Container>
 * </Section>
 *
 * // Full height hero section
 * <Section variant="gradient" fullHeight>
 *   <Stack align="center" justify="center">
 *     <h1>Welcome</h1>
 *     <Button>Get Started</Button>
 *   </Stack>
 * </Section>
 *
 * // With accessibility
 * <Section role="region" aria-labelledby="features-heading">
 *   <h2 id="features-heading">Features</h2>
 *   <p>Feature content</p>
 * </Section>
 * ```
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Visual style variant of the section
   * Controls background color and styling
   * @default 'default'
   * @example
   * ```tsx
   * <Section variant="default">Default background</Section>
   * <Section variant="muted">Muted gray background</Section>
   * <Section variant="accent">Accent color background</Section>
   * <Section variant="gradient">Gradient background</Section>
   * ```
   */
  variant?: SectionVariant;

  /**
   * Vertical padding size
   * Controls spacing above and below content
   * @default 'default'
   * @example
   * ```tsx
   * <Section padding="none">No padding</Section>
   * <Section padding="sm">Small padding (py-8 sm:py-12)</Section>
   * <Section padding="default">Default padding (py-12 sm:py-16)</Section>
   * <Section padding="lg">Large padding (py-16 sm:py-24)</Section>
   * <Section padding="xl">Extra large padding (py-24 sm:py-32)</Section>
   * ```
   */
  padding?: SectionPadding;

  /**
   * Maximum width of content container inside section
   * Constrains content width while allowing full-width backgrounds
   * @default 'lg'
   * @example
   * ```tsx
   * <Section maxWidth="sm">Small max width</Section>
   * <Section maxWidth="lg">Large max width (default)</Section>
   * <Section maxWidth="full">No width constraint</Section>
   * ```
   */
  maxWidth?: SectionMaxWidth;

  /**
   * Center content horizontally within the section
   * Applies mx-auto to center the max-width container
   * @default true
   * @example
   * ```tsx
   * <Section center={true}>Centered content</Section>
   * <Section center={false}>Left-aligned content</Section>
   * ```
   */
  center?: boolean;

  /**
   * Add border to the section
   * Adds top and bottom borders
   * @default false
   * @example
   * ```tsx
   * <Section bordered>Section with borders</Section>
   * ```
   */
  bordered?: boolean;

  /**
   * Make section fill the full viewport height
   * Perfect for hero sections and landing pages
   * @default false
   * @example
   * ```tsx
   * <Section fullHeight variant="gradient">
   *   <Stack align="center" justify="center">
   *     <h1>Hero Title</h1>
   *   </Stack>
   * </Section>
   * ```
   */
  fullHeight?: boolean;

  /**
   * Render as a child element using the Slot pattern
   * When true, merges props with the child element
   * @default false
   * @example
   * ```tsx
   * <Section asChild variant="muted">
   *   <article>
   *     Article with section styles
   *   </article>
   * </Section>
   * ```
   */
  asChild?: boolean;

  /**
   * Add responsive horizontal padding (gutter)
   * Provides left and right padding that adapts to screen size
   * @default true
   * @example
   * ```tsx
   * <Section gutter={true}>Has horizontal padding</Section>
   * <Section gutter={false}>Full bleed content</Section>
   * ```
   */
  gutter?: boolean;

  /**
   * Content to render inside the section
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes to apply to the section
   * @example
   * ```tsx
   * <Section className="shadow-lg">
   *   Custom styled section
   * </Section>
   * ```
   */
  className?: string;

  /**
   * Accessible label for the section
   * Provides a descriptive label for screen readers
   * @example
   * ```tsx
   * <Section role="region" aria-label="Featured products">
   *   <ProductGrid />
   * </Section>
   *
   * <Section role="region" aria-label="Customer testimonials">
   *   <TestimonialList />
   * </Section>
   * ```
   */
  "aria-label"?: string;

  /**
   * ID of element that labels this section
   * @example
   * ```tsx
   * <h2 id="features-heading">Our Features</h2>
   * <Section role="region" aria-labelledby="features-heading">
   *   <FeatureList />
   * </Section>
   * ```
   */
  "aria-labelledby"?: string;

  /**
   * ID of element that describes this section
   * @example
   * ```tsx
   * <Section aria-describedby="section-description">
   *   <Content />
   * </Section>
   * <p id="section-description">This section contains featured content</p>
   * ```
   */
  "aria-describedby"?: string;

  /**
   * ARIA role for the section
   * Use 'region' for important sections that should be landmarks
   * @example
   * ```tsx
   * <Section role="region" aria-label="Main content">
   *   Content
   * </Section>
   * ```
   */
  role?: string;
}
