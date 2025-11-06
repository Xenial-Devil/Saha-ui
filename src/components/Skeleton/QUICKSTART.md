# Skeleton Component - Quick Start Guide

Get started with skeleton loaders in under 5 minutes! 🚀

## Installation

```bash
npm install saha-ui
```

## Basic Usage

### 1. Simple Skeleton

```tsx
import { Skeleton } from "saha-ui";

function LoadingComponent() {
  return <Skeleton width="100%" height="20px" />;
}
```

### 2. Multiple Lines

```tsx
import { Skeleton } from "saha-ui";

function LoadingText() {
  return <Skeleton count={5} />;
}
```

### 3. Avatar Skeleton

```tsx
import { Skeleton } from "saha-ui";

function LoadingAvatar() {
  return (
    <Skeleton 
      variant="shimmer" 
      shape="circle" 
      width="64px" 
      height="64px" 
    />
  );
}
```

## Using Presets (Recommended! ⭐)

Presets are pre-built skeleton components for common UI patterns. They're the fastest way to add loading states.

### Card Skeleton

```tsx
import { SkeletonCard } from "saha-ui";

function LoadingCard() {
  return <SkeletonCard />;
}
```

### Avatar with Text

```tsx
import { SkeletonAvatar } from "saha-ui";

function LoadingProfile() {
  return <SkeletonAvatar size="lg" showText lines={2} />;
}
```

### List Skeleton

```tsx
import { SkeletonList } from "saha-ui";

function LoadingList() {
  return <SkeletonList items={5} />;
}
```

### Table Skeleton

```tsx
import { SkeletonTable } from "saha-ui";

function LoadingTable() {
  return <SkeletonTable rows={10} columns={5} />;
}
```

### Form Skeleton

```tsx
import { SkeletonForm } from "saha-ui";

function LoadingForm() {
  return <SkeletonForm fields={6} />;
}
```

## Real-World Example

Here's a complete example with actual data loading:

```tsx
import { useState, useEffect } from "react";
import { SkeletonCard } from "saha-ui";

function ProductCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct().then((data) => {
      setProduct(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <SkeletonCard variant="wave" imageHeight="200px" />;
  }

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
}
```

## Animation Variants Cheat Sheet

```tsx
// Subtle and calm
<Skeleton variant="pulse" />

// Modern and smooth
<Skeleton variant="wave" />

// Energetic and fast
<Skeleton variant="shimmer" />

// Elegant glass effect
<Skeleton variant="glass" />

// Attention-grabbing
<Skeleton variant="glow" />
```

## Common Patterns

### Profile Header

```tsx
import { SkeletonAvatar, SkeletonText } from "saha-ui";

function LoadingProfile() {
  return (
    <div className="flex gap-4">
      <SkeletonAvatar size="xl" />
      <div className="flex-1">
        <Skeleton width="200px" height="32px" className="mb-2" />
        <SkeletonText lines={2} />
      </div>
    </div>
  );
}
```

### Blog Post

```tsx
import { SkeletonCard } from "saha-ui";

function LoadingBlogPost() {
  return (
    <SkeletonCard 
      variant="wave" 
      imageHeight="300px" 
      lines={8} 
      showActions={false} 
    />
  );
}
```

### Data Table

```tsx
import { SkeletonTable } from "saha-ui";

function LoadingDataTable() {
  return <SkeletonTable rows={15} columns={6} variant="pulse" />;
}
```

### Comment Section

```tsx
import { SkeletonList } from "saha-ui";

function LoadingComments() {
  return (
    <SkeletonList 
      items={8} 
      avatarSize="sm" 
      lines={3} 
      variant="shimmer" 
    />
  );
}
```

## Pro Tips 💡

1. **Match the Layout**: Make sure your skeleton matches the actual content layout
2. **Use Presets**: Save time by using preset components for common patterns
3. **Consistent Variants**: Stick to one or two variants throughout your app
4. **Respect Motion Preferences**: Use `noAnimation` for accessibility
5. **Don't Overdo It**: Show skeletons for 1-3 seconds max

## Speed Control

```tsx
// Slow and subtle (3s)
<Skeleton speed="slow" />

// Normal speed (1.5s) - default
<Skeleton speed="normal" />

// Fast and energetic (1s)
<Skeleton speed="fast" />

// Very responsive (0.6s)
<Skeleton speed="ultra-fast" />
```

## Accessibility

```tsx
// Disable animation for users who prefer reduced motion
<Skeleton noAnimation />

// Or use CSS media query
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
  }
}
```

## Next Steps

- 📖 Read the [full documentation](./README.md)
- 🎨 Explore all [animation variants](#animation-variants-cheat-sheet)
- 🧩 Try different [preset components](#using-presets-recommended)
- 🎯 Check out [real-world examples](./README.md#real-world-examples)

## Need Help?

- Check the [API Reference](./README.md#api-reference)
- See [Best Practices](./README.md#best-practices)
- Review [Common Patterns](#common-patterns)

Happy coding! ✨