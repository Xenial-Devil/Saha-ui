"use client";
import { Paper } from "../components/Paper";

export default function PaperExample() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Paper</h2>
        <p className="text-muted-foreground">
          Surface container used for cards and panels.
        </p>
      </div>

      {/* Basic Use */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Use</h3>
        <div className="bg-muted/30 p-6 rounded-lg">
          <Paper className="p-6">
            <h3 className="text-lg font-medium">Paper Title</h3>
            <p className="text-muted-foreground mt-2">
              Paper body content goes here.
            </p>
          </Paper>
        </div>
      </section>

      {/* Variants & Elevation */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Variants & Elevation</h3>
        <div className="bg-muted/30 p-6 rounded-lg grid grid-cols-3 gap-4">
          <Paper elevation={0} className="p-4">
            Elevation 0
          </Paper>
          <Paper elevation={1} className="p-4">
            Elevation 1
          </Paper>
          <Paper elevation={3} className="p-4">
            Elevation 3
          </Paper>
        </div>
      </section>

      {/* Real World */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real World Example</h3>
        <p className="text-sm text-muted-foreground">
          Paper is useful for cards, panels and content blocks.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <Paper className="p-6">
            <h4 className="font-semibold">Card Title</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Supportive card content and actions.
            </p>
          </Paper>
        </div>
      </section>
    </div>
  );
}
