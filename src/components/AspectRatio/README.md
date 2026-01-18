# AspectRatio

A feature-rich, high-performance component for maintaining consistent aspect ratios across images, videos, iframes, and embedded content. Includes advanced effects like parallax, 3D tilt, lazy loading, and skeleton states.

## Features

- 📐 **11 Preset Ratios** - Common aspect ratios from square to panoramic
- 🎨 **9 Visual Variants** - Styles including glass morphism, neon, frosted, and more
- 🌈 **Overlay Gradients** - 6 positioning options with custom colors and opacity
- ✨ **Advanced Hover Effects** - Zoom with configurable scale
- 🎭 **3D Tilt Effect** - Interactive tilt with glare/shine overlay
- 🎬 **Parallax Scrolling** - Smooth parallax effect with intensity control
- 🔄 **Animation System** - 7 entrance animations (fade, scale, slide, blur, reveal)
- 💀 **Skeleton Loading** - 3 animation styles (pulse, wave, shimmer)
- 🖼️ **Blur Placeholder** - LQIP (Low Quality Image Placeholder) support
- 📦 **Lazy Loading** - Intersection Observer with threshold and margin config
- 🎯 **Type-Safe** - Full TypeScript support with discriminated unions
- ♿ **Accessible** - WCAG compliant with ARIA support
- 📱 **Responsive** - Responsive ratio configuration per breakpoint
- 🎮 **Interactive Mode** - Keyboard navigation and focus management
- 🎨 **Object Fit/Position** - Full control over content positioning
- 🔄 **Loading States** - Idle, loading, loaded, error with callbacks
- 🚀 **Performance Optimized** - Efficient rendering with memoization

## Installation

```tsx
import { AspectRatio } from "saha-ui";
```

## Basic Usage

### Preset Ratios

```tsx
// Square ratio (1:1)
<AspectRatio ratio="1/1">
  <img src="/avatar.jpg" alt="Profile" className="object-cover w-full h-full" />
</AspectRatio>

// Widescreen (16:9)
<AspectRatio ratio="16/9">
  <img src="/banner.jpg" alt="Banner" className="object-cover w-full h-full" />
</AspectRatio>

// Ultrawide (21:9)
<AspectRatio ratio="21/9">
  <video src="/movie.mp4" className="w-full h-full object-cover" />
</AspectRatio>

// Portrait Video (9:16) - Perfect for mobile stories
<AspectRatio ratio="9/16">
  <video src="/story.mp4" className="w-full h-full object-cover" />
</AspectRatio>

// Panoramic (2:1)
<AspectRatio ratio="2/1">
  <img src="/panorama.jpg" alt="Panorama" className="object-cover w-full h-full" />
</AspectRatio>
```

### Custom Ratios

```tsx
// Custom ratio with number
<AspectRatio ratio="custom" customRatio={2.5}>
  <img src="/banner.jpg" alt="Banner" className="object-cover w-full h-full" />
</AspectRatio>

// Custom ratio with string (width:height)
<AspectRatio ratio="custom" customRatio="1.3:2.3">
  <div className="flex items-center justify-center h-full bg-blue-100">
    Custom Content
  </div>
</AspectRatio>
```

## Visual Variants

```tsx
// Default variant - Clean and minimal
<AspectRatio ratio="16/9" variant="default">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Bordered variant - Subtle border
<AspectRatio ratio="16/9" variant="bordered">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Glass morphism - Modern frosted glass
<AspectRatio ratio="16/9" variant="glass">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Strong glass effect - More pronounced
<AspectRatio ratio="16/9" variant="glass-strong">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Frosted - Subtle blur with border
<AspectRatio ratio="16/9" variant="frosted">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Gradient variant - Smooth gradient border
<AspectRatio ratio="16/9" variant="gradient">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Elevated - Raised with shadow
<AspectRatio ratio="16/9" variant="elevated">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Neon - Vibrant neon glow
<AspectRatio ratio="16/9" variant="neon">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Minimal - No styling
<AspectRatio ratio="16/9" variant="minimal">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>
```

## Overlay Effects

```tsx
// Bottom overlay (default)
<AspectRatio ratio="16/9" overlay>
  <img src="/video-thumb.jpg" alt="Video" className="object-cover w-full h-full" />
</AspectRatio>

// Top overlay
<AspectRatio ratio="16/9" overlay overlayPosition="top">
  <img src="/hero.jpg" alt="Hero" className="object-cover w-full h-full" />
</AspectRatio>

// Center overlay
<AspectRatio ratio="16/9" overlay overlayPosition="center">
  <img src="/spotlight.jpg" alt="Spotlight" className="object-cover w-full h-full" />
</AspectRatio>

// Left/Right overlays
<AspectRatio ratio="16/9" overlay overlayPosition="left">
  <img src="/side-content.jpg" alt="Content" className="object-cover w-full h-full" />
</AspectRatio>

// Full overlay
<AspectRatio ratio="16/9" overlay overlayPosition="full">
  <img src="/background.jpg" alt="Background" className="object-cover w-full h-full" />
</AspectRatio>

// Custom overlay color and opacity
<AspectRatio
  ratio="16/9"
  overlay
  overlayPosition="bottom"
  overlayColor="linear-gradient(to top, rgba(255,0,0,0.9), transparent)"
  overlayOpacity={0.7}
>
  <img src="/custom.jpg" alt="Custom" className="object-cover w-full h-full" />
</AspectRatio>
```

## Hover Effects

### Zoom on Hover

```tsx
// Default zoom (1.05x scale)
<AspectRatio ratio="16/9" zoomOnHover>
  <img src="/gallery.jpg" alt="Gallery" className="object-cover w-full h-full" />
</AspectRatio>

// Custom zoom scale
<AspectRatio ratio="16/9" zoomOnHover zoomScale={1.3}>
  <img src="/product.jpg" alt="Product" className="object-cover w-full h-full" />
</AspectRatio>

// Combine with overlay
<AspectRatio ratio="16/9" zoomOnHover overlay overlayPosition="bottom">
  <img src="/featured.jpg" alt="Featured" className="object-cover w-full h-full" />
</AspectRatio>
```

### 3D Tilt Effect

```tsx
// Basic tilt on hover
<AspectRatio ratio="16/9" tilt>
  <img src="/card.jpg" alt="Card" className="object-cover w-full h-full" />
</AspectRatio>

// Tilt with custom angle
<AspectRatio ratio="16/9" tilt maxTilt={15}>
  <img src="/product.jpg" alt="Product" className="object-cover w-full h-full" />
</AspectRatio>

// Tilt with glare effect
<AspectRatio ratio="16/9" tilt glare maxGlare={0.5}>
  <img src="/premium.jpg" alt="Premium" className="object-cover w-full h-full" />
</AspectRatio>

// Combined effects
<AspectRatio
  ratio="16/9"
  tilt
  maxTilt={12}
  glare
  maxGlare={0.4}
  zoomOnHover
  zoomScale={1.05}
>
  <img src="/showcase.jpg" alt="Showcase" className="object-cover w-full h-full" />
</AspectRatio>
```

## Loading States and Lazy Loading

### Lazy Loading

```tsx
// Basic lazy loading
<AspectRatio ratio="16/9" lazy>
  <img src="/large-image.jpg" alt="Large" className="object-cover w-full h-full" />
</AspectRatio>

// Custom threshold and root margin
<AspectRatio
  ratio="16/9"
  lazy
  lazyThreshold={0.3}
  lazyRootMargin="100px"
  onInView={() => console.log("Image in view!")}
>
  <img src="/lazy-image.jpg" alt="Lazy" className="object-cover w-full h-full" />
</AspectRatio>
```

### Skeleton Loading

```tsx
// Default skeleton (pulse animation)
<AspectRatio ratio="16/9" skeleton>
  <img src="/loading.jpg" alt="Loading" className="object-cover w-full h-full" />
</AspectRatio>

// Wave animation skeleton
<AspectRatio
  ratio="16/9"
  skeleton={{
    enabled: true,
    animation: "wave",
  }}
>
  <img src="/loading.jpg" alt="Loading" className="object-cover w-full h-full" />
</AspectRatio>

// Shimmer animation with custom colors
<AspectRatio
  ratio="16/9"
  skeleton={{
    enabled: true,
    animation: "shimmer",
    color: "#e0e0e0",
    highlightColor: "#f5f5f5",
  }}
>
  <img src="/loading.jpg" alt="Loading" className="object-cover w-full h-full" />
</AspectRatio>
```

### Blur Placeholder (LQIP)

```tsx
// Low-quality image placeholder
<AspectRatio
  ratio="16/9"
  blurPlaceholder="/image-thumb.jpg"
  lazy
>
  <img src="/image-full.jpg" alt="Full Quality" className="object-cover w-full h-full" />
</AspectRatio>

// Combine with skeleton
<AspectRatio
  ratio="16/9"
  skeleton
  blurPlaceholder="/thumb.jpg"
  lazy
>
  <img src="/full.jpg" alt="Image" className="object-cover w-full h-full" />
</AspectRatio>
```

### Loading State Control

```tsx
function ControlledLoading() {
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");

  return (
    <AspectRatio
      ratio="16/9"
      loadingState={loadingState}
      onLoad={() => setLoadingState("loaded")}
      onLoadError={(error) => {
        console.error(error);
        setLoadingState("error");
      }}
      fallback={
        <div className="flex items-center justify-center h-full bg-red-50">
          <p>Failed to load image</p>
        </div>
      }
    >
      <img
        src="/image.jpg"
        alt="Controlled"
        className="object-cover w-full h-full"
      />
    </AspectRatio>
  );
}
```

## Animations

### Entrance Animations

```tsx
// Fade in (default)
<AspectRatio ratio="16/9" animation="fade" animationDuration={500}>
  <img src="/image.jpg" alt="Fade" className="object-cover w-full h-full" />
</AspectRatio>

// Scale animation
<AspectRatio ratio="16/9" animation="scale" animationDuration={400}>
  <img src="/image.jpg" alt="Scale" className="object-cover w-full h-full" />
</AspectRatio>

// Slide up
<AspectRatio ratio="16/9" animation="slide-up">
  <img src="/image.jpg" alt="Slide" className="object-cover w-full h-full" />
</AspectRatio>

// Slide down
<AspectRatio ratio="16/9" animation="slide-down">
  <img src="/image.jpg" alt="Slide" className="object-cover w-full h-full" />
</AspectRatio>

// Blur reveal
<AspectRatio ratio="16/9" animation="blur" animationDuration={600}>
  <img src="/image.jpg" alt="Blur" className="object-cover w-full h-full" />
</AspectRatio>

// Progressive reveal
<AspectRatio ratio="16/9" animation="reveal">
  <img src="/image.jpg" alt="Reveal" className="object-cover w-full h-full" />
</AspectRatio>

// No animation
<AspectRatio ratio="16/9" animation="none">
  <img src="/image.jpg" alt="Instant" className="object-cover w-full h-full" />
</AspectRatio>
```

### Parallax Effect

```tsx
// Basic parallax on scroll
<AspectRatio ratio="16/9" parallax>
  <img src="/background.jpg" alt="Parallax" className="object-cover w-full h-full" />
</AspectRatio>

// Custom parallax intensity
<AspectRatio ratio="16/9" parallax parallaxIntensity={0.3}>
  <img src="/hero.jpg" alt="Hero" className="object-cover w-full h-full" />
</AspectRatio>

// Parallax with blur placeholder
<AspectRatio
  ratio="16/9"
  parallax
  parallaxIntensity={0.2}
  blurPlaceholder="/thumb.jpg"
  lazy
>
  <img src="/scene.jpg" alt="Scene" className="object-cover w-full h-full" />
</AspectRatio>
```

## Border Radius

```tsx
// None
<AspectRatio ratio="16/9" rounded="none">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Small radius
<AspectRatio ratio="16/9" rounded="sm">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Medium radius (default)
<AspectRatio ratio="16/9" rounded="md">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Large radius
<AspectRatio ratio="16/9" rounded="lg">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Extra large
<AspectRatio ratio="16/9" rounded="xl">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// 2XL radius
<AspectRatio ratio="16/9" rounded="2xl">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// 3XL radius
<AspectRatio ratio="16/9" rounded="3xl">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Full circle (perfect for 1:1 ratio)
<AspectRatio ratio="1/1" rounded="full">
  <img src="/avatar.jpg" alt="Avatar" className="object-cover w-full h-full" />
</AspectRatio>
```

## Object Fit and Position

```tsx
// Cover (default) - fills container, may crop
<AspectRatio ratio="16/9" objectFit="cover" objectPosition="center">
  <img src="/photo.jpg" alt="Cover" />
</AspectRatio>

// Contain - fits within container, may show empty space
<AspectRatio ratio="16/9" objectFit="contain" objectPosition="center">
  <img src="/logo.png" alt="Contain" />
</AspectRatio>

// Fill - stretches to fill
<AspectRatio ratio="16/9" objectFit="fill">
  <img src="/banner.jpg" alt="Fill" />
</AspectRatio>

// Scale-down - smaller of none or contain
<AspectRatio ratio="16/9" objectFit="scale-down">
  <img src="/small-icon.png" alt="Scale Down" />
</AspectRatio>

// None - original size
<AspectRatio ratio="16/9" objectFit="none" objectPosition="top left">
  <img src="/pattern.jpg" alt="None" />
</AspectRatio>

// Custom positioning
<AspectRatio ratio="16/9" objectFit="cover" objectPosition="top">
  <img src="/portrait.jpg" alt="Top aligned" />
</AspectRatio>

<AspectRatio ratio="16/9" objectFit="cover" objectPosition="80% 20%">
  <img src="/custom.jpg" alt="Custom position" />
</AspectRatio>
```

## Interactive Mode

```tsx
// Basic interactive mode
<AspectRatio
  ratio="16/9"
  interactive
  onClick={() => console.log("Clicked!")}
>
  <img src="/clickable.jpg" alt="Click me" className="object-cover w-full h-full" />
</AspectRatio>

// Interactive with keyboard navigation
<AspectRatio
  ratio="16/9"
  interactive
  tabIndex={0}
  role="button"
  aria-label="View full image"
  onClick={handleImageClick}
  className="cursor-pointer"
>
  <img src="/gallery.jpg" alt="Gallery" className="object-cover w-full h-full" />
</AspectRatio>

// Interactive card with multiple effects
<AspectRatio
  ratio="4/3"
  interactive
  zoomOnHover
  tilt
  glare
  overlay
  overlayPosition="bottom"
  onClick={handleClick}
  className="cursor-pointer"
>
  <img src="/product.jpg" alt="Product" className="object-cover w-full h-full" />
</AspectRatio>
```

### Video Player

```tsx
<AspectRatio
  ratio="16/9"
  variant="bordered"
  rounded="lg"
  overlay
  overlayPosition="bottom"
>
  <video src="/demo.mp4" controls className="w-full h-full object-cover" />
</AspectRatio>
```

### Embedded Content

```tsx
<AspectRatio ratio="16/9" variant="glass">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="w-full h-full"
  />
</AspectRatio>
```

### Image Gallery Card

```tsx
<AspectRatio
  ratio="4/3"
  variant="bordered"
  rounded="xl"
  zoomOnHover
  zoomScale={1.15}
  overlay
  overlayPosition="bottom"
  onClick={() => console.log("Image clicked")}
  className="cursor-pointer"
>
  <img
    src="/gallery-item.jpg"
    alt="Gallery Item"
    className="object-cover w-full h-full"
  />
</AspectRatio>
```

### Product Showcase

```tsx
<AspectRatio
  ratio="1/1"
  variant="glass-strong"
  rounded="2xl"
  zoomOnHover
  className="group"
>
  <div className="relative w-full h-full">
    <img
      src="/product.jpg"
      alt="Product"
      className="object-cover w-full h-full"
    />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
      <h3 className="text-white font-semibold">Product Name</h3>
      <p className="text-white/80 text-sm">$99.99</p>
    </div>
  </div>
</AspectRatio>
```

## API Reference

### Props

Comprehensive table of all available props:

| Prop                | Type                                                                                                                   | Default     | Description                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------- |
| **Ratio & Layout**  |                                                                                                                        |             |                                                   |
| `ratio`             | `AspectRatioPreset \| "custom"`                                                                                        | `"16/9"`    | Aspect ratio preset or "custom"                   |
| `customRatio`       | `number \| string`                                                                                                     | -           | Custom ratio value (required when ratio="custom") |
| **Visual Style**    |                                                                                                                        |             |                                                   |
| `variant`           | `"default" \| "bordered" \| "glass" \| "glass-strong" \| "frosted" \| "gradient" \| "elevated" \| "minimal" \| "neon"` | `"default"` | Visual style variant                              |
| `rounded`           | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "full"`                                                   | `"md"`      | Border radius size                                |
| **Overlay**         |                                                                                                                        |             |                                                   |
| `overlay`           | `boolean`                                                                                                              | `false`     | Show overlay gradient                             |
| `overlayPosition`   | `"top" \| "bottom" \| "left" \| "right" \| "center" \| "full"`                                                         | `"bottom"`  | Overlay position                                  |
| `overlayColor`      | `string`                                                                                                               | -           | Custom overlay color (CSS gradient or color)      |
| `overlayOpacity`    | `number` (0-1)                                                                                                         | `0.5`       | Overlay opacity                                   |
| **Hover Effects**   |                                                                                                                        |             |                                                   |
| `zoomOnHover`       | `boolean`                                                                                                              | `false`     | Enable zoom effect on hover                       |
| `zoomScale`         | `number` (1.0-2.0)                                                                                                     | `1.05`      | Zoom scale multiplier                             |
| `tilt`              | `boolean`                                                                                                              | `false`     | Enable 3D tilt effect on hover                    |
| `maxTilt`           | `number`                                                                                                               | `10`        | Maximum tilt angle in degrees                     |
| `glare`             | `boolean`                                                                                                              | `false`     | Enable shine/glare effect with tilt               |
| `maxGlare`          | `number` (0-1)                                                                                                         | `0.35`      | Maximum glare opacity                             |
| **Loading & Lazy**  |                                                                                                                        |             |                                                   |
| `lazy`              | `boolean`                                                                                                              | `false`     | Enable lazy loading with Intersection Observer    |
| `lazyThreshold`     | `number` (0-1)                                                                                                         | `0.1`       | Intersection Observer threshold                   |
| `lazyRootMargin`    | `string`                                                                                                               | `"50px"`    | Root margin for Intersection Observer             |
| `skeleton`          | `boolean \| SkeletonConfig`                                                                                            | `false`     | Show skeleton while loading                       |
| `blurPlaceholder`   | `string`                                                                                                               | -           | Blur placeholder image URL (LQIP)                 |
| `fallback`          | `ReactNode`                                                                                                            | -           | Fallback content when loading fails               |
| `loadingState`      | `"idle" \| "loading" \| "loaded" \| "error"`                                                                           | -           | Controlled loading state                          |
| **Content**         |                                                                                                                        |             |                                                   |
| `objectFit`         | `"cover" \| "contain" \| "fill" \| "none" \| "scale-down"`                                                             | `"cover"`   | Object fit for content                            |
| `objectPosition`    | `string`                                                                                                               | `"center"`  | Object position for content                       |
| **Animation**       |                                                                                                                        |             |                                                   |
| `animation`         | `"none" \| "fade" \| "scale" \| "slide-up" \| "slide-down" \| "blur" \| "reveal"`                                      | `"fade"`    | Entrance animation preset                         |
| `animationDuration` | `number`                                                                                                               | `300`       | Animation duration in milliseconds                |
| `parallax`          | `boolean`                                                                                                              | `false`     | Enable parallax effect on scroll                  |
| `parallaxIntensity` | `number` (0-1)                                                                                                         | `0.1`       | Parallax intensity                                |
| **Interactivity**   |                                                                                                                        |             |                                                   |
| `interactive`       | `boolean`                                                                                                              | `false`     | Enable focus states and keyboard nav              |
| `onClick`           | `(e: MouseEvent) => void`                                                                                              | -           | Click event handler                               |
| `onMouseEnter`      | `(e: MouseEvent) => void`                                                                                              | -           | Mouse enter handler                               |
| `onMouseLeave`      | `(e: MouseEvent) => void`                                                                                              | -           | Mouse leave handler                               |
| **Callbacks**       |                                                                                                                        |             |                                                   |
| `onLoad`            | `() => void`                                                                                                           | -           | Callback when content loads successfully          |
| `onLoadError`       | `(error: Error) => void`                                                                                               | -           | Callback when content fails to load               |
| `onInView`          | `() => void`                                                                                                           | -           | Callback when element enters viewport             |
| **Styling**         |                                                                                                                        |             |                                                   |
| `className`         | `string`                                                                                                               | -           | Additional CSS classes for container              |
| `contentClassName`  | `string`                                                                                                               | -           | Additional CSS classes for content wrapper        |
| `overlayClassName`  | `string`                                                                                                               | -           | Additional CSS classes for overlay                |
| `style`             | `CSSProperties`                                                                                                        | -           | Custom inline styles                              |
| **Accessibility**   |                                                                                                                        |             |                                                   |
| `aria-label`        | `string`                                                                                                               | -           | Accessible label for the container                |
| `role`              | `string`                                                                                                               | -           | ARIA role                                         |
| `tabIndex`          | `number`                                                                                                               | -           | Tab index for keyboard navigation                 |

### SkeletonConfig Interface

```typescript
interface SkeletonConfig {
  enabled?: boolean;
  animation?: "pulse" | "wave" | "shimmer";
  color?: string;
  highlightColor?: string;
}
```

## Preset Ratios

| Preset   | Ratio             | Common Use Case                         |
| -------- | ----------------- | --------------------------------------- |
| `"1/1"`  | Square            | Avatars, thumbnails, social media posts |
| `"4/3"`  | Standard          | Classic photos, presentations           |
| `"16/9"` | Widescreen        | Videos, modern displays, hero images    |
| `"21/9"` | Ultrawide         | Cinematic content, wide banners         |
| `"3/2"`  | Photo             | Photography, DSLR images                |
| `"2/3"`  | Portrait Photo    | Vertical photography                    |
| `"9/16"` | Portrait Video    | Mobile videos, stories                  |
| `"3/4"`  | Portrait Standard | Vertical displays                       |

## Accessibility

The component follows accessibility best practices:

- Semantic HTML structure with proper container hierarchy
- Support for all native div attributes and event handlers
- Overlay elements marked with `aria-hidden="true"`
- Works seamlessly with screen readers
- Keyboard navigation support through native elements
- Proper focus management for interactive content

## Best Practices

1. **Use appropriate object-fit** - Add `object-cover` or `object-contain` classes to images/videos
2. **Full dimensions** - Apply `w-full h-full` classes to child content
3. **Custom ratios** - Use numeric values (2.5) for simplicity or strings ("16:9") for clarity
4. **Zoom scale** - Keep between 1.1-1.3 for subtle, professional effects
5. **Overlay positioning** - Match overlay position to content focus area
6. **Variants** - Use glass variants for overlay content, bordered for emphasis
7. **Performance** - Enable `lazy` prop for images below the fold

## Type Safety

The component uses discriminated unions for type safety:

```tsx
// ✅ Valid: Preset ratio
<AspectRatio ratio="16/9">...</AspectRatio>

// ✅ Valid: Custom ratio with value
<AspectRatio ratio="custom" customRatio={2.5}>...</AspectRatio>

// ❌ Invalid: customRatio without ratio="custom"
<AspectRatio ratio="16/9" customRatio={2.5}>...</AspectRatio>

// ❌ Invalid: ratio="custom" without customRatio
<AspectRatio ratio="custom">...</AspectRatio>
```

## Examples in Context

### Blog Post Hero

```tsx
<article>
  <AspectRatio
    ratio="21/9"
    variant="gradient"
    rounded="lg"
    overlay
    overlayPosition="bottom"
  >
    <img
      src="/blog-hero.jpg"
      alt="Article"
      className="object-cover w-full h-full"
    />
  </AspectRatio>
  <h1>Article Title</h1>
  <p>Article content...</p>
</article>
```

### User Avatar Grid

```tsx
<div className="grid grid-cols-4 gap-4">
  {users.map((user) => (
    <AspectRatio key={user.id} ratio="1/1" rounded="full" variant="bordered">
      <img
        src={user.avatar}
        alt={user.name}
        className="object-cover w-full h-full"
      />
    </AspectRatio>
  ))}
</div>
```

## Browser Support

Works in all modern browsers that support:

- CSS Grid and Flexbox
- CSS Custom Properties
- CSS Transforms
- Modern JavaScript (ES6+)
