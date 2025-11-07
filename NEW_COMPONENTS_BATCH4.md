# New Components - Batch 4

This document provides comprehensive documentation for the 4 new components added in version 1.20.0.

## Table of Contents

1. [Segmented](#segmented)
2. [Affix](#affix)
3. [Tour](#tour)
4. [ColorPicker](#colorpicker)

---

## Segmented

An iOS-style segmented control component with animated indicator. Perfect for switching between views or filtering options with a smooth, modern interface.

### Features

- ✨ Animated sliding indicator
- ⌨️ Full keyboard navigation (Arrow keys, Home, End)
- 🎨 3 visual variants (default, outlined, filled)
- 📐 3 size variants (sm, md, lg)
- 🌓 Dark mode support
- ♿ Full accessibility with ARIA attributes
- 🎯 Block mode for full-width display
- 🔄 Controlled and uncontrolled modes
- 📱 Responsive design

### Basic Usage

```tsx
import { Segmented } from '@saha-ui/react';

function MyComponent() {
  const [view, setView] = useState('list');

  return (
    <Segmented
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
        { value: 'table', label: 'Table' },
      ]}
      value={view}
      onChange={setView}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SegmentedOption[]` | - | Array of options to display |
| `value` | `string` | - | Currently selected value (controlled) |
| `defaultValue` | `string` | - | Default value (uncontrolled mode) |
| `onChange` | `(value: string) => void` | - | Callback when selection changes |
| `variant` | `"default" \| "outlined" \| "filled"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the segmented control |
| `block` | `boolean` | `false` | Whether to take up full width |
| `disabled` | `boolean` | `false` | Whether the component is disabled |
| `animated` | `boolean` | `true` | Whether to show animated transition |

### SegmentedOption Structure

```tsx
interface SegmentedOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}
```

### Advanced Examples

#### With Icons

```tsx
import { List, Grid, Table } from 'lucide-react';

<Segmented
  options={[
    { value: 'list', label: 'List', icon: <List /> },
    { value: 'grid', label: 'Grid', icon: <Grid /> },
    { value: 'table', label: 'Table', icon: <Table /> },
  ]}
  value={view}
  onChange={setView}
/>
```

#### Different Variants

```tsx
// Outlined variant
<Segmented
  options={options}
  value={value}
  onChange={setValue}
  variant="outlined"
/>

// Filled variant
<Segmented
  options={options}
  value={value}
  onChange={setValue}
  variant="filled"
/>
```

#### Block Mode (Full Width)

```tsx
<Segmented
  options={options}
  value={value}
  onChange={setValue}
  block
/>
```

#### With Disabled Options

```tsx
<Segmented
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' },
  ]}
  value={value}
  onChange={setValue}
/>
```

#### Different Sizes

```tsx
<Segmented options={options} value={value} onChange={setValue} size="sm" />
<Segmented options={options} value={value} onChange={setValue} size="md" />
<Segmented options={options} value={value} onChange={setValue} size="lg" />
```

---

## Affix

A component that makes elements stick to the viewport when scrolling. Perfect for sticky headers, navigation bars, or floating action buttons.

### Features

- 📌 Top and bottom positioning
- 🎯 Custom offset values
- 🎨 CSS sticky or fixed positioning modes
- 🔄 Scroll event detection
- 📱 Responsive and performant
- 🌓 Dark mode support
- ♿ Accessibility support
- 🎭 Custom target containers
- 🔔 onChange callback for state changes

### Basic Usage

```tsx
import { Affix } from '@saha-ui/react';

function MyComponent() {
  return (
    <Affix offsetTop={10}>
      <Button>Sticky Button</Button>
    </Affix>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Children to be affixed |
| `offsetTop` | `number` | - | Offset from top (enables top affixing) |
| `offsetBottom` | `number` | - | Offset from bottom (enables bottom affixing) |
| `target` | `AffixTarget` | `window` | Target element to listen for scroll |
| `onChange` | `(affixed: boolean) => void` | - | Callback when affix state changes |
| `zIndex` | `number` | `10` | z-index value for affixed element |
| `useSticky` | `boolean` | `false` | Use CSS position: sticky |

### Advanced Examples

#### Affix to Top

```tsx
<Affix offsetTop={0}>
  <Header>
    <Navigation />
  </Header>
</Affix>
```

#### Affix to Bottom

```tsx
<Affix offsetBottom={20}>
  <Card>
    <p>This card sticks to the bottom</p>
  </Card>
</Affix>
```

#### With Custom Target Container

```tsx
<div id="scrollable-container" style={{ height: '400px', overflow: 'auto' }}>
  <Affix offsetTop={0} target={() => document.getElementById('scrollable-container')}>
    <div>Sticky within container</div>
  </Affix>
  {/* Long content */}
</div>
```

#### With State Change Callback

```tsx
const [isAffixed, setIsAffixed] = useState(false);

<Affix
  offsetTop={10}
  onChange={(affixed) => {
    setIsAffixed(affixed);
    console.log('Affixed:', affixed);
  }}
>
  <Button variant={isAffixed ? 'filled' : 'outlined'}>
    {isAffixed ? 'Sticky' : 'Normal'}
  </Button>
</Affix>
```

#### Using CSS Sticky (Better Performance)

```tsx
<Affix offsetTop={0} useSticky>
  <Header />
</Affix>
```

#### Custom z-index

```tsx
<Affix offsetTop={10} zIndex={100}>
  <div>High priority sticky element</div>
</Affix>
```

---

## Tour

A guided tour component for onboarding and feature discovery. Shows step-by-step instructions with spotlight effect on target elements.

### Features

- 🎯 Element spotlighting with mask overlay
- 📍 12 placement options for popovers
- 🎨 Multiple mask styles (default, rounded, rect)
- 🔢 Progress indicators with dots
- ⌨️ Keyboard navigation (Escape to close)
- 🔄 Step callbacks (onEnter, onLeave)
- 📱 Responsive positioning
- 🌓 Dark mode support
- ♿ Full accessibility
- 🎭 Custom button content
- 🖼️ Support for cover images
- 🎨 Customizable arrow indicators

### Basic Usage

```tsx
import { Tour } from '@saha-ui/react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      id: '1',
      target: '#welcome',
      title: 'Welcome!',
      description: 'Let us show you around our app.',
    },
    {
      id: '2',
      target: '#features',
      title: 'Amazing Features',
      description: 'Check out all the cool features we offer.',
    },
    {
      id: '3',
      target: '#settings',
      title: 'Settings',
      description: 'Customize your experience here.',
    },
  ];

  return (
    <Tour
      open={isOpen}
      onClose={() => setIsOpen(false)}
      steps={steps}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `TourStep[]` | - | Array of tour steps |
| `open` | `boolean` | - | Whether the tour is open |
| `onClose` | `() => void` | - | Callback when tour is closed |
| `current` | `number` | - | Current step index (controlled) |
| `onChange` | `(current: number) => void` | - | Callback when step changes |
| `onFinish` | `() => void` | - | Callback when tour is finished |
| `placement` | `TourPlacement` | `"bottom"` | Default placement for popovers |
| `mask` | `boolean` | `true` | Whether to show mask overlay |
| `maskStyle` | `"default" \| "rounded" \| "rect"` | `"default"` | Mask style |
| `maskClosable` | `boolean` | `true` | Whether mask is closable |
| `closeOnEsc` | `boolean` | `true` | Close tour on ESC key |
| `showProgress` | `boolean` | `true` | Show progress dots |
| `showStepNumbers` | `boolean` | `true` | Show step numbers |
| `showArrow` | `boolean` | `true` | Show arrow pointing to target |
| `gap` | `number` | `8` | Gap between popover and target |
| `scrollToTarget` | `boolean` | `true` | Scroll to target element |
| `zIndex` | `number` | `1000` | z-index for tour components |

### TourStep Structure

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
```

### Placement Options

- `top`, `top-start`, `top-end`
- `bottom`, `bottom-start`, `bottom-end`
- `left`, `left-start`, `left-end`
- `right`, `right-start`, `right-end`
- `center`

### Advanced Examples

#### With Custom Placements

```tsx
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
    description: 'Navigation is here',
    placement: 'right',
  },
];

<Tour open={isOpen} onClose={handleClose} steps={steps} />
```

#### With Cover Images

```tsx
const steps = [
  {
    id: '1',
    target: '#feature',
    title: 'New Feature',
    description: 'Check out our latest feature!',
    cover: <img src="/feature.png" alt="Feature" />,
  },
];
```

#### With Step Callbacks

```tsx
const steps = [
  {
    id: '1',
    target: '#element',
    title: 'Step 1',
    description: 'Description',
    onEnter: () => console.log('Entered step 1'),
    onLeave: () => console.log('Left step 1'),
  },
];
```

#### Controlled Mode

```tsx
const [currentStep, setCurrentStep] = useState(0);

<Tour
  open={isOpen}
  onClose={handleClose}
  steps={steps}
  current={currentStep}
  onChange={setCurrentStep}
  onFinish={() => {
    console.log('Tour completed!');
    setIsOpen(false);
  }}
/>
```

#### Custom Button Content

```tsx
<Tour
  open={isOpen}
  onClose={handleClose}
  steps={steps}
  nextButtonContent="Continue →"
  prevButtonContent="← Go Back"
  skipButtonContent="Skip Tour"
  finishButtonContent="Get Started!"
/>
```

#### Without Mask

```tsx
<Tour
  open={isOpen}
  onClose={handleClose}
  steps={steps}
  mask={false}
/>
```

---

## ColorPicker

A color picker component with preset colors and hex input. Perfect for theme customization and design tools.

### Features

- 🎨 Hex color format support
- 🎯 Preset color swatches
- 📝 Direct hex input
- 🗑️ Optional clear button
- 📐 3 size variants (sm, md, lg)
- 🎭 Custom trigger support
- 📍 Multiple placement options
- 🌓 Dark mode support
- ♿ Accessibility support
- 🔄 Controlled and uncontrolled modes
- 🎨 Default color palette included

### Basic Usage

```tsx
import { ColorPicker } from '@saha-ui/react';

function MyComponent() {
  const [color, setColor] = useState('#1890ff');

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current color value (controlled) |
| `defaultValue` | `string` | `"#000000"` | Default color (uncontrolled) |
| `onChange` | `(color: string) => void` | - | Callback when color changes |
| `format` | `"hex" \| "rgb" \| "hsl" \| "hsv"` | `"hex"` | Color format |
| `showFormatSwitch` | `boolean` | `false` | Show format switch button |
| `disableAlpha` | `boolean` | `false` | Disable alpha channel |
| `presets` | `PresetColor[]` | Default presets | Array of preset colors |
| `showPresets` | `boolean` | `true` | Whether to show presets |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the color picker |
| `disabled` | `boolean` | `false` | Whether picker is disabled |
| `placement` | `string` | `"bottom-start"` | Placement of popover |
| `allowClear` | `boolean` | `false` | Show clear button |

### PresetColor Structure

```tsx
interface PresetColor {
  color: string;
  label?: string;
}
```

### Default Preset Colors

The component includes 16 default preset colors:
- Red, Orange, Gold, Yellow
- Green, Cyan, Blue, Purple
- Violet, Magenta
- Black, White
- 4 shades of Gray

### Advanced Examples

#### With Custom Presets

```tsx
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
```

#### With Clear Button

```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  allowClear
/>
```

#### Different Sizes

```tsx
<ColorPicker value={color} onChange={setColor} size="sm" />
<ColorPicker value={color} onChange={setColor} size="md" />
<ColorPicker value={color} onChange={setColor} size="lg" />
```

#### Custom Trigger

```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  trigger={
    <Button>
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          background: color,
        }}
      />
      Pick Color
    </Button>
  }
/>
```

#### Without Presets

```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  showPresets={false}
/>
```

#### Grouped Presets

```tsx
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

<ColorPicker
  value={color}
  onChange={setColor}
  presets={groupedPresets}
/>
```

---

## Complete Example

Here's a comprehensive example using all 4 components together:

```tsx
import {
  Segmented,
  Affix,
  Tour,
  ColorPicker,
} from '@saha-ui/react';
import { useState } from 'react';
import { Settings, Bell, User } from 'lucide-react';

function Dashboard() {
  const [view, setView] = useState('overview');
  const [tourOpen, setTourOpen] = useState(false);
  const [themeColor, setThemeColor] = useState('#1890ff');

  const tourSteps = [
    {
      id: '1',
      target: '#view-selector',
      title: 'View Selector',
      description: 'Switch between different views using this segmented control.',
    },
    {
      id: '2',
      target: '#theme-picker',
      title: 'Theme Customization',
      description: 'Pick your favorite color to customize the theme.',
    },
    {
      id: '3',
      target: '#toolbar',
      title: 'Sticky Toolbar',
      description: 'This toolbar stays visible as you scroll.',
    },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Sticky Toolbar */}
      <Affix offsetTop={0}>
        <div
          id="toolbar"
          className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg mb-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              {/* Color Picker */}
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
            { value: 'overview', label: 'Overview', icon: <Settings /> },
            { value: 'notifications', label: 'Notifications', icon: <Bell /> },
            { value: 'profile', label: 'Profile', icon: <User /> },
          ]}
          value={view}
          onChange={setView}
          block
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Your content here */}
      </div>

      {/* Tour */}
      <Tour
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        steps={tourSteps}
        onFinish={() => {
          console.log('Tour completed!');
          setTourOpen(false);
        }}
      />
    </div>
  );
}
```

---

## Styling and Customization

All components support:

- 🎨 Custom className props
- 🌓 Dark mode out of the box
- 📐 Responsive design
- 🎭 CVA-based variants
- 💅 Tailwind CSS utilities
- 🎯 Custom styling via className

Example of custom styling:

```tsx
<Segmented
  options={options}
  value={value}
  onChange={setValue}
  className="bg-gradient-to-r from-blue-500 to-purple-500"
  optionClassName="text-white"
/>
```

---

## Accessibility

All components are built with accessibility in mind:

- ♿ Semantic HTML
- ⌨️ Keyboard navigation
- 🔊 Screen reader support
- 🎯 ARIA attributes
- 🔍 Focus management

---

## TypeScript Support

All components are fully typed with comprehensive TypeScript definitions:

```tsx
import type {
  SegmentedProps,
  SegmentedOption,
  AffixProps,
  TourProps,
  TourStep,
  ColorPickerProps,
  PresetColor,
} from '@saha-ui/react';
```

---

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

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
- Optimize step callbacks for performance

**ColorPicker:**
- Limit preset colors to 16-24 for best UX
- Use controlled mode for better state management

---

## Next Steps

1. Check out the [Interactive Examples](./examples)
2. Read the [API Documentation](./api)
3. Explore [Component Patterns](./patterns)
4. Join our [Discord Community](https://discord.gg/saha-ui)

---

**Version:** 1.20.0  
**Last Updated:** November 7, 2025  
**Components:** Segmented, Affix, Tour, ColorPicker