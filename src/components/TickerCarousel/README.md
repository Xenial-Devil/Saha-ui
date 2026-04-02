# TickerCarousel

A powerful auto-scrolling ticker carousel component for showcasing testimonials, logos, tags, images, or custom content in multiple horizontal rows. Features seamless infinite looping, alternating row directions, pause on hover, reduced motion support, and flexible rendering for library-level customization.

## Features

- 🔁 **Infinite Scrolling** - Seamless clone-based looping with no visible reset
- ↔️ **Alternating Directions** - Each row can scroll in the opposite direction
- ⏸️ **Pause Controls** - Pause on hover, focus, pointer down, or external control
- 🎨 **Visual Variants** - Default, contained, bordered, and glass styles
- 🧩 **Flexible Rendering** - Render default cards or fully custom item layouts
- 🪄 **Edge Fade** - Optional gradient fade on both sides for smoother visuals
- ♿ **Accessible** - ARIA labels, focusable items, and reduced motion support
- ⚙️ **Library Ready** - Row configs, classNames, styles, slotProps, and ref API

## Installation

```tsx
import { TickerCarousel } from "saha-ui";
```

## Basic Usage

### Simple Ticker Carousel

```tsx
<TickerCarousel
  items={[
    {
      id: 1,
      name: "Sarah Chen",
      username: "@sarah",
      quote: "This component feels smooth and premium.",
      avatar: "/avatars/1.jpg",
    },
    {
      id: 2,
      name: "Arif Hasan",
      username: "@arif",
      quote: "Hover pause works exactly how I wanted.",
      avatar: "/avatars/2.jpg",
    },
    {
      id: 3,
      name: "Nadia Noor",
      username: "@nadia",
      quote: "The alternating rows look great.",
      avatar: "/avatars/3.jpg",
    },
  ]}
  rows={2}
/>
```

### With Custom Cards

```tsx
<TickerCarousel
  items={testimonials}
  rows={2}
  cardWidth={320}
  renderItem={(item) => (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <img
          src={item.avatar}
          alt={item.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <h3 className="text-sm font-semibold">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.username}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{item.quote}</p>
    </div>
  )}
/>
```

## Variants

```tsx
// Default
<TickerCarousel variant="default" />

// Contained
<TickerCarousel variant="contained" />

// Bordered
<TickerCarousel variant="bordered" />

// Glass
<TickerCarousel variant="glass" />
```

## Direction

### Default Alternating Direction

```tsx
<TickerCarousel
  items={items}
  rows={3}
  direction="left"
/>
```

### Custom Row Directions

```tsx
<TickerCarousel
  items={items}
  rows={3}
  rowDirections={["left", "right", "left"]}
/>
```

## Pause Behavior

### Pause on Hover

```tsx
<TickerCarousel
  items={items}
  pauseOnHover
/>
```

### Pause on Focus

```tsx
<TickerCarousel
  items={items}
  pauseOnFocus
/>
```

### Pause When Offscreen

```tsx
<TickerCarousel
  items={items}
  pauseWhenOffscreen
/>
```

### Controlled Pause State

```tsx
const [paused, setPaused] = useState(false);

<TickerCarousel
  items={items}
  paused={paused}
  onPausedChange={setPaused}
/>
```

## Row Configuration

```tsx
<TickerCarousel
  items={items}
  rows={3}
  rowConfigs={[
    { speed: 30, direction: "left" },
    { speed: 45, direction: "right" },
    { speed: 35, direction: "left" },
  ]}
/>
```

## Edge Fade

```tsx
<TickerCarousel
  items={items}
  showEdgeFade
  edgeFadeWidth={72}
/>
```

## Custom Width and Gap

```tsx
<TickerCarousel
  items={items}
  cardWidth={280}
  gap={20}
  rowGap={24}
/>
```

## Advanced Examples

### Testimonial Ticker

```tsx
<TickerCarousel
  items={testimonials}
  rows={2}
  speed={40}
  gap={16}
  cardWidth={320}
  variant="glass"
  itemVariant="elevated"
  pauseOnHover
  pauseOnFocus
  showEdgeFade
  className="max-w-6xl mx-auto"
/>
```

### Logo Ticker

```tsx
<TickerCarousel
  items={logos}
  rows={2}
  speed={55}
  cardWidth={180}
  gap={24}
  variant="contained"
  renderItem={(item) => (
    <div className="flex h-24 items-center justify-center rounded-xl border bg-background px-6">
      <img
        src={item.image}
        alt={item.name}
        className="max-h-10 w-auto object-contain opacity-80"
      />
    </div>
  )}
/>
```

### Tag Ticker

```tsx
<TickerCarousel
  items={tags}
  rows={3}
  speed={36}
  cardWidth="auto"
  gap={12}
  renderItem={(item) => (
    <div className="rounded-full border bg-muted px-4 py-2 text-sm font-medium whitespace-nowrap">
      #{item.label}
    </div>
  )}
/>
```

### Controlled With Ref

```tsx
import { useRef } from "react";
import { TickerCarousel, TickerCarouselRef } from "saha-ui";

const tickerRef = useRef<TickerCarouselRef>(null);

<>
  <div className="mb-4 flex gap-2">
    <button onClick={() => tickerRef.current?.play()}>Play</button>
    <button onClick={() => tickerRef.current?.pause()}>Pause</button>
    <button onClick={() => tickerRef.current?.toggle()}>Toggle</button>
    <button onClick={() => tickerRef.current?.recalculate()}>
      Recalculate
    </button>
  </div>

  <TickerCarousel
    ref={tickerRef}
    items={items}
    rows={2}
  />
</>
```

## Props

### TickerCarousel Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `items` | `TItem[]` | `[]` | Array of items to render |
| `rows` | `number` | `2` | Number of ticker rows |
| `rowConfigs` | `TickerRowConfig[]` | - | Per-row override config |
| `speed` | `number` | `40` | Default scroll speed in px/s |
| `rowSpeeds` | `number[]` | - | Custom speed per row |
| `direction` | `"left" \| "right"` | `"left"` | Base direction for the first row |
| `rowDirections` | `("left" \| "right")[]` | - | Explicit direction per row |
| `paused` | `boolean` | - | Controlled paused state |
| `defaultPaused` | `boolean` | `false` | Initial uncontrolled paused state |
| `onPausedChange` | `(paused: boolean) => void` | - | Pause state change callback |
| `pauseOnHover` | `boolean` | `true` | Pause row animation on hover |
| `pauseOnFocus` | `boolean` | `true` | Pause row animation on focus |
| `pauseOnPointerDown` | `boolean` | `false` | Pause when pointer is pressed |
| `pauseWhenOffscreen` | `boolean` | `true` | Pause when component leaves viewport |
| `playOnMount` | `boolean` | `true` | Start animation on mount |
| `gap` | `number \| string` | `16` | Gap between items in a row |
| `rowGap` | `number \| string` | `16` | Gap between rows |
| `cardWidth` | `number \| string` | `320` | Default item width |
| `variant` | `"default" \| "contained" \| "bordered" \| "glass"` | `"default"` | Root visual style |
| `itemVariant` | `"default" \| "bordered" \| "soft" \| "ghost" \| "elevated"` | `"default"` | Item visual style |
| `showEdgeFade` | `boolean` | `false` | Show gradient fade on edges |
| `edgeFadeWidth` | `number \| string` | `64` | Width of edge fade overlay |
| `respectReducedMotion` | `boolean` | `true` | Respect `prefers-reduced-motion` |
| `reducedMotionBehavior` | `"stop" \| "static" \| "scrollable"` | `"stop"` | Reduced motion fallback |
| `fillViewport` | `boolean` | `true` | Auto-add clones to fill visible space |
| `minimumClones` | `number` | `2` | Minimum number of cloned sets |
| `ariaLabel` | `string` | `"Ticker carousel"` | Accessible label for the root region |
| `ariaLabelledBy` | `string` | - | ID of external label element |
| `ariaDescribedBy` | `string` | - | ID of external description element |
| `rowAriaLabels` | `string[]` | - | Per-row ARIA labels |
| `getItemKey` | `(item, index) => React.Key` | - | Custom item key resolver |
| `renderItem` | `(item, index, meta) => ReactNode` | - | Custom item renderer |
| `classNames` | `TickerClassNames` | - | Slot-level class names |
| `styles` | `TickerStyles` | - | Slot-level inline styles |
| `slotProps` | `TickerSlotProps` | - | Slot-level HTML props |
| `onPlay` | `() => void` | - | Called when ticker starts playing |
| `onPause` | `() => void` | - | Called when ticker pauses |
| `onMeasure` | `(metrics: TickerMetrics) => void` | - | Called after measuring rows |
| `onRowHoverStart` | `(rowIndex: number) => void` | - | Called when a row hover starts |
| `onRowHoverEnd` | `(rowIndex: number) => void` | - | Called when a row hover ends |
| `onItemClick` | `(item, index, rowIndex) => void` | - | Item click callback |
| `className` | `string` | - | Additional root classes |

### TickerRowConfig

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `id` | `string \| number` | - | Custom row key |
| `direction` | `"left" \| "right"` | - | Direction override |
| `speed` | `number` | - | Speed override |
| `gap` | `number \| string` | - | Row gap override |
| `className` | `string` | - | Additional row classes |
| `style` | `React.CSSProperties` | - | Inline row styles |
| `ariaLabel` | `string` | - | Accessible row label |
| `pauseOnHover` | `boolean` | - | Override hover pause for row |
| `pauseOnFocus` | `boolean` | - | Override focus pause for row |

## Ref API

```tsx
interface TickerCarouselRef {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  recalculate: () => void;
  getRootElement: () => HTMLDivElement | null;
  getRowElement: (rowIndex: number) => HTMLDivElement | null;
}
```

## Accessibility

- ARIA labels for the root container and individual rows
- Keyboard-focusable items by default
- Reduced motion support via `prefers-reduced-motion`
- Focus-based pause support
- Semantic region container for assistive technologies

## Best Practices

1. **Use `renderItem` for custom layouts** - Keep the component generic for testimonials, logos, or tags
2. **Provide stable keys** - Use `id` or `getItemKey` for predictable rendering
3. **Respect reduced motion** - Keep `respectReducedMotion` enabled for accessibility
4. **Use edge fade carefully** - Make sure gradients match your design tokens
5. **Pause on interaction** - Enable hover/focus pause for better readability
6. **Tune speed per content type** - Testimonials should scroll slower than logos
7. **Keep widths consistent** - Fixed widths usually produce the smoothest ticker animation

## Browser Support

Works in all modern browsers that support:

- CSS Transforms
- CSS Keyframes
- Intersection Observer API
- Resize Observer API
- Modern JavaScript (ES6+)

## Related Components

- **Carousel** - Traditional slide-based carousel
- **Card** - Container for custom ticker items
- **Avatar** - For testimonial or profile-based content
- **Image** - For logos and media content
- **Button** - For external play/pause controls
