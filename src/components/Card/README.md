# Card

A versatile and flexible container component for grouping related content. Features multiple variants, customizable padding, and composable subcomponents for building rich card layouts.

## Features

- 🎨 Multiple visual variants (default, glass, bordered)
- 📦 Composable subcomponents (Header, Title, Description, Content, Footer)
- 🎯 Flexible padding and border radius options
- ✨ Optional hover effects
- ♿ Fully accessible
- 🎭 Support for `asChild` pattern
- 📱 Responsive design

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@saha-ui/core';

function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content goes here.</p>
      </CardContent>
      <CardFooter>
        <button>Action</button>
      </CardFooter>
    </Card>
  );
}
```

## Variants

### Default

Standard card with solid background:

```tsx
<Card variant="default">
  <CardContent>Default card variant</CardContent>
</Card>
```

### Glass

Modern glassmorphism effect:

```tsx
<Card variant="glass">
  <CardContent>Glass effect card</CardContent>
</Card>
```

### Glass Strong

Enhanced glass effect with more blur:

```tsx
<Card variant="glass-strong">
  <CardContent>Strong glass effect</CardContent>
</Card>
```

### Glass Subtle

Subtle glass effect with minimal blur:

```tsx
<Card variant="glass-subtle">
  <CardContent>Subtle glass effect</CardContent>
</Card>
```

### Bordered

Card with prominent border:

```tsx
<Card variant="bordered">
  <CardContent>Bordered card</CardContent>
</Card>
```

## Padding Options

Control internal spacing:

```tsx
{/* No padding */}
<Card padding="none">
  <CardContent>Content with no padding</CardContent>
</Card>

{/* Small padding */}
<Card padding="sm">
  <CardContent>Small padding</CardContent>
</Card>

{/* Medium padding (default) */}
<Card padding="md">
  <CardContent>Medium padding</CardContent>
</Card>

{/* Large padding */}
<Card padding="lg">
  <CardContent>Large padding</CardContent>
</Card>

{/* Extra large padding */}
<Card padding="xl">
  <CardContent>Extra large padding</CardContent>
</Card>
```

## Border Radius

Customize corner rounding:

```tsx
<Card rounded="sm">Small radius</Card>
<Card rounded="md">Medium radius</Card>
<Card rounded="lg">Large radius (default)</Card>
<Card rounded="xl">Extra large radius</Card>
<Card rounded="2xl">2X large radius</Card>
```

## Hoverable Cards

Add interactive hover effects:

```tsx
<Card hoverable>
  <CardContent>
    Hover over me for an effect
  </CardContent>
</Card>
```

## Complete Card Example

```tsx
<Card variant="glass" hoverable padding="lg">
  <CardHeader>
    <CardTitle>Product Launch</CardTitle>
    <CardDescription>
      Announcing our newest feature release
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>
      We're excited to introduce our latest innovation that will
      transform how you work with our platform.
    </p>
    <ul className="mt-4 space-y-2">
      <li>✨ Enhanced performance</li>
      <li>🎨 Beautiful new design</li>
      <li>🚀 Powerful new features</li>
    </ul>
  </CardContent>
  <CardFooter className="flex gap-2">
    <button className="btn-primary">Learn More</button>
    <button className="btn-secondary">Dismiss</button>
  </CardFooter>
</Card>
```

## Using asChild Pattern

Use `asChild` for custom composition:

```tsx
<CardHeader asChild>
  <div className="flex items-center justify-between">
    <div>
      <CardTitle>Custom Header</CardTitle>
    </div>
    <button>×</button>
  </div>
</CardHeader>
```

## API Reference

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'glass' \| 'glass-strong' \| 'glass-subtle' \| 'bordered'` | `'default'` | Visual style variant |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Internal padding size |
| `rounded` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'lg'` | Border radius size |
| `hoverable` | `boolean` | `false` | Enable hover effects |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Card content |

### CardHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Header content |
| `className` | `string` | - | Additional CSS classes |
| `asChild` | `boolean` | `false` | Merge props with child element |

### CardTitle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Title text |
| `className` | `string` | - | Additional CSS classes |
| `asChild` | `boolean` | `false` | Merge props with child element |

### CardDescription Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Description text |
| `className` | `string` | - | Additional CSS classes |
| `asChild` | `boolean` | `false` | Merge props with child element |

### CardContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Main content |
| `className` | `string` | - | Additional CSS classes |
| `asChild` | `boolean` | `false` | Merge props with child element |

### CardFooter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Footer content |
| `className` | `string` | - | Additional CSS classes |
| `asChild` | `boolean` | `false` | Merge props with child element |

## Common Patterns

### Profile Card

```tsx
<Card variant="glass" hoverable>
  <CardHeader>
    <div className="flex items-center gap-4">
      <Avatar src="/avatar.jpg" size="lg" />
      <div>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Software Engineer</CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <p className="text-sm">
      Passionate about building great user experiences and
      scalable applications.
    </p>
  </CardContent>
  <CardFooter>
    <button>View Profile</button>
  </CardFooter>
</Card>
```

### Product Card

```tsx
<Card hoverable padding="none">
  <img 
    src="/product.jpg" 
    alt="Product" 
    className="w-full h-48 object-cover rounded-t-lg"
  />
  <CardHeader>
    <CardTitle>Premium Headphones</CardTitle>
    <CardDescription>$299.99</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm">
      High-quality wireless headphones with noise cancellation.
    </p>
  </CardContent>
  <CardFooter>
    <button className="w-full">Add to Cart</button>
  </CardFooter>
</Card>
```

### Stats Card

```tsx
<Card variant="bordered">
  <CardContent className="text-center">
    <div className="text-4xl font-bold text-primary">1,234</div>
    <CardDescription className="mt-2">Total Users</CardDescription>
    <div className="mt-2 text-sm text-green-600">
      ↑ 12% from last month
    </div>
  </CardContent>
</Card>
```

### Notification Card

```tsx
<Card variant="glass-subtle">
  <CardHeader>
    <div className="flex items-start justify-between">
      <div>
        <CardTitle>New Message</CardTitle>
        <CardDescription>2 minutes ago</CardDescription>
      </div>
      <Badge variant="primary" dot>New</Badge>
    </div>
  </CardHeader>
  <CardContent>
    <p>You have a new message from Sarah.</p>
  </CardContent>
  <CardFooter className="flex gap-2">
    <button>Reply</button>
    <button>Mark as Read</button>
  </CardFooter>
</Card>
```

### Image Gallery Card

```tsx
<Card padding="none">
  <div className="grid grid-cols-2 gap-px bg-border">
    <img src="/img1.jpg" alt="Image 1" className="w-full h-32 object-cover" />
    <img src="/img2.jpg" alt="Image 2" className="w-full h-32 object-cover" />
    <img src="/img3.jpg" alt="Image 3" className="w-full h-32 object-cover" />
    <img src="/img4.jpg" alt="Image 4" className="w-full h-32 object-cover" />
  </div>
  <CardFooter>
    <button>View All Photos</button>
  </CardFooter>
</Card>
```

## Accessibility

The Card component follows accessibility best practices:

- **Semantic HTML:** Uses appropriate semantic elements
- **Keyboard Navigation:** All interactive elements are keyboard accessible
- **Screen Readers:** Proper heading hierarchy with CardTitle
- **Focus Management:** Clear focus indicators for interactive cards

## Best Practices

1. **Use Semantic Structure:** Include CardHeader, CardContent, and CardFooter for proper layout
2. **Consistent Padding:** Use the same padding across similar cards
3. **Clear Hierarchy:** Use CardTitle and CardDescription for content structure
4. **Hover Effects:** Enable `hoverable` only for clickable/interactive cards
5. **Responsive Design:** Test cards at different viewport sizes
6. **Variant Selection:** Choose variants that match your design system
7. **Content Length:** Keep card content concise and scannable

## Styling

### Custom Styles

```tsx
<Card 
  variant="glass" 
  className="shadow-2xl border-2 border-primary"
>
  <CardContent>Custom styled card</CardContent>
</Card>
```

### Tailwind Classes

```tsx
<Card className="max-w-md mx-auto my-8">
  <CardContent>Centered card with spacing</CardContent>
</Card>
```

## Related Components

- **Paper** - Simple surface component without subcomponents
- **Container** - Layout wrapper for content
- **Section** - Page section container

## Changelog

- **v1.0.0** - Initial release with all variants and subcomponents