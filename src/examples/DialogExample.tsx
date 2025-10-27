import { useState } from "react";
import Dialog, {
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../components/Dialog/index";
import { Check, AlertTriangle, Sparkles } from "lucide-react";

export default function DialogExample() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [variantDialogs, setVariantDialogs] = useState({
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
  const [sizeDialogs, setSizeDialogs] = useState({
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
  const [animationDialogs, setAnimationDialogs] = useState({
    fade: false,
    scale: false,
    "slide-up": false,
    "slide-down": false,
    "slide-left": false,
    "slide-right": false,
    zoom: false,
    bounce: false,
  });
  const [featureDialogs, setFeatureDialogs] = useState({
    withFooter: false,
    noHeader: false,
    noClose: false,
    preventClose: false,
    scrollInside: false,
    scrollOutside: false,
    fullScreen: false,
    notCentered: false,
  });
  const [backdropDialogs, setBackdropDialogs] = useState({
    default: false,
    blur: false,
    transparent: false,
    dark: false,
  });
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [formDialog, setFormDialog] = useState(false);
  const [nestedDialog, setNestedDialog] = useState(false);
  const [nestedInnerDialog, setNestedInnerDialog] = useState(false);
  const [componentBasedDialog, setComponentBasedDialog] = useState(false);
  const [customLayoutDialog, setCustomLayoutDialog] = useState(false);

  const openVariantDialog = (variant: keyof typeof variantDialogs) => {
    setVariantDialogs((prev) => ({ ...prev, [variant]: true }));
  };

  const closeVariantDialog = (variant: keyof typeof variantDialogs) => {
    setVariantDialogs((prev) => ({ ...prev, [variant]: false }));
  };

  const openSizeDialog = (size: keyof typeof sizeDialogs) => {
    setSizeDialogs((prev) => ({ ...prev, [size]: true }));
  };

  const closeSizeDialog = (size: keyof typeof sizeDialogs) => {
    setSizeDialogs((prev) => ({ ...prev, [size]: false }));
  };

  const openAnimationDialog = (animation: keyof typeof animationDialogs) => {
    setAnimationDialogs((prev) => ({ ...prev, [animation]: true }));
  };

  const closeAnimationDialog = (animation: keyof typeof animationDialogs) => {
    setAnimationDialogs((prev) => ({ ...prev, [animation]: false }));
  };

  const openFeatureDialog = (feature: keyof typeof featureDialogs) => {
    setFeatureDialogs((prev) => ({ ...prev, [feature]: true }));
  };

  const closeFeatureDialog = (feature: keyof typeof featureDialogs) => {
    setFeatureDialogs((prev) => ({ ...prev, [feature]: false }));
  };

  const openBackdropDialog = (backdrop: keyof typeof backdropDialogs) => {
    setBackdropDialogs((prev) => ({ ...prev, [backdrop]: true }));
  };

  const closeBackdropDialog = (backdrop: keyof typeof backdropDialogs) => {
    setBackdropDialogs((prev) => ({ ...prev, [backdrop]: false }));
  };

  return (
    <div className="space-y-16 p-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold">Dialog Component</h1>
        <p className="text-muted-foreground">
          Advanced Dialog/dialog component with animations, accessibility, and
          extensive customization options.
        </p>
      </div>

      {/* Basic Dialog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Dialog</h2>
        <button
          onClick={() => setBasicOpen(true)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Open Basic Dialog
        </button>

        <Dialog
          open={basicOpen}
          onOpenChange={setBasicOpen}
          title="Basic Dialog"
          description="This is a simple Dialog with title and description"
        >
          <p className="text-muted-foreground">
            This is the Dialog content. You can put any React components here.
            Click outside, press Escape, or click the X button to close.
          </p>
        </Dialog>
      </section>

      {/* Component-Based API */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Component-Based API</h2>
        <p className="text-muted-foreground">
          Use compound components for more control over the Dialog structure
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setComponentBasedDialog(true)}
            className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Component-Based Dialog
          </button>
          <button
            onClick={() => setCustomLayoutDialog(true)}
            className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Custom Layout
          </button>
        </div>

        {/* Component-Based Dialog */}
        <Dialog
          open={componentBasedDialog}
          onOpenChange={setComponentBasedDialog}
          variant="primary"
          animation="slide-up"
        >
          <DialogHeader>
            <DialogTitle>Component-Based Dialog</DialogTitle>
            <DialogDescription>
              Using DialogHeader, DialogBody, and DialogFooter components
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                This Dialog uses the component-based API with separate
                DialogHeader, DialogBody, and DialogFooter components.
              </p>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm">
                  ✨ More flexibility with custom layouts
                </p>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <button
              onClick={() => setComponentBasedDialog(false)}
              className="px-4 py-2 rounded-lg border border-border hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={() => setComponentBasedDialog(false)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Confirm
            </button>
          </DialogFooter>
        </Dialog>

        {/* Custom Layout Dialog */}
        <Dialog
          open={customLayoutDialog}
          onOpenChange={setCustomLayoutDialog}
          variant="glass"
          size="lg"
          animation="zoom"
        >
          <DialogHeader showCloseButton={false}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle>Custom Layout</DialogTitle>
                <DialogDescription>
                  Complete control over your Dialog structure
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogBody scrollable={false}>
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
          </DialogBody>
          <DialogFooter align="center">
            <button
              onClick={() => setCustomLayoutDialog(false)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
            >
              Got it!
            </button>
          </DialogFooter>
        </Dialog>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.keys(variantDialogs).map((variant) => (
            <button
              key={variant}
              onClick={() =>
                openVariantDialog(variant as keyof typeof variantDialogs)
              }
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 capitalize"
            >
              {variant}
            </button>
          ))}
        </div>

        {Object.entries(variantDialogs).map(([variant, isOpen]) => (
          <Dialog
            key={variant}
            open={isOpen}
            onOpenChange={(open: boolean) =>
              !open && closeVariantDialog(variant as keyof typeof variantDialogs)
            }
            variant={variant as any}
            title={`${
              variant.charAt(0).toUpperCase() + variant.slice(1)
            } Dialog`}
            description={`This is a ${variant} variant Dialog`}
          >
            <p className="text-muted-foreground">
              The {variant} variant applies specific styling to the Dialog
              container and border.
            </p>
          </Dialog>
        ))}
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <div className="flex flex-wrap gap-4">
          {Object.keys(sizeDialogs).map((size) => (
            <button
              key={size}
              onClick={() => openSizeDialog(size as keyof typeof sizeDialogs)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 uppercase"
            >
              {size}
            </button>
          ))}
        </div>

        {Object.entries(sizeDialogs).map(([size, isOpen]) => (
          <Dialog
            key={size}
            open={isOpen}
            onOpenChange={(open: boolean) =>
              !open && closeSizeDialog(size as keyof typeof sizeDialogs)
            }
            size={size as any}
            title={`Size: ${size.toUpperCase()}`}
            description={`This Dialog has size="${size}"`}
          >
            <p className="text-muted-foreground">
              Different sizes allow you to control the Dialog width. The 'full'
              size makes the Dialog take up the entire screen.
            </p>
          </Dialog>
        ))}
      </section>

      {/* Animations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Animations</h2>
        <div className="flex flex-wrap gap-4">
          {Object.keys(animationDialogs).map((animation) => (
            <button
              key={animation}
              onClick={() =>
                openAnimationDialog(animation as keyof typeof animationDialogs)
              }
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 capitalize"
            >
              {animation}
            </button>
          ))}
        </div>

        {Object.entries(animationDialogs).map(([animation, isOpen]) => (
          <Dialog
            key={animation}
            open={isOpen}
            onOpenChange={(open: boolean) =>
              !open &&
              closeAnimationDialog(animation as keyof typeof animationDialogs)
            }
            animation={animation as any}
            title={`Animation: ${animation}`}
            description="Watch how this Dialog animates"
          >
            <p className="text-muted-foreground">
              This Dialog uses the{" "}
              <code className="px-1 py-0.5 rounded bg-muted">{animation}</code>{" "}
              animation. Close and reopen to see the animation effect.
            </p>
          </Dialog>
        ))}
      </section>

      {/* Backdrops */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Backdrop Styles</h2>
        <div className="flex flex-wrap gap-4">
          {Object.keys(backdropDialogs).map((backdrop) => (
            <button
              key={backdrop}
              onClick={() =>
                openBackdropDialog(backdrop as keyof typeof backdropDialogs)
              }
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 capitalize"
            >
              {backdrop}
            </button>
          ))}
        </div>

        {Object.entries(backdropDialogs).map(([backdrop, isOpen]) => (
          <Dialog
            key={backdrop}
            open={isOpen}
            onOpenChange={(open: boolean) =>
              !open &&
              closeBackdropDialog(backdrop as keyof typeof backdropDialogs)
            }
            backdrop={backdrop as any}
            title={`Backdrop: ${backdrop}`}
            description="Different backdrop styles"
          >
            <p className="text-muted-foreground">
              The{" "}
              <code className="px-1 py-0.5 rounded bg-muted">{backdrop}</code>{" "}
              backdrop style affects the overlay behind the Dialog.
            </p>
          </Dialog>
        ))}
      </section>

      {/* Advanced Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Advanced Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => openFeatureDialog("withFooter")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            With Footer
          </button>
          <button
            onClick={() => openFeatureDialog("noHeader")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            No Header
          </button>
          <button
            onClick={() => openFeatureDialog("noClose")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            No Close Button
          </button>
          <button
            onClick={() => openFeatureDialog("preventClose")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            Prevent Close
          </button>
          <button
            onClick={() => openFeatureDialog("scrollInside")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            Scroll Inside
          </button>
          <button
            onClick={() => openFeatureDialog("scrollOutside")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            Scroll Outside
          </button>
          <button
            onClick={() => openFeatureDialog("fullScreen")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            Full Screen
          </button>
          <button
            onClick={() => openFeatureDialog("notCentered")}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
          >
            Not Centered
          </button>
        </div>

        {/* With Footer */}
        <Dialog
          open={featureDialogs.withFooter}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureDialog("withFooter")
          }
          title="Dialog with Footer"
          description="This Dialog has action buttons in the footer"
          footer={
            <>
              <button
                onClick={() => closeFeatureDialog("withFooter")}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Saved!");
                  closeFeatureDialog("withFooter");
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
            the bottom of the Dialog.
          </p>
        </Dialog>

        {/* No Header */}
        <Dialog
          open={featureDialogs.noHeader}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureDialog("noHeader")
          }
          showHeader={false}
        >
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold">Success!</h3>
            <p className="text-muted-foreground">
              This Dialog has no header. Useful for simple confirmations or
              notifications.
            </p>
            <button
              onClick={() => closeFeatureDialog("noHeader")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Got it
            </button>
          </div>
        </Dialog>

        {/* No Close Button */}
        <Dialog
          open={featureDialogs.noClose}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureDialog("noClose")
          }
          title="No Close Button"
          description="Close button is hidden"
          showCloseButton={false}
          footer={
            <button
              onClick={() => closeFeatureDialog("noClose")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Close
            </button>
          }
        />
        {/* Prevent Close */}
        <Dialog
          open={featureDialogs.preventClose}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureDialog("preventClose")
          }
          title="Cannot Close"
          description="This Dialog prevents closing by overlay or escape"
          preventClose
          closeOnOverlayClick={false}
          closeOnEscape={false}
          showCloseButton={false}
          footer={
            <button
              onClick={() => closeFeatureDialog("preventClose")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Complete Action
            </button>
          }
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This Dialog cannot be closed by clicking outside or pressing
              Escape. Useful for critical actions that must be completed.
            </p>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/30 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <p className="text-sm text-warning-foreground">
                You must complete this action before continuing.
              </p>
            </div>
          </div>
        </Dialog>

        {/* Scroll Inside */}
        <Dialog
          open={featureDialogs.scrollInside}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureDialog("scrollInside")
          }
          title="Scroll Inside"
          description="Content scrolls inside the Dialog"
          scrollBehavior="inside"
        >
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="text-muted-foreground">
                Paragraph {i + 1}: This is a long content that demonstrates
                scrolling inside the Dialog. The Dialog body becomes scrollable
                while the header and footer remain fixed.
              </p>
            ))}
          </div>
        </Dialog>

        {/* Scroll Outside */}
        <Dialog
          open={featureDialogs.scrollOutside}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureDialog("scrollOutside")
          }
          title="Scroll Outside"
          description="Entire Dialog scrolls"
          scrollBehavior="outside"
        >
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} className="text-muted-foreground">
                Paragraph {i + 1}: This is a long content that demonstrates
                scrolling outside the Dialog. The entire Dialog scrolls as one
                unit.
              </p>
            ))}
          </div>
        </Dialog>

        {/* Full Screen */}
        <Dialog
          open={featureDialogs.fullScreen}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureDialog("fullScreen")
          }
          title="Full Screen Dialog"
          description="This Dialog takes up the entire screen"
          fullScreen
          rounded="none"
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Full screen Dialogs are useful for complex forms or detailed
              content that needs maximum space.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">Column 1</div>
              <div className="p-4 rounded-lg bg-muted">Column 2</div>
            </div>
          </div>
        </Dialog>

        {/* Not Centered */}
        <Dialog
          open={featureDialogs.notCentered}
          onOpenChange={(open: boolean) =>
            !open && closeFeatureDialog("notCentered")
          }
          title="Top Aligned Dialog"
          description="This Dialog is positioned at the top"
          centered={false}
        >
          <p className="text-muted-foreground">
            By default, Dialogs are centered. You can position them at the top by
            setting centered=false.
          </p>
        </Dialog>
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

        <Dialog
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
        </Dialog>
      </section>

      {/* Form Dialog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Form Dialog</h2>
        <button
          onClick={() => setFormDialog(true)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Add New Item
        </button>

        <Dialog
          open={formDialog}
          onOpenChange={setFormDialog}
          title="Add New Item"
          description="Fill in the details below"
          footer={
            <>
              <button
                onClick={() => setFormDialog(false)}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Item added!");
                  setFormDialog(false);
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
        </Dialog>
      </section>

      {/* Nested Dialogs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Nested Dialogs</h2>
        <button
          onClick={() => setNestedDialog(true)}
          className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Open Nested Dialogs
        </button>

        <Dialog
          open={nestedDialog}
          onOpenChange={setNestedDialog}
          title="First Dialog"
          description="This Dialog can open another Dialog"
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You can nest Dialogs by opening a new Dialog from within an existing
              one.
            </p>
            <button
              onClick={() => setNestedInnerDialog(true)}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Open Second Dialog
            </button>
          </div>
        </Dialog>

        <Dialog
          open={nestedInnerDialog}
          onOpenChange={setNestedInnerDialog}
          size="sm"
          variant="success"
          animation="scale"
          nested
        >
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-success" />
              </div>
              <div>
                <DialogTitle>Nested Dialog</DialogTitle>
                <DialogDescription>
                  Better styling with nested prop
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                This nested Dialog uses the{" "}
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
          </DialogBody>
          <DialogFooter>
            <button
              onClick={() => setNestedInnerDialog(false)}
              className="px-4 py-2 rounded-lg bg-success text-success-foreground hover:bg-success/90"
            >
              Close
            </button>
          </DialogFooter>
        </Dialog>
      </section>
    </div>
  );
}
