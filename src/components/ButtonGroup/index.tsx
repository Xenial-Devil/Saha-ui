import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { ButtonGroupProps } from "./ButtonGroup.types";

/**
 * ButtonGroup variants using CVA for type-safe styling
 */
const buttonGroupVariants = cva(
  // Base styles
  "inline-flex isolate relative",
  {
    variants: {
      variant: {
        default: "shadow-sm",
        outline: "border border-border rounded-xl",
        ghost: "",
        glass:
          "backdrop-blur-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 shadow-lg rounded-xl",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      attached: {
        true: "gap-0",
        false: "",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        attached: false,
        className: "gap-2",
      },
      {
        orientation: "vertical",
        attached: false,
        className: "gap-2",
      },
    ],
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      fullWidth: false,
      attached: true,
    },
  }
);

/**
 * ButtonGroup Component
 *
 * A container component that groups multiple buttons together with consistent styling.
 * Supports horizontal and vertical orientations, various visual variants, and flexible sizing.
 *
 * @example
 * ```tsx
 * // Basic horizontal group
 * <ButtonGroup>
 *   <Button>Left</Button>
 *   <Button>Center</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 *
 * // Vertical orientation
 * <ButtonGroup orientation="vertical">
 *   <Button>Top</Button>
 *   <Button>Middle</Button>
 *   <Button>Bottom</Button>
 * </ButtonGroup>
 *
 * // Glass variant with full width
 * <ButtonGroup variant="glass" fullWidth>
 *   <Button>Save</Button>
 *   <Button>Cancel</Button>
 * </ButtonGroup>
 *
 * // Detached buttons (with gaps)
 * <ButtonGroup attached={false}>
 *   <Button variant="primary">Accept</Button>
 *   <Button variant="ghost">Decline</Button>
 * </ButtonGroup>
 * ```
 */
const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      variant = "default",
      size = "md",
      orientation = "horizontal",
      fullRounded = false,
      fullWidth = false,
      attached = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Clone children and apply additional props for seamless integration
    const processedChildren = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;

      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;

      // Determine rounding classes based on position and orientation
      let roundingClasses = "";

      if (attached) {
        if (orientation === "horizontal") {
          if (fullRounded) {
            if (isFirst) roundingClasses = "rounded-l-full rounded-r-none";
            else if (isLast) roundingClasses = "rounded-r-full rounded-l-none";
            else roundingClasses = "rounded-none";
          } else {
            if (isFirst) roundingClasses = "rounded-l-xl rounded-r-none";
            else if (isLast) roundingClasses = "rounded-r-xl rounded-l-none";
            else roundingClasses = "rounded-none";
          }
        } else {
          // vertical
          if (fullRounded) {
            if (isFirst) roundingClasses = "rounded-t-full rounded-b-none";
            else if (isLast) roundingClasses = "rounded-b-full rounded-t-none";
            else roundingClasses = "rounded-none";
          } else {
            if (isFirst) roundingClasses = "rounded-t-xl rounded-b-none";
            else if (isLast) roundingClasses = "rounded-b-xl rounded-t-none";
            else roundingClasses = "rounded-none";
          }
        }

        // Add border handling for attached buttons
        let borderClasses = "";
        if (variant === "outline" || variant === "ghost") {
          if (orientation === "horizontal" && !isLast) {
            borderClasses = "border-r-0";
          } else if (orientation === "vertical" && !isLast) {
            borderClasses = "border-b-0";
          }
        }

        // Add z-index for hover effects
        const zIndexClasses = "hover:z-10 focus:z-10 active:z-10";

        // Width handling for fullWidth
        const widthClasses = fullWidth ? "flex-1" : "";

        const props = child.props as Record<string, any>;
        return React.cloneElement(child as React.ReactElement<any>, {
          className: cn(
            props.className,
            roundingClasses,
            borderClasses,
            zIndexClasses,
            widthClasses
          ),
          size: props.size || size,
        });
      }

      // For detached buttons, just pass the size
      const props = child.props as Record<string, any>;
      return React.cloneElement(child as React.ReactElement<any>, {
        className: cn(props.className, fullWidth && "flex-1"),
        size: props.size || size,
      });
    });

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          buttonGroupVariants({
            variant,
            orientation,
            fullWidth,
            attached,
          }),
          className
        )}
        {...props}
      >
        {processedChildren}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
export { buttonGroupVariants };
