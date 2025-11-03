import React, { forwardRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";
import type { SwitchProps } from "./Switch.types";
import {
  switchVariants,
  switchThumbVariants,
  switchLabelVariants,
  switchTextVariants,
  switchDescriptionVariants,
} from "./Switch.styles";

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
