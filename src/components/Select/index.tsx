"use client";

import { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import { cn } from "../../lib/utils";
import { useClickOutside } from "../../hooks/useClickOutside";
// validation removed
import type { SelectProps, SelectOption } from "./Select.types";
import { ChevronDown, X, Check, Search } from "lucide-react";
import {
  selectTriggerVariants,
  selectMenuVariants,
  selectOptionVariants,
} from "./Select.styles";
import React, { createContext, useContext } from "react";

// ============================================
// Context for Composable Pattern
// ============================================

interface SelectContextValue {
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  variant?: SelectProps["variant"];
  size?: SelectProps["size"];
  multiple?: boolean;
  closeOnSelect?: boolean;
}

const SelectContext = createContext<SelectContextValue>({});

// Composable Select implementation
const SelectComposable = forwardRef<
  HTMLDivElement,
  {
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    variant?: SelectProps["variant"];
    size?: SelectProps["size"];
    children?: React.ReactNode;
    className?: string;
    multiple?: boolean;
    closeOnSelect?: boolean;
    clearable?: boolean;
    name?: string;
  }
>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      open: controlledOpen,
      defaultOpen,
      onOpenChange,
      disabled = false,
      variant = "default",
      size = "md",
      children,
      className,
      multiple = false,
      closeOnSelect = true,
      clearable = false,
      name,
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<
      string | string[]
    >(defaultValue || (multiple ? [] : ""));
    const [uncontrolledOpen, setUncontrolledOpen] = useState(
      defaultOpen || false
    );

    const value =
      controlledValue !== undefined ? controlledValue : uncontrolledValue;
    const open =
      controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

    // If multiple selection is enabled, do not close on select by default.
    const effectiveCloseOnSelect = multiple ? false : closeOnSelect;

    const handleValueChange = (newValue: string | string[]) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(newValue as any);
      }
      onValueChange?.(newValue as any);
    };

    const handleOpenChange = (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    return (
      <SelectContext.Provider
        value={{
          value,
          onValueChange: handleValueChange,
          open,
          onOpenChange: handleOpenChange,
          disabled,
          variant,
          size,
          multiple,
          closeOnSelect: effectiveCloseOnSelect,
        }}
      >
        <div ref={ref} className={cn("relative", className)}>
          {children}

          {/* Form submission helpers: render hidden inputs when `name` is provided */}
          {name &&
            multiple &&
            Array.isArray(value) &&
            value.map((v) => (
              <input key={v} type="hidden" name={name} value={v} />
            ))}
          {name && !multiple && value && (
            <input type="hidden" name={name} value={String(value)} />
          )}
          {/* Clear button for composable pattern (positioned over trigger) */}
          {clearable &&
            !disabled &&
            (multiple
              ? Array.isArray(value) && value.length > 0
              : Boolean(value)) && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const newValue = multiple ? [] : "";
                  handleValueChange(newValue as any);
                }}
                className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-foreground/10 transition-colors"
                aria-label="Clear selection"
              >
                <X className="w-4 h-4" />
              </button>
            )}
        </div>
      </SelectContext.Provider>
    );
  }
);

SelectComposable.displayName = "SelectComposable";

// ============================================
// Props-based Select Component (Internal)
// ============================================

const SelectPropsBase = forwardRef<HTMLDivElement, SelectProps>(
  (props, ref) => {
    const {
      label,
      description,
      placeholder = "Select an option...",
      error,
      helperText,
      value: controlledValue,
      defaultValue,
      onChange,
      options,
      multiple = false,
      searchable = false,
      clearable = false,
      disabled = false,
      required = false,
      loading = false,
      variant = "default",
      size = "md",
      fullWidth = true,
      maxHeight = "300px",
      maxSelections,
      closeOnSelect = true,
      showCheckmarks = true,
      creatable = false,
      onCreateOption,
      renderOption,
      renderValue,
      icon,
      clearIcon,
      dropdownIcon,
      name,
      id,
      className,
      menuClassName,
      optionClassName,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [uncontrolledValue, setUncontrolledValue] = useState<
      string | string[]
    >(defaultValue || (multiple ? [] : ""));
    // If multiple selection is enabled, closeOnSelect behaves as false.
    const effectiveCloseOnSelect = multiple ? false : closeOnSelect;
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside - optimized with useClickOutside hook
    useClickOutside(containerRef, () => {
      if (isOpen) {
        setIsOpen(false);
      }
    });

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // development-only validation removed

    // Filter options based on search query
    const filteredOptions = searchQuery
      ? options.filter(
          (option: SelectOption) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            option.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : options;

    // Group options if they have group property
    const groupedOptions = filteredOptions.reduce(
      (acc: Record<string, SelectOption[]>, option: SelectOption) => {
        const group = option.group || "default";
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      },
      {} as Record<string, SelectOption[]>
    );

    const handleSelect = useCallback(
      (optionValue: string) => {
        if (disabled) return;

        let newValue: string | string[];

        if (multiple) {
          const currentValues = Array.isArray(value) ? value : [];
          if (currentValues.includes(optionValue)) {
            newValue = currentValues.filter((v) => v !== optionValue);
          } else {
            if (maxSelections && currentValues.length >= maxSelections) {
              return;
            }
            newValue = [...currentValues, optionValue];
          }
        } else {
          newValue = optionValue;
          if (effectiveCloseOnSelect) {
            setIsOpen(false);
          }
        }

        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onChange?.(newValue);

        if (searchable) {
          setSearchQuery("");
        }
      },
      [
        disabled,
        multiple,
        value,
        maxSelections,
        effectiveCloseOnSelect,
        isControlled,
        onChange,
        searchable,
      ]
    );

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newValue = multiple ? [] : "";
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleCreateOption = () => {
      if (creatable && searchQuery && onCreateOption) {
        onCreateOption(searchQuery);
        setSearchQuery("");
        setIsOpen(false);
      }
    };

    const isSelected = (optionValue: string) => {
      if (multiple && Array.isArray(value)) {
        return value.includes(optionValue);
      }
      return value === optionValue;
    };

    const getDisplayValue = () => {
      if (renderValue) {
        return renderValue(value);
      }

      if (multiple && Array.isArray(value) && value.length > 0) {
        const selectedOptions = options.filter((opt: SelectOption) =>
          value.includes(opt.value)
        );
        if (selectedOptions.length === 1) {
          return selectedOptions[0].label;
        }
        return `${selectedOptions.length} selected`;
      }

      if (!multiple && value) {
        const selectedOption = options.find(
          (opt: SelectOption) => opt.value === value
        );
        return selectedOption?.label || value;
      }

      return placeholder;
    };

    const hasValue = multiple
      ? Array.isArray(value) && value.length > 0
      : Boolean(value);

    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)}>
        {/* Label */}
        {(label || description) && (
          <div className="flex flex-col gap-1">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  "text-sm font-semibold text-foreground",
                  required &&
                    "after:content-['*'] after:ml-1 after:text-destructive"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {/* Select Trigger */}
        <div ref={containerRef} className="relative">
          <button
            type="button"
            id={id}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={cn(
              selectTriggerVariants({
                variant,
                size,
                error: Boolean(error),
                fullWidth,
              })
            )}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            {/* Icon */}
            {icon && <span className="shrink-0">{icon}</span>}

            {/* Value Display */}
            <span
              className={cn(
                "flex-1 text-left truncate",
                !hasValue && "text-muted-foreground"
              )}
            >
              {loading ? "Loading..." : getDisplayValue()}
            </span>

            {/* Dropdown icon only inside trigger */}
            <span
              className={cn(
                "transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            >
              {dropdownIcon || <ChevronDown className="w-5 h-5" />}
            </span>
          </button>

          {/* Clear button rendered as sibling to avoid nested <button> */}
          {clearable && hasValue && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear(e as any);
              }}
              className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-foreground/10 transition-colors"
              aria-label="Clear selection"
            >
              {clearIcon || <X className="w-4 h-4" />}
            </button>
          )}

          {/* Dropdown Menu */}
          {isOpen && !disabled && (
            <div
              className={cn(selectMenuVariants({ variant }), menuClassName)}
              role="listbox"
              aria-multiselectable={multiple}
            >
              {/* Search Input */}
              {searchable && (
                <div className="p-2 border-b-2 border-border/50">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 bg-background/50 rounded-md border-2 border-border/50 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Options List */}
              <div className="overflow-y-auto" style={{ maxHeight }}>
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    {searchQuery ? (
                      <>
                        <p>No results found</p>
                        {creatable && (
                          <button
                            onClick={handleCreateOption}
                            className="mt-2 text-primary hover:underline"
                          >
                            Create "{searchQuery}"
                          </button>
                        )}
                      </>
                    ) : (
                      "No options available"
                    )}
                  </div>
                ) : (
                  (
                    Object.entries(groupedOptions) as [string, SelectOption[]][]
                  ).map(([group, groupOptions]) => (
                    <div key={group}>
                      {group !== "default" && (
                        <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-foreground/5">
                          {group}
                        </div>
                      )}
                      {groupOptions.map((option: SelectOption) => {
                        const selected = isSelected(option.value);

                        if (renderOption) {
                          return (
                            <div
                              key={option.value}
                              onClick={() =>
                                !option.disabled && handleSelect(option.value)
                              }
                              className={cn(
                                selectOptionVariants({
                                  variant,
                                  disabled: option.disabled,
                                }),
                                optionClassName
                              )}
                              data-selected={selected}
                              role="option"
                              aria-selected={selected}
                            >
                              {renderOption(option)}
                            </div>
                          );
                        }

                        return (
                          <div
                            key={option.value}
                            onClick={() =>
                              !option.disabled && handleSelect(option.value)
                            }
                            className={cn(
                              selectOptionVariants({
                                variant,
                                disabled: option.disabled,
                              }),
                              optionClassName
                            )}
                            data-selected={selected}
                            role="option"
                            aria-selected={selected}
                          >
                            {/* Checkmark */}
                            {showCheckmarks && (
                              <span
                                className={cn(
                                  "shrink-0 w-5 h-5 flex items-center justify-center",
                                  selected ? "opacity-100" : "opacity-0"
                                )}
                              >
                                <Check className="w-4 h-4" />
                              </span>
                            )}

                            {/* Avatar */}
                            {option.avatar && (
                              <img
                                src={option.avatar}
                                alt=""
                                className="w-8 h-8 rounded-full object-cover shrink-0"
                              />
                            )}

                            {/* Icon */}
                            {option.icon && (
                              <span className="shrink-0">{option.icon}</span>
                            )}

                            {/* Label and Description */}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">
                                {option.label}
                              </div>
                              {option.description && (
                                <div className="text-sm text-muted-foreground truncate">
                                  {option.description}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hidden input for form submission */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={Array.isArray(value) ? value.join(",") : value}
          />
        )}

        {/* Error or Helper Text */}
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

SelectPropsBase.displayName = "SelectPropsBase";

// ============================================
// Main Select Component (Wrapper)
// ============================================

/**
 * Select Component - Works with both props-based and component-based patterns
 * This wrapper decides which implementation to use without calling hooks conditionally
 */
export const Select = forwardRef<HTMLDivElement, any>((props, ref) => {
  // Pattern detection: if no options prop but has children, use composable mode
  if (!props.options && props.children) {
    return <SelectComposable {...props} ref={ref} />;
  }

  // Otherwise use props-based mode (options prop exists)
  return <SelectPropsBase {...(props as SelectProps)} ref={ref} />;
});

Select.displayName = "Select";

// ============================================
// Composable Sub-components
// ============================================

interface SelectTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const context = useContext(SelectContext);

    return (
      <button
        ref={ref}
        type="button"
        onClick={() =>
          !context.disabled && context.onOpenChange?.(!context.open)
        }
        disabled={context.disabled}
        className={cn(
          selectTriggerVariants({
            variant: context.variant,
            size: context.size,
            fullWidth: true,
          }),
          "justify-between",
          className
        )}
        aria-haspopup="listbox"
        aria-expanded={context.open}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform duration-200",
            context.open && "rotate-180"
          )}
        />
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

export const SelectValue = ({ placeholder, className }: SelectValueProps) => {
  const context = useContext(SelectContext);
  // Determine display for composable value
  const value = context.value;
  let display: React.ReactNode = placeholder;

  if (context.multiple && Array.isArray(value)) {
    if (value.length === 0) {
      display = placeholder;
    } else if (value.length === 1) {
      display = value[0];
    } else {
      display = `${value.length} selected`;
    }
  } else if (!context.multiple && value) {
    display = value as string;
  }

  const hasValue = !(Array.isArray(value) ? value.length === 0 : !value);

  return (
    <span
      className={cn(
        "block truncate text-left",
        !hasValue && "text-muted-foreground",
        className
      )}
    >
      {display}
    </span>
  );
};
SelectValue.displayName = "SelectValue";

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectContent = ({ children, className }: SelectContentProps) => {
  const context = useContext(SelectContext);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    if (context.open) {
      context.onOpenChange?.(false);
    }
  });

  if (!context.open) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        selectMenuVariants({ variant: context.variant }),
        className
      )}
      role="listbox"
    >
      <div className="overflow-y-auto max-h-[300px]">{children}</div>
    </div>
  );
};
SelectContent.displayName = "SelectContent";

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, children, disabled, className }, ref) => {
    const context = useContext(SelectContext);
    const isSelected = context.multiple
      ? Array.isArray(context.value) && context.value.includes(value)
      : context.value === value;

    const handleClick = () => {
      if (disabled || context.disabled) return;

      if (context.multiple) {
        const currentValues = Array.isArray(context.value) ? context.value : [];

        let newValues: string[];
        if (currentValues.includes(value)) {
          newValues = currentValues.filter((v) => v !== value);
        } else {
          newValues = [...currentValues, value];
        }

        context.onValueChange?.(newValues);
        if (context.closeOnSelect) {
          context.onOpenChange?.(false);
        }
      } else {
        context.onValueChange?.(value);
        if (context.closeOnSelect) {
          context.onOpenChange?.(false);
        }
      }
    };

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={cn(
          selectOptionVariants({
            variant: context.variant,
            disabled: disabled || context.disabled,
          }),
          "flex items-center gap-2 cursor-pointer",
          className
        )}
        data-selected={isSelected}
        role="option"
        aria-selected={isSelected}
      >
        <span
          className={cn(
            "shrink-0 w-5 h-5 flex items-center justify-center",
            isSelected ? "opacity-100" : "opacity-0"
          )}
        >
          <Check className="w-4 h-4" />
        </span>
        <span className="flex-1">{children}</span>
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

interface SelectGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectGroup = ({ children, className }: SelectGroupProps) => {
  return <div className={cn("py-1", className)}>{children}</div>;
};
SelectGroup.displayName = "SelectGroup";

interface SelectLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectLabel = ({ children, className }: SelectLabelProps) => {
  return (
    <div
      className={cn(
        "px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        className
      )}
    >
      {children}
    </div>
  );
};
SelectLabel.displayName = "SelectLabel";

interface SelectSeparatorProps {
  className?: string;
}

export const SelectSeparator = ({ className }: SelectSeparatorProps) => {
  return <div className={cn("h-px bg-border my-1", className)} />;
};
SelectSeparator.displayName = "SelectSeparator";

// Default export for props-based pattern
export default Select;
