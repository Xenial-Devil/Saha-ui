import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../components/Resizable";
import {
  Code2,
  FileText,
  FolderTree,
  Search,
  Settings,
  Terminal,
  Mail,
  Inbox,
  Star,
  Trash2,
  Layout,
  PanelLeft,
} from "lucide-react";

export default function ResizableExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Real-World Layout Examples
            </span>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            Resizable Component
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional layouts for code editors, email clients, dashboards,
            and more
          </p>
        </div>

        {/* Code Editor Layout */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Code2 className="h-8 w-8 text-primary" />
              Code Editor (VS Code Style)
            </h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <ResizablePanelGroup
              direction="horizontal"
              variant="outline"
              className="rounded-lg border border-border min-h-[600px] bg-background"
            >
              {/* File Explorer */}
              <ResizablePanel
                defaultSize={20}
                minSize={15}
                maxSize={30}
                variant="default"
              >
                <div className="h-full bg-muted/30 border-r border-border">
                  <div className="p-4 border-b border-border bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FolderTree className="h-4 w-4" />
                      <span className="font-semibold text-sm">EXPLORER</span>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="px-2 py-1 hover:bg-accent/50 rounded cursor-pointer text-sm flex items-center gap-2">
                      <FileText className="h-3 w-3" />
                      <span>index.tsx</span>
                    </div>
                    <div className="px-2 py-1 hover:bg-accent/50 rounded cursor-pointer text-sm flex items-center gap-2">
                      <FileText className="h-3 w-3" />
                      <span>App.tsx</span>
                    </div>
                    <div className="px-2 py-1 bg-accent/80 rounded cursor-pointer text-sm flex items-center gap-2">
                      <FileText className="h-3 w-3" />
                      <span>components.tsx</span>
                    </div>
                    <div className="px-2 py-1 hover:bg-accent/50 rounded cursor-pointer text-sm flex items-center gap-2">
                      <FileText className="h-3 w-3" />
                      <span>utils.ts</span>
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle variant="primary" />

              {/* Editor & Terminal */}
              <ResizablePanel defaultSize={80}>
                <ResizablePanelGroup direction="vertical">
                  {/* Code Editor */}
                  <ResizablePanel defaultSize={70} minSize={30}>
                    <div className="h-full flex flex-col">
                      <div className="p-3 border-b border-border bg-muted/30 flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">
                          components.tsx
                        </span>
                      </div>
                      <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-muted/10">
                        <pre className="text-muted-foreground">
                          <code>{`import React from 'react';
import { ResizablePanel } from './Resizable';

export function MyComponent() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <div>Left Panel</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div>Right Panel</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle variant="secondary" />

                  {/* Terminal */}
                  <ResizablePanel defaultSize={30} minSize={15}>
                    <div className="h-full bg-black/90 text-green-400">
                      <div className="p-3 border-b border-border/20 flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        <span className="text-sm font-medium">TERMINAL</span>
                      </div>
                      <div className="p-4 font-mono text-sm">
                        <p>$ npm run dev</p>
                        <p className="text-green-300 mt-2">
                          ✓ Development server running
                        </p>
                        <p className="text-muted mt-1">http://localhost:5173</p>
                        <span className="animate-pulse">_</span>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>

        {/* Email Client Layout */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-secondary to-transparent rounded-full" />
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Mail className="h-8 w-8 text-secondary" />
              Email Client (Gmail Style)
            </h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <ResizablePanelGroup
              direction="horizontal"
              variant="glass"
              className="rounded-lg border border-border min-h-[500px] bg-background"
            >
              {/* Sidebar */}
              <ResizablePanel
                defaultSize={15}
                minSize={10}
                maxSize={20}
                variant="primary"
              >
                <div className="h-full bg-primary/5 border-r border-border">
                  <div className="p-4 space-y-2">
                    <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Compose
                    </button>
                    <div className="pt-4 space-y-1">
                      <div className="px-3 py-2 bg-accent rounded-lg flex items-center gap-3 cursor-pointer">
                        <Inbox className="h-4 w-4" />
                        <span className="text-sm font-medium">Inbox</span>
                        <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                          12
                        </span>
                      </div>
                      <div className="px-3 py-2 hover:bg-accent/50 rounded-lg flex items-center gap-3 cursor-pointer">
                        <Star className="h-4 w-4" />
                        <span className="text-sm">Starred</span>
                      </div>
                      <div className="px-3 py-2 hover:bg-accent/50 rounded-lg flex items-center gap-3 cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                        <span className="text-sm">Trash</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle variant="primary" />

              {/* Email List */}
              <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
                <div className="h-full border-r border-border">
                  <div className="p-4 border-b border-border flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search mail"
                      className="flex-1 bg-transparent border-none outline-none text-sm"
                    />
                  </div>
                  <div className="divide-y divide-border">
                    {[
                      {
                        from: "GitHub",
                        subject: "New pull request",
                        time: "10:30 AM",
                        unread: true,
                      },
                      {
                        from: "Team Meeting",
                        subject: "Sprint Planning",
                        time: "9:15 AM",
                        unread: true,
                      },
                      {
                        from: "Newsletter",
                        subject: "Weekly Digest",
                        time: "Yesterday",
                        unread: false,
                      },
                    ].map((email, i) => (
                      <div
                        key={i}
                        className={`p-4 hover:bg-accent/50 cursor-pointer ${
                          i === 0
                            ? "bg-accent/30 border-l-4 border-primary"
                            : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={`text-sm ${
                              email.unread ? "font-bold" : "font-medium"
                            }`}
                          >
                            {email.from}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {email.time}
                          </span>
                        </div>
                        <p
                          className={`text-sm mt-1 ${
                            email.unread
                              ? "font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {email.subject}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle variant="secondary" />

              {/* Email Content */}
              <ResizablePanel defaultSize={55}>
                <div className="h-full flex flex-col">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-xl font-bold">New pull request</h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        GitHub
                      </span>
                      <span>•</span>
                      <span>10:30 AM</span>
                    </div>
                  </div>
                  <div className="flex-1 p-6 overflow-auto">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A new pull request has been opened for your repository...
                    </p>
                    <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
                      <p className="text-sm font-mono">
                        Feature: Add resizable panels component
                      </p>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>

        {/* Dashboard Layout */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Layout className="h-8 w-8 text-accent" />
              Analytics Dashboard
            </h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <ResizablePanelGroup
              direction="horizontal"
              variant="outline"
              className="rounded-lg border border-border min-h-[500px] bg-background"
            >
              {/* Sidebar */}
              <ResizablePanel
                defaultSize={20}
                minSize={10}
                maxSize={40}
                variant="accent"
              >
                <div className="h-full bg-accent/5 border-r border-border p-4">
                  <div className="space-y-1">
                    <div className="px-3 py-2 bg-accent rounded-lg text-sm font-medium cursor-pointer">
                      Overview
                    </div>
                    <div className="px-3 py-2 hover:bg-accent/50 rounded-lg text-sm cursor-pointer">
                      Analytics
                    </div>
                    <div className="px-3 py-2 hover:bg-accent/50 rounded-lg text-sm cursor-pointer">
                      Reports
                    </div>
                    <div className="px-3 py-2 hover:bg-accent/50 rounded-lg text-sm cursor-pointer flex items-center gap-2">
                      <Settings className="h-3 w-3" />
                      Settings
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle variant="accent" />

              {/* Main Content */}
              <ResizablePanel defaultSize={80}>
                <ResizablePanelGroup direction="vertical">
                  {/* Top Stats */}
                  <ResizablePanel defaultSize={40} minSize={10}>
                    <div className="h-full p-6">
                      <h3 className="text-lg font-bold mb-4">Key Metrics</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          {
                            label: "Total Users",
                            value: "12,543",
                            change: "+12.5%",
                          },
                          {
                            label: "Revenue",
                            value: "$45,231",
                            change: "+8.2%",
                          },
                          {
                            label: "Conversion",
                            value: "3.24%",
                            change: "+2.1%",
                          },
                        ].map((metric, i) => (
                          <div
                            key={i}
                            className="p-4 bg-muted/30 rounded-lg border border-border"
                          >
                            <p className="text-sm text-muted-foreground">
                              {metric.label}
                            </p>
                            <p className="text-2xl font-bold mt-1">
                              {metric.value}
                            </p>
                            <p className="text-sm text-green-600 mt-1">
                              {metric.change}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle variant="success" />

                  {/* Chart Area */}
                  <ResizablePanel defaultSize={60}>
                    <div className="h-full p-6 bg-muted/10">
                      <h3 className="text-lg font-bold mb-4">
                        Traffic Overview
                      </h3>
                      <div className="h-[calc(100%-2rem)] bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-border flex items-center justify-center">
                        <p className="text-muted-foreground">
                          Chart visualization area
                        </p>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>

        {/* Documentation Layout */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-success to-transparent rounded-full" />
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <FileText className="h-8 w-8 text-success" />
              Documentation Site
            </h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <ResizablePanelGroup
              direction="horizontal"
              variant="success"
              className="rounded-lg border border-border min-h-[400px] bg-background"
            >
              {/* Table of Contents */}
              <ResizablePanel
                defaultSize={25}
                minSize={10}
                maxSize={60}
                variant="success"
              >
                <div className="h-full bg-success/5 border-r border-border overflow-auto">
                  <div className="p-4 border-b border-border bg-success/10">
                    <h3 className="font-bold text-sm">Table of Contents</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-xs font-bold text-muted-foreground mb-2">
                        GETTING STARTED
                      </div>
                      <div className="space-y-1 pl-2">
                        <div className="text-sm hover:text-primary cursor-pointer">
                          Introduction
                        </div>
                        <div className="text-sm hover:text-primary cursor-pointer">
                          Installation
                        </div>
                        <div className="text-sm text-primary font-medium cursor-pointer border-l-2 border-primary pl-2">
                          Quick Start
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-muted-foreground mb-2">
                        COMPONENTS
                      </div>
                      <div className="space-y-1 pl-2">
                        <div className="text-sm hover:text-primary cursor-pointer">
                          Resizable
                        </div>
                        <div className="text-sm hover:text-primary cursor-pointer">
                          Button
                        </div>
                        <div className="text-sm hover:text-primary cursor-pointer">
                          Modal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle variant="success" />

              {/* Content */}
              <ResizablePanel defaultSize={75}>
                <div className="h-full p-8 overflow-auto">
                  <h1 className="text-3xl font-bold mb-4">Quick Start Guide</h1>
                  <p className="text-muted-foreground mb-6">
                    Get started with our component library in just a few
                    minutes.
                  </p>
                  <div className="prose prose-sm max-w-none">
                    <h2 className="text-xl font-bold mt-6 mb-3">
                      Installation
                    </h2>
                    <div className="bg-black/90 text-green-400 p-4 rounded-lg font-mono text-sm">
                      npm install saha-ui
                    </div>
                    <h2 className="text-xl font-bold mt-6 mb-3">Usage</h2>
                    <p className="text-muted-foreground">
                      Import the components you need and start building your
                      application.
                    </p>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </section>

        {/* Variant Showcase */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-warning to-transparent rounded-full" />
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <PanelLeft className="h-8 w-8 text-warning" />
              All Variants
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                variant: "default" as const,
                label: "Default",
                color: "border",
              },
              {
                variant: "primary" as const,
                label: "Primary",
                color: "primary",
              },
              {
                variant: "secondary" as const,
                label: "Secondary",
                color: "secondary",
              },
              { variant: "accent" as const, label: "Accent", color: "accent" },
              {
                variant: "success" as const,
                label: "Success",
                color: "success",
              },
              {
                variant: "warning" as const,
                label: "Warning",
                color: "warning",
              },
              { variant: "error" as const, label: "Error", color: "error" },
              { variant: "info" as const, label: "Info", color: "info" },
              {
                variant: "outline" as const,
                label: "Outline",
                color: "border",
              },
              { variant: "glass" as const, label: "Glass", color: "muted" },
            ].map(({ variant, label, color }) => (
              <div
                key={variant}
                className="bg-card/30 border border-border/50 rounded-xl p-6 hover:shadow-lg transition-shadow h-fit"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`h-3 w-3 rounded-full bg-${color}`} />
                  <h3 className="font-semibold">{label}</h3>
                </div>
                <ResizablePanelGroup
                  direction="horizontal"
                  variant={variant}
                  className="rounded-lg border border-border min-h-[120px]"
                >
                  <ResizablePanel defaultSize={50} variant={variant}>
                    <div className="flex h-full items-center justify-center p-4">
                      <span className="text-sm font-medium">Left</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle variant={variant} />
                  <ResizablePanel defaultSize={50} variant={variant}>
                    <div className="flex h-full items-center justify-center p-4">
                      <span className="text-sm font-medium">Right</span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
