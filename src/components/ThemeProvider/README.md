# ThemeProvider

A context provider for managing theme state across your application. Handles light/dark mode, custom themes, and system preference detection.

## Features

- 🌓 Light/dark mode support
- 🎨 Custom theme colors
- 💾 Persistent preferences
- 🖥️ System preference detection
- 🔄 Dynamic theme switching
- ⚡ Zero-flash on load
- 🎯 TypeScript support
- 🌈 CSS variable integration

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { ThemeProvider } from "saha-ui";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

## With Theme Hook

```tsx
import { ThemeProvider, useTheme } from "saha-ui";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      <YourApp />
    </ThemeProvider>
  );
}
```

## Default Theme

```tsx
<ThemeProvider defaultTheme="dark">
  <App />
</ThemeProvider>

<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>

<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>
```

## Custom Storage Key

```tsx
<ThemeProvider storageKey="my-app-theme">
  <App />
</ThemeProvider>
```

## Disable Transitions

```tsx
<ThemeProvider enableTransitions={false}>
  <App />
</ThemeProvider>
```

## Common Patterns

### Complete Theme Setup

```tsx
// app/providers.tsx
"use client";

import { ThemeProvider } from "saha-ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="my-app-theme"
      enableTransitions={true}
    >
      {children}
    </ThemeProvider>
  );
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

### Theme Toggle Component

```tsx
import { useTheme } from "saha-ui";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "saha-ui";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="icon"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
      </Button>

      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="icon"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
      </Button>

      <Button
        variant={theme === "system" ? "default" : "ghost"}
        size="icon"
        onClick={() => setTheme("system")}
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

### Theme Dropdown

```tsx
import { useTheme } from "saha-ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "saha-ui";
import { Sun, Moon, Monitor } from "lucide-react";

function ThemeMenu() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Per-Page Theme Override

```tsx
import { useTheme } from "saha-ui";
import { useEffect } from "react";

function LandingPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Force dark theme for landing page
    setTheme("dark");

    return () => {
      // Restore previous theme on unmount
      setTheme("system");
    };
  }, [setTheme]);

  return <div>Landing Page Content</div>;
}
```

## API Reference

### ThemeProvider Props

| Prop                | Type                                | Default    | Description              |
| ------------------- | ----------------------------------- | ---------- | ------------------------ |
| `defaultTheme`      | `'light'` \| `'dark'` \| `'system'` | `'system'` | Default theme            |
| `storageKey`        | `string`                            | `'theme'`  | localStorage key         |
| `enableTransitions` | `boolean`                           | `true`     | Enable theme transitions |
| `children`          | `ReactNode`                         | -          | App content              |

### useTheme Hook

Returns an object with:

| Property        | Type                                | Description          |
| --------------- | ----------------------------------- | -------------------- |
| `theme`         | `'light'` \| `'dark'` \| `'system'` | Current theme        |
| `setTheme`      | `(theme: Theme) => void`            | Update theme         |
| `systemTheme`   | `'light'` \| `'dark'`               | System preference    |
| `resolvedTheme` | `'light'` \| `'dark'`               | Actual applied theme |

## CSS Variables

The ThemeProvider sets these CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  /* ... more variables */
}
```

## TypeScript

```typescript
import type { Theme, ThemeProviderProps } from "saha-ui";

type Theme = "light" | "dark" | "system";
```

## Related Components

- ThemeToggle
- Button
- DropdownMenu
