# Input

A fully accessible text input component with various types, validation, and rich features. Implements proper ARIA attributes for enhanced screen reader support and form integration.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 🔤 **Input Types** - Text, email, password, number, tel, url, search, and more
- 🎯 **Icons** - Leading and trailing icons support
- 🔒 **Password Toggle** - Built-in show/hide password functionality
- 💫 **Validation** - Built-in validation patterns and custom validation
- 🌗 **Dark Mode** - Automatic dark mode support
- 🔄 **Loading State** - Visual feedback during async operations
- ⌨️ **Keyboard Support** - Full keyboard navigation
- 📋 **Input Addons** - Prefix and suffix support

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Input } from '@saha-ui/core';

function App() {
  const [value, setValue] = useState('');

  return (
    <Input
      label="Email"
      type="email"
      placeholder="you@example.com"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

## Examples

### Variants

```tsx
<Input label="Default" variant="default" />
<Input label="Primary" variant="primary" />
<Input label="Secondary" variant="secondary" />
<Input label="Accent" variant="accent" />
<Input label="Success" variant="success" />
<Input label="Warning" variant="warning" />
<Input label="Error" variant="error" />
```

### Sizes

```tsx
<Input label="Small" size="sm" placeholder="Small input" />
<Input label="Medium" size="md" placeholder="Medium input" />
<Input label="Large" size="lg" placeholder="Large input" />
```

### Input Types

```tsx
// Text (default)
<Input label="Name" type="text" placeholder="John Doe" />

// Email
<Input label="Email" type="email" placeholder="you@example.com" />

// Password
<Input label="Password" type="password" placeholder="••••••••" />

// Number
<Input label="Age" type="number" min={0} max={120} />

// Tel
<Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />

// URL
<Input label="Website" type="url" placeholder="https://example.com" />

// Search
<Input label="Search" type="search" placeholder="Search..." />

// Date
<Input label="Birth date" type="date" />

// Time
<Input label="Appointment" type="time" />

// Color
<Input label="Theme color" type="color" />
```

### With Icons

```tsx
import { Mail, Lock, Search, User } from 'lucide-react';

// Leading icon
<Input
  label="Email"
  placeholder="you@example.com"
  leftIcon={<Mail className="w-4 h-4" />}
/>

// Trailing icon
<Input
  label="Search"
  placeholder="Search..."
  rightIcon={<Search className="w-4 h-4" />}
/>

// Both icons
<Input
  label="Username"
  placeholder="Enter username"
  leftIcon={<User className="w-4 h-4" />}
  rightIcon={<Lock className="w-4 h-4" />}
/>
```

### Password Input with Toggle

```tsx
function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      label="Password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      }
    />
  );
}
```

### With Prefix and Suffix

```tsx
// URL prefix
<Input
  label="Website"
  placeholder="example"
  prefix="https://"
  suffix=".com"
/>

// Currency prefix
<Input
  label="Price"
  type="number"
  placeholder="0.00"
  prefix="$"
/>

// Unit suffix
<Input
  label="Weight"
  type="number"
  placeholder="0"
  suffix="kg"
/>

// Percentage
<Input
  label="Discount"
  type="number"
  min={0}
  max={100}
  suffix="%"
/>
```

### Required Field

```tsx
<Input
  label="Email"
  type="email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!email && submitted ? "Email is required" : undefined}
  aria-required="true"
/>
```

### With Error State

```tsx
<Input
  label="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  error="Username is already taken"
  aria-invalid="true"
/>
```

### With Helper Text

```tsx
<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters with 1 number and 1 special character"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

### Disabled State

```tsx
<Input
  label="Disabled input"
  placeholder="Cannot edit"
  disabled
  value="Disabled value"
/>
```

### Read-only State

```tsx
<Input
  label="Order ID"
  readOnly
  value="ORD-12345"
  helperText="This value cannot be changed"
/>
```

### Loading State

```tsx
<Input
  label="Checking availability"
  placeholder="Enter username"
  loading
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
```

### With Validation

```tsx
function ValidatedInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setError('Email is required');
    } else if (!emailRegex.test(value)) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  };

  return (
    <Input
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={() => validateEmail(email)}
      error={error}
      aria-invalid={!!error}
    />
  );
}
```

### Clearable Input

```tsx
function ClearableInput() {
  const [value, setValue] = useState('');

  return (
    <Input
      label="Search"
      placeholder="Type to search..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rightIcon={
        value && (
          <button
            type="button"
            onClick={() => setValue('')}
            aria-label="Clear input"
          >
            <X className="w-4 h-4" />
          </button>
        )
      }
    />
  );
}
```

### Auto-complete Username

```tsx
<Input
  label="Username"
  type="text"
  autoComplete="username"
  placeholder="Enter username"
/>
```

### Credit Card Input

```tsx
function CreditCardInput() {
  const [cardNumber, setCardNumber] = useState('');

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  return (
    <Input
      label="Card number"
      placeholder="1234 5678 9012 3456"
      value={cardNumber}
      onChange={(e) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted);
      }}
      maxLength={19}
      leftIcon={<CreditCard className="w-4 h-4" />}
    />
  );
}
```

### Phone Number Input

```tsx
function PhoneInput() {
  const [phone, setPhone] = useState('');

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  return (
    <Input
      label="Phone number"
      type="tel"
      placeholder="(555) 000-0000"
      value={phone}
      onChange={(e) => setPhone(formatPhone(e.target.value))}
      leftIcon={<Phone className="w-4 h-4" />}
    />
  );
}
```

### Search with Debounce

```tsx
import { useDebouncedCallback } from 'use-debounce';

function SearchInput() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebouncedCallback(
    async (value: string) => {
      setLoading(true);
      try {
        await searchAPI(value);
      } finally {
        setLoading(false);
      }
    },
    500
  );

  return (
    <Input
      label="Search"
      type="search"
      placeholder="Search products..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        debouncedSearch(e.target.value);
      }}
      loading={loading}
      leftIcon={<Search className="w-4 h-4" />}
    />
  );
}
```

### OTP/PIN Input

```tsx
function OTPInput() {
  const [otp, setOtp] = useState('');

  return (
    <Input
      label="Enter OTP"
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={6}
      placeholder="000000"
      value={otp}
      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
      helperText="Enter the 6-digit code sent to your phone"
    />
  );
}
```

## Accessibility

### Keyboard Navigation

- **Tab**: Move focus to/from input
- **Shift + Tab**: Move focus backwards
- **Ctrl/Cmd + A**: Select all text
- **Escape**: Clear input (for type="search")
- **Arrow Up/Down**: Increment/decrement (for type="number")

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated IDs and ARIA attributes
<Input
  label="Email address"
  description="We'll never share your email"
  helperText="Use your work email"
  error={error}
/>
// Automatically creates:
// - Proper id for input
// - aria-labelledby links to label
// - aria-describedby links to description, helperText, and error
// - aria-invalid when error is present
// - aria-required when required
```

### Manual ARIA Labels

For inputs without visible labels:

```tsx
<Input
  aria-label="Search products"
  type="search"
  placeholder="Search..."
/>
```

### ARIA Descriptions

```tsx
<Input
  label="Password"
  aria-describedby="password-requirements"
  type="password"
/>
<div id="password-requirements">
  Password must be at least 8 characters
</div>
```

### Required Fields

```tsx
<Input
  label="Email"
  type="email"
  required
  aria-required="true"
  error={!email && submitted ? "Email is required" : undefined}
/>
```

### Error Announcements

Errors are automatically announced to screen readers:

```tsx
<Input
  label="Username"
  error="Username is already taken"
  aria-invalid="true"
/>
// Error has role="alert" and aria-live="polite"
```

### Input Type Accessibility

```tsx
// Number input with proper labels
<Input
  label="Quantity"
  type="number"
  min={1}
  max={100}
  aria-valuemin={1}
  aria-valuemax={100}
  aria-valuenow={quantity}
/>
```

## API Reference

### Input Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the input |
| `description` | `string` | - | Description text shown below the label |
| `placeholder` | `string` | - | Placeholder text |
| `helperText` | `string` | - | Helper text shown below the input |
| `error` | `string` | - | Error message to display |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search' \| 'date' \| 'time' \| 'datetime-local' \| 'color'` | `'text'` | Input type |
| `value` | `string \| number` | - | Current value (controlled) |
| `defaultValue` | `string \| number` | - | Default value (uncontrolled) |
| `onChange` | `(e: ChangeEvent) => void` | - | Change event handler |
| `onBlur` | `(e: FocusEvent) => void` | - | Blur event handler |
| `onFocus` | `(e: FocusEvent) => void` | - | Focus event handler |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the input |
| `leftIcon` | `ReactNode` | - | Icon on the left side |
| `rightIcon` | `ReactNode` | - | Icon on the right side |
| `prefix` | `string` | - | Text prefix inside input |
| `suffix` | `string` | - | Text suffix inside input |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readOnly` | `boolean` | `false` | Whether the input is read-only |
| `required` | `boolean` | `false` | Whether the input is required |
| `loading` | `boolean` | `false` | Show loading state |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `autoComplete` | `string` | - | Autocomplete attribute |
| `pattern` | `string` | - | Validation pattern |
| `min` | `number` | - | Minimum value (for number/date types) |
| `max` | `number` | - | Maximum value (for number/date types) |
| `step` | `number` | - | Step increment (for number type) |
| `minLength` | `number` | - | Minimum character length |
| `maxLength` | `number` | - | Maximum character length |
| `inputMode` | `'text' \| 'numeric' \| 'decimal' \| 'tel' \| 'email' \| 'url'` | - | Input mode for mobile keyboards |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label for screen readers |
| `aria-labelledby` | `string` | - | ID of element that labels this input |
| `aria-describedby` | `string` | - | IDs of elements that describe this input |
| `aria-required` | `'true' \| 'false'` | - | Whether the input is required |
| `aria-invalid` | `'true' \| 'false'` | - | Whether the input has an error |

## Best Practices

### 1. Always Provide Labels

For accessibility, always provide a clear label:

```tsx
// Good ✅
<Input label="Email" type="email" />
<Input aria-label="Search" type="search" />

// Bad ❌
<Input type="text" placeholder="Email" />
```

### 2. Use Appropriate Input Types

Choose the correct type for better UX:

```tsx
// Good ✅
<Input label="Email" type="email" />
<Input label="Phone" type="tel" />
<Input label="Website" type="url" />

// Bad ❌
<Input label="Email" type="text" />
```

### 3. Provide Clear Error Messages

```tsx
// Good ✅
<Input
  label="Email"
  error="Please enter a valid email address (e.g., user@example.com)"
/>

// Bad ❌
<Input label="Email" error="Invalid" />
```

### 4. Use Helper Text for Guidance

```tsx
<Input
  label="Password"
  type="password"
  helperText="Must contain at least 8 characters, 1 uppercase, 1 number"
/>
```

### 5. Validate on Blur, Not on Change

```tsx
// Good ✅
<Input
  onChange={(e) => setValue(e.target.value)}
  onBlur={() => validate(value)}
/>

// Less ideal ❌ - Validates while typing
<Input
  onChange={(e) => {
    setValue(e.target.value);
    validate(e.target.value);
  }}
/>
```

### 6. Use Icons to Enhance Clarity

```tsx
<Input
  label="Search"
  leftIcon={<Search />}
  placeholder="Search products..."
/>

<Input
  label="Email"
  type="email"
  leftIcon={<Mail />}
  placeholder="you@example.com"
/>
```

### 7. Provide Autocomplete Attributes

```tsx
<Input label="Email" type="email" autoComplete="email" />
<Input label="First name" autoComplete="given-name" />
<Input label="Last name" autoComplete="family-name" />
<Input label="Password" type="password" autoComplete="current-password" />
```

### 8. Use Appropriate Input Modes

```tsx
// Numeric keyboard on mobile
<Input
  label="Credit card"
  inputMode="numeric"
  pattern="[0-9]*"
/>

// Email keyboard on mobile
<Input
  label="Email"
  type="email"
  inputMode="email"
/>
```

### 9. Show Loading States

```tsx
<Input
  label="Username"
  value={username}
  onChange={checkAvailability}
  loading={checking}
  helperText={checking ? "Checking availability..." : ""}
/>
```

### 10. Group Related Inputs

```tsx
<fieldset>
  <legend>Personal Information</legend>
  <Input label="First name" autoComplete="given-name" />
  <Input label="Last name" autoComplete="family-name" />
  <Input label="Email" type="email" autoComplete="email" />
</fieldset>
```

## Form Integration

### With React Hook Form

```tsx
import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        error={errors.email?.message}
        aria-invalid={!!errors.email}
      />
      
      <Input
        label="Password"
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }
        })}
        error={errors.password?.message}
        aria-invalid={!!errors.password}
      />
    </form>
  );
}
```

### With Formik

```tsx
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too short')
    .required('Required'),
});

function Form() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <>
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : undefined}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password ? errors.password : undefined}
          />
        </>
      )}
    </Formik>
  );
}
```

## Advanced Examples

### Login Form

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<Mail className="w-4 h-4" />}
        autoComplete="email"
        required
      />
      
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock className="w-4 h-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        }
        autoComplete="current-password"
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
```

### Payment Form

```tsx
function PaymentForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <form>
      <Input
        label="Card number"
        placeholder="1234 5678 9012 3456"
        value={cardNumber}
        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
        leftIcon={<CreditCard className="w-4 h-4" />}
        maxLength={19}
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry date"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
          maxLength={5}
          required
        />
        
        <Input
          label="CVV"
          type="password"
          placeholder="123"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          maxLength={4}
          inputMode="numeric"
          required
        />
      </div>
    </form>
  );
}
```

### Address Form

```tsx
function AddressForm() {
  return (
    <form>
      <Input
        label="Street address"
        autoComplete="street-address"
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          autoComplete="address-level2"
          required
        />
        
        <Input
          label="State"
          autoComplete="address-level1"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="ZIP code"
          autoComplete="postal-code"
          inputMode="numeric"
          required
        />
        
        <Input
          label="Country"
          autoComplete="country-name"
          required
        />
      </div>
    </form>
  );
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { InputProps } from '@saha-ui/core';

const MyInput: React.FC<InputProps> = (props) => {
  return <Input {...props} />;
};

// Type-safe event handlers
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setValue(value);
};

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  validate(e.target.value);
};
```

## Styling

The component uses CVA (Class Variance Authority) for variant management:

```tsx
<Input
  label="Custom styled"
  className="font-mono"
  style={{ letterSpacing: '0.05em' }}
/>
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Performance Tips

### 1. Debounce for Search/API Calls

```tsx
const debouncedSearch = useDebouncedCallback(
  (value) => searchAPI(value),
  500
);

<Input onChange={(e) => debouncedSearch(e.target.value)} />
```

### 2. Validate on Blur

```tsx
<Input
  onChange={(e) => setValue(e.target.value)}
  onBlur={() => validate(value)}
/>
```

### 3. Use Uncontrolled for Simple Forms

```tsx
// Controlled (use when you need the value)
<Input value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled (better performance for simple forms)
<Input name="email" defaultValue="" />
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [TextArea](../TextArea/README.md) - For multi-line text
- [Select](../Select/README.md) - For dropdown selection
- [Checkbox](../Checkbox/README.md) - For boolean input
- [Form](../Form/README.md) - For form management
- [Field](../Field/README.md) - For form field wrappers

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI