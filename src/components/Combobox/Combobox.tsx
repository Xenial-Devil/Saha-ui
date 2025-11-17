"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
} from "react";
import { cn } from "../../lib/utils";
import type {
  ComboboxProps,
  ComboboxTriggerProps,
  ComboboxContentProps,
  ComboboxSearchProps,
  ComboboxEmptyProps,
  ComboboxLoadingProps,
  ComboboxGroupProps,
  ComboboxItemProps,
  ComboboxSeparatorProps,
  ComboboxCreateProps,
  ComboboxOption,
  ComboboxGroup as ComboboxGroupType,
  ComboboxSize,
  ComboboxVariant,
} from "./Combobox.types";
import { Check, ChevronDown, X, Search, Plus, Loader2 } from "lucide-react";
import { triggerVariants, contentVariants, optionVariants, searchVariants } from "./Combobox.styles";

/**
 * Combobox Component
 *
 * Advanced combobox with autocomplete, multi-select, creation, and beautiful animations.
 * Supports both props-based (simple) and component-based (flexible) usage patterns.
 *
 * PROPS-BASED USAGE (Simple):
 * <Combobox options={[...]} value={value} onChange={setValue} placeholder="Select..." />
 *
 * COMPONENT-BASED USAGE (Flexible):
 * <Combobox value={value} onChange={setValue}>
 *   <ComboboxTrigger>Select item...</ComboboxTrigger>
 *   <ComboboxContent>
 *     <ComboboxSearch />
 *     <ComboboxItem value="1">Option 1</ComboboxItem>
 *     <ComboboxItem value="2">Option 2</ComboboxItem>
 *   </ComboboxContent>
 * </Combobox>
 */

// Context for composable components
interface ComboboxContextValue {
  value: string | string[];
  inputValue: string;
  isOpen: boolean;
  highlightedIndex: number;
  options: ComboboxOption[];
  filteredOptions: ComboboxOption[];
  selectedOptions: ComboboxOption[]; // Add selected options for easy access
  multiple: boolean;
  searchable: boolean;
  creatable: boolean;
  disabled: boolean;
  loading: boolean;
  showCheckmarks: boolean;
  showAvatars: boolean;
  showDescriptions: boolean;
  variant: ComboboxVariant;
  size: ComboboxSize;
  handleSelect: (value: string) => void;
  handleSearch: (value: string) => void;
  handleCreate: () => void;
  handleClear: () => void;
  setIsOpen: (open: boolean) => void;
  setHighlightedIndex: (index: number) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

const ComboboxContext = createContext<ComboboxContextValue | undefined>(
  undefined
);

const useCombobox = () => {
  const context = useContext(ComboboxContext);
  if (!context) {
    throw new Error("Combobox subcomponents must be used within <Combobox>");
  }
  return context;
};



/**
 * Default filter function with advanced fuzzy matching
 */
const defaultFilterOptions = (
  options: ComboboxOption[],
  inputValue: string
): ComboboxOption[] => {
  if (!inputValue) return options;
  const lowerInput = inputValue.toLowerCase().replace(/\s+/g, "");

  return options.filter((option) => {
    const lowerLabel = option.label.toLowerCase().replace(/\s+/g, "");
    const lowerValue = option.value.toLowerCase().replace(/\s+/g, "");
    const lowerDesc =
      option.description?.toLowerCase().replace(/\s+/g, "") || "";

    // Check if input matches anywhere in the text (fuzzy)
    return (
      lowerLabel.includes(lowerInput) ||
      lowerValue.includes(lowerInput) ||
      lowerDesc.includes(lowerInput) ||
      // Also check character-by-character match (e.g., "op2" matches "Option 2")
      matchesPattern(lowerLabel, lowerInput) ||
      matchesPattern(lowerValue, lowerInput)
    );
  });
};

/**
 * Helper function for pattern matching (e.g., "op2" matches "option2")
 */
const matchesPattern = (text: string, pattern: string): boolean => {
  let patternIndex = 0;
  for (let i = 0; i < text.length && patternIndex < pattern.length; i++) {
    if (text[i] === pattern[patternIndex]) {
      patternIndex++;
    }
  }
  return patternIndex === pattern.length;
};

/**
 * Main Combobox Component
 */
export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      options: propOptions = [],
      children,
      placeholder = "Select option...",
      label,
      helperText,
      error,
      variant = "default",
      size = "md",
      multiple = false,
      searchable = true,
      searchPlaceholder = "Search...",
      clearable = true,
      disabled = false,
      readOnly = false,
      required = false,
      loading = false,
      creatable = false,
      createText = "Create",
      allowDeselect = true,
      autoHighlight = true,
      closeOnSelect,
      maxHeight = "320px",
      showCheckmarks = true,
      showAvatars = true,
      showDescriptions = true,
      emptyMessage = "No options found",
      loadingMessage = "Loading...",
      maxDisplay = 3,
      filterOptions = defaultFilterOptions,
      renderOption,
      renderValue,
      onOpen,
      onClose,
      onSearch,
      onCreateOption,
      onFocus,
      onBlur,
      className,
      triggerClassName,
      dropdownClassName,
      optionClassName,
      name,
      id,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
    },
    ref
  ) => {

    // Detect usage mode
    const isComponentBased = !propOptions.length && children;

    // State
    const [internalValue, setInternalValue] = useState<string | string[]>(
      defaultValue || (multiple ? [] : "")
    );
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const shouldCloseOnSelect = closeOnSelect ?? !multiple;

    // Extract options from children when using component API
    const extractedOptions = useMemo(() => {
      if (!isComponentBased || !children) return [];

      const opts: ComboboxOption[] = [];
      const extractFromChildren = (children: React.ReactNode): void => {
        React.Children.forEach(children, (child) => {
          if (!React.isValidElement(child)) return;

          // Use displayName to identify component types (since components are defined later in file)
          const displayName =
            (child.type as any)?.displayName || (child.type as any)?.name;

          // Check if it's a ComboboxItem
          if (displayName === "ComboboxItem") {
            const props = child.props as ComboboxItemProps;
            opts.push({
              value: props.value,
              label: props.label || props.children?.toString() || props.value,
              description: props.description,
              icon: props.icon,
              avatar: props.avatar,
              disabled: props.disabled,
            });
          }
          // Check if it's a ComboboxGroup or ComboboxContent - recurse into children
          else if (
            displayName === "ComboboxGroup" ||
            displayName === "ComboboxContent"
          ) {
            if (
              child.props &&
              typeof child.props === "object" &&
              "children" in child.props
            ) {
              extractFromChildren(child.props.children as React.ReactNode);
            }
          }
          // Recursively check other components (like div, fragments, etc)
          else if (
            child.props &&
            typeof child.props === "object" &&
            "children" in child.props
          ) {
            extractFromChildren(child.props.children as React.ReactNode);
          }
        });
      };

      extractFromChildren(children);
      return opts;
    }, [isComponentBased, children]);

    // Parse options from groups if needed
    const flatOptions = useMemo(() => {
      // Use extracted options if component-based, otherwise use propOptions
      const sourceOptions = isComponentBased ? extractedOptions : propOptions;

      const opts: ComboboxOption[] = [];
      sourceOptions.forEach((item) => {
        if ("options" in item) {
          opts.push(...item.options);
        } else {
          opts.push(item);
        }
      });
      return opts;
    }, [isComponentBased, extractedOptions, propOptions]);

    // Filter options
    const filteredOptions = useMemo(() => {
      if (!searchable || !inputValue) return flatOptions;
      return filterOptions(flatOptions, inputValue);
    }, [flatOptions, inputValue, searchable, filterOptions]);

    // Get selected options
    const selectedOptions = useMemo(() => {
      const values = Array.isArray(value) ? value : [value];
      return flatOptions.filter((opt) => values.includes(opt.value));
    }, [value, flatOptions]);

    // Handle selection
    const handleSelect = useCallback(
      (optionValue: string) => {
        if (disabled || readOnly) return;

        if (multiple) {
          const currentValues = Array.isArray(value) ? value : [];
          let newValue: string[];
          if (currentValues.includes(optionValue)) {
            if (allowDeselect) {
              newValue = currentValues.filter((v) => v !== optionValue);
            } else {
              return;
            }
          } else {
            newValue = [...currentValues, optionValue];
          }

          if (!isControlled) {
            setInternalValue(newValue);
          }
          // Type assertion needed because TypeScript can't narrow onChange based on runtime multiple check
          (onChange as ((value: string[]) => void) | undefined)?.(newValue);
        } else {
          let newValue: string;
          if (value === optionValue && allowDeselect) {
            newValue = "";
          } else {
            newValue = optionValue;
          }

          if (!isControlled) {
            setInternalValue(newValue);
          }
          // Type assertion needed because TypeScript can't narrow onChange based on runtime multiple check
          (onChange as ((value: string) => void) | undefined)?.(newValue);
        }

        if (shouldCloseOnSelect) {
          setIsOpen(false);
          setInputValue("");
          setHighlightedIndex(-1);
        }
      },
      [
        value,
        multiple,
        allowDeselect,
        disabled,
        readOnly,
        isControlled,
        shouldCloseOnSelect,
        onChange,
      ]
    );

    // Handle search
    const handleSearch = useCallback(
      (searchValue: string) => {
        setInputValue(searchValue);
        onSearch?.(searchValue);
        if (autoHighlight) {
          setHighlightedIndex(0);
        }
      },
      [onSearch, autoHighlight]
    );

    // Handle create
    const handleCreate = useCallback(() => {
      if (!creatable || !inputValue.trim()) return;
      onCreateOption?.(inputValue.trim());
      setInputValue("");
    }, [creatable, inputValue, onCreateOption]);

    // Handle clear
    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled || readOnly) return;

        if (multiple) {
          const newValue: string[] = [];
          if (!isControlled) {
            setInternalValue(newValue);
          }
          // Type assertion needed because TypeScript can't narrow onChange based on runtime multiple check
          (onChange as ((value: string[]) => void) | undefined)?.(newValue);
        } else {
          const newValue: string = "";
          if (!isControlled) {
            setInternalValue(newValue);
          }
          // Type assertion needed because TypeScript can't narrow onChange based on runtime multiple check
          (onChange as ((value: string) => void) | undefined)?.(newValue);
        }
        setInputValue("");
      },
      [multiple, disabled, readOnly, isControlled, onChange]
    );

    // Handle open/close
    const handleOpenChange = useCallback(
      (open: boolean) => {
        if (disabled || readOnly) return;

        setIsOpen(open);
        if (open) {
          onOpen?.();
          if (searchable && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 50);
          }
        } else {
          onClose?.();
          setInputValue("");
          setHighlightedIndex(-1);
        }
      },
      [disabled, readOnly, searchable, onOpen, onClose]
    );

    // Keyboard navigation
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
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
            if (
              highlightedIndex >= 0 &&
              highlightedIndex < filteredOptions.length
            ) {
              const option = filteredOptions[highlightedIndex];
              if (!option.disabled) {
                handleSelect(option.value);
              }
            } else if (creatable && inputValue.trim()) {
              handleCreate();
            }
            break;
          case "Escape":
            e.preventDefault();
            handleOpenChange(false);
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [
      isOpen,
      highlightedIndex,
      filteredOptions,
      inputValue,
      creatable,
      handleSelect,
      handleCreate,
      handleOpenChange,
    ]);

    // Click outside handler
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          handleOpenChange(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, handleOpenChange]);

    // Context value
    const contextValue: ComboboxContextValue = {
      value,
      inputValue,
      isOpen,
      highlightedIndex,
      options: flatOptions,
      filteredOptions,
      selectedOptions,
      multiple,
      searchable,
      creatable,
      disabled,
      loading,
      showCheckmarks,
      showAvatars,
      showDescriptions,
      variant,
      size,
      handleSelect,
      handleSearch,
      handleCreate,
      handleClear: () => handleClear({} as React.MouseEvent),
      setIsOpen: handleOpenChange,
      setHighlightedIndex,
      triggerRef,
      dropdownRef,
      searchInputRef,
    };

    // Render value display
    const renderValueDisplay = () => {
      if (renderValue) {
        return renderValue(value);
      }

      if (!value || (Array.isArray(value) && value.length === 0)) {
        return <span className="text-muted-foreground">{placeholder}</span>;
      }

      if (multiple && Array.isArray(value)) {
        const displayCount = Math.min(value.length, maxDisplay);
        const remaining = value.length - displayCount;

        return (
          <div className="flex flex-wrap gap-1.5">
            {selectedOptions.slice(0, displayCount).map((opt) => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-sm font-medium"
              >
                {opt.label}
              </span>
            ))}
            {remaining > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-sm font-medium">
                +{remaining}
              </span>
            )}
          </div>
        );
      }

      const selected = selectedOptions[0];
      return selected ? selected.label : placeholder;
    };

    return (
      <ComboboxContext.Provider value={contextValue}>
        <div ref={ref} className={cn("relative w-full", className)}>
          {/* Label */}
          {label && (
            <label
              className={cn(
                "block text-sm font-semibold mb-2 text-foreground",
                required &&
                  "after:content-['*'] after:ml-0.5 after:text-destructive",
                disabled && "opacity-50"
              )}
            >
              {label}
            </label>
          )}

          {/* Trigger - wrapped in relative container for absolute clear button */}
          <div className="relative">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => handleOpenChange(!isOpen)}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={disabled || readOnly}
              className={cn(
                triggerVariants({ variant, size, hasError: !!error }),
                triggerClassName
              )}
              aria-label={ariaLabel}
              aria-describedby={ariaDescribedby}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              id={id}
            >
              <span className="flex-1 truncate">{renderValueDisplay()}</span>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {loading && (
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                )}
                {/* Spacer for clear button when it's visible */}
                {clearable &&
                  ((Array.isArray(value) && value.length > 0) ||
                    (!Array.isArray(value) && value)) &&
                  !disabled &&
                  !readOnly && <div className="w-5 h-5" />}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </div>
            </button>

            {/* Clear button - positioned absolutely outside trigger button */}
            {clearable &&
              ((Array.isArray(value) && value.length > 0) ||
                (!Array.isArray(value) && value)) &&
              !disabled &&
              !readOnly && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClear(e);
                  }}
                  className="absolute right-9 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-muted/50 transition-colors z-10"
                  tabIndex={-1}
                  aria-label="Clear selection"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
          </div>

          {/* Error message */}
          {error && (
            <p className="mt-1.5 text-sm text-destructive font-medium">
              {error}
            </p>
          )}

          {/* Helper text */}
          {helperText && !error && (
            <p className="mt-1.5 text-sm text-muted-foreground">{helperText}</p>
          )}

          {/* Dropdown */}
          {isOpen && (
            <>
              {/* Component-based API */}
              {isComponentBased ? (
                children
              ) : (
                <div
                  ref={dropdownRef}
                  className={cn(
                    contentVariants({ variant }),
                    dropdownClassName
                  )}
                  style={{ maxHeight }}
                >
                  {/* Search input */}
                  {searchable && (
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder={searchPlaceholder}
                        className={cn(searchVariants({ size }), "pl-10")}
                      />
                    </div>
                  )}

                  {/* Options list */}
                  <div className="overflow-y-auto max-h-[280px] py-1">
                    {loading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">
                          {loadingMessage}
                        </span>
                      </div>
                    ) : filteredOptions.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                        {emptyMessage}
                        {creatable && inputValue.trim() && (
                          <button
                            onClick={handleCreate}
                            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            {typeof createText === "function"
                              ? createText(inputValue)
                              : `${createText} "${inputValue}"`}
                          </button>
                        )}
                      </div>
                    ) : (
                      <>
                        {propOptions.map((item, groupIndex) => {
                          if ("options" in item) {
                            // Grouped options
                            const group = item as ComboboxGroupType;
                            const groupOptions = filterOptions(
                              group.options,
                              inputValue
                            );
                            if (groupOptions.length === 0) return null;

                            return (
                              <div key={groupIndex}>
                                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  {group.label}
                                </div>
                                {groupOptions.map((option) => {
                                  const globalIndex = filteredOptions.findIndex(
                                    (o) => o.value === option.value
                                  );
                                  return (
                                    <ComboboxOptionItem
                                      key={option.value}
                                      option={option}
                                      index={globalIndex}
                                      renderOption={renderOption}
                                      optionClassName={optionClassName}
                                    />
                                  );
                                })}
                              </div>
                            );
                          } else {
                            // Flat option
                            const option = item as ComboboxOption;
                            const globalIndex = filteredOptions.findIndex(
                              (o) => o.value === option.value
                            );
                            if (globalIndex === -1) return null;

                            return (
                              <ComboboxOptionItem
                                key={option.value}
                                option={option}
                                index={globalIndex}
                                renderOption={renderOption}
                                optionClassName={optionClassName}
                              />
                            );
                          }
                        })}
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Hidden input for form submission */}
          {name && (
            <input
              type="hidden"
              name={name}
              value={Array.isArray(value) ? value.join(",") : value}
            />
          )}
        </div>
      </ComboboxContext.Provider>
    );
  }
);

Combobox.displayName = "Combobox";

/**
 * Internal option item component
 */
const ComboboxOptionItem: React.FC<{
  option: ComboboxOption;
  index: number;
  renderOption?: (option: ComboboxOption) => React.ReactNode;
  optionClassName?: string;
}> = ({ option, index, renderOption, optionClassName }) => {
  const {
    value,
    highlightedIndex,
    showCheckmarks,
    showAvatars,
    showDescriptions,
    size,
    handleSelect,
  } = useCombobox();

  const isSelected = Array.isArray(value)
    ? value.includes(option.value)
    : value === option.value;
  const isHighlighted = highlightedIndex === index;

  if (renderOption) {
    return (
      <div
        onClick={() => !option.disabled && handleSelect(option.value)}
        className={cn(
          optionVariants({
            selected: isSelected,
            highlighted: isHighlighted,
            disabled: option.disabled,
            size,
          }),
          optionClassName
        )}
      >
        {renderOption(option)}
      </div>
    );
  }

  return (
    <div
      onClick={() => !option.disabled && handleSelect(option.value)}
      className={cn(
        optionVariants({
          selected: isSelected,
          highlighted: isHighlighted,
          disabled: option.disabled,
          size,
        }),
        optionClassName
      )}
    >
      {/* Checkmark */}
      {showCheckmarks && (
        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
          {isSelected && <Check className="w-4 h-4 text-primary" />}
        </div>
      )}

      {/* Avatar */}
      {showAvatars && option.avatar && (
        <img
          src={option.avatar}
          alt={option.label}
          className="w-6 h-6 rounded-full object-cover flex-shrink-0"
        />
      )}

      {/* Icon */}
      {option.icon && <div className="flex-shrink-0">{option.icon}</div>}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{option.label}</div>
        {showDescriptions && option.description && (
          <div className="text-sm text-muted-foreground truncate">
            {option.description}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Component API - Trigger
 */
export const ComboboxTrigger = forwardRef<HTMLDivElement, ComboboxTriggerProps>(
  ({ children, asChild }, _ref) => {
    const { setIsOpen, isOpen, triggerRef } = useCombobox();

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref: triggerRef,
        onClick: () => setIsOpen(!isOpen),
      } as any);
    }

    return <></>;
  }
);

ComboboxTrigger.displayName = "ComboboxTrigger";

/**
 * Component API - Value Display Helper
 * Displays the selected option label(s) or placeholder
 */
export const ComboboxValue = forwardRef<
  HTMLSpanElement,
  { placeholder?: string; className?: string }
>(({ placeholder = "Select...", className }, ref) => {
  const { selectedOptions, multiple } = useCombobox();

  if (selectedOptions.length === 0) {
    return (
      <span ref={ref} className={cn("text-muted-foreground", className)}>
        {placeholder}
      </span>
    );
  }

  if (multiple) {
    return (
      <span ref={ref} className={className}>
        {selectedOptions.map((opt) => opt.label).join(", ")}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {selectedOptions[0].label}
    </span>
  );
});

ComboboxValue.displayName = "ComboboxValue";

/**
 * Component API - Content
 */
export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ children, className, maxHeight = "320px" }, _ref) => {
    const { isOpen, variant, dropdownRef } = useCombobox();

    if (!isOpen) return null;

    return (
      <div
        ref={dropdownRef}
        className={cn(contentVariants({ variant }), "flex flex-col", className)}
        style={{ maxHeight }}
      >
        <div className="overflow-y-auto overflow-x-hidden py-1">{children}</div>
      </div>
    );
  }
);

ComboboxContent.displayName = "ComboboxContent";

/**
 * Component API - Search
 */
export const ComboboxSearch = forwardRef<HTMLInputElement, ComboboxSearchProps>(
  ({ placeholder = "Search...", className }, _ref) => {
    const { inputValue, handleSearch, searchInputRef, size } = useCombobox();

    return (
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          ref={searchInputRef}
          type="text"
          value={inputValue}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className={cn(searchVariants({ size }), "pl-10", className)}
        />
      </div>
    );
  }
);

ComboboxSearch.displayName = "ComboboxSearch";

/**
 * Component API - Item
 */
export const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(
  (
    {
      value: itemValue,
      label,
      description,
      icon,
      avatar,
      disabled = false,
      className,
      children,
    },
    ref
  ) => {
    const {
      value,
      highlightedIndex,
      filteredOptions,
      inputValue,
      showCheckmarks,
      showAvatars,
      showDescriptions,
      size,
      handleSelect,
    } = useCombobox();

    // For component-based API, we need to manually check if this item should be visible
    // Create a temporary option object for filtering
    const itemLabel =
      label || (typeof children === "string" ? children : itemValue);
    const itemOption: ComboboxOption = {
      value: itemValue,
      label: itemLabel,
      description,
      icon,
      avatar,
      disabled,
    };

    // Check if this item passes the current filter
    // If no search input, show all items
    const shouldShow =
      !inputValue || defaultFilterOptions([itemOption], inputValue).length > 0;

    // Hide item if it doesn't match the search
    if (!shouldShow) {
      return null;
    }

    // Find index in filtered options for highlighting
    const index = filteredOptions.findIndex((opt) => opt.value === itemValue);

    const isSelected = Array.isArray(value)
      ? value.includes(itemValue)
      : value === itemValue;
    const isHighlighted = index >= 0 && highlightedIndex === index;

    return (
      <div
        ref={ref}
        onClick={() => !disabled && handleSelect(itemValue)}
        className={cn(
          optionVariants({
            selected: isSelected,
            highlighted: isHighlighted,
            disabled,
            size,
          }),
          className
        )}
      >
        {/* Checkmark */}
        {showCheckmarks && (
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            {isSelected && <Check className="w-4 h-4 text-primary" />}
          </div>
        )}

        {/* Avatar */}
        {showAvatars && avatar && (
          <img
            src={avatar}
            alt={label || ""}
            className="w-6 h-6 rounded-full object-cover flex-shrink-0"
          />
        )}

        {/* Icon */}
        {icon && <div className="flex-shrink-0">{icon}</div>}

        {/* Content */}
        {children ? (
          <div className="flex-1 min-w-0">{children}</div>
        ) : (
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{label}</div>
            {showDescriptions && description && (
              <div className="text-sm text-muted-foreground truncate">
                {description}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

ComboboxItem.displayName = "ComboboxItem";

/**
 * Component API - Group
 */
export const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(
  ({ label, children, className }, ref) => {
    return (
      <div ref={ref} className={className}>
        {label && (
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);

ComboboxGroup.displayName = "ComboboxGroup";

/**
 * Component API - Empty
 */
export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  ({ children, className }, ref) => {
    const { filteredOptions } = useCombobox();

    if (filteredOptions.length > 0) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-8 text-muted-foreground",
          className
        )}
      >
        {children || "No options found"}
      </div>
    );
  }
);

ComboboxEmpty.displayName = "ComboboxEmpty";

/**
 * Component API - Loading
 */
export const ComboboxLoading = forwardRef<HTMLDivElement, ComboboxLoadingProps>(
  ({ children, className }, ref) => {
    const { loading } = useCombobox();

    if (!loading) return null;

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center py-8", className)}
      >
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        {children && (
          <span className="ml-2 text-muted-foreground">{children}</span>
        )}
      </div>
    );
  }
);

ComboboxLoading.displayName = "ComboboxLoading";

/**
 * Component API - Separator
 */
export const ComboboxSeparator = forwardRef<
  HTMLDivElement,
  ComboboxSeparatorProps
>(({ className }, ref) => {
  return <div ref={ref} className={cn("h-px bg-border my-1", className)} />;
});

ComboboxSeparator.displayName = "ComboboxSeparator";

/**
 * Component API - Create
 */
export const ComboboxCreate = forwardRef<
  HTMLButtonElement,
  ComboboxCreateProps
>(({ children, className }, ref) => {
  const { inputValue, handleCreate, creatable } = useCombobox();

  if (!creatable || !inputValue.trim()) return null;

  return (
    <button
      ref={ref}
      onClick={handleCreate}
      className={cn(
        "w-full flex items-center gap-2 px-4 py-2.5",
        "text-left hover:bg-accent/10 transition-colors",
        "border-t-2 border-border/50",
        className
      )}
    >
      <Plus className="w-4 h-4" />
      {children || `Create "${inputValue}"`}
    </button>
  );
});

ComboboxCreate.displayName = "ComboboxCreate";

export default Combobox;
