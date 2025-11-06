"use client";

import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import ReactDOM from "react-dom";
import { cn } from "../../lib/utils";
import {
  ComponentValidator,
  isValidBoolean,
  isValidString,
  isValidNumber,
  isValidFunction,
} from "../../lib/validation";
import type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuCheckboxItemProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
  ContextMenuSeparatorProps,
  ContextMenuLabelProps,
  ContextMenuShortcutProps,
  ContextMenuGroupProps,
  ContextMenuVariant,
  ContextMenuSize,
} from "./ContextMenu.types";
import {
  contextMenuContentVariants,
  contextMenuLabelVariants,
  contextMenuSeparatorVariants,
  contextMenuShortcutVariants,
  contextMenuSubTriggerVariants,
  contextMenuIndicatorVariants,
} from "./ContextMenu.styles";
import { Check, Circle, ChevronRight } from "lucide-react";

/**
 * ContextMenu Component
 *
 * A beautiful, accessible context menu (right-click menu) with advanced features.
 * Supports nested submenus, checkboxes, radio groups, keyboard navigation, and more.
 *
 * Features:
 * - 13 color variants with gradient effects
 * - 3 size options
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Nested submenus with automatic positioning
 * - Checkbox and radio items
 * - Custom icons and keyboard shortcuts
 * - Compile-time and runtime validation
 * - Full TypeScript support
 *
 * @example
 * ```tsx
 * <ContextMenu variant="primary">
 *   <ContextMenuTrigger>
 *     Right click here
 *   </ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>Cut</ContextMenuItem>
 *     <ContextMenuItem>Copy</ContextMenuItem>
 *     <ContextMenuItem>Paste</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */

// ===========================
// Context
// ===========================

interface ContextMenuContextValue {
  variant: ContextMenuVariant;
  size: ContextMenuSize;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  position: { x: number; y: number };
  setPosition: (pos: { x: number; y: number }) => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue | undefined>(
  undefined,
);

const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error(
      "ContextMenu components must be used within ContextMenu provider",
    );
  }
  return context;
};

// ===========================
// Validation - Simplified to match theme
// ===========================

const VALID_VARIANTS: ContextMenuVariant[] = [
  "default",
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
  "info",
  "outline",
  "glass",
];

const VALID_SIZES: ContextMenuSize[] = ["sm", "md", "lg"];

// Runtime validation helper
const validateContextMenuProps = (props: Partial<ContextMenuProps>) => {
  if (process.env.NODE_ENV === "development") {
    const validator = new ComponentValidator("ContextMenu");

    // Validate variant
    if (props.variant !== undefined) {
      validator.validateEnum("variant", props.variant, VALID_VARIANTS);
    }

    // Validate size
    if (props.size !== undefined) {
      validator.validateEnum("size", props.size, VALID_SIZES);
    }

    // Validate boolean props
    if (props.open !== undefined) {
      validator.validateType("open", props.open, "boolean", isValidBoolean);
    }

    if (props.defaultOpen !== undefined) {
      validator.validateType(
        "defaultOpen",
        props.defaultOpen,
        "boolean",
        isValidBoolean,
      );
    }

    if (props.modal !== undefined) {
      validator.validateType("modal", props.modal, "boolean", isValidBoolean);
    }

    // Validate dir
    if (props.dir !== undefined && props.dir !== "ltr" && props.dir !== "rtl") {
      validator.warn(`Invalid dir: ${props.dir}. Expected 'ltr' or 'rtl'.`);
    }

    // Validate onOpenChange callback
    if (props.onOpenChange !== undefined) {
      validator.validateType(
        "onOpenChange",
        props.onOpenChange,
        "function",
        isValidFunction,
      );
    }

    // Validate children
    // Children are already required by TypeScript types, no need to validate
  }
};

// Validate ContextMenuTrigger props
const validateTriggerProps = (props: Partial<ContextMenuTriggerProps>) => {
  if (process.env.NODE_ENV === "development") {
    const validator = new ComponentValidator("ContextMenuTrigger");

    // Children are already required by TypeScript types, no need to validate

    if (props.disabled !== undefined) {
      validator.validateType(
        "disabled",
        props.disabled,
        "boolean",
        isValidBoolean,
      );
    }

    if (props.asChild !== undefined) {
      validator.validateType(
        "asChild",
        props.asChild,
        "boolean",
        isValidBoolean,
      );
    }

    if (props.className !== undefined) {
      validator.validateType(
        "className",
        props.className,
        "string",
        isValidString,
      );
    }
  }
};

// Validate ContextMenuContent props
const validateContentProps = (props: Partial<ContextMenuContentProps>) => {
  if (process.env.NODE_ENV === "development") {
    const validator = new ComponentValidator("ContextMenuContent");

    // Children are already required by TypeScript types, no need to validate

    if (props.sideOffset !== undefined) {
      validator.validateType(
        "sideOffset",
        props.sideOffset,
        "number",
        isValidNumber,
      );
    }

    if (props.alignOffset !== undefined) {
      validator.validateType(
        "alignOffset",
        props.alignOffset,
        "number",
        isValidNumber,
      );
    }

    if (props.collisionPadding !== undefined) {
      validator.validateType(
        "collisionPadding",
        props.collisionPadding,
        "number",
        isValidNumber,
      );
    }

    if (props.avoidCollisions !== undefined) {
      validator.validateType(
        "avoidCollisions",
        props.avoidCollisions,
        "boolean",
        isValidBoolean,
      );
    }

    if (props.loop !== undefined) {
      validator.validateType("loop", props.loop, "boolean", isValidBoolean);
    }

    if (props.align !== undefined) {
      const validAligns = ["start", "center", "end"] as const;
      validator.validateEnum("align", props.align, validAligns);
    }
  }
};

// Validate ContextMenuItem props
const validateItemProps = (props: Partial<ContextMenuItemProps>) => {
  if (process.env.NODE_ENV === "development") {
    const validator = new ComponentValidator("ContextMenuItem");

    // Children are already required by TypeScript types, no need to validate

    if (props.disabled !== undefined) {
      validator.validateType(
        "disabled",
        props.disabled,
        "boolean",
        isValidBoolean,
      );
    }

    if (props.inset !== undefined) {
      validator.validateType("inset", props.inset, "boolean", isValidBoolean);
    }

    if (props.variant !== undefined) {
      const validVariants = [
        "default",
        "destructive",
        "success",
        "warning",
      ] as const;
      validator.validateEnum("variant", props.variant, validVariants);
    }

    if (props.onSelect !== undefined) {
      validator.validateType(
        "onSelect",
        props.onSelect,
        "function",
        isValidFunction,
      );
    }
  }
};

// Validate ContextMenuCheckboxItem props
const validateCheckboxItemProps = (
  props: Partial<ContextMenuCheckboxItemProps>,
) => {
  if (process.env.NODE_ENV === "development") {
    const validator = new ComponentValidator("ContextMenuCheckboxItem");

    // Children are already required by TypeScript types, no need to validate

    if (props.checked !== undefined) {
      validator.validateType(
        "checked",
        props.checked,
        "boolean",
        isValidBoolean,
      );
    }

    if (props.defaultChecked !== undefined) {
      validator.validateType(
        "defaultChecked",
        props.defaultChecked,
        "boolean",
        isValidBoolean,
      );
    }

    if (props.disabled !== undefined) {
      validator.validateType(
        "disabled",
        props.disabled,
        "boolean",
        isValidBoolean,
      );
    }

    if (props.inset !== undefined) {
      validator.validateType("inset", props.inset, "boolean", isValidBoolean);
    }

    if (props.onCheckedChange !== undefined) {
      validator.validateType(
        "onCheckedChange",
        props.onCheckedChange,
        "function",
        isValidFunction,
      );
    }

    if (props.onSelect !== undefined) {
      validator.validateType(
        "onSelect",
        props.onSelect,
        "function",
        isValidFunction,
      );
    }
  }
};

// Validate ContextMenuRadioGroup props
const validateRadioGroupProps = (
  props: Partial<ContextMenuRadioGroupProps>,
) => {
  if (process.env.NODE_ENV === "development") {
    const validator = new ComponentValidator("ContextMenuRadioGroup");

    // Children are already required by TypeScript types, no need to validate

    if (props.value !== undefined) {
      validator.validateType("value", props.value, "string", isValidString);
    }

    if (props.defaultValue !== undefined) {
      validator.validateType(
        "defaultValue",
        props.defaultValue,
        "string",
        isValidString,
      );
    }

    if (props.onValueChange !== undefined) {
      validator.validateType(
        "onValueChange",
        props.onValueChange,
        "function",
        isValidFunction,
      );
    }
  }
};

// Validate ContextMenuRadioItem props
const validateRadioItemProps = (props: Partial<ContextMenuRadioItemProps>) => {
  if (process.env.NODE_ENV === "development") {
    const validator = new ComponentValidator("ContextMenuRadioItem");

    // Children are already required by TypeScript types, no need to validate
    validator.validateRequired("value", props.value);

    if (props.value !== undefined) {
      validator.validateType("value", props.value, "string", isValidString);
    }

    if (props.disabled !== undefined) {
      validator.validateType(
        "disabled",
        props.disabled,
        "boolean",
        isValidBoolean,
      );
    }

    if (props.inset !== undefined) {
      validator.validateType("inset", props.inset, "boolean", isValidBoolean);
    }

    if (props.onSelect !== undefined) {
      validator.validateType(
        "onSelect",
        props.onSelect,
        "function",
        isValidFunction,
      );
    }
  }
};

// ===========================
// Main ContextMenu Component
// ===========================

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  (
    {
      children,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      variant = "default",
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    // Validation
    validateContextMenuProps({
      variant,
      size,
      open: controlledOpen,
      defaultOpen,
      ...props,
    });

    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    const handleOpenChange = useCallback(
      (open: boolean) => {
        if (controlledOpen === undefined) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [controlledOpen, onOpenChange],
    );

    const contextValue: ContextMenuContextValue = {
      variant,
      size,
      isOpen,
      setIsOpen: handleOpenChange,
      triggerRef,
      contentRef,
      position,
      setPosition,
    };

    return (
      <ContextMenuContext.Provider value={contextValue}>
        <div ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </div>
      </ContextMenuContext.Provider>
    );
  },
);

ContextMenu.displayName = "ContextMenu";

// ===========================
// ContextMenuTrigger
// ===========================

export const ContextMenuTrigger = forwardRef<
  HTMLDivElement,
  ContextMenuTriggerProps
>(({ children, className, disabled = false, ...props }, ref) => {
  const { setIsOpen, setPosition, triggerRef } = useContextMenu();

  // Validation
  validateTriggerProps({ children, className, disabled, ...props });

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;

      e.preventDefault();
      e.stopPropagation();

      setPosition({ x: e.clientX, y: e.clientY });
      setIsOpen(true);
    },
    [disabled, setIsOpen, setPosition],
  );

  return (
    <div
      ref={(node) => {
        if (ref) {
          if (typeof ref === "function") ref(node);
          else ref.current = node;
        }
        if (triggerRef) {
          (
            triggerRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
        }
      }}
      onContextMenu={handleContextMenu}
      className={cn(
        "cursor-context-menu",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

ContextMenuTrigger.displayName = "ContextMenuTrigger";

// ===========================
// ContextMenuContent
// ===========================

export const ContextMenuContent = forwardRef<
  HTMLDivElement,
  ContextMenuContentProps
>(
  (
    {
      children,
      className,
      width,
      maxHeight = "384px",
      sideOffset = 4,
      collisionPadding = 8,
      avoidCollisions = true,
      loop = true,
      ...props
    },
    ref,
  ) => {
    const { variant, size, isOpen, setIsOpen, position, contentRef } =
      useContextMenu();
    const [adjustedPosition, setAdjustedPosition] = useState(position);

    // Validation
    validateContentProps({
      children,
      className,
      width,
      maxHeight,
      sideOffset,
      collisionPadding,
      avoidCollisions,
      loop,
      ...props,
    });

    // Adjust position to avoid viewport overflow
    useEffect(() => {
      if (!isOpen || !contentRef.current) return;

      const content = contentRef.current;
      const rect = content.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x = position.x + sideOffset;
      let y = position.y + sideOffset;

      // Adjust horizontal position
      if (x + rect.width + collisionPadding > viewportWidth) {
        x = position.x - rect.width - sideOffset;
      }

      // Adjust vertical position
      if (y + rect.height + collisionPadding > viewportHeight) {
        y = viewportHeight - rect.height - collisionPadding;
      }

      // Ensure minimum padding
      x = Math.max(collisionPadding, x);
      y = Math.max(collisionPadding, y);

      setAdjustedPosition({ x, y });
    }, [isOpen, position, sideOffset, collisionPadding]);

    // Close on click outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("contextmenu", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("contextmenu", handleClickOutside);
      };
    }, [isOpen, setIsOpen]);

    // Keyboard navigation
    useEffect(() => {
      if (!isOpen || !contentRef.current) return;

      const items = contentRef.current.querySelectorAll(
        '[role="menuitem"]:not([data-disabled])',
      );
      let currentIndex = -1;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          !loop &&
          (currentIndex === 0 || currentIndex === items.length - 1)
        ) {
          // Boundary reached
        }

        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            currentIndex = (currentIndex + 1) % items.length;
            (items[currentIndex] as HTMLElement).focus();
            break;
          case "ArrowUp":
            e.preventDefault();
            currentIndex =
              currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
            (items[currentIndex] as HTMLElement).focus();
            break;
          case "Home":
            e.preventDefault();
            currentIndex = 0;
            (items[currentIndex] as HTMLElement).focus();
            break;
          case "End":
            e.preventDefault();
            currentIndex = items.length - 1;
            (items[currentIndex] as HTMLElement).focus();
            break;
        }
      };

      contentRef.current.addEventListener("keydown", handleKeyDown);

      return () => {
        contentRef.current?.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, loop]);

    if (!isOpen) return null;

    return (
      <>
        {/* Portal to body */}
        {typeof document !== "undefined" &&
          ReactDOM.createPortal(
            <div
              ref={(node) => {
                if (ref) {
                  if (typeof ref === "function") ref(node);
                  else ref.current = node;
                }
                if (contentRef) {
                  (
                    contentRef as React.MutableRefObject<HTMLDivElement | null>
                  ).current = node;
                }
              }}
              role="menu"
              data-state={isOpen ? "open" : "closed"}
              className={cn(
                contextMenuContentVariants({ variant, size }),
                className,
              )}
              style={{
                position: "fixed",
                left: `${adjustedPosition.x}px`,
                top: `${adjustedPosition.y}px`,
                width: width || "auto",
                maxHeight,
                overflowY: "auto",
                zIndex: 9999,
              }}
              {...props}
            >
              {children}
            </div>,
            document.body,
          )}
      </>
    );
  },
);

ContextMenuContent.displayName = "ContextMenuContent";

// ===========================
// ContextMenuItem
// ===========================

export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  (
    {
      children,
      disabled = false,
      inset = false,
      variant = "default",
      onSelect,
      icon,
      shortcut,
      className,
      ...props
    },
    ref,
  ) => {
    const { size, setIsOpen, variant: menuVariant } = useContextMenu();

    // Validation
    validateItemProps({
      children,
      disabled,
      inset,
      variant,
      onSelect,
      icon,
      shortcut,
      className,
      ...props,
    });

    const handleSelect = useCallback(
      (_e: React.MouseEvent) => {
        if (disabled) return;

        const event = new Event("select", { bubbles: true, cancelable: true });
        onSelect?.(event);

        if (!event.defaultPrevented) {
          setIsOpen(false);
        }
      },
      [disabled, onSelect, setIsOpen],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const event = new Event("select", {
            bubbles: true,
            cancelable: true,
          });
          onSelect?.(event);

          if (!event.defaultPrevented) {
            setIsOpen(false);
          }
        }
      },
      [disabled, onSelect, setIsOpen],
    );

    // Variant-specific hover styles based on menu variant
    const getVariantHoverStyles = () => {
      const activeVariant = menuVariant || variant;
      switch (activeVariant) {
        case "primary":
          return "hover:bg-primary/30 hover:shadow-lg hover:shadow-primary/20 focus:bg-primary/30";
        case "secondary":
          return "hover:bg-secondary/30 hover:shadow-lg hover:shadow-secondary/20 focus:bg-secondary/30";
        case "accent":
          return "hover:bg-accent/30 hover:shadow-lg hover:shadow-accent/20 focus:bg-accent/30";
        case "success":
          return "hover:bg-success/30 hover:shadow-lg hover:shadow-success/20 focus:bg-success/30";
        case "warning":
          return "hover:bg-warning/30 hover:shadow-lg hover:shadow-warning/20 focus:bg-warning/30";
        case "error":
          return "hover:bg-error/30 hover:shadow-lg hover:shadow-error/20 focus:bg-error/30";
        case "info":
          return "hover:bg-info/30 hover:shadow-lg hover:shadow-info/20 focus:bg-info/30";
        case "outline":
          return "hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/20 focus:bg-accent/90";
        case "glass":
          return "hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/10 focus:bg-white/35 dark:hover:bg-white/20 dark:focus:bg-white/25";
        default:
          return "hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/20 focus:bg-accent/90";
      }
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        data-disabled={disabled || undefined}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        className={cn(
          // Base styles from variant system (without hover - we override below)
          "relative flex cursor-pointer select-none items-center rounded-xl",
          "outline-none transition-all duration-200 ease-out",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
          "hover:scale-[1.01] active:scale-[0.99] group",
          // Size variants
          size === "sm" && "px-3 py-2 text-xs gap-2.5",
          size === "md" && "px-3.5 py-2.5 text-sm gap-3",
          size === "lg" && "px-4 py-3 text-base gap-3.5",
          // Inset variants
          inset && size === "sm" && "pl-9",
          inset && size === "md" && "pl-10",
          inset && size === "lg" && "pl-12",
          // Variant-specific hover colors
          getVariantHoverStyles(),
          className,
        )}
        {...props}
      >
        {icon && (
          <span className="inline-flex items-center justify-center shrink-0 w-4 h-4">
            {icon}
          </span>
        )}
        <span className={cn("flex-1 leading-none", shortcut && "pr-12")}>
          {children}
        </span>
        {shortcut && <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>}
      </div>
    );
  },
);

ContextMenuItem.displayName = "ContextMenuItem";

// ===========================
// ContextMenuCheckboxItem
// ===========================

export const ContextMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  ContextMenuCheckboxItemProps
>(
  (
    {
      children,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      inset = false,
      onSelect,
      icon,
      className,
      ...props
    },
    ref,
  ) => {
    const { size, variant } = useContextMenu();
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    // Check if children contains ContextMenuShortcut
    const hasShortcut = React.Children.toArray(children).some((child) => {
      if (React.isValidElement(child)) {
        const childType = child.type as any;
        return (
          childType?.displayName === "ContextMenuShortcut" ||
          childType?.name === "ContextMenuShortcut"
        );
      }
      return false;
    });

    // Validation
    validateCheckboxItemProps({
      children,
      checked: controlledChecked,
      defaultChecked,
      onCheckedChange,
      disabled,
      inset,
      onSelect,
      icon,
      className,
      ...props,
    });

    const isChecked =
      controlledChecked !== undefined ? controlledChecked : internalChecked;

    const handleSelect = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;

        e.preventDefault();
        const newChecked = !isChecked;

        if (controlledChecked === undefined) {
          setInternalChecked(newChecked);
        }

        onCheckedChange?.(newChecked);

        const event = new Event("select", { bubbles: true, cancelable: true });
        onSelect?.(event);
      },
      [disabled, isChecked, controlledChecked, onCheckedChange, onSelect],
    );

    // Variant-specific hover styles
    const getVariantHoverStyles = () => {
      switch (variant) {
        case "primary":
          return "hover:bg-primary/30 hover:shadow-lg hover:shadow-primary/20 focus:bg-primary/30";
        case "secondary":
          return "hover:bg-secondary/30 hover:shadow-lg hover:shadow-secondary/20 focus:bg-secondary/30";
        case "accent":
          return "hover:bg-accent/30 hover:shadow-lg hover:shadow-accent/20 focus:bg-accent/30";
        case "success":
          return "hover:bg-success/30 hover:shadow-lg hover:shadow-success/20 focus:bg-success/30";
        case "warning":
          return "hover:bg-warning/30 hover:shadow-lg hover:shadow-warning/20 focus:bg-warning/30";
        case "error":
          return "hover:bg-error/30 hover:shadow-lg hover:shadow-error/20 focus:bg-error/30";
        case "info":
          return "hover:bg-info/30 hover:shadow-lg hover:shadow-info/20 focus:bg-info/30";
        case "outline":
          return "hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/20 focus:bg-accent/90";
        case "glass":
          return "hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/10 focus:bg-white/35 dark:hover:bg-white/20 dark:focus:bg-white/25";
        default:
          return "hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/20 focus:bg-accent/90";
      }
    };

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={isChecked}
        tabIndex={disabled ? -1 : 0}
        data-disabled={disabled || undefined}
        onClick={handleSelect}
        className={cn(
          // Base styles
          "relative flex cursor-pointer select-none items-center rounded-xl",
          "outline-none transition-all duration-200 ease-out",
          "focus:text-accent-foreground focus:scale-[1.02]",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          "hover:scale-[1.02] group",
          // Size variants
          size === "sm" && "pl-8 pr-3 py-2 text-xs gap-2",
          size === "md" && "pl-9 pr-4 py-2.5 text-sm gap-2.5",
          size === "lg" && "pl-11 pr-5 py-3 text-base gap-3",
          // Inset variants
          inset && size === "sm" && "pl-13",
          inset && size === "md" && "pl-15",
          inset && size === "lg" && "pl-17",
          // Variant-specific hover colors
          getVariantHoverStyles(),
          className,
        )}
        {...props}
      >
        <span className={cn(contextMenuIndicatorVariants({ size }))}>
          {isChecked && <Check className="h-4 w-4" />}
        </span>
        {icon && (
          <span className="inline-flex items-center justify-center shrink-0 w-4 h-4">
            {icon}
          </span>
        )}
        <span className={cn("flex-1 leading-none", hasShortcut && "pr-12")}>
          {children}
        </span>
      </div>
    );
  },
);

ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

// ===========================
// ContextMenuRadioGroup
// ===========================

interface RadioContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioContext = createContext<RadioContextValue | undefined>(undefined);

export const ContextMenuRadioGroup = forwardRef<
  HTMLDivElement,
  ContextMenuRadioGroupProps
>(
  (
    {
      children,
      value: controlledValue,
      defaultValue,
      onValueChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);

    // Validation
    validateRadioGroupProps({
      children,
      value: controlledValue,
      defaultValue,
      onValueChange,
      className,
      ...props,
    });

    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = useCallback(
      (newValue: string) => {
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [controlledValue, onValueChange],
    );

    return (
      <RadioContext.Provider
        value={{ value, onValueChange: handleValueChange }}
      >
        <div ref={ref} role="group" className={className} {...props}>
          {children}
        </div>
      </RadioContext.Provider>
    );
  },
);

ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

// ===========================
// ContextMenuRadioItem
// ===========================

export const ContextMenuRadioItem = forwardRef<
  HTMLDivElement,
  ContextMenuRadioItemProps
>(
  (
    {
      children,
      value: itemValue,
      disabled = false,
      inset = false,
      onSelect,
      icon,
      className,
      ...props
    },
    ref,
  ) => {
    const { size, variant } = useContextMenu();
    const radioContext = useContext(RadioContext);

    // Validation
    validateRadioItemProps({
      children,
      value: itemValue,
      disabled,
      inset,
      onSelect,
      icon,
      className,
      ...props,
    });

    if (!radioContext) {
      throw new Error(
        "ContextMenuRadioItem must be used within ContextMenuRadioGroup",
      );
    }

    const { value, onValueChange } = radioContext;
    const isChecked = value === itemValue;

    const handleSelect = useCallback(
      (_e: React.MouseEvent) => {
        if (disabled) return;

        _e.preventDefault();
        onValueChange?.(itemValue);

        const event = new Event("select", { bubbles: true, cancelable: true });
        onSelect?.(event);
      },
      [disabled, itemValue, onValueChange, onSelect],
    );

    // Variant-specific hover styles
    const getVariantHoverStyles = () => {
      switch (variant) {
        case "primary":
          return "hover:bg-primary/30 hover:shadow-lg hover:shadow-primary/20 focus:bg-primary/30";
        case "secondary":
          return "hover:bg-secondary/30 hover:shadow-lg hover:shadow-secondary/20 focus:bg-secondary/30";
        case "accent":
          return "hover:bg-accent/30 hover:shadow-lg hover:shadow-accent/20 focus:bg-accent/30";
        case "success":
          return "hover:bg-success/30 hover:shadow-lg hover:shadow-success/20 focus:bg-success/30";
        case "warning":
          return "hover:bg-warning/30 hover:shadow-lg hover:shadow-warning/20 focus:bg-warning/30";
        case "error":
          return "hover:bg-error/30 hover:shadow-lg hover:shadow-error/20 focus:bg-error/30";
        case "info":
          return "hover:bg-info/30 hover:shadow-lg hover:shadow-info/20 focus:bg-info/30";
        case "outline":
          return "hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/20 focus:bg-accent/90";
        case "glass":
          return "hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/10 focus:bg-white/35 dark:hover:bg-white/20 dark:focus:bg-white/25";
        default:
          return "hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/20 focus:bg-accent/90";
      }
    };

    return (
      <div
        ref={ref}
        role="menuitemradio"
        aria-checked={isChecked}
        tabIndex={disabled ? -1 : 0}
        data-disabled={disabled || undefined}
        onClick={handleSelect}
        className={cn(
          // Base styles
          "relative flex cursor-pointer select-none items-center rounded-xl",
          "outline-none transition-all duration-200 ease-out",
          "focus:text-accent-foreground focus:scale-[1.02]",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          "hover:scale-[1.02] group",
          // Size variants
          size === "sm" && "pl-8 pr-3 py-2 text-xs gap-2",
          size === "md" && "pl-9 pr-4 py-2.5 text-sm gap-2.5",
          size === "lg" && "pl-11 pr-5 py-3 text-base gap-3",
          // Inset variants
          inset && size === "sm" && "pl-13",
          inset && size === "md" && "pl-15",
          inset && size === "lg" && "pl-17",
          // Variant-specific hover colors
          getVariantHoverStyles(),
          className,
        )}
        {...props}
      >
        <span className={cn(contextMenuIndicatorVariants({ size }))}>
          {isChecked && <Circle className="h-2 w-2 fill-current" />}
        </span>
        {icon && (
          <span className="inline-flex items-center justify-center shrink-0 w-4 h-4">
            {icon}
          </span>
        )}
        <span className="flex-1 leading-none">{children}</span>
      </div>
    );
  },
);

ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

// ===========================
// ContextMenuSub
// ===========================

interface SubContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const SubContext = createContext<SubContextValue | undefined>(undefined);

export const ContextMenuSub = forwardRef<HTMLDivElement, ContextMenuSubProps>(
  (
    {
      children,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const triggerRef = useRef<HTMLDivElement>(null);

    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    const handleOpenChange = useCallback(
      (open: boolean) => {
        if (controlledOpen === undefined) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [controlledOpen, onOpenChange],
    );

    return (
      <SubContext.Provider
        value={{ isOpen, setIsOpen: handleOpenChange, triggerRef }}
      >
        <div ref={ref} className="relative" {...props}>
          {children}
        </div>
      </SubContext.Provider>
    );
  },
);

ContextMenuSub.displayName = "ContextMenuSub";

// ===========================
// ContextMenuSubTrigger
// ===========================

export const ContextMenuSubTrigger = forwardRef<
  HTMLDivElement,
  ContextMenuSubTriggerProps
>(
  (
    { children, disabled = false, inset = false, icon, className, ...props },
    ref,
  ) => {
    const { size, variant } = useContextMenu();
    const subContext = useContext(SubContext);

    if (!subContext) {
      throw new Error(
        "ContextMenuSubTrigger must be used within ContextMenuSub",
      );
    }

    const { isOpen, setIsOpen, triggerRef } = subContext;

    const handleMouseEnter = () => {
      if (!disabled) {
        setIsOpen(true);
      }
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
      if (!disabled) {
        // Check if we're moving to the submenu content
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (relatedTarget && relatedTarget.closest('[role="menu"]')) {
          return; // Don't close if moving to submenu
        }
        setIsOpen(false);
      }
    };

    // Variant-specific hover styles
    const getVariantHoverStyles = () => {
      switch (variant) {
        case "primary":
          return "hover:bg-primary/30 hover:shadow-lg hover:shadow-primary/20";
        case "secondary":
          return "hover:bg-secondary/30 hover:shadow-lg hover:shadow-secondary/20";
        case "accent":
          return "hover:bg-accent/30 hover:shadow-lg hover:shadow-accent/20";
        case "success":
          return "hover:bg-success/30 hover:shadow-lg hover:shadow-success/20";
        case "warning":
          return "hover:bg-warning/30 hover:shadow-lg hover:shadow-warning/20";
        case "error":
          return "hover:bg-error/30 hover:shadow-lg hover:shadow-error/20";
        case "info":
          return "hover:bg-info/30 hover:shadow-lg hover:shadow-info/20";
        case "outline":
          return "hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/20";
        case "glass":
          return "hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-white/10";
        default:
          return "hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/20";
      }
    };

    return (
      <div
        ref={(node) => {
          // Attach to both refs
          if (triggerRef) {
            (
              triggerRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = node;
          }
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
          }
        }}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
        data-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          if (!disabled) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={cn(
          contextMenuSubTriggerVariants({ size, inset }),
          getVariantHoverStyles(),
          "relative transition-all duration-200 ease-in-out",
          className,
        )}
        {...props}
      >
        {icon && (
          <span className="inline-flex items-center justify-center shrink-0 w-4 h-4">
            {icon}
          </span>
        )}
        <span className="flex-1 leading-none pr-8">{children}</span>
        <ChevronRight className="absolute right-3 h-4 w-4 pointer-events-none" />
      </div>
    );
  },
);

ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

// ===========================
// ContextMenuSubContent
// ===========================

export const ContextMenuSubContent = forwardRef<
  HTMLDivElement,
  ContextMenuSubContentProps
>(
  (
    {
      children,
      className,
      width,
      maxHeight = "384px",
      sideOffset = 8,
      ...props
    },
    _ref,
  ) => {
    const { variant, size } = useContextMenu();
    const subContext = useContext(SubContext);
    const contentRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    if (!subContext) {
      throw new Error(
        "ContextMenuSubContent must be used within ContextMenuSub",
      );
    }

    const { isOpen, setIsOpen, triggerRef } = subContext;

    // Calculate position relative to viewport when submenu opens
    useEffect(() => {
      if (isOpen && triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        // Position at left-full (right edge of trigger)
        setPosition({
          top: triggerRect.top,
          left: triggerRect.right,
        });
      }
    }, [isOpen, sideOffset]);

    if (!isOpen) return null;

    const handleMouseEnter = () => {
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      setIsOpen(false);
    };

    // Use portal to render outside parent's overflow constraints
    return ReactDOM.createPortal(
      <div
        ref={contentRef}
        role="menu"
        data-state={isOpen ? "open" : "closed"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          // Base styles without animations
          "z-50 min-w-[16rem] max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-visible",
          "rounded-2xl border-2 p-2.5",
          "bg-popover/98 backdrop-blur-2xl",
          "text-popover-foreground shadow-2xl",
          "scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          // Submenu specific positioning and animation
          "fixed",
          "animate-in fade-in-0 slide-in-from-left-1 duration-300 ease-in-out",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-left-1 data-[state=closed]:duration-200 data-[state=closed]:ease-in-out",
          // Variant-specific styles
          variant === "primary" && [
            "border-primary/50",
            "shadow-2xl shadow-primary/25",
          ],
          variant === "secondary" && [
            "border-secondary/50",
            "shadow-2xl shadow-secondary/25",
          ],
          variant === "accent" && [
            "border-accent/50",
            "shadow-2xl shadow-accent/25",
          ],
          variant === "success" && [
            "border-success/50",
            "shadow-2xl shadow-success/25",
          ],
          variant === "warning" && [
            "border-warning/50",
            "shadow-2xl shadow-warning/25",
          ],
          variant === "error" && [
            "border-error/50",
            "shadow-2xl shadow-error/25",
          ],
          variant === "info" && ["border-info/50", "shadow-2xl shadow-info/25"],
          variant === "outline" && [
            "border-2 border-border",
            "bg-transparent",
            "shadow-lg",
          ],
          variant === "glass" && [
            "border-white/20",
            "bg-white/10 backdrop-blur-xl",
            "shadow-2xl shadow-black/10",
            "dark:bg-black/10",
          ],
          variant === "default" && [
            "border-border/60",
            "shadow-xl shadow-foreground/10",
          ],
          // Size specific
          size === "sm" && "text-xs min-w-[14rem]",
          size === "md" && "text-sm min-w-[16rem]",
          size === "lg" && "text-base min-w-[18rem]",
          className,
        )}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: width || "auto",
          maxHeight,
        }}
        {...props}
      >
        {children}
      </div>,
      document.body,
    );
  },
);

ContextMenuSubContent.displayName = "ContextMenuSubContent";

// ===========================
// ContextMenuSeparator
// ===========================

export const ContextMenuSeparator = forwardRef<
  HTMLDivElement,
  ContextMenuSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn(contextMenuSeparatorVariants(), className)}
      {...props}
    />
  );
});

ContextMenuSeparator.displayName = "ContextMenuSeparator";

// ===========================
// ContextMenuLabel
// ===========================

export const ContextMenuLabel = forwardRef<
  HTMLDivElement,
  ContextMenuLabelProps
>(({ children, className, inset = false, ...props }, ref) => {
  const { size } = useContextMenu();

  return (
    <div
      ref={ref}
      className={cn(contextMenuLabelVariants({ size, inset }), className)}
      {...props}
    >
      {children}
    </div>
  );
});

ContextMenuLabel.displayName = "ContextMenuLabel";

// ===========================
// ContextMenuShortcut
// ===========================

export const ContextMenuShortcut = forwardRef<
  HTMLSpanElement,
  ContextMenuShortcutProps
>(({ children, className, ...props }, ref) => {
  const { size } = useContextMenu();

  return (
    <span
      ref={ref}
      className={cn(contextMenuShortcutVariants({ size }), className)}
      {...props}
    >
      {children}
    </span>
  );
});

ContextMenuShortcut.displayName = "ContextMenuShortcut";

// ===========================
// ContextMenuGroup
// ===========================

export const ContextMenuGroup = forwardRef<
  HTMLDivElement,
  ContextMenuGroupProps
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} role="group" className={className} {...props}>
      {children}
    </div>
  );
});

ContextMenuGroup.displayName = "ContextMenuGroup";

// ===========================
// Exports
// ===========================

export * from "./ContextMenu.types";
export * from "./ContextMenu.styles";
