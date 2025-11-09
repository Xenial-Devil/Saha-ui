# Notification

A complete notification system with context provider for managing toast-like notifications with positioning, stacking, and auto-dismiss functionality.

## Installation

```tsx
import { 
  Notification, 
  NotificationProvider, 
  NotificationContainer,
  useNotifications 
} from '@saha-ui/components';
```

## Usage

### Setup Provider

Wrap your application with the `NotificationProvider`:

```tsx
import { NotificationProvider } from '@saha-ui/components';

function App() {
  return (
    <NotificationProvider position="top-right" maxCount={5}>
      <YourApp />
    </NotificationProvider>
  );
}
```

### Basic Usage

Use the `useNotifications` hook to add notifications:

```tsx
import { useNotifications } from '@saha-ui/components';

function MyComponent() {
  const { addNotification } = useNotifications();

  const showNotification = () => {
    addNotification({
      title: 'Success',
      description: 'Your changes have been saved.',
      variant: 'success',
      duration: 5000,
    });
  };

  return <button onClick={showNotification}>Save</button>;
}
```

### Variants

The Notification component supports 4 visual variants:

```tsx
// Info notification (default)
addNotification({
  title: 'Information',
  description: 'Here is some useful information.',
  variant: 'info',
});

// Success notification
addNotification({
  title: 'Success',
  description: 'Operation completed successfully.',
  variant: 'success',
});

// Warning notification
addNotification({
  title: 'Warning',
  description: 'Please review this warning.',
  variant: 'warning',
});

// Error notification
addNotification({
  title: 'Error',
  description: 'Something went wrong.',
  variant: 'error',
});
```

### Positioning

The notification container can be positioned in 6 different locations:

```tsx
<NotificationProvider position="top-left">
<NotificationProvider position="top-center">
<NotificationProvider position="top-right">
<NotificationProvider position="bottom-left">
<NotificationProvider position="bottom-center">
<NotificationProvider position="bottom-right">
```

### Auto-dismiss

Control how long notifications stay visible:

```tsx
// Auto-dismiss after 5 seconds (default)
addNotification({
  title: 'Temporary',
  description: 'This will disappear in 5 seconds.',
  duration: 5000,
});

// No auto-dismiss
addNotification({
  title: 'Persistent',
  description: 'This stays until manually closed.',
  duration: 0,
});

// Custom duration
addNotification({
  title: 'Custom',
  description: 'This disappears in 10 seconds.',
  duration: 10000,
});
```

### With Actions

Add custom action buttons to notifications:

```tsx
import { Button } from '@saha-ui/components';

addNotification({
  title: 'Update Available',
  description: 'A new version is ready to install.',
  variant: 'info',
  action: (
    <>
      <Button size="sm" onClick={handleUpdate}>
        Update
      </Button>
      <Button size="sm" variant="ghost" onClick={handleDismiss}>
        Later
      </Button>
    </>
  ),
});
```

### With Timestamp

Display relative timestamps:

```tsx
addNotification({
  title: 'Message Received',
  description: 'John sent you a message.',
  variant: 'info',
  showTimestamp: true,
});
```

### Custom Icons

Provide custom icons for notifications:

```tsx
import { BellIcon } from 'lucide-react';

addNotification({
  title: 'New Notification',
  description: 'You have a new message.',
  icon: <BellIcon className="w-5 h-5" />,
});
```

### Programmatic Control

```tsx
const { addNotification, removeNotification, clearNotifications } = useNotifications();

// Add a notification and get its ID
const id = addNotification({
  title: 'Processing',
  description: 'Please wait...',
  duration: 0,
});

// Later, remove it programmatically
removeNotification(id);

// Or clear all notifications
clearNotifications();
```

### Update Notifications

```tsx
const { addNotification, updateNotification } = useNotifications();

const id = addNotification({
  title: 'Uploading',
  description: 'Upload in progress...',
  duration: 0,
});

// Update the notification
updateNotification(id, {
  title: 'Upload Complete',
  description: 'File uploaded successfully!',
  variant: 'success',
  duration: 3000,
});
```

## Props

### NotificationProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique identifier for the notification |
| `title` | `ReactNode` | - | Title of the notification |
| `description` | `ReactNode` | - | Description/message of the notification |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Variant style |
| `icon` | `ReactNode` | - | Custom icon to display |
| `closable` | `boolean` | `true` | Whether the notification can be closed |
| `duration` | `number` | `5000` | Duration in ms before auto-close (0 = no auto-close) |
| `onClose` | `(id: string) => void` | - | Callback when notification is closed |
| `action` | `ReactNode` | - | Custom action buttons |
| `showTimestamp` | `boolean` | `false` | Show timestamp |
| `timestamp` | `Date` | - | Custom timestamp |
| `className` | `string` | - | Additional CSS classes |

### NotificationContainerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `NotificationPosition` | `'top-right'` | Position of the notification container |
| `maxCount` | `number` | `5` | Maximum number of notifications to show |
| `gap` | `number` | `12` | Gap between notifications in pixels |
| `zIndex` | `number` | `9999` | Z-index for the container |
| `className` | `string` | - | Additional CSS classes |

### NotificationProviderProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `position` | `NotificationPosition` | `'top-right'` | Position of notifications |
| `maxCount` | `number` | `5` | Maximum notifications to show |
| `gap` | `number` | `12` | Gap between notifications |

## Hook API

### useNotifications()

Returns an object with the following methods:

| Method | Type | Description |
|--------|------|-------------|
| `notifications` | `NotificationItemType[]` | Array of current notifications |
| `addNotification` | `(notification: Omit<NotificationItemType, 'id' \| 'timestamp'>) => string` | Add a new notification, returns ID |
| `removeNotification` | `(id: string) => void` | Remove a notification by ID |
| `clearNotifications` | `() => void` | Remove all notifications |
| `updateNotification` | `(id: string, updates: Partial<NotificationItemType>) => void` | Update an existing notification |

## Examples

### Form Submission Feedback

```tsx
const handleSubmit = async (data) => {
  try {
    await api.submit(data);
    addNotification({
      title: 'Success',
      description: 'Form submitted successfully!',
      variant: 'success',
    });
  } catch (error) {
    addNotification({
      title: 'Error',
      description: error.message,
      variant: 'error',
      duration: 0, // Stay until dismissed
    });
  }
};
```

### Multi-step Process

```tsx
const handleProcess = async () => {
  const id = addNotification({
    title: 'Step 1/3',
    description: 'Processing...',
    duration: 0,
  });

  await step1();
  updateNotification(id, {
    title: 'Step 2/3',
    description: 'Still processing...',
  });

  await step2();
  updateNotification(id, {
    title: 'Step 3/3',
    description: 'Almost done...',
  });

  await step3();
  updateNotification(id, {
    title: 'Complete',
    description: 'Process finished successfully!',
    variant: 'success',
    duration: 3000,
  });
};
```

### Undo Action

```tsx
const handleDelete = (item) => {
  deleteItem(item.id);

  addNotification({
    title: 'Item Deleted',
    description: `${item.name} has been removed.`,
    variant: 'success',
    duration: 5000,
    action: (
      <Button size="sm" onClick={() => restoreItem(item.id)}>
        Undo
      </Button>
    ),
  });
};
```

### Network Status

```tsx
useEffect(() => {
  const handleOffline = () => {
    addNotification({
      title: 'No Connection',
      description: 'You are currently offline.',
      variant: 'warning',
      duration: 0,
    });
  };

  const handleOnline = () => {
    addNotification({
      title: 'Back Online',
      description: 'Connection restored.',
      variant: 'success',
    });
  };

  window.addEventListener('offline', handleOffline);
  window.addEventListener('online', handleOnline);

  return () => {
    window.removeEventListener('offline', handleOffline);
    window.removeEventListener('online', handleOnline);
  };
}, []);
```

## Accessibility

- **ARIA Attributes**: Uses `role="alert"` and `aria-live="polite"` for screen readers
- **Keyboard Navigation**: Closable notifications can be dismissed with keyboard
- **Focus Management**: Maintains proper focus order
- **Color Contrast**: All variants meet WCAG AA standards

## Styling

The Notification component uses CVA (Class Variance Authority) for styling. You can customize it by:

```tsx
<Notification
  className="custom-notification"
  variant="success"
/>
```

Or override specific parts:

```tsx
addNotification({
  title: 'Custom',
  description: 'With custom styling',
  className: 'bg-gradient-to-r from-purple-500 to-pink-500',
});
```

## Best Practices

1. **Use appropriate variants**: Match the variant to the message type
2. **Keep messages concise**: Titles should be short, descriptions brief
3. **Set appropriate durations**: Errors might need longer or no auto-dismiss
4. **Limit notification count**: Don't overwhelm users with too many notifications
5. **Provide actions when needed**: Allow users to act on notifications
6. **Use timestamps for chat/messages**: Helps users understand when events occurred

## Related Components

- [Toast](../Toast/README.md) - Alternative notification component
- [Sonner](../Sonner/README.md) - Another toast notification library
- [Alert](../Alert/README.md) - Inline alert messages
- [Dialog](../Dialog/README.md) - Modal dialogs

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)