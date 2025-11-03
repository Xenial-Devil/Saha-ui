import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type {
  DialogOverlayProps,
  DialogContentProps,
} from "./Dialog.subcomponents.types";
import { contentVariants, overlayVariants } from "./Dialog.styles";

/**
 * DialogOverlay - Backdrop overlay component
 */
export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  (
    { backdrop = "default", nested = false, onClick, state, className },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          overlayVariants({ backdrop, state }),
          nested && "bg-black/20 backdrop-blur-sm",
          className
        )}
        onClick={onClick}
        aria-hidden="true"
        style={nested ? { zIndex: 60 } : undefined}
      />
    );
  }
);

DialogOverlay.displayName = "DialogOverlay";


/**
 * DialogContent - Main content container with animations
 */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      rounded = "default",
      animation = "scale",
      centered = true,
      fullScreen = false,
      scrollBehavior = "inside",
      state,
      nested = false,
      onClick,
      innerRef,
      role,
      "aria-Dialog": ariaDialog,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={innerRef || ref}
        role={role}
        aria-Dialog={ariaDialog}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={cn(
          contentVariants({
            variant,
            size,
            rounded,
            animation,
            centered: fullScreen ? false : centered,
            fullScreen,
            state,
          }),
          scrollBehavior === "outside" && "max-h-[90vh] overflow-y-auto",
          scrollBehavior === "inside" && "max-h-[90vh]",
          className
        )}
        onClick={onClick}
        style={nested ? { zIndex: 60 } : undefined}
      >
        {children}
      </div>
    );
  }
);

DialogContent.displayName = "DialogContent";
