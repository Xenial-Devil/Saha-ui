# asChild Pattern Documentation

## Overview

The `asChild` pattern allows you to compose components by merging props to a child element instead of rendering the component's default element. This is inspired by [shadcn/ui](https://ui.shadcn.com/) and provides powerful composition capabilities.

## How It Works

When `asChild={true}`, the component:

1. **Does NOT render its default element** (e.g., `<button>`)
2. **Passes all props** (className, styles, handlers, etc.) to its child element
3. **Merges classNames** intelligently
4. **Preserves the child's original props** while adding the component's styling

## Button Component with asChild

### Basic Usage

```tsx
import { Button } from 'saha-ui';

// Normal Button (default behavior)
<Button variant="primary">Click me</Button>
// Renders: <button class="btn-primary">Click me</button>

// Button as Link (with asChild)
<Button variant="primary" asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>
// Renders: <a href="/dashboard" class="btn-primary">Go to Dashboard</a>
```

### Why Use asChild?

✅ **Semantic HTML**: Use the correct HTML element for accessibility

```tsx
// ❌ Bad: Button wrapping a link (invalid HTML)
<Button>
  <a href="/page">Link</a>
</Button>

// ✅ Good: Link styled as a button
<Button asChild>
  <a href="/page">Link</a>
</Button>
```

✅ **Framework Integration**: Works with Next.js Link, React Router, etc.

```tsx
import Link from "next/link";

<Button variant="accent" asChild>
  <Link href="/profile">View Profile</Link>
</Button>;
```

✅ **Custom Components**: Apply button styling to any component

```tsx
<Button variant="primary" size="lg" asChild>
  <MyCustomComponent />
</Button>
```

## Features When Using asChild

### ✅ Props Merging

All props are merged intelligently:

- **className**: Concatenated (both applied)
- **style**: Merged (object spread)
- **event handlers**: Both executed
- **ref**: Forwarded correctly

### ✅ Variant Styling Preserved

The component's variant styling is still applied:

```tsx
<Button variant="success" size="xl" asChild>
  <a href="/submit">Submit Form</a>
</Button>
// Link gets all the success variant styles + xl size
```

### ⚠️ Internal Effects Removed

When `asChild={true}`, internal effects (ripple, glow) are NOT rendered:

- ❌ No ripple effect container
- ❌ No glow effect spans
- ✅ Only the styling classes are applied

This is intentional to keep the DOM clean for your custom element.

## Real-World Examples

### Navigation Menu

```tsx
<nav>
  <Button variant="ghost" asChild>
    <a href="/">Home</a>
  </Button>
  <Button variant="ghost" asChild>
    <a href="/about">About</a>
  </Button>
  <Button variant="primary" asChild>
    <a href="/contact">Contact</a>
  </Button>
</nav>
```

### Next.js App Router

```tsx
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Button variant="outline" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button variant="primary" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
    </header>
  );
}
```

### React Router

```tsx
import { Link } from "react-router-dom";

<Button variant="accent" size="lg" asChild>
  <Link to="/dashboard">Dashboard</Link>
</Button>;
```

### Download Link

```tsx
<Button variant="success" asChild>
  <a href="/files/document.pdf" download>
    Download PDF
  </a>
</Button>
```

### External Link

```tsx
<Button variant="info" asChild>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    Visit Site
  </a>
</Button>
```

## Components with asChild Support

Currently implemented:

- ✅ **Button** - Compose with links, custom elements

Coming soon:

- Badge
- Card
- Chip
- Tag
- And more...

## Technical Details

### The Slot Component

Under the hood, `asChild` uses the `Slot` component:

```tsx
import { Slot } from "saha-ui";

// You can also use Slot directly if needed
<Slot className="my-styles">
  <YourComponent />
</Slot>;
```

The Slot component:

1. Takes exactly one child (throws error if multiple)
2. Merges all props to that child
3. Handles className and style merging
4. Forwards refs correctly

### Implementation Pattern

```tsx
const Button = ({ asChild, ...props }) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp {...props}>
      {asChild ? children : (
        // Internal structure (ripple, glow, etc.)
      )}
    </Comp>
  );
};
```

## TypeScript Support

Full type safety with IntelliSense:

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: React.ReactNode;
}
```

## Best Practices

### ✅ Do's

- Use `asChild` for semantic HTML (links as buttons)
- Use with routing libraries (Next.js Link, React Router)
- Combine with custom components that need button styling

### ❌ Don'ts

- Don't use `asChild` with multiple children (will throw error)
- Don't expect internal effects (ripple/glow) when using `asChild`
- Don't nest buttons inside buttons

## Migration Guide

If you currently have:

```tsx
// Old pattern
<a href="/page">
  <Button>Click me</Button>
</a>
```

Change to:

```tsx
// New pattern with asChild
<Button asChild>
  <a href="/page">Click me</a>
</Button>
```

## Questions?

**Q: Why can't I see the ripple effect with asChild?**  
A: The ripple and glow effects are intentionally removed when `asChild={true}` to keep the DOM clean for your custom element. Only styling classes are applied.

**Q: Can I use asChild with multiple children?**  
A: No, asChild requires exactly one child element to merge props into.

**Q: Does asChild work with event handlers?**  
A: Yes! Event handlers from both the Button and the child are merged and both will execute.

**Q: Can I use asChild with Fragment?**  
A: No, the child must be a valid React element, not a Fragment.

---

**Updated**: After implementing Button asChild support  
**Pattern**: Inspired by shadcn/ui composition pattern
