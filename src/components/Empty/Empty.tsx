import React, { createContext, useContext, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type {
  EmptyActionsProps,
  EmptyContextValue,
  EmptyDescriptionProps,
  EmptyExtraProps,
  EmptyIconProps,
  EmptyImageProps,
  EmptyProps,
  EmptySize,
  EmptyTitleProps,
} from "./Empty.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";

// Context for composable components

const EmptyContext = createContext<EmptyContextValue>({
  size: "md",
  variant: "default",
  animated: true,
});

const emptyVariants = cva(
  "flex flex-col items-center justify-center text-center transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        subtle: "bg-muted/30 rounded-2xl border border-border/50",
        outlined: "bg-card rounded-2xl border-2 border-border",
        glass:
          "bg-background/50 backdrop-blur-xl rounded-2xl border border-border/30",
      },
      size: {
        sm: "p-6 gap-3",
        md: "p-8 gap-4",
        lg: "p-12 gap-5",
        xl: "p-16 gap-6",
      },
      fullHeight: {
        true: "min-h-[400px]",
        false: "",
      },
      animated: {
        true: "animate-in fade-in-50 zoom-in-95 duration-500",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullHeight: false,
      animated: true,
    },
  }
);

const iconContainerVariants = cva(
  "flex items-center justify-center rounded-full transition-all duration-300",
  {
    variants: {
      size: {
        sm: "w-16 h-16",
        md: "w-20 h-20",
        lg: "w-24 h-24",
        xl: "w-32 h-32",
      },
      iconColor: {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        muted: "bg-muted text-muted-foreground",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        danger: "bg-danger/10 text-danger",
        info: "bg-info/10 text-info",
      },
      animated: {
        true: "hover:scale-110 hover:rotate-3",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      iconColor: "muted",
      animated: true,
    },
  }
);

const titleVariants = cva("font-semibold text-foreground", {
  variants: {
    size: {
      sm: "text-base",
      md: "text-lg",
      lg: "text-xl",
      xl: "text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const descriptionVariants = cva("text-muted-foreground max-w-md", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// Preset icons
const getPresetIcon = (iconType: EmptyProps["iconType"], size: EmptySize) => {
  const iconSizes: Record<EmptySize, string> = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const iconSize = iconSizes[size];

  const icons = {
    default: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    ),
    search: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    folder: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
    ),
    document: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    image: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    inbox: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    ),
    cart: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    bookmark: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    ),
    notification: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
    user: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    database: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
    cloud: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
    error: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    success: (
      <svg
        className={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return icons[iconType || "default"];
};

export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      title,
      description,
      size = "md",
      variant = "default",
      icon,
      iconType = "default",
      iconColor = "muted",
      action,
      extra,
      image,
      children,
      className,
      fullHeight = false,
      animated = true,
      zIndex,
      showBackground = false,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Empty");

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg", "xl"] as const);

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "subtle",
        "outlined",
        "glass",
      ] as const);

      // Validate iconType
      validator.validateEnum("iconType", iconType, [
        "default",
        "success",
        "error",
        "warning",
        "info",
        "search",
        "folder",
        "file",
        "inbox",
        "lock",
        "key",
        "user",
        "users",
        "settings",
        "cloud",
        "wifi",
      ] as const);

      // Validate iconColor
      validator.validateEnum("iconColor", iconColor, [
        "primary",
        "secondary",
        "muted",
        "success",
        "warning",
        "danger",
        "info",
      ] as const);

      // Validate boolean props
      validator.validateType(
        "fullHeight",
        fullHeight,
        "boolean",
        isValidBoolean
      );
      validator.validateType("animated", animated, "boolean", isValidBoolean);
      validator.validateType(
        "showBackground",
        showBackground,
        "boolean",
        isValidBoolean
      );

      // Common validators
      commonValidators.className(validator, className);
    }, [
      size,
      variant,
      iconType,
      iconColor,
      fullHeight,
      animated,
      showBackground,
      className,
    ]);

    return (
      <EmptyContext.Provider value={{ size, variant, animated }}>
        <div
          ref={ref}
          className={cn(
            emptyVariants({ variant, size, fullHeight, animated }),
            showBackground && "bg-background/5",
            className
          )}
          style={{ zIndex }}
          {...props}
        >
          {/* Image */}
          {image && (
            <div
              className={cn(
                "mb-2",
                animated &&
                  "animate-in fade-in-50 slide-in-from-bottom-4 duration-700"
              )}
            >
              <img
                src={image}
                alt="Empty state"
                className={cn(
                  "object-contain",
                  {
                    sm: "w-32 h-32",
                    md: "w-40 h-40",
                    lg: "w-48 h-48",
                    xl: "w-64 h-64",
                  }[size]
                )}
              />
            </div>
          )}

          {/* Icon */}
          {!image && (icon || iconType) && (
            <div
              className={cn(
                iconContainerVariants({ size, iconColor, animated })
              )}
            >
              {icon || getPresetIcon(iconType, size)}
            </div>
          )}

          {/* Content */}
          {children ? (
            <div className="w-full">{children}</div>
          ) : (
            <>
              {/* Title */}
              {title && (
                <h3
                  className={cn(
                    titleVariants({ size }),
                    animated &&
                      "animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-100"
                  )}
                >
                  {title}
                </h3>
              )}

              {/* Description */}
              {description && (
                <p
                  className={cn(
                    descriptionVariants({ size }),
                    animated &&
                      "animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-200"
                  )}
                >
                  {description}
                </p>
              )}

              {/* Action */}
              {action && (
                <div
                  className={cn(
                    "mt-2",
                    animated &&
                      "animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-300"
                  )}
                >
                  {action}
                </div>
              )}

              {/* Extra */}
              {extra && (
                <div
                  className={cn(
                    "mt-2",
                    animated &&
                      "animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-400"
                  )}
                >
                  {extra}
                </div>
              )}
            </>
          )}
        </div>
      </EmptyContext.Provider>
    );
  }
);

Empty.displayName = "Empty";

// ===== Composable Subcomponents =====

export const EmptyIcon = React.forwardRef<HTMLDivElement, EmptyIconProps>(
  ({ children, iconType, iconColor = "muted", className, ...props }, ref) => {
    const context = useContext(EmptyContext);
    const size = context.size || "md";
    const animated = context.animated ?? true;

    return (
      <div
        ref={ref}
        className={cn(
          iconContainerVariants({ size, iconColor, animated }),
          className
        )}
        {...props}
      >
        {children || (iconType && getPresetIcon(iconType, size))}
      </div>
    );
  }
);

EmptyIcon.displayName = "EmptyIcon";

export const EmptyImage = React.forwardRef<HTMLImageElement, EmptyImageProps>(
  ({ src, alt = "Empty state", className, ...props }, ref) => {
    const context = useContext(EmptyContext);
    const size = context.size || "md";
    const animated = context.animated ?? true;

    return (
      <div
        className={cn(
          "mb-2",
          animated &&
            "animate-in fade-in-50 slide-in-from-bottom-4 duration-700"
        )}
      >
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn(
            "object-contain",
            {
              sm: "w-32 h-32",
              md: "w-40 h-40",
              lg: "w-48 h-48",
              xl: "w-64 h-64",
            }[size],
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

EmptyImage.displayName = "EmptyImage";

export const EmptyTitle = React.forwardRef<HTMLHeadingElement, EmptyTitleProps>(
  ({ children, className, ...props }, ref) => {
    const context = useContext(EmptyContext);
    const size = context.size || "md";
    const animated = context.animated ?? true;

    return (
      <h3
        ref={ref}
        className={cn(
          titleVariants({ size }),
          animated &&
            "animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-100",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

EmptyTitle.displayName = "EmptyTitle";

export const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  EmptyDescriptionProps
>(({ children, className, ...props }, ref) => {
  const context = useContext(EmptyContext);
  const size = context.size || "md";
  const animated = context.animated ?? true;

  return (
    <p
      ref={ref}
      className={cn(
        descriptionVariants({ size }),
        animated &&
          "animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-200",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

EmptyDescription.displayName = "EmptyDescription";

export const EmptyActions = React.forwardRef<HTMLDivElement, EmptyActionsProps>(
  ({ children, className, ...props }, ref) => {
    const context = useContext(EmptyContext);
    const animated = context.animated ?? true;

    return (
      <div
        ref={ref}
        className={cn(
          "mt-2",
          animated &&
            "animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EmptyActions.displayName = "EmptyActions";

export const EmptyExtra = React.forwardRef<HTMLDivElement, EmptyExtraProps>(
  ({ children, className, ...props }, ref) => {
    const context = useContext(EmptyContext);
    const animated = context.animated ?? true;

    return (
      <div
        ref={ref}
        className={cn(
          "mt-2",
          animated &&
            "animate-in fade-in-50 slide-in-from-bottom-2 duration-500 delay-400",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EmptyExtra.displayName = "EmptyExtra";

export type { EmptyProps };
