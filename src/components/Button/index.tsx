import React from "react";
import { cn } from "../../lib/utils";
import { ButtonProps } from "./Button.types";
import { buttonVariants, shimmerVariants } from "./Button.styles";
import { Slot } from "../../lib/Slot";

/**
 * Loading spinner component displayed when button is in loading state
 * @private
 */

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Button component with multiple variants, sizes, and states
 *
 * @component
 * @example
 * // Basic button
 * <Button>Click me</Button>
 *
 * @example
 * // Button with variant and size
 * <Button variant="primary" size="lg">Large Primary</Button>
 *
 * @example
 * // Loading button
 * <Button loading>Saving...</Button>
 *
 * @example
 * // Button as link (asChild pattern)
 * <Button asChild>
 *   <a href="/home">Home</a>
 * </Button>
 *
 * @example
 * // Accessible button with icon
 * <Button aria-label="Close dialog">
 *   <XIcon />
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      className,
      children,
      disabled,
      asChild = false,
      loading,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-pressed": ariaPressed,
      "aria-expanded": ariaExpanded,
      "aria-controls": ariaControls,
      "aria-haspopup": ariaHasPopup,
      ...props
    },
    ref,
  ) => {
    const hasGlow = !["outline", "ghost", "glass"].includes(variant);
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          shimmerVariants({ variant }),
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading ? "true" : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-pressed={ariaPressed}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-haspopup={ariaHasPopup}
        aria-disabled={disabled || loading ? "true" : undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {/* Ripple effect container */}
            <span className="absolute inset-0 rounded-inherit overflow-hidden">
              <span className="absolute inset-0 bg-white/0 group-active:bg-white/20 transition-colors duration-150 rounded-inherit"></span>
            </span>

            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-inherit font-semibold tracking-wide">
              {loading && <LoadingSpinner />}
              {children}
            </span>

            {/* Glow effect on hover for colored variants */}
            {hasGlow && (
              <span className="absolute -inset-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></span>
            )}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export default Button;
export { buttonVariants };
