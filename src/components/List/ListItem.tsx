import React from "react";
import { cn } from "../../lib/utils";
import { ListItemProps } from "./List.types";
import { listItemVariants } from "./List.styles";

/**
 * ListItem Component
 *
 * Individual list item with optional icon support and hover effects.
 * Automatically adapts styling based on parent List variant.
 *
 * @example
 * ```tsx
 * // Basic list item
 * <ListItem>Simple item</ListItem>
 *
 * // With icon
 * <ListItem icon={<CheckCircle size={20} />}>
 *   Completed task
 * </ListItem>
 *
 * // Custom styling
 * <ListItem variant="cards">
 *   Card-styled item
 * </ListItem>
 * ```
 */
const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, icon, variant = "default", className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(listItemVariants({ variant }), className)}
        {...props}
      >
        {/* Optional icon */}
        {icon && (
          <span className="flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors duration-200 group-hover:scale-110">
            {icon}
          </span>
        )}

        {/* Content */}
        <span className="flex-1 leading-relaxed">{children}</span>

        {/* Hover indicator for card variant */}
        {variant === "cards" && (
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
        )}
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

export default ListItem;
export { listItemVariants };
