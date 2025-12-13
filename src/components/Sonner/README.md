# Sonner

An opinionated toast notification component powered by the Sonner library. Provides beautiful, accessible notifications with rich customization options.

## Features

- 🎨 Beautiful default styling
- 🎯 Promise-based toasts
- 🔄 Loading states
- ✅ Success/error/warning types
- 📝 Rich content support
- 🎭 Smooth animations
- ⚡ Action buttons
- 🎨 Highly customizable

## Installation

```bash
npm install saha-ui sonner
```

## Basic Usage

```tsx
import { Toaster, toast } from "saha-ui";

function App() {
  return (
    <div>
      <button onClick={() => toast("Hello World!")}>Show Toast</button>

      <Toaster />
    </div>
  );
}
```

## Toast Types

```tsx
// Default
toast("Event has been created");

// Success
toast.success("Profile updated");

// Error
toast.error("Failed to save changes");

// Warning
toast.warning("Storage almost full");

// Info
toast.info("New update available");

// Loading
toast.loading("Uploading file...");
```

## With Description

```tsx
toast("Event Created", {
  description: "Your event has been scheduled for tomorrow at 10 AM",
});
```

## With Actions

```tsx
toast("Friend Request", {
  description: "John Doe wants to connect",
  action: {
    label: "Accept",
    onClick: () => acceptRequest(),
  },
  cancel: {
    label: "Decline",
    onClick: () => declineRequest(),
  },
});
```

## Promise Toasts

```tsx
toast.promise(saveDocument(), {
  loading: "Saving document...",
  success: "Document saved successfully!",
  error: "Failed to save document",
});

// With custom messages
toast.promise(uploadFile(file), {
  loading: "Uploading...",
  success: (data) => `${data.name} uploaded!`,
  error: (err) => `Error: ${err.message}`,
});
```

## Custom Duration

```tsx
toast("Quick message", { duration: 2000 });
toast("Important notice", { duration: 10000 });
toast("Manual dismiss", { duration: Infinity });
```

## Positions

```tsx
<Toaster position="top-left" />
<Toaster position="top-center" />
<Toaster position="top-right" />
<Toaster position="bottom-left" />
<Toaster position="bottom-center" />
<Toaster position="bottom-right" />
```

## Common Patterns

### Form Submission

```tsx
const handleSubmit = async (data) => {
  const promise = submitForm(data);

  toast.promise(promise, {
    loading: "Submitting form...",
    success: "Form submitted successfully!",
    error: "Failed to submit form",
  });

  await promise;
  router.push("/success");
};
```

### File Upload with Progress

```tsx
const handleUpload = async (file) => {
  const toastId = toast.loading("Uploading file...");

  try {
    const result = await uploadFile(file, {
      onProgress: (progress) => {
        toast.loading(`Uploading... ${progress}%`, { id: toastId });
      },
    });

    toast.success("File uploaded successfully!", { id: toastId });
  } catch (error) {
    toast.error("Upload failed", { id: toastId });
  }
};
```

### Undo Action

```tsx
const handleDelete = (item) => {
  deleteItem(item.id);

  toast("Item deleted", {
    action: {
      label: "Undo",
      onClick: () => {
        restoreItem(item);
        toast.success("Item restored");
      },
    },
  });
};
```

### Multi-step Process

```tsx
const handleProcess = async () => {
  const toastId = toast.loading("Step 1: Validating...");

  await validate();
  toast.loading("Step 2: Processing...", { id: toastId });

  await process();
  toast.loading("Step 3: Finalizing...", { id: toastId });

  await finalize();
  toast.success("All steps completed!", { id: toastId });
};
```

## API Reference

### Toaster Props

| Prop            | Type                                | Default          | Description        |
| --------------- | ----------------------------------- | ---------------- | ------------------ |
| `position`      | `ToastPosition`                     | `"bottom-right"` | Toast position     |
| `expand`        | `boolean`                           | `false`          | Expand on hover    |
| `visibleToasts` | `number`                            | `3`              | Max visible toasts |
| `closeButton`   | `boolean`                           | `false`          | Show close button  |
| `richColors`    | `boolean`                           | `true`           | Enhanced colors    |
| `theme`         | `'light'` \| `'dark'` \| `'system'` | `"system"`       | Color theme        |

### toast Options

| Option        | Type                 | Default | Description            |
| ------------- | -------------------- | ------- | ---------------------- |
| `description` | `string`             | -       | Secondary text         |
| `duration`    | `number`             | `4000`  | Auto-dismiss time (ms) |
| `action`      | `ToastAction`        | -       | Action button          |
| `cancel`      | `ToastAction`        | -       | Cancel button          |
| `id`          | `string` \| `number` | -       | Unique identifier      |
| `onDismiss`   | `() => void`         | -       | Dismiss callback       |
| `onAutoClose` | `() => void`         | -       | Auto-close callback    |

### ToastAction

| Prop      | Type         | Description   |
| --------- | ------------ | ------------- |
| `label`   | `string`     | Button label  |
| `onClick` | `() => void` | Click handler |

## Accessibility

- ARIA live regions for announcements
- Keyboard navigation support
- Focus management
- Reduced motion support
- Screen reader optimized

## TypeScript

```typescript
import type { ToasterProps, ToastOptions } from "saha-ui";
```

## Related Components

- Snackbar
- Alert
- Notification
