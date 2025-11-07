# Backdrop

A full-screen overlay component that creates a dimmed background layer, typically used behind modals, dialogs, drawers, and other overlay components. Supports blur effects, gradients, custom opacity, and automatic scroll locking.

## Features

- 🎭 **Multiple Variants** - Solid, blur, and gradient styles
- 🌫️ **Blur Effects** - Multiple blur intensity levels
- 🎨 **Custom Opacity** - Adjustable transparency
- 👻 **Invisible Mode** - Clickable but invisible backdrop
- 🔒 **Scroll Lock** - Automatic body scroll prevention
- ⚡ **Performance** - Optimized animations and transitions
- ♿ **Accessible** - Proper ARIA attributes
- 🎯 **Click Handler** - Handle backdrop clicks for closing overlays

## Installation

```tsx
import { Backdrop } from '@saha-ui/core';
```

## Basic Usage

### Simple Backdrop

```tsx
const [open, setOpen] = useState(false);

<Backdrop open={open} onClick={() => setOpen(false)} />
```

### With Content

```tsx
<Backdrop open={isLoading}>
  <Spinner size="lg" color="white" />
</Backdrop>
```

## Variants

### Solid Variant (Default)

```tsx
// Standard dark overlay
<Backdrop open variant="solid" />
```

### Blur Variant

```tsx
// Backdrop with blur effect
<Backdrop open variant="blur" blur="md" />
```

### Gradient Variant

```tsx
// Gradient overlay effect
<Backdrop open variant="gradient" blur="sm" />
```

## Blur Intensity

```tsx
// No blur
<Backdrop open variant="blur" blur="none" />

// Small blur
<Backdrop open variant="blur" blur="sm" />

// Medium blur
<Backdrop open variant="blur" blur="md" />

// Large blur
<Backdrop open variant="blur" blur="lg" />

// Extra large blur
<Backdrop open variant="blur" blur="xl" />
```

## Custom Opacity

```tsx
// Light opacity
<Backdrop open opacity={0.3} />

// Default opacity
<Backdrop open opacity={0.5} />

// Heavy opacity
<Backdrop open opacity={0.8} />

// Nearly opaque
<Backdrop open opacity={0.95} />
```

## Invisible Backdrop

```tsx
// Invisible but clickable (useful for modal click-outside)
<Backdrop 
  open 
  invisible 
  onClick={handleClose} 
/>
```

## Scroll Lock

```tsx
// Enable scroll lock (default)
<Backdrop open preventScroll />

// Disable scroll lock
<Backdrop open preventScroll={false} />
```

## Z-Index Control

```tsx
// Custom z-index
<Backdrop open zIndex={1400} />

// Lower z-index
<Backdrop open zIndex={800} />

// Higher z-index
<Backdrop open zIndex={9999} />
```

## Transition Duration

```tsx
// Fast transition (200ms)
<Backdrop open transitionDuration={200} />

// Default transition (300ms)
<Backdrop open transitionDuration={300} />

// Slow transition (500ms)
<Backdrop open transitionDuration={500} />
```

## Unmount on Exit

```tsx
// Remove from DOM when closed
<Backdrop open={isOpen} unmountOnExit>
  <div>Loading...</div>
</Backdrop>
```

## Disable Pointer Events

```tsx
// Make backdrop non-interactive
<Backdrop open disablePointerEvents />
```

## Advanced Examples

### Modal Backdrop

```tsx
function Modal({ open, onClose, children }) {
  return (
    <>
      <Backdrop 
        open={open} 
        onClick={onClose}
        variant="blur"
        blur="md"
        opacity={0.6}
      />
      <Dialog open={open} onClose={onClose}>
        {children}
      </Dialog>
    </>
  );
}
```

### Loading Overlay

```tsx
function LoadingOverlay({ isLoading }) {
  return (
    <Backdrop 
      open={isLoading}
      variant="blur"
      blur="sm"
      opacity={0.7}
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner size="xl" />
        <p className="text-white font-medium">Loading...</p>
      </div>
    </Backdrop>
  );
}
```

### Image Lightbox

```tsx
function Lightbox({ image, open, onClose }) {
  return (
    <>
      <Backdrop 
        open={open}
        variant="solid"
        opacity={0.95}
        onClick={onClose}
      >
        <div className="flex items-center justify-center h-full p-8">
          <img 
            src={image} 
            alt="Lightbox" 
            className="max-w-full max-h-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </Backdrop>
    </>
  );
}
```

### Drawer Backdrop

```tsx
function DrawerWithBackdrop({ open, onClose, children }) {
  return (
    <>
      <Backdrop 
        open={open}
        onClick={onClose}
        variant="blur"
        blur="lg"
        opacity={0.4}
      />
      <Drawer open={open} onClose={onClose}>
        {children}
      </Drawer>
    </>
  );
}
```

### Confirmation Dialog

```tsx
function ConfirmDialog({ open, onConfirm, onCancel }) {
  return (
    <>
      <Backdrop open={open} variant="gradient" blur="md" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Confirm Action</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Are you sure you want to proceed?</p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onConfirm}>
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
```

### Multi-Layer Backdrops

```tsx
function NestedModals() {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  return (
    <>
      {/* First backdrop */}
      <Backdrop 
        open={modal1}
        onClick={() => setModal1(false)}
        zIndex={1000}
      />
      
      {/* Second backdrop (higher z-index) */}
      <Backdrop 
        open={modal2}
        onClick={() => setModal2(false)}
        zIndex={1100}
        opacity={0.7}
      />
      
      {/* Modals... */}
    </>
  );
}
```

### Custom Styled Backdrop

```tsx
<Backdrop 
  open
  variant="solid"
  opacity={0.8}
  className="bg-gradient-to-br from-purple-900/90 to-blue-900/90"
  style={{ backdropFilter: 'blur(8px) saturate(180%)' }}
>
  <div className="text-white text-center">
    <h2 className="text-2xl font-bold mb-4">Welcome</h2>
    <p>Custom styled backdrop</p>
  </div>
</Backdrop>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Controls backdrop visibility |
| `variant` | `"solid" \| "blur" \| "gradient"` | `"solid"` | Visual style variant |
| `blur` | `"none" \| "sm" \| "md" \| "lg" \| "xl"` | `"none"` | Blur intensity level |
| `opacity` | `number` | `0.5` | Backdrop opacity (0-1) |
| `invisible` | `boolean` | `false` | Make backdrop transparent but clickable |
| `disablePointerEvents` | `boolean` | `false` | Disable all click interactions |
| `zIndex` | `number` | `1000` | CSS z-index value |
| `preventScroll` | `boolean` | `true` | Lock body scroll when open |
| `transitionDuration` | `number` | `300` | Transition duration in milliseconds |
| `unmountOnExit` | `boolean` | `false` | Remove from DOM when closed |
| `onClick` | `(e: MouseEvent) => void` | - | Click handler (only fires on backdrop) |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |
| `children` | `ReactNode` | - | Content to display on backdrop |

## Behavior Details

### Click Handling

The `onClick` handler only fires when clicking the backdrop itself, not its children:

```tsx
<Backdrop open onClick={() => console.log('Backdrop clicked')}>
  <div onClick={(e) => e.stopPropagation()}>
    {/* Clicking here won't trigger backdrop onClick */}
  </div>
</Backdrop>
```

### Scroll Lock

When `preventScroll={true}`:
- Body overflow is set to hidden
- Scrollbar width is calculated
- Padding is added to prevent layout shift
- Original styles are restored on unmount

### Pointer Events

Children always have `pointer-events: auto`, so they remain interactive even if the backdrop has `disablePointerEvents={true}`.

## Accessibility

The component follows accessibility best practices:

- Uses `aria-hidden="true"` as backdrops are purely visual
- Does not trap focus (handled by overlay components)
- Supports keyboard dismissal (implement in onClick handler)
- Prevents scroll but allows focus within overlays
- Proper z-index management for layering

## Best Practices

1. **Click to Close** - Always provide onClick for dismissing overlays
2. **Scroll Lock** - Keep preventScroll enabled for modals/dialogs
3. **Z-Index** - Use consistent z-index scale across app (1000, 1100, 1200...)
4. **Blur Usage** - Use blur sparingly for performance
5. **Opacity** - Keep between 0.3-0.8 for good visibility balance
6. **Transitions** - Match transition duration with overlay component
7. **Cleanup** - Use unmountOnExit for components with animations

## Performance Tips

```tsx
// Avoid blur on mobile for better performance
const isMobile = window.innerWidth < 768;

<Backdrop 
  open
  variant={isMobile ? "solid" : "blur"}
  blur={isMobile ? "none" : "md"}
/>

// Use invisible backdrop for minimal performance impact
<Backdrop open invisible onClick={handleClose} />

// Reduce transition duration for faster interactions
<Backdrop open transitionDuration={200} />
```

## Common Patterns

### Modal Pattern

```tsx
<>
  <Backdrop open={isOpen} onClick={onClose} variant="blur" blur="sm" />
  <Dialog open={isOpen} onClose={onClose}>
    {/* Dialog content */}
  </Dialog>
</>
```

### Loading Pattern

```tsx
<Backdrop open={isLoading} disablePointerEvents>
  <Spinner />
</Backdrop>
```

### Confirmation Pattern

```tsx
<Backdrop open={showConfirm} variant="gradient" blur="md">
  <ConfirmDialog onConfirm={handleConfirm} onCancel={handleCancel} />
</Backdrop>
```

## Styling

The component uses Tailwind CSS and CVA for styling:

```tsx
// Custom background color
<Backdrop 
  open
  className="bg-blue-900/80"
/>

// Custom blur effect
<Backdrop 
  open
  style={{ backdropFilter: 'blur(12px) brightness(0.8)' }}
/>

// Gradient overlay
<Backdrop 
  open
  className="bg-gradient-to-t from-black/80 via-black/50 to-transparent"
/>
```

## Browser Support

Works in all modern browsers that support:
- CSS backdrop-filter (for blur effects)
- CSS transitions and animations
- Modern JavaScript (ES6+)
- React 18+

Note: Blur effects may have reduced support in older browsers. The component gracefully degrades to solid variant.

## Related Components

- **Dialog** - Modal dialog component
- **Drawer** - Side drawer component
- **Modal** - General modal wrapper
- **Portal** - Portal for rendering outside DOM hierarchy
- **Spinner** - Loading spinner for backdrop content