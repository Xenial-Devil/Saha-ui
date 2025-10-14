import { createContext, useContext, forwardRef } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import type { DrawerContextValue } from "./Drawer.types";
import type {
  DrawerTriggerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerCloseProps,
  DrawerCloseButtonProps,
} from "./Drawer.subcomponents.types";

/**
 * Drawer Context
 */
export const DrawerContext = createContext<DrawerContextValue | null>(null);

/**
 * Hook to use drawer context
 */
export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer");
  }
  return context;
};

/**
 * DrawerTrigger - Button to open the drawer
 */
export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { setOpen } = useDrawerContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(true);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DrawerTrigger.displayName = "DrawerTrigger";

/**
 * DrawerHeader - Header section with optional close button
 */
export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, showCloseButton = true, className, ...props }, ref) => {
    const { setOpen } = useDrawerContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between p-6 border-b border-border",
          className
        )}
        {...props}
      >
        <div className="flex-1">{children}</div>
        {showCloseButton && (
          <DrawerCloseButton onClick={() => setOpen(false)} />
        )}
      </div>
    );
  }
);

DrawerHeader.displayName = "DrawerHeader";

/**
 * DrawerBody - Main content area
 */
export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 p-6 overflow-y-auto", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = "DrawerBody";

/**
 * DrawerFooter - Footer section with actions
 */
export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, align = "right", className, ...props }, ref) => {
    const alignClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 p-6 border-t border-border",
          alignClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerFooter.displayName = "DrawerFooter";

/**
 * DrawerTitle - Semantic title component
 */
export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          "text-lg font-semibold text-foreground leading-none",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

DrawerTitle.displayName = "DrawerTitle";

/**
 * DrawerDescription - Semantic description component
 */
export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground mt-2", className)}
      {...props}
    >
      {children}
    </p>
  );
});

DrawerDescription.displayName = "DrawerDescription";

/**
 * DrawerClose - Wrapper that closes drawer on click
 */
export const DrawerClose = ({
  children,
  className,
  onClick,
}: DrawerCloseProps) => {
  const { setOpen } = useDrawerContext();

  const handleClick = () => {
    setOpen(false);
    onClick?.();
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

DrawerClose.displayName = "DrawerClose";

/**
 * DrawerCloseButton - X icon button
 */
export const DrawerCloseButton = ({
  onClick,
  className,
}: DrawerCloseButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:pointer-events-none",
        "ml-4 -mt-1",
        className
      )}
      aria-label="Close drawer"
    >
      <X className="h-4 w-4" />
    </button>
  );
};

DrawerCloseButton.displayName = "DrawerCloseButton";
