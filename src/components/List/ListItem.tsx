import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ListItemProps } from "./List.types";

// CVA variants for ListItem
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
