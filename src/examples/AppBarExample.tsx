"use client";

import { useState, useCallback } from "react";
import {
  AppBar,
  AppBarProgress,
  AppBarSearch,
  AppBarAnnouncement,
  AppBarTitle,
  AppBarBreadcrumbs,
  AppBarMenuButton,
} from "../components/AppBar";
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
  Home,
  Command,
  Loader2,
  Package,
  BarChart3,
  Plus,
  Filter,
} from "lucide-react";

export default function AppBarExample() {
  const [isDark, setIsDark] = useState(false);
  const [cartCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(5);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const handleStartLoading = useCallback(() => {
    setIsLoading(true);
    setProgressValue(0);
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  }, []);

  const handleSearch = useCallback((query: string) => {
    console.log("Search:", query);
    setSearchExpanded(false);
  }, []);

  const breadcrumbItems = [
    { label: "Home", href: "/", icon: <Home className="w-3 h-3" /> },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "Smartphones" },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-bold mb-2">AppBar</h2>
        <p className="text-muted-foreground mb-6">
          A feature-rich, visually polished navigation bar component.
        </p>
      </div>

      {/* ================================================================== */}
      {/* Basic Examples */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Basic AppBar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Simple */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Simple navigation</p>
            <div className="rounded-lg overflow-hidden border">
              <AppBar>
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-lg">My App</span>
                  <nav className="hidden sm:flex items-center gap-6">
                    <a
                      href="#"
                      className="text-sm hover:text-primary transition-colors"
                    >
                      Home
                    </a>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      About
                    </a>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contact
                    </a>
                  </nav>
                  <Button size="sm">Sign In</Button>
                </div>
              </AppBar>
            </div>
          </div>

          {/* With Slots */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Using slot props</p>
            <div className="rounded-lg overflow-hidden border">
              <AppBar
                variant="elevated"
                startContent={
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">
                        A
                      </span>
                    </div>
                    <span className="font-semibold hidden sm:block">
                      Acme Inc
                    </span>
                  </div>
                }
                centerContent={
                  <nav className="hidden md:flex items-center gap-6">
                    <a href="#" className="text-sm font-medium">
                      Dashboard
                    </a>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Projects
                    </a>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Team
                    </a>
                  </nav>
                }
                endContent={
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden sm:flex"
                    >
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      New
                    </Button>
                  </div>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Variants */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {(["default", "elevated", "outlined"] as const).map((v) => (
              <div key={v} className="rounded-lg overflow-hidden border">
                <AppBar
                  variant={v}
                  title={`${v.charAt(0).toUpperCase() + v.slice(1)} Variant`}
                />
              </div>
            ))}

            {/* Glass */}
            <div className="relative h-20 rounded-lg overflow-hidden bg-gradient-to-r from-violet-500 to-purple-500">
              <AppBar
                variant="glass"
                position="absolute"
                title="Glass Variant"
                className="text-white"
              />
            </div>

            {/* Transparent + Blur */}
            <div className="relative h-20 rounded-lg overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500">
              <AppBar
                variant="transparent"
                blur
                position="absolute"
                title="Transparent + Blur"
                className="text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Colors */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="rounded-lg overflow-hidden">
              <AppBar
                color="default"
                variant="elevated"
                title="Default Color"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <AppBar
                color="primary"
                variant="elevated"
                title="Primary Color"
                endContent={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground hover:bg-white/10"
                  >
                    Action
                  </Button>
                }
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <AppBar
                color="secondary"
                variant="elevated"
                title="Secondary Color"
                endContent={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-white/10"
                  >
                    Action
                  </Button>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Sizes */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s} className="rounded-lg overflow-hidden border">
                <AppBar
                  variant="default"
                  size={s}
                  title={`${s.toUpperCase()} Size`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Title & Subtitle */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Title & Subtitle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border">
            <AppBar
              variant="elevated"
              showBackButton
              onBack={() => console.log("Back")}
              title="Product Details"
              subtitle="SKU: PRD-12345 • In Stock"
              endContent={
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Breadcrumbs */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>With Breadcrumbs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border">
            <AppBar
              variant="default"
              title="Smartphones"
              breadcrumbs={breadcrumbItems}
              endContent={
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-1" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Progress Indicator */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Indicator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleStartLoading} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Start Loading"
            )}
          </Button>

          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border">
              <AppBar
                variant="elevated"
                showProgress
                progressValue={progressValue}
                progressVariant="determinate"
                progressPosition="bottom"
                title="Uploading Files"
                endContent={
                  <span className="text-sm text-muted-foreground font-medium">
                    {progressValue}%
                  </span>
                }
              />
            </div>

            <div className="rounded-lg overflow-hidden border">
              <AppBar
                variant="elevated"
                showProgress={isLoading}
                progressVariant="indeterminate"
                progressPosition="top"
                title="Processing..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Search */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Search Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border">
            <AppBar
              variant="elevated"
              searchable
              searchExpanded={searchExpanded}
              onSearchToggle={() => setSearchExpanded(!searchExpanded)}
              onSearch={handleSearch}
              searchPlaceholder="Search products, categories..."
              startContent={
                !searchExpanded && (
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    <span className="font-semibold hidden sm:block">Store</span>
                  </div>
                )
              }
              endContent={
                !searchExpanded && (
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <User className="w-4 h-4" />
                    </Button>
                  </div>
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Announcement */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Announcement Bar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border">
            <AppBar
              variant="elevated"
              announcement={
                <span>
                  🎉 <strong>Summer Sale!</strong> Get 30% off with code
                  SUMMER30.{" "}
                  <a href="#" className="underline hover:no-underline">
                    Shop now
                  </a>
                </span>
              }
              announcementDismissible
              startContent={<span className="font-semibold">ShopHub</span>}
              endContent={
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* With Tabs */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>With Tabs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border">
            <AppBar
              variant="elevated"
              title="Dashboard"
              tabsPosition="bottom"
              tabs={
                <div className="flex">
                  {["overview", "analytics", "reports", "settings"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium capitalize transition-all border-b-2 ${
                          activeTab === tab
                            ? "text-primary border-primary"
                            : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                        }`}
                      >
                        {tab}
                      </button>
                    )
                  )}
                </div>
              }
              endContent={
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Mobile Menu */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto rounded-lg overflow-hidden border">
            <AppBar
              color="primary"
              variant="elevated"
              startContent={
                <AppBarMenuButton
                  open={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
              }
              centerContent={
                <span className="font-semibold text-primary-foreground">
                  Mobile App
                </span>
              }
              endContent={
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-white/10"
                >
                  <Bell className="w-4 h-4" />
                </Button>
              }
            />

            {mobileMenuOpen && (
              <div className="bg-background p-4 space-y-1 border-t">
                {["Home", "Products", "Analytics", "Settings"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="text-sm font-medium">{item}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* E-commerce Example */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>E-commerce Header</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden">
            <AppBar
              color="primary"
              variant="elevated"
              announcement={<span>🚚 Free shipping on orders over $50!</span>}
              startContent={
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-bold text-primary-foreground hidden sm:block">
                    ShopHub
                  </span>
                </div>
              }
              centerContent={
                <div className="hidden md:flex flex-1 max-w-lg mx-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full h-9 px-4 pl-9 rounded-full text-sm bg-white/90 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              }
              endContent={
                <div className="flex items-center gap-1">
                  <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors md:hidden">
                    <Search className="w-5 h-5 text-primary-foreground" />
                  </button>
                  <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                    <Heart className="w-5 h-5 text-primary-foreground" />
                    <Badge className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] p-0 flex items-center justify-center text-[10px] bg-white text-primary">
                      2
                    </Badge>
                  </button>
                  <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                    <Badge className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] p-0 flex items-center justify-center text-[10px] bg-white text-primary">
                      {cartCount}
                    </Badge>
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </button>
                </div>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Dashboard Example */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Header</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border">
            <AppBar
              variant="elevated"
              startContent={
                <div className="flex items-center gap-3">
                  <button className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors">
                    <Menu className="w-5 h-5" />
                  </button>
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-semibold">Analytics</span>
                  </div>
                </div>
              }
              centerContent={
                <div className="hidden lg:flex items-center gap-1 bg-muted/50 rounded-full px-1 py-1">
                  {["Day", "Week", "Month", "Year"].map((period) => (
                    <button
                      key={period}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        period === "Week"
                          ? "bg-background shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              }
              endContent={
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-full hover:bg-muted transition-colors hidden sm:flex">
                    <Search className="w-4 h-4" />
                  </button>
                  <button
                    className="relative p-2 rounded-full hover:bg-muted transition-colors"
                    onClick={() => setNotificationCount(0)}
                  >
                    <Bell className="w-4 h-4" />
                    {notificationCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                    onClick={() => setIsDark(!isDark)}
                  >
                    {isDark ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </button>
                  <div className="w-px h-6 bg-border mx-1" />
                  <button className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-muted transition-colors">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                      JD
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
                  </button>
                </div>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Landing Page Hero */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Landing Page Hero</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-80 rounded-lg overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            <AppBar
              variant="transparent"
              blur
              position="absolute"
              skipToContent={false}
              startContent={
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    <span className="text-lg font-bold bg-gradient-to-br from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                      S
                    </span>
                  </div>
                  <span className="font-bold text-white">Startup</span>
                </div>
              }
              centerContent={
                <nav className="hidden md:flex items-center gap-6">
                  {["Features", "Pricing", "About", "Blog"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              }
              endContent={
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="bg-white text-violet-600 hover:bg-white/90"
                  >
                    Get Started
                  </Button>
                </div>
              }
            />

            <div className="flex flex-col items-center justify-center h-full pt-16 px-4 text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Build Something Amazing
              </h1>
              <p className="text-white/70 text-lg max-w-lg mb-6">
                The modern platform for creating beautiful, fast, and secure
                applications.
              </p>
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="bg-white text-violet-600 hover:bg-white/90"
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================== */}
      {/* Sub-components */}
      {/* ================================================================== */}
      <Card>
        <CardHeader>
          <CardTitle>Sub-components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">AppBarProgress</p>
              <div className="border rounded-lg overflow-hidden">
                <div className="relative h-12">
                  <AppBarProgress
                    value={65}
                    variant="determinate"
                    position="bottom"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">AppBarSearch</p>
              <div className="border rounded-lg p-3">
                <AppBarSearch
                  expanded={true}
                  placeholder="Search..."
                  onSearch={(q) => console.log(q)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">AppBarTitle</p>
              <div className="border rounded-lg p-3">
                <AppBarTitle subtitle="This is the subtitle">
                  Main Title
                </AppBarTitle>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">AppBarBreadcrumbs</p>
              <div className="border rounded-lg p-3">
                <AppBarBreadcrumbs items={breadcrumbItems} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">AppBarMenuButton</p>
              <div className="border rounded-lg p-3 flex gap-4">
                <AppBarMenuButton open={false} />
                <AppBarMenuButton open={true} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">AppBarAnnouncement</p>
              <AppBarAnnouncement dismissible onDismiss={() => {}}>
                📢 New feature available!
              </AppBarAnnouncement>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { AppBarExample };
