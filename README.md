<div align="center">
  <h1>🎨 Saha UI</h1>
  <p><strong>Ultra-Modern React Component Library</strong></p>

  <p>
    <a href="https://www.npmjs.com/package/saha-ui"><img src="https://img.shields.io/npm/v/saha-ui.svg?style=flat-square" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/saha-ui"><img src="https://img.shields.io/npm/dm/saha-ui.svg?style=flat-square" alt="npm downloads"></a>
    <a href="https://github.com/Xenial-Devil/Saha-ui/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/saha-ui.svg?style=flat-square" alt="license"></a>
    <a href="https://github.com/Xenial-Devil/Saha-ui"><img src="https://img.shields.io/github/stars/Xenial-Devil/Saha-ui?style=flat-square" alt="stars"></a>
  </p>

  <p>
    A beautiful, accessible, and type-safe React component library built with<br/>
    <strong>TypeScript</strong> • <strong>Tailwind CSS v4</strong> • <strong>OKLCH Colors</strong> • <strong>Glass Morphism</strong><br/>
    ✅ <strong>Next.js 15/16 Ready</strong> • <strong>App Router</strong> • <strong>Server Components</strong>
  </p>

  <p>
    <a href="#-installation">Installation</a> •
    <a href="#-features">Features</a> •
    <a href="#-components">Components</a> •
    <a href="#-nextjs-1516-compatibility">Next.js Guide</a> •
    <a href="#-quick-examples">Quick Examples</a> •
    <a href="#-documentation">Documentation</a>
  </p>
</div>

---

## ✨ Features

- 🎨 **98 Modern Components** - Accordion, Affix, Alert, AppBar, AspectRatio, Autocomplete, Avatar, AvatarGroup, Backdrop, Badge, BottomNavigation, Breadcrumb, Button, ButtonGroup, Calendar, Card, Carousel, Chart (10 chart types), Checkbox, Chip, CodeEditor, Collapsible, ColorPicker, Combobox, Command, Container, ContextMenu, DataTable, DatePicker, Dialog, Drawer, Dropdown, Empty, Field, FileInput, FloatingActionButton, Form, Grid, HoverCard, IconButton, Image, Input, InputOTP, Item, Kbd, Label, Link, List, Masonry, Menubar, NativeSelect, NavigationMenu, Notification, NumberInput, Pagination, Paper, PlayButton, Popover, Progress, Radio, Rating, Resizable, Result, ScrollArea, Section, Segmented, Select, Separator, Skeleton (6 presets), Slider, Snackbar, Sonner, SpeedDial, Spinner, Stack, StatCard, Stepper, Steps, Switch, Tab, Table, Tag, TagInput, TextArea, TextEditor, ThemeProvider, ThemeToggle, Timeline, Toast, Toggle, ToggleGroup, Tooltip, Tour, Transfer, Tree, Typography, Upload, VideoPlayer
- ⚡ **Next.js 15/16 Ready** - Full App Router support with Server & Client Components
- 🌓 **Dark Mode** - Seamless theme switching with full dark mode support
- 🔮 **Glass Morphism** - Beautiful backdrop blur effects across components
- 🎯 **Type-Safe** - Full TypeScript support with comprehensive prop types
- ♿ **Accessible** - ARIA-compliant with keyboard navigation
- 🎭 **CVA Variants** - Type-safe variant management with class-variance-authority
- 🎨 **OKLCH Colors** - Perceptually uniform color system for accurate theming
- ⚡ **Tree-Shakeable** - Import only what you need, optimized bundle size
- 📦 **Modular** - Individual component imports for maximum flexibility
- 📱 **Responsive** - Mobile-first design with touch gesture support
- 🔧 **Customizable** - Easy to extend and customize with Tailwind CSS
- 📏 **Flexible Sizing** - All components support comprehensive size variants (xs, sm, md, lg, xl, 2xl, 3xl, 4xl)
- 🪝 **39 Custom Hooks** - Comprehensive hook library including useAccordion, useAnimation, useArray, useAspectRatio, useAsync, useAvatar, useChartColors, useChartData, useClickOutside, useClipboard, useColorMode, useControllableState, useCounter, useDataTable, useDebounce, useDisclosure, useDOM, useEventListener, useFetch, useFocusTrap, useForm, useHover, useIntersectionObserver, useInterval, useLocalStorage, useMediaQuery, useMergedRefs, usePagination, usePrevious, useReducedMotion, useScrollLock, useSearchFilter, useSessionStorage, useThrottle, useTimeout, useToggle, useUpdateEffect, useValidation, useWindowSize

---

## 📦 Installation

### Step 1: Install the package

```bash
# npm
npm install saha-ui

# yarn
yarn add saha-ui

# pnpm
pnpm add saha-ui
```

### Step 2: Initialize Saha UI (REQUIRED)

Run this command in your project root to setup CSS and Tailwind configuration:

```bash
# npm
npx saha-ui@latest init

# yarn
yarn dlx saha-ui@latest init

# pnpm
pnpm dlx saha-ui@latest init
```

This will automatically:

- ✅ Inject CSS variables and design tokens
- ✅ Configure Tailwind to scan Saha UI components in `node_modules`
- ✅ Install required dependencies
- ✅ Detect your Tailwind version (v3 or v4) and configure accordingly

**Without this step, the components will not be styled properly!**

See [CSS_DISTRIBUTION_SOLUTION.md](./CSS_DISTRIBUTION_SOLUTION.md) for detailed explanation.

### Peer Dependencies

Saha UI requires React 18+ or React 19+:

```bash
# npm
npm install react@^18.0.0 react-dom@^18.0.0
# or
npm install react@^19.0.0 react-dom@^19.0.0

# yarn
yarn add react@^18.0.0 react-dom@^18.0.0
# or
yarn add react@^19.0.0 react-dom@^19.0.0

# pnpm
pnpm add react@^18.0.0 react-dom@^18.0.0
# or
pnpm add react@^19.0.0 react-dom@^19.0.0
```

## 🚀 Quick Start

### 1. Wrap your app with ThemeProvider

```tsx
import { ThemeProvider } from "saha-ui";

function App() {
  return <ThemeProvider>{/* Your app content */}</ThemeProvider>;
}
```

### 2. Import and use components

**Option A: Named imports from main entry (recommended)**

```tsx
import { Button, ButtonGroup, Card, Avatar, Badge } from "saha-ui";
import type { ButtonVariant, CardProps, BadgeProps } from "saha-ui";

function MyComponent() {
  return (
    <Card variant="glass" hoverable>
      <div className="flex items-center gap-2">
        <Avatar src="/user.jpg" alt="User" size="lg" status="online" />
        <Badge variant="success" dot pulse>
          Active
        </Badge>
      </div>
      <ButtonGroup>
        <Button variant="primary" size="md">
          Save
        </Button>
        <Button variant="ghost" size="md">
          Cancel
        </Button>
      </ButtonGroup>
    </Card>
  );
}
```

**Option B: Direct component imports (better tree-shaking)**

```tsx
import { Button } from "saha-ui/components/Button";
import { Card } from "saha-ui/components/Card";
import { Avatar } from "saha-ui/components/Avatar";
import type { ButtonProps } from "saha-ui/components/Button/Button.types";

function MyComponent() {
  return (
    <Card variant="glass" hoverable>
      <Avatar src="/user.jpg" alt="User" size="lg" status="online" />
      <Button variant="primary" size="md">
        Click me
      </Button>
    </Card>
  );
}
```

**Option C: Utility imports**

```tsx
import { cn } from "saha-ui/lib/utils";

// Use cn() for className merging
<div className={cn("base-class", condition && "conditional-class")} />;
```

---

## 🚀 Next.js 15/16 Compatibility

Saha UI is **fully compatible** with Next.js 15 and 16 App Router!

### Quick Setup

```bash
# npm
npm install saha-ui
npx saha-ui@latest init

# yarn
yarn add saha-ui
yarn dlx saha-ui@latest init

# pnpm
pnpm add saha-ui
pnpm dlx saha-ui@latest init
```

```tsx
// app/providers.tsx
"use client";

import { ThemeProvider } from "saha-ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
      {children}
    </ThemeProvider>
  );
}
```

```tsx
// app/layout.tsx
import { Providers } from "./providers";
import "./globals.css";

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

### Component Classification

- **83 Client Components** (require `"use client"`) - All interactive components (forms, modals, charts, dialogs, etc.)
- **15 Flexible Components** (work as Server or Client) - Pure display components (cards, badges, avatars, typography, etc.)

### Usage Examples

**Server Component with Client Interaction:**

```tsx
// app/page.tsx (Server Component)
import { Card, Badge } from "saha-ui";
import { InteractiveButton } from "./interactive-button";

export default async function Page() {
  const data = await fetch("https://api.example.com/data");

  return (
    <Card>
      <Badge variant="success">New</Badge>
      <InteractiveButton /> {/* Client Component */}
    </Card>
  );
}
```

```tsx
// app/interactive-button.tsx (Client Component)
"use client";

import { Button } from "saha-ui";

export function InteractiveButton() {
  return <Button onClick={() => alert("Clicked!")}>Click Me</Button>;
}
```

**Full Documentation:**

- 📘 [NEXTJS_15_16_COMPATIBILITY.md](./NEXTJS_15_16_COMPATIBILITY.md) - Complete integration guide
- 📗 [NEXTJS_CLIENT_DIRECTIVE_GUIDE.md](./NEXTJS_CLIENT_DIRECTIVE_GUIDE.md) - "use client" reference
- 📙 [NEXTJS_READINESS_SUMMARY.md](./NEXTJS_READINESS_SUMMARY.md) - Component analysis
- 📕 [QUICK_REFERENCE_NEXTJS.md](./QUICK_REFERENCE_NEXTJS.md) - Quick reference card

---

## 🔄 Using asChild Pattern

Many Saha UI components support the `asChild` prop, which allows you to merge the component's props and behavior with a child element. This is particularly useful when you want to use a component's styling and functionality with custom elements like Next.js `Link` or React Router `Link`.

### Components Supporting asChild

The following **24 components** support the `asChild` prop:

- **Navigation & Actions:** Button, Link, Badge, Toggle, FloatingActionButton
- **Layout:** Container, Grid, Stack, Section, Card
- **Interactive:** Accordion (Trigger), Collapsible (Trigger), Tooltip (Trigger), HoverCard (Trigger), Dropdown (Trigger), ContextMenu (Trigger), NavigationMenu (Link), Combobox (Trigger)
- **Display:** Item, Kbd, Chip, Autocomplete (Input/Option), Slider (Thumb)

### Basic Usage

```tsx
import { Button } from "saha-ui";
import Link from "next/link";

// Without asChild - creates a button
<Button variant="primary">Click me</Button>

// With asChild - merges with Next.js Link
<Button asChild variant="primary">
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### Common Use Cases

#### 1. Navigation Buttons with Next.js Link

```tsx
import { Button } from "saha-ui";
import Link from "next/link";

<Button asChild variant="primary" size="lg">
  <Link href="/products">Browse Products</Link>
</Button>;

// The button styling is applied to the Link component
// Result: <a href="/products" class="button-primary-classes">Browse Products</a>
```

#### 2. Badge as Link

```tsx
import { Badge } from "saha-ui";
import Link from "next/link";

<Badge asChild variant="success" dot>
  <Link href="/notifications">5 New Messages</Link>
</Badge>;
```

#### 3. Card as Interactive Container

```tsx
import { Card } from "saha-ui";
import Link from "next/link";

<Card asChild variant="glass" hoverable>
  <Link href="/blog/post-1">
    <h3>Blog Post Title</h3>
    <p>Post excerpt...</p>
  </Link>
</Card>;
```

#### 4. Tooltip with Custom Trigger

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "saha-ui";

<Tooltip>
  <TooltipTrigger asChild>
    <button className="custom-icon-button">
      <IconHelp />
    </button>
  </TooltipTrigger>
  <TooltipContent>Help information</TooltipContent>
</Tooltip>;
```

#### 5. Dropdown Menu Trigger

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "saha-ui";
import { Button } from "saha-ui";

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Logout</DropdownItem>
  </DropdownContent>
</Dropdown>;
```

### Benefits of asChild

| Benefit                | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| **Preserves Styling**  | All component variants, sizes, and styles are maintained             |
| **Router Integration** | Works seamlessly with Next.js Link, React Router, and custom routing |
| **Accessibility**      | Maintains all ARIA attributes and keyboard navigation                |
| **Type Safety**        | Full TypeScript support with proper type inference                   |
| **Clean DOM**          | No unnecessary wrapper elements, cleaner HTML output                 |
| **Flexibility**        | Use with any custom component or HTML element                        |

---

## 🎨 Components

### Overview (98 Components)

| Component                | Description                                                              | Status | CVA |
| ------------------------ | ------------------------------------------------------------------------ | ------ | --- |
| **Accordion**            | Collapsible content with 5 behavior modes (useAccordion hook)            | ✅     | ✅  |
| **Affix**                | Fixed positioned element that sticks on scroll                           | ✅     | ✅  |
| **Alert**                | Notification messages with 5 variants × 4 statuses                       | ✅     | ✅  |
| **AppBar**               | Application header/toolbar with 4 variants, fixed/sticky positioning     | ✅     | ✅  |
| **AspectRatio**          | Aspect ratio container with zoom effects (useAspectRatio hook)           | ✅     | ✅  |
| **Autocomplete**         | Search input with filtering, keyboard nav, grouping, async, composable   | ✅     | ✅  |
| **Avatar**               | User profile images with status indicators (useAvatar hook)              | ✅     | ✅  |
| **AvatarGroup**          | Grouped avatars with overlap and count                                   | ✅     | ✅  |
| **Backdrop**             | Full-screen overlay with blur effects and scroll locking                 | ✅     | ✅  |
| **Badge**                | Status indicators and labels with 9 variants                             | ✅     | ✅  |
| **BottomNavigation**     | Mobile bottom navigation with badges, 3 variants, hide-on-scroll         | ✅     | ✅  |
| **Breadcrumb**           | Navigation trail with 5 variants, 4 separators, and collapsing           | ✅     | ✅  |
| **Button**               | Action buttons with 9 variants and 8 sizes (xs-4xl)                      | ✅     | ✅  |
| **ButtonGroup**          | Grouped buttons with horizontal/vertical layouts                         | ✅     | ✅  |
| **Calendar**             | Date calendar with month/year navigation and date selection              | ✅     | ✅  |
| **Card**                 | Container with 5 variants and sub-components                             | ✅     | ✅  |
| **Carousel**             | Image slider with 4 transition effects and autoplay                      | ✅     | ✅  |
| **Chart**                | Comprehensive charting with 10 types (Line, Bar, Area, Pie, Radar, etc)  | ✅     | ✅  |
| **Checkbox**             | Checkbox with 7 variants, 8 sizes, indeterminate, card mode, icons       | ✅     | ✅  |
| **Chip**                 | Interactive tags with 5 variants, deletable, and avatars                 | ✅     | ✅  |
| **CodeEditor**           | Code editor with syntax highlighting and themes                          | ✅     | ✅  |
| **Collapsible**          | Expandable content with smooth animations                                | ✅     | ✅  |
| **ColorPicker**          | Color selection with multiple formats and palette                        | ✅     | ✅  |
| **Combobox**             | Combined input and dropdown with search and selection                    | ✅     | ✅  |
| **Command**              | Command palette with search and keyboard navigation                      | ✅     | ✅  |
| **Container**            | Responsive container with max-width constraints and padding              | ✅     | ✅  |
| **ContextMenu**          | Right-click context menu with nested items and shortcuts                 | ✅     | ✅  |
| **DataTable**            | Advanced data table with sorting, filtering, pagination                  | ✅     | ✅  |
| **DatePicker**           | Calendar date picker with 5 variants, 8 sizes, date restrictions         | ✅     | ✅  |
| **Dialog**               | Dialog with 9 variants, 8 sizes, animations, focus trap, accessibility   | ✅     | ✅  |
| **Drawer**               | Side panel with 4 positions, 8 sizes, animations, nested support         | ✅     | ✅  |
| **Dropdown**             | Advanced menu with nested items, keyboard nav, search, shortcuts, badges | ✅     | ✅  |
| **Empty**                | Empty states with 4 variants, 8 sizes, 13 preset icons, animations       | ✅     | ✅  |
| **Field**                | Form field wrapper with label, description, and error states             | ✅     | ✅  |
| **FileInput**            | File upload with drag-drop, preview, progress, validation                | ✅     | ✅  |
| **FloatingActionButton** | Modern FAB with 9 variants, 8 sizes, positions, extended mode            | ✅     | ✅  |
| **Form**                 | Form container with validation and layout management                     | ✅     | ✅  |
| **Grid**                 | CSS Grid layout system with responsive columns and gaps                  | ✅     | ✅  |
| **HoverCard**            | Rich hover card with content preview and positioning                     | ✅     | ✅  |
| **IconButton**           | Compact icon buttons with 6 variants, 7 colors, 8 sizes, loading states  | ✅     | ✅  |
| **Image**                | Advanced image with lazy loading and aspect ratio                        | ✅     | ✅  |
| **Input**                | Text input with 10 variants, 8 sizes, icons, validation, all input types | ✅     | ✅  |
| **InputOTP**             | One-time password input with auto-focus and paste support                | ✅     | ✅  |
| **Item**                 | Flexible item component for lists and menus                              | ✅     | ✅  |
| **Kbd**                  | Keyboard key display with multiple styles and combinations               | ✅     | ✅  |
| **Label**                | Form label with required indicator and description                       | ✅     | ✅  |
| **Link**                 | Smart links with 9 variants and icon support                             | ✅     | ✅  |
| **List**                 | Modern lists with 5 variants and icon support                            | ✅     | ✅  |
| **Masonry**              | Pinterest-style masonry grid layout                                      | ✅     | ✅  |
| **Menubar**              | Menu bar with dropdown menus and keyboard navigation                     | ✅     | ✅  |
| **NativeSelect**         | Native select dropdown with custom styling                               | ✅     | ✅  |
| **NavigationMenu**       | Navigation menu with nested items and mega menu support                  | ✅     | ✅  |
| **Notification**         | Notification center with positioning, stacking, auto-dismiss, context    | ✅     | ✅  |
| **NumberInput**          | Numeric input with increment/decrement, formatting, validation           | ✅     | ✅  |
| **Pagination**           | Page navigation with 5 variants, 8 sizes, ellipsis, customizable labels  | ✅     | ✅  |
| **Paper**                | Surface component with elevation system, 4 variants, hoverable states    | ✅     | ✅  |
| **PlayButton**           | Animated play/pause button with 9 variants, 8 sizes, smooth transitions  | ✅     | ✅  |
| **Popover**              | Rich content popover with 11 variants, 12 positions, 4 triggers          | ✅     | ✅  |
| **Progress**             | Progress bar with 9 variants, 8 sizes, animations, striped               | ✅     | ✅  |
| **Radio**                | Radio button with 7 variants, 8 sizes, RadioGroup, descriptions          | ✅     | ✅  |
| **Rating**               | Star rating with 6 variants, 8 sizes, multiple icons, half stars         | ✅     | ✅  |
| **Resizable**            | Resizable panels with drag handles and constraints                       | ✅     | ✅  |
| **Result**               | Result/status pages with 7 status types (success, error, 404, 403, 500)  | ✅     | ✅  |
| **ScrollArea**           | Custom scrollbar with smooth scrolling and styling                       | ✅     | ✅  |
| **Section**              | Semantic section wrapper with variants and spacing                       | ✅     | ✅  |
| **Segmented**            | Segmented control with animated selection indicator                      | ✅     | ✅  |
| **Select**               | Advanced dropdown with search, multi-select, icons, avatars, grouping    | ✅     | ✅  |
| **Separator**            | Content separator with 5 variants and label support                      | ✅     | ✅  |
| **Skeleton**             | Loading placeholder with 5 variants, 4 shapes, customizable animations   | ✅     | ✅  |
| **Slider**               | Range slider with single/dual handles and custom marks                   | ✅     | ✅  |
| **Snackbar**             | Toast-like notifications with 4 variants, auto-hide, 5 severity levels   | ✅     | ✅  |
| **Sonner**               | Toast notifications with rich content and animations                     | ✅     | ✅  |
| **SpeedDial**            | Floating action menu with expandable actions                             | ✅     | ✅  |
| **Spinner**              | Loading spinner with 10 variants, 8 sizes, 4 animations, fullscreen mode | ✅     | ✅  |
| **Stack**                | Flexbox-based stacking layout with direction and spacing control         | ✅     | ✅  |
| **StatCard**             | Statistical data display with trends, icons, and animations              | ✅     | ✅  |
| **Stepper**              | Multi-step wizard with horizontal/vertical orientations, 3 variants      | ✅     | ✅  |
| **Steps**                | Progress indicator with 4 variants, horizontal/vertical layouts          | ✅     | ✅  |
| **Switch**               | Toggle switch with 7 variants, 8 sizes, icons, loading state             | ✅     | ✅  |
| **Tab**                  | Tab navigation with 14 variants, 8 sizes, icons, badges, disabled states | ✅     | ✅  |
| **Table**                | Data table with sorting, selection, 5 variants, and responsive           | ✅     | ✅  |
| **Tag**                  | Labels with 11 variants, removable, badges, dots, avatars, animations    | ✅     | ✅  |
| **TagInput**             | Dynamic tag input with validation, Enter/Comma keys, paste support       | ✅     | ✅  |
| **TextArea**             | Multi-line text input with auto-resize, character count, validation      | ✅     | ✅  |
| **TextEditor**           | Rich text editor with WYSIWYG formatting and toolbar                     | ✅     | ✅  |
| **ThemeProvider**        | Theme context provider with dark mode and color management               | ✅     | ✅  |
| **ThemeToggle**          | Theme switcher button with smooth transitions                            | ✅     | ✅  |
| **Timeline**             | Chronological events with 4 variants, positions, and statuses            | ✅     | ✅  |
| **Toast**                | Notification toasts with 4 variants, 6 positions, 4 animations, actions  | ✅     | ✅  |
| **Toggle**               | Toggle button with pressed state and variants                            | ✅     | ✅  |
| **ToggleGroup**          | Grouped toggle buttons with single/multiple selection                    | ✅     | ✅  |
| **Tooltip**              | Contextual hints with 9 variants, 4 triggers, and interactive mode       | ✅     | ✅  |
| **Tour**                 | Guided product tour with step-by-step highlights and positioning         | ✅     | ✅  |
| **Transfer**             | Dual-list selection with search and transfer controls                    | ✅     | ✅  |
| **Tree**                 | Hierarchical data with 4 variants, icons, and expand/collapse            | ✅     | ✅  |
| **Typography**           | Text components with semantic variants and styling                       | ✅     | ✅  |
| **Upload**               | File upload with drag & drop, preview, progress, validation, 4 types     | ✅     | ✅  |
| **VideoPlayer**          | Custom video player with controls, fullscreen, and progress tracking     | ✅     | ✅  |

---

## 🪝 Custom Hooks (39 Total)

Saha UI provides a comprehensive collection of reusable React hooks to enhance your development experience:

### Component-Specific Hooks (6)

| Hook               | Description                                         |
| ------------------ | --------------------------------------------------- |
| **useAccordion**   | Accordion state management and behavior control     |
| **useAspectRatio** | Aspect ratio calculations and responsive sizing     |
| **useAvatar**      | Avatar loading, fallback, and status management     |
| **useChartColors** | Chart color palette and theme management            |
| **useChartData**   | Chart data processing and transformation            |
| **useDataTable**   | DataTable state, sorting, filtering, and pagination |

### State Management Hooks (9)

| Hook                     | Description                                       |
| ------------------------ | ------------------------------------------------- |
| **useArray**             | Array state utilities (push, pop, filter, update) |
| **useAsync**             | Async operation state (loading, error, data)      |
| **useControllableState** | Controlled/uncontrolled component state           |
| **useCounter**           | Counter state with increment/decrement            |
| **useDisclosure**        | Open/close state for modals and dropdowns         |
| **useLocalStorage**      | Local storage synchronization                     |
| **useSessionStorage**    | Session storage synchronization                   |
| **useToggle**            | Boolean toggle state                              |
| **usePrevious**          | Previous value tracking across renders            |

### DOM & Event Hooks (8)

| Hook                        | Description                      |
| --------------------------- | -------------------------------- |
| **useClickOutside**         | Detect clicks outside an element |
| **useDOM**                  | DOM manipulation utilities       |
| **useEventListener**        | Safe event listener management   |
| **useFocusTrap**            | Trap focus within a component    |
| **useHover**                | Hover state detection            |
| **useIntersectionObserver** | Viewport intersection detection  |
| **useScrollLock**           | Lock/unlock body scroll          |
| **useWindowSize**           | Window dimensions tracking       |

### Form & Validation Hooks (2)

| Hook              | Description                          |
| ----------------- | ------------------------------------ |
| **useForm**       | Form state management and validation |
| **useValidation** | Input validation with custom rules   |

### Utility Hooks (14)

| Hook                 | Description                        |
| -------------------- | ---------------------------------- |
| **useAnimation**     | Animation control utilities        |
| **useClipboard**     | Clipboard copy/paste operations    |
| **useColorMode**     | Color mode (light/dark) management |
| **useDebounce**      | Debounced value updates            |
| **useFetch**         | Data fetching with loading states  |
| **useInterval**      | Interval management with cleanup   |
| **useMediaQuery**    | CSS media query matching           |
| **useMergedRefs**    | Merge multiple refs into one       |
| **usePagination**    | Pagination logic and state         |
| **useReducedMotion** | Detect user motion preferences     |
| **useSearchFilter**  | Search and filter operations       |
| **useThrottle**      | Throttled value updates            |
| **useTimeout**       | Timeout management with cleanup    |
| **useUpdateEffect**  | useEffect that skips first render  |

### Hook Usage Examples

```tsx
import { useColorMode, useToggle, useDebounce, useLocalStorage } from "saha-ui";

// Color mode management
function ColorModeExample() {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <button
      onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
    >
      Current mode: {colorMode}
    </button>
  );
}

// Toggle state
function ToggleExample() {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      {isOpen && <div>Content is visible!</div>}
    </div>
  );
}

// Debounced search
function SearchExample() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // API call with debounced value
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}

// Local storage persistence
function StorageExample() {
  const [name, setName] = useLocalStorage("user-name", "Guest");

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Your name"
    />
  );
}
```

---

## 🔄 asChild Pattern

Many Saha UI components support the `asChild` prop, which allows you to compose components with your own elements while preserving the component's styling and behavior. This is particularly useful when you want to render a component as a link, custom router component, or any other element.

### How It Works

When `asChild={true}`, the component passes its props to its direct child instead of rendering its default element. This uses the Slot pattern internally.

### Supported Components

The following components support `asChild`:

- **Navigation:** Button, Link, Badge
- **Layout:** Container, Grid, Stack, Section, Card
- **Interactive:** Accordion (trigger), FloatingActionButton, Toggle, Tooltip (trigger)
- **Data Display:** Chip, Item, Kbd
- **Overlays:** Combobox, ContextMenu, Dropdown, HoverCard, NavigationMenu

### Basic Example

```tsx
import { Button } from "saha-ui";
import Link from "next/link";

// Regular button
<Button variant="primary">Click Me</Button>

// Button rendered as Next.js Link (preserves button styling)
<Button variant="primary" asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>

// Button rendered as anchor tag
<Button variant="gradient" asChild>
  <a href="https://example.com">External Link</a>
</Button>
```

### Advanced Examples

```tsx
// Badge as a link
<Badge variant="success" asChild>
  <Link href="/notifications">3 New</Link>
</Badge>

// Card as clickable link
<Card variant="glass" hoverable asChild>
  <Link href="/article/123">
    <CardContent>Click entire card</CardContent>
  </Link>
</Card>

// FloatingActionButton as Next.js Link
<FloatingActionButton variant="primary" position="bottom-right" asChild>
  <Link href="/create">
    <Plus size={24} />
  </Link>
</FloatingActionButton>

// Custom router component
import { Link as RouterLink } from "react-router-dom";

<Button variant="outline" asChild>
  <RouterLink to="/settings">Settings</RouterLink>
</Button>
```

### Benefits

- ✅ Preserves all component styling and variants
- ✅ Works with any routing library (Next.js, React Router, etc.)
- ✅ Maintains accessibility features
- ✅ Type-safe with TypeScript
- ✅ No wrapper elements (cleaner DOM)

---

## ⚡ Quick Examples

Here are simple examples for all components to get you started quickly:

### Button

```tsx
import { Button } from "saha-ui";

// Basic button
<Button variant="primary">Click Me</Button>
<Button variant="ghost" size="sm">Small Ghost</Button>

// asChild - Render as a custom element (Link, anchor, etc.)
<Button variant="primary" asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>

// asChild with Next.js Link
<Button variant="gradient" size="lg" asChild>
  <Link href="/profile">View Profile</Link>
</Button>

// asChild with custom component
<Button variant="outline" asChild>
  <CustomRouterLink to="/settings">Settings</CustomRouterLink>
</Button>
```

### ButtonGroup

```tsx
import { ButtonGroup, Button } from "saha-ui";

<ButtonGroup>
  <Button variant="primary">Save</Button>
  <Button variant="ghost">Cancel</Button>
</ButtonGroup>;
```

### Alert

```tsx
import { Alert } from "saha-ui";

<Alert status="success" message="Operation completed successfully!" />
<Alert status="danger" variant="solid" message="Error occurred!" closeable />
<Alert status="warning" variant="glass" title="Warning" message="Please review before proceeding." />
```

### Badge

```tsx
import { Badge } from "saha-ui";

// Basic badge
<Badge variant="primary">New</Badge>
<Badge variant="success" dot pulse>Online</Badge>
<Badge removable onRemove={() => console.log('removed')}>Tag</Badge>

// asChild - Render badge as a link
<Badge variant="info" asChild>
  <a href="/notifications">3 New</a>
</Badge>

// asChild with Next.js Link
<Badge variant="warning" dot asChild>
  <Link href="/alerts">Pending</Link>
</Badge>
```

### Breadcrumb

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "saha-ui";

// Basic breadcrumb
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrentPage>Details</BreadcrumbItem>
</Breadcrumb>

// With variants and separator types
<Breadcrumb variant="pills" separator="arrow">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrentPage>Electronics</BreadcrumbItem>
</Breadcrumb>

// Other separator options: "chevron" (default), "slash", "dot", "arrow"
<Breadcrumb variant="glass" separator="slash">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrentPage>API</BreadcrumbItem>
</Breadcrumb>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "saha-ui";

// Basic card
<Card variant="glass" hoverable>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Your content here</CardContent>
</Card>

// asChild - Clickable card as a link
<Card variant="outline" hoverable asChild>
  <a href="/article/123">
    <CardHeader>
      <CardTitle>Read More</CardTitle>
    </CardHeader>
    <CardContent>Click anywhere on this card to navigate</CardContent>
  </a>
</Card>

// asChild with Next.js Link
<Card variant="glass" asChild>
  <Link href="/product/456">
    <CardContent>Product Details</CardContent>
  </Link>
</Card>
```

### Chip

```tsx
import { Chip } from "saha-ui";

// Basic chips with variants
<Chip variant="filled" color="primary">JavaScript</Chip>
<Chip variant="outlined" color="secondary">TypeScript</Chip>
<Chip variant="soft" color="success">React</Chip>
<Chip variant="glass" color="primary">Saha UI</Chip>

// Deletable chip
<Chip deletable onDelete={() => console.log('deleted')} color="error">
  Remove me
</Chip>

// Clickable chip
<Chip clickable onClick={() => alert('clicked')} color="info">
  Click me
</Chip>

// With avatars
<Chip avatar={<Avatar name="JD" size="xs" />} color="primary">
  John Doe
</Chip>

// asChild - Chip as a link
<Chip variant="filled" color="primary" asChild>
  <a href="/tags/react">React</a>
</Chip>

// asChild with Next.js Link
<Chip variant="outlined" clickable asChild>
  <Link href="/category/javascript">JavaScript</Link>
</Chip>
```

### Separator

```tsx
import { Separator } from "saha-ui";

<Separator />
<Separator label="OR" />
<Separator variant="gradient" thickness="medium" />
<Separator orientation="vertical" className="h-24" />
```

### Accordion

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "saha-ui";

// Basic accordion
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple items open at once
<Accordion type="multiple" variant="glass">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</Accordion>

// asChild - Custom trigger element
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger asChild>
      <button className="custom-trigger-class">
        Click to expand
      </button>
    </AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Avatar

```tsx
import { Avatar } from "saha-ui";

<Avatar src="/user.jpg" alt="John" />
<Avatar name="Jane Doe" size="lg" />
<Avatar name="Bob" status="online" />
```

### AvatarGroup

```tsx
import { AvatarGroup, Avatar } from "saha-ui";

<AvatarGroup max={3}>
  <Avatar name="Alice" />
  <Avatar name="Bob" />
  <Avatar name="Carol" />
  <Avatar name="Dave" />
</AvatarGroup>;
```

### Tooltip

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "saha-ui";

// Basic tooltip
<Tooltip>
  <TooltipTrigger>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>This is a tooltip</TooltipContent>
</Tooltip>

// With variant and position
<Tooltip variant="success" position="right">
  <TooltipTrigger>
    <Badge variant="success">Active</Badge>
  </TooltipTrigger>
  <TooltipContent>Success message!</TooltipContent>
</Tooltip>

// Interactive tooltip with click trigger
<Tooltip interactive trigger="click" variant="glass">
  <TooltipTrigger>
    <Button>Click Me</Button>
  </TooltipTrigger>
  <TooltipContent>
    <div>Click <a href="#">here</a> for more</div>
  </TooltipContent>
</Tooltip>

// asChild - Use tooltip with custom trigger element
<Tooltip variant="info">
  <TooltipTrigger asChild>
    <span className="custom-element">Hover for info</span>
  </TooltipTrigger>
  <TooltipContent>Additional information</TooltipContent>
</Tooltip>

// asChild with icon or custom component
<Tooltip>
  <TooltipTrigger asChild>
    <InfoIcon className="cursor-help" />
  </TooltipTrigger>
  <TooltipContent>Help text here</TooltipContent>
</Tooltip>
```

### Link

```tsx
import { Link } from "saha-ui";

// Basic links
<Link href="/about">About Us</Link>
<Link href="https://example.com" variant="primary" external>
  External Link
</Link>
<Link href="/contact" showIcon>Contact</Link>

// asChild - Use Link styles with Next.js Link or custom component
<Link variant="primary" asChild>
  <NextLink href="/dashboard">Dashboard</NextLink>
</Link>

// asChild with button styling
<Link variant="gradient" showIcon asChild>
  <button onClick={handleClick}>Custom Action</button>
</Link>

// asChild preserves all Link styling
<Link variant="underline" asChild>
  <RouterLink to="/settings">Settings</RouterLink>
</Link>
```

### List

```tsx
import { List, ListItem } from "saha-ui";
import { CheckCircle } from "lucide-react";

<List variant="bordered">
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
  <ListItem>Third item</ListItem>
</List>

// With icons
<List variant="cards">
  <ListItem icon={<CheckCircle size={18} />}>Completed task</ListItem>
  <ListItem icon={<CheckCircle size={18} />}>Another task</ListItem>
</List>
```

### Timeline

```tsx
import { Timeline, TimelineItem } from "saha-ui";
import { Rocket, Package, Check } from "lucide-react";

<Timeline variant="gradient">
  <TimelineItem
    icon={<Rocket size={18} />}
    title="Project Started"
    description="Initial setup"
    time="2 hours ago"
  />
  <TimelineItem
    icon={<Package size={18} />}
    title="Development"
    description="Building features"
    time="1 hour ago"
    status="primary"
  />
  <TimelineItem
    icon={<Check size={18} />}
    title="Completed"
    description="Ready to deploy"
    time="Just now"
    status="success"
  />
</Timeline>

// Alternate positioning
<Timeline position="alternate">
  <TimelineItem title="Event 1" />
  <TimelineItem title="Event 2" />
</Timeline>
```

### Tree

```tsx
import { Tree, TreeItem } from "saha-ui";
import { Folder, File } from "lucide-react";

<Tree variant="glass">
  <TreeItem label="src" icon={<Folder size={16} />}>
    <TreeItem label="components" icon={<Folder size={16} />}>
      <TreeItem label="Button.tsx" icon={<File size={16} />} />
      <TreeItem label="Card.tsx" icon={<File size={16} />} />
    </TreeItem>
    <TreeItem label="App.tsx" icon={<File size={16} />} />
  </TreeItem>
</Tree>;
```

### Image

```tsx
import { Image } from "saha-ui";

<Image
  src="/photo.jpg"
  alt="Description"
  variant="rounded"
/>

<Image
  src="/photo.jpg"
  alt="Description"
  fit="cover"
  size="lg"
  loading="lazy"
/>
```

### Carousel

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "saha-ui";

<Carousel autoplay autoplayInterval={3000}>
  <CarouselContent>
    <CarouselItem>
      <img src="/image1.jpg" alt="Slide 1" />
    </CarouselItem>
    <CarouselItem>
      <img src="/image2.jpg" alt="Slide 2" />
    </CarouselItem>
    <CarouselItem>
      <img src="/image3.jpg" alt="Slide 3" />
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

// With variants
<Carousel variant="glass" autoplay>
  <CarouselContent>
    {/* Your carousel items */}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Steps

```tsx
import { Steps, StepsItem } from "saha-ui";
import { User, CreditCard, Check } from "lucide-react";

<Steps defaultValue={2}>
  <StepsItem value={1} title="Account" description="Create your account" />
  <StepsItem value={2} title="Profile" description="Fill in your details" />
  <StepsItem value={3} title="Complete" description="You're all set!" />
</Steps>

// With icons
<Steps defaultValue={2} variant="glass">
  <StepsItem value={1} title="Info" icon={<User className="w-5 h-5" />} />
  <StepsItem value={2} title="Payment" icon={<CreditCard className="w-5 h-5" />} />
  <StepsItem value={3} title="Done" icon={<Check className="w-5 h-5" />} />
</Steps>

// Vertical orientation
<Steps orientation="vertical" defaultValue={1}>
  <StepsItem value={1} title="Step 1" status="completed" />
  <StepsItem value={2} title="Step 2" status="current" />
  <StepsItem value={3} title="Step 3" status="pending" />
</Steps>
```

### Table

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "saha-ui";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice Johnson</TableCell>
      <TableCell>alice@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Bob Smith</TableCell>
      <TableCell>bob@example.com</TableCell>
      <TableCell>Developer</TableCell>
    </TableRow>
  </TableBody>
</Table>

// With variants
<Table variant="bordered" hoverable>
  {/* Table content */}
</Table>
```

### Rating

```tsx
import { Rating } from "saha-ui";

<Rating value={4} />
<Rating value={4.5} precision="half" showValue count={128} />
<Rating value={0} onChange={(value) => console.log(value)} size="lg" />
<Rating value={4} icon="heart" variant="gradient" size="lg" />
```

### Progress

```tsx
import { Progress } from "saha-ui";

<Progress value={75} />
<Progress value={60} variant="primary" size="lg" showValue />
<Progress value={80} variant="success" striped stripedAnimated />
<Progress indeterminate variant="gradient" />
```

### Popover

```tsx
import { Popover, Button } from "saha-ui";

<Popover content="Simple popover content">
  <Button>Click me</Button>
</Popover>

<Popover
  title="Settings"
  variant="primary"
  position="right"
  content={<div>Your settings here</div>}
  footer={<Button size="sm">Save</Button>}
>
  <Button>Open Settings</Button>
</Popover>
```

### PlayButton

```tsx
import { PlayButton } from "saha-ui";

<PlayButton />

<PlayButton variant="primary" size="lg" />

<PlayButton
  isPlaying={playing}
  onToggle={(playing) => setPlaying(playing)}
  variant="success"
  pulse
  glow
/>
```

### FloatingActionButton

```tsx
import { FloatingActionButton } from "saha-ui";
import { Plus, MessageCircle } from "lucide-react";
import Link from "next/link";

// Basic FAB
<FloatingActionButton
  variant="primary"
  position="bottom-right"
  label="Create New"
  onClick={() => console.log("FAB clicked!")}
>
  <Plus size={24} />
</FloatingActionButton>

// Extended FAB
<FloatingActionButton
  variant="accent"
  position="bottom-left"
  label="Add Item"
  extended
>
  <Plus size={20} />
</FloatingActionButton>

// asChild - Render FAB as a link
<FloatingActionButton
  variant="primary"
  position="bottom-right"
  label="Chat"
  asChild
>
  <a href="/chat">
    <MessageCircle size={24} />
  </a>
</FloatingActionButton>

// asChild with Next.js Link
<FloatingActionButton variant="success" position="bottom-center" asChild>
  <Link href="/create">
    <Plus size={24} />
  </Link>
</FloatingActionButton>
```

### Toggle

```tsx
import { Toggle } from "saha-ui";
import { Bold } from "lucide-react";

// Basic toggle
<Toggle>
  <Bold size={16} />
</Toggle>

// With variants
<Toggle variant="outline" pressed={isBold} onPressedChange={setIsBold}>
  <Bold size={16} />
</Toggle>

// asChild - Custom element
<Toggle variant="primary" asChild>
  <button className="custom-class">
    <Bold size={16} />
  </button>
</Toggle>
```

### Container

```tsx
import { Container } from "saha-ui";

// Basic container
<Container>
  <p>Content with max-width and padding</p>
</Container>

// With size variants
<Container size="sm" centered>
  <p>Small centered container</p>
</Container>

// asChild - Container as section
<Container variant="glass" asChild>
  <section className="my-section">
    <h1>Section Title</h1>
    <p>Content here</p>
  </section>
</Container>
```

### Grid

```tsx
import { Grid, GridItem } from "saha-ui";

// Basic grid
<Grid cols={3} gap={4}>
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>

// Responsive grid
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
  <GridItem span={2}>Wide item</GridItem>
  <GridItem>Regular item</GridItem>
</Grid>

// asChild - Grid as article
<Grid cols={2} gap={4} asChild>
  <article>
    <GridItem>Content 1</GridItem>
    <GridItem>Content 2</GridItem>
  </article>
</Grid>
```

### Stack

```tsx
import { Stack } from "saha-ui";

// Vertical stack
<Stack direction="vertical" spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Horizontal stack
<Stack direction="horizontal" spacing={2} align="center">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Stack>

// asChild - Stack as nav
<Stack direction="horizontal" spacing={4} asChild>
  <nav>
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
  </nav>
</Stack>
```

### Item

```tsx
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription } from "saha-ui";

// Basic item
<Item>
  <ItemMedia>
    <Avatar src="/user.jpg" />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>John Doe</ItemTitle>
    <ItemDescription>Software Engineer</ItemDescription>
  </ItemContent>
</Item>

// asChild - Item as link
<Item variant="interactive" asChild>
  <a href="/profile/123">
    <ItemContent>
      <ItemTitle>View Profile</ItemTitle>
      <ItemDescription>Click to see details</ItemDescription>
    </ItemContent>
  </a>
</Item>
```

### Kbd

```tsx
import { Kbd, KbdGroup } from "saha-ui";

// Single key
<Kbd>Ctrl</Kbd>

// Key combination
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>C</Kbd>
</KbdGroup>

// asChild - Kbd as button
<Kbd variant="outline" asChild>
  <button onClick={handleShortcut}>⌘ K</button>
</Kbd>
```

### HoverCard

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "saha-ui";

// Basic hover card
<HoverCard>
  <HoverCardTrigger>
    <span>Hover me</span>
  </HoverCardTrigger>
  <HoverCardContent>
    <p>Additional information appears here</p>
  </HoverCardContent>
</HoverCard>

// asChild - Custom trigger element
<HoverCard variant="glass">
  <HoverCardTrigger asChild>
    <a href="/user/123">@username</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex items-center gap-3">
      <Avatar src="/user.jpg" />
      <div>
        <h4>John Doe</h4>
        <p>Software Engineer</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>

// asChild with button
<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="ghost">Profile Preview</Button>
  </HoverCardTrigger>
  <HoverCardContent>User details...</HoverCardContent>
</HoverCard>
```

### Collapsible

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "saha-ui";

// Basic collapsible
<Collapsible>
  <CollapsibleTrigger>Show More</CollapsibleTrigger>
  <CollapsibleContent>
    <p>Hidden content appears here</p>
  </CollapsibleContent>
</Collapsible>

// asChild - Custom trigger
<Collapsible variant="bordered">
  <CollapsibleTrigger asChild>
    <button className="custom-button">
      Toggle Details
    </button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>Collapsible content with smooth animation</p>
  </CollapsibleContent>
</Collapsible>

// asChild with heading
<Collapsible>
  <CollapsibleTrigger asChild>
    <h3 className="cursor-pointer">FAQ Question</h3>
  </CollapsibleTrigger>
  <CollapsibleContent>Answer to the question</CollapsibleContent>
</Collapsible>
```

### NavigationMenu

```tsx
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "saha-ui";

// Basic navigation menu
<NavigationMenu>
  <NavigationMenuItem>
    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
    <NavigationMenuContent>
      <NavigationMenuLink href="/products/all">All Products</NavigationMenuLink>
      <NavigationMenuLink href="/products/new">New Arrivals</NavigationMenuLink>
    </NavigationMenuContent>
  </NavigationMenuItem>
</NavigationMenu>

// asChild - Custom trigger element
<NavigationMenu>
  <NavigationMenuItem>
    <NavigationMenuTrigger asChild>
      <button className="nav-button">Services</button>
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <p>Service content here</p>
    </NavigationMenuContent>
  </NavigationMenuItem>
</NavigationMenu>

// asChild - Links with Next.js
<NavigationMenu>
  <NavigationMenuItem>
    <NavigationMenuLink asChild>
      <Link href="/about">About Us</Link>
    </NavigationMenuLink>
  </NavigationMenuItem>
</NavigationMenu>
```

### ContextMenu

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem
} from "saha-ui";

// Basic context menu
<ContextMenu>
  <ContextMenuTrigger>
    <div>Right click me</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Edit</ContextMenuItem>
    <ContextMenuItem>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>

// asChild - Custom trigger
<ContextMenu>
  <ContextMenuTrigger asChild>
    <Card variant="outline">
      <CardContent>Right click this card</CardContent>
    </Card>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### Combobox

```tsx
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem
} from "saha-ui";

// Basic combobox
<Combobox>
  <ComboboxTrigger>Select option</ComboboxTrigger>
  <ComboboxContent>
    <ComboboxItem value="1">Option 1</ComboboxItem>
    <ComboboxItem value="2">Option 2</ComboboxItem>
  </ComboboxContent>
</Combobox>

// asChild - Custom trigger button
<Combobox>
  <ComboboxTrigger asChild>
    <Button variant="outline">Choose framework</Button>
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxItem value="react">React</ComboboxItem>
    <ComboboxItem value="vue">Vue</ComboboxItem>
    <ComboboxItem value="angular">Angular</ComboboxItem>
  </ComboboxContent>
</Combobox>
```

### Radio

```tsx
import { Radio, RadioGroup } from "saha-ui";

{
  /* Basic Radio */
}
<Radio label="Option 1" value="option1" />;

{
  /* Radio with description */
}
<Radio
  label="Pro Plan"
  description="Advanced features for teams"
  value="pro"
/>;

{
  /* RadioGroup */
}
<RadioGroup
  name="plan"
  label="Choose Your Plan"
  value={selectedPlan}
  onChange={setSelectedPlan}
  options={[
    { label: "Free", value: "free" },
    { label: "Pro", value: "pro" },
    { label: "Enterprise", value: "enterprise" },
  ]}
/>;

{
  /* Advanced: Card Style with Icons & Badges */
}
<RadioGroup name="pricing" card>
  <Radio
    value="pro"
    label="Professional"
    description="For growing businesses"
    icon={<Rocket />}
    badge="Popular"
    recommended
  />
</RadioGroup>;
```

### Switch

```tsx
import { Switch } from "saha-ui";

{
  /* Basic Switch */
}
<Switch label="Enable Notifications" />;

{
  /* With icons */
}
<Switch
  label="Dark Mode"
  description="Toggle dark theme"
  onIcon={<Moon />}
  offIcon={<Sun />}
/>;

{
  /* With loading state */
}
<Switch label="Auto-save" loading />;
```

### Checkbox

```tsx
import { Checkbox } from "saha-ui";

// Basic checkbox
<Checkbox label="Accept terms" />

// With description
<Checkbox
  label="Marketing emails"
  description="Receive promotional content"
/>

// Indeterminate state
<Checkbox indeterminate label="Select all" />

// With custom icon
<Checkbox icon={<Star />} label="Favorite" variant="warning" />

// Card mode
<Checkbox
  card
  label="Premium Plan"
  description="$29/month"
  icon={<Crown />}
  badge="Popular"
/>
```

### CheckboxGroup

```tsx
import { CheckboxGroup } from "saha-ui";

// Basic group
<CheckboxGroup
  label="Select interests"
  options={[
    { value: "coding", label: "Coding" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
  ]}
/>

// Horizontal layout
<CheckboxGroup
  direction="horizontal"
  options={[
    { value: "notifications", label: "Email Notifications" },
    { value: "newsletter", label: "Newsletter" },
  ]}
/>

// Card layout with icons
<CheckboxGroup
  card
  label="Choose features"
  options={[
    { value: "basic", label: "Basic Support", icon: <Star />, badge: "Free" },
    { value: "premium", label: "Premium", icon: <Crown />, badge: "$29/mo", recommended: true },
  ]}
/>
```

### Select

```tsx
import { Select } from "saha-ui";

// Basic select
<Select
  label="Country"
  placeholder="Select your country"
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ]}
/>

// Multi-select with search
<Select
  label="Skills"
  placeholder="Select your skills"
  options={[
    { value: "react", label: "React", icon: <Code /> },
    { value: "vue", label: "Vue.js", icon: <Code /> },
  ]}
  multiple
  searchable
  clearable
/>

// With avatars
<Select
  label="Assign to"
  placeholder="Select team member"
  options={[
    { value: "alice", label: "Alice", avatar: "/avatar1.jpg" },
    { value: "bob", label: "Bob", avatar: "/avatar2.jpg" },
  ]}
/>
```

### Dropdown

```tsx
import { Dropdown } from "saha-ui";

// Basic dropdown
<Dropdown
  placeholder="Actions"
  options={[
    { value: "edit", label: "Edit", icon: <Edit /> },
    { value: "delete", label: "Delete", icon: <Trash /> },
  ]}
/>

// Searchable multi-select
<Dropdown
  multiple
  searchable
  placeholder="Select features..."
  options={[
    { value: "notifications", label: "Notifications", icon: <Bell /> },
    { value: "email", label: "Email Updates", icon: <Mail /> },
  ]}
/>

// With shortcuts and badges
<Dropdown
  placeholder="Actions"
  variant="glass"
  options={[
    { value: "save", label: "Save", icon: <Save />, shortcut: "⌘S" },
    { value: "open", label: "Open", icon: <Folder />, shortcut: "⌘O" },
    { value: "new", label: "New", icon: <Plus />, badge: "Pro" },
  ]}
/>
```

### Skeleton

```tsx
import { Skeleton } from "saha-ui";

<Skeleton width="100%" height="20px" />

<Skeleton variant="shimmer" count={3} />

<Skeleton shape="circle" width="48px" height="48px" variant="pulse" />
```

### Spinner

```tsx
import { Spinner } from "saha-ui";

// Basic usage
<Spinner />

// With variants and sizes
<Spinner variant="success" size="lg" label="Loading..." />

// Different spinner types (15 types available!)
<Spinner type="ring" variant="primary" size="lg" />
<Spinner type="orbit" variant="gradient" size="xl" />
<Spinner type="flower" variant="success" size="lg" />
<Spinner type="infinity" variant="primary" size="2xl" />
<Spinner type="wave" variant="info" size="md" />
<Spinner type="spiral" variant="accent" size="lg" />

// Fullscreen overlay
<Spinner variant="gradient" animation="pulse" fullscreen />

// With custom logo/icon
<Spinner
  variant="primary"
  size="xl"
  logo="/your-logo.png"
  logoSize="md"
  label="Loading..."
/>

// With custom component
<Spinner
  type="orbit"
  variant="success"
  size="xl"
  logo={<YourCustomIcon />}
  logoSize="lg"
/>

// In buttons
<Button variant="primary" disabled>
  <Spinner type="bounce" size="sm" variant="default" />
  Loading...
</Button>
```

### Pagination

```tsx
import { Pagination } from "saha-ui";

<Pagination totalPages={10} currentPage={1} onPageChange={(page) => setPage(page)} />

<Pagination variant="primary" size="lg" totalPages={20} currentPage={5} />

<Pagination variant="minimal" shape="pill" totalPages={50} currentPage={25} />
```

### DatePicker

```tsx
import { DatePicker } from "saha-ui";

// Single date picker
<DatePicker
  value={{ startDate: date, endDate: date }}
  onChange={(value) => setDate(value)}
  asSingle
  placeholder="Select date"
/>

// Date range picker
<DatePicker
  value={{ startDate: null, endDate: null }}
  onChange={(value) => setRange(value)}
  placeholder="Select date range"
/>

// With variants and restrictions
<DatePicker
  variant="primary"
  minDate={new Date()}
  maxDate={futureDate}
  asSingle
/>
```

### Tab

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "saha-ui";

<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">Profile content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>

// With variants and sizes
<Tabs defaultValue="home" variant="primary" size="lg">
  <TabsList>
    <TabsTrigger value="home">Home</TabsTrigger>
    <TabsTrigger value="messages">Messages</TabsTrigger>
  </TabsList>
</Tabs>
```

### Input

```tsx
import { Input } from "saha-ui";
import { Mail, Lock } from "lucide-react";

// Basic input
<Input placeholder="Enter text..." />

// With label and variant
<Input
  label="Email"
  type="email"
  variant="primary"
  placeholder="you@example.com"
/>

// With icons
<Input
  label="Search"
  variant="outline"
  startIcon={<Mail size={18} />}
  placeholder="Search..."
/>

// With validation
<Input
  label="Password"
  type="password"
  variant="error"
  error="Password is required"
  startIcon={<Lock size={18} />}
/>

// With character counter
<Input
  label="Bio"
  maxLength={100}
  showCounter
  helperText="Maximum 100 characters"
/>
```

### Empty

```tsx
import {
  Empty,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  EmptyActions,
} from "saha-ui";

// Props API
<Empty
  variant="subtle"
  iconType="inbox"
  iconColor="primary"
  title="No messages"
  description="Your inbox is empty"
  action={<button>New Message</button>}
/>

// Composable API (Recommended)
<Empty variant="glass" size="lg">
  <EmptyIcon iconType="cart" iconColor="warning" />
  <EmptyTitle>Your cart is empty</EmptyTitle>
  <EmptyDescription>
    Add items to your cart to proceed
  </EmptyDescription>
  <EmptyActions>
    <button>Continue Shopping</button>
  </EmptyActions>
</Empty>
```

### Autocomplete

```tsx
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteDropdown,
  AutocompleteOption,
} from "saha-ui";

// Props API
<Autocomplete
  options={[
    { value: "1", label: "Option 1", description: "First option" },
    { value: "2", label: "Option 2", description: "Second option" },
  ]}
  placeholder="Search..."
  label="Select Option"
  groupBy
/>

// Composable API (Recommended)
<Autocomplete options={options} variant="glass">
  <AutocompleteInput placeholder="Search..." />
  <AutocompleteDropdown>
    {/* Custom dropdown content */}
  </AutocompleteDropdown>
</Autocomplete>
```

---

## 📚 Component Documentation

### Button

Action buttons with modern effects and 9 visual variants.

**Variants:** `primary` `secondary` `accent` `success` `warning` `error` `outline` `ghost` `glass`
**Sizes:** `sm` `md` `lg` `xl`

```tsx
import { Button } from "saha-ui";

<Button variant="primary" size="lg">
  Click Me
</Button>;

// With icons
import { Sparkles } from "lucide-react";
<Button variant="glass">
  <Sparkles size={18} />
  Glass Effect
</Button>;
```

**Features:**

- ✨ Shimmer animation on hover
- 🌈 Gradient overlays
- 💫 Dynamic shadows
- 🔄 React.forwardRef support

---

### ButtonGroup

Container component that groups multiple buttons together with seamless styling.

**Variants:** `default` `outline` `ghost` `glass`
**Sizes:** `sm` `md` `lg` `xl`
**Orientation:** `horizontal` `vertical`

```tsx
import { ButtonGroup, Button } from "saha-ui";

// Basic horizontal group
<ButtonGroup>
  <Button variant="primary">Left</Button>
  <Button variant="primary">Center</Button>
  <Button variant="primary">Right</Button>
</ButtonGroup>

// Vertical orientation
<ButtonGroup orientation="vertical">
  <Button variant="accent">Top</Button>
  <Button variant="accent">Middle</Button>
  <Button variant="accent">Bottom</Button>
</ButtonGroup>

// Glass variant with full width
<ButtonGroup variant="glass" fullWidth>
  <Button variant="glass">Save</Button>
  <Button variant="glass">Cancel</Button>
</ButtonGroup>

// Full rounded (pill style)
<ButtonGroup fullRounded>
  <Button variant="secondary">Option 1</Button>
  <Button variant="secondary">Option 2</Button>
  <Button variant="secondary">Option 3</Button>
</ButtonGroup>

// Detached buttons (with gaps)
<ButtonGroup attached={false}>
  <Button variant="primary">Accept</Button>
  <Button variant="ghost">Decline</Button>
</ButtonGroup>
```

**Features:**

- 🔗 Seamless button integration with smart rounding
- 🎨 4 visual variants (default, outline, ghost, glass)
- 📐 Horizontal & vertical orientations
- 📏 Auto-sizing all buttons in group
- 🔲 Full width support
- 🎯 Attached or detached modes
- 💫 Hover z-index management
- ♿ ARIA role="group" for accessibility

**Props:**

- `variant` - Visual style (default, outline, ghost, glass)
- `size` - Size applied to all child buttons (sm, md, lg, xl)
- `orientation` - Layout direction (horizontal, vertical)
- `fullRounded` - Pill-style rounding on outer buttons
- `fullWidth` - Make buttons fill container width equally
- `attached` - Whether buttons are connected (true) or have gaps (false)

**Contextual Usage:**

```tsx
// In dialog footer
<Card>
  <CardHeader>
    <CardTitle>Confirm Action</CardTitle>
  </CardHeader>
  <CardFooter>
    <ButtonGroup fullWidth>
      <Button variant="error">Delete</Button>
      <Button variant="ghost">Cancel</Button>
    </ButtonGroup>
  </CardFooter>
</Card>

// Navigation menu
<ButtonGroup orientation="vertical" variant="outline" fullWidth>
  <Button variant="ghost"><User size={16} /> Profile</Button>
  <Button variant="ghost"><Bell size={16} /> Notifications</Button>
  <Button variant="ghost"><Mail size={16} /> Messages</Button>
</ButtonGroup>

// Toolbar
<ButtonGroup variant="glass">
  <Button variant="glass"><Star size={16} /></Button>
  <Button variant="glass"><Heart size={16} /></Button>
  <Button variant="glass"><Mail size={16} /></Button>
</ButtonGroup>
```

---

### Breadcrumb

Navigation component showing the current page's location within a hierarchy with 5 modern variants.

**Variants:** `default` `ghost` `bordered` `pills` `underline`
**Sizes:** `sm` `md` `lg`
**Separators:** `chevron` `slash` `dot` `arrow` `custom`

```tsx
import { Breadcrumb } from "saha-ui";
import type { BreadcrumbItem } from "saha-ui";

// Basic breadcrumb
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Laptops", isCurrentPage: true }
  ]}
/>

// Pills variant with chevron separator
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Components", isCurrentPage: true }
  ]}
  variant="pills"
  separator="chevron"
/>

// With icons
<Breadcrumb
  items={[
    { label: "Dashboard", href: "/" },
    { label: "Settings", href: "/settings", icon: <Settings size={14} /> },
    { label: "Profile", isCurrentPage: true, icon: <User size={14} /> }
  ]}
  variant="bordered"
/>

// Collapsed long breadcrumb (shows first + last 2 items)
<Breadcrumb
  items={longItemArray}
  maxItems={4}
  variant="ghost"
/>

// Custom separator
<Breadcrumb
  items={items}
  customSeparator={<span>→</span>}
/>

// Without home icon
<Breadcrumb
  items={items}
  showHomeIcon={false}
/>

// Large size with underline variant
<Breadcrumb
  items={items}
  size="lg"
  variant="underline"
/>
```

**Features:**

- ✨ **5 Modern Variants** - default, ghost, bordered, pills, underline
- 🔗 **4 Separator Styles** - chevron, slash, dot, arrow + custom
- 📏 **3 Sizes** - sm, md, lg with responsive text
- 🏠 **Automatic Home Icon** - for first item
- 🎯 **Icon Support** - for each breadcrumb item
- 📦 **Smart Collapsing** - for long breadcrumbs with maxItems
- ♿ **Full Accessibility** - ARIA labels and semantic HTML
- 🎨 **Active Page Highlighting** - with compound variants
- 🌈 **Theme-Aware** - OKLCH colors with dark mode
- ⚡ **Smooth Animations** - hover effects on all variants
- 📱 **Responsive** - wraps on mobile devices
- 🔒 **Type-Safe** - TypeScript with exported CVA variants

**Variant Details:**

- **default** - Clean with subtle hover (best for minimal designs)
- **ghost** - Ghost hover states with background
- **bordered** - Bordered pills with shadows and hover effects
- **pills** - Pill-shaped with backgrounds
- **underline** - Animated underline on hover

**Props:**

```tsx
interface BreadcrumbProps {
  items: BreadcrumbItem[]; // Array of breadcrumb items
  variant?: "default" | "ghost" | "bordered" | "pills" | "underline";
  size?: "sm" | "md" | "lg";
  separator?: "chevron" | "slash" | "dot" | "arrow" | "custom";
  customSeparator?: React.ReactNode; // Custom separator element
  showHomeIcon?: boolean; // Show home icon for first item (default: true)
  maxItems?: number; // Max items before collapsing
  className?: string;
}

interface BreadcrumbItem {
  label: string; // Display text
  href?: string; // Link URL (optional)
  icon?: React.ReactNode; // Icon element (optional)
  isCurrentPage?: boolean; // Mark as current page
}
```

**Advanced Usage:**

```tsx
// Dynamic breadcrumb based on route
const breadcrumbItems = useMemo(() => {
  const paths = location.pathname.split("/").filter(Boolean);
  return paths.map((path, index) => ({
    label: path.charAt(0).toUpperCase() + path.slice(1),
    href:
      index < paths.length - 1
        ? `/${paths.slice(0, index + 1).join("/")}`
        : undefined,
    isCurrentPage: index === paths.length - 1,
  }));
}, [location.pathname]);

<Breadcrumb items={breadcrumbItems} variant="pills" />;

// With next/link integration
const CustomBreadcrumb = ({ items }) => (
  <Breadcrumb
    items={items.map((item) => ({
      ...item,
      href: undefined, // Remove href
      onClick: () => router.push(item.path), // Use Next.js router
    }))}
  />
);

// In a page header
<header className="border-b">
  <div className="container mx-auto px-4 py-3">
    <Breadcrumb
      items={[
        { label: "Dashboard", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: currentProject.name, isCurrentPage: true },
      ]}
      variant="ghost"
      size="sm"
    />
  </div>
</header>;
```

**CVA Integration:**

```tsx
import { breadcrumbVariants, breadcrumbItemVariants } from "saha-ui";

// Use exported variants for custom styling
const customBreadcrumbClass = breadcrumbVariants({ size: "lg" });
const customItemClass = breadcrumbItemVariants({
  variant: "pills",
  size: "lg",
  isCurrentPage: false,
});
```

---

### Alert

Display important messages with inline icons and auto-link detection.

**Variants:** `solid` `subtle` `left-accent` `top-accent` `outline`
**Status:** `info` `success` `warning` `danger`

```tsx
import { Alert } from "saha-ui";

<Alert
  variant="left-accent"
  status="success"
  title="Success!"
  message="Your action was completed successfully."
  closeable
  rounded
/>;
```

**Features:**

- 🎨 Compound variants (variant × status)
- 🔗 Auto-link detection in messages
- ✖️ Closeable with smooth animation
- 🎯 Inline SVG icons

---

### Badge

Small status indicators and labels with rich visual variants.

**Variants:** `default` `primary` `secondary` `success` `warning` `error` `info` `outline` `glass`
**Sizes:** `sm` `md` `lg`
**Shapes:** `rounded` `pill` `square`

```tsx
import { Badge } from "saha-ui";

// Basic usage
<Badge variant="primary">New</Badge>

// With status dot
<Badge variant="success" dot pulse>
  Online
</Badge>

// With icon
<Badge variant="warning" icon={AlertCircle}>
  Warning
</Badge>

// Removable tag
<Badge variant="outline" removable onRemove={() => console.log("Removed")}>
  Design
</Badge>

// Custom styling
<Badge
  variant="glass"
  size="lg"
  shape="pill"
  className="backdrop-blur-xl"
>
  Premium
</Badge>
```

**Features:**

- 🎨 9 visual variants with gradients
- 📏 3 sizes (sm, md, lg)
- 🔷 3 shapes (rounded, pill, square)
- 🔴 Status dot indicators with pulse
- 🎯 Icon integration
- ✖️ Removable tags
- ✨ Hover scale animations

**Contextual Usage:**

```tsx
// In Card header
<Card>
  <CardHeader>
    <div className="flex items-center gap-2">
      <CardTitle>Premium Feature</CardTitle>
      <Badge variant="primary" size="sm">New</Badge>
    </div>
  </CardHeader>
</Card>

// Status tags with dots
<Badge variant="success" dot pulse>Active</Badge>
<Badge variant="error" dot>Offline</Badge>
<Badge variant="warning" dot pulse>Away</Badge>

// Tag list
<div className="flex gap-2 flex-wrap">
  {tags.map(tag => (
    <Badge
      key={tag}
      variant="outline"
      removable
      onRemove={() => removeTag(tag)}
    >
      {tag}
    </Badge>
  ))}
</div>
```

---

### Card

Versatile container component with sub-components for structured layouts.

**Variants:** `default` `glass` `glass-strong` `glass-subtle` `bordered`
**Padding:** `none` `sm` `md` `lg` `xl`
**Rounded:** `sm` `md` `lg` `xl` `2xl`

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants // ← CVA export
} from "saha-ui";

<Card variant="glass-strong" padding="lg" rounded="2xl" hoverable>
  <CardHeader>
    <CardTitle>Beautiful Card</CardTitle>
    <CardDescription>Ultra-modern design</CardDescription>
  </CardHeader>
  <CardContent>Your content here</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// All variants demo
<Card variant="default" hoverable>Default Card</Card>
<Card variant="glass" hoverable>Glass Card</Card>
<Card variant="glass-strong" hoverable>Strong Glass</Card>
<Card variant="glass-subtle" hoverable>Subtle Glass</Card>
<Card variant="bordered" hoverable>Bordered Card</Card>

// Custom CVA usage
const customClass = cardVariants({ variant: 'glass-strong', padding: 'xl', rounded: '2xl', hoverable: true });
<div className={customClass}>Custom Card</div>
```

**Features:**

- 🔮 Glass morphism effects
- ✨ Hover scale and shadow effects
- 🎨 Gradient overlays
- 📦 Composable sub-components
- 🛡️ Type-safe CVA variants (exported as `cardVariants`)

---

### Chip

Interactive tag component with multiple variants, deletable functionality, and icon/avatar support.

**Variants:** `filled` `outlined` `soft` `gradient` `glass`
**Colors:** `default` `primary` `secondary` `success` `warning` `error` `info`
**Sizes:** `sm` `md` `lg`

```tsx
import { Chip } from "saha-ui";

// Basic chip
<Chip>JavaScript</Chip>

// With color and variant
<Chip color="primary" variant="filled">Premium</Chip>

// Deletable chip
<Chip deletable onDelete={() => console.log('deleted')}>
  Remove me
</Chip>

// With icon
import { Tag } from "lucide-react";
<Chip icon={<Tag size={14} />} color="success">
  Tagged
</Chip>

// With avatar
<Chip avatar={<Avatar size="xs" src="..." />}>
  John Doe
</Chip>

// Clickable chip
<Chip clickable onClick={() => console.log('clicked')}>
  Click me
</Chip>

// Different sizes
<Chip size="sm">Small</Chip>
<Chip size="lg">Large</Chip>

// Disabled state
<Chip disabled color="error">Disabled</Chip>

// Combined features
<Chip
  avatar={<Avatar size="xs" name="Alice" />}
  deletable
  onDelete={() => handleRemove()}
  color="primary"
  variant="outlined"
>
  Alice
</Chip>
```

**Features:**

- ✨ **5 Modern Variants** - filled, outlined, soft, gradient, glass
- 🎨 **7 Color Options** - comprehensive color palette
- 📏 **3 Size Options** - sm, md, lg for different contexts
- 🗑️ **Deletable** - built-in close button with callback
- 🖼️ **Avatar Support** - integrate user avatars seamlessly
- 🎯 **Icon Support** - add icons for visual context
- 👆 **Clickable** - interactive chips with hover effects
- ♿ **Accessible** - keyboard navigation and ARIA support
- 🎭 **CVA Powered** - type-safe variant composition
- 🌓 **Dark Mode** - fully themed for light and dark modes
- 💫 **Interactive States** - hover, active, and disabled states

**Variant Details:**

- **filled** - Solid background with vibrant colors (default)
- **outlined** - Border-only design with transparent background
- **soft** - Subtle background with soft color tones
- **gradient** - Gradient background with depth
- **glass** - Glassmorphism effect with backdrop blur

**Props:**

```tsx
interface ChipProps {
  variant?: "filled" | "outlined" | "soft" | "gradient" | "glass";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode; // Optional icon at start
  avatar?: React.ReactNode; // Optional avatar at start
  deletable?: boolean; // Show delete button
  onDelete?: () => void; // Delete callback
  disabled?: boolean; // Disable interactions
  clickable?: boolean; // Enable click interactions
  onClick?: () => void; // Click handler
  className?: string;
}
```

**Advanced Usage:**

```tsx
// Tag management system
<div className="flex flex-wrap gap-2">
  {tags.map((tag) => (
    <Chip
      key={tag.id}
      deletable
      onDelete={() => removeTag(tag.id)}
      color="primary"
      variant="soft"
    >
      {tag.name}
    </Chip>
  ))}
</div>

// User selection with avatars
<div className="flex flex-wrap gap-2">
  {selectedUsers.map((user) => (
    <Chip
      key={user.id}
      avatar={<Avatar size="xs" src={user.avatar} name={user.name} />}
      deletable
      onDelete={() => removeUser(user.id)}
      variant="outlined"
      color="primary"
    >
      {user.name}
    </Chip>
  ))}
</div>

// Filter chips
<div className="flex flex-wrap gap-2">
  <Chip
    clickable
    onClick={() => setFilter('all')}
    color={filter === 'all' ? 'primary' : 'default'}
    variant={filter === 'all' ? 'filled' : 'outlined'}
  >
    All
  </Chip>
  <Chip
    clickable
    onClick={() => setFilter('active')}
    color={filter === 'active' ? 'success' : 'default'}
    variant={filter === 'active' ? 'filled' : 'outlined'}
  >
    Active
  </Chip>
  <Chip
    clickable
    onClick={() => setFilter('pending')}
    color={filter === 'pending' ? 'warning' : 'default'}
    variant={filter === 'pending' ? 'filled' : 'outlined'}
  >
    Pending
  </Chip>
</div>

// Technology stack showcase
<div className="space-y-3">
  <div>
    <p className="text-sm font-medium mb-2">Frontend</p>
    <div className="flex flex-wrap gap-2">
      <Chip icon={<Code size={14} />} color="info" variant="soft">React</Chip>
      <Chip icon={<Code size={14} />} color="info" variant="soft">Vue</Chip>
      <Chip icon={<Code size={14} />} color="info" variant="soft">Angular</Chip>
    </div>
  </div>
  <div>
    <p className="text-sm font-medium mb-2">Backend</p>
    <div className="flex flex-wrap gap-2">
      <Chip icon={<Server size={14} />} color="success" variant="soft">Node.js</Chip>
      <Chip icon={<Server size={14} />} color="success" variant="soft">Python</Chip>
      <Chip icon={<Server size={14} />} color="success" variant="soft">Go</Chip>
    </div>
  </div>
</div>
```

**CVA Integration:**

```tsx
import { chipVariants } from "saha-ui";

// Use exported variants for custom styling
const customChipClass = chipVariants({
  variant: "gradient",
  color: "primary",
  size: "lg",
  clickable: true,
});
```

---

### Separator

Content separator component with 5 modern variants, optional labels, and decorative elements.

**Variants:** `solid` `dashed` `dotted` `gradient` `glass`
**Orientation:** `horizontal` `vertical`
**Thickness:** `thin` `medium` `thick`
**Spacing:** `none` `xs` `sm` `md` `lg` `xl`

```tsx
import { Separator } from "saha-ui";

// Basic Separator
<Separator />

// With label
<Separator label="OR" />

// Gradient variant
<Separator variant="gradient" thickness="medium" />

// Vertical Separator
<div className="flex items-center h-24">
  <div>Section 1</div>
  <Separator orientation="vertical" className="h-full" />
  <div>Section 2</div>
</div>

// Decorative with label
<Separator label="Continue Reading" decorative />

// Custom positioning
<Separator label="Section Start" labelPosition="left" variant="dashed" />

// Different thickness
<Separator thickness="thick" variant="solid" />

// Custom spacing
<Separator spacing="xl" variant="gradient" />
```

**Features:**

- ✨ **5 Modern Variants** - solid, dashed, dotted, gradient, glass
- 🔄 **Dual Orientation** - horizontal and vertical support
- 📏 **3 Thickness Options** - thin, medium, thick
- 🏷️ **Label Support** - optional text labels with positioning
- ⭐ **Decorative Elements** - sparkle icons for emphasis
- 📐 **Flexible Spacing** - 6 spacing options (none to xl)
- 🎨 **Theme-Aware** - OKLCH colors with dark mode support
- ♿ **Accessible** - semantic HTML with ARIA roles
- 🎭 **CVA Powered** - type-safe variant composition
- 📱 **Responsive** - works in any layout context

**Variant Details:**

- **solid** - Clean solid line (default)
- **dashed** - Dashed line pattern
- **dotted** - Dotted line pattern
- **gradient** - Smooth gradient transition from transparent to border color
- **glass** - Glassmorphism effect with backdrop blur

**Props:**

```tsx
interface SeparatorProps {
  variant?: "solid" | "dashed" | "dotted" | "gradient" | "glass";
  orientation?: "horizontal" | "vertical";
  thickness?: "thin" | "medium" | "thick";
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  label?: React.ReactNode; // Optional label content
  labelPosition?: "left" | "center" | "right";
  decorative?: boolean; // Add sparkle icons
  className?: string;
}
```

**Advanced Usage:**

```tsx
// In forms - separating auth methods
<Card>
  <CardContent>
    <Button variant="primary" className="w-full">
      Sign in with Email
    </Button>

    <Separator label="OR" variant="gradient" spacing="sm" />

    <Button variant="outline" className="w-full">
      Continue with GitHub
    </Button>
  </CardContent>
</Card>

// Content sections with labels
<article>
  <p>Introduction paragraph...</p>

  <Separator
    label="Section 1"
    labelPosition="left"
    variant="dashed"
    spacing="lg"
  />

  <p>Main content...</p>

  <Separator
    label="Conclusion"
    labelPosition="left"
    variant="dashed"
    spacing="lg"
  />

  <p>Summary...</p>

  <Separator decorative spacing="lg" variant="gradient" />
</article>

// Vertical layout sections
<div className="flex h-64">
  <div className="flex-1">Left Panel</div>
  <Separator
    orientation="vertical"
    variant="gradient"
    className="h-full"
  />
  <div className="flex-1">Right Panel</div>
</div>

// Dashboard sections
<div className="flex gap-4 h-48">
  <Card className="flex-1">Stats 1</Card>
  <Separator orientation="vertical" variant="glass" className="h-full" />
  <Card className="flex-1">Stats 2</Card>
  <Separator orientation="vertical" variant="glass" className="h-full" />
  <Card className="flex-1">Stats 3</Card>
</div>
```

**CVA Integration:**

```tsx
import {
  SeparatorVariants,
  SeparatorLineVariants,
  SeparatorLabelVariants,
} from "saha-ui";

// Use exported variants for custom styling
const customContainerClass = SeparatorVariants({
  orientation: "horizontal",
  spacing: "lg",
});

const customLineClass = SeparatorLineVariants({
  variant: "gradient",
  orientation: "horizontal",
  thickness: "medium",
});

const customLabelClass = SeparatorLabelVariants({
  orientation: "horizontal",
});
```

---

### Accordion

Collapsible content sections with smooth animations and multiple behavior modes.

**Variants:** `default` `bordered` `flush` `glass`
**Sizes:** `sm` `md` `lg`

```tsx
import { Accordion } from "saha-ui";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content for item 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Item 2</AccordionTrigger>
    <AccordionContent>Content for item 2</AccordionContent>
  </AccordionItem>
</Accordion>;
```

**Features:**

- 🎭 Multiple types: single, multiple, toggle
- 🚀 Fast open/close animations
- 🔒 Collapsible and non-collapsible modes
- 🎨 Glass morphism and gradient support
- ♿ Fully accessible with ARIA attributes

---

### Avatar

Profile images with status indicators and smart fallbacks.

**Sizes:** `xs` `sm` `md` `lg` `xl` `2xl`
**Shapes:** `circle` `square` `rounded`
**Status:** `online` `offline` `away` `busy` `none`

```tsx
import { Avatar } from "saha-ui";

<Avatar
  src="/user.jpg"
  alt="John Doe"
  size="lg"
  shape="circle"
  status="online"
  bordered
  ring
  initials="JD"
/>;
```

**Features:**

- 🎨 Auto-generated initials fallback
- 🌈 Smart color generation from name
- 💫 Status indicators with pulse animation
- ⚡ Loading skeleton
- 🔄 Image error handling

---

### AvatarGroup

Display multiple avatars with overlap and count indicator.

**Variants:** `stack` `row` `grid` `grid-dense`
**Sizes:** `xs` `sm` `md` `lg` `xl` `2xl`

```tsx
import { AvatarGroup, Avatar } from "saha-ui";

<AvatarGroup
  max={3}
  size="md"
  variant="stack"
  gap={false}
  withRing={false}
  showCount
>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
</AvatarGroup>;
```

**Features:**

- 📊 Smart "+X more" indicator
- 🎭 4 layout variants
- ✨ Hover scale effects
- 🔄 Reverse order option
- 📏 Custom spacing control

---

### Tooltip

Contextual hints and information with smart positioning, multiple trigger types, and interactive capabilities.

**Variants:** `default` `dark` `light` `glass` `primary` `success` `warning` `error` `info`
**Positions:** `top` `bottom` `left` `right`
**Sizes:** `sm` `md` `lg`
**Triggers:** `hover` `click` `focus` `manual`

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "saha-ui";

// Basic tooltip
<Tooltip position="top" variant="glass">
  <TooltipTrigger>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>This is helpful information</TooltipContent>
</Tooltip>

// Status tooltips
<Tooltip variant="success">
  <TooltipTrigger>
    <Badge variant="success">Active</Badge>
  </TooltipTrigger>
  <TooltipContent>All systems operational</TooltipContent>
</Tooltip>

<Tooltip variant="warning" position="right">
  <TooltipTrigger>
    <span className="cursor-help">⚠</span>
  </TooltipTrigger>
  <TooltipContent>Warning: Check this!</TooltipContent>
</Tooltip>

// Interactive tooltip with click trigger
<Tooltip interactive trigger="click" variant="glass" maxWidth="200px">
  <TooltipTrigger>
    <Button>Click for Options</Button>
  </TooltipTrigger>
  <TooltipContent>
    <div className="space-y-2">
      <p className="font-semibold">Interactive Content</p>
      <Button size="sm">Click Me</Button>
    </div>
  </TooltipContent>
</Tooltip>

// Controlled tooltip
const [open, setOpen] = useState(false);
<Tooltip open={open} onOpenChange={setOpen} trigger="manual">
  <TooltipTrigger>
    <Button onClick={() => setOpen(!open)}>Toggle</Button>
  </TooltipTrigger>
  <TooltipContent>Controlled tooltip</TooltipContent>
</Tooltip>

// Help icon tooltips
<div className="flex items-center gap-2">
  <span>Username</span>
  <Tooltip variant="info" size="sm">
    <TooltipTrigger>
      <span className="cursor-help text-muted-foreground">ⓘ</span>
    </TooltipTrigger>
    <TooltipContent>
      Enter your unique username (3-20 characters)
    </TooltipContent>
  </Tooltip>
</div>

// Custom delay and no arrow
<Tooltip
  content="Appears after 1 second"
  delay={1000}
  arrow={false}
  variant="primary"
>
  <Button>Delayed Tooltip</Button>
</Tooltip>
```

**Variants:**

- **default** - Standard tooltip with card background and subtle shadow
- **dark** - Dark theme tooltip with deep gray background
- **light** - Light theme tooltip, bright background
- **glass** - Glass morphism effect with backdrop blur
- **primary** - Primary color with brand styling
- **success** - Green success indicator
- **warning** - Yellow warning indicator
- **error** - Red error indicator
- **info** - Blue information indicator

**Features:**

- 🎨 **9 Modern Variants** - Each optimized for different contexts
- 📍 **4 Positions** - Top, bottom, left, right with smart alignment
- 🖱️ **4 Trigger Types** - Hover, click, focus, or manual control
- ⏱️ **Configurable Delay** - Customizable show delay (default 200ms)
- ➡️ **Optional Arrow** - Pointing arrow for better UX
- 💫 **Interactive Mode** - Allow interaction with tooltip content
- 🎯 **Controlled Mode** - Programmatic control via props
- 📏 **3 Sizes** - sm, md, lg with responsive text
- 🔮 **Glass Effects** - Beautiful backdrop blur and transparency
- 🌙 **Dark Mode** - Optimized for both light and dark themes
- ♿ **Accessible** - Proper ARIA attributes and keyboard support
- 📦 **Tree-Shakeable** - Import only what you need
- 🎭 **Custom Styling** - ClassName props for tooltip and wrapper
- 📐 **Adjustable Offset** - Control distance from trigger element
- 🚫 **Disable Option** - Conditionally disable tooltips
- � **Type-Safe** - Full CVA integration with exported variants

**Props:**

- `content`: ReactNode - Tooltip content (required)
- `children`: ReactNode - Trigger element (required)
- `variant`: 'default' | 'dark' | 'light' | 'glass' | 'primary' | 'success' | 'warning' | 'error' | 'info' (default: 'default')
- `position`: 'top' | 'bottom' | 'left' | 'right' (default: 'top')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `trigger`: 'hover' | 'click' | 'focus' | 'manual' (default: 'hover')
- `delay`: number - Show delay in ms (default: 200)
- `arrow`: boolean - Show arrow pointer (default: true)
- `interactive`: boolean - Allow interaction with content (default: false)
- `open`: boolean - Controlled open state
- `onOpenChange`: (open: boolean) => void - Open state change callback
- `tooltipClassName`: string - Custom tooltip content class
- `wrapperClassName`: string - Custom wrapper class
- `maxWidth`: string - Maximum width (default: '320px')
- `offset`: number - Distance from trigger in px (default: 8)
- `disabled`: boolean - Disable tooltip (default: false)
- `className`: string - Additional CSS classes

**Advanced Usage:**

```tsx
// Help system with different variants
const HelpTooltips = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <span>Email</span>
      <Tooltip
        content="We'll never share your email"
        variant="success"
        size="sm"
      >
        <span className="cursor-help">✓</span>
      </Tooltip>
    </div>

    <div className="flex items-center gap-2">
      <span>Password</span>
      <Tooltip
        content="Must be at least 8 characters"
        variant="warning"
        size="sm"
      >
        <span className="cursor-help">⚠</span>
      </Tooltip>
    </div>
  </div>
);

// Interactive tooltip menu
<Tooltip
  content={
    <div className="space-y-2 w-48">
      <p className="font-semibold text-sm">Quick Actions</p>
      <div className="space-y-1">
        <Button size="sm" variant="ghost" className="w-full justify-start">
          Edit
        </Button>
        <Button size="sm" variant="ghost" className="w-full justify-start">
          Share
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="w-full justify-start text-red-500"
        >
          Delete
        </Button>
      </div>
    </div>
  }
  interactive={true}
  trigger="click"
  variant="glass"
  maxWidth="220px"
  arrow={false}
>
  <Button size="sm" variant="ghost">
    ⋯
  </Button>
</Tooltip>;

// Status indicator tooltips
const StatusIndicator = ({ status, message }) => (
  <Tooltip
    content={message}
    variant={status === "online" ? "success" : "error"}
    size="sm"
  >
    <Badge variant={status === "online" ? "success" : "error"}>{status}</Badge>
  </Tooltip>
);
```

**CVA Integration:**

```tsx
import { tooltipVariants, arrowVariants } from "saha-ui";

// Use exported variants for custom styling
const customTooltipClass = tooltipVariants({
  variant: "glass",
  size: "lg",
  position: "top",
  interactive: true,
  className: "my-custom-class",
});

const customArrowClass = arrowVariants({
  variant: "primary",
  position: "bottom",
});
```

---

### Link

Smart, versatile links with automatic external detection and multiple visual variants.

**Variants:** `default` `primary` `secondary` `accent` `muted` `underline` `ghost` `button` `glass`
**Sizes:** `sm` `md` `lg`

```tsx
import { Link } from "saha-ui";
import { Star } from "lucide-react";

// Basic link with animated underline
<Link variant="primary" href="/docs">
  Documentation
</Link>

// External link (auto-detects and shows icon)
<Link external href="https://github.com">
  GitHub
</Link>

// Button style link
<Link variant="button" href="/get-started">
  Get Started
</Link>

// Glass variant
<Link variant="glass" href="/premium">
  Premium Features
</Link>

// With custom icon
<Link variant="accent" icon={<Star size={16} />} href="/featured">
  Featured
</Link>

// Custom underline animation
<Link variant="muted" showUnderline href="/about">
  About Us
</Link>

// Disabled state
<Link variant="primary" disabled href="#">
  Coming Soon
</Link>
```

**Features:**

- 🎨 **9 Visual Variants** - default, primary, secondary, accent, muted, underline, ghost, button, glass
- 🔗 **Auto External Detection** - Automatically detects external links
- 🔒 **Security First** - Auto rel="noopener noreferrer" for external links
- ✨ **Animated Underlines** - Smooth gradient underline animations
- 🎯 **Custom Icons** - Support for custom icons with hover effects
- 💫 **Hover Animations** - Icon translation and glow effects
- 🔘 **Button Variant** - Links styled as buttons with gradient overlays
- 🔮 **Glass Morphism** - Backdrop blur variant for modern UIs
- ♿ **Accessible** - Proper ARIA attributes and focus states
- � **CVA Integration** - Type-safe variant management

**Props:**

- `variant` - Visual style (default, primary, secondary, accent, muted, underline, ghost, button, glass)
- `size` - Text size (sm, md, lg)
- `external` - Show external link icon
- `disabled` - Disable the link
- `showUnderline` - Show animated underline on hover
- `icon` - Custom icon element to display before text

**Contextual Usage:**

```tsx
// In navigation
<nav>
  <Link variant="ghost" href="/home">Home</Link>
  <Link variant="ghost" href="/about">About</Link>
  <Link variant="button" href="/contact">Contact</Link>
</nav>

// Social links
<Link variant="primary" icon={<Star size={16} />} external href="https://github.com">
  Star on GitHub
</Link>

// Call-to-action
<Link variant="button" href="/signup">
  Sign Up Free
</Link>

// Inline text link
<p>
  Read our <Link variant="primary" href="/docs">documentation</Link> to learn more.
</p>
```

---

### List

Versatile lists with 5 modern variants, icon support, and enhanced animations powered by CVA (Class Variance Authority).

**Types:** `disc` `circle` `square` `decimal` `decimal-leading-zero` `lower-roman` `upper-roman` `lower-alpha` `upper-alpha` `none`
**Variants:** `default` `bordered` `divided` `striped` `cards`
**Sizes:** `sm` `md` `lg`

```tsx
import { List, ListItem } from 'saha-ui';
import { CheckCircle, Star, Zap, Heart } from 'lucide-react';

// Default List
<List variant="default" listType="disc">
  <li>Modern React components</li>
  <li>TypeScript support</li>
  <li>Tailwind CSS styling</li>
</List>

// Bordered List with backdrop blur
<List variant="bordered" listType="disc" size="md">
  <li>Clean border design</li>
  <li>Card background</li>
  <li>Shadow on hover</li>
</List>

// Divided List (requires ListItem)
<List variant="divided" listType="none">
  <ListItem variant="divided">First item</ListItem>
  <ListItem variant="divided">Second item</ListItem>
  <ListItem variant="divided">Third item</ListItem>
</List>

// Striped List (requires ListItem)
<List variant="striped" listType="none">
  <ListItem variant="striped">Striped item 1</ListItem>
  <ListItem variant="striped">Striped item 2</ListItem>
  <ListItem variant="striped">Striped item 3</ListItem>
</List>

// Cards Variant with icons and hover effects
<List variant="cards" listType="none">
  <ListItem variant="cards" icon={<CheckCircle size={20} />}>
    <strong>Modern Design</strong> - Beautiful glassmorphism effects
  </ListItem>
  <ListItem variant="cards" icon={<Star size={20} />}>
    <strong>Type Safe</strong> - Full TypeScript support
  </ListItem>
  <ListItem variant="cards" icon={<Zap size={20} />}>
    <strong>Fast Performance</strong> - Optimized for speed
  </ListItem>
</List>

// Feature list with custom icons
<List variant="default" listType="none">
  <ListItem icon={<CheckCircle size={18} />}>
    Complete TypeScript support
  </ListItem>
  <ListItem icon={<Star size={18} />}>
    Modern glassmorphism effects
  </ListItem>
  <ListItem icon={<Heart size={18} />}>
    Dark mode compatible
  </ListItem>
</List>

// Ordered list with different markers
<List variant="default" listType="decimal" ordered size="md">
  <li>Install the package</li>
  <li>Import components</li>
  <li>Start building</li>
</List>

<List variant="bordered" listType="upper-roman" ordered>
  <li>Chapter I</li>
  <li>Chapter II</li>
  <li>Chapter III</li>
</List>
```

**Variant Details:**

- **default** - Clean, minimal design with standard list styling
- **bordered** - Card background with border, shadow, and backdrop blur (20px)
- **divided** - Items separated by Separator lines, subtle hover effects
- **striped** - Alternating background colors for better readability
- **cards** - Individual card-style items with gradient overlay on hover

**Features:**

- 🔢 **Ordered & Unordered** - Full support for both list types
- 🎨 **5 Modern Variants** - Each with unique visual design and animations
- ✨ **Icon Support** - Custom icons per item with hover animations (scale 110%, color change to primary)
- 💫 **Enhanced Animations** - Smooth transitions, hover effects, and gradient overlays
- 🔮 **Glass Morphism** - Backdrop blur effects on bordered variant
- 📏 **3 Sizes** - sm, md, lg with responsive text and spacing
- 🎯 **Type-Safe** - Full CVA integration with exported variants
- � **Dark Mode** - Optimized colors and effects for dark theme
- ♿ **Accessible** - Semantic HTML with proper ARIA attributes
- 📦 **Tree-Shakeable** - Import only what you need
- 🎭 **Compound Variants** - Automatic padding adjustments per variant
- 🌈 **10 List Types** - disc, circle, square, decimal, roman numerals, alpha

**Props:**

**List Component:**

- `variant`: 'default' | 'bordered' | 'divided' | 'striped' | 'cards' (default: 'default')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `listType`: 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' | 'lower-roman' | 'upper-roman' | 'lower-alpha' | 'upper-alpha' | 'none' (default: 'disc')
- `ordered`: boolean (default: false) - Renders as `<ol>` instead of `<ul>`
- `className`: string - Additional CSS classes

**ListItem Component:**

- `variant`: 'default' | 'bordered' | 'divided' | 'striped' | 'cards' (default: 'default')
- `icon`: ReactNode - Optional icon to display before content
- `children`: ReactNode - Item content
- `className`: string - Additional CSS classes

**Advanced Usage:**

```tsx
// Contextual usage in Card
<Card variant="glass-strong">
  <CardHeader>
    <CardTitle>Installation Guide</CardTitle>
  </CardHeader>
  <CardContent>
    <List variant="bordered" listType="decimal" ordered size="md">
      <li>Install the package via npm</li>
      <li>Import the components</li>
      <li>Wrap with ThemeProvider</li>
      <li>Start using components</li>
    </List>
  </CardContent>
</Card>

// Mixed content with icons
<List variant="cards" listType="none">
  <ListItem variant="cards" icon={<CheckCircle size={20} />}>
    <div>
      <strong>Premium Feature</strong>
      <p className="text-sm text-muted-foreground">
        Access to exclusive components
      </p>
    </div>
  </ListItem>
</List>
```

**CVA Integration:**

```tsx
import { listVariants, listItemVariants } from "saha-ui";

// Use exported variants for custom styling
const customListClass = listVariants({
  variant: "cards",
  size: "lg",
  className: "my-custom-class",
});

const customItemClass = listItemVariants({
  variant: "cards",
  className: "hover:scale-105",
});
```

---

### Timeline

Chronological event display with 4 modern variants, flexible positioning, status indicators, and icon support powered by CVA.

**Variants:** `default` `outlined` `gradient` `minimal`
**Positions:** `left` `right` `alternate`
**Sizes:** `sm` `md` `lg`
**Status:** `default` `primary` `success` `warning` `error` `info`

```tsx
import { Timeline } from 'saha-ui';
import { Rocket, Code, Package, Check } from 'lucide-react';

// Basic Timeline
<Timeline
  items={[
    { id: 1, title: 'Project Started', description: 'Initial setup', time: '2 hours ago' },
    { id: 2, title: 'Development', description: 'Building features', time: '1 hour ago' },
    { id: 3, title: 'Completed', description: 'Ready to deploy', time: 'Just now' }
  ]}
/>

// Timeline with Icons
<Timeline
  items={[
    { id: 1, title: 'Planning', description: 'Define requirements', time: 'Jan 1', icon: Rocket },
    { id: 2, title: 'Development', description: 'Build features', time: 'Jan 15', icon: Code, status: 'primary' },
    { id: 3, title: 'Testing', description: 'QA process', time: 'Feb 1', icon: Package, status: 'warning' },
    { id: 4, title: 'Launch', description: 'Production ready', time: 'Feb 15', icon: Check, status: 'success' }
  ]}
  variant="gradient"
/>

// Alternate Positioning
<Timeline
  items={[
    { id: 1, title: 'Order Placed', description: 'We received your order', time: '2h ago', status: 'success' },
    { id: 2, title: 'Processing', description: 'Preparing items', time: '1h ago', status: 'primary', active: true },
    { id: 3, title: 'Shipped', description: 'On the way', time: 'Pending', status: 'default' },
    { id: 4, title: 'Delivered', description: 'Enjoy your purchase', time: 'Pending', status: 'default' }
  ]}
  position="alternate"
  variant="outlined"
/>

// Different Sizes
<Timeline
  items={[
    { id: 1, title: 'Small', description: 'Compact view', time: 'Now' },
    { id: 2, title: 'Medium', description: 'Default size', time: 'Now' },
    { id: 3, title: 'Large', description: 'Spacious layout', time: 'Now' }
  ]}
  size="lg"
/>

// Left/Right Positioning
<Timeline
  position="right"
  items={[
    { id: 1, title: 'Event 1', description: 'Content aligned right', time: '10:00 AM' },
    { id: 2, title: 'Event 2', description: 'All items on right', time: '11:00 AM' }
  ]}
/>
```

**Variants:**

- **default** - Clean design with colored dot and connecting line
- **outlined** - Bordered container with subtle background
- **gradient** - Vibrant gradient background with enhanced visual appeal
- **minimal** - Ultra-clean design with minimal visual elements

**Features:**

- 🎨 **4 Modern Variants** - Each with unique visual design
- 📍 **3 Positioning Modes** - Left, right, or alternating layout
- 🎯 **6 Status Colors** - default, primary, success, warning, error, info
- ✨ **Icon Support** - Custom icons with automatic fallbacks (Circle for active, Check for success)
- 💫 **Active State** - Enhanced styling with scale and shadow effects
- 📏 **3 Sizes** - sm, md, lg with responsive spacing
- 🔮 **Smart Layout** - Responsive alternate positioning (left on even, right on odd)
- 🌈 **Status Indicators** - Color-coded dots matching status colors
- 🎭 **Compound Variants** - Position + size combinations for perfect spacing
- 🌙 **Dark Mode** - Optimized colors and contrast for dark theme
- ♿ **Accessible** - Semantic HTML with proper ARIA attributes
- 📦 **Tree-Shakeable** - Import only what you need
- 🎯 **Type-Safe** - Full CVA integration with exported variants
- 🎨 **Custom Styling** - Per-item and global className overrides
- 🎯 **Dot Shapes** - Circle, square, diamond, ring shapes
- 📏 **Line Styles** - Solid, dashed, dotted, gradient
- 🎨 **Custom Colors** - Override line and dot colors
- 🔄 **Interactive** - Click handlers and custom render functions
- 👁️ **Conditional Rendering** - Hide dots/lines per item
- 📍 **Flexible Time Display** - Show time on opposite side in alternate mode

**Props:**

**TimelineItem Interface:**

```tsx
interface TimelineItem {
  id: number | string;
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
  icon?: React.ReactNode;
  status?: "default" | "primary" | "success" | "warning" | "error" | "info";
  active?: boolean;
  // New customization props
  dotColor?: string; // Custom dot color
  className?: string; // Custom item className
  dotClassName?: string; // Custom dot className
  contentClassName?: string; // Custom content className
  hideDot?: boolean; // Hide dot for this item
  hideLine?: boolean; // Hide line after this item
}
```

**Timeline Component:**

- `items`: TimelineItem[] - Array of timeline events (required)
- `variant`: 'default' | 'outlined' | 'gradient' | 'minimal' (default: 'default')
- `position`: 'left' | 'right' | 'alternate' (default: 'left')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: string - Additional CSS classes
- `itemClassName`: string - Custom class for all items
- `dotClassName`: string - Custom class for all dots
- `contentClassName`: string - Custom class for all content
- `lineClassName`: string - Custom class for the timeline line
- `lineStyle`: 'solid' | 'dashed' | 'dotted' | 'gradient' (default: 'solid')
- `dotShape`: 'circle' | 'square' | 'diamond' | 'ring' (default: 'circle')
- `lineColor`: string - Custom line color
- `lineWidth`: string - Line width (default: '2px')
- `showTimeOnOppositeSide`: boolean - Show time on opposite side in alternate mode
- `hideIcons`: boolean - Hide all icons
- `animateOnScroll`: boolean - Animate items on scroll
- `renderItem`: (item, index) => ReactNode - Custom render function
- `onItemClick`: (item, index) => void - Click handler

**Advanced Usage:**

```tsx
// Custom Dot Shapes and Line Styles
<Timeline
  dotShape="diamond"
  lineStyle="dashed"
  items={[
    { id: 1, title: 'Design Phase', time: 'Week 1' },
    { id: 2, title: 'Development', time: 'Week 2-4', active: true },
    { id: 3, title: 'Testing', time: 'Week 5' }
  ]}
/>

// Custom Colors and Per-Item Styling
<Timeline
  lineColor="#ff6b6b"
  lineWidth="3px"
  items={[
    {
      id: 1,
      title: 'Custom Dot Color',
      dotColor: '#ffd93d',
      dotClassName: 'shadow-xl',
      time: 'Now'
    },
    {
      id: 2,
      title: 'Hidden Dot',
      hideDot: true,
      description: 'This item has no dot',
      time: 'Later'
    },
    {
      id: 3,
      title: 'No Line After',
      hideLine: true,
      time: 'End'
    }
  ]}
/>

// Interactive Timeline with Click Handler
<Timeline
  onItemClick={(item, index) => {
    console.log(`Clicked item ${index}:`, item.title);
  }}
  items={[
    { id: 1, title: 'Clickable Item 1', time: '10:00' },
    { id: 2, title: 'Clickable Item 2', time: '11:00' }
  ]}
/>

// Time on Opposite Side (Alternate Mode)
<Timeline
  position="alternate"
  showTimeOnOppositeSide={true}
  items={[
    { id: 1, title: 'Event 1', description: 'Time shows on opposite side', time: 'Jan 1' },
    { id: 2, title: 'Event 2', description: 'Clean, organized layout', time: 'Jan 15' }
  ]}
/>

// Different Dot Shapes
<Timeline
  dotShape="ring"
  size="lg"
  items={[
    { id: 1, title: 'Ring Shape', status: 'primary' },
    { id: 2, title: 'Hollow Center', status: 'success' }
  ]}
/>

<Timeline
  dotShape="square"
  items={[
    { id: 1, title: 'Square Dots', status: 'info' },
    { id: 2, title: 'Modern Look', status: 'warning' }
  ]}
/>

// E-commerce Order Tracking
<Timeline
  variant="outlined"
  position="alternate"
  items={[
    {
      id: 1,
      title: 'Order Confirmed',
      description: 'Your order has been received',
      time: '2 hours ago',
      status: 'success',
      icon: Check
    },
    {
      id: 2,
      title: 'Processing',
      description: 'We are preparing your items',
      time: '1 hour ago',
      status: 'primary',
      active: true,
      icon: Package
    },
    {
      id: 3,
      title: 'Shipped',
      description: 'Your order is on the way',
      time: 'Pending',
      status: 'default',
      icon: Rocket
    }
  ]}
/>

// Project Development Timeline
<Timeline
  variant="gradient"
  size="lg"
  items={[
    { id: 1, title: 'Sprint Planning', description: 'Q1 2024', icon: Rocket, status: 'success' },
    { id: 2, title: 'Development', description: 'Q2 2024', icon: Code, status: 'primary', active: true },
    { id: 3, title: 'Testing', description: 'Q3 2024', icon: Package, status: 'warning' },
    { id: 4, title: 'Release', description: 'Q4 2024', icon: Check, status: 'default' }
  ]}
/>
```

**CVA Integration:**

```tsx
import {
  timelineVariants,
  timelineItemVariants,
  timelineLineVariants,
  timelineDotVariants,
  timelineContentVariants,
} from "saha-ui";

// Use exported variants for custom styling
const customTimelineClass = timelineVariants({
  variant: "gradient",
  className: "my-custom-class",
});

const customItemClass = timelineItemVariants({
  position: "alternate",
  size: "lg",
  className: "hover:scale-105",
});

const customDotClass = timelineDotVariants({
  status: "success",
  size: "lg",
  active: true,
});
```

---

### Tree

Hierarchical data visualization with expand/collapse functionality.

**Variants:** `default` `glass` `bordered` `minimal`
**Sizes:** `sm` `md` `lg`

```tsx
import { Tree } from "saha-ui";
import { Folder, File } from "lucide-react";

<Tree
  variant="glass"
  size="md"
  showIcons={true}
  showLines={true}
  iconPosition="left"
  onNodeClick={(id) => console.log("Clicked:", id)}
  onNodeToggle={(id, expanded) => console.log("Toggled:", id, expanded)}
  nodes={[
    {
      id: "src",
      label: "src",
      icon: <Folder size={16} />,
      expanded: true,
      children: [
        {
          id: "components",
          label: "components",
          icon: <Folder size={16} />,
          children: [
            { id: "button", label: "Button.tsx", icon: <File size={16} /> },
            { id: "card", label: "Card.tsx", icon: <File size={16} /> },
          ],
        },
        { id: "app", label: "App.tsx", icon: <File size={16} /> },
      ],
    },
  ]}
/>;
```

**Props:**

**Tree Component:**

- `nodes`: TreeNode[] - Array of tree nodes (required)
- `variant`: 'default' | 'glass' | 'bordered' | 'minimal' (default: 'default')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: string - Additional CSS classes
- `nodeClassName`: string - Custom class for all nodes
- `iconPosition`: 'left' | 'right' (default: 'left')
- `showLines`: boolean - Show connecting lines (default: true)
- `showIcons`: boolean - Show node icons (default: true)
- `onNodeToggle`: (id, expanded) => void - Callback when node is expanded/collapsed
- `onNodeClick`: (id) => void - Callback when node is clicked

**TreeNode:**

- `id`: string | number - Unique identifier (required)
- `label`: string - Display text (required)
- `icon`: ReactNode - Custom icon
- `children`: TreeNode[] - Child nodes
- `expanded`: boolean - Initial expanded state (default: false)
- `disabled`: boolean - Disable interactions
- `className`: string - Custom class for this node

**Advanced Usage:**

```tsx
// File System Explorer
<Tree
  variant="bordered"
  showIcons={true}
  onNodeClick={(id) => console.log('Opened:', id)}
  nodes={[
    {
      id: 1,
      label: 'Documents',
      icon: <FolderOpen size={16} />,
      expanded: true,
      children: [
        {
          id: 2,
          label: 'Work',
          icon: <Folder size={16} />,
          children: [
            { id: 3, label: 'Resume.pdf', icon: <FileText size={16} /> },
            { id: 4, label: 'Cover.docx', icon: <FileText size={16} /> }
          ]
        },
        { id: 5, label: 'Personal', icon: <Folder size={16} /> }
      ]
    },
    {
      id: 6,
      label: 'Media',
      icon: <Folder size={16} />,
      children: [
        { id: 7, label: 'photo.jpg', icon: <ImageIcon size={16} /> },
        { id: 8, label: 'video.mp4', icon: <Video size={16} /> }
      ]
    }
  ]}
/>

// Organization Chart
<Tree
  variant="glass"
  size="lg"
  nodes={[
    {
      id: 'ceo',
      label: 'CEO',
      icon: <User size={16} />,
      expanded: true,
      children: [
        {
          id: 'eng',
          label: 'Engineering',
          icon: <Settings size={16} />,
          children: [
            { id: 'fe', label: 'Frontend Team', icon: <Code size={16} /> },
            { id: 'be', label: 'Backend Team', icon: <Package size={16} /> }
          ]
        },
        {
          id: 'mkt',
          label: 'Marketing',
          icon: <Rocket size={16} />,
          children: [
            { id: 'content', label: 'Content', icon: <FileText size={16} /> }
          ]
        }
      ]
    }
  ]}
/>

// Without Icons or Lines
<Tree
  showIcons={false}
  showLines={false}
  variant="minimal"
  nodes={[
    {
      id: 1,
      label: 'Parent',
      children: [
        { id: 2, label: 'Child 1' },
        { id: 3, label: 'Child 2' }
      ]
    }
  ]}
/>

// Icon on Right Side
<Tree
  iconPosition="right"
  nodes={[
    {
      id: 1,
      label: 'Folder',
      icon: <Folder size={16} />,
      children: [
        { id: 2, label: 'File', icon: <File size={16} /> }
      ]
    }
  ]}
/>

// With Disabled Nodes
<Tree
  nodes={[
    {
      id: 1,
      label: 'Active',
      children: [
        { id: 2, label: 'Enabled' },
        { id: 3, label: 'Disabled', disabled: true }
      ]
    }
  ]}
/>
```

**CVA Integration:**

```tsx
import { treeVariants, treeNodeVariants } from "saha-ui";

// Use exported variants for custom styling
const customTreeClass = treeVariants({
  variant: "glass",
  size: "lg",
  className: "my-custom-class",
});

const customNodeClass = treeNodeVariants({
  size: "md",
  expanded: true,
  className: "hover:bg-accent/20",
});
```

---

### Image

Advanced image component with loading states and effects.

**Variants:** `default` `rounded` `circular` `bordered` `glass`
**Fit:** `cover` `contain` `fill` `none` `scale-down`
**Sizes:** `xs` `sm` `md` `lg` `xl` `2xl` `full`

```tsx
import { Image } from "saha-ui";

<Image
  src="/photo.jpg"
  alt="Beautiful photo"
  variant="rounded"
  size="lg"
  fit="cover"
  zoomOnHover
  aspectRatio="16/9"
  lazy
  showSkeleton
  fallbackSrc="/fallback.jpg"
/>;
```

**Features:**

- ⚡ Lazy loading by default
- 💀 Animated loading skeleton
- 🔄 Smart error handling with fallback
- 🔍 Zoom on hover effect
- 📐 Aspect ratio control

---

### Carousel

Feature-rich image slider with multiple transition effects.

**Variants:** `default` `contained` `bordered` `glass`
**Effects:** `slide` `fade` `cube` `flip`
**Direction:** `forward` `backward`

```tsx
import { Carousel } from "saha-ui";

<Carousel
  items={[
    {
      image: "/slide1.jpg",
      alt: "Slide 1",
      title: "Welcome",
      description: "Beautiful design",
      link: "#",
      linkText: "Learn More",
    },
    {
      image: "/slide2.jpg",
      alt: "Slide 2",
      title: "Features",
      description: "Amazing capabilities",
    },
  ]}
  autoplay
  autoplayInterval={5000}
  effect="fade"
  variant="glass"
  showNavigation
  showIndicators
  loop
  pauseOnHover
  swipeable
/>;
```

**Features:**

- 🎬 4 transition effects
- 👆 Touch/swipe gestures
- ⏸️ Pause on hover
- 🔄 Infinite loop
- 🎯 Dot indicators
- 🎨 Modern navigation buttons

---

### Steps

Progress indicator for multi-step processes and wizards.

**Variants:** `default` `bordered` `glass` `minimal`
**Orientation:** `horizontal` `vertical`
**Sizes:** `sm` `md` `lg`
**Status:** `completed` `current` `pending` `error`

```tsx
import { Steps } from "saha-ui";

<Steps
  steps={[
    {
      id: 1,
      title: "Account",
      description: "Create your account",
      status: "completed",
    },
    {
      id: 2,
      title: "Profile",
      description: "Fill in your details",
      status: "current",
    },
    {
      id: 3,
      title: "Verification",
      description: "Verify your email",
      status: "pending",
    },
  ]}
  current={1}
  variant="glass"
  size="md"
  orientation="horizontal"
  showNumbers
  showConnector
  clickable
  onStepClick={(index) => console.log("Step clicked:", index)}
/>;

// Vertical with custom icons
import { User, CreditCard, Check } from "lucide-react";

<Steps
  steps={[
    {
      id: 1,
      title: "Personal Info",
      description: "Your details",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Payment",
      description: "Billing info",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Complete",
      description: "All done",
      icon: <Check className="w-5 h-5" />,
    },
  ]}
  orientation="vertical"
  variant="bordered"
/>;
```

**Features:**

- ✅ Horizontal and vertical layouts
- 🎨 4 visual variants with glassmorphism
- 📏 3 size options
- 🔢 Auto-numbered or custom icons
- 📍 Status indicators (completed, current, pending, error)
- 🖱️ Clickable navigation
- 📝 Optional descriptions
- 🔗 Connector lines between steps
- 🎭 Smooth transitions

---

### Table

Data table component with sorting, selection, and responsive design.

**Variants:** `default` `bordered` `striped` `glass` `minimal`
**Sizes:** `sm` `md` `lg`
**Density:** `compact` `normal` `comfortable`

```tsx
import { Table } from "saha-ui";
import { Badge, Avatar } from "saha-ui";

// Define columns
const columns = [
  {
    id: "user",
    header: "User",
    cell: (row: any) => (
      <div className="flex items-center gap-3">
        <Avatar src={row.avatar} alt={row.name} size="sm" />
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      </div>
    ),
    sortable: true,
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
  {
    id: "role",
    header: "Role",
    accessor: "role",
    sortable: true,
  },
  {
    id: "status",
    header: "Status",
    cell: (row: any) => (
      <Badge variant={row.status === "active" ? "success" : "warning"}>
        {row.status}
      </Badge>
    ),
    align: "center",
  },
];

// Sample data
const data = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Developer",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
];

// Basic sortable table
<Table columns={columns} data={data} sortable hoverable />;

// Glass variant with selection
<Table
  columns={columns}
  data={data}
  variant="glass"
  selectable
  selectedRows={[1]}
  onRowSelect={(selected) => console.log("Selected:", selected)}
/>;

// Compact size with striped rows
<Table
  columns={columns}
  data={data}
  variant="striped"
  size="sm"
  density="compact"
/>;

// With sticky header and scroll
<Table
  columns={columns}
  data={data}
  stickyHeader
  maxHeight="400px"
  variant="bordered"
/>;

// With clickable rows
<Table
  columns={columns}
  data={data}
  onRowClick={(row) => console.log("Clicked:", row)}
  hoverable
/>;

// Loading state
<Table columns={columns} data={[]} loading />;

// Empty state
<Table
  columns={columns}
  data={[]}
  emptyMessage={
    <div className="text-center py-8">
      <p>No data available</p>
    </div>
  }
/>;
```

**Features:**

- ✅ Sorting (controlled and uncontrolled)
- ☑️ Row selection with callbacks
- 🎨 5 visual variants with glassmorphism
- 📏 3 size options and 3 density levels
- 🎯 Custom cell renderers
- 📍 Column alignment (left, center, right)
- 📌 Sticky header support
- 📱 Responsive with horizontal scroll
- 🔄 Loading states (inline and overlay)
- 📝 Empty state customization
- 🖱️ Clickable rows
- 🎭 Hoverable and striped row options
- 📊 Footer support
- 🎨 Custom row styling

**Column Options:**

- `id` - Unique column identifier
- `header` - Column header text/component
- `accessor` - Property key or accessor function
- `cell` - Custom cell renderer function
- `width`, `minWidth`, `maxWidth` - Column sizing
- `align` - Text alignment (left, center, right)
- `sortable` - Enable sorting for column
- `sortFn` - Custom sort function
- `footer` - Footer content/function
- `sticky` - Make column sticky
- `className` - Custom classes for header/cell

---

### Rating

Interactive star rating component with multiple icons and variants.

**Variants:** `default` `primary` `secondary` `gradient` `glass` `outline`
**Sizes:** `sm` `md` `lg` `xl`
**Icons:** `star` `heart` `circle` `diamond`
**Precision:** `full` `half`

```tsx
import { Rating } from "saha-ui";

// Basic rating
<Rating value={4} max={5} />;

// With half stars and value display
<Rating value={4.5} precision="half" showValue />;

// Interactive rating
<Rating
  value={0}
  onChange={(value) => console.log("Rating:", value)}
  precision="half"
  size="lg"
/>;

// Read-only with review count
<Rating value={4.7} precision="half" readOnly showValue count={2541} />;

// Different variants
<Rating value={4} variant="gradient" size="lg" />;
<Rating value={4} variant="glass" size="lg" />;

// Different icons
<Rating value={4} icon="heart" variant="primary" size="lg" />;
<Rating value={4} icon="circle" variant="secondary" size="lg" />;

// Custom colors
<Rating value={4} color="#ef4444" size="lg" />;

// Custom maximum
<Rating value={7} max={10} showValue />;

// With tooltips
<Rating
  value={0}
  showTooltip
  tooltipLabels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
  onChange={(value) => console.log(value)}
/>;
```

**Features:**

- ✅ Interactive and read-only modes
- ⭐ Full and half-star precision
- 🎨 6 visual variants with glassmorphism
- 📏 4 size options (sm, md, lg, xl)
- 🎯 Multiple icon types (star, heart, circle, diamond)
- 🎨 Custom colors and icons
- 📊 Review count display
- 🖱️ Hover preview
- ⌨️ Keyboard navigation
- 🎭 Animated transitions
- 🔧 Custom formatting
- 💬 Tooltip support
- ♿ Fully accessible

**Props:**

- `value` - Current rating value (0 to max)
- `max` - Maximum rating value (default: 5)
- `variant` - Visual style variant
- `size` - Icon size
- `icon` - Icon type to display
- `precision` - Full or half stars
- `readOnly` - Disable interaction
- `disabled` - Disabled state
- `showValue` - Display numeric value
- `count` - Review count
- `countLabel` - Label for count (default: "reviews")
- `color` - Custom color for filled icons
- `hoverable` - Enable hover effect
- `showTooltip` - Show tooltips on hover
- `tooltipLabels` - Custom labels for each value
- `onChange` - Callback when rating changes
- `onHover` - Callback when hovering
- `allowClear` - Allow clearing rating
- `animated` - Enable animations

---

### Progress

A flexible progress bar component with multiple variants, sizes, and animations for displaying progress and loading states.

**Basic Usage:**

```tsx
import { Progress } from "saha-ui";

// Basic progress
<Progress value={75} />

// With variant and size
<Progress value={60} variant="primary" size="lg" />

// With label
<Progress value={45} showValue labelPosition="outside" />

// Striped with animation
<Progress value={80} variant="success" striped stripedAnimated />

// Indeterminate loading
<Progress indeterminate variant="gradient" />

// With glow effect
<Progress value={90} variant="gradient" glow />

// Custom colors
<Progress value={60} color="#9333ea" trackColor="#f3e8ff" />
```

**Variants:**

- `default` - Standard gray progress bar
- `primary` - Primary color with gradient
- `secondary` - Secondary color with gradient
- `success` - Green success indicator
- `warning` - Yellow/orange warning
- `error` - Red error indicator
- `gradient` - Multi-color gradient (blue→purple→pink)
- `striped` - Striped pattern effect
- `glass` - Glassmorphism with backdrop blur

**Features:**

- 🎨 **9 Modern Variants** - Each with unique visual design
- 📏 **5 Size Options** - xs, sm, md, lg, xl
- 🎭 **3 Shape Styles** - rounded, pill, square
- 🏷️ **Label Support** - Inside, outside, or top positioned
- 🎬 **Animations** - Pulse, shimmer, striped, indeterminate
- 🌈 **Custom Colors** - Both bar and track colors
- ✨ **Glow Effect** - Enhanced shadow for emphasis
- 📊 **Value Display** - Show percentage or custom labels
- ⏳ **Loading States** - Indeterminate/infinite loading
- 🎯 **Type-Safe** - Full TypeScript support
- ♿ **Accessible** - ARIA progressbar role
- 🎭 **CVA Powered** - Type-safe variant composition

**Props:**

```tsx
interface ProgressProps {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "gradient"
    | "striped"
    | "glass";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "rounded" | "pill" | "square";
  animation?: "none" | "pulse" | "shimmer" | "indeterminate";
  value?: number; // 0-100
  max?: number; // default: 100
  showValue?: boolean;
  label?: string;
  labelPosition?: "inside" | "outside" | "top";
  color?: string;
  trackColor?: string;
  striped?: boolean;
  stripedAnimated?: boolean;
  glow?: boolean;
  indeterminate?: boolean;
  valueFormat?: (value: number, max: number) => string;
  barClassName?: string;
  labelClassName?: string;
  className?: string;
}
```

**Real-World Examples:**

```tsx
// File upload progress
<Progress
  value={uploadProgress}
  variant="primary"
  size="lg"
  striped
  stripedAnimated
  showValue
  labelPosition="top"
  label={`Uploading ${fileName}`}
/>

// Skill level indicator
<div>
  <div className="flex justify-between mb-1">
    <span>React</span>
    <span>90%</span>
  </div>
  <Progress value={90} variant="primary" />
</div>

// System resource usage
<Progress
  value={cpuUsage}
  variant={cpuUsage > 80 ? "error" : "success"}
  size="sm"
  glow={cpuUsage > 80}
/>

// Loading state
<Progress indeterminate variant="gradient" />
```

**Detailed Props:**

- `variant` - Visual style of the progress bar
- `size` - Height of the progress bar
- `shape` - Border radius style
- `animation` - Animation type (pulse, shimmer, indeterminate)
- `value` - Current progress value (0-100)
- `max` - Maximum value (default 100)
- `showValue` - Display percentage/label
- `label` - Custom label text
- `labelPosition` - Where to display label
- `color` - Custom bar color
- `trackColor` - Custom background color
- `striped` - Show striped pattern
- `stripedAnimated` - Animate the stripes
- `glow` - Add glow shadow effect
- `indeterminate` - Loading/infinite state
- `valueFormat` - Custom formatter function

---

### Popover

A versatile popover component for displaying rich interactive content with multiple positioning options, variants, and trigger types.

**Basic Usage:**

```tsx
import { Popover, Button } from "saha-ui";

// Basic popover
<Popover content="This is a simple popover">
  <Button>Click me</Button>
</Popover>

// With title and footer
<Popover
  title="Confirm Action"
  content="Are you sure?"
  footer={
    <div className="flex gap-2">
      <Button size="sm">Cancel</Button>
      <Button size="sm" variant="primary">Confirm</Button>
    </div>
  }
>
  <Button>Delete</Button>
</Popover>

// Glass variant
<Popover variant="glass" position="right" content="Beautiful glassmorphic popover">
  <Button>Click me</Button>
</Popover>
```

**Variants:** `default` `primary` `secondary` `success` `warning` `danger` `info` `glass` `bordered` `elevated` `flat`
**Positions:** 12 options including `top`, `bottom`, `left`, `right` (with -start and -end variations)
**Sizes:** `sm` `md` `lg` `xl`

**Features:**

- 🎨 11 visual variants (7 colors + 4 styles)
- 📐 12 position options
- 🎯 4 trigger types (click, hover, focus, manual)
- 🎭 Arrow indicator
- 📋 Title & footer support
- ✖️ Optional close button
- 🔘 Auto-dismiss (click outside, Escape key)
- 💬 Rich content support
- 🎛️ Controlled mode
- ♿ Fully accessible

---

### PlayButton

An animated play/pause button with smooth transitions, multiple variants, and modern effects. Perfect for media players, video controls, and interactive applications.

**Basic Usage:**

```tsx
import { PlayButton } from "saha-ui";

// Basic play button
<PlayButton />

// With variant and size
<PlayButton variant="primary" size="lg" />

// Controlled state
const [playing, setPlaying] = useState(false);
<PlayButton
  isPlaying={playing}
  onToggle={setPlaying}
/>

// With effects
<PlayButton variant="success" pulse glow />

// In a media player
<div className="flex items-center gap-4">
  <PlayButton
    variant="primary"
    size="md"
    isPlaying={playing}
    onToggle={setPlaying}
  />
  <span>{playing ? "Playing..." : "Paused"}</span>
</div>
```

**Variants:** `default` `primary` `secondary` `accent` `info` `success` `warning` `error` `glass`
**Sizes:** `sm` `md` `lg` `xl`

**Features:**

- 🎨 9 visual variants with theme support
- 📐 4 size options (12px to 24px icons)
- ▶️ Smooth play/pause icon transitions
- 💫 Animated pulsing ring when playing
- ✨ Glow effects on hover
- 🎛️ Controlled or uncontrolled state
- 🎯 Click ripple effect
- 🔘 Rounded, modern design
- ♿ Fully accessible with ARIA labels
- 🎭 Hover scale animations

---

### FloatingActionButton

A modern floating action button (FAB) with beautiful visual effects, multiple positioning options, and extended label support.

**Basic Usage:**

```tsx
import { FloatingActionButton } from "saha-ui";
import { Plus, MessageCircle, Send } from "lucide-react";

// Basic FAB (using children)
<FloatingActionButton
  variant="primary"
  position="bottom-right"
  label="Create New"
>
  <Plus size={24} />
</FloatingActionButton>

// Extended FAB
<FloatingActionButton
  variant="accent"
  label="Send Message"
  extended
>
  <Send size={20} />
</FloatingActionButton>

// Different positions
<FloatingActionButton position="bottom-left" label="Messages">
  <MessageCircle />
</FloatingActionButton>

<FloatingActionButton position="top-right" label="Add">
  <Plus />
</FloatingActionButton>

// Sizes
<FloatingActionButton size="sm">
  <Plus size={16} />
</FloatingActionButton>

<FloatingActionButton size="lg">
  <Plus size={24} />
</FloatingActionButton>

// Custom offset
<FloatingActionButton offset={{ x: 20, y: 20 }} icon={<Plus />} />
```

**Features:**

- 🎨 9 visual variants with gradients
- 📍 4 screen positions + custom offset
- 📐 4 size options
- 🏷️ Label tooltip on hover
- 📝 Extended mode with inline label
- 💫 Scale & rotation animations
- 🌈 Color-matched shadows
- ♿ Fully accessible

---

### Radio

Modern radio buttons with beautiful animations and a powerful RadioGroup component.

**Basic Usage:**

```tsx
import { Radio, RadioGroup } from "saha-ui";

// Basic Radio
<Radio label="Option 1" value="option1" name="choice" />

// Radio with description
<Radio
  label="Pro Plan"
  description="Advanced features for growing businesses"
  value="pro"
  name="plan"
/>

// RadioGroup (Controlled)
const [selected, setSelected] = useState("pro");

<RadioGroup
  name="plan"
  label="Choose Your Plan"
  value={selected}
  onChange={setSelected}
  options={[
    { label: "Free", value: "free", description: "$0/month" },
    { label: "Pro", value: "pro", description: "$29/month" },
    { label: "Enterprise", value: "enterprise", description: "Custom" },
  ]}
/>
```

**Variants:**

```tsx
// Color variants
<Radio variant="primary" label="Primary" />
<Radio variant="secondary" label="Secondary" />
<Radio variant="accent" label="Accent" />
<Radio variant="success" label="Success" />
<Radio variant="warning" label="Warning" />
<Radio variant="error" label="Error" />
```

**Sizes:**

```tsx
<Radio size="sm" label="Small" />
<Radio size="md" label="Medium" />
<Radio size="lg" label="Large" />
```

**RadioGroup with Children:**

```tsx
<RadioGroup name="custom" value={value} onChange={setValue}>
  <Radio label="Option 1" value="1" />
  <Radio label="Option 2" value="2" />
  <Radio label="Option 3" value="3" />
</RadioGroup>
```

**Horizontal Layout:**

```tsx
<RadioGroup
  name="color"
  direction="horizontal"
  value={color}
  onChange={setColor}
  options={[
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Red", value: "red" },
  ]}
/>
```

**With Validation:**

```tsx
<RadioGroup
  name="terms"
  label="Terms and Conditions"
  error="You must accept the terms to continue"
  variant="error"
>
  <Radio label="I accept" value="accept" />
  <Radio label="I decline" value="decline" />
</RadioGroup>
```

**Advanced Features:**

```tsx
// Card Style Radio with Icons & Badges
<RadioGroup name="pricing" card>
  <Radio
    value="free"
    label="Free"
    description="Perfect for getting started"
    icon={<Package />}
    badge="Free"
  />
  <Radio
    value="pro"
    label="Professional"
    description="For growing businesses"
    icon={<Rocket />}
    badge="Popular"
    recommended
  />
  <Radio
    value="enterprise"
    label="Enterprise"
    description="For large organizations"
    icon={<Crown />}
    badge="Custom"
  />
</RadioGroup>

// Standard Radio with Icons
<Radio
  value="cloud"
  label="Cloud Storage"
  description="Store files securely"
  icon={<Cloud />}
  badge="Recommended"
/>

// With Images (Card Mode)
<Radio
  card
  value="plan-a"
  label="Plan A"
  image="/path/to/image.jpg"
/>
```

**Features:**

- 🎨 7 color variants
- 📐 3 size options
- 🎴 Card layout mode
- 🎯 Icon support
- 🏷️ Badge system
- ⭐ Recommended flag
- �️ Image support
- �📝 Label descriptions
- 🔄 Controlled & uncontrolled modes
- 🗂️ RadioGroup component
- 📍 Horizontal & vertical layouts
- 🎭 Hover effects
- ✅ Built-in validation
- 💫 Smooth animations
- 🌈 Color-matched shadows
- ♿ Fully accessible

See [ADVANCED_RADIO_FEATURES.md](./ADVANCED_RADIO_FEATURES.md) for detailed documentation.

---

### Switch

Modern toggle switch with beautiful animations, icons, and loading states.

**Basic Usage:**

```tsx
import { Switch } from "saha-ui";

// Basic Switch
<Switch label="Enable Notifications" />

// With description
<Switch
  label="Dark Mode"
  description="Toggle between light and dark themes"
/>

// Controlled Switch
const [enabled, setEnabled] = useState(false);

<Switch
  label="Auto-save"
  checked={enabled}
  onCheckedChange={setEnabled}
/>
```

**Variants:**

```tsx
// Color variants
<Switch variant="primary" label="Primary" />
<Switch variant="secondary" label="Secondary" />
<Switch variant="accent" label="Accent" />
<Switch variant="success" label="Success" />
<Switch variant="warning" label="Warning" />
<Switch variant="error" label="Error" />
```

**Sizes:**

```tsx
<Switch size="sm" label="Small" />
<Switch size="md" label="Medium" />
<Switch size="lg" label="Large" />
```

**With Icons:**

```tsx
<Switch
  label="Dark Mode"
  onIcon={<Moon className="w-3 h-3" />}
  offIcon={<Sun className="w-3 h-3" />}
/>

<Switch
  label="Wi-Fi"
  onIcon={<Wifi className="w-3 h-3" />}
  offIcon={<X className="w-3 h-3" />}
/>
```

**Loading State:**

```tsx
<Switch label="Processing..." loading />;

// Async toggle
const handleAsyncToggle = async (checked: boolean) => {
  setLoading(true);
  await saveSettings(checked);
  setLoading(false);
};

<Switch
  label="Auto-save"
  checked={autoSave}
  onCheckedChange={handleAsyncToggle}
  loading={loading}
/>;
```

**With Badges:**

```tsx
<Switch label="Beta Features" badge="Beta" />
<Switch label="Premium Mode" badge="Pro" variant="accent" />
```

**Label Position:**

```tsx
<Switch label="Label on Right" labelPosition="right" />
<Switch label="Label on Left" labelPosition="left" />
```

**With Validation:**

```tsx
<Switch
  label="Accept Terms"
  error="You must accept the terms to continue"
  variant="error"
/>

<Switch
  label="Newsletter"
  helperText="You can unsubscribe at any time"
/>
```

**Features:**

- 🎨 7 color variants
- 📐 3 size options
- 🎯 Icon support (on/off states)
- ⏳ Loading state
- 🏷️ Badge system
- 📝 Label descriptions
- 🔄 Controlled & uncontrolled modes
- 📍 Label position (left/right)
- ✅ Built-in validation
- 💫 Smooth animations
- 🌈 Color-matched shadows
- ♿ Fully accessible
- ⌨️ Keyboard navigation

---

### Skeleton

Loading placeholder component with smooth animations and multiple visual styles.

**Basic Usage:**

```tsx
import { Skeleton } from "saha-ui";

// Basic skeleton
<Skeleton width="100%" height="20px" />

// Multiple lines
<Skeleton count={3} />

// Circle skeleton (avatar placeholder)
<Skeleton
  shape="circle"
  width="48px"
  height="48px"
  variant="pulse"
/>
```

**Variants:**

```tsx
// Default pulse animation
<Skeleton variant="default" height="60px" />

// Wave effect
<Skeleton variant="wave" height="60px" />

// Shimmer effect
<Skeleton variant="shimmer" height="60px" />

// Gradient animation
<Skeleton variant="gradient" height="60px" />
```

**Shapes:**

```tsx
// Rectangle (default)
<Skeleton shape="rectangle" width="100%" height="80px" />

// Circle (for avatars)
<Skeleton shape="circle" width="64px" height="64px" />

// Rounded corners
<Skeleton shape="rounded" width="100%" height="80px" />

// Text lines
<Skeleton shape="text" count={4} />
```

**Animation Speed:**

```tsx
<Skeleton speed="slow" variant="shimmer" />
<Skeleton speed="normal" variant="shimmer" />
<Skeleton speed="fast" variant="shimmer" />

// Disable animation
<Skeleton noAnimation />
```

**Real-world Examples:**

```tsx
// Profile card loading
<Card>
  <div className="flex gap-4">
    <Skeleton shape="circle" width="64px" height="64px" />
    <div className="flex-1">
      <Skeleton height="24px" width="60%" className="mb-2" />
      <Skeleton count={2} height="16px" />
    </div>
  </div>
</Card>

// Blog post loading
<Card>
  <Skeleton height="200px" className="mb-4" />
  <Skeleton height="32px" width="80%" className="mb-3" />
  <Skeleton count={4} height="16px" />
</Card>

// List items loading
{[1, 2, 3].map(i => (
  <Card key={i} className="flex gap-4">
    <Skeleton shape="circle" width="48px" height="48px" />
    <div className="flex-1">
      <Skeleton height="18px" width="70%" className="mb-2" />
      <Skeleton height="14px" width="90%" />
    </div>
  </Card>
))}
```

**Variants:** `default` `pulse` `wave` `shimmer` `gradient`
**Shapes:** `rectangle` `circle` `rounded` `text`
**Speeds:** `slow` `normal` `fast`

**Features:**

- 🎨 5 animation variants
- 🔷 4 shape options
- ⚡ 3 speed settings
- 📊 Multiple line support with `count` prop
- 🎯 Fully customizable width/height
- 🎭 Smooth animations with CVA
- 🌓 Theme-aware styling
- 🔧 Custom border radius support
- 📱 Responsive and flexible
- 💫 No animation mode available

---

### Spinner

Modern loading spinner with multiple variants, animations, and fullscreen overlay support.

**Basic Usage:**

```tsx
import { Spinner } from "saha-ui";

// Basic spinner
<Spinner />

// With label
<Spinner variant="primary" label="Loading..." />

// Custom size and variant
<Spinner variant="success" size="lg" label="Processing..." />
```

**Variants:**

```tsx
// 10 beautiful variants
<Spinner variant="default" />
<Spinner variant="primary" />
<Spinner variant="secondary" />
<Spinner variant="accent" />
<Spinner variant="info" />
<Spinner variant="success" />
<Spinner variant="warning" />
<Spinner variant="error" />
<Spinner variant="glass" />
<Spinner variant="gradient" />
```

**Sizes:**

```tsx
<Spinner size="xs" />    // 16px
<Spinner size="sm" />    // 24px
<Spinner size="md" />    // 40px (default)
<Spinner size="lg" />    // 64px
<Spinner size="xl" />    // 96px
<Spinner size="2xl" />   // 128px
```

**Spinner Types (15 unique designs!):**

```tsx
// Classic Types
<Spinner type="ring" />      // Classic circular border (default)
<Spinner type="dots" />      // Rotating dots in circle
<Spinner type="dashed" />    // Dashed ring border
<Spinner type="bars" />      // Rotating bars/lines
<Spinner type="dotRing" />   // Complete circle of dots

// Creative & Unique Types ✨
<Spinner type="orbit" />     // Multi-orbit planetary system
<Spinner type="pulse" />     // Expanding concentric circles
<Spinner type="square" />    // Rotating square corners
<Spinner type="triangle" />  // Triangular rotating pattern
<Spinner type="wave" />      // Sequential bouncing bars
<Spinner type="spiral" />    // Expanding spiral pattern
<Spinner type="infinity" />  // Infinity symbol (∞) path
<Spinner type="flower" />    // Flower petal pattern
<Spinner type="grid" />      // 3×3 pulsing grid
<Spinner type="bounce" />    // Classic bouncing dots
```

**Animation Types:**

```tsx
<Spinner animation="spin" />    // Continuous rotation (default)
<Spinner animation="pulse" />   // Scale pulsing
<Spinner animation="bounce" />  // Bouncing effect
<Spinner animation="ping" />    // Ping ripple effect
```

**Thickness:**

```tsx
<Spinner thickness="thin" />     // 2px border
<Spinner thickness="default" />  // 4px border
<Spinner thickness="thick" />    // 6px border
```

**Speed Control:**

```tsx
<Spinner speed={0.5} />  // Slower
<Spinner speed={1} />    // Normal (default)
<Spinner speed={2} />    // Faster
<Spinner speed={3} />    // Very fast
```

**Fullscreen Overlay:**

```tsx
// Full screen loading overlay
<Spinner
  fullscreen
  variant="gradient"
  size="2xl"
  label="Loading application..."
/>
```

**In Buttons:**

```tsx
// Disabled button with loading spinner
<Button variant="primary" disabled>
  <Spinner size="sm" variant="default" />
  Loading...
</Button>

<Button variant="success" disabled>
  <Spinner size="sm" variant="default" />
  Saving...
</Button>
```

**In Cards:**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Loading Data</CardTitle>
  </CardHeader>
  <CardContent className="flex items-center justify-center py-8">
    <Spinner variant="primary" label="Fetching data..." />
  </CardContent>
</Card>
```

**With Custom Logo/Icon:**

```tsx
// Image URL
<Spinner
  variant="primary"
  size="xl"
  logo="/your-logo.png"
  logoSize="md"
  label="Loading..."
/>

// Custom React component
<Spinner
  variant="success"
  size="xl"
  logo={
    <div className="w-full h-full flex items-center justify-center bg-success/10 rounded-full">
      <span className="text-2xl font-bold text-success">S</span>
    </div>
  }
  logoSize="lg"
/>

// SVG Icon
<Spinner
  variant="gradient"
  size="2xl"
  logo={<YourSvgIcon />}
  logoSize="md"
  label="Building..."
/>
```

**Logo Sizes:**

```tsx
<Spinner logo="/logo.png" logoSize="xs" />   // 25% of spinner size
<Spinner logo="/logo.png" logoSize="sm" />   // 35% of spinner size
<Spinner logo="/logo.png" logoSize="md" />   // 50% of spinner size (default)
<Spinner logo="/logo.png" logoSize="lg" />   // 65% of spinner size
<Spinner logo="/logo.png" logoSize="xl" />   // 80% of spinner size
```

**Real-world Examples:**

```tsx
// Form submission
<Button type="submit" disabled={isSubmitting}>
  {isSubmitting && <Spinner size="sm" variant="default" />}
  {isSubmitting ? "Submitting..." : "Submit"}
</Button>;

// Brand loading with logo
<Spinner
  fullscreen
  variant="gradient"
  size="2xl"
  logo="/brand-logo.png"
  logoSize="lg"
  label="Loading your app..."
/>;

// Page loading
{
  isLoading && (
    <Spinner
      fullscreen
      variant="primary"
      size="xl"
      label="Loading content..."
    />
  );
}

// Inline loading
<div className="flex items-center gap-3">
  <Spinner size="sm" variant="info" />
  <span>Syncing data...</span>
</div>;

// Conditional rendering
{
  isFetching ? (
    <Spinner variant="success" label="Loading items..." />
  ) : (
    <ItemsList items={items} />
  );
}
```

**Variants:** `default` `primary` `secondary` `accent` `info` `success` `warning` `error` `glass` `gradient`
**Sizes:** `xs` `sm` `md` `lg` `xl` `2xl`
**Types:** `ring` `dots` `dashed` `bars` `dotRing` `orbit` `pulse` `square` `triangle` `wave` `spiral` `infinity` `flower` `grid` `bounce`
**Animations:** `spin` `pulse` `bounce` `ping`
**Thickness:** `thin` `default` `thick`
**Logo Sizes:** `xs` `sm` `md` `lg` `xl`

**Features:**

- 🎨 10 stunning variants with shadows and effects
- 🎯 **15 unique spinner types** - from classic to creative designs
- 📏 6 size options from xs (16px) to 2xl (128px)
- 🎭 4 different animation types
- ⚡ Customizable animation speed (0.5x to 3x+)
- 🎯 Optional loading labels
- 🖼️ Fullscreen overlay mode with backdrop
- 🔲 3 thickness options
- 🌈 Gradient variant with multi-color effects
- 💎 Glass variant with backdrop blur
- 🖼️ **Custom logo/icon support** (image URL or React component)
- 📐 5 logo size options for perfect fit
- 🎨 Logo positioned in center with spinner animation around it
- 🌌 **Creative types**: Orbit, Spiral, Infinity, Flower, Wave patterns
- 🔄 All 15 types work with all 10 variants (150 combinations!)
- ⚡ Mathematical precision for perfect centering
- 🎪 **Unique designs**: Grid, Triangle, Pulse, Square, Bounce
- 🌓 Theme-aware styling
- ♿ Accessibility with proper ARIA attributes
- 💫 Smooth CSS animations (GPU-accelerated)
- 📱 Responsive and flexible
- 🎛️ Works great in buttons, cards, and overlays
- 🎨 **900+ possible configurations** (types × variants × sizes)

---

### Pagination

Comprehensive pagination component for navigating through large datasets.

**Basic Usage:**

```tsx
import { Pagination } from "saha-ui";

// Basic pagination
<Pagination
  totalPages={10}
  currentPage={currentPage}
  onPageChange={(page) => setCurrentPage(page)}
/>

// Custom variant and size
<Pagination
  variant="primary"
  size="lg"
  totalPages={20}
  currentPage={5}
  onPageChange={handlePageChange}
/>
```

**Variants:**

```tsx
// Default
<Pagination variant="default" totalPages={10} currentPage={1} />

// Primary
<Pagination variant="primary" totalPages={10} currentPage={3} />

// Secondary
<Pagination variant="secondary" totalPages={10} currentPage={5} />

// Outlined
<Pagination variant="outlined" totalPages={10} currentPage={7} />

// Minimal
<Pagination variant="minimal" totalPages={10} currentPage={2} />
```

**Sizes:**

```tsx
<Pagination size="sm" totalPages={10} currentPage={3} />
<Pagination size="md" totalPages={10} currentPage={5} />
<Pagination size="lg" totalPages={10} currentPage={7} />
```

**Shapes:**

```tsx
<Pagination shape="rounded" totalPages={10} currentPage={3} />
<Pagination shape="square" totalPages={10} currentPage={5} />
<Pagination shape="pill" totalPages={10} currentPage={7} />
```

**Large Page Count (Ellipsis):**

```tsx
// Automatically shows ellipsis for many pages
<Pagination
  variant="primary"
  totalPages={50}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>

// Control sibling count
<Pagination
  totalPages={100}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
  siblingCount={2} // Show 2 pages on each side
/>
```

**Custom Labels:**

```tsx
// Text labels
<Pagination
  totalPages={10}
  currentPage={5}
  previousLabel="← Prev"
  nextLabel="Next →"
  firstLabel="First"
  lastLabel="Last"
/>

// Without first/last buttons
<Pagination
  variant="primary"
  totalPages={10}
  currentPage={5}
  showFirstLast={false}
/>

// Only page numbers
<Pagination
  variant="outlined"
  totalPages={10}
  currentPage={5}
  showFirstLast={false}
  showPrevNext={false}
/>
```

**Real-world Example:**

```tsx
// Data table pagination
function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <p>
        Showing {(currentPage - 1) * itemsPerPage + 1} -
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </p>

      <Pagination
        variant="primary"
        size="sm"
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

**Variants:** `default` `primary` `secondary` `outlined` `minimal`
**Sizes:** `sm` `md` `lg`
**Shapes:** `rounded` `square` `pill`

**Features:**

- 🎨 5 visual variants with theme support
- 📐 3 size options
- 🔷 3 shape styles
- 🔢 Automatic ellipsis for large page counts
- 🎯 Customizable sibling count
- 🏷️ Custom labels for all buttons
- ⚡ Fast page navigation
- ♿ Fully accessible with ARIA labels
- 🎭 Smooth transitions
- 🎛️ Show/hide first/last/prev/next buttons
- 📱 Responsive design
- 🌓 Theme-aware styling
- ⌨️ Keyboard navigation support
- 🚫 Disabled state support

---

### DatePicker

Calendar-based date picker with multiple variants and date restrictions.

**Basic Usage:**

```tsx
import { DatePicker } from "saha-ui";

// Basic date picker
<DatePicker
  value={date}
  onChange={(date) => setDate(date)}
  placeholder="Select date"
/>

// Custom variant and size
<DatePicker
  variant="primary"
  size="lg"
  value={date}
  onChange={setDate}
/>
```

**Variants:**

```tsx
// Default
<DatePicker variant="default" />

// Primary
<DatePicker variant="primary" />

// Secondary
<DatePicker variant="secondary" />

// Outlined
<DatePicker variant="outlined" />

// Minimal
<DatePicker variant="minimal" />
```

**Sizes:**

```tsx
<DatePicker size="sm" />
<DatePicker size="md" />
<DatePicker size="lg" />
```

**Date Restrictions:**

```tsx
// Min date (future dates only)
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}
  placeholder="Select future date"
/>

// Max date (past dates only)
<DatePicker
  value={date}
  onChange={setDate}
  maxDate={new Date()}
  placeholder="Select past date"
/>

// Date range
<DatePicker
  value={date}
  onChange={setDate}
  minDate={startDate}
  maxDate={endDate}
  placeholder="Select date in range"
/>
```

**Customization:**

```tsx
// Custom format
<DatePicker
  value={date}
  onChange={setDate}
  format="DD/MM/YYYY"
  placeholder="DD/MM/YYYY"
/>

// Monday as first day of week
<DatePicker
  value={date}
  onChange={setDate}
  firstDayOfWeek={1}
/>

// Without clear/today buttons
<DatePicker
  value={date}
  onChange={setDate}
  showClear={false}
  showToday={false}
/>

// Disabled state
<DatePicker
  value={date}
  disabled
/>
```

**Real-world Examples:**

```tsx
// Booking form
<div className="grid grid-cols-2 gap-4">
  <DatePicker
    variant="primary"
    minDate={new Date()}
    placeholder="Check-in"
  />
  <DatePicker
    variant="primary"
    minDate={new Date()}
    placeholder="Check-out"
  />
</div>

// Date of birth picker
<DatePicker
  variant="outlined"
  maxDate={new Date()}
  format="MM/DD/YYYY"
  placeholder="Date of birth"
/>

// Task due date
<DatePicker
  variant="primary"
  size="sm"
  minDate={new Date()}
  placeholder="Due date"
/>
```

**Variants:** `default` `primary` `secondary` `outlined` `minimal`
**Sizes:** `sm` `md` `lg`
**Formats:** Customizable (MM/DD/YYYY, DD/MM/YYYY, etc.)

**Features:**

- 🎨 5 visual variants with theme support
- 📐 3 size options
- 📅 Interactive calendar view
- 🔒 Min/max date restrictions
- 🎯 Custom date format display
- 🌍 Configurable first day of week
- ✨ Today quick select button
- 🗑️ Clear button for easy reset
- 📱 Click outside to close
- ⌨️ Keyboard navigation in calendar
- 🎭 Smooth animations
- 🌓 Theme-aware styling
- ♿ Fully accessible
- 🚫 Disabled state support
- 📆 Month/year navigation

---

### Tab

Tab navigation component with comprehensive variant support and flexible content options.

```tsx
import { Tab } from "saha-ui";
import type { TabItem } from "saha-ui";

// Basic usage
const tabs: TabItem[] = [
  { label: "Profile", value: "profile" },
  { label: "Settings", value: "settings" },
  { label: "Notifications", value: "notifications" },
];

<Tab tabs={tabs} value={activeTab} onChange={setActiveTab} />;

// With icons
<Tab
  tabs={[
    { label: "Home", value: "home", icon: <HomeIcon /> },
    { label: "Messages", value: "messages", icon: <MessageIcon /> },
    { label: "Settings", value: "settings", icon: <SettingsIcon /> },
  ]}
  variant="primary"
/>;

// With badges
<Tab
  tabs={[
    { label: "Inbox", value: "inbox", badge: "12" },
    { label: "Unread", value: "unread", badge: "5" },
    { label: "Archive", value: "archive" },
  ]}
  variant="secondary"
/>;

// Full width
<Tab tabs={tabs} variant="outlined" fullWidth />;

// Different sizes
<Tab tabs={tabs} size="sm" />
<Tab tabs={tabs} size="md" />
<Tab tabs={tabs} size="lg" />

// Disabled tabs
<Tab
  tabs={[
    { label: "Active", value: "active" },
    { label: "Disabled", value: "disabled", disabled: true },
  ]}
/>

// All 14 variants
<Tab tabs={tabs} variant="default" />
<Tab tabs={tabs} variant="primary" />
<Tab tabs={tabs} variant="secondary" />
<Tab tabs={tabs} variant="accent" />
<Tab tabs={tabs} variant="success" />
<Tab tabs={tabs} variant="warning" />
<Tab tabs={tabs} variant="danger" />
<Tab tabs={tabs} variant="info" />
<Tab tabs={tabs} variant="glass" />
<Tab tabs={tabs} variant="bordered" />
<Tab tabs={tabs} variant="elevated" />
<Tab tabs={tabs} variant="flat" />
<Tab tabs={tabs} variant="outlined" />
<Tab tabs={tabs} variant="minimal" />

// Style examples
<div className="space-y-4">
  {/* Boxed style */}
  <Tab tabs={tabs} variant="primary" />

  {/* Underlined style */}
  <Tab tabs={tabs} variant="bordered" />

  {/* Pill style */}
  <Tab tabs={tabs} variant="glass" />
</div>
```

**Variants:** `default` `primary` `secondary` `accent` `success` `warning` `danger` `info` `glass` `bordered` `elevated` `flat` `outlined` `minimal`
**Sizes:** `sm` `md` `lg`

**Props:**

| Prop                   | Type         | Default          | Description                        |
| ---------------------- | ------------ | ---------------- | ---------------------------------- |
| `items`                | `TabItem[]`  | Required         | Array of tab items                 |
| `value`                | `string`     | `undefined`      | Controlled active tab value        |
| `defaultValue`         | `string`     | `items[0].value` | Default active tab (uncontrolled)  |
| `onChange`             | `function`   | `undefined`      | Callback when tab changes          |
| `variant`              | `TabVariant` | `'default'`      | Visual variant                     |
| `size`                 | `TabSize`    | `'md'`           | Size variant                       |
| `fullWidth`            | `boolean`    | `false`          | Make tabs full width               |
| `className`            | `string`     | `undefined`      | Custom className for container     |
| `tabClassName`         | `string`     | `undefined`      | Custom className for all tab items |
| `activeTabClassName`   | `string`     | `undefined`      | Custom className for active tab    |
| `disabledTabClassName` | `string`     | `undefined`      | Custom className for disabled tabs |
| `iconClassName`        | `string`     | `undefined`      | Custom className for icon wrapper  |
| `badgeClassName`       | `string`     | `undefined`      | Custom className for badge         |
| `activeBadgeClassName` | `string`     | `undefined`      | Custom className for active badge  |

**TabItem Type:**

```typescript
interface TabItem {
  label: string; // Tab label text
  value: string; // Unique tab identifier
  icon?: ReactNode; // Optional icon element
  disabled?: boolean; // Disable the tab
  badge?: string | number; // Optional badge content
  className?: string; // Custom className for this tab
  iconClassName?: string; // Custom className for this tab's icon
  badgeClassName?: string; // Custom className for this tab's badge
}
```

**Customization Examples:**

```tsx
// Custom container with rounded-full
<Tab items={tabs} className="rounded-full p-2 shadow-xl" />

// Underline style tabs
<Tab
  items={tabs}
  variant="minimal"
  className="gap-4 p-0 bg-transparent border-b-2 border-base-300"
  tabClassName="rounded-none border-b-2 border-transparent pb-3"
  activeTabClassName="!border-primary !text-primary !bg-transparent"
/>

// Per-item custom styling
<Tab
  items={[
    {
      label: "Red Tab",
      value: "red",
      className: "data-[active=true]:bg-red-500 data-[active=true]:text-white"
    },
    // ... more tabs
  ]}
/>

// Custom gradient badges
<Tab
  items={[{ label: "Inbox", value: "inbox", badge: 12 }]}
  badgeClassName="bg-gradient-to-r from-pink-500 to-purple-500"
  activeBadgeClassName="!bg-gradient-to-r !from-yellow-400 !to-orange-500"
/>

// Vertical tabs (mobile)
<Tab
  items={tabs}
  className="flex-col sm:flex-row"
  tabClassName="w-full sm:w-auto justify-start"
/>

// Pill style
<Tab
  items={tabs}
  className="gap-3 p-0 bg-transparent"
  tabClassName="rounded-full px-6 py-3 shadow-md"
  activeTabClassName="scale-105 shadow-lg"
/>
```

**Features:**

- 🎨 14 visual variants matching design system
- 📐 3 size options (sm, md, lg)
- 🎯 Controlled and uncontrolled modes
- 🖼️ Icon support in tabs
- 🔔 Badge indicators for notifications
- 🚫 Disabled tab states
- 📱 Full width responsive layout
- ⌨️ Keyboard navigation (arrow keys)
- 🎭 Smooth transitions
- 🌓 Theme-aware styling
- ♿ ARIA-compliant accessibility
- 🎪 Active state indicators
- ✨ Hover effects
- 🔄 Flexible content with icons/badges
- 🎨 **Fully customizable with Tailwind classes**
- 💅 **Per-item styling support**
- 🔧 **No SCSS required - pure Tailwind**

---

### Input

Flexible and customizable input field component with comprehensive variant support and validation states.

```tsx
import { Input } from "saha-ui";
import { Mail, Lock, Search, User } from "lucide-react";

// Basic input
<Input placeholder="Enter text..." />

// With label and helper text
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>

// Different variants
<Input variant="primary" placeholder="Primary input" />
<Input variant="secondary" placeholder="Secondary input" />
<Input variant="accent" placeholder="Accent input" />
<Input variant="success" placeholder="Success input" />
<Input variant="warning" placeholder="Warning input" />
<Input variant="error" placeholder="Error input" />
<Input variant="outline" placeholder="Outline input (default)" />
<Input variant="ghost" placeholder="Ghost input" />
<Input variant="glass" placeholder="Glass morphism input" />

// With icons
<Input
  label="Search"
  startIcon={<Search size={18} />}
  placeholder="Search..."
/>

<Input
  label="Email"
  type="email"
  startIcon={<Mail size={18} />}
  placeholder="you@example.com"
/>

// With validation
<Input
  label="Password"
  type="password"
  variant="error"
  error="Password must be at least 8 characters"
  startIcon={<Lock size={18} />}
/>

<Input
  label="Username"
  variant="success"
  defaultValue="johndoe"
  helperText="Username is available!"
  startIcon={<User size={18} />}
/>

// Character counter
<Input
  label="Bio"
  placeholder="Tell us about yourself..."
  maxLength={100}
  showCounter
  helperText="Maximum 100 characters"
/>

// Different sizes
<Input size="sm" placeholder="Small input" />
<Input size="md" placeholder="Medium input (default)" />
<Input size="lg" placeholder="Large input" />
<Input size="xl" placeholder="Extra large input" />

// Full width
<Input
  fullWidth
  label="Full Name"
  placeholder="Enter your full name"
/>

// All input types (except file)
<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password input" />
<Input type="number" placeholder="Number input" />
<Input type="tel" placeholder="Phone input" />
<Input type="url" placeholder="URL input" />
<Input type="search" placeholder="Search input" />
<Input type="date" />
<Input type="time" />
<Input type="color" />

// Required field
<Input
  label="Username"
  placeholder="Enter username"
  required
/>

// Disabled
<Input
  label="Disabled Input"
  placeholder="Cannot edit"
  disabled
/>

// Login form example
<div className="space-y-4">
  <Input
    fullWidth
    label="Email"
    type="email"
    variant="glass"
    startIcon={<Mail size={18} />}
    placeholder="you@example.com"
    required
  />
  <Input
    fullWidth
    label="Password"
    type="password"
    variant="glass"
    startIcon={<Lock size={18} />}
    placeholder="Enter your password"
    required
  />
</div>
```

**Variants:** `primary` `secondary` `accent` `info` `success` `warning` `error` `outline` `ghost` `glass`
**Sizes:** `sm` `md` `lg` `xl`
**Input Types:** All HTML input types except `file`

**Props:**

| Prop                 | Type                  | Default     | Description                              |
| -------------------- | --------------------- | ----------- | ---------------------------------------- |
| `variant`            | `InputVariant`        | `'outline'` | Visual variant                           |
| `size`               | `InputSize`           | `'md'`      | Size variant                             |
| `type`               | `InputType`           | `'text'`    | HTML input type (excludes file)          |
| `label`              | `string`              | `undefined` | Label text for the input                 |
| `helperText`         | `string`              | `undefined` | Helper text below input                  |
| `error`              | `string`              | `undefined` | Error message (overrides helperText)     |
| `startIcon`          | `ReactNode`           | `undefined` | Icon on the left side                    |
| `endIcon`            | `ReactNode`           | `undefined` | Icon on the right side                   |
| `showCounter`        | `boolean`             | `false`     | Show character counter (needs maxLength) |
| `required`           | `boolean`             | `false`     | Mark field as required                   |
| `fullWidth`          | `boolean`             | `false`     | Full width styling                       |
| `containerClassName` | `string`              | `undefined` | Custom className for container           |
| `labelClassName`     | `string`              | `undefined` | Custom className for label               |
| `disabled`           | `boolean`             | `false`     | Disable the input                        |
| `maxLength`          | `number`              | `undefined` | Maximum character length                 |
| `...props`           | `InputHTMLAttributes` | -           | All standard input attributes            |

**Features:**

- 🎨 10 visual variants matching design system
- 📐 4 size options (sm, md, lg, xl)
- 🔤 Supports all HTML input types except file
- 🖼️ Icon support (start and end positions)
- ✅ Built-in validation states
- 📝 Character counter with maxLength
- 💬 Helper text and error messaging
- ⚠️ Required field indicators
- 📱 Full width responsive option
- ⌨️ Standard input attributes support
- 🎭 Smooth transitions and focus states
- 🌓 Theme-aware styling
- ♿ Accessible with proper labels
- 🔒 Type-safe with TypeScript
- 🎪 Hover and focus effects
- 🔧 **No SCSS required - pure Tailwind**

---

## 🎨 Theming

### Theme Provider

```tsx
import { ThemeProvider, useTheme } from "saha-ui";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourApp />
    </ThemeProvider>
  );
}

// Use theme in components
function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle theme
    </button>
  );
}
```

### Theme Toggle

```tsx
import { ThemeToggle } from "saha-ui";

<ThemeToggle />;
```

---

## 🎯 Type Safety

All components are fully typed with comprehensive prop types and JSDoc documentation.

### Type Imports

**From main entry:**

```typescript
import type {
  ButtonVariant,
  ButtonSize,
  AlertStatus,
  CardVariant,
  AvatarSize,
  AvatarStatus,
  TooltipPosition,
  // ... and 90+ more types
} from "saha-ui";

// Type-safe component usage
const variant: ButtonVariant = "primary"; // ✅ Valid
const invalid: ButtonVariant = "invalid"; // ❌ TypeScript error
```

**From individual components:**

```typescript
import type { ButtonProps } from "saha-ui/components/Button/Button.types";
import type { CardProps } from "saha-ui/components/Card/Card.types";
import type { AvatarProps } from "saha-ui/components/Avatar/Avatar.types";

// Full type safety with direct imports
const buttonProps: ButtonProps = {
  variant: "primary",
  size: "lg",
  children: "Click me",
};
```

**Benefits:**

- ✅ Compile-time error checking
- 📝 IntelliSense autocomplete
- 📚 JSDoc hover documentation
- 🔍 Jump to definition support
- 🎯 Full type inference

---

## 📦 Package Structure

Saha UI uses a **modular architecture** for optimal tree-shaking and flexibility:

```
saha-ui/
├── dist/
│   ├── components/
│   │   ├── Accordion/
│   │   │   ├── index.js
│   │   │   ├── index.d.ts
│   │   │   ├── AccordionItem.js
│   │   │   └── Accordion.types.d.ts
│   │   ├── Alert/
│   │   ├── Avatar/
│   │   ├── Button/
│   │   ├── Card/
│   │   └── ... (11 components)
│   ├── lib/
│   │   └── utils.js
│   ├── assets/
│   │   └── components/
│   │       └── Accordion/
│   │           └── index.css
│   └── index.js (main entry)
```

### Import Strategies

**1. Main Entry (Convenience)**

```tsx
import { Button, Card, Alert } from "saha-ui";
```

- ✅ Simple and clean
- ✅ Good for small apps
- ⚠️ Imports all components (rely on bundler tree-shaking)

**2. Direct Imports (Recommended for Production)**

```tsx
import { Button } from "saha-ui/components/Button";
import { Card } from "saha-ui/components/Card";
```

- ✅ Maximum tree-shaking
- ✅ Smaller bundle size
- ✅ Explicit dependencies
- ✅ Better for large apps

**3. Utility Imports**

```tsx
import { cn } from "saha-ui/lib/utils";
```

- ✅ Import utilities separately
- ✅ Minimal bundle impact

---

## 🎨 Customization

### Using with Tailwind CSS

All components support the `className` prop for easy customization:

```tsx
<Button variant="primary" className="w-full rounded-full shadow-2xl">
  Custom Button
</Button>

<Card className="max-w-md mx-auto">Custom Card</Card>
```

### Using the cn() Utility

The `cn()` utility combines `clsx` and `tailwind-merge` for optimal className handling:

```tsx
import { cn } from "saha-ui/lib/utils";

<div
  className={cn(
    "base-classes",
    condition && "conditional-classes",
    "more-classes"
  )}
/>;

// Tailwind classes are intelligently merged
<Button
  className={cn(
    "bg-blue-500", // This will be overridden
    "bg-red-500" // This wins
  )}
/>;
```

---

## 📊 Bundle Size

Saha UI is optimized for minimal bundle impact:

| Import Strategy   | Approximate Size |
| ----------------- | ---------------- |
| Single component  | ~4-8 KB          |
| 3 components      | ~12-20 KB        |
| All components    | ~30-40 KB        |
| With dependencies | +20 KB (CVA)     |

**Dependencies:**

- `class-variance-authority` (~1 KB)
- `clsx` (~0.5 KB)
- `tailwind-merge` (~12 KB)
- `lucide-react` (optional, tree-shakeable)

---

## 📖 Documentation

- [Installation Guide](./INSTALLATION.md) - Setup and framework integration
- [Publishing Guide](./PUBLISHING.md) - For contributors
- [NPM Package Summary](./NPM_PACKAGE_SUMMARY.md) - Package details
- [Type Safety Guide](./TYPE_SAFETY_GUIDE.md) - TypeScript best practices
- [Component Modernization](./ULTRA_MODERN_SUMMARY.md) - Architecture details
- **[🤖 MCP Server](./docs/MCP_SERVER.md)** - AI Assistant Integration (Built-in!)

---

## 🤖 MCP Server - AI-Powered Development (v2.0 - Dynamic & Context-Aware)

Saha UI includes a **built-in Model Context Protocol (MCP) server** that provides AI assistants with intelligent, human-like access to the component library.

### 🧠 Intelligence Features

- 🎯 **Context Awareness**: Remembers your session and adapts responses based on what you've viewed
- 💡 **Intent Detection**: Automatically understands if you need tutorials, examples, styling help, or troubleshooting
- 🔍 **Fuzzy Matching**: Handles typos gracefully - "Buton" → Button, "inpt" → Input
- 🤝 **Smart Suggestions**: Proactive recommendations for related components, hooks, and next steps
- 📊 **Progressive Disclosure**: Shows summaries first, details on request - no information overload
- 🗣️ **Natural Language**: Ask questions naturally - "How do I customize colors?" works perfectly

### Core Features

- 📦 **73 Components**: Complete source code, types, variants, and styles
- 🪝 **40+ Hooks**: Full implementation with usage examples and best practices
- 🎨 **Theme System**: OKLCH colors, Tailwind config, CSS variables
- 🔎 **Smart Search**: Context-aware code search with intelligent filtering
- 💬 **Conversational**: Ask questions naturally, get personalized answers
- ⚡ **Recommendations**: Get component suggestions based on your project type

### Quick Setup

The MCP server is included with Saha UI - no separate installation needed!

```bash
# Install Saha UI
# npm
npm install saha-ui
npx saha-ui@latest init

# yarn
yarn add saha-ui
yarn dlx saha-ui@latest init

# pnpm
pnpm add saha-ui
pnpm dlx saha-ui@latest init

# Configure your AI client (e.g., Claude Desktop)
# Add to claude_desktop_config.json:
```

```json
{
  "mcpServers": {
    "saha-ui": {
      "command": "npx",
      "args": ["saha-ui-mcp"]
    }
  }
}
```

That's it! The MCP server runs directly from your `node_modules`.

### Example Interactions

The MCP server understands natural language and adapts to your needs:

**Beginner-Friendly:**

> "How do I get started with Saha UI?"
>
> "Show me simple form components"
>
> "What's the easiest way to add a button?"

**Discovery & Exploration:**

> "What components work well for a dashboard?"
>
> "Show me components similar to Card"
>
> "Find components with glass morphism"

**Advanced Usage:**

> "Customize Button theme colors using OKLCH"
>
> "Integrate DataTable with Next.js 15 App Router"
>
> "Search for all components using CVA variants"

**The server handles typos too:** "Show me the Botton component" → Automatically suggests Button ✓

### Smart Features in Action

```typescript
// Fuzzy matching - typos are okay!
"Buton" → Button ✓
"inpt" → Input ✓
"useDebonc" → useDebounce ✓

// Context awareness - remembers what you've viewed
// Viewing Input → Suggests useDebounce hook
// Viewing Card → Suggests related components

// Intent detection - understands what you need
"How to style..." → Styling mode (variants, theme)
"Show example..." → Example mode (code samples)
"Fix error..." → Troubleshooting mode (solutions)
```

📚 **Documentation:**

- **[Full MCP Server Guide](./docs/MCP_SERVER.md)** - Complete documentation
- **[Dynamic Features](./docs/MCP_DYNAMIC_FEATURES.md)** - Smart features quick reference
- **[Quick Reference](./docs/MCP_QUICK_REFERENCE.md)** - Tool & command reference

---

## 💡 Usage Examples

### Example 1: Dashboard Card with Status Badge (Main Entry)

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Avatar,
  Button,
  Badge,
} from "saha-ui";
import type { CardVariant } from "saha-ui";

function DashboardCard() {
  const variant: CardVariant = "glass";

  return (
    <Card variant={variant} padding="lg" rounded="xl" hoverable>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar src="/user.jpg" size="lg" status="online" />
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>Welcome Back!</CardTitle>
              <Badge variant="success" dot pulse>
                Active
              </Badge>
            </div>
            <Badge variant="primary" size="sm">
              Premium
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="primary" size="md">
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Example 2: Alert System (Direct Imports)

```tsx
import { Alert } from "saha-ui/components/Alert";
import type { AlertStatus } from "saha-ui/components/Alert/Alert.types";

function NotificationSystem() {
  const [status, setStatus] = React.useState<AlertStatus>("info");

  return (
    <Alert
      variant="left-accent"
      status={status}
      title="System Update"
      message="Your application has been updated successfully."
      closeable
      rounded
    />
  );
}
```

### Example 3: Custom Form (Utilities)

```tsx
import { Button } from "saha-ui/components/Button";
import { cn } from "saha-ui/lib/utils";

function CustomForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <form className={cn("space-y-4", isSubmitting && "opacity-50")}>
      <input className={cn("input", "w-full")} />
      <Button
        variant="primary"
        className={cn("w-full", isSubmitting && "cursor-not-allowed")}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
```

### Example 4: Theme-Aware Component

```tsx
import { ThemeProvider, useTheme, ThemeToggle } from "saha-ui";
import { Card } from "saha-ui/components/Card";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ThemedCard />
    </ThemeProvider>
  );
}

function ThemedCard() {
  const { theme } = useTheme();

  return (
    <Card variant="glass">
      <p>Current theme: {theme}</p>
      <ThemeToggle />
    </Card>
  );
}
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for automated changelog generation:

```bash
feat(button): add shimmer effect
fix(tooltip): correct positioning issue
docs(readme): update installation steps
```

---

## 📄 License

MIT © [Saha UI](https://github.com/Xenial-Devil/Saha-ui)

---

## 🌟 Acknowledgments

Built with ❤️ using:

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [class-variance-authority](https://cva.style/)
- [Lucide Icons](https://lucide.dev/)
- [clsx](https://github.com/lukeed/clsx)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)

---

<div align="center">
  <p>If you find this library useful, please consider giving it a ⭐️</p>
  <p>
    <a href="https://github.com/Xenial-Devil/Saha-ui">GitHub</a> •
    <a href="https://www.npmjs.com/package/saha-ui">npm</a> •
    <a href="https://github.com/Xenial-Devil/Saha-ui/issues">Issues</a>
  </p>
</div>
