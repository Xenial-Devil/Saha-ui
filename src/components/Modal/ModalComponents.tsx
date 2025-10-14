import { forwardRef, useContext, createContext } from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import type {
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalTriggerProps,
  ModalCloseButtonProps,
} from "./Modal.subcomponents.types";
import type { ModalContextValue } from "./Modal.types";

// Context for modal state
export const ModalContext = createContext<ModalContextValue | null>(null);

// Hook for compound components
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal compound components must be used within Modal");
  }
  return context;
};

/**
 * ModalHeader - Custom header for component-based API
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, showCloseButton = true, className }, ref) => {
    const { onClose } = useModalContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between p-6 border-b border-border shrink-0",
          className
        )}
      >
        <div className="flex-1">{children}</div>
        {showCloseButton && <ModalCloseButton onClick={onClose} />}
      </div>
    );
  }
);

ModalHeader.displayName = "ModalHeader";

/**
 * ModalBody - Custom body for component-based API
 */
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, scrollable = true, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 min-h-0 p-6",
          scrollable && "overflow-y-auto",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = "ModalBody";

/**
 * ModalFooter - Custom footer for component-based API
 */
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
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

ModalFooter.displayName = "ModalFooter";

/**
 * ModalTitle - Semantic title component
 */
export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
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

ModalTitle.displayName = "ModalTitle";

/**
 * ModalDescription - Semantic description component
 */
export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  ModalDescriptionProps
>(({ children, className }, ref) => {
  return (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
});

ModalDescription.displayName = "ModalDescription";

/**
 * ModalCloseButton - Close button component
 */
export const ModalCloseButton = forwardRef<
  HTMLButtonElement,
  ModalCloseButtonProps
>(({ onClick, className }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        "ml-4 rounded-lg p-2 hover:bg-muted transition-colors shrink-0",
        className
      )}
      aria-label="Close modal"
    >
      <X className="h-5 w-5" />
    </button>
  );
});

ModalCloseButton.displayName = "ModalCloseButton";

/**
 * ModalTrigger - Trigger button for opening modal
 */
export const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    return (
      <button ref={ref} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }
);

ModalTrigger.displayName = "ModalTrigger";
