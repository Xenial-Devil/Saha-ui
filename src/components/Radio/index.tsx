"use client";

import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { cn } from "../../lib/utils";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidArray,
  isValidString,
} from "../../lib/validation";
import type {
  RadioProps,
  RadioGroupProps,
  RadioCardProps,
} from "./Radio.types";
import {
  radioVariants,
  radioLabelVariants,
  radioTextVariants,
  radioDescriptionVariants,
  radioGroupVariants,
} from "./Radio.styles";

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
      checked: _checked, // Extract to prevent spreading
      defaultChecked: _defaultChecked, // Extract to prevent spreading
      ...props
    },
    ref
  ) => {
    const context = useRadioContext();
    const isControlled = context !== undefined;

    // ===== PROP VALIDATION =====
    useEffect(() => {
      if (process.env.NODE_ENV !== "production") {
        const validator = createValidator("Radio");

        // Common validators
        commonValidators.size(validator, size);
        const radioVariants = [
          "default",
          "primary",
          "secondary",
          "accent",
          "success",
          "warning",
          "error",
        ] as const;
        commonValidators.variant(validator, variant, radioVariants);
        commonValidators.disabled(validator, disabled);
        commonValidators.className(validator, className);

        // Boolean validations
        if (card !== undefined && !isValidBoolean(card)) {
          validator.error("Invalid prop: 'card' must be a boolean.");
        }
        if (recommended !== undefined && !isValidBoolean(recommended)) {
          validator.error("Invalid prop: 'recommended' must be a boolean.");
        }
        if (hoverEffect !== undefined && !isValidBoolean(hoverEffect)) {
          validator.error("Invalid prop: 'hoverEffect' must be a boolean.");
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

        // Context validation
        if (context && !props.value) {
          validator.warn(
            "Warning: Radio inside RadioGroup should have a 'value' prop."
          );
        }
      }
    }, [
      variant,
      size,
      disabled,
      className,
      card,
      recommended,
      hoverEffect,
      labelPosition,
      context,
      props.value,
    ]);
    // ===== END PROP VALIDATION =====

    const finalVariant = context?.variant || variant;
    const finalSize = context?.size || size;
    const name = context?.name || props.name;

    // Only control the checked state when inside a RadioGroup
    const isChecked = isControlled ? context.value === props.value : undefined;

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
        {...(isChecked !== undefined && { checked: isChecked })}
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

    // ===== PROP VALIDATION =====
    useEffect(() => {
      if (process.env.NODE_ENV !== "production") {
        const validator = createValidator("RadioGroup");

        // Common validators
        commonValidators.size(validator, size);
        const radioVariants = [
          "default",
          "primary",
          "secondary",
          "accent",
          "success",
          "warning",
          "error",
        ] as const;
        commonValidators.variant(validator, variant, radioVariants);
        commonValidators.className(validator, className);

        // Required name
        validator.validateRequired("name", name);

        // Value validation
        if (value !== undefined && !isValidString(value)) {
          validator.error("Invalid prop: 'value' must be a string.");
        }
        if (defaultValue !== undefined && !isValidString(defaultValue)) {
          validator.error("Invalid prop: 'defaultValue' must be a string.");
        }

        // Direction validation
        if (direction && !["vertical", "horizontal"].includes(direction)) {
          validator.error(
            "Invalid prop: 'direction' must be 'vertical' or 'horizontal'."
          );
        }

        // Boolean validations
        if (card !== undefined && !isValidBoolean(card)) {
          validator.error("Invalid prop: 'card' must be a boolean.");
        }
        if (hoverEffect !== undefined && !isValidBoolean(hoverEffect)) {
          validator.error("Invalid prop: 'hoverEffect' must be a boolean.");
        }

        // Options validation
        if (options) {
          validator.validateArray("options", options);
          if (isValidArray(options)) {
            options.forEach((option, index) => {
              if (typeof option !== "object" || !option) {
                validator.error(
                  `Invalid prop: 'options[${index}]' must be an object.`
                );
              } else {
                if (!("value" in option) || !isValidString(option.value)) {
                  validator.error(
                    `Invalid prop: 'options[${index}].value' is required and must be a string.`
                  );
                }
                if (!("label" in option) || !isValidString(option.label)) {
                  validator.error(
                    `Invalid prop: 'options[${index}].label' is required and must be a string.`
                  );
                }
              }
            });
          }
        }

        // Either options or children should be provided
        if (!options && !children) {
          validator.warn(
            "Warning: RadioGroup should have either 'options' prop or children."
          );
        }
      }
    }, [
      variant,
      size,
      className,
      name,
      value,
      defaultValue,
      direction,
      card,
      hoverEffect,
      options,
      children,
    ]);
    // ===== END PROP VALIDATION =====

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
