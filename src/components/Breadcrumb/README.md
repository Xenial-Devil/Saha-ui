# Breadcrumb

A navigation component that shows users their current location within a site hierarchy and provides links to navigate back through parent pages.

## Features

- 🎨 **Multiple Variants** - 6 visual styles (default, ghost, bordered, pills, underline, glass)
- 📏 **Three Sizes** - Small, medium, and large sizing options
- 🔗 **Flexible Separators** - Chevron, slash, dot, arrow, or custom separators
- ♿ **Accessible** - Full WAI-ARIA Breadcrumb pattern support
- 🎯 **Current Page Indicator** - Automatic styling and ARIA attributes
- 🎨 **Icon Support** - Add icons to breadcrumb items
- 🌗 **Dark Mode** - Full dark mode support
- 🎭 **Animated Effects** - Smooth hover transitions and effects

## Installation

```bash
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '@saha-ui/components';
```

## Basic Usage

### Simple Breadcrumb

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from '@saha-ui/components';

function MyPage() {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem isCurrentPage>Product Details</BreadcrumbItem>
    </Breadcrumb>
  );
}
```

### With Icons

```tsx
import { Home, Folder, File } from 'lucide-react';

<Breadcrumb>
  <BreadcrumbItem href="/" icon={<Home size={16} />}>
    Home
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem href="/documents" icon={<Folder size={16} />}>
    Documents
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrentPage icon={<File size={16} />}>
    Report.pdf
  </BreadcrumbItem>
</Breadcrumb>
```

## Variants

### Default
```tsx
<Breadcrumb variant="default">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrentPage>Current</BreadcrumbItem>
</Breadcrumb>
```

### Pills
```tsx
<Breadcrumb variant="pills">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrentPage>Current</BreadcrumbItem>
</Breadcrumb>
```

### Glass
```tsx
<Breadcrumb variant="glass">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrentPage>Current</BreadcrumbItem>
</Breadcrumb>
```

## API Reference

### Breadcrumb Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'ghost' \| 'bordered' \| 'pills' \| 'underline' \| 'glass'` | `'default'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `separator` | `'chevron' \| 'slash' \| 'dot' \| 'arrow'` | `'chevron'` | Separator type |
| `aria-label` | `string` | `'Breadcrumb'` | Accessible label |

### BreadcrumbItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | URL to navigate to |
| `icon` | `ReactNode` | - | Icon before text |
| `isCurrentPage` | `boolean` | `false` | Mark as current page |
| `aria-label` | `string` | - | Accessible label |

## Accessibility

- Implements WAI-ARIA Breadcrumb pattern
- `aria-current="page"` on current item
- Semantic `<ol>` and `<li>` structure
- Separators hidden from screen readers

## Changelog

### v1.16.0
- Enhanced TypeScript types with comprehensive JSDoc
- Improved ARIA support and semantic HTML
- Enhanced documentation

---

**Need help?** Check the [component documentation](../README.md).
