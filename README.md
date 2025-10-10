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
    <a href="#-usage">Usage</a> •
    <a href="#-documentation">Documentation</a>
  </p>
</div>

---

## ✨ Features

- 🎨 **13 Modern Components** - Button, ButtonGroup, Alert, Badge, Card, Accordion, Avatar, AvatarGroup, Tooltip, Link, List, Image, Carousel
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

````

---

## 🎨 Components

### Overview

| Component       | Description                                        | Status | CVA |
| --------------- | -------------------------------------------------- | ------ | --- |
| **Button**      | Action buttons with 8 variants and 4 sizes         | ✅     | ✅  |
| **ButtonGroup** | Grouped buttons with horizontal/vertical layouts   | ✅     | ✅  |
| **Alert**       | Notification messages with 5 variants × 4 statuses | ✅     | ✅  |
| **Badge**       | Status indicators and labels with 9 variants       | ✅     | ✅  |
| **Card**        | Container with 5 variants and sub-components       | ✅     | ✅  |
| **Accordion**   | Collapsible content with 5 behavior modes          | ✅     | ✅  |
| **Avatar**      | User profile images with status indicators         | ✅     | ✅  |
| **AvatarGroup** | Grouped avatars with overlap and count             | ✅     | ✅  |
| **Tooltip**     | Contextual hints with 5 variants                   | ✅     | ✅  |
| **Link**        | Smart links with 9 variants and icon support       | ✅     | ✅  |
| **List**        | Versatile lists with 10 types                      | ✅     | ✅  |
| **Image**       | Advanced image with lazy loading                   | ✅     | ✅  |
| **Carousel**    | Image slider with 4 transition effects             | ✅     | ✅  |

---

## 📚 Component Documentation

### Button

Action buttons with modern effects and 8 visual variants.

**Variants:** `primary` `secondary` `accent` `success` `warning` `error` `ghost` `glass`
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
````

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
</Card>;
```

**Features:**

- 🔮 Glass morphism effects
- ✨ Hover scale and shadow effects
- 🎨 Gradient overlays
- 📦 Composable sub-components

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

Contextual hints with smart positioning and delays.

**Variants:** `default` `dark` `light` `glass` `primary`  
**Positions:** `top` `bottom` `left` `right`  
**Sizes:** `sm` `md` `lg`

```tsx
import { Tooltip } from "saha-ui";

<Tooltip
  content="This is helpful information"
  position="top"
  variant="glass"
  size="md"
  delay={200}
  arrow
>
  <Button>Hover me</Button>
</Tooltip>;
```

**Features:**

- ⏱️ Configurable delay (default 200ms)
- ➡️ Optional arrow pointer
- 🎨 5 beautiful variants
- 🔮 Glass morphism support

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

Versatile lists with icons and multiple visual styles.

**Types:** `disc` `circle` `square` `decimal` `decimal-leading-zero` `lower-roman` `upper-roman` `lower-alpha` `upper-alpha` `none`  
**Variants:** `default` `bordered` `divided` `striped` `cards`  
**Sizes:** `sm` `md` `lg`

```tsx
import { List, ListItem } from 'saha-ui';
import { CheckCircle } from 'lucide-react';

<List variant="bordered" size="md" listType="disc">
  <ListItem icon={<CheckCircle />}>
    Item with custom icon
  </ListItem>
  <ListItem>Regular item</ListItem>
  <ListItem>Another item</ListItem>
</List>

// Ordered list
<List variant="cards" ordered listType="decimal">
  <ListItem>Step 1</ListItem>
  <ListItem>Step 2</ListItem>
</List>
```

**Features:**

- 🔢 Ordered and unordered support
- 🎨 5 visual variants
- ✨ Icon support per item
- 💫 Hover effects

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
