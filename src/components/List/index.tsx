import React, { createContext, useContext } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ListProps, ListItemProps, ListVariant, ListSize } from "./List.types";

interface ListContextValue {
  variant: ListVariant;
  size: ListSize;
}

const ListContext = createContext<ListContextValue | undefined>(undefined);

export const useList = () => {
  const context = useContext(ListContext);
  return context;
};

const listVariants = cva("w-full transition-all duration-200", {
  variants: {
    variant: {
      default: "space-y-2 list-inside",
      bordered:
        "border-2 border-border rounded-xl overflow-hidden p-4 shadow-sm hover:shadow-md transition-shadow",
      divided: "divide-y divide-border/50",
      striped: "space-y-0",
      cards: "space-y-3",
      glass:
        "space-y-3 bg-background/30 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-lg",
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
  "flex items-start gap-3 transition-all duration-200 group relative",
  {
    variants: {
      variant: {
        default: "py-2 px-3 hover:bg-accent/10 rounded-lg",
        bordered: "py-3 px-4 hover:bg-accent/5",
        divided: "py-3 px-4 hover:bg-accent/5 first:pt-0 last:pb-0",
        striped:
          "py-3 px-4 even:bg-muted/30 hover:bg-accent/10 transition-colors",
        cards:
          "p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/30 hover:shadow-md hover:scale-[1.02] transition-all",
        glass:
          "p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 hover:shadow-lg transition-all",
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
