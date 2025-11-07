import React from "react";
import { Slot } from "../../lib/Slot";
import { cn } from "../../lib/utils";
import { containerVariants } from "./Container.styles";
import { ContainerProps } from "./Container.types";

/**
 * Container Component
 *
 * A responsive container component that constrains content width and provides
 * consistent spacing across your application. Supports various max-width sizes,
 * padding options, and horizontal gutters.
 *
 * Fully accessible with ARIA attributes and semantic HTML support.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Container>
 *   <h1>Page Content</h1>
 *   <p>Your content here</p>
 * </Container>
 *
 * // Medium width container
 * <Container size="md">
 *   <article>Article content</article>
 * </Container>
 *
 * // Full bleed (no gutter or padding)
 * <Container size="full" padding="none" gutter={false}>
 *   <HeroImage />
 * </Container>
 *
 * // As semantic HTML element
 * <Container asChild>
 *   <main>
 *     Main content area
 *   </main>
 * </Container>
 *
 * // With accessibility
 * <Container role="main" aria-label="Main content area">
 *   <article>Accessible content</article>
 * </Container>
 *
 * // Left-aligned (not centered)
 * <Container center={false}>
 *   <div>Left-aligned content</div>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size = "lg",
      padding = "default",
      center = true,
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
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(
          containerVariants({ size, padding, center, gutter }),
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

Container.displayName = "Container";
