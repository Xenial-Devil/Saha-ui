import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ListProps } from "./List.types";

// CVA variants for List
const listVariants = cva("w-full transition-all duration-200", {
  variants: {
    variant: {
      default: "space-y-2",
      bordered: "border border-border rounded-xl overflow-hidden",
      divided: "divide-y divide-border",
      striped: "space-y-0",
      cards: "space-y-3",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

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

    return (
      <Component
        ref={ref as any}
        className={cn(listVariants({ variant, size }), className)}
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
