# Autocomplete

A fully accessible autocomplete component with search suggestions and keyboard navigation. Implements the WAI-ARIA combobox pattern with proper keyboard support and screen reader announcements.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 🔍 **Smart Search** - Fuzzy matching and custom filtering
- 🎯 **Suggestions** - Dynamic suggestion dropdown
- ⌨️ **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape)
- 🌗 **Dark Mode** - Automatic dark mode support
- 🔄 **Async Loading** - Support for async data sources
- 🎭 **Custom Rendering** - Custom option and input rendering
- 💫 **Highlighting** - Automatic match highlighting
- 📦 **Multi-select** - Optional multiple selection support

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Autocomplete } from '@saha-ui/core';

function App() {
  const [value, setValue] = useState('');
  
  const options = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
  ];

  return (
    <Autocomplete
      label="Select fruit"
      placeholder="Type to search..."
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
<Autocomplete label="Default" variant="default" options={options} />
<Autocomplete label="Primary" variant="primary" options={options} />
<Autocomplete label="Secondary" variant="secondary" options={options} />
<Autocomplete label="Accent" variant="accent" options={options} />
<Autocomplete label="Success" variant="success" options={options} />
<Autocomplete label="Warning" variant="warning" options={options} />
<Autocomplete label="Error" variant="error" options={options} />
```

### Sizes

```tsx
<Autocomplete label="Small" size="sm" options={options} />
<Autocomplete label="Medium" size="md" options={options} />
<Autocomplete label="Large" size="lg" options={options} />
```

### With Objects

Use objects with label and value:

```tsx
const options = [
  { label: 'United States', value: 'us', code: '+1' },
  { label: 'United Kingdom', value: 'uk', code: '+44' },
  { label: 'Canada', value: 'ca', code: '+1' },
  { label: 'Australia', value: 'au', code: '+61' },
];

<Autocomplete
  label="Select country"
  placeholder="Search countries..."
  options={options}
  value={selectedCountry}
  onChange={setSelectedCountry}
  getOptionLabel={(option) => option.label}
  getOptionValue={(option) => option.value}
/>
```

### With Icons

```tsx
import { Search, MapPin, User } from 'lucide-react';

const cities = [
  { label: 'New York', value: 'ny', icon: <MapPin /> },
  { label: 'Los Angeles', value: 'la', icon: <MapPin /> },
  { label: 'Chicago', value: 'chi', icon: <MapPin /> },
];

<Autocomplete
  label="Select city"
  options={cities}
  leftIcon={<Search className="w-4 h-4" />}
  renderOption={(option) => (
    <div className="flex items-center gap-2">
      {option.icon}
      <span>{option.label}</span>
    </div>
  )}
/>
```

### Async Loading

Load options from an API:

```tsx
function AsyncAutocomplete() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const loadOptions = async (searchTerm: string) => {
    if (!searchTerm) {
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

  const debouncedLoad = useDebouncedCallback(loadOptions, 300);

  return (
    <Autocomplete
      label="Search users"
      placeholder="Type to search..."
      options={options}
      value={value}
      onChange={setValue}
      onInputChange={debouncedLoad}
      loading={loading}
      noOptionsText={value ? "No users found" : "Start typing to search"}
    />
  );
}
```

### With Groups

Organize options into groups:

```tsx
const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Spinach', value: 'spinach' },
    ],
  },
];

<Autocomplete
  label="Select food"
  options={groupedOptions}
  grouped
  value={value}
  onChange={setValue}
/>
```

### Multiple Selection

Select multiple options:

```tsx
function MultiSelectAutocomplete() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Autocomplete
      label="Select skills"
      placeholder="Add skills..."
      options={skills}
      value={selected}
      onChange={setSelected}
      multiple
      helperText={`${selected.length} skills selected`}
    />
  );
}
```

### With Custom Filter

Implement custom filtering logic:

```tsx
<Autocomplete
  label="Search"
  options={options}
  filterOptions={(options, inputValue) => {
    return options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.description?.toLowerCase().includes(inputValue.toLowerCase())
    );
  }}
/>
```

### Fuzzy Search

Use fuzzy matching for better search:

```tsx
import Fuse from 'fuse.js';

function FuzzyAutocomplete() {
  const fuse = new Fuse(options, {
    keys: ['label', 'description'],
    threshold: 0.3,
  });

  return (
    <Autocomplete
      label="Fuzzy search"
      options={options}
      filterOptions={(options, inputValue) => {
        if (!inputValue) return options;
        return fuse.search(inputValue).map(result => result.item);
      }}
    />
  );
}
```

### Free Solo Mode

Allow custom values not in the list:

```tsx
<Autocomplete
  label="Tags"
  placeholder="Add or select tags..."
  options={predefinedTags}
  value={tags}
  onChange={setTags}
  freeSolo
  multiple
  helperText="Type and press Enter to add custom tags"
/>
```

### With Validation

```tsx
function ValidatedAutocomplete() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validate = (val: string) => {
    if (!val) {
      setError('Selection is required');
    } else {
      setError('');
    }
  };

  return (
    <Autocomplete
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
<Autocomplete
  label="Select option"
  options={options}
  value={value}
  onChange={setValue}
  clearable
  clearButtonLabel="Clear selection"
/>
```

### Disabled State

```tsx
<Autocomplete
  label="Disabled autocomplete"
  options={options}
  disabled
  value="Disabled value"
  helperText="This field is currently disabled"
/>
```

### Loading State

```tsx
<Autocomplete
  label="Loading data"
  placeholder="Loading..."
  options={options}
  loading
  loadingText="Loading options..."
/>
```

### Custom Option Rendering

```tsx
const users = [
  { name: 'John Doe', email: 'john@example.com', avatar: '/john.jpg' },
  { name: 'Jane Smith', email: 'jane@example.com', avatar: '/jane.jpg' },
];

<Autocomplete
  label="Select user"
  options={users}
  getOptionLabel={(option) => option.name}
  renderOption={(option, { inputValue }) => (
    <div className="flex items-center gap-3 p-2">
      <img
        src={option.avatar}
        alt={option.name}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="font-medium">
          <Highlight text={option.name} highlight={inputValue} />
        </div>
        <div className="text-sm text-muted-foreground">
          {option.email}
        </div>
      </div>
    </div>
  )}
/>
```

### With Recent Searches

```tsx
function AutocompleteWithHistory() {
  const [value, setValue] = useState('');
  const [recentSearches, setRecentSearches] = useLocalStorage('recent', []);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (newValue && !recentSearches.includes(newValue)) {
      setRecentSearches([newValue, ...recentSearches].slice(0, 5));
    }
  };

  const displayOptions = value 
    ? options 
    : recentSearches.map(search => ({ label: search, recent: true }));

  return (
    <Autocomplete
      label="Search"
      options={displayOptions}
      value={value}
      onChange={handleChange}
      renderOption={(option) => (
        <div className="flex items-center gap-2">
          {option.recent && <Clock className="w-4 h-4 text-muted-foreground" />}
          <span>{option.label}</span>
        </div>
      )}
    />
  );
}
```

### Email Autocomplete

```tsx
const emailDomains = [
  '@gmail.com',
  '@yahoo.com',
  '@outlook.com',
  '@hotmail.com',
];

function EmailAutocomplete() {
  const [email, setEmail] = useState('');

  const suggestions = emailDomains.map(domain => {
    const [localPart] = email.split('@');
    return localPart + domain;
  });

  return (
    <Autocomplete
      label="Email"
      type="email"
      value={email}
      onChange={setEmail}
      options={email.includes('@') ? [] : suggestions}
      freeSolo
      placeholder="you@example.com"
    />
  );
}
```

### Address Autocomplete

```tsx
function AddressAutocomplete() {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAddresses = async (query: string) => {
    if (query.length < 3) return;
    
    setLoading(true);
    try {
      const results = await geocodeAPI(query);
      setSuggestions(results);
    } finally {
      setLoading(false);
    }
  };

  const debouncedLoad = useDebouncedCallback(loadAddresses, 300);

  return (
    <Autocomplete
      label="Address"
      placeholder="Start typing your address..."
      value={address}
      onChange={setAddress}
      onInputChange={debouncedLoad}
      options={suggestions}
      loading={loading}
      getOptionLabel={(option) => option.formattedAddress}
      renderOption={(option) => (
        <div>
          <div className="font-medium">{option.street}</div>
          <div className="text-sm text-muted-foreground">
            {option.city}, {option.state} {option.zip}
          </div>
        </div>
      )}
    />
  );
}
```

## Accessibility

### Keyboard Navigation

- **Arrow Down**: Open dropdown / Navigate to next option
- **Arrow Up**: Navigate to previous option
- **Enter**: Select highlighted option
- **Escape**: Close dropdown
- **Tab**: Move focus away (closes dropdown)
- **Home**: Jump to first option
- **End**: Jump to last option
- **Type**: Filter options by typing

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated IDs and ARIA attributes
<Autocomplete
  label="Search users"
  description="Search by name or email"
  helperText="Select a user from the list"
  error={error}
/>
// Automatically creates:
// - role="combobox" for the input
// - role="listbox" for the dropdown
// - role="option" for each option
// - aria-expanded for dropdown state
// - aria-activedescendant for highlighted option
// - aria-autocomplete="list"
// - aria-controls links to dropdown
// - aria-labelledby links to label
// - aria-describedby links to description and helperText
```

### Manual ARIA Labels

For autocomplete without visible labels:

```tsx
<Autocomplete
  aria-label="Search products"
  placeholder="Search..."
  options={options}
/>
```

### Required Fields

```tsx
<Autocomplete
  label="Required selection"
  required
  aria-required="true"
  error={!value && submitted ? "Selection is required" : undefined}
/>
```

### Error Announcements

Errors are automatically announced to screen readers:

```tsx
<Autocomplete
  label="Country"
  error="Please select a valid country"
  aria-invalid="true"
/>
// Error has role="alert" and aria-live="polite"
```

### Loading State Announcements

```tsx
<Autocomplete
  loading={true}
  loadingText="Loading options..."
  aria-busy="true"
  aria-live="polite"
/>
```

## API Reference

### Autocomplete Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the autocomplete |
| `description` | `string` | - | Description text shown below the label |
| `placeholder` | `string` | - | Placeholder text |
| `helperText` | `string` | - | Helper text shown below the input |
| `error` | `string` | - | Error message to display |
| `options` | `T[]` | `[]` | Array of options |
| `value` | `T \| T[]` | - | Selected value(s) (controlled) |
| `defaultValue` | `T \| T[]` | - | Default value(s) (uncontrolled) |
| `onChange` | `(value: T \| T[]) => void` | - | Callback when selection changes |
| `onInputChange` | `(value: string) => void` | - | Callback when input value changes |
| `onBlur` | `(e: FocusEvent) => void` | - | Blur event handler |
| `onFocus` | `(e: FocusEvent) => void` | - | Focus event handler |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the autocomplete |
| `multiple` | `boolean` | `false` | Allow multiple selections |
| `freeSolo` | `boolean` | `false` | Allow custom values |
| `grouped` | `boolean` | `false` | Options are grouped |
| `clearable` | `boolean` | `false` | Show clear button |
| `disabled` | `boolean` | `false` | Whether the autocomplete is disabled |
| `loading` | `boolean` | `false` | Show loading state |
| `required` | `boolean` | `false` | Whether selection is required |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `leftIcon` | `ReactNode` | - | Icon on the left side |
| `rightIcon` | `ReactNode` | - | Icon on the right side |
| `getOptionLabel` | `(option: T) => string` | - | Get display label from option |
| `getOptionValue` | `(option: T) => string` | - | Get value from option |
| `filterOptions` | `(options: T[], inputValue: string) => T[]` | - | Custom filter function |
| `renderOption` | `(option: T, state) => ReactNode` | - | Custom option renderer |
| `renderInput` | `(params) => ReactNode` | - | Custom input renderer |
| `isOptionEqualToValue` | `(option: T, value: T) => boolean` | - | Compare option to value |
| `noOptionsText` | `string` | `'No options'` | Text when no options match |
| `loadingText` | `string` | `'Loading...'` | Text when loading |
| `openOnFocus` | `boolean` | `false` | Open dropdown on focus |
| `selectOnFocus` | `boolean` | `false` | Select text on focus |
| `clearOnBlur` | `boolean` | `false` | Clear input on blur |
| `maxHeight` | `number \| string` | `300` | Max height of dropdown |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label for screen readers |
| `aria-labelledby` | `string` | - | ID of element that labels this input |
| `aria-describedby` | `string` | - | IDs of elements that describe this input |

## Best Practices

### 1. Always Provide Labels

For accessibility, always provide a clear label:

```tsx
// Good ✅
<Autocomplete label="Search users" options={users} />
<Autocomplete aria-label="Search" options={items} />

// Bad ❌
<Autocomplete placeholder="Search" options={items} />
```

### 2. Debounce API Calls

For async data, always debounce:

```tsx
const debouncedSearch = useDebouncedCallback(
  (query) => searchAPI(query),
  300
);

<Autocomplete onInputChange={debouncedSearch} />
```

### 3. Provide Clear "No Options" Messages

```tsx
// Good ✅
<Autocomplete
  noOptionsText={query ? "No results found" : "Start typing to search"}
/>

// Bad ❌
<Autocomplete noOptionsText="No options" />
```

### 4. Use Loading States

```tsx
<Autocomplete
  loading={isLoading}
  loadingText="Searching..."
  options={results}
/>
```

### 5. Implement Proper Filtering

```tsx
// Good ✅ - Case-insensitive, trims whitespace
filterOptions={(options, input) => {
  const query = input.trim().toLowerCase();
  return options.filter(opt => 
    opt.label.toLowerCase().includes(query)
  );
}}

// Bad ❌ - Case-sensitive, no trimming
filterOptions={(options, input) => {
  return options.filter(opt => opt.label.includes(input));
}}
```

### 6. Show Minimum Characters Required

```tsx
<Autocomplete
  onInputChange={(value) => {
    if (value.length >= 3) {
      search(value);
    }
  }}
  noOptionsText={
    inputValue.length < 3 
      ? "Type at least 3 characters" 
      : "No results"
  }
/>
```

### 7. Handle Empty States

```tsx
<Autocomplete
  options={options}
  noOptionsText="No items available"
  helperText={options.length === 0 ? "No data to display" : undefined}
/>
```

### 8. Validate on Blur

```tsx
<Autocomplete
  onChange={setValue}
  onBlur={() => validate(value)}
  error={error}
/>
```

### 9. Use Icons for Context

```tsx
<Autocomplete
  label="Search locations"
  leftIcon={<MapPin />}
  options={locations}
/>
```

### 10. Clear on Selection (When Appropriate)

```tsx
// For "add item" workflows
<Autocomplete
  value={value}
  onChange={(newValue) => {
    addItem(newValue);
    setValue(''); // Clear after selection
  }}
  multiple
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
        rules={{ required: 'Country is required' }}
        render={({ field, fieldState }) => (
          <Autocomplete
            label="Country"
            options={countries}
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
        <Autocomplete
          label="Country"
          options={countries}
          value={values.country}
          onChange={(value) => setFieldValue('country', value)}
          error={touched.country ? errors.country : undefined}
        />
      )}
    </Formik>
  );
}
```

## Advanced Examples

### Search with Highlighting

```tsx
function HighlightedAutocomplete() {
  const [query, setQuery] = useState('');

  const Highlight = ({ text, highlight }: { text: string; highlight: string }) => {
    if (!highlight.trim()) return <>{text}</>;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-200 dark:bg-yellow-900">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <Autocomplete
      label="Search"
      options={options}
      onInputChange={setQuery}
      renderOption={(option) => (
        <Highlight text={option.label} highlight={query} />
      )}
    />
  );
}
```

### Command Palette Style

```tsx
function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Autocomplete
        placeholder="Search commands..."
        options={commands}
        autoFocus
        openOnFocus
        renderOption={(option) => (
          <div className="flex items-center justify-between">
            <span>{option.label}</span>
            <kbd className="text-xs">{option.shortcut}</kbd>
          </div>
        )}
      />
    </Dialog>
  );
}
```

### GitHub Repository Search

```tsx
function GitHubSearch() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRepos = async (query: string) => {
    if (!query) return;
    
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      const data = await res.json();
      setRepos(data.items);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      label="Search GitHub repositories"
      placeholder="Search repositories..."
      options={repos}
      loading={loading}
      onInputChange={useDebouncedCallback(searchRepos, 500)}
      getOptionLabel={(repo) => repo.full_name}
      renderOption={(repo) => (
        <div className="p-2">
          <div className="font-medium">{repo.full_name}</div>
          <div className="text-sm text-muted-foreground line-clamp-1">
            {repo.description}
          </div>
          <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
            <span>⭐ {repo.stargazers_count}</span>
            <span>🔱 {repo.forks_count}</span>
          </div>
        </div>
      )}
    />
  );
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { AutocompleteProps, AutocompleteOption } from '@saha-ui/core';

interface CustomOption {
  label: string;
  value: string;
  metadata?: any;
}

const MyAutocomplete: React.FC<AutocompleteProps<CustomOption>> = (props) => {
  return <Autocomplete<CustomOption> {...props} />;
};
```

## Styling

The component uses CVA (Class Variance Authority) for variant management:

```tsx
<Autocomplete
  label="Custom styled"
  className="my-custom-class"
/>
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Performance Tips

### 1. Virtualize Long Lists

For very long option lists (1000+ items):

```tsx
<Autocomplete
  options={veryLongList}
  virtualized
  itemHeight={40}
/>
```

### 2. Debounce Input Changes

```tsx
const debouncedChange = useDebouncedCallback(
  (value) => onSearch(value),
  300
);

<Autocomplete onInputChange={debouncedChange} />
```

### 3. Memoize Filter Function

```tsx
const filterOptions = useMemo(() => {
  return (options: Option[], input: string) => {
    // Complex filtering logic
  };
}, [/* dependencies */]);

<Autocomplete filterOptions={filterOptions} />
```

### 4. Limit API Calls

```tsx
const [lastQuery, setLastQuery] = useState('');

const search = (query: string) => {
  if (query === lastQuery) return; // Skip duplicate
  if (query.length < 3) return;   // Minimum length
  setLastQuery(query);
  fetchResults(query);
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [Select](../Select/README.md) - For dropdown selection
- [Combobox](../Combobox/README.md) - Alternative combo box
- [Input](../Input/README.md) - For text input
- [Form](../Form/README.md) - For form management

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI