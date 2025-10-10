import React from "react";
import { cn } from "../../lib/utils";
import { ListItemProps } from "./List.types";

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, icon, className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          "flex items-start gap-3 py-2 px-3 transition-colors duration-200",
          "hover:bg-accent/5 rounded-lg group",
          className
        )}
        {...props}
      >
        {/* Optional icon */}
        {icon && (
          <span className="flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors">
            {icon}
          </span>
        )}

        {/* Content */}
        <span className="flex-1">{children}</span>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

export default ListItem;
