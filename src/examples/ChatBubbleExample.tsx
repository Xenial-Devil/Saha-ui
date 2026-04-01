import { ChatBubble } from "../components/ChatBubble";

export const ChatBubbleExample = () => {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          ChatBubble Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Conversation UI blocks for chat interfaces, support tools, and
          collaboration surfaces.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Render a single incoming message with sender and timestamp.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-3">
              <ChatBubble
                message="Hi! Can you help me with my billing issue?"
                sender="Alex"
                timestamp="10:22 AM"
              />
              <ChatBubble
                message="Sure, I can help. Can you share your invoice number?"
                sender="Support Agent"
                timestamp="10:23 AM"
                variant="secondary"
              />
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep setup minimal so teams can adopt the component quickly.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Start with clear sender identity and timestamp.</li>
              <li>- Keep incoming message width readable on mobile screens.</li>
              <li>- Avoid mixing status indicators in basic examples.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Show outgoing messages with delivery state.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <ChatBubble
              message="Sure - I have checked your account and fixed it."
              isMe
              status="delivered"
              timestamp="10:24 AM"
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This pattern maps to everyday support chats and collaboration
              workflows.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Use `isMe` to make ownership obvious at a glance.</li>
              <li>- Pair sent messages with status for delivery confidence.</li>
              <li>- Keep language short to avoid visual clutter.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Use variants and status transitions for richer chat feedback.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-3">
              <ChatBubble
                message="Syncing your workspace..."
                isMe
                status="sending"
                timestamp="Now"
                variant="ghost"
              />
              <ChatBubble
                message="Done. Your settings were updated."
                isMe
                status="read"
                timestamp="Now"
                variant="primary"
              />
              <ChatBubble
                message="Would you like me to apply this to all team spaces?"
                sender="Assistant"
                timestamp="Now"
                variant="glass"
              />
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced mode should compose cleanly with app state and callbacks.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>
                - Reserve color variants for meaningful conversation states.
              </li>
              <li>- Keep status progression deterministic for reliability.</li>
              <li>- Test long messages and wrapping edge cases.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Great for support desks and in-app team messaging experiences.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-3">
              <ChatBubble
                message="Incident #4831 has been mitigated. Monitoring ongoing."
                sender="Ops Bot"
                timestamp="11:03 AM"
                variant="glass"
              />
              <ChatBubble
                message="Acknowledged. I will notify the customer."
                isMe
                status="read"
                timestamp="11:04 AM"
              />
              <ChatBubble
                message="Please include the mitigation timeline in the update."
                sender="Team Lead"
                timestamp="11:05 AM"
              />
              <ChatBubble
                message="Timeline added. Customer and leadership channels notified."
                isMe
                status="read"
                timestamp="11:06 AM"
                variant="primary"
              />
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Show how the component fits real workflows, not isolated UI demos.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Model both bot and human messages in support timelines.</li>
              <li>
                - Keep time context visible for operational accountability.
              </li>
              <li>- Include realistic escalation and follow-up messages.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatBubbleExample;
