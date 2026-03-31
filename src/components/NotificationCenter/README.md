# NotificationCenter

Serves primarily as an aggregation Dropdown Panel wrapper visualizing lists of Notification items gracefully structured similarly to OS-level notification tray behaviors.

## Installation

```tsx
import { NotificationCenter } from 'saha-ui';
```

## Usage

### System Inbox Dropdown

```tsx
import { NotificationCenter } from "saha-ui";

export default function Example() {
  const notifications = [
    { title: "New Message", description: "John sent you a message" },
    { title: "Update Ready", description: "v2.0 is installed" }
  ];

  return (
    <NotificationCenter 
      notifications={notifications}
      onClearAll={() => console.log("Inbox zero!")}
      unreadCount={2}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `notifications` | `NotificationItem[]` | `[]` | Renders looping lists generating text items procedurally |
| `unreadCount` | `number` | `0` | Displays absolute numeric bubble mapping unread blocks physically |
| `onClearAll` | `() => void` | - | Fires header-based purge action cleanly mutating states properly |
| `onNotificationClick` | `(id: string) => void` | - | Broadcasts interactive pointer routines explicitly targeting rows identically |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Modifies anchoring limits pushing dropdown components cleanly |
| `align` | `"start" \| "center" \| "end"` | `"end"` | Slides alignment edges balancing standard Dropdown limits globally |
