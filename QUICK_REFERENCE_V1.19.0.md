# Quick Reference Guide - Saha UI v1.19.0

## New Components Overview

Four new components added in v1.19.0:

1. **SpeedDial** - Floating action button with expandable actions
2. **Masonry** - Pinterest-style grid layout
3. **Transfer** - Dual-list shuttle component
4. **StatCard** - Statistics card with trends

---

## SpeedDial

### Basic Usage
```tsx
import { SpeedDial } from '@saha-ui/react';

<SpeedDial
  icon={<Plus />}
  actions={[
    { id: '1', icon: <Edit />, label: 'Edit', onClick: handleEdit },
    { id: '2', icon: <Share />, label: 'Share', onClick: handleShare },
  ]}
/>
```

### Key Props
- `icon` - Main button icon
- `actions` - Array of action items
- `position` - "top-left" | "top-right" | "bottom-left" | "bottom-right"
- `direction` - "up" | "down" | "left" | "right"
- `color` - "primary" | "secondary" | "success" | "warning" | "error" | "info"
- `showBackdrop` - Show backdrop overlay
- `open` / `onOpenChange` - Controlled mode

### Common Patterns
```tsx
// With backdrop
<SpeedDial icon={<Plus />} actions={actions} showBackdrop />

// Controlled
const [open, setOpen] = useState(false);
<SpeedDial icon={<Plus />} actions={actions} open={open} onOpenChange={setOpen} />

// Custom position
<SpeedDial icon={<Plus />} actions={actions} position="top-right" direction="down" />
```

---

## Masonry

### Basic Usage
```tsx
import { Masonry } from '@saha-ui/react';

<Masonry columns={3} gap="md">
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</Masonry>
```

### Key Props
- `columns` - Number or responsive object
- `gap` - "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
- `mode` - "css" | "js"
- `animate` - Enable mount animations
- `renderItem` - Custom item renderer

### Common Patterns
```tsx
// Responsive columns
<Masonry columns={{ default: 1, sm: 2, md: 3, lg: 4 }} gap="lg">
  {children}
</Masonry>

// With animations
<Masonry columns={3} gap="md" animate animationDelay={100}>
  {children}
</Masonry>

// JavaScript mode
<Masonry columns={3} gap="md" mode="js">
  {children}
</Masonry>

// Custom rendering
<Masonry
  columns={3}
  renderItem={(child, index) => (
    <div className="hover:scale-105 transition">{child}</div>
  )}
>
  {children}
</Masonry>
```

---

## Transfer

### Basic Usage
```tsx
import { Transfer } from '@saha-ui/react';

const [targetKeys, setTargetKeys] = useState<string[]>([]);

<Transfer
  dataSource={items}
  targetKeys={targetKeys}
  onChange={(keys) => setTargetKeys(keys)}
/>
```

### Key Props
- `dataSource` - Array of TransferItem objects
- `targetKeys` - Keys of selected items
- `onChange` - Callback when selection changes
- `titles` - ["Source", "Target"] labels
- `showSearch` - Enable search
- `render` - Custom item renderer
- `orientation` - "horizontal" | "vertical"

### TransferItem Structure
```tsx
interface TransferItem {
  key: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  data?: any;
}
```

### Common Patterns
```tsx
// With search
<Transfer
  dataSource={items}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  showSearch
  searchPlaceholder="Search items..."
/>

// Custom titles
<Transfer
  dataSource={users}
  targetKeys={selectedUsers}
  onChange={setSelectedUsers}
  titles={['Available Users', 'Selected Users']}
/>

// Custom rendering
<Transfer
  dataSource={items}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  render={(item) => (
    <div className="flex items-center gap-2">
      <Avatar src={item.data.avatar} size="sm" />
      <span>{item.label}</span>
    </div>
  )}
/>

// Vertical layout
<Transfer
  dataSource={items}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  orientation="vertical"
/>
```

---

## StatCard

### Basic Usage
```tsx
import { StatCard } from '@saha-ui/react';

<StatCard
  title="Total Revenue"
  value="$45,231"
  icon={<DollarSign />}
/>
```

### Key Props
- `title` - Card title/label
- `value` - Main statistic value
- `icon` - Optional icon
- `trend` - "up" | "down" | "neutral"
- `trendValue` - Trend percentage
- `variant` - "default" | "outlined" | "filled" | "gradient" | "glass"
- `color` - "primary" | "secondary" | "success" | "warning" | "error" | "info"
- `animateValue` - Animate numeric values
- `loading` - Show skeleton loader
- `clickable` - Make card clickable

### Common Patterns
```tsx
// With trend
<StatCard
  title="Active Users"
  value="2,543"
  trend="up"
  trendValue="+12.5%"
  trendDescription="from last month"
  icon={<Users />}
  color="success"
/>

// Gradient variant
<StatCard
  title="Sales"
  value="$12,345"
  variant="gradient"
  color="primary"
  trend="up"
  trendValue="+23%"
/>

// Animated counter
<StatCard
  title="Orders"
  value={1234}
  animateValue
  animationDuration={2000}
/>

// Clickable
<StatCard
  title="Tasks"
  value="42"
  clickable
  onClick={() => navigate('/tasks')}
/>

// With footer
<StatCard
  title="Revenue"
  value="$45,231"
  footer={<Button variant="ghost" size="sm">View Details</Button>}
/>

// Loading state
<StatCard title="Revenue" value="$0" loading />
```

---

## Complete Dashboard Example

```tsx
import { SpeedDial, Masonry, Transfer, StatCard } from '@saha-ui/react';
import { Plus, Edit, Share, Download, DollarSign, Users, ShoppingCart } from 'lucide-react';

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
  ];

  const actions = [
    { id: '1', icon: <Edit />, label: 'Edit', onClick: () => {} },
    { id: '2', icon: <Share />, label: 'Share', onClick: () => {} },
    { id: '3', icon: <Download />, label: 'Download', onClick: () => {} },
  ];

  const users = [
    { key: '1', label: 'John Doe', description: 'Administrator' },
    { key: '2', label: 'Jane Smith', description: 'Editor' },
    { key: '3', label: 'Bob Johnson', description: 'Viewer' },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <Masonry columns={{ default: 1, sm: 2, lg: 3 }} gap="lg" animate>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            {...stat}
            variant="gradient"
            animateValue
          />
        ))}
      </Masonry>

      {/* User Management */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <Transfer
          dataSource={users}
          targetKeys={targetKeys}
          onChange={(keys) => setTargetKeys(keys)}
          titles={['Available Users', 'Assigned Users']}
          showSearch
        />
      </div>

      {/* Quick Actions */}
      <SpeedDial
        icon={<Plus />}
        actions={actions}
        position="bottom-right"
        showBackdrop
      />
    </div>
  );
}
```

---

## Import Paths

```tsx
// Components
import {
  SpeedDial,
  Masonry,
  Transfer,
  StatCard,
} from '@saha-ui/react';

// Types
import type {
  SpeedDialProps,
  SpeedDialAction,
  MasonryProps,
  TransferProps,
  TransferItem,
  StatCardProps,
} from '@saha-ui/react';

// Styles (for customization)
import {
  speedDialVariants,
  masonryVariants,
  transferVariants,
  statCardVariants,
} from '@saha-ui/react';
```

---

## TypeScript Types

### SpeedDial
```tsx
interface SpeedDialAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info";
}
```

### Masonry
```tsx
type MasonryColumns = number | {
  default?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  "2xl"?: number;
};
```

### Transfer
```tsx
interface TransferItem {
  key: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  data?: any;
}
```

### StatCard
```tsx
type StatCardTrend = "up" | "down" | "neutral";
type StatCardVariant = "default" | "outlined" | "filled" | "gradient" | "glass";
type StatCardColor = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info";
```

---

## Styling & Customization

All components support:
- `className` - Custom CSS classes
- Dark mode (automatic)
- Responsive design (built-in)
- Tailwind utilities

```tsx
// Custom styling example
<StatCard
  title="Custom"
  value="100"
  className="bg-gradient-to-br from-purple-500 to-pink-500"
  valueClassName="text-white"
  iconClassName="bg-white/20"
/>
```

---

## Browser Support

✅ Chrome (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Edge (latest)

---

## Performance Tips

**SpeedDial:**
- Use `closeOnActionClick` to auto-close after action
- Limit to 6-8 actions for best UX

**Masonry:**
- Use CSS mode for better performance
- Use JS mode for precise control
- Limit animations for large datasets

**Transfer:**
- Add virtualization for 1000+ items
- Use `filterOption` for custom search logic
- Debounce search input for large lists

**StatCard:**
- Use `loading` prop for async data
- Enable `animateValue` only when needed
- Use `clickable` for navigation cards

---

## Accessibility

All components include:
- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support

---

## Version Information

**Version:** 1.19.0  
**Release Date:** November 7, 2025  
**Components Added:** 4  
**Total Code:** 5,000+ lines

---

## Resources

- [Full Documentation](./NEW_COMPONENTS_BATCH3.md)
- [Technical Summary](./COMPONENTS_BATCH3_SUMMARY.md)
- [Implementation Report](./IMPLEMENTATION_REPORT_V1.19.0.md)
- [Examples](./src/examples/SpeedDialExample.tsx)

---

**Need help?** Check the full documentation or open an issue on GitHub.