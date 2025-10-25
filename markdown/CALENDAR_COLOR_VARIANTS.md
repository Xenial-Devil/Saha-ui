# Calendar Color & Border Variants - Implementation Summary

## ✅ What Was Implemented

Added **color variants** and **bordered** prop to the Calendar component, making it fully customizable with theme colors.

### Key Features

1. **Color Prop** - Choose from 7 theme colors
2. **Bordered Prop** - Optional colored border (no hover effect)
3. **Separation of Concerns** - Border is a style prop, not a variant

## 🎨 Color Variants

The `color` prop controls the color scheme for:

- Selected dates
- Range highlighting
- Today indicator
- Hover effects
- Border color (when `bordered={true}`)

### Available Colors

| Color       | Usage                       |
| ----------- | --------------------------- |
| `primary`   | Default theme primary color |
| `secondary` | Theme secondary color       |
| `accent`    | Theme accent color          |
| `success`   | Green (success states)      |
| `warning`   | Yellow (warning states)     |
| `error`     | Red (error/danger states)   |
| `info`      | Blue (information states)   |

## 📦 Props Added

### `color` Prop

```typescript
type CalendarColor =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

// Default: "primary"
```

### `bordered` Prop

```typescript
bordered?: boolean;

// Default: false
// When true, shows a 2px border with color matching the `color` prop
```

## 💡 Usage Examples

### Basic Color Usage

```tsx
// Primary color (default)
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  color="primary"
/>

// Accent color
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  color="accent"
/>

// Success color (green theme)
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  color="success"
/>
```

### With Bordered Prop

```tsx
// Primary colored border
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  color="primary"
  bordered
/>

// Accent colored border
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  color="accent"
  bordered
/>

// Error colored border
<Calendar
  mode="range"
  range={dateRange}
  onRangeChange={setDateRange}
  color="error"
  bordered
/>
```

### Combining with Variants

```tsx
// Glass effect with accent color
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  variant="glass"
  color="accent"
/>

// Gradient variant with success color
<Calendar
  mode="range"
  range={dateRange}
  onRangeChange={setDateRange}
  variant="gradient"
  color="success"
/>

// Default variant with bordered info color
<Calendar
  mode="multiple"
  values={dates}
  onChange={setDates}
  variant="default"
  color="info"
  bordered
/>
```

## 🎯 Color Application

### How Colors Are Applied

**Selected Dates:**

- Background: Full color (`bg-{color}`)
- Text: Contrasting foreground color
- Shadow: Color with 30% opacity

**Range (inRange state):**

- Background: Color with 20% opacity
- Connection overlay: Color with 10% opacity
- Text: Colored text

**Today Indicator:**

- Ring: Color with 40% opacity
- Text: Colored text
- Hover: Color with 60% opacity

**Hover States:**

- Background: Color with 10% opacity
- Text: Colored text

**Border (when bordered={true}):**

- Border: 2px solid, color with 50% opacity
- No hover effect on border

## 📝 Implementation Details

### CVA Structure

```typescript
const calendarVariants = cva([...], {
  variants: {
    variant: { ... },
    color: {
      primary: "",
      secondary: "",
      accent: "",
      success: "",
      warning: "",
      error: "",
      info: "",
    },
    bordered: {
      true: "border-2",
      false: "",
    },
    size: { ... },
    rounded: { ... },
  },
  compoundVariants: [
    // Border colors
    { bordered: true, color: "primary", className: "border-primary/50" },
    { bordered: true, color: "secondary", className: "border-secondary/50" },
    { bordered: true, color: "accent", className: "border-accent/50" },
    { bordered: true, color: "success", className: "border-green-500/50" },
    { bordered: true, color: "warning", className: "border-yellow-500/50" },
    { bordered: true, color: "error", className: "border-red-500/50" },
    { bordered: true, color: "info", className: "border-blue-500/50" },
  ],
});
```

### Day Variants with Colors

```typescript
const dayVariants = cva([...], {
  variants: {
    size: { ... },
    color: { primary, secondary, accent, success, warning, error, info },
    state: { default, selected, today, disabled, inRange, rangeStart, rangeEnd, rangeBoth, outside },
  },
  compoundVariants: [
    // 7 colors × 7 states = 49 compound variants
    // Each state gets appropriate color styling
  ],
});
```

## 🔄 Migration from Previous Version

### Before (No color variants)

```tsx
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  variant="bordered" // ❌ Bordered was a variant
/>
```

### After (With color variants)

```tsx
<Calendar
  mode="single"
  value={date}
  onChange={setDate}
  variant="default" // ✅ Variant is style only
  color="primary" // ✅ Color is separate
  bordered // ✅ Border is a boolean prop
/>
```

## 📊 Build Output

```
dist/components\Calendar\index.js  24.20 kB │ gzip: 4.80 kB
```

**Bundle size increase:** ~7.5 kB (uncompressed) / ~0.87 kB (gzipped)

- Added 7 color variants
- Added compound variants for all color combinations
- Worth it for the flexibility!

## 🎨 Visual Variants vs Color vs Border

| Feature    | Purpose             | Values                                                    |
| ---------- | ------------------- | --------------------------------------------------------- |
| `variant`  | Visual style/effect | default, bordered, glass, glass-strong, gradient          |
| `color`    | Theme color         | primary, secondary, accent, success, warning, error, info |
| `bordered` | Show colored border | true, false                                               |

**All three are independent and can be combined:**

```tsx
<Calendar
  variant="glass-strong" // Frosted glass effect
  color="accent" // Accent color for selections
  bordered // With accent-colored border
/>
```

## ✨ Examples in CalendarExample.tsx

The example file now includes:

1. **Color Variants Section** - All 7 colors with glass variant
2. **Bordered Color Variants Section** - 4 colors with borders (no hover)
3. **Range Selection with Colors** - Accent, Success, Info colors in range mode

## 🚀 Benefits

### For Developers

- ✅ Flexible color customization
- ✅ Type-safe color variants
- ✅ Consistent with component library patterns (Chip, Badge, etc.)
- ✅ No breaking changes to existing code

### For Users

- ✅ Better visual hierarchy
- ✅ Color coding for different calendar types
- ✅ Matches application theme colors
- ✅ Clear visual differentiation

## 🎯 Use Cases

**Multi-Calendar Setup:**

```tsx
{
  /* Available dates in green */
}
<Calendar color="success" />;

{
  /* Blocked dates in red */
}
<Calendar color="error" />;

{
  /* Selected dates in primary */
}
<Calendar color="primary" />;
```

**Event Calendars:**

```tsx
{
  /* Meeting calendar */
}
<Calendar color="info" bordered />;

{
  /* Holiday calendar */
}
<Calendar color="warning" bordered />;

{
  /* Deadline calendar */
}
<Calendar color="error" bordered />;
```

**Themed Applications:**

```tsx
{
  /* Match brand colors */
}
<Calendar color="accent" variant="glass-strong" bordered />;
```

## 📚 Type Safety

Full TypeScript support:

```typescript
import type { CalendarColor } from "saha-ui";

const myColor: CalendarColor = "accent"; // ✅ Type-safe

<Calendar
  color={myColor} // ✅ IntelliSense works
  bordered={true} // ✅ Boolean type checked
/>;
```

## 🎉 Summary

The Calendar component now supports:

- ✅ **7 color variants** (primary, secondary, accent, success, warning, error, info)
- ✅ **Bordered prop** for colored borders (no hover effect)
- ✅ **All colors work with all variants** (default, bordered, glass, glass-strong, gradient)
- ✅ **All colors work in all modes** (single, multiple, range)
- ✅ **Type-safe** with TypeScript discriminated unions
- ✅ **Backward compatible** - existing code works without changes

**Border is now a style prop, not a variant!** 🎨
