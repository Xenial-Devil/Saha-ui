import React, { forwardRef, createContext, useContext, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type {
  RadioProps,
  RadioGroupProps,
  RadioCardProps,
} from "./Radio.types";

/**
 * Radio Button Component
 *
 * A modern radio button with beautiful visual effects and multiple variants.
 * Features size options, color variants, and smooth animations.
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

// Radio Context for RadioGroup
interface RadioContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: RadioProps["variant"];
  size?: RadioProps["size"];
}

const RadioContext = createContext<RadioContextValue | undefined>(undefined);

const useRadioContext = () => {
  return useContext(RadioContext);
};

/**
 * Radio button variants using CVA
 */
export const radioVariants = cva(
  [
    "peer relative appearance-none shrink-0 rounded-full border-2",
    "transition-all duration-300 ease-out cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "checked:border-4",
    // Hover effects
    "hover:scale-110 active:scale-95",
    // Shadow effects
    "shadow-sm hover:shadow-md checked:shadow-lg",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background",
          "checked:border-foreground checked:bg-foreground/10",
          "focus-visible:ring-ring/50",
          "hover:border-foreground/60",
        ],
        primary: [
          "border-primary/40 bg-primary/5",
          "checked:border-primary checked:bg-primary/10",
          "focus-visible:ring-primary/50",
          "hover:border-primary/60",
          "checked:shadow-primary/40",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/5",
          "checked:border-secondary checked:bg-secondary/10",
          "focus-visible:ring-secondary/50",
          "hover:border-secondary/60",
          "checked:shadow-secondary/40",
        ],
        accent: [
          "border-accent/40 bg-accent/5",
          "checked:border-accent checked:bg-accent/10",
          "focus-visible:ring-accent/50",
          "hover:border-accent/60",
          "checked:shadow-accent/40",
        ],
        success: [
          "border-success/40 bg-success/5",
          "checked:border-success checked:bg-success/10",
          "focus-visible:ring-success/50",
          "hover:border-success/60",
          "checked:shadow-success/40",
        ],
        warning: [
          "border-warning/40 bg-warning/5",
          "checked:border-warning checked:bg-warning/10",
          "focus-visible:ring-warning/50",
          "hover:border-warning/60",
          "checked:shadow-warning/40",
        ],
        error: [
          "border-destructive/40 bg-destructive/5",
          "checked:border-destructive checked:bg-destructive/10",
          "focus-visible:ring-destructive/50",
          "hover:border-destructive/60",
          "checked:shadow-destructive/40",
        ],
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Radio label wrapper variants
 */
const radioLabelVariants = cva(
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
      card: {
        true: [
          "flex-col p-4 rounded-xl border-2 border-border bg-card",
          "hover:border-primary hover:shadow-lg hover:scale-[1.02]",
          "transition-all duration-300",
          "relative overflow-hidden",
          "peer-checked:border-primary peer-checked:bg-primary/5",
          "peer-checked:shadow-lg peer-checked:shadow-primary/20",
        ],
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
      card: false,
    },
  }
);

/**
 * Radio text variants
 */
const radioTextVariants = cva(
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
 * Radio description variants
 */
const radioDescriptionVariants = cva(
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
 * Radio Group variants
 */
export const radioGroupVariants = cva(["flex gap-4"], {
  variants: {
    direction: {
      horizontal: "flex-row flex-wrap",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    direction: "vertical",
  },
});

/**
 * Radio component
 */
export const Radio = forwardRef<HTMLInputElement, RadioCardProps>(
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
      card = false,
      icon,
      badge,
      image,
      recommended = false,
      hoverEffect = true,
      ...props
    },
    ref
  ) => {
    const context = useRadioContext();
    const isControlled = context !== undefined;

    const finalVariant = context?.variant || variant;
    const finalSize = context?.size || size;
    const name = context?.name || props.name;
    const checked = isControlled
      ? context.value === props.value
      : props.checked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isControlled && context?.onChange && props.value) {
        context.onChange(props.value as string);
      }
      props.onChange?.(e);
    };

    const radioInput = (
      <input
        ref={ref}
        type="radio"
        className={cn(
          radioVariants({ variant: finalVariant, size: finalSize }),
          card && "absolute top-4 right-4",
          className
        )}
        disabled={disabled}
        checked={checked}
        name={name}
        onChange={handleChange}
        {...props}
      />
    );

    // Simple radio without label
    if (!label && !description && !card) {
      return radioInput;
    }

    // Card style radio
    if (card) {
      return (
        <label
          className={cn(
            radioLabelVariants({ disabled, card: true }),
            !hoverEffect && "hover:scale-100 hover:border-border",
            className
          )}
        >
          {radioInput}

          {/* Badge */}
          {(badge || recommended) && (
            <div className="absolute top-4 left-4 flex gap-2">
              {recommended && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg">
                  ⭐ Recommended
                </span>
              )}
              {badge && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full shadow-md">
                  {badge}
                </span>
              )}
            </div>
          )}

          {/* Image */}
          {image && (
            <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
              <img
                src={image}
                alt={typeof label === "string" ? label : "Radio option"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          )}

          {/* Icon */}
          {icon && (
            <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
              {icon}
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col gap-1 text-left w-full">
            {label && (
              <span
                className={cn(
                  radioTextVariants({ size: finalSize, disabled }),
                  "font-semibold"
                )}
              >
                {label}
              </span>
            )}
            {description && (
              <span
                className={cn(
                  radioDescriptionVariants({ disabled }),
                  "text-xs leading-relaxed"
                )}
              >
                {description}
              </span>
            )}
          </div>

          {/* Checked indicator for card */}
          <div className="absolute inset-0 border-2 border-transparent rounded-xl peer-checked:border-primary peer-checked:animate-pulse pointer-events-none" />
        </label>
      );
    }

    // Standard radio with label
    return (
      <label className={cn(radioLabelVariants({ disabled }))}>
        {labelPosition === "left" && label && (
          <div className="flex items-center gap-2">
            {icon && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                {icon}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    radioTextVariants({ size: finalSize, disabled })
                  )}
                >
                  {label}
                </span>
                {badge && (
                  <span className="px-1.5 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded">
                    {badge}
                  </span>
                )}
              </div>
              {description && (
                <span className={cn(radioDescriptionVariants({ disabled }))}>
                  {description}
                </span>
              )}
            </div>
          </div>
        )}

        {radioInput}

        {labelPosition === "right" && (label || description) && (
          <div className="flex items-center gap-2">
            {icon && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                {icon}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {label && (
                  <span
                    className={cn(
                      radioTextVariants({ size: finalSize, disabled })
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
                <span className={cn(radioDescriptionVariants({ disabled }))}>
                  {description}
                </span>
              )}
            </div>
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = "Radio";

/**
 * RadioGroup component
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value: controlledValue,
      defaultValue,
      onChange,
      label,
      error,
      helperText,
      direction = "vertical",
      variant = "primary",
      size = "md",
      card = false,
      hoverEffect = true,
      options,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleChange = (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    };

    const contextValue: RadioContextValue = {
      name,
      value,
      onChange: handleChange,
      variant,
      size,
    };

    return (
      <div ref={ref} className="flex flex-col gap-3" {...props}>
        {label && (
          <label className="text-sm font-semibold text-foreground">
            {label}
          </label>
        )}

        <RadioContext.Provider value={contextValue}>
          <div
            className={cn(
              radioGroupVariants({ direction }),
              card && "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
              className
            )}
          >
            {options
              ? options.map(
                  (option: {
                    value: string;
                    label: string;
                    description?: string;
                    disabled?: boolean;
                    icon?: React.ReactNode;
                    badge?: string | React.ReactNode;
                    image?: string;
                    recommended?: boolean;
                  }) => (
                    <Radio
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      description={option.description}
                      disabled={option.disabled}
                      card={card}
                      icon={option.icon}
                      badge={option.badge}
                      image={option.image}
                      recommended={option.recommended}
                      hoverEffect={hoverEffect}
                    />
                  )
                )
              : children}
          </div>
        </RadioContext.Provider>

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

RadioGroup.displayName = "RadioGroup";

export default Radio;
