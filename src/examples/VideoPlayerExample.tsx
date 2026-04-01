import { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";

// Note: Browsers cannot load local filesystem paths (e.g. C:\\...).
// Put your video file in the project's `public/` folder (e.g. public/videos/)
// and reference it by a web path. Example: "/videos/file_example_MP4_1920_18MG.mp4"
const sample720 =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const sample480 =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

const VideoPlayerExample = () => {
  const [playbackEvents, setPlaybackEvents] = useState<string[]>([]);

  const addPlaybackEvent = (eventLabel: string) => {
    setPlaybackEvents((prev) => [
      `${eventLabel} at ${new Date().toLocaleTimeString()}`,
      ...prev,
    ]);
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Video Player</h2>
        <p className="text-muted-foreground">
          Stream product demos, tutorials, and release announcements with custom
          controls.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Single source player
            </p>
            <div className="max-w-3xl">
              <VideoPlayer
                sources={[
                  {
                    src: sample720,
                    type: "video/mp4",
                    qualityLabel: "720p",
                  },
                ]}
                poster="https://via.placeholder.com/1280x720.png?text=Video+Poster"
                autoplay={false}
                muted={false}
              />
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Compact tutorial card
            </p>
            <div className="max-w-3xl">
              <VideoPlayer
                sources={[
                  {
                    src: sample480,
                    type: "video/mp4",
                    qualityLabel: "480p",
                  },
                ]}
                poster="https://via.placeholder.com/1280x720.png?text=Tutorial"
                size="sm"
                muted
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Normal Usage</h3>
        <div className="rounded-lg bg-muted/30 p-6 space-y-3">
          <p className="text-sm font-medium text-foreground">
            Quality switch mode
          </p>
          <div className="max-w-3xl">
            <VideoPlayer
              sources={[
                { src: sample720, type: "video/mp4", qualityLabel: "720p" },
                { src: sample480, type: "video/mp4", qualityLabel: "480p" },
              ]}
              poster="https://via.placeholder.com/1280x720.png?text=Quality+Demo"
              autoplay={false}
              muted={false}
              controls
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Advanced Usage</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Muted loop for kiosk displays
            </p>
            <div className="max-w-3xl">
              <VideoPlayer
                sources={[
                  { src: sample720, type: "video/mp4", qualityLabel: "Main" },
                ]}
                poster="https://via.placeholder.com/1280x720.png?text=Kiosk"
                autoplay
                loop
                muted
                variant="subtle"
              />
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Custom load strategy
            </p>
            <div className="max-w-3xl">
              <VideoPlayer
                sources={[
                  {
                    src: sample480,
                    type: "video/mp4",
                    qualityLabel: "Fallback",
                  },
                ]}
                loadStrategy="native"
                poster="https://via.placeholder.com/1280x720.png?text=Fallback"
                controls
                muted
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real-Life Use Cases</h3>
        <div className="rounded-lg bg-muted/30 p-6 space-y-4">
          <div className="max-w-3xl">
            <VideoPlayer
              sources={[
                {
                  src: sample720,
                  type: "video/mp4",
                  qualityLabel: "Release Demo",
                },
              ]}
              poster="https://via.placeholder.com/1280x720.png?text=Release+Walkthrough"
              onPlay={() => addPlaybackEvent("Play")}
              onPause={() => addPlaybackEvent("Pause")}
              controls
            />
          </div>

          <div className="rounded-md border border-border bg-card p-3">
            <p className="mb-2 text-sm font-medium text-foreground">
              Playback activity
            </p>
            {playbackEvents.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Start or pause playback to capture event history.
              </p>
            ) : (
              <ul className="space-y-1 text-xs text-muted-foreground">
                {playbackEvents.slice(0, 5).map((event) => (
                  <li key={event}>{event}</li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Place media files under public/videos and reference them with web
            paths like /videos/launch-demo.mp4 for production reliability.
          </p>
        </div>
      </section>
    </div>
  );
};

export default VideoPlayerExample;
