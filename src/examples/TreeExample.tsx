import React, { useMemo, useState } from "react";
import { CreditCard, Database, LifeBuoy, Shield } from "lucide-react";
import { Tree, TreeItem } from "../components/Tree";

export const TreeExample: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState({
    platform: true,
    security: true,
    billing: false,
    support: false,
  });

  const expandedCount = useMemo(
    () => Object.values(expandedNodes).filter(Boolean).length,
    [expandedNodes],
  );

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Tree Component</h2>
        <p className="mt-2 text-muted-foreground">
          Build navigational hierarchies and nested settings panels with
          expandable nodes.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Compose nested TreeItem nodes for simple category navigation.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Tree>
              <TreeItem label="Documentation" expanded>
                <TreeItem label="Getting Started" />
                <TreeItem label="API Overview" />
                <TreeItem label="Release Notes" />
              </TreeItem>
              <TreeItem label="Design System" expanded>
                <TreeItem label="Tokens" />
                <TreeItem label="Components" />
              </TreeItem>
            </Tree>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Keep labels concise and action-oriented.</li>
              <li>• Group related items under clear parent headings.</li>
              <li>• Use expanded defaults for high-priority sections.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Tune visual variants and icon positions for product sidebars.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Tree variant="bordered" size="lg" iconPosition="right" showLines>
              <TreeItem label="Platform" icon={<Database size={16} />} expanded>
                <TreeItem label="Services" />
                <TreeItem label="Integrations" />
              </TreeItem>
              <TreeItem label="Security" icon={<Shield size={16} />}>
                <TreeItem label="SSO" />
                <TreeItem label="Audit Logs" />
              </TreeItem>
            </Tree>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Pick one visual variant per navigation context.</li>
              <li>• Use icons to improve scanability in long menus.</li>
              <li>• Keep icon placement consistent within a product area.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage controlled expansion state and disabled nodes.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Tree variant="glass" showLines={false}>
              <TreeItem
                label="Platform Settings"
                expanded={expandedNodes.platform}
                onToggle={(expanded) =>
                  setExpandedNodes((prev) => ({ ...prev, platform: expanded }))
                }
                icon={<Database size={16} />}
              >
                <TreeItem label="Feature Flags" />
                <TreeItem label="Environment Variables" />
              </TreeItem>

              <TreeItem
                label="Security Policies"
                expanded={expandedNodes.security}
                onToggle={(expanded) =>
                  setExpandedNodes((prev) => ({ ...prev, security: expanded }))
                }
                icon={<Shield size={16} />}
              >
                <TreeItem label="Password Rules" />
                <TreeItem label="Session Lifetime" disabled />
              </TreeItem>

              <TreeItem
                label="Billing Controls"
                expanded={expandedNodes.billing}
                onToggle={(expanded) =>
                  setExpandedNodes((prev) => ({ ...prev, billing: expanded }))
                }
                icon={<CreditCard size={16} />}
              >
                <TreeItem label="Invoices" />
                <TreeItem label="Payment Methods" />
              </TreeItem>
            </Tree>
            <p className="mt-3 text-xs text-muted-foreground">
              Expanded sections: {expandedCount}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Controlled expansion enables persistence across routes.</li>
              <li>• Disable nodes to reflect permission constraints.</li>
              <li>• Use compact helper text for state summaries.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Organize account areas such as support, billing, and compliance.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Tree variant="minimal" size="sm" showIcons>
              <TreeItem
                label="Support Operations"
                icon={<LifeBuoy size={16} />}
                expanded={expandedNodes.support}
                onToggle={(expanded) =>
                  setExpandedNodes((prev) => ({ ...prev, support: expanded }))
                }
              >
                <TreeItem label="Escalation Policies" />
                <TreeItem label="SLA Dashboard" />
                <TreeItem label="Incident Templates" />
              </TreeItem>

              <TreeItem label="Compliance" expanded>
                <TreeItem label="SOC 2 Controls" />
                <TreeItem label="Data Retention" />
              </TreeItem>
            </Tree>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Structure trees around user tasks, not internal teams.</li>
              <li>• Keep frequently visited nodes near the top.</li>
              <li>
                • Mirror tree groupings with route structure when possible.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TreeExample;
