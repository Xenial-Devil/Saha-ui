"use client";
import { useState } from "react";
import { Paper } from "../components/Paper";

export default function PaperExample() {
  const [selectedPanel, setSelectedPanel] = useState("Overview");

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Paper Component</h2>
        <p className="text-muted-foreground">
          Surface container used for cards and panels.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Start with simple surfaces for content grouping.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="grid gap-4 rounded-xl border border-border bg-card p-5 md:grid-cols-2">
            <Paper elevation={1} className="p-5">
              <h4 className="text-base font-semibold text-foreground">
                Project Overview
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Shared summary panel for sprint goals and release notes.
              </p>
            </Paper>
            <Paper elevation={0} variant="outlined" className="p-5">
              <h4 className="text-base font-semibold text-foreground">
                Checklist
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Structured tasks with subtle visual separation.
              </p>
            </Paper>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use low elevation for dense layouts.</li>
              <li>• Outlined variant works well in data-heavy dashboards.</li>
              <li>• Keep internal spacing consistent with design tokens.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Compare elevation and shape options for common card systems.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="grid gap-4 rounded-xl border border-border bg-card p-5 md:grid-cols-3">
            <Paper elevation={0} rounded="sm" className="p-4 text-sm">
              Elevation 0
            </Paper>
            <Paper elevation={2} rounded="md" className="p-4 text-sm">
              Elevation 2
            </Paper>
            <Paper elevation={5} rounded="xl" className="p-4 text-sm">
              Elevation 5
            </Paper>
            <Paper variant="filled" className="p-4 text-sm">
              Filled Variant
            </Paper>
            <Paper variant="outlined" className="p-4 text-sm">
              Outlined Variant
            </Paper>
            <Paper variant="glass" className="p-4 text-sm">
              Glass Variant
            </Paper>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Reserve high elevations for prioritized callouts.</li>
              <li>• Choose one radius scale per screen to reduce noise.</li>
              <li>• Keep variant usage consistent by section type.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Combine hover behavior, custom padding, and interaction states.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="grid gap-4 rounded-xl border border-border bg-card p-5 md:grid-cols-2">
            <Paper
              variant="gradient"
              elevation={3}
              padding={28}
              hoverable
              className="cursor-pointer"
              onClick={() => setSelectedPanel("Overview")}
            >
              <h4 className="text-base font-semibold text-foreground">
                Overview Panel
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Click to mark this panel as active for review.
              </p>
            </Paper>
            <Paper
              variant="glass"
              elevation={2}
              padding="lg"
              hoverable
              className="cursor-pointer"
              onClick={() => setSelectedPanel("Metrics")}
            >
              <h4 className="text-base font-semibold text-foreground">
                Metrics Panel
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Useful for quick KPI cards in command centers.
              </p>
            </Paper>
            <Paper centered maxWidth="md" className="md:col-span-2 p-5">
              <p className="text-sm text-muted-foreground">
                Active panel selection:{" "}
                <span className="font-medium text-foreground">
                  {selectedPanel}
                </span>
              </p>
            </Paper>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Hoverable papers suit click-driven dashboards.</li>
              <li>• Numeric padding can fine-tune dense card layouts.</li>
              <li>• Keep active-state indicators visible and simple.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Build operational dashboards with stacked paper sections.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <Paper variant="outlined" elevation={1} className="p-5">
              <h4 className="text-base font-semibold text-foreground">
                Incident Queue
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                6 open incidents require triage before end of day.
              </p>
            </Paper>
            <Paper variant="filled" elevation={2} className="p-5">
              <h4 className="text-base font-semibold text-foreground">
                Release Health
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Canary error rate is within acceptable threshold.
              </p>
            </Paper>
            <Paper variant="glass" elevation={1} className="p-5">
              <h4 className="text-base font-semibold text-foreground">
                Action Required
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Schedule stakeholder review for rollout checkpoint.
              </p>
            </Paper>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Combine variant and elevation to guide attention.</li>
              <li>• Use paper blocks to break complex pages into tasks.</li>
              <li>• Keep hierarchy clear with consistent headings.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
