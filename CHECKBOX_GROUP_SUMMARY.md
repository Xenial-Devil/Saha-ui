# CheckboxGroup Component Summary

## Overview

The `CheckboxGroup` component provides a comprehensive solution for managing multiple checkbox selections with advanced features including card layouts, custom icons, validation, and flexible direction options.

## Component Details

- **File**: `src/components/Checkbox/index.tsx`
- **Bundle Size**: 12.99 kB (3.16 kB gzipped)
- **Type Safety**: Full TypeScript support
- **Pattern**: Context API for state management

## Features

### Core Features

- ✅ **Multiple Selection**: Track selected values with controlled/uncontrolled patterns
- ✅ **Flexible Layouts**: Vertical, horizontal, and card grid layouts
- ✅ **Options Array**: Pass array of options or use custom children
- ✅ **Variant Support**: Inherits variant from group or individual checkboxes
- ✅ **Size Support**: Inherits size from group or individual checkboxes
- ✅ **Validation**: Built-in error and helper text support
- ✅ **Context API**: Automatic state management for child checkboxes

### Advanced Features

- ✅ **Card Grid Layout**: Beautiful responsive grid with cards
- ✅ **Custom Icons**: Add icons to individual options
- ✅ **Badges**: Display additional info on options
- ✅ **Recommended Flag**: Highlight recommended options
- ✅ **Images/Gradients**: Visual backgrounds for card mode
- ✅ **Disabled Options**: Disable individual checkboxes
- ✅ **Custom Children**: Use Checkbox components as children for full control

## API Reference

### CheckboxGroup Props

```typescript
interface CheckboxGroupProps {
  // Basic props
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;

  // State management
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;

  // Layout
  direction?: "horizontal" | "vertical";
  card?: boolean;

  // Styling
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg";
  className?: string;

  // Options
  options?: CheckboxOption[];
  children?: React.ReactNode;
}

interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string;
  image?: string;
  recommended?: boolean;
}
```

## Usage Examples

### 1. Basic Vertical Group

```tsx
import { CheckboxGroup } from "saha-ui";

function Example() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <CheckboxGroup
      label="Select your interests"
      description="Choose one or more topics"
      value={selected}
      onChange={setSelected}
      options={[
        { value: "coding", label: "Coding" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
      ]}
    />
  );
}
```

### 2. Horizontal Layout

```tsx
<CheckboxGroup
  label="Account Settings"
  direction="horizontal"
  options={[
    { value: "notifications", label: "Email Notifications" },
    { value: "newsletter", label: "Newsletter" },
    { value: "marketing", label: "Marketing" },
  ]}
/>
```

### 3. Card Layout with Icons

```tsx
<CheckboxGroup
  label="Choose Your Plan"
  card
  variant="primary"
  options={[
    {
      value: "basic",
      label: "Basic Support",
      description: "Email support within 48 hours",
      icon: <Star className="w-5 h-5" />,
      badge: "Free",
    },
    {
      value: "priority",
      label: "Priority Support",
      description: "24/7 chat and email support",
      icon: <Zap className="w-5 h-5" />,
      badge: "$9/mo",
      recommended: true,
    },
    {
      value: "premium",
      label: "Premium Features",
      description: "Advanced analytics",
      icon: <Crown className="w-5 h-5" />,
      badge: "$29/mo",
    },
  ]}
/>
```

### 4. Different Variants

```tsx
<CheckboxGroup
  label="Primary Variant"
  variant="primary"
  options={[...]}
/>

<CheckboxGroup
  label="Success Variant"
  variant="success"
  options={[...]}
/>

<CheckboxGroup
  label="Warning Variant"
  variant="warning"
  options={[...]}
/>
```

### 5. With Custom Children

```tsx
<CheckboxGroup
  label="Programming Skills"
  value={selected}
  onChange={setSelected}
>
  <Checkbox
    value="react"
    label="React"
    description="Component-based UI library"
    icon={<Star />}
    badge="Expert"
  />
  <Checkbox
    value="typescript"
    label="TypeScript"
    description="Typed superset of JavaScript"
    icon={<Shield />}
    badge="Advanced"
  />
</CheckboxGroup>
```

### 6. With Validation

```tsx
<CheckboxGroup
  label="Terms and Conditions"
  error={
    selected.length === 0 ? "Please select at least one option" : undefined
  }
  helperText="You must agree to continue"
  options={[
    { value: "terms", label: "I agree to Terms of Service" },
    { value: "privacy", label: "I agree to Privacy Policy" },
  ]}
/>
```

### 7. With Disabled Options

```tsx
<CheckboxGroup
  label="Feature Access"
  options={[
    { value: "basic", label: "Basic Features" },
    {
      value: "advanced",
      label: "Advanced Features",
      disabled: true,
      badge: "Premium",
    },
    {
      value: "enterprise",
      label: "Enterprise Features",
      disabled: true,
      badge: "Enterprise",
    },
  ]}
/>
```

### 8. Card Grid with Images

```tsx
<CheckboxGroup
  label="Select Themes"
  card
  options={[
    {
      value: "ocean",
      label: "Ocean Blue",
      description: "Calm and professional",
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      value: "sunset",
      label: "Sunset Orange",
      description: "Warm and energetic",
      image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      recommended: true,
    },
  ]}
/>
```

## Layout Options

### Vertical (Default)

- Stacks checkboxes vertically
- Best for: Forms, settings, short lists

### Horizontal

- Arranges checkboxes in a row with wrapping
- Best for: Inline selections, compact spaces

### Card Grid

- Responsive grid layout (1 → 2 → 3 columns)
- Best for: Feature selection, plan comparison, visual choices

## Context API

CheckboxGroup uses React Context to automatically manage:

- Selected values
- Name attribute
- onChange handler
- Variant inheritance
- Size inheritance

This means child Checkbox components automatically:

- Know their checked state
- Report changes to the group
- Inherit group variant/size
- Share the same name attribute

## Controlled vs Uncontrolled

### Controlled (Recommended)

```tsx
const [selected, setSelected] = useState<string[]>([]);
<CheckboxGroup value={selected} onChange={setSelected} />;
```

### Uncontrolled

```tsx
<CheckboxGroup defaultValue={["option1"]} />
```

## Accessibility

- ✅ Proper ARIA labels and descriptions
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Error announcements
- ✅ Semantic HTML structure
- ✅ Grouped with fieldset/legend pattern

## Styling

### Variants

- `default` - Standard gray theme
- `primary` - Primary brand color
- `secondary` - Secondary brand color
- `accent` - Accent color theme
- `success` - Green success theme
- `warning` - Yellow warning theme
- `error` - Red error theme

### Sizes

- `sm` - Small (16px checkbox)
- `md` - Medium (20px checkbox) - default
- `lg` - Large (24px checkbox)

### Card Grid

- Responsive: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Hover effects with scale and shadow
- Recommended flag styling
- Image/gradient backgrounds

## Best Practices

1. **Use options array** for simple lists
2. **Use children** when you need custom checkbox props
3. **Enable card mode** for visual selections
4. **Add descriptions** to clarify options
5. **Use badges** to show additional info
6. **Mark recommended** options when appropriate
7. **Provide validation** feedback with error prop
8. **Use helperText** for additional guidance

## Integration with Checkbox

CheckboxGroup works seamlessly with individual Checkbox components:

```tsx
<CheckboxGroup value={selected} onChange={setSelected}>
  <Checkbox value="option1" label="Option 1" />
  <Checkbox value="option2" label="Option 2" icon={<Star />} />
  <Checkbox value="option3" label="Option 3" card />
</CheckboxGroup>
```

## File Structure

```
src/components/Checkbox/
├── index.tsx              # Checkbox & CheckboxGroup components
├── Checkbox.types.ts      # TypeScript type definitions
└── README.md             # Component documentation
```

## Examples

Comprehensive examples are available in:

- `src/examples/CheckboxExample.tsx` - Individual Checkbox examples
- `src/examples/CheckboxGroupExample.tsx` - CheckboxGroup examples
- `src/examples/AllComponentExamples.tsx` - Integrated showcase

## Technical Implementation

### Context Structure

```typescript
interface CheckboxContextValue {
  name?: string;
  value?: string[];
  onChange?: (value: string, checked: boolean) => void;
  variant?: CheckboxProps["variant"];
  size?: CheckboxProps["size"];
}
```

### State Management

- Uses `useState` for uncontrolled mode
- Supports controlled mode with external state
- Context Provider wraps children
- Individual checkboxes consume context

### Layout Logic

- Flexbox for vertical/horizontal layouts
- CSS Grid for card layouts
- Responsive breakpoints (sm, lg)
- Gap utilities for spacing

## Performance

- **Bundle Size**: 12.99 kB (3.16 kB gzipped)
- **Tree-shakeable**: Import only what you need
- **Optimized Rendering**: Context prevents unnecessary re-renders
- **CSS-based Animations**: GPU-accelerated transitions

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Migration from Other Libraries

### From Chakra UI

```diff
- <CheckboxGroup>
-   <Checkbox value="1">Option 1</Checkbox>
- </CheckboxGroup>

+ <CheckboxGroup
+   options={[{ value: "1", label: "Option 1" }]}
+ />
```

### From Material-UI

```diff
- <FormGroup>
-   <FormControlLabel control={<Checkbox />} label="Option 1" />
- </FormGroup>

+ <CheckboxGroup
+   options={[{ value: "1", label: "Option 1" }]}
+ />
```

## Related Components

- **Checkbox** - Individual checkbox component
- **Radio** / **RadioGroup** - Single selection alternative
- **Switch** - Toggle alternative for binary choices

## Summary

CheckboxGroup provides a powerful and flexible way to manage multiple checkbox selections with:

- Beautiful layouts (vertical, horizontal, card grid)
- Advanced features (icons, badges, images, recommended flags)
- Full validation support
- Context-based state management
- Complete TypeScript support
- Accessible and responsive design

Perfect for forms, settings panels, feature selection, and any scenario requiring multiple selections!
