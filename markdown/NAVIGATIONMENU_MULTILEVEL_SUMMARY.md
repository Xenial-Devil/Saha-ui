# NavigationMenu - Multi-Level Navigation Update ⭐

## What's New

This update adds **multi-level nested navigation** support and fixes the **glass variant for dark mode**.

### ✨ Key Features Added

1. **Multi-Level Nested Menus (3+ levels deep)**

   - Click items with children to expand/collapse
   - Smooth animations with max-height transitions
   - Chevron indicators (▶) that rotate when expanded
   - Progressive indentation for visual hierarchy

2. **Glass Variant Dark Mode Fix**

   - Light mode: `bg-white/30 border-white/20`
   - Dark mode: `bg-black/30 border-white/10`
   - Improved `backdrop-blur-md` for better glass effect

3. **State Management**

   - `defaultOpenIds` prop to pre-expand specific menus
   - Internal state tracking with `Set<string>` for efficiency
   - `toggleItem` function for expand/collapse logic

4. **Both API Support**
   - Works with compact props-based API
   - Works with composable component API

## Usage Examples

### 1. Compact API - Multi-Level

```tsx
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  {
    id: "products",
    label: "Products",
    icon: "📦",
    items: [
      { id: "all-products", label: "All Products" },
      {
        id: "categories",
        label: "Categories",
        items: [
          { id: "food", label: "Food & Beverage" },
          { id: "tech", label: "Technology" },
        ],
      },
    ],
  },
];

<NavigationMenu
  items={menuItems}
  defaultOpenIds={["products", "categories"]}
  variant="outlined"
/>;
```

### 2. Composable API - Multi-Level

```tsx
<NavigationMenu variant="glass">
  <NavigationMenuItem id="dashboard" label="Dashboard" icon="📊" />
  <NavigationMenuItem
    id="products"
    label="Products"
    icon="📦"
    items={[
      { id: "all-products", label: "All Products" },
      {
        id: "categories",
        label: "Categories",
        items: [
          { id: "food", label: "Food & Beverage" },
          { id: "tech", label: "Technology" },
        ],
      },
    ]}
  />
</NavigationMenu>
```

### 3. Glass Effect on Dark Background

```tsx
<div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 rounded-lg">
  <NavigationMenu items={menuItems} variant="glass" />
</div>
```

The glass variant now works perfectly in both light and dark modes!

## Visual Hierarchy

```
📊 Dashboard
📦 Products ▶                    (clickable, has children)
   └─ All Products
   └─ Categories ▶               (nested level 1, clickable)
      └─ Food & Beverage        (nested level 2)
      └─ Technology             (nested level 2)
👥 Users ▶
   └─ All Users
   └─ Roles                     (nested level 1)
⚙️ Settings ▶
   └─ General
   └─ Security                  (nested level 1)
   └─ Notifications             (nested level 1)
```

## Indentation Levels

- **Level 0** (Root): No indentation
- **Level 1**: `pl-6` (24px) - First nested level
- **Level 2**: `pl-9` (36px) - Second nested level
- **Level 3**: `pl-12` (48px) - Third nested level

## Technical Implementation

### MenuItemWithNesting Component

Internal recursive component that handles:

- Click events for navigation and toggle
- Chevron rendering with rotation animation
- Progressive indentation based on level
- Recursive child rendering

### State Management

```tsx
const [openItems, setOpenItems] = useState<Set<string>>(
  new Set(defaultOpenIds || [])
);

const toggleItem = (id: string) => {
  setOpenItems((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
};
```

### New CVA Variants

```tsx
// navItem variants
hasChildren: {
  true: 'font-medium',
  false: ''
}

level: {
  0: '',
  1: 'pl-6',
  2: 'pl-9',
  3: 'pl-12'
}

// navSubMenu CVA
isOpen: {
  true: 'max-h-[1000px] opacity-100',
  false: 'max-h-0 opacity-0'
}
```

## Build Metrics

- **NavigationMenu.js**: 6.23 kB (gzipped: **1.84 kB**)
- **NavigationMenu.styles.js**: 2.62 kB (gzipped: **0.90 kB**)
- **Build time**: 8.84s
- **No errors or warnings**

Size increased from 3.25 kB to 6.23 kB due to:

- MenuItemWithNesting recursive component (~80 lines)
- State management logic
- Multi-level rendering and animation logic
- New CVA variants (hasChildren, level, navSubMenu)

Gzipped size (1.84 kB) remains excellent for full navigation features!

## Examples Added

Created new "Multi-Level Navigation ⭐ NEW" section in examples with:

1. **Multi-level Outlined** - Shows defaultOpenIds usage
2. **Multi-level Glass on Gradient** - Demonstrates dark mode compatibility
3. **Composable API Multi-level** - Shows items prop pattern

## Browser Compatibility

Works with all modern browsers:

- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

Animations use standard CSS transitions - no vendor prefixes needed.

## TypeScript Support

Full type safety with:

```tsx
interface NavigationItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  items?: NavigationItem[]; // Recursive type for nesting
  onClick?: () => void;
  disabled?: boolean;
}

interface NavigationMenuProps {
  items?: NavigationItem[];
  defaultOpenIds?: string[]; // Control which menus are pre-expanded
  // ... other props
}
```

## Accessibility

- Chevron indicators provide clear visual feedback
- Clickable items have `cursor-pointer`
- Disabled state preserved from original implementation
- Keyboard navigation ready (existing role="menuitem")

## Migration Guide

No breaking changes! Existing code works as-is.

To use multi-level menus, simply add `items` array to your navigation items:

```tsx
// Before (flat navigation)
const items = [{ id: "products", label: "Products" }];

// After (nested navigation)
const items = [
  {
    id: "products",
    label: "Products",
    items: [
      { id: "all", label: "All Products" },
      { id: "categories", label: "Categories" },
    ],
  },
];
```

## Next Steps

All requested features completed:

- ✅ Multi-level nested menus
- ✅ Glass variant dark mode fix
- ✅ Expand/collapse animations
- ✅ Chevron indicators
- ✅ Progressive indentation
- ✅ State management with defaultOpenIds

Component is production-ready! 🎉
