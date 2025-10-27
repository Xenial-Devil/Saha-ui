import {
  ScrollArea,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollBar,
  ScrollAreaCorner,
} from "../components/ScrollArea";
import { FileText, Image, Music, Video, Folder } from "lucide-react";

export default function ScrollAreaExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Custom Scrollable Areas
            </span>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-br from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            ScrollArea Component
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Beautiful custom scrollbars with smooth animations and variant
            support
          </p>
        </div>

        {/* Compact API Examples */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Compact API</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vertical Scroll */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Vertical Scrolling</h3>
              <ScrollArea
                variant="primary"
                className="h-[300px] rounded-lg p-4"
              >
                <div className="space-y-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-4 bg-primary/5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <h4 className="font-medium">Document {i + 1}</h4>
                          <p className="text-sm text-muted-foreground">
                            This is a sample document item
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Horizontal Scroll */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Horizontal Scrolling</h3>
              <ScrollArea
                variant="secondary"
                orientation="horizontal"
                className="w-full rounded-lg p-4"
              >
                <div className="flex gap-4">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-48 p-4 bg-secondary/5 rounded-lg border border-secondary/20 hover:bg-secondary/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Image className="h-5 w-5 text-secondary" />
                        <div>
                          <h4 className="font-medium text-sm">Image {i + 1}</h4>
                          <p className="text-xs text-muted-foreground">
                            Gallery item
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Both Directions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Both Directions</h3>
              <ScrollArea
                variant="accent"
                orientation="both"
                showCorner
                className="h-[300px] rounded-lg p-4"
              >
                <div className="min-w-[800px] space-y-4">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                      {Array.from({ length: 10 }).map((_, j) => (
                        <div
                          key={j}
                          className="flex-shrink-0 w-32 h-20 bg-accent/5 rounded-lg border border-accent/20 flex items-center justify-center hover:bg-accent/10 transition-colors"
                        >
                          <span className="text-xs font-medium">
                            {i},{j}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Auto-hide Disabled */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Always Visible</h3>
              <ScrollArea
                variant="success"
                autoHide={false}
                className="h-[300px] rounded-lg p-4"
              >
                <div className="space-y-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-4 bg-success/5 rounded-lg border border-success/20 hover:bg-success/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Music className="h-5 w-5 text-success" />
                        <div className="flex-1">
                          <h4 className="font-medium">Track {i + 1}</h4>
                          <p className="text-sm text-muted-foreground">
                            Music file information
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </section>

        {/* Component API Example */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-warning to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Component API</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">File Browser</h3>
              <ScrollAreaRoot
                variant="outline"
                orientation="vertical"
                className="h-[400px] rounded-lg"
              >
                <ScrollAreaViewport className="p-4">
                  <div className="space-y-2">
                    {[
                      { icon: Folder, name: "Documents", count: 45 },
                      { icon: Folder, name: "Downloads", count: 128 },
                      { icon: Folder, name: "Pictures", count: 892 },
                      { icon: Folder, name: "Videos", count: 34 },
                      { icon: Folder, name: "Music", count: 567 },
                    ].map((folder, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                          <folder.icon className="h-5 w-5 text-warning" />
                          <span className="flex-1 font-medium">
                            {folder.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {folder.count} items
                          </span>
                        </div>
                        <div className="pl-8 space-y-1">
                          {Array.from({ length: 8 }).map((_, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-3 p-2 rounded hover:bg-accent/30 cursor-pointer transition-colors"
                            >
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                File {i + 1}-{j + 1}.txt
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollAreaViewport>
                <ScrollBar orientation="vertical" />
              </ScrollAreaRoot>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Media Gallery</h3>
              <ScrollAreaRoot
                variant="glass"
                orientation="both"
                className="h-[400px] rounded-lg"
              >
                <ScrollAreaViewport className="p-4">
                  <div className="grid grid-cols-4 gap-4 min-w-[600px]">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Video className="h-8 w-8 text-white/70" />
                      </div>
                    ))}
                  </div>
                </ScrollAreaViewport>
                <ScrollBar orientation="vertical" />
                <ScrollBar orientation="horizontal" />
                <ScrollAreaCorner />
              </ScrollAreaRoot>
            </div>
          </div>
        </section>

        {/* All Variants */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-error to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">All Variants</h2>
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
                className="bg-card/30 border border-border/50 rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`h-3 w-3 rounded-full bg-${color}`} />
                  <h3 className="font-semibold">{label}</h3>
                </div>
                <ScrollArea
                  variant={variant}
                  className="h-[150px] rounded-lg p-3"
                >
                  <div className="space-y-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded border border-${color}/20 text-sm`}
                      >
                        Item {i + 1}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
