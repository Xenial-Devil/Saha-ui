c# SAHA UI - Next.js 15/16 Compatibility Guide

**Last Updated:** November 4, 2025  
**Target:** Next.js 15.x & 16.x with App Router

---

## 📋 Table of Contents

1. [Component Classification](#component-classification)
2. [Client vs Server Components](#client-vs-server-components)
3. [Next.js Setup Guide](#nextjs-setup-guide)
4. [Theme Provider Usage](#theme-provider-usage)
5. [Component Usage Examples](#component-usage-examples)
6. [Migration Checklist](#migration-checklist)
7. [Common Issues & Solutions](#common-issues--solutions)

---

## 🎯 Component Classification

### **CLIENT COMPONENTS** (Require `"use client"`)

These components use React hooks, event handlers, or browser APIs and **MUST** be client components in Next.js:

#### **Interactive Input Components** (37 components)

```typescript
// Form & Input Components
-Autocomplete - // useState, onChange, filtering
  Checkbox - // useState, onChange
  CodeEditor - // Monaco Editor, browser APIs
  Combobox - // useState, onChange, filtering
  DatePicker - // Calendar, useState, popovers
  Dropdown - // useState, onClick, positioning
  Input - // onChange, onFocus
  InputOTP - // useState, onChange, focus management
  NativeSelect - // onChange
  Radio - // useState, onChange
  Rating - // useState, onClick, hover
  Select - // useState, onChange, popovers
  Slider - // useState, onChange, drag events
  Switch - // useState, onChange
  TagInput - // useState, onChange, keyboard events
  TextArea - // onChange, resize handling
  TextEditor - // Rich text, browser APIs
  Upload - // useState, drag events, file APIs
  Field - // Form field wrapper with state
  Form - // Form state management
  // Toggle & Selection
  Toggle - // useState, onClick
  ToggleGroup - // useState, onClick
  // Navigation & Menu
  Command - // useState, keyboard navigation
  ContextMenu - // useState, right-click events
  Menubar - // useState, keyboard navigation
  NavigationMenu - // useState, hover/click
  Pagination - // useState, onClick
  Tab - // useState, onClick, keyboard
  // Interactive Display
  Accordion - // useState, onClick, expand/collapse
  Calendar - // useState, onClick, date selection
  Carousel - // useState, useEffect, auto-play, swipe
  Collapsible - // useState, onClick
  DataTable - // useState, sorting, filtering, pagination
  Tree - // useState, expand/collapse
  Steps; // useState, current step tracking
```

#### **Overlay & Feedback Components** (11 components)

```typescript
-Alert - // Close button, animations
  Dialog - // useState, open/close, portal
  Drawer - // useState, open/close, animations
  HoverCard - // useState, hover events
  Modal - // useState, open/close, portal
  Popover - // useState, positioning
  Toast - // useState, useEffect, auto-dismiss
  Sonner - // Toast notifications, state
  Tooltip - // useState, hover/focus events
  FloatingActionButton - // onClick, positioning
  Image; // useState, lazy loading, zoom
```

#### **Theme & Utility Components** (6 components)

```typescript
-ThemeProvider - // useContext, useState, localStorage
  ThemeToggle - // useTheme hook, onClick
  Chart - // Recharts, useState, interactions
  Progress - // useEffect, animations
  Spinner - // Animations (can be server if static)
  PlayButton; // onClick, video controls
```

#### **Complex Display Components** (4 components)

```typescript
-AspectRatio - // useRef, resize observer
  Resizable - // useState, drag events, resize
  ScrollArea - // useRef, scroll events
  Timeline; // Animations, scroll tracking
```

**Total Client Components: 58**

---

### **SERVER COMPONENTS** (Can be server or client)

These components are purely presentational and can work as server components:

```typescript
// Static Display (14 components)
- Avatar              // Pure rendering
- AvatarGroup         // Pure rendering
- Badge               // Pure rendering
- Breadcrumb          // Pure rendering (unless interactive)
- Button              // Pure rendering (becomes client when onClick used)
- ButtonGroup         // Pure rendering
- Card                // Pure rendering
- Chip                // Pure rendering (unless dismissible)
- Divider/Separator   // Pure rendering
- Empty               // Pure rendering
- Kbd                 // Pure rendering
- Label               // Pure rendering
- Link                // Pure rendering (Next.js <Link> compatible)
- List                // Pure rendering
- Skeleton            // Pure rendering (CSS animations)
- Table               // Pure rendering (unless sortable/interactive)
- Typography          // Pure rendering

// Note: These become CLIENT components when:
- Button has onClick
- Chip has onDelete
- Link uses client-side navigation state
- Table has sorting/filtering
```

**Total Flexible Components: 14**

---

## 🔄 Client vs Server Components

### **When to Use Client Components**

```tsx
// ✅ MUST be client - uses hooks
"use client";
import { useState } from "react";
import { Input } from "saha-ui";

export function SearchForm() {
  const [value, setValue] = useState("");
  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

```tsx
// ✅ MUST be client - uses event handlers
"use client";
import { Button } from "saha-ui";

export function InteractiveButton() {
  return <Button onClick={() => alert("Clicked!")}>Click Me</Button>;
}
```

### **When to Use Server Components**

```tsx
// ✅ Can be server - pure rendering
import { Badge, Card } from "saha-ui";

export function ProductCard({ product }) {
  return (
    <Card>
      <h3>{product.name}</h3>
      <Badge variant="success">{product.status}</Badge>
    </Card>
  );
}
```

---

## 🚀 Next.js Setup Guide

### **1. Installation**

```bash
npm install saha-ui
# or
yarn add saha-ui
# or
pnpm add saha-ui
```

### **2. Configure Tailwind CSS**

```js
// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Add Saha UI
    "./node_modules/saha-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Saha UI theme variables
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
```

### **3. Add CSS Variables**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## 🎨 Theme Provider Usage

### **App Router (Next.js 15/16)**

#### **Method 1: Root Layout (Recommended)**

```tsx
// app/layout.tsx
import { ThemeProvider } from "saha-ui";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        liewnt{" "}
        <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

#### **Method 2: Separate Providers File**

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### **Using Theme in Components**

```tsx
// app/components/theme-toggle.tsx
"use client";

import { useTheme } from "saha-ui";
import { Button } from "saha-ui";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>{theme === "dark" ? "🌙" : "☀️"}</Button>
  );
}
```

### **Or Use Built-in ThemeToggle**

```tsx
// app/components/header.tsx
"use client";

import { ThemeToggle } from "saha-ui";

export function Header() {
  return (
    <header>
      <nav>
        <ThemeToggle />
      </nav>
    </header>
  );
}
```

---

## 💡 Component Usage Examples

### **Form with Validation (Client Component)**

```tsx
// app/components/contact-form.tsx
"use client";

import { useState } from "react";
import { Input, TextArea, Button, Form } from "saha-ui";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <TextArea
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      <Button type="submit" variant="primary">
        Send Message
      </Button>
    </form>
  );
}
```

### **Dashboard Layout (Mixed Server/Client)**

```tsx
// app/dashboard/page.tsx
import { Card, Badge, Avatar } from "saha-ui";
import { StatsChart } from "./stats-chart"; // Client component

// Server Component - fetches data
async function getStats() {
  const res = await fetch("https://api.example.com/stats");
  return res.json();
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Server Component - pure rendering */}
      <Card>
        <h3>Total Users</h3>
        <p className="text-4xl font-bold">{stats.users}</p>
        <Badge variant="success">+12%</Badge>
      </Card>

      <Card>
        <h3>Revenue</h3>
        <p className="text-4xl font-bold">${stats.revenue}</p>
        <Badge variant="warning">-3%</Badge>
      </Card>

      {/* Client Component - interactive chart */}
      <StatsChart data={stats.chartData} />
    </div>
  );
}
```

```tsx
// app/dashboard/stats-chart.tsx
"use client";

import { Chart } from "saha-ui";

export function StatsChart({ data }) {
  return (
    <Chart
      type="line"
      config={{
        data,
        xAxis: { dataKey: "month" },
        yAxis: {},
        series: [{ dataKey: "value", name: "Stats" }],
        legend: { show: true },
      }}
      title="Monthly Stats"
      variant="primary"
    />
  );
}
```

### **Data Table with Server Actions**

```tsx
// app/users/page.tsx
import { DataTable, Button } from "saha-ui";
import { UsersTableClient } from "./users-table-client";

async function getUsers() {
  const res = await fetch("https://api.example.com/users", {
    cache: "no-store", // Always fresh data
  });
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <UsersTableClient users={users} />
    </div>
  );
}
```

```tsx
// app/users/users-table-client.tsx
"use client";

import { DataTable } from "saha-ui";
import { useState } from "react";

export function UsersTableClient({ users }) {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      selectable
      onSelectionChange={setSelectedRows}
    />
  );
}
```

### **Modal/Dialog Pattern**

```tsx
// app/components/delete-confirmation.tsx
"use client";

import { Dialog, Button } from "saha-ui";
import { useState } from "react";

export function DeleteButton({ itemId, itemName }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    // Call API to delete
    await fetch(`/api/items/${itemId}`, { method: "DELETE" });
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="error" onClick={() => setIsOpen(true)}>
        Delete
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Confirm Deletion</Dialog.Title>
          </Dialog.Header>
          <p>Are you sure you want to delete "{itemName}"?</p>
          <Dialog.Footer>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="error" onClick={handleDelete}>
              Delete
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
```

---

## ✅ Migration Checklist

### **Pre-Migration**

- [ ] Next.js 15/16 installed
- [ ] App Router enabled
- [ ] TypeScript configured
- [ ] Tailwind CSS configured

### **Installation**

- [ ] Install `saha-ui` package
- [ ] Add Saha UI to Tailwind content paths
- [ ] Copy CSS variables to `globals.css`
- [ ] Import `globals.css` in root layout

### **Theme Setup**

- [ ] Add `ThemeProvider` to root layout or providers
- [ ] Add `suppressHydrationWarning` to `<html>` tag
- [ ] Test theme toggle functionality
- [ ] Verify theme persistence across page reloads

### **Component Migration**

- [ ] Identify which components need `"use client"`
- [ ] Create client component wrappers for interactive features
- [ ] Keep server components server-rendered when possible
- [ ] Test all interactive features (forms, modals, etc.)

### **Testing**

- [ ] Test theme switching
- [ ] Test forms and validation
- [ ] Test modals and overlays
- [ ] Test data tables and sorting
- [ ] Test responsive behavior
- [ ] Test SSR/hydration (no hydration mismatches)

---

## 🔧 Common Issues & Solutions

### **Issue: Hydration Mismatch**

```
Error: Hydration failed because the initial UI does not match
what was rendered on the server.
```

**Solution:**

```tsx
// Add suppressHydrationWarning to html tag
<html lang="en" suppressHydrationWarning>
```

### **Issue: "use client" Missing**

```
Error: useState can only be used in Client Components
```

**Solution:**

```tsx
// Add "use client" directive at top of file
"use client";

import { useState } from "react";
import { Input } from "saha-ui";
```

### **Issue: Theme Not Persisting**

**Solution:**

```tsx
// Make sure ThemeProvider is client component
"use client";

import { ThemeProvider } from "saha-ui";

export function Providers({ children }) {
  return <ThemeProvider storageKey="my-app-theme">{children}</ThemeProvider>;
}
```

### **Issue: Tailwind Classes Not Working**

**Solution:**

```js
// tailwind.config.js - Add Saha UI to content
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/saha-ui/dist/**/*.{js,ts,jsx,tsx}", // Add this
  ],
};
```

### **Issue: CSS Variables Not Applied**

**Solution:**

```css
/* Ensure globals.css has all Saha UI variables */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... all other variables */
  }
}
```

---

## 📚 Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/react/use-client)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)
- [Saha UI Documentation](./DOCUMENTATION.md)

---

## 🎯 Quick Reference

### **Always Client Components**

Forms, Modals, Tooltips, Charts, Theme Provider, All Inputs, Navigation Menus, Data Tables, Carousels, Accordions

### **Can Be Server Components**

Cards, Badges, Avatars, Typography, Separators, Skeletons, Static Buttons, Static Links

### **Key Next.js Patterns**

- Use `"use client"` for interactive components
- Keep data fetching in server components
- Pass data from server to client components as props
- Use `suppressHydrationWarning` on `<html>` for theme
- Separate providers into dedicated client component file

---

**Ready for Next.js 15 & 16! 🚀**
