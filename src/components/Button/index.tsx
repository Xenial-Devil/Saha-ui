import React from "react";
import { cn } from "../../lib/utils";
import { ButtonProps } from "./Button.types";
import { buttonVariants, shimmerVariants } from "./Button.styles";

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
