// src/lib/Slot.tsx
import React from "react";

/**
 * Slot props - accepts any HTML/form element attributes
 */
export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  name?: string;
  value?: string | number | readonly string[];
  type?: string;
  placeholder?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  defaultValue?: string | number | readonly string[];
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  multiple?: boolean;
  accept?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  form?: string;
  list?: string;
  size?: number;
  cols?: number;
  rows?: number;
  wrap?: string;
}

/**
 * Slot component for asChild pattern
 * Merges props with the child element
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      const childProps = children.props as Record<string, unknown>;

      const mergedClassName =
        [props.className, childProps.className as string | undefined]
          .filter(Boolean)
          .join(" ") || undefined;

      const mergedStyle = {
        ...(props.style as React.CSSProperties | undefined),
        ...(childProps.style as React.CSSProperties | undefined),
      };

      return React.cloneElement(
        children as React.ReactElement<Record<string, unknown>>,
        {
          ...props,
          ...childProps,
          ref,
          className: mergedClassName,
          style: Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined,
        }
      );
    }

    if (React.Children.count(children) > 1) {
      React.Children.only(null);
    }

    return null;
  }
);

Slot.displayName = "Slot";
