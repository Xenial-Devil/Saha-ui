import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import {
  ChevronRight,
  Slash,
  Circle,
  ArrowRight,
  Home,
  MoreHorizontal,
} from "lucide-react";
import type { BreadcrumbProps, BreadcrumbItem } from "./Breadcrumb.types";

/**
 * Breadcrumb container variants using CVA
 *
 * Provides 5 modern breadcrumb variants with flexible sizing,
 * multiple separator styles, and advanced features like collapsing.
 *
 * @variant default - Clean design with subtle hover effects
 * @variant ghost - Minimal design with ghost hover states
 * @variant bordered - Bordered pills with shadows
 * @variant pills - Pill-shaped items with backgrounds
 * @variant underline - Underlined items with animated hover
 *
 * @size sm | md | lg - Configurable text and spacing sizes
 */
export const breadcrumbVariants = cva(
  "flex items-center flex-wrap gap-1 text-sm",
  {
    variants: {
      size: {
        sm: "text-xs gap-0.5",
        md: "text-sm gap-1",
        lg: "text-base gap-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Breadcrumb item variants
 */
export const breadcrumbItemVariants = cva(
  "inline-flex items-center gap-1.5 transition-all duration-200 ease-out font-medium",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md px-2 py-1",
        bordered:
          "text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/50 rounded-full px-3 py-1 shadow-sm hover:shadow-md",
        pills:
          "text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/60 rounded-full px-3 py-1",
        underline:
          "text-muted-foreground hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      isCurrentPage: {
        true: "text-foreground font-semibold cursor-default pointer-events-none",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      // Current page styling for different variants
      {
        variant: "default",
        isCurrentPage: true,
        className: "text-primary",
      },
      {
        variant: "ghost",
        isCurrentPage: true,
        className: "bg-primary/10 text-primary",
      },
      {
        variant: "bordered",
        isCurrentPage: true,
        className: "border-primary bg-primary/5 text-primary",
      },
      {
        variant: "pills",
        isCurrentPage: true,
        className: "bg-primary/20 text-primary",
      },
      {
        variant: "underline",
        isCurrentPage: true,
        className: "text-primary after:w-full",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      isCurrentPage: false,
    },
  }
);

/**
 * Breadcrumb separator variants
 */
export const breadcrumbSeparatorVariants = cva(
  "flex items-center text-muted-foreground/50 select-none",
  {
    variants: {
      size: {
        sm: "text-xs mx-0.5",
        md: "text-sm mx-1",
        lg: "text-base mx-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type BreadcrumbVariantsProps = VariantProps<typeof breadcrumbVariants>;

/**
 * Get separator icon based on type
 */
const getSeparatorIcon = (
  type: BreadcrumbProps["separator"],
  size: BreadcrumbProps["size"] = "md"
) => {
  const iconSize = size === "sm" ? 12 : size === "lg" ? 18 : 14;

  switch (type) {
    case "slash":
      return <Slash size={iconSize} />;
    case "chevron":
      return <ChevronRight size={iconSize} />;
    case "dot":
      return <Circle size={iconSize} fill="currentColor" />;
    case "arrow":
      return <ArrowRight size={iconSize} />;
    default:
      return <ChevronRight size={iconSize} />;
  }
};

/**
 * Breadcrumb Component
 *
 * A navigation component that shows the current page's location within a hierarchy.
 * Supports multiple variants, sizes, separators, and advanced features like collapsing.
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Products", href: "/products" },
 *     { label: "Laptops", isCurrentPage: true }
 *   ]}
 *   variant="pills"
 *   separator="chevron"
 * />
 * ```
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      variant = "default",
      size = "md",
      separator = "chevron",
      customSeparator,
      showHomeIcon = true,
      maxItems,
      className,
      ...props
    },
    ref
  ) => {
    // Handle collapsing if maxItems is set
    const displayItems = React.useMemo(() => {
      if (!maxItems || items.length <= maxItems) {
        return items;
      }

      const firstItem = items[0];
      const lastItems = items.slice(-(maxItems - 1));

      return [
        firstItem,
        {
          label: "...",
          href: undefined,
          isCollapsed: true,
        } as BreadcrumbItem & { isCollapsed?: boolean },
        ...lastItems,
      ];
    }, [items, maxItems]);

    const homeIconSize = size === "sm" ? 12 : size === "lg" ? 18 : 14;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(breadcrumbVariants({ size }), className)}
        {...props}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isFirst = index === 0;
            const isCollapsed = "isCollapsed" in item && item.isCollapsed;

            return (
              <React.Fragment key={`${item.label}-${index}`}>
                <li className="inline-flex items-center">
                  {isCollapsed ? (
                    <span
                      className={cn(
                        breadcrumbItemVariants({
                          variant,
                          size,
                          isCurrentPage: false,
                        }),
                        "cursor-default pointer-events-none"
                      )}
                    >
                      <MoreHorizontal size={homeIconSize} />
                    </span>
                  ) : item.href && !item.isCurrentPage ? (
                    <a
                      href={item.href}
                      className={cn(
                        breadcrumbItemVariants({
                          variant,
                          size,
                          isCurrentPage: item.isCurrentPage,
                        })
                      )}
                      aria-current={item.isCurrentPage ? "page" : undefined}
                    >
                      {isFirst && showHomeIcon && (
                        <Home size={homeIconSize} className="flex-shrink-0" />
                      )}
                      {item.icon && !isFirst && (
                        <span className="flex-shrink-0">{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <span
                      className={cn(
                        breadcrumbItemVariants({
                          variant,
                          size,
                          isCurrentPage: true,
                        })
                      )}
                      aria-current="page"
                    >
                      {isFirst && showHomeIcon && (
                        <Home size={homeIconSize} className="flex-shrink-0" />
                      )}
                      {item.icon && !isFirst && (
                        <span className="flex-shrink-0">{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                    </span>
                  )}
                </li>

                {!isLast && (
                  <li
                    className={cn(breadcrumbSeparatorVariants({ size }))}
                    aria-hidden="true"
                  >
                    {customSeparator || getSeparatorIcon(separator, size)}
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
