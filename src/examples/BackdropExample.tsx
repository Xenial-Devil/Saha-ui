"use client";

import { useState } from "react";
import Backdrop from "../components/Backdrop";

export default function BackdropExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Backdrop</h2>
        <p className="text-muted-foreground">
          Dim the page when showing modal content.
        </p>
      </div>

      {/* Basic Use */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Use</h3>
        <div className="bg-muted/30 p-6 rounded-lg">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Show Backdrop
          </button>

          <Backdrop open={open} onClick={() => setOpen(false)}>
            <div className="bg-background p-6 rounded">
              Modal content goes here
            </div>
          </Backdrop>
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Variants</h3>
        <p className="text-sm text-muted-foreground">
          Adjust opacity or add blur for different visual emphasis.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="p-4">
            Opaque and blurred variations depend on props (demo omitted).
          </div>
        </div>
      </section>

      {/* Real World Example */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real World Example</h3>
        <p className="text-sm text-muted-foreground">
          Backdrop is commonly used with modals and dialogs.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Open Dialog (with Backdrop)
          </button>
        </div>
      </section>
    </div>
  );
}
