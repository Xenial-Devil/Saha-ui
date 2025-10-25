# AspectRatio Component - Advanced Features

## Overview

The AspectRatio component has been enhanced with advanced features including custom string ratio parsing, zoom effects, interactive callbacks, and **type-safe validation** that ensures correct prop usage.

## ⚠️ Type Safety & Validation

The component now uses **TypeScript discriminated unions** to enforce proper usage:

### ✅ Valid Usage

```tsx
// Preset ratios - customRatio is NOT allowed
<AspectRatio ratio="16/9">
  <img src="..." />
</AspectRatio>

// Custom ratio - customRatio is REQUIRED
<AspectRatio ratio="custom" customRatio="1.3:2.3">
  <img src="..." />
</AspectRatio>

<AspectRatio ratio="custom" customRatio={2.5}>
  <img src="..." />
</AspectRatio>
```

### ❌ Invalid Usage (TypeScript Errors)

```tsx
// ERROR: customRatio provided without ratio="custom"
<AspectRatio ratio="16/9" customRatio={2.5}>
  <img src="..." />
</AspectRatio>

// ERROR: ratio="custom" without customRatio
<AspectRatio ratio="custom">
  <img src="..." />
</AspectRatio>
```

### Runtime Validation

The component also includes runtime validation with helpful console messages:

- **Error**: When `ratio="custom"` but `customRatio` is not provided
- **Warning**: When `customRatio` is provided but `ratio` is not "custom"

## New Features

### 1. String Ratio Format Support

You can now specify custom aspect ratios using string format `"width:height"`:

```tsx
// String format
<AspectRatio ratio="custom" customRatio="1.3:2.3">
  {/* Content */}
</AspectRatio>

// Numeric format (still supported)
<AspectRatio ratio="custom" customRatio={2.5}>
  {/* Content */}
</AspectRatio>

// Common examples
<AspectRatio ratio="custom" customRatio="5:7">    {/* Portrait */}
<AspectRatio ratio="custom" customRatio="2.5:1">  {/* Ultra-wide */}
<AspectRatio ratio="custom" customRatio="1:1.5">  {/* Custom portrait */}
```

### 2. Zoom on Hover Effect

Interactive zoom effects with customizable scale:

```tsx
// Default zoom (1.1x)
<AspectRatio ratio="16/9" zoomOnHover>
  <img src="..." alt="..." />
</AspectRatio>

// Custom zoom scale (1.05x - 2.0x)
<AspectRatio ratio="16/9" zoomOnHover zoomScale={1.5}>
  <img src="..." alt="..." />
</AspectRatio>

// Subtle zoom
<AspectRatio ratio="16/9" zoomOnHover zoomScale={1.05}>
  <img src="..." alt="..." />
</AspectRatio>
```

**Note:** Zoom scale is automatically clamped between 1.0 and 2.0 for optimal UX.

### 3. Interactive Callbacks

Event handlers for interactive experiences:

```tsx
const [count, setCount] = useState(0);
const [hovered, setHovered] = useState(false);

// Click handler
<AspectRatio
  ratio="4/3"
  onClick={() => setCount(c => c + 1)}
  className="cursor-pointer"
>
  <div>Click me! Count: {count}</div>
</AspectRatio>

// Hover handlers
<AspectRatio
  ratio="4/3"
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
  <div>Hover detected: {hovered}</div>
</AspectRatio>

// Combined
<AspectRatio
  ratio="4/3"
  onClick={handleClick}
  onMouseEnter={handleEnter}
  onMouseLeave={handleLeave}
  zoomOnHover
  zoomScale={1.2}
>
  <div>Fully interactive!</div>
</AspectRatio>
```

### 4. Lazy Loading Support

Optimize image loading performance:

```tsx
<AspectRatio ratio="16/9" lazy>
  <img src="..." alt="..." className="w-full h-full object-cover" />
</AspectRatio>
```

## Updated Props

### AspectRatioProps Interface

```typescript
export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  // Ratio configuration
  ratio?: AspectRatioType; // Preset ratios
  customRatio?: number | string; // NEW: Now accepts "width:height" strings

  // Visual variants
  variant?: AspectRatioVariant;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

  // Overlay configuration
  overlay?: boolean;
  overlayPosition?: "top" | "bottom" | "center";

  // NEW: Interactive features
  zoomOnHover?: boolean; // Enable zoom effect on hover
  zoomScale?: number; // Zoom scale (1.0 - 2.0)
  lazy?: boolean; // Enable lazy loading for images

  // NEW: Event callbacks
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;

  // Content & styling
  children?: React.ReactNode;
  contentClassName?: string;
}
```

## Technical Implementation

### String Ratio Parsing

The component uses a `parseRatio` helper function that:

- Accepts numeric values directly
- Parses string format `"width:height"` (e.g., "1.3:2.3", "5:7", "2.5:1")
- Falls back to 16:9 if invalid input
- Returns a numeric aspect ratio value

```typescript
const parseRatio = (ratio: number | string | undefined): number => {
  if (typeof ratio === "number") return ratio;
  if (typeof ratio === "string" && ratio.includes(":")) {
    const [width, height] = ratio.split(":").map(parseFloat);
    if (!isNaN(width) && !isNaN(height) && height !== 0) {
      return width / height;
    }
  }
  return 16 / 9; // Default fallback
};
```

### Zoom Effect Implementation

- Uses CSS transforms for smooth scaling
- Inline event handlers for precise control
- Configurable scale with safety clamping
- Smooth transition with 300ms ease-out timing

### Performance Considerations

- Zoom effects use GPU-accelerated CSS transforms
- Lazy loading reduces initial page load
- Event handlers properly cleaned up by React
- No layout shifts during zoom animations

## Examples

See `src/examples/AspectRatioExample.tsx` for comprehensive examples including:

- ✅ All preset aspect ratios (1:1, 4:3, 16:9, 21:9, 3:2, 2:3, 9:16, 3:4)
- ✅ All visual variants (default, bordered, glass, glass-strong, gradient)
- ✅ Custom string ratios ("1.3:2.3", "5:7", "2.5:1")
- ✅ Zoom effects with different scales
- ✅ Interactive callbacks (click, hover)
- ✅ Combined features demonstrations

## Build Output

```
dist/components\AspectRatio\index.js  6.25 kB │ gzip: 1.81 kB
```

## Browser Compatibility

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ CSS transforms widely supported
- ✅ Hover states work on devices with pointing devices
- ✅ Touch devices use fallback behavior

## Migration Guide

### From Numeric to String Ratios

```tsx
// Before
<AspectRatio ratio="custom" customRatio={1.565}>

// After (more readable)
<AspectRatio ratio="custom" customRatio="1.3:2.3">
```

### Adding Zoom Effect

```tsx
// Before
<AspectRatio ratio="16/9">
  <img src="..." />
</AspectRatio>

// After
<AspectRatio ratio="16/9" zoomOnHover zoomScale={1.1}>
  <img src="..." />
</AspectRatio>
```

### Adding Interactivity

```tsx
// Before
<div onClick={handleClick}>
  <AspectRatio ratio="4/3">
    <img src="..." />
  </AspectRatio>
</div>

// After (cleaner)
<AspectRatio ratio="4/3" onClick={handleClick} className="cursor-pointer">
  <img src="..." />
</AspectRatio>
```

## Best Practices

1. **Use String Ratios for Clarity**

   ```tsx
   ✅ customRatio="16:9"  // Clear and readable
   ❌ customRatio={1.7777777} // Hard to understand
   ```

2. **Keep Zoom Scale Subtle**

   ```tsx
   ✅ zoomScale={1.1}  // Subtle, professional
   ⚠️  zoomScale={1.5}  // Strong, use carefully
   ❌ zoomScale={2.5}  // Too aggressive (will be clamped to 2.0)
   ```

3. **Combine Features Thoughtfully**

   ```tsx
   ✅ Good: zoom + callbacks + bordered variant
   ❌ Avoid: zoom + overlay + very strong glass effect (too much)
   ```

4. **Use Lazy Loading for Performance**
   ```tsx
   ✅ <AspectRatio lazy> for images below the fold
   ❌ Don't lazy load hero images or above-the-fold content
   ```

## Known Limitations

- Zoom scale is clamped between 1.0 and 2.0
- Touch devices may not support hover-based zoom
- Lazy loading attribute requires browser support for native lazy loading
- Very complex ratios (e.g., "1.23456:7.89012") work but may be impractical

## Future Enhancements

- [ ] Touch gesture support for zoom on mobile
- [ ] Pinch-to-zoom functionality
- [ ] Keyboard navigation support
- [ ] ARIA attributes for accessibility
- [ ] Animation presets (fade, slide, scale)
- [ ] Video player integration examples
- [ ] Skeleton loading state
- [ ] Error boundary for image loading failures
