import React, { createContext, useContext, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ListProps, ListItemProps, ListVariant, ListSize } from "./List.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";

interface ListContextValue {
  variant: ListVariant;
  size: ListSize;
}

const ListContext = createContext<ListContextValue | undefined>(undefined);

export const useList = () => {
  const context = useContext(ListContext);
  return context;
};

const listVariants = cva("w-full transition-all duration-300", {
  variants: {
    variant: {
      default: "space-y-2 list-inside",
      bordered:
        "border-2 border-border rounded-xl overflow-hidden p-4 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none",
      divided:
        "divide-y divide-border/50 hover:divide-border transition-colors",
      striped: "space-y-0",
      cards: "space-y-3",
      glass:
        "space-y-3 bg-background/30 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:border-white/20 relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-white/5 before:pointer-events-none",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  compoundVariants: [
    {
      variant: "bordered",
      className: "bg-card/50 backdrop-blur-sm",
    },
    {
      variant: "cards",
      className: "bg-transparent",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const listItemVariants = cva(
  "flex items-start gap-3 transition-all duration-300 group relative",
  {
    variants: {
      variant: {
        default:
          "py-2 px-3 hover:bg-accent/10 rounded-lg hover:scale-[1.01] hover:shadow-md",
        bordered: "py-3 px-4 hover:bg-accent/5 hover:shadow-sm",
        divided:
          "py-3 px-4 hover:bg-accent/5 first:pt-0 last:pb-0 hover:shadow-sm",
        striped:
          "py-3 px-4 even:bg-muted/30 hover:bg-accent/10 transition-all hover:scale-[1.01] hover:shadow-md",
        cards:
          "p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/30 hover:shadow-xl hover:scale-[1.02] transition-all relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none",
        glass:
          "p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:scale-[1.02] transition-all relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-white/5 before:pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  (
    {
      children,
      listType = "disc",
      variant = "default",
      size = "md",
      ordered = false,
      className,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("List");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "bordered",
        "divided",
        "striped",
        "cards",
        "glass",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate listType
      validator.validateEnum("listType", listType, [
        "disc",
        "circle",
        "square",
        "decimal",
        "decimal-leading-zero",
        "lower-roman",
        "upper-roman",
        "lower-alpha",
        "upper-alpha",
        "none",
      ] as const);

      // Validate boolean props
      validator.validateType("ordered", ordered, "boolean", isValidBoolean);

      // Common validators
      commonValidators.className(validator, className);
    }, [variant, size, listType, ordered, className]);

    const listStyle = listType !== "none" ? listType : undefined;
    const Component = ordered ? "ol" : "ul";

    const paddingClasses = cn({
      "px-6": variant === "default" && listType !== "none",
      "px-0":
        variant === "cards" || variant === "divided" || variant === "glass",
    });

    const contextValue: ListContextValue = {
      variant,
      size,
    };

    return (
      <ListContext.Provider value={contextValue}>
        <Component
          ref={ref as any}
          className={cn(
            listVariants({ variant, size }),
            paddingClasses,
            className
          )}
          style={{ listStyleType: listStyle }}
          {...props}
        >
          {children}
        </Component>
      </ListContext.Provider>
    );
  }
);

List.displayName = "List";

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, icon, variant: propVariant, className, ...props }, ref) => {
    const context = useList();
    const variant = propVariant || context?.variant || "default";

    return (
      <li
        ref={ref}
        className={cn(listItemVariants({ variant }), className)}
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0 text-primary mt-0.5">{icon}</span>
        )}
        <span className="flex-1">{children}</span>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

export { List, ListItem };
