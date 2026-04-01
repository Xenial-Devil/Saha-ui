import { useMemo, useState } from "react";
import { NotificationCenter } from "../components/NotificationCenter";
import type { NotificationItem } from "../components/NotificationCenter/NotificationCenter.types";

const notificationImportHint =
  'import { Notification } from "../components/Notification";';

const seedActivity: NotificationItem[] = [
  {
    id: "x1",
    title: "Deployment completed",
    message: "All services are healthy.",
    read: false,
    type: "success",
    timestamp: new Date(),
  },
  {
    id: "x2",
    title: "Review needed",
    message: "PR #212 awaits review.",
    read: false,
    type: "info",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "x3",
    title: "Database migration queued",
    message: "Approval required before execution.",
    read: true,
    type: "warning",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];

export const NotificationExample = () => {
  const [activity, setActivity] = useState<NotificationItem[]>(seedActivity);

  const unreadCount = useMemo(
    () => activity.filter((item) => !item.read).length,
    [activity],
  );

  const markAsRead = (id: string) => {
    setActivity((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  };

  const markAllAsRead = () => {
    setActivity((current) => current.map((item) => ({ ...item, read: true })));
  };

  const clearAll = () => {
    setActivity([]);
  };

  const resetFeed = () => {
    setActivity(seedActivity);
  };

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Notification Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Notification usage guidance and practical in-app activity center
          patterns.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Reference import path for the dedicated Notification module.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <pre className="rounded bg-muted p-3 text-xs">
              <code>{notificationImportHint}</code>
            </pre>
            <p className="mt-4 text-sm text-muted-foreground">
              In this repository, NotificationCenter is used as the interactive
              in-app notification surface.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep setup minimal so teams can adopt the component quickly.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Keep import examples explicit and copy-paste friendly.</li>
              <li>- Clarify where interactive state is managed.</li>
              <li>- Pair docs with a runnable UI demonstration.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Use NotificationCenter as the default in-app notification experience.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <NotificationCenter
              notifications={activity}
              title="Notifications"
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Current unread count: {unreadCount}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This pattern maps to everyday product screens and forms.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Keep titles focused on user decisions.</li>
              <li>- Show concise messages first, details on demand.</li>
              <li>- Surface unread count in context for quick triage.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Add read-state callbacks and clear-all handlers for full control.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <NotificationCenter
              notifications={activity}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onClearAll={clearAll}
              variant="glass"
              align="end"
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Actions update local state instantly to mimic production behavior.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced mode should compose cleanly with app state and callbacks.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Track callback side effects in analytics if required.</li>
              <li>- Keep clear-all behavior intentional and reversible.</li>
              <li>- Avoid mixing unread state with unrelated form state.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Common in operations dashboards, approvals, and release monitoring.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              <NotificationCenter
                notifications={activity}
                title="Team Activity"
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
                onClearAll={clearAll}
                maxVisible={4}
              />
              <button
                type="button"
                onClick={resetFeed}
                className="rounded-md border border-border px-3 py-1 text-sm text-foreground hover:bg-muted"
              >
                Reset feed
              </button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Demo reset keeps this example reusable during design reviews.
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
              <li>- Keep alert semantics aligned with business criticality.</li>
              <li>- Use timestamps so users can trust event ordering.</li>
              <li>- Make it easy to recover from accidental clears.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotificationExample;
