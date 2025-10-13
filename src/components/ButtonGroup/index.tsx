import React, { createContext, useContext } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type {
  ButtonGroupProps,
  ButtonGroupVariant,
  ButtonGroupOrientation,
  ButtonGroupSize,
} from "./ButtonGroup.types";

interface ButtonGroupContextValue {
  variant: ButtonGroupVariant;
  size: ButtonGroupSize;
  orientation: ButtonGroupOrientation;
  fullRounded: boolean;
  fullWidth: boolean;
  attached: boolean;
}

const ButtonGroupContext = createContext<ButtonGroupContextValue | undefined>(
  undefined
);

export const useButtonGroup = () => {
  const context = useContext(ButtonGroupContext);
  if (!context) {
    throw new Error("Button must be used within a ButtonGroup");
  }
  return context;
};

const buttonGroupVariants = cva(
  "inline-flex isolate relative transition-all duration-300",
  {
    variants: {
      variant: {
        default: "shadow-md hover:shadow-xl",
        outline:
          "border border-border rounded-xl hover:border-primary/50 hover:shadow-lg",
        ghost: "hover:shadow-md",
        glass:
          "backdrop-blur-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 shadow-lg hover:shadow-2xl hover:bg-white/10 dark:hover:bg-black/10 rounded-xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:rounded-xl",
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
    const processedChildren = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;

      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;

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

        let borderClasses = "";
        if (variant === "outline" || variant === "ghost") {
          if (orientation === "horizontal" && !isLast) {
            borderClasses = "border-r-0";
          } else if (orientation === "vertical" && !isLast) {
            borderClasses = "border-b-0";
          }
        }

        const zIndexClasses = "hover:z-10 focus:z-10 active:z-10";
        const widthClasses = fullWidth ? "flex-1" : "";

        const childProps = child.props as Record<string, any>;
        return React.cloneElement(child as React.ReactElement<any>, {
          className: cn(
            childProps.className,
            roundingClasses,
            borderClasses,
            zIndexClasses,
            widthClasses
          ),
          size: childProps.size || size,
        });
      }

      const childProps = child.props as Record<string, any>;
      return React.cloneElement(child as React.ReactElement<any>, {
        className: cn(childProps.className, fullWidth && "flex-1"),
        size: childProps.size || size,
      });
    });

    const contextValue: ButtonGroupContextValue = {
      variant,
      size,
      orientation,
      fullRounded,
      fullWidth,
      attached,
    };

    return (
      <ButtonGroupContext.Provider value={contextValue}>
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
      </ButtonGroupContext.Provider>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup, buttonGroupVariants };
