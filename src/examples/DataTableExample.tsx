import { useState } from "react";
import {
  DataTable,
  DataTableCompact,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  flexRender,
} from "../components/DataTable/index";
import type { ColumnDef } from "../components/DataTable/DataTable.types";
import { useDataTable } from "../components/DataTable/useDataTable";
import Badge from "../components/Badge";
import Button from "../components/Button";
import {
  Trash2,
  Edit,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Sample data type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joinedDate: string;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    joinedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    joinedDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    status: "inactive",
    joinedDate: "2024-03-10",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "User",
    status: "pending",
    joinedDate: "2024-04-05",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "active",
    joinedDate: "2024-05-12",
  },
  {
    id: 6,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Editor",
    status: "active",
    joinedDate: "2024-06-18",
  },
  {
    id: 7,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "User",
    status: "inactive",
    joinedDate: "2024-07-22",
  },
  {
    id: 8,
    name: "Fiona Apple",
    email: "fiona@example.com",
    role: "Admin",
    status: "active",
    joinedDate: "2024-08-30",
  },
];

// Column definitions
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 80,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "Role",
    enableSorting: true,
    cell: ({ value }) => {
      const variantMap: Record<string, any> = {
        Admin: "error",
        Editor: "warning",
        User: "info",
      };
      return (
        <Badge variant={variantMap[value as string] || "default"}>
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ value }) => {
      const variantMap: Record<string, "success" | "error" | "warning"> = {
        active: "success",
        inactive: "error",
        pending: "warning",
      };
      return (
        <Badge variant={variantMap[value as string] || "default"}>
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "joinedDate",
    header: "Joined Date",
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            console.log("View", row.original);
          }}
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Edit", row.original);
          }}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Delete", row.original);
          }}
        >
          <Trash2 className="w-4 h-4 text-error" />
        </Button>
      </div>
    ),
  },
];

/**
 * Manual Composition Example - Using Table components directly
 */
const ManualCompositionExample = ({ data }: { data: User[] }) => {
  // Create table instance with useDataTable hook
  const table = useDataTable({
    data,
    columns: userColumns,
    enableSorting: true,
    enableFiltering: false,
    enablePagination: true,
    pageSize: 5,
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sortDirection = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none hover:bg-muted/70"
                  >
                    <div className="flex items-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, {
                            column: header.column,
                          })}
                      {sortDirection === "asc" && (
                        <ArrowUp className="w-4 h-4" />
                      )}
                      {sortDirection === "desc" && (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      {sortDirection === null && (
                        <ArrowUpDown className="w-4 h-4 opacity-50" />
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell ?? cell.getValue(), {
                      row,
                      value: cell.getValue(),
                      column: cell.column,
                    })}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={userColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Manual Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * DataTable Examples
 */
export const DataTableExample = () => {
  const [data] = useState<User[]>(sampleUsers);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">DataTable Component</h2>
        <p className="text-muted-foreground mb-8">
          Advanced data table with sorting, filtering, pagination, and more.
          Built with component API for maximum flexibility.
        </p>

        {/* ===== COMPONENT API EXAMPLES ===== */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-2">Component API Examples</h2>
          <p className="text-muted-foreground mb-8">
            Full control with the component-based approach
          </p>

          {/* Manual Composition API */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">
              🎯 Manual Composition API - Full Control
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Build your table manually using Table, TableHeader, TableBody,
              TableRow, TableHead, and TableCell components with the
              useDataTable hook for maximum flexibility.
            </p>
            <ManualCompositionExample data={data} />
          </section>

          {/* Advanced Component API - Custom Columns */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">
              🎯 Component API - Custom Cell Renderers
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Define columns with custom render functions for complete control
              over cell content
            </p>
            <DataTable
              data={data}
              columns={userColumns}
              variant="primary"
              enableGlobalFilter
              globalFilterPlaceholder="Search users..."
              onRowClick={(user) => console.log("Clicked user:", user)}
            />
          </section>

          {/* Component API - Controlled State */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">
              🎯 Component API - Controlled Row Selection
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Control table state externally for advanced use cases. Selected
              rows: {Object.keys(selectedRows).length}
            </p>
            <div className="mb-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRows({})}
              >
                Clear Selection
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const allSelected = data.reduce(
                    (acc, _, idx) => ({ ...acc, [idx]: true }),
                    {}
                  );
                  setSelectedRows(allSelected);
                }}
              >
                Select All
              </Button>
            </div>
            <DataTable
              data={data}
              columns={userColumns}
              variant="accent"
              enableRowSelection
              rowSelection={selectedRows}
              onRowSelectionChange={setSelectedRows}
            />
          </section>

          {/* Component API - Advanced Sorting */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">
              🎯 Component API - Custom Sorting & Filtering
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Columns support custom sort and filter functions
            </p>
            <DataTable
              data={data}
              columns={[
                {
                  accessorKey: "id",
                  header: "ID",
                  size: 80,
                  enableSorting: true,
                },
                {
                  accessorKey: "name",
                  header: "Name (Custom Sort)",
                  enableSorting: true,
                  sortingFn: (rowA, rowB) => {
                    // Custom: Sort by last name
                    const lastNameA = rowA.original.name.split(" ")[1] || "";
                    const lastNameB = rowB.original.name.split(" ")[1] || "";
                    return lastNameA.localeCompare(lastNameB);
                  },
                },
                {
                  accessorKey: "email",
                  header: "Email Domain",
                  cell: ({ value }) => {
                    const domain = (value as string).split("@")[1];
                    return <span className="font-mono text-xs">{domain}</span>;
                  },
                },
                {
                  accessorKey: "status",
                  header: "Status",
                  cell: ({ value }) => {
                    const variantMap: Record<
                      string,
                      "success" | "error" | "warning"
                    > = {
                      active: "success",
                      inactive: "error",
                      pending: "warning",
                    };
                    return (
                      <Badge variant={variantMap[value as string] || "default"}>
                        {String(value)}
                      </Badge>
                    );
                  },
                },
              ]}
              variant="glass"
              striped="odd"
            />
          </section>

          {/* Component API - Custom Empty & Loading States */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">
              🎯 Component API - Custom States
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Provide custom components for loading and empty states
            </p>
            <DataTable
              data={[]}
              columns={userColumns}
              variant="info"
              emptyComponent={
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="text-6xl">📭</div>
                  <h3 className="text-lg font-semibold">No Users Found</h3>
                  <p className="text-sm text-muted-foreground">
                    Get started by adding your first user
                  </p>
                  <Button variant="primary" size="sm">
                    Add User
                  </Button>
                </div>
              }
            />
          </section>

          {/* Component API - Sticky Headers & Scrolling */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">
              🎯 Component API - Sticky Headers with Scroll
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Perfect for long tables - header stays visible while scrolling
            </p>
            <div className="max-h-[400px] overflow-auto border rounded-lg">
              <DataTable
                data={data}
                columns={userColumns}
                variant="secondary"
                size="sm"
                stickyHeader
                pagination={false}
              />
            </div>
          </section>

          {/* Component API - Responsive Sizes */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">
              🎯 Component API - Different Sizes
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Small (sm)</h4>
                <DataTable
                  data={data.slice(0, 3)}
                  columns={userColumns}
                  variant="success"
                  size="sm"
                  pageSize={3}
                  showPageSize={false}
                />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Medium (md) - Default
                </h4>
                <DataTable
                  data={data.slice(0, 3)}
                  columns={userColumns}
                  variant="warning"
                  size="md"
                  pageSize={3}
                  showPageSize={false}
                />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Large (lg)</h4>
                <DataTable
                  data={data.slice(0, 3)}
                  columns={userColumns}
                  variant="error"
                  size="lg"
                  pageSize={3}
                  showPageSize={false}
                />
              </div>
            </div>
          </section>
        </div>

        {/* ===== COMPACT API EXAMPLES ===== */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-2">Compact API Examples</h2>
          <p className="text-muted-foreground mb-8">
            Quick setup with the compact props-based approach
          </p>

          {/* Compact API */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">
              📦 Compact API - With Header Actions
            </h3>
            <DataTableCompact
              title="User Management"
              description="Manage all users in your organization"
              headerActions={
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Export CSV
                  </Button>
                  <Button variant="primary" size="sm">
                    Add User
                  </Button>
                </div>
              }
              data={data}
              columns={userColumns}
              variant="primary"
              enableGlobalFilter
              globalFilterPlaceholder="Search users..."
            />
          </section>
        </div>

        {/* ===== BASIC EXAMPLES ===== */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-2">Basic Examples</h2>
          <p className="text-muted-foreground mb-8">
            Simple use cases and common patterns
          </p>

          {/* Basic Example */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Basic DataTable</h3>
            <DataTable data={data} columns={userColumns} variant="default" />
          </section>

          {/* Glass Variant */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Glass Variant</h3>
            <DataTable
              data={data}
              columns={userColumns}
              variant="glass"
              striped="odd"
            />
          </section>

          {/* Striped Rows */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Striped Rows (Even)</h3>
            <DataTable
              data={data}
              columns={userColumns}
              variant="secondary"
              striped="even"
            />
          </section>

          {/* No Borders */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Without Borders</h3>
            <DataTable
              data={data}
              columns={userColumns}
              variant="outline"
              bordered={false}
            />
          </section>

          {/* Loading State */}
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Loading State</h3>
            <DataTable
              data={data}
              columns={userColumns}
              variant="warning"
              loading
            />
          </section>
        </div>

        {/* All Variants Showcase */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4">All Variants</h3>
          <div className="grid grid-cols-1 gap-8">
            {(
              [
                "default",
                "primary",
                "secondary",
                "accent",
                "success",
                "warning",
                "error",
                "info",
                "outline",
                "glass",
              ] as const
            ).map((variant) => (
              <div key={variant}>
                <h4 className="text-sm font-medium mb-2 capitalize">
                  {variant}
                </h4>
                <DataTable
                  data={data.slice(0, 3)}
                  columns={userColumns}
                  variant={variant}
                  pageSize={3}
                  showPageSize={false}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DataTableExample;
