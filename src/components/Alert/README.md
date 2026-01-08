# Alert

A flexible and accessible alert component for displaying important messages, notifications, and feedback to users. Supports multiple variants, statuses, and dismissible functionality.

## Features

- 🎨 Six visual variants (solid, subtle, left-accent, top-accent, outline, glass)
- 🎯 Four semantic statuses (success, danger, warning, info)
- ✨ Built-in status icons
- ❌ Dismissible alerts with close button
- ♿ Fully accessible with ARIA attributes
- 🎭 Customizable styling
- 📱 Responsive design

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Alert } from "saha-ui";

function MyComponent() {
  return (
    <Alert
      status="success"
      title="Success"
      message="Your changes have been saved successfully."
    />
  );
}
```

## Statuses

### Success

Display success messages and confirmations:

```tsx
<Alert
  status="success"
  title="Operation Successful"
  message="Your profile has been updated."
/>
```

### Info

Show informational messages:

```tsx
<Alert
  status="info"
  title="Information"
  message="This feature is currently in beta testing."
/>
```

### Warning

Alert users to potential issues:

```tsx
<Alert
  status="warning"
  title="Warning"
  message="Your session will expire in 5 minutes."
/>
```

### Danger

Communicate errors or critical issues:

```tsx
<Alert
  status="danger"
  title="Error"
  message="Failed to save your changes. Please try again."
/>
```

## Variants

### Solid (Default)

Bold, filled background with high contrast:

```tsx
<Alert variant="solid" status="info" message="This is a solid alert" />
```

### Subtle

Light background with softer appearance:

```tsx
<Alert variant="subtle" status="success" message="This is a subtle alert" />
```

### Left Accent

Vertical accent bar on the left side:

```tsx
<Alert
  variant="left-accent"
  status="warning"
  message="This is a left-accent alert"
/>
```

### Top Accent

Horizontal accent bar on the top:

```tsx
<Alert
  variant="top-accent"
  status="danger"
  message="This is a top-accent alert"
/>
```

### Outline

Bordered style with transparent background:

```tsx
<Alert variant="outline" status="info" message="This is an outline alert" />
```

### Glass

Modern glassmorphism effect:

```tsx
<Alert variant="glass" status="success" message="This is a glass alert" />
```

## Dismissible Alerts

Add a close button to allow users to dismiss alerts:

```tsx
function DismissibleAlert() {
  return (
    <Alert
      status="info"
      title="Dismissible Alert"
      message="You can close this alert by clicking the X button."
      closeable
    />
  );
}
```

## Without Title

Display alerts with message only:

```tsx
<Alert status="success" message="Changes saved successfully!" />
```

## Custom Content

Use children for full customization:

```tsx
<Alert status="info">
  <div className="flex items-start gap-3">
    <div>
      <h4 className="font-semibold mb-1">New Feature Available</h4>
      <p className="text-sm">
        We've added dark mode support. Try it out in settings!
      </p>
      <button className="mt-2 text-sm underline">Learn more →</button>
    </div>
  </div>
</Alert>
```

## Rounded Corners

Control the rounded corners:

```tsx
<Alert
  status="success"
  message="This alert has rounded corners"
  rounded
/>

<Alert
  status="warning"
  message="This alert has sharp corners"
  rounded={false}
/>
```

## API Reference

### Alert Props

#### Basic Properties

| Prop        | Type        | Default | Description                          |
| ----------- | ----------- | ------- | ------------------------------------ |
| `id`        | `string`    | -       | Unique identifier                    |
| `title`     | `string`    | -       | Title text                           |
| `message`   | `ReactNode` | -       | Message content                      |
| `children`  | `ReactNode` | -       | Custom content (overrides title/msg) |
| `className` | `string`    | -       | Additional CSS classes               |

#### Visual Styling

| Prop      | Type                                                                                                      | Default    | Description           |
| --------- | --------------------------------------------------------------------------------------------------------- | ---------- | --------------------- |
| `variant` | `'solid' \| 'subtle' \| 'outline' \| 'left-accent' \| 'top-accent' \| 'glass' \| 'gradient' \| 'minimal'` | `'subtle'` | Visual variant        |
| `status`  | `'info' \| 'success' \| 'warning' \| 'danger' \| 'neutral'`                                               | `'info'`   | Status/semantic color |
| `size`    | `'sm' \| 'md' \| 'lg'`                                                                                    | `'md'`     | Size variant          |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`                                                        | `'lg'`     | Border radius         |
| `shadow`  | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                  | `'sm'`     | Shadow depth          |

#### Icon Configuration

| Prop            | Type                                                 | Default  | Description             |
| --------------- | ---------------------------------------------------- | -------- | ----------------------- |
| `icon`          | `ReactNode \| null`                                  | -        | Custom icon (null=hide) |
| `iconAnimation` | `'none' \| 'pulse' \| 'spin' \| 'bounce' \| 'shake'` | `'none'` | Icon animation          |

#### Dismissible & Interaction

| Prop            | Type      | Default | Description             |
| --------------- | --------- | ------- | ----------------------- |
| `closeable`     | `boolean` | `false` | Show close button       |
| `closeOnEscape` | `boolean` | `true`  | Close on Escape key     |
| `closeOnSwipe`  | `boolean` | `true`  | Close on swipe (mobile) |

#### Auto-dismiss & Progress

| Prop           | Type      | Default | Description                |
| -------------- | --------- | ------- | -------------------------- |
| `duration`     | `number`  | -       | Auto dismiss duration (ms) |
| `showProgress` | `boolean` | `false` | Show progress bar          |
| `pauseOnHover` | `boolean` | `true`  | Pause timer on hover       |
| `pauseOnFocus` | `boolean` | `true`  | Pause timer on focus       |

#### Actions

| Prop              | Type          | Description           |
| ----------------- | ------------- | --------------------- |
| `action`          | `AlertAction` | Primary action button |
| `secondaryAction` | `AlertAction` | Secondary action      |

**AlertAction Interface:**

```typescript
interface AlertAction {
  label: string;
  onClick: () => void;
  variant?: "link" | "button";
}
```

#### Animation

| Prop        | Type                                                                                                     | Default  | Description          |
| ----------- | -------------------------------------------------------------------------------------------------------- | -------- | -------------------- |
| `animation` | `'fade' \| 'slide-up' \| 'slide-down' \| 'slide-left' \| 'slide-right' \| 'scale' \| 'bounce' \| 'none'` | `'fade'` | Enter/exit animation |

#### Callbacks

| Prop      | Type         | Description          |
| --------- | ------------ | -------------------- |
| `onClose` | `() => void` | Callback when closed |
| `onOpen`  | `() => void` | Callback when opened |

#### Accessibility

| Prop   | Type                           | Default   | Description |
| ------ | ------------------------------ | --------- | ----------- |
| `role` | `'alert' \| 'status' \| 'log'` | `'alert'` | ARIA role   |

#### Controlled State

| Prop           | Type                      | Description               |
| -------------- | ------------------------- | ------------------------- |
| `isOpen`       | `boolean`                 | Controlled open state     |
| `onOpenChange` | `(open: boolean) => void` | Open state change handler |

### AlertProvider Props

| Prop                 | Type             | Default        | Description                 |
| -------------------- | ---------------- | -------------- | --------------------------- |
| `children`           | `ReactNode`      | -              | **Required.** App content   |
| `position`           | `AlertPosition`  | `'top-right'`  | Toast position              |
| `maxAlerts`          | `number`         | `5`            | Maximum concurrent alerts   |
| `spacing`            | `number`         | `12`           | Spacing between alerts (px) |
| `reverseOrder`       | `boolean`        | `false`        | Reverse alert order         |
| `containerClassName` | `string`         | -              | Container CSS classes       |
| `defaultDuration`    | `number`         | `5000`         | Default duration (ms)       |
| `defaultAnimation`   | `AlertAnimation` | `'slide-left'` | Default animation           |

**AlertPosition Options:**

- `'top-left'`, `'top-center'`, `'top-right'`
- `'middle-left'`, `'middle-center'`, `'middle-right'`
- `'bottom-left'`, `'bottom-center'`, `'bottom-right'`

## Toast System (AlertProvider)

The AlertProvider enables a toast notification system:

### Setup

```tsx
import { AlertProvider } from "saha-ui";

function App() {
  return (
    <AlertProvider position="top-right" maxAlerts={3}>
      {/* Your app */}
    </AlertProvider>
  );
}
```

### Using the useAlert Hook

```tsx
import { useAlert } from "saha-ui";

function MyComponent() {
  const alert = useAlert();

  const handleClick = () => {
    // Show alert
    alert.success("Operation completed!");

    // Or with options
    alert.error("Failed to save", {
      duration: 8000,
      action: {
        label: "Retry",
        onClick: () => console.log("Retry"),
      },
    });
  };

  return <button onClick={handleClick}>Show Alert</button>;
}
```

### Toast API Methods

#### show(props)

Show a custom alert:

```tsx
const id = alert.show({
  status: "info",
  message: "Custom alert",
  duration: 5000,
});
```

#### success(message, options?)

Show success toast:

```tsx
alert.success("Data saved successfully!");
```

#### error(message, options?)

Show error toast (8s duration by default):

```tsx
alert.error("Failed to delete item");
```

#### warning(message, options?)

Show warning toast (6s duration by default):

```tsx
alert.warning("Storage almost full");
```

#### info(message, options?)

Show info toast:

```tsx
alert.info("New update available");
```

#### promise(promise, messages, options?)

Show loading state during async operations:

```tsx
alert.promise(fetchData(), {
  loading: "Loading data...",
  success: "Data loaded!",
  error: "Failed to load",
});
```

#### update(id, props)

Update an existing alert:

```tsx
const id = alert.show({ message: "Processing..." });
alert.update(id, { message: "Almost done..." });
```

#### dismiss(id)

Dismiss a specific alert:

```tsx
const id = alert.show({ message: "Hello" });
alert.dismiss(id);
```

#### dismissAll()

Dismiss all alerts:

```tsx
alert.dismissAll();
```

## Advanced Features

### Sizes

Three size variants available:

```tsx
<Alert size="sm" status="info" message="Small alert" />
<Alert size="md" status="info" message="Medium alert" />
<Alert size="lg" status="info" message="Large alert" />
```

### All Variants

```tsx
// Solid - Bold filled background
<Alert variant="solid" status="success" message="Solid variant" />

// Subtle - Light background (default)
<Alert variant="subtle" status="info" message="Subtle variant" />

// Outline - Bordered with transparent background
<Alert variant="outline" status="warning" message="Outline variant" />

// Left Accent - Vertical accent bar
<Alert variant="left-accent" status="danger" message="Left accent" />

// Top Accent - Horizontal accent bar
<Alert variant="top-accent" status="success" message="Top accent" />

// Glass - Glassmorphism effect
<Alert variant="glass" status="info" message="Glass variant" />

// Gradient - Gradient background
<Alert variant="gradient" status="success" message="Gradient variant" />

// Minimal - Clean minimal design
<Alert variant="minimal" status="info" message="Minimal variant" />
```

### With Actions

Add action buttons to alerts:

```tsx
<Alert
  status="warning"
  title="Unsaved Changes"
  message="You have unsaved changes. Would you like to save?"
  action={{
    label: "Save",
    onClick: () => console.log("Saving..."),
    variant: "button",
  }}
  secondaryAction={{
    label: "Discard",
    onClick: () => console.log("Discarding..."),
    variant: "link",
  }}
/>
```

### Auto-dismiss with Progress

Show a progress bar for auto-dismissing alerts:

```tsx
<Alert
  status="info"
  message="This will auto-dismiss in 5 seconds"
  duration={5000}
  showProgress
  pauseOnHover
/>
```

### Custom Icons

Use custom icons or animated icons:

```tsx
import { Icon, Spinner, AnimatedCheck } from "saha-ui";

// Custom icon
<Alert
  status="info"
  message="Custom icon"
  icon={<Icon name="star" />}
/>

// Loading spinner
<Alert
  status="info"
  message="Processing..."
  icon={<Spinner />}
/>

// Animated check
<Alert
  status="success"
  message="Completed!"
  icon={<AnimatedCheck />}
/>

// Icon animations
<Alert
  status="warning"
  message="Warning!"
  iconAnimation="shake"
/>
```

### Controlled State

Manage alert visibility programmatically:

```tsx
function ControlledAlert() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Alert</button>

      <Alert
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        status="info"
        message="Controlled alert"
        closeable
      />
    </div>
  );
}
```

### Animation Options

Choose from multiple animation styles:

```tsx
<Alert animation="fade" message="Fade animation" />
<Alert animation="slide-up" message="Slide up" />
<Alert animation="slide-down" message="Slide down" />
<Alert animation="slide-left" message="Slide left" />
<Alert animation="slide-right" message="Slide right" />
<Alert animation="scale" message="Scale animation" />
<Alert animation="bounce" message="Bounce animation" />
<Alert animation="none" message="No animation" />
```

### Mobile Gestures

Alerts support swipe-to-dismiss on mobile:

```tsx
<Alert
  status="info"
  message="Swipe left or right to dismiss"
  closeOnSwipe
  closeable
/>
```

## Styling

### Custom Styles

Apply custom styles using className:

```tsx
<Alert
  status="success"
  message="Custom styled alert"
  className="shadow-2xl border-2 border-green-500"
/>
```

### Tailwind Classes

Combine with Tailwind utilities:

```tsx
<Alert
  status="info"
  message="Alert with custom spacing"
  className="my-8 max-w-2xl mx-auto"
/>
```

## Accessibility

The Alert component follows accessibility best practices:

- **ARIA Roles:**
  - Uses `role="alert"` for important messages
  - Status icons have proper labels
- **Keyboard Navigation:**
  - Close button is keyboard accessible
  - Proper focus management
- **Screen Readers:**
  - Alert content is announced to screen readers
  - Status is conveyed through ARIA attributes

## Best Practices

1. **Choose Appropriate Status:** Use the correct status to match the message type (success for confirmations, danger for errors, etc.)
2. **Keep Messages Concise:** Alerts should be brief and scannable
3. **Use Titles Wisely:** Add titles for complex alerts to provide context
4. **Consider Persistence:** Make critical alerts non-dismissible
5. **Position Strategically:** Place alerts near relevant content or at the top of the page
6. **Limit Quantity:** Avoid showing multiple alerts simultaneously
7. **Provide Actions:** Include action buttons for alerts that require user response

## Common Patterns

### Form Validation Feedback

```tsx
function FormWithAlert() {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && (
        <Alert
          status="danger"
          title="Validation Error"
          message={error}
          closeable
          className="mb-4"
        />
      )}
      <form onSubmit={handleSubmit}>{/* form fields */}</form>
    </div>
  );
}
```

### Success Notification

```tsx
function SaveButton() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Save logic
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      {saved && (
        <Alert
          status="success"
          message="Changes saved successfully!"
          variant="subtle"
        />
      )}
      <button onClick={handleSave}>Save</button>
    </>
  );
}
```

### System Status Alert

```tsx
<Alert
  variant="left-accent"
  status="warning"
  title="Scheduled Maintenance"
  message="The system will be down for maintenance on Sunday, 2:00 AM - 4:00 AM EST."
  className="mb-6"
/>
```

### Announcement Banner

```tsx
<Alert variant="solid" status="info" closeable>
  <div className="flex items-center justify-between">
    <div>
      <strong>New Version Available!</strong>
      <span className="ml-2">Update now to get the latest features.</span>
    </div>
    <button className="ml-4 px-4 py-2 bg-white/20 rounded hover:bg-white/30">
      Update
    </button>
  </div>
</Alert>
```

## Animation

Alerts support smooth enter/exit animations. Combine with animation libraries for enhanced effects:

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
>
  <Alert status="success" message="Animated alert" />
</motion.div>;
```

## Related Components

- **Toast** - For temporary, auto-dismissing notifications
- **Banner** - For persistent announcements across the application
- **Notification** - For system-level notifications
- **Snackbar** - For brief messages at the bottom of the screen

## Changelog

- **v1.0.0** - Initial release with all variants and features
