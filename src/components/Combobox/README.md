# Combobox

A fully accessible combobox component that combines a text input with a searchable dropdown. Implements the WAI-ARIA combobox pattern with proper keyboard navigation and screen reader support.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 🔍 **Searchable** - Built-in search and filter functionality
- 🎯 **Smart Dropdown** - Intelligent suggestion list
- ⌨️ **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape)
- 🌗 **Dark Mode** - Automatic dark mode support
- 🔄 **Async Loading** - Support for async data sources
- 🎭 **Custom Rendering** - Custom option and badge rendering
- 💫 **Rich Options** - Support for icons, descriptions, and badges
- 📦 **Flexible** - Controlled and uncontrolled modes

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Combobox } from 'saha-ui';

function App() {
  const [value, setValue] = useState('');
  
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ];

  return (
    <Combobox
      label="Select framework"
      placeholder="Search frameworks..."
      options={options}
      value={value}
      onChange={setValue}
    />
  );
}
```

## Examples

### Variants

```tsx
<Combobox label="Default" variant="default" options={options} />
<Combobox label="Primary" variant="primary" options={options} />
<Combobox label="Secondary" variant="secondary" options={options} />
<Combobox label="Accent" variant="accent" options={options} />
<Combobox label="Success" variant="success" options={options} />
<Combobox label="Warning" variant="warning" options={options} />
<Combobox label="Error" variant="error" options={options} />
```

### Sizes

```tsx
<Combobox label="Small" size="sm" options={options} />
<Combobox label="Medium" size="md" options={options} />
<Combobox label="Large" size="lg" options={options} />
```

### With Icons

Add icons to options for better visual identification:

```tsx
import { Code, Database, Server, Globe } from 'lucide-react';

const options = [
  { label: 'Frontend', value: 'frontend', icon: <Code /> },
  { label: 'Backend', value: 'backend', icon: <Server /> },
  { label: 'Database', value: 'database', icon: <Database /> },
  { label: 'API', value: 'api', icon: <Globe /> },
];

<Combobox
  label="Select technology"
  options={options}
  renderOption={(option) => (
    <div className="flex items-center gap-2">
      {option.icon}
      <span>{option.label}</span>
    </div>
  )}
/>
```

### With Descriptions

```tsx
const options = [
  {
    label: 'TypeScript',
    value: 'ts',
    description: 'Typed superset of JavaScript',
  },
  {
    label: 'JavaScript',
    value: 'js',
    description: 'High-level programming language',
  },
  {
    label: 'Python',
    value: 'py',
    description: 'Easy to learn and powerful',
  },
];

<Combobox
  label="Programming language"
  options={options}
  renderOption={(option) => (
    <div>
      <div className="font-medium">{option.label}</div>
      <div className="text-sm text-muted-foreground">
        {option.description}
      </div>
    </div>
  )}
/>
```

### With Badges

```tsx
const options = [
  { label: 'Free Plan', value: 'free', badge: 'Popular' },
  { label: 'Pro Plan', value: 'pro', badge: 'Recommended' },
  { label: 'Enterprise', value: 'enterprise', badge: 'Custom' },
];

<Combobox
  label="Select plan"
  options={options}
  renderOption={(option) => (
    <div className="flex items-center justify-between">
      <span>{option.label}</span>
      {option.badge && (
        <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded">
          {option.badge}
        </span>
      )}
    </div>
  )}
/>
```

### Grouped Options

Organize options into categories:

```tsx
const groupedOptions = [
  {
    label: 'Programming Languages',
    options: [
      { label: 'JavaScript', value: 'js' },
      { label: 'Python', value: 'py' },
      { label: 'Java', value: 'java' },
    ],
  },
  {
    label: 'Frameworks',
    options: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
    ],
  },
];

<Combobox
  label="Select technology"
  options={groupedOptions}
  grouped
/>
```

### Async Loading

Load options from an API:

```tsx
function AsyncCombobox() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const searchOptions = async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const results = await searchAPI(searchTerm);
      setOptions(results);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebouncedCallback(searchOptions, 300);

  return (
    <Combobox
      label="Search items"
      placeholder="Type at least 2 characters..."
      options={options}
      value={query}
      onChange={setQuery}
      onInputChange={debouncedSearch}
      loading={loading}
      noOptionsText={
        query.length < 2 
          ? "Type at least 2 characters" 
          : "No results found"
      }
    />
  );
}
```

### With Validation

```tsx
function ValidatedCombobox() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validate = (val: string) => {
    if (!val) {
      setError('Please select an option');
    } else if (!options.some(opt => opt.value === val)) {
      setError('Invalid selection');
    } else {
      setError('');
    }
  };

  return (
    <Combobox
      label="Required field"
      options={options}
      value={value}
      onChange={(val) => {
        setValue(val);
        validate(val);
      }}
      onBlur={() => validate(value)}
      error={error}
      required
      aria-invalid={!!error}
    />
  );
}
```

### Clearable

```tsx
<Combobox
  label="Select option"
  options={options}
  value={value}
  onChange={setValue}
  clearable
  placeholder="Select or search..."
/>
```

### Disabled State

```tsx
<Combobox
  label="Disabled combobox"
  options={options}
  disabled
  value="Disabled value"
  helperText="This field is currently disabled"
/>
```

### Read-only State

```tsx
<Combobox
  label="Read-only field"
  readOnly
  value={selectedValue}
  options={options}
  helperText="This value cannot be changed"
/>
```

### Custom Filter

Implement custom filtering logic:

```tsx
<Combobox
  label="Search"
  options={options}
  filterOptions={(options, inputValue) => {
    const query = inputValue.toLowerCase();
    return options.filter(option =>
      option.label.toLowerCase().includes(query) ||
      option.value.toLowerCase().includes(query) ||
      option.description?.toLowerCase().includes(query)
    );
  }}
/>
```

### No Options Message

```tsx
<Combobox
  label="Search"
  options={options}
  noOptionsText="No items match your search"
  emptyText="No items available"
/>
```

### Country Selector

```tsx
const countries = [
  { label: 'United States', value: 'us', flag: '🇺🇸', code: '+1' },
  { label: 'United Kingdom', value: 'uk', flag: '🇬🇧', code: '+44' },
  { label: 'Canada', value: 'ca', flag: '🇨🇦', code: '+1' },
  { label: 'Australia', value: 'au', flag: '🇦🇺', code: '+61' },
];

<Combobox
  label="Country"
  placeholder="Search countries..."
  options={countries}
  renderOption={(option) => (
    <div className="flex items-center gap-2">
      <span className="text-xl">{option.flag}</span>
      <div className="flex-1">
        <div>{option.label}</div>
        <div className="text-sm text-muted-foreground">{option.code}</div>
      </div>
    </div>
  )}
  renderValue={(option) => (
    <div className="flex items-center gap-2">
      <span>{option.flag}</span>
      <span>{option.label}</span>
    </div>
  )}
/>
```

### Tag Selector

```tsx
function TagCombobox() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const availableTags = tags.filter(
    tag => !selectedTags.includes(tag.value)
  );

  const handleSelect = (value: string) => {
    setSelectedTags([...selectedTags, value]);
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map(tag => (
          <span
            key={tag}
            className="px-2 py-1 bg-primary/20 text-primary rounded-md flex items-center gap-1"
          >
            {tag}
            <button onClick={() => removeTag(tag)}>×</button>
          </span>
        ))}
      </div>
      
      <Combobox
        label="Add tags"
        placeholder="Search tags..."
        options={availableTags}
        value={inputValue}
        onChange={handleSelect}
        onInputChange={setInputValue}
      />
    </div>
  );
}
```

### Status Selector

```tsx
const statuses = [
  { label: 'To Do', value: 'todo', color: 'gray' },
  { label: 'In Progress', value: 'progress', color: 'blue' },
  { label: 'Review', value: 'review', color: 'yellow' },
  { label: 'Done', value: 'done', color: 'green' },
];

<Combobox
  label="Status"
  options={statuses}
  renderOption={(option) => (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full bg-${option.color}-500`}
      />
      <span>{option.label}</span>
    </div>
  )}
/>
```

### User Selector

```tsx
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg',
    role: 'Developer',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '/avatars/jane.jpg',
    role: 'Designer',
  },
];

<Combobox
  label="Assign to"
  placeholder="Search users..."
  options={users}
  getOptionLabel={(user) => user.name}
  getOptionValue={(user) => user.email}
  renderOption={(user) => (
    <div className="flex items-center gap-3 p-2">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-8 h-8 rounded-full"
      />
      <div>
        <div className="font-medium">{user.name}</div>
        <div className="text-sm text-muted-foreground">{user.role}</div>
      </div>
    </div>
  )}
/>
```

## Accessibility

### Keyboard Navigation

- **Arrow Down**: Open dropdown / Navigate to next option
- **Arrow Up**: Navigate to previous option
- **Enter**: Select highlighted option
- **Escape**: Close dropdown / Clear input
- **Tab**: Move focus away (closes dropdown)
- **Home**: Jump to first option
- **End**: Jump to last option
- **Type**: Filter options by typing

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated IDs and ARIA attributes
<Combobox
  label="Select country"
  description="Choose your country of residence"
  helperText="This affects shipping options"
  error={error}
/>
// Automatically creates:
// - role="combobox" for the input
// - role="listbox" for the dropdown
// - role="option" for each option
// - aria-expanded for dropdown state
// - aria-activedescendant for highlighted option
// - aria-autocomplete="list"
// - aria-controls links to listbox
// - aria-labelledby links to label
// - aria-describedby links to description, helperText, and error
```

### Manual ARIA Labels

For combobox without visible labels:

```tsx
<Combobox
  aria-label="Select option"
  placeholder="Search..."
  options={options}
/>
```

### Required Fields

```tsx
<Combobox
  label="Required selection"
  required
  aria-required="true"
  error={!value && submitted ? "Selection is required" : undefined}
/>
```

### Error Announcements

Errors are automatically announced to screen readers:

```tsx
<Combobox
  label="Country"
  error="Please select a valid country"
  aria-invalid="true"
/>
// Error has role="alert" and aria-live="polite"
```

### Loading State Accessibility

```tsx
<Combobox
  loading={true}
  loadingText="Loading options..."
  aria-busy="true"
  aria-live="polite"
/>
```

### Group Labels

```tsx
<Combobox
  grouped
  options={groupedOptions}
  // Groups have role="group" with aria-labelledby
/>
```

## API Reference

### Combobox Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the combobox |
| `description` | `string` | - | Description text shown below the label |
| `placeholder` | `string` | - | Placeholder text |
| `helperText` | `string` | - | Helper text shown below the input |
| `error` | `string` | - | Error message to display |
| `options` | `T[] \| GroupedOptions<T>[]` | `[]` | Array of options or grouped options |
| `value` | `string` | - | Selected value (controlled) |
| `defaultValue` | `string` | - | Default value (uncontrolled) |
| `onChange` | `(value: string) => void` | - | Callback when selection changes |
| `onInputChange` | `(value: string) => void` | - | Callback when input value changes |
| `onBlur` | `(e: FocusEvent) => void` | - | Blur event handler |
| `onFocus` | `(e: FocusEvent) => void` | - | Focus event handler |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the combobox |
| `grouped` | `boolean` | `false` | Options are grouped |
| `clearable` | `boolean` | `false` | Show clear button |
| `disabled` | `boolean` | `false` | Whether the combobox is disabled |
| `readOnly` | `boolean` | `false` | Whether the combobox is read-only |
| `loading` | `boolean` | `false` | Show loading state |
| `required` | `boolean` | `false` | Whether selection is required |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `leftIcon` | `ReactNode` | - | Icon on the left side |
| `rightIcon` | `ReactNode` | - | Icon on the right side |
| `getOptionLabel` | `(option: T) => string` | - | Get display label from option |
| `getOptionValue` | `(option: T) => string` | - | Get value from option |
| `filterOptions` | `(options: T[], inputValue: string) => T[]` | - | Custom filter function |
| `renderOption` | `(option: T) => ReactNode` | - | Custom option renderer |
| `renderValue` | `(option: T) => ReactNode` | - | Custom selected value renderer |
| `noOptionsText` | `string` | `'No options'` | Text when no options match |
| `emptyText` | `string` | `'No options available'` | Text when options array is empty |
| `loadingText` | `string` | `'Loading...'` | Text when loading |
| `openOnFocus` | `boolean` | `false` | Open dropdown on focus |
| `selectOnFocus` | `boolean` | `false` | Select text on focus |
| `clearOnEscape` | `boolean` | `true` | Clear input on Escape key |
| `maxHeight` | `number \| string` | `300` | Max height of dropdown |
| `position` | `'top' \| 'bottom' \| 'auto'` | `'auto'` | Dropdown position |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label for screen readers |
| `aria-labelledby` | `string` | - | ID of element that labels this combobox |
| `aria-describedby` | `string` | - | IDs of elements that describe this combobox |

### ComboboxOption

```tsx
interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
  description?: string;
  icon?: ReactNode;
  [key: string]: any; // Additional custom properties
}
```

### ComboboxGroup

```tsx
interface ComboboxGroup<T> {
  label: string;
  options: T[];
}
```

## Best Practices

### 1. Always Provide Labels

For accessibility, always provide a clear label:

```tsx
// Good ✅
<Combobox label="Country" options={countries} />
<Combobox aria-label="Search" options={items} />

// Bad ❌
<Combobox placeholder="Search" options={items} />
```

### 2. Use Appropriate Placeholders

```tsx
// Good ✅
<Combobox placeholder="Search or select..." />

// Bad ❌
<Combobox placeholder="Select" />
```

### 3. Debounce Async Searches

```tsx
const debouncedSearch = useDebouncedCallback(
  (query) => searchAPI(query),
  300
);

<Combobox onInputChange={debouncedSearch} />
```

### 4. Provide Clear "No Options" Messages

```tsx
<Combobox
  noOptionsText={query ? "No results found" : "Start typing to search"}
  emptyText="No items available"
/>
```

### 5. Show Loading States

```tsx
<Combobox
  loading={isLoading}
  loadingText="Searching..."
  options={results}
/>
```

### 6. Use Groups for Organization

```tsx
// Good ✅ - Organized by category
<Combobox grouped options={groupedOptions} />

// Less ideal ❌ - Long flat list
<Combobox options={longFlatList} />
```

### 7. Implement Proper Validation

```tsx
<Combobox
  value={value}
  onChange={setValue}
  onBlur={() => validate(value)}
  error={error}
  required
/>
```

### 8. Use Icons for Context

```tsx
<Combobox
  label="Search locations"
  leftIcon={<MapPin />}
  options={locations}
/>
```

### 9. Disable Unavailable Options

```tsx
const options = [
  { label: 'Available', value: 'available' },
  { label: 'Coming Soon', value: 'soon', disabled: true },
];

<Combobox options={options} />
```

### 10. Handle Empty States

```tsx
<Combobox
  options={options}
  emptyText="No data available"
  noOptionsText="No matches found"
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
        name="framework"
        control={control}
        rules={{ required: 'Framework is required' }}
        render={({ field, fieldState }) => (
          <Combobox
            label="Framework"
            options={frameworks}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
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
import { Formik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  category: Yup.string().required('Required'),
});

function Form() {
  return (
    <Formik
      initialValues={{ category: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Combobox
          label="Category"
          options={categories}
          value={values.category}
          onChange={(value) => setFieldValue('category', value)}
          error={touched.category ? errors.category : undefined}
        />
      )}
    </Formik>
  );
}
```

## Advanced Examples

### API Integration with Caching

```tsx
function CachedCombobox() {
  const [cache, setCache] = useState<Map<string, any[]>>(new Map());
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (query: string) => {
    if (!query) return;
    
    // Check cache first
    if (cache.has(query)) {
      setOptions(cache.get(query)!);
      return;
    }

    setLoading(true);
    try {
      const results = await searchAPI(query);
      setOptions(results);
      setCache(new Map(cache).set(query, results));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Combobox
      label="Search with caching"
      options={options}
      loading={loading}
      onInputChange={useDebouncedCallback(search, 300)}
    />
  );
}
```

### Recent Selections

```tsx
function ComboboxWithRecents() {
  const [value, setValue] = useState('');
  const [recents, setRecents] = useLocalStorage('recent-selections', []);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    
    // Add to recents (max 5)
    if (newValue && !recents.includes(newValue)) {
      setRecents([newValue, ...recents].slice(0, 5));
    }
  };

  const groupedOptions = [
    {
      label: 'Recent',
      options: recents.map(r => ({ label: r, value: r })),
    },
    {
      label: 'All Options',
      options: allOptions,
    },
  ];

  return (
    <Combobox
      label="Search with recents"
      options={groupedOptions}
      grouped
      value={value}
      onChange={handleChange}
    />
  );
}
```

### Multi-Language Support

```tsx
const translations = {
  en: {
    placeholder: 'Search...',
    noOptions: 'No results found',
    loading: 'Loading...',
  },
  es: {
    placeholder: 'Buscar...',
    noOptions: 'No se encontraron resultados',
    loading: 'Cargando...',
  },
};

<Combobox
  label="Search"
  placeholder={translations[locale].placeholder}
  noOptionsText={translations[locale].noOptions}
  loadingText={translations[locale].loading}
  options={options}
/>
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { ComboboxProps, ComboboxOption } from 'saha-ui';

interface CustomOption {
  label: string;
  value: string;
  metadata?: any;
}

const MyCombobox: React.FC<ComboboxProps<CustomOption>> = (props) => {
  return <Combobox<CustomOption> {...props} />;
};
```

## Styling

The component uses CVA (Class Variance Authority) for variant management:

```tsx
<Combobox
  label="Custom styled"
  className="my-custom-class"
/>
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Performance Tips

### 1. Virtualize Long Lists

For lists with 100+ items:

```tsx
<Combobox
  options={longList}
  virtualized
  itemHeight={40}
/>
```

### 2. Debounce Input

```tsx
const debouncedChange = useDebouncedCallback(
  (value) => onSearch(value),
  300
);

<Combobox onInputChange={debouncedChange} />
```

### 3. Memoize Filter Function

```tsx
const filterOptions = useMemo(() => {
  return (options: Option[], input: string) => {
    // Filtering logic
  };
}, []);

<Combobox filterOptions={filterOptions} />
```

### 4. Limit Results

```tsx
<Combobox
  filterOptions={(options, input) => {
    return options.filter(/* ... */).slice(0, 50); // Show max 50
  }}
/>
```

## Comparison: Combobox vs Select vs Autocomplete

| Feature | Combobox | Select | Autocomplete |
|---------|----------|--------|--------------|
| Typing to search | ✅ Yes | ⚠️ Limited | ✅ Yes |
| Custom values | ❌ No | ❌ No | ✅ Yes |
| Single selection | ✅ Yes | ✅ Yes | ✅ Yes |
| Dropdown only | ❌ No | ✅ Yes | ❌ No |
| Best for | Searchable selection | Quick selection | Flexible input |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [Select](../Select/README.md) - For dropdown selection
- [Autocomplete](../Autocomplete/README.md) - For autocomplete
- [Input](../Input/README.md) - For text input
- [Form](../Form/README.md) - For form management

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI