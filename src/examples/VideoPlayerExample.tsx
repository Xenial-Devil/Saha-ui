import VideoPlayer from "../components/VideoPlayer";

// Note: Browsers cannot load local filesystem paths (e.g. C:\\...).
// Put your video file in the project's `public/` folder (e.g. public/videos/)
// and reference it by a web path. Example: "/videos/file_example_MP4_1920_18MG.mp4"
const sample720 =
  "/videos/Configuring Cloudflare Tunnels for Secure Remote Access (Tutorial).mkv";
const sample480 =
  "/videos/Configuring Cloudflare Tunnels for Secure Remote Access (Tutorial).mkv";

const VideoPlayerExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">
        VideoPlayer Component
      </h3>

      {/* Basic player */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Basic Player</h4>
        <div className="max-w-3xl">
          <VideoPlayer
            sources={[
              { src: sample720, type: "video/mp4", qualityLabel: "720p" },
            ]}
            poster="https://via.placeholder.com/1280x720.png?text=Video+Poster"
            autoplay={false}
            muted={false}
          />
        </div>
      </div>

      {/* Multiple quality sources */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Quality Switch</h4>
        <div className="max-w-3xl">
          <VideoPlayer
            sources={[
              { src: sample720, type: "video/mp4", qualityLabel: "720p" },
              { src: sample480, type: "video/mp4", qualityLabel: "480p" },
            ]}
            poster="https://via.placeholder.com/1280x720.png?text=Quality+Demo"
            autoplay={false}
            muted={false}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="text-sm text-muted-foreground">
        <p>
          This example demonstrates the VideoPlayer component with a single
          source and with multiple quality sources. For live/HLS/DASH streams,
          consider integrating hls.js or a dedicated player.
        </p>
      </div>
    </div>
  );
};

export default VideoPlayerExample;
