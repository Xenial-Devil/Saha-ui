import { useEffect, useState } from "react";
import Button from "../components/Button";
import { TypewriterText } from "../components/TypewriterText";

type Persona = "developer" | "designer" | "founder";

const marketingMessages = [
  "Launch polished UI in minutes.",
  "Ship components your team can trust.",
  "Move from mockup to production faster.",
];

const supportTimeline = [
  "Ticket #8421 received and assigned to Priya.",
  "Investigating production logs and edge cases.",
  "Fix deployed. Monitoring customer confirmation.",
];

const personaMessages: Record<Persona, string> = {
  developer: "Build once, reuse everywhere.",
  designer: "Design intent stays pixel-accurate.",
  founder: "Deliver value before your next investor call.",
};

export function TypewriterTextExample() {
  const [speed, setSpeed] = useState(55);
  const [persona, setPersona] = useState<Persona>("developer");
  const [marketingIndex, setMarketingIndex] = useState(0);
  const [supportIndex, setSupportIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMarketingIndex((prev) => (prev + 1) % marketingMessages.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSupportIndex((prev) => (prev + 1) % supportTimeline.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="mb-2 text-3xl font-bold text-foreground">
          TypewriterText Component
        </h2>
        <p className="text-muted-foreground">
          Animated typing for hero headlines, status messages, and storytelling
          UI moments.
        </p>
      </div>

      <section className="space-y-3">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <div className="rounded-xl border border-border bg-card p-5">
          <TypewriterText
            text="Welcome to Saha UI."
            speed={70}
            className="text-lg font-medium"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border/80 bg-card p-5">
            <p className="mb-2 text-sm text-muted-foreground">
              Rotating headline
            </p>
            <TypewriterText
              text={marketingMessages[marketingIndex]}
              speed={58}
              className="text-lg font-semibold text-primary"
            />
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-5">
            <p className="mb-2 text-sm text-muted-foreground">
              Looping tagline
            </p>
            <TypewriterText
              text="Create once. Publish confidently."
              speed={45}
              loop
              loopDelay={1200}
              cursor={false}
              className="text-lg font-semibold text-secondary"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-muted-foreground">
            Typing Speed:
          </span>
          <Button
            size="sm"
            variant={speed === 35 ? "primary" : "outline"}
            onClick={() => setSpeed(35)}
          >
            Fast
          </Button>
          <Button
            size="sm"
            variant={speed === 55 ? "primary" : "outline"}
            onClick={() => setSpeed(55)}
          >
            Normal
          </Button>
          <Button
            size="sm"
            variant={speed === 80 ? "primary" : "outline"}
            onClick={() => setSpeed(80)}
          >
            Slow
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-muted-foreground">
            Audience:
          </span>
          <Button
            size="sm"
            variant={persona === "developer" ? "secondary" : "ghost"}
            onClick={() => setPersona("developer")}
          >
            Developer
          </Button>
          <Button
            size="sm"
            variant={persona === "designer" ? "secondary" : "ghost"}
            onClick={() => setPersona("designer")}
          >
            Designer
          </Button>
          <Button
            size="sm"
            variant={persona === "founder" ? "secondary" : "ghost"}
            onClick={() => setPersona("founder")}
          >
            Founder
          </Button>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <TypewriterText
            text={personaMessages[persona]}
            speed={speed}
            loop
            loopDelay={1400}
            className="text-xl font-bold text-primary"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <div className="rounded-2xl border border-success/30 bg-gradient-to-r from-success/10 to-primary/5 p-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Customer Support Live Feed
          </p>
          <TypewriterText
            text={supportTimeline[supportIndex]}
            speed={42}
            className="text-base font-medium text-foreground md:text-lg"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Great for onboarding progress, deployment timelines, and status
            dashboards where messages should feel alive.
          </p>
        </div>
      </section>
    </div>
  );
}
