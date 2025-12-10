# Numeric Spacing Support Implementation

## Overview

Updated all Saha-UI components with spacing-related props to support numeric values and custom string values in addition to predefined tokens. This provides developers with more flexibility when precise spacing control is needed.

## Changes Summary

### Components Updated

1. **Stack** - `spacing` prop
2. **Grid** - `gap` prop
3. **Masonry** - `gap` prop
4. **Separator** - `spacing` prop
5. **Paper** - `padding` prop
6. **Item (ItemGroup)** - `spacing` prop
7. **Form** - `spacing` prop (type-only)
8. **Field (FieldGroup)** - `spacing` prop
9. **Container** - `padding` prop
10. **Section** - `padding` prop
11. **Card** - `padding` prop

## Supported Value Types

All spacing/gap/padding props now accept three types of values:

### 1. Predefined Tokens (Original Behavior)

- `'none'` - No spacing (0)
- `'xs'` - Extra small (0.25rem / 4px)
- `'sm'` - Small (0.5rem / 8px)
- `'md'` - Medium (1rem / 16px) - Default
- `'lg'` - Large (1.5rem / 24px)
- `'xl'` - Extra large (2rem / 32px)
- `'2xl'` - 2X large (3rem / 48px)

### 2. Numeric Values (New)

Numbers are automatically converted to pixel values:

- `spacing={16}` → `16px`
- `spacing={24}` → `24px`
- `spacing={32}` → `32px`

### 3. Custom String Values (New)

Any valid CSS length value:

- `spacing="2rem"` → `2rem`
- `spacing="1.5em"` → `1.5em`
- `spacing="40px"` → `40px`
- `spacing="10%"` → `10%`

## Usage Examples

### Stack Component

```tsx
// Token-based (original)
<Stack spacing="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Stack>

// Numeric (new)
<Stack spacing={20}>
  <Card>20px gap</Card>
  <Card>between items</Card>
</Stack>

// Custom string (new)
<Stack spacing="2rem">
  <Card>2rem gap</Card>
  <Card>between items</Card>
</Stack>
```

### Grid Component

```tsx
// Token-based
<Grid cols={3} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// Numeric
<Grid cols={3} gap={24}>
  <div>24px gap</div>
  <div>between</div>
  <div>grid items</div>
</Grid>

// Custom string
<Grid cols={3} gap="1.5rem">
  <div>1.5rem gap</div>
  <div>between</div>
  <div>grid items</div>
</Grid>
```

### Paper Component

```tsx
// Token-based
<Paper padding="lg">
  Content with large padding
</Paper>

// Numeric
<Paper padding={32}>
  Content with 32px padding
</Paper>

// Custom string
<Paper padding="2.5rem">
  Content with 2.5rem padding
</Paper>
```

### Separator Component

```tsx
// Token-based
<Separator spacing="md" />

// Numeric
<Separator spacing={24} />

// Custom string
<Separator spacing="2rem" />
```

### Masonry Component

```tsx
// Token-based
<Masonry columns={3} gap="md">
  {items}
</Masonry>

// Numeric
<Masonry columns={3} gap={20}>
  {items}
</Masonry>

// Custom string
<Masonry columns={3} gap="1.5rem">
  {items}
</Masonry>
```

### Container Component

```tsx
// Token-based
<Container padding="lg">
  Content with large padding
</Container>

// Numeric
<Container padding={40}>
  Content with 40px padding
</Container>

// Custom string
<Container padding="3rem">
  Content with 3rem padding
</Container>
```

### Section Component

```tsx
// Token-based
<Section padding="xl">
  Section content
</Section>

// Numeric
<Section padding={48}>
  Section with 48px padding
</Section>

// Custom string
<Section padding="3rem">
  Section with 3rem padding
</Section>
```

### Card Component

```tsx
// Token-based
<Card padding="lg">
  Card content
</Card>

// Numeric
<Card padding={28}>
  Card with 28px padding
</Card>

// Custom string
<Card padding="2rem">
  Card with 2rem padding
</Card>
```

## Implementation Details

### Type Definitions

All affected type files have been updated to accept:

```typescript
spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number | string;
gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number | string;
padding?: "none" | "sm" | "md" | "lg" | "xl" | number | string;
```

### Runtime Handling

Components now detect the value type and apply styles accordingly:

```typescript
// Check if value is a predefined token
const isTokenSpacing =
  typeof spacing === "string" &&
  ["none", "xs", "sm", "md", "lg", "xl", "2xl"].includes(spacing);

// Apply custom style for non-token values
const customStyle =
  !isTokenSpacing && spacing !== undefined
    ? { gap: typeof spacing === "number" ? `${spacing}px` : spacing, ...style }
    : style;

// Pass to variant system or apply inline
<Component
  className={cn(variants({ spacing: isTokenSpacing ? spacing : undefined }))}
  style={customStyle}
/>;
```

## Benefits

1. **Precise Control** - Developers can now specify exact pixel values when design requirements don't match predefined tokens
2. **Design System Flexibility** - Supports custom design systems that use different spacing scales (rem, em, etc.)
3. **Backward Compatible** - All existing code using token-based spacing continues to work unchanged
4. **Type Safe** - TypeScript provides full type checking for all value types
5. **CSS-in-JS Friendly** - Accepts any valid CSS length value as a string

## Migration Guide

No migration needed! All existing code continues to work exactly as before. The new functionality is additive.

### Before (Still works)

```tsx
<Stack spacing="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Stack>
```

### After (New options available)

```tsx
// Use tokens when they match your needs
<Stack spacing="md">
  <Card>Item 1</Card>
</Stack>

// Use numbers for precise pixel values
<Stack spacing={20}>
  <Card>Item 1</Card>
</Stack>

// Use custom strings for rem, em, etc.
<Stack spacing="1.5rem">
  <Card>Item 1</Card>
</Stack>
```

## Testing

A comprehensive example file has been created: `src/examples/NumericSpacingExample.tsx`

This example demonstrates:

- Token-based spacing (original behavior)
- Numeric spacing (pixels)
- Custom string spacing (rem, em, etc.)
- Side-by-side comparisons
- All affected components

## Files Modified

### Type Definitions

- `src/components/Stack/Stack.types.ts`
- `src/components/Grid/Grid.types.ts`
- `src/components/Masonry/Masonry.types.ts`
- `src/components/Separator/Separator.types.ts`
- `src/components/Paper/Paper.types.ts`
- `src/components/Item/Item.types.ts`
- `src/components/Form/Form.types.ts`
- `src/components/Field/Field.types.ts`
- `src/components/Container/Container.types.ts`
- `src/components/Section/Section.types.ts`
- `src/components/Card/Card.types.ts`

### Component Implementations

- `src/components/Stack/Stack.tsx`
- `src/components/Grid/Grid.tsx`
- `src/components/Masonry/index.tsx`
- `src/components/Separator/index.tsx`
- `src/components/Paper/index.tsx`
- `src/components/Item/index.tsx`
- `src/components/Field/Field.tsx`
- `src/components/Container/Container.tsx`
- `src/components/Section/Section.tsx`
- `src/components/Card/index.tsx`

### Examples

- `src/examples/NumericSpacingExample.tsx` (new)

## Best Practices

1. **Prefer Tokens First** - Use predefined tokens when they match your design requirements for consistency
2. **Use Numbers for Precision** - When exact pixel values are needed (e.g., matching specific designs)
3. **Use Custom Strings Sparingly** - For special cases or when integrating with existing CSS-in-JS systems
4. **Document Custom Values** - Add comments explaining why custom values are used

```tsx
// Good: Using token for standard spacing
<Stack spacing="md">...</Stack>

// Good: Using number when precise value is needed
<Stack spacing={18}> {/* Matches design spec exactly */}
  ...
</Stack>

// Good: Using custom string for specific unit requirements
<Stack spacing="1.5rem"> {/* Using rem for accessibility */}
  ...
</Stack>
```

## Performance Considerations

- Token-based values use optimized Tailwind classes (compiled at build time)
- Numeric and custom string values use inline styles (minimal runtime overhead)
- No performance impact on existing token-based usage
- Inline styles are only applied when numeric/custom values are used

## Browser Support

All value types are supported in all modern browsers. Custom CSS length values depend on browser support for those specific units.

---

**Version**: 1.0.0
**Date**: December 2024
**Status**: ✅ Complete
