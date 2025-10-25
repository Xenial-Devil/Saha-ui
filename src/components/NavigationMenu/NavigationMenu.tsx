import React, {
  useMemo,
  createContext,
  useContext,
  isValidElement,
  cloneElement,
  useState,
} from "react";
import { cn } from "../../lib/utils";
import type {
  NavigationMenuProps,
  NavigationItem,
  NavItemProps,
} from "./NavigationMenu.types";
import {
  navRoot,
  navItem,
  navSection,
  navSectionTitle,
  navSubMenu,
  navItemContainer,
} from "./NavigationMenu.styles";
import { createValidator } from "../../lib/validation";

const NavigationMenuContext = createContext<{
  variant?: string;
  size?: string;
  orientation?: string;
  responsive?: boolean;
  openItems?: Set<string>;
  toggleItem?: (id: string) => void;
  onSelect?: (item: NavigationItem) => void;
}>({});

const LevelContext = createContext<number>(0);

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  variant = "default",
  size = "md",
  orientation = "vertical",
  className,
  compact,
  responsive = false,
  defaultOpenIds = [],
  onSelect,
  children,
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(defaultOpenIds)
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // runtime validation (dev only)
  if (process.env.NODE_ENV === "development") {
    const validator = createValidator("NavigationMenu");
    validator.validateEnum("variant", variant, [
      "default",
      "primary",
      "secondary",
      "accent",
      "ghost",
      "glass",
      "filled",
      "outlined",
      "minimal",
    ]);
    validator.validateEnum("size", size, ["sm", "md", "lg"]);
    validator.validateEnum("orientation", orientation, [
      "vertical",
      "horizontal",
    ]);
    if (responsive !== undefined) {
      validator.validateType(
        "responsive",
        responsive,
        "boolean",
        (val) => typeof val === "boolean"
      );
    }
  }

  const ctx = useMemo(
    () => ({
      variant,
      size,
      orientation,
      responsive,
      openItems,
      toggleItem,
      onSelect,
    }),
    [variant, size, orientation, responsive, openItems, onSelect]
  );

  // track open ids in future (controlled/uncontrolled)

  return (
    <NavigationMenuContext.Provider value={ctx}>
      <nav
        className={
          navRoot({
            variant,
            size,
            orientation: responsive ? "vertical" : orientation,
            compact: !!compact,
            responsive,
          }) + (className ? ` ${className}` : "")
        }
      >
        {items
          ? items.map((it) => (
              <MenuItemWithNesting key={it.id} item={it} level={0} />
            ))
          : children}
      </nav>
    </NavigationMenuContext.Provider>
  );
};

// Internal component to handle nested menu items
const MenuItemWithNesting: React.FC<{
  item: NavigationItem;
  level?: number;
}> = ({ item, level = 0 }) => {
  const ctx = useContext(NavigationMenuContext);
  const hasChildren = item.items && item.items.length > 0;
  const isOpen = ctx.openItems?.has(item.id) || false;

  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) return;

    // Only toggle on click for vertical orientation
    // Horizontal orientation uses hover
    if (hasChildren && ctx.orientation === "vertical") {
      e.preventDefault();
      ctx.toggleItem?.(item.id);
    }

    item.onClick?.(e);
    if (ctx.onSelect) {
      ctx.onSelect(item);
    }
  };

  return (
    <div
      className={`${navItemContainer({
        orientation: ctx.orientation as any,
      })} ${ctx.orientation === "horizontal" ? `group/item-${level}` : ""}`}
    >
      <div
        className={navItem({
          disabled: !!item.disabled,
          responsive: ctx.responsive,
          hasChildren,
          orientation: ctx.orientation as any,
          level: Math.min(level, 3) as 0 | 1 | 2 | 3,
        })}
        role="menuitem"
        aria-expanded={hasChildren ? isOpen : undefined}
        onClick={handleClick}
      >
        {item.icon ? <span className="shrink-0">{item.icon}</span> : null}
        {item.href && !hasChildren ? (
          <a
            href={item.href}
            className="flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            {item.label}
          </a>
        ) : (
          <span className="flex-1">{item.label}</span>
        )}
        {item.badge ? (
          <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-accent/20 text-accent">
            {item.badge}
          </span>
        ) : null}
        {hasChildren ? (
          <span
            className={`text-xs transition-all duration-300 ease-in-out shrink-0 ml-1 ${
              level === 0
                ? ctx.orientation === "vertical" && isOpen
                  ? "rotate-90"
                  : ctx.orientation === "horizontal"
                  ? `group-hover/item-0:rotate-90 rotate-0`
                  : "rotate-0"
                : "rotate-0"
            }`}
          >
            ▶
          </span>
        ) : null}
      </div>
      {hasChildren && (
        <div
          className={navSubMenu({
            open: ctx.orientation === "vertical" ? isOpen : false,
            orientation: ctx.orientation as any,
            variant: ctx.variant as any,
            level: Math.min(level + 1, 3) as 0 | 1 | 2 | 3,
          })}
        >
          {item.items!.map((child) => (
            <MenuItemWithNesting
              key={child.id}
              item={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const NavigationMenuItem: React.FC<NavItemProps> = ({
  id,
  label,
  icon,
  href,
  disabled,
  badge,
  onClick,
  children,
  asChild = false,
  items,
}) => {
  const ctx = useContext(NavigationMenuContext);
  const level = useContext(LevelContext);
  const hasChildren =
    (items && items.length > 0) ||
    (!asChild && React.Children.count(children) > 0);
  const isOpen = ctx.openItems?.has(id) || false;

  // Development-only validation: warn if href is provided with children
  if (process.env.NODE_ENV === "development" && hasChildren && href) {
    console.warn(
      `[NavigationMenuItem] Item "${label}" (id: ${id}) has both children and href. ` +
        `Menu items with children should not have href - they toggle children instead of navigating. ` +
        `Remove the href prop to fix this.`
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;

    // If has nested items, toggle them only in vertical mode
    // In horizontal mode, use hover instead
    if (hasChildren && ctx.orientation === "vertical") {
      e.preventDefault();
      ctx.toggleItem?.(id);
      // Don't call onSelect for parent items with children
      onClick?.(e);
      return;
    }

    // Only call onSelect for leaf items (no children)
    onClick?.(e);
    if (ctx.onSelect)
      ctx.onSelect({ id, label, icon, href, disabled, badge, onClick });
  };

  // If asChild is true, clone the child element with navigation behavior
  if (asChild && isValidElement(children)) {
    const childProps = children.props as any;
    return cloneElement(children, {
      ...childProps,
      onClick: (e: React.MouseEvent) => {
        handleClick(e);
        // Call the child's original onClick if it exists
        if (childProps.onClick) {
          childProps.onClick(e);
        }
      },
      className:
        navItem({
          disabled: !!disabled,
          responsive: ctx.responsive,
          hasChildren,
          orientation: ctx.orientation as any,
        }) + (childProps.className ? ` ${childProps.className}` : ""),
    } as any);
  }

  return (
    <div
      className={`${navItemContainer({
        orientation: ctx.orientation as any,
      })} ${ctx.orientation === "horizontal" ? `group/item-${level}` : ""}`}
    >
      <div
        className={navItem({
          disabled: !!disabled,
          responsive: ctx.responsive,
          hasChildren,
          orientation: ctx.orientation as any,
        })}
        role="menuitem"
        aria-expanded={hasChildren ? isOpen : undefined}
        onClick={handleClick}
      >
        {icon ? <span className="shrink-0">{icon}</span> : null}
        {href && !hasChildren ? (
          <a
            href={href}
            className="flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            {label}
          </a>
        ) : (
          <span className="flex-1">{label}</span>
        )}
        {badge ? (
          <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-accent/20 text-accent">
            {badge}
          </span>
        ) : null}
        {hasChildren ? (
          <span
            className={`text-xs transition-all duration-300 ease-in-out shrink-0 ml-1 ${
              level === 0
                ? ctx.orientation === "vertical" && isOpen
                  ? "rotate-90"
                  : ctx.orientation === "horizontal"
                  ? `group-hover/item-${level}:rotate-90 rotate-0`
                  : "rotate-0"
                : "rotate-0"
            }`}
          >
            ▶
          </span>
        ) : null}
      </div>

      {/* Render nested items from items prop */}
      {items && items.length > 0 && (
        <div
          className={navSubMenu({
            open: ctx.orientation === "vertical" ? isOpen : false,
            orientation: ctx.orientation as any,
            variant: ctx.variant as any,
            level: Math.min(level + 1, 3) as 0 | 1 | 2 | 3,
          })}
        >
          <LevelContext.Provider value={level + 1}>
            {items.map((child) => (
              <NavigationMenuItem key={child.id} {...child} />
            ))}
          </LevelContext.Provider>
        </div>
      )}

      {/* Render children that are not part of asChild */}
      {!asChild && children && !items && (
        <div
          className={navSubMenu({
            open: ctx.orientation === "vertical" ? isOpen : false,
            orientation: ctx.orientation as any,
            variant: ctx.variant as any,
            level: Math.min(level + 1, 3) as 0 | 1 | 2 | 3,
          })}
        >
          <LevelContext.Provider value={level + 1}>
            {children}
          </LevelContext.Provider>
        </div>
      )}
    </div>
  );
};

export const NavigationMenuSection: React.FC<
  React.PropsWithChildren<{ title?: React.ReactNode }>
> = ({ title, children }) => {
  const ctx = useContext(NavigationMenuContext);

  return (
    <div className={navSection({ responsive: ctx.responsive })}>
      {title ? (
        <div className={navSectionTitle({ responsive: ctx.responsive })}>
          {title}
        </div>
      ) : null}
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
};

// Radix-style API Components
/**
 * NavigationMenuList - Container for navigation menu items (Radix-style API)
 */
export const NavigationMenuList: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const ctx = useContext(NavigationMenuContext);

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        ctx.orientation === "horizontal" && "flex-row items-center",
        className
      )}
    >
      {children}
    </div>
  );
};

NavigationMenuList.displayName = "NavigationMenuList";

/**
 * NavigationMenuTrigger - Trigger element for navigation items with content (Radix-style API)
 */
export const NavigationMenuTrigger = React.forwardRef<
  HTMLDivElement,
  {
    children?: React.ReactNode;
    className?: string;
    asChild?: boolean;
  }
>(({ children, className, asChild }, ref) => {
  // If asChild, return children directly
  if (asChild && React.isValidElement(children)) {
    return children;
  }

  return (
    <div ref={ref} className={cn("cursor-pointer", className)}>
      {children}
    </div>
  );
});

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

/**
 * NavigationMenuContent - Content container for navigation items (Radix-style API)
 * Always renders as vertical (for dropdown menus)
 */
export const NavigationMenuContent: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const ctx = useContext(NavigationMenuContext);
  const level = useContext(LevelContext);

  return (
    <div
      className={cn(
        navSubMenu({
          open: true,
          orientation: "vertical",
          variant: ctx.variant as any,
          level: Math.min(level + 1, 3) as 0 | 1 | 2 | 3,
        }),
        className
      )}
    >
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </div>
  );
};

NavigationMenuContent.displayName = "NavigationMenuContent";

/**
 * NavigationMenuLink - Link element for navigation (Radix-style API)
 * Can contain NavigationMenuContent for multi-level menus
 * Horizontal mode: Hover-based dropdowns
 * Vertical mode: Click-based dropdowns
 */
export const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
    active?: boolean;
  }
>(({ children, className, asChild, active, ...props }, ref) => {
  const ctx = useContext(NavigationMenuContext);
  const level = useContext(LevelContext);
  const [isOpen, setIsOpen] = useState(false);

  // Check if children contains NavigationMenuContent (multi-level)
  const hasContent = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type as any).displayName === "NavigationMenuContent"
  );

  // Split children into link content and submenu content
  const linkChildren: React.ReactNode[] = [];
  let submenuContent: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      (child.type as any).displayName === "NavigationMenuContent"
    ) {
      submenuContent = child;
    } else {
      linkChildren.push(child);
    }
  });

  // If asChild, return children directly
  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as Record<string, any>;
    return React.cloneElement(children, {
      ...childProps,
      className: cn(childProps.className, className),
    } as any);
  }

  // Determine if we should use hover or click based on orientation and level
  const isHorizontal = ctx.orientation === "horizontal";
  const useHover = isHorizontal && level === 0;

  const linkElement = (
    <a
      ref={ref}
      className={cn(
        navItem({
          disabled: false,
          responsive: ctx.responsive,
          hasChildren: hasContent,
          orientation: ctx.orientation as any,
          level: Math.min(level, 3) as 0 | 1 | 2 | 3,
        }),
        active && "bg-accent/20",
        hasContent && "group/item-" + level,
        className
      )}
      onClick={(e) => {
        if (hasContent && !useHover) {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
        props.onClick?.(e);
      }}
      {...props}
    >
      {linkChildren}
      {hasContent && !useHover && (
        <span
          className={cn(
            "ml-auto transition-transform duration-200",
            level === 0 && isOpen && "rotate-90"
          )}
        >
          ▸
        </span>
      )}
      {hasContent && useHover && <span className="ml-1">▾</span>}
    </a>
  );

  // If no submenu, return just the link
  if (!hasContent) {
    return linkElement;
  }

  // Return link with submenu
  return (
    <div
      className={cn(
        navItemContainer({ orientation: ctx.orientation as any }),
        useHover && "relative group"
      )}
      onMouseEnter={() => {
        if (hasContent && useHover) {
          setIsOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (hasContent && useHover) {
          setIsOpen(false);
        }
      }}
    >
      {linkElement}
      {isOpen && (
        <div
          className={cn(
            useHover &&
              level === 0 &&
              "absolute top-full left-0 min-w-[200px] z-50"
          )}
        >
          {submenuContent}
        </div>
      )}
    </div>
  );
});

NavigationMenuLink.displayName = "NavigationMenuLink";

export default NavigationMenu;
