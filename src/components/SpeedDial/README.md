# SpeedDial

A floating action button (FAB) that expands to reveal a set of related actions. Perfect for mobile interfaces and quick access menus.

## Features

- 🎨 14 visual variants
- 📏 8 size options
- 🧭 4 direction options
- 🎯 Tooltip support
- 🎭 Smooth animations
- ⌨️ Keyboard accessible
- 📱 Mobile-friendly
- 🔘 Icon support

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { SpeedDial, SpeedDialAction } from "saha-ui";
import { Plus, Mail, Phone, MessageSquare } from "lucide-react";

function App() {
  return (
    <SpeedDial icon={Plus}>
      <SpeedDialAction icon={Mail} tooltip="Email" onClick={() => {}} />
      <SpeedDialAction icon={Phone} tooltip="Call" onClick={() => {}} />
      <SpeedDialAction
        icon={MessageSquare}
        tooltip="Message"
        onClick={() => {}}
      />
    </SpeedDial>
  );
}
```

## Variants

```tsx
<SpeedDial variant="default" icon={Plus}>...</SpeedDial>
<SpeedDial variant="primary" icon={Plus}>...</SpeedDial>
<SpeedDial variant="secondary" icon={Plus}>...</SpeedDial>
<SpeedDial variant="destructive" icon={Plus}>...</SpeedDial>
<SpeedDial variant="gradient" icon={Plus}>...</SpeedDial>
<SpeedDial variant="glass" icon={Plus}>...</SpeedDial>
<SpeedDial variant="neon" icon={Plus}>...</SpeedDial>
```

## Sizes

```tsx
<SpeedDial size="sm" icon={Plus}>...</SpeedDial>
<SpeedDial size="md" icon={Plus}>...</SpeedDial>
<SpeedDial size="lg" icon={Plus}>...</SpeedDial>
<SpeedDial size="xl" icon={Plus}>...</SpeedDial>
```

## Directions

```tsx
<SpeedDial direction="up" icon={Plus}>...</SpeedDial>
<SpeedDial direction="down" icon={Plus}>...</SpeedDial>
<SpeedDial direction="left" icon={Plus}>...</SpeedDial>
<SpeedDial direction="right" icon={Plus}>...</SpeedDial>
```

## With Tooltips

```tsx
<SpeedDial icon={Plus} tooltipPosition="left">
  <SpeedDialAction
    icon={Mail}
    tooltip="Send Email"
    onClick={() => openEmail()}
  />
  <SpeedDialAction
    icon={Phone}
    tooltip="Make Call"
    onClick={() => openDialer()}
  />
  <SpeedDialAction
    icon={MessageSquare}
    tooltip="Send Message"
    onClick={() => openMessenger()}
  />
</SpeedDial>
```

## Controlled State

```tsx
const [open, setOpen] = useState(false);

<SpeedDial icon={Plus} open={open} onOpenChange={setOpen}>
  <SpeedDialAction
    icon={Mail}
    onClick={() => {
      handleEmail();
      setOpen(false);
    }}
  />
</SpeedDial>;
```

## Common Patterns

### Social Share Menu

```tsx
<SpeedDial
  icon={Share2}
  variant="gradient"
  direction="up"
  tooltipPosition="left"
>
  <SpeedDialAction
    icon={Twitter}
    tooltip="Share on Twitter"
    onClick={() => shareToTwitter()}
  />
  <SpeedDialAction
    icon={Facebook}
    tooltip="Share on Facebook"
    onClick={() => shareToFacebook()}
  />
  <SpeedDialAction
    icon={Linkedin}
    tooltip="Share on LinkedIn"
    onClick={() => shareToLinkedIn()}
  />
  <SpeedDialAction icon={Link} tooltip="Copy Link" onClick={() => copyLink()} />
</SpeedDial>
```

### Document Actions

```tsx
<SpeedDial
  icon={FileText}
  variant="primary"
  direction="left"
  className="fixed bottom-8 right-8"
>
  <SpeedDialAction
    icon={Download}
    tooltip="Download PDF"
    onClick={() => downloadPDF()}
  />
  <SpeedDialAction
    icon={Printer}
    tooltip="Print Document"
    onClick={() => printDocument()}
  />
  <SpeedDialAction
    icon={Share}
    tooltip="Share Document"
    onClick={() => shareDocument()}
  />
  <SpeedDialAction
    icon={Trash2}
    tooltip="Delete Document"
    onClick={() => deleteDocument()}
  />
</SpeedDial>
```

### Media Controls

```tsx
<SpeedDial icon={Music} variant="glass" size="lg" direction="up">
  <SpeedDialAction icon={Play} tooltip="Play" onClick={() => play()} />
  <SpeedDialAction icon={Pause} tooltip="Pause" onClick={() => pause()} />
  <SpeedDialAction icon={SkipForward} tooltip="Next" onClick={() => next()} />
  <SpeedDialAction
    icon={Volume2}
    tooltip="Volume"
    onClick={() => toggleVolume()}
  />
</SpeedDial>
```

## API Reference

### SpeedDial Props

| Prop              | Type                                           | Default     | Description                |
| ----------------- | ---------------------------------------------- | ----------- | -------------------------- |
| `icon`            | `LucideIcon`                                   | -           | Main button icon           |
| `variant`         | `SpeedDialVariant`                             | `"default"` | Visual style               |
| `size`            | `SpeedDialSize`                                | `"md"`      | Size preset                |
| `direction`       | `"up"` \| `"down"` \| `"left"` \| `"right"`    | `"up"`      | Expansion direction        |
| `open`            | `boolean`                                      | -           | Controlled open state      |
| `defaultOpen`     | `boolean`                                      | `false`     | Uncontrolled initial state |
| `onOpenChange`    | `(open: boolean) => void`                      | -           | Open state change handler  |
| `tooltipPosition` | `"top"` \| `"right"` \| `"bottom"` \| `"left"` | `"left"`    | Tooltip position           |
| `disabled`        | `boolean`                                      | `false`     | Disable component          |
| `className`       | `string`                                       | -           | Additional classes         |

### SpeedDialAction Props

| Prop        | Type         | Default | Description        |
| ----------- | ------------ | ------- | ------------------ |
| `icon`      | `LucideIcon` | -       | Action icon        |
| `tooltip`   | `string`     | -       | Tooltip text       |
| `onClick`   | `() => void` | -       | Click handler      |
| `disabled`  | `boolean`    | `false` | Disable action     |
| `className` | `string`     | -       | Additional classes |

## Accessibility

- Keyboard navigation (Tab, Enter, Escape)
- ARIA labels and roles
- Focus management
- Screen reader support
- Tooltip announcements

## TypeScript

```typescript
import type { SpeedDialProps, SpeedDialActionProps } from "saha-ui";
```

## Related Components

- Button
- Tooltip
- Dropdown
