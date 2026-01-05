# TextArea

A fully accessible multi-line text input component with character counting, auto-resize, and rich validation. Implements proper ARIA attributes for enhanced screen reader support.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 🔢 **Character Counter** - Built-in character and word counting
- 📐 **Auto-resize** - Automatically grows with content
- 🎯 **Max Length** - Visual feedback for character limits
- ⌨️ **Keyboard Support** - Tab, Enter, Ctrl+Enter handling
- 💫 **Validation** - Built-in validation patterns
- 🌗 **Dark Mode** - Automatic dark mode support
- 📋 **Copy/Paste** - Enhanced clipboard operations
- 🔄 **Controlled/Uncontrolled** - Both modes supported

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { TextArea } from "saha-ui";

function App() {
  const [value, setValue] = useState("");

  return (
    <TextArea
      label="Description"
      placeholder="Enter your description..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

## Examples

### Variants

```tsx
<TextArea label="Default" variant="default" />
<TextArea label="Primary" variant="primary" />
<TextArea label="Secondary" variant="secondary" />
<TextArea label="Accent" variant="accent" />
<TextArea label="Success" variant="success" />
<TextArea label="Warning" variant="warning" />
<TextArea label="Error" variant="error" />
```

### Sizes

```tsx
<TextArea label="Small" size="sm" />
<TextArea label="Medium" size="md" />
<TextArea label="Large" size="lg" />
```

### With Character Count

Display character count and limit:

```tsx
<TextArea
  label="Bio"
  placeholder="Tell us about yourself"
  maxLength={500}
  showCount
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  helperText="Keep it concise and interesting"
/>
```

### Auto-resize

Automatically grow with content:

```tsx
<TextArea
  label="Comments"
  placeholder="Enter your comments..."
  autoResize
  minRows={3}
  maxRows={10}
  value={comments}
  onChange={(e) => setComments(e.target.value)}
/>
```

### With Fixed Rows

Set specific number of rows:

```tsx
<TextArea
  label="Message"
  placeholder="Type your message..."
  rows={6}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

### Required Field

```tsx
<TextArea
  label="Feedback"
  placeholder="Your feedback is important to us"
  required
  value={feedback}
  onChange={(e) => setFeedback(e.target.value)}
  error={!feedback && submitted ? "Feedback is required" : undefined}
  aria-required="true"
/>
```

### With Error State

```tsx
<TextArea
  label="Comment"
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  error="Comment must be at least 10 characters"
  aria-invalid="true"
/>
```

### With Helper Text

```tsx
<TextArea
  label="Review"
  placeholder="Write your review..."
  helperText="Your review will be publicly visible"
  value={review}
  onChange={(e) => setReview(e.target.value)}
/>
```

### Disabled State

```tsx
<TextArea
  label="Disabled textarea"
  placeholder="Cannot edit"
  disabled
  value="This content cannot be edited"
/>
```

### Read-only State

```tsx
<TextArea
  label="Terms and conditions"
  readOnly
  value={termsText}
  rows={10}
  helperText="Please read carefully"
/>
```

### With Validation

```tsx
function ValidatedTextArea() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validate = (text: string) => {
    if (text.length < 10) {
      setError("Minimum 10 characters required");
    } else if (text.length > 500) {
      setError("Maximum 500 characters allowed");
    } else {
      setError("");
    }
  };

  return (
    <TextArea
      label="Description"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        validate(e.target.value);
      }}
      error={error}
      maxLength={500}
      showCount
      aria-invalid={!!error}
    />
  );
}
```

### Markdown Editor

```tsx
<TextArea
  label="Markdown content"
  placeholder="# Heading\n\nWrite your markdown here..."
  value={markdown}
  onChange={(e) => setMarkdown(e.target.value)}
  rows={12}
  helperText="Supports GitHub Flavored Markdown"
  fontFamily="monospace"
/>
```

### Code Editor Style

```tsx
<TextArea
  label="Code snippet"
  placeholder="Enter your code..."
  value={code}
  onChange={(e) => setCode(e.target.value)}
  rows={10}
  fontFamily="monospace"
  spellCheck={false}
  autoComplete="off"
/>
```

### Word Counter

```tsx
function WordCounter() {
  const [value, setValue] = useState("");
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

  return (
    <TextArea
      label="Essay"
      placeholder="Write your essay..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helperText={`${wordCount} words`}
      minRows={8}
      autoResize
    />
  );
}
```

### With Emoji Picker

```tsx
function EmojiTextArea() {
  const [value, setValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const addEmoji = (emoji: string) => {
    setValue((prev) => prev + emoji);
    setShowEmoji(false);
  };

  return (
    <div className="relative">
      <TextArea
        label="Message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        type="button"
        onClick={() => setShowEmoji(!showEmoji)}
        className="absolute right-2 bottom-2"
        aria-label="Add emoji"
      >
        😊
      </button>
      {showEmoji && <EmojiPicker onSelect={addEmoji} />}
    </div>
  );
}
```

### Multi-language Support

```tsx
<TextArea
  label="Content"
  placeholder="أدخل النص الخاص بك..."
  dir="rtl"
  lang="ar"
  value={arabicText}
  onChange={(e) => setArabicText(e.target.value)}
/>
```

### Copy to Clipboard

```tsx
function CopyableTextArea() {
  const [value, setValue] = useState("Sample text to copy");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <TextArea
        label="Code snippet"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        readOnly
        rows={5}
      />
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2"
        aria-label="Copy to clipboard"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
```

### Auto-save Draft

```tsx
function AutoSaveDraft() {
  const [value, setValue] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) {
        localStorage.setItem("draft", value);
        setLastSaved(new Date());
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <TextArea
      label="Draft"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helperText={
        lastSaved
          ? `Last saved at ${lastSaved.toLocaleTimeString()}`
          : "Changes are auto-saved"
      }
      placeholder="Start writing..."
      autoResize
    />
  );
}
```

## Accessibility

### Keyboard Navigation

- **Tab**: Move focus to/from textarea
- **Shift + Tab**: Move focus backwards
- **Enter**: New line
- **Ctrl/Cmd + A**: Select all text
- **Ctrl/Cmd + C/V/X**: Copy/Paste/Cut

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated IDs and ARIA attributes
<TextArea
  label="Comments"
  description="Share your thoughts"
  helperText="Be respectful"
  error={error}
/>
// Automatically creates:
// - Proper id for textarea
// - aria-labelledby links to label
// - aria-describedby links to description, helperText, and error
// - aria-invalid when error is present
```

### Manual ARIA Labels

For textareas without visible labels:

```tsx
<TextArea
  aria-label="Enter your comments"
  placeholder="Comments..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Required Fields

```tsx
<TextArea
  label="Required field"
  required
  aria-required="true"
  error={!value && submitted ? "This field is required" : undefined}
/>
```

### Error Announcements

Errors are automatically announced to screen readers:

```tsx
<TextArea
  label="Description"
  error="Description is too short"
  aria-invalid="true"
/>
// Error has role="alert" and aria-live="polite"
```

### Character Limit Announcements

```tsx
<TextArea
  label="Bio"
  maxLength={200}
  showCount
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  aria-describedby="bio-count"
/>
// Character count is announced to screen readers
```

## API Reference

### TextArea Props

| Prop               | Type                                                                                     | Default      | Description                                 |
| ------------------ | ---------------------------------------------------------------------------------------- | ------------ | ------------------------------------------- |
| `label`            | `string`                                                                                 | -            | Label text for the textarea                 |
| `description`      | `string`                                                                                 | -            | Description text shown below the label      |
| `placeholder`      | `string`                                                                                 | -            | Placeholder text                            |
| `helperText`       | `string`                                                                                 | -            | Helper text shown below the textarea        |
| `error`            | `string`                                                                                 | -            | Error message to display                    |
| `value`            | `string`                                                                                 | -            | Current value (controlled)                  |
| `defaultValue`     | `string`                                                                                 | -            | Default value (uncontrolled)                |
| `onChange`         | `(e: ChangeEvent) => void`                                                               | -            | Change event handler                        |
| `onBlur`           | `(e: FocusEvent) => void`                                                                | -            | Blur event handler                          |
| `onFocus`          | `(e: FocusEvent) => void`                                                                | -            | Focus event handler                         |
| `variant`          | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'default'`  | Color variant                               |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                                   | `'md'`       | Size of the textarea                        |
| `rows`             | `number`                                                                                 | `4`          | Number of visible rows                      |
| `minRows`          | `number`                                                                                 | -            | Minimum rows (with autoResize)              |
| `maxRows`          | `number`                                                                                 | -            | Maximum rows (with autoResize)              |
| `maxLength`        | `number`                                                                                 | -            | Maximum character length                    |
| `showCount`        | `boolean`                                                                                | `false`      | Show character count                        |
| `autoResize`       | `boolean`                                                                                | `false`      | Auto-resize based on content                |
| `disabled`         | `boolean`                                                                                | `false`      | Whether the textarea is disabled            |
| `readOnly`         | `boolean`                                                                                | `false`      | Whether the textarea is read-only           |
| `required`         | `boolean`                                                                                | `false`      | Whether the textarea is required            |
| `autoFocus`        | `boolean`                                                                                | `false`      | Auto-focus on mount                         |
| `spellCheck`       | `boolean`                                                                                | `true`       | Enable spell checking                       |
| `autoComplete`     | `string`                                                                                 | -            | Autocomplete attribute                      |
| `fontFamily`       | `string`                                                                                 | -            | Custom font family                          |
| `resize`           | `'none' \| 'both' \| 'horizontal' \| 'vertical'`                                         | `'vertical'` | Resize behavior                             |
| `className`        | `string`                                                                                 | -            | Additional CSS classes                      |
| `aria-label`       | `string`                                                                                 | -            | Accessible label for screen readers         |
| `aria-labelledby`  | `string`                                                                                 | -            | ID of element that labels this textarea     |
| `aria-describedby` | `string`                                                                                 | -            | IDs of elements that describe this textarea |
| `aria-required`    | `'true' \| 'false'`                                                                      | -            | Whether the textarea is required            |
| `aria-invalid`     | `'true' \| 'false'`                                                                      | -            | Whether the textarea has an error           |

## Best Practices

### 1. Always Provide Labels

For accessibility, always provide a clear label:

```tsx
// Good ✅
<TextArea label="Comments" />
<TextArea aria-label="Enter your comments" />

// Bad ❌
<TextArea placeholder="Comments" />
```

### 2. Set Appropriate Rows

Choose a sensible default height:

```tsx
// Good ✅ - Short input
<TextArea label="Summary" rows={3} />

// Good ✅ - Long input
<TextArea label="Detailed description" rows={8} />

// Bad ❌ - Too small for expected input
<TextArea label="Essay" rows={2} />
```

### 3. Use Auto-resize for Variable Content

```tsx
<TextArea label="Comments" autoResize minRows={3} maxRows={15} />
```

### 4. Show Character Count for Limited Input

```tsx
<TextArea
  label="Tweet"
  maxLength={280}
  showCount
  helperText="Keep it short and sweet"
/>
```

### 5. Provide Clear Error Messages

```tsx
<TextArea
  label="Description"
  error="Description must be between 10 and 500 characters"
  value={value}
/>
```

### 6. Use Helper Text for Guidance

```tsx
<TextArea
  label="Feedback"
  helperText="Please be specific and constructive"
  placeholder="What can we improve?"
/>
```

### 7. Disable Spell Check for Code

```tsx
<TextArea
  label="Code"
  spellCheck={false}
  autoComplete="off"
  fontFamily="monospace"
/>
```

### 8. Validate on Blur, Not on Change

```tsx
<TextArea
  label="Email body"
  onChange={(e) => setValue(e.target.value)}
  onBlur={() => validate(value)}
/>
```

### 9. Provide Default Values for Edits

```tsx
<TextArea
  label="Edit description"
  defaultValue={existingDescription}
  helperText="Update the description"
/>
```

### 10. Consider Read-only for Display

```tsx
<TextArea
  label="Original message"
  readOnly
  value={originalMessage}
  helperText="This message cannot be edited"
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
        name="description"
        control={control}
        rules={{
          required: "Description is required",
          minLength: {
            value: 10,
            message: "Minimum 10 characters",
          },
          maxLength: {
            value: 500,
            message: "Maximum 500 characters",
          },
        }}
        render={({ field, fieldState }) => (
          <TextArea
            label="Description"
            placeholder="Enter description..."
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            maxLength={500}
            showCount
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
import { Formik, Field } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  comments: Yup.string()
    .min(10, "Too short")
    .max(500, "Too long")
    .required("Required"),
});

function Form() {
  return (
    <Formik
      initialValues={{ comments: "" }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <TextArea
          label="Comments"
          value={values.comments}
          onChange={(e) => setFieldValue("comments", e.target.value)}
          error={touched.comments ? errors.comments : undefined}
          maxLength={500}
          showCount
        />
      )}
    </Formik>
  );
}
```

## Advanced Examples

### Rich Text Preview

```tsx
function RichTextEditor() {
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="grid grid-cols-2 gap-4">
      <TextArea
        label="Markdown"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="# Heading\n\n**Bold** text"
        rows={12}
        fontFamily="monospace"
      />
      <div>
        <label className="block text-sm font-semibold mb-2">Preview</label>
        <div className="prose">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
```

### Comment System

```tsx
function CommentForm() {
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await submitComment(comment);
      setComment("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextArea
        label="Add a comment"
        placeholder="Share your thoughts..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        autoResize
        minRows={2}
        maxRows={8}
        maxLength={1000}
        showCount
        disabled={submitting}
        required
      />
      <button type="submit" disabled={!comment.trim() || submitting}>
        {submitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
```

### Survey Question

```tsx
function SurveyQuestion() {
  const [answer, setAnswer] = useState("");
  const minWords = 25;
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const isValid = wordCount >= minWords;

  return (
    <TextArea
      label="Please describe your experience in detail"
      description="Your feedback helps us improve our services"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      helperText={
        isValid
          ? `${wordCount} words (requirement met ✓)`
          : `${wordCount} / ${minWords} words (minimum required)`
      }
      error={
        !isValid && answer
          ? `Please write at least ${minWords} words`
          : undefined
      }
      rows={6}
      autoResize
      required
    />
  );
}
```

### Multi-step Form

```tsx
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    summary: "",
    details: "",
    additionalNotes: "",
  });

  return (
    <>
      {step === 1 && (
        <TextArea
          label="Summary"
          placeholder="Brief overview..."
          value={formData.summary}
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
          maxLength={200}
          showCount
          required
        />
      )}
      {step === 2 && (
        <TextArea
          label="Detailed description"
          placeholder="Provide more details..."
          value={formData.details}
          onChange={(e) =>
            setFormData({ ...formData, details: e.target.value })
          }
          rows={8}
          required
        />
      )}
      {step === 3 && (
        <TextArea
          label="Additional notes (optional)"
          placeholder="Any other information..."
          value={formData.additionalNotes}
          onChange={(e) =>
            setFormData({ ...formData, additionalNotes: e.target.value })
          }
          rows={4}
        />
      )}
    </>
  );
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { TextAreaProps } from "saha-ui";

const MyTextArea: React.FC<TextAreaProps> = (props) => {
  return <TextArea {...props} />;
};

// Type-safe event handlers
const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const value = e.target.value;
  setValue(value);
};
```

## Styling

The component uses CVA (Class Variance Authority) for variant management:

```tsx
<TextArea
  label="Custom styled"
  className="my-custom-class font-mono"
  style={{ fontFamily: "Monaco, monospace" }}
/>
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Performance Tips

### 1. Debounce Expensive Operations

```tsx
import { useDebouncedCallback } from "use-debounce";

const debouncedSave = useDebouncedCallback(
  (value) => saveToServer(value),
  1000
);

<TextArea
  onChange={(e) => {
    setValue(e.target.value);
    debouncedSave(e.target.value);
  }}
/>;
```

### 2. Validate on Blur

```tsx
<TextArea
  onChange={(e) => setValue(e.target.value)}
  onBlur={() => validate(value)} // Only validate when done typing
/>
```

### 3. Use Controlled Components Wisely

```tsx
// Good ✅ - Controlled when you need the value
<TextArea value={value} onChange={(e) => setValue(e.target.value)} />

// Also good ✅ - Uncontrolled for simple forms
<TextArea defaultValue={initialValue} name="description" />
```

## Comparison: TextArea vs Input

| Use Case          | Component    |
| ----------------- | ------------ |
| Single line text  | Input        |
| Multi-line text   | **TextArea** |
| Long descriptions | **TextArea** |
| Comments/reviews  | **TextArea** |
| Code snippets     | **TextArea** |
| Short answers     | Input        |
| Email/URL         | Input        |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [Input](../Input/README.md) - For single-line text
- [TextEditor](../TextEditor/README.md) - For rich text editing
- [Form](../Form/README.md) - For form management
- [Field](../Field/README.md) - For form field wrappers

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI
