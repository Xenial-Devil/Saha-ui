import { useState } from "react";
import PlayButton from "../components/PlayButton";

export const PlayButtonExample = () => {
  const [playing1, setPlaying1] = useState(false);
  const [playing2, setPlaying2] = useState(false);

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-foreground">PlayButton</h2>
        <p className="text-muted-foreground mb-8">
          Animated play/pause buttons with smooth transitions and modern effects
        </p>
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Variants</h3>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="text-center space-y-2">
            <PlayButton variant="default" />
            <p className="text-sm text-muted-foreground">Default</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="primary" />
            <p className="text-sm text-muted-foreground">Primary</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="secondary" />
            <p className="text-sm text-muted-foreground">Secondary</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="accent" />
            <p className="text-sm text-muted-foreground">Accent</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="info" />
            <p className="text-sm text-muted-foreground">Info</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="success" />
            <p className="text-sm text-muted-foreground">Success</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="warning" />
            <p className="text-sm text-muted-foreground">Warning</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="error" />
            <p className="text-sm text-muted-foreground">Error</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="glass" />
            <p className="text-sm text-muted-foreground">Glass</p>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Sizes</h3>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="text-center space-y-2">
            <PlayButton variant="primary" size="sm" />
            <p className="text-sm text-muted-foreground">Small</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="primary" size="md" />
            <p className="text-sm text-muted-foreground">Medium</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Large</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="primary" size="xl" />
            <p className="text-sm text-muted-foreground">Extra Large</p>
          </div>
        </div>
      </section>

      {/* Controlled State */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Controlled State
        </h3>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="text-center space-y-2">
            <PlayButton
              variant="primary"
              size="lg"
              isPlaying={playing1}
              onToggle={setPlaying1}
            />
            <p className="text-sm text-muted-foreground">
              {playing1 ? "Playing..." : "Paused"}
            </p>
          </div>
          <button
            onClick={() => setPlaying1(!playing1)}
            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-accent/10 transition-colors"
          >
            Toggle from outside
          </button>
        </div>
      </section>

      {/* With Effects */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Effects & Features
        </h3>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="text-center space-y-2">
            <PlayButton variant="success" size="lg" pulse />
            <p className="text-sm text-muted-foreground">Pulse Effect</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton variant="accent" size="lg" glow />
            <p className="text-sm text-muted-foreground">Glow Effect</p>
          </div>
          <div className="text-center space-y-2">
            <PlayButton
              variant="primary"
              size="lg"
              isPlaying={playing2}
              onToggle={setPlaying2}
            />
            <p className="text-sm text-muted-foreground">
              {playing2 ? "Animated Ring" : "Click to Play"}
            </p>
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Real-world Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="p-6 bg-card border border-border rounded-xl space-y-4">
            <h4 className="font-semibold text-foreground">Video Player</h4>
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
              <PlayButton variant="glass" size="xl" />
            </div>
          </div>

          {/* Music Player */}
          <div className="p-6 bg-card border border-border rounded-xl space-y-4">
            <h4 className="font-semibold text-foreground">Music Player</h4>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/30 to-info/30 rounded-lg"></div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Song Title</p>
                <p className="text-sm text-muted-foreground">Artist Name</p>
              </div>
              <PlayButton variant="primary" size="md" />
            </div>
          </div>

          {/* Podcast Player */}
          <div className="p-6 bg-card border border-border rounded-xl space-y-4">
            <h4 className="font-semibold text-foreground">Podcast Player</h4>
            <div className="flex items-center gap-4">
              <PlayButton variant="success" size="lg" />
              <div className="flex-1">
                <p className="font-medium text-foreground">Episode 42</p>
                <p className="text-sm text-muted-foreground">25:30 / 45:00</p>
                <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-success w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
