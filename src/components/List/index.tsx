import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ListProps } from "./List.types";

// CVA variants for List
const listVariants = cva("w-full transition-all duration-200", {
  variants: {
    variant: {
      default: "space-y-2 list-inside",
      bordered:
        "border-2 border-border rounded-xl overflow-hidden p-4 shadow-sm hover:shadow-md transition-shadow",
      divided: "divide-y divide-border/50",
      striped: "space-y-0",
      cards: "space-y-3",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  compoundVariants: [
    {
      variant: "bordered",
      className: "bg-card/50 backdrop-blur-sm",
    },
    {
      variant: "cards",
      className: "bg-transparent",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

/**
 * List Component
 *
 * A versatile list component with multiple visual styles and marker types.
 * Supports both ordered and unordered lists with various styling options.
 *
 * @example
 * ```tsx
 * // Basic list
 * <List listType="disc">
 *   <li>Item 1</li>
 *   <li>Item 2</li>
 * </List>
 *
 * // Bordered variant
 * <List variant="bordered" listType="decimal" ordered>
 *   <li>First step</li>
 *   <li>Second step</li>
 * </List>
 *
 * // With custom styling
 * <List variant="cards" size="lg">
 *   <li>Feature 1</li>
 *   <li>Feature 2</li>
 * </List>
 * ```
 */
const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  (
    {
      children,
      listType = "disc",
      variant = "default",
      size = "md",
      ordered = false,
      className,
      ...props
    },
    ref
  ) => {
    const listStyle = listType !== "none" ? listType : undefined;
    const Component = ordered ? "ol" : "ul";

    // Add appropriate padding based on variant
    const paddingClasses = cn({
      "px-6": variant === "default" && listType !== "none",
      "px-0": variant === "cards" || variant === "divided",
    });

    return (
      <Component
        ref={ref as any}
        className={cn(
          listVariants({ variant, size }),
          paddingClasses,
          className
        )}
        style={{ listStyleType: listStyle }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

List.displayName = "List";

export default List;
export { listVariants };
