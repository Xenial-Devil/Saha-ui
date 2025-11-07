# Grid

A flexible CSS Grid layout component with responsive columns, gap control, alignment, and auto-fit capabilities. Supports 1-12 column layouts with responsive breakpoints and auto-fit for fluid layouts.

## Installation

```tsx
import { Grid, GridItem } from '@saha-ui/components';
```

## Usage

### Basic Grid

```tsx
<Grid cols={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### Column Variants

The Grid component supports 1-12 columns:

```tsx
{/* 2 columns */}
<Grid cols={2}>
  <div>Item 1</div>
  <div>Item 2</div>
</Grid>

{/* 3 columns */}
<Grid cols={3}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

{/* 4 columns */}
<Grid cols={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>

{/* 12 columns (default) */}
<Grid cols={12}>
  <GridItem colSpan={6}>Half width</GridItem>
  <GridItem colSpan={6}>Half width</GridItem>
</Grid>
```

### Responsive Grid

Different column counts at different breakpoints:

```tsx
{/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
<Grid responsive={{ sm: 1, md: 2, lg: 4 }} gap="lg">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
  <Card>Card 4</Card>
</Grid>

{/* Mobile: 1, Tablet: 2, Desktop: 3, Wide: 4 */}
<Grid responsive={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
  <ProductCard />
  <ProductCard />
  <ProductCard />
  <ProductCard />
</Grid>
```

### Auto-Fit Grid

Automatically fits as many columns as possible based on minimum width:

```tsx
{/* Automatically creates columns with minimum 250px width */}
<Grid autoFit minColWidth="250px" gap="md">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
  <Card>Card 4</Card>
</Grid>

{/* Smaller minimum width for more columns */}
<Grid autoFit minColWidth="200px" gap="sm">
  <ImageCard />
  <ImageCard />
  <ImageCard />
</Grid>
```

### Gap Sizes

Control spacing between grid items:

```tsx
<Grid cols={3} gap="none">No gap</Grid>
<Grid cols={3} gap="xs">Extra small gap (0.25rem)</Grid>
<Grid cols={3} gap="sm">Small gap (0.5rem)</Grid>
<Grid cols={3} gap="md">Medium gap (1rem) - Default</Grid>
<Grid cols={3} gap="lg">Large gap (1.5rem)</Grid>
<Grid cols={3} gap="xl">Extra large gap (2rem)</Grid>
<Grid cols={3} gap="2xl">2X large gap (3rem)</Grid>
```

### Alignment

Align items vertically (cross-axis):

```tsx
<Grid cols={3} align="start">Top aligned</Grid>
<Grid cols={3} align="center">Center aligned</Grid>
<Grid cols={3} align="end">Bottom aligned</Grid>
<Grid cols={3} align="stretch">Stretched (default)</Grid>
<Grid cols={3} align="baseline">Baseline aligned</Grid>
```

### Justification

Justify content horizontally (main-axis):

```tsx
<Grid cols={3} justify="start">Start (default)</Grid>
<Grid cols={3} justify="center">Centered</Grid>
<Grid cols={3} justify="end">End</Grid>
<Grid cols={3} justify="between">Space between</Grid>
<Grid cols={3} justify="around">Space around</Grid>
<Grid cols={3} justify="evenly">Space evenly</Grid>
```

## GridItem Usage

### Column Spanning

```tsx
<Grid cols={12} gap="md">
  <GridItem colSpan={6}>Spans 6 columns (half)</GridItem>
  <GridItem colSpan={6}>Spans 6 columns (half)</GridItem>
  
  <GridItem colSpan={4}>Spans 4 columns (third)</GridItem>
  <GridItem colSpan={4}>Spans 4 columns (third)</GridItem>
  <GridItem colSpan={4}>Spans 4 columns (third)</GridItem>
  
  <GridItem colSpan={8}>Spans 8 columns</GridItem>
  <GridItem colSpan={4}>Spans 4 columns</GridItem>
  
  <GridItem colSpan="full">Spans full width</GridItem>
</Grid>
```

### Row Spanning

```tsx
<Grid cols={3} gap="md">
  <GridItem rowSpan={2}>
    Tall item (spans 2 rows)
  </GridItem>
  <GridItem>Regular item</GridItem>
  <GridItem>Regular item</GridItem>
  <GridItem>Regular item</GridItem>
  <GridItem>Regular item</GridItem>
</Grid>
```

### Responsive GridItem

```tsx
<Grid cols={12}>
  {/* Full width on mobile, half on tablet, third on desktop */}
  <GridItem responsive={{ sm: 12, md: 6, lg: 4 }}>
    <Card>Responsive Card</Card>
  </GridItem>
  
  {/* Full width mobile, 8 cols tablet, 6 cols desktop */}
  <GridItem responsive={{ sm: 'full', md: 8, lg: 6 }}>
    <Article>Main Content</Article>
  </GridItem>
</Grid>
```

### Complex Layouts

```tsx
<Grid cols={12} gap="lg">
  {/* Hero spanning full width */}
  <GridItem colSpan="full">
    <Hero />
  </GridItem>
  
  {/* Main content - 8 columns */}
  <GridItem colSpan={8} responsive={{ sm: 12, lg: 8 }}>
    <Article>Main article content</Article>
  </GridItem>
  
  {/* Sidebar - 4 columns */}
  <GridItem colSpan={4} responsive={{ sm: 12, lg: 4 }}>
    <Sidebar />
  </GridItem>
  
  {/* Footer spanning full width */}
  <GridItem colSpan="full">
    <Footer />
  </GridItem>
</Grid>
```

## Props

### Grid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `1-12` | `12` | Number of columns in the grid |
| `responsive` | `object` | - | Responsive column configuration (sm, md, lg, xl) |
| `gap` | `GridGap` | `"md"` | Gap between items (none, xs, sm, md, lg, xl, 2xl) |
| `align` | `GridAlign` | `"stretch"` | Vertical alignment (start, center, end, stretch, baseline) |
| `justify` | `GridJustify` | `"start"` | Horizontal justification (start, center, end, between, around, evenly) |
| `autoFit` | `boolean` | `false` | Enable auto-fit columns |
| `minColWidth` | `string` | `"250px"` | Minimum column width for auto-fit |
| `asChild` | `boolean` | `false` | Render as child element using Slot pattern |
| `children` | `ReactNode` | - | Content to render in the grid |
| `className` | `string` | - | Additional CSS classes |
| `role` | `string` | - | ARIA role for semantic meaning |
| `aria-label` | `string` | - | Accessible label for screen readers |
| `aria-labelledby` | `string` | - | ID of element that labels this grid |
| `aria-describedby` | `string` | - | ID of element that describes this grid |

### GridItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colSpan` | `1-12 \| "full"` | `1` | Number of columns to span |
| `rowSpan` | `1-6 \| "full"` | `1` | Number of rows to span |
| `responsive` | `object` | - | Responsive column span (sm, md, lg, xl) |
| `asChild` | `boolean` | `false` | Render as child element using Slot pattern |
| `children` | `ReactNode` | - | Content to render in the grid item |
| `className` | `string` | - | Additional CSS classes |
| `role` | `string` | - | ARIA role for the item |
| `aria-label` | `string` | - | Accessible label |
| `aria-labelledby` | `string` | - | ID of labeling element |
| `aria-describedby` | `string` | - | ID of describing element |

### Type Definitions

```typescript
type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type GridAlign = "start" | "center" | "end" | "stretch" | "baseline";
type GridJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
type GridItemColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
type GridItemRowSpan = 1 | 2 | 3 | 4 | 5 | 6 | "full";
```

## Accessibility

The Grid component supports semantic HTML and ARIA attributes:

- ✅ Can be rendered as semantic elements using `asChild`
- ✅ Supports ARIA roles (e.g., `role="list"` with `listitem` children)
- ✅ Supports aria-label for descriptive labeling
- ✅ Supports aria-labelledby and aria-describedby
- ✅ Proper landmark regions when used with semantic elements

### Accessibility Examples

#### List Grid

```tsx
<Grid role="list" cols={3} gap="md">
  <GridItem role="listitem" aria-label="Product 1">
    <ProductCard />
  </GridItem>
  <GridItem role="listitem" aria-label="Product 2">
    <ProductCard />
  </GridItem>
  <GridItem role="listitem" aria-label="Product 3">
    <ProductCard />
  </GridItem>
</Grid>
```

#### Labeled Grid

```tsx
<h2 id="gallery-heading">Photo Gallery</h2>
<Grid 
  role="region" 
  aria-labelledby="gallery-heading"
  cols={4} 
  gap="sm"
>
  <GridItem>
    <Image src="photo1.jpg" alt="Photo 1" />
  </GridItem>
  <GridItem>
    <Image src="photo2.jpg" alt="Photo 2" />
  </GridItem>
</Grid>
```

#### Semantic Grid

```tsx
<Grid asChild cols={3}>
  <section role="region" aria-label="Featured articles">
    <GridItem asChild>
      <article>Article 1</article>
    </GridItem>
    <GridItem asChild>
      <article>Article 2</article>
    </GridItem>
  </section>
</Grid>
```

## Features

### Responsive Design
- Responsive column configuration for sm, md, lg, xl breakpoints
- Mobile-first approach
- Fluid layouts with auto-fit

### Flexible Sizing
- 1-12 column layouts
- Custom column spanning with GridItem
- Row spanning for complex layouts
- Full-width spans

### Auto-Fit
- Automatically creates columns based on minimum width
- Perfect for responsive card grids
- No manual breakpoint configuration needed

## Dark Mode

Grid automatically works with dark mode. The component uses transparent backgrounds by default.

```tsx
<div className="bg-white dark:bg-gray-900">
  <Grid cols={3} gap="md">
    <Card>Card 1</Card>
    <Card>Card 2</Card>
    <Card>Card 3</Card>
  </Grid>
</div>
```

## Common Patterns

### Product Grid

```tsx
<Grid autoFit minColWidth="300px" gap="lg">
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</Grid>
```

### Dashboard Layout

```tsx
<Grid cols={12} gap="md">
  {/* Header */}
  <GridItem colSpan="full">
    <DashboardHeader />
  </GridItem>
  
  {/* Stats */}
  <GridItem colSpan={3}>
    <StatCard title="Users" value="1,234" />
  </GridItem>
  <GridItem colSpan={3}>
    <StatCard title="Revenue" value="$12.3k" />
  </GridItem>
  <GridItem colSpan={3}>
    <StatCard title="Orders" value="456" />
  </GridItem>
  <GridItem colSpan={3}>
    <StatCard title="Growth" value="+12%" />
  </GridItem>
  
  {/* Main content */}
  <GridItem colSpan={8}>
    <Chart />
  </GridItem>
  
  {/* Sidebar */}
  <GridItem colSpan={4}>
    <ActivityFeed />
  </GridItem>
</Grid>
```

### Blog Layout

```tsx
<Grid cols={12} gap="lg">
  {/* Featured post */}
  <GridItem colSpan={12}>
    <FeaturedPost />
  </GridItem>
  
  {/* Blog posts */}
  <GridItem colSpan={8} responsive={{ sm: 12, lg: 8 }}>
    <Stack gap="lg">
      <BlogPost />
      <BlogPost />
      <BlogPost />
    </Stack>
  </GridItem>
  
  {/* Sidebar */}
  <GridItem colSpan={4} responsive={{ sm: 12, lg: 4 }}>
    <Sidebar>
      <SearchBox />
      <Categories />
      <PopularPosts />
    </Sidebar>
  </GridItem>
</Grid>
```

### Masonry-Style Grid

```tsx
<Grid cols={3} gap="md">
  <GridItem rowSpan={2}>
    <Card className="h-full">Tall card</Card>
  </GridItem>
  <GridItem>
    <Card>Regular card</Card>
  </GridItem>
  <GridItem rowSpan={3}>
    <Card className="h-full">Very tall card</Card>
  </GridItem>
  <GridItem>
    <Card>Regular card</Card>
  </GridItem>
  <GridItem colSpan={2}>
    <Card>Wide card</Card>
  </GridItem>
</Grid>
```

### Image Gallery

```tsx
<Grid autoFit minColWidth="200px" gap="sm">
  {images.map((image) => (
    <AspectRatio key={image.id} ratio="1/1">
      <Image 
        src={image.url} 
        alt={image.alt}
        className="object-cover w-full h-full"
      />
    </AspectRatio>
  ))}
</Grid>
```

### Form Layout

```tsx
<Grid cols={12} gap="md">
  <GridItem colSpan={12}>
    <Input label="Full name" />
  </GridItem>
  
  <GridItem colSpan={6}>
    <Input label="Email" type="email" />
  </GridItem>
  
  <GridItem colSpan={6}>
    <Input label="Phone" type="tel" />
  </GridItem>
  
  <GridItem colSpan={4}>
    <Input label="City" />
  </GridItem>
  
  <GridItem colSpan={4}>
    <Select label="State" />
  </GridItem>
  
  <GridItem colSpan={4}>
    <Input label="ZIP" />
  </GridItem>
  
  <GridItem colSpan={12}>
    <TextArea label="Message" />
  </GridItem>
</Grid>
```

## Styling

### Custom Styling

```tsx
<Grid cols={3} className="bg-gray-50 p-4 rounded-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### Custom Gap

```tsx
<Grid cols={3} className="gap-x-4 gap-y-8">
  Different horizontal and vertical gaps
</Grid>
```

### GridItem Styling

```tsx
<Grid cols={3}>
  <GridItem className="bg-primary text-white p-4 rounded">
    Styled item
  </GridItem>
</Grid>
```

## Best Practices

1. **Use Auto-Fit for Responsive Grids**: When you want fluid, responsive grids without breakpoints
   ```tsx
   <Grid autoFit minColWidth="250px" gap="md">
     <Card />
     <Card />
   </Grid>
   ```

2. **Use Responsive Prop for Control**: When you need specific column counts at breakpoints
   ```tsx
   <Grid responsive={{ sm: 1, md: 2, lg: 4 }}>
     <Card />
   </Grid>
   ```

3. **Use GridItem for Complex Layouts**: When items need different sizes
   ```tsx
   <Grid cols={12}>
     <GridItem colSpan={8}>Main</GridItem>
     <GridItem colSpan={4}>Sidebar</GridItem>
   </Grid>
   ```

4. **Match Gap to Content**: 
   - Dense content: `gap="sm"` or `gap="md"`
   - Cards/images: `gap="lg"` or `gap="xl"`

5. **Accessibility**: Add ARIA roles when appropriate
   ```tsx
   <Grid role="list" cols={3}>
     <GridItem role="listitem">Item</GridItem>
   </Grid>
   ```

6. **Semantic HTML**: Use asChild for proper HTML structure
   ```tsx
   <Grid asChild>
     <section>Content</section>
   </Grid>
   ```

## Related Components

- [Container](../Container/README.md) - For constraining grid width
- [Stack](../Stack/README.md) - For single-column layouts
- [Section](../Section/README.md) - For semantic sections

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Performance

The Grid component is highly optimized:
- Zero runtime dependencies beyond React
- CSS Grid native performance
- No JavaScript calculations for layout
- Minimal re-renders
- Tree-shakeable exports

## TypeScript

Full TypeScript support with exported types:

```typescript
import type { 
  GridProps, 
  GridItemProps,
  GridGap,
  GridAlign,
  GridJustify,
  GridItemColSpan,
  GridItemRowSpan
} from '@saha-ui/components';
```

## Migration Guide

### From Tailwind (Manual)

```tsx
// Before
<div className="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// After
<Grid cols={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### From Material-UI

```tsx
// Before
<MuiGrid container spacing={2}>
  <MuiGrid item xs={12} md={6}>Item 1</MuiGrid>
  <MuiGrid item xs={12} md={6}>Item 2</MuiGrid>
</MuiGrid>

// After
<Grid cols={12} gap="md">
  <GridItem responsive={{ sm: 12, md: 6 }}>Item 1</GridItem>
  <GridItem responsive={{ sm: 12, md: 6 }}>Item 2</GridItem>
</Grid>
```

### From Bootstrap

```tsx
// Before
<div className="row">
  <div className="col-md-4">Item 1</div>
  <div className="col-md-4">Item 2</div>
  <div className="col-md-4">Item 3</div>
</div>

// After
<Grid cols={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

## Troubleshooting

### Items not arranging properly

**Issue:** Grid items not displaying in the expected layout

**Solution:** Check that you're using the correct `cols` prop or responsive configuration

```tsx
<Grid cols={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### GridItem not spanning correctly

**Issue:** GridItem colSpan or rowSpan not working

**Solution:** Ensure Grid has enough columns for the span

```tsx
<Grid cols={12}> {/* Need 12 columns for colSpan={6} to work */}
  <GridItem colSpan={6}>Half width</GridItem>
</Grid>
```

### Auto-fit not working

**Issue:** Auto-fit columns not responsive

**Solution:** Ensure minColWidth is appropriate for your content

```tsx
<Grid autoFit minColWidth="250px" gap="md">
  <Card />
</Grid>
```

### Gap not applying

**Issue:** Gap between items not visible

**Solution:** Verify gap prop value and check if custom styles override it

```tsx
<Grid cols={3} gap="lg"> {/* Use larger gap */}
  <div>Item</div>
</Grid>
```

---

**Version**: 1.16.0  
**Last Updated**: 2024  
**Component Type**: Layout  
**Status**: ✅ Production Ready