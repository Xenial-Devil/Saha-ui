# Spinner

A versatile loading spinner component with multiple visual styles, animations, and customization options. Perfect for indicating loading states, processing operations, and async actions.

## Features

- 🎨 10 visual variants (default, primary, secondary, accent, info, success, warning, error, glass, gradient)
- 📏 Six sizes (xs, sm, md, lg, xl, 2xl)
- 🌀 15 spinner types (ring, dots, dashed, bars, orbit, pulse, wave, spiral, infinity, etc.)
- ✨ Four animation styles (spin, pulse, bounce, ping)
- 🖼️ Custom logo/icon support
- 🎯 Fullscreen overlay mode
- 📝 Optional loading label
- ⚙️ Configurable speed and thickness
- ♿ Fully accessible

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Spinner } from "saha-ui";

function LoadingComponent() {
  return <Spinner />;
}
```

## Sizes

```tsx
<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />
<Spinner size="2xl" />
```

## Variants

### Default

```tsx
<Spinner variant="default" />
```

### Primary

```tsx
<Spinner variant="primary" />
```

### Success

```tsx
<Spinner variant="success" />
```

### Error

```tsx
<Spinner variant="error" />
```

### Glass

```tsx
<Spinner variant="glass" />
```

### Gradient

```tsx
<Spinner variant="gradient" />
```

## Spinner Types

### Ring (Default)

Classic circular ring spinner:

```tsx
<Spinner type="ring" />
```

### Dots

Rotating dots pattern:

```tsx
<Spinner type="dots" />
```

### Dashed

Dashed ring spinner:

```tsx
<Spinner type="dashed" />
```

### Bars

Rotating bars/lines:

```tsx
<Spinner type="bars" />
```

### Orbit

Orbiting dots around a center:

```tsx
<Spinner type="orbit" />
```

### Pulse

Pulsing concentric circles:

```tsx
<Spinner type="pulse" />
```

### Wave

Wave-like bars:

```tsx
<Spinner type="wave" />
```

### Spiral

Spiral rotating pattern:

```tsx
<Spinner type="spiral" />
```

### Infinity

Infinity symbol pattern:

```tsx
<Spinner type="infinity" />
```

### Grid

Grid loading pattern:

```tsx
<Spinner type="grid" />
```

### Bounce

Bouncing dots:

```tsx
<Spinner type="bounce" />
```

## With Label

Display loading text below spinner:

```tsx
<Spinner label="Loading..." />
<Spinner label="Processing your request..." variant="primary" />
```

## Fullscreen Mode

Show spinner with backdrop overlay:

```tsx
<Spinner fullscreen label="Loading..." />
```

## Custom Speed

Control animation speed:

```tsx
<Spinner speed={0.5} /> {/* Slower */}
<Spinner speed={1} />   {/* Normal */}
<Spinner speed={2} />   {/* Faster */}
```

## Thickness

Control spinner thickness:

```tsx
<Spinner thickness="thin" />
<Spinner thickness="default" />
<Spinner thickness="thick" />
```

## With Logo

Display custom logo or icon in center:

```tsx
import { Logo } from "./Logo";

<Spinner logo={<Logo />} logoSize="md" type="ring" />;
```

## Animation Styles

### Spin (Default)

```tsx
<Spinner animation="spin" />
```

### Pulse

```tsx
<Spinner animation="pulse" />
```

### Bounce

```tsx
<Spinner animation="bounce" />
```

### Ping

```tsx
<Spinner animation="ping" />
```

## API Reference

### Spinner Props

| Prop         | Type                                                                                                                                                                        | Default     | Description                |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------- |
| `variant`    | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'glass' \| 'gradient'`                                                 | `'primary'` | Visual style variant       |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                                                                                                                             | `'md'`      | Size of the spinner        |
| `type`       | `'ring' \| 'dots' \| 'dashed' \| 'bars' \| 'dotRing' \| 'orbit' \| 'pulse' \| 'square' \| 'triangle' \| 'wave' \| 'spiral' \| 'infinity' \| 'flower' \| 'grid' \| 'bounce'` | `'ring'`    | Spinner visual structure   |
| `animation`  | `'spin' \| 'pulse' \| 'bounce' \| 'ping'`                                                                                                                                   | `'spin'`    | Animation style            |
| `label`      | `string`                                                                                                                                                                    | -           | Loading text to display    |
| `fullscreen` | `boolean`                                                                                                                                                                   | `false`     | Show with backdrop overlay |
| `speed`      | `number`                                                                                                                                                                    | `1`         | Animation speed multiplier |
| `thickness`  | `'thin' \| 'default' \| 'thick'`                                                                                                                                            | `'default'` | Border thickness           |
| `logo`       | `string \| ReactNode`                                                                                                                                                       | -           | Custom logo or icon        |
| `logoSize`   | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                                                                                      | `'md'`      | Size of logo               |
| `className`  | `string`                                                                                                                                                                    | -           | Additional CSS classes     |

## Common Patterns

### Button Loading State

```tsx
function SubmitButton() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  };

  return (
    <button onClick={handleSubmit} disabled={loading}>
      {loading ? (
        <div className="flex items-center gap-2">
          <Spinner size="sm" variant="default" />
          <span>Submitting...</span>
        </div>
      ) : (
        "Submit"
      )}
    </button>
  );
}
```

### Page Loading

```tsx
function PageWithLoading() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" variant="primary" label="Loading content..." />
      </div>
    );
  }

  return <div>{/* Content */}</div>;
}
```

### Fullscreen Loader

```tsx
function App() {
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <>
      {globalLoading && (
        <Spinner
          fullscreen
          variant="primary"
          label="Processing..."
          type="orbit"
        />
      )}

      {/* App content */}
    </>
  );
}
```

### Inline Loading

```tsx
<div className="flex items-center gap-2">
  <Spinner size="sm" />
  <span>Loading data...</span>
</div>
```

### Card Loading State

```tsx
function DataCard() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center p-8">
          <Spinner variant="primary" type="dots" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </Card>
    );
  }

  return <Card>{/* Content */}</Card>;
}
```

### Upload Progress

```tsx
function FileUpload() {
  const [uploading, setUploading] = useState(false);

  return (
    <div>
      {uploading ? (
        <div className="flex flex-col items-center gap-3">
          <Spinner variant="success" type="ring" size="lg" />
          <p>Uploading files...</p>
        </div>
      ) : (
        <button onClick={handleUpload}>Upload</button>
      )}
    </div>
  );
}
```

## Accessibility

The Spinner component follows accessibility best practices:

- **ARIA Attributes:**

  - Uses `role="status"` for loading indicators
  - Includes `aria-label` for screen readers
  - `aria-live="polite"` announces loading state changes

- **Screen Readers:**
  - Label text is announced to screen readers
  - Loading state changes are communicated

### Example

```tsx
<Spinner label="Loading content" aria-label="Content is loading" />
```

## Best Practices

1. **Appropriate Size:** Match spinner size to the context (small for buttons, large for pages)
2. **Provide Context:** Include labels for longer operations
3. **Use Fullscreen Sparingly:** Reserve for critical blocking operations
4. **Choose Appropriate Type:** Simple types (ring, dots) for quick loads, complex types (orbit, spiral) for longer operations
5. **Color Semantics:** Use variant colors meaningfully (success for completion, error for failures)
6. **Performance:** Avoid multiple simultaneous spinners on the same page
7. **Timeout Handling:** Provide feedback if loading takes too long

## Styling

### Custom Colors

```tsx
<Spinner variant="primary" className="text-blue-600" />
```

### Custom Size

```tsx
<Spinner size="lg" className="w-24 h-24" />
```

### Combining Props

```tsx
<Spinner
  variant="gradient"
  type="orbit"
  size="xl"
  animation="pulse"
  thickness="thick"
  label="Loading..."
  className="my-8"
/>
```

## Performance Tips

1. **Conditional Rendering:** Only render spinner when actually loading
2. **Debounce:** For quick operations, debounce spinner display to avoid flashing
3. **Lazy Loading:** Load spinner component lazily if not immediately needed
4. **CSS Animations:** Prefer CSS-based animations for better performance

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- CSS animations are hardware-accelerated
- Fallback to simpler animations for older browsers

## Related Components

- **Progress** - For determinate progress indication
- **Skeleton** - For content placeholders
- **LoadingBar** - For page-level loading indication
- **Button** - Often combined with spinners for loading states

## Changelog

- **v1.0.0** - Initial release with 15 spinner types and all features
