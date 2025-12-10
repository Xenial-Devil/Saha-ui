# Numeric Spacing Support - Complete Update

## Overview

All components with spacing, gap, and padding props now support **numeric values** (converted to pixels) and **custom string values** (e.g., "2rem", "1.5em") in addition to predefined tokens.

## Updated Components

### 1. **ToggleGroup** - `spacing` prop

- **Type**: `0 | 1 | 2 | 3 | 4 | number | string`
- **Examples**:
  ```tsx
  <ToggleGroup spacing={0}>No spacing</ToggleGroup>
  <ToggleGroup spacing={16}>16px spacing</ToggleGroup>
  <ToggleGroup spacing="1rem">Custom spacing</ToggleGroup>
  ```

### 2. **TagGroup** - `spacing` prop

- **Type**: `"sm" | "md" | "lg" | number | string`
- **Examples**:
  ```tsx
  <TagGroup spacing="md">Token spacing</TagGroup>
  <TagGroup spacing={20}>20px spacing</TagGroup>
  <TagGroup spacing="1.5rem">Custom spacing</TagGroup>
  ```

### 3. **Skeleton** - `spacing` prop

- **Type**: `"tight" | "normal" | "loose" | "relaxed" | number | string`
- **Examples**:
  ```tsx
  <Skeleton spacing="normal" count={3}>Token spacing</Skeleton>
  <Skeleton spacing={24} count={3}>24px spacing</Skeleton>
  <Skeleton spacing="2rem" count={3}>Custom spacing</Skeleton>
  ```

### 4. **LabelGroup** - `spacing` prop

- **Type**: `"sm" | "md" | "lg" | number | string`
- **Examples**:
  ```tsx
  <LabelGroup spacing="md">Token spacing</LabelGroup>
  <LabelGroup spacing={32}>32px spacing</LabelGroup>
  <LabelGroup spacing="2.5rem">Custom spacing</LabelGroup>
  ```

## Already Supported Components

The following components already had numeric/custom spacing support:

### Layout Components

- **Stack** - `spacing` prop: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number | string`
- **Grid** - `gap` prop: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number | string`
- **Container** - `padding` prop: `"none" | "sm" | "default" | "lg" | number | string`
- **Section** - `padding` prop: `"none" | "sm" | "default" | "lg" | "xl" | number | string`
- **Masonry** - `gap` prop: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number | string`

### Content Components

- **Card** - `padding` prop: `"none" | "sm" | "md" | "lg" | "xl" | number | string`
- **Paper** - `padding` prop: `"none" | "sm" | "md" | "lg" | "xl" | number | string`
- **Separator** - `spacing` prop: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number | string`

### Other Components

- **AvatarGroup** - `spacing` prop: `number` (negative values for overlap)
- **Item** - `spacing` prop: `"none" | "sm" | "md" | "lg" | number | string`
- **Field** - `spacing` prop: `"none" | "sm" | "md" | "lg" | "xl" | number | string`
- **Form** - `spacing` prop: `"none" | "sm" | "md" | "lg" | number | string`

## Usage Patterns

### 1. Token-based (Predefined)

```tsx
<Stack spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

### 2. Numeric (Pixels)

```tsx
<Grid gap={24}>
  <div>Item 1</div>
  <div>Item 2</div>
</Grid>
```

### 3. Custom String (with units)

```tsx
<Paper padding="2rem">
  <p>Content with custom padding</p>
</Paper>
```

## Implementation Details

All components follow the same pattern:

1. **Type Definition**: Extended to accept `number | string`
2. **Runtime Check**: Determines if value is a token, number, or custom string
3. **Style Application**:
   - Token values use CSS classes (CVA variants)
   - Numeric values converted to pixels via inline styles
   - Custom strings applied directly via inline styles

### Example Implementation Pattern

```tsx
// Type check
const isTokenSpacing =
  typeof spacing === "string" &&
  ["xs", "sm", "md", "lg"].includes(spacing);

// Custom style
const customStyle = !isTokenSpacing && spacing !== undefined
  ? { gap: typeof spacing === "number" ? `${spacing}px` : spacing }
  : undefined;

// Apply
<div
  className={cn(variants({ spacing: isTokenSpacing ? spacing : "md" }))}
  style={customStyle}
>
```

## Benefits

1. **Flexibility**: Use exact pixel values when design requires precision
2. **Responsive**: Use rem/em units for better responsive scaling
3. **Design System**: Maintain tokens for consistency while allowing exceptions
4. **Developer Experience**: No more wrapper divs just for custom spacing
5. **Type Safety**: Full TypeScript support with autocomplete

## Migration Guide

### Before

```tsx
<div style={{ gap: "20px" }}>
  <Stack spacing="md">
    <div>Item 1</div>
    <div>Item 2</div>
  </Stack>
</div>
```

### After

```tsx
<Stack spacing={20}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

## Testing

See `src/examples/NumericSpacingExample.tsx` for comprehensive examples of all components with:

- Token-based spacing
- Numeric spacing (pixels)
- Custom string spacing (rem, em, etc.)

## Files Modified

### Component Types

- `src/components/ToggleGroup/ToggleGroup.styles.ts`
- `src/components/ToggleGroup/ToggleGroup.types.ts`
- `src/components/Tag/Tag.types.ts`
- `src/components/Skeleton/Skeleton.types.ts`
- `src/components/Label/Label.types.ts`

### Component Implementations

- `src/components/ToggleGroup/index.tsx`
- `src/components/Tag/index.tsx`
- `src/components/Skeleton/index.tsx`
- `src/components/Label/index.tsx`

### Examples

- `src/examples/NumericSpacingExample.tsx` (updated with all components)

## Summary

✅ **4 components updated** to support numeric/custom spacing
✅ **12+ components already supported** numeric/custom spacing
✅ **All spacing props** now accept: tokens | numbers | custom strings
✅ **Type-safe** with full TypeScript support
✅ **Backwards compatible** - existing token usage unchanged
✅ **Well documented** with examples and type hints
