import {
  forwardRef,
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { DialogProps, DialogContextValue } from "./Dialog.types";
import { X } from "lucide-react";

/**
 * Dialog Component
 *
 * Advanced Dialog/dialog component with smooth animations, compound components,
 * accessibility, and extensive customization options.
 *
 * Supports BOTH prop-based and component-based APIs:
 *
 * @example Prop-based API
 * <Dialog open={open} onOpenChange={setOpen} title="Title" footer={<button>OK</button>}>
 *   Content
 * </Dialog>
 *
 * @example Component-based API
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogHeader>
 *     <DialogTitle>Custom Header</DialogTitle>
 *   </DialogHeader>
 *   <DialogBody>Content</DialogBody>
 *   <DialogFooter>Actions</DialogFooter>
 * </Dialog>
 */

// Context for Dialog state
const DialogContext = createContext<DialogContextValue | null>(null);

// Hook for compound components
const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog compound components must be used within Dialog");
  }
  return context;
};

/**
 * Overlay variants with smooth animations
 */
const overlayVariants = cva(
  [
    "fixed inset-0 z-50",
    "transition-all duration-500 ease-out",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  ],
  {
    variants: {
      backdrop: {
        default: "bg-black/50",
        blur: "bg-black/30 backdrop-blur-md",
        transparent: "bg-transparent",
        dark: "bg-black/80",
      },
    },
    defaultVariants: {
      backdrop: "default",
    },
  }
);

/**
 * Content variants with enhanced animations
 */
const contentVariants = cva(
  [
    "fixed z-50 w-full",
    "transition-all duration-500 ease-out",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "shadow-2xl",
  ],
  {
    variants: {
      variant: {
        default: "bg-background border border-border",
        primary: "bg-primary/5 border-2 border-primary/30",
        secondary: "bg-secondary/5 border-2 border-secondary/30",
        accent: "bg-accent/5 border-2 border-accent/30",
        success: "bg-success/5 border-2 border-success/30",
        warning: "bg-warning/5 border-2 border-warning/30",
        error: "bg-destructive/5 border-2 border-destructive/30",
        info: "bg-info/5 border-2 border-info/30",
        glass: "bg-background/80 backdrop-blur-xl border border-white/20",
      },
      size: {
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        full: "max-w-full w-full h-full",
      },
      rounded: {
        default: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        "2xl": "rounded-3xl",
        full: "rounded-full",
        none: "rounded-none",
      },
      animation: {
        fade: "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        scale:
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "slide-up":
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        "slide-down":
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        "slide-left":
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        "slide-right":
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        zoom: "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-75 data-[state=open]:zoom-in-125",
        bounce:
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:animate-bounce-in",
      },
      centered: {
        true: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        false: "top-20 left-1/2 -translate-x-1/2",
      },
      fullScreen: {
        true: "!max-w-full !w-screen !h-screen !rounded-none top-0 left-0 !translate-x-0 !translate-y-0",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
      animation: "scale",
      centered: true,
      fullScreen: false,
    },
  }
);

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      // Visibility
      open: controlledOpen,
      onOpenChange,
      defaultOpen = false,

      // Styling
      variant = "default",
      size = "md",
      rounded = "default",

      // Content (prop-based API)
      title,
      description,
      children,
      footer,

      // Header Options
      showHeader = true,
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,

      // Animations
      animation = "scale",

      // Layout
      centered = true,
      scrollBehavior = "inside",
      fullScreen = false,

      // Backdrop
      backdrop = "default",
      preventClose = false,

      // Callbacks
      onClose,
      onOpen,
      onAnimationComplete,

      // Accessibility
      ariaLabel,
      ariaDescribedBy,

      // Advanced Features
      lockScroll = true,
      focusTrap = true,
      returnFocus = true,
      portalTarget,
      nested = false,

      // Custom Classes
      className,
      overlayClassName,
      contentClassName,
      headerClassName,
      bodyClassName,
      footerClassName,
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [isAnimating, setIsAnimating] = useState(false);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const DialogRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    // Handle open state changes
    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (preventClose && !newOpen) return;

        if (!isControlled) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);

        if (newOpen) {
          onOpen?.();
        } else {
          onClose?.();
        }
      },
      [preventClose, isControlled, onOpenChange, onOpen, onClose]
    );

    // Close Dialog
    const handleClose = useCallback(() => {
      if (preventClose) return;
      handleOpenChange(false);
    }, [preventClose, handleOpenChange]);

    // Lock body scroll
    useEffect(() => {
      if (!lockScroll || !open || nested) return;

      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      // Prevent scroll
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }, [open, lockScroll, nested]);

    // Handle escape key
    useEffect(() => {
      if (!closeOnEscape || !open) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, closeOnEscape, handleClose]);

    // Focus trap
    useEffect(() => {
      if (!focusTrap || !open || !DialogRef.current) return;

      const Dialog = DialogRef.current;
      const focusableElements = Dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Store previously focused element
      if (returnFocus && !nested) {
        previousActiveElement.current = document.activeElement as HTMLElement;
      }

      // Focus first element
      firstElement?.focus();

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      };

      Dialog.addEventListener("keydown", handleTabKey);
      return () => Dialog.removeEventListener("keydown", handleTabKey);
    }, [open, focusTrap, returnFocus, nested]);

    // Return focus on close
    useEffect(() => {
      if (!open && returnFocus && previousActiveElement.current && !nested) {
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
    }, [open, returnFocus, nested]);

    // Animation complete callback
    useEffect(() => {
      if (!open) return;

      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onAnimationComplete?.();
      }, 500);

      return () => clearTimeout(timer);
    }, [open, onAnimationComplete]);

    if (!open && !isAnimating) return null;

    // Check if using compound components
    const hasCompoundComponents =
      Array.isArray(children) &&
      children.some(
        (child: any) =>
          child?.type?.displayName === "DialogHeader" ||
          child?.type?.displayName === "DialogBody" ||
          child?.type?.displayName === "DialogFooter"
      );

    const DialogContent = (
      <DialogContext.Provider value={{ open, onClose: handleClose }}>
        {/* Overlay */}
        <div
          className={cn(
            overlayVariants({ backdrop }),
            nested && "bg-black/30 backdrop-blur-sm",
            overlayClassName
          )}
          data-state={open ? "open" : "closed"}
          onClick={closeOnOverlayClick ? handleClose : undefined}
          aria-hidden="true"
          style={nested ? { zIndex: 60 } : undefined}
        />

        {/* Dialog Content */}
        <div
          ref={(node) => {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            if (node) {
              DialogRef.current = node;
            }
          }}
          role="dialog"
          aria-Dialog="true"
          aria-label={
            ariaLabel || (typeof title === "string" ? title : undefined)
          }
          aria-describedby={ariaDescribedBy}
          data-state={open ? "open" : "closed"}
          className={cn(
            contentVariants({
              variant,
              size,
              rounded,
              animation,
              centered,
              fullScreen,
            }),
            "flex flex-col",
            scrollBehavior === "outside" ? "max-h-[90vh]" : "",
            className,
            contentClassName
          )}
          onClick={(e) => e.stopPropagation()}
          style={nested ? { zIndex: 60 } : undefined}
        >
          {/* Render compound components OR prop-based content */}
          {hasCompoundComponents ? (
            children
          ) : (
            <>
              {/* Header (prop-based) */}
              {showHeader && (title || description || showCloseButton) && (
                <div
                  className={cn(
                    "flex items-start justify-between p-6 border-b border-border shrink-0",
                    headerClassName
                  )}
                >
                  <div className="flex-1">
                    {title && (
                      <h2 className="text-xl font-semibold text-foreground mb-1">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p className="text-sm text-muted-foreground">
                        {description}
                      </p>
                    )}
                  </div>
                  {showCloseButton && !preventClose && (
                    <button
                      onClick={handleClose}
                      className="ml-4 rounded-lg p-2 hover:bg-muted transition-colors shrink-0"
                      aria-label="Close Dialog"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Body (prop-based) */}
              <div
                className={cn(
                  "flex-1 p-6",
                  scrollBehavior === "inside" ? "overflow-y-auto" : "",
                  bodyClassName
                )}
              >
                {children}
              </div>

              {/* Footer (prop-based) */}
              {footer && (
                <div
                  className={cn(
                    "flex items-center justify-end gap-3 p-6 border-t border-border shrink-0",
                    footerClassName
                  )}
                >
                  {footer}
                </div>
              )}
            </>
          )}
        </div>
      </DialogContext.Provider>
    );

    // Portal rendering
    const portalContainer = portalTarget || document.body;
    return createPortal(DialogContent, portalContainer);
  }
);

Dialog.displayName = "Dialog";

// ============================================================================
// COMPOUND COMPONENTS
// ============================================================================

/**
 * DialogHeader - Custom header for component-based API
 */
interface DialogHeaderProps {
  children: ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, showCloseButton = true, className }, ref) => {
    const { onClose } = useDialogContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between p-6 border-b border-border shrink-0",
          className
        )}
      >
        <div className="flex-1">{children}</div>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="ml-4 rounded-lg p-2 hover:bg-muted transition-colors shrink-0"
            aria-label="Close Dialog"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    );
  }
);

DialogHeader.displayName = "DialogHeader";

/**
 * DialogBody - Custom body for component-based API
 */
interface DialogBodyProps {
  children: ReactNode;
  scrollable?: boolean;
  className?: string;
}

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, scrollable = true, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 p-6", scrollable && "overflow-y-auto", className)}
      >
        {children}
      </div>
    );
  }
);

DialogBody.displayName = "DialogBody";

/**
 * DialogFooter - Custom footer for component-based API
 */
interface DialogFooterProps {
  children: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, align = "right", className }, ref) => {
    const alignClass = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    }[align];

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 p-6 border-t border-border shrink-0",
          alignClass,
          className
        )}
      >
        {children}
      </div>
    );
  }
);

DialogFooter.displayName = "DialogFooter";

/**
 * DialogTitle - Semantic title component
 */
interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn("text-xl font-semibold text-foreground mb-1", className)}
      >
        {children}
      </h2>
    );
  }
);

DialogTitle.displayName = "DialogTitle";

/**
 * DialogDescription - Semantic description component
 */
interface DialogDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ children, className }, ref) => {
  return (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
});

DialogDescription.displayName = "DialogDescription";

/**
 * DialogTrigger - Trigger button for opening Dialog
 */
export const DialogTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, onClick, ...props }, ref) => {
  return (
    <button ref={ref} onClick={onClick} {...props}>
      {children}
    </button>
  );
});

DialogTrigger.displayName = "DialogTrigger";

export default Dialog;
