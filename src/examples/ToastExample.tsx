import React, { useState } from "react";
import { useToast } from "../components/Toast";

export const ToastExample: React.FC = () => {
  const toast = useToast();
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Toast Notifications
        </h2>
        <p className="text-muted-foreground mb-6">
          Advanced toast notification system with multiple positions, variants,
          animations, and features.
        </p>
      </div>

      {/* Basic Status Toasts */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Basic Status Toasts (Flexible Parameters)
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => toast.info("Just a simple info message")}
            className="px-4 py-2 bg-info text-info-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Info (1 param: description)
          </button>

          <button
            onClick={() =>
              toast.success("Operation completed successfully!", "Success")
            }
            className="px-4 py-2 bg-success text-success-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Success (2 params: description + title)
          </button>

          <button
            onClick={() =>
              toast.warning("Please check your settings", {
                variant: "outline",
                position: "top-center",
              })
            }
            className="px-4 py-2 bg-warning text-warning-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Warning (2 params: description + options)
          </button>

          <button
            onClick={() =>
              toast.error("An error occurred", "Error", {
                variant: "glass",
                animation: "bounce",
              })
            }
            className="px-4 py-2 bg-danger text-danger-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Error (3 params: description + title + options)
          </button>
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              toast.toast({
                title: "Solid Variant",
                description: "Full color background with shadows",
                status: "success",
                variant: "solid",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Solid
          </button>

          <button
            onClick={() =>
              toast.toast({
                title: "Subtle Variant",
                description: "Transparent background with border",
                status: "info",
                variant: "subtle",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Subtle
          </button>

          <button
            onClick={() =>
              toast.toast({
                title: "Outline Variant",
                description: "Card background with colored border",
                status: "warning",
                variant: "outline",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Outline
          </button>

          <button
            onClick={() =>
              toast.toast({
                title: "Glass Variant",
                description: "Frosted glass effect with blur",
                status: "danger",
                variant: "glass",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Glass
          </button>
        </div>
      </section>

      {/* Positions */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Positions</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() =>
              toast.success("Top Left Position", {
                position: "top-left",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Top Left
          </button>

          <button
            onClick={() =>
              toast.success("Top Center Position", {
                position: "top-center",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Top Center
          </button>

          <button
            onClick={() =>
              toast.success("Top Right Position", {
                position: "top-right",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Top Right
          </button>

          <button
            onClick={() =>
              toast.success("Bottom Left Position", {
                position: "bottom-left",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Bottom Left
          </button>

          <button
            onClick={() =>
              toast.success("Bottom Center Position", {
                position: "bottom-center",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Bottom Center
          </button>

          <button
            onClick={() =>
              toast.success("Bottom Right Position", {
                position: "bottom-right",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Bottom Right
          </button>
        </div>
      </section>

      {/* Animations */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Animations</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              toast.info("Sliding in smoothly", {
                animation: "slide",
                title: "Slide Animation",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Slide
          </button>

          <button
            onClick={() =>
              toast.info("Fading in gently", {
                animation: "fade",
                title: "Fade Animation",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Fade
          </button>

          <button
            onClick={() =>
              toast.info("Scaling up", {
                animation: "scale",
                title: "Scale Animation",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Scale
          </button>

          <button
            onClick={() =>
              toast.info("Bouncing in", {
                animation: "bounce",
                title: "Bounce Animation",
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Bounce
          </button>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Advanced Features
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              toast.toast({
                title: "With Action Button",
                description: "Click the action to perform an operation",
                status: "info",
                action: {
                  label: "Undo",
                  onClick: () => alert("Action clicked!"),
                },
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            With Action
          </button>

          <button
            onClick={() =>
              toast.toast({
                title: "Without Icon",
                description: "This toast has no status icon",
                status: "success",
                showIcon: false,
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            No Icon
          </button>

          <button
            onClick={() =>
              toast.toast({
                title: "Without Progress",
                description: "No progress bar shown",
                status: "warning",
                showProgress: false,
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            No Progress
          </button>

          <button
            onClick={() =>
              toast.toast({
                title: "Not Closable",
                description: "Cannot be manually closed",
                status: "danger",
                closable: false,
                duration: 3000,
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Not Closable
          </button>

          <button
            onClick={() =>
              toast.toast({
                title: "Persistent Toast",
                description: "This toast won't auto-dismiss",
                status: "info",
                duration: 0,
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Persistent
          </button>

          <button
            onClick={() =>
              toast.toast({
                title: "Custom Icon",
                description: "Using a custom icon",
                status: "success",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ),
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Custom Icon
          </button>
        </div>
      </section>

      {/* Duration Controls */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Duration Controls
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              toast.success("Disappears in 2 seconds", {
                duration: 2000,
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            2s Duration
          </button>

          <button
            onClick={() =>
              toast.success("Disappears in 5 seconds", {
                duration: 5000,
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            5s Duration
          </button>

          <button
            onClick={() =>
              toast.success("Disappears in 10 seconds", {
                duration: 10000,
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            10s Duration
          </button>
        </div>
      </section>

      {/* Custom Content */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Custom Content
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              toast.toast({
                status: "info",
                variant: "glass",
                children: (
                  <div>
                    <h4 className="font-bold text-lg mb-2">Custom Toast</h4>
                    <p className="text-sm mb-2">
                      You can pass custom React elements
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-current/20 rounded text-xs">
                        Tag 1
                      </span>
                      <span className="px-2 py-1 bg-current/20 rounded text-xs">
                        Tag 2
                      </span>
                    </div>
                  </div>
                ),
              })
            }
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Custom Content
          </button>

          <button
            onClick={() => {
              setCount((c) => c + 1);
              toast.toast({
                status: "success",
                variant: "solid",
                children: (
                  <div>
                    <h4 className="font-bold mb-1">Toast #{count + 1}</h4>
                    <p className="text-sm opacity-90">
                      You've created {count + 1} toast{count !== 0 ? "s" : ""}!
                    </p>
                  </div>
                ),
              });
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Counter Toast
          </button>
        </div>
      </section>

      {/* Promise-based Toasts */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Promise-based Updates
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              const id = toast.info("Loading...", {
                duration: 0,
                showProgress: false,
              });

              // Simulate async operation
              setTimeout(() => {
                toast.update(id, {
                  title: "Success!",
                  description: "Operation completed",
                  status: "success",
                  duration: 3000,
                  showProgress: true,
                });
              }, 2000);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Loading → Success
          </button>

          <button
            onClick={() => {
              const id = toast.info("Processing...", {
                duration: 0,
              });

              setTimeout(() => {
                toast.update(id, {
                  title: "Error!",
                  description: "Something went wrong",
                  status: "danger",
                  duration: 3000,
                });
              }, 2000);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Loading → Error
          </button>
        </div>
      </section>

      {/* Control Actions */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Control Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                  toast.success(`Toast #${i + 1}`, {
                    position: "bottom-right",
                  });
                }, i * 200);
              }
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Show Multiple
          </button>

          <button
            onClick={() => toast.closeAll()}
            className="px-4 py-2 bg-danger text-danger-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Close All
          </button>
        </div>
      </section>

      {/* Complex Example */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Complex Example
        </h3>
        <button
          onClick={() =>
            toast.toast({
              title: "New message received",
              description: "John Doe sent you a message",
              status: "info",
              variant: "glass",
              animation: "slide",
              position: "top-right",
              duration: 8000,
              showIcon: true,
              showProgress: true,
              pauseOnHover: true,
              action: {
                label: "View",
                onClick: () => alert("Opening message..."),
              },
            })
          }
          className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
        >
          Show Complex Toast
        </button>
      </section>
    </div>
  );
};
