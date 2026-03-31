<div align="center">
  <h1>🎨 Saha UI</h1>
  <p><strong>Ultra-Modern React Component Library</strong></p>

  <p>
    <a href="https://www.npmjs.com/package/saha-ui"><img src="https://img.shields.io/npm/v/saha-ui.svg?style=flat-square" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/saha-ui"><img src="https://img.shields.io/npm/dm/saha-ui.svg?style=flat-square" alt="npm downloads"></a>
    <a href="https://github.com/Xenial-Devil/Saha-ui/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/saha-ui.svg?style=flat-square" alt="license"></a>
    <a href="https://github.com/Xenial-Devil/Saha-ui"><img src="https://img.shields.io/github/stars/Xenial-Devil/Saha-ui?style=flat-square" alt="stars"></a>
  </p>

  <p>
    A beautiful, accessible, and type-safe React component library built with<br/>
    <strong>TypeScript</strong> • <strong>Tailwind CSS v4</strong> • <strong>OKLCH Colors</strong> • <strong>Glass Morphism</strong><br/>
    ✅ <strong>Next.js 15/16 Ready</strong> • <strong>App Router</strong> • <strong>Server Components</strong>
  </p>

</div>

---

## ✨ Features

- 🎨 **126 Modern Components** - Accordion, Affix, Alert, AnnouncementBar, AppBar, AspectRatio, Autocomplete, Avatar, AvatarGroup, Backdrop, Badge, BottomNavigation, Breadcrumb, Button, ButtonGroup, Calendar, Card, Carousel, Chart, ChatBubble, Checkbox, Chip, CodeEditor, Collapsible, ColorPicker, Combobox, Command, Confetti, Container, ContextMenu, CookieConsent, CountdownTimer, DataTable, DatePicker, DateRangePicker, DateTimePicker, Dialog, Dock, DragDrop, Drawer, Dropdown, Empty, Field, FileInput, FloatingActionButton, FloatingToolbar, Form, GanttChart, Grid, HoverCard, IconButton, Image, ImageCropper, ImageGallery, InfiniteScroll, Input, InputOTP, Item, KanbanBoard, Kbd, Label, Link, List, Masonry, Menubar, MultiSelect, NativeSelect, NavigationMenu, NotificationCenter, NumberInput, OTPDisplayBlock, Pagination, Paper, PasswordInput, PhoneInput, PlayButton, Popover, Progress, QRCode, Radio, Rating, Resizable, Result, ScrollArea, SearchInput, Section, Segmented, Select, Separator, Sidebar, Skeleton, Slider, Snackbar, Sonner, SpeedDial, Spinner, SplitButton, SpotlightSearch, Stack, StatCard, Stepper, Steps, Switch, Tab, Table, Tag, TagInput, TextArea, TextEditor, ThemeProvider, ThemeToggle, TimePicker, Timeline, Toast, Toggle, ToggleGroup, Tooltip, Tour, Transfer, Tree, TypewriterText, Typography, Upload, VideoPlayer, VirtualList, Watermark
- ⚡ **Next.js 15/16 Ready** - Full App Router support with Server & Client Components
- 🌓 **Dark Mode** - Seamless theme switching with full dark mode support
- 🔮 **Glass Morphism** - Beautiful backdrop blur effects across components
- 🎯 **Type-Safe** - Full TypeScript support with comprehensive prop types
- ♿ **Accessible** - ARIA-compliant with keyboard navigation
- 🎭 **CVA Variants** - Type-safe variant management with class-variance-authority
- 🎨 **OKLCH Colors** - Perceptually uniform color system for accurate theming
- ⚡ **Tree-Shakeable** - Import only what you need, optimized bundle size
- 📦 **Modular** - Individual component imports for maximum flexibility
- 📱 **Responsive** - Mobile-first design with touch gesture support
- 🔧 **Customizable** - Easy to extend and customize with Tailwind CSS
- 📏 **Flexible Sizing** - All components support comprehensive size variants (xs, sm, md, lg, xl, 2xl, 3xl, 4xl)
- 🪝 **39 Custom Hooks** - Comprehensive hook library including useAccordion, useAnimation, useArray, useAspectRatio, useAsync, useAvatar, useChartColors, useChartData, useClickOutside, useClipboard, useColorMode, useControllableState, useCounter, useDataTable, useDebounce, useDisclosure, useDOM, useEventListener, useFetch, useFocusTrap, useForm, useHover, useIntersectionObserver, useInterval, useLocalStorage, useMediaQuery, useMergedRefs, usePagination, usePrevious, useReducedMotion, useScrollLock, useSearchFilter, useSessionStorage, useThrottle, useTimeout, useToggle, useUpdateEffect, useValidation, useWindowSize

---

## 📦 Installation

### Initialize Saha UI (REQUIRED)

Run this command in your project root to install and  setup all configuration and ready to use


```bash
# npm
npx saha-ui@latest init

# yarn
yarn dlx saha-ui@latest init

# pnpm
pnpm dlx saha-ui@latest init
```

This will automatically:

- ✅ Inject CSS variables and design tokens
- ✅ Configure Tailwind to scan Saha UI components in `node_modules`
- ✅ Install required dependencies
- ✅ Detect your Tailwind version (v3 or v4) and configure accordingly



### Peer Dependencies

Saha UI requires React 18+ or React 19+:

```bash
# npm
npm install react@^18.0.0 react-dom@^18.0.0
# or
npm install react@^19.0.0 react-dom@^19.0.0

# yarn
yarn add react@^18.0.0 react-dom@^18.0.0
# or
yarn add react@^19.0.0 react-dom@^19.0.0

# pnpm
pnpm add react@^18.0.0 react-dom@^18.0.0
# or
pnpm add react@^19.0.0 react-dom@^19.0.0
```

### Basic Usage

```tsx
import { Button } from 'saha-ui';

function App() {
  return (
  <Button> Saha UI</Button>
  );
}
```

## 📦 Components Library

<div align="center">

### ✨ **93 Beautiful Components** • **39 Custom Hooks** • **9 Categories**

</div>

<table>
<tr>
<td width="33.33%" valign="top">

### 🏗️ Layout
```
Container    Grid
Masonry      Paper
Section      Stack
```

### 🧭 Navigation
```
AppBar           Breadcrumb
BottomNav        Link
Menubar          NavMenu
Pagination       Segmented
Steps
```

### 📝 Forms
```
Autocomplete     DatePicker
Checkbox         Field
CheckboxGroup    Form
ColorPicker      Input
Combobox         InputOTP
```

</td>
<td width="33%.33" valign="top">

### 🔘 Buttons
```
Button           IconButton
ButtonGroup      PlayButton
FloatingAction   SpeedDial
Toggle           ToggleGroup
```

### 📊 Data Display
```
Accordion        Label
Avatar           List
AvatarGroup      Rating
Badge            Separator
Card             Skeleton
Chip             StatCard
CodeEditor       Table
DataTable        Tabs
Empty            Tag
Image            Timeline
Kbd              Typography
```

</td>
<td width="33.33%" valign="top">

### 💬 Feedback
```
Alert            Spinner
Backdrop         Toast
Progress         Tooltip
Result           Tour
Snackbar
```

### 🎭 Overlay
```
Command          Drawer
ContextMenu      Dropdown
Dialog           HoverCard
Popover
```

### 🎬 Media
```
AspectRatio      Carousel
Calendar         VideoPlayer
```

### 🛠️ Utility
```
Affix            Resizable
Chart            ScrollArea
Collapsible      Transfer
DragDrop
```

</td>
</tr>
</table>

<div align="center">

### 🪝 Custom Hooks

`useAccordion` • `useAnimation` • `useArray` • `useAsync` • `useAvatar` • `useClickOutside` • `useClipboard` • `useColorMode` • `useDebounce` • `useDisclosure` • `useFocusTrap` • `useForm` • `useHover` • `useLocalStorage` • `useMediaQuery` • `usePagination` • `useToggle` • `useValidation` • **+24 more**

</div>

---

## 📖 Documentation

<div align="center">

### **Comprehensive guides to help you build faster**

</div>

<table>
<tr>
<td align="center" width="20%">
  
📚

**API Docs**

Complete component reference

</td>
<td align="center" width="20%">
  
⚡

**Examples**

Interactive demos

</td>
<td align="center" width="20%">
  
♿

**Accessibility**

A11y best practices

</td>
<td align="center" width="20%">
  
🚀

**Performance**

Optimization tips

</td>
<td align="center" width="20%">
  
❓

**170+ FAQs**

Common questions

</td>
</tr>
</table>

---

## 🎨 Pre-built Blocks & Templates

<div align="center">

### **44+ Ready-to-use components to accelerate development**

<table>
<tr>
<td align="center">🦸 <strong>Hero Sections</strong></td>
<td align="center">✨ <strong>Feature Showcases</strong></td>
<td align="center">💰 <strong>Pricing Tables</strong></td>
</tr>
<tr>
<td align="center">🚀 <strong>Landing Pages</strong></td>
<td align="center">🛒 <strong>E-commerce</strong></td>
<td align="center">📧 <strong>Contact Forms</strong></td>
</tr>
<tr>
<td align="center">👥 <strong>Team Sections</strong></td>
<td align="center">💬 <strong>Testimonials</strong></td>
<td align="center">❓ <strong>FAQ Sections</strong></td>
</tr>
</table>

**[🎨 Browse All Blocks →](https://saha-ui.isubroto.com.bd/block)**

</div>

---

<div align="center">

## 🚀 Get Started

<table>
<tr>
<td align="center" width="33%">

### 📚 [Documentation](https://saha-ui.isubroto.com.bd/docs)

Complete API reference and guides

</td>
<td align="center" width="33%">

### ⚡ [Quick Start](https://saha-ui.isubroto.com.bd/docs/installation)

Install and setup in minutes

</td>
<td align="center" width="33%">

### 🎨 [Live Examples](https://saha-ui.isubroto.com.bd/block)

Interactive component demos

</td>
</tr>
</table>

</div>

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's:

- 🐛 **Bug reports** - Help us identify issues
- 💡 **Feature requests** - Share your ideas
- 📝 **Documentation** - Improve our guides
- 🔧 **Code contributions** - Submit pull requests

**[Read our Contributing Guide →](CONTRIBUTING.md)**

---

## 📄 License

<div align="center">

**MIT License** ©2025 [Saha UI](https://saha-ui.isubroto.com.bd)

Free to use for personal and commercial projects

---

<sub>Built with ❤️ by the Saha UI Team</sub>

**[⭐ Star on GitHub](https://github.com/Xenial-Devil/Saha-ui)** • **[🐦 Follow on Twitter](https://twitter.com/saha-ui)** • **[💬 Join Discord](https://discord.gg/saha-ui)**

</div>