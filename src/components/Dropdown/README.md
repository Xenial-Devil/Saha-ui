# Dropdown

An advanced dropdown menu component for displaying lists of actions, options, and navigation items. Supports nested menus, icons, keyboard navigation, search functionality, and beautiful animations.

## Features

- 📋 **Rich Menu Items** - Text, icons, avatars, descriptions, badges, and shortcuts
- 🔗 **Nested Menus** - Sub-menu support with smart positioning
- ⌨️ **Keyboard Navigation** - Full keyboard support with arrow keys
- 🔍 **Searchable** - Built-in search/filter functionality
- 🎯 **Smart Positioning** - Automatic collision detection and positioning
- 🎨 **Multiple Variants** - 7+ color variants (default, primary, secondary, accent, success, warning, error, ghost, glass)
- 📏 **Size Options** - Small, medium, and large sizes
- ♿ **Fully Accessible** - ARIA compliant with screen reader support
- 🌗 **Dark Mode** - Automatic dark mode support
- 📦 **Two Usage Patterns** - Props-based (options array) or Component-based (composable)
- 🎭 **Portal Rendering** - Renders in portal to avoid z-index issues
- 🔄 **Loading States** - Built-in loading support

## When to Use

| Component    | Use Case                         | Primary Function     |
| ------------ | -------------------------------- | -------------------- |
| **Dropdown** | Menu items, actions, navigation  | Actions & Commands   |
| **Select**   | Form field selection             | Form Input           |
| **Combobox** | Autocomplete, search-as-you-type | Searchable Selection |

## Installation

```bash
npm install saha-ui
```

## Usage Patterns

The Dropdown component supports two usage patterns:

### 1. Component-Based Pattern (Recommended)

Build your dropdown with composable components for maximum flexibility:

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownGroup,
  DropdownSeparator,
} from "saha-ui";

function App() {
  return (
    <Dropdown variant="primary" size="md">
      <DropdownTrigger>Open Menu</DropdownTrigger>
      <DropdownContent>
        <DropdownItem value="profile" label="Profile" />
        <DropdownItem value="settings" label="Settings" />
        <DropdownSeparator />
        <DropdownItem value="logout" label="Logout" />
      </DropdownContent>
    </Dropdown>
  );
}
```

**Note:** Component-based pattern supports both action handlers (`onSelect`) and navigation (`href` prop) for each item.

**Component-Based Components:**

- `Dropdown` - Root container that manages state
- `DropdownTrigger` - The button/element that opens the dropdown
- `DropdownContent` - The dropdown menu container
- `DropdownItem` - Individual menu item
- `DropdownGroup` - Groups related items with a label
- `DropdownSeparator` - Visual separator

### 2. Props-Based Pattern (Quick Setup)

Use the options prop for simple use cases:

```tsx
<Dropdown
  placeholder="Menu"
  variant="default"
  options={[
    { label: "Profile", value: "profile" },
    { label: "Settings", value: "settings" },
    { label: "Logout", value: "logout" },
  ]}
/>
```

**Note:** Props-based pattern is ideal for simple menus without navigation URLs.

## Examples

### Navigation Menu with Links

```tsx
import { Home, Folder, Settings } from "lucide-react";

<Dropdown variant="accent">
  <DropdownTrigger>Navigate</DropdownTrigger>
  <DropdownContent>
    <DropdownItem href="/" label="Home" icon={<Home className="w-4 h-4" />} />
    <DropdownItem
      href="/dashboard"
      label="Dashboard"
      icon={<Folder className="w-4 h-4" />}
    />
    <DropdownItem
      href="/settings"
      label="Settings"
      icon={<Settings className="w-4 h-4" />}
    />
  </DropdownContent>
</Dropdown>;
```

### External Links

```tsx
<DropdownItem
  href="https://github.com"
  target="_blank"
  label="GitHub"
  description="Visit our repository"
/>
```

### With Badges (Notifications Menu)

```tsx
import { Bell, Mail, MessageSquare } from "lucide-react";

<Dropdown>
  <DropdownTrigger>Notifications</DropdownTrigger>
  <DropdownContent>
    <DropdownItem
      href="/notifications"
      label="Notifications"
      icon={<Bell className="w-4 h-4" />}
      badge="New"
    />
    <DropdownItem
      href="/messages"
      label="Messages"
      icon={<Mail className="w-4 h-4" />}
      badge="5"
    />
    <DropdownItem
      href="/chat"
      label="Chat"
      icon={<MessageSquare className="w-4 h-4" />}
      badge="Beta"
    />
  </DropdownContent>
</Dropdown>;
```

### Multi-Section Menu

```tsx
import { User, CreditCard, Mail, Bell } from "lucide-react";

<Dropdown variant="glass">
  <DropdownTrigger>Settings</DropdownTrigger>
  <DropdownContent>
    <DropdownGroup label="Account">
      <DropdownItem
        href="/profile"
        label="Profile"
        icon={<User className="w-4 h-4" />}
        shortcut="⌘P"
      />
      <DropdownItem
        href="/billing"
        label="Billing"
        icon={<CreditCard className="w-4 h-4" />}
        badge="Pro"
      />
    </DropdownGroup>
    <DropdownSeparator />
    <DropdownGroup label="Notifications">
      <DropdownItem
        href="/notifications/email"
        label="Email"
        icon={<Mail className="w-4 h-4" />}
        badge="3"
      />
      <DropdownItem
        href="/notifications/push"
        label="Push"
        icon={<Bell className="w-4 h-4" />}
      />
    </DropdownGroup>
  </DropdownContent>
</Dropdown>;
```

### Variants

```tsx
<Dropdown variant="primary" options={options} />
<Dropdown variant="secondary" options={options} />
<Dropdown variant="accent" options={options} />
<Dropdown variant="success" options={options} />
<Dropdown variant="warning" options={options} />
<Dropdown variant="error" options={options} />
<Dropdown variant="ghost" options={options} />
<Dropdown variant="glass" options={options} />
```

### Sizes

```tsx
<Dropdown size="sm" options={options} />
<Dropdown size="md" options={options} />
<Dropdown size="lg" options={options} />
```

## Accessibility

### Keyboard Navigation

- **Enter/Space**: Open dropdown
- **Arrow Down**: Navigate to next item
- **Arrow Up**: Navigate to previous item
- **Enter**: Select highlighted item
- **Escape**: Close dropdown
- **Tab**: Close and move focus

### ARIA Support

Automatic ARIA attributes for screen readers including `role="menu"`, `aria-expanded`, `aria-haspopup`, and focus management.

## API Reference

### Dropdown Props

| Prop                | Type                                                                                                           | Default              | Description                         |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------- |
| `variant`           | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error' \| 'ghost' \| 'glass'` | `'default'`          | Color variant                       |
| `size`              | `'sm' \| 'md' \| 'lg'`                                                                                         | `'md'`               | Size                                |
| `open`              | `boolean`                                                                                                      | -                    | Controlled open state               |
| `defaultOpen`       | `boolean`                                                                                                      | `false`              | Default open state (uncontrolled)   |
| `onOpenChange`      | `(open: boolean) => void`                                                                                      | -                    | Callback when open state changes    |
| `searchable`        | `boolean`                                                                                                      | `false`              | Enable search                       |
| `searchPlaceholder` | `string`                                                                                                       | `'Search...'`        | Search input placeholder            |
| `onSearch`          | `(query: string) => void`                                                                                      | -                    | Search callback                     |
| `closeOnSelect`     | `boolean`                                                                                                      | `true`               | Close on item select                |
| `modal`             | `boolean`                                                                                                      | `false`              | Whether dropdown is modal           |
| `disabled`          | `boolean`                                                                                                      | `false`              | Disabled state                      |
| `loading`           | `boolean`                                                                                                      | `false`              | Loading state                       |
| `placeholder`       | `string`                                                                                                       | `'Menu'`             | Trigger button text (props-based)   |
| `label`             | `string`                                                                                                       | -                    | Label text (props-based)            |
| `error`             | `string`                                                                                                       | -                    | Error message (props-based)         |
| `helperText`        | `string`                                                                                                       | -                    | Helper text (props-based)           |
| `options`           | `DropdownOption[]`                                                                                             | `[]`                 | Array of menu options (props-based) |
| `side`              | `'top' \| 'bottom' \| 'left' \| 'right'`                                                                       | `'bottom'`           | Dropdown position                   |
| `align`             | `'start' \| 'center' \| 'end'`                                                                                 | `'start'`            | Dropdown alignment                  |
| `width`             | `string \| number`                                                                                             | -                    | Dropdown width                      |
| `maxHeight`         | `string`                                                                                                       | `'320px'`            | Max dropdown height                 |
| `emptyMessage`      | `string`                                                                                                       | `'No results found'` | Empty state message                 |
| `disablePortal`     | `boolean`                                                                                                      | `false`              | Disable portal rendering            |
| `className`         | `string`                                                                                                       | -                    | Additional CSS classes              |
| `triggerClassName`  | `string`                                                                                                       | -                    | Trigger CSS classes                 |
| `contentClassName`  | `string`                                                                                                       | -                    | Content CSS classes                 |

### DropdownTrigger Props

| Prop        | Type        | Default | Description                                 |
| ----------- | ----------- | ------- | ------------------------------------------- |
| `asChild`   | `boolean`   | `false` | Render as child element (use child's props) |
| `children`  | `ReactNode` | -       | Trigger content                             |
| `className` | `string`    | -       | Additional CSS classes                      |

### DropdownContent Props

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `children`  | `ReactNode` | -       | Menu content           |
| `className` | `string`    | -       | Additional CSS classes |

### DropdownItem Props

| Prop          | Type                      | Default   | Description                   |
| ------------- | ------------------------- | --------- | ----------------------------- |
| `value`       | `string`                  | -         | Item value (for actions)      |
| `label`       | `string \| ReactNode`     | -         | Item label/text               |
| `icon`        | `ReactNode`               | -         | Icon element                  |
| `avatar`      | `string`                  | -         | Avatar image URL              |
| `description` | `string`                  | -         | Description text              |
| `badge`       | `string`                  | -         | Badge text                    |
| `shortcut`    | `string`                  | -         | Keyboard shortcut display     |
| `color`       | `string`                  | -         | Custom color                  |
| `disabled`    | `boolean`                 | `false`   | Disabled state                |
| `divider`     | `boolean`                 | `false`   | Render as divider             |
| `header`      | `boolean`                 | `false`   | Render as header              |
| `href`        | `string`                  | -         | Link URL (for navigation)     |
| `target`      | `string`                  | `'_self'` | Link target                   |
| `onSelect`    | `(value: string) => void` | -         | Select callback (for actions) |
| `className`   | `string`                  | -         | Additional CSS classes        |
| `children`    | `ReactNode`               | -         | Custom content                |

### DropdownGroup Props

| Prop        | Type        | Default | Description            |
| ----------- | ----------- | ------- | ---------------------- |
| `label`     | `string`    | -       | Group label            |
| `children`  | `ReactNode` | -       | Group items            |
| `className` | `string`    | -       | Additional CSS classes |

### DropdownSeparator Props

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### DropdownOption (Props-Based)

```tsx
interface DropdownOption {
  label: string;
  value: string;
  icon?: ReactNode;
  avatar?: string;
  description?: string;
  badge?: string;
  shortcut?: string;
  color?: string;
  disabled?: boolean;
  divider?: boolean;
  header?: boolean;
  href?: string;
  target?: string;
}
```

## Key Differences: Component vs Props Pattern

| Feature                | Component-Based               | Props-Based         |
| ---------------------- | ----------------------------- | ------------------- |
| **Navigation (href)**  | ✅ Full support               | ❌ Not supported    |
| **Actions (onSelect)** | ✅ Full support               | ✅ Supported        |
| **Flexibility**        | ✅ High                       | ⚠️ Limited          |
| **Setup Speed**        | ⚠️ More code                  | ✅ Quick            |
| **Custom Trigger**     | ✅ With `asChild`             | ❌ Standard only    |
| **Best For**           | Complex menus with navigation | Simple action menus |

## Common Use Cases

### User Profile Menu (Navigation)

```tsx
import { User, Settings, CreditCard, LogOut } from "lucide-react";

<Dropdown variant="primary">
  <DropdownTrigger>My Account</DropdownTrigger>
  <DropdownContent>
    <DropdownItem
      href="/profile"
      label="Profile"
      icon={<User className="w-4 h-4" />}
      shortcut="⌘P"
    />
    <DropdownItem
      href="/settings"
      label="Settings"
      icon={<Settings className="w-4 h-4" />}
      shortcut="⌘,"
    />
    <DropdownItem
      href="/billing"
      label="Billing"
      icon={<CreditCard className="w-4 h-4" />}
    />
    <DropdownSeparator />
    <DropdownItem
      value="logout"
      label="Log Out"
      icon={<LogOut className="w-4 h-4" />}
      onSelect={() => handleLogout()}
    />
  </DropdownContent>
</Dropdown>;
```

| `loading` | `boolean` | `false` | Loading state |

### DropdownItem Props

| Prop          | Type        | Default | Description       |
| ------------- | ----------- | ------- | ----------------- |
| `icon`        | `ReactNode` | -       | Icon element      |
| `avatar`      | `string`    | -       | Avatar image URL  |
| `description` | `string`    | -       | Description text  |
| `badge`       | `string`    | -       | Badge text        |
| `shortcut`    | `string`    | -       | Keyboard shortcut |
| `disabled`    | `boolean`   | `false` | Disabled state    |
| `href`        | `string`    | -       | Link URL          |

## Related Components

- **[ContextMenu](../ContextMenu/README.md)** - Right-click menu
- **[Select](../Select/README.md)** - Form select dropdown
- **[Combobox](../Combobox/README.md)** - Autocomplete input
- **[Popover](../Popover/README.md)** - General purpose overlay

## License

MIT © Saha UI
