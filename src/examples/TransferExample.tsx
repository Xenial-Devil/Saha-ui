"use client";

import { useState } from "react";
import { Transfer } from "../components/Transfer";

export default function TransferExample() {
  const [reviewerTargetKeys, setReviewerTargetKeys] = useState<string[]>([
    "3",
    "6",
  ]);
  const [permissionTargetKeys, setPermissionTargetKeys] = useState<string[]>([
    "perm-view",
  ]);
  const [rolloutTargetKeys, setRolloutTargetKeys] = useState<string[]>([]);

  const reviewerItems = [
    { key: "1", label: "Aarav Sharma", description: "Frontend Lead" },
    { key: "2", label: "Meera Iyer", description: "QA Engineer" },
    { key: "3", label: "Noah Khan", description: "Product Manager" },
    { key: "4", label: "Sara Ali", description: "Support Engineer" },
    {
      key: "5",
      label: "Jamie Cook",
      description: "Security Reviewer",
      disabled: true,
    },
    { key: "6", label: "Priya Patel", description: "Tech Writer" },
  ];

  const permissionItems = [
    { key: "perm-view", label: "View Analytics" },
    { key: "perm-export", label: "Export Reports" },
    { key: "perm-billing", label: "Manage Billing" },
    { key: "perm-admin", label: "Admin Settings" },
    { key: "perm-api", label: "API Key Management" },
  ];

  const rolloutItems = [
    { key: "team-north", label: "North Region" },
    { key: "team-south", label: "South Region" },
    { key: "team-east", label: "East Region" },
    { key: "team-west", label: "West Region" },
    { key: "team-global", label: "Global Support" },
  ];

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Transfer</h2>
        <p className="text-muted-foreground">
          Move items between source and target lists for assignment workflows.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-6">
            <p className="mb-3 text-sm font-medium text-foreground">
              Default transfer list
            </p>
            <Transfer dataSource={reviewerItems} listHeight={260} />
          </div>

          <div className="rounded-lg bg-muted/30 p-6">
            <p className="mb-3 text-sm font-medium text-foreground">
              Controlled reviewer assignment
            </p>
            <Transfer
              dataSource={reviewerItems}
              targetKeys={reviewerTargetKeys}
              onChange={(nextKeys) => setReviewerTargetKeys(nextKeys)}
              titles={["Available", "Assigned"]}
              listHeight={260}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Normal Usage</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-6">
            <p className="mb-3 text-sm font-medium text-foreground">
              Searchable permissions manager
            </p>
            <Transfer
              dataSource={permissionItems}
              targetKeys={permissionTargetKeys}
              onChange={(nextKeys) => setPermissionTargetKeys(nextKeys)}
              titles={["Available Permissions", "Granted Permissions"]}
              showSearch
              searchPlaceholder="Find permission..."
              listHeight={260}
            />
          </div>

          <div className="rounded-lg bg-muted/30 p-6">
            <p className="mb-3 text-sm font-medium text-foreground">
              Vertical layout for narrow panels
            </p>
            <Transfer
              dataSource={rolloutItems}
              targetKeys={rolloutTargetKeys}
              onChange={(nextKeys) => setRolloutTargetKeys(nextKeys)}
              titles={["Candidate Teams", "Rollout Teams"]}
              orientation="vertical"
              listHeight={220}
              showItemCount
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Advanced Usage</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-6">
            <p className="mb-3 text-sm font-medium text-foreground">
              Custom filtering and labels
            </p>
            <Transfer
              dataSource={reviewerItems}
              targetKeys={reviewerTargetKeys}
              onChange={(nextKeys) => setReviewerTargetKeys(nextKeys)}
              showSearch
              filterOption={(input, item) =>
                item.label.toLowerCase().includes(input.toLowerCase()) ||
                item.description
                  ?.toLowerCase()
                  .includes(input.toLowerCase()) === true
              }
              operations={["Assign", "Remove"]}
              footer={({ direction }) => (
                <span className="text-xs text-muted-foreground">
                  {direction === "left"
                    ? "Select reviewers for this release."
                    : "Assigned reviewers will be notified automatically."}
                </span>
              )}
              listHeight={260}
            />
          </div>

          <div className="rounded-lg bg-muted/30 p-6">
            <p className="mb-3 text-sm font-medium text-foreground">
              Disabled transfer state
            </p>
            <Transfer
              dataSource={permissionItems}
              targetKeys={permissionTargetKeys}
              onChange={(nextKeys) => setPermissionTargetKeys(nextKeys)}
              titles={["Template", "Applied"]}
              disabled
              listHeight={260}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real-Life Use Cases</h3>
        <div className="rounded-lg bg-muted/30 p-6 space-y-3">
          <Transfer
            dataSource={rolloutItems}
            targetKeys={rolloutTargetKeys}
            onChange={(nextKeys) => setRolloutTargetKeys(nextKeys)}
            titles={["All Regions", "Release Wave"]}
            showSearch
            showSelectAll
            searchPlaceholder="Search region"
            listHeight={280}
          />
          <p className="text-xs text-muted-foreground">
            Selected rollout targets: {rolloutTargetKeys.length}. This pattern
            is useful for feature flags, role assignment, and staged
            deployments.
          </p>
        </div>
      </section>
    </div>
  );
}
