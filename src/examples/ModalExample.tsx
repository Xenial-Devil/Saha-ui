import { useState } from "react";
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from "../components/Modal/index";
import { Check, AlertTriangle, Sparkles } from "lucide-react";

export default function ModalExample() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [variantModals, setVariantModals] = useState({
    default: false,
    primary: false,
    secondary: false,
    accent: false,
    success: false,
    warning: false,
    error: false,
    info: false,
    glass: false,
  });
  const [sizeModals, setSizeModals] = useState({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    "2xl": false,
    "3xl": false,
    "4xl": false,
    full: false,
  });
  const [animationModals, setAnimationModals] = useState({
    fade: false,
    scale: false,
    "slide-up": false,
    "slide-down": false,
    "slide-left": false,
    "slide-right": false,
    zoom: false,
    bounce: false,
  });
  const [featureModals, setFeatureModals] = useState({
    withFooter: false,
    noHeader: false,
    noClose: false,
    preventClose: false,
    scrollInside: false,
    scrollOutside: false,
    fullScreen: false,
    notCentered: false,
  });
  const [backdropModals, setBackdropModals] = useState({
    default: false,
    blur: false,
    transparent: false,
    dark: false,
  });
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [nestedInnerModal, setNestedInnerModal] = useState(false);
  const [componentBasedModal, setComponentBasedModal] = useState(false);
  const [customLayoutModal, setCustomLayoutModal] = useState(false);

  const openVariantModal = (variant: keyof typeof variantModals) => {
    setVariantModals((prev) => ({ ...prev, [variant]: true }));
  };

  const closeVariantModal = (variant: keyof typeof variantModals) => {
    setVariantModals((prev) => ({ ...prev, [variant]: false }));
  };

  const openSizeModal = (size: keyof typeof sizeModals) => {
    setSizeModals((prev) => ({ ...prev, [size]: true }));
  };

  const closeSizeModal = (size: keyof typeof sizeModals) => {
    setSizeModals((prev) => ({ ...prev, [size]: false }));
  };

  const openAnimationModal = (animation: keyof typeof animationModals) => {
    setAnimationModals((prev) => ({ ...prev, [animation]: true }));
  };

  const closeAnimationModal = (animation: keyof typeof animationModals) => {
    setAnimationModals((prev) => ({ ...prev, [animation]: false }));
  };

  const openFeatureModal = (feature: keyof typeof featureModals) => {
    setFeatureModals((prev) => ({ ...prev, [feature]: true }));
  };

  const closeFeatureModal = (feature: keyof typeof featureModals) => {
    setFeatureModals((prev) => ({ ...prev, [feature]: false }));
  };

  const openBackdropModal = (backdrop: keyof typeof backdropModals) => {
    setBackdropModals((prev) => ({ ...prev, [backdrop]: true }));
  };

  const closeBackdropModal = (backdrop: keyof typeof backdropModals) => {
    setBackdropModals((prev) => ({ ...prev, [backdrop]: false }));
  };

  return (
    <div className="space-y-16 p-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold">Modal Component</h1>
        <p className="text-muted-foreground">
          Advanced modal/dialog component with animations, accessibility, and
          extensive customization options.
        </p>
      </div>

      {/* Basic Modal */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Modal</h2>
        <button
          onClick={() => setBasicOpen(true)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Open Basic Modal
        </button>

        <Modal
          open={basicOpen}
          onOpenChange={setBasicOpen}
          title="Basic Modal"
          description="This is a simple modal with title and description"
        >
          <p className="text-muted-foreground">
            This is the modal content. You can put any React components here.
            Click outside, press Escape, or click the X button to close.
          </p>
        </Modal>
      </section>

      {/* Component-Based API */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Component-Based API</h2>
        <p className="text-muted-foreground">
          Use compound components for more control over the modal structure
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setComponentBasedModal(true)}
            className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Component-Based Modal
          </button>
          <button
            onClick={() => setCustomLayoutModal(true)}
            className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Custom Layout
          </button>
        </div>

        {/* Component-Based Modal */}
        <Modal
          open={componentBasedModal}
          onOpenChange={setComponentBasedModal}
          variant="primary"
          animation="slide-up"
        >
          <ModalHeader>
            <ModalTitle>Component-Based Modal</ModalTitle>
            <ModalDescription>
              Using ModalHeader, ModalBody, and ModalFooter components
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                This modal uses the component-based API with separate
                ModalHeader, ModalBody, and ModalFooter components.
              </p>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm">
                  ✨ More flexibility with custom layouts
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => setComponentBasedModal(false)}
              className="px-4 py-2 rounded-lg border border-border hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={() => setComponentBasedModal(false)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Confirm
            </button>
          </ModalFooter>
        </Modal>

        {/* Custom Layout Modal */}
        <Modal
          open={customLayoutModal}
          onOpenChange={setCustomLayoutModal}
          variant="glass"
          size="lg"
          animation="zoom"
        >
          <ModalHeader showCloseButton={false}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <ModalTitle>Custom Layout</ModalTitle>
                <ModalDescription>
                  Complete control over your modal structure
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>
          <ModalBody scrollable={false}>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <h3 className="font-semibold mb-2">Feature 1</h3>
                <p className="text-sm text-muted-foreground">
                  Custom layout with grid
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-success/10 to-accent/10 border border-success/20">
                <h3 className="font-semibold mb-2">Feature 2</h3>
                <p className="text-sm text-muted-foreground">
                  Gradient backgrounds
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter align="center">
            <button
              onClick={() => setCustomLayoutModal(false)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
            >
              Got it!
            </button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.keys(variantModals).map((variant) => (
            <button
              key={variant}
              onClick={() =>
                openVariantModal(variant as keyof typeof variantModals)
              }
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 capitalize"
            >
              {variant}
            </button>
          ))}
        </div>

        {Object.entries(variantModals).map(([variant, isOpen]) => (
          <Modal
            key={variant}
            open={isOpen}
            onOpenChange={(open: boolean) =>
              !open && closeVariantModal(variant as keyof typeof variantModals)
            }
            variant={variant as any}
            title={`${
              variant.charAt(0).toUpperCase() + variant.slice(1)
            } Modal`}
            description={`This is a ${variant} variant modal`}
          >
            <p className="text-muted-foreground">
              The {variant} variant applies specific styling to the modal
              container and border.
            </p>
          </Modal>
        ))}
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <div className="flex flex-wrap gap-4">
          {Object.keys(sizeModals).map((size) => (
            <button
              key={size}
              onClick={() => openSizeModal(size as keyof typeof sizeModals)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 uppercase"
            >
              {size}
            </button>
          ))}
        </div>

        {Object.entries(sizeModals).map(([size, isOpen]) => (
          <Modal
            key={size}
            open={isOpen}
            onOpenChange={(open: boolean) =>
              !open && closeSizeModal(size as keyof typeof sizeModals)
            }
            size={size as any}
            title={`Size: ${size.toUpperCase()}`}
            description={`This modal has size="${size}"`}
          >
            <p className="text-muted-foreground">
              Different sizes allow you to control the modal width. The 'full'
              size makes the modal take up the entire screen.
            </p>
          </Modal>
        ))}
      </section>

      {/* Animations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Animations</h2>
        <div className="flex flex-wrap gap-4">
          {Object.keys(animationModals).map((animation) => (
            <button
              key={animation}
              onClick={() =>
                openAnimationModal(animation as keyof typeof animationModals)
              }
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 capitalize"
            >
              {animation}
            </button>
          ))}
        </div>

        {Object.entries(animationModals).map(([animation, isOpen]) => (
          <Modal
            key={animation}
            open={isOpen}
            onOpenChange={(open: boolean) =>
              !open &&
              closeAnimationModal(animation as keyof typeof animationModals)
            }
            animation={animation as any}
            title={`Animation: ${animation}`}
            description="Watch how this modal animates"
          >
            <p className="text-muted-foreground">
              This modal uses the{" "}
              <code className="px-1 py-0.5 rounded bg-muted">{animation}</code>{" "}
              animation. Close and reopen to see the animation effect.
            </p>
          </Modal>
        ))}
      </section>

      {/* Backdrops */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Backdrop Styles</h2>
        <div className="flex flex-wrap gap-4">
          {Object.keys(backdropModals).map((backdrop) => (
            <button
              key={backdrop}
              onClick={() =>
                openBackdropModal(backdrop as keyof typeof backdropModals)
              }
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 capitalize"
            >
              {backdrop}
            </button>
          ))}
        </div>

        {Object.entries(backdropModals).map(([backdrop, isOpen]) => (
          <Modal
            key={backdrop}
            open={isOpen}
            onOpenChange={(open: boolean) =>
              !open &&
              closeBackdropModal(backdrop as keyof typeof backdropModals)
            }
            backdrop={backdrop as any}
            title={`Backdrop: ${backdrop}`}
            description="Different backdrop styles"
          >
            <p className="text-muted-foreground">
              The{" "}
              <code className="px-1 py-0.5 rounded bg-muted">{backdrop}</code>{" "}
              backdrop style affects the overlay behind the modal.
            </p>
          </Modal>
        ))}
      </section>

      {/* Advanced Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Advanced Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => openFeatureModal("withFooter")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            With Footer
          </button>
          <button
            onClick={() => openFeatureModal("noHeader")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            No Header
          </button>
          <button
            onClick={() => openFeatureModal("noClose")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            No Close Button
          </button>
          <button
            onClick={() => openFeatureModal("preventClose")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            Prevent Close
          </button>
          <button
            onClick={() => openFeatureModal("scrollInside")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            Scroll Inside
          </button>
          <button
            onClick={() => openFeatureModal("scrollOutside")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            Scroll Outside
          </button>
          <button
            onClick={() => openFeatureModal("fullScreen")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            Full Screen
          </button>
          <button
            onClick={() => openFeatureModal("notCentered")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            Not Centered
          </button>
        </div>

        {/* With Footer */}
        <Modal
          open={featureModals.withFooter}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureModal("withFooter")
          }
          title="Modal with Footer"
          description="This modal has action buttons in the footer"
          footer={
            <>
              <button
                onClick={() => closeFeatureModal("withFooter")}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Saved!");
                  closeFeatureModal("withFooter");
                }}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Save Changes
              </button>
            </>
          }
        >
          <p className="text-muted-foreground">
            The footer prop allows you to add action buttons or other content at
            the bottom of the modal.
          </p>
        </Modal>

        {/* No Header */}
        <Modal
          open={featureModals.noHeader}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureModal("noHeader")
          }
          showHeader={false}
        >
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold">Success!</h3>
            <p className="text-muted-foreground">
              This modal has no header. Useful for simple confirmations or
              notifications.
            </p>
            <button
              onClick={() => closeFeatureModal("noHeader")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Got it
            </button>
          </div>
        </Modal>

        {/* No Close Button */}
        <Modal
          open={featureModals.noClose}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureModal("noClose")
          }
          title="No Close Button"
          description="Close button is hidden"
          showCloseButton={false}
          footer={
            <button
              onClick={() => closeFeatureModal("noClose")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Close
            </button>
          }
        />
        {/* Prevent Close */}
        <Modal
          open={featureModals.preventClose}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureModal("preventClose")
          }
          title="Cannot Close"
          description="This modal prevents closing by overlay or escape"
          preventClose
          closeOnOverlayClick={false}
          closeOnEscape={false}
          showCloseButton={false}
          footer={
            <button
              onClick={() => closeFeatureModal("preventClose")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Complete Action
            </button>
          }
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This modal cannot be closed by clicking outside or pressing
              Escape. Useful for critical actions that must be completed.
            </p>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/30 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <p className="text-sm text-warning-foreground">
                You must complete this action before continuing.
              </p>
            </div>
          </div>
        </Modal>

        {/* Scroll Inside */}
        <Modal
          open={featureModals.scrollInside}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureModal("scrollInside")
          }
          title="Scroll Inside"
          description="Content scrolls inside the modal"
          scrollBehavior="inside"
        >
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="text-muted-foreground">
                Paragraph {i + 1}: This is a long content that demonstrates
                scrolling inside the modal. The modal body becomes scrollable
                while the header and footer remain fixed.
              </p>
            ))}
          </div>
        </Modal>

        {/* Scroll Outside */}
        <Modal
          open={featureModals.scrollOutside}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureModal("scrollOutside")
          }
          title="Scroll Outside"
          description="Entire modal scrolls"
          scrollBehavior="outside"
        >
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="text-muted-foreground">
                Paragraph {i + 1}: This is a long content that demonstrates
                scrolling outside the modal. The entire modal scrolls as one
                unit.
              </p>
            ))}
          </div>
        </Modal>

        {/* Full Screen */}
        <Modal
          open={featureModals.fullScreen}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureModal("fullScreen")
          }
          title="Full Screen Modal"
          description="This modal takes up the entire screen"
          fullScreen
          rounded="none"
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Full screen modals are useful for complex forms or detailed
              content that needs maximum space.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">Column 1</div>
              <div className="p-4 rounded-lg bg-muted">Column 2</div>
            </div>
          </div>
        </Modal>

        {/* Not Centered */}
        <Modal
          open={featureModals.notCentered}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureModal("notCentered")
          }
          title="Top Aligned Modal"
          description="This modal is positioned at the top"
          centered={false}
        >
          <p className="text-muted-foreground">
            By default, modals are centered. You can position them at the top by
            setting centered=false.
          </p>
        </Modal>
      </section>

      {/* Confirm Dialog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Confirm Dialog</h2>
        <button
          onClick={() => setConfirmDialog(true)}
          className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          Delete Account
        </button>

        <Modal
          open={confirmDialog}
          onOpenChange={setConfirmDialog}
          size="sm"
          variant="error"
          footer={
            <>
              <button
                onClick={() => setConfirmDialog(false)}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Account deleted!");
                  setConfirmDialog(false);
                }}
                className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Account
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Are you sure?</h3>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </p>
            </div>
          </div>
        </Modal>
      </section>

      {/* Form Modal */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Form Modal</h2>
        <button
          onClick={() => setFormModal(true)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Add New Item
        </button>

        <Modal
          open={formModal}
          onOpenChange={setFormModal}
          title="Add New Item"
          description="Fill in the details below"
          footer={
            <>
              <button
                onClick={() => setFormModal(false)}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Item added!");
                  setFormModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Add Item
              </button>
            </>
          }
        >
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                placeholder="Enter name..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                placeholder="Enter description..."
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                <option>Select category...</option>
                <option>Category 1</option>
                <option>Category 2</option>
                <option>Category 3</option>
              </select>
            </div>
          </form>
        </Modal>
      </section>

      {/* Nested Modals */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Nested Modals</h2>
        <button
          onClick={() => setNestedModal(true)}
          className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Open Nested Modals
        </button>

        <Modal
          open={nestedModal}
          onOpenChange={setNestedModal}
          title="First Modal"
          description="This modal can open another modal"
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You can nest modals by opening a new modal from within an existing
              one.
            </p>
            <button
              onClick={() => setNestedInnerModal(true)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Open Second Modal
            </button>
          </div>
        </Modal>

        <Modal
          open={nestedInnerModal}
          onOpenChange={setNestedInnerModal}
          size="sm"
          variant="success"
          animation="scale"
          nested
        >
          <ModalHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-success" />
              </div>
              <div>
                <ModalTitle>Nested Modal</ModalTitle>
                <ModalDescription>
                  Better styling with nested prop
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                This nested modal uses the{" "}
                <code className="px-1 py-0.5 rounded bg-muted">nested</code>{" "}
                prop for better overlay and focus management.
              </p>
              <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                <p className="text-sm text-success-foreground">
                  ✓ Proper z-index layering
                  <br />
                  ✓ Lighter backdrop
                  <br />✓ No scroll lock conflict
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => setNestedInnerModal(false)}
              className="px-4 py-2 rounded-lg bg-success text-success-foreground hover:bg-success/90"
            >
              Close
            </button>
          </ModalFooter>
        </Modal>
      </section>
    </div>
  );
}
