# Select

A fully accessible select dropdown component with beautiful animations and search functionality. Implements the WAI-ARIA listbox pattern with proper keyboard navigation and screen reader support.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🔍 **Searchable** - Built-in search/filter functionality
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 🏷️ **Multi-Select** - Support for selecting multiple options
- 🎯 **Custom Rendering** - Custom option and value rendering
- 🔖 **Grouping** - Group related options together
- ⌨️ **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape)
- 🌗 **Dark Mode** - Automatic dark mode support
- 🎭 **Placeholder** - Customizable placeholder text
- 🔄 **Async Loading** - Support for loading states

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Select } from '@saha-ui/core';

function App() {
  const [value, setValue] = useState('');

  return (
    <Select
      label="Choose country"
      placeholder="Select a country"
      value={value}
      onChange={setValue}
      options={[
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'ca' },
        { label: 'Australia', value: 'au' },
      ]}
    />
  );
}
```

## Examples

### Variants

```tsx
<Select label="Default" variant="default" options={options} />
<Select label="Primary" variant="primary" options={options} />
<Select label="Secondary" variant="secondary" options={options} />
<Select label="Accent" variant="accent" options={options} />
<Select label="Success" variant="success" options={options} />
<Select label="Warning" variant="warning" options={options} />
<Select label="Error" variant="error" options={options} />
```

### Sizes

```tsx
<Select label="Small" size="sm" options={options} />
<Select label="Medium" size="md" options={options} />
<Select label="Large" size="lg" options={options} />
```

### With Search

Enable searching/filtering of options:

```tsx
<Select
  label="Search countries"
  placeholder="Type to search..."
  searchable
  options={[
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    // ... more options
  ]}
/>
```

### Multi-Select

Allow selecting multiple options:

```tsx
function MultiSelectExample() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <Select
      label="Select skills"
      placeholder="Choose your skills"
      multiple
      value={values}
      onChange={setValues}
      options={[
        { label: 'JavaScript', value: 'js' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
      ]}
    />
  );
}
```

### With Groups

Organize options into groups:

```tsx
<Select
  label="Select framework"
  options={[
    {
      label: 'Frontend',
      options: [
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
      ],
    },
    {
      label: 'Backend',
      options: [
        { label: 'Node.js', value: 'node' },
        { label: 'Django', value: 'django' },
        { label: 'Laravel', value: 'laravel' },
      ],
    },
  ]}
/>
```

### With Descriptions

Add descriptive text to options:

```tsx
<Select
  label="Choose plan"
  options={[
    {
      label: 'Basic',
      value: 'basic',
      description: 'Perfect for individuals',
    },
    {
      label: 'Pro',
      value: 'pro',
      description: 'For professionals and teams',
    },
    {
      label: 'Enterprise',
      value: 'enterprise',
      description: 'Advanced features for large organizations',
    },
  ]}
/>
```

### With Icons

Add icons to options:

```tsx
import { User, Users, Building } from 'lucide-react';

<Select
  label="Account type"
  options={[
    {
      label: 'Personal',
      value: 'personal',
      icon: <User className="w-4 h-4" />,
    },
    {
      label: 'Team',
      value: 'team',
      icon: <Users className="w-4 h-4" />,
    },
    {
      label: 'Enterprise',
      value: 'enterprise',
      icon: <Building className="w-4 h-4" />,
    },
  ]}
/>
```

### With Error State

```tsx
<Select
  label="Required field"
  placeholder="Please select an option"
  value={value}
  onChange={setValue}
  options={options}
  error="This field is required"
  required
  aria-invalid="true"
/>
```

### With Helper Text

```tsx
<Select
  label="Country"
  placeholder="Select your country"
  helperText="Your country determines available shipping options"
  options={countryOptions}
/>
```

### Disabled State

```tsx
<Select
  label="Disabled select"
  placeholder="Cannot select"
  disabled
  options={options}
/>

// Or disable specific options
<Select
  label="Select option"
  options={[
    { label: 'Available', value: 'available' },
    { label: 'Disabled', value: 'disabled', disabled: true },
    { label: 'Another Available', value: 'available2' },
  ]}
/>
```

### Loading State

```tsx
<Select
  label="Loading data"
  placeholder="Loading..."
  loading
  options={[]}
/>
```

### Clearable

Allow clearing the selection:

```tsx
<Select
  label="Clearable select"
  placeholder="Select an option"
  clearable
  value={value}
  onChange={setValue}
  options={options}
/>
```

### Custom Render

Customize how options and values are rendered:

```tsx
<Select
  label="Select user"
  options={users}
  renderOption={(option) => (
    <div className="flex items-center gap-2">
      <img
        src={option.avatar}
        alt={option.label}
        className="w-6 h-6 rounded-full"
      />
      <div>
        <div className="font-medium">{option.label}</div>
        <div className="text-xs text-muted-foreground">{option.email}</div>
      </div>
    </div>
  )}
  renderValue={(option) => (
    <div className="flex items-center gap-2">
      <img
        src={option.avatar}
        alt={option.label}
        className="w-4 h-4 rounded-full"
      />
      <span>{option.label}</span>
    </div>
  )}
/>
```

### Async Options

Load options asynchronously:

```tsx
function AsyncSelect() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOptions = async (searchTerm: string) => {
    setLoading(true);
    try {
      const data = await fetchOptions(searchTerm);
      setOptions(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      label="Search users"
      searchable
      loading={loading}
      options={options}
      onSearch={loadOptions}
    />
  );
}
```

### Controlled vs Uncontrolled

```tsx
// Controlled
<Select
  value={value}
  onChange={setValue}
  options={options}
/>

// Uncontrolled
<Select
  defaultValue="us"
  options={options}
/>
```

## Accessibility

### Keyboard Navigation

- **Arrow Down/Up**: Navigate through options
- **Home**: Jump to first option
- **End**: Jump to last option
- **Enter/Space**: Select highlighted option
- **Escape**: Close dropdown
- **Tab**: Move focus to/from select
- **Type ahead**: Type to find matching options

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated IDs and ARIA attributes
<Select
  label="Choose country"
  description="Your country of residence"
  helperText="Used for shipping calculations"
  error={error}
  options={options}
/>
// Automatically creates:
// - Proper role="listbox" and role="option"
// - aria-labelledby links to label
// - aria-describedby links to description, helperText, and error
// - aria-expanded for dropdown state
// - aria-activedescendant for keyboard navigation
// - aria-multiselectable for multi-select
```

### Manual ARIA Labels

For selects without visible labels:

```tsx
<Select
  aria-label="Choose your country"
  options={options}
/>
```

### Required Fields

```tsx
<Select
  label="Required field"
  required
  aria-required="true"
  error={validationError}
  options={options}
/>
```

### Error Announcements

Errors are automatically announced to screen readers:

```tsx
<Select
  label="Country"
  error="Please select a country"
  aria-invalid="true"
  options={options}
/>
// Error has role="alert" and aria-live="polite"
```

### Multi-Select Accessibility

```tsx
<Select
  label="Select multiple"
  multiple
  aria-multiselectable="true"
  helperText="Use Ctrl/Cmd + Click to select multiple"
  options={options}
/>
```

## API Reference

### Select Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the select |
| `description` | `string` | - | Description text shown below the label |
| `placeholder` | `string` | `'Select...'` | Placeholder text when no value selected |
| `helperText` | `string` | - | Helper text shown below the select |
| `error` | `string` | - | Error message to display |
| `options` | `SelectOption[] \| SelectGroup[]` | `[]` | Options or grouped options |
| `value` | `string \| string[]` | - | Selected value(s) (controlled) |
| `defaultValue` | `string \| string[]` | - | Default value(s) (uncontrolled) |
| `onChange` | `(value: string \| string[]) => void` | - | Callback when selection changes |
| `onSearch` | `(term: string) => void` | - | Callback when search term changes |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the select |
| `multiple` | `boolean` | `false` | Allow multiple selections |
| `searchable` | `boolean` | `false` | Enable search/filter functionality |
| `clearable` | `boolean` | `false` | Show clear button |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `loading` | `boolean` | `false` | Show loading state |
| `required` | `boolean` | `false` | Whether selection is required |
| `renderOption` | `(option: SelectOption) => ReactNode` | - | Custom option renderer |
| `renderValue` | `(option: SelectOption) => ReactNode` | - | Custom value renderer |
| `maxHeight` | `string \| number` | `300` | Max height of dropdown |
| `position` | `'top' \| 'bottom' \| 'auto'` | `'auto'` | Dropdown position |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label for screen readers |
| `aria-labelledby` | `string` | - | ID of element that labels this select |
| `aria-describedby` | `string` | - | IDs of elements that describe this select |
| `aria-required` | `'true' \| 'false'` | - | Whether the select is required |
| `aria-invalid` | `'true' \| 'false'` | - | Whether the select has an error |

### SelectOption

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Display label for the option |
| `value` | `string` | Unique value identifier |
| `description` | `string` | Optional description text |
| `icon` | `ReactNode` | Optional icon |
| `disabled` | `boolean` | Whether the option is disabled |
| `[key: string]` | `any` | Additional custom properties |

### SelectGroup

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Group label |
| `options` | `SelectOption[]` | Options in this group |

## Best Practices

### 1. Provide Clear Labels

Always provide a descriptive label:

```tsx
// Good ✅
<Select label="Shipping country" options={countries} />

// Bad ❌
<Select placeholder="Select" options={countries} />
```

### 2. Use Appropriate Placeholders

```tsx
// Good ✅
<Select placeholder="Select your country" />

// Bad ❌
<Select placeholder="Country" /> // Too generic
```

### 3. Group Related Options

For many options, use groups:

```tsx
<Select
  options={[
    { label: 'Americas', options: americaOptions },
    { label: 'Europe', options: europeOptions },
    { label: 'Asia', options: asiaOptions },
  ]}
/>
```

### 4. Enable Search for Long Lists

Enable search when you have more than 10 options:

```tsx
<Select
  searchable
  options={longListOfOptions}
/>
```

### 5. Provide Default Values

For better UX, provide sensible defaults:

```tsx
<Select
  label="Country"
  defaultValue="us"
  options={countries}
/>
```

### 6. Show Validation Errors Clearly

```tsx
<Select
  label="Required field"
  error={touched && !value ? "Please select an option" : undefined}
  aria-invalid={touched && !value}
/>
```

### 7. Use Helper Text

Provide context when needed:

```tsx
<Select
  label="Currency"
  helperText="This will be used for all transactions"
  options={currencies}
/>
```

### 8. Disable Unavailable Options

Rather than hiding, disable unavailable options:

```tsx
<Select
  options={[
    { label: 'Available', value: 'available' },
    { label: 'Coming Soon', value: 'soon', disabled: true },
  ]}
/>
```

### 9. Use Multi-Select Sparingly

Multi-select can be confusing. Consider alternatives:

```tsx
// If only 2-5 options, use Checkboxes instead
<CheckboxGroup options={options} />

// For many options, use multi-select
<Select multiple options={manyOptions} />
```

### 10. Handle Loading States

```tsx
<Select
  loading={isLoading}
  options={options}
  placeholder={isLoading ? "Loading..." : "Select option"}
/>
```

## Form Integration

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';

function Form() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="country"
        control={control}
        rules={{ required: 'Please select a country' }}
        render={({ field, fieldState }) => (
          <Select
            label="Country"
            value={field.value}
            onChange={field.onChange}
            options={countryOptions}
            error={fieldState.error?.message}
            aria-invalid={!!fieldState.error}
          />
        )}
      />
    </form>
  );
}
```

### With Formik

```tsx
import { Formik, Field } from 'formik';

function Form() {
  return (
    <Formik
      initialValues={{ country: '' }}
      validate={(values) => {
        const errors: any = {};
        if (!values.country) {
          errors.country = 'Required';
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Select
          label="Country"
          value={values.country}
          onChange={(value) => setFieldValue('country', value)}
          options={countryOptions}
          error={touched.country ? errors.country : undefined}
          aria-invalid={touched.country && !!errors.country}
        />
      )}
    </Formik>
  );
}
```

## Advanced Examples

### Dependent Selects

```tsx
function DependentSelects() {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  const stateOptions = country ? getStates(country) : [];

  return (
    <>
      <Select
        label="Country"
        value={country}
        onChange={(value) => {
          setCountry(value);
          setState(''); // Reset state when country changes
        }}
        options={countryOptions}
      />
      
      <Select
        label="State"
        value={state}
        onChange={setState}
        options={stateOptions}
        disabled={!country}
        helperText={!country ? "Please select a country first" : undefined}
      />
    </>
  );
}
```

### With Badges

```tsx
<Select
  label="Select status"
  options={[
    {
      label: 'Active',
      value: 'active',
      badge: <Badge variant="success">Live</Badge>,
    },
    {
      label: 'Pending',
      value: 'pending',
      badge: <Badge variant="warning">Review</Badge>,
    },
    {
      label: 'Inactive',
      value: 'inactive',
      badge: <Badge variant="default">Archived</Badge>,
    },
  ]}
/>
```

### Searchable Multi-Select

```tsx
function Tags() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Select
      label="Tags"
      multiple
      searchable
      clearable
      value={selected}
      onChange={setSelected}
      options={allTags}
      placeholder="Search and select tags..."
      helperText={`${selected.length} tags selected`}
    />
  );
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { SelectProps, SelectOption, SelectGroup } from '@saha-ui/core';

const MySelect: React.FC<SelectProps> = (props) => {
  return <Select {...props} />;
};

const options: SelectOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
];

const groups: SelectGroup[] = [
  {
    label: 'Group 1',
    options: [
      { label: 'Option 1', value: 'opt1' },
    ],
  },
];
```

## Styling

The component uses CVA (Class Variance Authority) for variant management:

```tsx
<Select
  label="Custom styled"
  className="my-custom-class"
  options={options}
/>
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Performance Tips

### 1. Virtualize Long Lists

For very long lists (1000+ items), consider using virtualization:

```tsx
// This component handles virtualization internally
<Select
  searchable
  options={veryLongList}
  virtualized
/>
```

### 2. Debounce Search

For async searches, debounce the input:

```tsx
import { useDebouncedCallback } from 'use-debounce';

const debouncedSearch = useDebouncedCallback(
  (term: string) => fetchOptions(term),
  300
);

<Select
  searchable
  onSearch={debouncedSearch}
  options={options}
/>
```

### 3. Lazy Load Groups

Load group data only when needed:

```tsx
<Select
  options={groups}
  onGroupExpand={(group) => loadGroupOptions(group)}
/>
```

## Comparison: Select vs Other Components

| Use Case | Component |
|----------|-----------|
| 8+ options, single selection | **Select** |
| 8+ options, multiple selections | **Select** (multi) |
| 2-7 options, single selection | Radio |
| 2-7 options, multiple selections | Checkbox |
| Searchable data | **Select** (searchable) |
| Binary choice | Switch |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [NativeSelect](../NativeSelect/README.md) - Native HTML select
- [Combobox](../Combobox/README.md) - Searchable combo box
- [Autocomplete](../Autocomplete/README.md) - Auto-complete input
- [Radio](../Radio/README.md) - For fewer options
- [Checkbox](../Checkbox/README.md) - For multiple selections
- [Form](../Form/README.md) - For form management

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI