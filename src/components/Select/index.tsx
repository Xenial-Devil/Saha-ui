import { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { SelectProps, SelectOption } from "./Select.types";
import { ChevronDown, X, Check, Search } from "lucide-react";

/**
 * Select Component
 *
 * A modern select dropdown with advanced features like search, multi-select,
 * custom options, icons, avatars, and virtualization.
 *
 * @variant default - Standard style
 * @variant primary - Primary color theme
 * @variant secondary - Secondary color theme
 * @variant accent - Accent color theme
 * @variant success - Success color theme
 * @variant warning - Warning color theme
 * @variant error - Error color theme
 * @variant ghost - Transparent background
 * @variant outline - Outlined style
 * @variant glass - Glassmorphism effect
 *
 * @size sm | md | lg - Size variations
 */

/**
 * Select trigger button variants
 */
export const selectTriggerVariants = cva(
  [
    "relative w-full flex items-center justify-between gap-2",
    "rounded-lg border-2 font-medium",
    "transition-all duration-300 ease-out cursor-pointer",
    "focus:outline-none focus:ring-4 focus:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-background border-border text-foreground",
          "hover:border-foreground/60 hover:bg-background/80",
          "focus:ring-ring/50 focus:border-foreground",
        ],
        primary: [
          "bg-primary/5 border-primary/40 text-primary",
          "hover:border-primary hover:bg-primary/10",
          "focus:ring-primary/50 focus:border-primary",
        ],
        secondary: [
          "bg-secondary/5 border-secondary/40 text-secondary",
          "hover:border-secondary hover:bg-secondary/10",
          "focus:ring-secondary/50 focus:border-secondary",
        ],
        accent: [
          "bg-accent/5 border-accent/40 text-accent",
          "hover:border-accent hover:bg-accent/10",
          "focus:ring-accent/50 focus:border-accent",
        ],
        success: [
          "bg-success/5 border-success/40 text-success",
          "hover:border-success hover:bg-success/10",
          "focus:ring-success/50 focus:border-success",
        ],
        warning: [
          "bg-warning/5 border-warning/40 text-warning",
          "hover:border-warning hover:bg-warning/10",
          "focus:ring-warning/50 focus:border-warning",
        ],
        error: [
          "bg-destructive/5 border-destructive/40 text-destructive",
          "hover:border-destructive hover:bg-destructive/10",
          "focus:ring-destructive/50 focus:border-destructive",
        ],
        ghost: [
          "bg-transparent border-transparent text-foreground",
          "hover:bg-foreground/5",
          "focus:ring-ring/50",
        ],
        outline: [
          "bg-transparent border-border text-foreground",
          "hover:border-primary hover:text-primary",
          "focus:ring-primary/50 focus:border-primary",
        ],
        glass: [
          "backdrop-blur-xl bg-background/30 border-border/50",
          "shadow-lg text-foreground",
          "hover:bg-background/40 hover:border-border",
          "focus:ring-primary/50 focus:border-primary",
        ],
      },
      size: {
        sm: "px-3 py-1.5 text-sm gap-1.5",
        md: "px-4 py-2.5 text-base gap-2",
        lg: "px-5 py-3.5 text-lg gap-2.5",
      },
      error: {
        true: "border-destructive focus:ring-destructive/50 focus:border-destructive",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto min-w-[200px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      error: false,
      fullWidth: false,
    },
  }
);

/**
 * Select dropdown menu variants
 */
const selectMenuVariants = cva(
  [
    "absolute z-50 mt-2 w-full rounded-lg border-2",
    "bg-background shadow-xl",
    "overflow-hidden",
    "animate-in fade-in-0 zoom-in-95",
  ],
  {
    variants: {
      variant: {
        default: "border-border",
        primary: "border-primary/40",
        secondary: "border-secondary/40",
        accent: "border-accent/40",
        success: "border-success/40",
        warning: "border-warning/40",
        error: "border-destructive/40",
        ghost: "border-border",
        outline: "border-border",
        glass: "backdrop-blur-xl bg-background/95 border-border/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Select option item variants
 */
const selectOptionVariants = cva(
  [
    "flex items-center gap-3 px-4 py-2.5 cursor-pointer",
    "transition-all duration-200",
    "select-none",
  ],
  {
    variants: {
      variant: {
        default: "hover:bg-foreground/5 data-[selected=true]:bg-foreground/10",
        primary:
          "hover:bg-primary/5 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary",
        secondary:
          "hover:bg-secondary/5 data-[selected=true]:bg-secondary/10 data-[selected=true]:text-secondary",
        accent:
          "hover:bg-accent/5 data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent",
        success:
          "hover:bg-success/5 data-[selected=true]:bg-success/10 data-[selected=true]:text-success",
        warning:
          "hover:bg-warning/5 data-[selected=true]:bg-warning/10 data-[selected=true]:text-warning",
        error:
          "hover:bg-destructive/5 data-[selected=true]:bg-destructive/10 data-[selected=true]:text-destructive",
        ghost: "hover:bg-foreground/5 data-[selected=true]:bg-foreground/10",
        outline:
          "hover:bg-primary/5 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary",
        glass: "hover:bg-background/50 data-[selected=true]:bg-background/80",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-transparent",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
);

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

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

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
