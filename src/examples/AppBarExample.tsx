"use client";

import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  ShoppingCart,
  Heart,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

export default function AppBarExample() {
  const [isDark, setIsDark] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(5);
  // reference setters to avoid "declared but its value is never read" TypeScript
  // errors when examples are static; this is a no-op that marks the symbols used.
  void setCartCount;
  void setNotificationCount;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">AppBar</h2>
        <p className="text-muted-foreground mb-6">
          A top app bar that provides content and actions related to the current
          screen. Perfect for navigation headers, toolbars, and branding.
        </p>
      </div>

      {/* Basic AppBar */}
      <Card>
        <CardHeader>
          <CardTitle>Basic AppBar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AppBar>
              <div className="flex items-center justify-between w-full px-4">
                <h1 className="text-xl font-bold">My Application</h1>
                <nav className="flex gap-4">
                  <a href="#home" className="hover:text-primary">
                    Home
                  </a>
                  <a href="#about" className="hover:text-primary">
                    About
                  </a>
                  <a href="#contact" className="hover:text-primary">
                    Contact
                  </a>
                </nav>
              </div>
            </AppBar>
          </div>
        </CardContent>
      </Card>

      {/* Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Default</p>
              <AppBar variant="default">
                <div className="flex items-center justify-between w-full px-4">
                  <span className="font-semibold">Default AppBar</span>
                  <Button size="sm">Action</Button>
                </div>
              </AppBar>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Elevated</p>
              <AppBar variant="elevated">
                <div className="flex items-center justify-between w-full px-4">
                  <span className="font-semibold">Elevated AppBar</span>
                  <Button size="sm">Action</Button>
                </div>
              </AppBar>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Outlined</p>
              <AppBar variant="outlined">
                <div className="flex items-center justify-between w-full px-4">
                  <span className="font-semibold">Outlined AppBar</span>
                  <Button size="sm">Action</Button>
                </div>
              </AppBar>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Transparent</p>
              <div className="relative h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg overflow-hidden">
                <AppBar
                  variant="transparent"
                  className="absolute top-0 left-0 right-0"
                >
                  <div className="flex items-center justify-between w-full px-4">
                    <span className="font-semibold">Transparent AppBar</span>
                    <Button size="sm" variant="ghost">
                      Action
                    </Button>
                  </div>
                </AppBar>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">With Blur</p>
              <div className="relative h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg overflow-hidden">
                <AppBar
                  variant="transparent"
                  blur
                  className="absolute top-0 left-0 right-0"
                >
                  <div className="flex items-center justify-between w-full px-4">
                    <span className="font-semibold">Blur AppBar</span>
                    <Button size="sm" variant="ghost">
                      Action
                    </Button>
                  </div>
                </AppBar>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Default</p>
              <AppBar color="default">
                <div className="flex items-center justify-between w-full px-4">
                  <span className="font-semibold">Default Color</span>
                </div>
              </AppBar>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Primary</p>
              <AppBar color="primary">
                <div className="flex items-center justify-between w-full px-4">
                  <span className="font-semibold text-white">
                    Primary Color
                  </span>
                  <Button size="sm" variant="ghost" className="text-white">
                    Menu
                  </Button>
                </div>
              </AppBar>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Secondary</p>
              <AppBar color="secondary">
                <div className="flex items-center justify-between w-full px-4">
                  <span className="font-semibold text-white">
                    Secondary Color
                  </span>
                  <Button size="sm" variant="ghost" className="text-white">
                    Menu
                  </Button>
                </div>
              </AppBar>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Small</p>
              <AppBar size="sm">
                <div className="flex items-center justify-between w-full px-4">
                  <span className="text-sm font-semibold">Small AppBar</span>
                  <Button size="sm">Action</Button>
                </div>
              </AppBar>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Medium (Default)</p>
              <AppBar size="md">
                <div className="flex items-center justify-between w-full px-4">
                  <span className="font-semibold">Medium AppBar</span>
                  <Button size="sm">Action</Button>
                </div>
              </AppBar>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Large</p>
              <AppBar size="lg">
                <div className="flex items-center justify-between w-full px-4">
                  <span className="text-lg font-semibold">Large AppBar</span>
                  <Button>Action</Button>
                </div>
              </AppBar>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* E-commerce Header */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Example: E-commerce Header</CardTitle>
        </CardHeader>
        <CardContent>
          <AppBar color="primary" variant="elevated">
            <div className="flex items-center justify-between w-full px-6">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xl font-bold text-white">ShopHub</span>
              </div>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 pl-10 rounded-lg text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Heart className="w-5 h-5 text-white" />
                  <Badge className="absolute -top-1 -right-1 bg-destructive text-white min-w-5 h-5 p-0 flex items-center justify-center text-xs">
                    2
                  </Badge>
                </button>
                <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <ShoppingCart className="w-5 h-5 text-white" />
                  <Badge className="absolute -top-1 -right-1 bg-destructive text-white min-w-5 h-5 p-0 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <User className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </AppBar>
        </CardContent>
      </Card>

      {/* Dashboard Header */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Example: Dashboard Header</CardTitle>
        </CardHeader>
        <CardContent>
          <AppBar variant="elevated">
            <div className="flex items-center justify-between w-full px-6">
              {/* Left: Menu & Brand */}
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-base-200 rounded-lg transition-colors">
                  <Menu className="w-5 h-5" />
                </button>
                <span className="text-xl font-bold">Dashboard</span>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-base-200 rounded-lg transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button
                  className="relative p-2 hover:bg-base-200 rounded-lg transition-colors"
                  onClick={() => setNotificationCount(0)}
                >
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-destructive text-white min-w-5 h-5 p-0 flex items-center justify-center text-xs">
                      {notificationCount}
                    </Badge>
                  )}
                </button>
                <button
                  className="p-2 hover:bg-base-200 rounded-lg transition-colors"
                  onClick={() => setIsDark(!isDark)}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
                <div className="flex items-center gap-2 pl-2 border-l">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    JD
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Admin</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </AppBar>
        </CardContent>
      </Card>

      {/* Landing Page Hero */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Example: Landing Page Hero</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg overflow-hidden">
            <AppBar variant="transparent" blur position="absolute">
              <div className="flex items-center justify-between w-full px-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-purple-600">S</span>
                  </div>
                  <span className="text-xl font-bold text-white">Startup</span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                  <a
                    href="#features"
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#pricing"
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    Pricing
                  </a>
                  <a
                    href="#about"
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#contact"
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    Contact
                  </a>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                  <Button className="bg-white text-purple-600 hover:bg-white/90">
                    Get Started
                  </Button>
                </div>
              </div>
            </AppBar>

            {/* Hero Content */}
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Welcome to Startup</h1>
                <p className="text-white/80">
                  Build amazing things with our platform
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile App Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Example: Mobile Header</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto">
            <AppBar color="primary">
              <div className="flex items-center justify-between w-full px-4">
                <button className="p-1">
                  <Menu className="w-6 h-6 text-white" />
                </button>
                <span className="text-lg font-bold text-white">Mobile App</span>
                <button className="p-1">
                  <Settings className="w-6 h-6 text-white" />
                </button>
              </div>
            </AppBar>
          </div>
        </CardContent>
      </Card>

      {/* With Tabs/Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>With Navigation Tabs</CardTitle>
        </CardHeader>
        <CardContent>
          <AppBar variant="elevated">
            <div className="w-full">
              {/* Top Section */}
              <div className="flex items-center justify-between px-6 py-3 border-b">
                <span className="text-xl font-bold">My App</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <User className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-1 px-6 overflow-x-auto">
                <button className="px-4 py-3 text-sm font-medium text-primary border-b-2 border-primary whitespace-nowrap">
                  Overview
                </button>
                <button className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
                  Analytics
                </button>
                <button className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
                  Reports
                </button>
                <button className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
                  Settings
                </button>
              </div>
            </div>
          </AppBar>
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import { AppBar } from 'saha-ui';

// Basic usage
<AppBar>
  <div className="flex items-center justify-between w-full px-4">
    <h1>My App</h1>
    <nav>Menu</nav>
  </div>
</AppBar>

// Fixed with primary color
<AppBar position="fixed" color="primary" variant="elevated">
  <div className="container mx-auto">
    <div>Logo</div>
    <nav>Navigation</nav>
  </div>
</AppBar>

// Transparent with blur
<AppBar variant="transparent" blur position="fixed">
  <div className="flex items-center justify-between w-full px-6">
    <div>Brand</div>
    <div>Actions</div>
  </div>
</AppBar>

// With hide on scroll
<AppBar position="fixed" hideOnScroll>
  <div>Content</div>
</AppBar>

// Different sizes
<AppBar size="sm">Small Header</AppBar>
<AppBar size="lg">Large Header</AppBar>

// E-commerce header
<AppBar color="primary" variant="elevated">
  <div className="flex items-center justify-between w-full px-6">
    <div className="flex items-center gap-2">
      <Logo />
      <span>Brand</span>
    </div>
    <SearchBar />
    <div className="flex items-center gap-2">
      <CartIcon />
      <UserIcon />
    </div>
  </div>
</AppBar>`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

export { AppBarExample };
