# Installation & Setup Guide

## Quick Install

```bash
npm install saha-ui
# or
yarn add saha-ui
# or
pnpm add saha-ui
```

## Peer Dependencies

Saha UI requires React 18+ or React 19+:

```bash
npm install react react-dom
```

## Setup

### 1. Import Styles

Add the CSS import to your main entry file (e.g., `main.tsx`, `index.tsx`, or `App.tsx`):

```typescript
import "saha-ui/dist/style.css";
```

### 2. Wrap with ThemeProvider

For dark mode support, wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider } from "saha-ui";

function App() {
  return (
    <ThemeProvider defaultTheme="light">{/* Your app content */}</ThemeProvider>
  );
}

export default App;
```

### 3. Use Components

```tsx
import { Button, Card, Avatar } from "saha-ui";

function MyComponent() {
  return (
    <Card variant="glass" padding="lg">
      <Avatar src="/user.jpg" alt="User" size="lg" />
      <Button variant="primary">Click Me</Button>
    </Card>
  );
}
```

## TypeScript Setup

Saha UI is written in TypeScript and includes full type definitions.

### Import Types

```typescript
import type {
  ButtonProps,
  ButtonVariant,
  CardProps,
  AvatarSize,
  // ... and more
} from "saha-ui";
```

### tsconfig.json

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node"
    "jsx": "react-jsx",
    "strict": true
  }
}
```

## Tailwind CSS Integration

Saha UI is built with Tailwind CSS v4. You don't need to install Tailwind separately as the compiled styles are included.

### Optional: Extend with Your Own Tailwind

If you want to use Tailwind utilities alongside Saha UI:

1. Install Tailwind CSS:

```bash
npm install -D tailwindcss @tailwindcss/postcss autoprefixer
```

2. Create `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. Import Tailwind in your CSS:

```css
@import "tailwindcss";
```

## Framework-Specific Setup

### Vite

```typescript
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "saha-ui/dist/style.css"; // ← Import Saha UI styles

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Next.js (App Router)

```typescript
// app/layout.tsx
import "saha-ui/dist/style.css";
import { ThemeProvider } from "saha-ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### Next.js (Pages Router)

```typescript
// pages/_app.tsx
import type { AppProps } from "next/app";
import "saha-ui/dist/style.css";
import { ThemeProvider } from "saha-ui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Create React App

```typescript
// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "saha-ui/dist/style.css"; // ← Import Saha UI styles
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Remix

```typescript
// app/root.tsx
import type { LinksFunction } from "@remix-run/node";
import sahaStyles from "saha-ui/dist/style.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: sahaStyles },
];
```

## Usage Examples

### Basic Example

```tsx
import { Button, Alert } from "saha-ui";

function Example() {
  return (
    <div>
      <Alert
        variant="left-accent"
        status="success"
        title="Success!"
        message="Your action was completed."
      />
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </div>
  );
}
```

### With Theme Toggle

```tsx
import { ThemeProvider, ThemeToggle, Card } from "saha-ui";

function App() {
  return (
    <ThemeProvider>
      <Card variant="glass" padding="lg">
        <ThemeToggle />
        <h1>My App</h1>
      </Card>
    </ThemeProvider>
  );
}
```

### TypeScript Example

```tsx
import { Button, type ButtonVariant, type ButtonSize } from "saha-ui";
import { useState } from "react";

function TypedButton() {
  const [variant, setVariant] = useState<ButtonVariant>("primary");
  const size: ButtonSize = "lg";

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => setVariant("secondary")}
    >
      Typed Button
    </Button>
  );
}
```

## Tree Shaking

Saha UI is built with ES modules and supports tree shaking. Import only what you need:

```typescript
// ✅ Good - Only Button code is included
import { Button } from "saha-ui";

// ✅ Also good - Named imports
import { Button, Card, Avatar } from "saha-ui";

// ❌ Avoid - Imports everything
import * as SahaUI from "saha-ui";
```

## Troubleshooting

### Styles Not Applied

Make sure you've imported the CSS:

```typescript
import "saha-ui/dist/style.css";
```

### TypeScript Errors

Ensure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "jsx": "react-jsx"
  }
}
```

### Module Not Found

Clear your node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Dark Mode Not Working

Wrap your app with `ThemeProvider`:

```tsx
import { ThemeProvider } from "saha-ui";

<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>;
```

## CDN Usage (Not Recommended)

For quick prototyping, you can use a CDN (not recommended for production):

```html
<!-- React -->
<script
  crossorigin
  src="https://unpkg.com/react@19/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"
></script>

<!-- Saha UI -->
<link rel="stylesheet" href="https://unpkg.com/saha-ui@latest/dist/style.css" />
<script src="https://unpkg.com/saha-ui@latest/dist/saha-ui.umd.js"></script>

<script>
  const { Button } = window.SahaUI;
  // Use components
</script>
```

## Next Steps

- Check out the [Component Documentation](./README.md#-components)
- Learn about [Type Safety](./TYPE_SAFETY_GUIDE.md)
- Read the [Publishing Guide](./PUBLISHING.md) if you want to contribute

## Support

- [GitHub Issues](https://github.com/Xenial-Devil/Saha-ui/issues)
- [Documentation](./README.md)
