"use client";

import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { cn } from "../../lib/utils";
import type { CheckboxProps, CheckboxGroupProps } from "./Checkbox.types";
import { Check, Minus } from "lucide-react";
import {
  checkboxVariants,
  checkboxLabelVariants,
  checkboxTextVariants,
  checkboxDescriptionVariants,
} from "./Checkbox.styles";

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
const useCheckboxContext = () => useContext(CheckboxContext);

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
      recommended: _recommended = false,
      image,
      ...props
    },
    _ref
  ) => {
    const context = useCheckboxContext();
    const isControlled = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState(
      defaultChecked || false
    );
    const checked = isControlled ? controlledChecked : uncontrolledChecked;
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (inputRef.current)
        inputRef.current.indeterminate = indeterminate ?? false;
    }, [indeterminate]);
    const finalVariant = (context?.variant ||
      variant) as CheckboxProps["variant"];
    const finalSize = (context?.size || size) as "sm" | "md" | "lg";
    const name = context?.name || props.name;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      if (!context) {
        if (controlledChecked === undefined) setUncontrolledChecked(newChecked);
        onChange?.(e);
        onCheckedChange?.(newChecked);
      } else {
        context.onChange?.(props.value as string, newChecked);
      }
    };
    const checkboxInput = (
      <span className="relative inline-flex items-center">
        <input
          ref={inputRef}
          type="checkbox"
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          className={cn(
            "peer sr-only",
            checkboxVariants({ variant: finalVariant, size: finalSize }),
            className
          )}
          {...props}
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none inline-flex items-center justify-center rounded",
            finalSize === "sm"
              ? "w-4 h-4"
              : finalSize === "lg"
              ? "w-6 h-6"
              : "w-5 h-5",
            "relative bg-muted"
          )}
        >
          <CheckboxIcon
            checked={!!checked}
            indeterminate={indeterminate}
            size={finalSize}
            customIcon={icon}
          />
        </span>
      </span>
    );
    if (card) {
      return (
        <div className={cn("group")}>
          <label
            className={cn(
              "flex items-center gap-3 p-3 rounded border cursor-pointer",
              hoverEffect && "hover:shadow-md",
              disabled && "opacity-50 pointer-events-none",
              checkboxLabelVariants({ disabled })
            )}
          >
            {image && (
              <div className="w-16 h-16 rounded overflow-hidden bg-muted shrink-0">
                <img
                  src={image}
                  alt={typeof label === "string" ? label : "Checkbox option"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}
            <div className="flex flex-col gap-1 text-left w-full">
              <div className="flex items-center justify-between w-full">
                <div>
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
                    <div className="text-xs leading-relaxed">
                      <span
                        className={cn(
                          checkboxDescriptionVariants({ disabled })
                        )}
                      >
                        {description}
                      </span>
                    </div>
                  )}
                </div>
                <div>{checkboxInput}</div>
              </div>
              {badge && (
                <div className="mt-2">
                  <span className="px-1.5 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded">
                    {badge}
                  </span>
                </div>
              )}
            </div>
          </label>
        </div>
      );
    }
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
    const handleChange = (itemValue: string, checked: boolean) => {
      const newValue = checked
        ? [...value, itemValue]
        : value.filter((v) => v !== itemValue);
      if (!isControlled) setUncontrolledValue(newValue);
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
