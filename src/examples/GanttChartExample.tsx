import { useState } from "react";
import { GanttChart } from "../components/GanttChart";

const day = 86400000;

const sprintTasks = [
  {
    id: "s1",
    name: "Planning",
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * day),
    progress: 100,
    color: "#3b82f6",
  },
  {
    id: "s2",
    name: "Implementation",
    startDate: new Date(Date.now() + 2 * day),
    endDate: new Date(Date.now() + 6 * day),
    progress: 55,
    color: "#22c55e",
    dependencies: ["s1"],
  },
  {
    id: "s3",
    name: "QA",
    startDate: new Date(Date.now() + 6 * day),
    endDate: new Date(Date.now() + 8 * day),
    progress: 20,
    color: "#f59e0b",
    dependencies: ["s2"],
  },
  {
    id: "s4",
    name: "Release",
    startDate: new Date(Date.now() + 8 * day),
    endDate: new Date(Date.now() + 9 * day),
    progress: 0,
    color: "#ef4444",
    dependencies: ["s3"],
  },
];

const releaseTasks = [
  {
    id: "r1",
    name: "Design Signoff",
    startDate: new Date(),
    endDate: new Date(Date.now() + 4 * day),
    progress: 90,
    color: "#0ea5e9",
  },
  {
    id: "r2",
    name: "Backend Hardening",
    startDate: new Date(Date.now() + 3 * day),
    endDate: new Date(Date.now() + 10 * day),
    progress: 48,
    color: "#14b8a6",
    dependencies: ["r1"],
  },
  {
    id: "r3",
    name: "Security Review",
    startDate: new Date(Date.now() + 9 * day),
    endDate: new Date(Date.now() + 12 * day),
    progress: 22,
    color: "#f97316",
    dependencies: ["r2"],
  },
  {
    id: "r4",
    name: "Pilot Rollout",
    startDate: new Date(Date.now() + 12 * day),
    endDate: new Date(Date.now() + 16 * day),
    progress: 5,
    color: "#8b5cf6",
    dependencies: ["r3"],
  },
  {
    id: "r5",
    name: "Global Launch",
    startDate: new Date(Date.now() + 16 * day),
    endDate: new Date(Date.now() + 20 * day),
    progress: 0,
    color: "#ef4444",
    dependencies: ["r4"],
  },
];

export const GanttChartExample = () => {
  const [plan, setPlan] = useState<"sprint" | "release">("sprint");
  const [rowHeight, setRowHeight] = useState(42);

  const activeTasks = plan === "sprint" ? sprintTasks : releaseTasks;

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          GanttChart Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Timeline planning for projects, releases, and cross-team execution.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Render a simple project plan with three tasks.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <GanttChart tasks={sprintTasks.slice(0, 3)} />
            <GanttChart tasks={sprintTasks.slice(0, 2)} height={220} />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Start with a few tasks to validate visual flow.</li>
              <li>• Use clear task names for cross-team readability.</li>
              <li>• Keep date ranges close to real project cadence.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Constrain chart window for a focused sprint view.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded px-3 py-1.5 text-sm ${
                  plan === "sprint"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => setPlan("sprint")}
              >
                Sprint Plan
              </button>
              <button
                type="button"
                className={`rounded px-3 py-1.5 text-sm ${
                  plan === "release"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => setPlan("release")}
              >
                Release Plan
              </button>
            </div>
            <GanttChart
              tasks={activeTasks}
              startDate={new Date()}
              endDate={
                new Date(Date.now() + (plan === "sprint" ? 12 : 24) * day)
              }
              height={300}
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use focused windows for sprint-level planning.</li>
              <li>• Keep one source of truth for task arrays.</li>
              <li>• Use clear naming for alternate timeline views.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Tune row height and custom coloring for denser roadmaps.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded border border-border bg-background px-3 py-1.5 text-sm"
                onClick={() => setRowHeight(36)}
              >
                Compact Rows
              </button>
              <button
                type="button"
                className="rounded border border-border bg-background px-3 py-1.5 text-sm"
                onClick={() => setRowHeight(42)}
              >
                Default Rows
              </button>
              <button
                type="button"
                className="rounded border border-border bg-background px-3 py-1.5 text-sm"
                onClick={() => setRowHeight(52)}
              >
                Spacious Rows
              </button>
            </div>
            <GanttChart
              tasks={releaseTasks}
              rowHeight={rowHeight}
              height={340}
            />
            <p className="text-xs text-muted-foreground">
              Current row height: {rowHeight}px
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>
                • Row density should match data volume and viewport height.
              </li>
              <li>• Use custom task colors for stream ownership.</li>
              <li>• Keep dependency chains explicit in data models.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Used for release coordination, campaign planning, and migration
          timelines.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Product Release Roadmap
              </p>
              <GanttChart
                tasks={releaseTasks}
                className="rounded-lg border border-border p-2"
              />
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Implementation Sprint
              </p>
              <GanttChart tasks={sprintTasks} height={280} rowHeight={40} />
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use separate boards for sprint and release cadences.</li>
              <li>• Keep dependency assumptions documented for handoffs.</li>
              <li>• Share timeline snapshots during planning rituals.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GanttChartExample;
