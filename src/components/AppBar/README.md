# AppBar

A flexible application bar component for creating navigation headers, toolbars, and top bars. Features responsive design, sticky positioning, and customizable layouts.

## Features

- 🎨 Multiple visual variants
- 📌 Sticky/fixed positioning options
- 📱 Responsive design with mobile support
- 🎯 Flexible layout with left, center, and right sections
- 🌗 Elevation and shadow effects
- ♿ Fully accessible
- 🎭 Customizable styling

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { AppBar } from "saha-ui";

function MyApp() {
  return (
    <AppBar>
      <div className="flex items-center justify-between">
        <h1>My App</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
      </div>
    </AppBar>
  );
}
```

## Positioning

### Static (Default)

```tsx
<AppBar position="static">
  <div>Static AppBar</div>
</AppBar>
```

### Fixed

Stays at top of viewport when scrolling:

```tsx
<AppBar position="fixed">
  <div>Fixed AppBar</div>
</AppBar>
```

### Sticky

Sticks to top when scrolling reaches it:

```tsx
<AppBar position="sticky">
  <div>Sticky AppBar</div>
</AppBar>
```

## Variants

```tsx
<AppBar variant="default">Default AppBar</AppBar>
<AppBar variant="glass">Glass Effect AppBar</AppBar>
<AppBar variant="transparent">Transparent AppBar</AppBar>
<AppBar variant="elevated">Elevated AppBar</AppBar>
```

## Complete Example

```tsx
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AppBar position="sticky" variant="glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold">MyApp</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="hover:text-primary">
              Home
            </a>
            <a href="/products" className="hover:text-primary">
              Products
            </a>
            <a href="/about" className="hover:text-primary">
              About
            </a>
            <a href="/contact" className="hover:text-primary">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <a href="/" className="block py-2">
              Home
            </a>
            <a href="/products" className="block py-2">
              Products
            </a>
            <a href="/about" className="block py-2">
              About
            </a>
            <a href="/contact" className="block py-2">
              Contact
            </a>
          </nav>
        )}
      </div>
    </AppBar>
  );
}
```

## With Search

```tsx
<AppBar position="fixed">
  <div className="container mx-auto px-4 flex items-center gap-4">
    <Logo />

    <div className="flex-1 max-w-xl">
      <Input placeholder="Search..." leftIcon={<SearchIcon />} />
    </div>

    <div className="flex items-center gap-2">
      <IconButton variant="ghost">
        <NotificationIcon />
      </IconButton>
      <Avatar src="/user.jpg" size="sm" />
    </div>
  </div>
</AppBar>
```

## With Tabs

```tsx
<AppBar position="sticky">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <Logo />
      <ThemeToggle />
    </div>
    <Tabs defaultValue="overview" className="border-t">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</AppBar>
```

## API Reference

### AppBar Props

| Prop        | Type                                                  | Default     | Description             |
| ----------- | ----------------------------------------------------- | ----------- | ----------------------- |
| `position`  | `'static' \| 'fixed' \| 'sticky' \| 'absolute'`       | `'static'`  | Positioning behavior    |
| `variant`   | `'default' \| 'glass' \| 'transparent' \| 'elevated'` | `'default'` | Visual style variant    |
| `elevation` | `number` (0-5)                                        | `1`         | Shadow depth level      |
| `color`     | `'default' \| 'primary' \| 'transparent'`             | `'default'` | Background color scheme |
| `className` | `string`                                              | -           | Additional CSS classes  |
| `children`  | `ReactNode`                                           | -           | AppBar content          |

## Styling

### Custom Styles

```tsx
<AppBar
  className="border-b-2 border-primary"
  style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
>
  <div>Custom Styled AppBar</div>
</AppBar>
```

### Responsive Height

```tsx
<AppBar className="h-14 md:h-16 lg:h-20">
  <div>Responsive Height AppBar</div>
</AppBar>
```

## Common Patterns

### Admin Dashboard Header

```tsx
<AppBar position="fixed" variant="elevated">
  <div className="flex items-center justify-between px-4 h-16">
    <div className="flex items-center gap-4">
      <IconButton onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
    </div>

    <div className="flex items-center gap-3">
      <IconButton badge={5}>
        <NotificationIcon />
      </IconButton>
      <Avatar src={user.avatar} />
    </div>
  </div>
</AppBar>
```

### E-commerce Header

```tsx
<AppBar position="sticky" variant="glass">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <Logo />

      <nav className="hidden lg:flex gap-6">
        <a href="/shop">Shop</a>
        <a href="/collections">Collections</a>
        <a href="/sale">Sale</a>
      </nav>

      <div className="flex items-center gap-3">
        <IconButton variant="ghost">
          <SearchIcon />
        </IconButton>
        <IconButton variant="ghost" badge={3}>
          <CartIcon />
        </IconButton>
        <Button variant="primary" size="sm">
          Sign In
        </Button>
      </div>
    </div>
  </div>
</AppBar>
```

### Blog Header

```tsx
<AppBar position="static" variant="transparent">
  <div className="max-w-4xl mx-auto px-4 py-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">My Blog</h1>
      <p className="text-muted-foreground">Thoughts, stories, and ideas</p>
    </div>

    <nav className="flex justify-center gap-6 mt-6">
      <a href="/">Home</a>
      <a href="/articles">Articles</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </div>
</AppBar>
```

## Accessibility

- Uses semantic `<header>` element
- Proper heading hierarchy with logo/title
- Keyboard navigation support for all interactive elements
- Focus indicators on navigation items
- ARIA labels for icon-only buttons

```tsx
<AppBar>
  <nav aria-label="Main navigation">
    <button aria-label="Open menu">
      <MenuIcon />
    </button>
  </nav>
</AppBar>
```

## Best Practices

1. **Keep It Simple:** Don't overcrowd the AppBar with too many elements
2. **Mobile First:** Design for mobile, enhance for desktop
3. **Consistent Height:** Maintain consistent height across pages
4. **Clear Hierarchy:** Make primary actions more prominent
5. **Responsive Breakpoints:** Hide/show elements appropriately
6. **Fixed Position Padding:** Add padding to page content when using fixed position
7. **Loading States:** Consider skeleton loading for dynamic content

## With Fixed Position

When using `position="fixed"`, add padding to your page content:

```tsx
function Layout() {
  return (
    <>
      <AppBar position="fixed">
        <div>Fixed Header</div>
      </AppBar>

      {/* Add padding equal to AppBar height */}
      <main className="pt-16">
        <div>Page content...</div>
      </main>
    </>
  );
}
```

## Related Components

- **Toolbar** - Simpler toolbar component
- **Tabs** - Often used within AppBar
- **Breadcrumb** - Can be included in AppBar
- **Container** - For constraining AppBar content width

## Changelog

- **v1.0.0** - Initial release with all variants and positioning options
