# Glass Variants & Icon Buttons - Quick Reference

## Glass Variant Usage

### Button
```tsx
// Standard glass button
<Button variant="glass">Click Me</Button>

// Icon-only glass button
<Button variant="glass" size="icon">
  <Icon className="w-5 h-5" />
</Button>
```

### Card
```tsx
// Three intensity levels
<Card variant="glass-subtle">Light glass</Card>
<Card variant="glass">Standard glass</Card>
<Card variant="glass-strong">Strong glass</Card>
```

### Badge
```tsx
<Badge variant="glass">New Feature</Badge>
<Badge variant="glass" size="lg">Premium ✨</Badge>
```

### Input
```tsx
<Input 
  variant="glass" 
  placeholder="Search..." 
/>
```

### Alert
```tsx
<Alert variant="glass" status="info">
  Glass style notification
</Alert>
```

## Icon Button Size Variant

### Basic Usage
```tsx
// Primary icon button
<Button variant="primary" size="icon">
  <CheckIcon className="w-5 h-5" />
</Button>

// Ghost icon button (perfect for toolbars)
<Button variant="ghost" size="icon">
  <MenuIcon className="w-5 h-5" />
</Button>

// Glass icon button
<Button variant="glass" size="icon">
  <SettingsIcon className="w-5 h-5" />
</Button>

// Outline icon button
<Button variant="outline" size="icon">
  <HeartIcon className="w-5 h-5" />
</Button>
```

### All Variants
```tsx
<Button variant="primary" size="icon"><Icon /></Button>
<Button variant="secondary" size="icon"><Icon /></Button>
<Button variant="accent" size="icon"><Icon /></Button>
<Button variant="info" size="icon"><Icon /></Button>
<Button variant="success" size="icon"><Icon /></Button>
<Button variant="warning" size="icon"><Icon /></Button>
<Button variant="error" size="icon"><Icon /></Button>
<Button variant="outline" size="icon"><Icon /></Button>
<Button variant="ghost" size="icon"><Icon /></Button>
<Button variant="glass" size="icon"><Icon /></Button>
```

## Common Icon Button Patterns

### Toolbar
```tsx
<div className="flex gap-1">
  <Button variant="ghost" size="icon">
    <EditIcon className="w-5 h-5" />
  </Button>
  <Button variant="ghost" size="icon">
    <TrashIcon className="w-5 h-5" />
  </Button>
  <Button variant="ghost" size="icon">
    <MoreIcon className="w-5 h-5" />
  </Button>
</div>
```

### Card Header Actions
```tsx
<CardHeader>
  <div className="flex justify-between items-center">
    <CardTitle>Title</CardTitle>
    <div className="flex gap-2">
      <Button variant="ghost" size="icon">
        <EditIcon className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon">
        <CloseIcon className="w-5 h-5" />
      </Button>
    </div>
  </div>
</CardHeader>
```

### Dialog Close Button
```tsx
<Dialog>
  <DialogContent>
    <Button 
      variant="ghost" 
      size="icon" 
      className="absolute top-4 right-4"
    >
      <XIcon className="w-5 h-5" />
    </Button>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

### Floating Action Button
```tsx
<Button 
  variant="primary" 
  size="icon" 
  className="fixed bottom-4 right-4 shadow-2xl"
>
  <PlusIcon className="w-5 h-5" />
</Button>
```

### Navigation Actions
```tsx
<div className="flex gap-2">
  <Button variant="ghost" size="icon">
    <ChevronLeftIcon className="w-5 h-5" />
  </Button>
  <Button variant="ghost" size="icon">
    <ChevronRightIcon className="w-5 h-5" />
  </Button>
</div>
```

### Social Media Buttons
```tsx
<div className="flex gap-2">
  <Button variant="glass" size="icon">
    <TwitterIcon className="w-5 h-5" />
  </Button>
  <Button variant="glass" size="icon">
    <FacebookIcon className="w-5 h-5" />
  </Button>
  <Button variant="glass" size="icon">
    <LinkedInIcon className="w-5 h-5" />
  </Button>
</div>
```

## Glass Variant Design Tokens

### Light Mode
- Background: `bg-white/10`
- Border: `border-white/20`
- Backdrop: `backdrop-blur-xl`
- Shadow: `shadow-2xl shadow-black/10`

### Dark Mode
- Background: `bg-black/10`
- Border: `border-white/20` (same)
- Backdrop: `backdrop-blur-xl` (same)
- Shadow: `shadow-2xl shadow-black/10` (same)

### Blur Levels
- `glass-subtle`: `backdrop-blur-md` (bg-white/5)
- `glass`: `backdrop-blur-xl` (bg-white/10)
- `glass-strong`: `backdrop-blur-2xl` (bg-white/15)

## Icon Button Specifications

| Property       | Value         |
|----------------|---------------|
| Width          | `w-10` (40px) |
| Height         | `h-10` (40px) |
| Padding        | `p-0`         |
| Border Radius  | `rounded-xl`  |
| Icon Size      | `w-5 h-5` (20px) |

## Best Practices

### ✅ Do
- Use `size="icon"` for icon-only buttons
- Always include `aria-label` or wrap in Tooltip for accessibility
- Use `w-5 h-5` for icon sizing (20px)
- Use glass variants on gradient/image backgrounds
- Use ghost variant for toolbar icon buttons
- Test in both light and dark modes

### ❌ Don't
- Don't use icon buttons without accessible labels
- Don't use glass on solid color backgrounds
- Don't overuse glass-strong (reserve for emphasis)
- Don't mix different icon sizes in the same context
- Don't forget hover states for interactive elements

## Component Support Matrix

| Component     | Glass Variant | Icon Size |
|---------------|---------------|-----------|
| Button        | ✅            | ✅        |
| Badge         | ✅            | ❌        |
| Card          | ✅ (3 levels) | ❌        |
| Input         | ✅            | ❌        |
| Alert         | ✅            | ❌        |
| Dialog        | ✅            | ❌        |
| Dropdown      | ✅            | ❌        |
| Popover       | ✅            | ❌        |
| Tooltip       | ✅            | ❌        |
| Autocomplete  | ✅            | ❌        |
| ContextMenu   | ✅            | ❌        |

## Icon Size Guidelines

**Recommended icon size for icon buttons:**
- Icon Button: `w-5 h-5` (20px × 20px)
- Button content should be centered automatically

**For regular buttons with text and icons:**
```tsx
<Button variant="primary">
  <SaveIcon className="w-5 h-5 mr-2" />
  Save Changes
</Button>
```

## Complete Examples

### Icon Button Toolbar
```tsx
import Button from '@/components/Button';
import { 
  BoldIcon, 
  ItalicIcon, 
  UnderlineIcon,
  LinkIcon,
  ImageIcon 
} from 'lucide-react';

function EditorToolbar() {
  return (
    <div className="flex gap-1 p-2 border-b">
      <Button variant="ghost" size="icon" aria-label="Bold">
        <BoldIcon className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Italic">
        <ItalicIcon className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Underline">
        <UnderlineIcon className="w-5 h-5" />
      </Button>
      
      <Separator orientation="vertical" className="mx-1" />
      
      <Button variant="ghost" size="icon" aria-label="Insert link">
        <LinkIcon className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Insert image">
        <ImageIcon className="w-5 h-5" />
      </Button>
    </div>
  );
}
```

### Glass Card with Actions
```tsx
import Card, { CardHeader, CardTitle, CardContent } from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';

function GlassCard() {
  return (
    <Card variant="glass" hoverable>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="glass" size="sm">Premium</Badge>
            <CardTitle>Glass Card</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" aria-label="Favorite">
              <HeartIcon className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Share">
              <ShareIcon className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        Beautiful glassmorphism effect with icon buttons
      </CardContent>
    </Card>
  );
}
```

### Mixed Button Sizes
```tsx
<div className="flex gap-4 items-center">
  {/* Regular buttons */}
  <Button variant="primary" size="lg">
    Save Changes
  </Button>
  
  <Button variant="secondary" size="md">
    Cancel
  </Button>
  
  {/* Icon buttons */}
  <Button variant="ghost" size="icon">
    <RefreshIcon className="w-5 h-5" />
  </Button>
  
  <Button variant="ghost" size="icon">
    <SettingsIcon className="w-5 h-5" />
  </Button>
</div>
```

## Accessibility

### Always Include Labels
```tsx
// ✅ Good - With aria-label
<Button variant="ghost" size="icon" aria-label="Close dialog">
  <XIcon className="w-5 h-5" />
</Button>

// ✅ Good - With Tooltip
<Tooltip content="Settings">
  <Button variant="ghost" size="icon">
    <SettingsIcon className="w-5 h-5" />
  </Button>
</Tooltip>

// ✅ Good - With VisuallyHidden
<Button variant="ghost" size="icon">
  <SettingsIcon className="w-5 h-5" />
  <span className="sr-only">Settings</span>
</Button>

// ❌ Bad - No label
<Button variant="ghost" size="icon">
  <SettingsIcon className="w-5 h-5" />
</Button>
```

### Keyboard Navigation
Icon buttons support full keyboard navigation:
- `Tab` / `Shift+Tab`: Navigate between buttons
- `Enter` / `Space`: Activate button
- Focus indicators are visible by default

## Performance Tips

1. **Limit Glass Elements**: Use glass variants strategically (5-7 per view max)
2. **GPU Acceleration**: All transforms use `transform-gpu` automatically
3. **Avoid Nesting**: Don't nest multiple glass elements deeply
4. **Icon Optimization**: Use SVG icons for best performance
5. **Lazy Load**: Consider lazy loading icon libraries

## Migration Guide

### From Custom Icon Buttons
```tsx
// Before
<button className="w-10 h-10 p-0 rounded-lg flex items-center justify-center">
  <Icon />
</button>

// After
<Button variant="ghost" size="icon">
  <Icon className="w-5 h-5" />
</Button>
```

### From Text Buttons to Icon Buttons
```tsx
// Before (text button)
<Button variant="ghost" size="sm">
  <Icon className="w-4 h-4" />
</Button>

// After (icon button)
<Button variant="ghost" size="icon" aria-label="Action name">
  <Icon className="w-5 h-5" />
</Button>
```

## Browser Support

| Feature            | Chrome | Firefox | Safari | Edge |
|--------------------|--------|---------|--------|------|
| Glass Variants     | ✅ 76+ | ✅ 103+ | ✅ 9+  | ✅   |
| Icon Size Variant  | ✅     | ✅      | ✅     | ✅   |
| Backdrop Blur      | ✅ 76+ | ✅ 103+ | ✅ 9+  | ✅   |

## Support

For issues or questions:
- Documentation: `/docs/GLASS_VARIANT_IMPROVEMENTS.md`
- Examples: `/examples/GlassAndIconShowcase.tsx`
- GitHub Issues: [Report a bug](https://github.com/your-repo/issues)