# Toast

A notification component for displaying temporary messages to users. Toasts appear on screen briefly to provide feedback about operations, then automatically dismiss. Supports multiple positions, variants, and rich customization options.

## Features

- 🎯 Six positioning options (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)
- 🎨 Four visual variants (solid, subtle, outline, glass)
- 🎭 Four status types (info, success, warning, danger)
- ✨ Multiple animation styles (slide, fade, scale, bounce)
- ⏱️ Auto-dismiss with configurable duration
- 🔔 Optional sound notifications
- 📊 Progress bar indicator
- 🎬 Action buttons support
- ⏸️ Pause on hover
- 🎪 Stack management with maximum limit
- ♿ Full accessibility support
- 🎨 Custom icons and content

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { ToastProvider, useToast } from '@saha-ui/core';

// Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
}

// Use in components
function MyComponent() {
  const toast = useToast();

  const showToast = () => {
    toast.success('Operation completed successfully!');
  };

  return <button onClick={showToast}>Show Toast</button>;
}
```

## Status Methods

### Success Toast

```tsx
const toast = useToast();

// Simple message
toast.success('Changes saved!');

// With title
toast.success('Changes saved!', 'Success');

// With options
toast.success('Changes saved!', {
  duration: 5000,
  position: 'top-right'
});

// With title and options
toast.success('Changes saved!', 'Success', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked')
  }
});
```

### Error Toast

```tsx
toast.error('Failed to save changes');
toast.error('Failed to save changes', 'Error');
toast.error('Failed to save changes', {
  duration: 0, // Won't auto-dismiss
  closable: true
});
```

### Warning Toast

```tsx
toast.warning('Your session will expire soon');
toast.warning('Your session will expire soon', 'Warning');
```

### Info Toast

```tsx
toast.info('New features available');
toast.info('New features available', 'Information');
```

## Custom Toast

Use the base `toast()` method for full customization:

```tsx
const toast = useToast();

toast.toast({
  title: 'Custom Toast',
  description: 'This is a custom toast message',
  status: 'success',
  variant: 'glass',
  position: 'top-center',
  duration: 4000,
  animation: 'slide',
  showIcon: true,
  showProgress: true,
  pauseOnHover: true,
  action: {
    label: 'View',
    onClick: () => console.log('Action clicked')
  }
});
```

## Positioning

Available positions:

```tsx
toast.success('Top Left', { position: 'top-left' });
toast.success('Top Center', { position: 'top-center' });
toast.success('Top Right', { position: 'top-right' });
toast.success('Bottom Left', { position: 'bottom-left' });
toast.success('Bottom Center', { position: 'bottom-center' });
toast.success('Bottom Right', { position: 'bottom-right' });
```

## Variants

### Solid (Default)

```tsx
toast.success('Solid variant', { variant: 'solid' });
```

### Subtle

```tsx
toast.success('Subtle variant', { variant: 'subtle' });
```

### Outline

```tsx
toast.success('Outline variant', { variant: 'outline' });
```

### Glass

```tsx
toast.success('Glass variant', { variant: 'glass' });
```

## Animations

```tsx
toast.success('Slide animation', { animation: 'slide' });
toast.success('Fade animation', { animation: 'fade' });
toast.success('Scale animation', { animation: 'scale' });
toast.success('Bounce animation', { animation: 'bounce' });
```

## Duration

```tsx
// 3 seconds (default is usually 3000-5000ms)
toast.success('Quick message', { duration: 3000 });

// 10 seconds
toast.success('Longer message', { duration: 10000 });

// Never auto-dismiss
toast.error('Critical error', { duration: 0 });
```

## With Actions

Add interactive buttons to toasts:

```tsx
toast.success('File uploaded successfully', {
  action: {
    label: 'View',
    onClick: () => {
      window.location.href = '/files';
    }
  }
});

toast.warning('Unsaved changes', {
  duration: 0,
  action: {
    label: 'Save',
    onClick: handleSave
  }
});
```

## With Custom Icons

```tsx
import { Rocket } from 'lucide-react';

toast.success('Deployment started!', {
  icon: <Rocket className="w-5 h-5" />
});
```

## Progress Bar

Show progress indicator:

```tsx
toast.info('Processing...', {
  showProgress: true,
  duration: 5000
});
```

## Pause on Hover

```tsx
toast.success('Hover to pause', {
  pauseOnHover: true,
  duration: 5000
});
```

## Managing Toasts

### Close Specific Toast

```tsx
const toast = useToast();

const toastId = toast.success('This can be closed programmatically');

// Later...
toast.close(toastId);
```

### Close All Toasts

```tsx
toast.closeAll();
```

### Update Existing Toast

```tsx
const toast = useToast();

const toastId = toast.info('Loading...', {
  duration: 0,
  showProgress: true
});

// Later, update it
setTimeout(() => {
  toast.update(toastId, {
    status: 'success',
    title: 'Complete!',
    description: 'Operation finished successfully',
    duration: 3000
  });
}, 3000);
```

## Provider Configuration

Configure default settings for all toasts:

```tsx
<ToastProvider
  position="top-right"
  duration={4000}
  max={5}
  gap={16}
  offset={20}
  variant="solid"
  animation="slide"
>
  <App />
</ToastProvider>
```

## API Reference

### Toast Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `toast()` | `options: ToastProps` | Display custom toast |
| `success()` | `(description, title?, options?)` | Display success toast |
| `error()` | `(description, title?, options?)` | Display error toast |
| `warning()` | `(description, title?, options?)` | Display warning toast |
| `info()` | `(description, title?, options?)` | Display info toast |
| `close()` | `id: string` | Close specific toast |
| `closeAll()` | - | Close all toasts |
| `update()` | `(id, options)` | Update existing toast |

### Toast Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Toast title |
| `description` | `string` | - | Toast message |
| `status` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Status type |
| `variant` | `'solid' \| 'subtle' \| 'outline' \| 'glass'` | `'solid'` | Visual variant |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | Screen position |
| `animation` | `'slide' \| 'fade' \| 'scale' \| 'bounce'` | `'slide'` | Animation style |
| `duration` | `number` | `4000` | Auto-dismiss duration (0 to disable) |
| `closable` | `boolean` | `true` | Show close button |
| `showIcon` | `boolean` | `true` | Show status icon |
| `icon` | `ReactNode` | - | Custom icon |
| `showProgress` | `boolean` | `false` | Show progress bar |
| `pauseOnHover` | `boolean` | `true` | Pause dismiss on hover |
| `action` | `{ label: string, onClick: () => void }` | - | Action button |
| `onClose` | `() => void` | - | Close callback |
| `playSound` | `boolean` | `false` | Play notification sound |
| `className` | `string` | - | Additional CSS classes |

### ToastProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `ToastPosition` | `'top-right'` | Default position |
| `duration` | `number` | `4000` | Default duration |
| `max` | `number` | `5` | Maximum toasts to show |
| `gap` | `number` | `12` | Gap between toasts (px) |
| `offset` | `number` | `16` | Offset from edges (px) |
| `variant` | `ToastVariant` | `'solid'` | Default variant |
| `animation` | `ToastAnimation` | `'slide'` | Default animation |

## Common Patterns

### Loading with Success

```tsx
function UploadFile() {
  const toast = useToast();

  const handleUpload = async () => {
    const toastId = toast.info('Uploading file...', {
      duration: 0,
      showProgress: true
    });

    try {
      await uploadFile();
      toast.update(toastId, {
        status: 'success',
        title: 'Upload Complete',
        description: 'Your file has been uploaded successfully',
        duration: 3000
      });
    } catch (error) {
      toast.update(toastId, {
        status: 'danger',
        title: 'Upload Failed',
        description: error.message,
        duration: 5000
      });
    }
  };

  return <button onClick={handleUpload}>Upload</button>;
}
```

### Confirmation Toast

```tsx
function DeleteButton({ onDelete }) {
  const toast = useToast();

  const handleDelete = () => {
    toast.warning('Are you sure?', {
      duration: 0,
      action: {
        label: 'Delete',
        onClick: () => {
          onDelete();
          toast.closeAll();
          toast.success('Item deleted');
        }
      }
    });
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

### Form Validation

```tsx
function MyForm() {
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields', 'Validation Error');
      return;
    }

    toast.success('Form submitted successfully!');
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Network Status

```tsx
function NetworkStatus() {
  const toast = useToast();

  useEffect(() => {
    const handleOnline = () => {
      toast.success('Back online', 'Connection Restored');
    };

    const handleOffline = () => {
      toast.error('No internet connection', 'Offline', {
        duration: 0
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  return null;
}
```

### Undo Action

```tsx
function TodoList() {
  const toast = useToast();
  const [todos, setTodos] = useState([]);

  const deleteTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    setTodos(todos.filter(t => t.id !== id));

    toast.success('Todo deleted', {
      action: {
        label: 'Undo',
        onClick: () => {
          setTodos([...todos, todo]);
          toast.info('Todo restored');
        }
      }
    });
  };

  return <div>...</div>;
}
```

## Accessibility

The Toast component follows accessibility best practices:

- **ARIA Attributes:**
  - `role="status"` for informational toasts
  - `role="alert"` for urgent toasts
  - `aria-live="polite"` or `"assertive"` based on status
  - `aria-atomic="true"` for complete announcements

- **Keyboard Navigation:**
  - Close button is keyboard accessible
  - Action buttons are focusable
  - Focus management when toast appears

- **Screen Readers:**
  - Toast content is announced
  - Status is conveyed clearly
  - Closable toasts have accessible labels

## Best Practices

1. **Keep Messages Brief:** Toasts should be scannable at a glance
2. **Use Appropriate Status:** Match status to message importance
3. **Don't Overuse:** Too many toasts can be disruptive
4. **Provide Actions When Needed:** Add undo/view actions for important operations
5. **Set Appropriate Duration:** Longer messages need more time
6. **Position Consistently:** Stick to one or two positions throughout your app
7. **Consider Mobile:** Test toast behavior on mobile devices
8. **Error Duration:** Critical errors should not auto-dismiss (duration: 0)

## Styling

### Custom Styles

```tsx
toast.success('Custom styled toast', {
  className: 'my-custom-toast shadow-2xl'
});
```

### Custom Theme

Toasts use your theme's color tokens, but you can override:

```tsx
toast.toast({
  title: 'Custom Colors',
  description: 'This toast has custom styling',
  status: 'info',
  className: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
});
```

## Related Components

- **Alert** - Static alerts for important messages
- **Notification** - Persistent notifications
- **Snackbar** - Alternative notification style
- **Banner** - Full-width announcement bars

## Changelog

- **v1.0.0** - Initial release with all features