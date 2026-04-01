import { useMemo, useState } from "react";
import { Dock, DockIcon } from "../components/Dock";

type DockAction = {
  id: string;
  icon: string;
  label: string;
  description: string;
  urgency?: number;
};

const basicActions: DockAction[] = [
  {
    id: "home",
    icon: "H",
    label: "Home",
    description: "Jump to team workspace",
  },
  {
    id: "files",
    icon: "F",
    label: "Files",
    description: "Open design and docs assets",
  },
  {
    id: "settings",
    icon: "S",
    label: "Settings",
    description: "Adjust account preferences",
  },
];

const workspaceActions: DockAction[] = [
  {
    id: "overview",
    icon: "OV",
    label: "Overview",
    description: "Check weekly product health",
  },
  {
    id: "chat",
    icon: "CH",
    label: "Chat",
    description: "Open squad conversation stream",
  },
  {
    id: "reports",
    icon: "RP",
    label: "Reports",
    description: "Inspect analytics dashboards",
  },
  {
    id: "deploy",
    icon: "DP",
    label: "Deploy",
    description: "Launch release workflow",
  },
  {
    id: "alerts",
    icon: "AL",
    label: "Alerts",
    description: "Review active notifications",
  },
];

const designProfileActions: DockAction[] = [
  { id: "figma", icon: "FG", label: "Figma", description: "Open design board" },
  {
    id: "tokens",
    icon: "TK",
    label: "Tokens",
    description: "Inspect design token system",
  },
  {
    id: "assets",
    icon: "AS",
    label: "Assets",
    description: "Review brand asset library",
  },
  {
    id: "handoff",
    icon: "HD",
    label: "Handoff",
    description: "Prepare implementation notes",
  },
];

const engineeringProfileActions: DockAction[] = [
  {
    id: "issues",
    icon: "IS",
    label: "Issues",
    description: "Review assigned engineering tasks",
  },
  {
    id: "pipeline",
    icon: "PL",
    label: "Pipeline",
    description: "Open CI run monitor",
  },
  {
    id: "metrics",
    icon: "MT",
    label: "Metrics",
    description: "Check service performance",
  },
  {
    id: "terminal",
    icon: "TR",
    label: "Terminal",
    description: "Launch dev shell actions",
  },
];

const operationsActions: DockAction[] = [
  {
    id: "incident",
    icon: "IN",
    label: "Incident",
    description: "Open incident commander panel",
    urgency: 3,
  },
  {
    id: "qa",
    icon: "QA",
    label: "QA",
    description: "Review quality gate status",
    urgency: 1,
  },
  {
    id: "release",
    icon: "RL",
    label: "Release",
    description: "Approve production rollout",
    urgency: 2,
  },
  {
    id: "support",
    icon: "SP",
    label: "Support",
    description: "Triage customer escalation queue",
    urgency: 5,
  },
];

export const DockExample = () => {
  const [selectedBasic, setSelectedBasic] = useState(basicActions[0]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    workspaceActions[0],
  );
  const [activeProfile, setActiveProfile] = useState<"design" | "engineering">(
    "design",
  );
  const [profileAction, setProfileAction] = useState<DockAction | null>(null);
  const [operationsAction, setOperationsAction] = useState<DockAction | null>(
    null,
  );
  const [recentCommands, setRecentCommands] = useState<string[]>([]);

  const profileActions =
    activeProfile === "design"
      ? designProfileActions
      : engineeringProfileActions;

  const commandSummary = useMemo(() => {
    if (recentCommands.length === 0) {
      return "No commands used yet.";
    }

    return `Recent: ${recentCommands.join(" -> ")}`;
  }, [recentCommands]);

  const addRecentCommand = (command: string) => {
    setRecentCommands((prev) =>
      [command, ...prev.filter((item) => item !== command)].slice(0, 5),
    );
  };

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dock Component</h2>
        <p className="mt-2 text-muted-foreground">
          MacOS-style action dock for quick navigation and utility shortcuts.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Start with a compact dock that updates a focused workspace target.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Dock>
              {basicActions.map((action) => (
                <DockIcon
                  key={action.id}
                  onClick={() => {
                    setSelectedBasic(action);
                    addRecentCommand(action.label);
                  }}
                  className={
                    selectedBasic.id === action.id
                      ? "border border-primary bg-primary/10 text-primary"
                      : ""
                  }
                >
                  <span className="text-[10px] font-semibold">
                    {action.icon}
                  </span>
                </DockIcon>
              ))}
            </Dock>
            <p className="mt-4 text-sm font-medium text-foreground">
              Focused action: {selectedBasic.label}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {selectedBasic.description}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>
                • Start with a tiny command set so behavior is easy to verify.
              </li>
              <li>• Highlight the selected action in the surrounding UI.</li>
              <li>• Store recent actions early for telemetry and UX tuning.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Tune magnification for app-shell shortcuts with richer behavior.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Dock baseSize={36} magnification={64} distance={150}>
              {workspaceActions.map((action) => (
                <DockIcon
                  key={action.id}
                  onClick={() => {
                    setSelectedWorkspace(action);
                    addRecentCommand(action.label);
                  }}
                  className={
                    selectedWorkspace.id === action.id
                      ? "border border-primary bg-primary/10 text-primary"
                      : ""
                  }
                >
                  <span className="text-[10px] font-semibold">
                    {action.icon}
                  </span>
                </DockIcon>
              ))}
            </Dock>

            <div className="mt-4 rounded-lg border border-border/60 bg-muted/20 p-3">
              <p className="text-sm font-medium text-foreground">
                Selected workspace shortcut: {selectedWorkspace.label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedWorkspace.description}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {commandSummary}
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Keep icons short so magnification remains readable.</li>
              <li>• Sync dock clicks with page-level navigation panels.</li>
              <li>• Capture recent command history for repeat workflows.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Switch command sets dynamically based on active persona.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={() => setActiveProfile("design")}
                className={`rounded-md border px-3 py-1 text-xs ${
                  activeProfile === "design"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                Design Profile
              </button>
              <button
                type="button"
                onClick={() => setActiveProfile("engineering")}
                className={`rounded-md border px-3 py-1 text-xs ${
                  activeProfile === "engineering"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                Engineering Profile
              </button>
            </div>

            <Dock baseSize={38} magnification={72} distance={170}>
              {profileActions.map((action) => (
                <DockIcon
                  key={action.id}
                  onClick={() => {
                    setProfileAction(action);
                    addRecentCommand(`${activeProfile}:${action.label}`);
                  }}
                >
                  <span className="text-[10px] font-semibold">
                    {action.icon}
                  </span>
                </DockIcon>
              ))}
            </Dock>

            <p className="mt-4 text-sm font-medium text-foreground">
              Active profile:{" "}
              {activeProfile === "design" ? "Design" : "Engineering"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {profileAction
                ? `Latest action: ${profileAction.label} - ${profileAction.description}`
                : "Select an action to preview profile-specific behavior."}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Swap dock datasets when user role or mode changes.</li>
              <li>• Keep command IDs stable so analytics remain consistent.</li>
              <li>• Preserve command history between profile switches.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Useful for operations centers that prioritize incident response and
          release control.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Dock
              className="bg-card/80"
              baseSize={40}
              magnification={74}
              distance={180}
            >
              {operationsActions.map((action) => (
                <DockIcon
                  key={action.id}
                  onClick={() => {
                    setOperationsAction(action);
                    addRecentCommand(`ops:${action.label}`);
                  }}
                  className="relative"
                >
                  <span className="text-[10px] font-semibold">
                    {action.icon}
                  </span>
                  {action.urgency ? (
                    <span className="absolute -right-1 -top-1 rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-destructive-foreground">
                      {action.urgency}
                    </span>
                  ) : null}
                </DockIcon>
              ))}
            </Dock>
            <p className="mt-4 text-sm font-medium text-foreground">
              {operationsAction
                ? `Operational focus: ${operationsAction.label}`
                : "Select an operation to preview escalation details."}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {operationsAction
                ? operationsAction.description
                : "High urgency badges highlight where the team should respond first."}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>
                • Ideal for on-call and deployment orchestration consoles.
              </li>
              <li>• Combine urgency counters with route shortcuts.</li>
              <li>
                • Connect click events to runbooks and incident timelines.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DockExample;
