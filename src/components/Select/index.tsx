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
/**
 * Select Component
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
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
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [uncontrolledValue, setUncontrolledValue] = useState<
      string | string[]
    >(defaultValue || (multiple ? [] : ""));
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
          (option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            option.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : options;

    // Group options if they have group property
    const groupedOptions = filteredOptions.reduce((acc, option) => {
      const group = option.group || "default";
      if (!acc[group]) acc[group] = [];
      acc[group].push(option);
      return acc;
    }, {} as Record<string, SelectOption[]>);

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
          if (closeOnSelect) {
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
        closeOnSelect,
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
        const selectedOptions = options.filter((opt) =>
          value.includes(opt.value)
        );
        if (selectedOptions.length === 1) {
          return selectedOptions[0].label;
        }
        return `${selectedOptions.length} selected`;
      }

      if (!multiple && value) {
        const selectedOption = options.find((opt) => opt.value === value);
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

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              {clearable && hasValue && !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 rounded hover:bg-foreground/10 transition-colors"
                  aria-label="Clear selection"
                >
                  {clearIcon || <X className="w-4 h-4" />}
                </button>
              )}
              <span
                className={cn(
                  "transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              >
                {dropdownIcon || <ChevronDown className="w-5 h-5" />}
              </span>
            </div>
          </button>

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
                  Object.entries(groupedOptions).map(
                    ([group, groupOptions]) => (
                      <div key={group}>
                        {group !== "default" && (
                          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-foreground/5">
                            {group}
                          </div>
                        )}
                        {groupOptions.map((option) => {
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
                    )
                  )
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

Select.displayName = "Select";

export default Select;
