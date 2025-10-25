# Combobox Component

A feature-rich, beautiful combobox component with autocomplete, multi-select, option creation, and dual API support (props-based and component-based).

## Features

✨ **Dual API Support**

- Props-based API (simple, concise)
- Component API (flexible, composable)

🎨 **Beautiful Design**

- 11 color variants matching your theme
- 3 size options
- Smooth animations and transitions
- Glass effect, gradient overlays
- Hover effects and shadows

🚀 **Advanced Features**

- Single and multiple selection
- Searchable/filterable options
- Create new options on-the-fly (creatable)
- Autocomplete behavior
- Grouped options
- Custom renderers
- Keyboard navigation
- Accessibility (ARIA)
- Loading states
- Empty states
- Custom filtering

✅ **Full Validation**

- Compile-time TypeScript validation
- Runtime development-only validation
- Zero production overhead (tree-shaken)

---

## Installation

The Combobox component is included in the Saha-ui library:

```tsx
import { Combobox } from "saha-ui";
```

---

## Basic Usage

### Props-Based API (Simple)

Perfect for simple use cases with a flat list of options:

```tsx
import { Combobox } from "saha-ui";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

function MyComponent() {
  const [value, setValue] = useState("");

  return (
    <Combobox
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select an option..."
    />
  );
}
```

### Component API (Flexible)

Perfect for complex use cases with custom content:

```tsx
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxSearch,
  ComboboxItem,
  ComboboxEmpty,
} from "saha-ui";

function MyComponent() {
  const [value, setValue] = useState("");

  return (
    <Combobox value={value} onChange={setValue}>
      <ComboboxTrigger>Select item...</ComboboxTrigger>
      <ComboboxContent>
        <ComboboxSearch placeholder="Search..." />
        <ComboboxItem value="1">Option 1</ComboboxItem>
        <ComboboxItem value="2">Option 2</ComboboxItem>
        <ComboboxItem value="3">Option 3</ComboboxItem>
        <ComboboxEmpty>No results found</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  );
}
```

---

## Variants

11 beautiful color variants:

```tsx
// Default
<Combobox variant="default" options={options} />

// Primary
<Combobox variant="primary" options={options} />

// Secondary
<Combobox variant="secondary" options={options} />

// Accent
<Combobox variant="accent" options={options} />

// Success
<Combobox variant="success" options={options} />

// Warning
<Combobox variant="warning" options={options} />

// Error
<Combobox variant="error" options={options} />

// Info
<Combobox variant="info" options={options} />

// Ghost (subtle)
<Combobox variant="ghost" options={options} />

// Glass (frosted glass effect)
<Combobox variant="glass" options={options} />

// Outline
<Combobox variant="outline" options={options} />
```

---

## Sizes

3 size options:

```tsx
// Small
<Combobox size="sm" options={options} />

// Medium (default)
<Combobox size="md" options={options} />

// Large
<Combobox size="lg" options={options} />
```

---

## Advanced Features

### Multiple Selection

```tsx
<Combobox
  multiple
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  maxDisplay={3} // Show max 3 selected items
/>
```

### Searchable/Filterable

```tsx
<Combobox searchable searchPlaceholder="Search options..." options={options} />
```

### Creatable (Add New Options)

```tsx
<Combobox
  creatable
  createText="Create"
  onCreateOption={(newValue) => {
    console.log("Creating:", newValue);
    // Add new option to your state
  }}
  options={options}
/>
```

### Grouped Options

#### Props-Based API

```tsx
const groupedOptions = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
    ],
  },
];

<Combobox options={groupedOptions} />;
```

#### Component API

```tsx
<Combobox value={value} onChange={setValue}>
  <ComboboxContent>
    <ComboboxSearch />

    <ComboboxGroup label="Fruits">
      <ComboboxItem value="apple">Apple</ComboboxItem>
      <ComboboxItem value="banana">Banana</ComboboxItem>
    </ComboboxGroup>

    <ComboboxSeparator />

    <ComboboxGroup label="Vegetables">
      <ComboboxItem value="carrot">Carrot</ComboboxItem>
      <ComboboxItem value="broccoli">Broccoli</ComboboxItem>
    </ComboboxGroup>
  </ComboboxContent>
</Combobox>
```

### Rich Options (Icons, Avatars, Descriptions)

```tsx
import { User, Settings, HelpCircle } from "lucide-react";

const richOptions = [
  {
    value: "1",
    label: "User Settings",
    description: "Manage your account",
    icon: <User className="w-4 h-4" />,
  },
  {
    value: "2",
    label: "System Settings",
    description: "Configure system",
    icon: <Settings className="w-4 h-4" />,
  },
  {
    value: "3",
    label: "Help",
    description: "Get support",
    icon: <HelpCircle className="w-4 h-4" />,
    avatar: "https://example.com/avatar.jpg",
  },
];

<Combobox options={richOptions} showDescriptions showAvatars />;
```

### Loading State

```tsx
<Combobox loading loadingMessage="Loading options..." options={options} />
```

### Custom Filtering

```tsx
<Combobox
  searchable
  filterOptions={(options, inputValue) => {
    // Custom filtering logic
    return options.filter((opt) =>
      opt.label.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  }}
  options={options}
/>
```

### Custom Renderers

```tsx
<Combobox
  options={options}
  renderValue={(value) => <span className="font-bold">Selected: {value}</span>}
  renderOption={(option) => (
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-primary" />
      {option.label}
    </div>
  )}
/>
```

### Form Integration

```tsx
<Combobox
  name="country"
  label="Country"
  helperText="Select your country"
  error={errors.country}
  required
  options={countryOptions}
/>
```

---

## Component API Reference

### Main Component

```tsx
<Combobox
  value={string | string[]}
  onChange={(value: string | string[]) => void}
  options={ComboboxOption[] | ComboboxGroup[]}

  // Display
  placeholder="Select..."
  label="Label"
  helperText="Helper text"
  error="Error message"

  // Variants
  variant="default" | "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info" | "ghost" | "glass" | "outline"
  size="sm" | "md" | "lg"

  // Features
  multiple={boolean}
  searchable={boolean}
  searchPlaceholder="Search..."
  clearable={boolean}
  disabled={boolean}
  readOnly={boolean}
  required={boolean}
  loading={boolean}
  creatable={boolean}
  createText="Create"
  allowDeselect={boolean}
  autoComplete={boolean}
  autoHighlight={boolean}
  closeOnSelect={boolean}
  openOnFocus={boolean}

  // Customization
  placement="bottom-start" | "bottom" | "bottom-end" | "top-start" | "top" | "top-end"
  maxHeight="320px"
  showCheckmarks={boolean}
  showAvatars={boolean}
  showDescriptions={boolean}
  emptyMessage="No options"
  loadingMessage="Loading..."
  maxDisplay={3}

  // Callbacks
  onOpen={() => void}
  onClose={() => void}
  onSearch={(value: string) => void}
  onCreateOption={(value: string) => void}
  onFocus={() => void}
  onBlur={() => void}

  // Custom Functions
  filterOptions={(options, inputValue) => ComboboxOption[]}
  renderOption={(option) => ReactNode}
  renderValue={(value) => ReactNode}

  // Styling
  className="custom-class"
  triggerClassName="trigger-class"
  dropdownClassName="dropdown-class"
  optionClassName="option-class"

  // Form
  name="field-name"
  id="field-id"
  aria-label="Accessible label"
  aria-describedby="description-id"
/>
```

### Sub-Components

#### ComboboxTrigger

```tsx
<ComboboxTrigger className="custom-trigger">
  Custom trigger content
</ComboboxTrigger>
```

#### ComboboxContent

```tsx
<ComboboxContent maxHeight="400px" className="custom-content">
  {/* Content */}
</ComboboxContent>
```

#### ComboboxSearch

```tsx
<ComboboxSearch placeholder="Search..." className="custom-search" />
```

#### ComboboxItem

```tsx
<ComboboxItem
  value="unique-value"
  label="Label"
  description="Description"
  icon={<Icon />}
  avatar="url"
  disabled={boolean}
  className="custom-item"
>
  Custom content
</ComboboxItem>
```

#### ComboboxGroup

```tsx
<ComboboxGroup label="Group Label" className="custom-group">
  <ComboboxItem value="1">Item 1</ComboboxItem>
  <ComboboxItem value="2">Item 2</ComboboxItem>
</ComboboxGroup>
```

#### ComboboxEmpty

```tsx
<ComboboxEmpty className="custom-empty">No results found</ComboboxEmpty>
```

#### ComboboxLoading

```tsx
<ComboboxLoading className="custom-loading">Loading...</ComboboxLoading>
```

#### ComboboxSeparator

```tsx
<ComboboxSeparator className="custom-separator" />
```

#### ComboboxCreate

```tsx
<ComboboxCreate className="custom-create">Create new option</ComboboxCreate>
```

---

## Type Definitions

### ComboboxOption

```tsx
interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  avatar?: string;
  disabled?: boolean;
  group?: string;
  metadata?: Record<string, any>;
}
```

### ComboboxGroup

```tsx
interface ComboboxGroup {
  label: string;
  options: ComboboxOption[];
}
```

---

## Keyboard Navigation

- **Arrow Down**: Navigate to next option
- **Arrow Up**: Navigate to previous option
- **Enter**: Select highlighted option or create new option (if creatable)
- **Escape**: Close dropdown
- **Type to search**: Filter options (if searchable)

---

## Accessibility

- Full ARIA support (`aria-label`, `aria-describedby`, `aria-expanded`, `aria-haspopup`)
- Keyboard navigation
- Screen reader friendly
- Focus management
- Proper role attributes

---

## Validation

All props are validated at both compile-time (TypeScript) and runtime (development only):

```tsx
// ✅ Valid
<Combobox variant="primary" size="md" />

// ❌ TypeScript Error + Dev Console Warning
<Combobox variant="invalid" size="extra-large" />
```

Validation is **automatically tree-shaken** in production builds (0 KB overhead).

---

## Best Practices

### 1. Use Props API for Simple Lists

```tsx
// ✅ Good
<Combobox options={simpleOptions} />
```

### 2. Use Component API for Complex Content

```tsx
// ✅ Good
<Combobox>
  <ComboboxContent>
    <ComboboxGroup label="Recently Used">
      <ComboboxItem value="1">Custom JSX</ComboboxItem>
    </ComboboxGroup>
  </ComboboxContent>
</Combobox>
```

### 3. Enable Search for Large Lists

```tsx
// ✅ Good for 20+ options
<Combobox searchable options={manyOptions} />
```

### 4. Use Controlled State

```tsx
// ✅ Good
const [value, setValue] = useState("");
<Combobox value={value} onChange={setValue} />;
```

### 5. Provide Helpful Empty States

```tsx
<Combobox emptyMessage="No countries found. Try a different search." />
```

### 6. Use Variants Consistently

```tsx
// ✅ Good - variant matches form context
<Combobox variant="error" error="This field is required" />
```

---

## Examples

### Country Selector

```tsx
function CountrySelector() {
  const [country, setCountry] = useState("");

  const countries = [
    { value: "us", label: "United States", icon: "🇺🇸" },
    { value: "uk", label: "United Kingdom", icon: "🇬🇧" },
    { value: "ca", label: "Canada", icon: "🇨🇦" },
    // ... more countries
  ];

  return (
    <Combobox
      label="Country"
      placeholder="Select your country"
      options={countries}
      value={country}
      onChange={setCountry}
      searchable
      required
      variant="primary"
    />
  );
}
```

### Multi-Select Tags

```tsx
function TagSelector() {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <Combobox
      label="Tags"
      placeholder="Select tags..."
      options={tagOptions}
      value={tags}
      onChange={setTags}
      multiple
      creatable
      searchable
      maxDisplay={5}
      onCreateOption={(newTag) => {
        // Add to options
        setTagOptions([...tagOptions, { value: newTag, label: newTag }]);
      }}
    />
  );
}
```

### User Selector with Avatars

```tsx
function UserSelector() {
  const users = [
    {
      value: "1",
      label: "John Doe",
      description: "john@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      value: "2",
      label: "Jane Smith",
      description: "jane@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  ];

  return (
    <Combobox
      options={users}
      showAvatars
      showDescriptions
      searchable
      placeholder="Select user..."
    />
  );
}
```

---

## Comparison with Other Components

| Feature            | Combobox | Select | Autocomplete | Dropdown |
| ------------------ | -------- | ------ | ------------ | -------- |
| Single selection   | ✅       | ✅     | ✅           | ✅       |
| Multiple selection | ✅       | ✅     | ✅           | ❌       |
| Searchable         | ✅       | ✅     | ✅           | ❌       |
| Creatable          | ✅       | ❌     | ✅           | ❌       |
| Component API      | ✅       | ❌     | ❌           | ✅       |
| Custom triggers    | ✅       | ❌     | ❌           | ✅       |
| Keyboard nav       | ✅       | ✅     | ✅           | ✅       |
| Grouped options    | ✅       | ✅     | ✅           | ✅       |

**Use Combobox when you need:**

- Maximum flexibility (dual API)
- Create new options
- Both search AND custom content
- Complex selection workflows

---

## Performance

- **Memoized filtering**: Options only filtered when input changes
- **Virtual scrolling**: Not implemented (add if needed for 1000+ items)
- **Optimized re-renders**: Context prevents unnecessary updates
- **Tree-shaking**: Validation code removed in production
- **Lazy evaluation**: Dropdown only rendered when open

---

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## Related Components

- **Select**: Simpler dropdown without search/create
- **Autocomplete**: Search-focused, no component API
- **Dropdown**: Generic dropdown menu (not form-focused)
- **TagInput**: Pure tag creation without selection

---

## Migration from Select

```tsx
// Before (Select)
<Select
  options={options}
  value={value}
  onChange={onChange}
/>

// After (Combobox)
<Combobox
  options={options}
  value={value}
  onChange={onChange}
/>
```

The API is mostly compatible! Combobox is a superset of Select with additional features.

---

## Component Size

- **Development**: ~27 KB (uncompressed)
- **Production**: ~6.5 KB (gzipped)
- **Validation overhead**: 0 KB (tree-shaken)

---

## Changelog

### v1.0.0 (Current)

- ✅ Initial release
- ✅ Dual API support (props + components)
- ✅ 11 color variants
- ✅ Multiple selection
- ✅ Searchable/filterable
- ✅ Creatable options
- ✅ Full validation
- ✅ Keyboard navigation
- ✅ Accessibility

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and CVA**
