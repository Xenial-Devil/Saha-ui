import React, { createContext, useContext } from "react";
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
import {
  fieldSetVariants,
  legendVariants,
  fieldGroupVariants,
  fieldContainerVariants,
  fieldLabelVariants,
  fieldDescriptionVariants,
  fieldErrorVariants,
  fieldHintVariants,
} from "./Field.styles";

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
      disabled = false,
      required = false,
      invalid = false,
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

export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
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

export const FieldHint = React.forwardRef<HTMLParagraphElement, FieldHintProps>(
  ({ size, className, children, ...props }, ref) => {
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
  }
);

FieldHint.displayName = "FieldHint";

export type { FieldSetProps, FieldGroupProps, FieldProps };
