import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  isValidElement,
  cloneElement,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type {
  DropdownProps,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownGroupProps,
  DropdownSeparatorProps,
} from "./Dropdown.types";
import { ChevronDown, Check, Search, X } from "lucide-react";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";

/**
 * Dropdown Component
 *
 * Advanced dropdown menu with nested menus, search, keyboard navigation,
 * command palette, and beautiful animations.
 *
 * Supports TWO usage patterns:
 * 1. Props-based (Simple): <Dropdown options={[...]} placeholder="Select..." />
 * 2. Component-based (Flexible): <Dropdown><DropdownTrigger>...</DropdownTrigger><DropdownContent>...</DropdownContent></Dropdown>
 *
 * @variant default | primary | secondary | accent | success | warning | error | ghost | glass
 * @size sm | md | lg
 */

// Dropdown Context
interface DropdownContextValue {
  value?: string | string[];
  onChange?: (value: string) => void;
  multiple?: boolean;
  closeOnSelect?: boolean;
  checkmarks?: boolean;
  onClose?: () => void;
  searchQuery?: string;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  variant?: DropdownProps["variant"];
  size?: DropdownProps["size"];
  disabled?: boolean;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined
);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within Dropdown");
  }
  return context;
};

/**
 * Dropdown trigger button variants
 */
const dropdownTriggerVariants = cva(
  [
    "inline-flex items-center justify-between gap-2 rounded-lg border-2",
    "font-medium transition-all duration-300 ease-out cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "hover:scale-[1.02] active:scale-[0.98]",
    "shadow-sm hover:shadow-md",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background text-foreground",
          "hover:border-foreground/60 hover:bg-muted/50",
          "focus-visible:ring-ring/50",
        ],
        primary: [
          "border-primary/40 bg-primary/5 text-primary",
          "hover:border-primary/60 hover:bg-primary/10",
          "focus-visible:ring-primary/50",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/5 text-secondary",
          "hover:border-secondary/60 hover:bg-secondary/10",
          "focus-visible:ring-secondary/50",
        ],
        accent: [
          "border-accent/40 bg-accent/5 text-accent",
          "hover:border-accent/60 hover:bg-accent/10",
          "focus-visible:ring-accent/50",
        ],
        success: [
          "border-success/40 bg-success/5 text-success",
          "hover:border-success/60 hover:bg-success/10",
          "focus-visible:ring-success/50",
        ],
        warning: [
          "border-warning/40 bg-warning/5 text-warning",
          "hover:border-warning/60 hover:bg-warning/10",
          "focus-visible:ring-warning/50",
        ],
        error: [
          "border-destructive/40 bg-destructive/5 text-destructive",
          "hover:border-destructive/60 hover:bg-destructive/10",
          "focus-visible:ring-destructive/50",
        ],
        ghost: [
          "border-transparent bg-transparent text-foreground",
          "hover:bg-muted/50",
          "focus-visible:ring-ring/50",
        ],
        glass: [
          "border-border/50 glass text-foreground",
          "hover:border-border",
          "focus-visible:ring-ring/50",
        ],
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Dropdown content variants
 */
const dropdownContentVariants = cva(
  [
    "z-50 rounded-xl border-2 shadow-xl text-foreground",
    "transition-all duration-300 ease-out",
    "animate-in fade-in-0 zoom-in-95",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        default: "border-border bg-background",
        primary: "border-primary/40 bg-background",
        secondary: "border-secondary/40 bg-background",
        accent: "border-accent/40 bg-background",
        success: "border-success/40 bg-background",
        warning: "border-warning/40 bg-background",
        error: "border-destructive/40 bg-background",
        ghost: "border-border bg-background",
        glass: "border-border/50 glass",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Dropdown item variants
 */
const dropdownItemVariants = cva(
  [
    "flex items-center gap-3 px-4 py-2.5 cursor-pointer",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none",
    "data-[disabled=true]:opacity-50 data-[disabled=true]:!cursor-not-allowed data-[disabled=true]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-foreground hover:bg-foreground/5",
          "data-[selected=true]:bg-foreground/10 data-[selected=true]:font-medium",
        ],
        primary: [
          "text-foreground hover:bg-primary/5",
          "data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary data-[selected=true]:font-medium",
        ],
        secondary: [
          "text-foreground hover:bg-secondary/5",
          "data-[selected=true]:bg-secondary/10 data-[selected=true]:text-secondary data-[selected=true]:font-medium",
        ],
        accent: [
          "text-foreground hover:bg-accent/5",
          "data-[selected=true]:bg-accent/10 data-[selected=true]:text-accent data-[selected=true]:font-medium",
        ],
        success: [
          "text-foreground hover:bg-success/5",
          "data-[selected=true]:bg-success/10 data-[selected=true]:text-success data-[selected=true]:font-medium",
        ],
        warning: [
          "text-foreground hover:bg-warning/5",
          "data-[selected=true]:bg-warning/10 data-[selected=true]:text-warning data-[selected=true]:font-medium",
        ],
        error: [
          "text-foreground hover:bg-destructive/5",
          "data-[selected=true]:bg-destructive/10 data-[selected=true]:text-destructive data-[selected=true]:font-medium",
        ],
        ghost: [
          "text-foreground hover:bg-foreground/5",
          "data-[selected=true]:bg-foreground/10 data-[selected=true]:font-medium",
        ],
        glass: [
          "text-foreground hover:bg-background/50",
          "data-[selected=true]:bg-background/80 data-[selected=true]:font-medium",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Dropdown Component (Compound Pattern)
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      trigger,
      triggerAsChild,
      options,
      children,
      value: controlledValue,
      defaultValue,
      onChange,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      multiple = false,
      closeOnSelect = !multiple,
      modal = false,
      searchable = false,
      searchPlaceholder = "Search...",
      onSearch,
      variant = "default",
      size = "md",
      align = "start",
      side = "bottom",
      sideOffset = 4,
      width,
      maxHeight = "320px",
      label,
      placeholder = "Select...",
      error,
      helperText,
      commandPalette = false,
      grouped = false,
      checkmarks = true,
      disabled = false,
      loading = false,
      emptyMessage = "No results found",
      className,
      triggerClassName,
      contentClassName,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Dropdown");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "ghost",
        "glass",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate align
      validator.validateEnum("align", align, [
        "start",
        "center",
        "end",
      ] as const);

      // Validate side
      validator.validateEnum("side", side, [
        "top",
        "right",
        "bottom",
        "left",
      ] as const);

      // Validate numeric props
      validator.validateType("sideOffset", sideOffset, "number", isValidNumber);

      // Validate boolean props
      validator.validateType("multiple", multiple, "boolean", isValidBoolean);
      validator.validateType(
        "closeOnSelect",
        closeOnSelect,
        "boolean",
        isValidBoolean
      );
      validator.validateType("modal", modal, "boolean", isValidBoolean);
      validator.validateType(
        "searchable",
        searchable,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "commandPalette",
        commandPalette,
        "boolean",
        isValidBoolean
      );
      validator.validateType("grouped", grouped, "boolean", isValidBoolean);
      validator.validateType(
        "checkmarks",
        checkmarks,
        "boolean",
        isValidBoolean
      );
      validator.validateType("disabled", disabled, "boolean", isValidBoolean);
      validator.validateType("loading", loading, "boolean", isValidBoolean);

      if (triggerAsChild !== undefined) {
        validator.validateType(
          "triggerAsChild",
          triggerAsChild,
          "boolean",
          isValidBoolean
        );
      }

      // Common validators
      commonValidators.className(validator, className);
    }, [
      variant,
      size,
      align,
      side,
      sideOffset,
      multiple,
      closeOnSelect,
      modal,
      searchable,
      commandPalette,
      grouped,
      checkmarks,
      disabled,
      loading,
      triggerAsChild,
      className,
    ]);

    // Detect usage mode: Component-based vs Props-based
    const isComponentBased = !options && children;

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [uncontrolledValue, setUncontrolledValue] = useState<
      string | string[]
    >(defaultValue || (multiple ? [] : ""));
    const [searchQuery, setSearchQuery] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(0);

    const isControlledOpen = controlledOpen !== undefined;
    const isControlledValue = controlledValue !== undefined;
    const isOpen = isControlledOpen ? controlledOpen : uncontrolledOpen;
    const value = isControlledValue ? controlledValue : uncontrolledValue;

    const contentRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleOpenChange = (newOpen: boolean) => {
      if (!isControlledOpen) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
      if (!newOpen) {
        setSearchQuery("");
        setFocusedIndex(0);
      }
    };

    const handleValueChange = (newValue: string) => {
      if (disabled) return;

      let updatedValue: string | string[];
      if (multiple) {
        const currentArray = Array.isArray(value) ? value : [];
        if (currentArray.includes(newValue)) {
          updatedValue = currentArray.filter((v) => v !== newValue);
        } else {
          updatedValue = [...currentArray, newValue];
        }
      } else {
        updatedValue = newValue;
      }

      if (!isControlledValue) {
        setUncontrolledValue(updatedValue);
      }
      onChange?.(updatedValue);

      if (closeOnSelect && !multiple) {
        handleOpenChange(false);
      }
    };

    const handleClose = () => {
      handleOpenChange(false);
    };

    // Keyboard navigation
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setFocusedIndex((prev) =>
            Math.min(prev + 1, (options?.length || 1) - 1)
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          const option = options?.[focusedIndex];
          if (option && !option.disabled) {
            handleValueChange(option.value);
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, focusedIndex, options]);

    // Focus search input when opened
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    }, [isOpen, searchable]);

    // Filter options by search
    const filteredOptions = options?.filter((option) => {
      if (!searchQuery) return true;
      return (
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Get display value
    const getDisplayValue = () => {
      if (!value) return placeholder;
      if (multiple && Array.isArray(value)) {
        if (value.length === 0) return placeholder;
        const selected = options?.filter((opt) => value.includes(opt.value));
        return selected?.map((opt) => opt.label).join(", ") || placeholder;
      }
      const selected = options?.find((opt) => opt.value === value);
      return selected?.label || placeholder;
    };

    const contextValue: DropdownContextValue = {
      value,
      onChange: handleValueChange,
      multiple,
      closeOnSelect,
      checkmarks,
      onClose: handleClose,
      searchQuery,
      isOpen,
      setIsOpen: handleOpenChange,
      variant,
      size,
      disabled,
    };

    // Click outside to close
    useEffect(() => {
      if (!isOpen || modal) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node)
        ) {
          handleClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, modal]);

    // Component-based mode: render children with context
    if (isComponentBased) {
      return (
        <DropdownContext.Provider value={contextValue}>
          <div
            ref={ref}
            className={cn("relative inline-block", className)}
            {...props}
          >
            {children}
            {/* Error/Helper Text */}
            {error && (
              <p className="mt-2 text-sm font-medium text-destructive">
                {error}
              </p>
            )}
            {!error && helperText && (
              <p className="mt-2 text-sm text-muted-foreground">{helperText}</p>
            )}
          </div>
        </DropdownContext.Provider>
      );
    }

    // Props-based mode: render with options prop
    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        {label && (
          <label className="mb-2 block text-sm font-semibold text-foreground">
            {label}
          </label>
        )}

        {/* Trigger */}
        <button
          type="button"
          onClick={() => !disabled && handleOpenChange(!isOpen)}
          disabled={disabled || loading}
          className={cn(
            dropdownTriggerVariants({ variant, size }),
            width && `w-[${width}]`,
            triggerClassName
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="flex-1 truncate text-left">
            {loading ? "Loading..." : getDisplayValue()}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Content */}
        {isOpen && (
          <DropdownContext.Provider value={contextValue}>
            <div
              ref={contentRef}
              className={cn(
                dropdownContentVariants({ variant }),
                "absolute mt-2 w-full min-w-[200px]",
                side === "top" && "bottom-full mb-2 mt-0",
                side === "bottom" && "top-full",
                align === "start" && "left-0",
                align === "center" && "left-1/2 -translate-x-1/2",
                align === "end" && "right-0",
                width && `w-[${width}]`,
                contentClassName
              )}
              style={{
                maxHeight,
              }}
            >
              {/* Search */}
              {searchable && (
                <div className="border-b-2 border-border p-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        onSearch?.(e.target.value);
                      }}
                      className={cn(
                        "w-full rounded-lg border-2 border-border bg-background",
                        "py-2 pl-10 pr-8 text-sm",
                        "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50",
                        "transition-all duration-200"
                      )}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-muted"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="max-h-[280px] overflow-y-auto p-1">
                {filteredOptions && filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <DropdownItem
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      icon={option.icon}
                      avatar={option.avatar}
                      description={option.description}
                      badge={option.badge}
                      shortcut={option.shortcut}
                      color={option.color}
                      disabled={option.disabled}
                      divider={option.divider}
                      header={option.header}
                      data-focused={index === focusedIndex}
                      className={cn(index === focusedIndex && "bg-muted/50")}
                    />
                  ))
                ) : (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    {emptyMessage}
                  </div>
                )}
              </div>
            </div>
          </DropdownContext.Provider>
        )}

        {/* Error/Helper Text */}
        {error && (
          <p className="mt-2 text-sm font-medium text-destructive">{error}</p>
        )}
        {!error && helperText && (
          <p className="mt-2 text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

/**
 * DropdownItem Component
 */
export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  (
    {
      value = "",
      icon,
      avatar,
      label,
      description,
      badge,
      shortcut,
      color,
      disabled = false,
      divider = false,
      header = false,
      children,
      onSelect,
      className,
      ...props
    },
    ref
  ) => {
    const context = useDropdownContext();
    const isSelected = context?.multiple
      ? Array.isArray(context.value) && context.value.includes(value)
      : context?.value === value;

    const handleClick = () => {
      if (disabled) return;
      context?.onChange?.(value);
      onSelect?.(value);
    };

    if (divider) {
      return <DropdownSeparator />;
    }

    if (header) {
      return (
        <div
          ref={ref}
          className={cn(
            "px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
            className
          )}
          {...props}
        >
          {label || children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        onClick={handleClick}
        data-disabled={disabled ? "true" : undefined}
        data-selected={isSelected ? "true" : "false"}
        className={cn(dropdownItemVariants({ variant: "default" }), className)}
        {...props}
      >
        {/* Checkmark */}
        {context?.checkmarks && context.multiple && (
          <div className="flex h-4 w-4 shrink-0 items-center justify-center">
            {isSelected && <Check className="h-4 w-4" />}
          </div>
        )}

        {/* Avatar */}
        {avatar && (
          <img
            src={avatar}
            alt={label}
            className="h-6 w-6 shrink-0 rounded-full object-cover"
          />
        )}

        {/* Icon */}
        {icon && <span className="shrink-0">{icon}</span>}

        {/* Content */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            {label && (
              <span
                className={cn(
                  "font-semibold leading-none text-foreground",
                  color && ""
                )}
                style={color ? { color } : undefined}
              >
                {label}
              </span>
            )}
            {badge && (
              <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs font-semibold text-primary">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <span className="mt-1 text-xs leading-tight text-muted-foreground">
              {description}
            </span>
          )}
        </div>

        {/* Shortcut */}
        {shortcut && (
          <span className="ml-auto shrink-0 rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
            {shortcut}
          </span>
        )}

        {/* Single select checkmark */}
        {context?.checkmarks && !context.multiple && isSelected && (
          <Check className="ml-auto h-4 w-4 shrink-0" />
        )}

        {children}
      </div>
    );
  }
);

DropdownItem.displayName = "DropdownItem";

/**
 * DropdownSeparator Component
 */
export const DropdownSeparator = forwardRef<
  HTMLDivElement,
  DropdownSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  );
});

DropdownSeparator.displayName = "DropdownSeparator";

/**
 * DropdownGroup Component
 */
export const DropdownGroup = forwardRef<HTMLDivElement, DropdownGroupProps>(
  ({ label, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("py-1", className)} {...props}>
        {label && (
          <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);

DropdownGroup.displayName = "DropdownGroup";

/**
 * DropdownTrigger Component
 * For component-based usage
 */
export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ children, className, asChild = false, disabled, ...props }, ref) => {
  const context = useDropdownContext();
  const {
    isOpen,
    setIsOpen,
    variant,
    size,
    disabled: contextDisabled,
  } = context;

  const isDisabled = disabled || contextDisabled;

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<any>, {
      onClick: () => !isDisabled && setIsOpen?.(!isOpen),
      "aria-haspopup": "listbox",
      "aria-expanded": isOpen,
      disabled: isDisabled,
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => !isDisabled && setIsOpen?.(!isOpen)}
      disabled={isDisabled}
      className={cn(dropdownTriggerVariants({ variant, size }), className)}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      {...props}
    >
      <span className="flex-1 truncate text-left">{children}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-300",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
});

DropdownTrigger.displayName = "DropdownTrigger";

/**
 * DropdownContent Component
 * For component-based usage
 */
export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  (
    {
      children,
      className,
      align = "start",
      side = "bottom",
      sideOffset = 4,
      width,
      maxHeight = "320px",
      ...props
    },
    ref
  ) => {
    const context = useDropdownContext();
    const { isOpen, variant } = context;

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          dropdownContentVariants({ variant }),
          "absolute mt-2 w-full min-w-[200px]",
          side === "top" && "bottom-full mb-2 mt-0",
          side === "bottom" && "top-full",
          side === "left" && "right-full mr-2 mt-0",
          side === "right" && "left-full ml-2 mt-0",
          align === "start" && "left-0",
          align === "center" && "left-1/2 -translate-x-1/2",
          align === "end" && "right-0",
          width && `w-[${width}]`,
          className
        )}
        style={{
          maxHeight,
        }}
        {...props}
      >
        <div className="max-h-[280px] overflow-y-auto p-1">{children}</div>
      </div>
    );
  }
);

DropdownContent.displayName = "DropdownContent";

export default Dropdown;
