import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarItem, SidebarFooter } from "../components/Sidebar";

export const SidebarExample = () => {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Sidebar Component</h2>
        <p className="mt-2 text-muted-foreground">Collapsible navigation shell for product areas and admin tools.</p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">Start with a lightweight non-fixed sidebar.</p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Sidebar fixed={false} className="relative h-[260px]">
              <SidebarHeader>Workspace</SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarItem>Dashboard</SidebarItem>
                  <SidebarItem>Projects</SidebarItem>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">Implementation Notes</h4>
            <p className="mt-2 text-sm text-muted-foreground">Keep setup minimal so teams can adopt the component quickly.</p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use defaults first before introducing variants.</li>
              <li>• Keep labels and helper text explicit.</li>
              <li>• Verify accessibility behavior early.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">Use active items and grouped navigation sections.</p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Sidebar fixed={false} variant="outline" className="relative h-[280px]">
              <SidebarHeader>Operations</SidebarHeader>
              <SidebarContent>
                <SidebarGroup label="Main">
                  <SidebarItem isActive>Overview</SidebarItem>
                  <SidebarItem>Services</SidebarItem>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">Implementation Notes</h4>
            <p className="mt-2 text-sm text-muted-foreground">This pattern maps to everyday product screens and forms.</p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use consistent variant and size tokens.</li>
              <li>• Pair with helper text for clarity.</li>
              <li>• Prefer predictable controlled behavior.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Advanced Usage</h3>
        <p className="text-sm text-muted-foreground">Attach footer controls and collapsed-state behavior.</p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Sidebar fixed={false} variant="glass" className="relative h-[300px]" collapsed={false}>
              <SidebarHeader>Team</SidebarHeader>
              <SidebarContent>
                <SidebarItem>Members</SidebarItem>
                <SidebarItem>Permissions</SidebarItem>
              </SidebarContent>
              <SidebarFooter>
                <SidebarItem>Settings</SidebarItem>
              </SidebarFooter>
            </Sidebar>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">Implementation Notes</h4>
            <p className="mt-2 text-sm text-muted-foreground">Advanced mode should compose cleanly with app state and callbacks.</p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Wire callbacks for analytics and persistence.</li>
              <li>• Tune layout for dense, data-heavy views.</li>
              <li>• Document edge-case behavior in examples.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Real-Life Use Cases</h3>
        <p className="text-sm text-muted-foreground">Used in dashboards, control planes, and multi-tenant admin apps.</p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <Sidebar fixed={false} className="relative h-[300px]">
              <SidebarHeader>SaaS Admin</SidebarHeader>
              <SidebarContent>
                <SidebarGroup label="Workspace">
                  <SidebarItem isActive>Analytics</SidebarItem>
                  <SidebarItem>Billing</SidebarItem>
                  <SidebarItem>Audit Logs</SidebarItem>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">Implementation Notes</h4>
            <p className="mt-2 text-sm text-muted-foreground">Show how the component fits real workflows, not isolated UI demos.</p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Model practical business scenarios.</li>
              <li>• Include realistic content and labels.</li>
              <li>• Highlight production-friendly defaults.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SidebarExample;
