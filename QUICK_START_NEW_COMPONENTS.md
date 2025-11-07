# Quick Start Guide - 8 New Components

Get started with the 8 new components added to Saha UI in minutes!

---

## 📦 Installation

These components are included in Saha UI. Just import and use:

```bash
npm install saha-ui
# or
yarn add saha-ui
```

---

## 🚀 Quick Examples

### 1. Divider - Content Separator

```tsx
import { Divider } from 'saha-ui';

// Simple line
<Divider />

// With label
<Divider>OR</Divider>

// Vertical
<div className="flex items-center gap-4">
  <span>Left</span>
  <Divider orientation="vertical" className="h-6" />
  <span>Right</span>
</div>

// Styled
<Divider variant="dashed" color="primary">Section</Divider>
```

---

### 2. IconButton - Compact Icon Actions

```tsx
import { IconButton } from 'saha-ui';
import { Heart, Settings, X } from 'lucide-react';

// Basic
<IconButton icon={<Heart />} aria-label="Like" />

// Styled
<IconButton 
  icon={<Settings />} 
  variant="filled" 
  color="primary"
  aria-label="Settings"
/>

// Loading
<IconButton icon={<X />} loading aria-label="Delete" />

// Different shapes
<IconButton icon={<Heart />} shape="circle" color="error" />
```

---

### 3. Paper - Surface with Elevation

```tsx
import { Paper } from 'saha-ui';

// Basic card
<Paper elevation={2} padding="lg">
  <h2>Title</h2>
  <p>Content goes here</p>
</Paper>

// Hoverable
<Paper hoverable onClick={() => alert('Clicked!')}>
  Interactive card
</Paper>

// Glass effect
<Paper variant="glass" elevation={4}>
  Modern glass morphism
</Paper>
```

---

### 4. Backdrop - Full-Screen Overlay

```tsx
import { Backdrop } from 'saha-ui';

// Simple overlay
<Backdrop open={isOpen} onClick={() => setIsOpen(false)} />

// With blur
<Backdrop open={loading} variant="blur" blur="lg">
  <Spinner size="lg" />
</Backdrop>

// For modals
<Backdrop open={showModal} onClick={closeModal}>
  <Paper elevation={6} onClick={(e) => e.stopPropagation()}>
    Modal content
  </Paper>
</Backdrop>
```

---

### 5. Stepper - Multi-Step Progress

```tsx
import { Stepper } from 'saha-ui';

const steps = [
  { label: 'Account', description: 'Create account' },
  { label: 'Profile', description: 'Set up profile' },
  { label: 'Finish', description: 'Complete setup' }
];

// Basic
<Stepper steps={steps} activeStep={1} />

// Interactive
<Stepper
  steps={steps}
  activeStep={step}
  interactive
  onStepClick={(index) => setStep(index)}
/>

// Vertical
<Stepper orientation="vertical" steps={steps} activeStep={step} />
```

---

### 6. Snackbar - Brief Notifications

```tsx
import { Snackbar } from 'saha-ui';

// Success message
<Snackbar 
  open={show} 
  message="Saved successfully!" 
  severity="success"
  onClose={() => setShow(false)}
/>

// With action
<Snackbar
  open={show}
  message="Item deleted"
  action={<button>UNDO</button>}
/>

// Different positions
<Snackbar open message="Top Right" position="top-right" />
<Snackbar open message="Bottom Left" position="bottom-left" />

// Auto-hide
<Snackbar
  open={show}
  message="Will auto-close"
  autoHideDuration={3000}
  onClose={() => setShow(false)}
/>
```

---

### 7. AppBar - Application Header

```tsx
import { AppBar } from 'saha-ui';

// Basic header
<AppBar>
  <div className="flex items-center justify-between px-4">
    <h1>My App</h1>
    <nav>Menu</nav>
  </div>
</AppBar>

// Fixed with color
<AppBar position="fixed" color="primary">
  <div className="container mx-auto px-4">Header</div>
</AppBar>

// Transparent with blur
<AppBar variant="transparent" blur position="fixed">
  <div className="px-6">Transparent Header</div>
</AppBar>

// Hide on scroll
<AppBar position="fixed" hideOnScroll>
  Content
</AppBar>
```

---

### 8. BottomNavigation - Mobile Nav Bar

```tsx
import { BottomNavigation } from 'saha-ui';
import { Home, Search, Heart, User } from 'lucide-react';

const items = [
  { label: 'Home', icon: <Home /> },
  { label: 'Search', icon: <Search /> },
  { label: 'Favorites', icon: <Heart />, badge: 5 },
  { label: 'Profile', icon: <User /> }
];

// Basic
<BottomNavigation items={items} value={0} />

// With state
const [active, setActive] = useState(0);
<BottomNavigation
  items={items}
  value={active}
  onChange={setActive}
/>

// Without labels on inactive
<BottomNavigation items={items} value={0} showLabels={false} />

// Different color
<BottomNavigation items={items} value={0} color="secondary" />
```

---

## 🎨 Common Patterns

### Modal Dialog
```tsx
<Backdrop open={open} onClick={onClose} blur="md">
  <Paper elevation={6} padding="lg" onClick={(e) => e.stopPropagation()}>
    <div className="flex justify-between items-center">
      <h2>Modal Title</h2>
      <IconButton icon={<X />} onClick={onClose} aria-label="Close" />
    </div>
    <Divider spacing="sm" />
    <div>Modal content</div>
  </Paper>
</Backdrop>
```

### Toolbar
```tsx
<Paper elevation={2} padding="sm">
  <div className="flex items-center gap-2">
    <IconButton icon={<Bold />} aria-label="Bold" />
    <IconButton icon={<Italic />} aria-label="Italic" />
    <Divider orientation="vertical" className="h-6" />
    <IconButton icon={<AlignLeft />} aria-label="Align left" />
  </div>
</Paper>
```

### Complete App Layout
```tsx
function App() {
  const [bottomNav, setBottomNav] = useState(0);

  return (
    <>
      <AppBar position="fixed" color="primary">
        <div className="flex items-center justify-between px-4">
          <IconButton icon={<Menu />} aria-label="Menu" />
          <h1>My App</h1>
        </div>
      </AppBar>

      <main className="pt-16 pb-20">
        <Paper elevation={2} padding="lg">
          Content
        </Paper>
      </main>

      <BottomNavigation
        items={navItems}
        value={bottomNav}
        onChange={setBottomNav}
      />
    </>
  );
}
```

### Notification System
```tsx
function NotificationDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Show Notification
      </Button>

      <Snackbar
        open={open}
        message="Action completed!"
        severity="success"
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

### Multi-Step Form
```tsx
function Wizard() {
  const [step, setStep] = useState(0);

  const steps = [
    { label: 'Info', description: 'Basic info' },
    { label: 'Details', description: 'More details' },
    { label: 'Review', description: 'Review & submit' }
  ];

  return (
    <Paper elevation={3} padding="lg">
      <Stepper steps={steps} activeStep={step} />
      
      <div className="mt-8">
        {/* Step content */}
        <div className="min-h-[200px]">
          Step {step + 1} content
        </div>

        <div className="flex justify-between mt-6">
          <Button 
            onClick={() => setStep(s => s - 1)} 
            disabled={step === 0}
          >
            Back
          </Button>
          <Button onClick={() => setStep(s => s + 1)}>
            {step === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </Paper>
  );
}
```

---

## 💡 Pro Tips

### Divider
- Use `flexItem` prop for vertical dividers in flex containers
- Combine with `spacing="none"` for tight layouts
- Use gradient variant for modern look

### IconButton
- Always provide `aria-label` for accessibility
- Use `ghost` variant for minimal style
- Combine with Tooltip for better UX

### Paper
- Use `padding="none"` for full-bleed images
- Combine `hoverable` with `onClick` for cards
- Use `glass` variant over images/gradients

### Backdrop
- Stop event propagation on modal content
- Use `invisible` for invisible click handlers
- Combine with Paper for modals

### Stepper
- Keep to 3-7 steps for best UX
- Use descriptions for clarity
- Enable `interactive` for non-linear flows

### Snackbar
- Keep messages brief (under 60 chars)
- Use appropriate severity
- Position based on context

### AppBar
- Use `fixed` for primary navigation
- Add `hideOnScroll` for content focus
- Use `blur` with transparent for hero sections

### BottomNavigation
- Limit to 3-5 items
- Use clear, recognizable icons
- Consider hiding labels on small screens

---

## 🎯 All Props Quick Reference

### Divider
- `orientation`: horizontal | vertical
- `variant`: solid | dashed | dotted | gradient
- `color`: default | primary | secondary | muted
- `alignment`: start | center | end
- `thickness`: number (pixels)
- `spacing`: none | sm | md | lg | xl

### IconButton
- `icon`: ReactNode (required)
- `variant`: filled | outlined | soft | ghost | gradient | glass
- `color`: default | primary | secondary | success | warning | error | info
- `size`: xs | sm | md | lg | xl
- `shape`: square | rounded | circle
- `loading`: boolean
- `aria-label`: string (required)

### Paper
- `variant`: filled | outlined | gradient | glass
- `elevation`: 0-6
- `padding`: none | sm | md | lg | xl
- `rounded`: none | sm | md | lg | xl | full
- `hoverable`: boolean
- `centered`: boolean
- `maxWidth`: sm | md | lg | xl | 2xl | full

### Backdrop
- `open`: boolean (required)
- `variant`: solid | blur | gradient
- `blur`: none | sm | md | lg | xl
- `opacity`: 0-1
- `onClick`: function
- `preventScroll`: boolean

### Stepper
- `steps`: Step[] (required)
- `activeStep`: number
- `variant`: default | outlined | filled
- `orientation`: horizontal | vertical
- `interactive`: boolean
- `color`: primary | secondary | success | error

### Snackbar
- `open`: boolean (required)
- `message`: ReactNode (required)
- `variant`: default | filled | outlined | soft
- `severity`: default | success | warning | error | info
- `position`: top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
- `autoHideDuration`: number | null

### AppBar
- `position`: static | fixed | sticky | absolute
- `variant`: default | elevated | outlined | transparent
- `color`: default | primary | secondary | transparent
- `elevation`: 0-4
- `size`: sm | md | lg
- `blur`: boolean
- `hideOnScroll`: boolean

### BottomNavigation
- `items`: BottomNavigationItem[] (required)
- `value`: string | number
- `variant`: default | filled | shifting
- `showLabels`: boolean
- `color`: primary | secondary | success | error | info
- `hideOnScroll`: boolean
- `elevation`: 0-4

---

## 📚 Full Documentation

For complete documentation with all features and examples:

- **NEW_COMPONENTS.md** - Batch 1 (Divider, IconButton, Paper, Backdrop)
- **NEW_COMPONENTS_BATCH2.md** - Batch 2 (Stepper, Snackbar, AppBar, BottomNavigation)
- **COMPONENTS_COMPLETION_FINAL.md** - Complete technical summary

---

## 🤝 Need Help?

- Check the full documentation files
- See example files in `src/examples/components/`
- Visit the Saha UI documentation site
- Open an issue on GitHub

---

**Happy Coding! 🎨✨**