import React from "react";
import { SonnerProvider, useSonner, type SonnerVariant } from "../components/Sonner/index";
import Button from "../components/Button";

// ============================================================================
// EXAMPLE WRAPPER
// ============================================================================

export function SonnerExample() {
  return (
    <SonnerProvider position="bottom-right" duration={4000} maxToasts={3}>
      <div className="space-y-8 p-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold">Toast Notifications</h2>
          <p className="mb-6 text-muted-foreground">
            Beautiful toast notifications with animations, auto-dismiss, and
            rich colors.
          </p>
          <BasicToastsExample />
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Toast Types</h2>
          <p className="mb-6 text-muted-foreground">
            Different types with automatic icons and colors.
          </p>
          <ToastTypesExample />
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Color Variants</h2>
          <p className="mb-6 text-muted-foreground">
            Customize toast appearance with different color variants.
          </p>
          <VariantsExample />
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Action Buttons</h2>
          <p className="mb-6 text-muted-foreground">
            Add action and cancel buttons to toasts.
          </p>
          <ActionsExample />
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Loading States</h2>
          <p className="mb-6 text-muted-foreground">
            Show loading toasts that don't auto-dismiss.
          </p>
          <LoadingExample />
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Promise Handling</h2>
          <p className="mb-6 text-muted-foreground">
            Automatically handle promise states with loading → success/error.
          </p>
          <PromiseExample />
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Persistent Toasts</h2>
          <p className="mb-6 text-muted-foreground">
            Toasts that don't auto-dismiss until manually closed.
          </p>
          <PersistentExample />
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Position Options</h2>
          <p className="mb-6 text-muted-foreground">
            Toast notifications can appear in 6 different positions.
          </p>
          <p className="text-sm text-muted-foreground">
            Change position in SonnerProvider props to test different positions.
          </p>
        </section>
      </div>
    </SonnerProvider>
  );
}

// ============================================================================
// BASIC TOASTS
// ============================================================================

function BasicToastsExample() {
  const { toast } = useSonner();

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() =>
          toast({
            type: "default",
            title: "Event scheduled",
            description: "Your meeting has been scheduled for tomorrow.",
          })
        }
      >
        Show Toast
      </Button>

      <Button
        onClick={() =>
          toast({
            type: "default",
            title: "Simple notification",
          })
        }
        variant="outline"
      >
        Without Description
      </Button>

      <Button
        onClick={() =>
          toast({
            type: "default",
            title: "Custom duration",
            description: "This toast will stay for 10 seconds.",
            duration: 10000,
          })
        }
        variant="secondary"
      >
        Long Duration
      </Button>
    </div>
  );
}

// ============================================================================
// TOAST TYPES
// ============================================================================

function ToastTypesExample() {
  const { success, error, warning, info, loading } = useSonner();

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() => success("Success!", "Your changes have been saved.")}
        variant="success"
      >
        Success
      </Button>

      <Button
        onClick={() => error("Error!", "Failed to save your changes.")}
        variant="error"
      >
        Error
      </Button>

      <Button
        onClick={() => warning("Warning!", "This action cannot be undone.")}
        variant="warning"
      >
        Warning
      </Button>

      <Button
        onClick={() => info("Info", "New features are available.")}
        variant="info"
      >
        Info
      </Button>

      <Button
        onClick={() => loading("Loading...", "Please wait while we process.")}
        variant="outline"
      >
        Loading
      </Button>
    </div>
  );
}

// ============================================================================
// VARIANTS
// ============================================================================

function VariantsExample() {
  const { toast } = useSonner();

  const variants: Array<{ variant: SonnerVariant; label: string }> = [
    { variant: "default", label: "Default" },
    { variant: "primary", label: "Primary" },
    { variant: "secondary", label: "Secondary" },
    { variant: "accent", label: "Accent" },
    { variant: "success", label: "Success" },
    { variant: "warning", label: "Warning" },
    { variant: "error", label: "Error" },
    { variant: "info", label: "Info" },
    { variant: "outline", label: "Outline" },
    { variant: "glass", label: "Glass" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map(({ variant, label }) => (
        <Button
          key={variant}
          onClick={() =>
            toast({
              type: "default",
              title: `${label} Toast`,
              description: `This is a ${variant} variant.`,
              variant: variant,
            })
          }
          variant={variant === "default" ? "outline" : (variant as any)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

// ============================================================================
// ACTIONS
// ============================================================================

function ActionsExample() {
  const { toast } = useSonner();

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() =>
          toast({
            type: "default",
            title: "File uploaded",
            description: "Your file has been uploaded successfully.",
            action: {
              label: "View",
              onClick: () => console.log("View clicked"),
            },
          })
        }
      >
        With Action
      </Button>

      <Button
        onClick={() =>
          toast({
            type: "warning",
            title: "Delete file?",
            description: "This action cannot be undone.",
            action: {
              label: "Delete",
              onClick: () => console.log("Deleted"),
            },
            cancel: {
              label: "Cancel",
              onClick: () => console.log("Cancelled"),
            },
          })
        }
        variant="outline"
      >
        Action & Cancel
      </Button>

      <Button
        onClick={() =>
          toast({
            type: "default",
            title: "Update available",
            description: "A new version is ready to install.",
            action: {
              label: "Update now",
              onClick: () => console.log("Updating..."),
            },
            cancel: {
              label: "Later",
            },
            duration: 0, // Persistent until action
          })
        }
        variant="secondary"
      >
        Persistent Action
      </Button>
    </div>
  );
}

// ============================================================================
// LOADING
// ============================================================================

function LoadingExample() {
  const { loading, dismiss, success } = useSonner();

  const handleAsyncOperation = () => {
    const id = loading("Processing...", "Please wait.");

    // Simulate async operation
    setTimeout(() => {
      dismiss(id);
      success("Complete!", "Operation finished successfully.");
    }, 3000);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Button onClick={handleAsyncOperation}>Simulate Async Operation</Button>

      <Button
        onClick={() => loading("Uploading files...", "0% complete")}
        variant="outline"
      >
        Upload Progress
      </Button>
    </div>
  );
}

// ============================================================================
// PROMISE
// ============================================================================

function PromiseExample() {
  const { loading, dismiss, success, error } = useSonner();

  const handlePromise = (shouldSucceed: boolean) => {
    const id = loading("Saving changes...");

    // Simulate promise
    setTimeout(() => {
      dismiss(id);
      if (shouldSucceed) {
        success("Saved!", "Your changes have been saved.");
      } else {
        error("Failed!", "Could not save changes.");
      }
    }, 2000);
  };

  const handleMultiStep = () => {
    const id = loading("Step 1/3", "Validating data...");

    setTimeout(() => {
      dismiss(id);
      const id2 = loading("Step 2/3", "Processing...");

      setTimeout(() => {
        dismiss(id2);
        const id3 = loading("Step 3/3", "Finalizing...");

        setTimeout(() => {
          dismiss(id3);
          success("Complete!", "All steps completed successfully.");
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => handlePromise(true)} variant="success">
        Success Promise
      </Button>

      <Button onClick={() => handlePromise(false)} variant="error">
        Error Promise
      </Button>

      <Button onClick={handleMultiStep} variant="outline">
        Multi-Step Process
      </Button>
    </div>
  );
}

// ============================================================================
// PERSISTENT
// ============================================================================

function PersistentExample() {
  const { toast } = useSonner();

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() =>
          toast({
            type: "info",
            title: "Important notice",
            description: "This toast will not auto-dismiss.",
            duration: 0,
          })
        }
      >
        No Auto-Dismiss
      </Button>

      <Button
        onClick={() =>
          toast({
            type: "warning",
            title: "Action required",
            description: "Please review and confirm.",
            duration: 0,
            dismissible: false,
            action: {
              label: "Confirm",
              onClick: () => console.log("Confirmed"),
            },
            cancel: {
              label: "Dismiss",
            },
          })
        }
        variant="warning"
      >
        Not Dismissible
      </Button>

      <Button
        onClick={() =>
          toast({
            type: "error",
            title: "Critical error",
            description: "Manual intervention required.",
            duration: 0,
            dismissible: false,
          })
        }
        variant="error"
      >
        Must Use Action
      </Button>
    </div>
  );
}

// ============================================================================
// POSITION DEMO COMPONENT
// ============================================================================

export function SonnerPositionDemo() {
  const [position, setPosition] = React.useState<
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
  >("bottom-right");

  return (
    <SonnerProvider position={position} duration={3000}>
      <div className="space-y-8 p-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold">Position Demo</h2>
          <p className="mb-6 text-muted-foreground">
            Change the position and trigger toasts to see them in different
            locations.
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            <Button
              onClick={() => setPosition("top-left")}
              variant={position === "top-left" ? "primary" : "outline"}
            >
              Top Left
            </Button>
            <Button
              onClick={() => setPosition("top-center")}
              variant={position === "top-center" ? "primary" : "outline"}
            >
              Top Center
            </Button>
            <Button
              onClick={() => setPosition("top-right")}
              variant={position === "top-right" ? "primary" : "outline"}
            >
              Top Right
            </Button>
            <Button
              onClick={() => setPosition("bottom-left")}
              variant={position === "bottom-left" ? "primary" : "outline"}
            >
              Bottom Left
            </Button>
            <Button
              onClick={() => setPosition("bottom-center")}
              variant={position === "bottom-center" ? "primary" : "outline"}
            >
              Bottom Center
            </Button>
            <Button
              onClick={() => setPosition("bottom-right")}
              variant={position === "bottom-right" ? "primary" : "outline"}
            >
              Bottom Right
            </Button>
          </div>

          <PositionToastTrigger position={position} />
        </section>
      </div>
    </SonnerProvider>
  );
}

function PositionToastTrigger({ position }: { position: string }) {
  const { success } = useSonner();

  return (
    <Button
      onClick={() =>
        success(
          "Position changed!",
          `Toasts will now appear at ${position.replace("-", " ")}`
        )
      }
    >
      Show Toast
    </Button>
  );
}
