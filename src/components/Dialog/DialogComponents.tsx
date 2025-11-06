"use client";

import { forwardRef, useContext, createContext } from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import type {
  DialogHeaderProps,
  DialogBodyProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogTriggerProps,
  DialogCloseButtonProps,
} from "./Dialog.subcomponents.types";
import type { DialogContextValue } from "./Dialog.types";

// Context for Dialog state
export const DialogContext = createContext<DialogContextValue | null>(null);

// Hook for compound components
export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog compound components must be used within Dialog");
  }
  return context;
};

/**
 * DialogHeader - Custom header for component-based API
 */
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
        {showCloseButton && <DialogCloseButton onClick={onClose} />}
      </div>
    );
  }
);

DialogHeader.displayName = "DialogHeader";

/**
 * DialogBody - Custom body for component-based API
 */
export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
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

DialogBody.displayName = "DialogBody";

/**
 * DialogFooter - Custom footer for component-based API
 */
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
 * DialogCloseButton - Close button component
 */
export const DialogCloseButton = forwardRef<
  HTMLButtonElement,
  DialogCloseButtonProps
>(({ onClick, className }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        "ml-4 rounded-lg p-2 hover:bg-muted transition-colors shrink-0",
        className
      )}
      aria-label="Close Dialog"
    >
      <X className="h-5 w-5" />
    </button>
  );
});

DialogCloseButton.displayName = "DialogCloseButton";

/**
 * DialogTrigger - Trigger button for opening Dialog
 */
export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    return (
      <button ref={ref} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }
);

DialogTrigger.displayName = "DialogTrigger";
