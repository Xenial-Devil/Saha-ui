import { forwardRef, useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import type { DialogProps } from "./Dialog.types";
import { DialogContext, DialogCloseButton } from "./DialogComponents";
import {
  DialogOverlay,
  DialogContent as DialogContentWrapper,
} from "./DialogOverlay";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";

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
    const [animationState, setAnimationState] = useState<"open" | "closed">(
      "closed"
    );
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const DialogRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Dialog");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "glass",
        "gradient",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, [
        "sm",
        "md",
        "lg",
        "xl",
        "full",
      ] as const);

      // Validate rounded
      validator.validateEnum("rounded", rounded, [
        "none",
        "sm",
        "default",
        "lg",
        "xl",
        "full",
      ] as const);

      // Validate animation
      validator.validateEnum("animation", animation, [
        "scale",
        "fade",
        "slide-up",
        "slide-down",
      ] as const);

      // Validate scrollBehavior
      validator.validateEnum("scrollBehavior", scrollBehavior, [
        "inside",
        "outside",
      ] as const);

      // Validate backdrop
      validator.validateEnum("backdrop", backdrop, [
        "default",
        "blur",
        "transparent",
      ] as const);

      // Validate boolean props
      validator.validateType(
        "showHeader",
        showHeader,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "showCloseButton",
        showCloseButton,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "closeOnOverlayClick",
        closeOnOverlayClick,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "closeOnEscape",
        closeOnEscape,
        "boolean",
        isValidBoolean
      );
      validator.validateType("centered", centered, "boolean", isValidBoolean);
      validator.validateType(
        "fullScreen",
        fullScreen,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "preventClose",
        preventClose,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "lockScroll",
        lockScroll,
        "boolean",
        isValidBoolean
      );
      validator.validateType("focusTrap", focusTrap, "boolean", isValidBoolean);
      validator.validateType(
        "returnFocus",
        returnFocus,
        "boolean",
        isValidBoolean
      );
      validator.validateType("nested", nested, "boolean", isValidBoolean);

      // Validate content
      if (!title && !children) {
        validator.warn(
          "Dialog should have title or children for accessibility"
        );
      }

      // Common validators
      commonValidators.className(validator, contentClassName);
      commonValidators.className(validator, overlayClassName);
    }, [
      variant,
      size,
      rounded,
      animation,
      scrollBehavior,
      backdrop,
      showHeader,
      showCloseButton,
      closeOnOverlayClick,
      closeOnEscape,
      centered,
      fullScreen,
      preventClose,
      lockScroll,
      focusTrap,
      returnFocus,
      nested,
      title,
      children,
      contentClassName,
      overlayClassName,
    ]);

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

    // Update animation state when open changes
    useEffect(() => {
      if (open) {
        setIsAnimating(true);
        // Small delay to trigger animation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimationState("open");
          });
        });
      } else {
        setAnimationState("closed");
        // Wait for animation to complete before removing from DOM
        // Slide animations use 500ms, others use 300ms
        const duration = animation?.startsWith("slide-") ? 500 : 300;
        const timer = setTimeout(() => {
          setIsAnimating(false);
          onAnimationComplete?.();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [open, onAnimationComplete, animation]);

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

      // Focus first element after animation
      const focusTimer = setTimeout(() => {
        firstElement?.focus();
      }, 100);

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
      return () => {
        clearTimeout(focusTimer);
        Dialog.removeEventListener("keydown", handleTabKey);
      };
    }, [open, focusTrap, returnFocus, nested]);

    // Return focus on close
    useEffect(() => {
      if (!open && returnFocus && previousActiveElement.current && !nested) {
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
    }, [open, returnFocus, nested]);

    // Don't render if not open and not animating
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
        <DialogOverlay
          backdrop={backdrop}
          nested={nested}
          onClick={closeOnOverlayClick ? handleClose : undefined}
          state={animationState}
          className={overlayClassName}
        />

        {/* Dialog Content */}
        <DialogContentWrapper
          variant={variant}
          size={size}
          rounded={rounded}
          animation={animation}
          centered={centered}
          fullScreen={fullScreen}
          scrollBehavior={scrollBehavior}
          state={animationState}
          nested={nested}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          innerRef={(node: HTMLDivElement | null) => {
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
          aria-Dialog={true}
          aria-label={
            ariaLabel || (typeof title === "string" ? title : undefined)
          }
          aria-describedby={ariaDescribedBy}
          className={contentClassName}
        >
          {/* Render compound components OR prop-based content */}
          {hasCompoundComponents ? (
            children
          ) : (
            <>
              {/* Header (prop-based) */}
              {showHeader && (title || description || showCloseButton) && (
                <div
                  className={`flex items-start justify-between p-6 border-b border-border shrink-0 ${
                    headerClassName || ""
                  }`}
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
                    <DialogCloseButton onClick={handleClose} />
                  )}
                </div>
              )}

              {/* Body (prop-based) */}
              <div
                className={`flex-1 min-h-0 p-6 ${
                  scrollBehavior === "inside" ? "overflow-y-auto" : ""
                } ${bodyClassName || ""}`}
              >
                {children}
              </div>

              {/* Footer (prop-based) */}
              {footer && (
                <div
                  className={`flex items-center justify-end gap-3 p-6 border-t border-border shrink-0 ${
                    footerClassName || ""
                  }`}
                >
                  {footer}
                </div>
              )}
            </>
          )}
        </DialogContentWrapper>
      </DialogContext.Provider>
    );

    // Portal rendering
    const portalContainer = portalTarget || document.body;
    return createPortal(DialogContent, portalContainer);
  }
);

Dialog.displayName = "Dialog";

export default Dialog;
