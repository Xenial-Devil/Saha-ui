import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { cn } from "../../lib/utils";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidArray,
  isValidString,
} from "../../lib/validation";
import type { CheckboxProps, CheckboxGroupProps } from "./Checkbox.types";
import { Check, Minus } from "lucide-react";
import {
  checkboxVariants,
  checkboxLabelVariants,
  checkboxTextVariants,
  checkboxDescriptionVariants,
} from "./Checkbox.styles";

/**
 * Checkbox Component
 *
 * A modern checkbox with beautiful animations, icons, and multiple variants.
 * Features indeterminate state, card layouts, icons, badges, and smooth transitions.
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

// Checkbox Context for CheckboxGroup
interface CheckboxContextValue {
  name?: string;
  value?: string[];
  onChange?: (value: string, checked: boolean) => void;
  variant?: CheckboxProps["variant"];
  size?: CheckboxProps["size"];
}

const CheckboxContext = createContext<CheckboxContextValue | undefined>(
  undefined
);

const useCheckboxContext = () => {
  return useContext(CheckboxContext);
};



/**
 * Checkbox icon wrapper
 */
const CheckboxIcon = ({
  checked,
  indeterminate,
  size,
  customIcon,
}: {
  checked: boolean;
  indeterminate?: boolean;
  size: "sm" | "md" | "lg";
  customIcon?: React.ReactNode;
}) => {
  const iconSize =
    size === "sm" ? "w-2.5 h-2.5" : size === "md" ? "w-3 h-3" : "w-3.5 h-3.5";

  if (!checked && !indeterminate) return null;

  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center text-white",
        "transition-all duration-200",
        checked || indeterminate ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}
    >
      {customIcon ? (
        <span
          className={cn("flex shrink-0 items-center justify-center", iconSize)}
        >
          {customIcon}
        </span>
      ) : indeterminate ? (
        <Minus className={cn(iconSize, "shrink-0 stroke-[3]")} />
      ) : (
        <Check className={cn(iconSize, "shrink-0 stroke-[3]")} />
      )}
    </span>
  );
};

/**
 * Checkbox component
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
      icon,
      indeterminate = false,
      badge,
      card = false,
      hoverEffect = true,
      recommended = false,
      image,
      ...props
    },
    ref
  ) => {
    const context = useCheckboxContext();
    const isControlled = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState(
      defaultChecked || false
    );
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    const inputRef = useRef<HTMLInputElement>(null);

    // Handle indeterminate state
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // ===== PROP VALIDATION =====
    useEffect(() => {
      if (process.env.NODE_ENV !== "production") {
        const validator = createValidator("Checkbox");

        // Common validators
        commonValidators.size(validator, size);
        const checkboxVariants = [
          "default",
          "primary",
          "secondary",
          "accent",
          "success",
          "warning",
          "error",
        ] as const;
        commonValidators.variant(validator, variant, checkboxVariants);
        commonValidators.disabled(validator, disabled);
        commonValidators.className(validator, className);

        // Boolean validations
        if (indeterminate !== undefined && !isValidBoolean(indeterminate)) {
          validator.error("Invalid prop: 'indeterminate' must be a boolean.");
        }
        if (card !== undefined && !isValidBoolean(card)) {
          validator.error("Invalid prop: 'card' must be a boolean.");
        }
        if (hoverEffect !== undefined && !isValidBoolean(hoverEffect)) {
          validator.error("Invalid prop: 'hoverEffect' must be a boolean.");
        }
        if (recommended !== undefined && !isValidBoolean(recommended)) {
          validator.error("Invalid prop: 'recommended' must be a boolean.");
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

        // Context validation - when used inside CheckboxGroup
        if (context && !props.value) {
          validator.warn(
            "Warning: Checkbox inside CheckboxGroup should have a 'value' prop."
          );
        }
      }
    }, [
      variant,
      size,
      disabled,
      className,
      indeterminate,
      card,
      hoverEffect,
      recommended,
      labelPosition,
      context,
      props.value,
    ]);
    // ===== END PROP VALIDATION =====

    const finalVariant = context?.variant || variant;
    const finalSize = context?.size || size;
    const name = context?.name || props.name;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;

      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }

      if (context?.onChange && props.value) {
        context.onChange(props.value as string, newChecked);
      }

      onChange?.(e);
      onCheckedChange?.(newChecked);
    };

    const checkboxInput = (
      <div className="relative inline-flex items-center justify-center">
        <input
          ref={(node) => {
            if (node) {
              inputRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }
          }}
          type="checkbox"
          className={cn(
            checkboxVariants({ variant: finalVariant, size: finalSize }),
            card && "absolute top-4 right-4",
            className
          )}
          disabled={disabled}
          checked={checked}
          name={name}
          onChange={handleChange}
          {...props}
        />
        <CheckboxIcon
          checked={!!checked}
          indeterminate={indeterminate}
          size={finalSize || "md"}
          customIcon={icon}
        />
      </div>
    );

    // Simple checkbox without label
    if (!label && !description && !card) {
      return checkboxInput;
    }

    // Card style checkbox
    if (card) {
      return (
        <label
          className={cn(
            checkboxLabelVariants({ disabled, card: true }),
            !hoverEffect && "hover:scale-100 hover:border-border",
            className
          )}
        >
          {checkboxInput}

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
                alt={typeof label === "string" ? label : "Checkbox option"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col gap-1 text-left w-full">
            {label && (
              <span
                className={cn(
                  checkboxTextVariants({ size: finalSize, disabled }),
                  "font-semibold"
                )}
              >
                {label}
              </span>
            )}
            {description && (
              <span
                className={cn(
                  checkboxDescriptionVariants({ disabled }),
                  "text-xs leading-relaxed"
                )}
              >
                {description}
              </span>
            )}
          </div>
        </label>
      );
    }

    // Standard checkbox with label
    return (
      <div className="flex flex-col gap-2">
        <label className={cn(checkboxLabelVariants({ disabled }))}>
          {labelPosition === "left" && (label || description) && (
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {label && (
                    <span
                      className={cn(
                        checkboxTextVariants({ size: finalSize, disabled })
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
                    className={cn(checkboxDescriptionVariants({ disabled }))}
                  >
                    {description}
                  </span>
                )}
              </div>
            </div>
          )}

          {checkboxInput}

          {labelPosition === "right" && (label || description) && (
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {label && (
                    <span
                      className={cn(
                        checkboxTextVariants({ size: finalSize, disabled })
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
                    className={cn(checkboxDescriptionVariants({ disabled }))}
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

Checkbox.displayName = "Checkbox";

/**
 * CheckboxGroup component
 */
export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      name,
      label,
      description,
      error,
      helperText,
      value: controlledValue,
      defaultValue,
      onChange,
      direction = "vertical",
      variant = "primary",
      size = "md",
      card = false,
      options,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(
      defaultValue || []
    );
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    // ===== PROP VALIDATION =====
    useEffect(() => {
      if (process.env.NODE_ENV !== "production") {
        const validator = createValidator("CheckboxGroup");

        // Common validators
        commonValidators.size(validator, size);
        const checkboxVariants = [
          "default",
          "primary",
          "secondary",
          "accent",
          "success",
          "warning",
          "error",
        ] as const;
        commonValidators.variant(validator, variant, checkboxVariants);
        commonValidators.className(validator, className);

        // Value validation
        validator.validateArray("value", value, isValidString);
        if (defaultValue !== undefined) {
          validator.validateArray("defaultValue", defaultValue, isValidString);
        }

        // Direction validation
        if (direction && !["vertical", "horizontal"].includes(direction)) {
          validator.error(
            "Invalid prop: 'direction' must be 'vertical' or 'horizontal'."
          );
        }

        // Boolean validation
        if (card !== undefined && !isValidBoolean(card)) {
          validator.error("Invalid prop: 'card' must be a boolean.");
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
            "Warning: CheckboxGroup should have either 'options' prop or children."
          );
        }
      }
    }, [
      variant,
      size,
      className,
      value,
      defaultValue,
      direction,
      card,
      options,
      children,
    ]);
    // ===== END PROP VALIDATION =====

    const handleChange = (itemValue: string, checked: boolean) => {
      const newValue = checked
        ? [...value, itemValue]
        : value.filter((v) => v !== itemValue);

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    };

    const contextValue: CheckboxContextValue = {
      name,
      value,
      onChange: handleChange,
      variant,
      size,
    };

    return (
      <div ref={ref} className="flex flex-col gap-3" {...props}>
        {(label || description) && (
          <div className="flex flex-col gap-1">
            {label && (
              <label className="text-sm font-semibold text-foreground">
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <CheckboxContext.Provider value={contextValue}>
          <div
            className={cn(
              "flex gap-4",
              direction === "horizontal" ? "flex-row flex-wrap" : "flex-col",
              card && "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
              className
            )}
          >
            {options
              ? options.map((option) => (
                  <Checkbox
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    description={option.description}
                    disabled={option.disabled}
                    checked={value.includes(option.value)}
                    card={card}
                    icon={option.icon}
                    badge={option.badge}
                    image={option.image}
                    recommended={option.recommended}
                  />
                ))
              : children}
          </div>
        </CheckboxContext.Provider>

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

CheckboxGroup.displayName = "CheckboxGroup";

export default Checkbox;
