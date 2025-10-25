import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { DrawerContext } from "./DrawerComponents";
import { DrawerOverlay, DrawerContent } from "./DrawerOverlay";
import type { DrawerProps } from "./Drawer.types";
import {
  createValidator,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";

/**
 * Drawer - Side panel component with advanced features
 *
 * @example
 * ```tsx
 * <Drawer position="right" size="md">
 *   <DrawerTrigger>Open Drawer</DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Title</DrawerTitle>
 *       <DrawerDescription>Description</DrawerDescription>
 *     </DrawerHeader>
 *     <DrawerBody>Content</DrawerBody>
 *     <DrawerFooter>
 *       <Button>Submit</Button>
 *       <DrawerClose><Button variant="outline">Cancel</Button></DrawerClose>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */
export const Drawer = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  position = "right",
  size = "md",
  showOverlay = true,
  backdrop = "default",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  lockScroll = true,
  portalTarget,
  animation = "slide",
  zIndex = 50,
  nested = false,
}: DrawerProps) => {
  // State management
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationState, setAnimationState] = useState<"open" | "closed">(
    "closed"
  );

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Development-only validation
  useEffect(() => {
    const validator = createValidator("Drawer");

    // Validate position
    validator.validateEnum("position", position, [
      "left",
      "right",
      "top",
      "bottom",
    ] as const);

    // Validate size
    validator.validateEnum("size", size, [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "full",
    ] as const);

    // Validate backdrop
    validator.validateEnum("backdrop", backdrop, [
      "default",
      "blur",
      "transparent",
      "dark",
    ] as const);

    // Validate animation
    validator.validateEnum("animation", animation, [
      "slide",
      "fade",
      "scale",
      "none",
    ] as const);

    // Validate boolean props
    validator.validateType(
      "showOverlay",
      showOverlay,
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
    validator.validateType("lockScroll", lockScroll, "boolean", isValidBoolean);
    validator.validateType("nested", nested, "boolean", isValidBoolean);

    // Validate zIndex
    validator.validateType("zIndex", zIndex, "number", isValidNumber);

    // Validate children
    if (!children) {
      validator.warn("Drawer should have children content");
    }
  }, [
    position,
    size,
    backdrop,
    animation,
    showOverlay,
    closeOnOverlayClick,
    closeOnEscape,
    lockScroll,
    nested,
    zIndex,
    children,
  ]);

  // Handle open state changes
  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  // Animation state management
  useEffect(() => {
    if (open) {
      setIsAnimating(true);
      // Double RAF for smooth animation start
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationState("open");
        });
      });
    } else {
      setAnimationState("closed");
      // Wait for animation to complete before removing from DOM
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Match animation duration
      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (!lockScroll || nested) return;

    if (open) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open, lockScroll, nested]);

  // Focus management
  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus drawer content
      setTimeout(() => {
        drawerRef.current?.focus();
      }, 100);
    } else if (previousActiveElement.current) {
      // Restore focus
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, setOpen]);

  // Handle overlay click
  const handleOverlayClick = useCallback(() => {
    if (closeOnOverlayClick) {
      setOpen(false);
    }
  }, [closeOnOverlayClick, setOpen]);

  // Don't render if not open and not animating
  if (!open && !isAnimating) {
    return (
      <DrawerContext.Provider
        value={{
          open,
          setOpen,
          position,
          size,
          backdrop,
          animation,
          closeOnOverlayClick,
          showOverlay,
          nested,
          zIndex,
        }}
      >
        {children}
      </DrawerContext.Provider>
    );
  }

  // Find trigger and content from children
  const childArray = Array.isArray(children) ? children : [children];
  const trigger = childArray.find(
    (child) =>
      (child as ReactElement)?.type &&
      typeof (child as ReactElement).type !== "string" &&
      ((child as ReactElement).type as any).displayName === "DrawerTrigger"
  );
  const content = childArray.find(
    (child) =>
      (child as ReactElement)?.type &&
      typeof (child as ReactElement).type !== "string" &&
      ((child as ReactElement).type as any).displayName === "DrawerContent"
  );

  const drawerPortalContent = (
    <>
      {/* Overlay */}
      {showOverlay && (
        <DrawerOverlay
          backdrop={backdrop}
          nested={nested}
          onClick={handleOverlayClick}
          state={animationState}
        />
      )}
      {/* Content */}
      <DrawerContent
        position={position}
        size={size}
        animation={animation}
        state={animationState}
        nested={nested}
        innerRef={drawerRef as React.RefObject<HTMLDivElement>}
        role="dialog"
        aria-modal={true}
        aria-label="Drawer"
        onClick={(e) => e.stopPropagation()}
      >
        {content?.props?.children}
      </DrawerContent>
    </>
  );

  // Render in portal
  const target = portalTarget || document.body;
  return (
    <DrawerContext.Provider
      value={{
        open,
        setOpen,
        position,
        size,
        backdrop,
        animation,
        closeOnOverlayClick,
        showOverlay,
        nested,
        zIndex,
      }}
    >
      {trigger}
      {createPortal(drawerPortalContent, target)}
    </DrawerContext.Provider>
  );
};

Drawer.displayName = "Drawer";

export default Drawer;
