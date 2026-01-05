# Upload

A fully accessible file upload component with drag-and-drop, preview, validation, and progress tracking. Implements proper ARIA attributes for enhanced screen reader support.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 📤 **Drag & Drop** - Intuitive drag-and-drop interface
- 🖼️ **File Preview** - Image and document previews
- ✔️ **Validation** - File type, size, and count validation
- 📊 **Progress Tracking** - Upload progress indicators
- 🌗 **Dark Mode** - Automatic dark mode support
- 📁 **Multiple Files** - Support for multiple file uploads
- 🔄 **Async Upload** - Support for async upload operations
- 🗑️ **File Management** - Remove and replace files easily

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Upload } from "saha-ui";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  return <Upload label="Upload file" value={files} onChange={setFiles} />;
}
```

## Examples

### Variants

```tsx
<Upload label="Default" variant="default" />
<Upload label="Primary" variant="primary" />
<Upload label="Secondary" variant="secondary" />
<Upload label="Accent" variant="accent" />
<Upload label="Success" variant="success" />
<Upload label="Warning" variant="warning" />
<Upload label="Error" variant="error" />
```

### Sizes

```tsx
<Upload label="Small" size="sm" />
<Upload label="Medium" size="md" />
<Upload label="Large" size="lg" />
```

### Image Upload

Upload images with preview:

```tsx
<Upload
  label="Upload images"
  accept="image/*"
  value={images}
  onChange={setImages}
  preview
  helperText="PNG, JPG, GIF up to 10MB"
/>
```

### Multiple Files

Allow multiple file selection:

```tsx
<Upload
  label="Upload documents"
  multiple
  value={files}
  onChange={setFiles}
  maxFiles={5}
  helperText="Upload up to 5 files"
/>
```

### Drag and Drop

Enable drag-and-drop functionality:

```tsx
<Upload
  label="Drop files here"
  dragDrop
  value={files}
  onChange={setFiles}
  helperText="Drag and drop files or click to browse"
/>
```

### File Type Validation

Restrict file types:

```tsx
// Image files only
<Upload
  label="Upload images"
  accept="image/png,image/jpeg,image/gif"
  value={files}
  onChange={setFiles}
/>

// PDF files only
<Upload
  label="Upload PDF"
  accept="application/pdf"
  value={files}
  onChange={setFiles}
/>

// Multiple types
<Upload
  label="Upload documents"
  accept=".pdf,.doc,.docx,.txt"
  value={files}
  onChange={setFiles}
/>
```

### File Size Validation

Set maximum file size:

```tsx
<Upload
  label="Upload file"
  value={files}
  onChange={setFiles}
  maxSize={5 * 1024 * 1024} // 5MB
  helperText="Maximum file size: 5MB"
  onError={(error) => console.error(error)}
/>
```

### With Progress Tracking

Show upload progress:

```tsx
function UploadWithProgress() {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("/api/upload", formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress((prev) => ({
          ...prev,
          [file.name]: percentCompleted,
        }));
      },
    });
  };

  return (
    <Upload
      label="Upload with progress"
      value={files}
      onChange={setFiles}
      onUpload={handleUpload}
      progress={progress}
    />
  );
}
```

### Avatar Upload

Upload user avatar with preview:

```tsx
function AvatarUpload() {
  const [avatar, setAvatar] = useState<File | null>(null);

  return (
    <Upload
      label="Profile picture"
      accept="image/*"
      value={avatar ? [avatar] : []}
      onChange={(files) => setAvatar(files[0])}
      maxFiles={1}
      maxSize={2 * 1024 * 1024} // 2MB
      preview
      circular
      helperText="Recommended: Square image, at least 400x400px"
    />
  );
}
```

### Custom File Preview

Customize file preview display:

```tsx
<Upload
  label="Upload files"
  value={files}
  onChange={setFiles}
  preview
  renderPreview={(file) => (
    <div className="flex items-center gap-3 p-3 border rounded">
      <FileIcon type={file.type} />
      <div className="flex-1">
        <div className="font-medium">{file.name}</div>
        <div className="text-sm text-muted-foreground">
          {formatFileSize(file.size)}
        </div>
      </div>
      <button onClick={() => removeFile(file)}>Remove</button>
    </div>
  )}
/>
```

### With Validation

Validate files before upload:

```tsx
function ValidatedUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const validateFile = (file: File): string | null => {
    if (file.size > 10 * 1024 * 1024) {
      return "File size must be less than 10MB";
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      return "Only JPEG and PNG files are allowed";
    }

    return null;
  };

  const handleChange = (newFiles: File[]) => {
    const errors = newFiles.map(validateFile).filter(Boolean);

    if (errors.length > 0) {
      setError(errors[0]);
    } else {
      setError("");
      setFiles(newFiles);
    }
  };

  return (
    <Upload
      label="Upload images"
      value={files}
      onChange={handleChange}
      onValidate={validateFile}
      error={error}
    />
  );
}
```

### Disabled State

```tsx
<Upload
  label="Disabled upload"
  disabled
  helperText="File upload is currently disabled"
/>
```

### Read-only with Preview

Show uploaded files without upload functionality:

```tsx
<Upload
  label="Uploaded files"
  value={existingFiles}
  readOnly
  preview
  helperText="These files are already uploaded"
/>
```

### Document Upload

Upload documents with file type icons:

```tsx
<Upload
  label="Upload documents"
  accept=".pdf,.doc,.docx,.xls,.xlsx"
  multiple
  value={documents}
  onChange={setDocuments}
  showFileType
  helperText="Supported: PDF, Word, Excel"
/>
```

### Batch Upload

Upload multiple files at once:

```tsx
function BatchUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleBatchUpload = async () => {
    setUploading(true);
    try {
      await Promise.all(files.map((file) => uploadFile(file)));
      setFiles([]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Upload
        label="Select files"
        multiple
        value={files}
        onChange={setFiles}
        disabled={uploading}
      />
      <button
        onClick={handleBatchUpload}
        disabled={files.length === 0 || uploading}
      >
        {uploading ? "Uploading..." : `Upload ${files.length} files`}
      </button>
    </>
  );
}
```

### Resume Upload

Handle resumable uploads:

```tsx
function ResumableUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file: File) => {
    const id = await initializeUpload(file);
    setUploadId(id);

    try {
      await uploadChunks(file, id, (progress) => {
        setProgress(progress);
      });
    } catch (error) {
      // Save upload state for later resume
      saveUploadState(id, progress);
    }
  };

  const handleResume = async () => {
    if (uploadId && file) {
      const savedProgress = getUploadState(uploadId);
      await uploadChunks(file, uploadId, setProgress, savedProgress);
    }
  };

  return (
    <Upload
      label="Resumable upload"
      value={file ? [file] : []}
      onChange={(files) => setFile(files[0])}
      onUpload={handleUpload}
      progress={{ [file?.name || ""]: progress }}
    />
  );
}
```

### Camera Capture

Allow camera capture on mobile:

```tsx
<Upload
  label="Take a photo"
  accept="image/*"
  capture="environment"
  value={photos}
  onChange={setPhotos}
  helperText="Take a photo or upload from gallery"
/>
```

### CSV Upload with Validation

Upload and validate CSV files:

```tsx
function CSVUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleFileChange = async (files: File[]) => {
    const csvFile = files[0];
    if (!csvFile) return;

    try {
      const text = await csvFile.text();
      const parsed = parseCSV(text);

      if (parsed.length === 0) {
        setError("CSV file is empty");
        return;
      }

      setData(parsed);
      setFile(csvFile);
      setError("");
    } catch (err) {
      setError("Failed to parse CSV file");
    }
  };

  return (
    <>
      <Upload
        label="Upload CSV"
        accept=".csv,text/csv"
        value={file ? [file] : []}
        onChange={handleFileChange}
        error={error}
        helperText="Upload a CSV file with your data"
      />

      {data.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Loaded {data.length} rows
          </p>
        </div>
      )}
    </>
  );
}
```

## Accessibility

### Keyboard Navigation

- **Tab**: Focus the upload button
- **Enter/Space**: Open file picker
- **Escape**: Cancel drag operation
- **Delete**: Remove focused file

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated IDs and ARIA attributes
<Upload
  label="Upload files"
  description="Upload your documents"
  helperText="Maximum 10MB per file"
  error={error}
/>
// Automatically creates:
// - Proper input type="file" with accessible label
// - aria-labelledby links to label
// - aria-describedby links to description and helperText
// - aria-invalid when error is present
// - Live region announces upload status
```

### Manual ARIA Labels

For uploads without visible labels:

```tsx
<Upload
  aria-label="Upload profile picture"
  accept="image/*"
  value={files}
  onChange={setFiles}
/>
```

### Drag and Drop Accessibility

```tsx
<Upload
  label="Upload files"
  dragDrop
  aria-dropeffect="copy"
  helperText="Drag files here or click to browse"
/>
```

### Progress Announcements

Progress is announced to screen readers:

```tsx
<Upload
  label="Upload"
  value={files}
  onChange={setFiles}
  onUpload={handleUpload}
  announceProgress={(fileName, percent) =>
    `Uploading ${fileName}: ${percent}% complete`
  }
/>
```

### Error Announcements

Errors are automatically announced to screen readers:

```tsx
<Upload
  label="Upload"
  error="File size exceeds maximum allowed"
  aria-invalid="true"
/>
// Error has role="alert" and aria-live="assertive"
```

## API Reference

### Upload Props

| Prop               | Type                                                                                     | Default     | Description                               |
| ------------------ | ---------------------------------------------------------------------------------------- | ----------- | ----------------------------------------- |
| `label`            | `string`                                                                                 | -           | Label text for the upload                 |
| `description`      | `string`                                                                                 | -           | Description text shown below the label    |
| `helperText`       | `string`                                                                                 | -           | Helper text shown below the upload        |
| `error`            | `string`                                                                                 | -           | Error message to display                  |
| `value`            | `File[]`                                                                                 | `[]`        | Array of files (controlled)               |
| `defaultValue`     | `File[]`                                                                                 | `[]`        | Default files (uncontrolled)              |
| `onChange`         | `(files: File[]) => void`                                                                | -           | Callback when files change                |
| `onUpload`         | `(file: File) => Promise<void>`                                                          | -           | Upload handler for each file              |
| `onRemove`         | `(file: File) => void`                                                                   | -           | Callback when file is removed             |
| `onError`          | `(error: string) => void`                                                                | -           | Error callback                            |
| `variant`          | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color variant                             |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                                   | `'md'`      | Size of the upload area                   |
| `accept`           | `string`                                                                                 | -           | Accepted file types                       |
| `multiple`         | `boolean`                                                                                | `false`     | Allow multiple files                      |
| `maxFiles`         | `number`                                                                                 | -           | Maximum number of files                   |
| `maxSize`          | `number`                                                                                 | -           | Maximum file size in bytes                |
| `dragDrop`         | `boolean`                                                                                | `true`      | Enable drag-and-drop                      |
| `preview`          | `boolean`                                                                                | `false`     | Show file previews                        |
| `circular`         | `boolean`                                                                                | `false`     | Circular preview (for avatars)            |
| `showFileType`     | `boolean`                                                                                | `false`     | Show file type icons                      |
| `disabled`         | `boolean`                                                                                | `false`     | Whether upload is disabled                |
| `readOnly`         | `boolean`                                                                                | `false`     | Whether upload is read-only               |
| `loading`          | `boolean`                                                                                | `false`     | Show loading state                        |
| `required`         | `boolean`                                                                                | `false`     | Whether file is required                  |
| `capture`          | `'user' \| 'environment'`                                                                | -           | Camera capture mode (mobile)              |
| `onValidate`       | `(file: File) => string \| null`                                                         | -           | Validate file before adding               |
| `renderPreview`    | `(file: File) => ReactNode`                                                              | -           | Custom preview renderer                   |
| `progress`         | `Record<string, number>`                                                                 | -           | Upload progress per file (0-100)          |
| `announceProgress` | `(fileName: string, percent: number) => string`                                          | -           | Custom progress announcement              |
| `className`        | `string`                                                                                 | -           | Additional CSS classes                    |
| `aria-label`       | `string`                                                                                 | -           | Accessible label for screen readers       |
| `aria-labelledby`  | `string`                                                                                 | -           | ID of element that labels this upload     |
| `aria-describedby` | `string`                                                                                 | -           | IDs of elements that describe this upload |

## Best Practices

### 1. Always Provide Labels

For accessibility, always provide a clear label:

```tsx
// Good ✅
<Upload label="Upload document" />
<Upload aria-label="Upload profile picture" />

// Bad ❌
<Upload />
```

### 2. Validate File Types

Restrict to appropriate file types:

```tsx
// Good ✅
<Upload
  accept="image/png,image/jpeg"
  helperText="PNG or JPEG only"
/>

// Bad ❌
<Upload /> // Accepts any file
```

### 3. Set Size Limits

Prevent large files from being uploaded:

```tsx
<Upload
  maxSize={10 * 1024 * 1024} // 10MB
  helperText="Maximum file size: 10MB"
/>
```

### 4. Provide Clear Feedback

Show upload status and errors:

```tsx
<Upload loading={uploading} error={uploadError} progress={uploadProgress} />
```

### 5. Use Preview for Images

Show image previews when uploading photos:

```tsx
<Upload accept="image/*" preview helperText="Preview will be shown" />
```

### 6. Limit Number of Files

```tsx
<Upload multiple maxFiles={5} helperText="Upload up to 5 files" />
```

### 7. Handle Upload Errors

```tsx
<Upload
  onError={(error) => {
    toast.error(error);
    logError(error);
  }}
/>
```

### 8. Show File Information

Display file name, size, and type:

```tsx
<Upload
  preview
  showFileType
  renderPreview={(file) => (
    <div>
      <span>{file.name}</span>
      <span>{formatFileSize(file.size)}</span>
    </div>
  )}
/>
```

### 9. Enable Drag and Drop

Improve UX with drag-and-drop:

```tsx
<Upload dragDrop helperText="Drag files here or click to browse" />
```

### 10. Provide Helper Text

Guide users on requirements:

```tsx
<Upload
  helperText="PNG, JPG or GIF up to 5MB"
  maxSize={5 * 1024 * 1024}
  accept="image/*"
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
        name="files"
        control={control}
        rules={{
          required: "Please upload at least one file",
          validate: (files) => {
            if (files.length > 5) {
              return "Maximum 5 files allowed";
            }
            return true;
          },
        }}
        render={({ field, fieldState }) => (
          <Upload
            label="Upload files"
            value={field.value || []}
            onChange={field.onChange}
            error={fieldState.error?.message}
            maxFiles={5}
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
  files: Yup.array()
    .min(1, "Upload at least one file")
    .max(5, "Maximum 5 files"),
});

function Form() {
  return (
    <Formik
      initialValues={{ files: [] }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Upload
          label="Upload files"
          value={values.files}
          onChange={(files) => setFieldValue("files", files)}
          error={touched.files ? errors.files : undefined}
        />
      )}
    </Formik>
  );
}
```

## Advanced Examples

### S3 Direct Upload

Upload directly to S3:

```tsx
function S3Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadToS3 = async (file: File) => {
    // Get presigned URL
    const { url, fields } = await getPresignedUrl(file.name);

    // Upload to S3
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("file", file);

    await fetch(url, {
      method: "POST",
      body: formData,
    });
  };

  return (
    <Upload
      label="Upload to S3"
      value={files}
      onChange={setFiles}
      onUpload={uploadToS3}
      loading={uploading}
    />
  );
}
```

### Image Compression

Compress images before upload:

```tsx
import imageCompression from "browser-image-compression";

function CompressedImageUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = async (newFiles: File[]) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    };

    const compressed = await Promise.all(
      newFiles.map((file) =>
        file.type.startsWith("image/") ? imageCompression(file, options) : file
      )
    );

    setFiles(compressed);
  };

  return (
    <Upload
      label="Upload images"
      accept="image/*"
      multiple
      value={files}
      onChange={handleChange}
      helperText="Images will be automatically compressed"
    />
  );
}
```

### Multi-step Upload

Upload with multiple steps:

```tsx
function MultiStepUpload() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [metadata, setMetadata] = useState({});

  return (
    <>
      {step === 1 && (
        <Upload
          label="Step 1: Select files"
          multiple
          value={files}
          onChange={(files) => {
            setFiles(files);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <div>
          <h3>Step 2: Add metadata</h3>
          {files.map((file) => (
            <Input
              key={file.name}
              label={`Description for ${file.name}`}
              onChange={(e) => {
                setMetadata({
                  ...metadata,
                  [file.name]: e.target.value,
                });
              }}
            />
          ))}
          <button onClick={() => setStep(3)}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Step 3: Confirm and upload</h3>
          <button onClick={handleFinalUpload}>Upload All</button>
        </div>
      )}
    </>
  );
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { UploadProps } from "saha-ui";

const MyUpload: React.FC<UploadProps> = (props) => {
  return <Upload {...props} />;
};

// Type-safe handlers
const handleChange = (files: File[]) => {
  console.log("Files:", files);
};

const validateFile = (file: File): string | null => {
  if (file.size > 10 * 1024 * 1024) {
    return "File too large";
  }
  return null;
};
```

## Styling

The component uses CVA (Class Variance Authority) for variant management:

```tsx
<Upload label="Custom styled" className="my-custom-class" />
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Performance Tips

### 1. Compress Images Client-Side

```tsx
const compressImage = async (file: File) => {
  return await imageCompression(file, {
    maxSizeMB: 1,
    useWebWorker: true,
  });
};
```

### 2. Upload in Chunks

For large files, upload in chunks:

```tsx
const uploadChunks = async (file: File) => {
  const chunkSize = 1024 * 1024; // 1MB
  const chunks = Math.ceil(file.size / chunkSize);

  for (let i = 0; i < chunks; i++) {
    const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
    await uploadChunk(chunk, i);
  }
};
```

### 3. Use Web Workers

Offload processing to web workers:

```tsx
const worker = new Worker("file-processor.js");
worker.postMessage(file);
```

### 4. Validate Before Upload

```tsx
<Upload
  onValidate={(file) => {
    // Quick validation before processing
    if (file.size > maxSize) return "Too large";
    return null;
  }}
/>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [Input](../Input/README.md) - For text input
- [Button](../Button/README.md) - For actions
- [Progress](../Progress/README.md) - For progress display
- [Form](../Form/README.md) - For form management

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI
