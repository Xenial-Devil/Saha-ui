# New Components Added to Saha UI

This document describes the 4 new components that have been added to the Saha UI library.

## Components Overview

1. **Divider** - A versatile separator component for dividing content
2. **IconButton** - A compact button component designed specifically for icons
3. **Paper** - A surface component that provides elevation and visual hierarchy
4. **Backdrop** - A full-screen overlay component for modals, drawers, and dialogs

---

## 1. Divider Component

A versatile separator component for dividing content with optional labels. Supports horizontal and vertical orientations, multiple visual styles, and customizable colors and spacing.

### Features
- Horizontal and vertical orientations
- Multiple variants: solid, dashed, dotted, gradient
- Optional labels with flexible alignment
- Customizable colors, thickness, and spacing
- Responsive design

### Basic Usage

```tsx
import { Divider } from 'saha-ui';

// Basic horizontal divider
<Divider />

// With label
<Divider>OR</Divider>
<Divider alignment="start">Section Title</Divider>

// Vertical divider
<Divider orientation="vertical" />

// Styled dividers
<Divider variant="dashed" color="primary" />
<Divider variant="gradient" color="secondary">Content</Divider>
<Divider variant="dotted" spacing="lg" />

// Custom thickness
<Divider thickness={3} />

// In flex layout
<div className="flex items-center gap-4">
  <span>Left</span>
  <Divider orientation="vertical" flexItem />
  <span>Right</span>
</div>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the divider |
| `variant` | `"solid" \| "dashed" \| "dotted" \| "gradient"` | `"solid"` | Visual style |
| `color` | `"default" \| "primary" \| "secondary" \| "muted"` | `"default"` | Color scheme |
| `alignment` | `"start" \| "center" \| "end"` | `"center"` | Label alignment |
| `thickness` | `number` | `1` | Line thickness in pixels |
| `spacing` | `"none" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Spacing around divider |
| `children` | `ReactNode` | - | Optional label content |
| `flexItem` | `boolean` | `false` | Use flexbox layout |

---

## 2. IconButton Component

A compact button component designed specifically for icons. Perfect for toolbars, action menus, and compact UIs. Supports multiple variants, colors, sizes, shapes, and loading states.

### Features
- Multiple variants: filled, outlined, soft, ghost, gradient, glass
- 7 color schemes with consistent theming
- 5 size options (xs, sm, md, lg, xl)
- 3 shape options (square, rounded, circle)
- Loading state with spinner
- Disabled state
- Hover and active animations
- Full accessibility support

### Basic Usage

```tsx
import { IconButton } from 'saha-ui';
import { Heart, Star, Settings, Search, Plus, Menu, Save, Delete, Trash } from 'lucide-react';

// Basic icon button
<IconButton icon={<Heart />} aria-label="Like" />

// With color and variant
<IconButton
  icon={<Star />}
  color="primary"
  variant="filled"
  aria-label="Favorite"
/>

// Different sizes
<IconButton icon={<Settings />} size="sm" aria-label="Settings" />
<IconButton icon={<Search />} size="lg" aria-label="Search" />

// Different shapes
<IconButton icon={<Plus />} shape="circle" aria-label="Add" />
<IconButton icon={<Menu />} shape="square" aria-label="Menu" />

// With loading state
<IconButton icon={<Save />} loading aria-label="Save" />

// Disabled state
<IconButton icon={<Delete />} disabled aria-label="Delete" />

// Ghost variant (minimal style)
<IconButton icon={<MoreVertical />} variant="ghost" aria-label="More options" />

// With custom onClick
<IconButton
  icon={<Trash />}
  onClick={() => console.log('Delete clicked')}
  aria-label="Delete item"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | **required** | Icon element to display |
| `variant` | `"filled" \| "outlined" \| "soft" \| "ghost" \| "gradient" \| "glass"` | `"ghost"` | Visual style |
| `color` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "error" \| "info"` | `"default"` | Color scheme |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Button size |
| `shape` | `"square" \| "rounded" \| "circle"` | `"rounded"` | Button shape |
| `loading` | `boolean` | `false` | Loading state |
| `disabled` | `boolean` | `false` | Disabled state |
| `loadingIcon` | `ReactNode` | `<Loader2 />` | Custom loading icon |
| `aria-label` | `string` | - | Accessibility label (required) |
| `asChild` | `boolean` | `false` | Composition with other components |

---

## 3. Paper Component

A versatile surface component that provides elevation and visual hierarchy. Perfect for cards, containers, and any content that needs to stand out. Supports multiple variants, elevation levels, and customization options.

### Features
- Multiple variants: filled, outlined, gradient, glass
- 7 elevation levels (0-6)
- Customizable padding and border radius
- Hoverable state with animations
- Centering and max-width options
- Glass morphism effect
- Gradient backgrounds

### Basic Usage

```tsx
import { Paper } from 'saha-ui';

// Basic paper
<Paper>
  <h2>Title</h2>
  <p>Content goes here</p>
</Paper>

// With elevation
<Paper elevation={3}>
  Elevated content with shadow
</Paper>

// Outlined variant
<Paper variant="outlined" padding="lg">
  Outlined content with large padding
</Paper>

// Rounded corners
<Paper rounded="xl" elevation={2}>
  Highly rounded content
</Paper>

// Interactive/hoverable
<Paper hoverable onClick={() => console.log('clicked')}>
  Click me
</Paper>

// Glass morphism effect
<Paper variant="glass" elevation={4}>
  Modern glass effect
</Paper>

// Gradient surface
<Paper variant="gradient" elevation={2}>
  Gradient background
</Paper>

// Centered with max width
<Paper centered maxWidth="lg">
  Centered content with max width
</Paper>

// No padding (for custom layouts)
<Paper padding="none">
  <img src="..." alt="..." />
  <div className="p-4">Custom layout</div>
</Paper>

// As different element
<Paper asChild>
  <article>Article content</article>
</Paper>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"filled" \| "outlined" \| "gradient" \| "glass"` | `"filled"` | Visual style |
| `elevation` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | Shadow depth |
| `padding` | `"none" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Internal padding |
| `rounded` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Border radius |
| `hoverable` | `boolean` | `false` | Hover effects |
| `centered` | `boolean` | `false` | Center horizontally |
| `maxWidth` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full"` | - | Maximum width |
| `asChild` | `boolean` | `false` | Composition with other components |

---

## 4. Backdrop Component

A full-screen overlay component typically used behind modals, drawers, and dialogs. Supports blur effects, gradients, and custom opacity. Can contain children like loading spinners or messages. Handles body scroll locking automatically.

### Features
- Full-screen overlay with multiple variants
- Blur effects (sm, md, lg, xl)
- Customizable opacity
- Invisible mode (clickable but not visible)
- Body scroll locking
- Smooth transitions
- Can contain children (spinners, messages)
- Click-to-close functionality
- Custom z-index support

### Basic Usage

```tsx
import { Backdrop } from 'saha-ui';
import { Spinner } from 'saha-ui';

// Basic backdrop
<Backdrop open />

// With blur effect
<Backdrop open variant="blur" blur="lg" />

// With click to close
<Backdrop open onClick={() => setOpen(false)} />

// With custom opacity
<Backdrop open opacity={0.8} />

// Invisible but clickable (for modals)
<Backdrop open invisible onClick={handleClose} />

// With loading spinner
<Backdrop open>
  <Spinner size="lg" />
</Backdrop>

// Gradient backdrop
<Backdrop open variant="gradient" blur="sm" />

// Custom z-index
<Backdrop open zIndex={1400} />

// Disable pointer events (for nested backdrops)
<Backdrop open disablePointerEvents />

// Unmount when closed
<Backdrop open={isOpen} unmountOnExit>
  <div>Loading...</div>
</Backdrop>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Visibility state |
| `variant` | `"solid" \| "blur" \| "gradient"` | `"solid"` | Visual style |
| `blur` | `"none" \| "sm" \| "md" \| "lg" \| "xl"` | `"none"` | Blur intensity |
| `opacity` | `number` | `0.5` | Opacity (0-1) |
| `invisible` | `boolean` | `false` | Invisible but interactive |
| `disablePointerEvents` | `boolean` | `false` | Disable interactions |
| `zIndex` | `number` | `1000` | Z-index value |
| `onClick` | `function` | - | Click handler |
| `preventScroll` | `boolean` | `true` | Lock body scroll |
| `transitionDuration` | `number` | `300` | Transition duration (ms) |
| `unmountOnExit` | `boolean` | `false` | Unmount when closed |
| `children` | `ReactNode` | - | Content on backdrop |

---

## Integration Examples

### Modal with Backdrop and Paper

```tsx
import { Backdrop, Paper, IconButton, Divider } from 'saha-ui';
import { X } from 'lucide-react';

function Modal({ open, onClose, children }) {
  return (
    <Backdrop open={open} onClick={onClose} blur="md" variant="blur">
      <Paper 
        elevation={6} 
        padding="lg" 
        rounded="xl" 
        className="max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Modal Title</h2>
          <IconButton 
            icon={<X />} 
            onClick={onClose}
            aria-label="Close modal"
          />
        </div>
        <Divider spacing="sm" />
        <div className="mt-4">
          {children}
        </div>
      </Paper>
    </Backdrop>
  );
}
```

### Toolbar with IconButtons and Dividers

```tsx
import { Paper, IconButton, Divider } from 'saha-ui';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

function Toolbar() {
  return (
    <Paper elevation={2} padding="sm" rounded="lg">
      <div className="flex items-center gap-2">
        <IconButton icon={<Bold />} aria-label="Bold" />
        <IconButton icon={<Italic />} aria-label="Italic" />
        <IconButton icon={<Underline />} aria-label="Underline" />
        
        <Divider orientation="vertical" spacing="none" className="h-6" />
        
        <IconButton icon={<AlignLeft />} aria-label="Align left" />
        <IconButton icon={<AlignCenter />} aria-label="Align center" />
        <IconButton icon={<AlignRight />} aria-label="Align right" />
      </div>
    </Paper>
  );
}
```

### Loading Overlay

```tsx
import { Backdrop } from 'saha-ui';
import { Loader2 } from 'lucide-react';

function LoadingOverlay({ loading }) {
  return (
    <Backdrop open={loading} variant="blur" blur="sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    </Backdrop>
  );
}
```

---

## Styling and Theming

All components follow the Saha UI design system and support:

- **Dark mode** - Automatic dark mode support
- **CSS Variables** - Uses CSS custom properties for theming
- **Tailwind CSS** - Built with Tailwind utility classes
- **Custom variants** - CVA (Class Variance Authority) for type-safe variants
- **Animation** - Smooth transitions and hover effects
- **Accessibility** - ARIA attributes and keyboard navigation

---

## Accessibility

All components are built with accessibility in mind:

- **IconButton**: Requires `aria-label` for screen readers
- **Divider**: Uses `role="separator"` and `aria-orientation`
- **Backdrop**: Uses `aria-hidden="true"` as it's decorative
- **Paper**: Semantic HTML with proper landmark roles when used with `asChild`

---

## Browser Support

These components support all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Contributing

Found a bug or want to contribute? Check out our [Contributing Guide](../CONTRIBUTING.md).

---

## License

MIT © Saha UI