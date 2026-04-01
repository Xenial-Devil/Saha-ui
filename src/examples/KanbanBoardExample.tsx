import { useState } from "react";
import { KanbanBoard } from "../components/KanbanBoard";
import type { KanbanColumn } from "../components/KanbanBoard/KanbanBoard.types";

const projectColumns: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: "c1", title: "Draft API spec", owner: "Mila", eta: "2d" },
      { id: "c2", title: "Design review", owner: "Raj", eta: "1d" },
    ],
  },
  {
    id: "doing",
    title: "In Progress",
    cards: [{ id: "c3", title: "Implement auth", owner: "Sam", eta: "3d" }],
  },
  {
    id: "done",
    title: "Done",
    cards: [{ id: "c4", title: "Setup CI", owner: "Ava", eta: "done" }],
  },
];

export const KanbanBoardExample = () => {
  const [activity, setActivity] = useState(
    "No drag-and-drop activity captured yet.",
  );

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          KanbanBoard Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Drag-and-drop task board for sprint planning and execution workflows.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Render a compact board with default columns and cards.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <KanbanBoard columns={projectColumns} />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep setup minimal so teams can adopt the component quickly.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Start with simple columns and descriptive card titles.</li>
              <li>
                - Keep board labels aligned with existing sprint language.
              </li>
              <li>- Avoid introducing custom rendering too early.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Capture card movement callbacks for persistence and audit logs.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <KanbanBoard
              columns={projectColumns}
              onCardMove={(
                cardId,
                sourceColumnId,
                destinationColumnId,
                newIndex,
              ) => {
                setActivity(
                  `${cardId} moved from ${sourceColumnId} to ${destinationColumnId} at position ${newIndex}.`,
                );
              }}
            />
            <p className="mt-4 text-sm text-muted-foreground">{activity}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This pattern maps to everyday product planning and release
              operations.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Persist moves to keep team views synchronized.</li>
              <li>- Log move metadata for metrics and retrospectives.</li>
              <li>- Pair updates with optimistic UI for responsiveness.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Customize card rendering to surface ownership and delivery context.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <KanbanBoard
              columns={projectColumns}
              renderCard={(card) => (
                <div className="rounded-lg border border-border/70 bg-background p-3 text-sm">
                  <p className="font-medium text-foreground">{card.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Owner: {String(card.owner ?? "unassigned")} | ETA:{" "}
                    {String(card.eta ?? "N/A")}
                  </p>
                </div>
              )}
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced mode should compose cleanly with app state and callback
              orchestration.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Keep custom card templates compact and scannable.</li>
              <li>- Avoid hiding core drag affordances with heavy styling.</li>
              <li>- Standardize card metadata for predictable rendering.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Commonly used for product backlogs and release readiness boards.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <KanbanBoard
              columns={projectColumns}
              className="min-h-[320px]"
              onAddCard={(columnId) => {
                setActivity(`Requested new card in column: ${columnId}.`);
              }}
            />
            <p className="mt-4 text-sm text-muted-foreground">{activity}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Show how the component fits real workflows, not isolated UI demos.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Tie card creation to role-based permissions.</li>
              <li>- Reflect board status in release health dashboards.</li>
              <li>
                - Keep interactions predictable across desktop and mobile.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KanbanBoardExample;
