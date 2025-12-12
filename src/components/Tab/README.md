# Tab

A flexible tabs component for organizing content into separate views. Features multiple variants, sizes, icons, badges, and keyboard navigation.

## Features

- 🎨 14 visual variants (default, primary, secondary, accent, etc.)
- 📏 8 size options (xs to 4xl)
- 🎯 Icon support
- 🔢 Badge indicators
- ⌨️ Keyboard navigation (Arrow keys)
- 📱 Responsive and mobile-friendly
- ♿ Fully accessible with ARIA support
- 🎭 Full-width option

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "saha-ui";

function MyTabs() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>

      <TabsContent value="tab1">
        <p>Content for tab 1</p>
      </TabsContent>

      <TabsContent value="tab2">
        <p>Content for tab 2</p>
      </TabsContent>

      <TabsContent value="tab3">
        <p>Content for tab 3</p>
      </TabsContent>
    </Tabs>
  );
}
```

## Variants

```tsx
<TabsList variant="default">...</TabsList>
<TabsList variant="primary">...</TabsList>
<TabsList variant="bordered">...</TabsList>
<TabsList variant="elevated">...</TabsList>
<TabsList variant="glass">...</TabsList>
<TabsList variant="minimal">...</TabsList>
```

## Sizes

```tsx
<TabsList size="sm">...</TabsList>
<TabsList size="md">...</TabsList>
<TabsList size="lg">...</TabsList>
```

## With Icons

```tsx
import { Home, Settings, User } from "lucide-react";

<Tabs defaultValue="home">
  <TabsList>
    <TabsTrigger value="home" icon={<Home />}>
      Home
    </TabsTrigger>
    <TabsTrigger value="profile" icon={<User />}>
      Profile
    </TabsTrigger>
    <TabsTrigger value="settings" icon={<Settings />}>
      Settings
    </TabsTrigger>
  </TabsList>

  {/* Content */}
</Tabs>;
```

## With Badges

```tsx
<Tabs defaultValue="all">
  <TabsList>
    <TabsTrigger value="all" badge={42}>
      All
    </TabsTrigger>
    <TabsTrigger value="unread" badge={3}>
      Unread
    </TabsTrigger>
    <TabsTrigger value="archived">Archived</TabsTrigger>
  </TabsList>

  {/* Content */}
</Tabs>
```

## Full Width

```tsx
<TabsList fullWidth>
  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
</TabsList>
```

## Controlled

```tsx
function ControlledTabs() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>

      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  );
}
```

## Common Patterns

### Settings Tabs

```tsx
<Tabs defaultValue="general">
  <TabsList variant="bordered">
    <TabsTrigger value="general" icon={<Settings />}>
      General
    </TabsTrigger>
    <TabsTrigger value="security" icon={<Lock />}>
      Security
    </TabsTrigger>
    <TabsTrigger value="notifications" icon={<Bell />}>
      Notifications
    </TabsTrigger>
  </TabsList>

  <TabsContent value="general">
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>{/* Settings form */}</CardContent>
    </Card>
  </TabsContent>

  {/* Other content */}
</Tabs>
```

### Dashboard Tabs

```tsx
<Tabs defaultValue="overview" className="w-full">
  <TabsList fullWidth variant="glass">
    <TabsTrigger value="overview" icon={<LayoutDashboard />} badge={12}>
      Overview
    </TabsTrigger>
    <TabsTrigger value="analytics" icon={<BarChart />}>
      Analytics
    </TabsTrigger>
    <TabsTrigger value="reports" icon={<FileText />}>
      Reports
    </TabsTrigger>
  </TabsList>

  {/* Dashboard content */}
</Tabs>
```

## API Reference

### Tabs Props

| Prop            | Type                      | Default | Description                 |
| --------------- | ------------------------- | ------- | --------------------------- |
| `value`         | `string`                  | -       | Controlled active tab value |
| `defaultValue`  | `string`                  | -       | Default active tab          |
| `onValueChange` | `(value: string) => void` | -       | Value change callback       |
| `className`     | `string`                  | -       | CSS classes                 |
| `children`      | `ReactNode`               | -       | Tab components              |

### TabsList Props

| Prop        | Type         | Default     | Description     |
| ----------- | ------------ | ----------- | --------------- |
| `variant`   | `TabVariant` | `"default"` | Visual variant  |
| `size`      | `TabSize`    | `"md"`      | Size            |
| `fullWidth` | `boolean`    | `false`     | Full width tabs |
| `className` | `string`     | -           | CSS classes     |

### TabsTrigger Props

| Prop        | Type               | Default | Description               |
| ----------- | ------------------ | ------- | ------------------------- |
| `value`     | `string`           | -       | Tab identifier (required) |
| `icon`      | `ReactNode`        | -       | Icon element              |
| `badge`     | `string \| number` | -       | Badge content             |
| `disabled`  | `boolean`          | `false` | Disabled state            |
| `className` | `string`           | -       | CSS classes               |

### TabsContent Props

| Prop        | Type        | Default | Description                   |
| ----------- | ----------- | ------- | ----------------------------- |
| `value`     | `string`    | -       | Matching tab value (required) |
| `className` | `string`    | -       | CSS classes                   |
| `children`  | `ReactNode` | -       | Content                       |

## Accessibility

- Full keyboard navigation (Arrow keys, Home, End)
- ARIA roles and attributes
- Focus management
- Screen reader announcements

## Related Components

- [Card](../Card/README.md)
- [Paper](../Paper/README.md)

## TypeScript

```typescript
import type { TabsProps, TabsListProps, TabsTriggerProps } from "saha-ui";
```
