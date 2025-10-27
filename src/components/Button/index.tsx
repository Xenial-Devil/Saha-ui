import React, { useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ButtonProps } from "./Button.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";

// Define button variants using CVA
const buttonVariants = cva(
  // Base styles - applied to all buttons
  "group relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:saturate-50 overflow-hidden isolate",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_4px_14px_0] shadow-primary/40 hover:shadow-[0_6px_20px_0] hover:shadow-primary/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_4px_14px_0] shadow-secondary/40 hover:shadow-[0_6px_20px_0] hover:shadow-secondary/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        accent:
          "bg-accent text-accent-foreground shadow-[0_4px_14px_0] shadow-accent/40 hover:shadow-[0_6px_20px_0] hover:shadow-accent/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        info: "bg-info text-info-foreground shadow-[0_4px_14px_0] shadow-info/40 hover:shadow-[0_6px_20px_0] hover:shadow-info/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        success:
          "bg-success text-success-foreground shadow-[0_4px_14px_0] shadow-success/40 hover:shadow-[0_6px_20px_0] hover:shadow-success/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        warning:
          "bg-warning text-warning-foreground shadow-[0_4px_14px_0] shadow-warning/40 hover:shadow-[0_6px_20px_0] hover:shadow-warning/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        error:
          "bg-destructive text-destructive-foreground shadow-[0_4px_14px_0] shadow-destructive/40 hover:shadow-[0_6px_20px_0] hover:shadow-destructive/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        outline:
          "border-2 border-primary/60 text-primary bg-transparent hover:text-primary-foreground shadow-sm hover:shadow-[0_4px_14px_0] hover:shadow-primary/30 before:absolute before:inset-0 before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out before:origin-left active:before:scale-x-100",
        ghost:
          "bg-transparent hover:bg-accent/15 active:bg-accent/25 text-foreground shadow-sm hover:shadow-md transition-colors",
        glass:
          "glass backdrop-blur-2xl border-2 border-border/30 hover:border-primary/40 shadow-[0_8px_32px_0] shadow-black/10 hover:shadow-[0_12px_48px_0] hover:shadow-primary/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
      },
      size: {
        sm: "h-9 px-4 text-sm gap-2 min-w-[4rem] rounded-xl",
        md: "h-11 px-6 text-base gap-2.5 min-w-[5rem] rounded-xl",
        lg: "h-13 px-8 text-lg gap-3 min-w-[6rem] rounded-2xl",
        xl: "h-16 px-10 text-xl gap-3.5 min-w-[7rem] rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Shimmer effect classes
const shimmerVariants = cva("", {
  variants: {
    variant: {
      primary:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      secondary:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      accent:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      info: "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      success:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      warning:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      error:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      outline: "",
      ghost: "",
      glass: "",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Button");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "primary",
        "secondary",
        "accent",
        "info",
        "success",
        "warning",
        "error",
        "outline",
        "ghost",
        "glass",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg", "xl"] as const);

      // Validate boolean props
      validator.validateType("disabled", disabled, "boolean", isValidBoolean);

      // Validate content
      if (!children) {
        validator.warn("Button should have children content for accessibility");
      }

      // Common validators
      commonValidators.className(validator, className);
      commonValidators.disabled(validator, disabled);
    }, [variant, size, disabled, children, className]);

    const hasGlow = !["outline", "ghost", "glass"].includes(variant);

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          shimmerVariants({ variant }),
          className
        )}
        disabled={disabled}
        {...props}
      >
        {/* Ripple effect container */}
        <span className="absolute inset-0 rounded-inherit overflow-hidden">
          <span className="absolute inset-0 bg-white/0 group-active:bg-white/20 transition-colors duration-150 rounded-inherit"></span>
        </span>

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-inherit font-semibold tracking-wide">
          {children}
        </span>

        {/* Glow effect on hover for colored variants */}
        {hasGlow && (
          <span className="absolute -inset-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
export { buttonVariants };
