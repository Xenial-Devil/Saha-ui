import React from "react";
import { cn } from "../../lib/utils";
import { ComponentValidator, isValidBoolean } from "../../lib/validation";
import type {
  MenubarProps,
  MenubarMenuProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarCheckboxItemProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
  MenubarSubProps,
  MenubarSubTriggerProps,
  MenubarSubContentProps,
  MenubarSeparatorProps,
  MenubarShortcutProps,
  MenubarLabelProps,
  MenubarVariant,
  MenubarSize,
} from "./Menubar.types";
import {
  menubarVariants,
  menubarMenuVariants,
  menubarTriggerVariants,
  menubarContentVariants,
  menubarItemVariants,
  menubarSeparatorVariants,
  menubarShortcutVariants,
  menubarLabelVariants,
  menubarCheckboxIndicatorVariants,
  menubarRadioIndicatorVariants,
  menubarSubTriggerIconVariants,
} from "./Menubar.styles";

// ===========================
// Validation Constants
// ===========================

const VALID_VARIANTS: MenubarVariant[] = [
  "default",
  "bordered",
  "filled",
  "ghost",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "info",
  "purple",
  "pink",
  "indigo",
  "cyan",
  "teal",
  "orange",
  "glass",
];
const VALID_SIZES: MenubarSize[] = ["sm", "md", "lg"];
const VALID_ALIGNS = ["start", "center", "end"];
const VALID_SIDES = ["top", "bottom", "left", "right"];

// ===========================
// Context for Menubar State
// ===========================

interface MenubarContextValue {
  variant?: MenubarVariant;
  size?: MenubarSize;
  openMenu: string | null;
  setOpenMenu: (id: string | null) => void;
}

const MenubarContext = React.createContext<MenubarContextValue | undefined>(
  undefined
);

const useMenubarContext = () => {
  const context = React.useContext(MenubarContext);
  if (!context) {
    throw new Error("Menubar components must be used within a Menubar");
  }
  return context;
};

// ===========================
// Menubar Component (Root)
// ===========================

/**
 * Menubar - Root menubar container
 *
 * A visually persistent menu common in desktop applications that provides consistent,
 * organized access to a group of commands.
 *
 * @example
 * ```tsx
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>File</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarItem>New</MenubarItem>
 *       <MenubarItem>Open</MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 * ```
 */
export const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  (
    { children, variant = "default", size = "md", className, ...props },
    ref
  ) => {
    const [openMenu, setOpenMenu] = React.useState<string | null>(null);

    // Runtime validation
    const validator = new ComponentValidator("Menubar");

    React.useEffect(() => {
      validator.validateEnum("variant", variant, VALID_VARIANTS);
      validator.validateEnum("size", size, VALID_SIZES);

      if (!children) {
        validator.warn(
          "Menubar has no children. Consider providing MenubarMenu components."
        );
      }
    }, [variant, size, children]);

    return (
      <MenubarContext.Provider value={{ variant, size, openMenu, setOpenMenu }}>
        <div
          ref={ref}
          className={cn(menubarVariants({ variant, size }), className)}
          role="menubar"
          {...props}
        >
          {children}
        </div>
      </MenubarContext.Provider>
    );
  }
);

Menubar.displayName = "Menubar";

// ===========================
// MenubarMenu Component
// ===========================

/**
 * MenubarMenu - Individual menu in the menubar
 */
export const MenubarMenu = React.forwardRef<HTMLDivElement, MenubarMenuProps>(
  (
    {
      children,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      className,
      ...props
    },
    ref
  ) => {
    const menuId = React.useId();
    const { openMenu, setOpenMenu } = useMenubarContext();

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : openMenu === menuId;

    const handleOpenChange = (open: boolean) => {
      if (!isControlled) {
        setOpenMenu(open ? menuId : null);
      }
      onOpenChange?.(open);
    };

    // Runtime validation
    const validator = new ComponentValidator("MenubarMenu");

    React.useEffect(() => {
      validator.validateType(
        "defaultOpen",
        defaultOpen,
        "boolean",
        isValidBoolean
      );

      if (controlledOpen !== undefined) {
        validator.validateType(
          "open",
          controlledOpen,
          "boolean",
          isValidBoolean
        );
      }

      if (!children) {
        validator.warn(
          "MenubarMenu has no children. Provide MenubarTrigger and MenubarContent."
        );
      }
    }, [defaultOpen, controlledOpen, children]);

    return (
      <div
        ref={ref}
        className={cn(menubarMenuVariants(), className)}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              menuId,
              isOpen,
              onOpenChange: handleOpenChange,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

MenubarMenu.displayName = "MenubarMenu";

// ===========================
// MenubarTrigger Component
// ===========================

/**
 * MenubarTrigger - Button that toggles the menu
 */
export const MenubarTrigger = React.forwardRef<
  HTMLButtonElement,
  MenubarTriggerProps & {
    menuId?: string;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      children,
      disabled = false,
      className,
      menuId,
      isOpen,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    const context = useMenubarContext();
    const handleClick = () => {
      if (!disabled && onOpenChange) {
        onOpenChange(!isOpen);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          menubarTriggerVariants({ disabled, variant: context.variant }),
          className
        )}
        data-state={isOpen ? "open" : "closed"}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MenubarTrigger.displayName = "MenubarTrigger";

// ===========================
// MenubarContent Component
// ===========================

/**
 * MenubarContent - Container for menu items
 */
export const MenubarContent = React.forwardRef<
  HTMLDivElement,
  MenubarContentProps & {
    menuId?: string;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      children,
      align = "start",
      side = "bottom",
      className,
      menuId,
      isOpen,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Handle click outside to close
    React.useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          onOpenChange?.(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onOpenChange]);

    // Runtime validation
    const validator = new ComponentValidator("MenubarContent");

    React.useEffect(() => {
      if (align && !VALID_ALIGNS.includes(align)) {
        validator.error(
          `Invalid prop 'align': must be one of [${VALID_ALIGNS.join(
            ", "
          )}], got '${align}'.`
        );
      }

      if (side && !VALID_SIDES.includes(side)) {
        validator.error(
          `Invalid prop 'side': must be one of [${VALID_SIDES.join(
            ", "
          )}], got '${side}'.`
        );
      }
    }, [align, side]);

    if (!isOpen) return null;

    const context = useMenubarContext();

    return (
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          menubarContentVariants({ align, side, variant: context.variant }),
          className
        )}
        role="menu"
        data-state={isOpen ? "open" : "closed"}
        data-side={side}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MenubarContent.displayName = "MenubarContent";

// ===========================
// MenubarItem Component
// ===========================

/**
 * MenubarItem - Individual menu item
 */
export const MenubarItem = React.forwardRef<
  HTMLButtonElement,
  MenubarItemProps
>(
  (
    {
      children,
      disabled = false,
      inset = false,
      onSelect,
      className,
      ...props
    },
    ref
  ) => {
    const context = useMenubarContext();
    const handleClick = () => {
      if (!disabled && onSelect) {
        onSelect();
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          menubarItemVariants({ disabled, inset, variant: context.variant }),
          className
        )}
        role="menuitem"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MenubarItem.displayName = "MenubarItem";

// ===========================
// MenubarCheckboxItem Component
// ===========================

/**
 * MenubarCheckboxItem - Checkbox menu item
 */
export const MenubarCheckboxItem = React.forwardRef<
  HTMLButtonElement,
  MenubarCheckboxItemProps
>(
  (
    {
      children,
      checked = false,
      onCheckedChange,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const context = useMenubarContext();
    const handleClick = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          menubarItemVariants({
            disabled,
            inset: true,
            variant: context.variant,
          }),
          className
        )}
        role="menuitemcheckbox"
        aria-checked={checked}
        onClick={handleClick}
        {...props}
      >
        <span className={menubarCheckboxIndicatorVariants()}>
          {checked && (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </span>
        {children}
      </button>
    );
  }
);

MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

// ===========================
// MenubarRadioGroup Component
// ===========================

interface MenubarRadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const MenubarRadioGroupContext = React.createContext<
  MenubarRadioGroupContextValue | undefined
>(undefined);

/**
 * MenubarRadioGroup - Radio group container
 */
export const MenubarRadioGroup = React.forwardRef<
  HTMLDivElement,
  MenubarRadioGroupProps
>(({ children, value, onValueChange, className, ...props }, ref) => {
  return (
    <MenubarRadioGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} className={className} role="group" {...props}>
        {children}
      </div>
    </MenubarRadioGroupContext.Provider>
  );
});

MenubarRadioGroup.displayName = "MenubarRadioGroup";

// ===========================
// MenubarRadioItem Component
// ===========================

/**
 * MenubarRadioItem - Radio menu item
 */
export const MenubarRadioItem = React.forwardRef<
  HTMLButtonElement,
  MenubarRadioItemProps
>(({ children, value, disabled = false, className, ...props }, ref) => {
  const menubarContext = useMenubarContext();
  const context = React.useContext(MenubarRadioGroupContext);
  const isSelected = context?.value === value;

  const handleClick = () => {
    if (!disabled && context?.onValueChange) {
      context.onValueChange(value);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={cn(
        menubarItemVariants({
          disabled,
          inset: true,
          variant: menubarContext.variant,
        }),
        className
      )}
      role="menuitemradio"
      aria-checked={isSelected}
      onClick={handleClick}
      {...props}
    >
      <span className={menubarRadioIndicatorVariants()}>
        {isSelected && (
          <svg className="w-2 h-2 fill-current" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="4" />
          </svg>
        )}
      </span>
      {children}
    </button>
  );
});

MenubarRadioItem.displayName = "MenubarRadioItem";

// ===========================
// MenubarSub Component
// ===========================

/**
 * MenubarSub - Submenu container
 */
export const MenubarSub = React.forwardRef<HTMLDivElement, MenubarSubProps>(
  (
    {
      children,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    const open = controlledOpen !== undefined ? controlledOpen : isOpen;

    const handleOpenChange = (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setIsOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              isOpen: open,
              onOpenChange: handleOpenChange,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

MenubarSub.displayName = "MenubarSub";

// ===========================
// MenubarSubTrigger Component
// ===========================

/**
 * MenubarSubTrigger - Trigger for submenu
 */
export const MenubarSubTrigger = React.forwardRef<
  HTMLButtonElement,
  MenubarSubTriggerProps & {
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    { children, disabled = false, className, isOpen, onOpenChange, ...props },
    ref
  ) => {
    const context = useMenubarContext();
    const handleClick = () => {
      if (!disabled && onOpenChange) {
        onOpenChange(!isOpen);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          menubarItemVariants({ disabled, variant: context.variant }),
          className
        )}
        data-state={isOpen ? "open" : "closed"}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleClick}
        {...props}
      >
        {children}
        <svg
          className={menubarSubTriggerIconVariants()}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    );
  }
);

MenubarSubTrigger.displayName = "MenubarSubTrigger";

// ===========================
// MenubarSubContent Component
// ===========================

/**
 * MenubarSubContent - Content for submenu
 */
export const MenubarSubContent = React.forwardRef<
  HTMLDivElement,
  MenubarSubContentProps & { isOpen?: boolean }
>(({ children, className, isOpen, ...props }, ref) => {
  if (!isOpen) return null;

  const context = useMenubarContext();

  return (
    <div
      ref={ref}
      className={cn(
        menubarContentVariants({ side: "right", variant: context.variant }),
        "left-full top-0 ml-1",
        className
      )}
      role="menu"
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
    </div>
  );
});

MenubarSubContent.displayName = "MenubarSubContent";

// ===========================
// MenubarSeparator Component
// ===========================

/**
 * MenubarSeparator - Visual separator between items
 */
export const MenubarSeparator = React.forwardRef<
  HTMLDivElement,
  MenubarSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(menubarSeparatorVariants(), className)}
      role="separator"
      {...props}
    />
  );
});

MenubarSeparator.displayName = "MenubarSeparator";

// ===========================
// MenubarShortcut Component
// ===========================

/**
 * MenubarShortcut - Keyboard shortcut display
 */
export const MenubarShortcut = React.forwardRef<
  HTMLSpanElement,
  MenubarShortcutProps
>(({ children, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(menubarShortcutVariants(), className)}
      {...props}
    >
      {children}
    </span>
  );
});

MenubarShortcut.displayName = "MenubarShortcut";

// ===========================
// MenubarLabel Component
// ===========================

/**
 * MenubarLabel - Label for menu sections
 */
export const MenubarLabel = React.forwardRef<HTMLDivElement, MenubarLabelProps>(
  ({ children, inset = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(menubarLabelVariants({ inset }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MenubarLabel.displayName = "MenubarLabel";

// ===========================
// Exports
// ===========================

export default Menubar;
export type {
  MenubarProps,
  MenubarMenuProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarCheckboxItemProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
  MenubarSubProps,
  MenubarSubTriggerProps,
  MenubarSubContentProps,
  MenubarSeparatorProps,
  MenubarShortcutProps,
  MenubarLabelProps,
};
