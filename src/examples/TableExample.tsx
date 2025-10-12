import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/Table";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { Phone, MapPin, TrendingUp, TrendingDown } from "lucide-react";

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

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Table Component</h3>

      {/* Basic Table */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Basic Table</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contactData.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {contact.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {contact.location}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User Table with Complex Cells */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Table with Complex Cells
        </h4>
        <Table variant="bordered" hoverable>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead align="right">Age</TableHead>
              <TableHead align="center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} alt={user.name} size="sm" />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell align="right">{user.age}</TableCell>
                <TableCell align="center">
                  <Badge
                    variant={user.status === "active" ? "success" : "warning"}
                    dot
                  >
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Glass Variant with Sales Data */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Glass Variant with Sales Data
        </h4>
        <Table variant="glass">
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead align="right">Units Sold</TableHead>
              <TableHead align="right">Revenue</TableHead>
              <TableHead align="right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.product}</TableCell>
                <TableCell align="right">{sale.sales}</TableCell>
                <TableCell align="right">
                  ${sale.revenue.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <div className="flex items-center justify-end gap-1">
                    {sale.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span
                      className={
                        sale.trend === "up"
                          ? "text-success"
                          : "text-destructive"
                      }
                    >
                      {sale.change > 0 ? "+" : ""}
                      {sale.change}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Striped Rows */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Striped Rows - Bordered
        </h4>
        <Table variant="bordered" striped density="comfortable">
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead align="right">Age</TableHead>
              <TableHead align="center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} alt={user.name} size="sm" />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell align="right">{user.age}</TableCell>
                <TableCell align="center">
                  <Badge
                    variant={user.status === "active" ? "success" : "warning"}
                    dot
                  >
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Compact Size */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Compact Density - Minimal Variant
        </h4>
        <Table size="sm" density="compact" variant="minimal">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contactData.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {contact.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {contact.location}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Sticky Header with Scroll */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Sticky Header with Scroll
        </h4>
        <Table variant="glass" className="max-h-[400px] overflow-auto">
          <TableHeader sticky>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead align="right">Age</TableHead>
              <TableHead align="center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...userData, ...userData, ...userData].map((user, index) => (
              <TableRow key={`${user.id}-${index}`}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} alt={user.name} size="sm" />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell align="right">{user.age}</TableCell>
                <TableCell align="center">
                  <Badge
                    variant={user.status === "active" ? "success" : "warning"}
                    dot
                  >
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
