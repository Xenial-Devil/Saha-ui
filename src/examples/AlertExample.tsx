"use client";

import { useState } from "react";
import {
  Alert,
  AlertProvider,
  useAlert,
  Icon,
  Spinner,
  AnimatedCheck,
  AnimatedX,
} from "../components/Alert";

// ============================================
// INLINE ALERT EXAMPLES
// ============================================

export const AlertExample = () => {
  const [controlledOpen, setControlledOpen] = useState(true);
  const [showAutoDismiss, setShowAutoDismiss] = useState(false);

  return (
    <div className="mb-16 space-y-12">
      <h3 className="text-2xl font-bold mb-6 text-text">Alert Component</h3>

      {/* ========== STATUS TYPES ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">Status Types</h4>
        <div className="space-y-4">
          <Alert status="info" message="This is some helpful information." />
          <Alert
            status="success"
            message="Your changes have been saved successfully!"
          />
          <Alert status="warning" message="Please review before proceeding." />
          <Alert
            status="danger"
            message="Something went wrong. Please try again."
          />
          <Alert status="neutral" message="This is a neutral message." />
        </div>
      </section>

      {/* ========== VARIANTS ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="space-y-4">
          <Alert variant="solid" status="success" message="Solid variant" />
          <Alert variant="subtle" status="info" message="Subtle variant" />
          <Alert variant="outline" status="warning" message="Outline variant" />
          <Alert
            variant="left-accent"
            status="danger"
            message="Left accent variant"
          />
          <Alert
            variant="top-accent"
            status="info"
            message="Top accent variant"
          />
          <Alert
            variant="glass"
            status="success"
            message="Glass variant (works best on dark/image backgrounds)"
          />
          <Alert
            variant="gradient"
            status="warning"
            message="Gradient variant"
          />
          <Alert variant="minimal" status="info" message="Minimal variant" />
        </div>
      </section>

      {/* ========== WITH TITLES ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">With Titles</h4>
        <div className="space-y-4">
          <Alert
            status="success"
            title="Payment Successful"
            message="Your payment has been processed. You will receive a confirmation email shortly."
          />
          <Alert
            status="danger"
            title="Connection Failed"
            message="Unable to connect to the server. Please check your internet connection."
          />
          <Alert
            variant="gradient"
            status="info"
            title="New Feature Available"
            message="Check out our latest updates and improvements."
          />
        </div>
      </section>

      {/* ========== CLOSEABLE ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">
          Closeable Alerts
        </h4>
        <div className="space-y-4">
          <Alert
            status="info"
            message="Click the X button to dismiss this alert."
            closeable
            onClose={() => console.log("Alert closed!")}
          />
          <Alert
            status="warning"
            title="Important Notice"
            message="Press Escape or click X to close. This is closeable."
            closeable
            closeOnEscape
          />
        </div>
      </section>

      {/* ========== WITH ACTIONS ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">With Actions</h4>
        <div className="space-y-4">
          <Alert
            status="danger"
            title="Delete Item?"
            message="This action cannot be undone."
            action={{
              label: "Delete",
              onClick: () => console.log("Delete clicked"),
              variant: "button",
            }}
            secondaryAction={{
              label: "Cancel",
              onClick: () => console.log("Cancel clicked"),
            }}
            closeable
          />
          <Alert
            status="success"
            message="Item deleted successfully."
            action={{
              label: "Undo",
              onClick: () => console.log("Undo clicked"),
            }}
            closeable
          />
          <Alert
            variant="solid"
            status="info"
            title="Update Available"
            message="A new version is available for download."
            action={{
              label: "Update Now",
              onClick: () => console.log("Update clicked"),
              variant: "button",
            }}
            secondaryAction={{
              label: "Later",
              onClick: () => console.log("Later clicked"),
            }}
          />
        </div>
      </section>

      {/* ========== ANIMATIONS ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">Animations</h4>
        <div className="space-y-4">
          <Alert
            animation="fade"
            status="info"
            message="Fade animation (default)"
            closeable
          />
          <Alert
            animation="slide-up"
            status="success"
            message="Slide up animation"
            closeable
          />
          <Alert
            animation="slide-down"
            status="warning"
            message="Slide down animation"
            closeable
          />
          <Alert
            animation="slide-left"
            status="danger"
            message="Slide left animation"
            closeable
          />
          <Alert
            animation="slide-right"
            status="info"
            message="Slide right animation"
            closeable
          />
          <Alert
            animation="scale"
            status="success"
            message="Scale animation"
            closeable
          />
          <Alert
            animation="bounce"
            status="warning"
            message="Bounce animation"
            closeable
          />
        </div>
      </section>

      {/* ========== AUTO DISMISS ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">
          Auto Dismiss with Progress
        </h4>
        <div className="space-y-4">
          <button
            onClick={() => setShowAutoDismiss(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Show Auto-Dismiss Alert (5s)
          </button>

          {showAutoDismiss && (
            <Alert
              status="info"
              title="Auto Dismiss"
              message="This alert will disappear in 5 seconds. Hover to pause!"
              duration={5000}
              showProgress
              pauseOnHover
              animation="slide-up"
              onClose={() => setShowAutoDismiss(false)}
            />
          )}

          <Alert
            status="warning"
            message="Hover over me to pause the timer!"
            duration={10000}
            showProgress
            pauseOnHover
            closeable
          />
        </div>
      </section>

      {/* ========== ICON ANIMATIONS ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">
          Icon Animations
        </h4>
        <div className="space-y-4">
          <Alert
            status="info"
            iconAnimation="none"
            message="No icon animation (default)"
          />
          <Alert
            status="danger"
            iconAnimation="pulse"
            message="Pulse icon animation"
          />
          <Alert
            status="warning"
            iconAnimation="bounce"
            message="Bounce icon animation"
          />
          <Alert
            status="info"
            iconAnimation="shake"
            message="Shake icon animation"
          />
        </div>
      </section>

      {/* ========== CUSTOM ICONS ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">Custom Icons</h4>
        <div className="space-y-4">
          <Alert
            status="info"
            icon={<Icon name="bell" />}
            message="Custom bell icon"
          />
          <Alert
            status="success"
            icon={<Icon name="shield" />}
            message="Custom shield icon"
          />
          <Alert
            status="warning"
            icon={<Icon name="fire" className="text-orange-500" />}
            message="Custom fire icon with color"
          />
          <Alert
            status="info"
            icon={<Icon name="star" animation="pulse" />}
            message="Custom star icon with animation"
          />
          <Alert
            status="success"
            icon={<AnimatedCheck />}
            message="Animated checkmark icon"
          />
          <Alert
            status="danger"
            icon={<AnimatedX />}
            message="Animated X icon"
          />
          <Alert
            status="info"
            icon={<Spinner />}
            message="Loading spinner icon"
          />
          <Alert status="neutral" icon={null} message="No icon at all" />
        </div>
      </section>

      {/* ========== ROUNDED & SHADOW ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">
          Rounded & Shadow Options
        </h4>
        <div className="space-y-4">
          <Alert
            rounded="none"
            shadow="none"
            status="info"
            message="No rounded, no shadow"
          />
          <Alert
            rounded="sm"
            shadow="sm"
            status="success"
            message="Small rounded, small shadow"
          />
          <Alert
            rounded="md"
            shadow="md"
            status="warning"
            message="Medium rounded, medium shadow"
          />
          <Alert
            rounded="lg"
            shadow="lg"
            status="danger"
            message="Large rounded, large shadow"
          />
          <Alert
            rounded="full"
            shadow="xl"
            status="info"
            message="Full rounded, XL shadow"
          />
        </div>
      </section>

      {/* ========== CONTROLLED MODE ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">
          Controlled Mode
        </h4>
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setControlledOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Show Alert
            </button>
            <button
              onClick={() => setControlledOpen(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Hide Alert
            </button>
          </div>

          <Alert
            status="info"
            title="Controlled Alert"
            message="This alert is controlled by external state."
            isOpen={controlledOpen}
            onOpenChange={setControlledOpen}
            closeable
          />
        </div>
      </section>

      {/* ========== SWIPE TO DISMISS ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">
          Swipe to Dismiss (Mobile)
        </h4>
        <div className="space-y-4">
          <Alert
            status="info"
            message="Swipe left or right to dismiss (on touch devices)"
            closeOnSwipe
            closeable
          />
        </div>
      </section>

      {/* ========== COMPLEX EXAMPLES ========== */}
      <section>
        <h4 className="text-lg font-semibold mb-4 text-text">
          Complex Examples
        </h4>
        <div className="space-y-4">
          <Alert
            variant="gradient"
            status="success"
            title="🎉 Congratulations!"
            message="You've completed all the tasks for today. Keep up the great work!"
            animation="bounce"
            action={{
              label: "View Progress",
              onClick: () => console.log("View progress"),
              variant: "button",
            }}
            closeable
          />

          <Alert
            variant="glass"
            status="info"
            title="Pro Tip"
            message="You can customize the appearance of alerts using variants and status props."
            icon={<Icon name="lightning" animation="pulse" />}
            rounded="full"
            shadow="xl"
          />

          <Alert
            variant="left-accent"
            status="warning"
            title="Subscription Expiring"
            message="Your subscription will expire in 3 days. Renew now to avoid interruption."
            duration={15000}
            showProgress
            pauseOnHover
            action={{
              label: "Renew Now",
              onClick: () => console.log("Renew"),
              variant: "button",
            }}
            secondaryAction={{
              label: "Remind Later",
              onClick: () => console.log("Remind later"),
            }}
            closeable
          />
        </div>
      </section>
    </div>
  );
};

// ============================================
// GLOBAL TOAST EXAMPLES (with useAlert hook)
// ============================================

const ToastDemoButtons = () => {
  const alert = useAlert();

  // Simulated async function
  const saveData = () => new Promise((resolve) => setTimeout(resolve, 2000));
  const failedRequest = () =>
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Failed")), 2000)
    );

  return (
    <div className="space-y-4">
      {/* Basic Methods */}
      <div>
        <h5 className="text-sm font-medium mb-2 text-text">Basic Methods</h5>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => alert.info("This is an info message")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Info
          </button>
          <button
            onClick={() => alert.success("Operation completed successfully!")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Success
          </button>
          <button
            onClick={() => alert.warning("Please review your input")}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Warning
          </button>
          <button
            onClick={() => alert.error("Something went wrong!")}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Error
          </button>
        </div>
      </div>

      {/* Custom Alerts */}
      <div>
        <h5 className="text-sm font-medium mb-2 text-text">Custom Alerts</h5>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              alert.show({
                status: "success",
                variant: "gradient",
                title: "Welcome Back!",
                message: "Great to see you again.",
                animation: "bounce",
                duration: 5000,
              })
            }
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Gradient Toast
          </button>
          <button
            onClick={() =>
              alert.show({
                status: "info",
                title: "New Message",
                message: "You have 3 unread messages",
                icon: <Icon name="bell" animation="bounce" />,
                action: {
                  label: "View",
                  onClick: () => console.log("View messages"),
                },
                duration: 8000,
              })
            }
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            With Action
          </button>
          <button
            onClick={() =>
              alert.show({
                status: "warning",
                variant: "solid",
                message: "Your session will expire in 5 minutes",
                action: {
                  label: "Extend Session",
                  onClick: () => alert.success("Session extended!"),
                  variant: "button",
                },
                duration: 10000,
                showProgress: true,
              })
            }
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Session Warning
          </button>
        </div>
      </div>

      {/* Promise Handling */}
      <div>
        <h5 className="text-sm font-medium mb-2 text-text">Promise Handling</h5>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              alert.promise(saveData(), {
                loading: "Saving your changes...",
                success: "Changes saved successfully!",
                error: "Failed to save changes",
              })
            }
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Save (Success)
          </button>
          <button
            onClick={() =>
              alert
                .promise(failedRequest(), {
                  loading: "Processing request...",
                  success: "Request completed!",
                  error: "Request failed. Please try again.",
                })
                .catch(() => {})
            }
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            Save (Fail)
          </button>
        </div>
      </div>

      {/* Update & Dismiss */}
      <div>
        <h5 className="text-sm font-medium mb-2 text-text">Update & Dismiss</h5>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              const id = alert.info("Loading...", { duration: undefined });
              setTimeout(() => {
                alert.update(id, {
                  status: "success",
                  message: "Completed!",
                  duration: 3000,
                });
              }, 2000);
            }}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Update Alert
          </button>
          <button
            onClick={() => {
              alert.info("Alert 1");
              alert.success("Alert 2");
              alert.warning("Alert 3");
            }}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Multiple Alerts
          </button>
          <button
            onClick={() => alert.dismissAll()}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Dismiss All
          </button>
        </div>
      </div>

      {/* Different Animations */}
      <div>
        <h5 className="text-sm font-medium mb-2 text-text">Animations</h5>
        <div className="flex flex-wrap gap-2">
          {(
            [
              "fade",
              "slide-up",
              "slide-down",
              "slide-left",
              "slide-right",
              "scale",
              "bounce",
            ] as const
          ).map((animation) => (
            <button
              key={animation}
              onClick={() =>
                alert.show({
                  status: "info",
                  message: `${animation} animation`,
                  animation,
                  duration: 3000,
                })
              }
              className="px-3 py-1.5 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors"
            >
              {animation}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const GlobalAlertExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">
        Global Alerts (Toast System)
      </h3>

      {/* Position Examples */}
      <section className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Default Position: Top Right
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Wrap your app with AlertProvider and use the useAlert hook anywhere.
        </p>

        <AlertProvider
          position="top-right"
          maxAlerts={5}
          defaultDuration={5000}
          defaultAnimation="slide-left"
        >
          <ToastDemoButtons />
        </AlertProvider>
      </section>
    </div>
  );
};

// ============================================
// DIFFERENT POSITIONS EXAMPLE
// ============================================

const PositionDemo = ({ position }: { position: string }) => {
  const alert = useAlert();

  return (
    <button
      onClick={() =>
        alert.show({
          status: "info",
          message: `Alert from ${position}`,
          duration: 3000,
        })
      }
      className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
    >
      {position}
    </button>
  );
};

export const PositionExamples = () => {
  const positions = [
    "top-left",
    "top-center",
    "top-right",
    "middle-left",
    "middle-center",
    "middle-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ] as const;

  const [currentPosition, setCurrentPosition] =
    useState<(typeof positions)[number]>("top-right");

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Alert Positions</h3>

      <div className="mb-4">
        <label className="text-sm font-medium text-text">
          Select Position:
        </label>
        <select
          value={currentPosition}
          onChange={(e) =>
            setCurrentPosition(e.target.value as (typeof positions)[number])
          }
          className="ml-2 px-3 py-1.5 border rounded-lg bg-background text-text"
        >
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>

      <AlertProvider position={currentPosition} maxAlerts={3}>
        <PositionDemo position={currentPosition} />
      </AlertProvider>
    </div>
  );
};

// ============================================
// ALL VARIANTS SHOWCASE
// ============================================

export const VariantShowcase = () => {
  const variants = [
    "solid",
    "subtle",
    "outline",
    "left-accent",
    "top-accent",
    "glass",
    "gradient",
    "minimal",
  ] as const;

  const statuses = ["info", "success", "warning", "danger", "neutral"] as const;

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">
        All Variants & Statuses
      </h3>

      {variants.map((variant) => (
        <section key={variant} className="mb-8">
          <h4 className="text-lg font-semibold mb-4 text-text capitalize">
            {variant} Variant
          </h4>
          <div className="space-y-3">
            {statuses.map((status) => (
              <Alert
                key={`${variant}-${status}`}
                variant={variant}
                status={status}
                message={`${variant} variant with ${status} status`}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

// ============================================
// ICON SHOWCASE
// ============================================

export const IconShowcase = () => {
  const icons = [
    "close",
    "check",
    "checkCircle",
    "x",
    "xCircle",
    "alertTriangle",
    "alertCircle",
    "infoCircle",
    "bell",
    "shield",
    "lightning",
    "star",
    "heart",
    "fire",
  ] as const;

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Available Icons</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {icons.map((iconName) => (
          <div
            key={iconName}
            className="flex items-center gap-3 p-4 border rounded-lg bg-background"
          >
            <Icon name={iconName} className="w-6 h-6 text-text" />
            <span className="text-sm text-text">{iconName}</span>
          </div>
        ))}
      </div>

      <h4 className="text-lg font-semibold mt-8 mb-4 text-text">
        Special Animated Icons
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 border rounded-lg bg-background">
          <Spinner className="w-6 h-6 text-blue-600" />
          <span className="text-sm text-text">Spinner</span>
        </div>
        <div className="flex items-center gap-3 p-4 border rounded-lg bg-background">
          <AnimatedCheck className="w-6 h-6 text-green-600" />
          <span className="text-sm text-text">AnimatedCheck</span>
        </div>
        <div className="flex items-center gap-3 p-4 border rounded-lg bg-background">
          <AnimatedX className="w-6 h-6 text-red-600" />
          <span className="text-sm text-text">AnimatedX</span>
        </div>
      </div>

      <h4 className="text-lg font-semibold mt-8 mb-4 text-text">
        Icon Animations
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-4 border rounded-lg bg-background">
          <Icon name="bell" animation="none" className="w-6 h-6 text-text" />
          <span className="text-sm text-text">none</span>
        </div>
        <div className="flex items-center gap-3 p-4 border rounded-lg bg-background">
          <Icon name="bell" animation="pulse" className="w-6 h-6 text-text" />
          <span className="text-sm text-text">pulse</span>
        </div>
        <div className="flex items-center gap-3 p-4 border rounded-lg bg-background">
          <Icon name="bell" animation="bounce" className="w-6 h-6 text-text" />
          <span className="text-sm text-text">bounce</span>
        </div>
        <div className="flex items-center gap-3 p-4 border rounded-lg bg-background">
          <Icon name="bell" animation="shake" className="w-6 h-6 text-text" />
          <span className="text-sm text-text">shake</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPLETE DEMO PAGE
// ============================================

export const AlertDemoPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2 text-text">Alert Component</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12">
        A comprehensive alert system with inline alerts and global toast
        notifications.
      </p>

      <AlertExample />
      <GlobalAlertExample />
      <PositionExamples />
      <VariantShowcase />
      <IconShowcase />
    </div>
  );
};

export default AlertDemoPage;
