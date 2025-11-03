import React, { createContext, useContext, useEffect } from "react";

import { cn } from "../../lib/utils";
import { ListProps, ListItemProps, ListVariant, ListSize } from "./List.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";
import {
  listVariants,
  mainListItemVariants as listItemVariants,
} from "./List.styles";

interface ListContextValue {
  variant: ListVariant;
  size: ListSize;
}

const ListContext = createContext<ListContextValue | undefined>(undefined);

export const useList = () => {
  const context = useContext(ListContext);
  return context;
};

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
