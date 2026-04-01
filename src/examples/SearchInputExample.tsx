import { SearchInput } from "../components/SearchInput";

export const SearchInputExample = () => {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          SearchInput Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Search box with optional debounce, clear control, and loading
          feedback.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Immediate search callbacks on input change.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <SearchInput placeholder="Search components" onSearch={() => {}} />
            <SearchInput
              placeholder="Search docs"
              showClear
              onSearch={() => {}}
              onClear={() => {}}
            />
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
          Debounced search for API-backed suggestion lists.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <SearchInput
              placeholder="Search repositories"
              debounceMs={300}
              onSearch={() => {}}
            />
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
          Use loading state while remote queries are in-flight.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <SearchInput
              placeholder="Search incidents"
              loading
              onSearch={() => {}}
            />
            <SearchInput
              placeholder="Search deployment logs"
              debounceMs={500}
              loading
              showClear
              onSearch={() => {}}
              onClear={() => {}}
            />
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
          Common in dashboards, tables, and command palettes.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <SearchInput
              placeholder="Find team members"
              showClear
              onSearch={() => {}}
              onClear={() => {}}
            />
            <SearchInput
              placeholder="Search invoices by customer"
              debounceMs={300}
              showClear
              onSearch={() => {}}
              onClear={() => {}}
            />
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

export default SearchInputExample;
