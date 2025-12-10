# Quick Reference: Numeric Spacing Support

## All Components with Spacing Props

### ✅ Updated Components (New Numeric Support)

| Component       | Prop      | Tokens                        | Numeric | Custom String | Example        |
| --------------- | --------- | ----------------------------- | ------- | ------------- | -------------- |
| **ToggleGroup** | `spacing` | 0, 1, 2, 3, 4                 | ✓       | ✓             | `spacing={16}` |
| **TagGroup**    | `spacing` | sm, md, lg                    | ✓       | ✓             | `spacing={20}` |
| **Skeleton**    | `spacing` | tight, normal, loose, relaxed | ✓       | ✓             | `spacing={24}` |
| **LabelGroup**  | `spacing` | sm, md, lg                    | ✓       | ✓             | `spacing={32}` |

### ✅ Already Supported Components

| Component       | Prop      | Tokens                        | Numeric | Custom String | Example        |
| --------------- | --------- | ----------------------------- | ------- | ------------- | -------------- |
| **Stack**       | `spacing` | none, xs, sm, md, lg, xl, 2xl | ✓       | ✓             | `spacing={16}` |
| **Grid**        | `gap`     | none, xs, sm, md, lg, xl, 2xl | ✓       | ✓             | `gap={24}`     |
| **Container**   | `padding` | none, sm, default, lg         | ✓       | ✓             | `padding={32}` |
| **Section**     | `padding` | none, sm, default, lg, xl     | ✓       | ✓             | `padding={40}` |
| **Card**        | `padding` | none, sm, md, lg, xl          | ✓       | ✓             | `padding={24}` |
| **Paper**       | `padding` | none, sm, md, lg, xl          | ✓       | ✓             | `padding={32}` |
| **Separator**   | `spacing` | none, xs, sm, md, lg, xl, 2xl | ✓       | ✓             | `spacing={16}` |
| **Masonry**     | `gap`     | none, xs, sm, md, lg, xl, 2xl | ✓       | ✓             | `gap={20}`     |
| **AvatarGroup** | `spacing` | -                             | ✓       | -             | `spacing={-8}` |
| **Item**        | `spacing` | none, sm, md, lg              | ✓       | ✓             | `spacing={12}` |
| **Field**       | `spacing` | none, sm, md, lg, xl          | ✓       | ✓             | `spacing={16}` |
| **Form**        | `spacing` | none, sm, md, lg              | ✓       | ✓             | `spacing={24}` |

## Usage Examples

### Token-Based (Predefined)

```tsx
<Stack spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

### Numeric (Pixels)

```tsx
<Stack spacing={20}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

### Custom String (Units)

```tsx
<Stack spacing="2rem">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

## Common Use Cases

### Precise Design Requirements

```tsx
// Design spec: 28px gap
<Grid gap={28} cols={3}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

### Responsive Scaling with rem

```tsx
// Scales with root font-size
<Paper padding="2rem">
  <h1>Responsive Padding</h1>
  <p>Scales with font-size</p>
</Paper>
```

### Dynamic Values

```tsx
const [spacing, setSpacing] = useState(16);

<Stack spacing={spacing}>
  <Button onClick={() => setSpacing(spacing + 4)}>Increase</Button>
  <Button onClick={() => setSpacing(spacing - 4)}>Decrease</Button>
</Stack>;
```

### Overlapping Avatars

```tsx
// Negative spacing for overlap
<AvatarGroup spacing={-8}>
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
</AvatarGroup>
```

## TypeScript Support

All components have full type safety:

```tsx
// ✅ Valid
<Stack spacing="md" />       // Token
<Stack spacing={16} />        // Number
<Stack spacing="2rem" />      // Custom string

// ❌ Invalid (TypeScript error)
<Stack spacing="invalid" />   // Not a valid token
<Stack spacing={true} />      // Not a number or string
```

## Migration Tips

### Before (Manual wrapper)

```tsx
<div style={{ display: "flex", gap: "28px" }}>
  <Button>A</Button>
  <Button>B</Button>
</div>
```

### After (Direct prop)

```tsx
<Stack direction="horizontal" spacing={28}>
  <Button>A</Button>
  <Button>B</Button>
</Stack>
```

## Performance

- Token-based spacing uses CSS classes (optimal)
- Numeric/custom spacing uses inline styles (minimal overhead)
- No runtime penalties for type checking
- All checks happen at render time

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- CSS custom properties for dynamic values
- Fallback to static values in older browsers

## See Also

- Full documentation: `NUMERIC_SPACING_UPDATE.md`
- Complete examples: `src/examples/NumericSpacingExample.tsx`
- Component docs: Individual component README files
