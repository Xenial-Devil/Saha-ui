# TagInput

A fully accessible tag input component for managing multiple tags with keyboard support and validation. Implements proper ARIA attributes for enhanced screen reader support.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 🏷️ **Tag Management** - Add, remove, and edit tags easily
- ⌨️ **Keyboard Support** - Full keyboard navigation (Enter, Backspace, Arrow keys)
- 💫 **Validation** - Built-in validation and duplicate detection
- 🌗 **Dark Mode** - Automatic dark mode support
- 🎯 **Autocomplete** - Optional tag suggestions
- 🔢 **Max Tags** - Limit number of tags
- 🎭 **Custom Rendering** - Custom tag appearance
- 📋 **Copy/Paste** - Paste multiple tags at once

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { TagInput } from "saha-ui";

function App() {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <TagInput
      label="Tags"
      placeholder="Add tags..."
      value={tags}
      onChange={setTags}
    />
  );
}
```

## Examples

### Variants

```tsx
<TagInput label="Default" variant="default" />
<TagInput label="Primary" variant="primary" />
<TagInput label="Secondary" variant="secondary" />
<TagInput label="Accent" variant="accent" />
<TagInput label="Success" variant="success" />
<TagInput label="Warning" variant="warning" />
<TagInput label="Error" variant="error" />
```

### Sizes

```tsx
<TagInput label="Small" size="sm" value={tags} onChange={setTags} />
<TagInput label="Medium" size="md" value={tags} onChange={setTags} />
<TagInput label="Large" size="lg" value={tags} onChange={setTags} />
```

### With Suggestions

Provide autocomplete suggestions:

```tsx
const suggestions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Python",
  "Java",
];

<TagInput
  label="Skills"
  placeholder="Add skills..."
  value={skills}
  onChange={setSkills}
  suggestions={suggestions}
  helperText="Start typing to see suggestions"
/>;
```

### Max Tags Limit

```tsx
<TagInput
  label="Tags"
  placeholder="Add up to 5 tags"
  value={tags}
  onChange={setTags}
  maxTags={5}
  helperText={`${tags.length}/5 tags`}
/>
```

### Prevent Duplicates

```tsx
<TagInput
  label="Unique tags"
  placeholder="Add unique tags..."
  value={tags}
  onChange={setTags}
  allowDuplicates={false}
  helperText="Duplicate tags will be ignored"
/>
```

### Custom Separator

Use custom separators to split pasted text:

```tsx
<TagInput
  label="Tags"
  placeholder="Add tags (comma or space separated)"
  value={tags}
  onChange={setTags}
  separators={[",", " ", ";"]}
  helperText="Paste multiple tags separated by comma, space, or semicolon"
/>
```

### With Validation

Validate tags before adding:

```tsx
function ValidatedTagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");

  const validateTag = (tag: string): boolean => {
    if (tag.length < 2) {
      setError("Tag must be at least 2 characters");
      return false;
    }
    if (tag.length > 20) {
      setError("Tag must be less than 20 characters");
      return false;
    }
    if (!/^[a-zA-Z0-9-]+$/.test(tag)) {
      setError("Tag can only contain letters, numbers, and hyphens");
      return false;
    }
    setError("");
    return true;
  };

  const handleAdd = (newTags: string[]) => {
    const validTags = newTags.filter(validateTag);
    setTags([...tags, ...validTags]);
  };

  return (
    <TagInput
      label="Tags"
      value={tags}
      onChange={handleAdd}
      onValidate={validateTag}
      error={error}
    />
  );
}
```

### Custom Tag Rendering

Customize tag appearance:

```tsx
<TagInput
  label="Tags"
  value={tags}
  onChange={setTags}
  renderTag={(tag, onRemove) => (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      {tag}
      <button
        onClick={onRemove}
        className="hover:bg-white/20 rounded-full p-0.5"
      >
        ×
      </button>
    </span>
  )}
/>
```

### With Icons

```tsx
import { Tag as TagIcon } from "lucide-react";

<TagInput
  label="Tags"
  placeholder="Add tags..."
  value={tags}
  onChange={setTags}
  leftIcon={<TagIcon className="w-4 h-4" />}
/>;
```

### Clearable

```tsx
<TagInput
  label="Tags"
  value={tags}
  onChange={setTags}
  clearable
  clearButtonLabel="Clear all tags"
/>
```

### Disabled State

```tsx
<TagInput
  label="Disabled tags"
  value={["tag1", "tag2", "tag3"]}
  disabled
  helperText="This field is currently disabled"
/>
```

### Read-only State

```tsx
<TagInput
  label="Read-only tags"
  value={["react", "typescript", "tailwind"]}
  readOnly
  helperText="These tags cannot be modified"
/>
```

### Email Tags

```tsx
function EmailTagInput() {
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setError("Invalid email address");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <TagInput
      label="Email recipients"
      placeholder="Add email addresses..."
      value={emails}
      onChange={setEmails}
      onValidate={validateEmail}
      error={error}
      separators={[",", ";", " "]}
      helperText="Separate multiple emails with comma, semicolon, or space"
    />
  );
}
```

### Hashtag Input

```tsx
function HashtagInput() {
  const [hashtags, setHashtags] = useState<string[]>([]);

  const formatHashtag = (tag: string): string => {
    // Ensure hashtag starts with #
    const formatted = tag.startsWith("#") ? tag : `#${tag}`;
    // Remove spaces and special characters
    return formatted.replace(/[^#a-zA-Z0-9_]/g, "");
  };

  return (
    <TagInput
      label="Hashtags"
      placeholder="Add hashtags..."
      value={hashtags}
      onChange={setHashtags}
      onBeforeAdd={formatHashtag}
      helperText="Hashtags will be automatically formatted"
    />
  );
}
```

### Category Tags

```tsx
const categoryColors = {
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  important:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  normal: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

<TagInput
  label="Categories"
  value={categories}
  onChange={setCategories}
  suggestions={Object.keys(categoryColors)}
  renderTag={(tag, onRemove) => (
    <span
      className={`px-2 py-1 rounded ${categoryColors[tag] || "bg-gray-100"}`}
    >
      {tag}
      <button onClick={onRemove}>×</button>
    </span>
  )}
/>;
```

### With Character Counter

```tsx
function TagInputWithCounter() {
  const [tags, setTags] = useState<string[]>([]);
  const maxLength = 15;

  return (
    <TagInput
      label="Tags"
      placeholder="Add tags..."
      value={tags}
      onChange={setTags}
      maxLength={maxLength}
      helperText={`Maximum ${maxLength} characters per tag`}
    />
  );
}
```

### Async Validation

```tsx
function AsyncValidatedTagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState("");

  const checkTagAvailability = async (tag: string): Promise<boolean> => {
    setValidating(true);
    try {
      const available = await api.checkTag(tag);
      if (!available) {
        setError(`Tag "${tag}" is already taken`);
        return false;
      }
      setError("");
      return true;
    } finally {
      setValidating(false);
    }
  };

  return (
    <TagInput
      label="Unique tags"
      value={tags}
      onChange={setTags}
      onValidateAsync={checkTagAvailability}
      loading={validating}
      error={error}
    />
  );
}
```

### URL Tags

```tsx
function URLTagInput() {
  const [urls, setUrls] = useState<string[]>([]);

  const validateURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <TagInput
      label="URLs"
      placeholder="Add URLs..."
      value={urls}
      onChange={setUrls}
      onValidate={validateURL}
      error={!urls.every(validateURL) ? "Invalid URL format" : undefined}
      helperText="Enter valid URLs (e.g., https://example.com)"
    />
  );
}
```

## Accessibility

### Keyboard Navigation

- **Enter**: Add tag from current input
- **Backspace**: Remove last tag (when input is empty)
- **Arrow Left**: Focus previous tag
- **Arrow Right**: Focus next tag
- **Delete**: Remove focused tag
- **Escape**: Clear input / Deselect tag
- **Tab**: Move focus away
- **Ctrl/Cmd + A**: Select all tags

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated IDs and ARIA attributes
<TagInput
  label="Tags"
  description="Add relevant tags"
  helperText="Press Enter to add a tag"
  error={error}
/>
// Automatically creates:
// - role="group" for tag container
// - role="button" for each tag with aria-label
// - aria-labelledby links to label
// - aria-describedby links to description and helperText
// - aria-invalid when error is present
// - Live region announces tag additions/removals
```

### Manual ARIA Labels

For tag inputs without visible labels:

```tsx
<TagInput
  aria-label="Add tags"
  placeholder="Tags..."
  value={tags}
  onChange={setTags}
/>
```

### Tag Announcements

Tags are announced when added or removed:

```tsx
<TagInput
  label="Tags"
  value={tags}
  onChange={setTags}
  announceAddition={(tag) => `Added tag: ${tag}`}
  announceRemoval={(tag) => `Removed tag: ${tag}`}
/>
```

### Required Fields

```tsx
<TagInput
  label="Required tags"
  required
  aria-required="true"
  error={
    tags.length === 0 && submitted ? "At least one tag is required" : undefined
  }
/>
```

### Error Announcements

Errors are automatically announced to screen readers:

```tsx
<TagInput label="Tags" error="Invalid tag format" aria-invalid="true" />
// Error has role="alert" and aria-live="polite"
```

## API Reference

### TagInput Props

| Prop               | Type                                                                                     | Default          | Description                              |
| ------------------ | ---------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------- |
| `label`            | `string`                                                                                 | -                | Label text for the input                 |
| `description`      | `string`                                                                                 | -                | Description text shown below the label   |
| `placeholder`      | `string`                                                                                 | -                | Placeholder text                         |
| `helperText`       | `string`                                                                                 | -                | Helper text shown below the input        |
| `error`            | `string`                                                                                 | -                | Error message to display                 |
| `value`            | `string[]`                                                                               | `[]`             | Array of tags (controlled)               |
| `defaultValue`     | `string[]`                                                                               | `[]`             | Default tags (uncontrolled)              |
| `onChange`         | `(tags: string[]) => void`                                                               | -                | Callback when tags change                |
| `onAdd`            | `(tag: string) => void`                                                                  | -                | Callback when tag is added               |
| `onRemove`         | `(tag: string) => void`                                                                  | -                | Callback when tag is removed             |
| `onBlur`           | `(e: FocusEvent) => void`                                                                | -                | Blur event handler                       |
| `onFocus`          | `(e: FocusEvent) => void`                                                                | -                | Focus event handler                      |
| `variant`          | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'default'`      | Color variant                            |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                                   | `'md'`           | Size of the input                        |
| `suggestions`      | `string[]`                                                                               | -                | Autocomplete suggestions                 |
| `maxTags`          | `number`                                                                                 | -                | Maximum number of tags                   |
| `maxLength`        | `number`                                                                                 | -                | Maximum length per tag                   |
| `allowDuplicates`  | `boolean`                                                                                | `true`           | Allow duplicate tags                     |
| `separators`       | `string[]`                                                                               | `[',', 'Enter']` | Characters that separate tags            |
| `trimWhitespace`   | `boolean`                                                                                | `true`           | Trim whitespace from tags                |
| `caseSensitive`    | `boolean`                                                                                | `true`           | Case-sensitive duplicate detection       |
| `clearable`        | `boolean`                                                                                | `false`          | Show clear all button                    |
| `disabled`         | `boolean`                                                                                | `false`          | Whether the input is disabled            |
| `readOnly`         | `boolean`                                                                                | `false`          | Whether the input is read-only           |
| `loading`          | `boolean`                                                                                | `false`          | Show loading state                       |
| `required`         | `boolean`                                                                                | `false`          | Whether tags are required                |
| `autoFocus`        | `boolean`                                                                                | `false`          | Auto-focus on mount                      |
| `leftIcon`         | `ReactNode`                                                                              | -                | Icon on the left side                    |
| `rightIcon`        | `ReactNode`                                                                              | -                | Icon on the right side                   |
| `onValidate`       | `(tag: string) => boolean`                                                               | -                | Validate tag before adding               |
| `onValidateAsync`  | `(tag: string) => Promise<boolean>`                                                      | -                | Async validation                         |
| `onBeforeAdd`      | `(tag: string) => string`                                                                | -                | Transform tag before adding              |
| `renderTag`        | `(tag: string, onRemove: () => void) => ReactNode`                                       | -                | Custom tag renderer                      |
| `tagVariant`       | `'default' \| 'primary' \| 'secondary' \| 'accent'`                                      | -                | Variant for tags                         |
| `announceAddition` | `(tag: string) => string`                                                                | -                | Custom addition announcement             |
| `announceRemoval`  | `(tag: string) => string`                                                                | -                | Custom removal announcement              |
| `className`        | `string`                                                                                 | -                | Additional CSS classes                   |
| `aria-label`       | `string`                                                                                 | -                | Accessible label for screen readers      |
| `aria-labelledby`  | `string`                                                                                 | -                | ID of element that labels this input     |
| `aria-describedby` | `string`                                                                                 | -                | IDs of elements that describe this input |

## Best Practices

### 1. Always Provide Labels

For accessibility, always provide a clear label:

```tsx
// Good ✅
<TagInput label="Tags" />
<TagInput aria-label="Add tags" />

// Bad ❌
<TagInput placeholder="Tags" />
```

### 2. Limit Number of Tags

Prevent overwhelming users:

```tsx
<TagInput label="Tags" maxTags={10} helperText={`${tags.length}/10 tags`} />
```

### 3. Validate Input

Ensure tag quality:

```tsx
<TagInput
  onValidate={(tag) => {
    return tag.length >= 2 && tag.length <= 20;
  }}
  error={validationError}
/>
```

### 4. Provide Suggestions

Help users with common tags:

```tsx
<TagInput
  label="Skills"
  suggestions={commonSkills}
  helperText="Start typing to see suggestions"
/>
```

### 5. Handle Duplicates

Decide on duplicate behavior:

```tsx
// Allow duplicates
<TagInput allowDuplicates={true} />

// Prevent duplicates (recommended)
<TagInput allowDuplicates={false} />
```

### 6. Use Clear Separators

Support multiple input methods:

```tsx
<TagInput
  separators={[",", ";", " ", "Enter"]}
  helperText="Separate tags with comma, semicolon, or space"
/>
```

### 7. Provide Helper Text

Guide users on usage:

```tsx
<TagInput
  label="Tags"
  helperText="Press Enter to add a tag, Backspace to remove"
/>
```

### 8. Format Tags Consistently

```tsx
<TagInput
  onBeforeAdd={(tag) => tag.toLowerCase().trim()}
  helperText="Tags will be converted to lowercase"
/>
```

### 9. Show Character Limits

```tsx
<TagInput maxLength={20} helperText="Maximum 20 characters per tag" />
```

### 10. Handle Empty States

```tsx
<TagInput
  label="Tags"
  helperText={tags.length === 0 ? "Add at least one tag" : undefined}
  error={submitted && tags.length === 0 ? "Required" : undefined}
/>
```

## Form Integration

### With React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";

function Form() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="tags"
        control={control}
        rules={{
          required: "At least one tag is required",
          validate: (value) => {
            if (value.length < 2) {
              return "Add at least 2 tags";
            }
            return true;
          },
        }}
        render={({ field, fieldState }) => (
          <TagInput
            label="Tags"
            value={field.value || []}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            aria-invalid={!!fieldState.error}
          />
        )}
      />
    </form>
  );
}
```

### With Formik

```tsx
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  tags: Yup.array()
    .of(Yup.string())
    .min(1, "Add at least one tag")
    .max(10, "Maximum 10 tags"),
});

function Form() {
  return (
    <Formik
      initialValues={{ tags: [] }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <TagInput
          label="Tags"
          value={values.tags}
          onChange={(tags) => setFieldValue("tags", tags)}
          error={touched.tags ? errors.tags : undefined}
        />
      )}
    </Formik>
  );
}
```

## Advanced Examples

### Blog Post Tags

```tsx
function BlogTagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async (query: string) => {
    const results = await api.searchTags(query);
    setSuggestions(results);
  };

  return (
    <TagInput
      label="Post tags"
      placeholder="Add relevant tags..."
      value={tags}
      onChange={setTags}
      suggestions={suggestions}
      onInputChange={useDebouncedCallback(fetchSuggestions, 300)}
      maxTags={5}
      allowDuplicates={false}
      helperText="Add up to 5 tags to help readers find your post"
    />
  );
}
```

### Collaborative Tag Editor

```tsx
function CollaborativeTagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [userColors] = useState(new Map());

  const renderTag = (tag: string, onRemove: () => void) => {
    const user = getTagOwner(tag);
    const color = userColors.get(user) || "gray";

    return (
      <span
        className={`px-2 py-1 rounded bg-${color}-100 text-${color}-800`}
        title={`Added by ${user}`}
      >
        {tag}
        {canRemove(user) && <button onClick={onRemove}>×</button>}
      </span>
    );
  };

  return (
    <TagInput
      label="Shared tags"
      value={tags}
      onChange={setTags}
      renderTag={renderTag}
    />
  );
}
```

### Smart Tag Suggestions

```tsx
function SmartTagInput() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Analyze content and suggest relevant tags
    const analyzedTags = analyzeContent(content);
    setSuggestions(analyzedTags);
  }, [content]);

  return (
    <>
      <TextArea
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <TagInput
        label="Tags"
        value={tags}
        onChange={setTags}
        suggestions={suggestions}
        helperText="Suggested based on your content"
      />
    </>
  );
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { TagInputProps } from "saha-ui";

const MyTagInput: React.FC<TagInputProps> = (props) => {
  return <TagInput {...props} />;
};

// Type-safe handlers
const handleChange = (tags: string[]) => {
  console.log("Tags:", tags);
};

const validateTag = (tag: string): boolean => {
  return tag.length >= 2;
};
```

## Styling

The component uses CVA (Class Variance Authority) for variant management:

```tsx
<TagInput
  label="Custom styled"
  className="my-custom-class"
  tagVariant="primary"
/>
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Performance Tips

### 1. Debounce Suggestions

```tsx
const debouncedFetch = useDebouncedCallback(
  (query) => fetchSuggestions(query),
  300
);

<TagInput onInputChange={debouncedFetch} />;
```

### 2. Limit Suggestions

```tsx
<TagInput suggestions={allSuggestions.slice(0, 10)} />
```

### 3. Memoize Validation

```tsx
const validateTag = useMemo(() => {
  return (tag: string) => {
    // Validation logic
  };
}, []);

<TagInput onValidate={validateTag} />;
```

### 4. Batch Updates

```tsx
const handlePaste = (text: string) => {
  const newTags = text.split(",").map((t) => t.trim());
  setTags([...tags, ...newTags]); // Single update
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [Input](../Input/README.md) - For text input
- [Autocomplete](../Autocomplete/README.md) - For autocomplete
- [Select](../Select/README.md) - For dropdown selection
- [Form](../Form/README.md) - For form management

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI
