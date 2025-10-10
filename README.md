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

- 🎨 **11 Modern Components** - Button, Alert, Card, Accordion, Avatar, AvatarGroup, Tooltip, Link, List, Image, Carousel
- 🌓 **Dark Mode** - Seamless theme switching with full dark mode support
- 🔮 **Glass Morphism** - Beautiful backdrop blur effects across components
- 🎯 **Type-Safe** - Full TypeScript support with comprehensive prop types
- ♿ **Accessible** - ARIA-compliant with keyboard navigation
- 🎭 **CVA Variants** - Type-safe variant management with class-variance-authority
- 🎨 **OKLCH Colors** - Perceptually uniform color system for accurate theming
- ⚡ **Performance** - Tree-shakeable, optimized bundle size
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

```bash
npm install react react-dom tailwindcss
```

---

## 🚀 Quick Start

### 1. Wrap your app with ThemeProvider

```tsx
import { ThemeProvider } from "saha-ui";

function App() {
  return <ThemeProvider>{/* Your app content */}</ThemeProvider>;
}
```

### 2. Import and use components

```tsx
import { Button, Card, Avatar } from "saha-ui";

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

---

## 🎨 Components

### Overview

| Component       | Description                                        | Status | CVA |
| --------------- | -------------------------------------------------- | ------ | --- |
| **Button**      | Action buttons with 8 variants and 4 sizes         | ✅     | ✅  |
| **Alert**       | Notification messages with 5 variants × 4 statuses | ✅     | ✅  |
| **Card**        | Container with 5 variants and sub-components       | ✅     | ✅  |
| **Accordion**   | Collapsible content with 5 behavior modes          | ✅     | ✅  |
| **Avatar**      | User profile images with status indicators         | ✅     | ✅  |
| **AvatarGroup** | Grouped avatars with overlap and count             | ✅     | ✅  |
| **Tooltip**     | Contextual hints with 5 variants                   | ✅     | ✅  |
| **Link**        | Smart links with external detection                | ✅     | ✅  |
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
```

**Features:**

- ✨ Shimmer animation on hover
- 🌈 Gradient overlays
- 💫 Dynamic shadows
- 🔄 React.forwardRef support

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

Smart links with automatic external link detection.

**Variants:** `default` `primary` `muted` `underline` `ghost` `button`  
**Sizes:** `sm` `md` `lg`

```tsx
import { Link } from 'saha-ui';

<Link
  href="https://example.com"
  variant="primary"
  size="md"
  external
>
  External Link
</Link>

<Link variant="button" href="/action">
  Link as Button
</Link>
```

**Features:**

- 🔗 Auto-detection of external links
- 🔒 Auto rel="noopener noreferrer" for security
- 🎨 Animated underline effects
- 🔘 Button-like variant option

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

```typescript
import type {
  ButtonVariant,
  ButtonSize,
  AlertStatus,
  CardVariant,
  AvatarSize,
  AvatarStatus,
  TooltipPosition,
  // ... and many more
} from "saha-ui";

// Type-safe component usage
const variant: ButtonVariant = "primary"; // ✅ Valid
const invalid: ButtonVariant = "invalid"; // ❌ TypeScript error

// Full IntelliSense support
<Button
  variant="p..." // Autocomplete shows: primary, secondary, accent, etc.
/>;
```

**Benefits:**

- ✅ Compile-time error checking
- 📝 IntelliSense autocomplete
- 📚 JSDoc hover documentation
- 🔍 Jump to definition support

---

## 🎨 Customization

### Using with Tailwind CSS

All components support the `className` prop for easy customization:

```tsx
<Button
  variant="primary"
  className="w-full rounded-full shadow-2xl"
>
  Custom Button
</Button>

<Card className="max-w-md mx-auto">
  Custom Card
</Card>
```

### Using the cn() Utility

```tsx
import { cn } from "saha-ui";

<div
  className={cn(
    "base-classes",
    condition && "conditional-classes",
    "more-classes"
  )}
/>;
```

---

## 📖 Documentation

- [Component Modernization Summary](./ULTRA_MODERN_SUMMARY.md)
- [Type Safety Guide](./TYPE_SAFETY_GUIDE.md)
- [Migration Guide](./CHANGELOG.md#migration-guide)

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

---

<div align="center">
  <p>If you find this library useful, please consider giving it a ⭐️</p>
  <p>
    <a href="https://github.com/Xenial-Devil/Saha-ui">GitHub</a> •
    <a href="https://www.npmjs.com/package/saha-ui">npm</a> •
    <a href="https://github.com/Xenial-Devil/Saha-ui/issues">Issues</a>
  </p>
</div>
