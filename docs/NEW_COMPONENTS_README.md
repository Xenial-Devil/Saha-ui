# New Components Added to Saha UI

This directory contains documentation for the 4 new components recently added to the Saha UI library.

## 🚀 Components

### 1. Divider
A versatile separator component for dividing content with optional labels.

**Location:** `src/components/Divider/`

**Key Features:**
- Horizontal and vertical orientations
- 4 variants (solid, dashed, dotted, gradient)
- Optional labels with flexible alignment
- Customizable thickness and spacing
- FlexItem support for flex layouts

**Quick Start:**
```tsx
import { Divider } from 'saha-ui';

<Divider>OR</Divider>
```

---

### 2. IconButton
A compact button component designed specifically for icons.

**Location:** `src/components/IconButton/`

**Key Features:**
- 6 variants (filled, outlined, soft, ghost, gradient, glass)
- 7 color schemes
- 5 size options (xs, sm, md, lg, xl)
- 3 shapes (square, rounded, circle)
- Loading and disabled states

**Quick Start:**
```tsx
import { IconButton } from 'saha-ui';
import { Heart } from 'lucide-react';

<IconButton icon={<Heart />} color="primary" aria-label="Like" />
```

---

### 3. Paper
A surface component that provides elevation and visual hierarchy.

**Location:** `src/components/Paper/`

**Key Features:**
- 4 variants (filled, outlined, gradient, glass)
- 7 elevation levels (0-6)
- Customizable padding and border radius
- Hoverable state with animations
- Glass morphism effect

**Quick Start:**
```tsx
import { Paper } from 'saha-ui';

<Paper elevation={3} padding="lg">
  Content with elevation
</Paper>
```

---

### 4. Backdrop
A full-screen overlay component for modals, drawers, and dialogs.

**Location:** `src/components/Backdrop/`

**Key Features:**
- 3 variants (solid, blur, gradient)
- 5 blur intensity levels
- Automatic body scroll locking
- Click-to-close functionality
- Smooth transitions

**Quick Start:**
```tsx
import { Backdrop } from 'saha-ui';

<Backdrop open={isOpen} onClick={() => setIsOpen(false)} blur="lg" />
```

---

## 📚 Documentation Files

- **`NEW_COMPONENTS.md`** - Comprehensive documentation with examples
- **`QUICK_COMPONENT_GUIDE.md`** - Quick reference guide
- **`COMPONENTS_COMPLETION_SUMMARY.md`** - Technical implementation details

---

## 🎨 Example Files

Located in `src/examples/components/`:
- **`DividerExample.tsx`** - Interactive Divider examples
- **`IconButtonExample.tsx`** - Interactive IconButton examples

---

## 💡 Common Use Cases

### Modal Dialog
```tsx
<Backdrop open={open} onClick={onClose} blur="md">
  <Paper elevation={6} padding="lg" onClick={(e) => e.stopPropagation()}>
    <div className="flex justify-between">
      <h2>Title</h2>
      <IconButton icon={<X />} onClick={onClose} aria-label="Close" />
    </div>
    <Divider spacing="sm" />
    <div>Content...</div>
  </Paper>
</Backdrop>
```

### Toolbar
```tsx
<Paper elevation={2} padding="sm">
  <div className="flex items-center gap-2">
    <IconButton icon={<Bold />} aria-label="Bold" />
    <IconButton icon={<Italic />} aria-label="Italic" />
    <Divider orientation="vertical" className="h-6" />
    <IconButton icon={<AlignLeft />} aria-label="Align left" />
  </div>
</Paper>
```

---

## ✨ Features

All components include:
- ✅ Full TypeScript support
- ✅ Dark mode compatibility
- ✅ Accessibility features
- ✅ Responsive design
- ✅ Animation effects
- ✅ CVA-based styling
- ✅ asChild prop for composition

---

## 🔧 Installation

These components are included in Saha UI. Simply import and use:

```tsx
import { Divider, IconButton, Paper, Backdrop } from 'saha-ui';
```

---

## 📖 Learn More

For detailed API documentation, visit the individual documentation files or check out the example implementations.

---

**Status:** ✅ Production Ready  
**Version:** 1.17.0+  
**Last Updated:** November 2024