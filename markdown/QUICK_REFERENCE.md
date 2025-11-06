# Quick Reference - Layout Components

## Container

Responsive max-width wrapper with consistent padding.

```tsx
import { Container } from 'saha-ui';

<Container size="lg" padding="default">
  <YourContent />
</Container>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'` | Max width |
| `padding` | `'none' \| 'sm' \| 'default' \| 'lg'` | `'default'` | Vertical padding |
| `center` | `boolean` | `true` | Center horizontally |
| `gutter` | `boolean` | `true` | Horizontal padding |
| `asChild` | `boolean` | `false` | Composition |

### Sizes
- `xs`: 768px - Narrow content
- `sm`: 896px - Focused content
- `md`: 1024px - Balanced
- `lg`: 1280px - Standard (default)
- `xl`: 1400px - Wide
- `2xl`: 1600px - Ultra-wide
- `full`: No max-width

---

## Stack

Flexible vertical/horizontal layouts with spacing.

```tsx
import { Stack } from 'saha-ui';

// Vertical (default)
<Stack spacing="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Stack>

// Horizontal
<Stack direction="horizontal" spacing="md" align="center">
  <Button>Cancel</Button>
  <Button variant="primary">Submit</Button>
</Stack>

// Responsive (vertical on mobile, horizontal on desktop)
<Stack responsive spacing="md">
  <div>Sidebar</div>
  <div>Content</div>
</Stack>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Stack direction |
| `spacing` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Gap between items |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'stretch'` | Cross-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` | Main-axis justification |
| `wrap` | `boolean` | `false` | Allow wrapping |
| `responsive` | `boolean` | `false` | Auto responsive direction |
| `divide` | `boolean` | `false` | Add dividers |
| `asChild` | `boolean` | `false` | Composition |

---

## Grid

Powerful 12-column responsive grid system.

```tsx
import { Grid, GridItem } from 'saha-ui';

// Auto-fit (best for simple responsive grids)
<Grid autoFit minColWidth="300px" gap="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Responsive breakpoints
<Grid 
  cols={1} 
  responsive={{ sm: 2, md: 3, lg: 4 }}
  gap="md"
>
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</Grid>

// With spans (12-column system)
<Grid cols={12} gap="lg">
  <GridItem colSpan={12}>
    <Header />
  </GridItem>
  <GridItem colSpan={12} responsive={{ md: 3 }}>
    <Sidebar />
  </GridItem>
  <GridItem colSpan={12} responsive={{ md: 9 }}>
    <MainContent />
  </GridItem>
</Grid>
```

### Grid Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `1-12` | `12` | Number of columns |
| `responsive` | `{ sm?, md?, lg?, xl? }` | - | Responsive columns |
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Gap between items |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'stretch'` | Vertical alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` | Horizontal justification |
| `autoFit` | `boolean` | `false` | Auto-fit columns |
| `minColWidth` | `string` | `'250px'` | Min width for auto-fit |
| `asChild` | `boolean` | `false` | Composition |

### GridItem Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colSpan` | `1-12 \| 'full'` | `1` | Columns to span |
| `rowSpan` | `1-6 \| 'full'` | `1` | Rows to span |
| `responsive` | `{ sm?, md?, lg?, xl? }` | - | Responsive spans |
| `asChild` | `boolean` | `false` | Composition |

---

## Section

Semantic section component with built-in styling.

```tsx
import { Section, Container } from 'saha-ui';

// Hero section
<Section variant="gradient" fullHeight padding="xl">
  <Container size="md">
    <h1>Welcome</h1>
    <Button>Get Started</Button>
  </Container>
</Section>

// Content section
<Section variant="muted" padding="lg">
  <Container>
    <Grid cols={3} gap="lg">
      <Card>Feature 1</Card>
      <Card>Feature 2</Card>
      <Card>Feature 3</Card>
    </Grid>
  </Container>
</Section>

// CTA section
<Section variant="accent" padding="xl" bordered>
  <Container size="md">
    <h2>Ready to start?</h2>
    <Button variant="primary">Sign Up</Button>
  </Container>
</Section>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'muted' \| 'accent' \| 'gradient'` | `'default'` | Visual style |
| `padding` | `'none' \| 'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Vertical padding |
| `maxWidth` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'` | Max content width |
| `center` | `boolean` | `true` | Center content |
| `bordered` | `boolean` | `false` | Top/bottom borders |
| `fullHeight` | `boolean` | `false` | Full viewport height |
| `gutter` | `boolean` | `true` | Horizontal padding |
| `asChild` | `boolean` | `false` | Composition |

### Variants
- `default`: Standard background
- `muted`: Subtle background for differentiation
- `accent`: Emphasized with accent color
- `gradient`: Beautiful gradient for heroes/CTAs

---

## Common Patterns

### Landing Page
```tsx
<Section variant="gradient" fullHeight>
  <Container>
    <Stack spacing="xl" align="center">
      <h1>Hero Title</h1>
      <Stack direction="horizontal" spacing="md">
        <Button variant="primary">CTA</Button>
        <Button variant="outline">Learn More</Button>
      </Stack>
    </Stack>
  </Container>
</Section>

<Section variant="muted" padding="xl">
  <Container>
    <Grid autoFit minColWidth="300px" gap="lg">
      <Card>Feature 1</Card>
      <Card>Feature 2</Card>
      <Card>Feature 3</Card>
    </Grid>
  </Container>
</Section>
```

### Dashboard
```tsx
<Container size="full" padding="lg">
  <Grid cols={12} gap="lg">
    <GridItem colSpan={12}>
      <Card>Header</Card>
    </GridItem>
    <GridItem colSpan={12} responsive={{ md: 3 }}>
      <Card>Sidebar</Card>
    </GridItem>
    <GridItem colSpan={12} responsive={{ md: 9 }}>
      <Stack spacing="lg">
        <Grid cols={2} responsive={{ lg: 4 }} gap="md">
          <Card>Stat 1</Card>
          <Card>Stat 2</Card>
          <Card>Stat 3</Card>
          <Card>Stat 4</Card>
        </Grid>
        <Card>Main Chart</Card>
      </Stack>
    </GridItem>
  </Grid>
</Container>
```

### Form Layout
```tsx
<Container size="md">
  <Card>
    <CardContent>
      <Stack spacing="lg">
        <Input label="Name" />
        <Input label="Email" />
        <TextArea label="Message" />
        <Stack direction="horizontal" justify="between">
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
</Container>
```

---

## Responsive Breakpoints

| Breakpoint | Min Width | Typical Use |
|------------|-----------|-------------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Ultra-wide |

---

## Tips

### 1. Use Auto-Fit for Simple Grids
```tsx
// Instead of:
<Grid cols={1} responsive={{ sm: 2, md: 3, lg: 4 }}>

// Use:
<Grid autoFit minColWidth="250px">
```

### 2. Combine Container with Section
```tsx
// Always wrap content in Container inside Section
<Section variant="muted">
  <Container size="lg">
    <YourContent />
  </Container>
</Section>
```

### 3. Use Responsive Stack for Toolbars
```tsx
// Auto-switches to horizontal on desktop
<Stack responsive spacing="md">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
</Stack>
```

### 4. Leverage asChild for Semantic HTML
```tsx
<Section asChild>
  <article>
    <Container asChild>
      <main>
        <YourContent />
      </main>
    </Container>
  </article>
</Section>
```

---

## Full Documentation

- [Complete Layout Guide](docs/RESPONSIVE_LAYOUT_GUIDE.md)
- [UI Modernization](UI_MODERNIZATION_COMPLETE.md)
- [Examples](src/examples/)