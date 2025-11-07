# AvatarGroup

A component for displaying multiple avatars in a compact, visually appealing layout. Supports stacking, grid layouts, overflow indicators, and smart avatar management.

## Features

- 📚 **Multiple Layouts** - Stack, row, grid, and dense grid variants
- 🎯 **Smart Overflow** - "+X more" indicator for excess avatars
- 🎨 **Flexible Sizing** - 6 size options from xs to 2xl
- 💍 **Ring Decoration** - Optional ring borders for emphasis
- 🔢 **Count Display** - Show total member count
- ↔️ **Reversible** - Display avatars in reverse order
- ♿ **Accessible** - Full keyboard navigation support
- ✨ **Hover Effects** - Smooth animations and transitions

## Installation

```tsx
import { AvatarGroup, Avatar } from '@saha-ui/core';
```

## Basic Usage

### Simple Stack

```tsx
<AvatarGroup max={3} size="md">
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
  <Avatar src="/user5.jpg" alt="User 5" />
</AvatarGroup>
```

### With Fallbacks

```tsx
<AvatarGroup max={4}>
  <Avatar src="/alice.jpg" alt="Alice" fallback="A" />
  <Avatar src="/bob.jpg" alt="Bob" fallback="B" />
  <Avatar src="/charlie.jpg" alt="Charlie" fallback="C" />
  <Avatar src="/diana.jpg" alt="Diana" fallback="D" />
  <Avatar src="/eve.jpg" alt="Eve" fallback="E" />
</AvatarGroup>
```

## Variants

### Stack Layout (Default)

```tsx
// Overlapping avatars with depth effect
<AvatarGroup variant="stack" max={4}>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
  <Avatar src="/user5.jpg" alt="User 5" />
</AvatarGroup>
```

### Row Layout

```tsx
// Horizontal arrangement with overlap
<AvatarGroup variant="row" max={5}>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
</AvatarGroup>
```

### Grid Layout

```tsx
// Grid arrangement with hover effects
<AvatarGroup variant="grid" max={6}>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
</AvatarGroup>
```

### Dense Grid Layout

```tsx
// Compact grid for more avatars
<AvatarGroup variant="grid-dense" max={9}>
  {users.map(user => (
    <Avatar key={user.id} src={user.avatar} alt={user.name} />
  ))}
</AvatarGroup>
```

## Sizes

```tsx
// Extra small
<AvatarGroup size="xs" max={3}>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
</AvatarGroup>

// Small
<AvatarGroup size="sm" max={3}>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
</AvatarGroup>

// Medium (default)
<AvatarGroup size="md" max={3}>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
</AvatarGroup>

// Large
<AvatarGroup size="lg" max={3}>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
</AvatarGroup>

// Extra large
<AvatarGroup size="xl" max={3}>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
</AvatarGroup>

// 2X large
<AvatarGroup size="2xl" max={3}>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
</AvatarGroup>
```

## Display Options

### Show Member Count

```tsx
<AvatarGroup max={4} showCount>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
  <Avatar src="/user5.jpg" alt="User 5" />
</AvatarGroup>
// Displays: [avatars] "5 members"
```

### Reverse Order

```tsx
// Display avatars in reverse (right to left)
<AvatarGroup max={4} reverse>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
</AvatarGroup>
```

### With Ring Border

```tsx
// Add ring borders for emphasis
<AvatarGroup withRing variant="stack">
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
</AvatarGroup>
```

### With Gap

```tsx
// Add spacing between avatars (no overlap)
<AvatarGroup gap variant="stack">
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
</AvatarGroup>
```

### Custom Spacing

```tsx
// Custom overlap amount in pixels
<AvatarGroup spacing={8} variant="stack">
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
</AvatarGroup>
```

## Overflow Handling

### Click Handler for More

```tsx
<AvatarGroup 
  max={3} 
  onMoreClick={() => console.log('Show all users')}
>
  <Avatar src="/user1.jpg" alt="User 1" />
  <Avatar src="/user2.jpg" alt="User 2" />
  <Avatar src="/user3.jpg" alt="User 3" />
  <Avatar src="/user4.jpg" alt="User 4" />
  <Avatar src="/user5.jpg" alt="User 5" />
</AvatarGroup>
// Shows "+2" button that triggers onMoreClick
```

### Open Modal on More Click

```tsx
const [showAll, setShowAll] = useState(false);

<>
  <AvatarGroup 
    max={4} 
    onMoreClick={() => setShowAll(true)}
  >
    {users.map(user => (
      <Avatar key={user.id} src={user.avatar} alt={user.name} />
    ))}
  </AvatarGroup>

  <Dialog open={showAll} onClose={() => setShowAll(false)}>
    <DialogContent>
      <h2>All Members ({users.length})</h2>
      <div className="grid grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="flex flex-col items-center">
            <Avatar src={user.avatar} alt={user.name} size="lg" />
            <p className="mt-2 text-sm">{user.name}</p>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
</>
```

## Advanced Examples

### Team Members Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Team Members</CardTitle>
  </CardHeader>
  <CardContent>
    <AvatarGroup max={5} showCount size="lg" withRing>
      {team.members.map(member => (
        <Avatar
          key={member.id}
          src={member.avatar}
          alt={member.name}
          fallback={member.initials}
        />
      ))}
    </AvatarGroup>
  </CardContent>
</Card>
```

### Project Collaborators

```tsx
<div className="flex items-center justify-between">
  <div>
    <h3 className="font-semibold">Project Alpha</h3>
    <p className="text-sm text-muted-foreground">Updated 2 hours ago</p>
  </div>
  <AvatarGroup 
    max={3} 
    size="sm" 
    variant="stack"
    onMoreClick={handleViewCollaborators}
  >
    {collaborators.map(user => (
      <Avatar
        key={user.id}
        src={user.avatar}
        alt={user.name}
        fallback={user.name[0]}
      />
    ))}
  </AvatarGroup>
</div>
```

### Chat Participants

```tsx
<div className="flex items-center gap-3">
  <AvatarGroup max={4} size="sm" variant="stack">
    {participants.map(user => (
      <Avatar
        key={user.id}
        src={user.avatar}
        alt={user.name}
        status={user.online ? 'online' : 'offline'}
      />
    ))}
  </AvatarGroup>
  <span className="text-sm text-muted-foreground">
    {participants.length} participants
  </span>
</div>
```

### Grid Gallery

```tsx
<AvatarGroup 
  variant="grid" 
  max={12} 
  size="xl"
  onMoreClick={handleViewAll}
>
  {users.map(user => (
    <Avatar
      key={user.id}
      src={user.avatar}
      alt={user.name}
      fallback={user.name[0]}
      className="cursor-pointer hover:ring-2 hover:ring-primary"
      onClick={() => handleUserClick(user)}
    />
  ))}
</AvatarGroup>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `max` | `number` | - | Maximum avatars to display before showing "+X" |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Size of avatars |
| `variant` | `"stack" \| "row" \| "grid" \| "grid-dense"` | `"stack"` | Layout variant |
| `showCount` | `boolean` | `false` | Show total member count |
| `reverse` | `boolean` | `false` | Reverse avatar order |
| `gap` | `boolean` | `false` | Add spacing between avatars |
| `withRing` | `boolean` | `false` | Add ring border to avatars |
| `spacing` | `number` | - | Custom spacing in pixels (overrides default) |
| `onMoreClick` | `() => void` | - | Callback when "+X" indicator clicked |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | **required** | Avatar components |

## Accessibility

The component follows accessibility best practices:

- Proper semantic HTML structure
- Avatar children maintain their accessibility features
- "+X more" indicator supports keyboard navigation (Tab, Enter, Space)
- Screen reader friendly with proper ARIA attributes
- Focus visible indicators for keyboard users
- Touch-friendly click targets

## Best Practices

1. **Limit Display** - Use `max` prop to avoid overcrowding (3-5 for stack, 6-9 for grid)
2. **Provide Fallbacks** - Always include `alt` text and `fallback` initials
3. **Consistent Sizing** - Keep avatar sizes consistent within a group
4. **Loading States** - Handle loading states in parent component
5. **Tooltips** - Consider adding tooltips with names on hover
6. **Performance** - Use virtualization for very large lists
7. **Responsive** - Adjust `max` and `size` based on screen size

## Responsive Design

```tsx
// Adjust max and size based on screen
<AvatarGroup 
  max={window.innerWidth < 768 ? 3 : 5}
  size={window.innerWidth < 768 ? 'sm' : 'md'}
  variant="stack"
>
  {users.map(user => (
    <Avatar key={user.id} src={user.avatar} alt={user.name} />
  ))}
</AvatarGroup>

// Using Tailwind classes
<div className="w-full">
  <AvatarGroup 
    max={3}
    size="md"
    className="md:max-w-md lg:max-w-lg"
  >
    {users.map(user => (
      <Avatar key={user.id} src={user.avatar} alt={user.name} />
    ))}
  </AvatarGroup>
</div>
```

## Styling

The component uses CVA for variant styling and supports customization:

```tsx
// Custom container styles
<AvatarGroup
  className="bg-muted p-2 rounded-lg"
  variant="stack"
>
  {users.map(user => (
    <Avatar key={user.id} src={user.avatar} alt={user.name} />
  ))}
</AvatarGroup>

// Custom avatar styles via children
<AvatarGroup max={4}>
  {users.map(user => (
    <Avatar
      key={user.id}
      src={user.avatar}
      alt={user.name}
      className="ring-2 ring-primary"
    />
  ))}
</AvatarGroup>
```

## Integration Examples

### With User Data

```tsx
interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

function TeamMembers({ users }: { users: User[] }) {
  return (
    <AvatarGroup max={5} showCount size="md">
      {users.map(user => (
        <Avatar
          key={user.id}
          src={user.avatar}
          alt={`${user.name} (${user.role})`}
          fallback={user.name.split(' ').map(n => n[0]).join('')}
        />
      ))}
    </AvatarGroup>
  );
}
```

### With Loading State

```tsx
function CollaboratorsList({ projectId }: { projectId: string }) {
  const { data: users, isLoading } = useQuery(['collaborators', projectId]);

  if (isLoading) {
    return (
      <AvatarGroup max={4}>
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </AvatarGroup>
    );
  }

  return (
    <AvatarGroup max={4} onMoreClick={() => navigate('/collaborators')}>
      {users?.map(user => (
        <Avatar key={user.id} src={user.avatar} alt={user.name} />
      ))}
    </AvatarGroup>
  );
}
```

## Browser Support

Works in all modern browsers that support:
- CSS Grid and Flexbox
- CSS Custom Properties
- CSS Transforms
- Modern JavaScript (ES6+)

## Related Components

- **Avatar** - Individual avatar component
- **Badge** - For status indicators
- **Card** - Container for avatar groups
- **Tooltip** - Show user info on hover