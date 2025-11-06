# Next.js "use client" Directive Guide for Saha UI

**Last Updated:** November 4, 2025  
**Purpose:** Quick reference for adding `"use client"` to Saha UI components for Next.js 15/16

---

## 🎯 When to Add "use client"

Add `"use client"` directive at the **TOP** of your component file (before any imports) when:

1. ✅ Component uses React hooks (`useState`, `useEffect`, `useRef`, etc.)
2. ✅ Component has event handlers (`onClick`, `onChange`, `onSubmit`, etc.)
3. ✅ Component uses browser APIs (`window`, `document`, `localStorage`, etc.)
4. ✅ Component uses context (`useContext`, `createContext`)
5. ✅ Component renders third-party interactive libraries

---

## 📝 How to Add "use client"

### **Correct Pattern**

```tsx
"use client";

import React from "react";
import { useState } from "react";
import { Button } from "saha-ui";

export function MyComponent() {
  const [count, setCount] = useState(0);

  return <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>;
}
```

### **Incorrect Pattern**

```tsx
// ❌ WRONG - "use client" must be at the very top
import React from "react";
("use client"); // Too late!

// ❌ WRONG - Missing "use client"
import { useState } from "react";

export function MyComponent() {
  const [count, setCount] = useState(0); // Error!
  return <div>{count}</div>;
}
```

---

## 🔵 Components That REQUIRE "use client"

### **All Form & Input Components**

```tsx
"use client"; // Required for all these:

import {
  Autocomplete,
  Checkbox,
  CodeEditor,
  Combobox,
  DatePicker,
  Dropdown,
  Input,
  InputOTP,
  NativeSelect,
  Radio,
  Rating,
  Select,
  Slider,
  Switch,
  TagInput,
  TextArea,
  TextEditor,
  Upload,
  Field,
  Form,
} from "saha-ui";
```

### **All Navigation Components**

```tsx
"use client"; // Required for all these:

import {
  Command,
  ContextMenu,
  Menubar,
  NavigationMenu,
  Pagination,
  Steps,
  Tab,
} from "saha-ui";
```

### **All Interactive Display Components**

```tsx
"use client"; // Required for all these:

import {
  Accordion,
  Calendar,
  Carousel,
  Chart,
  Collapsible,
  DataTable,
  Image,
  Resizable,
  ScrollArea,
  Timeline,
  Tooltip,
  Tree,
} from "saha-ui";
```

### **All Overlay & Feedback Components**

```tsx
"use client"; // Required for all these:

import {
  Alert,
  Dialog,
  Drawer,
  FloatingActionButton,
  HoverCard,
  PlayButton,
  Popover,
  Progress,
  Sonner,
  Toast,
} from "saha-ui";
```

### **Theme Components**

```tsx
"use client"; // ALWAYS required:

import { ThemeProvider, ThemeToggle, useTheme } from "saha-ui";
```

### **Toggle Components**

```tsx
"use client"; // Required for all these:

import { Toggle, ToggleGroup } from "saha-ui";
```

---

## 🟢 Components That DON'T Need "use client" (Unless Interactive)

### **Pure Display Components**

These can be Server Components unless you add event handlers:

```tsx
// ✅ No "use client" needed - server component
import {
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button, // Until onClick is added
  ButtonGroup,
  Card,
  Chip, // Until onDelete is added
  Empty,
  Kbd,
  Label,
  Link,
  List,
  Separator,
  Skeleton,
  Table, // Until sortable/filterable
  Typography,
} from "saha-ui";

export function ServerCard() {
  return (
    <Card>
      <Badge variant="success">New</Badge>
      <Typography variant="h2">Server Rendered</Typography>
    </Card>
  );
}
```

### **When They Become Client Components**

```tsx
"use client"; // Now required because of onClick

import { Button } from "saha-ui";

export function ClientButton() {
  return <Button onClick={() => alert("Clicked!")}>Click Me</Button>;
}
```

---

## 🎨 ThemeProvider Setup Pattern

### **Recommended: Separate Providers File**

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

---

## 🏗️ Common Patterns

### **Pattern 1: Server Component with Client Children**

```tsx
// app/dashboard/page.tsx (Server Component)
import { Card } from "saha-ui";
import { InteractiveChart } from "./interactive-chart";

export default async function Dashboard() {
  const data = await fetchData(); // Server-side data fetching

  return (
    <div className="grid gap-4">
      {/* Server component */}
      <Card>
        <h2>Dashboard</h2>
      </Card>

      {/* Client component */}
      <InteractiveChart data={data} />
    </div>
  );
}
```

```tsx
// app/dashboard/interactive-chart.tsx (Client Component)
"use client";

import { Chart } from "saha-ui";

export function InteractiveChart({ data }) {
  return (
    <Chart
      type="line"
      config={{
        data,
        xAxis: { dataKey: "month" },
        series: [{ dataKey: "value", name: "Value" }],
      }}
    />
  );
}
```

### **Pattern 2: Form Components**

```tsx
// app/contact/page.tsx
import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
}
```

```tsx
// app/contact/contact-form.tsx
"use client";

import { useState } from "react";
import { Input, TextArea, Button } from "saha-ui";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form>
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### **Pattern 3: Modal/Dialog**

```tsx
// app/components/delete-dialog.tsx
"use client";

import { useState } from "react";
import { Dialog, Button } from "saha-ui";

export function DeleteDialog({ itemName }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="error" onClick={() => setIsOpen(true)}>
        Delete
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Confirm Delete</Dialog.Title>
          </Dialog.Header>
          <p>Delete {itemName}?</p>
          <Dialog.Footer>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="error">Delete</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
```

### **Pattern 4: Data Table with Server Data**

```tsx
// app/users/page.tsx (Server Component)
import { UsersTable } from "./users-table";

async function getUsers() {
  const res = await fetch("https://api.example.com/users");
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <UsersTable data={users} />
    </div>
  );
}
```

```tsx
// app/users/users-table.tsx (Client Component)
"use client";

import { DataTable } from "saha-ui";
import { useState } from "react";

export function UsersTable({ data }) {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      selectable
      onSelectionChange={setSelectedRows}
    />
  );
}
```

---

## ⚡ Performance Tips

### **1. Keep Server Components Server**

```tsx
// ✅ GOOD - Server component fetches data
export default async function Page() {
  const data = await fetch("https://api.example.com/data");
  return <ServerCard data={data} />;
}

// ❌ BAD - Unnecessary client component
("use client");
export default function Page() {
  // Can't use async/await in client components
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((res) => res.json())
      .then(setData);
  }, []);
  return <div>{data}</div>;
}
```

### **2. Split Client Components**

```tsx
// ✅ GOOD - Only interactive parts are client
export default function Page() {
  return (
    <div>
      <StaticHeader /> {/* Server */}
      <InteractiveForm /> {/* Client */}
      <StaticFooter /> {/* Server */}
    </div>
  );
}

// ❌ BAD - Everything becomes client
("use client");
export default function Page() {
  return (
    <div>
      <StaticHeader />
      <InteractiveForm />
      <StaticFooter />
    </div>
  );
}
```

### **3. Pass Data from Server to Client**

```tsx
// ✅ GOOD - Fetch on server, render on client
// app/page.tsx (Server)
import { Chart } from './chart'

export default async function Page() {
  const data = await fetchChartData()
  return <Chart data={data} />  {/* Pass as prop */}
}

// app/chart.tsx (Client)
"use client"
import { Chart as ChartComponent } from 'saha-ui'

export function Chart({ data }) {
  return <ChartComponent type="line" config={{ data, ... }} />
}
```

---

## 🚨 Common Errors & Solutions

### **Error: "useState can only be used in Client Components"**

```tsx
// ❌ WRONG
import { useState } from "react";

export function MyComponent() {
  const [value, setValue] = useState("");
  // Error!
}
```

```tsx
// ✅ FIXED
"use client";

import { useState } from "react";

export function MyComponent() {
  const [value, setValue] = useState("");
  // Works!
}
```

### **Error: "Event handlers cannot be passed to Client Component"**

```tsx
// ❌ WRONG - Server component trying to pass onClick
export default function Page() {
  return <Button onClick={() => console.log("click")}>Click</Button>;
}
```

```tsx
// ✅ FIXED - Wrap in client component
"use client";

import { Button } from "saha-ui";

export function ClickableButton() {
  return <Button onClick={() => console.log("click")}>Click</Button>;
}
```

### **Error: "Hydration failed"**

```tsx
// ✅ Add suppressHydrationWarning to html tag
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

---

## 📋 Checklist for Converting Components

- [ ] Add `"use client"` at the very top of the file
- [ ] Ensure all imports come after `"use client"`
- [ ] Check if component uses hooks → needs `"use client"`
- [ ] Check if component has event handlers → needs `"use client"`
- [ ] Check if component uses browser APIs → needs `"use client"`
- [ ] Keep server components server when possible
- [ ] Pass data from server to client components as props
- [ ] Test for hydration errors
- [ ] Verify theme switching works (if using ThemeProvider)

---

## 🎯 Quick Decision Tree

```
Does your component:
├─ Use useState/useEffect/useRef/etc? → "use client"
├─ Have onClick/onChange/onSubmit/etc? → "use client"
├─ Use window/document/localStorage? → "use client"
├─ Use Saha UI interactive components? → "use client"
├─ Use ThemeProvider/useTheme? → "use client"
└─ Only render static content? → Server Component (no directive)
```

---

**Ready to build with Next.js 15/16! 🚀**

For detailed examples, see: `NEXTJS_15_16_COMPATIBILITY.md`
