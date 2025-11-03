import { createContext, useContext, useState, useEffect } from "react";
import type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabVariant,
  TabSize,
} from "./Tab.types";
import { createValidator, commonValidators } from "../../lib/validation";
import { tabsListVariants, tabsTriggerVariants } from "./Tab.styles";

/**
 * Utility function to merge class names
 * Filters out falsy values and joins remaining classes
 */
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

// Context for sharing state between Tab components
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: TabVariant;
  size: TabSize;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tab components must be used within a Tabs component");
  }
  return context;
};


/**
 * Root Tabs component - provides context for child components
 * @example
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">Account content...</TabsContent>
 *   <TabsContent value="password">Password content...</TabsContent>
 * </Tabs>
 */
export const Tabs: React.FC<TabsProps> = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  className,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue || ""
  );

  const value = controlledValue ?? uncontrolledValue;

  // Development-only validation
  useEffect(() => {
    const validator = createValidator("Tabs");

    // Validate children
    if (!children) {
      validator.warn("Tabs should have TabsList and TabsContent children");
    }

    // Common validators
    commonValidators.className(validator, className);
  }, [children, className]);

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        variant: "default",
        size: "md",
      }}
    >
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

/**
 * TabsList component - container for tab triggers
 * @example
 * <TabsList variant="primary" size="lg">
 *   <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 * </TabsList>
 */
export const TabsList: React.FC<TabsListProps> = ({
  variant = "default",
  size = "md",
  fullWidth = false,
  className,
  children,
}) => {
  const context = useTabsContext();

  // Development-only validation
  useEffect(() => {
    const validator = createValidator("TabsList");

    // Validate variant
    validator.validateEnum("variant", variant, [
      "default",
      "primary",
      "secondary",
      "accent",
      "glass",
      "outline",
      "pills",
      "underline",
      "bordered",
      "minimal",
    ] as const);

    // Validate size
    validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

    // Validate children
    if (!children) {
      validator.warn("TabsList should have TabsTrigger children");
    }

    // Common validators
    commonValidators.className(validator, className);
  }, [variant, size, children, className]);

  // Update context with variant and size
  const updatedContext = {
    ...context,
    variant,
    size,
  };

  return (
    <TabsContext.Provider value={updatedContext}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          tabsListVariants({ variant, size, fullWidth }),
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/**
 * TabsTrigger component - individual tab button
 * @example
 * <TabsTrigger value="account" icon={<UserIcon />} badge={5}>
 *   Account
 * </TabsTrigger>
 */
export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  disabled = false,
  icon,
  badge,
  className,
  iconClassName,
  badgeClassName,
  children,
}) => {
  const {
    value: selectedValue,
    onValueChange,
    variant,
    size,
  } = useTabsContext();

  const isActive = selectedValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      data-state={isActive ? "active" : "inactive"}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(value)}
      className={cn(tabsTriggerVariants({ variant, size }), className)}
    >
      {icon && (
        <span
          className={cn("flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5", iconClassName)}
        >
          {icon}
        </span>
      )}
      <span className="truncate">{children}</span>
      {badge !== undefined && (
        <span
          className={cn(
            "inline-flex",
            "items-center",
            "justify-center",
            "min-w-[1.25rem]",
            "h-5",
            "px-1.5",
            "text-xs",
            "font-semibold",
            "rounded-full",
            "transition-colors",
            "duration-200",
            !badgeClassName &&
              (isActive
                ? variant === "primary" ||
                  variant === "secondary" ||
                  variant === "accent" ||
                  variant === "success" ||
                  variant === "warning" ||
                  variant === "danger" ||
                  variant === "info"
                  ? "bg-white/20 text-white"
                  : "bg-primary text-white"
                : "bg-base-300 text-base-content"),
            badgeClassName
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

/**
 * TabsContent component - content panel for each tab
 * @example
 * <TabsContent value="account">
 *   <Card>Account settings content...</Card>
 * </TabsContent>
 */
export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  className,
  children,
}) => {
  const { value: selectedValue } = useTabsContext();

  const isActive = selectedValue === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "w-full",
        "mt-4",
        "transition-opacity",
        "duration-200",
        className
      )}
    >
      {children}
    </div>
  );
};

// Default export for backward compatibility
export default Tabs;
