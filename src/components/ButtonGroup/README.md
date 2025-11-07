# ButtonGroup

A component for grouping multiple buttons together with shared styling and behavior. Creates visually cohesive button sets with seamless borders and consistent spacing.

## Features

- 🎨 **Multiple Variants** - Default, outline, ghost, and glass styles
- 📏 **Flexible Sizing** - 4 size options (sm, md, lg, xl)
- ↔️ **Orientation** - Horizontal and vertical layouts
- 🔗 **Attached Mode** - Seamless borders between buttons
- 💯 **Full Width** - Responsive width distribution
- 🎯 **Context Provider** - Automatically inherits props
- ♿ **Accessible** - ARIA group role and keyboard navigation
- ✨ **Smooth Transitions** - Polished hover and focus effects

## Installation

```tsx
import { ButtonGroup, Button } from '@saha-ui/core';
```

## Basic Usage

### Simple Button Group

```tsx
<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
```

### With Icons

```tsx
import { Download, Share, Bookmark } from 'lucide-react';

<ButtonGroup>
  <Button>
    <Download className="mr-2 h-4 w-4" />
    Download
  </Button>
  <Button>
    <Share className="mr-2 h-4 w-4" />
    Share
  </Button>
  <Button>
    <Bookmark className="mr-2 h-4 w-4" />
    Save
  </Button>
</ButtonGroup>
```

## Variants

### Default Variant

```tsx
<ButtonGroup variant="default">
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</ButtonGroup>
```

### Outline Variant

```tsx
<ButtonGroup variant="outline">
  <Button>Option A</Button>
  <Button>Option B</Button>
  <Button>Option C</Button>
</ButtonGroup>
```

### Ghost Variant

```tsx
<ButtonGroup variant="ghost">
  <Button>View</Button>
  <Button>Edit</Button>
  <Button>Delete</Button>
</ButtonGroup>
```

### Glass Variant

```tsx
<ButtonGroup variant="glass">
  <Button>Transparent</Button>
  <Button>Glass</Button>
  <Button>Effect</Button>
</ButtonGroup>
```

## Sizes

```tsx
// Small
<ButtonGroup size="sm">
  <Button>Small</Button>
  <Button>Group</Button>
</ButtonGroup>

// Medium (default)
<ButtonGroup size="md">
  <Button>Medium</Button>
  <Button>Group</Button>
</ButtonGroup>

// Large
<ButtonGroup size="lg">
  <Button>Large</Button>
  <Button>Group</Button>
</ButtonGroup>

// Extra Large
<ButtonGroup size="xl">
  <Button>Extra</Button>
  <Button>Large</Button>
</ButtonGroup>
```

## Orientation

### Horizontal (Default)

```tsx
<ButtonGroup orientation="horizontal">
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>
```

### Vertical

```tsx
<ButtonGroup orientation="vertical">
  <Button>Top</Button>
  <Button>Middle</Button>
  <Button>Bottom</Button>
</ButtonGroup>
```

## Full Width

```tsx
// Buttons distribute evenly across full width
<ButtonGroup fullWidth>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>

// Vertical full width
<ButtonGroup orientation="vertical" fullWidth>
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</ButtonGroup>
```

## Rounding Styles

### Standard Rounding

```tsx
<ButtonGroup fullRounded={false}>
  <Button>Standard</Button>
  <Button>Corners</Button>
</ButtonGroup>
```

### Full Rounding (Pill Shape)

```tsx
<ButtonGroup fullRounded>
  <Button>Fully</Button>
  <Button>Rounded</Button>
</ButtonGroup>
```

## Attached vs Separated

### Attached (Default)

```tsx
// Seamless borders between buttons
<ButtonGroup attached>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
```

### Separated

```tsx
// Individual buttons with gaps
<ButtonGroup attached={false}>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
```

## Advanced Examples

### Toggle Group

```tsx
function ToggleButtonGroup() {
  const [selected, setSelected] = useState('center');

  return (
    <ButtonGroup variant="outline">
      <Button 
        variant={selected === 'left' ? 'default' : 'outline'}
        onClick={() => setSelected('left')}
      >
        Left
      </Button>
      <Button 
        variant={selected === 'center' ? 'default' : 'outline'}
        onClick={() => setSelected('center')}
      >
        Center
      </Button>
      <Button 
        variant={selected === 'right' ? 'default' : 'outline'}
        onClick={() => setSelected('right')}
      >
        Right
      </Button>
    </ButtonGroup>
  );
}
```

### Icon Only Buttons

```tsx
import { Bold, Italic, Underline } from 'lucide-react';

<ButtonGroup variant="outline" size="sm">
  <Button size="icon">
    <Bold className="h-4 w-4" />
  </Button>
  <Button size="icon">
    <Italic className="h-4 w-4" />
  </Button>
  <Button size="icon">
    <Underline className="h-4 w-4" />
  </Button>
</ButtonGroup>
```

### Text Formatting Toolbar

```tsx
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify 
} from 'lucide-react';

<ButtonGroup variant="outline" size="sm">
  <Button size="icon">
    <AlignLeft className="h-4 w-4" />
  </Button>
  <Button size="icon">
    <AlignCenter className="h-4 w-4" />
  </Button>
  <Button size="icon">
    <AlignRight className="h-4 w-4" />
  </Button>
  <Button size="icon">
    <AlignJustify className="h-4 w-4" />
  </Button>
</ButtonGroup>
```

### Pagination Controls

```tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

<ButtonGroup variant="outline">
  <Button>
    <ChevronLeft className="h-4 w-4" />
  </Button>
  <Button>1</Button>
  <Button>2</Button>
  <Button>3</Button>
  <Button>
    <ChevronRight className="h-4 w-4" />
  </Button>
</ButtonGroup>
```

### Split Button

```tsx
import { ChevronDown } from 'lucide-react';

<ButtonGroup>
  <Button>Save Changes</Button>
  <Button size="icon">
    <ChevronDown className="h-4 w-4" />
  </Button>
</ButtonGroup>
```

### Color Picker Toolbar

```tsx
<ButtonGroup variant="outline" size="sm">
  <Button className="bg-red-500 hover:bg-red-600" />
  <Button className="bg-blue-500 hover:bg-blue-600" />
  <Button className="bg-green-500 hover:bg-green-600" />
  <Button className="bg-yellow-500 hover:bg-yellow-600" />
  <Button className="bg-purple-500 hover:bg-purple-600" />
</ButtonGroup>
```

### Vertical Action Menu

```tsx
import { Edit, Copy, Trash } from 'lucide-react';

<ButtonGroup orientation="vertical" variant="ghost" fullWidth>
  <Button className="justify-start">
    <Edit className="mr-2 h-4 w-4" />
    Edit
  </Button>
  <Button className="justify-start">
    <Copy className="mr-2 h-4 w-4" />
    Duplicate
  </Button>
  <Button className="justify-start text-destructive">
    <Trash className="mr-2 h-4 w-4" />
    Delete
  </Button>
</ButtonGroup>
```

### Segmented Control

```tsx
function ViewSelector() {
  const [view, setView] = useState('list');

  return (
    <ButtonGroup variant="outline" fullRounded>
      <Button 
        variant={view === 'list' ? 'default' : 'outline'}
        onClick={() => setView('list')}
      >
        List
      </Button>
      <Button 
        variant={view === 'grid' ? 'default' : 'outline'}
        onClick={() => setView('grid')}
      >
        Grid
      </Button>
      <Button 
        variant={view === 'kanban' ? 'default' : 'outline'}
        onClick={() => setView('kanban')}
      >
        Kanban
      </Button>
    </ButtonGroup>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outline" \| "ghost" \| "glass"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size of buttons in group |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction |
| `fullRounded` | `boolean` | `false` | Use fully rounded corners (pill shape) |
| `fullWidth` | `boolean` | `false` | Buttons fill full width |
| `attached` | `boolean` | `true` | Seamless borders between buttons |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | **required** | Button components |

## Context API

ButtonGroup uses React Context to pass props to child buttons automatically:

```tsx
// Size is inherited by all buttons
<ButtonGroup size="lg">
  <Button>Large</Button>
  <Button>Buttons</Button>
</ButtonGroup>

// You can still override individual button props
<ButtonGroup size="md">
  <Button>Medium</Button>
  <Button size="lg">Large Override</Button>
  <Button>Medium</Button>
</ButtonGroup>
```

## Accessibility

The component follows accessibility best practices:

- Uses `role="group"` for semantic grouping
- Preserves all button accessibility features
- Keyboard navigation support (Tab, Arrow keys)
- Focus visible indicators
- Proper ARIA attributes on buttons
- Screen reader friendly
- Touch-friendly tap targets

## Best Practices

1. **Limit Buttons** - Use 2-7 buttons per group for optimal UX
2. **Consistent Actions** - Group related actions together
3. **Clear Labels** - Use concise, descriptive button text
4. **Icon Consistency** - Use icons consistently across the group
5. **State Feedback** - Indicate active/selected states clearly
6. **Responsive** - Consider vertical layout on mobile
7. **Disabled States** - Clearly indicate disabled buttons

## Common Use Cases

### Text Editor Toolbar

```tsx
import { Bold, Italic, Underline, Link } from 'lucide-react';

<div className="flex gap-2">
  <ButtonGroup variant="outline" size="sm">
    <Button size="icon"><Bold className="h-4 w-4" /></Button>
    <Button size="icon"><Italic className="h-4 w-4" /></Button>
    <Button size="icon"><Underline className="h-4 w-4" /></Button>
  </ButtonGroup>
  
  <ButtonGroup variant="outline" size="sm">
    <Button size="icon"><Link className="h-4 w-4" /></Button>
  </ButtonGroup>
</div>
```

### Filter Actions

```tsx
<ButtonGroup variant="outline">
  <Button>All</Button>
  <Button>Active</Button>
  <Button>Completed</Button>
  <Button>Archived</Button>
</ButtonGroup>
```

### Zoom Controls

```tsx
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

<ButtonGroup variant="outline" size="sm">
  <Button size="icon">
    <ZoomOut className="h-4 w-4" />
  </Button>
  <Button>100%</Button>
  <Button size="icon">
    <ZoomIn className="h-4 w-4" />
  </Button>
  <Button size="icon">
    <Maximize className="h-4 w-4" />
  </Button>
</ButtonGroup>
```

## Responsive Design

```tsx
// Horizontal on desktop, vertical on mobile
<ButtonGroup 
  orientation={isMobile ? 'vertical' : 'horizontal'}
  fullWidth={isMobile}
>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
</ButtonGroup>

// Using Tailwind responsive classes
<div className="flex flex-col md:flex-row">
  <ButtonGroup 
    className="w-full md:w-auto"
    fullWidth
  >
    <Button>Option 1</Button>
    <Button>Option 2</Button>
    <Button>Option 3</Button>
  </ButtonGroup>
</div>
```

## Styling

The component uses CVA for variant styling and supports customization:

```tsx
// Custom container styles
<ButtonGroup
  className="bg-muted p-1 rounded-lg"
  variant="ghost"
>
  <Button>Custom</Button>
  <Button>Styled</Button>
  <Button>Group</Button>
</ButtonGroup>

// Custom button styles
<ButtonGroup>
  <Button className="hover:bg-blue-100">Blue</Button>
  <Button className="hover:bg-red-100">Red</Button>
  <Button className="hover:bg-green-100">Green</Button>
</ButtonGroup>
```

## Integration Examples

### With State Management

```tsx
function FilterButtons() {
  const [filter, setFilter] = useAtom(filterAtom);

  return (
    <ButtonGroup variant="outline">
      {['all', 'active', 'completed'].map((value) => (
        <Button
          key={value}
          variant={filter === value ? 'default' : 'outline'}
          onClick={() => setFilter(value)}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Button>
      ))}
    </ButtonGroup>
  );
}
```

### With Form

```tsx
<form>
  <Label>Choose an option</Label>
  <ButtonGroup variant="outline" fullWidth>
    <Button type="button" name="option" value="a">
      Option A
    </Button>
    <Button type="button" name="option" value="b">
      Option B
    </Button>
    <Button type="button" name="option" value="c">
      Option C
    </Button>
  </ButtonGroup>
</form>
```

## Browser Support

Works in all modern browsers that support:
- CSS Grid and Flexbox
- CSS Custom Properties
- Modern JavaScript (ES6+)
- React Context API

## Related Components

- **Button** - Individual button component
- **Toggle** - Single toggle switch
- **ToggleGroup** - Toggle group with selection
- **Segmented** - Segmented control component
- **Tabs** - Tab navigation component