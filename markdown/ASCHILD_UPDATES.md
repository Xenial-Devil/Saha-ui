# asChild Prop Implementation Summary

This document summarizes all components that have been updated to support the `asChild` prop pattern, enabling better composition and flexibility in component usage.

## What is asChild?

The `asChild` prop is a composition pattern (popularized by Radix UI and shadcn/ui) that allows a component to render its child element instead of its default element, while merging all props and styles. This is particularly useful for:

- Using custom navigation components (e.g., Next.js `Link`)
- Composing components together
- Maintaining accessibility while customizing rendering
- Avoiding unnecessary DOM nesting

## Implementation Pattern

All updated components use the `Slot` utility component located at `src/lib/Slot.tsx`. The pattern follows this structure:

```tsx
import { Slot } from "../../lib/Slot";

const Component = React.forwardRef<HTMLElement, Props>(
  ({ asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "defaultElement";
    
    return (
      <Comp ref={ref} {...props}>
        {asChild ? children : (
          // Default component structure
        )}
      </Comp>
    );
  }
);
```

## Updated Components

### 1. Badge (`src/components/Badge/`)
- **File**: `index.tsx`, `Badge.types.ts`
- **Default Element**: `span`
- **Use Case**: Render badges as links or custom interactive elements

```tsx
// Example: Badge as a link
<Badge asChild>
  <a href="/notifications">3 new</a>
</Badge>
```

### 2. Link (`src/components/Link/`)
- **File**: `index.tsx`, `Link.types.ts`
- **Default Element**: `a`
- **Use Case**: Integration with routing libraries like Next.js Link

```tsx
// Example: Link with Next.js
<Link asChild>
  <NextLink href="/about">About Us</NextLink>
</Link>
```

### 3. Chip (`src/components/Chip/`)
- **File**: `index.tsx`, `Chip.types.ts`
- **Default Element**: `div`
- **Use Case**: Make chips clickable with custom elements

```tsx
// Example: Chip as a button
<Chip asChild>
  <button onClick={handleClick}>Filter</button>
</Chip>
```

### 4. Card Sub-components (`src/components/Card/`)
- **Files**: `index.tsx`, `Card.types.ts`
- **Components Updated**:
  - `CardHeader` (div)
  - `CardTitle` (h3)
  - `CardDescription` (p)
  - `CardContent` (div)
  - `CardFooter` (div)
- **Use Case**: Customize semantic elements while maintaining styles

```tsx
// Example: Custom heading level
<CardTitle asChild>
  <h2>Custom Heading</h2>
</CardTitle>
```

### 5. Toggle (`src/components/Toggle/`)
- **File**: `index.tsx`, `Toggle.types.ts`
- **Default Element**: `button`
- **Use Case**: Custom toggle implementations with different interactive elements

```tsx
// Example: Toggle with custom element
<Toggle asChild pressed={active}>
  <CustomButton>Toggle Me</CustomButton>
</Toggle>
```

### 6. Kbd (`src/components/Kbd/`)
- **File**: `index.tsx`, `Kbd.types.ts`
- **Default Element**: `kbd`
- **Use Case**: Custom keyboard key displays

```tsx
// Example: Custom kbd element
<Kbd asChild>
  <span className="custom-kbd">⌘</span>
</Kbd>
```

### 7. FloatingActionButton (`src/components/FloatingActionButton/`)
- **File**: `index.tsx`, `FloatingActionButton.types.ts`
- **Default Element**: `button`
- **Use Case**: FAB with custom routing or interaction behavior

```tsx
// Example: FAB as a link
<FloatingActionButton asChild>
  <a href="/create">
    <Plus />
  </a>
</FloatingActionButton>
```

### 8. Accordion (`src/components/Accordion/`)
- **File**: `index.tsx`, `Accordion.types.ts`
- **Component Updated**: `AccordionTrigger`
- **Default Element**: `button`
- **Use Case**: Custom trigger elements with different interactive behaviors

```tsx
// Example: Custom trigger
<AccordionTrigger asChild>
  <CustomButton>Expand Section</CustomButton>
</AccordionTrigger>
```

### 9. NavigationMenu (`src/components/NavigationMenu/`)
- **File**: `NavigationMenu.tsx`
- **Components Updated**:
  - `NavigationMenuList` (div)
  - `NavigationMenuContent` (div)
  - `NavigationMenuTrigger` (already had asChild support)
- **Use Case**: Custom navigation structures

```tsx
// Example: Custom list structure
<NavigationMenuList asChild>
  <ul className="custom-nav">
    {/* items */}
  </ul>
</NavigationMenuList>
```

### 10. Autocomplete (`src/components/Autocomplete/`)
- **File**: `index.tsx`
- **Components Updated**:
  - `AutocompleteDropdown` (div)
  - `AutocompleteOption` (div)
- **Use Case**: Custom dropdown and option rendering

```tsx
// Example: Custom option
<AutocompleteOption asChild option={opt} index={i}>
  <CustomOption>{opt.label}</CustomOption>
</AutocompleteOption>
```

### 11. Slider (`src/components/Slider/`)
- **File**: `Slider.tsx`
- **Component Updated**: `SliderTrack`
- **Default Element**: `div`
- **Use Case**: Custom track rendering

```tsx
// Example: Custom track
<SliderTrack asChild>
  <div className="custom-track">
    {/* custom track content */}
  </div>
</SliderTrack>
```

## Components That Already Had asChild Support

The following components already had `asChild` support implemented:

1. **Button** (`src/components/Button/`)
2. **Collapsible** (`src/components/Collapsible/`)
3. **Combobox** (`src/components/Combobox/`)
4. **ContextMenu** (`src/components/ContextMenu/`)
5. **Drawer** (`src/components/Drawer/DrawerComponents.tsx`)
6. **Dropdown** (`src/components/Dropdown/`)
7. **HoverCard** (`src/components/HoverCard/`)
8. **Item** (`src/components/Item/`)
9. **Tooltip** (`src/components/Tooltip/`)
10. **Tree** (`src/components/Tree/`)

## Components That Don't Need asChild

The following component types typically don't benefit from `asChild` support:

### Provider Components
- `ThemeProvider`
- `SonnerProvider`
- `ToastProvider`

**Reason**: These are context providers that wrap the application tree, not renderable UI components.

### Form Input Components
- `Input`
- `TextArea`
- `Checkbox`
- `Radio`
- `Select`
- `Switch`
- `DatePicker`

**Reason**: These have specific input behavior and internal state management that would break with custom elements.

### Complex Layout Components
- `Table`, `DataTable`
- `Chart` components
- `Calendar`
- `Carousel`

**Reason**: These have complex internal structure, child management, and interactions that require specific DOM structure.

### Portal-based Components
- `Dialog`
- `Drawer` (main component)
- `Popover`
- `Toast`

**Reason**: These use React portals and have specific positioning/layering requirements.

### Container Components
- `Card` (main component)
- `ButtonGroup`
- `AvatarGroup`
- `Form`

**Reason**: These are layout containers that manage multiple children with specific spacing and arrangements.

## Testing Recommendations

When using `asChild`, ensure that:

1. **Props are properly forwarded**: The child element should receive all props from the parent
2. **Refs work correctly**: Forward refs should be properly assigned to the child
3. **Accessibility is maintained**: ARIA attributes and roles are preserved
4. **Event handlers merge correctly**: Both parent and child event handlers should fire
5. **Styles are combined**: ClassNames from both parent and child should be merged

## Example Usage Patterns

### With Next.js Link

```tsx
import Link from 'next/link';
import { Button, Badge, Link as UILink } from 'saha-ui';

// Button as Next.js Link
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>

// Badge as Next.js Link
<Badge asChild variant="primary">
  <Link href="/notifications">3 New</Link>
</Badge>

// Link component with Next.js Link
<UILink asChild>
  <Link href="/about">About Us</Link>
</UILink>
```

### With React Router

```tsx
import { Link } from 'react-router-dom';
import { Button, Chip } from 'saha-ui';

// Button as React Router Link
<Button asChild variant="primary">
  <Link to="/profile">My Profile</Link>
</Button>

// Chip as router link
<Chip asChild color="accent">
  <Link to="/tags/react">React</Link>
</Chip>
```

### Custom Interactive Elements

```tsx
import { Toggle, FloatingActionButton, Kbd } from 'saha-ui';

// Toggle with custom element
<Toggle asChild pressed={isActive}>
  <div role="button" tabIndex={0} onKeyDown={handleKeyDown}>
    Custom Toggle
  </div>
</Toggle>

// FAB with custom interaction
<FloatingActionButton asChild>
  <button onClick={handleCustomAction} data-tracking="fab-click">
    <PlusIcon />
  </button>
</FloatingActionButton>
```

## Benefits

1. **Better Composition**: Combine components without extra DOM nesting
2. **Framework Integration**: Easy integration with routing libraries
3. **Flexibility**: Use any element while maintaining component styles
4. **Accessibility**: Preserve semantic HTML while customizing behavior
5. **Type Safety**: Full TypeScript support for both parent and child props

## Migration Guide

If you're updating existing code:

### Before (Multiple wrappers)
```tsx
<Link href="/profile">
  <Button>My Profile</Button>
</Link>
```

### After (Clean composition)
```tsx
<Button asChild>
  <Link href="/profile">My Profile</Link>
</Button>
```

## Notes

- All components default to `asChild={false}` to maintain backward compatibility
- When `asChild` is true, only the child element is rendered with merged props
- The `Slot` component handles proper prop merging, including className and style
- All updates maintain full TypeScript type safety
- No breaking changes were introduced

## Verification

All components have been tested and verified:
- ✅ No TypeScript errors
- ✅ No linting warnings
- ✅ Proper prop forwarding
- ✅ Ref forwarding works correctly
- ✅ Backward compatible (asChild defaults to false)

---

**Last Updated**: 2024
**Total Components Updated**: 11 components + multiple sub-components
**Total Components with asChild**: 21+ components