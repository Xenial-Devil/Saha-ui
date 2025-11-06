# Skeleton Component

A flexible and modern skeleton loader component for displaying placeholder content while data is loading. Improves perceived performance, reduces layout shift, and provides better user experience.

## 📋 Table of Contents

- [Why Use Skeleton Loaders?](#why-use-skeleton-loaders)
- [How It Works](#how-it-works)
- [Features](#features)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Variants](#variants)
- [Shapes](#shapes)
- [Animation Speeds](#animation-speeds)
- [Preset Components](#preset-components)
- [Real-World Examples](#real-world-examples)
- [API Reference](#api-reference)
- [Best Practices](#best-practices)
- [Accessibility](#accessibility)

---

## 🎯 Why Use Skeleton Loaders?

Skeleton loaders provide several key benefits:

1. **Perceived Performance** - Users see immediate visual feedback instead of blank screens
2. **Layout Stability** - Prevents Cumulative Layout Shift (CLS) by maintaining space before content loads
3. **Better UX** - Animated placeholders feel more responsive than spinners or blank states
4. **Loading Communication** - Users understand that content is being fetched
5. **Progressive Loading** - Show page structure before details arrive

---

## ⚙️ How It Works

The Skeleton component uses:

- **CSS Animations** - Pulse, shimmer, and wave effects using keyframe animations
- **Pseudo-elements** - `::before` creates animated gradient overlays
- **CVA (Class Variance Authority)** - Manages variant combinations efficiently
- **Tailwind CSS** - Utility-first styling for flexibility
- **React forwardRef** - Proper ref handling for DOM manipulation

---

## ✨ Features

- 🎨 **7 Animation Variants** - Default, Pulse, Wave, Shimmer, Gradient, Glass, Glow
- 📐 **8 Shape Presets** - Rectangle, Circle, Rounded, Text, Card, Button, Input, Avatar
- ⚡ **4 Speed Options** - Slow (3s), Normal (1.5s), Fast (1s), Ultra-fast (0.6s)
- 📦 **6 Preset Components** - Card, Avatar, List, Table, Form, Text
- 🎭 **Multiple Lines Support** - Stack skeletons with customizable spacing
- ♿ **Accessibility** - Screen reader support and reduced motion option
- 🎯 **TypeScript** - Full type safety with comprehensive type definitions
- 🔧 **Customizable** - Custom dimensions, styles, and animations

---

## 📦 Installation

The Skeleton component is included in the Saha-ui library:

```bash
npm install saha-ui
```

---

## 🚀 Basic Usage

### Simple Skeleton

```tsx
import { Skeleton } from "saha-ui";

export default function Example() {
  return <Skeleton width="100%" height="20px" />;
}
```

### Multiple Lines

```tsx
<Skeleton variant="pulse" count={3} spacing="normal" />
```

### Circle Avatar

```tsx
<Skeleton variant="shimmer" shape="circle" width="48px" height="48px" />
```

### Custom Styling

```tsx
<Skeleton
  variant="wave"
  width="200px"
  height="100px"
  className="mb-4 shadow-lg"
  style={{ borderRadius: "16px" }}
/>
```

---

## 🎨 Variants

### Default
Simple pulse animation - subtle and unobtrusive.

```tsx
<Skeleton variant="default" height="60px" />
```

### Pulse
Enhanced pulse with custom timing - popular choice.

```tsx
<Skeleton variant="pulse" height="60px" />
```

### Wave
Sweeping wave effect from left to right - premium feel.

```tsx
<Skeleton variant="wave" height="60px" />
```

### Shimmer
Fast shimmer with primary color accent - energetic.

```tsx
<Skeleton variant="shimmer" height="60px" />
```

### Gradient
Gradient color flow animation - smooth and modern.

```tsx
<Skeleton variant="gradient" height="60px" />
```

### Glass
Glass morphism effect with backdrop blur - elegant.

```tsx
<Skeleton variant="glass" height="60px" />
```

### Glow
Glowing effect with shadow - attention-grabbing.

```tsx
<Skeleton variant="glow" height="60px" />
```

---

## 📐 Shapes

### Pre-configured Shapes

```tsx
// Rectangle - standard rounded corners
<Skeleton shape="rectangle" width="100%" height="80px" />

// Circle - perfect circle, aspect-square
<Skeleton shape="circle" width="80px" height="80px" />

// Rounded - larger border radius
<Skeleton shape="rounded" width="100%" height="80px" />

// Text - small height for text lines
<Skeleton shape="text" count={4} />

// Card - card-like with extra large rounded corners
<Skeleton shape="card" width="100%" height="200px" />

// Button - button-sized (h-10)
<Skeleton shape="button" width="120px" />

// Input - input field sized (h-10)
<Skeleton shape="input" width="100%" />

// Avatar - circle avatar
<Skeleton shape="avatar" width="64px" height="64px" />
```

---

## ⚡ Animation Speeds

Control animation timing to match your app's personality:

```tsx
// Slow (3s) - calm and subtle
<Skeleton variant="wave" speed="slow" height="60px" />

// Normal (1.5s) - balanced default
<Skeleton variant="wave" speed="normal" height="60px" />

// Fast (1s) - quick and energetic
<Skeleton variant="wave" speed="fast" height="60px" />

// Ultra-fast (0.6s) - very responsive
<Skeleton variant="wave" speed="ultra-fast" height="60px" />
```

---

## 📦 Preset Components

Pre-built skeleton loaders for common UI patterns.

### SkeletonCard

Perfect for blog posts, product cards, news items.

```tsx
import { SkeletonCard } from "saha-ui";

// Basic card
<SkeletonCard />

// Custom configuration
<SkeletonCard
  variant="wave"
  imageHeight="300px"
  lines={4}
  showImage={true}
  showActions={true}
/>

// Without image
<SkeletonCard showImage={false} lines={5} />
```

### SkeletonAvatar

Perfect for profile pictures, user lists.

```tsx
import { SkeletonAvatar } from "saha-ui";

// Basic avatar
<SkeletonAvatar size="md" />

// All sizes
<SkeletonAvatar size="xs" />  // 24px
<SkeletonAvatar size="sm" />  // 32px
<SkeletonAvatar size="md" />  // 48px
<SkeletonAvatar size="lg" />  // 64px
<SkeletonAvatar size="xl" />  // 80px
<SkeletonAvatar size="2xl" /> // 96px

// With text content
<SkeletonAvatar size="lg" showText lines={2} />
```

### SkeletonList

Perfect for user lists, comments, notifications.

```tsx
import { SkeletonList } from "saha-ui";

// Basic list
<SkeletonList items={3} />

// Compact list
<SkeletonList
  items={5}
  avatarSize="sm"
  lines={1}
  variant="shimmer"
/>

// Without avatars
<SkeletonList items={4} showAvatar={false} />
```

### SkeletonTable

Perfect for data tables and grids.

```tsx
import { SkeletonTable } from "saha-ui";

// Basic table
<SkeletonTable rows={5} columns={4} />

// Large table without header
<SkeletonTable
  rows={10}
  columns={6}
  showHeader={false}
  variant="pulse"
/>
```

### SkeletonForm

Perfect for loading forms and settings pages.

```tsx
import { SkeletonForm } from "saha-ui";

// Basic form
<SkeletonForm fields={4} />

// Without submit button
<SkeletonForm
  fields={6}
  showButton={false}
  variant="wave"
/>
```

### SkeletonText

Perfect for paragraphs and text content.

```tsx
import { SkeletonText } from "saha-ui";

// Short paragraph
<SkeletonText lines={3} lastLineWidth={60} />

// Long article
<SkeletonText
  lines={8}
  lastLineWidth={45}
  variant="shimmer"
/>
```

---

## 🌟 Real-World Examples

### Loading a Profile Card

```tsx
import { Skeleton } from "saha-ui";
import { Card } from "saha-ui";

function ProfileCard({ isLoading, user }) {
  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="flex items-start gap-4">
          <Skeleton
            shape="circle"
            width="64px"
            height="64px"
            variant="shimmer"
          />
          <div className="flex-1">
            <Skeleton
              variant="shimmer"
              height="24px"
              width="60%"
              className="mb-2"
            />
            <Skeleton
              variant="pulse"
              height="16px"
              width="80%"
              className="mb-4"
            />
            <Skeleton variant="pulse" count={2} height="14px" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="mt-2">{user.bio}</p>
        </div>
      </div>
    </Card>
  );
}
```

### Loading a Dashboard

```tsx
import {
  SkeletonCard,
  SkeletonList,
  SkeletonForm,
} from "saha-ui";

function Dashboard({ isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <SkeletonCard variant="wave" imageHeight="300px" />
          <SkeletonList items={4} variant="shimmer" />
        </div>
        <div className="space-y-6">
          <SkeletonForm fields={3} />
        </div>
      </div>
    );
  }

  return (
    // Actual dashboard content
    <div>...</div>
  );
}
```

### Loading Product Grid

```tsx
import { SkeletonCard } from "saha-ui";

function ProductGrid({ isLoading, products }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard
            key={index}
            variant="wave"
            imageHeight="200px"
            lines={2}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 📚 API Reference

### Skeleton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `SkeletonVariant` | `"default"` | Animation style variant |
| `shape` | `SkeletonShape` | `"rectangle"` | Shape of the skeleton |
| `width` | `string \| number` | `"100%"` | Width (CSS value or number for px) |
| `height` | `string \| number` | `"20px"` | Height (CSS value or number for px) |
| `count` | `number` | `1` | Number of skeleton lines |
| `speed` | `SkeletonSpeed` | `"normal"` | Animation speed |
| `spacing` | `SkeletonSpacing` | `"normal"` | Spacing between multiple skeletons |
| `noAnimation` | `boolean` | `false` | Disable animation (a11y) |
| `borderRadius` | `string` | - | Custom border radius |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |

### SkeletonCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showImage` | `boolean` | `true` | Show image skeleton |
| `imageHeight` | `string` | `"200px"` | Image skeleton height |
| `lines` | `number` | `3` | Number of text lines |
| `showActions` | `boolean` | `true` | Show action buttons |
| `variant` | `SkeletonVariant` | `"wave"` | Animation variant |
| `speed` | `SkeletonSpeed` | `"normal"` | Animation speed |
| `noAnimation` | `boolean` | `false` | Disable animation |

### SkeletonAvatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Avatar size |
| `showText` | `boolean` | `false` | Show text next to avatar |
| `lines` | `number` | `2` | Number of text lines |
| `variant` | `SkeletonVariant` | `"shimmer"` | Animation variant |
| `speed` | `SkeletonSpeed` | `"normal"` | Animation speed |
| `noAnimation` | `boolean` | `false` | Disable animation |

### SkeletonList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `number` | `3` | Number of list items |
| `showAvatar` | `boolean` | `true` | Show avatar in items |
| `avatarSize` | `"sm" \| "md" \| "lg"` | `"md"` | Avatar size |
| `lines` | `number` | `2` | Text lines per item |
| `variant` | `SkeletonVariant` | `"pulse"` | Animation variant |
| `speed` | `SkeletonSpeed` | `"normal"` | Animation speed |
| `noAnimation` | `boolean` | `false` | Disable animation |

### SkeletonTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `number` | `5` | Number of rows |
| `columns` | `number` | `4` | Number of columns |
| `showHeader` | `boolean` | `true` | Show table header |
| `variant` | `SkeletonVariant` | `"pulse"` | Animation variant |
| `speed` | `SkeletonSpeed` | `"normal"` | Animation speed |
| `noAnimation` | `boolean` | `false` | Disable animation |

### SkeletonForm Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fields` | `number` | `4` | Number of form fields |
| `showButton` | `boolean` | `true` | Show submit button |
| `variant` | `SkeletonVariant` | `"pulse"` | Animation variant |
| `speed` | `SkeletonSpeed` | `"normal"` | Animation speed |
| `noAnimation` | `boolean` | `false` | Disable animation |

### SkeletonText Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | `number` | `3` | Number of text lines |
| `lastLineWidth` | `number` | `60` | Last line width (%) |
| `variant` | `SkeletonVariant` | `"pulse"` | Animation variant |
| `speed` | `SkeletonSpeed` | `"normal"` | Animation speed |
| `noAnimation` | `boolean` | `false` | Disable animation |

---

## 💡 Best Practices

### ✅ DO

- **Match skeleton dimensions** to actual content for seamless transitions
- **Use consistent animations** across your entire application
- **Provide reduced motion** alternatives for accessibility
- **Keep animations subtle** and professional
- **Show skeletons immediately** when data loading starts
- **Use preset components** for common patterns to save time
- **Match the layout** of your actual content

### ❌ DON'T

- **Don't mix too many variants** in the same view
- **Don't make animations too fast** or distracting (< 0.5s)
- **Don't show skeletons** for more than 3-4 seconds
- **Don't forget accessibility** (screen readers, reduced motion)
- **Don't use spinners and skeletons** together in the same view
- **Don't show skeletons** for content that loads instantly
- **Don't approximate dimensions** - measure actual content

---

## ♿ Accessibility

### Screen Reader Support

The component includes proper ARIA attributes:

```tsx
<Skeleton aria-busy="true" aria-live="polite" role="status">
  <span className="sr-only">Loading...</span>
</Skeleton>
```

### Reduced Motion

Respect user preferences for reduced motion:

```tsx
// Disable animation based on user preference
<Skeleton variant="default" noAnimation />

// Or use CSS
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
  }
}
```

### Keyboard Navigation

Skeleton loaders are non-interactive and don't affect keyboard navigation.

---

## 🎯 Performance Tips

1. **Use `count` prop** instead of mapping for multiple skeletons
2. **Memoize skeleton components** in frequently re-rendering parents
3. **Use CSS animations** instead of JavaScript (already done)
4. **Avoid too many skeletons** on one screen (keep under 20-30)
5. **Consider lazy loading** for off-screen skeletons

---

## 🔧 Customization

### Custom Animation

Create your own animation variant by extending the styles:

```tsx
// In your Tailwind config
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'my-custom-shimmer': {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) rotate(45deg)' },
        },
      },
    },
  },
};
```

### Custom Colors

Override skeleton colors with CSS variables or classes:

```tsx
<Skeleton
  className="[&]:bg-blue-200/50 dark:[&]:bg-blue-800/20"
  variant="pulse"
/>
```

---

## 📝 License

Part of the Saha-ui component library. MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on our GitHub repository.