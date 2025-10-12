import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
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
            <Breadcrumb variant="default">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/products/electronics">
                Electronics
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage>Laptops</BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="glass p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Pills</p>
            <Breadcrumb variant="pills">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/products/electronics">
                Electronics
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage>Laptops</BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="glass p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Bordered</p>
            <Breadcrumb variant="bordered">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage>Laptops</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* With Icons */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Icons</h4>
        <div className="space-y-4">
          <div className="glass p-4 rounded-lg">
            <Breadcrumb variant="ghost">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/shop" icon={<ShoppingCart size={14} />}>
                Shop
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage icon={<ShoppingCart size={14} />}>
                Cart
              </BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="glass p-4 rounded-lg">
            <Breadcrumb variant="bordered">
              <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/docs" icon={<FileText size={14} />}>
                Documents
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage icon={<Settings size={14} />}>
                Settings
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* Different Separators */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Separator Types
        </h4>
        <div className="space-y-4">
          <div className="glass p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Chevron (Default)
            </p>
            <Breadcrumb separator="chevron">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage>Electronics</BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="glass p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Slash</p>
            <Breadcrumb separator="slash">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage>Electronics</BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="glass p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Dot</p>
            <Breadcrumb separator="dot">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage>Electronics</BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="glass p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Arrow</p>
            <Breadcrumb separator="arrow">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage>Electronics</BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="glass p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Custom Separator
            </p>
            <Breadcrumb>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator>→</BreadcrumbSeparator>
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbSeparator>→</BreadcrumbSeparator>
              <BreadcrumbItem isCurrentPage>Electronics</BreadcrumbItem>
            </Breadcrumb>
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
            <Breadcrumb variant="ghost" size="sm">
              <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage>Saha UI</BreadcrumbItem>
            </Breadcrumb>
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
