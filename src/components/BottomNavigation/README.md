# BottomNavigation

A mobile-first navigation component that appears at the bottom of the screen, ideal for applications with 3-5 top-level destinations. Provides smooth animations, badge support, and responsive behavior.

## Features

- 📱 **Mobile-First** - Optimized for mobile and touch interfaces
- 🎨 **Multiple Variants** - Default and shifting animation styles
- 🔔 **Badge Support** - Show notifications and counts on items
- 🎯 **Auto-Hide** - Optional hide on scroll for immersive experiences
- 🌈 **Color Themes** - Primary and secondary color options
- ♿ **Accessible** - Full keyboard navigation and ARIA support
- ✨ **Smooth Animations** - Polished transitions and interactions

## Installation

```tsx
import { BottomNavigation } from "saha-ui";
```

## Basic Usage

### Simple Navigation

```tsx
import { Home, Search, User } from "lucide-react";

const items = [
  { label: "Home", icon: <Home /> },
  { label: "Search", icon: <Search /> },
  { label: "Profile", icon: <User /> },
];

function App() {
  const [active, setActive] = useState(0);

  return (
    <BottomNavigation
      items={items}
      value={active}
      onChange={(value) => setActive(value)}
    />
  );
}
```

### With Badges

```tsx
const itemsWithBadges = [
  { label: "Home", icon: <Home /> },
  { label: "Messages", icon: <Mail />, badge: 5 },
  { label: "Notifications", icon: <Bell />, badge: "!" },
  { label: "Profile", icon: <User />, badge: true }, // Dot badge
];

<BottomNavigation
  items={itemsWithBadges}
  value={active}
  onChange={setActive}
/>;
```

### With Custom Values

```tsx
const items = [
  { label: "Home", icon: <Home />, value: "home" },
  { label: "Explore", icon: <Compass />, value: "explore" },
  { label: "Profile", icon: <User />, value: "profile" },
];

const [active, setActive] = useState("home");

<BottomNavigation
  items={items}
  value={active}
  onChange={(value) => setActive(value)}
/>;
```

## Variants

### Default Variant

```tsx
<BottomNavigation
  variant="default"
  items={items}
  value={active}
  onChange={setActive}
/>
```

### Shifting Variant

```tsx
// Only shows labels for active item with smooth animation
<BottomNavigation
  variant="shifting"
  items={items}
  value={active}
  onChange={setActive}
/>
```

## Label Visibility

### Always Show Labels

```tsx
<BottomNavigation
  items={items}
  value={active}
  showLabels={true} // Default
/>
```

### Show Only Active Label

```tsx
<BottomNavigation items={items} value={active} showLabels={false} />
```

## Color Themes

```tsx
// Primary color (default)
<BottomNavigation
  items={items}
  value={active}
  color="primary"
/>

// Secondary color
<BottomNavigation
  items={items}
  value={active}
  color="secondary"
/>
```

## Advanced Features

### Hide on Scroll

```tsx
<BottomNavigation
  items={items}
  value={active}
  onChange={setActive}
  hideOnScroll // Hides when scrolling down
/>
```

### Custom Elevation

```tsx
<BottomNavigation
  items={items}
  value={active}
  elevation={5} // 0-5
/>
```

### Without Border

```tsx
<BottomNavigation items={items} value={active} bordered={false} />
```

### Custom Z-Index

```tsx
<BottomNavigation items={items} value={active} zIndex={1200} />
```

## Navigation with Links

```tsx
const items = [
  {
    label: "Home",
    icon: <Home />,
    href: "/",
    value: "home",
  },
  {
    label: "Products",
    icon: <ShoppingBag />,
    href: "/products",
    value: "products",
  },
  {
    label: "Account",
    icon: <User />,
    href: "/account",
    value: "account",
  },
];

<BottomNavigation items={items} value={currentRoute} />;
```

## Disabled Items

```tsx
const items = [
  { label: "Home", icon: <Home /> },
  { label: "Premium", icon: <Star />, disabled: true },
  { label: "Profile", icon: <User /> },
];

<BottomNavigation items={items} value={active} />;
```

## Item Click Handlers

```tsx
const items = [
  {
    label: "Home",
    icon: <Home />,
    onClick: (value) => console.log("Home clicked:", value),
  },
  {
    label: "Search",
    icon: <Search />,
    onClick: (value) => {
      console.log("Search clicked:", value);
      openSearchModal();
    },
  },
];

<BottomNavigation items={items} value={active} onChange={setActive} />;
```

## Complete Example

```tsx
import { useState } from "react";
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react";
import { BottomNavigation } from "saha-ui";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [cartCount, setCartCount] = useState(3);
  const [hasNotifications, setHasNotifications] = useState(true);

  const navigationItems = [
    {
      label: "Home",
      icon: <Home />,
      value: "home",
    },
    {
      label: "Search",
      icon: <Search />,
      value: "search",
    },
    {
      label: "Favorites",
      icon: <Heart />,
      value: "favorites",
      badge: hasNotifications, // Dot indicator
    },
    {
      label: "Cart",
      icon: <ShoppingCart />,
      value: "cart",
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      label: "Account",
      icon: <User />,
      value: "account",
    },
  ];

  return (
    <div className="min-h-screen pb-16">
      {/* Your app content */}
      <main className="p-4">{/* Content based on activeTab */}</main>

      {/* Bottom Navigation */}
      <BottomNavigation
        items={navigationItems}
        value={activeTab}
        onChange={(value) => setActiveTab(value)}
        variant="default"
        showLabels={true}
        color="primary"
        hideOnScroll={false}
        elevation={3}
      />
    </div>
  );
}
```

## Props

### BottomNavigation Props

| Prop            | Type                                | Default      | Description                         |
| --------------- | ----------------------------------- | ------------ | ----------------------------------- |
| `items`         | `BottomNavigationItem[]`            | **required** | Array of navigation items           |
| `value`         | `string \| number`                  | -            | Currently selected item value/index |
| `onChange`      | `(value: string \| number) => void` | -            | Callback when selection changes     |
| `variant`       | `"default" \| "shifting"`           | `"default"`  | Visual variant                      |
| `showLabels`    | `boolean`                           | `true`       | Show labels for all items           |
| `color`         | `"primary" \| "secondary"`          | `"primary"`  | Color theme                         |
| `hideOnScroll`  | `boolean`                           | `false`      | Hide navigation when scrolling down |
| `elevation`     | `0 \| 1 \| 2 \| 3 \| 4 \| 5`        | `3`          | Shadow elevation level              |
| `bordered`      | `boolean`                           | `true`       | Show top border                     |
| `zIndex`        | `number`                            | `1000`       | CSS z-index value                   |
| `className`     | `string`                            | -            | Additional CSS classes              |
| `itemClassName` | `string`                            | -            | CSS classes for items               |

### BottomNavigationItem Props

| Prop       | Type                                | Default      | Description                  |
| ---------- | ----------------------------------- | ------------ | ---------------------------- |
| `label`    | `string`                            | **required** | Item label text              |
| `icon`     | `ReactNode`                         | **required** | Item icon element            |
| `value`    | `string \| number`                  | index        | Custom value for item        |
| `badge`    | `string \| number \| boolean`       | -            | Badge content (true for dot) |
| `disabled` | `boolean`                           | `false`      | Disable the item             |
| `href`     | `string`                            | -            | URL to navigate to           |
| `onClick`  | `(value: string \| number) => void` | -            | Click handler                |
| `id`       | `string`                            | -            | Unique identifier            |

## Badge Types

```tsx
// Numeric badge
{ label: 'Messages', icon: <Mail />, badge: 5 }

// Text badge
{ label: 'Alerts', icon: <Bell />, badge: '!' }

// Dot indicator (boolean)
{ label: 'Updates', icon: <Info />, badge: true }

// No badge
{ label: 'Home', icon: <Home />, badge: undefined }
```

## Accessibility

The component follows accessibility best practices:

- Uses semantic `navigation` role
- Proper ARIA labels (`aria-label`, `aria-current`)
- Keyboard navigation support (Tab, Enter, Space)
- Screen reader friendly with descriptive labels
- Focus visible indicators
- Touch-friendly tap targets (minimum 44x44px)

## Best Practices

1. **Limit Items** - Use 3-5 items for optimal usability
2. **Clear Icons** - Use recognizable, simple icons
3. **Short Labels** - Keep labels concise (1-2 words)
4. **Consistent Placement** - Always at bottom on mobile
5. **Badge Usage** - Use sparingly for important notifications
6. **Active State** - Always indicate current location
7. **Touch Targets** - Ensure adequate tap target size

## Responsive Design

```tsx
// Mobile only (recommended)
<div className="block md:hidden">
  <BottomNavigation items={items} value={active} />
</div>

// Combine with desktop navigation
<>
  {/* Desktop */}
  <div className="hidden md:block">
    <AppBar items={items} />
  </div>

  {/* Mobile */}
  <div className="block md:hidden">
    <BottomNavigation items={items} value={active} />
  </div>
</>
```

## Integration Examples

### With React Router

```tsx
import { useLocation, useNavigate } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { label: "Home", icon: <Home />, value: "/" },
    { label: "Search", icon: <Search />, value: "/search" },
    { label: "Profile", icon: <User />, value: "/profile" },
  ];

  return (
    <BottomNavigation
      items={items}
      value={location.pathname}
      onChange={(value) => navigate(value)}
    />
  );
}
```

### With Next.js

```tsx
"use client";

import { usePathname, useRouter } from "next/navigation";

function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    { label: "Home", icon: <Home />, value: "/" },
    { label: "About", icon: <Info />, value: "/about" },
    { label: "Contact", icon: <Mail />, value: "/contact" },
  ];

  return (
    <BottomNavigation
      items={items}
      value={pathname}
      onChange={(value) => router.push(value as string)}
    />
  );
}
```

## Styling

The component uses Tailwind CSS and CVA for styling. You can customize using:

```tsx
// Custom container styles
<BottomNavigation
  className="bg-gradient-to-t from-blue-500 to-blue-600"
  items={items}
/>

// Custom item styles
<BottomNavigation
  itemClassName="text-white hover:text-blue-200"
  items={items}
/>
```

## Browser Support

Works in all modern browsers that support:

- CSS Grid and Flexbox
- CSS Custom Properties
- Modern JavaScript (ES6+)
- Touch Events API

## Related Components

- **AppBar** - Top navigation bar
- **Drawer** - Side navigation drawer
- **NavigationMenu** - Desktop navigation menu
- **Badge** - Standalone badge component
- **IconButton** - Icon-only buttons
