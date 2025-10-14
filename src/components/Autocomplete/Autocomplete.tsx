import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type {
  AutocompleteProps,
  AutocompleteOption as AutocompleteOptionType,
  AutocompleteSize,
  AutocompleteVariant,
} from "./Autocomplete.types";
import { Search, X, ChevronDown, Loader2, Check } from "lucide-react";

// Context for composable components
interface AutocompleteContextValue {
  value: string;
  selectedValue: string;
  options: AutocompleteOptionType[];
  filteredOptions: AutocompleteOptionType[];
  isOpen: boolean;
  highlightedIndex: number;
  size: AutocompleteSize;
  variant: AutocompleteVariant;
  disabled: boolean;
  loading: boolean;
  clearable: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  handleInputChange: (value: string) => void;
  handleSelect: (option: AutocompleteOptionType) => void;
  handleClear: () => void;
  setIsOpen: (open: boolean) => void;
  setHighlightedIndex: (index: number) => void;
}

const AutocompleteContext = createContext<AutocompleteContextValue | undefined>(
  undefined
);

const useAutocomplete = () => {
  const context = useContext(AutocompleteContext);
  if (!context) {
    throw new Error(
      "Autocomplete subcomponents must be used within <Autocomplete>"
    );
  }
  return context;
};

// Variants
const containerVariants = cva("relative w-full", {
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

const inputWrapperVariants = cva(
  "relative flex items-center gap-2 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-background border border-border rounded-lg",
        filled: "bg-muted border border-transparent rounded-lg",
        outlined: "bg-transparent border-2 border-border rounded-lg",
        ghost:
          "bg-transparent border border-transparent rounded-lg hover:bg-muted/50",
        glass:
          "bg-background/50 backdrop-blur-xl border border-border/30 rounded-lg",
        primary: "bg-primary/10 border border-primary rounded-lg",
        success: "bg-success/10 border border-success rounded-lg",
        warning: "bg-warning/10 border border-warning rounded-lg",
        error: "bg-danger/10 border border-danger rounded-lg",
      },
      size: {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      focused: {
        true: "",
        false: "",
      },
      error: {
        true: "border-danger focus-within:border-danger focus-within:ring-2 focus-within:ring-danger/20",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        focused: true,
        error: false,
        className: "border-primary ring-2 ring-primary/20",
      },
      {
        variant: "filled",
        focused: true,
        error: false,
        className: "bg-muted border-primary ring-2 ring-primary/20",
      },
      {
        variant: "outlined",
        focused: true,
        error: false,
        className: "border-primary ring-2 ring-primary/20",
      },
      {
        variant: "glass",
        focused: true,
        error: false,
        className: "border-primary/50 ring-2 ring-primary/20",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      focused: false,
      error: false,
    },
  }
);

const inputVariants = cva(
  "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

const dropdownVariants = cva(
  "absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-2xl overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card",
        filled: "bg-card",
        outlined: "bg-card",
        ghost: "bg-card",
        glass: "bg-card/95 backdrop-blur-xl",
        primary: "bg-card",
        success: "bg-card",
        warning: "bg-card",
        error: "bg-card",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const optionVariants = cva(
  "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors duration-150",
  {
    variants: {
      size: {
        sm: "px-2 py-1.5 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-2.5 text-base",
      },
      highlighted: {
        true: "bg-primary/10 text-primary",
        false: "text-foreground hover:bg-muted",
      },
      selected: {
        true: "font-medium",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-transparent",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      highlighted: false,
      selected: false,
      disabled: false,
    },
  }
);

const labelVariants = cva("block mb-1.5 font-medium text-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    required: {
      true: "after:content-['*'] after:ml-1 after:text-danger",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    required: false,
  },
});

// Default filter function
const defaultFilterOptions = (
  options: AutocompleteOptionType[],
  inputValue: string
): AutocompleteOptionType[] => {
  const lowerInput = inputValue.toLowerCase();
  return options.filter(
    (option) =>
      option.label.toLowerCase().includes(lowerInput) ||
      option.description?.toLowerCase().includes(lowerInput)
  );
};

// Highlight matching text
const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-primary/20 text-primary font-medium">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
      value: controlledValue,
      selectedValue: controlledSelectedValue,
      onChange,
      onSelect,
      onBlur,
      onFocus,
      onClear,
      options = [],
      placeholder = "Search...",
      label,
      helperText,
      error,
      variant = "default",
      size = "md",
      disabled = false,
      required = false,
      loading = false,
      clearable = true,
      freeSolo = false,
      autoFilter = true,
      filterOptions = defaultFilterOptions,
      minChars = 0,
      maxOptions,
      showNoResults = true,
      noResultsText = "No results found",
      debounce = 0,
      groupBy = false,
      highlightMatch = true,
      showDescriptions = true,
      iconPosition = "start",
      startIcon,
      endIcon,
      open: controlledOpen,
      onOpenChange,
      autoSelectFirst = false,
      closeOnSelect = true,
      renderOption,
      renderInput,
      className,
      dropdownClassName,
      name,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const [internalSelectedValue, setInternalSelectedValue] = useState("");
    const [internalOpen, setInternalOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const isOpenControlled = controlledOpen !== undefined;
    const isOpen = isOpenControlled ? controlledOpen : internalOpen;

    const selectedValue = controlledSelectedValue || internalSelectedValue;

    // Filter options
    const filteredOptions = useMemo(() => {
      if (!autoFilter || value.length < minChars) return options;

      let filtered = filterOptions(options, value);

      if (maxOptions) {
        filtered = filtered.slice(0, maxOptions);
      }

      return filtered;
    }, [options, value, autoFilter, minChars, filterOptions, maxOptions]);

    // Group options
    const groupedOptions = useMemo(() => {
      if (!groupBy) return null;

      const groups: Record<string, AutocompleteOptionType[]> = {};
      filteredOptions.forEach((option) => {
        const groupName = option.group || "Other";
        if (!groups[groupName]) groups[groupName] = [];
        groups[groupName].push(option);
      });

      return groups;
    }, [filteredOptions, groupBy]);

    // Handle input change with debounce
    const handleInputChange = useCallback(
      (newValue: string) => {
        if (debounce > 0) {
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }

          debounceTimerRef.current = setTimeout(() => {
            if (!isControlled) setInternalValue(newValue);
            onChange?.(newValue);
          }, debounce);
        } else {
          if (!isControlled) setInternalValue(newValue);
          onChange?.(newValue);
        }

        if (!isOpenControlled) setInternalOpen(newValue.length >= minChars);
        onOpenChange?.(newValue.length >= minChars);

        if (autoSelectFirst && filteredOptions.length > 0) {
          setHighlightedIndex(0);
        }
      },
      [
        debounce,
        isControlled,
        isOpenControlled,
        minChars,
        onChange,
        onOpenChange,
        autoSelectFirst,
        filteredOptions,
      ]
    );

    // Handle option select
    const handleSelect = useCallback(
      (option: AutocompleteOptionType) => {
        if (option.disabled) return;

        if (!isControlled) setInternalValue(option.label);
        setInternalSelectedValue(option.value);
        onChange?.(option.label);
        onSelect?.(option);

        if (closeOnSelect) {
          if (!isOpenControlled) setInternalOpen(false);
          onOpenChange?.(false);
        }

        inputRef.current?.blur();
      },
      [
        isControlled,
        onChange,
        onSelect,
        closeOnSelect,
        isOpenControlled,
        onOpenChange,
      ]
    );

    // Handle clear
    const handleClear = useCallback(() => {
      if (!isControlled) setInternalValue("");
      setInternalSelectedValue("");
      onChange?.("");
      onClear?.();
      inputRef.current?.focus();
    }, [isControlled, onChange, onClear]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || filteredOptions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;

        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          break;

        case "Escape":
          e.preventDefault();
          if (!isOpenControlled) setInternalOpen(false);
          onOpenChange?.(false);
          break;

        case "Tab":
          if (!isOpenControlled) setInternalOpen(false);
          onOpenChange?.(false);
          break;
      }
    };

    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current &&
          !inputRef.current.contains(event.target as Node)
        ) {
          if (!isOpenControlled) setInternalOpen(false);
          onOpenChange?.(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpenControlled, onOpenChange]);

    // Scroll highlighted option into view
    useEffect(() => {
      if (highlightedIndex >= 0 && dropdownRef.current) {
        const highlightedElement = dropdownRef.current.querySelector(
          `[data-option-index="${highlightedIndex}"]`
        );
        highlightedElement?.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndex]);

    const contextValue: AutocompleteContextValue = {
      value,
      selectedValue,
      options,
      filteredOptions,
      isOpen,
      highlightedIndex,
      size,
      variant,
      disabled,
      loading,
      clearable,
      inputRef,
      dropdownRef,
      handleInputChange,
      handleSelect,
      handleClear,
      setIsOpen: (open) => {
        if (!isOpenControlled) setInternalOpen(open);
        onOpenChange?.(open);
      },
      setHighlightedIndex,
    };

    // Render option
    const renderOptionContent = (
      option: AutocompleteOptionType,
      index: number
    ) => {
      if (renderOption) {
        return renderOption(option, value);
      }

      const isHighlighted = highlightedIndex === index;
      const isSelected = option.value === selectedValue;

      return (
        <div
          key={option.value}
          data-option-index={index}
          className={optionVariants({
            size,
            highlighted: isHighlighted,
            selected: isSelected,
            disabled: option.disabled,
          })}
          onClick={() => !option.disabled && handleSelect(option)}
          onMouseEnter={() => setHighlightedIndex(index)}
        >
          {/* Icon/Avatar */}
          {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
          {option.avatar && (
            <img
              src={option.avatar}
              alt={option.label}
              className="w-6 h-6 rounded-full flex-shrink-0"
            />
          )}

          {/* Label & Description */}
          <div className="flex-1 min-w-0">
            <div className="truncate">
              {highlightMatch
                ? highlightText(option.label, value)
                : option.label}
            </div>
            {showDescriptions && option.description && (
              <div className="text-xs text-muted-foreground truncate">
                {option.description}
              </div>
            )}
          </div>

          {/* Selected Check */}
          {isSelected && (
            <Check size={16} className="flex-shrink-0 text-primary" />
          )}
        </div>
      );
    };

    // If using composable API
    if (children) {
      return (
        <AutocompleteContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn(containerVariants({ disabled }), className)}
            {...props}
          >
            {children}
          </div>
        </AutocompleteContext.Provider>
      );
    }

    // Props API
    return (
      <AutocompleteContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(containerVariants({ disabled }), className)}
          {...props}
        >
          {/* Label */}
          {label && (
            <label htmlFor={id} className={labelVariants({ size, required })}>
              {label}
            </label>
          )}

          {/* Input Wrapper */}
          <div
            className={inputWrapperVariants({
              variant,
              size,
              focused: isFocused,
              error: !!error,
            })}
          >
            {/* Start Icon */}
            {(startIcon || iconPosition === "start") && (
              <span className="flex-shrink-0 text-muted-foreground">
                {startIcon || (
                  <Search size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
                )}
              </span>
            )}

            {/* Input */}
            {renderInput ? (
              renderInput({
                ref: inputRef,
                value,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target.value),
                onFocus: () => {
                  setIsFocused(true);
                  onFocus?.();
                  if (!isOpenControlled)
                    setInternalOpen(value.length >= minChars);
                  onOpenChange?.(value.length >= minChars);
                },
                onBlur: () => {
                  setIsFocused(false);
                  onBlur?.();
                },
                onKeyDown: handleKeyDown,
                placeholder,
                disabled,
                name,
                id,
                className: inputVariants({ size, disabled }),
              })
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => {
                  setIsFocused(true);
                  onFocus?.();
                  if (!isOpenControlled)
                    setInternalOpen(value.length >= minChars);
                  onOpenChange?.(value.length >= minChars);
                }}
                onBlur={() => {
                  setIsFocused(false);
                  onBlur?.();
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                name={name}
                id={id}
                className={inputVariants({ size, disabled })}
              />
            )}

            {/* Loading Spinner */}
            {loading && (
              <Loader2
                size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
                className="flex-shrink-0 text-muted-foreground animate-spin"
              />
            )}

            {/* Clear Button */}
            {clearable && value && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                <X size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
              </button>
            )}

            {/* End Icon */}
            {(endIcon || iconPosition === "end") && !loading && (
              <span className="flex-shrink-0 text-muted-foreground">
                {endIcon || (
                  <ChevronDown
                    size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
                  />
                )}
              </span>
            )}
          </div>

          {/* Helper Text / Error */}
          {(helperText || error) && (
            <p
              className={cn(
                "mt-1.5 text-xs",
                error ? "text-danger" : "text-muted-foreground"
              )}
            >
              {error || helperText}
            </p>
          )}

          {/* Dropdown */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className={cn(dropdownVariants({ variant }), dropdownClassName)}
            >
              <div className="max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin text-muted-foreground" />
                  </div>
                ) : filteredOptions.length === 0 ? (
                  showNoResults && (
                    <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                      {noResultsText}
                    </div>
                  )
                ) : groupBy && groupedOptions ? (
                  Object.entries(groupedOptions).map(
                    ([group, groupOptions]) => (
                      <div key={group}>
                        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {group}
                        </div>
                        {groupOptions.map((option) =>
                          renderOptionContent(
                            option,
                            filteredOptions.indexOf(option)
                          )
                        )}
                      </div>
                    )
                  )
                ) : (
                  filteredOptions.map((option, index) =>
                    renderOptionContent(option, index)
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </AutocompleteContext.Provider>
    );
  }
);

Autocomplete.displayName = "Autocomplete";

// ===== Composable Subcomponents =====

export interface AutocompleteInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const AutocompleteInput = React.forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(({ startIcon, endIcon, className, ...props }, ref) => {
  const {
    value,
    handleInputChange,
    setIsOpen,
    size,
    variant,
    disabled,
    loading,
    inputRef,
    clearable,
    handleClear,
  } = useAutocomplete();

  return (
    <div
      className={inputWrapperVariants({
        variant,
        size,
        error: false,
      })}
    >
      {startIcon && (
        <span className="flex-shrink-0 text-muted-foreground">{startIcon}</span>
      )}

      <input
        ref={ref || inputRef}
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className={cn(inputVariants({ size, disabled }), className)}
        disabled={disabled}
        {...props}
      />

      {loading && (
        <Loader2
          size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
          className="flex-shrink-0 text-muted-foreground animate-spin"
        />
      )}

      {clearable && value && !loading && (
        <button
          type="button"
          onClick={handleClear}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          tabIndex={-1}
        >
          <X size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
        </button>
      )}

      {endIcon && !loading && (
        <span className="flex-shrink-0 text-muted-foreground">{endIcon}</span>
      )}
    </div>
  );
});

AutocompleteInput.displayName = "AutocompleteInput";

export interface AutocompleteDropdownProps {
  children?: React.ReactNode;
  className?: string;
}

export const AutocompleteDropdown = React.forwardRef<
  HTMLDivElement,
  AutocompleteDropdownProps
>(({ children, className }, ref) => {
  const { isOpen, variant, dropdownRef } = useAutocomplete();

  if (!isOpen) return null;

  return (
    <div
      ref={ref || dropdownRef}
      className={cn(dropdownVariants({ variant }), className)}
    >
      {children}
    </div>
  );
});

AutocompleteDropdown.displayName = "AutocompleteDropdown";

export interface AutocompleteOptionProps {
  option: AutocompleteOptionType;
  index: number;
  children?: React.ReactNode;
}

export const AutocompleteOption = React.forwardRef<
  HTMLDivElement,
  AutocompleteOptionProps
>(({ option, index, children }, ref) => {
  const {
    selectedValue,
    highlightedIndex,
    size,
    handleSelect,
    setHighlightedIndex,
    value,
  } = useAutocomplete();

  const isHighlighted = highlightedIndex === index;
  const isSelected = option.value === selectedValue;

  return (
    <div
      ref={ref}
      data-option-index={index}
      className={optionVariants({
        size,
        highlighted: isHighlighted,
        selected: isSelected,
        disabled: option.disabled,
      })}
      onClick={() => !option.disabled && handleSelect(option)}
      onMouseEnter={() => setHighlightedIndex(index)}
    >
      {children || (
        <>
          {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
          {option.avatar && (
            <img
              src={option.avatar}
              alt={option.label}
              className="w-6 h-6 rounded-full flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="truncate">{highlightText(option.label, value)}</div>
            {option.description && (
              <div className="text-xs text-muted-foreground truncate">
                {option.description}
              </div>
            )}
          </div>
          {isSelected && (
            <Check size={16} className="flex-shrink-0 text-primary" />
          )}
        </>
      )}
    </div>
  );
});

AutocompleteOption.displayName = "AutocompleteOption";
