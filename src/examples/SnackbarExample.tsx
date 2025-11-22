"use client";

import { useState } from "react";
import { Snackbar } from "../components/Snackbar";

export default function SnackbarExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Snackbar</h2>
        <p className="text-muted-foreground">
          Temporary messages that appear at the bottom of the screen.
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
            Show Snackbar
          </button>

          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            message="This is a snackbar message"
          />
        </div>
      </section>

      {/* Variants & Position */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Variants & Position</h3>
        <p className="text-sm text-muted-foreground">
          Snackbars can appear in different positions and styles
          (success/error).
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="p-2">
            Click the button to trigger different snackbar variants in your app.
          </div>
        </div>
      </section>

      {/* Real World */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real World Example</h3>
        <p className="text-sm text-muted-foreground">
          Use Snackbar for lightweight notifications after actions
          (save/delete).
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
            onClick={() => setOpen(true)}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  );
}
