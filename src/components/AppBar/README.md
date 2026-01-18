# AppBar

A comprehensive, feature-rich application bar component for creating navigation headers, toolbars, and top bars. Built with accessibility, responsiveness, and advanced scroll behaviors in mind.

## Features

- 🎨 **Multiple Visual Variants** - default, elevated, outlined, transparent, glass morphism
- 📌 **Flexible Positioning** - static, fixed, sticky, absolute
- 📱 **Fully Responsive** - mobile-first design with breakpoint-specific props
- 🎯 **Smart Layout System** - start/center/end content slots, secondary rows
- 🌗 **Advanced Effects** - elevation, blur, gradients, glassmorphism
- 📜 **Scroll Behaviors** - hide on scroll, shrink, elevate, color change
- 🔍 **Built-in Search** - expandable search with keyboard shortcuts
- 📣 **Announcement Bar** - dismissible announcement section
- 🍞 **Breadcrumbs** - integrated breadcrumb navigation
- ⚡ **Progress Indicator** - determinate and indeterminate progress bars
- ⌨️ **Keyboard Shortcuts** - command palette support
- ♿ **Fully Accessible** - WCAG compliant, skip links, focus management
- 🎭 **Rich Animation System** - entrance animations, scroll animations
- 🔧 **Extensive Hooks API** - useAppBar, useAppBarScroll, useAppBarHeight, etc.
- 🎯 **Sub-components** - AppBarProgress, AppBarSearch, AppBarTitle, and more

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

Renders in the normal document flow:

```tsx
<AppBar position="static">
  <div>Static AppBar</div>
</AppBar>
```

### Fixed

Stays at the top of viewport when scrolling:

```tsx
<AppBar position="fixed">
  <div>Fixed AppBar</div>
</AppBar>
```

### Sticky

Sticks to the top when scrolling reaches it:

```tsx
<AppBar position="sticky">
  <div>Sticky AppBar</div>
</AppBar>
```

### Absolute

Absolute positioning for advanced layouts:

```tsx
<AppBar position="absolute">
  <div>Absolute AppBar</div>
</AppBar>
```

## Visual Variants

### Default

Standard app bar with subtle background:

```tsx
<AppBar variant="default">Default AppBar</AppBar>
```

### Elevated

Raised appearance with shadow:

```tsx
<AppBar variant="elevated" elevation={3}>
  Elevated AppBar
</AppBar>
```

### Outlined

Subtle border design:

```tsx
<AppBar variant="outlined">Outlined AppBar</AppBar>
```

### Glass Morphism

Modern frosted glass effect:

```tsx
<AppBar variant="glass" blur glassIntensity={0.9}>
  Glass Effect AppBar
</AppBar>
```

### Transparent

Minimal, see-through design:

```tsx
<AppBar variant="transparent">Transparent AppBar</AppBar>
```

## Color Schemes

```tsx
<AppBar color="default">Default</AppBar>
<AppBar color="primary">Primary</AppBar>
<AppBar color="secondary">Secondary</AppBar>
<AppBar color="transparent">Transparent</AppBar>
```

## Advanced Scroll Behaviors

### Hide on Scroll Down

Automatically hide the app bar when scrolling down, show when scrolling up:

```tsx
<AppBar hideOnScroll scrollThreshold={100}>
  <div>Hides on scroll</div>
</AppBar>
```

### Shrink on Scroll

Reduce height when scrolled:

```tsx
<AppBar shrinkOnScroll size="lg">
  <div>Shrinks when scrolled</div>
</AppBar>
```

### Elevate on Scroll

Add elevation/shadow when scrolled:

```tsx
<AppBar elevateOnScroll scrollThreshold={50}>
  <div>Gains elevation on scroll</div>
</AppBar>
```

### Color Change on Scroll

Change background color when scrolled:

```tsx
<AppBar colorOnScroll scrollThreshold={100}>
  <div>Changes color on scroll</div>
</AppBar>
```

### Combined Scroll Effects

```tsx
<AppBar
  hideOnScroll
  elevateOnScroll
  shrinkOnScroll
  scrollThreshold={80}
  scrollDebounce={10}
>
  <div>Multiple scroll effects</div>
</AppBar>
```

## Layout System

### Content Slots

The AppBar provides three main content slots:

```tsx
<AppBar
  startContent={
    <div className="flex items-center gap-2">
      <MenuButton />
      <Logo />
    </div>
  }
  centerContent={<SearchBar />}
  endContent={
    <div className="flex items-center gap-2">
      <NotificationIcon />
      <Avatar />
    </div>
  }
/>
```

### Secondary Row

Add content below the main row:

```tsx
<AppBar
  secondaryContent={
    <Tabs>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
    </Tabs>
  }
>
  <div>Main content</div>
</AppBar>
```

### Size Options

```tsx
<AppBar size="sm">Small AppBar</AppBar>
<AppBar size="md">Medium AppBar (default)</AppBar>
<AppBar size="lg">Large AppBar</AppBar>
```

### Width Constraints

```tsx
<AppBar maxWidth="xl" centered>
  <div>Centered with max-width</div>
</AppBar>
```

## Progress Indicator

### Indeterminate Progress

```tsx
<AppBar showProgress progressVariant="indeterminate">
  <div>Loading...</div>
</AppBar>
```

### Determinate Progress

```tsx
<AppBar
  showProgress
  progressVariant="determinate"
  progressValue={65}
  progressPosition="bottom"
>
  <div>Upload Progress</div>
</AppBar>
```

### Using AppBarProgress Component

```tsx
import { AppBar, AppBarProgress } from "saha-ui";

<AppBar>
  <div>Main Content</div>
  <AppBarProgress value={75} variant="determinate" color="primary" />
</AppBar>;
```

## Search Integration

### Basic Search

```tsx
<AppBar
  searchable
  searchPlaceholder="Search..."
  onSearch={(query) => console.log(query)}
>
  <div>Content</div>
</AppBar>
```

### Controlled Search

```tsx
function MyApp() {
  const [searchExpanded, setSearchExpanded] = useState(false);

  return (
    <AppBar
      searchable
      searchExpanded={searchExpanded}
      onSearchToggle={() => setSearchExpanded(!searchExpanded)}
      onSearchChange={(query) => handleSearch(query)}
      searchPlaceholder="Type to search..."
    >
      <div>Content</div>
    </AppBar>
  );
}
```

### Using AppBarSearch Component

```tsx
import { AppBar, AppBarSearch } from "saha-ui";

<AppBar>
  <div className="flex items-center gap-4">
    <Logo />
    <AppBarSearch
      expanded={searchOpen}
      onToggle={() => setSearchOpen(!searchOpen)}
      onSearch={handleSearch}
      placeholder="Search anything..."
    />
  </div>
</AppBar>;
```

## Announcement Bar

### Basic Announcement

```tsx
<AppBar
  announcement="🎉 New features available! Check out the updates."
  announcementDismissible
  onAnnouncementDismiss={() => console.log("Dismissed")}
>
  <div>Main Content</div>
</AppBar>
```

### Custom Announcement

```tsx
import { AppBar, AppBarAnnouncement } from "saha-ui";

<AppBar>
  <AppBarAnnouncement
    dismissible
    onDismiss={handleDismiss}
    color="primary"
    icon={<InfoIcon />}
  >
    Limited time offer - 50% off all plans!
  </AppBarAnnouncement>
  <div>Main Content</div>
</AppBar>;
```

## Breadcrumbs Navigation

```tsx
<AppBar
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "Laptops" },
  ]}
>
  <div>Content</div>
</AppBar>
```

### Using AppBarBreadcrumbs Component

```tsx
import { AppBar, AppBarBreadcrumbs } from "saha-ui";

<AppBar>
  <AppBarBreadcrumbs items={breadcrumbItems} separator="/" maxItems={4} />
</AppBar>;
```

## Title and Subtitle

```tsx
<AppBar
  title="Dashboard"
  subtitle="Welcome back, John!"
  titleTruncate
  titleMaxWidth={300}
>
  <div>Actions</div>
</AppBar>
```

### Using AppBarTitle Component

```tsx
import { AppBar, AppBarTitle } from "saha-ui";

<AppBar>
  <AppBarTitle subtitle="Manage your projects" maxWidth={400}>
    Project Dashboard
  </AppBarTitle>
</AppBar>;
```

## Back Button

```tsx
<AppBar showBackButton onBack={() => router.back()} backLabel="Go Back">
  <div>Page Content</div>
</AppBar>
```

### Using AppBarBackButton Component

```tsx
import { AppBar, AppBarBackButton } from "saha-ui";

<AppBar>
  <AppBarBackButton onClick={handleBack} label="Back to Home" />
  <h1>Details Page</h1>
</AppBar>;
```

## Mobile Support

### Mobile Menu

```tsx
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AppBar
      mobileMenuOpen={mobileMenuOpen}
      onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      lockScroll
      mobileBreakpoint={768}
    >
      <div>Content</div>
    </AppBar>
  );
}
```

### Safe Area Insets

For devices with notches or dynamic islands:

```tsx
<AppBar safeAreaInsets position="fixed">
  <div>Content</div>
</AppBar>
```

### Collapsible on Mobile

```tsx
<AppBar collapsible collapsed={isCollapsed} onCollapseToggle={handleToggle}>
  <div>Content</div>
</AppBar>
```

## Keyboard Shortcuts

### Command Palette

```tsx
<AppBar
  commandPalette
  commandPaletteShortcut="mod+k"
  onCommandPaletteOpen={handleCommandPalette}
>
  <div>Content</div>
</AppBar>
```

### Custom Shortcuts

```tsx
<AppBar
  shortcuts={[
    {
      key: "s",
      ctrl: true,
      handler: handleSave,
      description: "Save changes",
    },
    {
      key: "f",
      ctrl: true,
      handler: handleSearch,
      description: "Search",
    },
  ]}
>
  <div>Content</div>
</AppBar>
```

## Accessibility Features

### Skip to Content

Automatically includes skip link for keyboard users:

```tsx
<AppBar
  skipToContent
  skipToContentLabel="Skip to main content"
  mainContentId="main-content"
>
  <div>Navigation</div>
</AppBar>
```

### Focus Management

```tsx
<AppBar trapFocus={mobileMenuOpen} restoreFocus ariaLabel="Main navigation">
  <div>Content</div>
</AppBar>
```

## Animation Options

### Entrance Animations

```tsx
<AppBar entrance="slideDown" animationDuration={400} easing="ease-out">
  <div>Animated Entry</div>
</AppBar>
```

Available entrance animations:

- `none` - No animation
- `slideDown` - Slide from top
- `fadeIn` - Fade in
- `slideUp` - Slide from bottom

### Respect User Preferences

```tsx
<AppBar respectReducedMotion entrance="slideDown">
  <div>Respects prefers-reduced-motion</div>
</AppBar>
```

## Context and Hooks

### useAppBar

Access app bar state from anywhere:

```tsx
import { useAppBar } from "saha-ui";

function MyComponent() {
  const {
    isScrolled,
    isVisible,
    isShrunk,
    height,
    variant,
    mobileMenuOpen,
    isMobile,
    scrollProgress,
  } = useAppBar();

  return <div>AppBar height: {height}px</div>;
}
```

### useAppBarScroll

Monitor scroll state:

```tsx
import { useAppBarScroll } from "saha-ui";

function MyComponent() {
  const { scrollY, scrollDirection, isScrolled } = useAppBarScroll({
    threshold: 100,
    debounce: 10,
  });

  return <div>Scrolled {scrollY}px</div>;
}
```

### useAppBarHeight

Get current app bar height:

```tsx
import { useAppBarHeight } from "saha-ui";

function ContentArea() {
  const height = useAppBarHeight();

  return <main style={{ paddingTop: height }}>Content</main>;
}
```

### Other Hooks

- `useAppBarVisible()` - Check if app bar is visible
- `useAppBarScrolled()` - Check if page is scrolled
- `useAppBarMobile()` - Check if in mobile view
- `useAppBarOptional()` - Optional context (doesn't throw)

## Complete Examples

### Modern Web App Header

```tsx
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AppBar position="sticky" variant="glass" blur elevateOnScroll>
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

### Admin Dashboard Header

```tsx
<AppBar
  position="fixed"
  variant="elevated"
  size="md"
  startContent={
    <div className="flex items-center gap-4">
      <AppBarMenuButton onClick={toggleSidebar} />
      <AppBarTitle>Admin Dashboard</AppBarTitle>
    </div>
  }
  endContent={
    <div className="flex items-center gap-3">
      <IconButton badge={5}>
        <NotificationIcon />
      </IconButton>
      <Avatar src={user.avatar} />
    </div>
  }
/>
```

### E-commerce Header

```tsx
<AppBar
  position="sticky"
  variant="glass"
  blur
  announcement="🎉 Free shipping on orders over $50!"
  announcementDismissible
  searchable
  searchPlaceholder="Search products..."
  onSearch={handleProductSearch}
>
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

### Documentation Site Header

```tsx
<AppBar
  position="fixed"
  hideOnScroll
  colorOnScroll
  showProgress
  progressVariant="indeterminate"
  breadcrumbs={[
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "AppBar" },
  ]}
  commandPalette
  commandPaletteShortcut="mod+k"
>
  <div className="container mx-auto px-4 flex items-center justify-between">
    <Logo />
    <ThemeToggle />
  </div>
</AppBar>
```

### Application with Tabs

```tsx
<AppBar
  position="sticky"
  variant="elevated"
  title="Analytics Dashboard"
  subtitle="Real-time insights"
  secondaryContent={
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </Tabs>
  }
>
  <div className="flex items-center justify-between">
    <AppBarBackButton onClick={handleBack} />
    <Button variant="primary">Export Data</Button>
  </div>
</AppBar>
```

## API Reference

### AppBar Props

| Prop                      | Type                                                                  | Default                  | Description               |
| ------------------------- | --------------------------------------------------------------------- | ------------------------ | ------------------------- |
| **Position & Layout**     |                                                                       |                          |                           |
| `position`                | `'static' \| 'fixed' \| 'sticky' \| 'absolute'`                       | `'static'`               | Positioning behavior      |
| `fullWidth`               | `boolean`                                                             | `true`                   | Stretch to full width     |
| `centered`                | `boolean`                                                             | `false`                  | Center content            |
| `maxWidth`                | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'`                     | `'full'`                 | Max content width         |
| `size`                    | `'sm' \| 'md' \| 'lg'`                                                | `'md'`                   | Height size               |
| `zIndex`                  | `number`                                                              | `1100`                   | Stacking order            |
| **Visual Style**          |                                                                       |                          |                           |
| `variant`                 | `'default' \| 'elevated' \| 'outlined' \| 'transparent' \| 'glass'`   | `'default'`              | Visual style              |
| `color`                   | `'default' \| 'primary' \| 'secondary' \| 'transparent' \| 'inherit'` | `'default'`              | Color scheme              |
| `elevation`               | `0 \| 1 \| 2 \| 3 \| 4`                                               | `0`                      | Shadow depth              |
| `blur`                    | `boolean`                                                             | `false`                  | Blur effect               |
| `glass`                   | `boolean`                                                             | `false`                  | Glass morphism            |
| `glassIntensity`          | `number`                                                              | `0.8`                    | Glass effect strength     |
| `gradient`                | `string`                                                              | -                        | Gradient background       |
| `gradientDirection`       | `'left' \| 'right' \| 'top' \| 'bottom' \| 'diagonal'`                | `'right'`                | Gradient direction        |
| **Scroll Behavior**       |                                                                       |                          |                           |
| `hideOnScroll`            | `boolean`                                                             | `false`                  | Hide when scrolling down  |
| `colorOnScroll`           | `boolean`                                                             | `false`                  | Change color on scroll    |
| `scrollThreshold`         | `number`                                                              | `50`                     | Scroll trigger point (px) |
| `shrinkOnScroll`          | `boolean`                                                             | `false`                  | Reduce size on scroll     |
| `elevateOnScroll`         | `boolean`                                                             | `false`                  | Add shadow on scroll      |
| `scrollContainer`         | `RefObject<HTMLElement> \| string`                                    | -                        | Custom scroll container   |
| `scrollDebounce`          | `number`                                                              | -                        | Debounce scroll (ms)      |
| `scrollThrottle`          | `number`                                                              | -                        | Throttle scroll (ms)      |
| `useIntersectionObserver` | `boolean`                                                             | `false`                  | Use Intersection Observer |
| **Progress**              |                                                                       |                          |                           |
| `showProgress`            | `boolean`                                                             | `false`                  | Show progress bar         |
| `progressValue`           | `number`                                                              | -                        | Progress value (0-100)    |
| `progressVariant`         | `'determinate' \| 'indeterminate'`                                    | `'indeterminate'`        | Progress type             |
| `progressColor`           | `string`                                                              | -                        | Progress bar color        |
| `progressPosition`        | `'top' \| 'bottom'`                                                   | `'bottom'`               | Progress position         |
| **Content Slots**         |                                                                       |                          |                           |
| `startContent`            | `ReactNode`                                                           | -                        | Left/start section        |
| `centerContent`           | `ReactNode`                                                           | -                        | Center section            |
| `endContent`              | `ReactNode`                                                           | -                        | Right/end section         |
| `secondaryContent`        | `ReactNode`                                                           | -                        | Secondary row             |
| `bottomContent`           | `ReactNode`                                                           | -                        | Bottom content            |
| `children`                | `ReactNode`                                                           | -                        | Main content              |
| **Title & Navigation**    |                                                                       |                          |                           |
| `title`                   | `ReactNode`                                                           | -                        | Page title                |
| `titleTruncate`           | `boolean`                                                             | `true`                   | Truncate long titles      |
| `titleMaxWidth`           | `string \| number`                                                    | -                        | Max title width           |
| `subtitle`                | `ReactNode`                                                           | -                        | Subtitle text             |
| `breadcrumbs`             | `BreadcrumbItem[]`                                                    | -                        | Breadcrumb items          |
| `showBackButton`          | `boolean`                                                             | `false`                  | Show back button          |
| `onBack`                  | `() => void`                                                          | -                        | Back button handler       |
| `backLabel`               | `string`                                                              | -                        | Back button label         |
| `navigationIcon`          | `ReactNode`                                                           | -                        | Custom nav icon           |
| `onNavigationClick`       | `() => void`                                                          | -                        | Nav icon handler          |
| **Announcement**          |                                                                       |                          |                           |
| `announcement`            | `ReactNode`                                                           | -                        | Announcement content      |
| `announcementDismissible` | `boolean`                                                             | `true`                   | Can dismiss               |
| `onAnnouncementDismiss`   | `() => void`                                                          | -                        | Dismiss handler           |
| `announcementColor`       | `string`                                                              | -                        | Background color          |
| `announcementTextColor`   | `string`                                                              | -                        | Text color                |
| **Search**                |                                                                       |                          |                           |
| `searchable`              | `boolean`                                                             | `false`                  | Enable search             |
| `searchExpanded`          | `boolean`                                                             | -                        | Search expanded state     |
| `onSearchToggle`          | `() => void`                                                          | -                        | Search toggle handler     |
| `onSearch`                | `(query: string) => void`                                             | -                        | Search submit handler     |
| `onSearchChange`          | `(query: string) => void`                                             | -                        | Search change handler     |
| `searchPlaceholder`       | `string`                                                              | -                        | Search placeholder        |
| `defaultSearchValue`      | `string`                                                              | -                        | Default search value      |
| `searchContent`           | `ReactNode`                                                           | -                        | Custom search content     |
| `searchIcon`              | `ReactNode`                                                           | -                        | Custom search icon        |
| **Mobile**                |                                                                       |                          |                           |
| `safeAreaInsets`          | `boolean`                                                             | `false`                  | Handle device notches     |
| `mobileMenuOpen`          | `boolean`                                                             | -                        | Mobile menu state         |
| `onMobileMenuToggle`      | `() => void`                                                          | -                        | Menu toggle handler       |
| `lockScroll`              | `boolean`                                                             | `true`                   | Lock body scroll          |
| `mobileBreakpoint`        | `number`                                                              | `768`                    | Mobile breakpoint (px)    |
| `collapsible`             | `boolean`                                                             | `false`                  | Collapsible on mobile     |
| `collapsed`               | `boolean`                                                             | -                        | Collapsed state           |
| `onCollapseToggle`        | `() => void`                                                          | -                        | Collapse handler          |
| **Accessibility**         |                                                                       |                          |                           |
| `skipToContent`           | `boolean`                                                             | `true`                   | Show skip link            |
| `skipToContentLabel`      | `string`                                                              | `'Skip to main content'` | Skip link text            |
| `mainContentId`           | `string`                                                              | `'main-content'`         | Main content ID           |
| `trapFocus`               | `boolean`                                                             | `false`                  | Trap focus inside         |
| `restoreFocus`            | `boolean`                                                             | `true`                   | Restore focus on close    |
| `ariaLabel`               | `string`                                                              | -                        | Accessible label          |
| **Animation**             |                                                                       |                          |                           |
| `animation`               | `'none' \| 'fade' \| 'slide' \| 'scale'`                              | `'slide'`                | Animation type            |
| `animationDuration`       | `number`                                                              | `300`                    | Animation duration (ms)   |
| `entrance`                | `'none' \| 'slideDown' \| 'fadeIn' \| 'slideUp'`                      | `'none'`                 | Entrance animation        |
| `easing`                  | `'ease' \| 'ease-in' \| 'ease-out' \| 'ease-in-out' \| 'spring'`      | `'ease-out'`             | Animation easing          |
| `respectReducedMotion`    | `boolean`                                                             | `true`                   | Respect a11y preference   |
| **Keyboard**              |                                                                       |                          |                           |
| `shortcuts`               | `KeyboardShortcut[]`                                                  | -                        | Keyboard shortcuts        |
| `commandPalette`          | `boolean`                                                             | `false`                  | Enable command palette    |
| `onCommandPaletteOpen`    | `() => void`                                                          | -                        | Command palette handler   |
| `commandPaletteShortcut`  | `string`                                                              | `'mod+k'`                | Palette shortcut          |
| **Advanced**              |                                                                       |                          |                           |
| `portal`                  | `boolean`                                                             | `false`                  | Render in portal          |
| `portalContainer`         | `HTMLElement`                                                         | -                        | Portal container          |
| `hideOnPrint`             | `boolean`                                                             | `true`                   | Hide when printing        |
| `onResize`                | `(width, height) => void`                                             | -                        | Resize handler            |
| `onHeightChange`          | `(height) => void`                                                    | -                        | Height change handler     |
| `observeResize`           | `boolean`                                                             | `false`                  | Observe size changes      |
| `asChild`                 | `boolean`                                                             | `false`                  | Render as child           |
| `className`               | `string`                                                              | -                        | Additional classes        |
| `style`                   | `CSSProperties`                                                       | -                        | Inline styles             |

### Sub-Components

#### AppBarProgress

```tsx
<AppBarProgress
  value={75}
  variant="determinate"
  color="primary"
  position="bottom"
  height={3}
/>
```

| Prop       | Type                               | Default           |
| ---------- | ---------------------------------- | ----------------- |
| `value`    | `number`                           | -                 |
| `variant`  | `'determinate' \| 'indeterminate'` | `'indeterminate'` |
| `color`    | `string`                           | -                 |
| `position` | `'top' \| 'bottom'`                | `'bottom'`        |
| `height`   | `number`                           | `3`               |

#### AppBarSearch

```tsx
<AppBarSearch
  expanded={true}
  onToggle={() => {}}
  onSearch={(q) => {}}
  placeholder="Search..."
  autoFocus
/>
```

| Prop           | Type                      | Default |
| -------------- | ------------------------- | ------- |
| `expanded`     | `boolean`                 | -       |
| `onToggle`     | `() => void`              | -       |
| `onSearch`     | `(query: string) => void` | -       |
| `onChange`     | `(query: string) => void` | -       |
| `placeholder`  | `string`                  | -       |
| `defaultValue` | `string`                  | -       |
| `icon`         | `ReactNode`               | -       |
| `autoFocus`    | `boolean`                 | `false` |

#### AppBarAnnouncement

```tsx
<AppBarAnnouncement
  dismissible
  onDismiss={() => {}}
  color="primary"
  icon={<InfoIcon />}
>
  Important announcement!
</AppBarAnnouncement>
```

| Prop          | Type         | Default |
| ------------- | ------------ | ------- |
| `children`    | `ReactNode`  | -       |
| `dismissible` | `boolean`    | `true`  |
| `onDismiss`   | `() => void` | -       |
| `color`       | `string`     | -       |
| `textColor`   | `string`     | -       |
| `icon`        | `ReactNode`  | -       |

#### AppBarTitle

```tsx
<AppBarTitle subtitle="Dashboard overview" truncate maxWidth={300}>
  My Dashboard
</AppBarTitle>
```

| Prop       | Type               | Default |
| ---------- | ------------------ | ------- |
| `children` | `ReactNode`        | -       |
| `subtitle` | `ReactNode`        | -       |
| `truncate` | `boolean`          | `true`  |
| `maxWidth` | `string \| number` | -       |

#### AppBarBreadcrumbs

```tsx
<AppBarBreadcrumbs items={breadcrumbItems} separator="/" maxItems={4} />
```

| Prop        | Type               | Default |
| ----------- | ------------------ | ------- |
| `items`     | `BreadcrumbItem[]` | -       |
| `separator` | `ReactNode`        | `'/'`   |
| `maxItems`  | `number`           | -       |

#### AppBarBackButton

```tsx
<AppBarBackButton onClick={handleBack} label="Back" />
```

#### AppBarMenuButton

```tsx
<AppBarMenuButton onClick={toggleMenu} open={menuOpen} />
```

### Hooks API

#### useAppBar()

Access app bar context:

```tsx
const {
  isScrolled,
  isVisible,
  isShrunk,
  height,
  variant,
  color,
  mobileMenuOpen,
  searchExpanded,
  collapsed,
  isMobile,
  scrollProgress,
} = useAppBar();
```

#### useAppBarScroll(options?)

Monitor scroll state:

```tsx
const { scrollY, scrollDirection, isScrolled, scrollProgress } =
  useAppBarScroll({
    threshold: 100,
    debounce: 10,
    throttle: 50,
    container: scrollRef,
  });
```

#### useAppBarHeight()

Get current height:

```tsx
const height = useAppBarHeight();
```

#### useAppBarVisible()

Check visibility:

```tsx
const isVisible = useAppBarVisible();
```

#### useAppBarScrolled()

Check scroll state:

```tsx
const isScrolled = useAppBarScrolled();
```

#### useAppBarMobile()

Check mobile state:

```tsx
const isMobile = useAppBarMobile();
```

#### useAppBarOptional()

Optional context access (doesn't throw):

```tsx
const context = useAppBarOptional();
if (context) {
  // Use context
}
```

### Types

#### BreadcrumbItem

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}
```

#### KeyboardShortcut

```typescript
interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  handler: () => void;
  description?: string;
}
```

#### AppBarContextValue

```typescript
interface AppBarContextValue {
  isScrolled: boolean;
  isVisible: boolean;
  isShrunk: boolean;
  height: number;
  variant: AppBarVariant;
  color: AppBarColor;
  mobileMenuOpen: boolean;
  searchExpanded: boolean;
  collapsed: boolean;
  isMobile: boolean;
  scrollProgress: number;
}
```

## Styling and Customization

### Custom CSS Classes

```tsx
<AppBar
  className="border-b-2 border-primary shadow-lg"
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

### Custom Shadows

```tsx
<AppBar
  elevation={3}
  lightShadow="0 4px 6px rgba(0,0,0,0.1)"
  darkShadow="0 4px 6px rgba(0,0,0,0.3)"
>
  <div>Custom Shadow</div>
</AppBar>
```

### Gradient Backgrounds

```tsx
<AppBar
  gradient="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
  gradientDirection="right"
>
  <div>Gradient AppBar</div>
</AppBar>
```

### Glass Morphism

```tsx
<AppBar variant="glass" blur glassIntensity={0.9} className="backdrop-blur-xl">
  <div>Modern Glass Effect</div>
</AppBar>
```

## Common Patterns and Recipes

### Admin Dashboard Header

```tsx
<AppBar
  position="fixed"
  variant="elevated"
  startContent={
    <div className="flex items-center gap-4">
      <AppBarMenuButton onClick={toggleSidebar} />
      <AppBarTitle>Admin Dashboard</AppBarTitle>
    </div>
  }
  endContent={
    <div className="flex items-center gap-3">
      <IconButton badge={5}>
        <NotificationIcon />
      </IconButton>
      <Avatar src={user.avatar} />
    </div>
  }
/>
```

### E-commerce Store Header

```tsx
<AppBar
  position="sticky"
  variant="glass"
  blur
  announcement="🎉 Free shipping on orders over $50!"
  announcementDismissible
  searchable
  searchPlaceholder="Search products..."
>
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

### SaaS Dashboard with Tabs

```tsx
<AppBar
  position="sticky"
  hideOnScroll
  elevateOnScroll
  title="Project Dashboard"
  subtitle="Real-time overview"
  showBackButton
  onBack={() => router.push("/projects")}
  secondaryContent={
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </Tabs>
  }
  endContent={
    <div className="flex gap-2">
      <Button variant="ghost">Share</Button>
      <Button variant="primary">Export</Button>
    </div>
  }
/>
```

### Fixed Position with Content Padding

When using `position="fixed"`, ensure your content doesn't hide under the AppBar:

```tsx
function Layout() {
  const appBarHeight = useAppBarHeight();

  return (
    <>
      <AppBar position="fixed">
        <div>Fixed Header</div>
      </AppBar>

      {/* Dynamic padding based on actual height */}
      <main style={{ paddingTop: appBarHeight }}>
        <div>Page content...</div>
      </main>
    </>
  );
}
```

### Responsive Design Pattern

```tsx
<AppBar
  size="md"
  responsive={{
    sm: { size: "sm", hideOnScroll: true },
    md: { size: "md", hideOnScroll: false },
    lg: { size: "lg", variant: "elevated" },
  }}
  mobileBreakpoint={768}
>
  <div>Responsive AppBar</div>
</AppBar>
```

### Loading State with Progress

```tsx
function AppWithLoading() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <AppBar
      showProgress={loading}
      progressVariant={progress > 0 ? "determinate" : "indeterminate"}
      progressValue={progress}
      progressPosition="top"
    >
      <div>Content</div>
    </AppBar>
  );
}
```

## Accessibility

The AppBar component is built with accessibility as a priority:

### Semantic HTML

Uses the semantic `<header>` element for proper document structure.

```tsx
<AppBar ariaLabel="Main navigation">
  <nav>Navigation items</nav>
</AppBar>
```

### Skip to Content

Automatically includes a skip link for keyboard users:

```tsx
<AppBar
  skipToContent
  skipToContentLabel="Skip to main content"
  mainContentId="main-content"
>
  <div>Navigation</div>
</AppBar>;

{
  /* Your main content */
}
<main id="main-content">
  <h1>Page Content</h1>
</main>;
```

### Keyboard Navigation

All interactive elements are keyboard accessible:

```tsx
<AppBar
  shortcuts={[
    { key: "s", ctrl: true, handler: handleSearch, description: "Search" },
    { key: "m", ctrl: true, handler: toggleMenu, description: "Toggle menu" },
  ]}
>
  <nav aria-label="Main navigation">
    <button aria-label="Open menu">
      <MenuIcon />
    </button>
  </nav>
</AppBar>
```

### Focus Management

```tsx
<AppBar trapFocus={mobileMenuOpen} restoreFocus ariaLabel="Site header">
  <div>Content</div>
</AppBar>
```

### ARIA Labels

Always provide labels for icon-only buttons:

```tsx
<AppBar>
  <button aria-label="Search">
    <SearchIcon />
  </button>
  <button aria-label="Notifications" aria-describedby="notification-count">
    <NotificationIcon />
    <span id="notification-count" className="sr-only">
      5 new notifications
    </span>
  </button>
</AppBar>
```

### Screen Reader Support

```tsx
<AppBar>
  <nav role="navigation" aria-label="Primary">
    <ul role="list">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </ul>
  </nav>
</AppBar>
```

### Reduced Motion

Respects user's motion preferences:

```tsx
<AppBar
  entrance="slideDown"
  respectReducedMotion // Automatically respects prefers-reduced-motion
>
  <div>Content</div>
</AppBar>
```

## Best Practices

### Performance

1. **Debounce Scroll Events**: Use scroll debouncing for better performance

   ```tsx
   <AppBar hideOnScroll scrollDebounce={10} scrollThrottle={50} />
   ```

2. **Intersection Observer**: For better scroll performance

   ```tsx
   <AppBar elevateOnScroll useIntersectionObserver />
   ```

3. **Memoize Handlers**: Wrap callbacks in useCallback
   ```tsx
   const handleSearch = useCallback((query: string) => {
     // Search logic
   }, []);
   ```

### Design Guidelines

1. **Keep It Simple**: Don't overcrowd the AppBar with too many elements
2. **Mobile First**: Design for mobile, enhance for desktop
3. **Consistent Height**: Maintain consistent height across pages (use `size` prop)
4. **Clear Hierarchy**: Make primary actions more prominent
5. **Responsive Breakpoints**: Hide/show elements appropriately
6. **Z-Index Management**: Be mindful of stacking contexts

### Layout Tips

1. **Fixed Position Padding**: Always add padding to page content when using fixed position

   ```tsx
   const height = useAppBarHeight();
   <main style={{ paddingTop: height }}>Content</main>;
   ```

2. **Content Width**: Use `maxWidth` prop for consistent content width

   ```tsx
   <AppBar maxWidth="xl" centered>
     Content
   </AppBar>
   ```

3. **Loading States**: Show progress indicators during async operations
   ```tsx
   <AppBar showProgress={isLoading} />
   ```

### Accessibility Best Practices

1. Always provide `aria-label` for icon-only buttons
2. Use semantic HTML elements
3. Ensure sufficient color contrast
4. Provide skip links for keyboard users
5. Test with screen readers
6. Support keyboard navigation
7. Respect user motion preferences

### Common Pitfalls to Avoid

❌ **Don't** use too many scroll effects together (performance)
❌ **Don't** forget to add padding when using `position="fixed"`
❌ **Don't** neglect mobile responsiveness
❌ **Don't** use unclear icon-only buttons without labels
❌ **Don't** override z-index without understanding implications

✅ **Do** use semantic HTML
✅ **Do** test on mobile devices
✅ **Do** provide keyboard shortcuts for power users
✅ **Do** use progressive enhancement
✅ **Do** respect user preferences (reduced motion, etc.)

## Framework Integration

### Next.js

```tsx
// app/layout.tsx
import { AppBar } from "saha-ui";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppBar position="sticky" variant="elevated">
          <nav>Navigation</nav>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
```

### React Router

```tsx
import { AppBar } from "saha-ui";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      showBackButton={location.pathname !== "/"}
      onBack={() => navigate(-1)}
      breadcrumbs={getBreadcrumbs(location.pathname)}
    >
      <nav>Navigation</nav>
    </AppBar>
  );
}
```

### Remix

```tsx
import { AppBar } from "saha-ui";
import { useNavigate } from "@remix-run/react";

export default function Root() {
  const navigate = useNavigate();

  return (
    <AppBar onBack={() => navigate(-1)}>
      <nav>Navigation</nav>
    </AppBar>
  );
}
```

## Related Components

- **[Toolbar](../Toolbar/README.md)** - Simpler toolbar component for actions
- **[Tabs](../Tabs/README.md)** - Often used within AppBar secondary content
- **[Breadcrumb](../Breadcrumb/README.md)** - Navigation breadcrumbs
- **[Container](../Container/README.md)** - For constraining AppBar content width
- **[Button](../Button/README.md)** - Action buttons in AppBar
- **[Avatar](../Avatar/README.md)** - User avatars in AppBar
- **[Badge](../Badge/README.md)** - Notification badges

## Troubleshooting

### AppBar not sticking

Ensure parent elements don't have `overflow: hidden`:

```tsx
// Parent should allow sticky positioning
<div className="overflow-visible">
  <AppBar position="sticky">Content</AppBar>
</div>
```

### Content hidden under fixed AppBar

Add padding to your content:

```tsx
const height = useAppBarHeight();
<main style={{ paddingTop: height }}>Content</main>;
```

### Scroll effects not working

Check that scroll container is correct:

```tsx
// If scrolling a custom container
<AppBar hideOnScroll scrollContainer={scrollContainerRef}>
  Content
</AppBar>
```

### Z-index conflicts

Adjust z-index if needed:

```tsx
<AppBar zIndex={1300}>Content</AppBar>
```

### Performance issues with scroll

Use debouncing and throttling:

```tsx
<AppBar
  hideOnScroll
  scrollDebounce={10}
  scrollThrottle={50}
  useIntersectionObserver
>
  Content
</AppBar>
```

## Migration Guide

### From v0.x to v1.x

```tsx
// Old
<AppBar fixed elevated>

// New
<AppBar position="fixed" variant="elevated">
```

Key changes:

- `fixed` prop → `position="fixed"`
- `elevated` prop → `variant="elevated"`
- `hideOnScroll` is now a dedicated prop
- New sub-components for specialized content

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ iOS Safari (latest)
- ✅ Chrome Android (latest)

### Polyfills Required

For older browsers, you may need:

- Intersection Observer API polyfill (if using `useIntersectionObserver`)
- ResizeObserver polyfill (if using `observeResize`)

## Contributing

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/your-org/saha-ui).

## License

MIT © Saha UI

## Changelog

### v1.2.0

- Added `AppBarSearch` component
- Added `AppBarAnnouncement` component
- Added command palette support
- Enhanced scroll behaviors
- Improved accessibility

### v1.1.0

- Added breadcrumbs support
- Added progress indicator
- Added mobile menu support
- Performance optimizations

### v1.0.0

- Initial release
- Core AppBar functionality
- Multiple variants and positioning options
- Scroll behaviors
- Accessibility features
