"use client";

import React, { createContext, useContext, useEffect } from "react";
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
import { createValidator, commonValidators } from "../../lib/validation";
import {
  breadcrumbVariants,
  breadcrumbItemVariants,
  breadcrumbSeparatorVariants,
} from "./Breadcrumb.styles";

interface BreadcrumbContextValue {
  variant: BreadcrumbVariant;
  size: BreadcrumbSize;
  separator: BreadcrumbSeparatorType;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | undefined>(
  undefined,
);

const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("BreadcrumbItem must be used within a Breadcrumb");
  }
  return context;
};

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
    ref,
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Breadcrumb");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "ghost",
        "bordered",
        "pills",
        "underline",
        "glass",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate separator
      validator.validateEnum("separator", separator, [
        "chevron",
        "slash",
        "dot",
        "arrow",
      ] as const);

      // Validate children
      if (!children) {
        validator.warn("Breadcrumb should have BreadcrumbItem children");
      }

      // Common validators
      commonValidators.className(validator, className);
    }, [variant, size, separator, children, className]);

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
  },
);

Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbItem = React.forwardRef<
  HTMLAnchorElement | HTMLSpanElement,
  BreadcrumbItemProps
>(
  (
    { href, icon, isCurrentPage = false, className, children, ...props },
    ref,
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
  },
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
