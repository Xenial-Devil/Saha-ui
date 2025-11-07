# New Components Added to Saha UI - Batch 2

This document describes the 4 additional components that have been added to the Saha UI library.

## Components Overview

1. **Stepper** - Multi-step wizard component for guided processes
2. **Snackbar** - Brief notification messages with auto-dismiss
3. **AppBar** - Application header and navigation bar
4. **BottomNavigation** - Mobile-first bottom navigation bar

---

## 1. Stepper Component

A component for displaying multi-step processes and wizards. Shows progress through a series of logical and numbered steps.

### Features
- Horizontal and vertical orientations
- 3 variants: default, outlined, filled
- Interactive (clickable) steps support
- Step status indicators (complete, active, inactive, error)
- Optional step descriptions
- Custom icons for steps
- Optional steps support
- 4 color schemes
- Checkmark on completed steps
- Responsive design

### Basic Usage

```tsx
import { Stepper } from 'saha-ui';

// Basic stepper
const steps = [
  { label: 'Account' },
  { label: 'Profile' },
  { label: 'Finish' }
];

<Stepper steps={steps} activeStep={1} />

// With descriptions
const stepsWithDesc = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile' },
  { label: 'Finish', description: 'Review and complete' }
];

<Stepper steps={stepsWithDesc} activeStep={0} />

// Vertical orientation
<Stepper
  orientation="vertical"
  steps={steps}
  activeStep={activeStep}
/>

// Interactive (clickable steps)
<Stepper
  steps={steps}
  activeStep={activeStep}
  interactive
  onStepClick={(index) => setActiveStep(index)}
/>

// With custom icons
import { User, Settings, Check } from 'lucide-react';

const stepsWithIcons = [
  { label: 'Account', icon: <User /> },
  { label: 'Profile', icon: <Settings /> },
  { label: 'Finish', icon: <Check /> }
];

<Stepper steps={stepsWithIcons} activeStep={0} />

// With error state
<Stepper steps={steps} activeStep={1} error />

// Different variants
<Stepper variant="outlined" steps={steps} activeStep={1} />
<Stepper variant="filled" steps={steps} activeStep={1} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `Step[]` | **required** | Array of step objects |
| `activeStep` | `number` | `0` | Index of currently active step |
| `variant` | `"default" \| "outlined" \| "filled"` | `"default"` | Visual style |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of stepper |
| `interactive` | `boolean` | `false` | Whether steps are clickable |
| `showNumbers` | `boolean` | `true` | Show step numbers |
| `showConnectors` | `boolean` | `true` | Show lines between steps |
| `error` | `boolean` | `false` | Error state |
| `color` | `"primary" \| "secondary" \| "success" \| "error"` | `"primary"` | Color scheme |
| `onStepClick` | `function` | - | Callback when step is clicked |
| `showCheckmark` | `boolean` | `true` | Show checkmark on completed steps |

### Step Object

```tsx
interface Step {
  id?: string | number;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  optional?: boolean;
  status?: "complete" | "active" | "inactive" | "error";
  onClick?: () => void;
}
```

---

## 2. Snackbar Component

A brief notification message that appears at the edge of the screen. Provides lightweight feedback about an operation without interrupting the user.

### Features
- 4 variants: default, filled, outlined, soft
- 5 severity levels: default, success, warning, error, info
- 6 positioning options (top/bottom + left/center/right)
- Auto-hide with configurable duration
- Pause on hover/focus
- Action buttons support
- Custom icons
- Close button
- Smooth transitions
- Badge indicators

### Basic Usage

```tsx
import { Snackbar } from 'saha-ui';

// Basic snackbar
<Snackbar open message="Item saved successfully" />

// With severity
<Snackbar
  open
  message="Action completed"
  severity="success"
/>

// With action button
<Snackbar
  open
  message="Item deleted"
  action={
    <button className="text-sm font-medium">UNDO</button>
  }
/>

// Auto-hide with callback
<Snackbar
  open={open}
  message="Notification"
  autoHideDuration={3000}
  onClose={() => setOpen(false)}
/>

// Custom position
<Snackbar
  open
  message="Message"
  position="top-right"
/>

// Different variants and severities
<Snackbar open message="Success" variant="filled" severity="success" />
<Snackbar open message="Warning" variant="outlined" severity="warning" />
<Snackbar open message="Error" variant="soft" severity="error" />
<Snackbar open message="Info" variant="default" severity="info" />

// Without icon
<Snackbar open message="Message" showIcon={false} />

// Without close button
<Snackbar open message="Message" showClose={false} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Visibility state |
| `message` | `ReactNode` | **required** | Message content |
| `variant` | `"default" \| "filled" \| "outlined" \| "soft"` | `"filled"` | Visual style |
| `severity` | `"default" \| "success" \| "warning" \| "error" \| "info"` | `"default"` | Message type |
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-center"` | Screen position |
| `action` | `ReactNode` | - | Action button element |
| `icon` | `ReactNode` | - | Custom icon |
| `showIcon` | `boolean` | `true` | Show severity icon |
| `showClose` | `boolean` | `true` | Show close button |
| `autoHideDuration` | `number \| null` | `6000` | Auto-hide delay (ms) |
| `onClose` | `function` | - | Close callback |
| `pauseOnHover` | `boolean` | `true` | Pause auto-hide on hover |
| `zIndex` | `number` | `1400` | Z-index value |

---

## 3. AppBar Component

A top app bar that provides content and actions related to the current screen. Perfect for navigation headers, toolbars, and branding.

### Features
- 4 positioning modes: static, fixed, sticky, absolute
- 4 variants: default, elevated, outlined, transparent
- 3 color schemes: default, primary, secondary
- 5 elevation levels (for elevated variant)
- 3 size options: sm, md, lg
- Blur effect support (glass morphism)
- Hide-on-scroll functionality
- Max-width container support
- Responsive design
- Auto-elevate on scroll

### Basic Usage

```tsx
import { AppBar } from 'saha-ui';

// Basic app bar
<AppBar>
  <div className="flex items-center justify-between w-full px-4">
    <h1>My App</h1>
    <nav>Menu</nav>
  </div>
</AppBar>

// Fixed position with primary color
<AppBar position="fixed" color="primary" variant="elevated">
  <div className="container mx-auto flex items-center justify-between">
    <div>Logo</div>
    <nav>Navigation</nav>
  </div>
</AppBar>

// Transparent with blur (hero section)
<AppBar variant="transparent" blur position="fixed">
  <div className="flex items-center justify-between w-full px-6">
    <div>Brand</div>
    <div>Actions</div>
  </div>
</AppBar>

// With hide on scroll
<AppBar position="fixed" hideOnScroll>
  <div className="flex items-center gap-4 px-6">
    <button>Menu</button>
    <h1>Title</h1>
  </div>
</AppBar>

// Different sizes
<AppBar size="sm">Small AppBar</AppBar>
<AppBar size="lg">Large AppBar</AppBar>

// With max width container
<AppBar maxWidth="xl" centered>
  Centered content with max width
</AppBar>

// Sticky position
<AppBar position="sticky" variant="elevated">
  Sticky header content
</AppBar>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"static" \| "fixed" \| "sticky" \| "absolute"` | `"static"` | Positioning type |
| `variant` | `"default" \| "elevated" \| "outlined" \| "transparent"` | `"default"` | Visual style |
| `color` | `"default" \| "primary" \| "secondary" \| "transparent"` | `"default"` | Color scheme |
| `elevation` | `0 \| 1 \| 2 \| 3 \| 4` | `2` | Shadow elevation |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height of app bar |
| `blur` | `boolean` | `false` | Blur background |
| `fullWidth` | `boolean` | `true` | Full width |
| `centered` | `boolean` | `false` | Center content |
| `maxWidth` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full"` | `"full"` | Max content width |
| `hideOnScroll` | `boolean` | `false` | Hide when scrolling down |
| `zIndex` | `number` | `1100` | Z-index value |
| `asChild` | `boolean` | `false` | Composition mode |

---

## 4. BottomNavigation Component

A navigation component that appears at the bottom of the screen. Ideal for mobile applications with 3-5 top-level destinations.

### Features
- 3 variants: default, filled, shifting
- Badge support (numbers, dots, text)
- Hide-on-scroll functionality
- 5 color schemes
- Show/hide labels option
- 5 elevation levels
- Responsive design
- Smooth animations
- Disabled items support
- Link/href support

### Basic Usage

```tsx
import { BottomNavigation } from 'saha-ui';
import { Home, Search, Heart, User, Bell } from 'lucide-react';

// Basic bottom navigation
const items = [
  { label: 'Home', icon: <Home /> },
  { label: 'Search', icon: <Search /> },
  { label: 'Profile', icon: <User /> }
];

<BottomNavigation items={items} value={0} />

// With state management
const [active, setActive] = useState(0);

<BottomNavigation
  items={items}
  value={active}
  onChange={(value) => setActive(value)}
/>

// With badges
const itemsWithBadges = [
  { label: 'Home', icon: <Home /> },
  { label: 'Messages', icon: <Mail />, badge: 5 },
  { label: 'Notifications', icon: <Bell />, badge: '!' },
  { label: 'Favorites', icon: <Heart />, badge: true }, // dot badge
  { label: 'Profile', icon: <User /> }
];

<BottomNavigation items={itemsWithBadges} value={active} />

// Without labels on inactive items
<BottomNavigation
  items={items}
  value={active}
  showLabels={false}
/>

// Different color
<BottomNavigation
  items={items}
  value={active}
  color="secondary"
/>

// Shifting variant (animated)
<BottomNavigation
  variant="shifting"
  items={items}
  value={active}
/>

// Hide on scroll
<BottomNavigation
  items={items}
  value={active}
  hideOnScroll
/>

// With custom values
const itemsWithValues = [
  { label: 'Home', icon: <Home />, value: 'home' },
  { label: 'Search', icon: <Search />, value: 'search' },
  { label: 'Profile', icon: <User />, value: 'profile' }
];

<BottomNavigation
  items={itemsWithValues}
  value="home"
  onChange={(value) => console.log(value)}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BottomNavigationItem[]` | **required** | Navigation items |
| `value` | `string \| number` | - | Selected item value/index |
| `variant` | `"default" \| "filled" \| "shifting"` | `"default"` | Visual style |
| `showLabels` | `boolean` | `true` | Show labels on inactive items |
| `color` | `"primary" \| "secondary" \| "success" \| "error" \| "info"` | `"primary"` | Color scheme |
| `onChange` | `function` | - | Selection change callback |
| `hideOnScroll` | `boolean` | `false` | Hide when scrolling |
| `elevation` | `0 \| 1 \| 2 \| 3 \| 4` | `3` | Shadow elevation |
| `bordered` | `boolean` | `true` | Top border |
| `zIndex` | `number` | `1000` | Z-index value |

### BottomNavigationItem

```tsx
interface BottomNavigationItem {
  id?: string | number;
  label: string;
  icon: ReactNode;
  badge?: ReactNode; // number, string, or true for dot
  disabled?: boolean;
  value?: string | number;
  onClick?: (value: string | number) => void;
  href?: string;
}
```

---

## Integration Examples

### Complete App Layout

```tsx
import { AppBar, BottomNavigation, Paper } from 'saha-ui';
import { Home, Search, Heart, User, Menu } from 'lucide-react';

function Layout({ children }) {
  const [bottomNav, setBottomNav] = useState(0);

  const navItems = [
    { label: 'Home', icon: <Home /> },
    { label: 'Search', icon: <Search /> },
    { label: 'Favorites', icon: <Heart />, badge: 3 },
    { label: 'Profile', icon: <User /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Top AppBar */}
      <AppBar position="fixed" color="primary">
        <div className="flex items-center justify-between px-4">
          <button><Menu /></button>
          <h1 className="text-xl font-bold">My App</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </AppBar>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        items={navItems}
        value={bottomNav}
        onChange={setBottomNav}
      />
    </div>
  );
}
```

### Multi-Step Form with Stepper

```tsx
import { Stepper, Paper, Button, Snackbar } from 'saha-ui';

function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { label: 'Account', description: 'Create your account' },
    { label: 'Profile', description: 'Set up your profile' },
    { label: 'Preferences', description: 'Choose your preferences' },
    { label: 'Review', description: 'Review and confirm' }
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setShowSuccess(true);
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  return (
    <Paper elevation={3} padding="lg" className="max-w-4xl mx-auto">
      <Stepper steps={steps} activeStep={activeStep} />
      
      <div className="mt-8">
        {/* Step content goes here */}
        <div className="min-h-[300px]">
          Step {activeStep + 1} content
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>

      <Snackbar
        open={showSuccess}
        message="Form submitted successfully!"
        severity="success"
        onClose={() => setShowSuccess(false)}
      />
    </Paper>
  );
}
```

### Notification System

```tsx
import { Snackbar, IconButton } from 'saha-ui';
import { X } from 'lucide-react';

function NotificationDemo() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, severity = 'default') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, severity }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div>
      {/* Buttons to trigger notifications */}
      <div className="flex gap-2">
        <Button onClick={() => addNotification('Success!', 'success')}>
          Success
        </Button>
        <Button onClick={() => addNotification('Warning!', 'warning')}>
          Warning
        </Button>
        <Button onClick={() => addNotification('Error!', 'error')}>
          Error
        </Button>
      </div>

      {/* Render snackbars */}
      {notifications.map((notif, index) => (
        <Snackbar
          key={notif.id}
          open={true}
          message={notif.message}
          severity={notif.severity}
          position="bottom-right"
          onClose={() => removeNotification(notif.id)}
          style={{ bottom: `${80 + index * 70}px` }}
        />
      ))}
    </div>
  );
}
```

---

## Styling and Theming

All components follow the Saha UI design system and support:

- **Dark mode** - Automatic dark mode support
- **CSS Variables** - Uses CSS custom properties for theming
- **Tailwind CSS** - Built with Tailwind utility classes
- **Custom variants** - CVA (Class Variance Authority) for type-safe variants
- **Animation** - Smooth transitions and effects
- **Accessibility** - ARIA attributes and keyboard navigation
- **Responsive** - Mobile-first responsive design

---

## Accessibility

All components are built with accessibility in mind:

- **Stepper**: Uses proper ARIA labels, keyboard navigation for interactive mode
- **Snackbar**: Uses `role="alert"` and `aria-live="polite"` for screen readers
- **AppBar**: Uses `role="banner"` for semantic HTML
- **BottomNavigation**: Uses `role="navigation"` and `aria-current` for active items

---

## Browser Support

These components support all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Best Practices

### Stepper
- Use 3-7 steps for optimal UX
- Provide clear, concise labels
- Use descriptions for complex steps
- Consider vertical orientation for mobile
- Allow navigation back to previous steps

### Snackbar
- Keep messages brief and actionable
- Use appropriate severity levels
- Position based on context (bottom for mobile)
- Don't stack too many notifications
- Provide undo actions when appropriate

### AppBar
- Keep height appropriate for content
- Use fixed position for primary navigation
- Consider hide-on-scroll for content-heavy pages
- Use transparent variant for hero sections
- Ensure sufficient color contrast

### BottomNavigation
- Limit to 3-5 items maximum
- Use clear, recognizable icons
- Provide text labels for clarity
- Consider hiding labels to save space
- Use badges sparingly for notifications

---

## Performance Tips

1. **Lazy Loading**: Load BottomNavigation only on mobile viewports
2. **Memoization**: Use React.memo for Stepper steps that don't change
3. **Debouncing**: Debounce hide-on-scroll handlers
4. **Animation**: Use CSS transforms for better performance
5. **Bundle Size**: Import only components you need

---

## Migration Guide

### From Material-UI

```tsx
// Material-UI
import { Stepper, Step, StepLabel } from '@mui/material';
<Stepper activeStep={0}>
  <Step><StepLabel>Step 1</StepLabel></Step>
</Stepper>

// Saha UI
import { Stepper } from 'saha-ui';
<Stepper
  steps={[{ label: 'Step 1' }]}
  activeStep={0}
/>

// Material-UI
import { Snackbar } from '@mui/material';
<Snackbar open message="Alert" />

// Saha UI - Same API!
import { Snackbar } from 'saha-ui';
<Snackbar open message="Alert" />
```

---

## Contributing

Found a bug or want to contribute? Check out our [Contributing Guide](../CONTRIBUTING.md).

---

## License

MIT © Saha UI

---

**Created:** November 2024  
**Status:** Complete ✅  
**Components Added:** 4  
**Total Components in Library:** 80+  
**Production Ready:** Yes