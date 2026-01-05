# AspectRatio

A powerful component for maintaining consistent aspect ratios across images, videos, iframes, and embedded content. Provides preset ratios, custom ratio support, and beautiful visual effects.

## Features

- 📐 **8 Preset Ratios** - Common aspect ratios ready to use
- 🎨 **5 Visual Variants** - Different styles including glass morphism
- 🌈 **Overlay Gradients** - Optional overlay effects with positioning
- ✨ **Hover Effects** - Smooth zoom and transition effects
- 🎯 **Type-Safe** - Full TypeScript support with discriminated unions
- ♿ **Accessible** - ARIA attributes and semantic HTML
- 📱 **Responsive** - Works perfectly on all screen sizes

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
```

### Custom Ratios

```tsx
// Custom ratio with number
<AspectRatio ratio="custom" customRatio={2.5}>
  <img src="/panorama.jpg" alt="Panorama" className="object-cover w-full h-full" />
</AspectRatio>

// Custom ratio with string
<AspectRatio ratio="custom" customRatio="1.3:2.3">
  <div className="flex items-center justify-center h-full bg-blue-100">
    Custom Content
  </div>
</AspectRatio>
```

## Visual Variants

```tsx
// Default variant
<AspectRatio ratio="16/9" variant="default">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Bordered variant
<AspectRatio ratio="16/9" variant="bordered">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Glass morphism
<AspectRatio ratio="16/9" variant="glass">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Strong glass effect
<AspectRatio ratio="16/9" variant="glass-strong">
  <img src="/photo.jpg" alt="Photo" className="object-cover w-full h-full" />
</AspectRatio>

// Gradient variant
<AspectRatio ratio="16/9" variant="gradient">
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
```

## Hover Effects

```tsx
// Zoom on hover (default scale: 1.1)
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

## Border Radius

```tsx
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

// Full circle
<AspectRatio ratio="1/1" rounded="full">
  <img src="/avatar.jpg" alt="Avatar" className="object-cover w-full h-full" />
</AspectRatio>
```

## Advanced Examples

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

## Props

| Prop               | Type                                                                 | Default     | Description                                |
| ------------------ | -------------------------------------------------------------------- | ----------- | ------------------------------------------ |
| `ratio`            | `AspectRatioPreset \| "custom"`                                      | `"16/9"`    | Aspect ratio preset or "custom"            |
| `customRatio`      | `number \| string`                                                   | -           | Required when ratio is "custom"            |
| `variant`          | `"default" \| "bordered" \| "glass" \| "glass-strong" \| "gradient"` | `"default"` | Visual style variant                       |
| `rounded`          | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full"`          | `"md"`      | Border radius size                         |
| `overlay`          | `boolean`                                                            | `false`     | Show overlay gradient                      |
| `overlayPosition`  | `"top" \| "bottom" \| "left" \| "right" \| "center"`                 | `"bottom"`  | Overlay gradient position                  |
| `zoomOnHover`      | `boolean`                                                            | `false`     | Enable zoom effect on hover                |
| `zoomScale`        | `number`                                                             | `1.1`       | Zoom scale multiplier (1.0-2.0)            |
| `lazy`             | `boolean`                                                            | `false`     | Enable lazy loading for images             |
| `className`        | `string`                                                             | -           | Additional CSS classes for container       |
| `contentClassName` | `string`                                                             | -           | Additional CSS classes for content wrapper |
| `onClick`          | `(e: MouseEvent) => void`                                            | -           | Click event handler                        |
| `onMouseEnter`     | `(e: MouseEvent) => void`                                            | -           | Mouse enter handler                        |
| `onMouseLeave`     | `(e: MouseEvent) => void`                                            | -           | Mouse leave handler                        |

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
