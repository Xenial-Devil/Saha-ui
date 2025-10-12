import React, { createContext, useContext } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChevronRight, Slash, Circle, ArrowRight } from "lucide-react";
import type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbSeparatorProps,
  BreadcrumbVariant,
  BreadcrumbSize,
  BreadcrumbSeparatorType,
} from "./Breadcrumb.types";

interface BreadcrumbContextValue {
  variant: BreadcrumbVariant;
  size: BreadcrumbSize;
  separator: BreadcrumbSeparatorType;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | undefined>(
  undefined
);

const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("BreadcrumbItem must be used within a Breadcrumb");
  }
  return context;
};

const breadcrumbVariants = cva("flex items-center flex-wrap gap-1 text-sm", {
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
});

const breadcrumbItemVariants = cva(
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
        glass:
          "text-muted-foreground hover:text-foreground bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-lg px-3 py-1 shadow-lg",
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
        variant: "glass",
        isCurrentPage: true,
        className: "bg-primary/10 border-primary/30 text-primary",
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

const breadcrumbSeparatorVariants = cva("text-muted-foreground/50", {
  variants: {
    size: {
      sm: "mx-0.5",
      md: "mx-1",
      lg: "mx-1.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      variant = "default",
      size = "md",
      separator = "chevron",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const contextValue: BreadcrumbContextValue = {
      variant,
      size,
      separator,
    };

    return (
      <BreadcrumbContext.Provider value={contextValue}>
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(breadcrumbVariants({ size }), className)}
          {...props}
        >
          <ol className="flex items-center flex-wrap gap-1">{children}</ol>
        </nav>
      </BreadcrumbContext.Provider>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbItem = React.forwardRef<
  HTMLAnchorElement | HTMLSpanElement,
  BreadcrumbItemProps
>(
  (
    { href, icon, isCurrentPage = false, className, children, ...props },
    ref
  ) => {
    const { variant, size } = useBreadcrumb();

    const Component = href && !isCurrentPage ? "a" : "span";

    return (
      <Component
        ref={ref as any}
        href={href}
        aria-current={isCurrentPage ? "page" : undefined}
        className={cn(
          breadcrumbItemVariants({ variant, size, isCurrentPage }),
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </Component>
    );
  }
);

BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(({ className, children, ...props }, ref) => {
  const { separator, size } = useBreadcrumb();

  const renderSeparator = () => {
    if (children) return children;

    switch (separator) {
      case "slash":
        return <Slash size={14} />;
      case "chevron":
        return <ChevronRight size={14} />;
      case "dot":
        return <Circle size={4} fill="currentColor" />;
      case "arrow":
        return <ArrowRight size={14} />;
      default:
        return <ChevronRight size={14} />;
    }
  };

  return (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(breadcrumbSeparatorVariants({ size }), className)}
      {...props}
    >
      {renderSeparator()}
    </span>
  );
});

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator };
