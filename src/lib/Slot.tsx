import React from "react";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Slot component for asChild pattern (like shadcn/ui)
 * Merges props with the child element
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      const childProps = children.props as Record<string, any>;

      return React.cloneElement(children, {
        ...props,
        ...childProps,
        ref,
        className:
          [props.className, childProps.className].filter(Boolean).join(" ") ||
          undefined,
        style: {
          ...props.style,
          ...childProps.style,
        },
      } as any);
    }

    if (React.Children.count(children) > 1) {
      React.Children.only(null);
    }

    return null;
  }
);

Slot.displayName = "Slot";
