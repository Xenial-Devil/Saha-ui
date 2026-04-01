import { AnnouncementBar } from "../components/AnnouncementBar";

export const AnnouncementBarExample = () => {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          AnnouncementBar Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Top-level announcement banners for updates, maintenance windows, and
          urgent notices.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Display a single dismissible banner for a general update.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <AnnouncementBar>
              System maintenance tonight at 02:00 UTC.
            </AnnouncementBar>
            <AnnouncementBar variant="secondary">
              New dashboard filters are now available for all teams.
            </AnnouncementBar>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep setup minimal so teams can adopt the component quickly.
            </p>
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
        <p className="text-sm text-muted-foreground">
          Use a non-dismissible variant for session-critical communication.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <AnnouncementBar closable={false} variant="secondary">
              Security update is rolling out to all users.
            </AnnouncementBar>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This pattern maps to everyday product screens and forms.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use consistent variant and size tokens.</li>
              <li>• Pair with helper text for clarity.</li>
              <li>• Prefer predictable controlled behavior.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Apply custom styling and callback hooks for controlled announcements.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <AnnouncementBar
              variant="primary"
              onClose={() => {}}
              className="shadow-lg"
            >
              Deployment completed. Release notes are now available.
            </AnnouncementBar>
            <AnnouncementBar
              variant="secondary"
              closable={false}
              className="border border-border/60"
            >
              Incident response mode enabled. Expect temporary feature limits.
            </AnnouncementBar>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced mode should compose cleanly with app state and callbacks.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Wire callbacks for analytics and persistence.</li>
              <li>• Tune layout for dense, data-heavy views.</li>
              <li>• Document edge-case behavior in examples.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Useful in admin consoles and SaaS dashboards for incidents and
          deployment notices.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <AnnouncementBar variant="primary" closable={false}>
              Your production build succeeded and monitoring is healthy.
            </AnnouncementBar>
            <AnnouncementBar variant="secondary" closable={false}>
              Customer-facing maintenance window starts in 15 minutes.
            </AnnouncementBar>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Show how the component fits real workflows, not isolated UI demos.
            </p>
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

export default AnnouncementBarExample;
