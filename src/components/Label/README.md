# Label

A flexible and accessible label component for form fields. Supports multiple variants, sizes, required/optional indicators, floating labels, and helper text.

## Features

- 🎨 Multiple visual variants (default, primary, secondary, accent, success, warning, error, info, muted, outline, glass)
- 📏 Three sizes (sm, md, lg)
- ✨ Required and optional indicators
- 📍 Position options including floating labels
- 🆘 Help text with tooltip
- ❌ Error state support
- ♿ Full accessibility support
- 🎭 Composable with sub-components
- 📝 Description and error message support

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Label } from '@saha-ui/core';

function MyForm() {
  return (
    <div>
      <Label htmlFor="email">Email Address</Label>
      <input id="email" type="email" />
    </div>
  );
}
```

## Required Field

```tsx
<Label htmlFor="username" required>
  Username
</Label>
```

## Optional Field

```tsx
<Label htmlFor="nickname" optional>
  Nickname
</Label>
```

## Variants

### Default

```tsx
<Label variant="default">Default Label</Label>
```

### Primary

```tsx
<Label variant="primary">Primary Label</Label>
```

### Error

```tsx
<Label variant="error">Error Label</Label>
```

### Success

```tsx
<Label variant="success">Success Label</Label>
```

### Warning

```tsx
<Label variant="warning">Warning Label</Label>
```

### Muted

```tsx
<Label variant="muted">Muted Label</Label>
```

### Glass

```tsx
<Label variant="glass">Glass Label</Label>
```

## Sizes

```tsx
<Label size="sm">Small Label</Label>
<Label size="md">Medium Label</Label>
<Label size="lg">Large Label</Label>
```

## With Description

```tsx
<div className="space-y-1">
  <Label htmlFor="email" required>
    Email Address
  </Label>
  <span className="text-sm text-muted-foreground">
    We'll never share your email with anyone else.
  </span>
  <input id="email" type="email" />
</div>
```

## With Help Text

```tsx
<Label 
  htmlFor="password"
  showHelp
  helpText="Must be at least 8 characters long"
>
  Password
</Label>
```

## Error State

```tsx
<Label htmlFor="email" error>
  Email Address
</Label>
```

## Disabled State

```tsx
<Label htmlFor="field" disabled>
  Disabled Field
</Label>
```

## Floating Label

```tsx
<div className="relative">
  <input 
    id="floating"
    type="text"
    className="peer"
    placeholder=" "
  />
  <Label 
    htmlFor="floating"
    position="floating"
  >
    Floating Label
  </Label>
</div>
```

## Custom Indicators

```tsx
<Label 
  htmlFor="field"
  required
  requiredIndicator={<span className="text-red-500">*</span>}
>
  Custom Required Indicator
</Label>

<Label 
  htmlFor="field"
  optional
  optionalIndicator={<span className="text-gray-400">(opt.)</span>}
>
  Custom Optional Indicator
</Label>
```

## API Reference

### Label Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | - | ID of the form element |
| `children` | `ReactNode` | - | **Required.** Label text |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'muted' \| 'outline' \| 'glass'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the label |
| `position` | `'top' \| 'left' \| 'right' \| 'floating'` | `'top'` | Label position |
| `required` | `boolean` | `false` | Show required indicator |
| `optional` | `boolean` | `false` | Show optional indicator |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean` | `false` | Error state |
| `showHelp` | `boolean` | `false` | Show help icon |
| `helpText` | `string` | - | Help text for tooltip |
| `requiredIndicator` | `ReactNode` | `'*'` | Custom required indicator |
| `optionalIndicator` | `ReactNode` | `'(optional)'` | Custom optional indicator |
| `className` | `string` | - | Additional CSS classes |

## Common Patterns

### Complete Form Field

```tsx
function FormField() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="space-y-1">
      <Label 
        htmlFor="username" 
        required
        error={!!error}
      >
        Username
      </Label>
      <input
        id="username"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={error ? 'border-red-500' : ''}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}
```

### Form with Multiple Fields

```tsx
function RegistrationForm() {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="firstName" required>
          First Name
        </Label>
        <input id="firstName" type="text" />
      </div>

      <div>
        <Label htmlFor="lastName" required>
          Last Name
        </Label>
        <input id="lastName" type="text" />
      </div>

      <div>
        <Label htmlFor="email" required>
          Email Address
        </Label>
        <input id="email" type="email" />
      </div>

      <div>
        <Label htmlFor="phone" optional>
          Phone Number
        </Label>
        <input id="phone" type="tel" />
      </div>
    </form>
  );
}
```

### Label with Validation

```tsx
function ValidatedField() {
  const [value, setValue] = useState('');
  const isValid = value.length >= 3;

  return (
    <div>
      <Label 
        htmlFor="field"
        variant={isValid ? 'success' : 'error'}
        required
      >
        Username (min 3 characters)
      </Label>
      <input
        id="field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {!isValid && value.length > 0 && (
        <span className="text-sm text-error">
          Username must be at least 3 characters
        </span>
      )}
    </div>
  );
}
```

### Inline Labels

```tsx
<div className="flex items-center gap-2">
  <Label htmlFor="remember" className="mb-0">
    Remember me
  </Label>
  <input id="remember" type="checkbox" />
</div>
```

### Label Group

```tsx
<fieldset>
  <legend>
    <Label variant="primary" size="lg">
      Personal Information
    </Label>
  </legend>
  
  <div className="space-y-4 mt-4">
    <div>
      <Label htmlFor="name" required>Name</Label>
      <input id="name" type="text" />
    </div>
    
    <div>
      <Label htmlFor="age">Age</Label>
      <input id="age" type="number" />
    </div>
  </div>
</fieldset>
```

### With Tooltip Help

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from '@saha-ui/core';

<div className="flex items-center gap-2">
  <Label htmlFor="apiKey" required>
    API Key
  </Label>
  <Tooltip>
    <TooltipTrigger>
      <HelpCircle className="w-4 h-4 text-muted-foreground" />
    </TooltipTrigger>
    <TooltipContent>
      Your API key can be found in your account settings
    </TooltipContent>
  </Tooltip>
</div>
```

## Accessibility

The Label component follows accessibility best practices:

- **Semantic HTML:**
  - Uses native `<label>` element
  - Proper `htmlFor` attribute connects to input
  - Screen readers announce label text
  
- **Visual Indicators:**
  - Required and optional states clearly marked
  - Error states have distinct styling
  - Disabled state reduces opacity
  
- **ARIA Attributes:**
  - Labels are properly associated with inputs
  - Help text uses `aria-describedby`
  - Error messages use `aria-invalid`

### Best Practices

```tsx
// Good: Label is properly associated
<Label htmlFor="email">Email</Label>
<input id="email" type="email" />

// Bad: No association
<span>Email</span>
<input type="email" />

// Good: Clear indication of required field
<Label htmlFor="name" required>
  Full Name
</Label>

// Good: Help text for complex fields
<Label 
  htmlFor="password"
  showHelp
  helpText="Must include uppercase, lowercase, and numbers"
>
  Password
</Label>
```

## Styling

### Custom Styles

```tsx
<Label 
  htmlFor="field"
  className="text-lg font-bold text-primary"
>
  Custom Styled Label
</Label>
```

### Responsive Sizing

```tsx
<Label 
  htmlFor="field"
  className="text-sm sm:text-base lg:text-lg"
>
  Responsive Label
</Label>
```

## Best Practices

1. **Always Use htmlFor:** Connect labels to inputs for accessibility
2. **Mark Required Fields:** Use `required` prop for mandatory fields
3. **Provide Help Text:** Add help text for complex or unclear fields
4. **Clear Error Messages:** Use error state with descriptive messages
5. **Consistent Sizing:** Use the same size for labels in a form
6. **Group Related Fields:** Use fieldsets and legends for related inputs
7. **Avoid Placeholder-Only:** Don't rely solely on placeholders; use labels
8. **Mobile Friendly:** Ensure labels are readable on small screens

## Form Integration

### With React Hook Form

```tsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, formState: { errors } } = useForm();

  return (
    <form>
      <div>
        <Label 
          htmlFor="email" 
          required
          error={!!errors.email}
        >
          Email Address
        </Label>
        <input
          id="email"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <span className="text-sm text-error">
            Email is required
          </span>
        )}
      </div>
    </form>
  );
}
```

### With Formik

```tsx
import { useFormik } from 'formik';

function MyForm() {
  const formik = useFormik({
    initialValues: { email: '' },
    validate: values => {
      const errors = {};
      if (!values.email) errors.email = 'Required';
      return errors;
    },
    onSubmit: values => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Label 
          htmlFor="email"
          required
          error={formik.touched.email && !!formik.errors.email}
        >
          Email
        </Label>
        <input
          id="email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-sm text-error">
            {formik.errors.email}
          </span>
        )}
      </div>
    </form>
  );
}
```

## Related Components

- **Input** - Text input fields
- **Field** - Complete form field with label, input, and error
- **FormControl** - Wrapper for form elements
- **Tooltip** - For help text tooltips
- **Typography** - For text styling

## Changelog

- **v1.0.0** - Initial release with all variants and features