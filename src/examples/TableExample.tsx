import Table from "../components/Table";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { Mail, Phone, MapPin, TrendingUp, TrendingDown } from "lucide-react";

export const TableExample = () => {
  // Sample user data
  const userData = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=1",
      age: 28,
      department: "Engineering",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Developer",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=2",
      age: 32,
      department: "Engineering",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Designer",
      status: "inactive",
      avatar: "https://i.pravatar.cc/150?img=3",
      age: 26,
      department: "Design",
    },
    {
      id: 4,
      name: "Diana Prince",
      email: "diana@example.com",
      role: "Manager",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=4",
      age: 35,
      department: "Management",
    },
    {
      id: 5,
      name: "Eve Taylor",
      email: "eve@example.com",
      role: "Developer",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=5",
      age: 29,
      department: "Engineering",
    },
  ];

  // Sales data
  const salesData = [
    {
      id: 1,
      product: "Laptop",
      sales: 145,
      revenue: 145000,
      trend: "up",
      change: 12.5,
    },
    {
      id: 2,
      product: "Mouse",
      sales: 523,
      revenue: 15690,
      trend: "up",
      change: 8.3,
    },
    {
      id: 3,
      product: "Keyboard",
      sales: 342,
      revenue: 27360,
      trend: "down",
      change: -5.2,
    },
    {
      id: 4,
      product: "Monitor",
      sales: 234,
      revenue: 70200,
      trend: "up",
      change: 15.7,
    },
    {
      id: 5,
      product: "Headphones",
      sales: 456,
      revenue: 45600,
      trend: "down",
      change: -3.1,
    },
  ];

  // User table columns
  const userColumns = [
    {
      id: "user",
      header: "User",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} alt={row.name} size="sm" />
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
      sortable: true,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      id: "role",
      header: "Role",
      accessor: "role" as const,
      sortable: true,
    },
    {
      id: "department",
      header: "Department",
      accessor: "department" as const,
      sortable: true,
    },
    {
      id: "age",
      header: "Age",
      accessor: "age" as const,
      align: "right" as const,
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      cell: (row: any) => (
        <Badge variant={row.status === "active" ? "success" : "warning"} dot>
          {row.status}
        </Badge>
      ),
      align: "center" as const,
    },
  ];

  // Sales table columns
  const salesColumns = [
    {
      id: "product",
      header: "Product",
      accessor: "product" as const,
      sortable: true,
    },
    {
      id: "sales",
      header: "Units Sold",
      accessor: "sales" as const,
      align: "right" as const,
      sortable: true,
    },
    {
      id: "revenue",
      header: "Revenue",
      accessor: "revenue" as const,
      align: "right" as const,
      cell: (row: any) => `$${row.revenue.toLocaleString()}`,
      sortable: true,
    },
    {
      id: "change",
      header: "Change",
      align: "right" as const,
      cell: (row: any) => (
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
      sortFn: (a: any, b: any) => a.change - b.change,
    },
  ];

  // Simple contact data
  const contactData = [
    { id: 1, name: "John Doe", phone: "+1 234 567 8900", location: "New York" },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+1 234 567 8901",
      location: "Los Angeles",
    },
    {
      id: 3,
      name: "Mike Johnson",
      phone: "+1 234 567 8902",
      location: "Chicago",
    },
  ];

  const contactColumns = [
    {
      id: "name",
      header: "Name",
      accessor: "name" as const,
    },
    {
      id: "phone",
      header: "Phone",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          {row.phone}
        </div>
      ),
    },
    {
      id: "location",
      header: "Location",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          {row.location}
        </div>
      ),
    },
  ];

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Table Component</h3>

      {/* Basic Table */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Basic Table</h4>
        <Table columns={contactColumns} data={contactData} />
      </div>

      {/* With Sorting */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Sortable Table with Complex Cells
        </h4>
        <Table columns={userColumns} data={userData} sortable hoverable />
      </div>

      {/* Glass Variant */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Glass Variant with Sales Data
        </h4>
        <Table
          columns={salesColumns}
          data={salesData}
          variant="glass"
          sortable
          caption="Q4 2024 Sales Performance"
        />
      </div>

      {/* Striped Rows */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Striped Rows - Bordered
        </h4>
        <Table
          columns={userColumns}
          data={userData}
          variant="bordered"
          striped
          density="comfortable"
        />
      </div>

      {/* Compact Size */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Compact Density - Small Size
        </h4>
        <Table
          columns={contactColumns}
          data={contactData}
          size="sm"
          density="compact"
          variant="minimal"
        />
      </div>

      {/* With Selection */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Selectable Rows
        </h4>
        <Table
          columns={userColumns}
          data={userData}
          selectable
          selectedRows={[1, 3]}
          onRowSelect={(selected) => console.log("Selected rows:", selected)}
          variant="bordered"
        />
      </div>

      {/* Loading State */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Loading State</h4>
        <Table columns={contactColumns} data={[]} loading />
      </div>

      {/* Empty State */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Empty State</h4>
        <Table
          columns={contactColumns}
          data={[]}
          emptyMessage={
            <div className="flex flex-col items-center gap-2">
              <Mail className="w-12 h-12 text-muted-foreground" />
              <p className="font-semibold">No contacts found</p>
              <p className="text-sm text-muted-foreground">
                Add your first contact to get started
              </p>
            </div>
          }
        />
      </div>

      {/* Sticky Header with Max Height */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Sticky Header with Scroll
        </h4>
        <Table
          columns={userColumns}
          data={[...userData, ...userData, ...userData]} // Triple the data
          stickyHeader
          maxHeight="400px"
          variant="glass"
        />
      </div>

      {/* Clickable Rows */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Clickable Rows</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Click on any row to see the data in console
        </p>
        <Table
          columns={salesColumns}
          data={salesData}
          onRowClick={(row) => alert(`Clicked: ${row.product}`)}
          variant="bordered"
          hoverable
        />
      </div>

      {/* Custom Row Styling */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Custom Row Styling
        </h4>
        <Table
          columns={salesColumns}
          data={salesData}
          rowClassName={(row: any) =>
            row.trend === "down" ? "bg-destructive/5" : "bg-success/5"
          }
          variant="minimal"
        />
      </div>
    </div>
  );
};
