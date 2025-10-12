import { createContext, useContext, useState } from "react";
import { cva } from "class-variance-authority";
import type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabVariant,
  TabSize,
} from "./Tab.types";

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
 * CVA variants for the tabs list container
 * Users can override these using the className prop
 * All Tailwind utility classes are supported
 */
const tabsListVariants = cva(
  [
    "relative",
    "inline-flex",
    "flex-wrap",
    "gap-1",
    "p-1",
    "rounded-lg",
    "transition-all",
    "duration-200",
    "items-center",
    "justify-start",
    "sm:flex-nowrap",
  ],
  {
    variants: {
      variant: {
        default: ["bg-base-200", "text-base-content"],
        primary: ["bg-primary/10", "text-primary"],
        secondary: ["bg-secondary/10", "text-secondary"],
        accent: ["bg-accent/10", "text-accent"],
        success: ["bg-success/10", "text-success"],
        warning: ["bg-warning/10", "text-warning"],
        danger: ["bg-destructive/10", "text-destructive"],
        info: ["bg-info/10", "text-info"],
        glass: [
          "backdrop-blur-xl",
          "bg-white/30 dark:bg-gray-900/40",
          "border",
          "border-white/40 dark:border-white/20",
        ],
        bordered: ["bg-base-100", "border-2", "border-base-300"],
        elevated: ["bg-base-100", "shadow-lg"],
        flat: ["bg-base-200"],
        outlined: ["border", "border-base-content/20", "bg-transparent"],
        minimal: ["bg-transparent"],
      },
      size: {
        sm: ["text-xs", "sm:text-sm"],
        md: ["text-sm", "sm:text-base"],
        lg: ["text-base", "sm:text-lg"],
      },
      fullWidth: {
        true: ["w-full"],
        false: ["w-fit", "max-w-full"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  }
);

/**
 * CVA variants for individual tab triggers
 */
const tabsTriggerVariants = cva(
  [
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-1.5",
    "sm:gap-2",
    "rounded-md",
    "font-medium",
    "transition-all",
    "duration-200",
    "cursor-pointer",
    "whitespace-nowrap",
    "select-none",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:pointer-events-none",
    "touch-manipulation",
    "user-select-none",
    "px-2.5 py-1.5",
    "sm:px-3 sm:py-2",
    "md:px-4 md:py-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "hover:bg-base-300",
          "active:bg-base-300",
          "data-[state=active]:bg-base-100",
          "data-[state=active]:shadow-sm",
        ],
        primary: [
          "hover:bg-primary/20",
          "active:bg-primary/30",
          "data-[state=active]:bg-primary",
          "data-[state=active]:text-white",
          "data-[state=active]:shadow-sm",
        ],
        secondary: [
          "hover:bg-secondary/20",
          "active:bg-secondary/30",
          "data-[state=active]:bg-secondary",
          "data-[state=active]:text-white",
          "data-[state=active]:shadow-sm",
        ],
        accent: [
          "hover:bg-accent/20",
          "active:bg-accent/30",
          "data-[state=active]:bg-accent",
          "data-[state=active]:text-white",
          "data-[state=active]:shadow-sm",
        ],
        success: [
          "hover:bg-success/20",
          "active:bg-success/30",
          "data-[state=active]:bg-success",
          "data-[state=active]:text-white",
          "data-[state=active]:shadow-sm",
        ],
        warning: [
          "hover:bg-warning/20",
          "active:bg-warning/30",
          "data-[state=active]:bg-warning",
          "data-[state=active]:text-white",
          "data-[state=active]:shadow-sm",
        ],
        danger: [
          "hover:bg-destructive/20",
          "active:bg-destructive/30",
          "data-[state=active]:bg-destructive",
          "data-[state=active]:text-white",
          "data-[state=active]:shadow-sm",
        ],
        info: [
          "hover:bg-info/20",
          "active:bg-info/30",
          "data-[state=active]:bg-info",
          "data-[state=active]:text-white",
          "data-[state=active]:shadow-sm",
        ],
        glass: [
          "hover:bg-white/20 dark:hover:bg-gray-900/20",
          "active:bg-white/30 dark:active:bg-gray-900/30",
          "data-[state=active]:bg-white/40 dark:data-[state=active]:bg-gray-900/60",
          "data-[state=active]:backdrop-blur-lg",
        ],
        bordered: [
          "hover:bg-base-200",
          "active:bg-base-250",
          "data-[state=active]:bg-base-100",
          "data-[state=active]:border",
          "data-[state=active]:border-base-300",
        ],
        elevated: [
          "hover:bg-base-200",
          "active:bg-base-250",
          "data-[state=active]:bg-base-100",
          "data-[state=active]:shadow-md",
        ],
        flat: [
          "hover:bg-base-300",
          "active:bg-base-350",
          "data-[state=active]:bg-base-300",
        ],
        outlined: [
          "hover:bg-base-content/5",
          "active:bg-base-content/10",
          "data-[state=active]:border",
          "data-[state=active]:border-base-content",
          "data-[state=active]:bg-base-content/10",
        ],
        minimal: [
          "hover:bg-base-200",
          "active:bg-base-250",
          "data-[state=active]:bg-base-200",
          "data-[state=active]:font-semibold",
        ],
      },
      size: {
        sm: ["text-xs sm:text-sm", "min-h-[1.75rem] sm:min-h-[2rem]"],
        md: ["text-sm sm:text-base", "min-h-[2rem] sm:min-h-[2.5rem]"],
        lg: ["text-base sm:text-lg", "min-h-[2.5rem] sm:min-h-[3rem]"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

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
