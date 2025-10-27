import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuSection,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuContent,
} from "../components/NavigationMenu/index";
import type { NavigationItem } from "../components/NavigationMenu/NavigationMenu.types";

/**
 * NavigationMenu Examples
 *
 * Demonstrates both compact props-based API and composable component API
 * with asChild prop support for custom rendering.
 */

export default function NavigationMenuExample() {
  const handleSelect = (item: NavigationItem) => {
    console.log("Selected:", item);
  };

  const menuItems: NavigationItem[] = [
    {
      id: "home",
      label: "Home",
      href: "/",
      icon: <span>🏠</span>,
    },
    {
      id: "products",
      label: "Products",
      icon: <span>📦</span>,
      badge: <span className="text-xs">New</span>,
      items: [
        {
          id: "all-products-simple",
          label: "All Products",
          href: "/products",
        },
        {
          id: "categories-simple",
          label: "Categories",
          items: [
            {
              id: "electronics-simple",
              label: "Electronics",
              href: "/products/electronics",
            },
            {
              id: "clothing-simple",
              label: "Clothing",
              href: "/products/clothing",
            },
          ],
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <span>⚙️</span>,
      items: [
        {
          id: "profile-simple",
          label: "Profile",
          href: "/settings/profile",
        },
        {
          id: "security-simple",
          label: "Security",
          href: "/settings/security",
        },
      ],
    },
  ];

  const multiLevelMenuItems: NavigationItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: <span>📊</span>,
    },
    {
      id: "products-menu",
      label: "Products",
      icon: <span>📦</span>,
      items: [
        {
          id: "all-products",
          label: "All Products",
          href: "/products/all",
          icon: <span>📋</span>,
        },
        {
          id: "categories",
          label: "Categories",
          icon: <span>🏷️</span>,
          items: [
            {
              id: "electronics",
              label: "Electronics",
              href: "/products/electronics",
              icon: <span>💻</span>,
            },
            {
              id: "clothing",
              label: "Clothing",
              href: "/products/clothing",
              icon: <span>👕</span>,
            },
            {
              id: "food",
              label: "Food & Beverage",
              icon: <span>🍔</span>,
              items: [
                {
                  id: "snacks",
                  label: "Snacks",
                  href: "/products/food/snacks",
                  icon: <span>🍿</span>,
                },
                {
                  id: "drinks",
                  label: "Drinks",
                  href: "/products/food/drinks",
                  icon: <span>🥤</span>,
                },
              ],
            },
          ],
        },
        {
          id: "new-arrivals",
          label: "New Arrivals",
          href: "/products/new",
          icon: <span>✨</span>,
          badge: <span className="text-xs bg-green-500 px-1 rounded">12</span>,
        },
      ],
    },
    {
      id: "users",
      label: "Users",
      icon: <span>👥</span>,
      items: [
        {
          id: "all-users",
          label: "All Users",
          href: "/users/all",
          icon: <span>👤</span>,
        },
        {
          id: "roles",
          label: "Roles & Permissions",
          href: "/users/roles",
          icon: <span>🔐</span>,
        },
      ],
    },
    {
      id: "settings-menu",
      label: "Settings",
      icon: <span>⚙️</span>,
      items: [
        {
          id: "profile-settings",
          label: "Profile",
          href: "/settings/profile",
          icon: <span>👤</span>,
        },
        {
          id: "security",
          label: "Security",
          href: "/settings/security",
          icon: <span>🔒</span>,
        },
        {
          id: "notifications",
          label: "Notifications",
          href: "/settings/notifications",
          icon: <span>🔔</span>,
        },
      ],
    },
  ];

  return (
    <div className="p-8 space-y-12">
      {/* Radix-Style API */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Radix-Style API ⭐ NEW</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Familiar API pattern from Radix UI / shadcn with NavigationMenuList,
          NavigationMenuTrigger, NavigationMenuContent, and NavigationMenuLink
        </p>
        <div className="grid grid-cols-2 gap-8">
          {/* Vertical Radix-style */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Radix-Style Vertical</h3>
            <NavigationMenu variant="outlined" orientation="vertical">
              <NavigationMenuList>
                <NavigationMenuLink href="/">
                  <span>🏠</span> Home
                </NavigationMenuLink>
                <NavigationMenuLink href="/about">
                  <span>ℹ️</span> About
                </NavigationMenuLink>
                <NavigationMenuLink href="/contact">
                  <span>📧</span> Contact
                </NavigationMenuLink>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Horizontal Radix-style */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Radix-Style Horizontal
            </h3>
            <NavigationMenu variant="primary" orientation="horizontal">
              <NavigationMenuList>
                <NavigationMenuLink href="/">
                  <span>🏠</span> Home
                </NavigationMenuLink>
                <NavigationMenuLink href="/products">
                  <span>�</span> Products
                </NavigationMenuLink>
                <NavigationMenuLink href="/services">
                  <span>�️</span> Services
                </NavigationMenuLink>
                <NavigationMenuLink href="/contact">
                  <span>📧</span> Contact
                </NavigationMenuLink>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Glass variant with Radix-style */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-2">
              Radix-Style Glass Effect
            </h3>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg p-4">
              <NavigationMenu variant="glass" orientation="vertical">
                <NavigationMenuList>
                  <NavigationMenuLink href="/dashboard">
                    <span>📊</span> Dashboard
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/analytics">
                    <span>📈</span> Analytics
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/reports">
                    <span>�</span> Reports
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/settings">
                    <span>⚙️</span> Settings
                  </NavigationMenuLink>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Multi-level Radix-style */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-2">
              Radix-Style Multi-Level Navigation (Component API)
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Click items with ▸ to expand/collapse nested menus
            </p>
            <NavigationMenu variant="outlined" orientation="horizontal">
              <NavigationMenuList>
                <NavigationMenuLink href="/">
                  <span>🏠</span> Home
                </NavigationMenuLink>

                <NavigationMenuLink>
                  <span>📦</span> Products
                  <NavigationMenuContent>
                    <NavigationMenuList>
                      <NavigationMenuLink href="/products/electronics">
                        <span>💻</span> Electronics
                        <NavigationMenuContent>
                          <NavigationMenuList>
                            <NavigationMenuLink href="/products/electronics/laptops">
                              Laptops
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/products/electronics/phones">
                              Phones
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/products/electronics/tablets">
                              Tablets
                            </NavigationMenuLink>
                          </NavigationMenuList>
                        </NavigationMenuContent>
                      </NavigationMenuLink>

                      <NavigationMenuLink href="/products/clothing">
                        <span>👕</span> Clothing
                        <NavigationMenuContent>
                          <NavigationMenuList>
                            <NavigationMenuLink href="/products/clothing/mens">
                              Men's Wear
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/products/clothing/womens">
                              Women's Wear
                            </NavigationMenuLink>
                          </NavigationMenuList>
                        </NavigationMenuContent>
                      </NavigationMenuLink>

                      <NavigationMenuLink href="/products/books">
                        <span>📚</span> Books
                      </NavigationMenuLink>
                    </NavigationMenuList>
                  </NavigationMenuContent>
                </NavigationMenuLink>

                <NavigationMenuLink href="/services">
                  <span>🛠️</span> Services
                  <NavigationMenuContent>
                    <NavigationMenuList>
                      <NavigationMenuLink href="/services/consulting">
                        Consulting
                      </NavigationMenuLink>
                      <NavigationMenuLink href="/services/support">
                        Support
                      </NavigationMenuLink>
                    </NavigationMenuList>
                  </NavigationMenuContent>
                </NavigationMenuLink>

                <NavigationMenuLink href="/contact">
                  <span>📧</span> Contact
                </NavigationMenuLink>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Glass Multi-level */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-2">
              Radix-Style Glass Effect with Multi-Level
            </h3>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg p-4">
              <NavigationMenu variant="glass" orientation="vertical">
                <NavigationMenuList>
                  <NavigationMenuLink href="/dashboard">
                    <span>📊</span> Dashboard
                  </NavigationMenuLink>

                  <NavigationMenuLink href="/analytics">
                    <span>📈</span> Analytics
                    <NavigationMenuContent>
                      <NavigationMenuList>
                        <NavigationMenuLink href="/analytics/reports">
                          <span>📋</span> Reports
                        </NavigationMenuLink>
                        <NavigationMenuLink href="/analytics/charts">
                          <span>📊</span> Charts
                        </NavigationMenuLink>
                        <NavigationMenuLink href="/analytics/export">
                          <span>💾</span> Export
                        </NavigationMenuLink>
                      </NavigationMenuList>
                    </NavigationMenuContent>
                  </NavigationMenuLink>

                  <NavigationMenuLink href="/settings">
                    <span>⚙️</span> Settings
                    <NavigationMenuContent>
                      <NavigationMenuList>
                        <NavigationMenuLink href="/settings/profile">
                          Profile
                        </NavigationMenuLink>
                        <NavigationMenuLink href="/settings/security">
                          Security
                        </NavigationMenuLink>
                      </NavigationMenuList>
                    </NavigationMenuContent>
                  </NavigationMenuLink>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* With custom links */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-2">
              Radix-Style with Custom Styling
            </h3>
            <NavigationMenu variant="accent" orientation="horizontal">
              <NavigationMenuList>
                <NavigationMenuLink
                  href="/"
                  className="hover:scale-105 transition-transform"
                >
                  <span className="text-xl">🏠</span>
                  <span>Home</span>
                </NavigationMenuLink>
                <NavigationMenuLink href="/featured" active>
                  <span className="text-xl">⭐</span>
                  <span>Featured</span>
                </NavigationMenuLink>
                <NavigationMenuLink href="/new" className="relative">
                  <span className="text-xl">✨</span>
                  <span>New</span>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                    12
                  </span>
                </NavigationMenuLink>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </section>

      {/* Multi-Level Navigation */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Multi-Level Navigation ⭐ NEW
        </h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Multi-level with compact API */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Multi-Level (up to 3 levels)
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Click items with ▶ to expand/collapse
            </p>
            <NavigationMenu
              items={multiLevelMenuItems}
              variant="outlined"
              defaultOpenIds={["products-menu"]}
              onSelect={handleSelect}
            />
          </div>

          {/* Multi-level with glass effect */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Multi-Level Glass (Dark Mode Compatible)
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Works in both light and dark themes
            </p>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg p-4">
              <NavigationMenu
                items={multiLevelMenuItems}
                variant="glass"
                defaultOpenIds={["products-menu", "categories"]}
                onSelect={handleSelect}
              />
            </div>
          </div>

          {/* Composable API with nesting */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-2">
              Composable API with Nested Components
            </h3>
            <NavigationMenu variant="filled" defaultOpenIds={["settings-comp"]}>
              <NavigationMenuItem
                id="dashboard-comp"
                label="Dashboard"
                href="/dashboard"
                icon={<span>📊</span>}
              />
              <NavigationMenuItem
                id="settings-comp"
                label="Settings"
                icon={<span>⚙️</span>}
              >
                <NavigationMenuItem
                  id="profile-comp"
                  label="Profile"
                  href="/settings/profile"
                  icon={<span>👤</span>}
                />
                <NavigationMenuItem
                  id="security-comp"
                  label="Security"
                  href="/settings/security"
                  icon={<span>🔒</span>}
                />
              </NavigationMenuItem>
              <NavigationMenuItem
                id="help-comp"
                label="Help"
                href="/help"
                icon={<span>❓</span>}
              />
            </NavigationMenu>
          </div>
        </div>
      </section>

      {/* Compact Props-based API */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Compact Props-based API - Vertical & Horizontal
        </h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Default vertical */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Vertical (Default)</h3>
            <NavigationMenu
              items={menuItems}
              orientation="vertical"
              defaultOpenIds={["products"]}
              onSelect={handleSelect}
            />
          </div>

          {/* Default horizontal */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Horizontal</h3>
            <NavigationMenu
              items={menuItems}
              orientation="horizontal"
              defaultOpenIds={["settings"]}
              onSelect={handleSelect}
            />
          </div>

          {/* Primary vertical */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Primary - Vertical</h3>
            <NavigationMenu
              items={menuItems}
              variant="primary"
              orientation="vertical"
              defaultOpenIds={["settings"]}
              onSelect={handleSelect}
            />
          </div>

          {/* Primary horizontal */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Primary - Horizontal</h3>
            <NavigationMenu
              items={menuItems}
              variant="primary"
              orientation="horizontal"
              defaultOpenIds={["products"]}
              onSelect={handleSelect}
            />
          </div>

          {/* Glass effect vertical */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Glass - Vertical</h3>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg p-4">
              <NavigationMenu
                items={menuItems}
                variant="glass"
                orientation="vertical"
                defaultOpenIds={["products", "categories-simple"]}
                onSelect={handleSelect}
              />
            </div>
          </div>

          {/* Glass effect horizontal */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Glass - Horizontal</h3>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg p-4">
              <NavigationMenu
                items={menuItems}
                variant="glass"
                orientation="horizontal"
                defaultOpenIds={["settings"]}
                onSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Composable Component API */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Composable Component API</h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Basic composition */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Basic Composition</h3>
            <NavigationMenu variant="outlined" onSelect={handleSelect}>
              <NavigationMenuItem
                id="dashboard"
                label="Dashboard"
                href="/dashboard"
                icon={<span>📊</span>}
              />
              <NavigationMenuItem
                id="analytics"
                label="Analytics"
                href="/analytics"
                icon={<span>📈</span>}
              />
              <NavigationMenuItem
                id="reports"
                label="Reports"
                href="/reports"
                icon={<span>📄</span>}
              />
            </NavigationMenu>
          </div>

          {/* With sections */}
          <div>
            <h3 className="text-lg font-semibold mb-2">With Sections</h3>
            <NavigationMenu variant="filled">
              <NavigationMenuSection title="Main">
                <NavigationMenuItem
                  id="overview"
                  label="Overview"
                  href="/overview"
                  icon={<span>👁️</span>}
                />
                <NavigationMenuItem
                  id="tasks"
                  label="Tasks"
                  href="/tasks"
                  icon={<span>✓</span>}
                  badge={
                    <span className="text-xs bg-red-500 px-1 rounded">3</span>
                  }
                />
              </NavigationMenuSection>
              <NavigationMenuSection title="Settings">
                <NavigationMenuItem
                  id="profile"
                  label="Profile"
                  href="/profile"
                  icon={<span>👤</span>}
                />
                <NavigationMenuItem
                  id="preferences"
                  label="Preferences"
                  href="/preferences"
                  icon={<span>🎨</span>}
                />
              </NavigationMenuSection>
            </NavigationMenu>
          </div>

          {/* Multi-level with Component API */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Multi-level Nested Menus ⭐
            </h3>
            <NavigationMenu variant="primary" onSelect={handleSelect}>
              <NavigationMenuItem
                id="home-comp-nested"
                label="Home"
                href="/"
                icon={<span>🏠</span>}
              />
              <NavigationMenuItem
                id="products-comp-nested"
                label="Products"
                icon={<span>📦</span>}
              >
                <NavigationMenuItem
                  id="all-products"
                  label="All Products"
                  href="/products"
                />
                <NavigationMenuItem
                  id="categories-comp"
                  label="Categories"
                  icon={<span>🏷️</span>}
                >
                  <NavigationMenuItem
                    id="electronics"
                    label="Electronics"
                    href="/electronics"
                  />
                  <NavigationMenuItem
                    id="clothing"
                    label="Clothing"
                    href="/clothing"
                  />
                  <NavigationMenuItem
                    id="food"
                    label="Food & Beverage"
                    href="/food"
                  />
                </NavigationMenuItem>
                <NavigationMenuItem
                  id="new-arrivals"
                  label="New Arrivals"
                  href="/new"
                />
              </NavigationMenuItem>
              <NavigationMenuItem
                id="users-comp-nested"
                label="Users"
                icon={<span>👥</span>}
              >
                <NavigationMenuItem
                  id="all-users"
                  label="All Users"
                  href="/users"
                />
                <NavigationMenuItem
                  id="add-user"
                  label="Add User"
                  href="/users/add"
                />
              </NavigationMenuItem>
            </NavigationMenu>
          </div>

          {/* Multi-level with children pattern */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Multi-level with Children Pattern ⭐
            </h3>
            <NavigationMenu variant="accent" onSelect={handleSelect}>
              <NavigationMenuItem
                id="dashboard-child"
                label="Dashboard"
                href="/dashboard"
                icon={<span>📊</span>}
              />
              <NavigationMenuItem
                id="settings-child"
                label="Settings"
                icon={<span>⚙️</span>}
              >
                <NavigationMenuItem
                  id="general-settings"
                  label="General"
                  href="/settings/general"
                />
                <NavigationMenuItem
                  id="security-settings"
                  label="Security"
                  href="/settings/security"
                />
                <NavigationMenuItem
                  id="notifications-settings"
                  label="Notifications"
                  icon={<span>🔔</span>}
                >
                  <NavigationMenuItem
                    id="email-notif"
                    label="Email"
                    href="/settings/notifications/email"
                  />
                  <NavigationMenuItem
                    id="push-notif"
                    label="Push"
                    href="/settings/notifications/push"
                  />
                </NavigationMenuItem>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>

          {/* Multi-level with sections */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Multi-level with Sections ⭐
            </h3>
            <NavigationMenu
              variant="outlined"
              defaultOpenIds={["admin-section"]}
            >
              <NavigationMenuSection title="Main">
                <NavigationMenuItem
                  id="home-section"
                  label="Home"
                  href="/"
                  icon={<span>🏠</span>}
                />
                <NavigationMenuItem
                  id="explore-section"
                  label="Explore"
                  icon={<span>🔍</span>}
                >
                  <NavigationMenuItem
                    id="trending"
                    label="Trending"
                    href="/explore/trending"
                  />
                  <NavigationMenuItem
                    id="new-releases"
                    label="New Releases"
                    href="/explore/new"
                  />
                </NavigationMenuItem>
              </NavigationMenuSection>
              <NavigationMenuSection title="Admin">
                <NavigationMenuItem
                  id="admin-section"
                  label="Management"
                  icon={<span>👑</span>}
                >
                  <NavigationMenuItem
                    id="users-mgmt"
                    label="Users"
                    icon={<span>👥</span>}
                  >
                    <NavigationMenuItem
                      id="all-users-mgmt"
                      label="All Users"
                      href="/admin/users"
                    />
                    <NavigationMenuItem
                      id="roles-mgmt"
                      label="Roles"
                      href="/admin/roles"
                    />
                  </NavigationMenuItem>
                  <NavigationMenuItem
                    id="content-mgmt"
                    label="Content"
                    href="/admin/content"
                  />
                </NavigationMenuItem>
              </NavigationMenuSection>
            </NavigationMenu>
          </div>
        </div>
      </section>

      {/* asChild Prop Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          asChild Prop - Custom Rendering
        </h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Custom Link component */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Custom Link Component (React Router)
            </h3>
            <NavigationMenu variant="ghost">
              <NavigationMenuItem id="custom-home" label="Home" asChild>
                {/* This would be a React Router Link in a real app */}
                <a
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/10"
                >
                  <span>🏠</span> Home
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem id="custom-about" label="About" asChild>
                <a
                  href="/about"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/10"
                >
                  <span>ℹ️</span> About
                </a>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>

          {/* Custom Button with special styling */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Custom Styled Elements
            </h3>
            <NavigationMenu variant="minimal">
              <NavigationMenuItem
                id="custom-action"
                label="Custom Action"
                asChild
              >
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition"
                  onClick={() => alert("Custom action!")}
                >
                  <span>✨</span> Special Action
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem id="custom-download" label="Download" asChild>
                <a
                  href="/download"
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  <span>⬇️</span> Download
                </a>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>
        </div>
      </section>

      {/* All Variants */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          All Variants - Vertical Mode
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          All 9 variants with multi-level navigation in vertical orientation
        </p>
        <div className="grid grid-cols-3 gap-6">
          {[
            "default",
            "primary",
            "secondary",
            "accent",
            "ghost",
            "glass",
            "filled",
            "outlined",
            "minimal",
          ].map((variant) => (
            <div
              key={variant}
              className={
                variant === "glass"
                  ? "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg p-4"
                  : ""
              }
            >
              <h3 className="text-sm font-semibold mb-2 capitalize">
                {variant}
              </h3>
              <NavigationMenu
                variant={variant as any}
                items={menuItems}
                size="sm"
                orientation="vertical"
                defaultOpenIds={["products"]}
                onSelect={handleSelect}
              />
            </div>
          ))}
        </div>
      </section>

      {/* All Variants Horizontal */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          All Variants - Horizontal Mode
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          All 9 variants with multi-level navigation in horizontal orientation
        </p>
        <div className="grid grid-cols-1 gap-6">
          {[
            "default",
            "primary",
            "secondary",
            "accent",
            "ghost",
            "glass",
            "filled",
            "outlined",
            "minimal",
          ].map((variant) => (
            <div key={variant}>
              <h3 className="text-sm font-semibold mb-2 capitalize">
                {variant}
              </h3>
              <div
                className={
                  variant === "glass"
                    ? "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg p-4"
                    : ""
                }
              >
                <NavigationMenu
                  variant={variant as any}
                  items={menuItems}
                  size="sm"
                  orientation="horizontal"
                  defaultOpenIds={["settings"]}
                  onSelect={handleSelect}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Sizes */}
      <section>
        <h2 className="text-2xl font-bold mb-4">All Sizes - Vertical</h2>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Small - Vertical</h3>
            <NavigationMenu
              items={menuItems}
              size="sm"
              variant="outlined"
              orientation="vertical"
              defaultOpenIds={["products"]}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Medium - Vertical</h3>
            <NavigationMenu
              items={menuItems}
              size="md"
              variant="outlined"
              orientation="vertical"
              defaultOpenIds={["settings"]}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Large - Vertical</h3>
            <NavigationMenu
              items={menuItems}
              size="lg"
              variant="outlined"
              orientation="vertical"
              defaultOpenIds={["products", "categories-simple"]}
            />
          </div>
        </div>
      </section>

      {/* All Sizes Horizontal */}
      <section>
        <h2 className="text-2xl font-bold mb-4">All Sizes - Horizontal</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Small - Horizontal</h3>
            <NavigationMenu
              items={menuItems}
              size="sm"
              variant="outlined"
              orientation="horizontal"
              defaultOpenIds={["products"]}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Medium - Horizontal</h3>
            <NavigationMenu
              items={menuItems}
              size="md"
              variant="outlined"
              orientation="horizontal"
              defaultOpenIds={["settings"]}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Large - Horizontal</h3>
            <NavigationMenu
              items={menuItems}
              size="lg"
              variant="outlined"
              orientation="horizontal"
              defaultOpenIds={["products", "categories-simple"]}
            />
          </div>
        </div>
      </section>

      {/* Responsive Navigation */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Responsive Navigation</h2>
        <div className="space-y-6">
          <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">
              Responsive Layout (Resize your browser!)
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              📱 Mobile ({"<768px"}): Vertical | 💻 Tablet (768px-1024px):
              Horizontal | 🖥️ Desktop ({">1024px"}): Vertical
            </p>
            <NavigationMenu
              items={menuItems}
              variant="outlined"
              responsive
              onSelect={handleSelect}
            />
          </div>

          <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">
              Responsive with Sections
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Section titles hide on tablet, show on mobile and desktop
            </p>
            <NavigationMenu variant="filled" responsive>
              <NavigationMenuSection title="Main Menu">
                <NavigationMenuItem
                  id="home-r"
                  label="Home"
                  href="/"
                  icon={<span>🏠</span>}
                />
                <NavigationMenuItem
                  id="products-r"
                  label="Products"
                  href="/products"
                  icon={<span>📦</span>}
                  badge={
                    <span className="text-xs bg-red-500 px-1 rounded">5</span>
                  }
                />
                <NavigationMenuItem
                  id="services-r"
                  label="Services"
                  href="/services"
                  icon={<span>🛠️</span>}
                />
              </NavigationMenuSection>
              <NavigationMenuSection title="Account">
                <NavigationMenuItem
                  id="profile-r"
                  label="Profile"
                  href="/profile"
                  icon={<span>👤</span>}
                />
                <NavigationMenuItem
                  id="settings-r"
                  label="Settings"
                  href="/settings"
                  icon={<span>⚙️</span>}
                />
                <NavigationMenuItem
                  id="logout-r"
                  label="Logout"
                  href="/logout"
                  icon={<span>🚪</span>}
                />
              </NavigationMenuSection>
            </NavigationMenu>
          </div>

          <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">
              Responsive Glass Effect
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Perfect for modern app sidebars that adapt to screen size
            </p>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-4">
              <NavigationMenu
                items={menuItems}
                variant="glass"
                responsive
                onSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
