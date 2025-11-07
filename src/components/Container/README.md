# Container

A responsive container component that constrains content width and provides consistent spacing across your application. Supports various max-width sizes, padding options, and horizontal gutters.

## Installation

```tsx
import { Container } from '@saha-ui/components';
```

## Usage

### Basic Container

```tsx
<Container>
  <h1>Page Title</h1>
  <p>Your content here</p>
</Container>
```

### Size Variants

The Container component supports multiple max-width sizes:

```tsx
{/* Extra small - max-w-3xl (768px) */}
<Container size="xs">
  Extra small container for narrow content
</Container>

{/* Small - max-w-4xl (896px) */}
<Container size="sm">
  Small container for focused content
</Container>

{/* Medium - max-w-5xl (1024px) */}
<Container size="md">
  Medium container for articles
</Container>

{/* Large - max-w-7xl (1280px) - Default */}
<Container size="lg">
  Large container for general content
</Container>

{/* Extra large - max-w-[1400px] */}
<Container size="xl">
  Extra large container for wide layouts
</Container>

{/* 2X large - max-w-[1600px] */}
<Container size="2xl">
  Very wide container for dashboards
</Container>

{/* Full width - max-w-full */}
<Container size="full">
  Full width container
</Container>
```

### Padding Variants

Control vertical padding (top and bottom):

```tsx
{/* No vertical padding */}
<Container padding="none">
  No padding container
</Container>

{/* Small padding - py-4 sm:py-6 */}
<Container padding="sm">
  Small vertical padding
</Container>

{/* Default padding - py-6 sm:py-8 md:py-10 */}
<Container padding="default">
  Default vertical padding
</Container>

{/* Large padding - py-8 sm:py-12 md:py-16 */}
<Container padding="lg">
  Large vertical padding
</Container>
```

### Gutter (Horizontal Padding)

Control horizontal padding:

```tsx
{/* With gutter (default) - px-4 sm:px-6 lg:px-8 */}
<Container gutter={true}>
  Content with horizontal padding
</Container>

{/* Without gutter - full bleed */}
<Container gutter={false}>
  <FullWidthImage />
</Container>
```

### Centering

Control horizontal alignment:

```tsx
{/* Centered (default) */}
<Container center={true}>
  Centered in parent
</Container>

{/* Left-aligned */}
<Container center={false}>
  Left-aligned content
</Container>
```

### AsChild Pattern

Render as a different HTML element while maintaining Container styles:

```tsx
{/* Render as main element */}
<Container asChild>
  <main>
    Main content area
  </main>
</Container>

{/* Render as section */}
<Container asChild size="md">
  <section>
    Section content
  </section>
</Container>

{/* Render as article */}
<Container asChild padding="lg">
  <article>
    Article content
  </article>
</Container>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `ContainerSize` | `"lg"` | Maximum width variant (xs, sm, md, lg, xl, 2xl, full) |
| `padding` | `ContainerPadding` | `"default"` | Vertical padding variant (none, sm, default, lg) |
| `center` | `boolean` | `true` | Center the container horizontally |
| `gutter` | `boolean` | `true` | Add responsive horizontal padding |
| `asChild` | `boolean` | `false` | Render as child element using Slot pattern |
| `children` | `ReactNode` | - | Content to render inside the container |
| `className` | `string` | - | Additional CSS classes |
| `role` | `string` | - | ARIA role for semantic meaning |
| `aria-label` | `string` | - | Accessible label for screen readers |
| `aria-labelledby` | `string` | - | ID of element that labels this container |
| `aria-describedby` | `string` | - | ID of element that describes this container |

### Type Definitions

```typescript
type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
type ContainerPadding = "none" | "sm" | "default" | "lg";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  padding?: ContainerPadding;
  center?: boolean;
  gutter?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}
```

## Accessibility

The Container component supports semantic HTML and ARIA attributes:

- ✅ Can be rendered as semantic elements (main, section, article, etc.)
- ✅ Supports ARIA roles for proper document structure
- ✅ Supports aria-label for descriptive labeling
- ✅ Supports aria-labelledby and aria-describedby
- ✅ Proper landmark regions when used with semantic elements

### Accessibility Examples

#### Main Content Area

```tsx
<Container asChild>
  <main role="main" aria-label="Main content">
    <h1>Page Title</h1>
    <p>Page content</p>
  </main>
</Container>
```

#### Sectioned Content

```tsx
<h2 id="features-heading">Features</h2>
<Container
  role="region"
  aria-labelledby="features-heading"
  size="md"
>
  <FeaturesList />
</Container>
```

#### Complementary Sidebar

```tsx
<Container asChild>
  <aside role="complementary" aria-label="Sidebar navigation">
    <Navigation />
  </aside>
</Container>
```

## Features

### Responsive Design
- Automatically adapts padding to screen size
- Responsive gutter padding (px-4 on mobile, px-8 on desktop)
- Responsive vertical padding
- Mobile-first approach

### Flexible Sizing
- 7 predefined max-width sizes
- From narrow (xs) to full-width
- Optimized for different content types

### Composition
- Works seamlessly with asChild pattern
- Can be nested for complex layouts
- Compatible with all Saha UI components

## Dark Mode

Container automatically works with dark mode. The component uses transparent backgrounds by default, allowing parent styles to shine through.

```tsx
<div className="bg-white dark:bg-gray-900">
  <Container>
    Content adapts to parent background
  </Container>
</div>
```

## Common Patterns

### Page Layout

```tsx
function Page() {
  return (
    <>
      {/* Header */}
      <Container asChild size="full" padding="sm">
        <header>
          <Navigation />
        </header>
      </Container>

      {/* Main Content */}
      <Container asChild>
        <main>
          <h1>Page Title</h1>
          <p>Content</p>
        </main>
      </Container>

      {/* Footer */}
      <Container asChild size="full" padding="lg">
        <footer>
          <FooterContent />
        </footer>
      </Container>
    </>
  );
}
```

### Hero Section

```tsx
{/* Full-width hero with no gutter */}
<Container size="full" padding="none" gutter={false}>
  <div className="bg-gradient-to-r from-blue-500 to-purple-600">
    <Container padding="lg">
      <h1>Hero Title</h1>
      <p>Hero subtitle</p>
    </Container>
  </div>
</Container>
```

### Article Layout

```tsx
<Container asChild size="md">
  <article>
    <header>
      <h1>Article Title</h1>
      <p className="text-muted">Published on Jan 1, 2024</p>
    </header>
    <div className="prose dark:prose-invert">
      <p>Article content with optimal reading width</p>
    </div>
  </article>
</Container>
```

### Dashboard Layout

```tsx
{/* Wide container for dashboard */}
<Container size="2xl">
  <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="4">
    <DashboardCard />
    <DashboardCard />
    <DashboardCard />
  </Grid>
</Container>
```

### Nested Containers

```tsx
{/* Outer container with gutter */}
<Container size="full" padding="lg">
  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg">
    {/* Inner container without gutter */}
    <Container size="lg" gutter={false}>
      <h2>Nested Content</h2>
      <p>Content inside a card</p>
    </Container>
  </div>
</Container>
```

## Styling

### Custom Styling

Add custom styles with the className prop:

```tsx
<Container className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
  Custom styled container
</Container>
```

### Override Max Width

```tsx
<Container size="lg" className="max-w-6xl">
  Custom max-width override
</Container>
```

### Custom Padding

```tsx
<Container padding="none" className="py-12">
  Custom vertical padding
</Container>
```

## Best Practices

1. **Use Semantic HTML**: Combine with `asChild` for proper HTML semantics
   ```tsx
   <Container asChild>
     <main>Main content</main>
   </Container>
   ```

2. **Choose Appropriate Sizes**:
   - Use `xs` or `sm` for focused content (forms, cards)
   - Use `md` for articles and reading content
   - Use `lg` (default) for general pages
   - Use `xl` or `2xl` for dashboards and wide layouts
   - Use `full` for heroes and full-width sections

3. **Consistent Spacing**: Use consistent padding variants across your app

4. **Accessibility**: Add ARIA labels for regions
   ```tsx
   <Container role="region" aria-label="Featured products">
     <ProductGrid />
   </Container>
   ```

5. **Responsive Considerations**: Trust the built-in responsive padding

6. **Nesting**: Avoid unnecessary nesting - one Container per section usually suffices

## Related Components

- [Stack](../Stack/README.md) - For vertical/horizontal layouts within containers
- [Grid](../Grid/README.md) - For grid layouts within containers
- [Section](../Section/README.md) - For semantic section elements

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Performance

The Container component is highly optimized:
- Zero runtime dependencies beyond React
- CSS-only styling with Tailwind
- No JavaScript calculations
- Minimal re-renders
- Tree-shakeable exports

## TypeScript

Full TypeScript support with exported types:

```typescript
import type {
  ContainerProps,
  ContainerSize,
  ContainerPadding
} from '@saha-ui';

const customContainer: ContainerProps = {
  size: 'md',
  padding: 'lg',
  center: true,
};
```

## Examples

### Blog Post Layout

```tsx
<Container size="md" padding="lg">
  <article>
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-2">Blog Post Title</h1>
      <time className="text-muted">January 1, 2024</time>
    </header>
    <div className="prose dark:prose-invert max-w-none">
      <p>Blog post content with optimal reading width...</p>
    </div>
  </article>
</Container>
```

### Landing Page Hero

```tsx
<>
  {/* Full-width hero background */}
  <div className="bg-gradient-to-br from-primary to-accent">
    {/* Constrained content */}
    <Container padding="lg">
      <Stack gap="6" align="center" className="text-center text-white">
        <h1 className="text-5xl font-bold">Welcome</h1>
        <p className="text-xl">Subheading text</p>
        <Button size="lg">Get Started</Button>
      </Stack>
    </Container>
  </div>

  {/* Regular content */}
  <Container>
    <h2>Features</h2>
    <Grid cols={3}>
      <FeatureCard />
      <FeatureCard />
      <FeatureCard />
    </Grid>
  </Container>
</>
```

### Form Container

```tsx
<Container size="sm" padding="lg">
  <Card>
    <CardHeader>
      <CardTitle>Sign In</CardTitle>
    </CardHeader>
    <CardContent>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>Email</Label>
          <Input type="email" />
        </Field>
        <Button type="submit" fullWidth>
          Sign In
        </Button>
      </Form>
    </CardContent>
  </Card>
</Container>
```

## Migration Guide

### From Other Libraries

```tsx
// From Bootstrap
<div className="container">Content</div>
// To Saha UI
<Container>Content</Container>

// From Tailwind (manual)
<div className="max-w-7xl mx-auto px-4 py-8">Content</div>
// To Saha UI
<Container size="lg" padding="default">Content</Container>

// From Material-UI
<MuiContainer maxWidth="lg">Content</MuiContainer>
// To Saha UI
<Container size="lg">Content</Container>
```

## Troubleshooting

### Container not centering

**Issue:** Container is not centered on the page

**Solution:** Ensure `center` prop is `true` (default) and parent has width constraints

```tsx
<Container center={true}>Content</Container>
```

### Content touching edges on mobile

**Issue:** Content touches screen edges on small screens

**Solution:** Ensure `gutter` is `true` (default)

```tsx
<Container gutter={true}>Content</Container>
```

### Too much vertical space

**Issue:** Too much padding above/below content

**Solution:** Use smaller padding variant or `padding="none"`

```tsx
<Container padding="sm">Content</Container>
```

### Custom max-width not working

**Issue:** Custom max-width class is ignored

**Solution:** Use `!important` or more specific selector

```tsx
<Container className="!max-w-6xl">Content</Container>
```

---

**Version**: 1.16.0
**Last Updated**: 2024
**Component Type**: Layout
**Status**: ✅ Production Ready
