import "./App.css";
import ThemeProvider from "./components/ThemeProvider";

import ThemeToggle from "./components/ThemeToggle";
import Badge from "./components/Badge";
import Breadcrumb from "./components/Breadcrumb";
import Button from "./components/Button";
import ButtonGroup from "./components/ButtonGroup";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/Card";
import Accordion from "./components/Accordion";
import Alert from "./components/Alert";
import Avatar from "./components/Avatar";
import AvatarGroup from "./components/AvatarGroup";
import Carousel from "./components/Carousel";
import { Chip } from "./components/Chip";
import Divider from "./components/Divider";
import Image from "./components/Image";
import Link from "./components/Link";
import List from "./components/List";
import ListItem from "./components/List/ListItem";
import Timeline from "./components/Timeline";
import Tooltip from "./components/Tooltip";
import {
  Sparkles,
  Zap,
  Heart,
  Star,
  Mail,
  User,
  Bell,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
  FileText,
  Settings,
  Filter,
  Rocket,
  Code,
  Package,
  GitBranch,
  CloudUpload,
} from "lucide-react";

// Color palette component that uses theme colors from CSS variables
const ColorPalette = () => {
  const colors = [
    { name: "Primary", var: "--primary", fg: "--primary-foreground" },
    { name: "Secondary", var: "--secondary", fg: "--secondary-foreground" },
    { name: "Accent", var: "--accent", fg: "--accent-foreground" },
    { name: "Success", var: "--success", fg: "--success-foreground" },
    { name: "Warning", var: "--warning", fg: "--warning-foreground" },
    { name: "Error", var: "--error", fg: "--error-foreground" },
    { name: "Info", var: "--info", fg: "--info-foreground" },
    { name: "Muted", var: "--muted", fg: "--muted-foreground" },
    { name: "Card", var: "--card", fg: "--card-foreground" },
    { name: "Popover", var: "--popover", fg: "--popover-foreground" },
    { name: "Border", var: "--border", fg: "--foreground" },
    { name: "Ring", var: "--ring", fg: "--foreground" },
  ];

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6">Color Palette</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map(({ name, var: colorVar, fg }) => (
          <div key={name} className="glass p-4 rounded-lg">
            <div
              className="w-full h-16 rounded-md mb-2 flex items-center justify-center text-sm font-medium shadow-sm"
              style={{
                backgroundColor: `var(${colorVar})`,
                color: `var(${fg})`,
              }}
            >
              {name}
            </div>
            <p className="text-xs font-mono opacity-70">{colorVar}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300">
        {/* Header */}
        <header className="glass sticky top-0 z-50 border-b border-border/50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary" size={28} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Saha UI
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Modern React Component Library
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Beautiful, accessible components with glassmorphism effects for
              both light and dark modes
            </p>
          </div>

          {/* Buttons Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">
              Button Variants
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">
                <Zap size={18} />
                Primary
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="error">Error</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="glass">
                <Sparkles size={18} />
                Glass Effect
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Button size="sm" variant="primary">
                Small
              </Button>
              <Button size="md" variant="secondary">
                Medium
              </Button>
              <Button size="lg" variant="accent">
                Large
              </Button>
              <Button size="xl" variant="success">
                Extra Large
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Button variant="primary">
                <Heart size={18} />
                Rounded
              </Button>
              <Button variant="glass">Full Width Glass Button</Button>
            </div>
          </div>

          {/* ButtonGroup Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">
              Button Group Component
            </h3>

            {/* Horizontal Button Groups */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Horizontal Groups
              </h4>
              <div className="space-y-4">
                {/* Default attached group */}
                <ButtonGroup>
                  <Button variant="primary">Left</Button>
                  <Button variant="primary">Center</Button>
                  <Button variant="primary">Right</Button>
                </ButtonGroup>

                {/* Outline variant */}
                <ButtonGroup variant="outline">
                  <Button variant="ghost">Save</Button>
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="ghost">Delete</Button>
                </ButtonGroup>

                {/* Glass variant */}
                <ButtonGroup variant="glass">
                  <Button variant="glass">
                    <Star size={16} />
                    Featured
                  </Button>
                  <Button variant="glass">
                    <Heart size={16} />
                    Favorite
                  </Button>
                  <Button variant="glass">
                    <Mail size={16} />
                    Share
                  </Button>
                </ButtonGroup>

                {/* Full rounded */}
                <ButtonGroup fullRounded>
                  <Button variant="secondary">First</Button>
                  <Button variant="secondary">Second</Button>
                  <Button variant="secondary">Third</Button>
                </ButtonGroup>
              </div>
            </div>

            {/* Vertical Button Groups */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Vertical Groups
              </h4>
              <div className="flex flex-wrap gap-4">
                <ButtonGroup orientation="vertical">
                  <Button variant="accent">Top</Button>
                  <Button variant="accent">Middle</Button>
                  <Button variant="accent">Bottom</Button>
                </ButtonGroup>

                <ButtonGroup orientation="vertical" variant="outline">
                  <Button variant="ghost">
                    <User size={16} />
                    Profile
                  </Button>
                  <Button variant="ghost">
                    <Bell size={16} />
                    Notifications
                  </Button>
                  <Button variant="ghost">
                    <Mail size={16} />
                    Messages
                  </Button>
                </ButtonGroup>
              </div>
            </div>

            {/* Sizes and Full Width */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Sizes & Full Width
              </h4>
              <div className="space-y-4">
                {/* Small size */}
                <ButtonGroup size="sm">
                  <Button variant="primary">Small</Button>
                  <Button variant="primary">Size</Button>
                  <Button variant="primary">Group</Button>
                </ButtonGroup>

                {/* Large size */}
                <ButtonGroup size="lg">
                  <Button variant="success">Large</Button>
                  <Button variant="success">Size</Button>
                  <Button variant="success">Group</Button>
                </ButtonGroup>

                {/* Full width */}
                <ButtonGroup fullWidth>
                  <Button variant="warning">Equal</Button>
                  <Button variant="warning">Width</Button>
                  <Button variant="warning">Buttons</Button>
                </ButtonGroup>
              </div>
            </div>

            {/* Detached Buttons */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Detached Groups (with gaps)
              </h4>
              <div className="space-y-4">
                <ButtonGroup attached={false}>
                  <Button variant="primary">Accept</Button>
                  <Button variant="ghost">Decline</Button>
                </ButtonGroup>

                <ButtonGroup attached={false} variant="glass">
                  <Button variant="glass">Option 1</Button>
                  <Button variant="glass">Option 2</Button>
                  <Button variant="glass">Option 3</Button>
                </ButtonGroup>
              </div>
            </div>

            {/* Mixed Button Variants */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Contextual Usage
              </h4>
              <Card variant="glass-strong" padding="lg" className="max-w-md">
                <CardHeader>
                  <CardTitle>Confirm Action</CardTitle>
                  <CardDescription>
                    Are you sure you want to proceed?
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <ButtonGroup fullWidth>
                    <Button variant="error">Delete</Button>
                    <Button variant="ghost">Cancel</Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Breadcrumb Showcase */}
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
                  <p className="text-sm text-muted-foreground mb-2">Ghost</p>
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Products", href: "/products" },
                      { label: "Electronics", href: "/products/electronics" },
                      { label: "Laptops", isCurrentPage: true },
                    ]}
                    variant="ghost"
                  />
                </div>

                <div className="glass p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Bordered</p>
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Products", href: "/products" },
                      { label: "Electronics", href: "/products/electronics" },
                      { label: "Laptops", isCurrentPage: true },
                    ]}
                    variant="bordered"
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
                  <p className="text-sm text-muted-foreground mb-2">
                    Underline
                  </p>
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Products", href: "/products" },
                      { label: "Electronics", href: "/products/electronics" },
                      { label: "Laptops", isCurrentPage: true },
                    ]}
                    variant="underline"
                  />
                </div>
              </div>
            </div>

            {/* Separators */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Separator Styles
              </h4>
              <div className="space-y-4">
                <div className="glass p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Chevron (default)
                  </p>
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Docs", href: "/docs" },
                      { label: "Components", isCurrentPage: true },
                    ]}
                    separator="chevron"
                  />
                </div>

                <div className="glass p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Slash</p>
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Docs", href: "/docs" },
                      { label: "Components", isCurrentPage: true },
                    ]}
                    separator="slash"
                  />
                </div>

                <div className="glass p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Dot</p>
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Docs", href: "/docs" },
                      { label: "Components", isCurrentPage: true },
                    ]}
                    separator="dot"
                  />
                </div>

                <div className="glass p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Arrow</p>
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Docs", href: "/docs" },
                      { label: "Components", isCurrentPage: true },
                    ]}
                    separator="arrow"
                  />
                </div>

                <div className="glass p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Custom Separator
                  </p>
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Docs", href: "/docs" },
                      { label: "Components", isCurrentPage: true },
                    ]}
                    customSeparator={<span className="text-primary">→</span>}
                  />
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
              <div className="space-y-4">
                <div className="glass p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Small</p>
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Products", href: "/products" },
                      { label: "Laptops", isCurrentPage: true },
                    ]}
                    size="sm"
                    variant="pills"
                  />
                </div>

                <div className="glass p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Medium (default)
                  </p>
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Products", href: "/products" },
                      { label: "Laptops", isCurrentPage: true },
                    ]}
                    size="md"
                    variant="pills"
                  />
                </div>

                <div className="glass p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Large</p>
                  <Breadcrumb
                    items={[
                      { label: "Home", href: "/" },
                      { label: "Products", href: "/products" },
                      { label: "Laptops", isCurrentPage: true },
                    ]}
                    size="lg"
                    variant="pills"
                  />
                </div>
              </div>
            </div>

            {/* With Icons */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                With Icons
              </h4>
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

            {/* Collapsed */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Collapsed (Max Items)
              </h4>
              <div className="glass p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Long breadcrumb collapsed to show only first and last 2 items
                </p>
                <Breadcrumb
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    {
                      label: "Electronics",
                      href: "/products/electronics",
                    },
                    {
                      label: "Computers",
                      href: "/products/electronics/computers",
                    },
                    {
                      label: "Laptops",
                      href: "/products/electronics/computers/laptops",
                    },
                    {
                      label: "Gaming",
                      href: "/products/electronics/computers/laptops/gaming",
                    },
                    { label: "High-End", isCurrentPage: true },
                  ]}
                  maxItems={4}
                  variant="pills"
                />
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
                    This breadcrumb navigation helps users understand their
                    current location within the application hierarchy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Badge Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">
              Badge Component
            </h3>

            {/* Badge Variants */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="glass">Glass</Badge>
              </div>
            </div>

            {/* Badge Sizes */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary" size="sm">
                  Small
                </Badge>
                <Badge variant="primary" size="md">
                  Medium
                </Badge>
                <Badge variant="primary" size="lg">
                  Large
                </Badge>
              </div>
            </div>

            {/* Badge Shapes */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Shapes</h4>
              <div className="flex flex-wrap gap-3">
                <Badge variant="primary" shape="rounded">
                  Rounded
                </Badge>
                <Badge variant="primary" shape="pill">
                  Pill
                </Badge>
                <Badge variant="primary" shape="square">
                  Square
                </Badge>
              </div>
            </div>

            {/* Badge with Dot */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                With Status Dot
              </h4>
              <div className="flex flex-wrap gap-3">
                <Badge variant="success" dot>
                  Online
                </Badge>
                <Badge variant="warning" dot>
                  Away
                </Badge>
                <Badge variant="error" dot>
                  Offline
                </Badge>
                <Badge variant="info" dot pulse>
                  Live
                </Badge>
              </div>
            </div>

            {/* Badge with Icons */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                With Icons
              </h4>
              <div className="flex flex-wrap gap-3">
                <Badge variant="primary" icon={<Star size={12} />}>
                  Featured
                </Badge>
                <Badge variant="success" icon={<CheckCircle size={12} />}>
                  Verified
                </Badge>
                <Badge variant="warning" icon={<AlertCircle size={12} />}>
                  Alert
                </Badge>
                <Badge variant="glass" icon={<Sparkles size={12} />}>
                  Premium
                </Badge>
              </div>
            </div>
          </div>

          {/* Divider Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">
              Divider Component
            </h3>

            {/* Variants */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
              <div className="space-y-6">
                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">Solid</p>
                  <Divider variant="solid" />
                </div>

                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">Dashed</p>
                  <Divider variant="dashed" />
                </div>

                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">Dotted</p>
                  <Divider variant="dotted" />
                </div>

                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">Gradient</p>
                  <Divider variant="gradient" />
                </div>

                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">Glass</p>
                  <Divider variant="glass" />
                </div>
              </div>
            </div>

            {/* With Labels */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                With Labels
              </h4>
              <div className="space-y-6">
                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">
                    Center Label
                  </p>
                  <Divider label="OR" variant="gradient" />
                </div>

                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">
                    Left Label
                  </p>
                  <Divider label="Section Start" labelPosition="left" />
                </div>

                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">
                    Right Label
                  </p>
                  <Divider label="Section End" labelPosition="right" />
                </div>

                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">
                    Decorative
                  </p>
                  <Divider
                    label="Continue Reading"
                    variant="gradient"
                    decorative
                  />
                </div>
              </div>
            </div>

            {/* Thickness */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Thickness
              </h4>
              <div className="space-y-6">
                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">Thin</p>
                  <Divider thickness="thin" variant="solid" />
                </div>

                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">Medium</p>
                  <Divider thickness="medium" variant="solid" />
                </div>

                <div className="glass p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">Thick</p>
                  <Divider thickness="thick" variant="gradient" />
                </div>
              </div>
            </div>

            {/* Spacing */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Spacing</h4>
              <div className="glass p-6 rounded-lg space-y-1">
                <p className="text-sm">Content above</p>
                <Divider spacing="xs" />
                <p className="text-sm">Extra Small Spacing (xs)</p>
                <Divider spacing="sm" />
                <p className="text-sm">Small Spacing (sm)</p>
                <Divider spacing="md" />
                <p className="text-sm">Medium Spacing (md)</p>
                <Divider spacing="lg" />
                <p className="text-sm">Large Spacing (lg)</p>
                <Divider spacing="xl" />
                <p className="text-sm">Extra Large Spacing (xl)</p>
              </div>
            </div>

            {/* Vertical Dividers */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Vertical Orientation
              </h4>
              <div className="glass p-6 rounded-lg">
                <div className="flex items-center h-24 gap-4">
                  <div className="text-sm text-center flex-1">Section 1</div>
                  <Divider orientation="vertical" className="h-full" />
                  <div className="text-sm text-center flex-1">Section 2</div>
                  <Divider
                    orientation="vertical"
                    variant="gradient"
                    className="h-full"
                  />
                  <div className="text-sm text-center flex-1">Section 3</div>
                  <Divider
                    orientation="vertical"
                    variant="dashed"
                    thickness="medium"
                    className="h-full"
                  />
                  <div className="text-sm text-center flex-1">Section 4</div>
                </div>
              </div>

              <div className="glass p-6 rounded-lg mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Vertical with Label
                </p>
                <div className="flex items-center h-32">
                  <div className="flex-1 text-center">
                    <p className="font-medium">Before</p>
                    <p className="text-sm text-muted-foreground">Content</p>
                  </div>
                  <Divider
                    orientation="vertical"
                    label="OR"
                    variant="glass"
                    className="h-full"
                  />
                  <div className="flex-1 text-center">
                    <p className="font-medium">After</p>
                    <p className="text-sm text-muted-foreground">Content</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contextual Usage */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Contextual Usage
              </h4>

              {/* In Form */}
              <Card variant="glass" padding="lg" className="mb-4">
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to continue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="primary" className="w-full">
                      Sign in with Email
                    </Button>

                    <Divider label="OR" variant="gradient" spacing="sm" />

                    <ButtonGroup fullWidth orientation="vertical">
                      <Button variant="outline">
                        <User size={16} /> Continue with GitHub
                      </Button>
                      <Button variant="outline">
                        <Mail size={16} /> Continue with Google
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Content Sections */}
              <Card variant="bordered" padding="lg">
                <CardHeader>
                  <CardTitle>Article</CardTitle>
                  <CardDescription>Sample content layout</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-text-secondary">
                      This is the first paragraph of the article. It introduces
                      the main topic and sets the context.
                    </p>

                    <Divider
                      label="Section 1"
                      labelPosition="left"
                      variant="dashed"
                      spacing="lg"
                    />

                    <p className="text-sm text-text-secondary">
                      This section contains the main content. It provides
                      detailed information about the topic.
                    </p>

                    <Divider
                      label="Section 2"
                      labelPosition="left"
                      variant="dashed"
                      spacing="lg"
                    />

                    <p className="text-sm text-text-secondary">
                      The final section summarizes the key points and provides
                      conclusions.
                    </p>

                    <Divider decorative spacing="lg" variant="gradient" />

                    <p className="text-sm text-muted-foreground text-center">
                      End of Article
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Chip Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">
              Chip Component
            </h3>

            {/* Variants */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
              <div className="flex flex-wrap gap-3">
                <Chip variant="filled" color="primary">
                  Filled
                </Chip>
                <Chip variant="outlined" color="primary">
                  Outlined
                </Chip>
                <Chip variant="soft" color="primary">
                  Soft
                </Chip>
                <Chip variant="gradient" color="primary">
                  Gradient
                </Chip>
                <Chip variant="glass" color="primary">
                  Glass
                </Chip>
              </div>
            </div>

            {/* Colors */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Colors</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Filled</p>
                  <div className="flex flex-wrap gap-2">
                    <Chip variant="filled" color="default">
                      Default
                    </Chip>
                    <Chip variant="filled" color="primary">
                      Primary
                    </Chip>
                    <Chip variant="filled" color="secondary">
                      Secondary
                    </Chip>
                    <Chip variant="filled" color="success">
                      Success
                    </Chip>
                    <Chip variant="filled" color="warning">
                      Warning
                    </Chip>
                    <Chip variant="filled" color="error">
                      Error
                    </Chip>
                    <Chip variant="filled" color="info">
                      Info
                    </Chip>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Outlined</p>
                  <div className="flex flex-wrap gap-2">
                    <Chip variant="outlined" color="default">
                      Default
                    </Chip>
                    <Chip variant="outlined" color="primary">
                      Primary
                    </Chip>
                    <Chip variant="outlined" color="secondary">
                      Secondary
                    </Chip>
                    <Chip variant="outlined" color="success">
                      Success
                    </Chip>
                    <Chip variant="outlined" color="warning">
                      Warning
                    </Chip>
                    <Chip variant="outlined" color="error">
                      Error
                    </Chip>
                    <Chip variant="outlined" color="info">
                      Info
                    </Chip>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Soft</p>
                  <div className="flex flex-wrap gap-2">
                    <Chip variant="soft" color="default">
                      Default
                    </Chip>
                    <Chip variant="soft" color="primary">
                      Primary
                    </Chip>
                    <Chip variant="soft" color="secondary">
                      Secondary
                    </Chip>
                    <Chip variant="soft" color="success">
                      Success
                    </Chip>
                    <Chip variant="soft" color="warning">
                      Warning
                    </Chip>
                    <Chip variant="soft" color="error">
                      Error
                    </Chip>
                    <Chip variant="soft" color="info">
                      Info
                    </Chip>
                  </div>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
              <div className="flex items-center flex-wrap gap-3">
                <Chip size="sm" color="primary">
                  Small
                </Chip>
                <Chip size="md" color="primary">
                  Medium
                </Chip>
                <Chip size="lg" color="primary">
                  Large
                </Chip>
              </div>
            </div>

            {/* With Icons */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                With Icons
              </h4>
              <div className="flex flex-wrap gap-3">
                <Chip icon={<Star size={14} />} color="warning" variant="soft">
                  Featured
                </Chip>
                <Chip icon={<Heart size={14} />} color="error" variant="filled">
                  Favorite
                </Chip>
                <Chip icon={<Zap size={14} />} color="info" variant="gradient">
                  Powered
                </Chip>
                <Chip
                  icon={<Sparkles size={14} />}
                  color="primary"
                  variant="glass"
                >
                  Premium
                </Chip>
              </div>
            </div>

            {/* With Avatars */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                With Avatars
              </h4>
              <div className="flex flex-wrap gap-3">
                <Chip
                  avatar={
                    <Avatar size="xs" name="John Doe" className="w-5 h-5" />
                  }
                  variant="soft"
                  color="primary"
                >
                  John Doe
                </Chip>
                <Chip
                  avatar={
                    <Avatar size="xs" name="Jane Smith" className="w-5 h-5" />
                  }
                  variant="outlined"
                  color="secondary"
                >
                  Jane Smith
                </Chip>
                <Chip
                  avatar={
                    <Avatar size="xs" name="Bob Wilson" className="w-5 h-5" />
                  }
                  variant="filled"
                  color="success"
                >
                  Bob Wilson
                </Chip>
              </div>
            </div>

            {/* Deletable Chips */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Deletable Chips
              </h4>
              <div className="flex flex-wrap gap-3">
                <Chip
                  deletable
                  onDelete={() => console.log("Deleted React")}
                  color="primary"
                  variant="soft"
                >
                  React
                </Chip>
                <Chip
                  deletable
                  onDelete={() => console.log("Deleted TypeScript")}
                  color="info"
                  variant="soft"
                >
                  TypeScript
                </Chip>
                <Chip
                  deletable
                  onDelete={() => console.log("Deleted JavaScript")}
                  color="warning"
                  variant="soft"
                >
                  JavaScript
                </Chip>
                <Chip
                  deletable
                  onDelete={() => console.log("Deleted CSS")}
                  color="error"
                  variant="soft"
                >
                  CSS
                </Chip>
                <Chip
                  deletable
                  onDelete={() => console.log("Deleted HTML")}
                  color="success"
                  variant="soft"
                >
                  HTML
                </Chip>
              </div>
            </div>

            {/* Clickable Chips */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Clickable & Interactive
              </h4>
              <div className="flex flex-wrap gap-3">
                <Chip
                  clickable
                  onClick={() => alert("Clicked!")}
                  color="primary"
                  variant="outlined"
                >
                  Click Me
                </Chip>
                <Chip
                  clickable
                  onClick={() => alert("Filter activated")}
                  color="info"
                  variant="soft"
                  icon={<Filter size={14} />}
                >
                  Filter
                </Chip>
                <Chip
                  clickable
                  deletable
                  onClick={() => alert("Clicked tag")}
                  onDelete={() => console.log("Deleted tag")}
                  color="secondary"
                  variant="filled"
                >
                  Interactive Tag
                </Chip>
              </div>
            </div>

            {/* Disabled State */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Disabled State
              </h4>
              <div className="flex flex-wrap gap-3">
                <Chip disabled color="primary" variant="filled">
                  Disabled
                </Chip>
                <Chip disabled deletable color="success" variant="soft">
                  Can't Delete
                </Chip>
                <Chip
                  disabled
                  clickable
                  onClick={() => alert("Won't fire")}
                  color="error"
                  variant="outlined"
                >
                  Can't Click
                </Chip>
              </div>
            </div>

            {/* Real-World Usage */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Real-World Usage
              </h4>

              <Card variant="glass" padding="lg" className="mb-4">
                <CardHeader>
                  <CardTitle>Skills & Tags</CardTitle>
                  <CardDescription>
                    Manage your technology stack
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Frontend</p>
                      <div className="flex flex-wrap gap-2">
                        <Chip
                          deletable
                          onDelete={() => console.log("Removed")}
                          color="info"
                          variant="soft"
                        >
                          React
                        </Chip>
                        <Chip
                          deletable
                          onDelete={() => console.log("Removed")}
                          color="info"
                          variant="soft"
                        >
                          Vue
                        </Chip>
                        <Chip
                          deletable
                          onDelete={() => console.log("Removed")}
                          color="info"
                          variant="soft"
                        >
                          Angular
                        </Chip>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Backend</p>
                      <div className="flex flex-wrap gap-2">
                        <Chip
                          deletable
                          onDelete={() => console.log("Removed")}
                          color="success"
                          variant="soft"
                        >
                          Node.js
                        </Chip>
                        <Chip
                          deletable
                          onDelete={() => console.log("Removed")}
                          color="success"
                          variant="soft"
                        >
                          Python
                        </Chip>
                        <Chip
                          deletable
                          onDelete={() => console.log("Removed")}
                          color="success"
                          variant="soft"
                        >
                          Go
                        </Chip>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Team Members</p>
                      <div className="flex flex-wrap gap-2">
                        <Chip
                          avatar={
                            <Avatar
                              size="xs"
                              name="Alice"
                              className="w-5 h-5"
                            />
                          }
                          deletable
                          onDelete={() => console.log("Removed member")}
                          variant="outlined"
                          color="primary"
                        >
                          Alice
                        </Chip>
                        <Chip
                          avatar={
                            <Avatar size="xs" name="Bob" className="w-5 h-5" />
                          }
                          deletable
                          onDelete={() => console.log("Removed member")}
                          variant="outlined"
                          color="primary"
                        >
                          Bob
                        </Chip>
                        <Chip
                          avatar={
                            <Avatar
                              size="xs"
                              name="Carol"
                              className="w-5 h-5"
                            />
                          }
                          deletable
                          onDelete={() => console.log("Removed member")}
                          variant="outlined"
                          color="primary"
                        >
                          Carol
                        </Chip>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="bordered" padding="lg">
                <CardHeader>
                  <CardTitle>Filter Options</CardTitle>
                  <CardDescription>
                    Click chips to toggle filters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Chip
                      clickable
                      onClick={() => console.log("All selected")}
                      color="default"
                      variant="filled"
                    >
                      All
                    </Chip>
                    <Chip
                      clickable
                      onClick={() => console.log("Active filter")}
                      color="success"
                      variant="outlined"
                    >
                      Active
                    </Chip>
                    <Chip
                      clickable
                      onClick={() => console.log("Pending filter")}
                      color="warning"
                      variant="outlined"
                    >
                      Pending
                    </Chip>
                    <Chip
                      clickable
                      onClick={() => console.log("Completed filter")}
                      color="info"
                      variant="outlined"
                    >
                      Completed
                    </Chip>
                    <Chip
                      clickable
                      onClick={() => console.log("Archived filter")}
                      color="default"
                      variant="outlined"
                    >
                      Archived
                    </Chip>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Cards Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">Card Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card variant="default" hoverable>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>A standard card with shadow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    This is a default card with a clean, modern design.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" size="sm">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="glass" hoverable>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-primary" size={24} />
                    <CardTitle>Glass Card</CardTitle>
                  </div>
                  <CardDescription>
                    Beautiful glassmorphism effect
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    Features a modern glass effect with backdrop blur.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="glass" size="sm">
                    Explore
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="glass-strong" hoverable>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="text-accent" size={24} />
                    <CardTitle>Strong Glass</CardTitle>
                  </div>
                  <CardDescription>Enhanced glass effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    A stronger glass effect with more blur.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="accent" size="sm">
                    <Star size={16} />
                    View
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="glass-subtle" hoverable>
                <CardHeader>
                  <CardTitle>Subtle Glass</CardTitle>
                  <CardDescription>Lighter glass effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    A more subtle glass effect for delicate designs.
                  </p>
                </CardContent>
              </Card>

              <Card variant="bordered" hoverable>
                <CardHeader>
                  <CardTitle>Bordered Card</CardTitle>
                  <CardDescription>Card with border accent</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    Clean bordered design for a different look.
                  </p>
                </CardContent>
              </Card>

              <Card variant="default" padding="xl" hoverable>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Heart className="text-error" size={24} />
                    <CardTitle>Extra Padding</CardTitle>
                  </div>
                  <CardDescription>More spacious layout</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    This card has extra padding for a more spacious feel.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Alerts Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Alert Variants</h3>
            <div className="space-y-4">
              <Alert
                variant="solid"
                status="info"
                title="Information"
                message="This is an informational alert with helpful details."
                closeable={false}
              />
              <Alert
                variant="left-accent"
                status="success"
                title="Success"
                message="Your action was completed successfully!"
                closeable={false}
              />
              <Alert
                variant="subtle"
                status="warning"
                title="Warning"
                message="Please review this warning before proceeding."
                closeable={false}
              />
              <Alert
                variant="outline"
                status="danger"
                title="Error"
                message="An error occurred. Please try again."
                closeable={true}
              />
            </div>
          </div>

          {/* Accordion Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Accordion</h3>
            <Accordion
              variant="default"
              items={[
                {
                  title: "What is Saha UI?",
                  content:
                    "Saha UI is a modern React component library built with TypeScript, Tailwind CSS, and featuring beautiful glassmorphism effects for both light and dark modes.",
                },
                {
                  title: "How do I install it?",
                  content:
                    "You can install Saha UI via npm or yarn. Simply run: npm install saha-ui or yarn add saha-ui",
                },
                {
                  title: "Is it customizable?",
                  content:
                    "Yes! All components are highly customizable with props and support both light and dark themes out of the box.",
                },
              ]}
            />
          </div>

          {/* Avatar & AvatarGroup Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Avatars</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Single Avatars</h4>
                <div className="flex gap-4 items-center flex-wrap">
                  <Avatar
                    src="https://i.pravatar.cc/150?img=1"
                    alt="User 1"
                    size="md"
                    shape="circle"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/150?img=2"
                    alt="User 2"
                    size="lg"
                    shape="circle"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/150?img=3"
                    alt="User 3"
                    size="xl"
                    shape="rounded"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/150?img=4"
                    alt="User 4"
                    size="2xl"
                    shape="square"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Avatar Group</h4>
                <AvatarGroup
                  avatars={[
                    {
                      src: "https://i.pravatar.cc/150?img=5",
                      alt: "User 5",
                    },
                    {
                      src: "https://i.pravatar.cc/150?img=6",
                      alt: "User 6",
                    },
                    {
                      src: "https://i.pravatar.cc/150?img=7",
                      alt: "User 7",
                    },
                    {
                      src: "https://i.pravatar.cc/150?img=8",
                      alt: "User 8",
                    },
                    {
                      src: "https://i.pravatar.cc/150?img=9",
                      alt: "User 9",
                    },
                  ]}
                  max={3}
                  size="2xl"
                  gap={false}
                />
              </div>
            </div>
          </div>

          {/* Tooltip Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Tooltips</h3>
            <div className="flex gap-4 flex-wrap">
              <Tooltip content="This is a tooltip" position="top">
                <Button variant="primary">
                  <User size={18} />
                  Hover Top
                </Button>
              </Tooltip>
              <Tooltip content="Tooltip on the right" position="right">
                <Button variant="secondary">
                  <Mail size={18} />
                  Hover Right
                </Button>
              </Tooltip>
              <Tooltip content="Tooltip at bottom" position="bottom">
                <Button variant="accent">
                  <Bell size={18} />
                  Hover Bottom
                </Button>
              </Tooltip>
              <Tooltip content="Tooltip on the left" position="left">
                <Button variant="success">
                  <Star size={18} />
                  Hover Left
                </Button>
              </Tooltip>
            </div>
          </div>

          {/* Link Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">
              Link Component
            </h3>

            {/* Link Variants */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
              <div className="flex flex-wrap gap-4">
                <Link variant="default" href="#">
                  Default Link
                </Link>
                <Link variant="primary" href="#">
                  Primary Link
                </Link>
                <Link variant="secondary" href="#">
                  Secondary Link
                </Link>
                <Link variant="accent" href="#">
                  Accent Link
                </Link>
                <Link variant="muted" href="#">
                  Muted Link
                </Link>
                <Link variant="underline" href="#">
                  Underlined Link
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <Link variant="ghost" href="#">
                  Ghost Link
                </Link>
                <Link variant="button" href="#">
                  Button Style Link
                </Link>
                <Link variant="glass" href="#">
                  Glass Link
                </Link>
              </div>
            </div>

            {/* Link Sizes */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
              <div className="flex flex-wrap gap-4 items-center">
                <Link variant="primary" size="sm" href="#">
                  Small Link
                </Link>
                <Link variant="primary" size="md" href="#">
                  Medium Link
                </Link>
                <Link variant="primary" size="lg" href="#">
                  Large Link
                </Link>
              </div>
            </div>

            {/* External Links */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                External Links (with icon)
              </h4>
              <div className="flex flex-wrap gap-4">
                <Link variant="primary" external href="https://github.com">
                  GitHub
                </Link>
                <Link variant="secondary" external href="https://npmjs.com">
                  npm
                </Link>
                <Link variant="button" external href="https://reactjs.org">
                  React Docs
                </Link>
                <Link variant="glass" external href="https://tailwindcss.com">
                  Tailwind CSS
                </Link>
              </div>
            </div>

            {/* Links with Icons */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Links with Custom Icons
              </h4>
              <div className="flex flex-wrap gap-4">
                <Link variant="primary" icon={<Star size={16} />} href="#">
                  Featured
                </Link>
                <Link variant="secondary" icon={<Heart size={16} />} href="#">
                  Favorites
                </Link>
                <Link variant="accent" icon={<Mail size={16} />} href="#">
                  Contact
                </Link>
                <Link variant="ghost" icon={<User size={16} />} href="#">
                  Profile
                </Link>
              </div>
            </div>

            {/* Animated Underline */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Custom Underline Animation
              </h4>
              <div className="flex flex-wrap gap-4">
                <Link variant="default" showUnderline href="#">
                  Hover to see animation
                </Link>
                <Link variant="muted" showUnderline href="#">
                  Muted with underline
                </Link>
                <Link variant="ghost" showUnderline href="#">
                  Ghost with underline
                </Link>
              </div>
            </div>

            {/* Disabled State */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Disabled State
              </h4>
              <div className="flex flex-wrap gap-4">
                <Link variant="primary" disabled href="#">
                  Disabled Primary
                </Link>
                <Link variant="button" disabled href="#">
                  Disabled Button
                </Link>
                <Link variant="glass" disabled href="#">
                  Disabled Glass
                </Link>
              </div>
            </div>

            {/* Contextual Usage */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Contextual Usage
              </h4>
              <Card variant="glass-strong" padding="lg" className="max-w-2xl">
                <CardHeader>
                  <CardTitle>Navigation Example</CardTitle>
                  <CardDescription>
                    Links integrated in a card component
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-4 flex-wrap">
                      <Link variant="primary" href="#docs">
                        Documentation
                      </Link>
                      <Link variant="secondary" href="#api">
                        API Reference
                      </Link>
                      <Link variant="accent" href="#examples">
                        Examples
                      </Link>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                      <Link
                        variant="ghost"
                        icon={<Star size={16} />}
                        external
                        href="https://github.com"
                      >
                        Star on GitHub
                      </Link>
                      <Link
                        variant="glass"
                        icon={<Mail size={16} />}
                        href="#contact"
                      >
                        Get in Touch
                      </Link>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <ButtonGroup>
                    <Link variant="button" href="#get-started">
                      Get Started
                    </Link>
                    <Link variant="ghost" href="#learn-more">
                      Learn More
                    </Link>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* List Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">
              List Component
            </h3>

            {/* List Variants */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                List Variants
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Default List */}
                <div>
                  <h5 className="text-sm font-medium mb-3 text-muted-foreground">
                    Default
                  </h5>
                  <List listType="disc" variant="default">
                    <li>Modern React components</li>
                    <li>TypeScript support</li>
                    <li>Tailwind CSS styling</li>
                    <li>Dark mode support</li>
                    <li>Glassmorphism effects</li>
                  </List>
                </div>

                {/* Bordered List */}
                <div>
                  <h5 className="text-sm font-medium mb-3 text-muted-foreground">
                    Bordered
                  </h5>
                  <List listType="disc" variant="bordered">
                    <li>Clean border design</li>
                    <li>Card background</li>
                    <li>Shadow on hover</li>
                    <li>Backdrop blur</li>
                    <li>Premium feel</li>
                  </List>
                </div>

                {/* Divided List */}
                <div>
                  <h5 className="text-sm font-medium mb-3 text-muted-foreground">
                    Divided
                  </h5>
                  <List listType="none" variant="divided">
                    <ListItem variant="divided">First item</ListItem>
                    <ListItem variant="divided">Second item</ListItem>
                    <ListItem variant="divided">Third item</ListItem>
                    <ListItem variant="divided">Fourth item</ListItem>
                  </List>
                </div>

                {/* Striped List */}
                <div>
                  <h5 className="text-sm font-medium mb-3 text-muted-foreground">
                    Striped
                  </h5>
                  <List listType="none" variant="striped">
                    <ListItem variant="striped">Striped item 1</ListItem>
                    <ListItem variant="striped">Striped item 2</ListItem>
                    <ListItem variant="striped">Striped item 3</ListItem>
                    <ListItem variant="striped">Striped item 4</ListItem>
                  </List>
                </div>
              </div>
            </div>

            {/* Cards Variant */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Cards Variant
              </h4>
              <List listType="none" variant="cards">
                <ListItem variant="cards" icon={<CheckCircle size={20} />}>
                  <strong>Modern Design</strong> - Beautiful glassmorphism
                  effects
                </ListItem>
                <ListItem variant="cards" icon={<Star size={20} />}>
                  <strong>Type Safe</strong> - Full TypeScript support
                </ListItem>
                <ListItem variant="cards" icon={<Zap size={20} />}>
                  <strong>Fast Performance</strong> - Optimized for speed
                </ListItem>
                <ListItem variant="cards" icon={<Heart size={20} />}>
                  <strong>Developer Experience</strong> - Easy to use API
                </ListItem>
              </List>
            </div>

            {/* List Types */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                List Types (Markers)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Disc */}
                <div>
                  <h5 className="text-sm font-medium mb-2 text-muted-foreground">
                    Disc
                  </h5>
                  <List listType="disc" size="sm">
                    <li>Item one</li>
                    <li>Item two</li>
                    <li>Item three</li>
                  </List>
                </div>

                {/* Circle */}
                <div>
                  <h5 className="text-sm font-medium mb-2 text-muted-foreground">
                    Circle
                  </h5>
                  <List listType="circle" size="sm">
                    <li>Item one</li>
                    <li>Item two</li>
                    <li>Item three</li>
                  </List>
                </div>

                {/* Square */}
                <div>
                  <h5 className="text-sm font-medium mb-2 text-muted-foreground">
                    Square
                  </h5>
                  <List listType="square" size="sm">
                    <li>Item one</li>
                    <li>Item two</li>
                    <li>Item three</li>
                  </List>
                </div>

                {/* Decimal */}
                <div>
                  <h5 className="text-sm font-medium mb-2 text-muted-foreground">
                    Decimal
                  </h5>
                  <List listType="decimal" ordered size="sm">
                    <li>First step</li>
                    <li>Second step</li>
                    <li>Third step</li>
                  </List>
                </div>

                {/* Lower Alpha */}
                <div>
                  <h5 className="text-sm font-medium mb-2 text-muted-foreground">
                    Lower Alpha
                  </h5>
                  <List listType="lower-alpha" ordered size="sm">
                    <li>Option A</li>
                    <li>Option B</li>
                    <li>Option C</li>
                  </List>
                </div>

                {/* Upper Roman */}
                <div>
                  <h5 className="text-sm font-medium mb-2 text-muted-foreground">
                    Upper Roman
                  </h5>
                  <List listType="upper-roman" ordered size="sm">
                    <li>Chapter I</li>
                    <li>Chapter II</li>
                    <li>Chapter III</li>
                  </List>
                </div>
              </div>
            </div>

            {/* List Sizes */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-sm font-medium mb-2 text-muted-foreground">
                    Small
                  </h5>
                  <List listType="disc" size="sm">
                    <li>Small text size</li>
                    <li>Compact spacing</li>
                    <li>Dense layout</li>
                  </List>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2 text-muted-foreground">
                    Medium (Default)
                  </h5>
                  <List listType="disc" size="md">
                    <li>Medium text size</li>
                    <li>Balanced spacing</li>
                    <li>Standard layout</li>
                  </List>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2 text-muted-foreground">
                    Large
                  </h5>
                  <List listType="disc" size="lg">
                    <li>Large text size</li>
                    <li>Generous spacing</li>
                    <li>Comfortable layout</li>
                  </List>
                </div>
              </div>
            </div>

            {/* Lists with Icons */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Lists with Custom Icons
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium mb-3 text-muted-foreground">
                    Feature List
                  </h5>
                  <List listType="none" variant="default">
                    <ListItem icon={<CheckCircle size={18} />}>
                      Complete TypeScript support
                    </ListItem>
                    <ListItem icon={<CheckCircle size={18} />}>
                      Modern glassmorphism effects
                    </ListItem>
                    <ListItem icon={<CheckCircle size={18} />}>
                      Dark mode compatible
                    </ListItem>
                    <ListItem icon={<CheckCircle size={18} />}>
                      Fully accessible components
                    </ListItem>
                  </List>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-3 text-muted-foreground">
                    Action Items
                  </h5>
                  <List listType="none" variant="default">
                    <ListItem icon={<Star size={18} />}>
                      Star the repository
                    </ListItem>
                    <ListItem icon={<Heart size={18} />}>
                      Share with friends
                    </ListItem>
                    <ListItem icon={<Mail size={18} />}>
                      Subscribe to updates
                    </ListItem>
                    <ListItem icon={<User size={18} />}>
                      Create an account
                    </ListItem>
                  </List>
                </div>
              </div>
            </div>

            {/* Contextual Usage */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Contextual Usage
              </h4>
              <Card variant="glass-strong" padding="lg" className="max-w-2xl">
                <CardHeader>
                  <CardTitle>Installation Guide</CardTitle>
                  <CardDescription>
                    Follow these steps to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <List listType="decimal" ordered variant="bordered" size="md">
                    <li>Install the package via npm or yarn</li>
                    <li>Import the components you need</li>
                    <li>Wrap your app with ThemeProvider</li>
                    <li>Start using the components</li>
                    <li>Customize with props and styles</li>
                  </List>
                </CardContent>
                <CardFooter>
                  <Link variant="button" href="#get-started">
                    Get Started Now
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Timeline Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">
              Timeline Component
            </h3>

            {/* Variants */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Default */}
                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Default Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      items={[
                        {
                          id: 1,
                          title: "Project Started",
                          description: "Initial setup and configuration",
                          time: "Jan 2024",
                          status: "success",
                        },
                        {
                          id: 2,
                          title: "Development Phase",
                          description: "Building core features",
                          time: "Feb 2024",
                          active: true,
                        },
                        {
                          id: 3,
                          title: "Testing",
                          description: "QA and bug fixes",
                          time: "Mar 2024",
                          status: "default",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>

                {/* Gradient */}
                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Gradient Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      variant="gradient"
                      items={[
                        {
                          id: 1,
                          title: "Design Complete",
                          description: "UI/UX finalized",
                          time: "Week 1",
                          status: "success",
                        },
                        {
                          id: 2,
                          title: "Development",
                          description: "Implementation in progress",
                          time: "Week 2",
                          status: "primary",
                          active: true,
                        },
                        {
                          id: 3,
                          title: "Launch",
                          description: "Deploy to production",
                          time: "Week 3",
                          status: "info",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>

                {/* Outlined */}
                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Outlined Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      variant="outlined"
                      items={[
                        {
                          id: 1,
                          title: "Order Placed",
                          description: "Your order has been confirmed",
                          time: "10:00 AM",
                          status: "success",
                        },
                        {
                          id: 2,
                          title: "Processing",
                          description: "Preparing your items",
                          time: "10:30 AM",
                          active: true,
                        },
                        {
                          id: 3,
                          title: "Shipped",
                          description: "On the way",
                          time: "Expected 2:00 PM",
                          status: "default",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>

                {/* Minimal */}
                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Minimal Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      variant="minimal"
                      size="sm"
                      items={[
                        {
                          id: 1,
                          title: "Task Created",
                          time: "2 hours ago",
                          status: "info",
                        },
                        {
                          id: 2,
                          title: "In Progress",
                          time: "1 hour ago",
                          active: true,
                        },
                        {
                          id: 3,
                          title: "Review",
                          time: "Pending",
                          status: "warning",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* With Icons */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                With Icons
              </h4>
              <Card variant="bordered" padding="lg">
                <CardContent>
                  <Timeline
                    variant="gradient"
                    size="md"
                    items={[
                      {
                        id: 1,
                        title: "Planning",
                        description: "Define project scope and requirements",
                        time: "Day 1",
                        icon: <FileText size={16} />,
                        status: "success",
                      },
                      {
                        id: 2,
                        title: "Development",
                        description: "Code implementation and testing",
                        time: "Day 2-5",
                        icon: <Code size={16} />,
                        status: "primary",
                        active: true,
                      },
                      {
                        id: 3,
                        title: "Build",
                        description: "Compile and package application",
                        time: "Day 6",
                        icon: <Package size={16} />,
                        status: "info",
                      },
                      {
                        id: 4,
                        title: "Deploy",
                        description: "Release to production",
                        time: "Day 7",
                        icon: <Rocket size={16} />,
                        status: "default",
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="glass" padding="md">
                  <CardHeader>
                    <CardTitle className="text-base">Small</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      size="sm"
                      items={[
                        {
                          id: 1,
                          title: "Step 1",
                          time: "10:00",
                          status: "success",
                        },
                        {
                          id: 2,
                          title: "Step 2",
                          time: "11:00",
                          active: true,
                        },
                      ]}
                    />
                  </CardContent>
                </Card>

                <Card variant="glass" padding="md">
                  <CardHeader>
                    <CardTitle className="text-base">Medium</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      size="md"
                      items={[
                        {
                          id: 1,
                          title: "Step 1",
                          time: "10:00",
                          status: "success",
                        },
                        {
                          id: 2,
                          title: "Step 2",
                          time: "11:00",
                          active: true,
                        },
                      ]}
                    />
                  </CardContent>
                </Card>

                <Card variant="glass" padding="md">
                  <CardHeader>
                    <CardTitle className="text-base">Large</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      size="lg"
                      items={[
                        {
                          id: 1,
                          title: "Step 1",
                          time: "10:00",
                          status: "success",
                        },
                        {
                          id: 2,
                          title: "Step 2",
                          time: "11:00",
                          active: true,
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Positions */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Positioning
              </h4>

              {/* Alternate Position */}
              <Card variant="glass" padding="lg" className="mb-6">
                <CardHeader>
                  <CardTitle>Alternate Position</CardTitle>
                  <CardDescription>
                    Content alternates between left and right
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Timeline
                    variant="gradient"
                    position="alternate"
                    items={[
                      {
                        id: 1,
                        title: "Research Phase",
                        description:
                          "Market analysis and competitor research completed",
                        time: "Q1 2024",
                        icon: <FileText size={16} />,
                        status: "success",
                      },
                      {
                        id: 2,
                        title: "Design & Prototype",
                        description: "UI/UX design and interactive prototypes",
                        time: "Q2 2024",
                        icon: <Settings size={16} />,
                        status: "success",
                      },
                      {
                        id: 3,
                        title: "Development Sprint",
                        description:
                          "Agile development with bi-weekly releases",
                        time: "Q3 2024",
                        icon: <Code size={16} />,
                        status: "primary",
                        active: true,
                      },
                      {
                        id: 4,
                        title: "Beta Testing",
                        description: "User testing and feedback collection",
                        time: "Q4 2024",
                        icon: <CheckCircle size={16} />,
                        status: "info",
                      },
                      {
                        id: 5,
                        title: "Production Launch",
                        description: "Full product release to all users",
                        time: "Q1 2025",
                        icon: <CloudUpload size={16} />,
                        status: "default",
                      },
                    ]}
                  />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Position */}
                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Left Position</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      position="left"
                      items={[
                        {
                          id: 1,
                          title: "Started",
                          description: "Project initiated",
                          time: "Yesterday",
                          status: "success",
                        },
                        {
                          id: 2,
                          title: "Working",
                          description: "In development",
                          time: "Today",
                          active: true,
                        },
                      ]}
                    />
                  </CardContent>
                </Card>

                {/* Right Position */}
                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Right Position</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      position="right"
                      items={[
                        {
                          id: 1,
                          title: "Started",
                          description: "Project initiated",
                          time: "Yesterday",
                          status: "success",
                        },
                        {
                          id: 2,
                          title: "Working",
                          description: "In development",
                          time: "Today",
                          active: true,
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Status Colors */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Status Colors
              </h4>
              <Card variant="bordered" padding="lg">
                <CardContent>
                  <Timeline
                    variant="outlined"
                    items={[
                      {
                        id: 1,
                        title: "Completed Task",
                        description: "Successfully finished",
                        time: "10:00 AM",
                        status: "success",
                      },
                      {
                        id: 2,
                        title: "Important Update",
                        description: "Requires attention",
                        time: "11:00 AM",
                        status: "primary",
                      },
                      {
                        id: 3,
                        title: "Warning Alert",
                        description: "Needs review",
                        time: "12:00 PM",
                        status: "warning",
                      },
                      {
                        id: 4,
                        title: "Error Occurred",
                        description: "Action required",
                        time: "1:00 PM",
                        status: "error",
                      },
                      {
                        id: 5,
                        title: "Information",
                        description: "FYI notification",
                        time: "2:00 PM",
                        status: "info",
                        active: true,
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Real-World Examples */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Real-World Usage
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Tracking */}
                <Card variant="glass-strong" padding="lg">
                  <CardHeader>
                    <CardTitle>Order Tracking</CardTitle>
                    <CardDescription>Order #12345</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      variant="gradient"
                      items={[
                        {
                          id: 1,
                          title: "Order Confirmed",
                          description: "Payment received successfully",
                          time: "May 1, 9:00 AM",
                          icon: <CheckCircle size={16} />,
                          status: "success",
                        },
                        {
                          id: 2,
                          title: "Processing",
                          description: "Preparing your order",
                          time: "May 1, 10:30 AM",
                          icon: <Package size={16} />,
                          status: "success",
                        },
                        {
                          id: 3,
                          title: "Shipped",
                          description: "Package in transit",
                          time: "May 2, 2:00 PM",
                          icon: <ShoppingCart size={16} />,
                          status: "primary",
                          active: true,
                        },
                        {
                          id: 4,
                          title: "Out for Delivery",
                          description: "Will arrive today",
                          time: "May 3 (Expected)",
                          icon: <Rocket size={16} />,
                          status: "info",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>

                {/* Project Milestones */}
                <Card variant="glass-strong" padding="lg">
                  <CardHeader>
                    <CardTitle>Project Milestones</CardTitle>
                    <CardDescription>Web App Development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      variant="outlined"
                      items={[
                        {
                          id: 1,
                          title: "Repository Setup",
                          description:
                            "Git initialized, dependencies installed",
                          time: "Sprint 1",
                          icon: <GitBranch size={16} />,
                          status: "success",
                        },
                        {
                          id: 2,
                          title: "Core Features",
                          description:
                            "Authentication, routing, state management",
                          time: "Sprint 2-3",
                          icon: <Code size={16} />,
                          status: "success",
                        },
                        {
                          id: 3,
                          title: "UI Components",
                          description: "Building reusable component library",
                          time: "Sprint 4",
                          icon: <Settings size={16} />,
                          status: "primary",
                          active: true,
                        },
                        {
                          id: 4,
                          title: "Testing & QA",
                          description: "Unit tests, integration tests, E2E",
                          time: "Sprint 5",
                          icon: <CheckCircle size={16} />,
                          status: "warning",
                        },
                        {
                          id: 5,
                          title: "Deployment",
                          description: "CI/CD pipeline, production release",
                          time: "Sprint 6",
                          icon: <CloudUpload size={16} />,
                          status: "default",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Customization Options */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Customization Options
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Different Dot Shapes */}
                <Card variant="glass-strong" padding="lg">
                  <CardHeader>
                    <CardTitle>Dot Shapes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Circle (Default)
                      </p>
                      <Timeline
                        dotShape="circle"
                        size="sm"
                        items={[
                          {
                            id: 1,
                            title: "Circle Dots",
                            status: "primary",
                            time: "Now",
                          },
                        ]}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Square
                      </p>
                      <Timeline
                        dotShape="square"
                        size="sm"
                        items={[
                          {
                            id: 2,
                            title: "Square Dots",
                            status: "success",
                            time: "Now",
                          },
                        ]}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Diamond
                      </p>
                      <Timeline
                        dotShape="diamond"
                        size="sm"
                        items={[
                          {
                            id: 3,
                            title: "Diamond Dots",
                            status: "warning",
                            time: "Now",
                          },
                        ]}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Ring</p>
                      <Timeline
                        dotShape="ring"
                        size="sm"
                        items={[
                          {
                            id: 4,
                            title: "Ring Dots",
                            status: "info",
                            time: "Now",
                          },
                        ]}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Line Styles */}
                <Card variant="glass-strong" padding="lg">
                  <CardHeader>
                    <CardTitle>Line Styles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Solid (Default)
                      </p>
                      <Timeline
                        lineStyle="solid"
                        size="sm"
                        items={[
                          { id: 1, title: "Solid Line", time: "Now" },
                          { id: 2, title: "Continuous", time: "Later" },
                        ]}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Dashed
                      </p>
                      <Timeline
                        lineStyle="dashed"
                        size="sm"
                        items={[
                          { id: 3, title: "Dashed Line", time: "Now" },
                          { id: 4, title: "Segmented", time: "Later" },
                        ]}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Dotted
                      </p>
                      <Timeline
                        lineStyle="dotted"
                        size="sm"
                        items={[
                          { id: 5, title: "Dotted Line", time: "Now" },
                          { id: 6, title: "Points", time: "Later" },
                        ]}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Gradient
                      </p>
                      <Timeline
                        lineStyle="gradient"
                        size="sm"
                        items={[
                          { id: 7, title: "Gradient Line", time: "Now" },
                          { id: 8, title: "Colorful", time: "Later" },
                        ]}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Colors */}
                <Card variant="glass-strong" padding="lg">
                  <CardHeader>
                    <CardTitle>Custom Colors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      lineColor="#ff6b6b"
                      lineWidth="3px"
                      items={[
                        {
                          id: 1,
                          title: "Custom Line Color",
                          description: "Red timeline line",
                          time: "Step 1",
                        },
                        {
                          id: 2,
                          title: "Custom Dot Color",
                          description: "Yellow dot with custom color",
                          dotColor: "#ffd93d",
                          time: "Step 2",
                        },
                        {
                          id: 3,
                          title: "Another Custom",
                          description: "Purple dot",
                          dotColor: "#a29bfe",
                          time: "Step 3",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>

                {/* Per-Item Customization */}
                <Card variant="glass-strong" padding="lg">
                  <CardHeader>
                    <CardTitle>Per-Item Control</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Timeline
                      items={[
                        {
                          id: 1,
                          title: "Normal Item",
                          description: "Standard timeline item",
                          time: "Step 1",
                          status: "success",
                        },
                        {
                          id: 2,
                          title: "Hidden Dot",
                          description: "This item has no dot",
                          hideDot: true,
                          time: "Step 2",
                        },
                        {
                          id: 3,
                          title: "No Line After",
                          description: "Line ends here",
                          hideLine: true,
                          time: "Step 3",
                          status: "primary",
                        },
                        {
                          id: 4,
                          title: "Isolated Item",
                          description: "No connection above",
                          time: "Step 4",
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Image Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Default</h4>
                <Image
                  src="https://picsum.photos/400/300?random=1"
                  alt="Sample 1"
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">With Loading</h4>
                <Image
                  src="https://picsum.photos/400/300?random=2"
                  alt="Sample 2"
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Custom Size</h4>
                <Image
                  src="https://picsum.photos/400/300?random=3"
                  alt="Sample 3"
                  className="w-full rounded-lg"
                  style={{ objectFit: "cover", height: "200px" }}
                />
              </div>
            </div>
          </div>

          {/* Carousel Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Carousel</h3>
            <Carousel
              items={[
                {
                  image: "https://picsum.photos/1200/500?random=4",
                  alt: "Slide 1",
                  title: "Welcome to Saha UI",
                  description:
                    "Modern component library with beautiful designs",
                  link: "#",
                  linkText: "Get Started",
                },
                {
                  image: "https://picsum.photos/1200/500?random=5",
                  alt: "Slide 2",
                  title: "Glassmorphism Effects",
                  description: "Beautiful glass effects for modern UIs",
                  link: "#",
                  linkText: "Learn More",
                },
                {
                  image: "https://picsum.photos/1200/500?random=6",
                  alt: "Slide 3",
                  title: "Dark Mode Support",
                  description: "Seamless light and dark theme switching",
                  link: "#",
                  linkText: "Explore",
                },
              ]}
              autoplay
              autoplayInterval={5000}
              showNavigation
              showIndicators
              className="rounded-xl overflow-hidden"
            />
          </div>

          {/* Tooltip Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">
              Tooltip Component
            </h3>

            {/* Variants */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-muted-foreground">Default</p>
                  <Tooltip content="Default tooltip style" variant="default">
                    <Button variant="outline">Hover Me</Button>
                  </Tooltip>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-muted-foreground">Dark</p>
                  <Tooltip content="Dark theme tooltip" variant="dark">
                    <Button variant="outline">Hover Me</Button>
                  </Tooltip>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-muted-foreground">Light</p>
                  <Tooltip content="Light theme tooltip" variant="light">
                    <Button variant="outline">Hover Me</Button>
                  </Tooltip>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-muted-foreground">Glass</p>
                  <Tooltip content="Glass morphism effect" variant="glass">
                    <Button variant="outline">Hover Me</Button>
                  </Tooltip>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-muted-foreground">Primary</p>
                  <Tooltip content="Primary color tooltip" variant="primary">
                    <Button variant="outline">Hover Me</Button>
                  </Tooltip>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-muted-foreground">Success</p>
                  <Tooltip content="Success message! ✓" variant="success">
                    <Button variant="outline">Hover Me</Button>
                  </Tooltip>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-muted-foreground">Warning</p>
                  <Tooltip content="Warning: Check this!" variant="warning">
                    <Button variant="outline">Hover Me</Button>
                  </Tooltip>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-muted-foreground">Error</p>
                  <Tooltip content="Error occurred!" variant="error">
                    <Button variant="outline">Hover Me</Button>
                  </Tooltip>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-muted-foreground">Info</p>
                  <Tooltip content="Information tooltip" variant="info">
                    <Button variant="outline">Hover Me</Button>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Positions */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Positions
              </h4>
              <div className="flex justify-center items-center gap-8 min-h-[200px]">
                <Tooltip
                  content="Left position"
                  position="left"
                  variant="primary"
                >
                  <Button variant="ghost">Left</Button>
                </Tooltip>

                <div className="flex flex-col gap-8">
                  <Tooltip
                    content="Top position"
                    position="top"
                    variant="primary"
                  >
                    <Button variant="ghost">Top</Button>
                  </Tooltip>
                  <Tooltip
                    content="Bottom position"
                    position="bottom"
                    variant="primary"
                  >
                    <Button variant="ghost">Bottom</Button>
                  </Tooltip>
                </div>

                <Tooltip
                  content="Right position"
                  position="right"
                  variant="primary"
                >
                  <Button variant="ghost">Right</Button>
                </Tooltip>
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
              <div className="flex justify-center gap-6">
                <Tooltip content="Small tooltip" size="sm" variant="glass">
                  <Button size="sm">Small</Button>
                </Tooltip>

                <Tooltip
                  content="Medium tooltip (default)"
                  size="md"
                  variant="glass"
                >
                  <Button size="md">Medium</Button>
                </Tooltip>

                <Tooltip
                  content="Large tooltip with more content"
                  size="lg"
                  variant="glass"
                >
                  <Button size="lg">Large</Button>
                </Tooltip>
              </div>
            </div>

            {/* Trigger Types */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Trigger Types
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Hover (Default)</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Tooltip
                      content="Appears on hover"
                      trigger="hover"
                      variant="default"
                    >
                      <Button>Hover Me</Button>
                    </Tooltip>
                  </CardContent>
                </Card>

                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Click</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Tooltip
                      content="Click to toggle"
                      trigger="click"
                      variant="primary"
                    >
                      <Button>Click Me</Button>
                    </Tooltip>
                  </CardContent>
                </Card>

                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Focus</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Tooltip
                      content="Focus to show"
                      trigger="focus"
                      variant="info"
                    >
                      <Button>Tab to Focus</Button>
                    </Tooltip>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Interactive Tooltip */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Interactive Tooltip
              </h4>
              <Card variant="glass-strong" padding="lg">
                <CardContent className="flex justify-center">
                  <Tooltip
                    content={
                      <div className="space-y-2">
                        <p className="font-semibold">Interactive Content</p>
                        <p className="text-xs">This tooltip is interactive!</p>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-full"
                        >
                          Click Me
                        </Button>
                      </div>
                    }
                    interactive={true}
                    trigger="click"
                    variant="glass"
                    maxWidth="200px"
                  >
                    <Button variant="primary">
                      Click for Interactive Tooltip
                    </Button>
                  </Tooltip>
                </CardContent>
              </Card>
            </div>

            {/* Real-World Examples */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Real-World Examples
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Help Icons */}
                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Help Icons</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Username</span>
                      <Tooltip
                        content="Enter your unique username (3-20 characters)"
                        variant="info"
                        size="sm"
                      >
                        <span className="cursor-help text-muted-foreground">
                          ⓘ
                        </span>
                      </Tooltip>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm">Email</span>
                      <Tooltip
                        content="We'll never share your email with anyone"
                        variant="success"
                        size="sm"
                      >
                        <span className="cursor-help text-muted-foreground">
                          ✓
                        </span>
                      </Tooltip>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm">Password</span>
                      <Tooltip
                        content="Must be at least 8 characters with 1 number"
                        variant="warning"
                        size="sm"
                      >
                        <span className="cursor-help text-muted-foreground">
                          ⚠
                        </span>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>

                {/* Status Indicators */}
                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Status Indicators</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Tooltip
                        content="All systems operational"
                        variant="success"
                      >
                        <Badge variant="success">Active</Badge>
                      </Tooltip>
                      <span className="text-sm text-muted-foreground">
                        Server Status
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Tooltip content="Pending approval" variant="warning">
                        <Badge variant="warning">Pending</Badge>
                      </Tooltip>
                      <span className="text-sm text-muted-foreground">
                        Document Review
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Tooltip content="Connection lost" variant="error">
                        <Badge variant="error">Offline</Badge>
                      </Tooltip>
                      <span className="text-sm text-muted-foreground">
                        Database Connection
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* No Arrow & Custom Styling */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-text">
                Customization Options
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>No Arrow</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Tooltip
                      content="Tooltip without arrow"
                      arrow={false}
                      variant="primary"
                    >
                      <Button variant="outline">No Arrow</Button>
                    </Tooltip>
                  </CardContent>
                </Card>

                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Custom Delay</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Tooltip
                      content="Appears after 1 second"
                      delay={1000}
                      variant="info"
                    >
                      <Button variant="outline">Delayed (1s)</Button>
                    </Tooltip>
                  </CardContent>
                </Card>

                <Card variant="glass" padding="lg">
                  <CardHeader>
                    <CardTitle>Disabled</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Tooltip
                      content="This won't show"
                      disabled={true}
                      variant="error"
                    >
                      <Button variant="outline">Disabled Tooltip</Button>
                    </Tooltip>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <ColorPalette />
        </section>

        {/* Footer */}
        <footer className="glass border-t border-border/50 mt-16">
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-text-secondary">
              Built with ❤️ using React, TypeScript, and Tailwind CSS
            </p>
            <p className="text-text-tertiary text-sm mt-2">
              Saha UI - Modern Component Library © 2025
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
