# Saha UI Examples

This directory contains comprehensive examples showcasing the modern, polished UI components and responsive layout system in Saha UI.

## Examples

### ModernUIShowcase.tsx

A complete showcase demonstrating all enhanced components and new layout utilities:

- **Hero Section**: Full-height gradient section with centered content
- **Button Showcase**: All button variants with GPU-accelerated animations
- **Card Showcase**: Multiple card variants with glassmorphism effects
- **Badge Showcase**: Enhanced badges with transform optimizations
- **Layout Components**: Container, Stack, Grid, and Section examples
- **Input Showcase**: Modern input variants with multi-layer effects
- **Feature Grid**: Auto-fit responsive grid layout
- **Call to Action**: Professional CTA section
- **Footer**: Responsive footer layout

## Running the Examples

### In Your Project

```tsx
import { ModernUIShowcase } from './examples/ModernUIShowcase';

function App() {
  return <ModernUIShowcase />;
}
```

### As Standalone

```bash
# If using Vite
npm run dev

# If using Next.js
npm run dev
```

## Features Demonstrated

### 1. Enhanced Components
- ✨ GPU-accelerated animations (60fps)
- 🎨 Multi-layer shadow systems
- 💎 Glassmorphism effects
- 🌈 Gradient overlays
- 🎯 Scale and lift animations
- ⚡ Transform-optimized performance

### 2. Responsive Layouts
- 📱 Mobile-first design
- 🖥️ Desktop-optimized layouts
- 🔄 Auto-fit grid capabilities
- 📐 12-column grid system
- 🧱 Flexible stacking
- 🎭 Semantic sections

### 3. Modern Design Patterns
- Glass morphism (subtle, medium, strong)
- Radial gradient highlights
- Border glow effects
- Micro-interactions
- Smooth transitions
- Depth perception through shadows

## Layout Components Used

### Container
```tsx
<Container size="lg" padding="xl">
  {/* Content with consistent max-width */}
</Container>
```

### Stack
```tsx
<Stack spacing="lg" responsive>
  {/* Vertical on mobile, horizontal on desktop */}
</Stack>
```

### Grid
```tsx
<Grid autoFit minColWidth="300px" gap="lg">
  {/* Automatically responsive grid */}
</Grid>
```

### Section
```tsx
<Section variant="gradient" fullHeight padding="xl">
  {/* Full-page section with gradient background */}
</Section>
```

## Component Variants

### Buttons
- `primary`, `secondary`, `accent`
- `success`, `warning`, `error`, `info`
- `outline`, `ghost`, `glass`

### Cards
- `default` - Standard card with backdrop blur
- `glass` - Medium glassmorphism
- `glass-strong` - Strong glassmorphism
- `glass-subtle` - Subtle glassmorphism
- `bordered` - Border-focused design

### Badges
- All color variants with gradient overlays
- `outline`, `ghost`, `glass` variants
- Size variants: `sm`, `md`, `lg`
- Shape variants: `rounded`, `pill`, `square`

## Best Practices Shown

1. **Composition**: Using layout components together
2. **Responsive Design**: Mobile-first with progressive enhancement
3. **Visual Hierarchy**: Using variants and sizes effectively
4. **Spacing**: Consistent spacing system throughout
5. **Semantic HTML**: Proper use of sections and containers
6. **Accessibility**: Keyboard navigation and ARIA support

## Performance Tips

The examples demonstrate:
- GPU-accelerated transforms with `transform-gpu`
- Efficient animations using CSS only
- Optimized re-renders through proper component structure
- Will-change hints for browser optimization
- Tree-shakeable imports for minimal bundle size

## Customization

All components shown can be customized:

```tsx
// Custom sizes
<Container size="xl">
  <Stack spacing="2xl">
    <Button size="xl">Large Button</Button>
  </Stack>
</Container>

// Custom variants
<Card variant="glass-strong" hoverable>
  <CardContent>Custom glass card</CardContent>
</Card>

// Responsive configuration
<Grid 
  cols={1} 
  responsive={{ sm: 2, md: 3, lg: 4, xl: 6 }}
  gap="lg"
>
  {items}
</Grid>
```

## TypeScript Support

All examples are fully typed:

```tsx
import type { 
  ButtonProps, 
  CardProps, 
  GridProps,
  ContainerProps 
} from 'saha-ui';

const gridConfig: GridProps = {
  cols: 12,
  gap: 'lg',
  responsive: { md: 6, lg: 4 }
};
```

## Browser Support

All effects demonstrated work in:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS 14+, Android 10+)

## Additional Resources

- [Responsive Layout Guide](../docs/RESPONSIVE_LAYOUT_GUIDE.md)
- [UI Modernization Complete](../UI_MODERNIZATION_COMPLETE.md)
- [Main Documentation](../README.md)

## Contributing

Feel free to add more examples! Follow these guidelines:
- Use TypeScript
- Include comments explaining key features
- Demonstrate responsive design
- Show component composition
- Include accessibility considerations

---

**Note**: These examples require Saha UI v1.13.3 or higher with all the modern enhancements.