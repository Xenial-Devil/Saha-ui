# Quick Component Guide - New Components

## 🎯 Quick Reference for 4 New Components

This guide provides a quick reference for the 4 newly added components: Divider, IconButton, Paper, and Backdrop.

---

## 1. 📏 Divider

**Purpose:** Separate content with customizable lines and optional labels.

### Quick Example
```tsx
import { Divider } from 'saha-ui';

// Simple horizontal line
<Divider />

// With label
<Divider>OR</Divider>

// Vertical divider
<Divider orientation="vertical" className="h-10" />
```

### Common Props
| Prop | Values | Default |
|------|--------|---------|
| `orientation` | horizontal, vertical | horizontal |
| `variant` | solid, dashed, dotted, gradient | solid |
| `color` | default, primary, secondary, muted | default |
| `alignment` | start, center, end | center |

### Use Cases
- ✅ Form sections (Login OR Register)
- ✅ List item separators
- ✅ Toolbar dividers
- ✅ Content sections

---

## 2. 🔘 IconButton

**Purpose:** Compact buttons for icons without text.

### Quick Example
```tsx
import { IconButton } from 'saha-ui';
import { Heart, Settings, Trash } from 'lucide-react';

// Basic
<IconButton icon={<Heart />} aria-label="Like" />

// Styled
<IconButton 
  icon={<Settings />} 
  variant="filled" 
  color="primary"
  size="lg"
  aria-label="Settings"
/>

// Loading state
<IconButton icon={<Trash />} loading aria-label="Delete" />
```

### Common Props
| Prop | Values | Default |
|------|--------|---------|
| `icon` | ReactNode | **required** |
| `variant` | filled, outlined, soft, ghost, gradient, glass | ghost |
| `color` | default, primary, secondary, success, warning, error, info | default |
| `size` | xs, sm, md, lg, xl | md |
| `shape` | square, rounded, circle | rounded |
| `aria-label` | string | **required** |

### Use Cases
- ✅ Toolbars and action bars
- ✅ Social media buttons (like, share, favorite)
- ✅ Navigation icons
- ✅ Dialog close buttons
- ✅ Media controls

---

## 3. 📄 Paper

**Purpose:** Surface component with elevation for cards and containers.

### Quick Example
```tsx
import { Paper } from 'saha-ui';

// Basic surface
<Paper>
  <h2>Title</h2>
  <p>Content</p>
</Paper>

// With elevation
<Paper elevation={3} padding="lg">
  Elevated content
</Paper>

// Interactive card
<Paper hoverable onClick={() => alert('Clicked!')}>
  Click me
</Paper>
```

### Common Props
| Prop | Values | Default |
|------|--------|---------|
| `variant` | filled, outlined, gradient, glass | filled |
| `elevation` | 0, 1, 2, 3, 4, 5, 6 | 1 |
| `padding` | none, sm, md, lg, xl | md |
| `rounded` | none, sm, md, lg, xl, full | md |
| `hoverable` | boolean | false |

### Use Cases
- ✅ Card layouts
- ✅ Form containers
- ✅ Content sections
- ✅ Dashboard widgets
- ✅ Image galleries

---

## 4. 🎭 Backdrop

**Purpose:** Full-screen overlay for modals, drawers, and loading states.

### Quick Example
```tsx
import { Backdrop } from 'saha-ui';
import { Spinner } from 'saha-ui';

// Simple overlay
<Backdrop open={isOpen} onClick={() => setIsOpen(false)} />

// With blur
<Backdrop open={isOpen} variant="blur" blur="lg" />

// With loading spinner
<Backdrop open={loading}>
  <Spinner size="lg" />
</Backdrop>
```

### Common Props
| Prop | Values | Default |
|------|--------|---------|
| `open` | boolean | **required** |
| `variant` | solid, blur, gradient | solid |
| `blur` | none, sm, md, lg, xl | none |
| `opacity` | 0-1 | 0.5 |
| `onClick` | function | - |
| `preventScroll` | boolean | true |

### Use Cases
- ✅ Modal backgrounds
- ✅ Loading overlays
- ✅ Drawer backgrounds
- ✅ Image lightboxes
- ✅ Confirmation dialogs

---

## 🎨 Common Patterns

### Modal with Backdrop + Paper + IconButton
```tsx
<Backdrop open={open} onClick={onClose} blur="md">
  <Paper elevation={6} padding="lg" onClick={(e) => e.stopPropagation()}>
    <div className="flex justify-between items-center">
      <h2>Modal Title</h2>
      <IconButton icon={<X />} onClick={onClose} aria-label="Close" />
    </div>
    <Divider spacing="sm" />
    <div>Modal content...</div>
  </Paper>
</Backdrop>
```

### Toolbar with IconButtons + Dividers
```tsx
<Paper elevation={2} padding="sm">
  <div className="flex items-center gap-2">
    <IconButton icon={<Bold />} aria-label="Bold" />
    <IconButton icon={<Italic />} aria-label="Italic" />
    <Divider orientation="vertical" className="h-6" spacing="none" />
    <IconButton icon={<AlignLeft />} aria-label="Align left" />
  </div>
</Paper>
```

---

## 📦 Installation & Import

```tsx
import { 
  Divider, 
  IconButton, 
  Paper, 
  Backdrop 
} from 'saha-ui';
```

---

## ✨ Features Summary

| Component | Key Features |
|-----------|-------------|
| **Divider** | Horizontal/Vertical, 4 variants, Labels, Custom thickness |
| **IconButton** | 6 variants, 7 colors, 5 sizes, 3 shapes, Loading state |
| **Paper** | 4 variants, 7 elevations, Hoverable, Glass effect |
| **Backdrop** | 3 variants, 5 blur levels, Scroll lock, Click handler |

---

## 🎯 Pro Tips

1. **Divider**: Use `flexItem` prop for vertical dividers in flex containers
2. **IconButton**: Always provide `aria-label` for accessibility
3. **Paper**: Use `padding="none"` for images, then add padding to inner content
4. **Backdrop**: Stop propagation on child clicks to prevent closing

---

## 📚 Full Documentation

For complete documentation, examples, and API reference, see:
- `NEW_COMPONENTS.md` - Comprehensive documentation
- `COMPONENTS_COMPLETION_SUMMARY.md` - Technical details
- `src/examples/components/` - Interactive examples

---

**Last Updated:** 2024  
**Components:** 4 new components added  
**Status:** Production Ready ✅