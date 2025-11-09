# Checkbox

A fully accessible checkbox component with beautiful animations, icons, and multiple variants. Implements the WAI-ARIA checkbox pattern with proper keyboard navigation and screen reader support.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 🔲 **Indeterminate State** - Support for partial selection
- 🎴 **Card Layout** - Beautiful card-style checkboxes with images
- 🎯 **Custom Icons** - Use any icon when checked
- 🏷️ **Badges** - Add badges and "Recommended" flags
- ⌨️ **Keyboard Navigation** - Full keyboard support (Space to toggle)
- 🌗 **Dark Mode** - Automatic dark mode support
- 📦 **Group Management** - CheckboxGroup for coordinated state

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Checkbox } from '@saha-ui/core';

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

```tsx
<Checkbox label="Small" size="sm" />
<Checkbox label="Medium" size="md" />
<Checkbox label="Large" size="lg" />
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
import { Heart } from 'lucide-react';

<Checkbox
  label="Add to favorites"
  icon={<Heart className="fill-current" />}
/>
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
import { CheckboxGroup } from '@saha-ui/core';

function Interests() {
  const [selected, setSelected] = useState(['sports']);

  return (
    <CheckboxGroup
      label="Select your interests"
      description="Choose all that apply"
      value={selected}
      onChange={setSelected}
      options={[
        { label: 'Sports', value: 'sports' },
        { label: 'Music', value: 'music' },
        { label: 'Movies', value: 'movies' },
        { label: 'Reading', value: 'reading' },
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
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push', value: 'push' },
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
      label: 'Extra Storage',
      value: 'storage',
      description: '100GB additional cloud storage',
      badge: '+$5/mo',
    },
    {
      label: 'Priority Support',
      value: 'support',
      description: '24/7 priority customer support',
      badge: '+$10/mo',
      recommended: true,
    },
    {
      label: 'Advanced Analytics',
      value: 'analytics',
      description: 'Detailed insights and reports',
      badge: '+$15/mo',
    },
  ]}
/>
```

### With Validation

```tsx
function Form() {
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (selected.length === 0) {
      setError('Please select at least one option');
    } else {
      setError('');
      // Submit form
    }
  };

  return (
    <CheckboxGroup
      label="Required selection"
      value={selected}
      onChange={(values) => {
        setSelected(values);
        setError('');
      }}
      error={error}
      aria-required="true"
      options={[
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
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
<Checkbox
  aria-label="Accept terms and conditions"
  required
/>
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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the checkbox |
| `description` | `string` | - | Description text shown below the label |
| `error` | `string` | - | Error message to display |
| `helperText` | `string` | - | Helper text shown below the checkbox |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position of the label |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the checkbox |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Default checked state (uncontrolled) |
| `indeterminate` | `boolean` | `false` | Indeterminate state (partial selection) |
| `icon` | `ReactNode` | - | Custom icon to display when checked |
| `badge` | `string \| ReactNode` | - | Badge to display |
| `card` | `boolean` | `false` | Show in card style |
| `hoverEffect` | `boolean` | `true` | Card hover effect |
| `recommended` | `boolean` | `false` | Show recommended badge |
| `image` | `string` | - | Image URL for card style |
| `onChange` | `(e: ChangeEvent) => void` | - | Native change handler |
| `onCheckedChange` | `(checked: boolean) => void` | - | Callback when checked state changes |
| `aria-label` | `string` | - | Accessible label for screen readers |
| `aria-labelledby` | `string` | - | ID of element that labels this checkbox |
| `aria-describedby` | `string` | - | IDs of elements that describe this checkbox |

### CheckboxGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Name for the checkbox group |
| `label` | `string` | - | Label for the group |
| `description` | `string` | - | Description for the group |
| `error` | `string` | - | Error message for the group |
| `helperText` | `string` | - | Helper text for the group |
| `value` | `string[]` | - | Selected values (controlled) |
| `defaultValue` | `string[]` | - | Default selected values (uncontrolled) |
| `onChange` | `(values: string[]) => void` | - | Callback when selection changes |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction |
| `variant` | `CheckboxProps['variant']` | `'primary'` | Variant for all checkboxes |
| `size` | `CheckboxProps['size']` | `'md'` | Size for all checkboxes |
| `card` | `boolean` | `false` | Card mode for all checkboxes |
| `options` | `CheckboxOption[]` | - | Options for the checkbox group |
| `children` | `ReactNode` | - | Children (Checkbox components) |
| `aria-labelledby` | `string` | - | ID of element that labels this group |
| `aria-describedby` | `string` | - | IDs of elements that describe this group |
| `aria-required` | `'true' \| 'false'` | - | Whether the group is required |

### CheckboxOption

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Display label for the checkbox |
| `value` | `string` | Unique value identifier |
| `description` | `string` | Additional descriptive text |
| `disabled` | `boolean` | Whether the checkbox is disabled |
| `icon` | `ReactNode` | Custom icon to display when checked |
| `badge` | `string \| ReactNode` | Badge to display |
| `image` | `string` | Image URL for card-style checkboxes |
| `recommended` | `boolean` | Mark as recommended option |

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
/>
```

### 6. Disable vs Hide

Prefer disabling over hiding to maintain form structure:

```tsx
// Good ✅
<Checkbox label="Option" disabled />

// Less ideal ❌
{canShow && <Checkbox label="Option" />}
```

### 7. Card Style for Feature Selection

Use card style when selecting features or plans:

```tsx
<CheckboxGroup
  card
  options={[
    {
      label: 'Premium',
      description: 'All features',
      badge: '$29/mo',
      recommended: true,
    },
  ]}
/>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { CheckboxProps, CheckboxGroupProps, CheckboxOption } from '@saha-ui/core';

const MyCheckbox: React.FC<CheckboxProps> = (props) => {
  return <Checkbox {...props} />;
};

const options: CheckboxOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
];
```

## Styling

The component uses CVA (Class Variance Authority) for variant management and is fully customizable with Tailwind CSS classes:

```tsx
<Checkbox
  label="Custom styled"
  className="my-custom-class"
/>
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