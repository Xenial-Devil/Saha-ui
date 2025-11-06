# Responsive Layout Components Guide

Complete guide to using the modern responsive layout components in Saha UI.

## Overview

Saha UI provides a comprehensive set of responsive layout components to help you build modern, flexible layouts with ease. These components are built with:

- **Modern design patterns** - Glass morphism, gradients, shadows
- **Full TypeScript support** - Type-safe props and variants
- **Responsive by default** - Mobile-first approach
- **Composition ready** - Full `asChild` support
- **Performance optimized** - GPU-accelerated transforms

## Components

### Container

A responsive container component with configurable max-width and padding.

#### Features
- Multiple size presets (xs, sm, md, lg, xl, 2xl, full)
- Responsive padding and gutters
- Auto-centering
- `asChild` composition support

#### Usage

```tsx
import { Container } from 'saha-ui';

// Basic usage
<Container>
  <h1>Welcome</h1>
  <p>Content goes here</p>
</Container>

// Custom size
<Container size="xl">
  <div>Wide content area</div>
</Container>

// No padding
<Container padding="none" gutter={false}>
  <div>Edge-to-edge content</div>
</Container>

// With asChild
<Container asChild>
  <article>
    <h1>Article Content</h1>
  </article>
</Container>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'` | Maximum width of container |
| `padding` | `'none' \| 'sm' \| 'default' \| 'lg'` | `'default'` | Vertical padding |
| `center` | `boolean` | `true` | Center horizontally |
| `gutter` | `boolean` | `true` | Add horizontal padding |
| `asChild` | `boolean` | `false` | Render as child element |

---

### Stack

A flexible layout component for vertical or horizontal stacking with responsive options.

#### Features
- Vertical or horizontal layouts
- Configurable spacing
- Alignment and justification
- Responsive direction switching
- Optional dividers
- `asChild` composition support

#### Usage

```tsx
import { Stack } from 'saha-ui';

// Vertical stack (default)
<Stack spacing="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Stack>

// Horizontal stack
<Stack direction="horizontal" spacing="md" align="center">
  <Button>Cancel</Button>
  <Button variant="primary">Submit</Button>
</Stack>

// Responsive (vertical on mobile, horizontal on desktop)
<Stack responsive spacing="lg">
  <div>Sidebar</div>
  <div>Main Content</div>
</Stack>

// With dividers
<Stack divide spacing="md">
  <div>Section 1</div>
  <div>Section 2</div>
  <div>Section 3</div>
</Stack>

// Complex layout
<Stack 
  direction="horizontal" 
  spacing="xl" 
  align="start" 
  justify="between"
  wrap
>
  <Card>Feature 1</Card>
  <Card>Feature 2</Card>
  <Card>Feature 3</Card>
</Stack>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Stack direction |
| `spacing` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Space between items |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'stretch'` | Cross-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` | Main-axis justification |
| `wrap` | `boolean` | `false` | Allow items to wrap |
| `responsive` | `boolean` | `false` | Auto-switch to horizontal on desktop |
| `divide` | `boolean` | `false` | Add dividers between items |
| `asChild` | `boolean` | `false` | Render as child element |

---

### Grid

A powerful responsive grid system with auto-fit capabilities.

#### Features
- 12-column grid system
- Responsive breakpoint configuration
- Auto-fit for dynamic layouts
- Configurable gaps and alignment
- `asChild` composition support

#### Usage

```tsx
import { Grid, GridItem } from 'saha-ui';

// Basic grid
<Grid cols={3} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// Responsive grid
<Grid 
  cols={1} 
  responsive={{ 
    sm: 2, 
    md: 3, 
    lg: 4 
  }}
  gap="md"
>
  <Card>Product 1</Card>
  <Card>Product 2</Card>
  <Card>Product 3</Card>
  <Card>Product 4</Card>
</Grid>

// With GridItem spans
<Grid cols={12} gap="lg">
  <GridItem colSpan={12}>
    <Header />
  </GridItem>
  <GridItem colSpan={3}>
    <Sidebar />
  </GridItem>
  <GridItem colSpan={9}>
    <MainContent />
  </GridItem>
</Grid>

// Auto-fit grid (no breakpoints needed!)
<Grid autoFit minColWidth="300px" gap="lg">
  <Card>Auto 1</Card>
  <Card>Auto 2</Card>
  <Card>Auto 3</Card>
  <Card>Auto 4</Card>
</Grid>

// Responsive GridItem
<Grid cols={12}>
  <GridItem 
    colSpan={12} 
    responsive={{ 
      md: 6, 
      lg: 4 
    }}
  >
    <Card>Responsive card</Card>
  </GridItem>
</Grid>
```

#### Grid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `1-12` | `12` | Number of columns |
| `responsive` | `{ sm?, md?, lg?, xl? }` | - | Responsive column config |
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Gap between items |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'stretch'` | Vertical alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` | Horizontal justification |
| `autoFit` | `boolean` | `false` | Enable auto-fit layout |
| `minColWidth` | `string` | `'250px'` | Min column width for auto-fit |
| `asChild` | `boolean` | `false` | Render as child element |

#### GridItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colSpan` | `1-12 \| 'full'` | `1` | Number of columns to span |
| `rowSpan` | `1-6 \| 'full'` | `1` | Number of rows to span |
| `responsive` | `{ sm?, md?, lg?, xl? }` | - | Responsive span config |
| `asChild` | `boolean` | `false` | Render as child element |

---

### Section

A semantic section component with built-in styling variants and responsive padding.

#### Features
- Semantic HTML (`<section>`)
- Visual variants (default, muted, accent, gradient)
- Responsive padding presets
- Full-height sections
- Borders and backgrounds
- `asChild` composition support

#### Usage

```tsx
import { Section } from 'saha-ui';

// Basic section
<Section>
  <h2>Section Title</h2>
  <p>Section content</p>
</Section>

// Hero section (full height)
<Section fullHeight padding="xl" variant="gradient">
  <h1>Welcome to Our Site</h1>
  <p>Amazing tagline here</p>
  <Button>Get Started</Button>
</Section>

// Muted background section
<Section variant="muted" padding="lg">
  <h2>Features</h2>
  <Grid cols={3} gap="lg">
    <Card>Feature 1</Card>
    <Card>Feature 2</Card>
    <Card>Feature 3</Card>
  </Grid>
</Section>

// Bordered section
<Section variant="accent" bordered padding="lg">
  <Container size="md">
    <h2>Testimonials</h2>
    <Stack spacing="lg">
      <Card>Review 1</Card>
      <Card>Review 2</Card>
    </Stack>
  </Container>
</Section>

// No padding/gutter
<Section padding="none" gutter={false}>
  <Image src="hero.jpg" alt="Hero" />
</Section>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'muted' \| 'accent' \| 'gradient'` | `'default'` | Visual variant |
| `padding` | `'none' \| 'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Vertical padding |
| `maxWidth` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'` | Max content width |
| `center` | `boolean` | `true` | Center content |
| `bordered` | `boolean` | `false` | Add top/bottom borders |
| `fullHeight` | `boolean` | `false` | Full viewport height |
| `gutter` | `boolean` | `true` | Horizontal padding |
| `asChild` | `boolean` | `false` | Render as child element |

---

## Complete Examples

### Landing Page Layout

```tsx
import { Section, Container, Grid, Stack, Button, Card } from 'saha-ui';

function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <Section fullHeight variant="gradient" padding="xl">
        <Container size="lg">
          <Stack spacing="xl" align="center">
            <h1 className="text-6xl font-bold text-center">
              Build Amazing Apps
            </h1>
            <p className="text-xl text-center text-muted-foreground">
              The modern UI library for React
            </p>
            <Stack direction="horizontal" spacing="md">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </Stack>
          </Stack>
        </Container>
      </Section>

      {/* Features Section */}
      <Section variant="muted" padding="xl">
        <Container>
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <Grid 
            autoFit 
            minColWidth="300px" 
            gap="lg"
          >
            <Card hoverable>
              <h3>Fast</h3>
              <p>Optimized for performance</p>
            </Card>
            <Card hoverable>
              <h3>Accessible</h3>
              <p>Built with a11y in mind</p>
            </Card>
            <Card hoverable>
              <h3>Themeable</h3>
              <p>Customize to your brand</p>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" bordered>
        <Container size="md">
          <Stack spacing="lg" align="center">
            <h2 className="text-4xl font-bold">Ready to get started?</h2>
            <Button size="xl" variant="primary">
              Start Building
            </Button>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
```

### Dashboard Layout

```tsx
import { Grid, GridItem, Container, Stack, Card } from 'saha-ui';

function Dashboard() {
  return (
    <Container size="full" padding="lg">
      <Grid cols={12} gap="lg">
        {/* Header */}
        <GridItem colSpan={12}>
          <Card>
            <h1>Dashboard</h1>
          </Card>
        </GridItem>

        {/* Sidebar */}
        <GridItem 
          colSpan={12} 
          responsive={{ md: 3, lg: 2 }}
        >
          <Card>
            <Stack spacing="sm">
              <a href="#overview">Overview</a>
              <a href="#analytics">Analytics</a>
              <a href="#settings">Settings</a>
            </Stack>
          </Card>
        </GridItem>

        {/* Main Content */}
        <GridItem 
          colSpan={12} 
          responsive={{ md: 9, lg: 10 }}
        >
          <Stack spacing="lg">
            {/* Stats */}
            <Grid 
              cols={1} 
              responsive={{ sm: 2, lg: 4 }}
              gap="md"
            >
              <Card>Stat 1</Card>
              <Card>Stat 2</Card>
              <Card>Stat 3</Card>
              <Card>Stat 4</Card>
            </Grid>

            {/* Charts */}
            <Grid cols={1} responsive={{ lg: 2 }} gap="lg">
              <Card>Chart 1</Card>
              <Card>Chart 2</Card>
            </Grid>
          </Stack>
        </GridItem>
      </Grid>
    </Container>
  );
}
```

### Blog Post Layout

```tsx
import { Section, Container, Stack, Card, Grid } from 'saha-ui';

function BlogPost() {
  return (
    <>
      {/* Hero */}
      <Section variant="gradient" padding="xl">
        <Container size="md">
          <Stack spacing="md">
            <h1 className="text-5xl font-bold">Blog Post Title</h1>
            <p className="text-lg text-muted-foreground">
              Published on January 1, 2024
            </p>
          </Stack>
        </Container>
      </Section>

      {/* Content */}
      <Section padding="xl">
        <Container size="md">
          <Stack spacing="lg">
            <p>Blog post content goes here...</p>
            <p>More content...</p>
          </Stack>
        </Container>
      </Section>

      {/* Related Posts */}
      <Section variant="muted" padding="xl">
        <Container>
          <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
          <Grid 
            cols={1} 
            responsive={{ md: 2, lg: 3 }}
            gap="lg"
          >
            <Card hoverable>Post 1</Card>
            <Card hoverable>Post 2</Card>
            <Card hoverable>Post 3</Card>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
```

## Responsive Breakpoints

All components use the following breakpoints:

| Breakpoint | Min Width | Typical Use |
|------------|-----------|-------------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Extra large screens |

## Best Practices

### 1. Container Usage

Always wrap your content in a `Container` for consistent max-width and padding:

```tsx
<Section>
  <Container>
    <Grid cols={3}>
      {/* content */}
    </Grid>
  </Container>
</Section>
```

### 2. Mobile-First Approach

Start with mobile layout and add responsive props for larger screens:

```tsx
<Grid 
  cols={1}  // Mobile: 1 column
  responsive={{ 
    sm: 2,  // Tablet: 2 columns
    lg: 4   // Desktop: 4 columns
  }}
/>
```

### 3. Use Auto-Fit When Possible

For simple responsive grids, use `autoFit` instead of breakpoints:

```tsx
<Grid autoFit minColWidth="250px" gap="lg">
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</Grid>
```

### 4. Combine Components

Layer components for complex layouts:

```tsx
<Section variant="muted">
  <Container size="xl">
    <Stack spacing="xl">
      <h2>Section Title</h2>
      <Grid cols={3} gap="lg">
        <Card>Item 1</Card>
        <Card>Item 2</Card>
        <Card>Item 3</Card>
      </Grid>
    </Stack>
  </Container>
</Section>
```

### 5. Semantic HTML with asChild

Use `asChild` to maintain semantic HTML:

```tsx
<Section asChild>
  <article>
    <Container asChild>
      <div role="main">
        <Stack spacing="lg">
          {/* content */}
        </Stack>
      </div>
    </Container>
  </article>
</Section>
```

## Accessibility

All layout components support:

- Semantic HTML elements
- ARIA roles (via `asChild`)
- Keyboard navigation (when interactive)
- Screen reader compatibility
- Reduced motion support

## Performance

Layout components are optimized with:

- **GPU acceleration** - `transform-gpu` for smooth animations
- **Will-change** - Optimized for transforms
- **Efficient re-renders** - Memoized where appropriate
- **CSS Grid/Flexbox** - Native browser optimizations

## TypeScript Support

All components have full TypeScript support with:

- Type-safe props
- Variant types
- Autocompletion
- IntelliSense documentation

```typescript
import type { 
  ContainerProps, 
  StackProps, 
  GridProps,
  SectionProps 
} from 'saha-ui';

const props: GridProps = {
  cols: 3,
  gap: 'lg',
  responsive: {
    md: 6,
    lg: 12
  }
};
```

## Migration Guide

### From Custom Layouts

Replace custom layout divs with semantic components:

```tsx
// Before
<div className="max-w-7xl mx-auto px-4 py-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* content */}
  </div>
</div>

// After
<Container>
  <Grid cols={1} responsive={{ md: 3 }}>
    {/* content */}
  </Grid>
</Container>
```

### From Other UI Libraries

Most layout patterns translate directly:

```tsx
// Chakra UI
<Container maxW="lg">
  <VStack spacing={4}>
    {/* content */}
  </VStack>
</Container>

// Saha UI
<Container size="lg">
  <Stack spacing="md">
    {/* content */}
  </Stack>
</Container>
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 10+)

## Additional Resources

- [Component API Reference](./API.md)
- [Design Tokens](./TOKENS.md)
- [Theming Guide](./THEMING.md)
- [Examples](./EXAMPLES.md)