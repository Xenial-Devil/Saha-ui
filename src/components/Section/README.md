# Section

A semantic section component with visual variants, padding options, and max-width constraints. Perfect for creating distinct page sections with consistent styling and spacing.

## Installation

```tsx
import { Section } from '@saha-ui/components';
```

## Usage

### Basic Section

```tsx
<Section>
  <h2>Section Title</h2>
  <p>Your content here</p>
</Section>
```

### Visual Variants

The Section component supports multiple visual styles:

```tsx
{/* Default - transparent background */}
<Section variant="default">
  <h2>Default Section</h2>
  <p>Transparent background</p>
</Section>

{/* Muted - subtle gray background */}
<Section variant="muted">
  <h2>Muted Section</h2>
  <p>Subtle background for visual separation</p>
</Section>

{/* Accent - branded accent color background */}
<Section variant="accent">
  <h2>Accent Section</h2>
  <p>Eye-catching accent background</p>
</Section>

{/* Gradient - gradient background */}
<Section variant="gradient">
  <h2>Gradient Section</h2>
  <p>Beautiful gradient background</p>
</Section>
```

### Padding Sizes

Control vertical spacing:

```tsx
{/* No padding */}
<Section padding="none">
  Full bleed content
</Section>

{/* Small padding - py-8 sm:py-12 */}
<Section padding="sm">
  Small vertical padding
</Section>

{/* Default padding - py-12 sm:py-16 */}
<Section padding="default">
  Default vertical padding
</Section>

{/* Large padding - py-16 sm:py-24 */}
<Section padding="lg">
  Large vertical padding
</Section>

{/* Extra large padding - py-24 sm:py-32 */}
<Section padding="xl">
  Extra large vertical padding
</Section>
```

### Max Width

Control the maximum width of content:

```tsx
<Section maxWidth="xs">Extra small width (max-w-3xl)</Section>
<Section maxWidth="sm">Small width (max-w-4xl)</Section>
<Section maxWidth="md">Medium width (max-w-5xl)</Section>
<Section maxWidth="lg">Large width (max-w-7xl) - Default</Section>
<Section maxWidth="xl">Extra large width (max-w-[1400px])</Section>
<Section maxWidth="2xl">2X large width (max-w-[1600px])</Section>
<Section maxWidth="full">Full width (no constraint)</Section>
```

### Full Height Section

Perfect for hero sections:

```tsx
<Section fullHeight variant="gradient">
  <Stack align="center" justify="center" className="h-full">
    <h1 className="text-5xl font-bold">Welcome</h1>
    <p className="text-xl">Beautiful hero section</p>
    <Button size="lg">Get Started</Button>
  </Stack>
</Section>
```

### Bordered Section

Add subtle borders:

```tsx
<Section bordered variant="muted">
  <h2>Bordered Section</h2>
  <p>Top and bottom borders for separation</p>
</Section>
```

### Gutter Control

Control horizontal padding:

```tsx
{/* With gutter (default) */}
<Section gutter={true}>
  Content with horizontal padding
</Section>

{/* Without gutter - full bleed */}
<Section gutter={false}>
  <FullWidthImage />
</Section>
```

### AsChild Pattern

Render as a different element:

```tsx
{/* Render as article */}
<Section asChild variant="default">
  <article>
    Article with section styles
  </article>
</Section>

{/* Render as div */}
<Section asChild variant="muted">
  <div role="region" aria-label="Features">
    Custom element with section styles
  </div>
</Section>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `SectionVariant` | `"default"` | Visual style variant (default, muted, accent, gradient) |
| `padding` | `SectionPadding` | `"default"` | Vertical padding size (none, sm, default, lg, xl) |
| `maxWidth` | `SectionMaxWidth` | `"lg"` | Maximum width of content (xs, sm, md, lg, xl, 2xl, full) |
| `center` | `boolean` | `true` | Center content horizontally |
| `bordered` | `boolean` | `false` | Add top and bottom borders |
| `fullHeight` | `boolean` | `false` | Make section fill viewport height |
| `gutter` | `boolean` | `true` | Add responsive horizontal padding |
| `asChild` | `boolean` | `false` | Render as child element using Slot pattern |
| `children` | `ReactNode` | - | Content to render inside the section |
| `className` | `string` | - | Additional CSS classes |
| `role` | `string` | - | ARIA role for semantic meaning |
| `aria-label` | `string` | - | Accessible label for screen readers |
| `aria-labelledby` | `string` | - | ID of element that labels this section |
| `aria-describedby` | `string` | - | ID of element that describes this section |

### Type Definitions

```typescript
type SectionVariant = "default" | "muted" | "accent" | "gradient";
type SectionPadding = "none" | "sm" | "default" | "lg" | "xl";
type SectionMaxWidth = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  padding?: SectionPadding;
  maxWidth?: SectionMaxWidth;
  center?: boolean;
  bordered?: boolean;
  fullHeight?: boolean;
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

The Section component supports semantic HTML and ARIA attributes:

- ✅ Renders as semantic `<section>` element by default
- ✅ Can be rendered as other elements using `asChild`
- ✅ Supports ARIA roles for proper document structure
- ✅ Supports aria-label for descriptive labeling
- ✅ Supports aria-labelledby and aria-describedby
- ✅ Creates proper landmark regions when used with appropriate ARIA

### Accessibility Examples

#### Landmark Region

```tsx
<Section role="region" aria-labelledby="features-heading">
  <h2 id="features-heading">Our Features</h2>
  <FeatureList />
</Section>
```

#### Main Content Section

```tsx
<Section role="main" aria-label="Main content">
  <article>
    <h1>Article Title</h1>
    <p>Article content</p>
  </article>
</Section>
```

#### Complementary Content

```tsx
<Section role="complementary" aria-label="Related articles">
  <h3>Related Content</h3>
  <RelatedArticles />
</Section>
```

#### Labeled Section

```tsx
<h2 id="testimonials-heading">Customer Testimonials</h2>
<Section 
  role="region" 
  aria-labelledby="testimonials-heading"
  variant="muted"
>
  <TestimonialList />
</Section>
```

## Features

### Visual Variants
- **Default**: Transparent background, inherits from parent
- **Muted**: Subtle gray background for visual separation
- **Accent**: Brand accent color background
- **Gradient**: Beautiful gradient background

### Flexible Layout
- Responsive padding that adapts to screen size
- Configurable max-width for content
- Optional horizontal gutters
- Full viewport height option
- Centered or left-aligned content

### Semantic HTML
- Uses `<section>` element by default
- Can be rendered as any element with `asChild`
- Proper landmark regions with ARIA

## Dark Mode

All section variants support dark mode automatically:

```tsx
<Section variant="default">
  {/* Adapts to dark mode */}
</Section>

<Section variant="muted">
  {/* Gray background in light, darker in dark mode */}
</Section>

<Section variant="accent">
  {/* Accent color adapts to theme */}
</Section>
```

## Common Patterns

### Landing Page Layout

```tsx
<>
  {/* Hero Section */}
  <Section variant="gradient" fullHeight padding="none">
    <Stack align="center" justify="center" className="h-full">
      <h1>Welcome to Our Product</h1>
      <p>Tagline goes here</p>
      <Button size="lg">Get Started</Button>
    </Stack>
  </Section>

  {/* Features Section */}
  <Section variant="default" padding="xl">
    <h2 className="text-center mb-12">Features</h2>
    <Grid cols={3} gap="lg">
      <FeatureCard />
      <FeatureCard />
      <FeatureCard />
    </Grid>
  </Section>

  {/* Testimonials Section */}
  <Section variant="muted" padding="xl">
    <h2 className="text-center mb-12">What Our Customers Say</h2>
    <TestimonialSlider />
  </Section>

  {/* CTA Section */}
  <Section variant="accent" padding="lg">
    <Stack align="center" gap="4">
      <h2>Ready to Get Started?</h2>
      <Button size="lg">Sign Up Now</Button>
    </Stack>
  </Section>
</>
```

### Blog Layout

```tsx
<>
  {/* Article Header */}
  <Section variant="default" maxWidth="md" padding="lg">
    <article>
      <header>
        <h1>Article Title</h1>
        <p className="text-muted">Published on Jan 1, 2024</p>
      </header>
    </article>
  </Section>

  {/* Article Content */}
  <Section variant="default" maxWidth="md" padding="xl">
    <div className="prose dark:prose-invert">
      <p>Article content with optimal reading width...</p>
    </div>
  </Section>

  {/* Related Articles */}
  <Section variant="muted" padding="xl">
    <h2>Related Articles</h2>
    <Grid cols={3} gap="md">
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </Grid>
  </Section>
</>
```

### Multi-Section Page

```tsx
<>
  {/* Header Section */}
  <Section variant="default" padding="sm" bordered>
    <Navigation />
  </Section>

  {/* Hero Section */}
  <Section variant="gradient" fullHeight>
    <HeroContent />
  </Section>

  {/* About Section */}
  <Section variant="default" padding="xl" maxWidth="lg">
    <h2>About Us</h2>
    <p>Company information...</p>
  </Section>

  {/* Services Section */}
  <Section variant="muted" padding="xl" maxWidth="xl">
    <h2>Our Services</h2>
    <Grid autoFit minColWidth="300px" gap="lg">
      <ServiceCard />
    </Grid>
  </Section>

  {/* Contact Section */}
  <Section variant="default" padding="xl" maxWidth="md">
    <h2>Get in Touch</h2>
    <ContactForm />
  </Section>

  {/* Footer Section */}
  <Section variant="accent" padding="lg" bordered>
    <Footer />
  </Section>
</>
```

### Full-Width Background with Constrained Content

```tsx
<Section variant="gradient" maxWidth="lg" padding="xl">
  {/* Full-width gradient background */}
  {/* Content constrained to max-w-7xl */}
  <h2>Full Width Background</h2>
  <p>But content is constrained</p>
</Section>
```

### Alternating Sections

```tsx
<>
  <Section variant="default" padding="xl">
    <h2>Section 1</h2>
    <Content />
  </Section>

  <Section variant="muted" padding="xl">
    <h2>Section 2</h2>
    <Content />
  </Section>

  <Section variant="default" padding="xl">
    <h2>Section 3</h2>
    <Content />
  </Section>

  <Section variant="muted" padding="xl">
    <h2>Section 4</h2>
    <Content />
  </Section>
</>
```

## Styling

### Custom Background

```tsx
<Section 
  variant="default" 
  className="bg-gradient-to-r from-blue-500 to-purple-600"
>
  Custom gradient background
</Section>
```

### Custom Padding

```tsx
<Section padding="none" className="py-20">
  Custom vertical padding
</Section>
```

### With Shadow

```tsx
<Section variant="muted" className="shadow-lg">
  Section with shadow
</Section>
```

## Best Practices

1. **Use Semantic Sections**: Always use Section for distinct page sections
   ```tsx
   <Section role="region" aria-label="Features">
     <FeatureList />
   </Section>
   ```

2. **Alternate Variants**: Use alternating variants to visually separate sections
   ```tsx
   <Section variant="default">...</Section>
   <Section variant="muted">...</Section>
   <Section variant="default">...</Section>
   ```

3. **Appropriate Padding**: Match padding to content importance
   - Hero sections: `padding="none"` or `padding="xl"`
   - Content sections: `padding="default"` or `padding="lg"`
   - Footer/header: `padding="sm"`

4. **Max Width for Readability**: Use appropriate max-width for content type
   - Articles/blog posts: `maxWidth="md"`
   - General content: `maxWidth="lg"`
   - Dashboards: `maxWidth="xl"` or `maxWidth="2xl"`
   - Full-width layouts: `maxWidth="full"`

5. **Full Height for Heroes**: Use `fullHeight` for landing page heroes
   ```tsx
   <Section fullHeight variant="gradient">
     <HeroContent />
   </Section>
   ```

6. **Accessibility Labels**: Add ARIA labels for important sections
   ```tsx
   <Section role="region" aria-labelledby="heading">
     <h2 id="heading">Section Title</h2>
   </Section>
   ```

## Related Components

- [Container](../Container/README.md) - For simpler content containers
- [Stack](../Stack/README.md) - For vertical/horizontal layouts
- [Grid](../Grid/README.md) - For grid layouts within sections

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Performance

The Section component is highly optimized:
- Zero runtime dependencies beyond React
- CSS-only styling with Tailwind
- No JavaScript calculations
- Minimal re-renders
- Tree-shakeable exports

## TypeScript

Full TypeScript support with exported types:

```typescript
import type { 
  SectionProps, 
  SectionVariant, 
  SectionPadding,
  SectionMaxWidth
} from '@saha-ui/components';

const customSection: SectionProps = {
  variant: 'muted',
  padding: 'lg',
  maxWidth: 'xl',
};
```

## Migration Guide

### From Plain HTML

```tsx
// Before
<section className="py-16 px-4 bg-gray-100 max-w-7xl mx-auto">
  Content
</section>

// After
<Section variant="muted" padding="lg" maxWidth="lg">
  Content
</Section>
```

### From Container

```tsx
// Before
<div className="bg-gray-50 py-12">
  <Container>
    Content
  </Container>
</div>

// After
<Section variant="muted" padding="default">
  Content
</Section>
```

## Troubleshooting

### Section not full width

**Issue:** Section background doesn't extend to edges

**Solution:** Ensure parent elements don't have width constraints

```tsx
{/* Parent with full width */}
<div className="w-full">
  <Section variant="muted">Full width section</Section>
</div>
```

### Content touching edges

**Issue:** Content touches screen edges on mobile

**Solution:** Ensure `gutter` is `true` (default)

```tsx
<Section gutter={true}>
  Content with padding
</Section>
```

### Not full height

**Issue:** `fullHeight` not working

**Solution:** Ensure parent container has height set

```tsx
<div className="h-screen">
  <Section fullHeight>
    Full height section
  </Section>
</div>
```

### Max width not applying

**Issue:** Content wider than expected

**Solution:** Check if child components have width overrides

```tsx
<Section maxWidth="md">
  <div className="w-full max-w-md mx-auto">
    {/* Properly constrained */}
  </div>
</Section>
```

---

**Version**: 1.16.0  
**Last Updated**: 2024  
**Component Type**: Layout  
**Status**: ✅ Production Ready