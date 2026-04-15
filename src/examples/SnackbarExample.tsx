"use client";

import { useState } from "react";
import { Snackbar } from "../components/Snackbar";
import type {
  SnackbarPosition,
  SnackbarSeverity,
  SnackbarVariant,
} from "../components/Snackbar/Snackbar.types";

type SnackConfig = {
  message: string;
  severity: SnackbarSeverity;
  variant: SnackbarVariant;
  position: SnackbarPosition;
  autoHideDuration: number | null;
  showClose?: boolean;
  showIcon?: boolean;
};

const defaultConfig: SnackConfig = {
  message: "Changes saved successfully.",
  severity: "success",
  variant: "filled",
  position: "bottom-center",
  autoHideDuration: 3000,
  showClose: true,
  showIcon: true,
};

export default function SnackbarExample() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<SnackConfig>(defaultConfig);
  const [lastNotification, setLastNotification] = useState(
    "No notifications sent yet.",
  );

  const triggerSnackbar = (nextConfig: Partial<SnackConfig>) => {
    const merged = { ...defaultConfig, ...nextConfig };
    setConfig(merged);
    setLastNotification(`${merged.severity.toUpperCase()}: ${merged.message}`);
    setOpen(true);
  };

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Snackbar Component
        </h2>
        <p className="text-muted-foreground">
          Temporary messages that appear at the bottom of the screen.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Trigger a lightweight success message after simple actions.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <button
              className="rounded bg-primary px-4 py-2 text-primary-foreground"
              onClick={() =>
                triggerSnackbar({
                  message: "This is a snackbar message.",
                  severity: "default",
                  variant: "filled",
                })
              }
            >
              Show Snackbar
            </button>
            <p className="text-xs text-muted-foreground">{lastNotification}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Keep default messages short and actionable.</li>
              <li>• Use auto-hide for non-blocking confirmations.</li>
              <li>• Avoid stacking too many snackbars at once.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Showcase common variants and positions for product notifications.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex flex-wrap gap-2">
              <button
                className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground"
                onClick={() =>
                  triggerSnackbar({
                    message: "Profile updated successfully.",
                    severity: "success",
                    variant: "filled",
                    position: "bottom-center",
                  })
                }
              >
                Success
              </button>
              <button
                className="rounded border border-border bg-card px-3 py-1.5 text-sm"
                onClick={() =>
                  triggerSnackbar({
                    message: "Network appears unstable.",
                    severity: "warning",
                    variant: "soft",
                    position: "top-right",
                  })
                }
              >
                Warning
              </button>
              <button
                className="rounded border border-border bg-card px-3 py-1.5 text-sm"
                onClick={() =>
                  triggerSnackbar({
                    message: "Failed to save settings.",
                    severity: "error",
                    variant: "outlined",
                    position: "top-center",
                    autoHideDuration: 5000,
                  })
                }
              >
                Error
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use severity to communicate urgency quickly.</li>
              <li>• Top positions suit global page events.</li>
              <li>• Outlined and soft variants reduce visual heaviness.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Add actions, persistent notifications, and close behavior controls.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <button
              className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground"
              onClick={() =>
                triggerSnackbar({
                  message: "File archived. Undo available for 10 seconds.",
                  severity: "info",
                  variant: "filled",
                  position: "bottom-right",
                  autoHideDuration: null,
                  showClose: true,
                })
              }
            >
              Persistent Info Snackbar
            </button>

            <button
              className="rounded border border-border bg-card px-3 py-1.5 text-sm"
              onClick={() =>
                triggerSnackbar({
                  message: "Sync complete without icon.",
                  severity: "success",
                  variant: "soft",
                  showIcon: false,
                })
              }
            >
              No-Icon Variant
            </button>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Keep persistent snackbars dismissible.</li>
              <li>• Use actions for reversible operations only.</li>
              <li>• Disable icons selectively in minimal interfaces.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Use Snackbar for lightweight notifications after actions
          (save/delete).
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
              <h4 className="text-sm font-semibold text-foreground">
                Document Save Flow
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Trigger save feedback with an undo action for accidental
                updates.
              </p>
              <button
                className="mt-3 rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground"
                onClick={() =>
                  triggerSnackbar({
                    message: "Document saved.",
                    severity: "success",
                    variant: "filled",
                    position: "bottom-center",
                  })
                }
              >
                Save Document
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Tie notifications to meaningful user actions.</li>
              <li>• Keep copy specific to the completed operation.</li>
              <li>• Prefer one snackbar channel across the app shell.</li>
            </ul>
          </div>
        </div>
      </section>

      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        message={config.message}
        severity={config.severity}
        variant={config.variant}
        position={config.position}
        autoHideDuration={config.autoHideDuration}
        showClose={config.showClose}
        showIcon={config.showIcon}
        action={
          config.message.includes("Undo") ? (
            <button
              type="button"
              className="rounded border border-white/30 px-2 py-1 text-xs"
              onClick={() => {
                setOpen(false);
                setLastNotification("UNDO: reverted archive action.");
              }}
            >
              Undo
            </button>
          ) : undefined
        }
      />
    </div>
  );
}
