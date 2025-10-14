import { forwardRef, useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "./Modal.types";
import { ModalContext, ModalCloseButton } from "./ModalComponents";
import { ModalOverlay, ModalContent } from "./ModalOverlay";

/**
 * Modal Component
 *
 * Advanced modal/dialog component with smooth animations, compound components,
 * accessibility, and extensive customization options.
 *
 * Supports BOTH prop-based and component-based APIs:
 *
 * @example Prop-based API
 * <Modal open={open} onOpenChange={setOpen} title="Title" footer={<button>OK</button>}>
 *   Content
 * </Modal>
 *
 * @example Component-based API
 * <Modal open={open} onOpenChange={setOpen}>
 *   <ModalHeader>
 *     <ModalTitle>Custom Header</ModalTitle>
 *   </ModalHeader>
 *   <ModalBody>Content</ModalBody>
 *   <ModalFooter>Actions</ModalFooter>
 * </Modal>
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
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
    const modalRef = useRef<HTMLDivElement>(null);

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

    // Close modal
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
      if (!focusTrap || !open || !modalRef.current) return;

      const modal = modalRef.current;
      const focusableElements = modal.querySelectorAll<HTMLElement>(
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

      modal.addEventListener("keydown", handleTabKey);
      return () => {
        clearTimeout(focusTimer);
        modal.removeEventListener("keydown", handleTabKey);
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
          child?.type?.displayName === "ModalHeader" ||
          child?.type?.displayName === "ModalBody" ||
          child?.type?.displayName === "ModalFooter"
      );

    const modalContent = (
      <ModalContext.Provider value={{ open, onClose: handleClose }}>
        {/* Overlay */}
        <ModalOverlay
          backdrop={backdrop}
          nested={nested}
          onClick={closeOnOverlayClick ? handleClose : undefined}
          state={animationState}
          className={overlayClassName}
        />

        {/* Modal Content */}
        <ModalContent
          variant={variant}
          size={size}
          rounded={rounded}
          animation={animation}
          centered={centered}
          fullScreen={fullScreen}
          scrollBehavior={scrollBehavior}
          state={animationState}
          nested={nested}
          onClick={(e) => e.stopPropagation()}
          innerRef={(node) => {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            if (node) {
              modalRef.current = node;
            }
          }}
          role="dialog"
          aria-modal={true}
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
                    <ModalCloseButton onClick={handleClose} />
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
        </ModalContent>
      </ModalContext.Provider>
    );

    // Portal rendering
    const portalContainer = portalTarget || document.body;
    return createPortal(modalContent, portalContainer);
  }
);

Modal.displayName = "Modal";

export default Modal;
