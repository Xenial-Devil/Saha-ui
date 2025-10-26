import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  ResizableCompact,
} from "../components/Resizable";

export default function ResizableExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Interactive Layout Component
            </span>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            Resizable Component
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible resizable panels with drag handles, persistent sizes, and
            nested layouts
          </p>
        </div>

        {/* Basic Horizontal Example */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Basic Horizontal Layout</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <ResizablePanelGroup
              direction="horizontal"
              className="max-w-4xl mx-auto rounded-lg border border-border min-h-[300px]"
            >
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-6 bg-primary/5">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-primary">
                      Panel One
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Drag the handle to resize
                    </p>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-6 bg-secondary/5">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-secondary">
                      Panel Two
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Resizable panels
                    </p>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>

        {/* Nested Panels Example */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-secondary to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Nested Panels</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <ResizablePanelGroup
              direction="horizontal"
              className="max-w-4xl mx-auto rounded-lg border border-border min-h-[400px]"
            >
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="flex h-full items-center justify-center p-6 bg-accent/5">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-accent">
                      Left Panel
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Min size: 30%
                    </p>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={25} minSize={15}>
                    <div className="flex h-full items-center justify-center p-6 bg-success/5">
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-success">
                          Top Right
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Nested vertical panel
                        </p>
                      </div>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6 bg-warning/5">
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-warning">
                          Bottom Right
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Resizable in both directions
                        </p>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>

        {/* Vertical Layout */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Vertical Layout</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <ResizablePanelGroup
              direction="vertical"
              className="max-w-4xl mx-auto rounded-lg border border-border h-[400px]"
            >
              <ResizablePanel defaultSize={33}>
                <div className="flex h-full items-center justify-center p-6 bg-primary/5">
                  <h3 className="text-xl font-bold text-primary">Top Panel</h3>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={33}>
                <div className="flex h-full items-center justify-center p-6 bg-secondary/5">
                  <h3 className="text-xl font-bold text-secondary">
                    Middle Panel
                  </h3>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={34}>
                <div className="flex h-full items-center justify-center p-6 bg-accent/5">
                  <h3 className="text-xl font-bold text-accent">
                    Bottom Panel
                  </h3>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>

        {/* Variant Showcase */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-success to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Color Variants</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <ResizablePanelGroup
                  direction="horizontal"
                  variant={variant as any}
                  className="rounded-lg border border-border min-h-[150px]"
                >
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-4">
                      <span className="text-sm font-medium">Left</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-4">
                      <span className="text-sm font-medium">Right</span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            ))}
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
              <ResizableCompact
                direction="horizontal"
                variant="glass"
                className="max-w-4xl mx-auto rounded-lg border border-border min-h-[200px]"
                panels={[
                  {
                    content: (
                      <div className="flex h-full items-center justify-center p-6">
                        <div className="text-center">
                          <h4 className="text-lg font-bold">Panel 1</h4>
                          <p className="text-xs text-muted-foreground">
                            Default: 40%
                          </p>
                        </div>
                      </div>
                    ),
                    defaultSize: 40,
                    minSize: 20,
                  },
                  {
                    content: (
                      <div className="flex h-full items-center justify-center p-6">
                        <div className="text-center">
                          <h4 className="text-lg font-bold">Panel 2</h4>
                          <p className="text-xs text-muted-foreground">
                            Default: 60%
                          </p>
                        </div>
                      </div>
                    ),
                    defaultSize: 60,
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Persistent Storage Example */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-info to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Persistent Storage</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <p className="text-sm text-muted-foreground mb-4">
              Panel sizes are saved to localStorage. Resize and refresh the page
              to see it persist!
            </p>
            <ResizablePanelGroup
              direction="horizontal"
              variant="primary"
              storageKey="resizable-demo-storage"
              className="max-w-4xl mx-auto rounded-lg border border-border min-h-[250px]"
            >
              <ResizablePanel defaultSize={30}>
                <div className="flex h-full items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Sidebar</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Resize me!
                    </p>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={70}>
                <div className="flex h-full items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-bold">Main Content</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Size persists across refreshes
                    </p>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>

      </div>
    </div>
  );
}
