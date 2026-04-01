import { useMemo, useState } from "react";
import { MultiSelect } from "../components/MultiSelect";
import type { SelectOption } from "../components/Select/Select.types";

const frameworkOptions: SelectOption[] = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
  { value: "vite", label: "Vite" },
  { value: "astro", label: "Astro" },
  { value: "svelte", label: "Svelte" },
  { value: "vue", label: "Vue" },
];

const integrationOptions: SelectOption[] = [
  { value: "slack", label: "Slack" },
  { value: "github", label: "GitHub" },
  { value: "figma", label: "Figma" },
  { value: "jira", label: "Jira" },
  { value: "notion", label: "Notion" },
  { value: "vercel", label: "Vercel" },
];

const roleOptions: SelectOption[] = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "reviewer", label: "Reviewer" },
  { value: "analyst", label: "Analyst" },
  { value: "observer", label: "Observer" },
];

const environmentOptions: SelectOption[] = [
  { value: "development", label: "Development" },
  { value: "staging", label: "Staging" },
  { value: "production", label: "Production" },
  { value: "sandbox", label: "Sandbox" },
];

const getLabels = (values: string[], options: SelectOption[]) =>
  values
    .map(
      (value) =>
        options.find((option) => option.value === value)?.label ?? value,
    )
    .join(", ");

export const MultiSelectExample = () => {
  const [basicFrameworks, setBasicFrameworks] = useState<string[]>([]);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([
    "github",
    "vercel",
  ]);
  const [advancedFrameworks, setAdvancedFrameworks] = useState<string[]>([
    "react",
  ]);
  const [teamRoles, setTeamRoles] = useState<string[]>(["admin", "editor"]);
  const [targetEnvironments, setTargetEnvironments] = useState<string[]>([
    "staging",
  ]);

  const roleSummary = useMemo(
    () => getLabels(teamRoles, roleOptions),
    [teamRoles],
  );
  const environmentSummary = useMemo(
    () => getLabels(targetEnvironments, environmentOptions),
    [targetEnvironments],
  );

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          MultiSelect Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Older examples in this repo use live, stateful demos. This follows the
          same approach with practical multi-selection flows.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <MultiSelect
            options={frameworkOptions}
            label="Choose Frameworks"
            placeholder="Select frameworks"
            value={basicFrameworks}
            onChange={(value) => setBasicFrameworks(value)}
          />

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">Selected</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {basicFrameworks.length > 0
                ? getLabels(basicFrameworks, frameworkOptions)
                : "No frameworks selected yet."}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <MultiSelect
            options={integrationOptions}
            label="Project Integrations"
            placeholder="Select integrations"
            value={selectedIntegrations}
            onChange={(value) => setSelectedIntegrations(value)}
            variant="primary"
            searchable
            clearable
            helperText="Search and select integrations used in your stack"
          />

          <MultiSelect
            options={frameworkOptions}
            label="Preferred Frontend Stack"
            placeholder="Pick up to 3"
            value={advancedFrameworks}
            onChange={(value) => setAdvancedFrameworks(value)}
            maxSelections={3}
            variant="secondary"
            size="lg"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <MultiSelect
            options={frameworkOptions}
            label="Advanced: Custom Value Display"
            placeholder="Select frameworks"
            value={advancedFrameworks}
            onChange={(value) => setAdvancedFrameworks(value)}
            maxSelections={3}
            variant="glass"
            searchable
            renderValue={(value) => {
              const values = Array.isArray(value) ? value : [value];
              if (values.length === 0) return "Select frameworks";
              if (values.length === 1) return `1 framework selected`;
              return `${values.length} frameworks selected`;
            }}
            helperText="Custom label behavior for dense UIs"
          />

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold text-foreground">
              Current Selection
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {advancedFrameworks.length > 0 ? (
                advancedFrameworks.map((value) => (
                  <li key={value}>
                    •{" "}
                    {frameworkOptions.find((item) => item.value === value)
                      ?.label ?? value}
                  </li>
                ))
              ) : (
                <li>• No frameworks selected</li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h4 className="text-lg font-semibold text-foreground">
            Team Access Configuration
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Assign workspace roles and deployment environments during project
            setup.
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <MultiSelect
              options={roleOptions}
              label="Roles"
              placeholder="Assign roles"
              value={teamRoles}
              onChange={(value) => setTeamRoles(value)}
              variant="accent"
              searchable
            />

            <MultiSelect
              options={environmentOptions}
              label="Allowed Environments"
              placeholder="Select environments"
              value={targetEnvironments}
              onChange={(value) => setTargetEnvironments(value)}
              variant="success"
              clearable
            />
          </div>

          <div className="mt-5 rounded-xl border border-border/70 bg-muted/30 p-4 text-sm">
            <p className="font-semibold text-foreground">Summary</p>
            <p className="mt-2 text-muted-foreground">
              Roles: {roleSummary || "None"}
            </p>
            <p className="mt-1 text-muted-foreground">
              Environments: {environmentSummary || "None"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MultiSelectExample;
