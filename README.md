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
    <strong>TypeScript</strong> • <strong>Tailwind CSS v4</strong> • <strong>OKLCH Colors</strong> • <strong>Glass Morphism</strong>
  </p>

  <p>
    <a href="#-installation">Installation</a> •
    <a href="#-features">Features</a> •
    <a href="#-components">Components</a> •
    <a href="#-quick-examples">Quick Examples</a> •
    <a href="#-documentation">Documentation</a>
  </p>
</div>

---

## ✨ Features

- 🎨 **17 Modern Components** - Button, ButtonGroup, Alert, Badge, Breadcrumb, Card, Chip, Divider, Accordion, Avatar, AvatarGroup, Tooltip, Link, List, Timeline, Image, Carousel
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

---

## 📦 Installation

```bash
# npm
npm install saha-ui

# yarn
yarn add saha-ui

# pnpm
pnpm add saha-ui
```

### Peer Dependencies

Saha UI requires React 18+ or React 19+:

### Optional Dependencies

For icons (if using Link or ThemeToggle components):

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

## 🎨 Components

### Overview

| Component       | Description                                                        | Status | CVA |
| --------------- | ------------------------------------------------------------------ | ------ | --- |
| **Button**      | Action buttons with 9 variants and 4 sizes                         | ✅     | ✅  |
| **ButtonGroup** | Grouped buttons with horizontal/vertical layouts                   | ✅     | ✅  |
| **Alert**       | Notification messages with 5 variants × 4 statuses                 | ✅     | ✅  |
| **Badge**       | Status indicators and labels with 9 variants                       | ✅     | ✅  |
| **Breadcrumb**  | Navigation trail with 5 variants, 4 separators, and collapsing     | ✅     | ✅  |
| **Card**        | Container with 5 variants and sub-components                       | ✅     | ✅  |
| **Chip**        | Interactive tags with 5 variants, deletable, and avatars           | ✅     | ✅  |
| **Divider**     | Content separator with 5 variants and label support                | ✅     | ✅  |
| **Accordion**   | Collapsible content with 5 behavior modes                          | ✅     | ✅  |
| **Avatar**      | User profile images with status indicators                         | ✅     | ✅  |
| **AvatarGroup** | Grouped avatars with overlap and count                             | ✅     | ✅  |
| **Tooltip**     | Contextual hints with 9 variants, 4 triggers, and interactive mode | ✅     | ✅  |
| **Link**        | Smart links with 9 variants and icon support                       | ✅     | ✅  |
| **List**        | Modern lists with 5 variants and icon support                      | ✅     | ✅  |
| **Timeline**    | Chronological events with 4 variants, positions, and statuses      | ✅     | ✅  |
| **Image**       | Advanced image with lazy loading                                   | ✅     | ✅  |
| **Carousel**    | Image slider with 4 transition effects                             | ✅     | ✅  |

---

## ⚡ Quick Examples

Here are simple examples for all 16 components to get you started quickly:

### Button

```tsx
import { Button } from "saha-ui";

<Button variant="primary">Click Me</Button>
<Button variant="ghost" size="sm">Small Ghost</Button>
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

<Alert status="success">Operation completed successfully!</Alert>
<Alert status="error" variant="filled" dismissible>
  Error occurred!
</Alert>
```

### Badge

```tsx
import { Badge } from "saha-ui";

<Badge variant="primary">New</Badge>
<Badge variant="success" dot pulse>Online</Badge>
<Badge removable onRemove={() => console.log('removed')}>Tag</Badge>
```

### Breadcrumb

```tsx
import { Breadcrumb } from "saha-ui";

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Details', href: '/products/123' }
];

<Breadcrumb items={items} />
<Breadcrumb items={items} variant="pills" separator="arrow" />
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "saha-ui";

<Card variant="glass" hoverable>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Your content here</CardContent>
</Card>;
```

### Chip

```tsx
import { Chip } from "saha-ui";

<Chip color="primary">JavaScript</Chip>
<Chip deletable onDelete={() => console.log('deleted')}>
  Remove me
</Chip>
<Chip clickable onClick={() => alert('clicked')}>
  Click me
</Chip>
```

### Divider

```tsx
import { Divider } from "saha-ui";

<Divider />
<Divider label="OR" />
<Divider variant="gradient" thickness="medium" />
<Divider orientation="vertical" className="h-24" />
```

### Accordion

```tsx
import { Accordion } from "saha-ui";

const items = [
  {
    title: 'Section 1',
    content: 'Content for section 1'
  },
  {
    title: 'Section 2',
    content: 'Content for section 2'
  }
];

<Accordion items={items} />
<Accordion items={items} variant="bordered" defaultOpen={[0]} />
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
import { Tooltip } from "saha-ui";

// Basic tooltip
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// With variant and position
<Tooltip content="Success message!" variant="success" position="right">
  <Badge variant="success">Active</Badge>
</Tooltip>

// Interactive tooltip with click trigger
<Tooltip
  content={<div>Click <a href="#">here</a> for more</div>}
  interactive={true}
  trigger="click"
  variant="glass"
>
  <Button>Click Me</Button>
</Tooltip>
```

### Link

```tsx
import { Link } from "saha-ui";

<Link href="/about">About Us</Link>
<Link href="https://example.com" variant="primary" external>
  External Link
</Link>
<Link href="/contact" showIcon>Contact</Link>
```

### List

```tsx
import { List } from "saha-ui";

const items = [
  { id: 1, content: 'First item' },
  { id: 2, content: 'Second item' },
  { id: 3, content: 'Third item' }
];

<List items={items} />
<List items={items} variant="bordered" />
```

### Timeline

```tsx
import { Timeline } from "saha-ui";
import { Rocket, Package, Check } from "lucide-react";

const events = [
  { id: 1, title: 'Project Started', description: 'Initial setup', time: '2 hours ago', icon: Rocket },
  { id: 2, title: 'Development', description: 'Building features', time: '1 hour ago', icon: Package, status: 'primary' as const },
  { id: 3, title: 'Completed', description: 'Ready to deploy', time: 'Just now', icon: Check, status: 'success' as const }
];

<Timeline items={events} />
<Timeline items={events} variant="gradient" position="alternate" />
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
import { Carousel } from "saha-ui";

const images = [
  { src: '/image1.jpg', alt: 'Image 1' },
  { src: '/image2.jpg', alt: 'Image 2' },
  { src: '/image3.jpg', alt: 'Image 3' }
];

<Carousel images={images} />
<Carousel images={images} effect="fade" autoplay />
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
// In modal footer
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

### Divider

Content separator component with 5 modern variants, optional labels, and decorative elements.

**Variants:** `solid` `dashed` `dotted` `gradient` `glass`  
**Orientation:** `horizontal` `vertical`  
**Thickness:** `thin` `medium` `thick`  
**Spacing:** `none` `xs` `sm` `md` `lg` `xl`

```tsx
import { Divider } from "saha-ui";

// Basic divider
<Divider />

// With label
<Divider label="OR" />

// Gradient variant
<Divider variant="gradient" thickness="medium" />

// Vertical divider
<div className="flex items-center h-24">
  <div>Section 1</div>
  <Divider orientation="vertical" className="h-full" />
  <div>Section 2</div>
</div>

// Decorative with label
<Divider label="Continue Reading" decorative />

// Custom positioning
<Divider label="Section Start" labelPosition="left" variant="dashed" />

// Different thickness
<Divider thickness="thick" variant="solid" />

// Custom spacing
<Divider spacing="xl" variant="gradient" />
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
interface DividerProps {
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

    <Divider label="OR" variant="gradient" spacing="sm" />

    <Button variant="outline" className="w-full">
      Continue with GitHub
    </Button>
  </CardContent>
</Card>

// Content sections with labels
<article>
  <p>Introduction paragraph...</p>

  <Divider
    label="Section 1"
    labelPosition="left"
    variant="dashed"
    spacing="lg"
  />

  <p>Main content...</p>

  <Divider
    label="Conclusion"
    labelPosition="left"
    variant="dashed"
    spacing="lg"
  />

  <p>Summary...</p>

  <Divider decorative spacing="lg" variant="gradient" />
</article>

// Vertical layout sections
<div className="flex h-64">
  <div className="flex-1">Left Panel</div>
  <Divider
    orientation="vertical"
    variant="gradient"
    className="h-full"
  />
  <div className="flex-1">Right Panel</div>
</div>

// Dashboard sections
<div className="flex gap-4 h-48">
  <Card className="flex-1">Stats 1</Card>
  <Divider orientation="vertical" variant="glass" className="h-full" />
  <Card className="flex-1">Stats 2</Card>
  <Divider orientation="vertical" variant="glass" className="h-full" />
  <Card className="flex-1">Stats 3</Card>
</div>
```

**CVA Integration:**

```tsx
import {
  dividerVariants,
  dividerLineVariants,
  dividerLabelVariants,
} from "saha-ui";

// Use exported variants for custom styling
const customContainerClass = dividerVariants({
  orientation: "horizontal",
  spacing: "lg",
});

const customLineClass = dividerLineVariants({
  variant: "gradient",
  orientation: "horizontal",
  thickness: "medium",
});

const customLabelClass = dividerLabelVariants({
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
import { AvatarGroup } from "saha-ui";

<AvatarGroup
  avatars={[
    { src: "/user1.jpg", alt: "User 1" },
    { src: "/user2.jpg", alt: "User 2" },
    { src: "/user3.jpg", alt: "User 3" },
    { src: "/user4.jpg", alt: "User 4" },
  ]}
  max={3}
  size="md"
  variant="stack"
  gap={false}
  withRing={false}
  showCount
/>;
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
import { Tooltip } from "saha-ui";

// Basic tooltip
<Tooltip
  content="This is helpful information"
  position="top"
  variant="glass"
>
  <Button>Hover me</Button>
</Tooltip>

// Status tooltips
<Tooltip content="All systems operational" variant="success">
  <Badge variant="success">Active</Badge>
</Tooltip>

<Tooltip content="Warning: Check this!" variant="warning" position="right">
  <span className="cursor-help">⚠</span>
</Tooltip>

// Interactive tooltip with click trigger
<Tooltip
  content={
    <div className="space-y-2">
      <p className="font-semibold">Interactive Content</p>
      <Button size="sm">Click Me</Button>
    </div>
  }
  interactive={true}
  trigger="click"
  variant="glass"
  maxWidth="200px"
>
  <Button>Click for Options</Button>
</Tooltip>

// Controlled tooltip
const [open, setOpen] = useState(false);
<Tooltip
  content="Controlled tooltip"
  open={open}
  onOpenChange={setOpen}
  trigger="manual"
>
  <Button onClick={() => setOpen(!open)}>Toggle</Button>
</Tooltip>

// Help icon tooltips
<div className="flex items-center gap-2">
  <span>Username</span>
  <Tooltip
    content="Enter your unique username (3-20 characters)"
    variant="info"
    size="sm"
  >
    <span className="cursor-help text-muted-foreground">ⓘ</span>
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
- **divided** - Items separated by divider lines, subtle hover effects
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
