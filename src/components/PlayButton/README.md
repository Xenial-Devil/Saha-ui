# PlayButton

An animated play/pause button component designed for media players. Features smooth morphing animations between play and pause states with customizable variants and sizes.

## Features

- ▶️ Animated play/pause state transitions
- 🎨 9 visual variants (default, primary, secondary, accent, info, success, warning, error, glass)
- 📏 8 size options (xs to 4xl)
- ✨ Optional pulse animation
- 🌟 Optional glow effect
- 🎯 Toggle callback for state management
- ♿ Fully accessible with ARIA labels
- 🎭 Smooth morphing SVG animations

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { PlayButton } from "saha-ui";
import { useState } from "react";

function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return <PlayButton isPlaying={isPlaying} onToggle={setIsPlaying} />;
}
```

## Variants

```tsx
<div className="flex gap-4">
  <PlayButton variant="default" />
  <PlayButton variant="primary" />
  <PlayButton variant="secondary" />
  <PlayButton variant="accent" />
  <PlayButton variant="info" />
  <PlayButton variant="success" />
  <PlayButton variant="warning" />
  <PlayButton variant="error" />
  <PlayButton variant="glass" />
</div>
```

## Sizes

```tsx
<div className="flex items-center gap-4">
  <PlayButton size="xs" />
  <PlayButton size="sm" />
  <PlayButton size="md" />
  <PlayButton size="lg" />
  <PlayButton size="xl" />
  <PlayButton size="2xl" />
  <PlayButton size="3xl" />
  <PlayButton size="4xl" />
</div>
```

## States

### Playing State

```tsx
<PlayButton isPlaying={true} />
```

### Paused State

```tsx
<PlayButton isPlaying={false} />
```

## Effects

### Pulse Animation

```tsx
<PlayButton pulse={true} />
```

### Glow Effect

```tsx
<PlayButton glow={true} variant="primary" />
```

### Combined Effects

```tsx
<PlayButton variant="glass" pulse={true} glow={true} isPlaying={false} />
```

## Common Patterns

### Video Player Control

```tsx
function VideoPlayer({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggle = (playing: boolean) => {
    setIsPlaying(playing);
    if (playing) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  return (
    <div className="relative">
      <video ref={videoRef} src={src} />
      <div className="absolute inset-0 flex items-center justify-center">
        <PlayButton
          variant="glass"
          size="2xl"
          isPlaying={isPlaying}
          onToggle={handleToggle}
          pulse={!isPlaying}
        />
      </div>
    </div>
  );
}
```

### Audio Player

```tsx
function AudioPlayer({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
      <PlayButton
        variant="primary"
        size="lg"
        isPlaying={isPlaying}
        onToggle={setIsPlaying}
      />
      <div className="flex-1">
        <p className="font-semibold">{track.title}</p>
        <p className="text-sm text-muted-foreground">{track.artist}</p>
      </div>
    </div>
  );
}
```

### Playlist Item

```tsx
function PlaylistItem({ track, isCurrentTrack, isPlaying }) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-muted rounded">
      <PlayButton
        variant={isCurrentTrack ? "primary" : "default"}
        size="sm"
        isPlaying={isCurrentTrack && isPlaying}
        onToggle={(playing) => handleTrackToggle(track.id, playing)}
      />
      <span>{track.title}</span>
    </div>
  );
}
```

### Hero Video

```tsx
<div className="relative h-screen">
  <video autoPlay muted loop className="w-full h-full object-cover" />
  <div className="absolute inset-0 flex items-center justify-center">
    <PlayButton variant="glass" size="4xl" glow={true} pulse={true} />
  </div>
</div>
```

## API Reference

### Props

| Prop        | Type                           | Default     | Description            |
| ----------- | ------------------------------ | ----------- | ---------------------- |
| `variant`   | `PlayButtonVariant`            | `"default"` | Visual style variant   |
| `size`      | `PlayButtonSize`               | `"md"`      | Size of the button     |
| `isPlaying` | `boolean`                      | `false`     | Current playing state  |
| `onToggle`  | `(isPlaying: boolean) => void` | -           | Callback when toggled  |
| `pulse`     | `boolean`                      | `false`     | Show pulsing animation |
| `glow`      | `boolean`                      | `true`      | Show glow effect       |
| `disabled`  | `boolean`                      | `false`     | Disable the button     |
| `className` | `string`                       | -           | Additional CSS classes |

### Variants

```typescript
type PlayButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "glass";
```

### Sizes

```typescript
type PlayButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
```

### Extends

Extends `React.ButtonHTMLAttributes<HTMLButtonElement>`, so you can use all standard button props like `onClick`, `aria-label`, etc.

## Accessibility

The PlayButton component:

- Uses semantic `<button>` element
- Includes appropriate ARIA labels (`aria-label="Play"` / `aria-label="Pause"`)
- Has proper focus states
- Supports keyboard interaction (Space/Enter)
- Announces state changes to screen readers

Custom labels:

```tsx
<PlayButton
  aria-label={isPlaying ? "Pause video" : "Play video"}
  isPlaying={isPlaying}
  onToggle={setIsPlaying}
/>
```

## Styling

### Custom Colors

```tsx
<PlayButton
  variant="primary"
  className="text-purple-500 hover:text-purple-600"
/>
```

### Custom Size

```tsx
<PlayButton size="lg" className="w-24 h-24" />
```

## Animation Details

The PlayButton uses smooth SVG path morphing to transition between play and pause icons:

- **Play → Pause**: Triangle morphs into two vertical bars
- **Pause → Play**: Bars morph back into triangle
- **Duration**: 200ms ease-in-out transition
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

## Dark Mode

PlayButton automatically adapts to dark mode:

```tsx
{
  /* Adjusts colors and glow effects automatically */
}
<PlayButton variant="default" />;
```

## Best Practices

1. **Use appropriate variant**: Match your media player theme
2. **Size for context**: Larger for hero videos, smaller for playlists
3. **Manage state**: Use `isPlaying` and `onToggle` for controlled component
4. **Accessibility**: Provide descriptive labels for screen readers
5. **Visual feedback**: Use pulse/glow for emphasis
6. **Loading states**: Disable while buffering

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Related Components

- [VideoPlayer](../VideoPlayer/README.md) - Full video player component
- [IconButton](../IconButton/README.md) - General icon buttons
- [Button](../Button/README.md) - Standard buttons

## TypeScript

Full TypeScript support:

```typescript
import type { PlayButtonProps, PlayButtonVariant } from "saha-ui";

const config: PlayButtonProps = {
  variant: "primary",
  size: "lg",
  isPlaying: false,
  pulse: true,
};
```
