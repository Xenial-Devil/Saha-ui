"use client";

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  isValidElement,
  cloneElement,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import usePortalPosition from "../../lib/usePortalPosition";
import { cn } from "../../lib/utils";
import { useClickOutside } from "../../hooks/useClickOutside";
import type {
  DropdownProps,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownGroupProps,
  DropdownSeparatorProps,
} from "./Dropdown.types";
import { ChevronDown, Search, X } from "lucide-react";
import {
  dropdownTriggerVariants,
  dropdownContentVariants,
  dropdownItemVariants,
} from "./Dropdown.styles";

/**
 * Dropdown Component
 *
 * Advanced dropdown menu for navigation and actions with keyboard navigation,
 * search, nested menus, and beautiful animations.
 *
 * Supports TWO usage patterns:
 * 1. Props-based (Simple): <Dropdown options={[...]} placeholder="Menu" />
 * 2. Component-based (Flexible): <Dropdown><DropdownTrigger>...</DropdownTrigger><DropdownContent>...</DropdownContent></Dropdown>
 *
 * @variant default | primary | secondary | accent | success | warning | error | ghost | glass
 * @size sm | md | lg
 */

// Dropdown Context
interface DropdownContextValue {
  onAction?: (value: string) => void;
  closeOnSelect?: boolean;
  onClose?: () => void;
  searchQuery?: string;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  variant?: DropdownProps["variant"];
  size?: DropdownProps["size"];
  disabled?: boolean;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  disablePortal?: boolean;
  align?: DropdownProps["align"];
  side?: DropdownProps["side"];
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
 * Dropdown Component (Compound Pattern)
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      trigger: _trigger,
      options,
      children,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      closeOnSelect = true,
      modal = false,
      searchable = false,
      searchPlaceholder = "Search...",
      onSearch,
      variant = "default",
      size = "md",
      align = "start",
      side = "bottom",
      width,
      maxHeight = "320px",
      label,
      placeholder = "Menu",
      error,
      helperText,
      disabled = false,
      loading = false,
      emptyMessage = "No results found",
      className,
      triggerClassName,
      contentClassName,
      disablePortal = false,
      ...props
    },
    ref
  ) => {
    // Detect usage mode: Component-based vs Props-based
    const isComponentBased = !options && children;

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [searchQuery, setSearchQuery] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(0);

    const isControlledOpen = controlledOpen !== undefined;
    const isOpen = isControlledOpen ? controlledOpen : uncontrolledOpen;

    const contentRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const position = `${side}${align ? `-${align}` : ""}`;
    const { portalContainer, portalRef, portalPos } = usePortalPosition(
      triggerRef,
      isOpen,
      { position }
    );

    const [positionReady, setPositionReady] = useState(false);
    useEffect(() => {
      if (!isOpen) {
        setPositionReady(false);
        return;
      }
      const t = setTimeout(() => setPositionReady(true), 20);
      return () => clearTimeout(t);
    }, [isOpen, portalPos.left, portalPos.top]);

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (!isControlledOpen) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
        if (!newOpen) {
          setSearchQuery("");
          setFocusedIndex(0);
        }
      },
      [isControlledOpen, onOpenChange]
    );

    const handleAction = useCallback(() => {
      if (disabled) return;

      if (closeOnSelect) {
        handleOpenChange(false);
      }
    }, [disabled, closeOnSelect, handleOpenChange]);

    const handleClose = useCallback(() => {
      handleOpenChange(false);
    }, [handleOpenChange]);

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
            handleAction();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, focusedIndex, options, handleClose, handleAction]);

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

    const contextValue: DropdownContextValue = {
      onAction: handleAction,
      closeOnSelect,
      onClose: handleClose,
      searchQuery,
      isOpen,
      setIsOpen: handleOpenChange,
      variant,
      size,
      disabled,
      triggerRef,
      disablePortal,
      align,
      side,
    };

    // Click outside to close - optimized with useClickOutside hook
    useClickOutside(contentRef, () => {
      if (isOpen && !modal) {
        handleClose();
      }
    });

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
          ref={triggerRef}
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
            {loading ? "Loading..." : placeholder}
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
            {(() => {
              const triggerWidth =
                triggerRef.current?.getBoundingClientRect().width;
              const sizeMin = size === "sm" ? 120 : size === "lg" ? 280 : 200;
              const computedWidth = width
                ? typeof width === "number"
                  ? `${width}px`
                  : String(width)
                : triggerWidth
                ? `${Math.max(triggerWidth, sizeMin)}px`
                : `${sizeMin}px`;
              const computedMinWidth = triggerWidth
                ? `${Math.max(triggerWidth, sizeMin)}px`
                : `${sizeMin}px`;

              const contentNode = (
                <div
                  ref={(node) => {
                    contentRef.current = node as HTMLDivElement | null;
                    portalRef.current = node as HTMLDivElement | null;
                  }}
                  className={cn(
                    dropdownContentVariants({ variant }),
                    "absolute mt-2",
                    side === "top" && "bottom-full mb-2 mt-0",
                    side === "bottom" && "top-full",
                    // When rendering in a portal we use portalPos (absolute coords)
                    // so don't apply alignment utility classes that assume
                    // positioning relative to the trigger container.
                    !portalContainer && align === "start" && "left-0",
                    !portalContainer &&
                      align === "center" &&
                      "left-1/2 -translate-x-1/2",
                    !portalContainer && align === "end" && "right-0",
                    width && `w-[${width}]`,
                    contentClassName,
                    positionReady ? undefined : "transition-none"
                  )}
                  style={{
                    maxHeight,
                    position: "absolute",
                    top: portalPos.top,
                    left: portalPos.left,
                    width: computedWidth,
                    minWidth: computedMinWidth,
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
                          className={cn(
                            index === focusedIndex && "bg-muted/50"
                          )}
                        />
                      ))
                    ) : (
                      <div className="py-8 text-center text-sm text-muted-foreground">
                        {emptyMessage}
                      </div>
                    )}
                  </div>
                </div>
              );

              if (!portalContainer || disablePortal) return contentNode;
              return createPortal(contentNode, portalContainer);
            })()}
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
      href,
      target = "_self",
      children,
      onSelect,
      className,
      ...props
    },
    ref
  ) => {
    const context = useDropdownContext();

    const handleClick = (e: React.MouseEvent) => {
      if (disabled) return;
      if (href) {
        // Let the link handle navigation
        if (context?.closeOnSelect !== false) {
          context?.onClose?.();
        }
        return;
      }
      e.preventDefault();
      context?.onAction?.(value);
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

    const itemContent = (
      <>
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

        {children}
      </>
    );

    const itemClassName = cn(
      dropdownItemVariants({
        variant: context?.variant || "default",
        size: context?.size || "md",
      }),
      className
    );

    if (href) {
      return (
        <a
          ref={ref as any}
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          onClick={handleClick}
          data-disabled={disabled ? "true" : undefined}
          className={itemClassName}
          {...props}
        >
          {itemContent}
        </a>
      );
    }

    return (
      <div
        ref={ref}
        onClick={handleClick}
        data-disabled={disabled ? "true" : undefined}
        className={itemClassName}
        {...props}
      >
        {itemContent}
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
    triggerRef,
  } = context;

  const isDisabled = disabled || contextDisabled;

  const handleRef = (node: HTMLButtonElement) => {
    if (triggerRef) {
      (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current =
        node;
    }
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    }
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<any>, {
      ref: handleRef,
      onClick: () => !isDisabled && setIsOpen?.(!isOpen),
      "aria-haspopup": "listbox",
      "aria-expanded": isOpen,
      disabled: isDisabled,
    });
  }

  return (
    <button
      ref={handleRef}
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
      align: propAlign,
      side: propSide,
      sideOffset: _sideOffset = 4,
      width,
      maxHeight = "320px",
      ...props
    },
    ref
  ) => {
    const context = useDropdownContext();
    const {
      isOpen,
      variant,
      size,
      triggerRef,
      disablePortal,
      align: contextAlign = "start",
      side: contextSide = "bottom",
      onClose,
    } = context;

    const align = propAlign || contextAlign;
    const side = propSide || contextSide;

    const contentRef = useRef<HTMLDivElement>(null);
    const position = `${side}${align ? `-${align}` : ""}`;
    const fallbackRef = useRef<HTMLElement>(null);

    const { portalContainer, portalRef, portalPos } = usePortalPosition(
      (triggerRef || fallbackRef) as React.RefObject<HTMLElement>,
      isOpen || false,
      { position }
    );

    const [positionReady, setPositionReady] = useState(false);
    useEffect(() => {
      if (!isOpen) {
        setPositionReady(false);
        return;
      }
      const t = setTimeout(() => setPositionReady(true), 20);
      return () => clearTimeout(t);
    }, [isOpen, portalPos.left, portalPos.top]);

    // Click outside to close for component-based mode
    useClickOutside(contentRef, () => {
      if (isOpen) {
        onClose?.();
      }
    });

    if (!isOpen) return null;

    // Calculate proper width independent of trigger
    const sizeMin = size === "sm" ? 180 : size === "lg" ? 320 : 240;
    const computedWidth = width
      ? typeof width === "number"
        ? `${width}px`
        : String(width)
      : `${sizeMin}px`; // Default to minimum size, not trigger width
    const computedMinWidth = `${sizeMin}px`;

    const contentNode = (
      <div
        ref={(node) => {
          contentRef.current = node as HTMLDivElement | null;
          portalRef.current = node as HTMLDivElement | null;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
          }
        }}
        className={cn(
          dropdownContentVariants({ variant }),
          "absolute mt-2",
          side === "top" && "bottom-full mb-2 mt-0",
          side === "bottom" && "top-full",
          side === "left" && "right-full mr-2 mt-0",
          side === "right" && "left-full ml-2 mt-0",
          // Only apply alignment classes when not using portal
          !portalContainer && align === "start" && "left-0",
          !portalContainer && align === "center" && "left-1/2 -translate-x-1/2",
          !portalContainer && align === "end" && "right-0",
          className,
          positionReady ? undefined : "transition-none"
        )}
        style={{
          maxHeight,
          position: "absolute",
          top: portalPos.top,
          left: portalPos.left,
          width: computedWidth,
          minWidth: computedMinWidth,
        }}
        {...props}
      >
        <div className="max-h-[280px] overflow-y-auto p-1">{children}</div>
      </div>
    );

    if (!portalContainer || disablePortal) return contentNode;
    return createPortal(contentNode, portalContainer);
  }
);

DropdownContent.displayName = "DropdownContent";

export default Dropdown;
