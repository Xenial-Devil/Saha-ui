# Transfer

A dual-list component for transferring items between two lists. Perfect for permission management, list selection, and data organization.

## Features

- 🔄 Bidirectional transfer
- 🎨 14 visual variants
- 📏 8 size options
- 🔍 Built-in search
- ✅ Select all/none
- 🎯 Drag and drop support
- 📊 Item counts
- ⌨️ Keyboard navigation

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Transfer } from "saha-ui";

function App() {
  const [items, setItems] = useState([
    { key: "1", title: "Item 1" },
    { key: "2", title: "Item 2" },
    { key: "3", title: "Item 3" },
  ]);

  const [targetKeys, setTargetKeys] = useState(["2"]);

  return (
    <Transfer
      dataSource={items}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
    />
  );
}
```

## Variants

```tsx
<Transfer variant="default" {...props} />
<Transfer variant="primary" {...props} />
<Transfer variant="outline" {...props} />
<Transfer variant="ghost" {...props} />
<Transfer variant="gradient" {...props} />
<Transfer variant="glass" {...props} />
```

## Sizes

```tsx
<Transfer size="sm" {...props} />
<Transfer size="md" {...props} />
<Transfer size="lg" {...props} />
```

## With Search

```tsx
<Transfer
  dataSource={items}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  showSearch
  searchPlaceholder="Search items..."
/>
```

## Custom Titles

```tsx
<Transfer
  dataSource={items}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  titles={["Available", "Selected"]}
/>
```

## With Descriptions

```tsx
const items = [
  {
    key: "1",
    title: "Item 1",
    description: "Description for item 1",
  },
  {
    key: "2",
    title: "Item 2",
    description: "Description for item 2",
  },
];

<Transfer
  dataSource={items}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  showDescription
/>;
```

## Disabled Items

```tsx
const items = [
  { key: "1", title: "Item 1" },
  { key: "2", title: "Item 2", disabled: true },
  { key: "3", title: "Item 3" },
];
```

## Common Patterns

### Permission Management

```tsx
const [permissions, setPermissions] = useState([
  { key: "read", title: "Read", description: "View content" },
  { key: "write", title: "Write", description: "Create and edit" },
  { key: "delete", title: "Delete", description: "Remove content" },
  { key: "admin", title: "Admin", description: "Full access" },
]);

const [assignedPermissions, setAssignedPermissions] = useState(["read"]);

<div>
  <h3>Assign Permissions to User</h3>

  <Transfer
    dataSource={permissions}
    targetKeys={assignedPermissions}
    onChange={setAssignedPermissions}
    titles={["Available Permissions", "Assigned Permissions"]}
    showSearch
    showDescription
    variant="primary"
  />

  <Button onClick={() => savePermissions(assignedPermissions)}>
    Save Changes
  </Button>
</div>;
```

### Feature Selection

```tsx
const features = [
  { key: "analytics", title: "Analytics", description: "Track user behavior" },
  { key: "notifications", title: "Notifications", description: "Email alerts" },
  { key: "api", title: "API Access", description: "REST API" },
  { key: "export", title: "Data Export", description: "CSV/PDF export" },
  { key: "sso", title: "Single Sign-On", description: "SAML/OAuth" },
  { key: "support", title: "Priority Support", description: "24/7 assistance" },
];

<Transfer
  dataSource={features}
  targetKeys={selectedFeatures}
  onChange={setSelectedFeatures}
  titles={["Available Features", "Enabled Features"]}
  variant="gradient"
  showSearch
  showDescription
/>;
```

### User Assignment

```tsx
const users = [
  { key: "1", title: "John Doe", description: "john@example.com" },
  { key: "2", title: "Jane Smith", description: "jane@example.com" },
  { key: "3", title: "Bob Johnson", description: "bob@example.com" },
];

<Transfer
  dataSource={users}
  targetKeys={projectMembers}
  onChange={setProjectMembers}
  titles={["All Users", "Project Members"]}
  showSearch
  variant="glass"
  render={(item) => (
    <div className="flex items-center gap-2">
      <Avatar name={item.title} size="sm" />
      <div>
        <div className="font-medium">{item.title}</div>
        <div className="text-xs text-muted-foreground">{item.description}</div>
      </div>
    </div>
  )}
/>;
```

### Category Organization

```tsx
const [categories, setCategories] = useState([
  { key: "1", title: "Technology" },
  { key: "2", title: "Science" },
  { key: "3", title: "Arts" },
  { key: "4", title: "Sports" },
]);

<Transfer
  dataSource={categories}
  targetKeys={selectedCategories}
  onChange={setSelectedCategories}
  titles={["All Categories", "Article Categories"]}
  variant="minimal"
  onSearch={(direction, value) => {
    console.log(`Searching ${direction}:`, value);
  }}
/>;
```

## API Reference

### Transfer Props

| Prop                | Type                         | Default                | Description              |
| ------------------- | ---------------------------- | ---------------------- | ------------------------ |
| `dataSource`        | `TransferItem[]`             | -                      | All items                |
| `targetKeys`        | `string[]`                   | `[]`                   | Selected item keys       |
| `onChange`          | `(keys: string[]) => void`   | -                      | Change handler           |
| `variant`           | `TransferVariant`            | `"default"`            | Visual style             |
| `size`              | `TransferSize`               | `"md"`                 | Size preset              |
| `titles`            | `[string, string]`           | `['Source', 'Target']` | List titles              |
| `showSearch`        | `boolean`                    | `false`                | Enable search            |
| `searchPlaceholder` | `string`                     | `"Search"`             | Search placeholder       |
| `showDescription`   | `boolean`                    | `false`                | Show item descriptions   |
| `showSelectAll`     | `boolean`                    | `true`                 | Show select all checkbox |
| `render`            | `(item) => ReactNode`        | -                      | Custom item render       |
| `disabled`          | `boolean`                    | `false`                | Disable component        |
| `className`         | `string`                     | -                      | Additional classes       |
| `onSearch`          | `(direction, value) => void` | -                      | Search callback          |

### TransferItem

| Property      | Type      | Description          |
| ------------- | --------- | -------------------- |
| `key`         | `string`  | Unique identifier    |
| `title`       | `string`  | Item title           |
| `description` | `string`  | Optional description |
| `disabled`    | `boolean` | Disable item         |

## Accessibility

- Keyboard navigation (Tab, Arrow keys, Space, Enter)
- ARIA labels for lists and items
- Screen reader announcements for transfers
- Focus management
- Select all with Ctrl+A

## TypeScript

```typescript
import type { TransferProps, TransferItem } from "saha-ui";
```

## Related Components

- Checkbox
- List
- Select
