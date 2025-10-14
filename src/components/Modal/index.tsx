// Main Modal component
export { Modal, default } from "./Modal";

// Sub-components
export {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalTrigger,
  ModalCloseButton,
} from "./ModalComponents";

// Overlay and Content components (if needed separately)
export { ModalOverlay, ModalContent } from "./ModalOverlay";

// Types
export type { ModalProps, ModalContextValue } from "./Modal.types";
export type {
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalTriggerProps,
  ModalCloseButtonProps,
  ModalOverlayProps,
  ModalContentProps,
} from "./Modal.subcomponents.types";
