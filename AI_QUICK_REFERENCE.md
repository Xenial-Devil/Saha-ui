# Saha UI - AI Quick Reference Guide

> **Purpose**: Fast lookup for AI assistants. For detailed docs, see `ComponentAi list.txt`

## 🎯 What is Saha UI?

Saha UI is a comprehensive React component library built with:

- **React** + **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** primitives for accessibility
- **CVA** (class-variance-authority) for variant management

## 📚 Quick Component Index

### Layout Components

| Component   | Purpose            | Key Props                                      |
| ----------- | ------------------ | ---------------------------------------------- |
| `Container` | Page-width wrapper | `size`, `padding`, `gutter`, `center`          |
| `Grid`      | CSS Grid layout    | `cols`, `responsive`, `gap`, `autoFit`         |
| `GridItem`  | Grid cell          | `colSpan`, `rowSpan`, `responsive`             |
| `Stack`     | Flex column/row    | `direction`, `spacing`, `align`, `justify`     |
| `Section`   | Page section       | `variant`, `padding`, `fullHeight`             |
| `Paper`     | Surface/card base  | `elevation`, `variant`, `padding`, `hoverable` |
| `Masonry`   | Pinterest-style    | `columns`, `gap`, `mode`                       |

### Form Components

| Component  | Purpose         | Key Props                                      |
| ---------- | --------------- | ---------------------------------------------- |
| `Input`    | Text input      | `type`, `size`, `variant`, `error`, `leftIcon` |
| `Textarea` | Multi-line text | `rows`, `resize`, `autoResize`                 |
| `Select`   | Dropdown        | `options`, `multiple`, `searchable`            |
| `Checkbox` | Checkbox        | `checked`, `indeterminate`, `size`             |
| `Radio`    | Radio button    | `value`, `name`, `size`                        |
| `Switch`   | Toggle          | `checked`, `size`, `variant`                   |
| `Slider`   | Range slider    | `min`, `max`, `step`, `value`                  |
| `Form`     | Form wrapper    | `onSubmit`, `validation`, `schema`             |

### Button Components

| Component      | Purpose        | Key Props                                |
| -------------- | -------------- | ---------------------------------------- |
| `Button`       | Primary button | `variant`, `size`, `loading`, `leftIcon` |
| `IconButton`   | Icon-only      | `icon`, `size`, `variant`, `aria-label`  |
| `ButtonGroup`  | Button cluster | `variant`, `size`, `orientation`         |
| `ToggleButton` | Toggle state   | `pressed`, `variant`, `size`             |

### Feedback Components

| Component  | Purpose             | Key Props                                     |
| ---------- | ------------------- | --------------------------------------------- |
| `Alert`    | Info banner         | `variant`, `title`, `closable`, `icon`        |
| `Badge`    | Status label        | `variant`, `size`, `dot`, `max`               |
| `Progress` | Progress bar        | `value`, `max`, `variant`, `size`             |
| `Spinner`  | Loading             | `size`, `variant`, `speed`                    |
| `Skeleton` | Loading placeholder | `variant`, `width`, `height`                  |
| `Toast`    | Notification        | `variant`, `title`, `description`, `duration` |

### Overlay Components

| Component     | Purpose          | Key Props                                 |
| ------------- | ---------------- | ----------------------------------------- |
| `Dialog`      | Modal dialog     | `open`, `onOpenChange`, `size`, `variant` |
| `Drawer`      | Side panel       | `side`, `open`, `onOpenChange`, `size`    |
| `Modal`       | Generic modal    | `open`, `onClose`, `backdrop`             |
| `Popover`     | Floating content | `trigger`, `placement`, `offset`          |
| `Tooltip`     | Hover info       | `content`, `placement`, `delay`           |
| `ContextMenu` | Right-click menu | `trigger`, `items`                        |

### Data Display

| Component   | Purpose        | Key Props                                  |
| ----------- | -------------- | ------------------------------------------ |
| `Table`     | Data table     | `data`, `columns`, `striped`, `hoverable`  |
| `DataTable` | Advanced table | `columns`, `data`, `sorting`, `filtering`  |
| `Card`      | Content card   | `variant`, `padding`, `hoverable`, `image` |
| `Avatar`    | User avatar    | `src`, `alt`, `size`, `fallback`           |
| `Chip`      | Small label    | `variant`, `size`, `deletable`, `onClick`  |
| `Accordion` | Collapsible    | `items`, `type`, `collapsible`             |

### Navigation

| Component    | Purpose        | Key Props                                   |
| ------------ | -------------- | ------------------------------------------- |
| `Tabs`       | Tab interface  | `items`, `defaultValue`, `variant`          |
| `Breadcrumb` | Path nav       | `items`, `separator`, `maxItems`            |
| `Pagination` | Page nav       | `total`, `page`, `pageSize`, `onPageChange` |
| `Stepper`    | Step indicator | `steps`, `activeStep`, `orientation`        |

### Media

| Component     | Purpose         | Key Props                                   |
| ------------- | --------------- | ------------------------------------------- |
| `Image`       | Optimized image | `src`, `alt`, `width`, `height`, `fallback` |
| `AspectRatio` | Ratio wrapper   | `ratio`, `children`                         |
| `Carousel`    | Image slider    | `items`, `autoplay`, `interval`, `loop`     |

### Advanced Components

| Component    | Purpose            | Key Props                                  |
| ------------ | ------------------ | ------------------------------------------ |
| `Calendar`   | Date picker        | `value`, `onChange`, `mode`, `range`       |
| `Chart`      | Data visualization | `type`, `data`, `config`                   |
| `CodeEditor` | Code input         | `language`, `value`, `theme`, `onChange`   |
| `Command`    | Command palette    | `items`, `onSelect`, `placeholder`         |
| `Combobox`   | Searchable select  | `items`, `value`, `onSelect`, `searchable` |
| `DatePicker` | Date input         | `value`, `onChange`, `format`, `range`     |

## 🔑 Universal Patterns

### 1. asChild Pattern

Most components support `asChild={true}` to merge styles into a child element:

```tsx
<Button asChild>
  <a href="/link">Link styled as button</a>
</Button>
```

### 2. Variant System

Components use CVA for consistent variants:

- `variant`: Visual style (default, primary, secondary, outline, ghost, etc.)
- `size`: Size preset (xs, sm, md, lg, xl)
- `colorScheme`: Color theme (blue, red, green, etc.)

### 3. Accessibility

All components include:

- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support

### 4. TypeScript

Full type safety with exported interfaces:

```tsx
import type { ButtonProps } from "@/components/ui/Button";
```

## 📝 Common Props Across Components

| Prop         | Type      | Description                 |
| ------------ | --------- | --------------------------- |
| `className`  | string    | Additional Tailwind classes |
| `asChild`    | boolean   | Use Slot pattern            |
| `children`   | ReactNode | Child elements              |
| `disabled`   | boolean   | Disable interaction         |
| `onClick`    | function  | Click handler               |
| `aria-label` | string    | Accessibility label         |
| `data-*`     | any       | Custom data attributes      |

## 🎨 Theming

Saha UI uses Tailwind CSS with custom design tokens:

- Colors: Primary, secondary, accent, background, text
- Spacing: Consistent scale (xs, sm, md, lg, xl, 2xl)
- Typography: Font sizes, weights, line heights
- Shadows: Elevation system (0-6)
- Radii: Border radius presets

## 🚀 Quick Start Examples

### Basic Layout

```tsx
<Container size="lg">
  <Grid cols={3} gap="lg" responsive={{ sm: 1, md: 2 }}>
    <Card>Content 1</Card>
    <Card>Content 2</Card>
    <Card>Content 3</Card>
  </Grid>
</Container>
```

### Form Example

```tsx
<Form onSubmit={handleSubmit}>
  <Input label="Name" required />
  <Textarea label="Description" />
  <Select label="Category" options={categories} />
  <Button type="submit">Submit</Button>
</Form>
```

### Dialog Example

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Title</DialogTitle>
    <DialogDescription>Description</DialogDescription>
    <DialogFooter>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## 💡 Tips for AI Assistants

1. **Component Selection**: Choose the right component for the use case

   - Use `Container` for page-level layouts
   - Use `Grid` for responsive layouts
   - Use `Stack` for simple flex layouts
   - Use `Card` for content grouping

2. **Responsive Design**: Use `responsive` props for breakpoint-specific values

   ```tsx
   <Grid cols={1} responsive={{ md: 2, lg: 3 }}>
   ```

3. **Composition**: Combine components for complex UIs

   ```tsx
   <Container>
     <Paper elevation={2}>
       <Stack spacing="md">
         <Heading>Title</Heading>
         <Text>Content</Text>
         <Button>Action</Button>
       </Stack>
     </Paper>
   </Container>
   ```

4. **Accessibility**: Always include proper labels and ARIA attributes

   ```tsx
   <IconButton icon={<SearchIcon />} aria-label="Search" />
   ```

5. **Type Safety**: Use TypeScript interfaces for props
   ```tsx
   const props: ButtonProps = { variant: "primary", size: "lg" };
   ```

## 📖 Where to Find More Info

- **Full Details**: See `ComponentAi list.txt` for comprehensive docs
- **Examples**: Check component source files in `src/components/`
- **Markdown Docs**: Browse `markdown/` folder for guides
- **Changelog**: See `CHANGELOG.md` for updates

## 🔍 Search Tips

When searching for components:

1. Identify the category (layout, form, feedback, etc.)
2. Look for similar naming patterns (Input, Textarea, Select)
3. Check related components section
4. Use the component index above

## ⚡ Performance Tips

- Use `asChild` to avoid unnecessary wrapper divs
- Leverage `lazy` loading for heavy components
- Use `memo` for expensive renders
- Prefer composition over prop drilling
