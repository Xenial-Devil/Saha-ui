"use client";

import { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { useClickOutside } from "../../hooks/useClickOutside";
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

interface SelectItemData {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

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
  // Registry for items to enable label lookup
  items: Map<string, SelectItemData>;
  registerItem: (value: string, data: SelectItemData) => void;
  unregisterItem: (value: string) => void;
  // Shared trigger ref for positioning - FIX: Allow null in type
  triggerRef: React.RefObject<HTMLButtonElement | null> | null;
}

const SelectContext = createContext<SelectContextValue>({
  items: new Map(),
  registerItem: () => {},
  unregisterItem: () => {},
  triggerRef: null,
});

// ============================================
// Composable Select Implementation
// ============================================

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
    // State management
    const [uncontrolledValue, setUncontrolledValue] = useState<
      string | string[]
    >(defaultValue || (multiple ? [] : ""));
    const [uncontrolledOpen, setUncontrolledOpen] = useState(
      defaultOpen || false
    );

    // Item registry for value-to-label mapping
    const [items, setItems] = useState<Map<string, SelectItemData>>(new Map());

    // FIX: Properly type the ref to allow null
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    const value =
      controlledValue !== undefined ? controlledValue : uncontrolledValue;
    const open =
      controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

    // For multiple selection, don't close on select by default
    const effectiveCloseOnSelect = multiple ? false : closeOnSelect;

    const handleValueChange = useCallback(
      (newValue: string | string[]) => {
        if (controlledValue === undefined) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [controlledValue, onValueChange]
    );

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (controlledOpen === undefined) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [controlledOpen, onOpenChange]
    );

    // Registry functions
    const registerItem = useCallback(
      (itemValue: string, data: SelectItemData) => {
        setItems((prev) => {
          const next = new Map(prev);
          next.set(itemValue, data);
          return next;
        });
      },
      []
    );

    const unregisterItem = useCallback((itemValue: string) => {
      setItems((prev) => {
        const next = new Map(prev);
        next.delete(itemValue);
        return next;
      });
    }, []);

    // Handle clear
    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        const newValue = multiple ? [] : "";
        handleValueChange(newValue);
      },
      [multiple, handleValueChange]
    );

    const hasValue = multiple
      ? Array.isArray(value) && value.length > 0
      : Boolean(value);

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
          items,
          registerItem,
          unregisterItem,
          triggerRef,
        }}
      >
        <div ref={ref} className={cn("relative", className)}>
          {children}

          {/* Hidden inputs for form submission */}
          {name &&
            multiple &&
            Array.isArray(value) &&
            value.map((v) => (
              <input key={v} type="hidden" name={name} value={v} />
            ))}
          {name && !multiple && value && (
            <input type="hidden" name={name} value={String(value)} />
          )}

          {/* Clear button */}
          {clearable && !disabled && hasValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-foreground/10 transition-colors z-10"
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
// Props-based Select Component
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
      options = [],
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
    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
    });

    const effectiveCloseOnSelect = multiple ? false : closeOnSelect;
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    // FIX: Type the ref properly for useClickOutside
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    // FIX: Cast refs to satisfy useClickOutside types if needed
    useClickOutside(
      containerRef as React.RefObject<HTMLElement>,
      () => {
        if (isOpen) {
          setIsOpen(false);
        }
      },
      [dropdownRef as React.RefObject<HTMLElement>]
    );

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Update dropdown position
    useEffect(() => {
      if (isOpen && triggerRef.current) {
        const updatePosition = () => {
          const rect = triggerRef.current?.getBoundingClientRect();
          if (rect) {
            setDropdownPosition({
              top: rect.bottom + window.scrollY,
              left: rect.left + window.scrollX,
              width: rect.width,
            });
          }
        };
        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
        return () => {
          window.removeEventListener("scroll", updatePosition, true);
          window.removeEventListener("resize", updatePosition);
        };
      }
      return undefined;
    }, [isOpen]);

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

    // Group options
    const groupedOptions = filteredOptions.reduce(
      (acc: Record<string, SelectOption[]>, option: SelectOption) => {
        const group = option.group || "default";
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      },
      {} as Record<string, SelectOption[]>
    );

    // Handle option selection
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

        // Update internal state for uncontrolled mode
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }

        // Always call onChange callback
        if (onChange) {
          onChange(newValue);
        }

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

    // Handle clear
    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        const newValue = multiple ? [] : "";
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        if (onChange) {
          onChange(newValue);
        }
      },
      [multiple, isControlled, onChange]
    );

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
            ref={triggerRef}
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
            {icon && <span className="shrink-0">{icon}</span>}

            <span
              className={cn(
                "flex-1 text-left truncate",
                !hasValue && "text-muted-foreground"
              )}
            >
              {loading ? "Loading..." : getDisplayValue()}
            </span>

            <span
              className={cn(
                "transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            >
              {dropdownIcon || <ChevronDown className="w-5 h-5" />}
            </span>
          </button>

          {/* Clear button */}
          {clearable && hasValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-foreground/10 transition-colors z-10"
              aria-label="Clear selection"
            >
              {clearIcon || <X className="w-4 h-4" />}
            </button>
          )}

          {/* Dropdown Menu */}
          {isOpen &&
            !disabled &&
            typeof window !== "undefined" &&
            createPortal(
              <div
                ref={dropdownRef}
                className={cn(selectMenuVariants({ variant }), menuClassName)}
                style={{
                  position: "absolute",
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`,
                  width: `${dropdownPosition.width}px`,
                  zIndex: 9999,
                  opacity: dropdownPosition.width > 0 ? 1 : 0,
                  transition: "opacity 0.15s ease-out",
                }}
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
                              type="button"
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
                      Object.entries(groupedOptions) as [
                        string,
                        SelectOption[]
                      ][]
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

                              {option.avatar && (
                                <img
                                  src={option.avatar}
                                  alt=""
                                  className="w-8 h-8 rounded-full object-cover shrink-0"
                                />
                              )}

                              {option.icon && (
                                <span className="shrink-0">{option.icon}</span>
                              )}

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
              </div>,
              document.body
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
// Main Select Component Wrapper
// ============================================

export const Select = forwardRef<HTMLDivElement, any>((props, ref) => {
  if (!props.options && props.children) {
    return <SelectComposable {...props} ref={ref} />;
  }
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
    const internalRef = useRef<HTMLButtonElement | null>(null);

    // Merge refs
    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        // Update context's trigger ref
        if (context.triggerRef) {
          (
            context.triggerRef as React.MutableRefObject<HTMLButtonElement | null>
          ).current = node;
        }
      },
      [ref, context.triggerRef]
    );

    // FIX: Extract values from context to avoid dependency warning
    const { disabled, onOpenChange, open, variant, size } = context;

    return (
      <button
        ref={setRefs}
        type="button"
        onClick={() => !disabled && onOpenChange?.(!open)}
        disabled={disabled}
        className={cn(
          selectTriggerVariants({
            variant,
            size,
            fullWidth: true,
          }),
          "justify-between",
          className
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        data-select-trigger="true"
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform duration-200",
            open && "rotate-180"
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
  const { value, multiple, items } = context;

  // Helper to get label from value
  const getLabel = (val: string): React.ReactNode => {
    const item = items.get(val);
    return item?.label || val;
  };

  let display: React.ReactNode = placeholder;

  if (multiple && Array.isArray(value)) {
    if (value.length === 0) {
      display = placeholder;
    } else if (value.length === 1) {
      display = getLabel(value[0]);
    } else {
      display = `${value.length} selected`;
    }
  } else if (!multiple && value && typeof value === "string") {
    display = getLabel(value);
  }

  const hasValue = Array.isArray(value) ? value.length > 0 : Boolean(value);

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
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  // FIX: Extract specific values from context to satisfy exhaustive-deps
  const { open, onOpenChange, triggerRef, variant } = context;

  // Handle click outside to close dropdown
  useEffect(() => {
    if (!open) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Don't close if clicking inside the dropdown
      if (containerRef.current?.contains(target)) {
        return;
      }

      // Don't close if clicking the trigger
      if (triggerRef?.current?.contains(target)) {
        return;
      }

      onOpenChange?.(false);
    };

    // Use setTimeout to avoid immediate trigger
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onOpenChange, triggerRef]);

  // Position dropdown relative to trigger
  useEffect(() => {
    if (!open || !triggerRef?.current) return undefined;

    const updatePosition = () => {
      const rect = triggerRef?.current?.getBoundingClientRect();
      if (rect) {
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, triggerRef]);

  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      ref={containerRef}
      className={cn(selectMenuVariants({ variant }), className)}
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        zIndex: 9999,
        opacity: position.width > 0 ? 1 : 0,
        transition: "opacity 0.15s ease-out",
      }}
      role="listbox"
    >
      <div className="overflow-y-auto max-h-[300px]">{children}</div>
    </div>,
    document.body
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

    const {
      registerItem,
      multiple,
      value: contextValue,
      onValueChange,
      closeOnSelect,
      onOpenChange,
      disabled: contextDisabled,
      variant,
    } = context;

    // Register this item - NO CLEANUP to persist when dropdown closes
    useEffect(() => {
      registerItem(value, {
        value,
        label: children,
        disabled,
      });
      // Intentionally no cleanup - items persist in registry
    }, [value, children, disabled, registerItem]);

    const isSelected = multiple
      ? Array.isArray(contextValue) && contextValue.includes(value)
      : contextValue === value;

    const handleClick = () => {
      if (disabled || contextDisabled) return;

      if (multiple) {
        const currentValues = Array.isArray(contextValue) ? contextValue : [];
        let newValues: string[];

        if (currentValues.includes(value)) {
          newValues = currentValues.filter((v) => v !== value);
        } else {
          newValues = [...currentValues, value];
        }

        onValueChange?.(newValues);
      } else {
        onValueChange?.(value);
      }

      if (closeOnSelect) {
        onOpenChange?.(false);
      }
    };

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={cn(
          selectOptionVariants({
            variant,
            disabled: disabled || contextDisabled,
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

export default Select;
