# Avatar

A flexible avatar component for displaying user profile images, initials, and status indicators. Supports multiple sizes, shapes, and customization options.

## Features

- 🖼️ Image support with fallback to initials
- 📐 Multiple sizes (xs, sm, md, lg, xl, 2xl)
- 🔷 Three shape options (circle, square, rounded)
- 🟢 Status indicators (online, offline, away, busy)
- 🎨 Border and ring effects
- ♿ Accessible with proper alt text
- 🔄 Automatic fallback handling
- 🎭 Composable with AvatarGroup

## Installation

```bash
npm install @saha-ui/core
```

## Basic Usage

```tsx
import { Avatar } from '@saha-ui/core';

function UserProfile() {
  return (
    <Avatar
      src="/user-avatar.jpg"
      alt="John Doe"
      size="md"
    />
  );
}
```

## Sizes

Available sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

```tsx
<div className="flex items-center gap-4">
  <Avatar src="/avatar.jpg" size="xs" alt="Extra Small" />
  <Avatar src="/avatar.jpg" size="sm" alt="Small" />
  <Avatar src="/avatar.jpg" size="md" alt="Medium" />
  <Avatar src="/avatar.jpg" size="lg" alt="Large" />
  <Avatar src="/avatar.jpg" size="xl" alt="Extra Large" />
  <Avatar src="/avatar.jpg" size="2xl" alt="2X Large" />
</div>
```

## Shapes

### Circle (Default)

```tsx
<Avatar src="/avatar.jpg" shape="circle" alt="User" />
```

### Square

```tsx
<Avatar src="/avatar.jpg" shape="square" alt="User" />
```

### Rounded

```tsx
<Avatar src="/avatar.jpg" shape="rounded" alt="User" />
```

## Status Indicators

Display user status with colored indicators:

### Online

```tsx
<Avatar
  src="/avatar.jpg"
  alt="User"
  status="online"
/>
```

### Offline

```tsx
<Avatar
  src="/avatar.jpg"
  alt="User"
  status="offline"
/>
```

### Away

```tsx
<Avatar
  src="/avatar.jpg"
  alt="User"
  status="away"
/>
```

### Busy

```tsx
<Avatar
  src="/avatar.jpg"
  alt="User"
  status="busy"
/>
```

## Initials Fallback

When an image fails to load or isn't provided, display user initials:

```tsx
<Avatar
  src="/invalid-url.jpg"
  alt="John Doe"
  initials="JD"
  size="lg"
/>
```

## Border and Ring Effects

### With Border

```tsx
<Avatar
  src="/avatar.jpg"
  alt="User"
  bordered
/>
```

### With Ring Effect

```tsx
<Avatar
  src="/avatar.jpg"
  alt="User"
  ring
/>
```

### Combined

```tsx
<Avatar
  src="/avatar.jpg"
  alt="User"
  bordered
  ring
  status="online"
/>
```

## API Reference

### Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | **Required.** Image source URL |
| `alt` | `string` | `'Avatar'` | Alt text for accessibility |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Size of the avatar |
| `shape` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | Shape of the avatar |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy' \| 'none'` | `'none'` | Status indicator |
| `initials` | `string` | - | Initials to display when image fails |
| `bordered` | `boolean` | `false` | Whether to show a border |
| `ring` | `boolean` | `false` | Whether to show a ring/glow effect |
| `className` | `string` | - | Additional CSS classes |

## Common Patterns

### User Profile Card

```tsx
function UserCard({ user }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        src={user.avatar}
        alt={user.name}
        size="lg"
        status={user.isOnline ? 'online' : 'offline'}
        bordered
      />
      <div>
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.role}</p>
      </div>
    </div>
  );
}
```

### Comment Author

```tsx
function Comment({ comment }) {
  return (
    <div className="flex gap-3">
      <Avatar
        src={comment.author.avatar}
        alt={comment.author.name}
        initials={comment.author.initials}
        size="sm"
      />
      <div className="flex-1">
        <div className="font-semibold">{comment.author.name}</div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}
```

### Team Members List

```tsx
function TeamList({ members }) {
  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              src={member.avatar}
              alt={member.name}
              initials={member.initials}
              status={member.status}
              size="md"
            />
            <div>
              <div className="font-medium">{member.name}</div>
              <div className="text-sm text-muted-foreground">
                {member.email}
              </div>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            {member.role}
          </span>
        </div>
      ))}
    </div>
  );
}
```

### Status Badge in Navigation

```tsx
function UserNav({ currentUser }) {
  return (
    <nav className="flex items-center gap-4">
      <span>Welcome, {currentUser.name}</span>
      <Avatar
        src={currentUser.avatar}
        alt={currentUser.name}
        size="sm"
        status="online"
        ring
      />
    </nav>
  );
}
```

## Accessibility

The Avatar component follows accessibility best practices:

- **Alt Text:** Always provide descriptive alt text for screen readers
- **Semantic HTML:** Uses appropriate elements for images
- **Fallback Content:** Initials provide text alternative when images fail
- **Color Independence:** Status is conveyed through position, not just color

```tsx
// Good: Descriptive alt text
<Avatar
  src="/avatar.jpg"
  alt="John Doe, Senior Developer"
  status="online"
/>

// Better: Include context
<Avatar
  src="/avatar.jpg"
  alt={`${user.name}, ${user.role} - Currently ${user.status}`}
  status={user.status}
/>
```

## Best Practices

1. **Always Provide Alt Text:** Use descriptive alt attributes for accessibility
2. **Use Initials as Fallback:** Provide initials prop for better UX when images fail
3. **Consistent Sizing:** Use consistent sizes within the same context
4. **Appropriate Status:** Only show status when relevant to the UI
5. **Image Optimization:** Use appropriately sized and optimized images
6. **Loading States:** Consider showing a placeholder while images load

## Styling

### Custom Styles

```tsx
<Avatar
  src="/avatar.jpg"
  alt="User"
  className="shadow-xl hover:scale-110 transition-transform"
/>
```

### Custom Size

```tsx
<Avatar
  src="/avatar.jpg"
  alt="User"
  className="w-32 h-32"
  size="lg"
/>
```

## With AvatarGroup

Avatars can be grouped together for displaying multiple users:

```tsx
import { AvatarGroup, Avatar } from '@saha-ui/core';

<AvatarGroup max={3}>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
</AvatarGroup>
```

## Image Loading

Handle image loading states:

```tsx
function AvatarWithLoading({ src, alt, initials }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Avatar
      src={imageError ? '' : src}
      alt={alt}
      initials={initials}
      onLoad={() => setImageLoaded(true)}
      onError={() => setImageError(true)}
    />
  );
}
```

## Related Components

- **AvatarGroup** - Display multiple avatars in a stack
- **Badge** - Add badges to avatars
- **Card** - Combine with cards for user profiles
- **Tooltip** - Show user info on hover

## Changelog

- **v1.0.0** - Initial release with all features