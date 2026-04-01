import { QRCode } from "../components/QRCode";

export const QRCodeExample = () => {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">QRCode Component</h2>
        <p className="mt-2 text-muted-foreground">
          Generate QR codes for links, credentials, and shareable payloads.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Render a simple SVG QR code.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <QRCode value="https://saha-ui.isubroto.com.bd" />
            <QRCode value="mailto:support@saha-ui.com" size={110} />
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
          Switch to canvas and include margin for print outputs.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <QRCode
              value="https://github.com/Xenial-Devil/Saha-ui"
              renderAs="canvas"
              includeMargin
              size={144}
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
          Customize error correction and colors for branding.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <QRCode
              value="DEPLOY:prod:release-1.2.0"
              level="H"
              fgColor="#1f2937"
              bgColor="#ffffff"
            />
            <QRCode
              value="otpauth://totp/SahaUI:dev@example.com?secret=JBSWY3DPEHPK3PXP&issuer=SahaUI"
              level="H"
              fgColor="#0f766e"
              bgColor="#f8fafc"
              size={148}
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
          Useful for app login pairing, tickets, and workspace handoff links.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <QRCode
              value="WIFI:T:WPA;S:OfficeNet;P:StrongPassword123;;"
              size={160}
            />
            <QRCode
              value="EVENT:Release Demo|Seat:A12|Time:17:30"
              renderAs="canvas"
              includeMargin
              size={150}
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

export default QRCodeExample;
