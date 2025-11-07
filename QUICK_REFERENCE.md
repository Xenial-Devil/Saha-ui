# Saha UI - Quick Reference Guide

**Version:** 1.16.0  
**Last Updated:** 2024

## 🚀 Quick Start

```bash
# Install
npm install saha-ui

# Initialize (REQUIRED)
npx saha-ui init

# Start using
import { Button, Card, ThemeProvider } from "saha-ui";
```

---

## 📦 78 Components at a Glance

### Layout (4)
- `Container` - Responsive container
- `Grid` / `GridItem` - Grid layout
- `Section` - Semantic sections
- `Stack` - Flexbox stacking

### Navigation (6)
- `Breadcrumb` - Navigation trail
- `Link` - Styled links
- `Menubar` - Menu bar
- `NavigationMenu` - Complex navigation
- `Pagination` - Page navigation
- `Steps` - Step indicator

### Forms (17)
- `Autocomplete` - Auto-complete input
- `Checkbox` / `CheckboxGroup` - Checkboxes
- `Combobox` - Searchable select
- `DatePicker` - Date picker
- `Field` - Form field wrapper
- `Form` - Form management
- `Input` - Text input
- `InputOTP` - OTP input
- `NativeSelect` - Native select
- `Radio` / `RadioGroup` - Radio buttons
- `Select` - Custom select
- `Slider` - Range slider
- `Switch` - Toggle switch
- `TagInput` - Tag input
- `TextArea` - Multi-line input
- `TextEditor` - Rich text editor
- `Upload` - File upload

### Buttons (6)
- `Button` - Primary button
- `ButtonGroup` - Grouped buttons
- `FloatingActionButton` - FAB
- `PlayButton` - Play button
- `Toggle` - Toggle button
- `ToggleGroup` - Grouped toggles

### Data Display (20)
- `Accordion` - Collapsible sections
- `Avatar` - User avatar
- `AvatarGroup` - Grouped avatars
- `Badge` - Status badge
- `Card` - Container card
- `Chip` - Info chip
- `CodeEditor` - Code editor
- `DataTable` - Advanced table
- `Empty` - Empty state
- `Image` - Enhanced image
- `Item` - List item
- `Kbd` - Keyboard key
- `Label` - Form label
- `List` / `ListItem` - Lists
- `Rating` - Star rating
- `Separator` - Divider
- `Skeleton` - Loading skeleton (6 presets)
- `Table` - Basic table
- `Tag` / `TagGroup` - Tags
- `Timeline` / `TimelineItem` - Timeline
- `Tree` / `TreeItem` - Tree view
- `Typography` - Text components

### Feedback (6)
- `Alert` - Alert messages
- `Progress` - Progress bar
- `Sonner` - Toast (alternative)
- `Spinner` - Loading spinner
- `Toast` - Toast notifications
- `Tooltip` - Hover tooltip

### Overlays (7)
- `Command` - Command palette
- `ContextMenu` - Context menu
- `Dialog` - Modal dialog
- `Drawer` - Side drawer
- `Dropdown` - Dropdown menu
- `HoverCard` - Hover card
- `Popover` - Popover

### Media (3)
- `AspectRatio` - Aspect ratio
- `Calendar` - Calendar
- `Carousel` - Image carousel

### Charts (1 + 10 types)
- `Chart` - Main component
  - LineChart
  - BarChart
  - AreaChart
  - PieChart
  - RadarChart
  - RadialBarChart
  - ScatterChart
  - ComposedChart
  - FunnelChart
  - TreemapChart

### Utility (3)
- `Collapsible` - Collapsible content
- `Resizable` - Resizable panels
- `ScrollArea` - Custom scrollbar

### Theme (2)
- `ThemeProvider` - Theme context
- `ThemeToggle` - Theme switcher

---

## 🪝 40 Hooks at a Glance

### Component Hooks (7)
- `useAccordion` - Accordion state
- `useAspectRatio` - Aspect ratio
- `useAvatar` - Avatar logic
- `useChartColors` - Chart colors
- `useChartData` - Chart data
- `useDataTable` - Table state
- `useTheme` - Theme access

### State Hooks (9)
- `useArray` - Array utilities
- `useAsync` - Async state
- `useControllableState` - Controlled state
- `useCounter` - Counter
- `useDisclosure` - Open/close
- `useLocalStorage` - Local storage
- `useSessionStorage` - Session storage
- `useToggle` - Boolean toggle
- `usePrevious` - Previous value

### DOM & Events (8)
- `useClickOutside` - Click outside
- `useDOM` - DOM utilities
- `useEventListener` - Events
- `useFocusTrap` - Focus trap
- `useHover` - Hover state
- `useIntersectionObserver` - Intersection
- `useScrollLock` - Scroll lock
- `useWindowSize` - Window size

### Form Hooks (2)
- `useForm` - Form state
- `useValidation` - Validation

### Utility Hooks (14)
- `useAnimation` - Animations
- `useClipboard` - Clipboard
- `useColorMode` - Color mode
- `useDebounce` - Debounce
- `useFetch` - Fetching
- `useInterval` - Intervals
- `useMediaQuery` - Media queries
- `useMergedRefs` - Merge refs
- `usePagination` - Pagination
- `useReducedMotion` - Motion pref
- `useSearchFilter` - Search
- `useThrottle` - Throttle
- `useTimeout` - Timeouts
- `useUpdateEffect` - Update effect

---

## 💡 Common Patterns

### Import Styles

```tsx
// Named imports (recommended)
import { Button, Card, Input } from "saha-ui";

// Direct imports (better tree-shaking)
import { Button } from "saha-ui/components/Button";

// Types
import type { ButtonProps } from "saha-ui";

// Utilities
import { cn } from "saha-ui/lib/utils";
```

### Theme Setup

```tsx
import { ThemeProvider } from "saha-ui";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      {children}
    </ThemeProvider>
  );
}
```

### Next.js Setup

```tsx
// app/providers.tsx
"use client";
import { ThemeProvider } from "saha-ui";

export function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## 🎨 Variant Cheatsheet

### Common Variants
- `primary` - Primary brand color
- `secondary` - Secondary color
- `success` - Success state
- `warning` - Warning state
- `danger` / `error` - Error state
- `info` - Informational
- `ghost` - Transparent
- `outline` - Outlined
- `glass` - Glass morphism
- `gradient` - Gradient effect

### Common Sizes
- `xs` - Extra small
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large
- `xl` - Extra large

### Common Shapes
- `square` - Square shape
- `rounded` - Rounded corners
- `pill` - Pill shape
- `circle` - Circle shape

---

## 🔥 Popular Component Combos

### Form with Validation
```tsx
<Form onSubmit={handleSubmit}>
  <Field>
    <Label>Email</Label>
    <Input type="email" required />
    <FieldDescription>Enter your email</FieldDescription>
  </Field>
  <Button type="submit">Submit</Button>
</Form>
```

### Card with Avatar
```tsx
<Card variant="glass" hoverable>
  <CardHeader>
    <Avatar src="/user.jpg" status="online" />
    <Badge variant="success">Active</Badge>
  </CardHeader>
  <CardContent>
    <Typography variant="h3">User Name</Typography>
  </CardContent>
</Card>
```

### Data Table
```tsx
const table = useDataTable({
  data,
  columns,
  enableSorting: true,
  enableFiltering: true,
  enablePagination: true,
});

<DataTable table={table} />;
```

### Dialog with Form
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
    </DialogHeader>
    <DialogBody>
      <Form>{/* form fields */}</Form>
    </DialogBody>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 🎯 Performance Tips

1. **Tree-shaking**: Use direct imports for smaller bundles
2. **Code splitting**: Import components only where needed
3. **Lazy loading**: Use React.lazy for heavy components
4. **Memoization**: Wrap expensive computations with useMemo
5. **Virtual scrolling**: Use DataTable for large datasets

---

## 🔧 Customization

### Tailwind Config
```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/saha-ui/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of config
};
```

### CSS Variables
```css
:root {
  --primary: oklch(0.6 0.2 250);
  --secondary: oklch(0.7 0.15 200);
  /* ... customize colors */
}
```

### Custom Variants
```tsx
import { buttonVariants } from "saha-ui";
import { cn } from "saha-ui/lib/utils";

<button className={cn(buttonVariants({ variant: "primary" }), "custom-class")}>
  Custom Button
</button>
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

### Mobile-First Approach
```tsx
<Container className="px-4 sm:px-6 lg:px-8">
  <Grid cols={{ base: 1, md: 2, lg: 3 }}>
    <GridItem>Content</GridItem>
  </Grid>
</Container>
```

---

## ♿ Accessibility

All components include:
- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast compliance

### Keyboard Shortcuts
- `Tab` - Navigate forward
- `Shift+Tab` - Navigate backward
- `Enter` / `Space` - Activate
- `Esc` - Close dialogs/dropdowns
- `Arrow keys` - Navigate lists/menus
- `⌘K` / `Ctrl+K` - Open command palette

---

## 🐛 Common Issues

### Styles not working?
```bash
# Run the init command
npx saha-ui init
```

### TypeScript errors?
```tsx
// Import types explicitly
import type { ButtonProps } from "saha-ui";
```

### Dark mode not working?
```tsx
// Ensure ThemeProvider wraps your app
<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>
```

---

## 📚 Resources

- **Documentation**: See README.md
- **Analysis**: See COMPONENTS_ANALYSIS.md
- **Examples**: See /examples directory
- **Types**: Full TypeScript definitions included
- **Support**: GitHub Issues

---

## 🎓 Learning Path

1. **Day 1**: Setup + Button, Card, Input
2. **Day 2**: Forms + validation
3. **Day 3**: Layout components (Grid, Stack, Container)
4. **Day 4**: Navigation + overlays (Dialog, Drawer)
5. **Day 5**: Data tables + charts
6. **Week 2**: Advanced customization + theming

---

**Quick Reference v1.0** | **Saha UI v1.16.0**