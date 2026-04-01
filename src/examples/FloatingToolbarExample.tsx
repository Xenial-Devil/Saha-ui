import { useState } from "react";
import { FloatingToolbar } from "../components/FloatingToolbar";
import Button from "../components/Button";

export const FloatingToolbarExample = () => {
  const [lastAction, setLastAction] = useState("No action selected");

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          FloatingToolbar Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Floating action strips for editor tools and high-frequency commands.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Bottom-position toolbar with common formatting actions.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <FloatingToolbar>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setLastAction("Bold")}
              >
                Bold
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setLastAction("Italic")}
              >
                Italic
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setLastAction("Link")}
              >
                Link
              </Button>
            </FloatingToolbar>
            <p className="mt-4 text-sm text-muted-foreground">
              Last action: {lastAction}
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
              <li>- Start with primary user actions only.</li>
              <li>- Keep labels short for compact floating controls.</li>
              <li>- Provide immediate interaction feedback when possible.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Switch position for side utilities and dense tool panels.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <FloatingToolbar position="right">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setLastAction("Add comment")}
              >
                Comment
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setLastAction("Open history")}
              >
                History
              </Button>
            </FloatingToolbar>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This pattern maps to everyday product screens and forms.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Right or left position works well for utility actions.</li>
              <li>- Keep icon/text consistency between toolbar locations.</li>
              <li>- Confirm focus order remains keyboard-friendly.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Customize toolbar style while preserving semantic action groups.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <FloatingToolbar
              position="top"
              className="rounded-2xl border-primary/30"
            >
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setLastAction("Undo")}
              >
                Undo
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setLastAction("Redo")}
              >
                Redo
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setLastAction("Toggle review mode")}
              >
                Review
              </Button>
            </FloatingToolbar>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced mode should compose cleanly with app state and callbacks.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Keep grouping based on user intent, not visual style.</li>
              <li>- Use consistent callback naming for all toolbar actions.</li>
              <li>
                - Avoid overloading the floating region with low-value actions.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Ideal for editors, whiteboards, and visual composition tools.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <FloatingToolbar position="bottom">
              <Button
                size="sm"
                variant="primary"
                onClick={() => setLastAction("Publish")}
              >
                Publish
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setLastAction("Preview")}
              >
                Preview
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setLastAction("Share")}
              >
                Share
              </Button>
            </FloatingToolbar>
            <p className="mt-4 text-sm text-muted-foreground">
              Workflow state: {lastAction}
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
              <li>- Prioritize actions by frequency and business value.</li>
              <li>- Keep destructive actions out of primary quick bars.</li>
              <li>- Make toolbar behavior predictable across screen sizes.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FloatingToolbarExample;
