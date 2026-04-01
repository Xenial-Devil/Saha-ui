import { type ReactNode, useMemo, useState } from "react";
import { SpotlightSearch } from "../components/SpotlightSearch";

type CommandGroup = {
  heading: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    icon: ReactNode;
    onSelect: () => void;
  }>;
};

export const SpotlightSearchExample = () => {
  const [isControlledOpen, setIsControlledOpen] = useState(false);
  const [activeScope, setActiveScope] = useState<
    "workspace" | "billing" | "incidents"
  >("workspace");
  const [lastCommand, setLastCommand] = useState("No command selected yet.");
  const [recentCommands, setRecentCommands] = useState<string[]>([]);

  const registerCommand = (command: string) => {
    setLastCommand(command);
    setRecentCommands((prev) =>
      [command, ...prev.filter((item) => item !== command)].slice(0, 6),
    );
  };

  const baseCommandData: CommandGroup[] = useMemo(
    () => [
      {
        heading: "Navigation",
        items: [
          {
            id: "nav-dashboard",
            title: "Dashboard",
            description: "Open main analytics dashboard",
            icon: <span className="text-xs font-semibold">DB</span>,
            onSelect: () => registerCommand("Open Dashboard"),
          },
          {
            id: "nav-projects",
            title: "Projects",
            description: "Browse active product projects",
            icon: <span className="text-xs font-semibold">PJ</span>,
            onSelect: () => registerCommand("Browse Projects"),
          },
        ],
      },
      {
        heading: "Quick Actions",
        items: [
          {
            id: "act-release",
            title: "Create Release",
            description: "Start deployment checklist",
            icon: <span className="text-xs font-semibold">RL</span>,
            onSelect: () => registerCommand("Create Release"),
          },
          {
            id: "act-invite",
            title: "Invite Member",
            description: "Invite a new teammate",
            icon: <span className="text-xs font-semibold">IV</span>,
            onSelect: () => registerCommand("Invite Member"),
          },
        ],
      },
    ],
    [],
  );

  const scopeCommandData: Record<
    "workspace" | "billing" | "incidents",
    CommandGroup[]
  > = useMemo(
    () => ({
      workspace: [
        {
          heading: "Workspace",
          items: [
            {
              id: "workspace-files",
              title: "Find File",
              description: "Search design and engineering files",
              icon: <span className="text-xs font-semibold">FF</span>,
              onSelect: () => registerCommand("Workspace: Find File"),
            },
            {
              id: "workspace-people",
              title: "Find Teammate",
              description: "Jump to teammate profile",
              icon: <span className="text-xs font-semibold">TM</span>,
              onSelect: () => registerCommand("Workspace: Find Teammate"),
            },
          ],
        },
      ],
      billing: [
        {
          heading: "Billing",
          items: [
            {
              id: "billing-invoices",
              title: "Recent Invoices",
              description: "Open last 90 days of invoices",
              icon: <span className="text-xs font-semibold">IN</span>,
              onSelect: () => registerCommand("Billing: Recent Invoices"),
            },
            {
              id: "billing-seat",
              title: "Seat Usage",
              description: "Inspect seat consumption",
              icon: <span className="text-xs font-semibold">SU</span>,
              onSelect: () => registerCommand("Billing: Seat Usage"),
            },
          ],
        },
      ],
      incidents: [
        {
          heading: "Incidents",
          items: [
            {
              id: "incident-new",
              title: "Start Incident Room",
              description: "Create a response channel and timeline",
              icon: <span className="text-xs font-semibold">IR</span>,
              onSelect: () => registerCommand("Incidents: Start Incident Room"),
            },
            {
              id: "incident-runbook",
              title: "Open Runbook",
              description: "Open standard operating procedure",
              icon: <span className="text-xs font-semibold">RB</span>,
              onSelect: () => registerCommand("Incidents: Open Runbook"),
            },
          ],
        },
      ],
    }),
    [],
  );

  const recentSummary = useMemo(() => {
    if (recentCommands.length === 0) {
      return "No command history yet.";
    }

    return recentCommands.join(" -> ");
  }, [recentCommands]);

  const controlledData: CommandGroup[] = useMemo(
    () => [
      {
        heading: "Controlled Palette",
        items: [
          {
            id: "controlled-open-release",
            title: "Open Release Checklist",
            description: "Review pre-production checks",
            icon: <span className="text-xs font-semibold">RC</span>,
            onSelect: () =>
              registerCommand("Controlled: Open Release Checklist"),
          },
          {
            id: "controlled-postmortem",
            title: "Create Postmortem",
            description: "Create a new post-incident template",
            icon: <span className="text-xs font-semibold">PM</span>,
            onSelect: () => registerCommand("Controlled: Create Postmortem"),
          },
        ],
      },
    ],
    [],
  );

  const incidentOpsData: CommandGroup[] = useMemo(
    () => [
      {
        heading: "Incident Operations",
        items: [
          {
            id: "ops-page",
            title: "Page On-Call Engineer",
            description: "Trigger primary escalation policy",
            icon: <span className="text-xs font-semibold">OC</span>,
            onSelect: () => registerCommand("Ops: Page On-Call Engineer"),
          },
          {
            id: "ops-drain",
            title: "Drain Traffic",
            description: "Move traffic from unstable nodes",
            icon: <span className="text-xs font-semibold">DT</span>,
            onSelect: () => registerCommand("Ops: Drain Traffic"),
          },
          {
            id: "ops-rollforward",
            title: "Run Roll-Forward",
            description: "Apply hotfix pipeline to production",
            icon: <span className="text-xs font-semibold">RF</span>,
            onSelect: () => registerCommand("Ops: Run Roll-Forward"),
          },
        ],
      },
      {
        heading: "Communication",
        items: [
          {
            id: "ops-status",
            title: "Post Status Update",
            description: "Publish update to status page",
            icon: <span className="text-xs font-semibold">ST</span>,
            onSelect: () => registerCommand("Ops: Post Status Update"),
          },
          {
            id: "ops-summary",
            title: "Share Incident Summary",
            description: "Send summary to leadership channel",
            icon: <span className="text-xs font-semibold">SM</span>,
            onSelect: () => registerCommand("Ops: Share Incident Summary"),
          },
        ],
      },
    ],
    [],
  );

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          SpotlightSearch Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Global command palette and search launcher for keyboard-centric
          navigation.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Start with a simple launcher and grouped command data.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <SpotlightSearch data={baseCommandData}>
              <button
                type="button"
                className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground"
              >
                Open Spotlight
              </button>
            </SpotlightSearch>
            <p className="mt-4 text-sm text-muted-foreground">
              Last command:{" "}
              <span className="font-medium text-foreground">{lastCommand}</span>
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Group commands by intent so users can scan quickly.</li>
              <li>• Keep descriptions short and action-focused.</li>
              <li>• Persist selected command for user feedback.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Switch command datasets by domain without changing the search UI
          pattern.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex flex-wrap gap-2">
              {[
                ["workspace", "Workspace"],
                ["billing", "Billing"],
                ["incidents", "Incidents"],
              ].map(([scope, label]) => (
                <button
                  key={scope}
                  type="button"
                  onClick={() =>
                    setActiveScope(
                      scope as "workspace" | "billing" | "incidents",
                    )
                  }
                  className={`rounded-md border px-3 py-1 text-xs ${
                    activeScope === scope
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <SpotlightSearch
              data={scopeCommandData[activeScope]}
              placeholder={`Search ${activeScope} commands...`}
            >
              <button
                type="button"
                className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground"
              >
                Open {activeScope} Palette
              </button>
            </SpotlightSearch>

            <p className="mt-4 text-xs text-muted-foreground">
              Recent commands: {recentSummary}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Scope-aware data keeps results relevant and fast.</li>
              <li>• Reuse one trigger style across product modules.</li>
              <li>• Keep command identifiers stable for analytics.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Control the open state from a parent shell for global keyboard and
          layout coordination.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={() => setIsControlledOpen(true)}
                className="rounded-md border border-border px-3 py-1 text-xs text-foreground"
              >
                Open Controlled Palette
              </button>
              <button
                type="button"
                onClick={() => setIsControlledOpen(false)}
                className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                Close
              </button>
            </div>

            <SpotlightSearch
              data={controlledData}
              open={isControlledOpen}
              onOpenChange={setIsControlledOpen}
              placeholder="Run release and incident commands..."
            >
              <button
                type="button"
                className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground"
              >
                Controlled Spotlight
              </button>
            </SpotlightSearch>

            <p className="mt-4 text-xs text-muted-foreground">
              Palette state: {isControlledOpen ? "open" : "closed"}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Controlled mode is ideal for app-shell orchestration.</li>
              <li>• Parent state can synchronize search with route changes.</li>
              <li>• Keep close behavior consistent after command execution.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Model an incident response console with high-priority operational
          shortcuts.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <SpotlightSearch
              data={incidentOpsData}
              placeholder="Search incident operations and communication actions..."
            >
              <button
                type="button"
                className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground"
              >
                Open Incident Command Center
              </button>
            </SpotlightSearch>
            <div className="mt-4 rounded-lg border border-border/60 bg-muted/20 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Execution Snapshot
              </p>
              <p className="mt-2 text-sm text-foreground">
                Latest: {lastCommand}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                History: {recentSummary}
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Pair with runbooks and status-page integrations.</li>
              <li>• Use command palette for high-pressure workflows.</li>
              <li>• Record action history for post-incident analysis.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpotlightSearchExample;
