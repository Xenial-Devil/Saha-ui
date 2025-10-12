# 📊 Table Component - Complete Documentation

## Overview

The **Table** component is a powerful, feature-rich data table with sorting, selection, and responsive design. Built with CVA (Class Variance Authority) for type-safe variant management and full TypeScript support.

**Bundle Size:** 9.73 kB (2.61 kB gzipped)

---

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Variants](#variants)
- [Sorting](#sorting)
- [Row Selection](#row-selection)
- [Custom Cell Rendering](#custom-cell-rendering)
- [Responsive Design](#responsive-design)
- [Loading States](#loading-states)
- [API Reference](#api-reference)
- [TypeScript](#typescript)
- [Best Practices](#best-practices)
- [Real-World Examples](#real-world-examples)

---

## Installation

```bash
npm install saha-ui
```

---

## Basic Usage

### Simple Table

```tsx
import { Table } from "saha-ui";

const columns = [
  { id: "name", header: "Name", accessor: "name" },
  { id: "email", header: "Email", accessor: "email" },
  { id: "role", header: "Role", accessor: "role" },
];

const data = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Developer" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Designer",
  },
];

<Table columns={columns} data={data} />;
```

---

## Variants

The Table component supports **5 visual variants**:

### Default Variant

Standard table with borders.

```tsx
<Table columns={columns} data={data} variant="default" />
```

### Bordered Variant

Enhanced borders with shadow.

```tsx
<Table columns={columns} data={data} variant="bordered" />
```

### Striped Variant

Alternating row colors for better readability.

```tsx
<Table columns={columns} data={data} variant="striped" />
```

### Glass Variant (Glassmorphism)

Modern frosted glass effect with backdrop blur.

```tsx
<Table columns={columns} data={data} variant="glass" />
```

### Minimal Variant

Clean, borderless design.

```tsx
<Table columns={columns} data={data} variant="minimal" />
```

---

## Sizes and Density

### Sizes

Control text size with three options:

```tsx
<Table columns={columns} data={data} size="sm" />  {/* Small */}
<Table columns={columns} data={data} size="md" />  {/* Medium (default) */}
<Table columns={columns} data={data} size="lg" />  {/* Large */}
```

### Density

Control row padding with three density levels:

```tsx
<Table columns={columns} data={data} density="compact" />      {/* px-3 py-2 */}
<Table columns={columns} data={data} density="normal" />       {/* px-4 py-3 (default) */}
<Table columns={columns} data={data} density="comfortable" />  {/* px-6 py-4 */}
```

### Combined

```tsx
<Table
  columns={columns}
  data={data}
  size="sm"
  density="compact"
  variant="minimal"
/>
```

---

## Sorting

### Uncontrolled Sorting (Internal State)

The Table manages sorting state internally:

```tsx
const columns = [
  {
    id: "name",
    header: "Name",
    accessor: "name",
    sortable: true,
  },
  {
    id: "age",
    header: "Age",
    accessor: "age",
    sortable: true,
  },
];

<Table columns={columns} data={data} sortable />;
```

**How it works:**

- Click column header to sort ascending
- Click again to sort descending
- Click again to remove sorting

### Controlled Sorting (External State)

Manage sorting state in your component:

```tsx
import { useState } from "react";
import type { SortDirection } from "saha-ui";

function MyTable() {
  const [sortBy, setSortBy] = useState<{
    column: string;
    direction: SortDirection;
  }>({
    column: "name",
    direction: "asc",
  });

  return (
    <Table
      columns={columns}
      data={data}
      sortable
      sortBy={sortBy}
      onSort={(newSort) => {
        console.log("Sorting changed:", newSort);
        setSortBy(newSort);
      }}
    />
  );
}
```

### Custom Sort Function

Provide a custom sorting function for complex data:

```tsx
const columns = [
  {
    id: "user",
    header: "User",
    cell: (row) => (
      <div>
        {row.firstName} {row.lastName}
      </div>
    ),
    sortable: true,
    sortFn: (a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    },
  },
  {
    id: "priority",
    header: "Priority",
    accessor: "priority",
    sortable: true,
    sortFn: (a, b) => {
      const priority = { high: 3, medium: 2, low: 1 };
      return priority[a.priority] - priority[b.priority];
    },
  },
];
```

---

## Row Selection

### Single and Multiple Selection

```tsx
import { useState } from "react";

function SelectableTable() {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  return (
    <Table
      columns={columns}
      data={data}
      selectable
      selectedRows={selectedRows}
      onRowSelect={(selected) => {
        console.log("Selected rows:", selected);
        setSelectedRows(selected);
      }}
      rowKey="id" // Specify which field to use as unique key
    />
  );
}
```

**Features:**

- ✅ Checkbox in header to select/deselect all
- ✅ Individual row checkboxes
- ✅ Controlled selection state
- ✅ Custom row key field

### Pre-selected Rows

```tsx
<Table
  columns={columns}
  data={data}
  selectable
  selectedRows={[1, 3, 5]} // Pre-select rows with IDs 1, 3, and 5
  onRowSelect={(selected) => console.log(selected)}
/>
```

---

## Custom Cell Rendering

### Simple Cell Renderer

```tsx
const columns = [
  {
    id: "status",
    header: "Status",
    cell: (row) => (
      <Badge variant={row.status === "active" ? "success" : "warning"}>
        {row.status}
      </Badge>
    ),
  },
];
```

### Complex Cell with Multiple Elements

```tsx
import { Avatar, Badge } from "saha-ui";

const columns = [
  {
    id: "user",
    header: "User",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <Avatar src={row.avatar} alt={row.name} size="sm" />
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      </div>
    ),
    sortable: true,
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
];
```

### Cell with Icons

```tsx
import { TrendingUp, TrendingDown } from "lucide-react";

const columns = [
  {
    id: "change",
    header: "Change",
    align: "right",
    cell: (row) => (
      <div className="flex items-center justify-end gap-1">
        {row.trend === "up" ? (
          <TrendingUp className="w-4 h-4 text-success" />
        ) : (
          <TrendingDown className="w-4 h-4 text-destructive" />
        )}
        <span
          className={row.trend === "up" ? "text-success" : "text-destructive"}
        >
          {row.change > 0 ? "+" : ""}
          {row.change}%
        </span>
      </div>
    ),
  },
];
```

---

## Column Alignment

Control text alignment for each column:

```tsx
const columns = [
  { id: "name", header: "Name", accessor: "name", align: "left" }, // Default
  { id: "status", header: "Status", accessor: "status", align: "center" },
  { id: "price", header: "Price", accessor: "price", align: "right" },
];
```

---

## Responsive Design

### Horizontal Scroll

The table automatically becomes scrollable on small screens:

```tsx
<Table
  columns={columns}
  data={data}
  responsive={true} // Default
/>
```

### Sticky Header

Keep header visible while scrolling:

```tsx
<Table
  columns={columns}
  data={data}
  stickyHeader
  maxHeight="500px" // Set max height for scrolling
/>
```

### Max Height

Control table height with scrolling:

```tsx
<Table columns={columns} data={largeDataset} maxHeight="400px" stickyHeader />
```

---

## Loading States

### Inline Loading

Shows a loading spinner in the table:

```tsx
<Table columns={columns} data={[]} loading={true} />
```

### Overlay Loading

Shows a full overlay with spinner:

```tsx
<Table columns={columns} data={data} loading={true} loadingOverlay={true} />
```

### Loading with Data

Show loading state while keeping data visible:

```tsx
function DataTable() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    const newData = await fetchData();
    setData(newData);
    setLoading(false);
  };

  return (
    <Table
      columns={columns}
      data={data}
      loading={loading}
      loadingOverlay={true}
    />
  );
}
```

---

## Empty States

### Default Empty Message

```tsx
<Table columns={columns} data={[]} />
// Shows: "No data available"
```

### Custom Empty Message

```tsx
import { Mail } from "lucide-react";

<Table
  columns={columns}
  data={[]}
  emptyMessage={
    <div className="flex flex-col items-center gap-2 py-8">
      <Mail className="w-12 h-12 text-muted-foreground" />
      <p className="font-semibold">No contacts found</p>
      <p className="text-sm text-muted-foreground">
        Add your first contact to get started
      </p>
    </div>
  }
/>;
```

---

## Interactive Features

### Clickable Rows

```tsx
<Table
  columns={columns}
  data={data}
  onRowClick={(row) => {
    console.log("Row clicked:", row);
    navigate(`/user/${row.id}`);
  }}
  hoverable // Add hover effect
/>
```

### Custom Row Styling

Style rows based on data:

```tsx
<Table
  columns={columns}
  data={data}
  rowClassName={(row) => {
    if (row.status === "error") return "bg-destructive/5";
    if (row.status === "success") return "bg-success/5";
    return "";
  }}
/>
```

### Hoverable Rows

```tsx
<Table
  columns={columns}
  data={data}
  hoverable // Adds hover effect
/>
```

---

## Column Configuration

### Column Width

Control column sizing:

```tsx
const columns = [
  {
    id: "avatar",
    header: "",
    cell: (row) => <Avatar src={row.avatar} />,
    width: "60px",
    sticky: true, // Make this column sticky
  },
  {
    id: "name",
    header: "Name",
    accessor: "name",
    minWidth: "200px",
  },
  {
    id: "description",
    header: "Description",
    accessor: "description",
    maxWidth: "400px",
  },
];
```

### Sticky Columns

```tsx
const columns = [
  {
    id: "actions",
    header: "Actions",
    cell: (row) => <Button size="sm">Edit</Button>,
    sticky: true, // Column stays visible while scrolling
  },
];
```

### Footer Support

```tsx
const columns = [
  {
    id: "product",
    header: "Product",
    accessor: "product",
    footer: "Total",
  },
  {
    id: "sales",
    header: "Sales",
    accessor: "sales",
    footer: (data) => {
      const total = data.reduce((sum, row) => sum + row.sales, 0);
      return `${total} units`;
    },
  },
  {
    id: "revenue",
    header: "Revenue",
    accessor: "revenue",
    footer: (data) => {
      const total = data.reduce((sum, row) => sum + row.revenue, 0);
      return `$${total.toLocaleString()}`;
    },
  },
];

<Table columns={columns} data={data} showFooter />;
```

---

## API Reference

### TableProps

| Prop             | Type                                                           | Default     | Description                     |
| ---------------- | -------------------------------------------------------------- | ----------- | ------------------------------- |
| `columns`        | `TableColumn<T>[]`                                             | Required    | Column definitions              |
| `data`           | `T[]`                                                          | Required    | Data array                      |
| `variant`        | `TableVariant`                                                 | `"default"` | Visual style variant            |
| `size`           | `TableSize`                                                    | `"md"`      | Text size                       |
| `density`        | `TableDensity`                                                 | `"normal"`  | Row padding                     |
| `bordered`       | `boolean`                                                      | `false`     | Show borders                    |
| `hoverable`      | `boolean`                                                      | `false`     | Add hover effect to rows        |
| `striped`        | `boolean`                                                      | `false`     | Alternating row colors          |
| `showHeader`     | `boolean`                                                      | `true`      | Show table header               |
| `showFooter`     | `boolean`                                                      | `false`     | Show table footer               |
| `selectable`     | `boolean`                                                      | `false`     | Enable row selection            |
| `selectedRows`   | `(string \| number)[]`                                         | `[]`        | Selected row keys               |
| `onRowSelect`    | `(selected: (string \| number)[]) => void`                     | -           | Selection change callback       |
| `rowKey`         | `keyof T \| ((row: T) => string \| number)`                    | `"id"`      | Unique row identifier           |
| `sortable`       | `boolean`                                                      | `false`     | Enable sorting                  |
| `sortBy`         | `{ column: string; direction: SortDirection }`                 | -           | Current sort state (controlled) |
| `onSort`         | `(sort: { column: string; direction: SortDirection }) => void` | -           | Sort change callback            |
| `loading`        | `boolean`                                                      | `false`     | Show loading state              |
| `loadingOverlay` | `boolean`                                                      | `false`     | Use overlay for loading         |
| `emptyMessage`   | `React.ReactNode`                                              | -           | Custom empty state              |
| `caption`        | `string`                                                       | -           | Table caption                   |
| `responsive`     | `boolean`                                                      | `true`      | Enable responsive scroll        |
| `stickyHeader`   | `boolean`                                                      | `false`     | Sticky header on scroll         |
| `maxHeight`      | `string`                                                       | -           | Max height with scroll          |
| `rowClassName`   | `string \| ((row: T) => string)`                               | -           | Custom row classes              |
| `onRowClick`     | `(row: T) => void`                                             | -           | Row click callback              |
| `className`      | `string`                                                       | -           | Additional classes              |

### TableColumn<T>

| Property    | Type                                                  | Description              |
| ----------- | ----------------------------------------------------- | ------------------------ |
| `id`        | `string`                                              | Unique column identifier |
| `header`    | `React.ReactNode`                                     | Column header content    |
| `accessor`  | `keyof T \| ((row: T) => any)`                        | Data accessor            |
| `cell`      | `(row: T) => React.ReactNode`                         | Custom cell renderer     |
| `width`     | `string`                                              | Column width             |
| `minWidth`  | `string`                                              | Minimum column width     |
| `maxWidth`  | `string`                                              | Maximum column width     |
| `align`     | `ColumnAlign`                                         | Text alignment           |
| `sortable`  | `boolean`                                             | Enable sorting           |
| `sortFn`    | `(a: T, b: T) => number`                              | Custom sort function     |
| `footer`    | `React.ReactNode \| ((data: T[]) => React.ReactNode)` | Footer content           |
| `sticky`    | `boolean`                                             | Make column sticky       |
| `className` | `{ header?: string; cell?: string }`                  | Custom classes           |

### Type Definitions

```typescript
type TableVariant = "default" | "bordered" | "striped" | "glass" | "minimal";
type TableSize = "sm" | "md" | "lg";
type TableDensity = "compact" | "normal" | "comfortable";
type ColumnAlign = "left" | "center" | "right";
type SortDirection = "asc" | "desc" | null;
```

---

## TypeScript

### Basic Types

```typescript
import type { TableProps, TableColumn } from "saha-ui";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: TableColumn<User>[] = [
  { id: "name", header: "Name", accessor: "name" },
  { id: "email", header: "Email", accessor: "email" },
];

const MyTable = () => {
  const data: User[] = [...];

  return <Table<User> columns={columns} data={data} />;
};
```

### Type-Safe Column Definitions

```typescript
import type { TableColumn, ColumnAlign, SortDirection } from "saha-ui";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const columns: TableColumn<Product>[] = [
  {
    id: "name",
    header: "Product Name",
    accessor: "name",
    sortable: true,
  },
  {
    id: "price",
    header: "Price",
    accessor: "price",
    align: "right" as ColumnAlign,
    cell: (row) => `$${row.price.toFixed(2)}`,
    sortable: true,
  },
];
```

---

## Best Practices

### 1. Use Memoization for Large Datasets

```tsx
import { useMemo } from "react";

function LargeTable({ data }) {
  const columns = useMemo(
    () => [
      { id: "name", header: "Name", accessor: "name" },
      // ... other columns
    ],
    []
  );

  return <Table columns={columns} data={data} />;
}
```

### 2. Controlled vs Uncontrolled

**Use Uncontrolled (default)** when:

- Simple sorting needs
- No need to sync with URL or external state

**Use Controlled** when:

- Need to sync with URL params
- Complex filtering/sorting logic
- Need to track sorting state

### 3. Performance with Large Data

```tsx
// Virtual scrolling for very large datasets
import { useVirtualizer } from "@tanstack/react-virtual";

// Or implement pagination
<Table columns={columns} data={paginatedData} maxHeight="600px" stickyHeader />;
```

### 4. Accessibility

```tsx
<Table
  columns={columns}
  data={data}
  caption="User Management Table" // Improves accessibility
  aria-label="Users"
/>
```

---

## Real-World Examples

### 1. User Management Table

```tsx
import { Table, Avatar, Badge, Button } from "saha-ui";
import { Mail, Phone, MoreVertical } from "lucide-react";

const columns = [
  {
    id: "user",
    header: "User",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <Avatar
          src={row.avatar}
          alt={row.name}
          size="sm"
          status={row.online ? "online" : "offline"}
        />
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Mail className="w-3 h-3" />
            {row.email}
          </div>
        </div>
      </div>
    ),
    sortable: true,
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
  {
    id: "role",
    header: "Role",
    accessor: "role",
    sortable: true,
  },
  {
    id: "status",
    header: "Status",
    align: "center",
    cell: (row) => (
      <Badge variant={row.status === "active" ? "success" : "warning"} dot>
        {row.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "",
    align: "right",
    cell: (row) => (
      <Button variant="ghost" size="sm" icon>
        <MoreVertical className="w-4 h-4" />
      </Button>
    ),
  },
];

<Table
  columns={columns}
  data={users}
  variant="glass"
  hoverable
  onRowClick={(row) => navigate(`/users/${row.id}`)}
/>;
```

### 2. Sales Dashboard

```tsx
import { TrendingUp, TrendingDown } from "lucide-react";

const columns = [
  {
    id: "product",
    header: "Product",
    accessor: "product",
    sortable: true,
  },
  {
    id: "sales",
    header: "Units Sold",
    accessor: "sales",
    align: "right",
    sortable: true,
    footer: (data) => data.reduce((sum, row) => sum + row.sales, 0),
  },
  {
    id: "revenue",
    header: "Revenue",
    accessor: "revenue",
    align: "right",
    cell: (row) => `$${row.revenue.toLocaleString()}`,
    sortable: true,
    footer: (data) => {
      const total = data.reduce((sum, row) => sum + row.revenue, 0);
      return `$${total.toLocaleString()}`;
    },
  },
  {
    id: "change",
    header: "Change",
    align: "right",
    cell: (row) => (
      <div className="flex items-center justify-end gap-1">
        {row.trend === "up" ? (
          <TrendingUp className="w-4 h-4 text-success" />
        ) : (
          <TrendingDown className="w-4 h-4 text-destructive" />
        )}
        <span
          className={row.trend === "up" ? "text-success" : "text-destructive"}
        >
          {row.change > 0 ? "+" : ""}
          {row.change}%
        </span>
      </div>
    ),
    sortable: true,
    sortFn: (a, b) => a.change - b.change,
  },
];

<Table
  columns={columns}
  data={salesData}
  variant="bordered"
  showFooter
  caption="Q4 2024 Sales Performance"
/>;
```

### 3. Task Management

```tsx
import { Badge, Checkbox } from "saha-ui";
import { Calendar, User } from "lucide-react";

const columns = [
  {
    id: "task",
    header: "Task",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <Checkbox checked={row.completed} />
        <div>
          <div
            className={
              row.completed
                ? "line-through text-muted-foreground"
                : "font-medium"
            }
          >
            {row.title}
          </div>
          <div className="text-sm text-muted-foreground">{row.description}</div>
        </div>
      </div>
    ),
  },
  {
    id: "assignee",
    header: "Assigned To",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Avatar src={row.assignee.avatar} size="xs" />
        <span>{row.assignee.name}</span>
      </div>
    ),
  },
  {
    id: "due",
    header: "Due Date",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        {row.dueDate}
      </div>
    ),
  },
  {
    id: "priority",
    header: "Priority",
    align: "center",
    cell: (row) => (
      <Badge
        variant={
          row.priority === "high"
            ? "destructive"
            : row.priority === "medium"
            ? "warning"
            : "default"
        }
      >
        {row.priority}
      </Badge>
    ),
  },
];

<Table
  columns={columns}
  data={tasks}
  variant="minimal"
  rowClassName={(row) => (row.completed ? "opacity-50" : "")}
/>;
```

---

## Advanced Usage

### Combining Features

```tsx
import { useState } from "react";
import type { SortDirection } from "saha-ui";

function AdvancedTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState({
    column: "name",
    direction: "asc" as SortDirection,
  });
  const [loading, setLoading] = useState(false);

  return (
    <Table
      columns={columns}
      data={data}
      variant="glass"
      size="md"
      density="comfortable"
      // Sorting
      sortable
      sortBy={sortBy}
      onSort={setSortBy}
      // Selection
      selectable
      selectedRows={selectedRows}
      onRowSelect={setSelectedRows}
      // UI
      hoverable
      striped
      stickyHeader
      maxHeight="600px"
      // Loading
      loading={loading}
      loadingOverlay
      // Interaction
      onRowClick={(row) => console.log("Clicked:", row)}
      rowClassName={(row) =>
        selectedRows.includes(row.id) ? "ring-2 ring-primary" : ""
      }
    />
  );
}
```

---

## Styling and Customization

### Custom Theme Colors

```tsx
<Table
  columns={columns}
  data={data}
  className="[--table-border:oklch(var(--primary))]"
/>
```

### Custom Variants with CVA

You can extend the component with your own variants by wrapping it:

```tsx
import { Table } from "saha-ui";
import { cva } from "class-variance-authority";
import { cn } from "saha-ui/lib/utils";

const customTableVariants = cva("", {
  variants: {
    theme: {
      ocean: "bg-blue-50 dark:bg-blue-950",
      forest: "bg-green-50 dark:bg-green-950",
    },
  },
});

function CustomTable({ theme, ...props }) {
  return (
    <div className={customTableVariants({ theme })}>
      <Table {...props} />
    </div>
  );
}
```

---

## Accessibility

The Table component follows WCAG guidelines:

- ✅ Semantic HTML (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`)
- ✅ Proper `scope` attributes on headers
- ✅ `aria-sort` on sortable columns
- ✅ `aria-selected` on selected rows
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Caption support for context

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ✅ Supports reduced motion preferences

---

## Migration Guide

### From plain HTML table

```tsx
// Before
<table className="border">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    {data.map(row => (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td>{row.email}</td>
      </tr>
    ))}
  </tbody>
</table>

// After
<Table
  columns={[
    { id: "name", header: "Name", accessor: "name" },
    { id: "email", header: "Email", accessor: "email" },
  ]}
  data={data}
/>
```

---

## Troubleshooting

### Issue: Sorting not working

**Solution:** Ensure `sortable` prop is true and columns have `sortable: true`:

```tsx
<Table
  columns={columns.map((col) => ({ ...col, sortable: true }))}
  data={data}
  sortable={true}
/>
```

### Issue: Selection not updating

**Solution:** Make sure you're updating state in `onRowSelect`:

```tsx
const [selected, setSelected] = useState([]);

<Table
  selectable
  selectedRows={selected}
  onRowSelect={setSelected} // ← Must update state
/>;
```

### Issue: Custom cell renderer not showing

**Solution:** Use `cell` property, not `accessor`:

```tsx
const columns = [
  {
    id: "status",
    header: "Status",
    cell: (row) => <Badge>{row.status}</Badge>, // ✅ Correct
    accessor: "status", // ❌ Won't render custom component
  },
];
```

---

## Performance Tips

1. **Memoize columns** - Prevent re-creation on each render
2. **Use `rowKey`** - Helps React optimize re-renders
3. **Virtual scrolling** - For datasets > 1000 rows
4. **Pagination** - Better UX for large datasets
5. **Debounce sorting** - For real-time data

---

## License

MIT © Saha UI

---

## Support

- 📖 [Full Documentation](../README.md)
- 🐛 [Report Issues](https://github.com/Xenial-Devil/Saha-ui/issues)
- 💬 [Discussions](https://github.com/Xenial-Devil/Saha-ui/discussions)
