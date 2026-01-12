# Form

A comprehensive form component system with built-in validation, error handling, and submission management. Seamlessly integrates with React Hook Form for advanced form state management.

## Features

- ✅ **Validation** - Built-in and custom validation with React Hook Form integration
- ❌ **Error Handling** - Field-level and form-level error messages
- 🎯 **Submission** - Loading states, success/error callbacks, and async support
- 📋 **Field Management** - Automatic field registration and state tracking with FormFieldProvider
- 🎨 **Multiple Variants** - 11+ visual styles (default, primary, accent, glass, etc.)
- 📐 **Flexible Layouts** - Vertical, horizontal, and inline layouts
- 📊 **Progress Tracking** - Built-in form progress indicator
- 📑 **Form Sections** - Collapsible sections with dividers
- ♿ **Accessible** - ARIA labels, error announcements, keyboard navigation

## Installation

```tsx
import {
  Form,
  FormFieldProvider,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  FormSection,
  FormActions,
  FormProgress,
  FormError,
  useFormConfig,
  useFormField,
} from "saha-ui";
```

## Basic Usage

### Simple Form (without React Hook Form)

```tsx
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "saha-ui";
import { Input, Button } from "saha-ui";

function SimpleForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" name="email" />
        </FormControl>
        <FormMessage />
      </FormItem>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

### With React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormFieldProvider,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "saha-ui";
import { Input, Button } from "saha-ui";

function RHFForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        control={form.control}
        name="email"
        rules={{ required: "Email is required" }}
        render={({ field, fieldState }) => (
          <FormFieldProvider name={field.name} error={fieldState.error}>
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormFieldProvider>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

## Components

### Form

The main form wrapper component.

| Prop          | Type                                            | Default           | Description                                          |
| ------------- | ----------------------------------------------- | ----------------- | ---------------------------------------------------- |
| `form`        | `UseFormReturn`                                 | -                 | React Hook Form instance (optional)                  |
| `onSubmit`    | `(data: TFieldValues) => void \| Promise<void>` | -                 | Form submission handler                              |
| `onError`     | `(errors: FieldErrors) => void`                 | -                 | Error callback when validation fails                 |
| `variant`     | `FormVariant`                                   | `"default"`       | Visual style (default, primary, accent, glass, etc.) |
| `size`        | `FormSize`                                      | `"md"`            | Form size (xs, sm, md, lg, xl, 2xl, 3xl, 4xl)        |
| `layout`      | `FormLayout`                                    | `"vertical"`      | Layout type (vertical, horizontal, inline)           |
| `loading`     | `boolean`                                       | `false`           | Shows loading state and disables form                |
| `disabled`    | `boolean`                                       | `false`           | Disables all form fields                             |
| `spacing`     | `FormSpacing`                                   | `"md"`            | Spacing between form items                           |
| `loadingText` | `string`                                        | `"Processing..."` | Text displayed during loading state                  |
| `className`   | `string`                                        | -                 | Additional CSS classes                               |

### FormFieldProvider

Provides field context for error display when using React Hook Form. Use with Controller from RHF.

| Prop        | Type         | Default | Description                                     |
| ----------- | ------------ | ------- | ----------------------------------------------- |
| `name`      | `string`     | -       | Field name for form state                       |
| `error`     | `FieldError` | -       | Field error object from React Hook Form         |
| `isDirty`   | `boolean`    | -       | Whether field has been modified                 |
| `isTouched` | `boolean`    | -       | Whether field has been focused and then blurred |
| `children`  | `ReactNode`  | -       | Form field components (FormItem, etc.)          |

### FormItem

Wrapper for form field groups providing context and styling.

| Prop               | Type          | Default | Description               |
| ------------------ | ------------- | ------- | ------------------------- |
| `variant`          | `FormVariant` | -       | Visual style override     |
| `layout`           | `FormLayout`  | -       | Layout override           |
| `disableAnimation` | `boolean`     | `false` | Disables error animations |
| `className`        | `string`      | -       | Additional CSS classes    |

### FormLabel

Accessible label for form fields with required/optional indicators.

| Prop        | Type          | Default | Description                         |
| ----------- | ------------- | ------- | ----------------------------------- |
| `required`  | `boolean`     | `false` | Shows required asterisk (\*)        |
| `optional`  | `boolean`     | `false` | Shows "(optional)" text             |
| `tooltip`   | `string`      | -       | Tooltip text on hover               |
| `srOnly`    | `boolean`     | `false` | Visually hidden, screen reader only |
| `variant`   | `FormVariant` | -       | Visual style override               |
| `size`      | `FormSize`    | -       | Size override                       |
| `className` | `string`      | -       | Additional CSS classes              |

### FormControl

Wrapper for input elements with automatic props binding.

| Prop        | Type        | Default | Description             |
| ----------- | ----------- | ------- | ----------------------- |
| `className` | `string`    | -       | Additional CSS classes  |
| `children`  | `ReactNode` | -       | Input component to wrap |

Automatically passes `id`, `aria-describedby`, `aria-invalid`, and `disabled` props to child input.

### FormDescription

Helper text displayed below form fields.

| Prop        | Type          | Default | Description            |
| ----------- | ------------- | ------- | ---------------------- |
| `variant`   | `FormVariant` | -       | Visual style override  |
| `size`      | `FormSize`    | -       | Size override          |
| `className` | `string`      | -       | Additional CSS classes |

### FormMessage

Error and validation messages with icons and animations.

| Prop               | Type                   | Default   | Description                                  |
| ------------------ | ---------------------- | --------- | -------------------------------------------- |
| `variant`          | `MessageVariant`       | `"error"` | Message type (error, success, warning, info) |
| `size`             | `FormSize`             | `"sm"`    | Message size                                 |
| `showIcon`         | `boolean`              | `true`    | Shows status icon                            |
| `disableAnimation` | `boolean`              | `false`   | Disables slide-in animation                  |
| `error`            | `string \| FieldError` | -         | Manual error override                        |
| `className`        | `string`               | -         | Additional CSS classes                       |

### FormSection

Collapsible section for grouping related form fields.

| Prop                | Type                           | Default     | Description                          |
| ------------------- | ------------------------------ | ----------- | ------------------------------------ |
| `title`             | `string \| ReactNode`          | -           | Section title                        |
| `description`       | `string \| ReactNode`          | -           | Section description text             |
| `variant`           | `FormVariant`                  | `"default"` | Visual style                         |
| `collapsible`       | `boolean`                      | `false`     | Enables collapse functionality       |
| `defaultCollapsed`  | `boolean`                      | `false`     | Initial collapsed state              |
| `collapsed`         | `boolean`                      | -           | Controlled collapsed state           |
| `onCollapsedChange` | `(collapsed: boolean) => void` | -           | Callback when collapse state changes |
| `divider`           | `boolean`                      | `false`     | Shows divider line                   |
| `icon`              | `ReactNode`                    | -           | Custom icon element                  |
| `className`         | `string`                       | -           | Additional CSS classes               |

### FormActions

Button container for form submit/cancel/reset actions.

| Prop        | Type                            | Default   | Description                     |
| ----------- | ------------------------------- | --------- | ------------------------------- |
| `align`     | `"left" \| "center" \| "right"` | `"right"` | Horizontal alignment of buttons |
| `sticky`    | `boolean`                       | `false`   | Sticks to bottom of viewport    |
| `bordered`  | `boolean`                       | `true`    | Shows top border                |
| `className` | `string`                        | -         | Additional CSS classes          |

### FormProgress

Progress indicator for multi-step forms.

| Prop             | Type                                    | Default     | Description              |
| ---------------- | --------------------------------------- | ----------- | ------------------------ |
| `value`          | `number`                                | -           | Current progress value   |
| `max`            | `number`                                | `100`       | Maximum progress value   |
| `steps`          | `Array<{label: string, value: number}>` | -           | Step configuration array |
| `showPercentage` | `boolean`                               | `false`     | Shows percentage text    |
| `variant`        | `FormVariant`                           | `"default"` | Visual style             |
| `size`           | `FormSize`                              | `"md"`      | Progress bar size        |
| `className`      | `string`                                | -           | Additional CSS classes   |

### FormError

Form-level error summary displaying multiple errors.

| Prop          | Type             | Default                                    | Description                 |
| ------------- | ---------------- | ------------------------------------------ | --------------------------- |
| `title`       | `string`         | `"There were errors with your submission"` | Error title text            |
| `errors`      | `string[]`       | -                                          | Array of error messages     |
| `dismissible` | `boolean`        | `true`                                     | Allows dismissing the error |
| `onDismiss`   | `() => void`     | -                                          | Callback when dismissed     |
| `variant`     | `MessageVariant` | `"error"`                                  | Visual style                |
| `className`   | `string`         | -                                          | Additional CSS classes      |

## Examples

### Form with Variants

```tsx
<Form variant="glass" size="lg" layout="vertical">
  {/* Form fields */}
</Form>
```

### Form with Sections

```tsx
<Form form={form} onSubmit={onSubmit}>
  <FormSection title="Personal Information" collapsible>
    {/* Personal fields */}
  </FormSection>

  <FormSection title="Account Settings" collapsible>
    {/* Account fields */}
  </FormSection>

  <FormActions>
    <Button type="submit">Save Changes</Button>
  </FormActions>
</Form>
```

### Form with Progress

```tsx
const steps = [
  { label: "Personal Info", value: 0 },
  { label: "Account", value: 50 },
  { label: "Confirmation", value: 100 },
];

<Form form={form} onSubmit={onSubmit}>
  <FormProgress value={currentStep} steps={steps} showPercentage />
  {/* Form fields */}
</Form>;
```

## Hooks

### useFormConfig

Access form configuration from context.

```tsx
const { variant, size, layout, disabled, loading } = useFormConfig();
```

### useFormField

Access current field information.

```tsx
const { id, name, error, invalid, isDirty, isTouched, isDisabled } =
  useFormField();
```

## Styling

The Form component uses Tailwind CSS and supports all standard variants:

- `default` - Standard form styling
- `primary` - Primary color scheme
- `secondary` - Secondary color scheme
- `accent` - Accent color scheme
- `success` - Success green theme
- `warning` - Warning yellow theme
- `error` - Error red theme
- `info` - Info blue theme
- `outline` - Outlined style
- `glass` - Glassmorphism effect

## Accessibility

- All form fields have proper ARIA labels
- Error messages are announced to screen readers
- Keyboard navigation fully supported
- Focus management handled automatically
- Required/optional fields clearly indicated

## Related Components

- **Input** - Text input components
- **Button** - Form buttons
- **Select** - Dropdown select
- **Checkbox** - Checkbox inputs
- **Radio** - Radio button groups
- **Switch** - Toggle switches
- **Textarea** - Multi-line text input
