import React from "react";
import { Slot } from "../../lib/Slot";
import { cn } from "../../lib/utils";
import { sectionVariants } from "./Section.styles";
import { SectionProps } from "./Section.types";

/**
 * Section Component
 *
 * A semantic section component with visual variants, padding options, and
 * max-width constraints. Perfect for creating distinct page sections with
 * consistent styling and spacing. Ideal for landing pages, marketing sites,
 * and multi-section layouts.
 *
 * Fully accessible with ARIA attributes and semantic HTML support.
 *
 * @component
 * @example
 * ```tsx
 * // Basic section
 * <Section>
 *   <h2>Section Title</h2>
 *   <p>Content goes here</p>
 * </Section>
 *
 * // Muted background section
 * <Section variant="muted" padding="lg">
 *   <h2>Features</h2>
 *   <Grid cols={3}>
 *     <FeatureCard />
 *   </Grid>
 * </Section>
 *
 * // Hero section (full height, gradient)
 * <Section variant="gradient" fullHeight padding="none">
 *   <Stack align="center" justify="center" className="h-full">
 *     <h1>Welcome to Our Site</h1>
 *     <Button size="lg">Get Started</Button>
 *   </Stack>
 * </Section>
 *
 * // Section with narrow content
 * <Section maxWidth="md" variant="default" padding="xl">
 *   <article>
 *     <h1>Blog Post Title</h1>
 *     <p>Article content with optimal reading width</p>
 *   </article>
 * </Section>
 *
 * // Full-width section without gutter
 * <Section maxWidth="full" gutter={false} padding="lg">
 *   <FullBleedImage />
 * </Section>
 *
 * // With accessibility (landmark region)
 * <Section role="region" aria-labelledby="features-heading">
 *   <h2 id="features-heading">Our Features</h2>
 *   <FeatureList />
 * </Section>
 * ```
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant = "default",
      padding = "default",
      maxWidth = "lg",
      center = true,
      bordered = false,
      fullHeight = false,
      gutter = true,
      asChild = false,
      children,
      role,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "section";

    return (
      <Comp
        ref={ref}
        className={cn(
          sectionVariants({
            variant,
            padding,
            maxWidth,
            center,
            bordered,
            fullHeight,
            gutter,
          }),
          className,
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
  },
);

Section.displayName = "Section";
