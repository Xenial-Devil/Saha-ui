// Main Dialog component
export { Dialog, default } from "./Dialog";

// Sub-components
export {
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogCloseButton,
} from "./DialogComponents";

// Overlay and Content components (if needed separately)
export { DialogOverlay, DialogContent } from "./DialogOverlay";

// Types
export type { DialogProps, DialogContextValue } from "./Dialog.types";
export type {
  DialogHeaderProps,
  DialogBodyProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogTriggerProps,
  DialogCloseButtonProps,
  DialogOverlayProps,
  DialogContentProps,
} from "./Dialog.subcomponents.types";
