"use client";

import { useState } from "react";
import Tour from "../components/Tour";

export default function TourExample() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [controlledOpen, setControlledOpen] = useState(false);
  const [controlledStep, setControlledStep] = useState(0);
  const [completedTours, setCompletedTours] = useState(0);

  const basicSteps = [
    {
      id: "basic-1",
      title: "Welcome",
      description: "This top area shows global navigation and quick actions.",
      target: "#tour-basic-header",
      placement: "bottom" as const,
    },
    {
      id: "basic-2",
      title: "Search",
      description: "Use search to quickly navigate to projects and settings.",
      target: "#tour-basic-search",
      placement: "right" as const,
    },
    {
      id: "basic-3",
      title: "Create",
      description: "Start new tasks and drafts from this action button.",
      target: "#tour-basic-create",
      placement: "left" as const,
    },
  ];

  const controlledSteps = [
    {
      id: "advanced-1",
      title: "Analytics Panel",
      description: "Track engagement and usage from this dashboard section.",
      target: "#tour-advanced-analytics",
      placement: "bottom" as const,
    },
    {
      id: "advanced-2",
      title: "Alert Channel",
      description: "Set where incident alerts should be delivered.",
      target: "#tour-advanced-alerts",
      placement: "top" as const,
    },
    {
      id: "advanced-3",
      title: "Policy Controls",
      description: "Manage approval rules for releases and billing actions.",
      target: "#tour-advanced-policy",
      placement: "left" as const,
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Tour</h2>
        <p className="text-muted-foreground">
          Guided onboarding with step-by-step highlighting for important UI
          zones.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="rounded-lg bg-muted/30 p-6 space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div
              id="tour-basic-header"
              className="rounded-md bg-card p-3 border border-border"
            >
              Global Header
            </div>
            <div
              id="tour-basic-search"
              className="rounded-md bg-card p-3 border border-border"
            >
              Search Bar
            </div>
            <div
              id="tour-basic-create"
              className="rounded-md bg-card p-3 border border-border"
            >
              Create Button
            </div>
          </div>

          <button
            className="rounded bg-primary px-4 py-2 text-primary-foreground"
            onClick={() => setBasicOpen(true)}
          >
            Start Basic Tour
          </button>

          <Tour
            open={basicOpen}
            onClose={() => setBasicOpen(false)}
            onFinish={() => {
              setBasicOpen(false);
              setCompletedTours((value) => value + 1);
            }}
            steps={basicSteps}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Normal Usage</h3>
        <div className="rounded-lg bg-muted/30 p-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            Standard onboarding flow with progress and close controls.
          </p>
          <Tour
            open={false}
            onClose={() => {}}
            steps={basicSteps}
            mask
            showProgress
            showStepNumbers
          />
          <p className="text-xs text-muted-foreground">
            This section demonstrates default setup options for production
            onboarding.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Advanced Usage</h3>
        <div className="rounded-lg bg-muted/30 p-6 space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div
              id="tour-advanced-analytics"
              className="rounded-md border border-border bg-card p-3"
            >
              Analytics
            </div>
            <div
              id="tour-advanced-alerts"
              className="rounded-md border border-border bg-card p-3"
            >
              Alerts
            </div>
            <div
              id="tour-advanced-policy"
              className="rounded-md border border-border bg-card p-3"
            >
              Policy
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="rounded bg-primary px-4 py-2 text-primary-foreground"
              onClick={() => {
                setControlledStep(0);
                setControlledOpen(true);
              }}
            >
              Start Controlled Tour
            </button>
            <button
              className="rounded border border-border bg-card px-4 py-2"
              onClick={() =>
                setControlledStep((value) => Math.max(0, value - 1))
              }
            >
              Previous Step
            </button>
            <button
              className="rounded border border-border bg-card px-4 py-2"
              onClick={() =>
                setControlledStep((value) =>
                  Math.min(controlledSteps.length - 1, value + 1),
                )
              }
            >
              Next Step
            </button>
          </div>

          <Tour
            open={controlledOpen}
            current={controlledStep}
            onChange={setControlledStep}
            onClose={() => {
              setControlledOpen(false);
              setControlledStep(0);
            }}
            onFinish={() => {
              setControlledOpen(false);
              setControlledStep(0);
              setCompletedTours((value) => value + 1);
            }}
            steps={controlledSteps}
            placement="bottom"
            maskStyle="rounded"
            gap={10}
          />

          <p className="text-xs text-muted-foreground">
            Current controlled step index: {controlledStep}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real-Life Use Cases</h3>
        <div className="rounded-lg bg-muted/30 p-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            Use tours for onboarding, feature launches, and contextual guidance
            in admin dashboards.
          </p>
          <p className="text-xs text-muted-foreground">
            Completed tours in this session: {completedTours}
          </p>
        </div>
      </section>
    </div>
  );
}
