"use client";

import { useState } from "react";
import Tour from "../components/Tour";

export default function TourExample() {
  const [open, setOpen] = useState(false);

  const steps = [
    {
      id: "1",
      title: "Welcome",
      description: "Intro to the app",
      target: () => document.body,
    },
    {
      id: "2",
      title: "Feature",
      description: "Explain a feature",
      target: () => document.body,
    },
  ];

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Tour</h2>
        <p className="text-muted-foreground">
          Guided tour for onboarding users.
        </p>
      </div>

      {/* Basic Use */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Use</h3>
        <div className="bg-muted/30 p-6 rounded-lg">
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
            onClick={() => setOpen(true)}
          >
            Start Tour
          </button>

          <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </div>
      </section>

      {/* Controlled & Real World */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Controlled Mode & Real World</h3>
        <p className="text-sm text-muted-foreground">
          Control steps programmatically and hook into navigation events.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Typical use: onboarding flows, feature highlights.
          </p>
        </div>
      </section>
    </div>
  );
}
