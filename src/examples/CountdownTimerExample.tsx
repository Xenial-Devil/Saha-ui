import { useMemo, useState } from "react";
import { CountdownTimer } from "../components/CountdownTimer";

const minutesFromNow = (minutes: number) =>
  new Date(Date.now() + minutes * 60 * 1000);
const hoursFromNow = (hours: number) =>
  new Date(Date.now() + hours * 60 * 60 * 1000);
const daysFromNow = (days: number) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000);

export const CountdownTimerExample = () => {
  const [selectedWindow, setSelectedWindow] = useState<
    "short" | "medium" | "long"
  >("medium");
  const [completeCount, setCompleteCount] = useState(0);

  const selectedTarget = useMemo(() => {
    if (selectedWindow === "short") return minutesFromNow(45);
    if (selectedWindow === "long") return daysFromNow(7);
    return hoursFromNow(24);
  }, [selectedWindow]);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          CountdownTimer Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Deadline and launch counters for campaigns, events, and release
          workflows.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Simple countdown to a near-term deadline.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <CountdownTimer targetDate={hoursFromNow(1)} />
            <CountdownTimer targetDate={minutesFromNow(90)} size="sm" />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use defaults for quick launch deadlines.</li>
              <li>• Keep timers visible near related call-to-actions.</li>
              <li>• Use short windows for checkout or hold-time flows.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Use visual variants and labels for dashboard blocks.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded px-3 py-1.5 text-sm ${
                  selectedWindow === "short"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => setSelectedWindow("short")}
              >
                45 min
              </button>
              <button
                type="button"
                className={`rounded px-3 py-1.5 text-sm ${
                  selectedWindow === "medium"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => setSelectedWindow("medium")}
              >
                24 hours
              </button>
              <button
                type="button"
                className={`rounded px-3 py-1.5 text-sm ${
                  selectedWindow === "long"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => setSelectedWindow("long")}
              >
                7 days
              </button>
            </div>

            <CountdownTimer
              targetDate={selectedTarget}
              variant="glass"
              size="md"
              showLabels
            />
            <CountdownTimer
              targetDate={hoursFromNow(8)}
              variant="secondary"
              size="sm"
              showLabels
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Variants help align timer emphasis with context.</li>
              <li>• Keep selectable windows simple and meaningful.</li>
              <li>• Show labels for user-facing deadline clarity.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Attach completion callbacks for automation and UI transitions.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <CountdownTimer
              targetDate={minutesFromNow(1)}
              variant="outline"
              size="lg"
              onComplete={() => setCompleteCount((value) => value + 1)}
            />
            <CountdownTimer
              targetDate={hoursFromNow(36)}
              variant="primary"
              size="xl"
              showLabels
              onComplete={() => setCompleteCount((value) => value + 1)}
            />
            <p className="text-xs text-muted-foreground">
              Completion callbacks fired: {completeCount}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>
                • Callbacks can trigger toasts, state updates, or redirects.
              </li>
              <li>• Keep completion side effects idempotent.</li>
              <li>• Use larger sizes only when timer is primary content.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Suitable for launch pages, promo banners, and maintenance windows.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Release Window
              </p>
              <CountdownTimer
                targetDate={daysFromNow(7)}
                variant="primary"
                size="xl"
                showLabels
              />
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Maintenance Starts In
              </p>
              <CountdownTimer
                targetDate={hoursFromNow(12)}
                variant="outline"
                size="md"
                showLabels
              />
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Great for campaign deadlines and scheduled outages.</li>
              <li>• Pair with messaging that explains the timer purpose.</li>
              <li>• Keep timers timezone-aware in production apps.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CountdownTimerExample;
