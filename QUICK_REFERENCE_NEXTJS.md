# Saha UI + Next.js 15/16 - Quick Reference Card

**Last Updated:** November 4, 2025

---

## 🚀 Installation (30 seconds)

```bash
npm install saha-ui
```

```js
// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/saha-ui/dist/**/*.{js,ts,jsx,tsx}", // Add this
  ],
};
```

```tsx
// app/providers.tsx
"use client";
import { ThemeProvider } from "saha-ui";

export function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

```tsx
// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**Done! ✅**

---

## 🎯 Component Classification

### **Always Client (58 components)**

```tsx
"use client"; // Required for these:

// Forms & Inputs
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
  Toggle,
  ToggleGroup;

// Navigation
Command, ContextMenu, Menubar, NavigationMenu, Pagination, Steps, Tab;

// Interactive
Accordion,
  Calendar,
  Carousel,
  Chart,
  Collapsible,
  DataTable,
  Tree,
  HoverCard,
  Image,
  Resizable,
  ScrollArea,
  Timeline,
  Tooltip;

// Overlays
Alert,
  Dialog,
  Drawer,
  Popover,
  Toast,
  Sonner,
  FloatingActionButton,
  Progress,
  PlayButton;

// Theme
ThemeProvider, ThemeToggle;
```

### **Server or Client (15 components)**

```tsx
// No "use client" needed (until interactive):
Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  Chip,
  Empty,
  Kbd,
  Label,
  Link,
  List,
  Separator,
  Skeleton,
  Typography;
```

---

## 📝 Common Patterns

### **Pattern 1: Form**

```tsx
"use client";
import { Input, Button } from "saha-ui";
import { useState } from "react";

export function MyForm() {
  const [name, setName] = useState("");

  return (
    <form>
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### **Pattern 2: Server + Client**

```tsx
// app/page.tsx (Server)
import { Card } from "saha-ui";
import { Actions } from "./actions";

export default async function Page() {
  const data = await fetch("...");

  return (
    <Card>
      <Card.Header>{data.title}</Card.Header>
      <Card.Content>{data.content}</Card.Content>
      <Card.Footer>
        <Actions id={data.id} />
      </Card.Footer>
    </Card>
  );
}
```

```tsx
// app/actions.tsx (Client)
"use client";
import { Button } from "saha-ui";

export function Actions({ id }) {
  return <Button onClick={() => handleClick(id)}>Click</Button>;
}
```

### **Pattern 3: Modal**

```tsx
"use client";
import { Dialog, Button } from "saha-ui";
import { useState } from "react";

export function DeleteButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Confirm</Dialog.Title>
          </Dialog.Header>
          <p>Are you sure?</p>
          <Dialog.Footer>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="error">Delete</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
```

### **Pattern 4: Data Table**

```tsx
// page.tsx (Server)
import { UsersTable } from "./table";

export default async function Page() {
  const users = await fetch("...");
  return <UsersTable data={users} />;
}
```

```tsx
// table.tsx (Client)
"use client";
import { DataTable } from "saha-ui";

export function UsersTable({ data }) {
  return (
    <DataTable
      data={data}
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
      ]}
    />
  );
}
```

---

## 🎨 Variants & Sizes

```tsx
variant =
  "default" |
  "primary" |
  "secondary" |
  "accent" |
  "success" |
  "warning" |
  "error" |
  "info" |
  "outline" |
  "ghost" |
  "glass";

size = "sm" | "md" | "lg" | "xl";
```

---

## 🔧 Common Components

```tsx
// Button
<Button variant="primary" size="md" onClick={...}>Click</Button>

// Input
<Input label="Email" type="email" error="Invalid" />

// Card
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>Content</Card.Content>
</Card>

// Dialog
<Dialog open={open} onOpenChange={setOpen}>
  <Dialog.Content>...</Dialog.Content>
</Dialog>

// Chart
<Chart
  type="line"
  config={{
    data: [...],
    xAxis: { dataKey: 'month' },
    series: [{ dataKey: 'value', name: 'Value' }],
  }}
/>

// DataTable
<DataTable
  data={data}
  columns={columns}
  selectable
  sortable
/>

// Theme Toggle
<ThemeToggle />

// Toast
import { toast } from 'saha-ui'
toast.success('Success!')
```

---

## 🚨 Common Errors & Fixes

### **Error: "useState only works in Client Components"**

```tsx
// ❌ Wrong
export function MyComponent() {
  const [state, setState] = useState(0);
}

// ✅ Fixed
("use client");
export function MyComponent() {
  const [state, setState] = useState(0);
}
```

### **Error: "Hydration mismatch"**

```tsx
// ✅ Add to layout
<html suppressHydrationWarning>
```

### **Error: "Event handlers can't be passed"**

```tsx
// ❌ Wrong - Server component
export default function Page() {
  return <Button onClick={() => alert("hi")}>Click</Button>;
}

// ✅ Fixed - Client component
("use client");
export default function Page() {
  return <Button onClick={() => alert("hi")}>Click</Button>;
}
```

---

## 📚 Full Docs

- **NEXTJS_15_16_COMPATIBILITY.md** - Complete guide
- **NEXTJS_CLIENT_DIRECTIVE_GUIDE.md** - "use client" reference
- **NEXTJS_READINESS_SUMMARY.md** - Full analysis
- **DOCUMENTATION.md** - API reference

---

## ✅ Checklist

- [ ] Install `saha-ui`
- [ ] Add to Tailwind config
- [ ] Create `providers.tsx` with ThemeProvider
- [ ] Add `suppressHydrationWarning` to `<html>`
- [ ] Add `"use client"` to interactive components
- [ ] Test theme toggle
- [ ] Test forms
- [ ] Test modals

---

**Ready to build! 🚀**

See full docs for detailed examples and patterns.
