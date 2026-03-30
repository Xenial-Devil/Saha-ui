# AnnouncementBar

A prominent, dismissible banner usually displayed at the top or bottom of the page for important announcements. It is built on top of the `Alert` component.

## Installation

```tsx
import { AnnouncementBar } from "saha-ui";
```

## Usage

### Basic Usage

```tsx
import { AnnouncementBar } from "saha-ui";

export default function MyPage() {
  return (
    <AnnouncementBar variant="primary" closable={true}>
      We have updated our privacy policy. Please review the changes.
    </AnnouncementBar>
  );
}
```

### With Actions

```tsx
<AnnouncementBar
  variant="info"
  action={{ label: "Learn More", onClick: () => console.log("clicked") }}
>
  New feature: Dark mode is now available!
</AnnouncementBar>
```

## Props

The `AnnouncementBar` accepts all standard `AlertProps` with the following key properties highlighted:

| Prop       | Type           | Default     | Description                                         |
| ---------- | -------------- | ----------- | --------------------------------------------------- |
| `variant`  | `AlertVariant` | `"primary"` | The semantic color/variant of the bar.              |
| `closable` | `boolean`      | `true`      | Whether to show the close button.                   |
| `onClose`  | `() => void`   | `undefined` | Callback when the close button is clicked.          |
| `action`   | `AlertAction`  | `undefined` | Action button configuration.                        |
| `message`  | `ReactNode`    | `undefined` | The content to display (alternative to `children`). |
