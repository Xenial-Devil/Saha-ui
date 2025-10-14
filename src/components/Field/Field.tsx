import React, { createContext, useContext } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type {
  FieldSetProps,
  FieldGroupProps,
  FieldProps,
  FieldLabelProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldHintProps,
  FieldSize,
  FieldVariant,
} from "./Field.types";
import { AlertCircle, Info } from "lucide-react";

// Context for composable components
interface FieldContextValue {
  size: FieldSize;
  variant: FieldVariant;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
  htmlFor?: string;
}

const FieldContext = createContext<FieldContextValue | undefined>(undefined);

// ===== CVA Variants =====

const fieldSetVariants = cva(
  "border rounded-lg transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border bg-background",
        filled: "border-transparent bg-muted",
        outlined: "border-2 border-border bg-transparent",
        ghost: "border-transparent bg-transparent",
        glass: "border-border/30 bg-background/50 backdrop-blur-xl",
        primary: "border-primary bg-primary/5",
        success: "border-success bg-success/5",
        warning: "border-warning bg-warning/5",
        error: "border-danger bg-danger/5",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false,
    },
  }
);

const legendVariants = cva("font-semibold mb-4", {
  variants: {
    size: {
      sm: "text-sm px-2",
      md: "text-base px-3",
      lg: "text-lg px-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const fieldGroupVariants = cva("flex gap-4", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row flex-wrap",
    },
    spacing: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      columns: [2, 3, 4],
      className: "grid",
    },
  ],
  defaultVariants: {
    orientation: "vertical",
    spacing: "md",
    columns: 1,
  },
});

const fieldContainerVariants = cva("w-full", {
  variants: {
    orientation: {
      vertical: "flex flex-col gap-1.5",
      horizontal: "flex items-start gap-4",
    },
    disabled: {
      true: "opacity-60 cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    disabled: false,
  },
});

const fieldLabelVariants = cva(
  "block font-medium text-foreground transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      required: {
        true: "",
        false: "",
      },
      disabled: {
        true: "cursor-not-allowed text-muted-foreground",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      size: "md",
      required: false,
      disabled: false,
    },
  }
);

const fieldDescriptionVariants = cva(
  "text-muted-foreground transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      variant: {
        default: "text-muted-foreground",
        filled: "text-muted-foreground",
        outlined: "text-muted-foreground",
        ghost: "text-muted-foreground",
        glass: "text-muted-foreground",
        primary: "text-primary/80",
        success: "text-success/80",
        warning: "text-warning/80",
        error: "text-danger/80",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const fieldErrorVariants = cva(
  "flex items-start gap-1.5 text-danger font-medium animate-in slide-in-from-top-1 duration-200",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const fieldHintVariants = cva(
  "flex items-start gap-1.5 text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ===== FieldSet Component =====

export const FieldSet = React.forwardRef<HTMLFieldSetElement, FieldSetProps>(
  (
    {
      variant = "default",
      size = "md",
      disabled = false,
      legend,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <fieldset
        ref={ref}
        disabled={disabled}
        className={cn(fieldSetVariants({ variant, size, disabled }), className)}
        {...props}
      >
        {legend && (
          <legend className={legendVariants({ size })}>{legend}</legend>
        )}
        {children}
      </fieldset>
    );
  }
);

FieldSet.displayName = "FieldSet";

// ===== FieldGroup Component =====

export const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  (
    {
      orientation = "vertical",
      spacing = "md",
      columns = 1,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          fieldGroupVariants({ orientation, spacing, columns }),
          className
        )}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);

FieldGroup.displayName = "FieldGroup";

// ===== Field Component (Main) =====

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      variant = "default",
      size = "md",
      orientation = "vertical",
      labelPosition = "top",
      disabled = false,
      required = false,
      invalid = false,
      readOnly = false,
      label,
      description,
      error,
      hint,
      htmlFor,
      id,
      showOptional = false,
      showRequired = true,
      asteriskPosition = "after",
      renderLabel,
      renderDescription,
      renderError,
      renderHint,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue: FieldContextValue = {
      size,
      variant,
      disabled,
      required,
      invalid: invalid || !!error,
      htmlFor,
    };

    // If using composable API (children contains Field subcomponents)
    const hasComposableChildren = React.Children.toArray(children).some(
      (child) =>
        React.isValidElement(child) &&
        (child.type === FieldLabel ||
          child.type === FieldDescription ||
          child.type === FieldError ||
          child.type === FieldHint)
    );

    if (hasComposableChildren) {
      return (
        <FieldContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn(
              fieldContainerVariants({ orientation, disabled }),
              className
            )}
            id={id}
            {...props}
          >
            {children}
          </div>
        </FieldContext.Provider>
      );
    }

    // Props API
    return (
      <FieldContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            fieldContainerVariants({ orientation, disabled }),
            className
          )}
          id={id}
          {...props}
        >
          {/* Label */}
          {label &&
            (renderLabel ? (
              renderLabel({
                size,
                required,
                optional: showOptional && !required,
                disabled,
                htmlFor,
                asteriskPosition,
                children: label,
              })
            ) : (
              <FieldLabel
                htmlFor={htmlFor}
                required={required && showRequired}
                optional={showOptional && !required}
                asteriskPosition={asteriskPosition}
              >
                {label}
              </FieldLabel>
            ))}

          {/* Child element (input, textarea, etc.) */}
          {children}

          {/* Description */}
          {description &&
            !error &&
            (renderDescription ? (
              renderDescription({ size, variant, children: description })
            ) : (
              <FieldDescription>{description}</FieldDescription>
            ))}

          {/* Error */}
          {error &&
            (renderError ? (
              renderError({ size, children: error })
            ) : (
              <FieldError>{error}</FieldError>
            ))}

          {/* Hint */}
          {hint &&
            !error &&
            (renderHint ? (
              renderHint({ size, children: hint })
            ) : (
              <FieldHint>{hint}</FieldHint>
            ))}
        </div>
      </FieldContext.Provider>
    );
  }
);

Field.displayName = "Field";

// ===== FieldLabel Component =====

export const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  FieldLabelProps
>(
  (
    {
      size,
      required = false,
      optional = false,
      disabled = false,
      asteriskPosition = "after",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const context = useContext(FieldContext);
    const finalSize = size || context?.size || "md";
    const finalRequired = required || context?.required || false;
    const finalDisabled = disabled || context?.disabled || false;

    return (
      <label
        ref={ref}
        className={cn(
          fieldLabelVariants({
            size: finalSize,
            required: finalRequired,
            disabled: finalDisabled,
          }),
          className
        )}
        {...props}
      >
        {finalRequired && asteriskPosition === "before" && (
          <span className="text-danger mr-1">*</span>
        )}
        {children}
        {finalRequired && asteriskPosition === "after" && (
          <span className="text-danger ml-1">*</span>
        )}
        {optional && (
          <span className="text-muted-foreground font-normal ml-1.5 text-xs">
            (optional)
          </span>
        )}
      </label>
    );
  }
);

FieldLabel.displayName = "FieldLabel";

// ===== FieldDescription Component =====

export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(({ size, variant, className, children, ...props }, ref) => {
  const context = useContext(FieldContext);
  const finalSize = size || context?.size || "md";
  const finalVariant = variant || context?.variant || "default";

  return (
    <p
      ref={ref}
      className={cn(
        fieldDescriptionVariants({ size: finalSize, variant: finalVariant }),
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

FieldDescription.displayName = "FieldDescription";

// ===== FieldError Component =====

export const FieldError = React.forwardRef<
  HTMLParagraphElement,
  FieldErrorProps
>(({ size, className, children, ...props }, ref) => {
  const context = useContext(FieldContext);
  const finalSize = size || context?.size || "md";

  if (!children) return null;

  return (
    <p
      ref={ref}
      className={cn(fieldErrorVariants({ size: finalSize }), className)}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <AlertCircle
        size={finalSize === "sm" ? 14 : finalSize === "lg" ? 18 : 16}
        className="flex-shrink-0 mt-0.5"
      />
      <span>{children}</span>
    </p>
  );
});

FieldError.displayName = "FieldError";

// ===== FieldHint Component =====

export const FieldHint = React.forwardRef<
  HTMLParagraphElement,
  FieldHintProps
>(({ size, className, children, ...props }, ref) => {
  const context = useContext(FieldContext);
  const finalSize = size || context?.size || "md";

  if (!children) return null;

  return (
    <p
      ref={ref}
      className={cn(fieldHintVariants({ size: finalSize }), className)}
      {...props}
    >
      <Info
        size={finalSize === "sm" ? 14 : finalSize === "lg" ? 18 : 16}
        className="flex-shrink-0 mt-0.5"
      />
      <span>{children}</span>
    </p>
  );
});

FieldHint.displayName = "FieldHint";

export type { FieldSetProps, FieldGroupProps, FieldProps };
