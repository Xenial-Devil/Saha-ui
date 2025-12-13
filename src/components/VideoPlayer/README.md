# VideoPlayer

A feature-rich, customizable video player component with advanced controls, quality switching, captions, and multiple playback features. Built with accessibility and user experience in mind.

## Features

- 🎬 Multiple video sources with quality switching
- 📺 Custom controls with modern UI
- 📝 Caption/subtitle support
- ⏯️ Play, pause, and playback controls
- 🔊 Volume control and mute
- ⏱️ Sleep timer functionality
- ⚡ Playback speed adjustment
- 🖼️ Poster/thumbnail support with auto-generation
- 🔲 Fullscreen support
- ⌨️ Keyboard shortcuts
- 🎨 2 visual variants
- 📏 8 size options
- ♿ Accessible controls

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { VideoPlayer } from "saha-ui";

function App() {
  return (
    <VideoPlayer
      sources={[{ src: "/video.mp4", type: "video/mp4" }]}
      poster="/thumbnail.jpg"
    />
  );
}
```

## With Multiple Quality Options

```tsx
<VideoPlayer
  sources={[
    { src: "/video-1080p.mp4", type: "video/mp4", qualityLabel: "1080p" },
    { src: "/video-720p.mp4", type: "video/mp4", qualityLabel: "720p" },
    { src: "/video-480p.mp4", type: "video/mp4", qualityLabel: "480p" },
  ]}
  poster="/thumbnail.jpg"
  title="My Video"
/>
```

## With Captions

```tsx
<VideoPlayer
  sources={[{ src: "/video.mp4", type: "video/mp4" }]}
  captions={[
    { src: "/captions-en.vtt", srclang: "en", label: "English", default: true },
    { src: "/captions-es.vtt", srclang: "es", label: "Spanish" },
    { src: "/captions-fr.vtt", srclang: "fr", label: "French" },
  ]}
  poster="/thumbnail.jpg"
/>
```

## Variants

```tsx
<VideoPlayer variant="default" sources={sources} />
<VideoPlayer variant="subtle" sources={sources} />
```

## Sizes

```tsx
<VideoPlayer size="xs" sources={sources} />
<VideoPlayer size="sm" sources={sources} />
<VideoPlayer size="md" sources={sources} />
<VideoPlayer size="lg" sources={sources} />
<VideoPlayer size="xl" sources={sources} />
<VideoPlayer size="2xl" sources={sources} />
<VideoPlayer size="3xl" sources={sources} />
<VideoPlayer size="4xl" sources={sources} />
```

## Autoplay and Loop

```tsx
<VideoPlayer
  sources={sources}
  autoplay
  loop
  muted // Required for autoplay in most browsers
/>
```

## With Event Handlers

```tsx
<VideoPlayer
  sources={sources}
  onPlay={() => console.log("Video started playing")}
  onPause={() => console.log("Video paused")}
/>
```

## Common Patterns

### Video Gallery

```tsx
const videos = [
  {
    id: 1,
    title: "Introduction",
    sources: [{ src: "/intro.mp4", type: "video/mp4" }],
    poster: "/intro-poster.jpg",
  },
  {
    id: 2,
    title: "Tutorial",
    sources: [{ src: "/tutorial.mp4", type: "video/mp4" }],
    poster: "/tutorial-poster.jpg",
  },
];

function VideoGallery() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {videos.map((video) => (
        <VideoPlayer
          key={video.id}
          sources={video.sources}
          poster={video.poster}
          title={video.title}
          size="lg"
        />
      ))}
    </div>
  );
}
```

### Streaming Video with Quality Options

```tsx
const streamingSources = [
  {
    src: "https://cdn.example.com/video-4k.mp4",
    type: "video/mp4",
    qualityLabel: "4K",
  },
  {
    src: "https://cdn.example.com/video-1080p.mp4",
    type: "video/mp4",
    qualityLabel: "1080p",
  },
  {
    src: "https://cdn.example.com/video-720p.mp4",
    type: "video/mp4",
    qualityLabel: "720p",
  },
  {
    src: "https://cdn.example.com/video-480p.mp4",
    type: "video/mp4",
    qualityLabel: "480p",
  },
];

<VideoPlayer
  sources={streamingSources}
  poster="https://cdn.example.com/poster.jpg"
  title="Streaming Video"
  variant="default"
  size="2xl"
/>;
```

### Educational Video with Captions

```tsx
<VideoPlayer
  sources={[{ src: "/lecture.mp4", type: "video/mp4" }]}
  captions={[
    {
      src: "/captions/english.vtt",
      srclang: "en",
      label: "English",
      default: true,
    },
    {
      src: "/captions/spanish.vtt",
      srclang: "es",
      label: "Español",
    },
    {
      src: "/captions/french.vtt",
      srclang: "fr",
      label: "Français",
    },
  ]}
  poster="/lecture-thumbnail.jpg"
  title="Introduction to React"
  onPlay={() => trackVideoPlay("lecture-001")}
  onPause={() => trackVideoPause("lecture-001")}
/>
```

### Background Video

```tsx
<div className="relative h-screen overflow-hidden">
  <VideoPlayer
    sources={[{ src: "/background.mp4", type: "video/mp4" }]}
    autoplay
    loop
    muted
    controls={false}
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="relative z-10 flex items-center justify-center h-full">
    <h1 className="text-6xl font-bold text-white">Welcome</h1>
  </div>
</div>
```

## API Reference

### VideoPlayer Props

| Prop        | Type             | Default     | Description                      |
| ----------- | ---------------- | ----------- | -------------------------------- |
| `sources`   | `VideoSource[]`  | -           | Video sources (required)         |
| `poster`    | `string`         | -           | Poster image URL                 |
| `thumbnail` | `string`         | -           | Thumbnail URL (alias for poster) |
| `captions`  | `CaptionTrack[]` | -           | Caption/subtitle tracks          |
| `variant`   | `VideoVariant`   | `"default"` | Visual style                     |
| `size`      | `VideoSize`      | `"md"`      | Size preset                      |
| `title`     | `string`         | `""`        | Video title                      |
| `autoplay`  | `boolean`        | `false`     | Auto-play on load                |
| `loop`      | `boolean`        | `false`     | Loop video                       |
| `muted`     | `boolean`        | `false`     | Start muted                      |
| `controls`  | `boolean`        | `false`     | Show native controls             |
| `onPlay`    | `() => void`     | -           | Play callback                    |
| `onPause`   | `() => void`     | -           | Pause callback                   |
| `className` | `string`         | -           | Additional classes               |

### VideoSource

| Property       | Type     | Description                |
| -------------- | -------- | -------------------------- |
| `src`          | `string` | Video source URL           |
| `type`         | `string` | MIME type (e.g. video/mp4) |
| `qualityLabel` | `string` | Quality label (e.g. 1080p) |

### CaptionTrack

| Property  | Type      | Description             |
| --------- | --------- | ----------------------- |
| `src`     | `string`  | Caption file URL (.vtt) |
| `srclang` | `string`  | Language code (e.g. en) |
| `label`   | `string`  | Display label           |
| `default` | `boolean` | Default caption track   |

## Keyboard Shortcuts

- **Space** - Play/Pause
- **Arrow Up** - Increase volume
- **Arrow Down** - Decrease volume
- **Arrow Left** - Rewind 10 seconds
- **Arrow Right** - Forward 10 seconds
- **M** - Mute/Unmute
- **F** - Toggle fullscreen
- **0-9** - Skip to percentage (0% to 90%)

## Accessibility

- Full keyboard navigation support
- ARIA labels for all controls
- Screen reader friendly
- Caption/subtitle support
- High contrast mode compatible
- Focus indicators on interactive elements

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

Supports all modern browsers with HTML5 video support.

## TypeScript

```typescript
import type { VideoPlayerProps, VideoSource, CaptionTrack } from "saha-ui";
```

## Related Components

- Image
- AspectRatio
- PlayButton
