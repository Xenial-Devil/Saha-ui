import { PhoneInput } from "../components/PhoneInput";

export const PhoneInputExample = () => {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          PhoneInput Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Phone number entry with country code selector and formatted input
          behavior.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Basic phone field with default country selection.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <PhoneInput label="Phone Number" onPhoneChange={() => {}} />
            <PhoneInput
              label="Work Number"
              defaultCountryCode="US"
              onPhoneChange={() => {}}
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
          Controlled value and helper messaging.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <PhoneInput
              label="Contact Number"
              value="555 010 1234"
              onPhoneChange={() => {}}
              helperText="We will send SMS updates"
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
          Tune variant and preselected country code.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <PhoneInput
              label="Operations Contact"
              defaultCountryCode="GB"
              variant="outline"
              onPhoneChange={() => {}}
            />
            <PhoneInput
              label="On-call Contact"
              defaultCountryCode="CA"
              value="604 555 0123"
              helperText="Used for after-hours escalation"
              onPhoneChange={() => {}}
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
          Often used in onboarding, checkout, and account verification.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <PhoneInput
              label="Emergency Contact"
              required
              onPhoneChange={() => {}}
              error="Please provide a valid phone number"
            />
            <PhoneInput
              label="Billing Contact"
              value="555 011 7788"
              helperText="Used for payment verification"
              onPhoneChange={() => {}}
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

export default PhoneInputExample;
