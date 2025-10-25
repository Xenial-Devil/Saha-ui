import React, { forwardRef, useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";
import type { SwitchProps } from "./Switch.types";

/**
 * Switch Component
 *
 * A modern toggle switch with beautiful animations, icons, and multiple variants.
 * Features loading states, icons, badges, and smooth transitions.
 *
 * @variant default - Standard style
 * @variant primary - Primary color theme
 * @variant secondary - Secondary color theme
 * @variant accent - Accent color theme
 * @variant success - Success color theme
 * @variant warning - Warning color theme
 * @variant error - Error color theme
 *
 * @size sm | md | lg - Size variations
 */

/**
 * Switch track (background) variants using CVA
 */
export const switchVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer rounded-full",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "border-2",
    // Shadow effects
    "shadow-inner hover:shadow-md",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-muted",
          "data-[state=checked]:bg-foreground data-[state=checked]:border-foreground",
          "focus-visible:ring-ring/50",
        ],
        primary: [
          "border-primary/40 bg-primary/10",
          "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
          "focus-visible:ring-primary/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-primary/40",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/10",
          "data-[state=checked]:bg-secondary data-[state=checked]:border-secondary",
          "focus-visible:ring-secondary/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-secondary/40",
        ],
        accent: [
          "border-accent/40 bg-accent/10",
          "data-[state=checked]:bg-accent data-[state=checked]:border-accent",
          "focus-visible:ring-accent/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-accent/40",
        ],
        success: [
          "border-success/40 bg-success/10",
          "data-[state=checked]:bg-success data-[state=checked]:border-success",
          "focus-visible:ring-success/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-success/40",
        ],
        warning: [
          "border-warning/40 bg-warning/10",
          "data-[state=checked]:bg-warning data-[state=checked]:border-warning",
          "focus-visible:ring-warning/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-warning/40",
        ],
        error: [
          "border-destructive/40 bg-destructive/10",
          "data-[state=checked]:bg-destructive data-[state=checked]:border-destructive",
          "focus-visible:ring-destructive/50",
          "data-[state=checked]:shadow-lg data-[state=checked]:shadow-destructive/40",
        ],
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Switch thumb (the moving circle) variants
 */
const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-white shadow-lg",
    "transition-all duration-300 ease-out",
    "flex items-center justify-center",
    "data-[state=checked]:translate-x-full",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4 text-[10px] data-[state=checked]:translate-x-4",
        md: "h-5 w-5 text-xs data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 text-sm data-[state=checked]:translate-x-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Switch label wrapper variants
 */
const switchLabelVariants = cva(
  [
    "inline-flex items-center gap-3 cursor-pointer select-none",
    "transition-all duration-300",
    "group",
  ],
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

/**
 * Switch text variants
 */
const switchTextVariants = cva(
  ["font-medium transition-colors duration-300", "group-hover:text-foreground"],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      disabled: {
        true: "text-muted-foreground",
        false: "text-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

/**
 * Switch description variants
 */
const switchDescriptionVariants = cva(
  ["text-sm text-muted-foreground transition-colors duration-300"],
  {
    variants: {
      disabled: {
        true: "opacity-70",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

/**
 * Loading spinner for switch
 */
const LoadingSpinner = ({ size }: { size: "sm" | "md" | "lg" }) => {
  const spinnerSize =
    size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        spinnerSize
      )}
    />
  );
};

/**
 * Switch component
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      description,
      error,
      helperText,
      labelPosition = "right",
      variant = "primary",
      size = "md",
      className,
      disabled,
      checked: controlledChecked,
      defaultChecked,
      onChange,
      onCheckedChange,
      onIcon,
      offIcon,
      loading = false,
      badge,
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(
      defaultChecked || false
    );
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    // ===== PROP VALIDATION =====
    useEffect(() => {
      if (process.env.NODE_ENV !== "production") {
        const validator = createValidator("Switch");

        // Common validators
        commonValidators.size(validator, size);
        const switchVariants = [
          "default",
          "primary",
          "secondary",
          "accent",
          "success",
          "warning",
          "error",
        ] as const;
        commonValidators.variant(validator, variant, switchVariants);
        commonValidators.disabled(validator, disabled);
        commonValidators.className(validator, className);

        // Boolean validations
        if (checked !== undefined && !isValidBoolean(checked)) {
          validator.error("Invalid prop: 'checked' must be a boolean.");
        }
        if (defaultChecked !== undefined && !isValidBoolean(defaultChecked)) {
          validator.error("Invalid prop: 'defaultChecked' must be a boolean.");
        }
        if (loading !== undefined && !isValidBoolean(loading)) {
          validator.error("Invalid prop: 'loading' must be a boolean.");
        }

        // Label position validation
        if (
          labelPosition &&
          !["left", "right", "top", "bottom"].includes(labelPosition)
        ) {
          validator.error(
            "Invalid prop: 'labelPosition' must be one of: 'left', 'right', 'top', 'bottom'."
          );
        }
      }
    }, [
      variant,
      size,
      disabled,
      className,
      checked,
      defaultChecked,
      loading,
      labelPosition,
    ]);
    // ===== END PROP VALIDATION =====

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;

      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }

      onChange?.(e);
      onCheckedChange?.(newChecked);
    };

    const switchControl = (
      <label className="relative inline-block">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className="sr-only peer"
          disabled={disabled || loading}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(switchVariants({ variant, size }), className)}
          data-state={checked ? "checked" : "unchecked"}
        >
          <div
            className={cn(switchThumbVariants({ size }))}
            data-state={checked ? "checked" : "unchecked"}
          >
            {loading ? (
              <LoadingSpinner size={size || "md"} />
            ) : checked && onIcon ? (
              <span className="text-primary">{onIcon}</span>
            ) : !checked && offIcon ? (
              <span className="text-muted-foreground">{offIcon}</span>
            ) : null}
          </div>
        </div>
      </label>
    );

    if (!label && !description) {
      return switchControl;
    }

    return (
      <div className="flex flex-col gap-2">
        <label
          className={cn(switchLabelVariants({ disabled: disabled || loading }))}
        >
          {labelPosition === "left" && (label || description) && (
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {label && (
                    <span
                      className={cn(
                        switchTextVariants({
                          size,
                          disabled: disabled || loading,
                        })
                      )}
                    >
                      {label}
                    </span>
                  )}
                  {badge && (
                    <span className="px-1.5 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded">
                      {badge}
                    </span>
                  )}
                </div>
                {description && (
                  <span
                    className={cn(
                      switchDescriptionVariants({
                        disabled: disabled || loading,
                      })
                    )}
                  >
                    {description}
                  </span>
                )}
              </div>
            </div>
          )}

          {switchControl}

          {labelPosition === "right" && (label || description) && (
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {label && (
                    <span
                      className={cn(
                        switchTextVariants({
                          size,
                          disabled: disabled || loading,
                        })
                      )}
                    >
                      {label}
                    </span>
                  )}
                  {badge && (
                    <span className="px-1.5 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded">
                      {badge}
                    </span>
                  )}
                </div>
                {description && (
                  <span
                    className={cn(
                      switchDescriptionVariants({
                        disabled: disabled || loading,
                      })
                    )}
                  >
                    {description}
                  </span>
                )}
              </div>
            </div>
          )}
        </label>

        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
