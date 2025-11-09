# Table

A flexible and feature-rich table component for displaying tabular data. Supports sorting, filtering, pagination, row selection, and various styling options.

## Features

- 🎨 Multiple visual variants (default, bordered, striped, glass, minimal)
- 📏 Three size options (sm, md, lg)
- 📊 Density control (compact, normal, comfortable)
- 🔄 Sortable columns
- ✅ Row selection (single and multiple)
- 📱 Responsive design
- 🎯 Column alignment options
- ♿ Full accessibility support
- 🎭 Composable with subcomponents
- 🔍 Built-in filtering support

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
} from '@saha-ui/core';

function MyTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## Variants

### Default

```tsx
<Table variant="default">
  {/* table content */}
</Table>
```

### Bordered

```tsx
<Table variant="bordered">
  {/* table content */}
</Table>
```

### Striped

Alternating row colors:

```tsx
<Table variant="striped">
  {/* table content */}
</Table>
```

### Glass

Modern glassmorphism effect:

```tsx
<Table variant="glass">
  {/* table content */}
</Table>
```

### Minimal

Clean, minimal styling:

```tsx
<Table variant="minimal">
  {/* table content */}
</Table>
```

## Sizes

```tsx
<Table size="sm">Small table</Table>
<Table size="md">Medium table</Table>
<Table size="lg">Large table</Table>
```

## Density

Control spacing between rows:

```tsx
<Table density="compact">Compact spacing</Table>
<Table density="normal">Normal spacing</Table>
<Table density="comfortable">Comfortable spacing</Table>
```

## Sortable Columns

```tsx
function SortableTable() {
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    return aVal > bVal ? modifier : -modifier;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead 
            sortable 
            onClick={() => handleSort('name')}
            sortDirection={sortColumn === 'name' ? sortDirection : null}
          >
            Name
          </TableHead>
          <TableHead 
            sortable 
            onClick={() => handleSort('email')}
            sortDirection={sortColumn === 'email' ? sortDirection : null}
          >
            Email
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Row Selection

### Single Selection

```tsx
function SelectableTable() {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  return (
    <Table>
      <TableBody>
        {data.map(item => (
          <TableRow
            key={item.id}
            selectable
            selected={selectedRow === item.id}
            onClick={() => setSelectedRow(item.id)}
          >
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Multiple Selection with Checkboxes

```tsx
function MultiSelectTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? data.map(d => d.id) : []);
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={selectedRows.length === data.length}
              onCheckedChange={handleSelectAll}
              aria-label="Select all"
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.id}>
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(item.id)}
                onCheckedChange={() => handleSelectRow(item.id)}
                aria-label={`Select ${item.name}`}
              />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Column Alignment

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead align="left">Product</TableHead>
      <TableHead align="center">Category</TableHead>
      <TableHead align="right">Price</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell align="left">Widget</TableCell>
      <TableCell align="center">Electronics</TableCell>
      <TableCell align="right">$29.99</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## With Footer

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Item</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Product A</TableCell>
      <TableCell className="text-right">$100</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Product B</TableCell>
      <TableCell className="text-right">$200</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell className="font-bold">Total</TableCell>
      <TableCell className="text-right font-bold">$300</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

## Hoverable Rows

```tsx
<Table hoverable>
  <TableBody>
    {data.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Loading State

```tsx
function TableWithLoading() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map(i => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-32" /></TableCell>
              <TableCell><Skeleton className="h-4 w-48" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      {/* Actual data */}
    </Table>
  );
}
```

## Empty State

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.length === 0 ? (
      <TableRow>
        <TableCell colSpan={2} className="text-center py-8">
          <div className="flex flex-col items-center gap-2">
            <InboxIcon className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">No data available</p>
          </div>
        </TableCell>
      </TableRow>
    ) : (
      data.map(item => (
        <TableRow key={item.id}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.email}</TableCell>
        </TableRow>
      ))
    )}
  </TableBody>
</Table>
```

## API Reference

### Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'bordered' \| 'striped' \| 'glass' \| 'minimal'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the table |
| `density` | `'compact' \| 'normal' \| 'comfortable'` | `'normal'` | Row spacing |
| `hoverable` | `boolean` | `false` | Enable row hover effects |
| `className` | `string` | - | Additional CSS classes |

### TableHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Header row content |
| `className` | `string` | - | Additional CSS classes |

### TableBody Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Body rows |
| `className` | `string` | - | Additional CSS classes |

### TableFooter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Footer row content |
| `className` | `string` | - | Additional CSS classes |

### TableRow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectable` | `boolean` | `false` | Whether row is selectable |
| `selected` | `boolean` | `false` | Whether row is selected |
| `onClick` | `() => void` | - | Click handler |
| `className` | `string` | - | Additional CSS classes |

### TableHead Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Column alignment |
| `sortable` | `boolean` | `false` | Whether column is sortable |
| `sortDirection` | `'asc' \| 'desc' \| null` | `null` | Current sort direction |
| `onClick` | `() => void` | - | Click handler for sorting |
| `className` | `string` | - | Additional CSS classes |

### TableCell Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Cell alignment |
| `colSpan` | `number` | - | Number of columns to span |
| `rowSpan` | `number` | - | Number of rows to span |
| `className` | `string` | - | Additional CSS classes |

### TableCaption Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Caption text |
| `className` | `string` | - | Additional CSS classes |

## Common Patterns

### Data Table with Actions

```tsx
function DataTable({ data }) {
  return (
    <Table variant="bordered">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(user => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge>{user.role}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="ghost">Edit</Button>
                <Button size="sm" variant="ghost">Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Responsive Table

```tsx
<div className="overflow-x-auto">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="min-w-[200px]">Product</TableHead>
        <TableHead className="min-w-[150px]">Category</TableHead>
        <TableHead className="min-w-[100px]">Price</TableHead>
        <TableHead className="min-w-[100px]">Stock</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {/* rows */}
    </TableBody>
  </Table>
</div>
```

### Grouped Rows

```tsx
<Table>
  <TableBody>
    <TableRow className="bg-muted">
      <TableCell colSpan={3} className="font-bold">
        Electronics
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Laptop</TableCell>
      <TableCell>$999</TableCell>
      <TableCell>10</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Mouse</TableCell>
      <TableCell>$29</TableCell>
      <TableCell>50</TableCell>
    </TableRow>
    
    <TableRow className="bg-muted">
      <TableCell colSpan={3} className="font-bold">
        Furniture
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Chair</TableCell>
      <TableCell>$199</TableCell>
      <TableCell>25</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Accessibility

The Table component follows accessibility best practices:

- **Semantic HTML:** Uses proper `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements
- **ARIA Attributes:**
  - `aria-sort` for sortable columns
  - `aria-selected` for selected rows
  - Proper labels for interactive elements
- **Keyboard Navigation:**
  - Tab through interactive elements
  - Enter/Space to activate buttons
- **Screen Readers:**
  - Table captions announce table purpose
  - Column headers associated with cells
  - Sort state is announced

## Best Practices

1. **Use TableCaption:** Provide context about the table's purpose
2. **Keep It Simple:** Avoid overly complex nested structures
3. **Responsive Design:** Wrap in scrollable container on mobile
4. **Loading States:** Show skeleton or spinner during data fetch
5. **Empty States:** Provide helpful message when no data
6. **Sort Indicators:** Clearly show which column is sorted
7. **Row Limits:** Consider pagination for large datasets
8. **Column Width:** Set appropriate widths for content
9. **Hover States:** Make clickable rows obvious
10. **Accessibility:** Always include proper ARIA labels

## Styling

### Custom Styles

```tsx
<Table className="shadow-lg">
  <TableRow className="hover:bg-blue-50">
    <TableCell className="text-blue-600 font-bold">
      Custom styled
    </TableCell>
  </TableRow>
</Table>
```

### Sticky Header

```tsx
<div className="max-h-96 overflow-auto">
  <Table>
    <TableHeader className="sticky top-0 bg-background z-10">
      <TableRow>
        <TableHead>Sticky Header</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {/* Many rows */}
    </TableBody>
  </Table>
</div>
```

## Related Components

- **DataTable** - Advanced table with built-in features
- **List** - For simpler data display
- **Card** - Alternative data presentation
- **Pagination** - For large datasets

## Changelog

- **v1.0.0** - Initial release with all variants and features