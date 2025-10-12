import {
  Breadcrumb,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../index";
import { ShoppingCart, FileText, Settings } from "lucide-react";

export const BreadcrumbExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">
        Breadcrumb Component
      </h3>

      {/* Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="space-y-4">
          <div className="glass p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Default</p>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Electronics", href: "/products/electronics" },
                { label: "Laptops", isCurrentPage: true },
              ]}
              variant="default"
            />
          </div>

          <div className="glass p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Pills</p>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Electronics", href: "/products/electronics" },
                { label: "Laptops", isCurrentPage: true },
              ]}
              variant="pills"
            />
          </div>

          <div className="glass p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Bordered</p>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Laptops", isCurrentPage: true },
              ]}
              variant="bordered"
            />
          </div>
        </div>
      </div>

      {/* With Icons */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Icons</h4>
        <div className="space-y-4">
          <div className="glass p-4 rounded-lg">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                {
                  label: "Shop",
                  href: "/shop",
                  icon: <ShoppingCart size={14} />,
                },
                {
                  label: "Cart",
                  isCurrentPage: true,
                  icon: <ShoppingCart size={14} />,
                },
              ]}
              variant="ghost"
            />
          </div>

          <div className="glass p-4 rounded-lg">
            <Breadcrumb
              items={[
                { label: "Dashboard", href: "/" },
                {
                  label: "Documents",
                  href: "/docs",
                  icon: <FileText size={14} />,
                },
                {
                  label: "Settings",
                  isCurrentPage: true,
                  icon: <Settings size={14} />,
                },
              ]}
              variant="bordered"
            />
          </div>
        </div>
      </div>

      {/* Contextual Usage */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Contextual Usage
        </h4>
        <Card variant="glass" padding="lg">
          <CardHeader>
            <Breadcrumb
              items={[
                { label: "Dashboard", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: "Saha UI", isCurrentPage: true },
              ]}
              variant="ghost"
              size="sm"
            />
          </CardHeader>
          <CardTitle>Project: Saha UI</CardTitle>
          <CardDescription>
            A modern React component library with glassmorphism effects
          </CardDescription>
          <CardContent className="mt-4">
            <p className="text-sm text-text-secondary">
              This breadcrumb navigation helps users understand their current
              location within the application hierarchy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
