# New Components - Batch 3

This document provides comprehensive documentation for the 4 new components added in version 1.19.0.

## Table of Contents

1. [SpeedDial](#speeddial)
2. [Masonry](#masonry)
3. [Transfer](#transfer)
4. [StatCard](#statcard)

---

## SpeedDial

A floating action button (FAB) that expands to reveal multiple action buttons. Perfect for providing quick access to common actions in your application.

### Features

- ✨ Multiple positions (top-left, top-right, bottom-left, bottom-right)
- 📐 Multiple expansion directions (up, down, left, right)
- 🎨 Customizable colors and sizes
- 🌓 Dark mode support
- ♿ Fully accessible with ARIA attributes
- 🎭 Optional backdrop overlay
- ⌨️ Keyboard navigation (Escape to close)
- 🔄 Controlled and uncontrolled modes
- 🏷️ Action labels/tooltips

### Basic Usage

```tsx
import { SpeedDial } from '@saha-ui/react';
import { Plus, Edit, Share, Delete } from 'lucide-react';

function MyComponent() {
  const actions = [
    { id: '1', icon: <Edit />, label: 'Edit', onClick: handleEdit },
    { id: '2', icon: <Share />, label: 'Share', onClick: handleShare },
    { id: '3', icon: <Delete />, label: 'Delete', onClick: handleDelete },
  ];

  return (
    <SpeedDial
      icon={<Plus />}
      actions={actions}
      aria-label="Quick actions"
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | - | The icon to display in the main FAB button |
| `actions` | `SpeedDialAction[]` | - | Array of action items to display when expanded |
| `position` | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | `"bottom-right"` | Position of the SpeedDial on the screen |
| `direction` | `"up" \| "down" \| "left" \| "right"` | `"up"` | Direction in which actions expand |
| `color` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "error" \| "info"` | `"primary"` | Color scheme of the main button |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the SpeedDial button |
| `open` | `boolean` | - | Whether the SpeedDial is open (controlled mode) |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |
| `showLabels` | `boolean` | `true` | Whether to show labels for actions |
| `closeOnActionClick` | `boolean` | `true` | Whether to close after an action is clicked |
| `closeOnClickOutside` | `boolean` | `true` | Whether to close when clicking outside |
| `disabled` | `boolean` | `false` | Whether the SpeedDial is disabled |
| `showBackdrop` | `boolean` | `false` | Whether to show a backdrop when open |

### Advanced Examples

#### With Custom Position and Direction

```tsx
<SpeedDial
  icon={<Menu />}
  position="top-right"
  direction="down"
  actions={actions}
/>
```

#### With Backdrop

```tsx
<SpeedDial
  icon={<Plus />}
  actions={actions}
  showBackdrop={true}
  backdropClassName="bg-black/60"
/>
```

#### Controlled Mode

```tsx
const [isOpen, setIsOpen] = useState(false);

<SpeedDial
  icon={<Plus />}
  open={isOpen}
  onOpenChange={setIsOpen}
  actions={actions}
/>
```

#### With Custom Colors

```tsx
const actions = [
  { id: '1', icon: <File />, label: 'New File', color: 'primary' },
  { id: '2', icon: <Folder />, label: 'New Folder', color: 'secondary' },
  { id: '3', icon: <Upload />, label: 'Upload', color: 'success' },
];

<SpeedDial
  icon={<Add />}
  color="primary"
  actions={actions}
/>
```

---

## Masonry

A masonry layout component that arranges items in a Pinterest-style grid. Perfect for image galleries, card grids, and dynamic content.

### Features

- 📐 Responsive column configuration
- 🎨 CSS and JavaScript layout modes
- 🔢 Flexible gap/spacing options
- 🎭 Optional animations on mount
- 🌓 Dark mode support
- 📱 Mobile-friendly responsive design
- 🎯 Custom item rendering
- ⚡ Lightweight and performant

### Basic Usage

```tsx
import { Masonry } from '@saha-ui/react';

function MyComponent() {
  return (
    <Masonry columns={3} gap="md">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
    </Masonry>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `number \| MasonryColumns` | `3` | Number of columns (or responsive config) |
| `gap` | `"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Gap between masonry items |
| `mode` | `"css" \| "js"` | `"css"` | Layout mode (CSS columns or JS-based) |
| `animate` | `boolean` | `false` | Whether to animate items on mount |
| `animationDelay` | `number` | `50` | Delay between item animations (ms) |
| `renderItem` | `(child: React.ReactNode, index: number) => React.ReactNode` | - | Custom render function for each item |

### Advanced Examples

#### Responsive Columns

```tsx
<Masonry
  columns={{
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  }}
  gap="lg"
>
  {items.map((item) => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</Masonry>
```

#### Image Gallery

```tsx
<Masonry columns={4} gap="sm">
  {images.map((img) => (
    <img
      key={img.id}
      src={img.url}
      alt={img.alt}
      className="rounded-lg w-full"
    />
  ))}
</Masonry>
```

#### With Animations

```tsx
<Masonry
  columns={3}
  gap="md"
  animate={true}
  animationDelay={100}
>
  {children}
</Masonry>
```

#### JavaScript Mode

```tsx
<Masonry
  columns={3}
  gap="md"
  mode="js"
>
  {children}
</Masonry>
```

#### Custom Item Rendering

```tsx
<Masonry
  columns={3}
  gap="md"
  renderItem={(child, index) => (
    <div className="transform hover:scale-105 transition-transform">
      {child}
    </div>
  )}
>
  {children}
</Masonry>
```

---

## Transfer

A dual-list shuttle component for moving items between two lists. Perfect for selecting multiple items from a large dataset.

### Features

- 🔄 Bidirectional item transfer
- 🔍 Built-in search functionality
- ✅ Select all/none options
- 🎨 Multiple size variants
- 📐 Horizontal and vertical orientations
- 🌓 Dark mode support
- ♿ Fully accessible with keyboard navigation
- 🎯 Custom item rendering
- 📊 Item count display
- 🔧 Custom filter functions

### Basic Usage

```tsx
import { Transfer } from '@saha-ui/react';

function MyComponent() {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const items = [
    { key: '1', label: 'Item 1' },
    { key: '2', label: 'Item 2' },
    { key: '3', label: 'Item 3' },
  ];

  return (
    <Transfer
      dataSource={items}
      targetKeys={targetKeys}
      onChange={(keys) => setTargetKeys(keys)}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `TransferItem[]` | - | Data source for the transfer component |
| `targetKeys` | `string[]` | `[]` | Keys of items that are in the target list |
| `onChange` | `(targetKeys: string[], direction: "left" \| "right", movedKeys: string[]) => void` | - | Callback when target keys change |
| `titles` | `[React.ReactNode, React.ReactNode]` | `['Source', 'Target']` | Titles for the source and target lists |
| `showSearch` | `boolean` | `false` | Whether to show search box |
| `onSearch` | `(direction: "left" \| "right", value: string) => void` | - | Callback when search input changes |
| `filterOption` | `(inputValue: string, item: TransferItem) => boolean` | - | Custom filter function for search |
| `render` | `(item: TransferItem) => React.ReactNode` | - | Custom render function for list items |
| `showSelectAll` | `boolean` | `true` | Whether to show select all checkbox |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Orientation of the transfer component |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `disabled` | `boolean` | `false` | Whether the transfer is disabled |

### Advanced Examples

#### With Search

```tsx
<Transfer
  dataSource={items}
  targetKeys={targetKeys}
  onChange={handleChange}
  showSearch
  onSearch={handleSearch}
  searchPlaceholder="Search items..."
/>
```

#### With Custom Titles

```tsx
<Transfer
  dataSource={users}
  targetKeys={selectedUsers}
  onChange={handleChange}
  titles={['Available Users', 'Selected Users']}
/>
```

#### Vertical Orientation

```tsx
<Transfer
  dataSource={items}
  targetKeys={targetKeys}
  onChange={handleChange}
  orientation="vertical"
/>
```

#### Custom Rendering

```tsx
<Transfer
  dataSource={items}
  targetKeys={targetKeys}
  onChange={handleChange}
  render={(item) => (
    <div className="flex items-center gap-2">
      <Avatar src={item.data.avatar} size="sm" />
      <div>
        <div className="font-medium">{item.label}</div>
        <div className="text-xs text-muted-foreground">
          {item.description}
        </div>
      </div>
    </div>
  )}
/>
```

#### With Custom Filter

```tsx
<Transfer
  dataSource={items}
  targetKeys={targetKeys}
  onChange={handleChange}
  showSearch
  filterOption={(input, item) => {
    return (
      item.label.toLowerCase().includes(input.toLowerCase()) ||
      item.description?.toLowerCase().includes(input.toLowerCase())
    );
  }}
/>
```

---

## StatCard

A statistics card component for displaying key metrics and KPIs. Perfect for dashboards, analytics, and data visualization.

### Features

- 📊 Trend indicators (up, down, neutral)
- 🔢 Animated counter for numeric values
- 🎨 Multiple variants (default, outlined, filled, gradient, glass)
- 🎨 7 color schemes
- 📐 3 size variants
- 🌓 Dark mode support
- 💫 Loading state with skeleton
- 🖱️ Optional clickable state
- 🎯 Custom footer content
- ♿ Fully accessible

### Basic Usage

```tsx
import { StatCard } from '@saha-ui/react';
import { DollarSign } from 'lucide-react';

function MyComponent() {
  return (
    <StatCard
      title="Total Revenue"
      value="$45,231"
      icon={<DollarSign />}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `React.ReactNode` | - | The title/label of the statistic |
| `value` | `React.ReactNode` | - | The main value to display |
| `icon` | `React.ReactNode` | - | Optional icon to display |
| `description` | `React.ReactNode` | - | Optional description or subtitle |
| `trend` | `"up" \| "down" \| "neutral"` | - | Trend direction |
| `trendValue` | `React.ReactNode` | - | Trend value to display (e.g., "+12.5%") |
| `trendDescription` | `React.ReactNode` | - | Optional trend description |
| `variant` | `"default" \| "outlined" \| "filled" \| "gradient" \| "glass"` | `"default"` | The visual style variant |
| `color` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "error" \| "info"` | `"default"` | The color scheme |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | The size of the stat card |
| `footer` | `React.ReactNode` | - | Custom footer content |
| `loading` | `boolean` | `false` | Whether to show a loading state |
| `animateValue` | `boolean` | `false` | Whether to animate numeric values |
| `animationDuration` | `number` | `1000` | Duration of counter animation (ms) |
| `clickable` | `boolean` | `false` | Whether the card should be clickable |
| `onClick` | `(event: React.MouseEvent<HTMLDivElement>) => void` | - | Click handler for the card |

### Advanced Examples

#### With Trend Indicator

```tsx
<StatCard
  title="Active Users"
  value="2,543"
  trend="up"
  trendValue="+12.5%"
  trendDescription="from last month"
  icon={<Users />}
  color="success"
/>
```

#### With Custom Variant

```tsx
<StatCard
  title="Sales"
  value="$12,345"
  color="primary"
  variant="gradient"
  trend="up"
  trendValue="+23%"
  description="This month"
/>
```

#### With Animated Counter

```tsx
<StatCard
  title="Total Orders"
  value={1234}
  animateValue={true}
  animationDuration={2000}
  icon={<ShoppingCart />}
/>
```

#### Clickable Card

```tsx
<StatCard
  title="Pending Tasks"
  value="42"
  clickable={true}
  onClick={() => navigate('/tasks')}
  icon={<CheckSquare />}
  description="Click to view all"
/>
```

#### With Footer

```tsx
<StatCard
  title="Conversion Rate"
  value="3.24%"
  trend="down"
  trendValue="-2.1%"
  icon={<TrendingUp />}
  footer={
    <Button variant="ghost" size="sm">
      View Details
    </Button>
  }
/>
```

#### Loading State

```tsx
<StatCard
  title="Revenue"
  value="$0"
  loading={true}
/>
```

#### Glass Variant

```tsx
<StatCard
  title="Total Users"
  value="10,234"
  variant="glass"
  color="primary"
  icon={<Users />}
/>
```

---

## Dashboard Example

Here's a complete dashboard example using all 4 components:

```tsx
import {
  SpeedDial,
  Masonry,
  Transfer,
  StatCard
} from '@saha-ui/react';
import {
  Plus,
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Edit,
  Share,
  Download
} from 'lucide-react';

function Dashboard() {
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      trend: 'up' as const,
      trendValue: '+12.5%',
      icon: <DollarSign />,
      color: 'success' as const,
    },
    {
      title: 'Active Users',
      value: '2,543',
      trend: 'up' as const,
      trendValue: '+8.2%',
      icon: <Users />,
      color: 'primary' as const,
    },
    {
      title: 'Total Orders',
      value: '1,234',
      trend: 'down' as const,
      trendValue: '-3.1%',
      icon: <ShoppingCart />,
      color: 'warning' as const,
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      trend: 'up' as const,
      trendValue: '+1.5%',
      icon: <TrendingUp />,
      color: 'info' as const,
    },
  ];

  const speedDialActions = [
    { id: '1', icon: <Edit />, label: 'Edit', onClick: () => {} },
    { id: '2', icon: <Share />, label: 'Share', onClick: () => {} },
    { id: '3', icon: <Download />, label: 'Download', onClick: () => {} },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Grid with Masonry */}
      <Masonry
        columns={{ default: 1, sm: 2, lg: 4 }}
        gap="lg"
        animate={true}
      >
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            {...stat}
            variant="gradient"
            animateValue={true}
          />
        ))}
      </Masonry>

      {/* Transfer Component */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <Transfer
          dataSource={[
            { key: '1', label: 'John Doe' },
            { key: '2', label: 'Jane Smith' },
            { key: '3', label: 'Bob Johnson' },
          ]}
          targetKeys={targetKeys}
          onChange={(keys) => setTargetKeys(keys)}
          titles={['Available', 'Selected']}
          showSearch
        />
      </div>

      {/* Speed Dial */}
      <SpeedDial
        icon={<Plus />}
        actions={speedDialActions}
        position="bottom-right"
        showBackdrop={true}
      />
    </div>
  );
}
```

---

## Styling and Customization

All components support:

- 🎨 Custom className props
- 🌓 Dark mode out of the box
- 📐 Responsive design
- 🎭 CVA-based variants
- 💅 Tailwind CSS utilities
- 🎯 Custom rendering functions

Example of custom styling:

```tsx
<StatCard
  title="Custom Stat"
  value="100"
  className="bg-gradient-to-br from-purple-500 to-pink-500"
  valueClassName="text-white"
  iconClassName="bg-white/20"
/>
```

---

## Accessibility

All components are built with accessibility in mind:

- ♿ Semantic HTML
- ⌨️ Keyboard navigation
- 🔊 Screen reader support
- 🎯 ARIA attributes
- 🔍 Focus management

---

## TypeScript Support

All components are fully typed with comprehensive TypeScript definitions:

```tsx
import type {
  SpeedDialProps,
  MasonryProps,
  TransferProps,
  StatCardProps,
} from '@saha-ui/react';
```

---

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## Performance

- ⚡ Optimized rendering
- 🎯 Tree-shakeable exports
- 📦 Small bundle size
- 🔄 Efficient re-renders

---

## Next Steps

1. Check out the [Interactive Examples](./examples)
2. Read the [API Documentation](./api)
3. Explore [Component Patterns](./patterns)
4. Join our [Discord Community](https://discord.gg/saha-ui)

---

**Version:** 1.19.0  
**Last Updated:** November 7, 2025