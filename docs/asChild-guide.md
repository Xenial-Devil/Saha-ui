# asChild Quick Reference Guide

A practical guide for using the `asChild` prop in Saha UI components.

## Quick Start

The `asChild` prop allows you to replace a component's default element with your own, while keeping all the component's styles and behavior.

```tsx
// Instead of wrapping
<Link href="/home">
  <Button>Home</Button>
</Link>

// Use asChild
<Button asChild>
  <Link href="/home">Home</Link>
</Button>
```

## When to Use asChild

✅ **Use asChild when you want to:**
- Integrate with routing libraries (Next.js, React Router)
- Change the underlying HTML element
- Avoid unnecessary DOM nesting
- Maintain accessibility with custom elements
- Compose components together

❌ **Don't use asChild when:**
- The component doesn't support it
- You need multiple children (asChild expects a single child element)
- The default element already works for your use case

## Supported Components

### Interactive Components
- `Button`
- `Toggle`
- `FloatingActionButton`
- `AccordionTrigger`
- `NavigationMenuTrigger`

### Display Components
- `Badge`
- `Chip`
- `Kbd`
- `Link`

### Layout Components
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`
- `NavigationMenuList`
- `NavigationMenuContent`

### Specialized Components
- `AutocompleteDropdown`
- `AutocompleteOption`
- `SliderTrack`

## Common Patterns

### Next.js Integration

```tsx
import NextLink from 'next/link';
import { Button, Badge, Link } from 'saha-ui';

// Button as Next.js Link
<Button asChild variant="primary">
  <NextLink href="/dashboard">Dashboard</NextLink>
</Button>

// Badge as link
<Badge asChild variant="success">
  <NextLink href="/new">New Features</NextLink>
</Badge>

// Link component with Next.js
<Link asChild variant="primary">
  <NextLink href="/docs">Documentation</NextLink>
</Link>
```

### React Router Integration

```tsx
import { Link as RouterLink } from 'react-router-dom';
import { Button, Chip } from 'saha-ui';

// Button with React Router
<Button asChild>
  <RouterLink to="/profile">Profile</RouterLink>
</Button>

// Chip as route link
<Chip asChild color="primary">
  <RouterLink to="/category">Category</RouterLink>
</Chip>
```

### Custom Semantic HTML

```tsx
import { CardTitle, CardDescription } from 'saha-ui';

// Custom heading level
<CardTitle asChild>
  <h1>Main Page Title</h1>
</CardTitle>

// Paragraph with specific role
<CardDescription asChild>
  <p role="doc-subtitle">Supporting information</p>
</CardDescription>
```

### Accordion with Custom Triggers

```tsx
import { AccordionTrigger } from 'saha-ui';

<AccordionTrigger asChild>
  <button 
    className="custom-trigger"
    data-tracking="accordion-click"
  >
    Click to expand
  </button>
</AccordionTrigger>
```

### Toggle with Custom Elements

```tsx
import { Toggle } from 'saha-ui';

<Toggle asChild pressed={isActive}>
  <div 
    role="switch" 
    aria-checked={isActive}
    tabIndex={0}
  >
    {isActive ? 'On' : 'Off'}
  </div>
</Toggle>
```

## Advanced Usage

### Preserving Event Handlers

Both parent and child event handlers will be called:

```tsx
<Button 
  asChild 
  onClick={() => console.log('Button clicked')}
>
  <a 
    href="/link" 
    onClick={() => console.log('Link clicked')}
  >
    Both handlers fire
  </a>
</Button>
```

### Merging ClassNames

ClassNames from both parent and child are automatically merged:

```tsx
<Badge asChild className="custom-badge">
  <span className="custom-span">
    {/* Both classes applied */}
  </span>
</Badge>
```

### Forwarding Refs

Refs work correctly with asChild:

```tsx
const ref = useRef<HTMLAnchorElement>(null);

<Link asChild>
  <a ref={ref} href="/page">
    {/* ref is properly forwarded */}
  </a>
</Link>
```

### Conditional asChild

```tsx
const isExternal = url.startsWith('http');

<Button asChild={!isExternal}>
  {isExternal ? (
    <a href={url} target="_blank">External</a>
  ) : (
    <Link href={url}>Internal</Link>
  )}
</Button>
```

## Real-World Examples

### Navigation Menu

```tsx
import NextLink from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from 'saha-ui';

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <Button asChild variant="ghost">
        <NextLink href="/">Home</NextLink>
      </Button>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Button asChild variant="ghost">
        <NextLink href="/about">About</NextLink>
      </Button>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Tag Cloud

```tsx
import { Link } from 'react-router-dom';
import { Chip } from 'saha-ui';

const tags = ['React', 'TypeScript', 'Next.js'];

<div className="tag-cloud">
  {tags.map(tag => (
    <Chip key={tag} asChild color="primary" variant="outlined">
      <Link to={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
    </Chip>
  ))}
</div>
```

### Keyboard Shortcuts Display

```tsx
import { Kbd } from 'saha-ui';

<Kbd asChild>
  <kbd 
    aria-label="Command key"
    data-key="meta"
  >
    ⌘
  </kbd>
</Kbd>
```

### Card with Custom Headings

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'saha-ui';

<Card>
  <CardHeader>
    <CardTitle asChild>
      <h2 id="section-title">Section Title</h2>
    </CardTitle>
    <CardDescription asChild>
      <p aria-describedby="section-title">
        Description text
      </p>
    </CardDescription>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>
```

## TypeScript Support

All components with asChild have full TypeScript support:

```tsx
import { Button, Badge } from 'saha-ui';
import { ComponentPropsWithoutRef } from 'react';

// Type-safe usage
<Button asChild variant="primary">
  <a href="/link">Link</a>
</Button>

// Child props are properly typed
<Badge asChild>
  <button onClick={(e) => {
    // e is correctly typed as React.MouseEvent<HTMLButtonElement>
    console.log(e.currentTarget);
  }}>
    Click me
  </button>
</Badge>
```

## Common Mistakes

### ❌ Multiple Children

```tsx
// Wrong - asChild expects a single child
<Button asChild>
  <span>First</span>
  <span>Second</span>
</Button>
```

### ✅ Single Child

```tsx
// Correct
<Button asChild>
  <span>
    <span>First</span>
    <span>Second</span>
  </span>
</Button>
```

### ❌ Text Node as Child

```tsx
// Wrong - child must be a React element
<Button asChild>
  Just text
</Button>
```

### ✅ Element as Child

```tsx
// Correct
<Button asChild>
  <span>Just text</span>
</Button>
```

### ❌ Fragment as Child

```tsx
// Wrong - Fragment is not a valid element
<Button asChild>
  <>Content</>
</Button>
```

### ✅ Single Element

```tsx
// Correct
<Button asChild>
  <div>Content</div>
</Button>
```

## Performance Tips

1. **Use asChild sparingly**: Only use it when necessary
2. **Memoize child components**: Prevent unnecessary re-renders
3. **Avoid inline elements**: Define child components outside render

```tsx
// Less optimal
<Button asChild>
  <Link href="/page">Click</Link>
</Button>

// More optimal
const NavLink = <Link href="/page">Click</Link>;
<Button asChild>{NavLink}</Button>
```

## Accessibility Considerations

When using `asChild`, ensure:

1. **Proper ARIA attributes**: The child element should have appropriate ARIA attributes
2. **Keyboard navigation**: Interactive elements should be keyboard accessible
3. **Focus management**: Focus states should be properly handled
4. **Semantic HTML**: Use appropriate HTML elements for their purpose

```tsx
// Good accessibility
<Button asChild>
  <a 
    href="/page"
    aria-label="Navigate to page"
    role="link"
  >
    Go to page
  </a>
</Button>
```

## Troubleshooting

### Props Not Forwarding

**Problem**: Props from parent component not appearing on child
**Solution**: Ensure child is a valid React element, not a text node or fragment

### Styles Not Applying

**Problem**: Parent component styles not visible
**Solution**: Check that className merging is working (inspect DOM to verify classes)

### Ref Not Working

**Problem**: Ref is undefined
**Solution**: Ensure child component properly forwards refs using `React.forwardRef`

### Event Handlers Not Firing

**Problem**: Click or other events not triggering
**Solution**: Verify both parent and child handlers are defined correctly

## Best Practices

1. **Use for composition**: asChild is best for composing components, not for styling
2. **Keep it simple**: Don't over-nest asChild components
3. **Document usage**: Comment why asChild is necessary in complex cases
4. **Test thoroughly**: Ensure accessibility and functionality with different children
5. **Fallback gracefully**: Provide sensible defaults when asChild is not used

## More Information

- [Complete asChild Updates Documentation](../ASCHILD_UPDATES.md)
- [Slot Component Implementation](../src/lib/Slot.tsx)
- [Radix UI Composition Guide](https://www.radix-ui.com/docs/primitives/guides/composition)

---

**Note**: The `asChild` pattern is inspired by Radix UI and is implemented consistently across all supporting components in Saha UI.