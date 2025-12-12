# TextEditor

A rich text editor component for creating and editing formatted content. Built for blogs, documentation, and content management systems.

## Features

- 📝 Rich text formatting
- 🎨 14 visual variants
- 📏 Multiple sizes
- 🖼️ Image support
- 🔗 Link insertion
- 📋 Copy/paste handling
- ⌨️ Markdown shortcuts
- 💾 Auto-save support

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { TextEditor } from "saha-ui";

function App() {
  const [content, setContent] = useState("");

  return (
    <TextEditor
      value={content}
      onChange={setContent}
      placeholder="Start typing..."
    />
  );
}
```

## Variants

```tsx
<TextEditor variant="default" />
<TextEditor variant="outline" />
<TextEditor variant="ghost" />
<TextEditor variant="minimal" />
<TextEditor variant="glass" />
```

## Sizes

```tsx
<TextEditor size="sm" />
<TextEditor size="md" />
<TextEditor size="lg" />
<TextEditor size="xl" />
```

## With Toolbar

```tsx
<TextEditor
  value={content}
  onChange={setContent}
  toolbar={["bold", "italic", "underline", "link", "image"]}
/>
```

## Custom Toolbar

```tsx
<TextEditor
  value={content}
  onChange={setContent}
  toolbar={[
    "heading",
    "bold",
    "italic",
    "strike",
    "code",
    "|",
    "bulletList",
    "orderedList",
    "|",
    "link",
    "image",
    "blockquote",
    "codeBlock",
  ]}
/>
```

## Read-only Mode

```tsx
<TextEditor value={content} readOnly variant="minimal" />
```

## With Character Count

```tsx
<TextEditor
  value={content}
  onChange={setContent}
  maxLength={500}
  showCharacterCount
/>
```

## Common Patterns

### Blog Post Editor

```tsx
const [content, setContent] = useState("");
const [isSaving, setIsSaving] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    if (content) {
      setIsSaving(true);
      saveDraft(content).finally(() => setIsSaving(false));
    }
  }, 1000);

  return () => clearTimeout(timer);
}, [content]);

<div>
  <TextEditor
    value={content}
    onChange={setContent}
    variant="outline"
    placeholder="Write your blog post..."
    toolbar={[
      "heading",
      "bold",
      "italic",
      "|",
      "bulletList",
      "orderedList",
      "|",
      "link",
      "image",
      "blockquote",
    ]}
  />

  {isSaving && (
    <div className="mt-2 text-sm text-muted-foreground">Saving draft...</div>
  )}
</div>;
```

### Comment Editor

```tsx
const [comment, setComment] = useState("");

<div>
  <TextEditor
    value={comment}
    onChange={setComment}
    size="sm"
    variant="ghost"
    placeholder="Write a comment..."
    toolbar={["bold", "italic", "link"]}
    maxLength={1000}
    showCharacterCount
  />

  <div className="flex justify-end gap-2 mt-2">
    <Button variant="outline" onClick={() => setComment("")}>
      Cancel
    </Button>
    <Button onClick={() => submitComment(comment)}>Post Comment</Button>
  </div>
</div>;
```

### Documentation Editor

```tsx
<TextEditor
  value={documentation}
  onChange={setDocumentation}
  variant="minimal"
  size="lg"
  placeholder="Write documentation..."
  toolbar={[
    "heading",
    "bold",
    "italic",
    "code",
    "|",
    "bulletList",
    "orderedList",
    "taskList",
    "|",
    "link",
    "image",
    "codeBlock",
    "blockquote",
    "|",
    "table",
    "horizontalRule",
  ]}
/>
```

## API Reference

### TextEditor Props

| Prop                 | Type                      | Default     | Description             |
| -------------------- | ------------------------- | ----------- | ----------------------- |
| `value`              | `string`                  | -           | Editor content (HTML)   |
| `onChange`           | `(value: string) => void` | -           | Content change handler  |
| `placeholder`        | `string`                  | -           | Placeholder text        |
| `variant`            | `TextEditorVariant`       | `"default"` | Visual style            |
| `size`               | `TextEditorSize`          | `"md"`      | Size preset             |
| `toolbar`            | `ToolbarItem[]`           | -           | Toolbar items           |
| `readOnly`           | `boolean`                 | `false`     | Read-only mode          |
| `maxLength`          | `number`                  | -           | Maximum character count |
| `showCharacterCount` | `boolean`                 | `false`     | Show character counter  |
| `autoFocus`          | `boolean`                 | `false`     | Auto-focus on mount     |
| `className`          | `string`                  | -           | Additional classes      |

### Toolbar Items

Available toolbar items:

- `heading` - Heading levels
- `bold` - Bold text
- `italic` - Italic text
- `underline` - Underline text
- `strike` - Strikethrough
- `code` - Inline code
- `bulletList` - Bullet list
- `orderedList` - Numbered list
- `taskList` - Task list with checkboxes
- `link` - Insert link
- `image` - Insert image
- `blockquote` - Quote block
- `codeBlock` - Code block
- `table` - Insert table
- `horizontalRule` - Horizontal divider
- `|` - Toolbar separator

## Accessibility

- Keyboard shortcuts for formatting
- ARIA labels for toolbar buttons
- Focus management
- Screen reader support
- Semantic HTML output

## TypeScript

```typescript
import type { TextEditorProps, ToolbarItem } from "saha-ui";
```

## Related Components

- Textarea
- Input
- Form
