/**
 * Size variants for the Container component
 * Controls the maximum width of the container
 * @example
 * <Container size="sm">Small container</Container>
 * <Container size="lg">Large container</Container>
 * <Container size="full">Full width container</Container>
 */
export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

/**
 * Padding variants for the Container component
 * Controls the vertical padding
 * @example
 * <Container padding="none">No padding</Container>
 * <Container padding="lg">Large padding</Container>
 */
export type ContainerPadding = "none" | "sm" | "default" | "lg";

/**
 * Props for the Container component
 *
 * A responsive container component that constrains content width and provides
 * consistent spacing. Supports various sizes, padding options, and centering.
 * Fully accessible with ARIA attributes and semantic HTML support.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Container>
 *   <h1>Page Content</h1>
 * </Container>
 *
 * // Custom size
 * <Container size="md">
 *   <p>Medium width content</p>
 * </Container>
 *
 * // No padding or gutter
 * <Container padding="none" gutter={false}>
 *   <FullBleedContent />
 * </Container>
 *
 * // As a different element
 * <Container asChild>
 *   <main>Main content</main>
 * </Container>
 *
 * // With accessibility
 * <Container role="main" aria-label="Main content area">
 *   <article>Content</article>
 * </Container>
 * ```
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width variant of the container
   * Determines the maximum width constraint for the content
   * @default 'lg'
   * @example
   * ```tsx
   * <Container size="xs">Extra small - max-w-3xl</Container>
   * <Container size="sm">Small - max-w-4xl</Container>
   * <Container size="md">Medium - max-w-5xl</Container>
   * <Container size="lg">Large - max-w-7xl (default)</Container>
   * <Container size="xl">Extra large - max-w-[1400px]</Container>
   * <Container size="2xl">2X large - max-w-[1600px]</Container>
   * <Container size="full">Full width - max-w-full</Container>
   * ```
   */
  size?: ContainerSize;

  /**
   * Vertical padding variant
   * Controls the amount of vertical spacing (top and bottom)
   * @default 'default'
   * @example
   * ```tsx
   * <Container padding="none">No vertical padding</Container>
   * <Container padding="sm">Small padding (py-4 sm:py-6)</Container>
   * <Container padding="default">Default padding (py-6 sm:py-8 md:py-10)</Container>
   * <Container padding="lg">Large padding (py-8 sm:py-12 md:py-16)</Container>
   * ```
   */
  padding?: ContainerPadding;

  /**
   * Center the container horizontally
   * Applies mx-auto to center the container within its parent
   * @default true
   * @example
   * ```tsx
   * <Container center={true}>Centered container</Container>
   * <Container center={false}>Left-aligned container</Container>
   * ```
   */
  center?: boolean;

  /**
   * Render as a child element using the Slot pattern
   * When true, merges props with the child element instead of rendering a div
   * @default false
   * @example
   * ```tsx
   * <Container asChild>
   *   <main>Renders as main element with container styles</main>
   * </Container>
   *
   * <Container asChild>
   *   <section aria-label="Content">Section with container styles</section>
   * </Container>
   * ```
   */
  asChild?: boolean;

  /**
   * Add responsive horizontal padding (gutter)
   * Provides left and right padding that adapts to screen size
   * @default true
   * @example
   * ```tsx
   * <Container gutter={true}>
   *   Has horizontal padding (px-4 sm:px-6 lg:px-8)
   * </Container>
   *
   * <Container gutter={false}>
   *   No horizontal padding - full bleed
   * </Container>
   * ```
   */
  gutter?: boolean;

  /**
   * Content to render inside the container
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes to apply to the container
   * @example
   * ```tsx
   * <Container className="bg-gray-50 shadow-lg">
   *   Custom styled container
   * </Container>
   * ```
   */
  className?: string;

  /**
   * Accessible label for the container
   * Provides a descriptive label for screen readers
   * @example
   * ```tsx
   * <Container role="main" aria-label="Main content area">
   *   <article>Article content</article>
   * </Container>
   *
   * <Container role="region" aria-label="Featured products">
   *   <ProductList />
   * </Container>
   * ```
   */
  "aria-label"?: string;

  /**
   * ID of element that labels this container
   * @example
   * ```tsx
   * <h1 id="page-title">Welcome</h1>
   * <Container role="region" aria-labelledby="page-title">
   *   <p>Page content</p>
   * </Container>
   * ```
   */
  "aria-labelledby"?: string;

  /**
   * ID of element that describes this container
   * @example
   * ```tsx
   * <Container aria-describedby="container-description">
   *   <p>Content</p>
   * </Container>
   * <p id="container-description">This section contains featured content</p>
   * ```
   */
  "aria-describedby"?: string;

  /**
   * ARIA role for the container
   * Defines the semantic role of the container for screen readers
   * @example
   * ```tsx
   * <Container role="main">Main content</Container>
   * <Container role="region" aria-label="Sidebar">Sidebar content</Container>
   * <Container role="complementary">Supplementary content</Container>
   * ```
   */
  role?: string;
}
