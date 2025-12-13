# Snackbar

A lightweight toast notification component for displaying brief messages and alerts. Provides feedback to users about actions and events.

## Features

- 🎨 14 visual variants
- 📏 8 size options
- 📍 9 position options
- ⏱️ Auto-dismiss
- 🎯 Action buttons
- 🎨 Close button
- ⚡ Stacking support
- 🎭 Smooth animations

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Snackbar, useSnackbar } from "saha-ui";

function App() {
  const { showSnackbar } = useSnackbar();

  return (
    <div>
      <button onClick={() => showSnackbar("File saved successfully!")}>
        Save
      </button>

      <Snackbar />
    </div>
  );
}
```

## Variants

```tsx
showSnackbar("Success!", { variant: "default" });
showSnackbar("Success!", { variant: "primary" });
showSnackbar("Update available", { variant: "secondary" });
showSnackbar("Error occurred", { variant: "destructive" });
showSnackbar("Changes saved", { variant: "outline" });
showSnackbar("Processing...", { variant: "ghost" });
showSnackbar("Premium feature!", { variant: "gradient" });
showSnackbar("Notification", { variant: "glass" });
```

## Sizes

```tsx
showSnackbar("Message", { size: "xs" });
showSnackbar("Message", { size: "sm" });
showSnackbar("Message", { size: "md" });
showSnackbar("Message", { size: "lg" });
showSnackbar("Message", { size: "xl" });
```

## Positions

```tsx
showSnackbar("Top Left", { position: "top-left" });
showSnackbar("Top Center", { position: "top-center" });
showSnackbar("Top Right", { position: "top-right" });
showSnackbar("Bottom Left", { position: "bottom-left" });
showSnackbar("Bottom Center", { position: "bottom-center" });
showSnackbar("Bottom Right", { position: "bottom-right" });
```

## With Actions

```tsx
showSnackbar("File deleted", {
  action: {
    label: "Undo",
    onClick: () => restoreFile(),
  },
});
```

## Auto Dismiss

```tsx
showSnackbar("Auto dismiss in 5s", { duration: 5000 });
showSnackbar("Manual dismiss only", { duration: Infinity });
```

## Common Patterns

### Success Notification

```tsx
const handleSave = async () => {
  try {
    await saveDocument();
    showSnackbar("Document saved successfully!", {
      variant: "default",
      duration: 3000,
    });
  } catch (error) {
    showSnackbar("Failed to save document", {
      variant: "destructive",
      duration: 5000,
    });
  }
};
```

### Undo Action

```tsx
const handleDelete = (item) => {
  deleteItem(item.id);

  showSnackbar(`${item.name} deleted`, {
    variant: "destructive",
    action: {
      label: "Undo",
      onClick: () => {
        restoreItem(item);
        showSnackbar("Item restored", { variant: "default" });
      },
    },
    duration: 5000,
  });
};
```

### Loading State

```tsx
const handleUpload = async (file) => {
  const snackbarId = showSnackbar("Uploading file...", {
    variant: "ghost",
    duration: Infinity,
  });

  try {
    await uploadFile(file);
    hideSnackbar(snackbarId);
    showSnackbar("File uploaded successfully!", {
      variant: "default",
    });
  } catch (error) {
    hideSnackbar(snackbarId);
    showSnackbar("Upload failed", {
      variant: "destructive",
      action: {
        label: "Retry",
        onClick: () => handleUpload(file),
      },
    });
  }
};
```

## API Reference

### Snackbar Props

| Prop        | Type               | Default           | Description        |
| ----------- | ------------------ | ----------------- | ------------------ |
| `variant`   | `SnackbarVariant`  | `"default"`       | Visual style       |
| `size`      | `SnackbarSize`     | `"md"`            | Size preset        |
| `position`  | `SnackbarPosition` | `"bottom-center"` | Screen position    |
| `className` | `string`           | -                 | Additional classes |

### showSnackbar Options

| Option     | Type               | Default           | Description            |
| ---------- | ------------------ | ----------------- | ---------------------- |
| `variant`  | `SnackbarVariant`  | `"default"`       | Visual style           |
| `size`     | `SnackbarSize`     | `"md"`            | Size preset            |
| `position` | `SnackbarPosition` | `"bottom-center"` | Screen position        |
| `duration` | `number`           | `3000`            | Auto-dismiss time (ms) |
| `action`   | `SnackbarAction`   | -                 | Action button          |
| `closable` | `boolean`          | `true`            | Show close button      |

### SnackbarAction

| Prop      | Type         | Description   |
| --------- | ------------ | ------------- |
| `label`   | `string`     | Button label  |
| `onClick` | `() => void` | Click handler |

## Accessibility

- ARIA live regions for screen readers
- Focus management for actions
- Keyboard dismissal with Escape
- Sequential announcement for multiple toasts
- Reduced motion support

## TypeScript

```typescript
import type { SnackbarProps, SnackbarOptions } from "saha-ui";
```

## Related Components

- Alert
- Toast
- Sonner
