# DataTable

A powerful data table component with sorting, filtering, pagination, and row selection. Built for handling large datasets efficiently.

## Features

- 📊 **Sorting** - Multi-column sorting
- 🔍 **Filtering** - Column and global filters
- 📄 **Pagination** - Built-in pagination
- ✅ **Row Selection** - Single and multi-select
- 📱 **Responsive** - Mobile-friendly layouts
- 🎨 **Customizable** - Custom cell rendering
- ⚡ **Performant** - Virtualization for large datasets

## Installation

\`\`\`tsx
import { DataTable } from 'saha-ui';
\`\`\`

## Basic Usage

\`\`\`tsx
const columns = [
{ accessorKey: 'name', header: 'Name' },
{ accessorKey: 'email', header: 'Email' },
{ accessorKey: 'role', header: 'Role' }
];

const data = [
{ name: 'John Doe', email: 'john@example.com', role: 'Admin' },
{ name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
];

<DataTable columns={columns} data={data} />
\`\`\`

## Related Components

- **Table** - Basic table component
- **Pagination** - Standalone pagination
- **Input** - Search and filter inputs
