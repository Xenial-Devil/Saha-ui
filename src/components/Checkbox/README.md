# Checkbox

A fully accessible checkbox component with beautiful animations, icons, and multiple variants. Implements the WAI-ARIA checkbox pattern with proper keyboard navigation and screen reader support.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **30+ Color Schemes** - Including 10 gradient options
- 📏 **8 Size Options** - From xs to 4xl for any use case
- ✨ **30+ Check Styles** - star, heart, diamond, shield, lightning, and more
- 🔷 **15 Shape Variants** - rounded, circle, hexagon, diamond, blob, squircle, and more
- 🎭 **14 Animations** - scale, bounce, pulse, jelly, rubberBand, heartbeat, and more
- 🎨 **17 Fill Styles** - filled, outline, gradient, glass, neon, glow, 3d, raised, and more
- 🔲 **Indeterminate State** - Support for partial selection
- 🎴 **Card Layout** - Beautiful card-style checkboxes with images
- 🎯 **Custom Icons** - Use any icon when checked
- 🏷️ **Badges** - Add badges and "Recommended" flags
- 🔄 **Loading State** - Show loading spinner
- 📖 **Read-only Mode** - Non-interactive display
- 💡 **Tooltips** - Built-in tooltip support
- ⌨️ **Keyboard Navigation** - Full keyboard support (Space to toggle)
- 🌗 **Dark Mode** - Automatic dark mode support
- 📦 **Group Management** - CheckboxGroup with advanced features
- 🎛️ **Custom Colors** - Override any color with custom values

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Checkbox } from "saha-ui";

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
```

## Examples

### Variants

```tsx
<Checkbox label="Default" variant="default" />
<Checkbox label="Primary" variant="primary" />
<Checkbox label="Secondary" variant="secondary" />
<Checkbox label="Accent" variant="accent" />
<Checkbox label="Success" variant="success" />
<Checkbox label="Warning" variant="warning" />
<Checkbox label="Error" variant="error" />
```

### Sizes

8 size options from xs to 4xl:

```tsx
<Checkbox label="Extra Small" size="xs" />
<Checkbox label="Small" size="sm" />
<Checkbox label="Medium" size="md" />
<Checkbox label="Large" size="lg" />
<Checkbox label="Extra Large" size="xl" />
<Checkbox label="2X Large" size="2xl" />
<Checkbox label="3X Large" size="3xl" />
<Checkbox label="4X Large" size="4xl" />
```

### Check Styles

30+ check/icon styles when the checkbox is checked:

```tsx
{/* Basic Styles */}
<Checkbox label="Check" checkStyle="check" />
<Checkbox label="Cross" checkStyle="cross" />
<Checkbox label="Dot" checkStyle="dot" />
<Checkbox label="Dash" checkStyle="dash" />
<Checkbox label="Plus" checkStyle="plus" />

{/* Shapes */}
<Checkbox label="Star" checkStyle="star" />
<Checkbox label="Heart" checkStyle="heart" />
<Checkbox label="Diamond" checkStyle="diamond" />
<Checkbox label="Square" checkStyle="square" />
<Checkbox label="Ring" checkStyle="ring" />

{/* Icons */}
<Checkbox label="Shield" checkStyle="shield" />
<Checkbox label="Thumbs Up" checkStyle="thumbsUp" />
<Checkbox label="Lightning" checkStyle="lightning" />
<Checkbox label="Fire" checkStyle="fire" />
<Checkbox label="Leaf" checkStyle="leaf" />
<Checkbox label="Eye" checkStyle="eye" />
<Checkbox label="Lock" checkStyle="lock" />
<Checkbox label="Unlock" checkStyle="unlock" />
<Checkbox label="Bookmark" checkStyle="bookmark" />
<Checkbox label="Flag" checkStyle="flag" />
<Checkbox label="Bell" checkStyle="bell" />
<Checkbox label="Crown" checkStyle="crown" />
<Checkbox label="Zap" checkStyle="zap" />
<Checkbox label="Target" checkStyle="target" />
<Checkbox label="Award" checkStyle="award" />
<Checkbox label="Check Circle" checkStyle="checkCircle" />
<Checkbox label="Check Double" checkStyle="checkDouble" />
```

### Shapes

15 shape variants for the checkbox box:

```tsx
<Checkbox label="Square" shape="square" />
<Checkbox label="Rounded" shape="rounded" />
<Checkbox label="Circle" shape="circle" />
<Checkbox label="Pill" shape="pill" />
<Checkbox label="Rounded Small" shape="roundedSm" />
<Checkbox label="Rounded Large" shape="roundedLg" />
<Checkbox label="Rounded XL" shape="roundedXl" />
<Checkbox label="Diamond" shape="diamond" />
<Checkbox label="Hexagon" shape="hexagon" />
<Checkbox label="Octagon" shape="octagon" />
<Checkbox label="Shield" shape="shield" />
<Checkbox label="Leaf" shape="leaf" />
<Checkbox label="Blob" shape="blob" />
<Checkbox label="Squircle" shape="squircle" />
```

### Animations

14 animation styles when toggling:

```tsx
<Checkbox label="None" animation="none" />
<Checkbox label="Scale" animation="scale" />
<Checkbox label="Bounce" animation="bounce" />
<Checkbox label="Slide" animation="slide" />
<Checkbox label="Fade" animation="fade" />
<Checkbox label="Spin" animation="spin" />
<Checkbox label="Pulse" animation="pulse" />
<Checkbox label="Shake" animation="shake" />
<Checkbox label="Flip" animation="flip" />
<Checkbox label="Jelly" animation="jelly" />
<Checkbox label="Rubber Band" animation="rubberBand" />
<Checkbox label="Swing" animation="swing" />
<Checkbox label="Tada" animation="tada" />
<Checkbox label="Heartbeat" animation="heartbeat" />
```

### Fill Styles

17 fill/border styles for different visual effects:

```tsx
{/* Basic Styles */}
<Checkbox label="Filled" fillStyle="filled" />
<Checkbox label="Outline" fillStyle="outline" />
<Checkbox label="Soft" fillStyle="soft" />
<Checkbox label="Ghost" fillStyle="ghost" />

{/* Gradient & Effects */}
<Checkbox label="Gradient" fillStyle="gradient" colorScheme="gradientSunset" />
<Checkbox label="Glass" fillStyle="glass" />
<Checkbox label="Neon" fillStyle="neon" glowIntensity="lg" />
<Checkbox label="Glow" fillStyle="glow" glowIntensity="md" />

{/* Borders */}
<Checkbox label="Striped" fillStyle="striped" />
<Checkbox label="Dotted" fillStyle="dotted" />
<Checkbox label="Dashed" fillStyle="dashed" />
<Checkbox label="Double" fillStyle="double" />

{/* Depth Effects */}
<Checkbox label="Shadow" fillStyle="shadow" shadowIntensity="lg" />
<Checkbox label="3D" fillStyle="3d" />
<Checkbox label="Inset" fillStyle="inset" />
<Checkbox label="Raised" fillStyle="raised" />
```

### Color Schemes

30+ color schemes including 10 gradient options:

```tsx
{/* Basic Colors */}
<Checkbox label="Default" colorScheme="default" />
<Checkbox label="Primary" colorScheme="primary" />
<Checkbox label="Secondary" colorScheme="secondary" />
<Checkbox label="Accent" colorScheme="accent" />
<Checkbox label="Success" colorScheme="success" />
<Checkbox label="Warning" colorScheme="warning" />
<Checkbox label="Error" colorScheme="error" />
<Checkbox label="Info" colorScheme="info" />

{/* Extended Palette */}
<Checkbox label="Red" colorScheme="red" />
<Checkbox label="Orange" colorScheme="orange" />
<Checkbox label="Amber" colorScheme="amber" />
<Checkbox label="Yellow" colorScheme="yellow" />
<Checkbox label="Lime" colorScheme="lime" />
<Checkbox label="Green" colorScheme="green" />
<Checkbox label="Emerald" colorScheme="emerald" />
<Checkbox label="Teal" colorScheme="teal" />
<Checkbox label="Cyan" colorScheme="cyan" />
<Checkbox label="Sky" colorScheme="sky" />
<Checkbox label="Blue" colorScheme="blue" />
<Checkbox label="Indigo" colorScheme="indigo" />
<Checkbox label="Violet" colorScheme="violet" />
<Checkbox label="Purple" colorScheme="purple" />
<Checkbox label="Fuchsia" colorScheme="fuchsia" />
<Checkbox label="Pink" colorScheme="pink" />
<Checkbox label="Rose" colorScheme="rose" />
<Checkbox label="Slate" colorScheme="slate" />
<Checkbox label="Gray" colorScheme="gray" />
<Checkbox label="Zinc" colorScheme="zinc" />
<Checkbox label="Neutral" colorScheme="neutral" />
<Checkbox label="Stone" colorScheme="stone" />

{/* Gradient Schemes */}
<Checkbox label="Sunset" colorScheme="gradientSunset" fillStyle="gradient" />
<Checkbox label="Ocean" colorScheme="gradientOcean" fillStyle="gradient" />
<Checkbox label="Forest" colorScheme="gradientForest" fillStyle="gradient" />
<Checkbox label="Fire" colorScheme="gradientFire" fillStyle="gradient" />
<Checkbox label="Night" colorScheme="gradientNight" fillStyle="gradient" />
<Checkbox label="Rainbow" colorScheme="gradientRainbow" fillStyle="gradient" />
<Checkbox label="Neon" colorScheme="gradientNeon" fillStyle="gradient" />
<Checkbox label="Pastel" colorScheme="gradientPastel" fillStyle="gradient" />
<Checkbox label="Metallic" colorScheme="gradientMetallic" fillStyle="gradient" />
<Checkbox label="Aurora" colorScheme="gradientAurora" fillStyle="gradient" />
```

### Custom Colors

Override any color with custom values:

```tsx
<Checkbox
  label="Custom Colors"
  checkedColor="#ff6b6b"
  borderColor="#ffd93d"
  checkColor="#ffffff"
  uncheckedColor="#f0f0f0"
  hoverColor="#ff8787"
  focusColor="#ff6b6b"
/>;

{
  /* Custom gradient */
}
<Checkbox
  label="Custom Gradient"
  fillStyle="gradient"
  gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
/>;
```

### With Description

```tsx
<Checkbox
  label="Marketing emails"
  description="Receive promotional emails and product updates"
  helperText="You can unsubscribe at any time"
/>
```

### Indeterminate State

Perfect for "Select All" functionality:

```tsx
function SelectAll() {
  const [items, setItems] = useState([false, false, false]);

  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean);

  return (
    <>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onCheckedChange={(checked) => setItems(items.map(() => checked))}
      />
      {items.map((checked, i) => (
        <Checkbox
          key={i}
          label={`Item ${i + 1}`}
          checked={checked}
          onCheckedChange={(newChecked) => {
            const newItems = [...items];
            newItems[i] = newChecked;
            setItems(newItems);
          }}
        />
      ))}
    </>
  );
}
```

### With Error State

```tsx
<Checkbox
  label="I accept the terms"
  error="You must accept the terms to continue"
  required
  aria-invalid="true"
/>
```

### Card Style

Beautiful card layout for feature selection:

```tsx
<Checkbox
  card
  label="Premium Plan"
  description="Access to all premium features including advanced analytics"
  badge="$29/mo"
  hoverEffect
/>
```

### Card with Image

```tsx
<Checkbox
  card
  image="/images/premium.jpg"
  label="Premium Workspace"
  description="Unlimited projects and team members"
  recommended
/>
```

### Custom Icon

```tsx
import { Heart } from "lucide-react";

<Checkbox label="Add to favorites" icon={<Heart className="fill-current" />} />;
```

### Label Position

```tsx
<Checkbox label="Right (default)" labelPosition="right" />
<Checkbox label="Left" labelPosition="left" />
```

## CheckboxGroup

Group multiple checkboxes with coordinated state management:

### Basic Group

```tsx
import { CheckboxGroup } from "saha-ui";

function Interests() {
  const [selected, setSelected] = useState(["sports"]);

  return (
    <CheckboxGroup
      label="Select your interests"
      description="Choose all that apply"
      value={selected}
      onChange={setSelected}
      options={[
        { label: "Sports", value: "sports" },
        { label: "Music", value: "music" },
        { label: "Movies", value: "movies" },
        { label: "Reading", value: "reading" },
      ]}
    />
  );
}
```

### Horizontal Layout

```tsx
<CheckboxGroup
  label="Preferences"
  direction="horizontal"
  options={[
    { label: "Email", value: "email" },
    { label: "SMS", value: "sms" },
    { label: "Push", value: "push" },
  ]}
/>
```

### Card Group

Perfect for pricing plans or feature selection:

```tsx
<CheckboxGroup
  label="Choose your add-ons"
  card
  options={[
    {
      label: "Extra Storage",
      value: "storage",
      description: "100GB additional cloud storage",
      badge: "+$5/mo",
    },
    {
      label: "Priority Support",
      value: "support",
      description: "24/7 priority customer support",
      badge: "+$10/mo",
      recommended: true,
    },
    {
      label: "Advanced Analytics",
      value: "analytics",
      description: "Detailed insights and reports",
      badge: "+$15/mo",
    },
  ]}
/>
```

### With Validation

```tsx
function Form() {
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (selected.length === 0) {
      setError("Please select at least one option");
    } else {
      setError("");
      // Submit form
    }
  };

  return (
    <CheckboxGroup
      label="Required selection"
      value={selected}
      onChange={(values) => {
        setSelected(values);
        setError("");
      }}
      error={error}
      aria-required="true"
      options={[
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
      ]}
    />
  );
}
```

### With Children

For more control, use children instead of options:

```tsx
<CheckboxGroup
  label="Custom checkboxes"
  value={selected}
  onChange={setSelected}
>
  <Checkbox value="opt1" label="Option 1" />
  <Checkbox value="opt2" label="Option 2" disabled />
  <Checkbox value="opt3" label="Option 3" />
</CheckboxGroup>
```

### Select All Feature

```tsx
<CheckboxGroup
  label="Select your interests"
  value={selected}
  onChange={setSelected}
  showSelectAll
  selectAllLabel="Select All Interests"
  options={[
    { label: "Sports", value: "sports" },
    { label: "Music", value: "music" },
    { label: "Art", value: "art" },
    { label: "Technology", value: "tech" },
  ]}
/>
```

### Min/Max Selection

```tsx
<CheckboxGroup
  label="Choose 2-4 options"
  value={selected}
  onChange={setSelected}
  minSelection={2}
  maxSelection={4}
  showCount
  options={options}
/>
```

### Grid Layout with Columns

```tsx
<CheckboxGroup
  label="Grid layout"
  value={selected}
  onChange={setSelected}
  columns={3}
  gap="lg"
  options={options}
/>
```

### Gap Control

```tsx
<CheckboxGroup
  label="Custom spacing"
  gap="none" // none, xs, sm, md, lg, xl
  options={options}
/>
```

## Accessibility

### Keyboard Navigation

- **Space**: Toggle checkbox state
- **Tab**: Move focus to next checkbox
- **Shift + Tab**: Move focus to previous checkbox

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated IDs for proper associations
<Checkbox
  label="Subscribe to newsletter"
  description="Get weekly updates"
  helperText="You can unsubscribe anytime"
/>
// Automatically creates:
// - Input id: auto-generated
// - aria-describedby links to description and helperText
// - aria-labelledby links to label
```

### Manual ARIA Labels

For checkboxes without visible labels:

```tsx
<Checkbox aria-label="Accept terms and conditions" required />
```

### Error Announcements

Errors are automatically announced to screen readers:

```tsx
<Checkbox
  label="Required field"
  error="This field is required"
  aria-invalid="true"
  // Error has role="alert" and aria-live="polite"
/>
```

### Required Fields

```tsx
<Checkbox
  label="I agree to the terms"
  required
  aria-required="true"
/>

<CheckboxGroup
  label="Select preferences"
  aria-required="true"
  error={validationError}
/>
```

### Indeterminate State

Properly announced to screen readers with aria-checked="mixed":

```tsx
<Checkbox
  label="Select all"
  indeterminate={someChecked && !allChecked}
  // Sets aria-checked="mixed" automatically
/>
```

## API Reference

### Checkbox Props

| Prop                    | Type                                                              | Default     | Description                                   |
| ----------------------- | ----------------------------------------------------------------- | ----------- | --------------------------------------------- |
| `label`                 | `ReactNode`                                                       | -           | Label text for the checkbox                   |
| `description`           | `ReactNode`                                                       | -           | Description text shown below the label        |
| `error`                 | `string`                                                          | -           | Error message to display                      |
| `helperText`            | `string`                                                          | -           | Helper text shown below the checkbox          |
| `labelPosition`         | `'left' \| 'right' \| 'top' \| 'bottom'`                          | `'right'`   | Position of the label                         |
| `variant`               | `CheckboxVariant`                                                 | `'primary'` | Visual variant                                |
| `size`                  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | `'md'`      | Size of the checkbox                          |
| `checkStyle`            | `CheckboxCheckStyle`                                              | `'check'`   | Style of check icon (30+ options)             |
| `shape`                 | `CheckboxShape`                                                   | `'rounded'` | Shape of checkbox box (15 options)            |
| `animation`             | `CheckboxAnimation`                                               | `'scale'`   | Animation style (14 options)                  |
| `fillStyle`             | `CheckboxFillStyle`                                               | `'filled'`  | Fill/border style (17 options)                |
| `colorScheme`           | `CheckboxColorScheme`                                             | `'primary'` | Color scheme (30+ options with gradients)     |
| `checkedColor`          | `string`                                                          | -           | Custom checked background color               |
| `borderColor`           | `string`                                                          | -           | Custom border color                           |
| `checkColor`            | `string`                                                          | -           | Custom check icon color                       |
| `uncheckedColor`        | `string`                                                          | -           | Custom unchecked background color             |
| `hoverColor`            | `string`                                                          | -           | Custom hover color                            |
| `focusColor`            | `string`                                                          | -           | Custom focus ring color                       |
| `gradient`              | `string`                                                          | -           | Custom gradient for gradient fill styles      |
| `shadowIntensity`       | `'sm' \| 'md' \| 'lg' \| 'xl'`                                    | `'md'`      | Shadow intensity for shadow/3d fill styles    |
| `glowIntensity`         | `'sm' \| 'md' \| 'lg' \| 'xl'`                                    | `'md'`      | Glow intensity for neon/glow fill styles      |
| `disabled`              | `boolean`                                                         | `false`     | Whether the checkbox is disabled              |
| `checked`               | `boolean`                                                         | -           | Controlled checked state                      |
| `defaultChecked`        | `boolean`                                                         | `false`     | Default checked state (uncontrolled)          |
| `indeterminate`         | `boolean`                                                         | `false`     | Indeterminate state (partial selection)       |
| `loading`               | `boolean`                                                         | `false`     | Show loading spinner                          |
| `readOnly`              | `boolean`                                                         | `false`     | Read-only state (non-interactive but visible) |
| `required`              | `boolean`                                                         | `false`     | Required field                                |
| `showRequiredIndicator` | `boolean`                                                         | `true`      | Show required asterisk                        |
| `icon`                  | `ReactNode`                                                       | -           | Custom icon to display when checked           |
| `badge`                 | `string \| ReactNode`                                             | -           | Badge to display                              |
| `card`                  | `boolean`                                                         | `false`     | Show in card style                            |
| `hoverEffect`           | `boolean`                                                         | `true`      | Card hover effect                             |
| `recommended`           | `boolean`                                                         | `false`     | Show recommended badge                        |
| `image`                 | `string`                                                          | -           | Image URL for card style                      |
| `tooltip`               | `string`                                                          | -           | Tooltip text                                  |
| `ringEffect`            | `boolean`                                                         | `true`      | Ring/glow effect on focus                     |
| `onChange`              | `(e: ChangeEvent) => void`                                        | -           | Native change handler                         |
| `onCheckedChange`       | `(checked: boolean) => void`                                      | -           | Callback when checked state changes           |
| `wrapperClassName`      | `string`                                                          | -           | Additional class for the wrapper              |
| `labelClassName`        | `string`                                                          | -           | Additional class for the label                |
| `boxClassName`          | `string`                                                          | -           | Additional class for the checkbox box         |
| `aria-label`            | `string`                                                          | -           | Accessible label for screen readers           |
| `aria-labelledby`       | `string`                                                          | -           | ID of element that labels this checkbox       |
| `aria-describedby`      | `string`                                                          | -           | IDs of elements that describe this checkbox   |

### CheckboxGroup Props

| Prop               | Type                                             | Default        | Description                              |
| ------------------ | ------------------------------------------------ | -------------- | ---------------------------------------- |
| `name`             | `string`                                         | -              | Name for the checkbox group              |
| `label`            | `ReactNode`                                      | -              | Label for the group                      |
| `description`      | `ReactNode`                                      | -              | Description for the group                |
| `error`            | `string`                                         | -              | Error message for the group              |
| `helperText`       | `string`                                         | -              | Helper text for the group                |
| `value`            | `string[]`                                       | -              | Selected values (controlled)             |
| `defaultValue`     | `string[]`                                       | -              | Default selected values (uncontrolled)   |
| `onChange`         | `(values: string[]) => void`                     | -              | Callback when selection changes          |
| `direction`        | `'horizontal' \| 'vertical'`                     | `'vertical'`   | Layout direction                         |
| `columns`          | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                     | -              | Number of columns (for grid layout)      |
| `variant`          | `CheckboxProps['variant']`                       | `'primary'`    | Variant for all checkboxes               |
| `size`             | `CheckboxProps['size']`                          | `'md'`         | Size for all checkboxes                  |
| `colorScheme`      | `CheckboxColorScheme`                            | `'primary'`    | Color scheme for all checkboxes          |
| `shape`            | `CheckboxShape`                                  | `'rounded'`    | Shape for all checkboxes                 |
| `checkStyle`       | `CheckboxCheckStyle`                             | `'check'`      | Check style for all checkboxes           |
| `fillStyle`        | `CheckboxFillStyle`                              | `'filled'`     | Fill style for all checkboxes            |
| `animation`        | `CheckboxAnimation`                              | `'scale'`      | Animation for all checkboxes             |
| `card`             | `boolean`                                        | `false`        | Card mode for all checkboxes             |
| `gap`              | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`         | Gap between items                        |
| `showSelectAll`    | `boolean`                                        | `false`        | Show select all checkbox                 |
| `selectAllLabel`   | `string`                                         | `'Select All'` | Select all label                         |
| `minSelection`     | `number`                                         | -              | Minimum required selections              |
| `maxSelection`     | `number`                                         | -              | Maximum allowed selections               |
| `showCount`        | `boolean`                                        | `false`        | Show selection count                     |
| `required`         | `boolean`                                        | `false`        | Required field                           |
| `disabled`         | `boolean`                                        | `false`        | Disabled state for entire group          |
| `options`          | `CheckboxOption[]`                               | -              | Options for the checkbox group           |
| `children`         | `ReactNode`                                      | -              | Children (Checkbox components)           |
| `aria-labelledby`  | `string`                                         | -              | ID of element that labels this group     |
| `aria-describedby` | `string`                                         | -              | IDs of elements that describe this group |
| `aria-required`    | `'true' \| 'false'`                              | -              | Whether the group is required            |

### CheckboxOption

| Prop          | Type                  | Description                         |
| ------------- | --------------------- | ----------------------------------- |
| `label`       | `ReactNode`           | Display label for the checkbox      |
| `value`       | `string`              | Unique value identifier             |
| `description` | `ReactNode`           | Additional descriptive text         |
| `disabled`    | `boolean`             | Whether the checkbox is disabled    |
| `icon`        | `ReactNode`           | Custom icon to display when checked |
| `badge`       | `string \| ReactNode` | Badge to display                    |
| `image`       | `string`              | Image URL for card-style checkboxes |
| `recommended` | `boolean`             | Mark as recommended option          |
| `tooltip`     | `string`              | Tooltip text for the option         |

## Best Practices

### 1. Always Provide Labels

For accessibility, always provide a label (visible or via aria-label):

```tsx
// Good ✅
<Checkbox label="Accept terms" />
<Checkbox aria-label="Accept terms" />

// Bad ❌
<Checkbox />
```

### 2. Use Controlled Components for Forms

```tsx
function Form() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Checkbox
      label="I accept the terms"
      checked={accepted}
      onCheckedChange={setAccepted}
    />
  );
}
```

### 3. Provide Clear Error Messages

```tsx
<Checkbox
  label="Required field"
  error="You must check this box to continue"
  aria-invalid="true"
/>
```

### 4. Use CheckboxGroup for Related Checkboxes

```tsx
// Good ✅
<CheckboxGroup
  label="Preferences"
  options={options}
  value={selected}
  onChange={setSelected}
/>

// Less ideal ❌
<div>
  <Checkbox ... />
  <Checkbox ... />
  <Checkbox ... />
</div>
```

### 5. Use Indeterminate for Select All

```tsx
const allChecked = items.every(Boolean);
const someChecked = items.some(Boolean);

<Checkbox
  label="Select all"
  checked={allChecked}
  indeterminate={someChecked && !allChecked}
/>;
```

### 6. Disable vs Hide

Prefer disabling over hiding to maintain form structure:

```tsx
// Good ✅
<Checkbox label="Option" disabled />;

// Less ideal ❌
{
  canShow && <Checkbox label="Option" />;
}
```

### 7. Card Style for Feature Selection

Use card style when selecting features or plans:

```tsx
<CheckboxGroup
  card
  options={[
    {
      label: "Premium",
      description: "All features",
      badge: "$29/mo",
      recommended: true,
    },
  ]}
/>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxOption,
} from "saha-ui";

const MyCheckbox: React.FC<CheckboxProps> = (props) => {
  return <Checkbox {...props} />;
};

const options: CheckboxOption[] = [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" },
];
```

## Styling

The component uses CVA (Class Variance Authority) for variant management and is fully customizable with Tailwind CSS classes:

```tsx
<Checkbox label="Custom styled" className="my-custom-class" />
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [Radio](../Radio/README.md) - For single selection
- [Switch](../Switch/README.md) - For on/off states
- [Form](../Form/README.md) - For form management
- [Field](../Field/README.md) - For form field wrappers

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI
