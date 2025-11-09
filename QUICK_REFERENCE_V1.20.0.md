# Quick Reference Guide - Saha UI v1.20.0

## New Components Overview

Four new components added in v1.20.0:

1. **Segmented** - iOS-style segmented control
2. **Affix** - Sticky positioning component
3. **Tour** - Guided product tour
4. **ColorPicker** - Color selection component

---

## Segmented

### Basic Usage
```tsx
import { Segmented } from '@saha-ui/react';

<Segmented
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
  ]}
  value={view}
  onChange={setView}
/>
```

### Key Props
- `options` - Array of `SegmentedOption[]`
- `value` / `defaultValue` - Current/default selection
- `onChange` - `(value: string) => void`
- `variant` - "default" | "outlined" | "filled"
- `size` - "sm" | "md" | "lg"
- `block` - Full width mode
- `disabled` - Disable component

### Common Patterns
```tsx
// With icons
<Segmented
  options={[
    { value: 'list', label: 'List', icon: <List /> },
    { value: 'grid', label: 'Grid', icon: <Grid /> },
  ]}
  value={view}
  onChange={setView}
/>

// Outlined variant
<Segmented options={options} value={value} onChange={setValue} variant="outlined" />

// Block mode
<Segmented options={options} value={value} onChange={setValue} block />

// With disabled options
<Segmented
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B', disabled: true },
    { value: 'c', label: 'Option C' },
  ]}
  value={value}
  onChange={setValue}
/>
```

---

## Affix

### Basic Usage
```tsx
import { Affix } from '@saha-ui/react';

<Affix offsetTop={10}>
  <Button>Sticky Button</Button>
</Affix>
```

### Key Props
- `children` - Content to make sticky
- `offsetTop` - Offset from top (px)
- `offsetBottom` - Offset from bottom (px)
- `target` - Target element for scroll detection
- `onChange` - `(affixed: boolean) => void`
- `zIndex` - z-index for affixed element
- `useSticky` - Use CSS sticky (better performance)

### Common Patterns
```tsx
// Affix to top
<Affix offsetTop={0}>
  <Header />
</Affix>

// Affix to bottom
<Affix offsetBottom={20}>
  <Card>Sticky card</Card>
</Affix>

// With state callback
<Affix
  offsetTop={10}
  onChange={(affixed) => console.log('Affixed:', affixed)}
>
  <Button>Button</Button>
</Affix>

// CSS Sticky mode (better performance)
<Affix offsetTop={0} useSticky>
  <Header />
</Affix>

// Custom target container
<div id="container" style={{ height: 400, overflow: 'auto' }}>
  <Affix offsetTop={0} target={() => document.getElementById('container')}>
    <div>Sticky in container</div>
  </Affix>
</div>
```

---

## Tour

### Basic Usage
```tsx
import { Tour } from '@saha-ui/react';

const [isOpen, setIsOpen] = useState(false);

const steps = [
  {
    id: '1',
    target: '#welcome',
    title: 'Welcome',
    description: 'Get started with our app',
  },
  {
    id: '2',
    target: '#features',
    title: 'Features',
    description: 'Explore features',
  },
];

<Tour
  open={isOpen}
  onClose={() => setIsOpen(false)}
  steps={steps}
/>
```

### Key Props
- `steps` - Array of `TourStep[]`
- `open` - Whether tour is open
- `onClose` - Close callback
- `current` - Current step index (controlled)
- `onChange` - `(current: number) => void`
- `onFinish` - Finish callback
- `placement` - Default placement
- `mask` - Show mask overlay
- `showProgress` - Show progress dots
- `showStepNumbers` - Show step numbers
- `showArrow` - Show arrow

### TourStep Structure
```tsx
interface TourStep {
  id: string;
  target: string | HTMLElement | (() => HTMLElement | null);
  title: React.ReactNode;
  description: React.ReactNode;
  cover?: React.ReactNode;
  placement?: TourPlacement;
  onEnter?: () => void;
  onLeave?: () => void;
}
```

### Placement Options
- `top`, `top-start`, `top-end`
- `bottom`, `bottom-start`, `bottom-end`
- `left`, `left-start`, `left-end`
- `right`, `right-start`, `right-end`
- `center`

### Common Patterns
```tsx
// With custom placements
const steps = [
  {
    id: '1',
    target: '#header',
    title: 'Header',
    description: 'This is the header',
    placement: 'bottom',
  },
  {
    id: '2',
    target: '#sidebar',
    title: 'Sidebar',
    description: 'Navigation',
    placement: 'right',
  },
];

// With cover images
const steps = [
  {
    id: '1',
    target: '#feature',
    title: 'New Feature',
    description: 'Check it out!',
    cover: <img src="/feature.png" alt="Feature" />,
  },
];

// With callbacks
const steps = [
  {
    id: '1',
    target: '#element',
    title: 'Step 1',
    description: 'Description',
    onEnter: () => console.log('Entered'),
    onLeave: () => console.log('Left'),
  },
];

// Controlled mode
const [current, setCurrent] = useState(0);

<Tour
  open={isOpen}
  onClose={handleClose}
  steps={steps}
  current={current}
  onChange={setCurrent}
  onFinish={() => console.log('Done!')}
/>

// Custom buttons
<Tour
  open={isOpen}
  onClose={handleClose}
  steps={steps}
  nextButtonContent="Continue →"
  prevButtonContent="← Back"
  skipButtonContent="Skip"
  finishButtonContent="Get Started!"
/>
```

---

## ColorPicker

### Basic Usage
```tsx
import { ColorPicker } from '@saha-ui/react';

const [color, setColor] = useState('#1890ff');

<ColorPicker
  value={color}
  onChange={setColor}
/>
```

### Key Props
- `value` / `defaultValue` - Current/default color
- `onChange` - `(color: string) => void`
- `format` - "hex" | "rgb" | "hsl" | "hsv"
- `presets` - Array of preset colors
- `showPresets` - Show preset colors
- `size` - "sm" | "md" | "lg"
- `disabled` - Disable picker
- `allowClear` - Show clear button
- `trigger` - Custom trigger element

### PresetColor Structure
```tsx
interface PresetColor {
  color: string;
  label?: string;
}
```

### Common Patterns
```tsx
// With custom presets
const customPresets = [
  { color: '#1890ff', label: 'Primary' },
  { color: '#52c41a', label: 'Success' },
  { color: '#faad14', label: 'Warning' },
  { color: '#f5222d', label: 'Error' },
];

<ColorPicker
  value={color}
  onChange={setColor}
  presets={customPresets}
/>

// With clear button
<ColorPicker value={color} onChange={setColor} allowClear />

// Different sizes
<ColorPicker value={color} onChange={setColor} size="sm" />
<ColorPicker value={color} onChange={setColor} size="md" />
<ColorPicker value={color} onChange={setColor} size="lg" />

// Custom trigger
<ColorPicker
  value={color}
  onChange={setColor}
  trigger={
    <Button>
      <div style={{ width: 16, height: 16, background: color }} />
      Pick Color
    </Button>
  }
/>

// Without presets
<ColorPicker value={color} onChange={setColor} showPresets={false} />

// Grouped presets
const groupedPresets = [
  [
    { color: '#f5222d', label: 'Red' },
    { color: '#fa541c', label: 'Orange' },
  ],
  [
    { color: '#52c41a', label: 'Green' },
    { color: '#1890ff', label: 'Blue' },
  ],
];

<ColorPicker value={color} onChange={setColor} presets={groupedPresets} />
```

---

## Complete Example

```tsx
import {
  Segmented,
  Affix,
  Tour,
  ColorPicker,
} from '@saha-ui/react';
import { useState } from 'react';
import { List, Grid, Settings } from 'lucide-react';

function Dashboard() {
  const [view, setView] = useState('list');
  const [tourOpen, setTourOpen] = useState(false);
  const [themeColor, setThemeColor] = useState('#1890ff');

  const tourSteps = [
    {
      id: '1',
      target: '#view-selector',
      title: 'View Selector',
      description: 'Switch between views',
    },
    {
      id: '2',
      target: '#theme-picker',
      title: 'Theme',
      description: 'Pick your theme color',
    },
    {
      id: '3',
      target: '#toolbar',
      title: 'Toolbar',
      description: 'Stays visible while scrolling',
    },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Sticky Toolbar */}
      <Affix offsetTop={0}>
        <div id="toolbar" className="bg-card shadow-md p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div id="theme-picker">
                <ColorPicker
                  value={themeColor}
                  onChange={setThemeColor}
                  size="sm"
                />
              </div>
              <button onClick={() => setTourOpen(true)}>
                Start Tour
              </button>
            </div>
          </div>
        </div>
      </Affix>

      {/* View Selector */}
      <div id="view-selector" className="mb-6">
        <Segmented
          options={[
            { value: 'list', label: 'List', icon: <List /> },
            { value: 'grid', label: 'Grid', icon: <Grid /> },
            { value: 'settings', label: 'Settings', icon: <Settings /> },
          ]}
          value={view}
          onChange={setView}
          block
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Your content */}
      </div>

      {/* Tour */}
      <Tour
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        steps={tourSteps}
        onFinish={() => {
          console.log('Tour complete!');
          setTourOpen(false);
        }}
      />
    </div>
  );
}
```

---

## Import Paths

```tsx
// Components
import {
  Segmented,
  Affix,
  Tour,
  ColorPicker,
} from '@saha-ui/react';

// Types
import type {
  SegmentedProps,
  SegmentedOption,
  AffixProps,
  TourProps,
  TourStep,
  ColorPickerProps,
  PresetColor,
} from '@saha-ui/react';

// Styles (for customization)
import {
  segmentedVariants,
  affixVariants,
  tourVariants,
  colorPickerVariants,
} from '@saha-ui/react';
```

---

## TypeScript Types

### Segmented
```tsx
interface SegmentedOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

type SegmentedVariant = "default" | "outlined" | "filled";
type SegmentedSize = "sm" | "md" | "lg";
```

### Affix
```tsx
type AffixTarget = Window | HTMLElement | (() => HTMLElement | Window);

interface AffixState {
  affixed: boolean;
  position: "top" | "bottom" | null;
  placeholderHeight: number;
  placeholderWidth: number;
}
```

### Tour
```tsx
interface TourStep {
  id: string;
  target: string | HTMLElement | (() => HTMLElement | null);
  title: React.ReactNode;
  description: React.ReactNode;
  cover?: React.ReactNode;
  placement?: TourPlacement;
  showSkip?: boolean;
  nextButtonText?: string;
  prevButtonText?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}

type TourPlacement =
  | "top" | "top-start" | "top-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "left-start" | "left-end"
  | "right" | "right-start" | "right-end"
  | "center";
```

### ColorPicker
```tsx
interface PresetColor {
  color: string;
  label?: string;
}

type ColorFormat = "hex" | "rgb" | "hsl" | "hsv";
type ColorPickerSize = "sm" | "md" | "lg";
```

---

## Browser Support

✅ Chrome (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Edge (latest)

---

## Performance Tips

**Segmented:**
- Use `animated={false}` for better performance on low-end devices
- Limit options to 5-7 for best UX

**Affix:**
- Use `useSticky={true}` for better performance (CSS sticky)
- Prefer `offsetTop` or `offsetBottom`, not both

**Tour:**
- Keep step count reasonable (5-10 steps max)
- Use `scrollToTarget={false}` if targets are always visible

**ColorPicker:**
- Limit preset colors to 16-24 for best UX
- Use controlled mode for better state management

---

## Accessibility

All components include:
- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support

---

## Version Information

**Version:** 1.20.0  
**Release Date:** November 7, 2025  
**Components Added:** 4  
**Total Code:** 4,000+ lines

---

## Resources

- [Full Documentation](./NEW_COMPONENTS_BATCH4.md)
- [Technical Summary](./COMPONENTS_BATCH4_SUMMARY.md)
- [Previous Batches](./NEW_COMPONENTS_BATCH3.md)

---

**Need help?** Check the full documentation or open an issue on GitHub.