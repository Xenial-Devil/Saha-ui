# Link

A styled anchor element that provides various visual styles, external link handling, and comprehensive accessibility features.

## Features

- 🎨 **Multiple Variants** - 9 visual styles (default, primary, secondary, accent, muted, underline, ghost, button, glass)
- 📏 **Three Sizes** - Small, medium, and large sizing options
- 🔗 **External Link Detection** - Auto-detection with icon and security attributes
- ♿ **Accessible** - Full ARIA support and keyboard navigation
- 🎯 **Disabled State** - Proper disabled styling and accessibility
- 🎨 **Icon Support** - Add custom icons before link text
- 🌗 **Dark Mode** - Full dark mode support
- 🎭 **Animated Effects** - Smooth hover transitions, underlines, and scale effects
- 🔄 **Composable** - Works with Next.js Link, React Router, and other routing libraries

## Installation

```bash
import { Link } from '@saha-ui/components';
```

## Basic Usage

### Simple Link

```tsx
import { Link } from '@saha-ui/components';

function MyComponent() {
  return (
    <Link href="/about">About Us</Link>
  );
}
```

### External Link

Automatically adds security attributes and an external icon:

```tsx
<Link href="https://github.com/yourproject" external>
  View on GitHub
</Link>
```

### Link with Icon

```tsx
import { Home, Star, Download } from 'lucide-react';

<Link href="/" icon={<Home size={16} />}>
  Home
</Link>

<Link href="/featured" icon={<Star size={16} />}>
  Featured Content
</Link>

<Link href="/download" icon={<Download size={16} />}>
  Download
</Link>
```

## Variants

Link supports nine visual variants:

### Default

Standard link with underline on hover:

```tsx
<Link variant="default" href="/about">
  About Us
</Link>
```

### Primary

Bold link with animated gradient underline:

```tsx
<Link variant="primary" href="/docs">
  Read Documentation
</Link>
```

### Secondary

Secondary color with animated underline:

```tsx
<Link variant="secondary" href="/blog">
  Read Our Blog
</Link>
```

### Accent

Accent color with animated underline:

```tsx
<Link variant="accent" href="/features">
  Explore Features
</Link>
```

### Muted

Subtle muted text that becomes prominent on hover:

```tsx
<Link variant="muted" href="/privacy">
  Privacy Policy
</Link>
```

### Underline

Always underlined with smooth hover transition:

```tsx
<Link variant="underline" href="/terms">
  Terms of Service
</Link>
```

### Ghost

Subtle background on hover with rounded corners:

```tsx
<Link variant="ghost" href="/settings">
  Settings
</Link>
```

### Button

Full button styling with gradient and shadow:

```tsx
<Link variant="button" href="/get-started">
  Get Started
</Link>
```

### Glass

Glassmorphism effect with backdrop blur:

```tsx
<Link variant="glass" href="/premium">
  Upgrade to Premium
</Link>
```

## Sizes

Three size options are available:

```tsx
{/* Small */}
<Link size="sm" href="/footer-link">
  Small Link
</Link>

{/* Medium (default) */}
<Link size="md" href="/standard-link">
  Medium Link
</Link>

{/* Large */}
<Link size="lg" href="/hero-link">
  Large Link
</Link>
```

## States

### Disabled

```tsx
<Link href="/premium-feature" disabled>
  Premium Feature (Coming Soon)
</Link>
```

### With Animated Underline

```tsx
<Link href="/about" showUnderline>
  About Us
</Link>
```

## Common Patterns

### Navigation Links

```tsx
<nav>
  <Link href="/" icon={<Home size={16} />}>
    Home
  </Link>
  <Link href="/products">Products</Link>
  <Link href="/about">About</Link>
  <Link href="/contact">Contact</Link>
</nav>
```

### Call-to-Action Link

```tsx
<Link variant="button" size="lg" href="/signup">
  Start Free Trial
</Link>
```

### Footer Links

```tsx
<footer>
  <Link variant="muted" size="sm" href="/privacy">
    Privacy Policy
  </Link>
  <Link variant="muted" size="sm" href="/terms">
    Terms of Service
  </Link>
  <Link variant="muted" size="sm" href="/cookies">
    Cookie Policy
  </Link>
</footer>
```

### Social Media Links

```tsx
<Link 
  href="https://github.com/yourproject" 
  external 
  icon={<Github size={20} />}
  aria-label="View our GitHub repository"
>
  GitHub
</Link>

<Link 
  href="https://twitter.com/yourproject" 
  external 
  icon={<Twitter size={20} />}
  aria-label="Follow us on Twitter"
>
  Twitter
</Link>
```

### Documentation Navigation

```tsx
<Link variant="primary" href="/docs/getting-started">
  Getting Started
</Link>

<Link variant="primary" href="/docs/components">
  Components
</Link>

<Link variant="primary" href="/docs/api">
  API Reference
</Link>
```

### Inline Text Link

```tsx
<p>
  Read our{' '}
  <Link variant="underline" href="/docs">
    documentation
  </Link>
  {' '}to learn more about the features.
</p>
```

### Download Link

```tsx
<Link 
  variant="button" 
  href="/downloads/app.zip"
  icon={<Download size={16} />}
  download
>
  Download App
</Link>
```

### Card Action Link

```tsx
<Card>
  <CardHeader>
    <CardTitle>Feature Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Feature description goes here...</p>
  </CardContent>
  <CardFooter>
    <Link variant="primary" href="/features/details">
      Learn More →
    </Link>
  </CardFooter>
</Card>
```

### Sidebar Navigation

```tsx
<aside>
  <nav>
    <Link 
      href="/dashboard" 
      variant="ghost"
      aria-current="page"
    >
      Dashboard
    </Link>
    <Link href="/projects" variant="ghost">
      Projects
    </Link>
    <Link href="/settings" variant="ghost">
      Settings
    </Link>
  </nav>
</aside>
```

## Accessibility

### ARIA Labels

Provide descriptive labels for screen readers:

```tsx
<Link 
  href="/download" 
  icon={<Download />}
  aria-label="Download the application installer"
>
  Download
</Link>
```

### ARIA Current

Mark the current page in navigation:

```tsx
<nav>
  <Link href="/dashboard" aria-current="page">
    Dashboard
  </Link>
  <Link href="/settings">Settings</Link>
  <Link href="/help">Help</Link>
</nav>
```

### ARIA Labelledby

Reference an existing label:

```tsx
<h2 id="docs-heading">Documentation</h2>
<Link href="/docs" aria-labelledby="docs-heading">
  Read Now
</Link>
```

### ARIA Describedby

Provide additional context:

```tsx
<Link href="/beta" aria-describedby="beta-warning">
  Try Beta Version
</Link>
<span id="beta-warning" className="text-sm text-muted-foreground">
  Warning: May contain bugs
</span>
```

### Disabled Links

```tsx
<Link 
  href="/premium" 
  disabled 
  aria-label="Premium feature available soon"
>
  Premium Feature
</Link>
```

### Keyboard Navigation

Links support standard keyboard navigation:
- **Tab** - Focus the link
- **Shift+Tab** - Focus previous element
- **Enter** - Activate the link
- **Space** - Activate the link

### Screen Reader Announcements

Screen readers will announce:
- Link text or aria-label
- "Link" role
- "Opens in new window" for external links
- "Disabled" state when applicable
- Current page status via aria-current

## Advanced Usage

### With Next.js Link

Use the `asChild` prop for composition:

```tsx
import NextLink from 'next/link';
import { Link } from '@saha-ui/components';

<Link asChild variant="primary">
  <NextLink href="/products">Products</NextLink>
</Link>
```

### With React Router

```tsx
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@saha-ui/components';

<Link asChild variant="button">
  <RouterLink to="/dashboard">Dashboard</RouterLink>
</Link>
```

### Custom Click Handler

```tsx
<Link
  href="/products"
  onClick={(e) => {
    e.preventDefault();
    // Custom navigation logic
    console.log('Navigating to products...');
    router.push('/products');
  }}
>
  Products
</Link>
```

### Conditional External

```tsx
function DynamicLink({ url, children }) {
  const isExternal = url.startsWith('http');
  
  return (
    <Link href={url} external={isExternal}>
      {children}
    </Link>
  );
}
```

### Link with Tooltip

```tsx
<Tooltip content="Navigate to dashboard">
  <Link href="/dashboard" variant="ghost">
    Dashboard
  </Link>
</Tooltip>
```

### Responsive Link Styles

```tsx
<Link 
  href="/cta"
  variant="button"
  className="w-full md:w-auto"
>
  Call to Action
</Link>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'muted' \| 'underline' \| 'ghost' \| 'button' \| 'glass'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the link |
| `external` | `boolean` | `false` | Mark as external link (adds icon and security attributes) |
| `disabled` | `boolean` | `false` | Disable the link |
| `showUnderline` | `boolean` | `false` | Show animated underline on hover |
| `icon` | `ReactNode` | - | Custom icon before text |
| `href` | `string` | - | URL to navigate to |
| `target` | `string` | - | Where to open the link |
| `rel` | `string` | - | Relationship attribute (auto-set for external) |
| `asChild` | `boolean` | `false` | Merge props with child element |
| `aria-label` | `string` | - | Accessible label |
| `aria-labelledby` | `string` | - | ID of labeling element |
| `aria-describedby` | `string` | - | ID of describing element |
| `aria-current` | `'page' \| 'step' \| 'location' \| 'date' \| 'time' \| boolean` | - | Indicates current state |
| `onClick` | `(event) => void` | - | Click handler |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Link content |

### Extends

`Link` extends all standard HTML `<a>` anchor attributes.

## Best Practices

### ✅ Do

- Use descriptive link text that makes sense out of context
- Provide aria-label for links with non-descriptive text (e.g., "Read More")
- Use the appropriate variant for the context (button for CTAs, muted for footer)
- Mark external links with the `external` prop
- Use aria-current="page" to indicate the current page
- Ensure sufficient color contrast (all variants meet WCAG AA)
- Test keyboard navigation (Tab, Enter)
- Use meaningful icons that add context

### ❌ Don't

- Don't use generic text like "Click Here" or "Read More" without context
- Don't use links for actions that don't navigate (use Button instead)
- Don't forget to set external=true for external URLs
- Don't remove focus outlines (they're essential for accessibility)
- Don't use disabled links for actions (use Button with loading state)
- Don't nest interactive elements inside links
- Don't use links with onClick that prevent default without providing alternative navigation

## Security

### External Links

When `external` is true or `target="_blank"`:
- Automatically sets `rel="noopener noreferrer"`
- Prevents the new page from accessing `window.opener`
- Prevents passing referrer information

```tsx
{/* Secure external link */}
<Link href="https://untrusted.com" external>
  External Site
</Link>

{/* Equivalent to: */}
<a 
  href="https://untrusted.com" 
  target="_blank" 
  rel="noopener noreferrer"
>
  External Site
</a>
```

### Custom rel Attributes

```tsx
{/* Don't pass referrer and don't follow (for SEO) */}
<Link 
  href="https://example.com" 
  target="_blank"
  rel="nofollow noopener noreferrer"
>
  Sponsored Link
</Link>
```

## Styling

### Custom Styles

Override styles with className:

```tsx
<Link 
  href="/custom" 
  variant="primary"
  className="font-bold text-2xl"
>
  Custom Styled Link
</Link>
```

### Tailwind Customization

```tsx
<Link
  href="/gradient"
  className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
>
  Gradient Text Link
</Link>
```

### Responsive Variants

```tsx
<Link
  href="/responsive"
  className="text-sm md:text-base lg:text-lg"
>
  Responsive Link
</Link>
```

## Performance

Link is lightweight and optimized:

- **Renders**: Single anchor element (or child via asChild)
- **Re-renders**: Only on prop changes
- **Bundle size**: ~2KB minified + gzipped
- **No runtime calculations**: Pure CSS styling
- **Icons**: Only rendered when needed

## Browser Support

Works in all modern browsers:

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- **Button** - For actions that don't navigate
- **Breadcrumb** - For hierarchical navigation
- **Tabs** - For same-level navigation
- **Menu** - For dropdown navigation

## Examples

See the [Link examples](../../examples/LinkExample.tsx) for more usage patterns.

## Changelog

### v1.16.0
- Enhanced TypeScript types with comprehensive JSDoc
- Improved ARIA support (aria-label, aria-labelledby, aria-describedby, aria-current)
- Added role="link" for disabled links to maintain semantics
- Better accessibility with aria-hidden on decorative elements
- Enhanced security for external links
- Improved documentation with usage patterns
- Added asChild prop for composition with routing libraries

---

**Need help?** Check the [component documentation](../README.md) or open an issue.