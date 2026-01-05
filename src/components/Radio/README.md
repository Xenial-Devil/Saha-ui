# Radio

A fully accessible radio button component with beautiful animations and multiple variants. Implements the WAI-ARIA radio group pattern with proper keyboard navigation and screen reader support.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 🎴 **Card Layout** - Beautiful card-style radio buttons with images
- 🎯 **Custom Icons** - Use any icon when selected
- 🏷️ **Badges** - Add badges and "Recommended" flags
- ⌨️ **Keyboard Navigation** - Full keyboard support (Arrow keys, Tab)
- 🌗 **Dark Mode** - Automatic dark mode support
- 📦 **Group Management** - RadioGroup for coordinated state

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Radio, RadioGroup } from "saha-ui";

function App() {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup value={value} onChange={setValue}>
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  );
}
```

## Examples

### Variants

```tsx
<RadioGroup value={value} onChange={setValue}>
  <Radio value="1" label="Default" variant="default" />
  <Radio value="2" label="Primary" variant="primary" />
  <Radio value="3" label="Secondary" variant="secondary" />
  <Radio value="4" label="Accent" variant="accent" />
  <Radio value="5" label="Success" variant="success" />
  <Radio value="6" label="Warning" variant="warning" />
  <Radio value="7" label="Error" variant="error" />
</RadioGroup>
```

### Sizes

```tsx
<RadioGroup value={value} onChange={setValue}>
  <Radio value="sm" label="Small" size="sm" />
  <Radio value="md" label="Medium" size="md" />
  <Radio value="lg" label="Large" size="lg" />
</RadioGroup>
```

### With Descriptions

```tsx
<RadioGroup label="Choose your plan" value={plan} onChange={setPlan}>
  <Radio
    value="basic"
    label="Basic Plan"
    description="Perfect for individuals getting started"
    helperText="$9/month"
  />
  <Radio
    value="pro"
    label="Pro Plan"
    description="For professionals and small teams"
    helperText="$29/month"
  />
  <Radio
    value="enterprise"
    label="Enterprise Plan"
    description="Advanced features for large organizations"
    helperText="Contact us for pricing"
  />
</RadioGroup>
```

### Card Style

Beautiful card layout for feature selection:

```tsx
<RadioGroup
  label="Select your workspace"
  value={workspace}
  onChange={setWorkspace}
>
  <Radio
    card
    value="personal"
    label="Personal"
    description="For individual use and personal projects"
    badge="Free"
  />
  <Radio
    card
    value="team"
    label="Team"
    description="Collaborate with your team members"
    badge="$29/mo"
    recommended
  />
  <Radio
    card
    value="enterprise"
    label="Enterprise"
    description="Advanced security and support"
    badge="Custom"
  />
</RadioGroup>
```

### Card with Images

```tsx
<RadioGroup value={theme} onChange={setTheme}>
  <Radio
    card
    value="light"
    label="Light Theme"
    description="Clean and bright interface"
    image="/images/theme-light.jpg"
  />
  <Radio
    card
    value="dark"
    label="Dark Theme"
    description="Easy on the eyes"
    image="/images/theme-dark.jpg"
    recommended
  />
  <Radio
    card
    value="auto"
    label="Auto"
    description="Matches system preferences"
    image="/images/theme-auto.jpg"
  />
</RadioGroup>
```

### With Custom Icons

```tsx
import { Zap, Shield, Rocket } from "lucide-react";

<RadioGroup value={plan} onChange={setPlan}>
  <Radio value="starter" label="Starter" icon={<Zap />} />
  <Radio value="professional" label="Professional" icon={<Shield />} />
  <Radio value="enterprise" label="Enterprise" icon={<Rocket />} />
</RadioGroup>;
```

### Horizontal Layout

```tsx
<RadioGroup
  label="Select size"
  direction="horizontal"
  value={size}
  onChange={setSize}
>
  <Radio value="xs" label="XS" />
  <Radio value="s" label="S" />
  <Radio value="m" label="M" />
  <Radio value="l" label="L" />
  <Radio value="xl" label="XL" />
</RadioGroup>
```

### With Error State

```tsx
<RadioGroup
  label="Choose payment method"
  value={payment}
  onChange={setPayment}
  error={validationError}
  aria-required="true"
  aria-invalid={!!validationError}
>
  <Radio value="card" label="Credit Card" />
  <Radio value="paypal" label="PayPal" />
  <Radio value="bank" label="Bank Transfer" />
</RadioGroup>
```

### Using Options Array

```tsx
const options = [
  {
    value: "email",
    label: "Email",
    description: "Receive notifications via email",
  },
  {
    value: "sms",
    label: "SMS",
    description: "Get text message alerts",
    badge: "Premium",
  },
  {
    value: "push",
    label: "Push Notifications",
    description: "In-app notifications",
    recommended: true,
  },
];

<RadioGroup
  label="Notification preferences"
  options={options}
  value={notification}
  onChange={setNotification}
/>;
```

### Disabled State

```tsx
<RadioGroup value={value} onChange={setValue}>
  <Radio value="enabled" label="Enabled option" />
  <Radio value="disabled" label="Disabled option" disabled />
  <Radio value="another" label="Another option" />
</RadioGroup>
```

### Label Position

```tsx
<RadioGroup value={value} onChange={setValue}>
  <Radio value="1" label="Right (default)" labelPosition="right" />
  <Radio value="2" label="Left" labelPosition="left" />
</RadioGroup>
```

## RadioGroup Options

### Basic Options

```tsx
<RadioGroup
  label="Choose one"
  value={value}
  onChange={setValue}
  options={[
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3" },
  ]}
/>
```

### Options with Full Features

```tsx
const fullOptions = [
  {
    label: "Basic",
    value: "basic",
    description: "Essential features",
    badge: "$9/mo",
  },
  {
    label: "Pro",
    value: "pro",
    description: "Advanced features",
    badge: "$29/mo",
    recommended: true,
  },
  {
    label: "Enterprise",
    value: "enterprise",
    description: "Full feature set",
    badge: "Custom",
    disabled: true,
  },
];

<RadioGroup
  label="Select plan"
  card
  options={fullOptions}
  value={plan}
  onChange={setPlan}
/>;
```

## Accessibility

### Keyboard Navigation

- **Arrow Up/Down**: Navigate between radio buttons in a vertical group
- **Arrow Left/Right**: Navigate between radio buttons in a horizontal group
- **Tab**: Move focus to/from the radio group
- **Space**: Select the focused radio button

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated IDs for proper associations
<RadioGroup
  label="Select your preference"
  description="Choose one option"
  helperText="This choice is permanent"
  error={error}
>
  <Radio value="opt1" label="Option 1" />
  <Radio value="opt2" label="Option 2" />
</RadioGroup>
// Automatically creates:
// - Group role="radiogroup"
// - Group aria-labelledby links to label
// - Group aria-describedby links to description, helperText, and error
// - Each radio has proper aria-checked state
```

### Manual ARIA Labels

For groups without visible labels:

```tsx
<RadioGroup
  aria-label="Choose your preference"
  value={value}
  onChange={setValue}
>
  <Radio value="opt1" label="Option 1" />
  <Radio value="opt2" label="Option 2" />
</RadioGroup>
```

### Individual Radio ARIA

```tsx
<Radio
  value="option"
  label="Option"
  aria-label="Descriptive label for screen readers"
  aria-describedby="external-description"
/>
```

### Error Announcements

Errors are automatically announced to screen readers:

```tsx
<RadioGroup
  label="Required selection"
  error="Please select an option"
  aria-invalid="true"
  aria-required="true"
>
  <Radio value="opt1" label="Option 1" />
  <Radio value="opt2" label="Option 2" />
</RadioGroup>
// Error has role="alert" and aria-live="polite"
```

### Required Fields

```tsx
<RadioGroup
  label="Payment method"
  required
  aria-required="true"
  error={validationError}
>
  <Radio value="card" label="Credit Card" />
  <Radio value="paypal" label="PayPal" />
</RadioGroup>
```

## API Reference

### Radio Props

| Prop               | Type                                                                                     | Default     | Description                              |
| ------------------ | ---------------------------------------------------------------------------------------- | ----------- | ---------------------------------------- |
| `value`            | `string`                                                                                 | -           | Value of the radio button (required)     |
| `label`            | `string`                                                                                 | -           | Label text for the radio button          |
| `description`      | `string`                                                                                 | -           | Description text shown below the label   |
| `error`            | `string`                                                                                 | -           | Error message to display                 |
| `helperText`       | `string`                                                                                 | -           | Helper text shown below the radio        |
| `labelPosition`    | `'left' \| 'right'`                                                                      | `'right'`   | Position of the label                    |
| `variant`          | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Color variant                            |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                                   | `'md'`      | Size of the radio button                 |
| `disabled`         | `boolean`                                                                                | `false`     | Whether the radio is disabled            |
| `card`             | `boolean`                                                                                | `false`     | Show in card style                       |
| `icon`             | `ReactNode`                                                                              | -           | Custom icon to display when selected     |
| `badge`            | `string \| ReactNode`                                                                    | -           | Badge to display                         |
| `image`            | `string`                                                                                 | -           | Image URL for card style                 |
| `recommended`      | `boolean`                                                                                | `false`     | Show recommended badge                   |
| `hoverEffect`      | `boolean`                                                                                | `true`      | Card hover effect                        |
| `aria-label`       | `string`                                                                                 | -           | Accessible label for screen readers      |
| `aria-labelledby`  | `string`                                                                                 | -           | ID of element that labels this radio     |
| `aria-describedby` | `string`                                                                                 | -           | IDs of elements that describe this radio |

### RadioGroup Props

| Prop               | Type                         | Default        | Description                              |
| ------------------ | ---------------------------- | -------------- | ---------------------------------------- |
| `name`             | `string`                     | auto-generated | Name for the radio group                 |
| `label`            | `string`                     | -              | Label for the group                      |
| `description`      | `string`                     | -              | Description for the group                |
| `error`            | `string`                     | -              | Error message for the group              |
| `helperText`       | `string`                     | -              | Helper text for the group                |
| `value`            | `string`                     | -              | Selected value (controlled)              |
| `defaultValue`     | `string`                     | -              | Default selected value (uncontrolled)    |
| `onChange`         | `(value: string) => void`    | -              | Callback when selection changes          |
| `direction`        | `'horizontal' \| 'vertical'` | `'vertical'`   | Layout direction                         |
| `variant`          | `RadioProps['variant']`      | `'primary'`    | Variant for all radios                   |
| `size`             | `RadioProps['size']`         | `'md'`         | Size for all radios                      |
| `card`             | `boolean`                    | `false`        | Card mode for all radios                 |
| `options`          | `RadioOption[]`              | -              | Options for the radio group              |
| `children`         | `ReactNode`                  | -              | Children (Radio components)              |
| `required`         | `boolean`                    | `false`        | Whether selection is required            |
| `aria-label`       | `string`                     | -              | Accessible label for the group           |
| `aria-labelledby`  | `string`                     | -              | ID of element that labels this group     |
| `aria-describedby` | `string`                     | -              | IDs of elements that describe this group |
| `aria-required`    | `'true' \| 'false'`          | -              | Whether the group is required            |
| `aria-invalid`     | `'true' \| 'false'`          | -              | Whether the group has an error           |

### RadioOption

| Prop          | Type                  | Description                          |
| ------------- | --------------------- | ------------------------------------ |
| `label`       | `string`              | Display label for the radio          |
| `value`       | `string`              | Unique value identifier              |
| `description` | `string`              | Additional descriptive text          |
| `disabled`    | `boolean`             | Whether the radio is disabled        |
| `icon`        | `ReactNode`           | Custom icon to display when selected |
| `badge`       | `string \| ReactNode` | Badge to display                     |
| `image`       | `string`              | Image URL for card-style radios      |
| `recommended` | `boolean`             | Mark as recommended option           |

## Best Practices

### 1. Always Use RadioGroup

Radio buttons should always be part of a RadioGroup:

```tsx
// Good ✅
<RadioGroup value={value} onChange={setValue}>
  <Radio value="opt1" label="Option 1" />
  <Radio value="opt2" label="Option 2" />
</RadioGroup>

// Bad ❌
<Radio value="opt1" label="Option 1" />
<Radio value="opt2" label="Option 2" />
```

### 2. Provide Clear Labels

Always provide clear, descriptive labels:

```tsx
// Good ✅
<RadioGroup label="Select shipping method">
  <Radio value="standard" label="Standard Shipping (5-7 days)" />
  <Radio value="express" label="Express Shipping (2-3 days)" />
</RadioGroup>

// Bad ❌
<RadioGroup>
  <Radio value="1" label="Option 1" />
  <Radio value="2" label="Option 2" />
</RadioGroup>
```

### 3. Use Controlled Components

Prefer controlled components for form handling:

```tsx
function PaymentForm() {
  const [method, setMethod] = useState("card");

  return (
    <RadioGroup label="Payment method" value={method} onChange={setMethod}>
      <Radio value="card" label="Credit Card" />
      <Radio value="paypal" label="PayPal" />
    </RadioGroup>
  );
}
```

### 4. Provide Error Messages

Show clear validation errors:

```tsx
<RadioGroup
  label="Required field"
  value={value}
  onChange={setValue}
  error={!value && submitted ? "Please select an option" : undefined}
  aria-invalid={!value && submitted}
  aria-required="true"
/>
```

### 5. Use Card Style for Complex Options

When options have descriptions or images, use card style:

```tsx
<RadioGroup card options={complexOptions} />
```

### 6. Default Selection

Consider providing a sensible default:

```tsx
<RadioGroup label="Select size" defaultValue="medium" options={sizeOptions} />
```

### 7. Limit Options

Keep the number of radio options manageable (2-7 options). For more options, consider using a Select component:

```tsx
// Good ✅ (Few options)
<RadioGroup options={[
  { label: 'Small', value: 's' },
  { label: 'Medium', value: 'm' },
  { label: 'Large', value: 'l' },
]} />

// Consider Select instead ❌ (Many options)
<RadioGroup options={[
  { label: 'Option 1', value: '1' },
  // ... 20 more options
]} />
```

### 8. Indicate Recommended Options

Help users make decisions:

```tsx
<RadioGroup
  options={[
    { label: "Basic", value: "basic", badge: "$9" },
    { label: "Pro", value: "pro", badge: "$29", recommended: true },
    { label: "Enterprise", value: "enterprise", badge: "$99" },
  ]}
/>
```

## Form Integration

### With React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";

function Form() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="plan"
        control={control}
        rules={{ required: "Please select a plan" }}
        render={({ field, fieldState }) => (
          <RadioGroup
            label="Choose your plan"
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            aria-invalid={!!fieldState.error}
          >
            <Radio value="basic" label="Basic" />
            <Radio value="pro" label="Pro" />
          </RadioGroup>
        )}
      />
    </form>
  );
}
```

### With Formik

```tsx
import { Formik, Field } from "formik";

function Form() {
  return (
    <Formik initialValues={{ plan: "" }} onSubmit={handleSubmit}>
      {({ values, setFieldValue, errors }) => (
        <RadioGroup
          label="Select plan"
          value={values.plan}
          onChange={(value) => setFieldValue("plan", value)}
          error={errors.plan}
        >
          <Radio value="basic" label="Basic" />
          <Radio value="pro" label="Pro" />
        </RadioGroup>
      )}
    </Formik>
  );
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { RadioProps, RadioGroupProps, RadioOption } from "saha-ui";

const MyRadio: React.FC<RadioProps> = (props) => {
  return <Radio {...props} />;
};

const options: RadioOption[] = [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" },
];
```

## Styling

The component uses CVA (Class Variance Authority) for variant management and is fully customizable:

```tsx
<Radio
  value="custom"
  label="Custom styled"
  className="my-custom-class"
/>

<RadioGroup
  className="custom-group-styles"
  value={value}
  onChange={setValue}
>
  <Radio value="opt1" label="Option 1" />
</RadioGroup>
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Comparison: Radio vs Checkbox vs Select

| Use Case                          | Component |
| --------------------------------- | --------- |
| Single selection from 2-7 options | **Radio** |
| Multiple selections               | Checkbox  |
| Single selection from 8+ options  | Select    |
| Binary choice (on/off)            | Switch    |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [Checkbox](../Checkbox/README.md) - For multiple selections
- [Select](../Select/README.md) - For dropdown selection
- [Switch](../Switch/README.md) - For toggle states
- [Form](../Form/README.md) - For form management
- [Field](../Field/README.md) - For form field wrappers

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI
