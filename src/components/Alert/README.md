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
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Alert } from '@saha-ui/core';

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
<Alert
  variant="solid"
  status="info"
  message="This is a solid alert"
/>
```

### Subtle

Light background with softer appearance:

```tsx
<Alert
  variant="subtle"
  status="success"
  message="This is a subtle alert"
/>
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
<Alert
  variant="outline"
  status="info"
  message="This is an outline alert"
/>
```

### Glass

Modern glassmorphism effect:

```tsx
<Alert
  variant="glass"
  status="success"
  message="This is a glass alert"
/>
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
<Alert
  status="success"
  message="Changes saved successfully!"
/>
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
      <button className="mt-2 text-sm underline">
        Learn more →
      </button>
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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'solid' \| 'subtle' \| 'left-accent' \| 'top-accent' \| 'outline' \| 'glass'` | `'solid'` | Visual style variant |
| `status` | `'success' \| 'danger' \| 'warning' \| 'info'` | `'info'` | Semantic status (determines color and icon) |
| `title` | `string` | - | Optional title displayed above message |
| `message` | `string` | - | Main message content |
| `closeable` | `boolean` | `false` | Whether alert can be dismissed |
| `rounded` | `boolean` | `true` | Whether alert has rounded corners |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Custom content (overrides title/message) |

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
  const [error, setError] = useState('');

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
      <form onSubmit={handleSubmit}>
        {/* form fields */}
      </form>
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
<Alert
  variant="solid"
  status="info"
  closeable
>
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
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
>
  <Alert
    status="success"
    message="Animated alert"
  />
</motion.div>
```

## Related Components

- **Toast** - For temporary, auto-dismissing notifications
- **Banner** - For persistent announcements across the application
- **Notification** - For system-level notifications
- **Snackbar** - For brief messages at the bottom of the screen

## Changelog

- **v1.0.0** - Initial release with all variants and features