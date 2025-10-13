# Advanced Radio Component Features

## Overview

The Radio component has been significantly enhanced with advanced features including card layouts, icons, badges, images, and more. The component size increased from 6.68 kB to 11.25 kB (2.67 kB gzipped).

## New Features

### 1. **Card Style Radio Buttons**

- Modern card-based layout for radio options
- Perfect for pricing plans, payment methods, and feature selections
- Grid-based responsive layout (1 column on mobile, 2 on tablet, 3 on desktop)
- Smooth hover effects with scale animations
- Visual feedback with border highlighting and shadows

```tsx
<RadioGroup name="pricing" card>
  <Radio
    value="pro"
    label="Professional"
    description="For growing businesses"
    icon={<Rocket className="w-6 h-6" />}
    badge="Popular"
    recommended
  />
</RadioGroup>
```

### 2. **Icon Support**

- Add icons to radio options for better visual communication
- Icons work in both standard and card layouts
- Animated icon containers with hover effects
- Customizable icon size based on radio size

```tsx
<Radio
  value="cloud"
  label="Cloud Storage"
  icon={<Cloud className="w-5 h-5" />}
/>
```

### 3. **Badge System**

- Add badges like "Popular", "New", "Recommended"
- Support for both text and React node badges
- Different styling for standard vs card layouts
- Custom badge content support

```tsx
<Radio value="premium" label="Premium Plan" badge="Hot 🔥" />
```

### 4. **Recommended Flag**

- Special "⭐ Recommended" badge with gradient styling
- Stands out with amber-to-orange gradient
- Automatically positioned in card layouts
- Perfect for highlighting preferred options

```tsx
<Radio value="pro" label="Pro Plan" recommended />
```

### 5. **Image Support**

- Display images in card-style radios
- Full-width image at top of card
- Zoom effect on hover
- Rounded corners matching card design

```tsx
<Radio value="plan-a" label="Plan A" image="/path/to/image.jpg" card />
```

### 6. **Enhanced RadioGroup Props**

- `card` - Enable card mode for all radios
- `hoverEffect` - Control hover animations
- Automatic grid layout for card mode
- Pass icon, badge, image to options array

```tsx
<RadioGroup
  name="payment"
  card
  hoverEffect={true}
  options={[
    {
      value: "credit",
      label: "Credit Card",
      icon: <Shield />,
      badge: "Secure",
      recommended: true,
    },
  ]}
/>
```

### 7. **Advanced Visual Effects**

- Pulse animation on checked card borders
- Scale transformations on hover/active states
- Color-matched shadows for each variant
- Gradient badges for recommended options
- Smooth transitions for all state changes

### 8. **Enhanced RadioOption Interface**

Now supports:

- `icon?: React.ReactNode` - Icon element
- `badge?: string | React.ReactNode` - Badge content
- `image?: string` - Image URL
- `recommended?: boolean` - Show recommended badge

## Component Structure

### Radio Component Props (RadioCardProps)

```typescript
interface RadioCardProps extends RadioProps {
  card?: boolean; // Enable card style
  icon?: React.ReactNode; // Display icon
  badge?: string | React.ReactNode; // Badge content
  image?: string; // Image URL
  recommended?: boolean; // Show recommended badge
  hoverEffect?: boolean; // Enable hover animations
}
```

### RadioGroup Component Props

```typescript
interface RadioGroupProps {
  // ... existing props
  card?: boolean; // Card mode for all radios
  hoverEffect?: boolean; // Control hover effects
}
```

## Usage Examples

### Basic Card Radio

```tsx
<RadioGroup name="plan" card label="Choose Your Plan">
  <Radio value="free" label="Free" icon={<Package />} />
  <Radio value="pro" label="Pro" icon={<Rocket />} recommended />
</RadioGroup>
```

### With Options Array

```tsx
<RadioGroup
  name="payment"
  card
  options={[
    {
      value: "credit",
      label: "Credit Card",
      description: "Instant processing",
      icon: <Shield />,
      recommended: true,
    },
  ]}
/>
```

### Standard with Icons & Badges

```tsx
<RadioGroup name="server" variant="accent">
  <Radio
    value="us-east"
    label="US East"
    icon={<Database />}
    badge="Recommended"
  />
</RadioGroup>
```

### Horizontal Card Layout

```tsx
<RadioGroup name="theme" card direction="horizontal">
  <Radio value="blue" label="Ocean Blue" icon={<Palette />} />
  <Radio value="purple" label="Royal Purple" recommended />
</RadioGroup>
```

## Advanced Features

### 1. Card Mode Grid Layout

- Automatic responsive grid: 1 → 2 → 3 columns
- Configurable via `direction` prop
- Gap spacing maintained across all layouts

### 2. Multiple Badge Types

- Standard badges: Small rounded rectangles
- Recommended badges: Gradient with star emoji
- Custom badges: Support React nodes for full customization

### 3. Visual Hierarchy

- Cards with images show image first
- Icons below images for better composition
- Badges positioned consistently in top corners
- Radio button always in consistent position

### 4. State Management

- Works with both controlled and uncontrolled modes
- Context API for RadioGroup coordination
- Maintains all standard radio functionality

### 5. Accessibility

- All ARIA attributes preserved
- Keyboard navigation supported
- Focus visible states enhanced
- Disabled states properly styled

## Styling Capabilities

### Card Hover Effects

- Border color change to primary
- Shadow elevation increase
- Scale transformation (102%)
- Icon container scale (110%)
- Image zoom effect

### Checked State Indicators

- Border color change to primary
- Background tint with primary color
- Enhanced shadow with color matching
- Pulse animation on border
- Visual feedback instant

### Variant Support

All 7 variants work in card mode:

- `default` - Standard styling
- `primary` - Primary color (default)
- `secondary` - Secondary accent
- `accent` - Accent color
- `success` - Success green
- `warning` - Warning amber
- `error` - Error red

## Performance

- Bundle size: 11.25 kB (2.67 kB gzipped)
- Increase from base: +4.57 kB (+0.82 kB gzipped)
- No additional dependencies required
- CSS-in-JS with CVA for optimal tree-shaking

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Tested with React 18+
- Fully responsive design
- Touch-friendly on mobile devices

## Migration Guide

### From Basic to Advanced

**Before:**

```tsx
<Radio value="option1" label="Option 1" />
```

**After (with icon):**

```tsx
<Radio value="option1" label="Option 1" icon={<Star />} badge="New" />
```

**After (card mode):**

```tsx
<RadioGroup name="options" card>
  <Radio value="option1" label="Option 1" icon={<Star />} recommended />
</RadioGroup>
```

## Best Practices

1. **Use Card Mode for Important Decisions**

   - Pricing plans
   - Payment methods
   - Feature selections
   - Product variants

2. **Add Icons for Visual Clarity**

   - Helps users scan options quickly
   - Improves accessibility
   - Makes UI more engaging

3. **Use Recommended Badge Sparingly**

   - Only for truly recommended options
   - Don't overuse to maintain impact

4. **Combine with Descriptions**

   - Provide context for each option
   - Help users make informed decisions

5. **Consider Grid Layout**
   - Horizontal cards for 2-4 options
   - Vertical for 5+ options
   - Let responsive design handle the rest

## Examples Created

A comprehensive `RadioAdvancedExample.tsx` showcasing:

- Pricing plans with icons and recommendations
- Payment methods with badges
- Server location selection with descriptions
- Theme color selection in horizontal cards
- Feature tiers with variant styling
- Size variations (sm, md, lg)
- Mixed standard and card layouts
- All 7 color variants in card mode

## Future Enhancements

Potential additions:

- Image carousel in cards
- Video preview support
- Custom card templates
- Animation presets
- Tooltip integration
- Multi-select card mode
- Drag-to-reorder in groups

## Documentation

- Full TypeScript support with exported types
- Comprehensive JSDoc comments
- Example file with 10+ use cases
- README integration complete
- Storybook-ready structure

---

**Status**: ✅ Complete and Production Ready
**Build**: ✅ Successful (7.39s)
**Bundle**: 11.25 kB (2.67 kB gzipped)
**TypeScript**: ✅ No errors
**Examples**: ✅ Advanced showcase created
