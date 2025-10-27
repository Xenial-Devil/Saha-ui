# Dropdown Component - Dual API Support

The Dropdown component now supports **TWO** usage patterns to give you maximum flexibility:

## 1. Props-Based API (Simple & Quick)

Perfect for simple dropdowns where you just need to pass data.

### Basic Usage

```tsx
import { Dropdown } from "saha-ui";

function MyComponent() {
  const [value, setValue] = useState("");

  return (
    <Dropdown
      placeholder="Select an option"
      value={value}
      onChange={setValue}
      options={[
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ]}
    />
  );
}
```

### With Icons & Descriptions

```tsx
<Dropdown
  placeholder="Choose Plan"
  variant="primary"
  options={[
    {
      value: "free",
      label: "Free",
      description: "For personal projects",
      icon: <Star className="w-4 h-4" />,
      badge: "$0",
    },
    {
      value: "pro",
      label: "Pro",
      description: "For professional use",
      icon: <Crown className="w-4 h-4" />,
      badge: "$29",
    },
  ]}
/>
```

### Props-Based Features

- ✅ Simple array of options
- ✅ Built-in trigger styling
- ✅ Automatic value management
- ✅ Search functionality
- ✅ Multi-select support
- ✅ Icons, avatars, badges
- ✅ Descriptions and shortcuts

---

## 2. Component-Based API (Flexible & Powerful)

Perfect for complex UIs where you need full control over the structure and styling.

### Basic Usage

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "saha-ui";

function MyComponent() {
  return (
    <Dropdown variant="primary">
      <DropdownTrigger>Select an option</DropdownTrigger>
      <DropdownContent>
        <DropdownItem value="1" label="Option 1" />
        <DropdownItem value="2" label="Option 2" />
        <DropdownItem value="3" label="Option 3" />
      </DropdownContent>
    </Dropdown>
  );
}
```

### With Groups & Separators

```tsx
<Dropdown variant="glass">
  <DropdownTrigger>Menu</DropdownTrigger>
  <DropdownContent>
    <DropdownGroup label="File Operations">
      <DropdownItem
        value="copy"
        label="Copy"
        icon={<Copy className="w-4 h-4" />}
        shortcut="⌘C"
      />
      <DropdownItem
        value="cut"
        label="Cut"
        icon={<X className="w-4 h-4" />}
        shortcut="⌘X"
      />
    </DropdownGroup>

    <DropdownSeparator />

    <DropdownGroup label="Danger Zone">
      <DropdownItem
        value="delete"
        label="Delete"
        icon={<Trash2 className="w-4 h-4" />}
        shortcut="⌘D"
      />
    </DropdownGroup>
  </DropdownContent>
</Dropdown>
```

### Custom Trigger with asChild

```tsx
<Dropdown variant="primary">
  <DropdownTrigger asChild>
    <button className="custom-button">
      <User className="w-4 h-4" />
      My Account
    </button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem value="profile" label="Profile" icon={<User />} />
    <DropdownItem value="settings" label="Settings" icon={<Settings />} />
    <DropdownSeparator />
    <DropdownItem value="logout" label="Log Out" icon={<LogOut />} />
  </DropdownContent>
</Dropdown>
```

### Rich Content with Avatars & Badges

```tsx
<Dropdown variant="secondary">
  <DropdownTrigger>Assign to...</DropdownTrigger>
  <DropdownContent>
    <DropdownItem
      value="john"
      label="John Doe"
      avatar="https://i.pravatar.cc/150?img=1"
      description="Product Designer"
    />
    <DropdownItem
      value="jane"
      label="Jane Smith"
      avatar="https://i.pravatar.cc/150?img=2"
      description="Frontend Developer"
      badge="Online"
    />
  </DropdownContent>
</Dropdown>
```

### Component-Based Features

- ✅ Full control over structure
- ✅ Custom trigger elements (with asChild)
- ✅ Nested groups and separators
- ✅ Mix and match components
- ✅ Custom styling per item
- ✅ Complex layouts
- ✅ Header items

---

## Available Components

### `<Dropdown>`

Main wrapper component that provides context.

**Props:**

- `variant`: "default" | "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "ghost" | "glass"
- `size`: "sm" | "md" | "lg"
- `value`: string | string[]
- `onChange`: (value: string | string[]) => void
- `multiple`: boolean
- `checkmarks`: boolean
- `disabled`: boolean
- `error`: string
- `helperText`: string

### `<DropdownTrigger>`

Button that opens the dropdown.

**Props:**

- `asChild`: boolean - Use custom element as trigger
- `disabled`: boolean
- `className`: string

### `<DropdownContent>`

Container for dropdown items.

**Props:**

- `align`: "start" | "center" | "end"
- `side`: "top" | "bottom" | "left" | "right"
- `sideOffset`: number
- `width`: string | number
- `maxHeight`: string | number
- `className`: string

### `<DropdownItem>`

Individual menu item.

**Props:**

- `value`: string
- `label`: string
- `icon`: ReactNode
- `avatar`: string (URL)
- `description`: string
- `badge`: string
- `shortcut`: string
- `color`: string
- `disabled`: boolean
- `divider`: boolean
- `header`: boolean
- `onSelect`: (value: string) => void

### `<DropdownSeparator>`

Visual separator between items.

### `<DropdownGroup>`

Group items with optional label.

**Props:**

- `label`: string
- `className`: string

---

## When to Use Which?

### Use Props-Based API when:

- ✅ Building simple dropdowns
- ✅ Data comes from an array
- ✅ Standard trigger styling is fine
- ✅ You want quick implementation
- ✅ Options are dynamic (from API)

### Use Component-Based API when:

- ✅ You need custom trigger styling
- ✅ Complex menu structures (groups, sections)
- ✅ Custom per-item behavior
- ✅ Mixing different item types
- ✅ Need full control over layout
- ✅ Building command palettes or context menus

---

## Comparison Example

### Props-Based

```tsx
<Dropdown
  variant="primary"
  placeholder="Select"
  options={[
    { value: "1", label: "Edit", icon: <Edit /> },
    { value: "2", label: "Delete", icon: <Trash /> },
  ]}
/>
```

### Component-Based

```tsx
<Dropdown variant="primary">
  <DropdownTrigger>Select</DropdownTrigger>
  <DropdownContent>
    <DropdownItem value="1" label="Edit" icon={<Edit />} />
    <DropdownItem value="2" label="Delete" icon={<Trash />} />
  </DropdownContent>
</Dropdown>
```

Both produce the same result, but the component-based approach gives you more flexibility for customization!

---

## Advanced Features (Both APIs)

### Multi-Select

```tsx
// Props-based
<Dropdown multiple value={selected} onChange={setSelected} options={[...]} />

// Component-based (multi-select via context)
<Dropdown multiple value={selected} onChange={setSelected}>
  <DropdownTrigger>Select Multiple</DropdownTrigger>
  <DropdownContent>
    <DropdownItem value="1" label="Option 1" />
    <DropdownItem value="2" label="Option 2" />
  </DropdownContent>
</Dropdown>
```

### Searchable

```tsx
// Props-based
<Dropdown searchable options={[...]} />

// Component-based
<Dropdown searchable>
  <DropdownTrigger>Search...</DropdownTrigger>
  <DropdownContent>
    {/* Items are auto-filtered by search */}
  </DropdownContent>
</Dropdown>
```

### Keyboard Navigation

Both APIs support full keyboard navigation:

- `↑` / `↓` - Navigate items
- `Enter` - Select item
- `Escape` - Close dropdown
- `Tab` - Close and move focus

---

## Migration Guide

If you're currently using the props-based API, you don't need to change anything! Both APIs work side-by-side.

To migrate to component-based for more control:

**Before (Props-based):**

```tsx
<Dropdown
  placeholder="Actions"
  options={[
    { value: "edit", label: "Edit", icon: <Edit /> },
    { value: "delete", label: "Delete", icon: <Trash /> },
  ]}
/>
```

**After (Component-based):**

```tsx
<Dropdown>
  <DropdownTrigger>Actions</DropdownTrigger>
  <DropdownContent>
    <DropdownItem value="edit" label="Edit" icon={<Edit />} />
    <DropdownItem value="delete" label="Delete" icon={<Trash />} />
  </DropdownContent>
</Dropdown>
```

---

## Summary

🎯 **Two APIs, One Component** - Choose what fits your needs!

- **Props-based** = Simple, fast, data-driven
- **Component-based** = Flexible, powerful, composable

Both share the same styling, variants, and features. Mix and match as needed in your application!
