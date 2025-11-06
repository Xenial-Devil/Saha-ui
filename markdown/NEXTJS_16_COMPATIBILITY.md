# Next.js 16 Compatibility Guide

## Overview

Saha UI is fully compatible with Next.js 16 and React Server Components (RSC). The library intelligently separates Server Components from Client Components, ensuring optimal performance and bundle size.

## React Version Support

```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```

✅ **Supports React 18 and React 19**  
✅ **Compatible with Next.js 13, 14, 15, and 16**  
✅ **Optimized for Server Components by default**

---

## Server vs Client Components

### 🖥️ Server Components (No "use client")

These components are **pure presentational** and can be rendered on the server. They have **no hooks, no state, no effects, and no browser APIs**.

#### Layout & Structure
- `Button` - Pure button with props only
- `Container` - Wrapper with max-width
- `Grid` - CSS Grid layout
- `Stack` - Flexbox layout
- `Section` - Semantic section wrapper
- `Typography` - Text rendering with variants
- `Link` - Anchor tag wrapper
- `Empty` - Empty state display
- `Skeleton` - CSS-only loading skeleton
- `Spinner` - CSS-only loading spinner
- `Field` - Form field wrapper

#### Chart Components (Static)
- `ChartHeader` - Chart title and description
- `ChartLoading` - Loading state UI

**Benefits:**
- ⚡ Zero JavaScript shipped to client
- 🚀 Faster initial page load
- 📦 Smaller bundle size
- 🔒 Enhanced security (runs on server)

**Usage in Next.js 16:**
```tsx
// app/page.tsx (Server Component)
import { Button, Typography, Container } from 'saha-ui';

export default function Page() {
  return (
    <Container>
      <Typography variant="h1">Hello World</Typography>
      <Button>Click Me</Button>
    </Container>
  );
}
```

---

### 💻 Client Components (With "use client")

These components use **React hooks, state, effects, refs, event handlers, or browser APIs** and must run on the client.

#### Interactive Components
- `Accordion` - useState for collapse/expand
- `Alert` - useState for dismissible state
- `Autocomplete` - useState, useRef for search
- `Avatar` - useEffect for image loading
- `Calendar` - useState for date selection
- `Carousel` - useState, useRef for slides
- `Checkbox` - useState for checked state
- `Combobox` - useState, useRef for selection
- `Command` - useState, useRef for command palette
- `ContextMenu` - useState, useRef, createPortal
- `DatePicker` - useState, useRef, createPortal
- `Dialog` - useState, useRef, createPortal
- `Drawer` - useState, useRef, createPortal
- `Dropdown` - useState, useRef
- `Form` - useState for form state
- `Input` - useState, useRef for input
- `Modal` - useState, createPortal
- `Popover` - useState, useRef
- `Select` - useState for selection
- `Slider` - useState for value
- `Switch` - useState for toggle
- `Tabs` - useState for active tab
- `TextEditor` - useState, useRef for editor
- `Toast` - useState, createPortal
- `Toggle` - useState for toggle state
- `Tooltip` - useState, useRef

#### Chart Components (Interactive)
- `Chart` - useChartData, useChartColors hooks
- `ChartContainer` - ResponsiveContainer from recharts
- `ChartLegend` - Interactive legend with recharts
- `ChartTooltip` - Interactive tooltip
- `ChartWrapper` - Chart interaction wrapper
- All chart types (Line, Bar, Area, Pie, etc.) - Use recharts with hooks

#### Code Editor Components
- `CodeEditor` - Monaco editor with hooks
- `CodeViewer` - Wrapper with state
- `Toolbar` - useState for copy/format
- `StatusBar` - Props display
- `TabBar` - Tab management

#### Provider Components
- `ThemeProvider` - Context provider with state

**Usage in Next.js 16:**
```tsx
// app/components/InteractiveForm.tsx
'use client';

import { Input, Button, Form } from 'saha-ui';
import { useState } from 'react';

export default function InteractiveForm() {
  const [value, setValue] = useState('');
  
  return (
    <Form>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => console.log(value)}>Submit</Button>
    </Form>
  );
}
```

---

## Best Practices for Next.js 16

### 1. **Prefer Server Components**

Keep components as Server Components by default:

```tsx
// ✅ GOOD - Server Component
// app/components/Hero.tsx
import { Typography, Container } from 'saha-ui';

export default function Hero() {
  return (
    <Container>
      <Typography variant="h1">Welcome</Typography>
    </Container>
  );
}
```

### 2. **Use Client Components Only When Needed**

Add "use client" only when using hooks or interactivity:

```tsx
// ✅ GOOD - Client Component (uses state)
// app/components/Counter.tsx
'use client';

import { Button } from 'saha-ui';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <Button onClick={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  );
}
```

### 3. **Compose Server and Client Components**

Server Components can import Client Components:

```tsx
// app/page.tsx (Server Component)
import { Container, Typography } from 'saha-ui';
import InteractiveForm from './components/InteractiveForm'; // Client Component

export default function Page() {
  return (
    <Container>
      <Typography variant="h1">Contact Us</Typography>
      <InteractiveForm />
    </Container>
  );
}
```

### 4. **Pass Server Components as Children**

You can pass Server Components to Client Components as children:

```tsx
// app/components/Wrapper.tsx (Client)
'use client';

import { useState } from 'react';

export default function Wrapper({ children }) {
  const [open, setOpen] = useState(false);
  return <div>{open && children}</div>;
}

// app/page.tsx (Server)
import { Typography } from 'saha-ui';
import Wrapper from './components/Wrapper';

export default function Page() {
  return (
    <Wrapper>
      <Typography>This stays a Server Component!</Typography>
    </Wrapper>
  );
}
```

---

## Migration Guide

### From Next.js 12/13 (Pages Router)

```tsx
// OLD - pages/index.tsx
import { Button } from 'saha-ui';

export default function Home() {
  return <Button>Click</Button>;
}

// NEW - app/page.tsx (no changes needed!)
import { Button } from 'saha-ui';

export default function Home() {
  return <Button>Click</Button>;
}
```

### From Client-Side React

```tsx
// OLD - Client-only React
import { useState } from 'react';
import { Dialog, Button } from 'saha-ui';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Dialog open={open} onOpenChange={setOpen}>...</Dialog>
    </>
  );
}

// NEW - Next.js 16 (add "use client")
'use client';

import { useState } from 'react';
import { Dialog, Button } from 'saha-ui';

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Dialog open={open} onOpenChange={setOpen}>...</Dialog>
    </>
  );
}
```

---

## Component Classification Reference

### Server-Safe Components ✅
```tsx
Button, Typography, Container, Grid, Stack, Section,
Link, Empty, Skeleton, Spinner, Field, ChartHeader,
ChartLoading
```

### Client-Only Components 🔴
```tsx
Accordion, Alert, Autocomplete, Calendar, Carousel,
Checkbox, Combobox, Command, ContextMenu, DatePicker,
Dialog, Drawer, Dropdown, Form, Input, Modal, Popover,
Select, Slider, Switch, Tabs, TextEditor, Toast, Toggle,
Tooltip, ThemeProvider, Chart, CodeEditor
```

---

## TypeScript Support

All components have full TypeScript support with proper types:

```tsx
import type { ButtonProps, TypographyProps } from 'saha-ui';

// Server Component
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};

// Client Component
'use client';
import { useState } from 'react';
import type { InputProps } from 'saha-ui';

const MyInput: React.FC<InputProps> = (props) => {
  const [value, setValue] = useState('');
  return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
};
```

---

## Tree Shaking

Saha UI supports tree shaking for optimal bundle size:

```tsx
// ✅ GOOD - Only imports Button
import { Button } from 'saha-ui';

// ✅ ALSO GOOD - Direct import
import Button from 'saha-ui/components/Button';
```

---

## Performance Tips

### 1. **Minimize Client Boundaries**

Keep as much as possible in Server Components:

```tsx
// ❌ BAD - Entire page is client
'use client';
import { Container, Typography, Dialog } from 'saha-ui';

export default function Page() {
  return (
    <Container>
      <Typography>Static content</Typography>
      <Dialog>...</Dialog>
    </Container>
  );
}

// ✅ GOOD - Only Dialog is client
import { Container, Typography } from 'saha-ui';
import DialogWrapper from './DialogWrapper'; // Client Component

export default function Page() {
  return (
    <Container>
      <Typography>Static content</Typography>
      <DialogWrapper />
    </Container>
  );
}
```

### 2. **Use Streaming**

Server Components support React Suspense:

```tsx
import { Suspense } from 'react';
import { Skeleton } from 'saha-ui';
import DataDisplay from './DataDisplay';

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <DataDisplay />
    </Suspense>
  );
}
```

### 3. **Leverage Static Rendering**

Server Components can be statically rendered:

```tsx
// This page is fully static!
import { Typography, Container } from 'saha-ui';

export default function StaticPage() {
  return (
    <Container>
      <Typography variant="h1">Static Content</Typography>
      <Typography variant="p">No JavaScript needed!</Typography>
    </Container>
  );
}
```

---

## Troubleshooting

### Error: "You're importing a component that needs X. It only works in a Client Component"

**Solution:** Add "use client" to your component:

```tsx
'use client';
import { Dialog } from 'saha-ui';
// ... rest of your code
```

### Error: "useState/useEffect/useRef is not defined"

**Solution:** Your component needs "use client":

```tsx
'use client';
import { useState } from 'react';
import { Input } from 'saha-ui';
// ... rest of your code
```

### Server Component used as Client Component

**Problem:** Passing event handlers directly to server components.

```tsx
// ❌ BAD
<Button onClick={() => console.log('click')}>Click</Button>
```

**Solution:** Make your wrapper a Client Component:

```tsx
'use client';
import { Button } from 'saha-ui';

export default function ClickableButton() {
  return <Button onClick={() => console.log('click')}>Click</Button>;
}
```

---

## Summary

✅ **52 components** have "use client" (need client features)  
✅ **14 components** are Server Components (pure & static)  
✅ **100% Next.js 16 compatible**  
✅ **Optimized for performance**  
✅ **Type-safe with TypeScript**  

For more information, see:
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [Saha UI Documentation](https://github.com/Xenial-Devil/Saha-ui)