import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardCompact,
} from "../components/HoverCard";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";

export default function HoverCardExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Interactive Component
            </span>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            HoverCard Component
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Display rich content on hover with customizable positioning, delays,
            and variants
          </p>
        </div>

        {/* Component API Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Component API</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">User Profile Cards</h3>
              <div className="flex flex-wrap gap-6">
                <HoverCard variant="default" openDelay={300} closeDelay={200}>
                  <HoverCardTrigger asChild>
                    <button className="text-base font-medium text-primary hover:underline cursor-pointer bg-transparent border-none">
                      @sarah_dev
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex gap-4">
                      <Avatar
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                        alt="Sarah"
                        size="lg"
                      />
                      <div className="flex-1 space-y-2">
                        <h4 className="font-semibold text-lg">
                          Sarah Anderson
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          @sarah_dev
                        </p>
                        <p className="text-sm">
                          Full-stack developer specializing in React and
                          Node.js. Building beautiful UIs.
                        </p>
                        <div className="flex gap-4 text-sm pt-2">
                          <span>
                            <strong>1.2K</strong> followers
                          </span>
                          <span>
                            <strong>432</strong> following
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard variant="primary" position="bottom-start">
                  <HoverCardTrigger asChild>
                    <button className="text-base font-medium text-primary hover:underline cursor-pointer bg-transparent border-none">
                      @alex_ui
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex gap-4">
                      <Avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                        alt="Alex"
                        size="lg"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-lg">Alex Chen</h4>
                          <Badge variant="primary" size="sm">
                            Pro
                          </Badge>
                        </div>
                        <p className="text-sm opacity-90">@alex_ui</p>
                        <p className="text-sm">
                          UI/UX Designer & Frontend Engineer. Love creating
                          beautiful and functional interfaces.
                        </p>
                        <div className="flex gap-4 text-sm pt-2">
                          <span>
                            <strong>5.4K</strong> followers
                          </span>
                          <span>
                            <strong>891</strong> following
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard variant="glass" position="bottom-end">
                  <HoverCardTrigger asChild>
                    <button className="text-base font-medium text-primary hover:underline cursor-pointer bg-transparent border-none">
                      @tech_team
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-xl font-bold">
                          TT
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">Tech Team</h4>
                          <p className="text-sm opacity-80">@tech_team</p>
                        </div>
                      </div>
                      <p className="text-sm">
                        Official account for the Tech Team. Sharing updates,
                        tutorials, and best practices.
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span>
                          <strong>12.3K</strong> followers
                        </span>
                        <span>
                          <strong>234</strong> following
                        </span>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
        </section>

        {/* Variant Showcase */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-secondary to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Color Variants</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { variant: "default", label: "Default" },
              { variant: "primary", label: "Primary" },
              { variant: "secondary", label: "Secondary" },
              { variant: "accent", label: "Accent" },
              { variant: "success", label: "Success" },
              { variant: "warning", label: "Warning" },
              { variant: "error", label: "Error" },
              { variant: "info", label: "Info" },
              { variant: "outline", label: "Outline" },
              { variant: "glass", label: "Glass" },
            ].map(({ variant, label }) => (
              <div
                key={variant}
                className="bg-card/30 border border-border/50 rounded-xl p-6"
              >
                <h3 className="font-semibold mb-4">{label} Variant</h3>
                <HoverCard
                  variant={variant as any}
                  size="md"
                  openDelay={200}
                  closeDelay={150}
                >
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="sm">
                      Hover me
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent showArrow width={280}>
                    <div className="space-y-2">
                      <h4 className="font-semibold">{label} HoverCard</h4>
                      <p className="text-sm opacity-90">
                        This is a {variant} variant hover card with customizable
                        content and styling.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            ))}
          </div>
        </section>

        {/* Size Variations */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Size Variations</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <div className="flex flex-wrap gap-6">
              <HoverCard variant="primary" size="sm">
                <HoverCardTrigger asChild>
                  <Button variant="primary" size="sm">
                    Small
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p className="text-xs">Small hover card content</p>
                </HoverCardContent>
              </HoverCard>

              <HoverCard variant="secondary" size="md">
                <HoverCardTrigger asChild>
                  <Button variant="secondary" size="md">
                    Medium
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-1">
                    <h4 className="font-semibold">Medium Size</h4>
                    <p className="text-sm">
                      Medium hover card with more content
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <HoverCard variant="accent" size="lg">
                <HoverCardTrigger asChild>
                  <Button variant="accent" size="lg">
                    Large
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg">Large Size</h4>
                    <p className="text-sm">
                      Large hover card with even more detailed content and
                      better spacing.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <HoverCard variant="success" size="xl">
                <HoverCardTrigger asChild>
                  <Button variant="success" size="lg">
                    Extra Large
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-xl">Extra Large Size</h4>
                    <p className="text-base">
                      Extra large hover card perfect for detailed information,
                      documentation, or complex layouts.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </section>

        {/* Positioning */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-success to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Positioning Options</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-16">
            <div className="flex justify-center">
              <div className="grid grid-cols-3 gap-8 items-center">
                {/* Top Row */}
                <HoverCard variant="info" position="top-start" size="sm">
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="sm">
                      Top Start
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Top Start Position</p>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard variant="info" position="top" size="sm">
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="sm">
                      Top
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Top Center Position</p>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard variant="info" position="top-end" size="sm">
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="sm">
                      Top End
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Top End Position</p>
                  </HoverCardContent>
                </HoverCard>

                {/* Middle Row */}
                <HoverCard variant="warning" position="left" size="sm">
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="sm">
                      Left
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Left Position</p>
                  </HoverCardContent>
                </HoverCard>

                <div className="flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-xs text-muted-foreground">
                    Center
                  </div>
                </div>

                <HoverCard variant="warning" position="right" size="sm">
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="sm">
                      Right
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Right Position</p>
                  </HoverCardContent>
                </HoverCard>

                {/* Bottom Row */}
                <HoverCard variant="success" position="bottom-start" size="sm">
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bottom Start
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Bottom Start Position</p>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard variant="success" position="bottom" size="sm">
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bottom
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Bottom Center Position</p>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard variant="success" position="bottom-end" size="sm">
                  <HoverCardTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bottom End
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Bottom End Position</p>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
        </section>

        {/* Compact API */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-error to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Compact API</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Quick Setup with Props
              </h3>
              <div className="flex flex-wrap gap-6">
                <HoverCardCompact
                  trigger={<Button variant="primary">Quick User Card</Button>}
                  content={
                    <div className="flex gap-3">
                      <Avatar
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                        alt="User"
                        size="md"
                      />
                      <div className="space-y-1">
                        <h4 className="font-semibold">John Doe</h4>
                        <p className="text-sm opacity-90">@johndoe</p>
                        <p className="text-xs opacity-80">Software Engineer</p>
                      </div>
                    </div>
                  }
                  variant="primary"
                  size="md"
                  position="bottom"
                  openDelay={200}
                  closeDelay={150}
                />

                <HoverCardCompact
                  trigger={<Button variant="glass">Product Info</Button>}
                  content={
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-lg">Premium Plan</h4>
                        <Badge variant="success">Popular</Badge>
                      </div>
                      <p className="text-sm">
                        Get access to all features with our premium plan.
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">$29</span>
                        <span className="text-sm opacity-70">/month</span>
                      </div>
                    </div>
                  }
                  variant="glass"
                  size="lg"
                  width={300}
                />

                <HoverCardCompact
                  trigger={<Button variant="outline">Help & Support</Button>}
                  content={
                    <div className="space-y-2">
                      <h4 className="font-semibold">Need Help?</h4>
                      <p className="text-sm opacity-90">
                        Our support team is available 24/7 to assist you.
                      </p>
                      <div className="pt-2 space-y-1 text-sm">
                        <div>📧 support@example.com</div>
                        <div>📞 +1 (555) 123-4567</div>
                        <div>💬 Live Chat Available</div>
                      </div>
                    </div>
                  }
                  variant="info"
                  position="right"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Examples */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-warning to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Advanced Examples</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8 space-y-8">
            {/* Repository Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Repository Preview</h3>
              <HoverCard variant="glass" size="lg" position="bottom-start">
                <HoverCardTrigger asChild>
                  <button className="text-base font-semibold text-primary hover:underline cursor-pointer bg-transparent border-none">
                    saha-ui/components
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-96">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold">
                          saha-ui/components
                        </h4>
                        <p className="text-sm opacity-80">
                          Modern React UI component library
                        </p>
                      </div>
                      <Badge variant="success">Public</Badge>
                    </div>
                    <p className="text-sm">
                      A comprehensive collection of accessible, customizable
                      React components built with TypeScript and Tailwind CSS.
                    </p>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        ⭐ <strong>1.2k</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        🔀 <strong>234</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        🐛 <strong>12</strong>
                      </span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <Badge variant="primary" size="sm">
                        TypeScript
                      </Badge>
                      <Badge variant="accent" size="sm">
                        React
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        Tailwind
                      </Badge>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            {/* Link Previews */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Link Previews</h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Check out our{" "}
                  <HoverCard variant="primary" size="md" openDelay={300}>
                    <HoverCardTrigger asChild>
                      <a
                        href="#"
                        className="text-primary hover:underline font-medium"
                      >
                        documentation
                      </a>
                    </HoverCardTrigger>
                    <HoverCardContent width={320}>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-base">
                          Component Documentation
                        </h4>
                        <p className="text-sm">
                          Comprehensive guides, API references, and examples for
                          all components.
                        </p>
                        <div className="text-xs opacity-70">
                          📚 50+ Components · 🎨 Examples · 💡 Best Practices
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>{" "}
                  for detailed examples and API references.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
