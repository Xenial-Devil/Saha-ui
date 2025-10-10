# Saha UI 🎨

A modern, beautiful React component library built with TypeScript and Tailwind CSS. Features glassmorphism effects and full dark/light mode support.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)

## ✨ Features

- 🎨 **Modern Design System** - Beautiful, contemporary UI components
- 🌓 **Dark/Light Mode** - Seamless theme switching with system preference detection
- 💎 **Glassmorphism** - Stunning glass effects for modern UIs
- 🎯 **TypeScript** - Full type safety and IntelliSense support
- ⚡ **Tailwind CSS** - Utility-first styling with custom design tokens
- 📦 **Tree-shakeable** - Import only what you need
- ♿ **Accessible** - Built with accessibility in mind
- 🎭 **Multiple Variants** - Flexible component variants for different use cases

## 🚀 Getting Started

### Installation

```bash
npm install saha-ui
# or
yarn add saha-ui
# or
pnpm add saha-ui
```

### Basic Usage

```tsx
import {
  ThemeProvider,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "saha-ui";

function App() {
  return (
    <ThemeProvider>
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Welcome to Saha UI</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="primary">Get Started</Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
```

## 🎨 Components

### 🌓 Theme System

#### ThemeProvider

Wrap your app with `ThemeProvider` to enable theme support:

```tsx
import { ThemeProvider } from "saha-ui";

<ThemeProvider defaultTheme="light" storageKey="my-app-theme">
  <YourApp />
</ThemeProvider>;
```

**Props:**

- `defaultTheme?: 'light' | 'dark'` - Default theme (defaults to system preference)
- `storageKey?: string` - LocalStorage key for theme persistence

#### ThemeToggle

A pre-built toggle button for switching themes:

```tsx
import { ThemeToggle } from "saha-ui";

<ThemeToggle size={24} className="custom-class" />;
```

#### useTheme Hook

Access and control the theme programmatically:

```tsx
import { useTheme } from "saha-ui";

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  );
}
```

### 🔘 Button

Modern button component with multiple variants and sizes:

```tsx
// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="glass">Glass Effect</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Additional Props
<Button rounded>Rounded</Button>
<Button fullWidth>Full Width</Button>
<Button disabled>Disabled</Button>

// With Icons (using lucide-react)
import { Zap } from 'lucide-react';
<Button variant="primary">
  <Zap size={18} />
  Click Me
</Button>
```

### 🎴 Card

Flexible card component with glass effects:

```tsx
<Card variant="glass" hoverable padding="lg" rounded="xl">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your content here</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

**Card Variants:**

- `default` - Standard card with shadow
- `glass` - Glass morphism effect
- `glass-strong` - Enhanced glass effect
- `glass-subtle` - Subtle glass effect
- `bordered` - Card with border

**Padding Options:** `none`, `sm`, `md`, `lg`, `xl`

**Rounded Options:** `sm`, `md`, `lg`, `xl`, `2xl`

### 📋 Alert

Versatile notification component:

```tsx
<Alert
  status="success"
  variant="solid"
  message="Operation completed successfully!"
  title="Success"
  closeable={true}
  rounded={true}
/>
```

**Props:**

- `variant`: `solid` | `subtle` | `left-accent` | `top-accent` | `outline`
- `status`: `success` | `danger` | `warning` | `info`
- `message`: string
- `title`: string
- `closeable`: boolean
- `rounded`: boolean

### 🪗 Accordion

Expandable content sections:

```tsx
const items = [
  { title: "Section 1", content: "Content for section 1" },
  { title: "Section 2", content: "Content for section 2" },
  { title: "Section 3", content: "Content for section 3" },
];

<Accordion variant="firstopen" items={items} />;
```

**Variants:**

- `default` - All sections can be opened/closed independently
- `controlled` - Only one section open at a time
- `allopen` - All sections open by default
- `toggle` - Toggle between open/closed
- `firstopen` - First section open by default

### 👤 Avatar & AvatarGroup

User profile images:

```tsx
// Single Avatar
<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Name"
  size={50}
  shape="circle"
/>

// Avatar Group
<AvatarGroup>
  <Avatar src="url1" />
  <Avatar src="url2" />
  <Avatar src="url3" />
</AvatarGroup>
```

**Shape Options:** `circle`, `rounded`, `square`

### 💬 Tooltip

Contextual tooltips:

```tsx
<Tooltip content="This is a tooltip" position="top" variant="glass">
  <Button>Hover me</Button>
</Tooltip>
```

**Positions:** `top`, `bottom`, `left`, `right`

**Variants:** `default`, `glass`

### 🎠 Carousel

Image carousel/slider:

```tsx
<Carousel>
  <CarouselItem image="url1" alt="Image 1" caption="Caption 1" />
  <CarouselItem image="url2" alt="Image 2" caption="Caption 2" />
  <CarouselItem image="url3" alt="Image 3" caption="Caption 3" />
</Carousel>
```

## 🎨 Design System

### Color Palette

Saha UI includes a comprehensive, semantic color system:

#### Primary Colors

- `primary`, `primary-light`, `primary-dark` - Main brand colors
- `secondary`, `secondary-light`, `secondary-dark` - Secondary brand colors
- `accent`, `accent-light`, `accent-dark` - Accent colors

#### Semantic Colors

- `success`, `success-light`, `success-dark`, `success-bg`
- `warning`, `warning-light`, `warning-dark`, `warning-bg`
- `error`, `error-light`, `error-dark`, `error-bg`
- `info`, `info-light`, `info-dark`, `info-bg`

#### UI Colors

- `background`, `background-secondary`, `background-tertiary`
- `surface`, `surface-hover`, `surface-active`
- `text`, `text-secondary`, `text-tertiary`, `text-inverse`
- `border`, `border-light`, `border-dark`

### Using Colors in Tailwind

```tsx
<div className="bg-primary text-text-inverse">Primary Background</div>
<div className="bg-success-bg text-success">Success Message</div>
<div className="border-border text-text-secondary">Bordered Box</div>
```

### 💎 Glass Effects

Apply stunning glassmorphism effects with utility classes:

```tsx
<div className="glass">Standard glass effect</div>
<div className="glass-strong">Strong glass effect</div>
<div className="glass-subtle">Subtle glass effect</div>
<div className="glass glass-hover">Glass with hover effect</div>
```

**Glass Effect Variables:**

- `--glass-bg` - Glass background color
- `--glass-blur` - Backdrop blur amount
- `--glass-border` - Glass border color
- `--glass-shadow` - Glass shadow

## 🎨 Customization

### Tailwind Configuration

Extend or override colors in `tailwind.config.js`:

```js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#your-color",
          light: "#lighter-shade",
          dark: "#darker-shade",
        },
      },
    },
  },
};
```

### CSS Variables

Override CSS variables in your global CSS:

```css
:root {
  --color-primary: #6366f1;
  --text: #0f172a;
  --background: #ffffff;
}

.dark {
  --color-primary: #818cf8;
  --text: #f8fafc;
  --background: #0f172a;
}
```

## 📦 Exports

```tsx
// Theme
export { ThemeProvider, useTheme } from "saha-ui";
export { ThemeToggle } from "saha-ui";

// Components
export { Button, Card, Alert, Accordion, Avatar, AvatarGroup } from "saha-ui";
export { Carousel, Image, Link, List, Tooltip } from "saha-ui";

// Types
export type { ButtonProps, CardProps, AlertProps, AvatarProps } from "saha-ui";
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT © Saha UI

## 🔗 Links

- [GitHub Repository](https://github.com/Xenial-Devil/Saha-ui)
- [NPM Package](#)
- [Documentation](#)

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
