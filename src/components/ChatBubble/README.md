# ChatBubble

Displays a conversational message bubble with optional avatar, timestamp, sender name, and read status indicators.

## Installation

```tsx
import { ChatBubble } from 'saha-ui';
```

## Usage

### Basic Messaging

```tsx
import { ChatBubble } from "saha-ui";

export default function Example() {
  return (
    <div className="flex flex-col p-4 w-96 mx-auto border rounded-xl bg-card">
      <ChatBubble 
        message="Hey there! How are you?"
        isMe={false}
        sender="Alice"
        avatar="https://i.pravatar.cc/150?u=1"
        timestamp="10:42 AM"
      />
      <ChatBubble 
        message="I'm doing well, thanks for asking! Are we still on for the 3pm?"
        isMe={true}
        status="read"
        timestamp="10:45 AM"
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `ReactNode` | - | The main text body bubble content displayed |
| `sender` | `string` | - | Displays identity name overhead for group layout rendering |
| `timestamp` | `string` | - | Sub-caption footprint rendered beneath or beside status |
| `isMe` | `boolean` | `false` | Flips alignment horizontally enforcing primary styling layout automatically |
| `avatar` | `string \| AvatarProps` | - | Imager URL or standard Avatar parameters mapped directly |
| `hideAvatar` | `boolean` | `false` | Drops the rendering component avatar node entirely |
| `variant` | `"default" \| "primary" \| "secondary" \| "ghost" \| "glass"` | `"default"` | Explicit bubble background shading scheme mapped natively via CVA |
| `status` | `"sending" \| "sent" \| "delivered" \| "read" \| "failed"` | - | Renders standard tick/clock/error iconography next to timestamp if `isMe=true` |
