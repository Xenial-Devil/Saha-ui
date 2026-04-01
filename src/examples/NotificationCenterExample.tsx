import { useMemo, useState } from "react";
import { NotificationCenter } from "../components/NotificationCenter";
import type { NotificationItem } from "../components/NotificationCenter/NotificationCenter.types";

const seedNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Build succeeded",
    message: "Production deployment is healthy.",
    timestamp: new Date(),
    read: false,
    type: "success",
  },
  {
    id: "n2",
    title: "Review requested",
    message: "Please review PR #142.",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: true,
    type: "info",
  },
  {
    id: "n3",
    title: "Latency spike",
    message: "API p95 exceeded threshold.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    type: "warning",
  },
];

export const NotificationCenterExample = () => {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(seedNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  );

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true })),
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const restore = () => {
    setNotifications(seedNotifications);
  };

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          NotificationCenter Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Centralized notification UI with read-state management and grouped
          updates.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Start with default trigger behavior and a lightweight feed.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <NotificationCenter notifications={notifications} />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep setup minimal so teams can adopt the component quickly.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- The default bell trigger is enough for most products.</li>
              <li>- Keep payloads small and focused on user decisions.</li>
              <li>- Reserve custom styling for established app shells.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Wire callbacks so read status and clearing behavior update local
          state.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onClearAll={clearAll}
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Unread notifications: {unreadCount}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This pattern maps to everyday product screens and operations
              dashboards.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Use `onMarkAsRead` for per-item interactions.</li>
              <li>- Keep `onMarkAllAsRead` and `onClearAll` explicit.</li>
              <li>- Store read state in app-level persistence when needed.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Tune panel size, alignment, and visual style for app-shell
          integration.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <NotificationCenter
              notifications={notifications}
              variant="glass"
              align="end"
              maxVisible={3}
              width={360}
              onMarkAsRead={markAsRead}
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced mode should compose cleanly with app state and callback
              orchestration.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Set `maxVisible` to keep popovers readable.</li>
              <li>- `width` helps align notification density with UX goals.</li>
              <li>- Match variant tokens with your shell visual system.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Ideal for incident updates, approvals, and activity streams in busy
          product teams.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              <NotificationCenter
                notifications={notifications}
                title="Ops Alerts"
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
                onClearAll={clearAll}
              />
              <button
                type="button"
                onClick={restore}
                className="rounded-md border border-border px-3 py-1 text-sm text-foreground hover:bg-muted"
              >
                Restore seed data
              </button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Use reset actions in demos so users can repeatedly test behavior.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Show how the component fits real workflows, not isolated UI demos.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Pair alerts with actionable links or next steps.</li>
              <li>- Keep feed order time-based for trust and clarity.</li>
              <li>- Ensure unread count stays accurate after every action.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotificationCenterExample;
