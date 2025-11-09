# FileInput

A modern file upload component with drag-and-drop support, preview, progress tracking, and comprehensive validation.

## Installation

```tsx
import { FileInput } from '@saha-ui/components';
import type { FileInputFile } from '@saha-ui/components';
```

## Usage

### Basic FileInput

```tsx
import { useState } from 'react';
import { FileInput, FileInputFile } from '@saha-ui/components';

function Example() {
  const [files, setFiles] = useState<FileInputFile[]>([]);

  return (
    <FileInput
      value={files}
      onChange={setFiles}
    />
  );
}
```

### Multiple Files

Allow users to select multiple files:

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  multiple
  maxFiles={5}
/>
```

### File Type Restrictions

Restrict accepted file types using MIME types or extensions:

```tsx
// Images only
<FileInput
  value={files}
  onChange={setFiles}
  accept="image/*"
/>

// Specific image types
<FileInput
  value={files}
  onChange={setFiles}
  accept="image/png,image/jpeg,image/gif"
/>

// Documents
<FileInput
  value={files}
  onChange={setFiles}
  accept=".pdf,.doc,.docx"
/>

// Multiple types
<FileInput
  value={files}
  onChange={setFiles}
  accept="image/*,application/pdf,.doc,.docx"
/>
```

### File Size Limit

Set maximum file size in bytes:

```tsx
// 5MB limit
<FileInput
  value={files}
  onChange={setFiles}
  maxSize={5 * 1024 * 1024}
/>

// 10MB limit
<FileInput
  value={files}
  onChange={setFiles}
  maxSize={10 * 1024 * 1024}
/>
```

### Variants

The FileInput component supports 3 visual variants:

```tsx
<FileInput variant="outline" value={files} onChange={setFiles} />
<FileInput variant="filled" value={files} onChange={setFiles} />
<FileInput variant="ghost" value={files} onChange={setFiles} />
```

### Sizes

```tsx
<FileInput size="sm" value={files} onChange={setFiles} />
<FileInput size="md" value={files} onChange={setFiles} />
<FileInput size="lg" value={files} onChange={setFiles} />
```

### Disable Drag and Drop

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  enableDragDrop={false}
/>
```

### Hide Preview

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  showPreview={false}
/>
```

### Custom Placeholder

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  placeholder="Drop your files here or click to browse"
/>
```

### Custom Icon

```tsx
import { UploadCloudIcon } from 'lucide-react';

<FileInput
  value={files}
  onChange={setFiles}
  icon={<UploadCloudIcon className="w-10 h-10" />}
/>
```

### With Upload Progress

Track upload progress for each file:

```tsx
import { FileInput, FileInputFile } from '@saha-ui/components';

function UploadExample() {
  const [files, setFiles] = useState<FileInputFile[]>([]);

  const handleFilesAdded = async (newFiles: File[]) => {
    // Create FileInputFile objects with initial status
    const fileInputs: FileInputFile[] = newFiles.map(file => ({
      file,
      id: `${Date.now()}-${Math.random()}`,
      status: 'uploading',
      progress: 0,
    }));
    
    setFiles(prev => [...prev, ...fileInputs]);
    
    // Upload each file
    for (const fileInput of fileInputs) {
      await uploadFile(fileInput);
    }
  };

  const uploadFile = async (fileInput: FileInputFile) => {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setFiles(prev => prev.map(f => 
        f.id === fileInput.id ? { ...f, progress: i } : f
      ));
    }
    
    // Mark as complete
    setFiles(prev => prev.map(f => 
      f.id === fileInput.id ? { ...f, status: 'success' } : f
    ));
  };

  return (
    <FileInput
      value={files}
      onChange={setFiles}
      onFilesAdded={handleFilesAdded}
      multiple
    />
  );
}
```

### Custom Validation

Provide custom validation logic:

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  validator={(file) => {
    if (file.name.includes('test')) {
      return 'Test files are not allowed';
    }
    if (file.size === 0) {
      return 'Empty files are not allowed';
    }
    return null; // Valid
  }}
/>
```

### Error Messages

Customize error messages:

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  maxSize={5 * 1024 * 1024}
  maxFiles={3}
  errorMessages={{
    maxSize: 'File is too large! Max size is 5MB.',
    maxFiles: 'Too many files! Maximum 3 files allowed.',
    fileType: 'Invalid file type!',
  }}
/>
```

### Error State

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  error="Please upload at least one file"
/>

<FileInput
  value={files}
  onChange={setFiles}
  error={true}
/>
```

### Disabled State

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  disabled
/>
```

### Loading State

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  loading
/>
```

### Custom File Item Rendering

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  renderFileItem={(file, index) => (
    <div key={file.id} className="custom-file-item">
      <span>{file.file.name}</span>
      <span>{formatFileSize(file.file.size)}</span>
      {file.status === 'uploading' && <span>Uploading...</span>}
      {file.status === 'success' && <span>✓ Complete</span>}
    </div>
  )}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `FileInputFile[]` | `[]` | Current file(s) |
| `onChange` | `(files: FileInputFile[]) => void` | - | Callback when files change |
| `onFilesAdded` | `(files: File[]) => void` | - | Callback when files are dropped or selected |
| `onFileRemove` | `(file: FileInputFile) => void` | - | Callback when a file is removed |
| `maxSize` | `number` | - | Maximum file size in bytes |
| `maxFiles` | `number` | `1` | Maximum number of files |
| `accept` | `string` | - | Accepted file types (MIME types or extensions) |
| `multiple` | `boolean` | `false` | Whether to allow multiple files |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `error` | `boolean \| string` | `false` | Whether the input has an error state |
| `variant` | `'outline' \| 'filled' \| 'ghost'` | `'outline'` | Variant style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the component |
| `showPreview` | `boolean` | `true` | Whether to show file preview |
| `enableDragDrop` | `boolean` | `true` | Whether to enable drag and drop |
| `placeholder` | `string` | - | Custom placeholder text |
| `icon` | `ReactNode` | - | Custom icon |
| `renderFileItem` | `(file, index) => ReactNode` | - | Custom render for file list item |
| `validator` | `(file: File) => string \| null` | - | Custom validation function |
| `showFileSize` | `boolean` | `true` | Whether to show file size |
| `showRemoveButton` | `boolean` | `true` | Whether to show remove button |
| `loading` | `boolean` | `false` | Loading state |
| `wrapperClassName` | `string` | - | Additional class for wrapper |
| `dropzoneClassName` | `string` | - | Additional class for dropzone |
| `fileListClassName` | `string` | - | Additional class for file list |
| `className` | `string` | - | Additional CSS classes |

## FileInputFile Type

```tsx
interface FileInputFile {
  file: File;
  id: string;
  preview?: string;
  progress?: number;
  status?: 'idle' | 'uploading' | 'success' | 'error';
  error?: string;
}
```

## Examples

### Image Upload with Preview

```tsx
function ImageUpload() {
  const [images, setImages] = useState<FileInputFile[]>([]);

  return (
    <FileInput
      value={images}
      onChange={setImages}
      accept="image/png,image/jpeg,image/webp"
      multiple
      maxSize={2 * 1024 * 1024} // 2MB
      maxFiles={10}
      variant="filled"
    />
  );
}
```

### Document Upload

```tsx
function DocumentUpload() {
  const [documents, setDocuments] = useState<FileInputFile[]>([]);

  return (
    <FileInput
      value={documents}
      onChange={setDocuments}
      accept=".pdf,.doc,.docx,.txt"
      maxSize={10 * 1024 * 1024} // 10MB
      showPreview={false}
    />
  );
}
```

### Avatar Upload (Single File)

```tsx
function AvatarUpload() {
  const [avatar, setAvatar] = useState<FileInputFile[]>([]);

  return (
    <FileInput
      value={avatar}
      onChange={setAvatar}
      accept="image/*"
      multiple={false}
      maxSize={1 * 1024 * 1024} // 1MB
      maxFiles={1}
    />
  );
}
```

### With Real Upload to Server

```tsx
function UploadToServer() {
  const [files, setFiles] = useState<FileInputFile[]>([]);

  const handleFilesAdded = async (newFiles: File[]) => {
    const fileInputs: FileInputFile[] = newFiles.map(file => ({
      file,
      id: `${Date.now()}-${Math.random()}`,
      status: 'uploading' as const,
      progress: 0,
    }));
    
    setFiles(prev => [...prev, ...fileInputs]);
    
    for (const fileInput of fileInputs) {
      try {
        await uploadToServer(fileInput);
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === fileInput.id 
            ? { ...f, status: 'error' as const, error: error.message } 
            : f
        ));
      }
    }
  };

  const uploadToServer = async (fileInput: FileInputFile) => {
    const formData = new FormData();
    formData.append('file', fileInput.file);

    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setFiles(prev => prev.map(f => 
            f.id === fileInput.id ? { ...f, progress } : f
          ));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          setFiles(prev => prev.map(f => 
            f.id === fileInput.id ? { ...f, status: 'success' as const } : f
          ));
          resolve(xhr.response);
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => reject(new Error('Upload failed')));

      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    });
  };

  return (
    <FileInput
      value={files}
      onChange={setFiles}
      onFilesAdded={handleFilesAdded}
      multiple
      maxFiles={5}
    />
  );
}
```

### CSV/Excel Upload

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  accept=".csv,.xlsx,.xls"
  maxSize={5 * 1024 * 1024}
  placeholder="Upload your spreadsheet"
/>
```

### Video Upload

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  accept="video/mp4,video/webm,video/ogg"
  maxSize={100 * 1024 * 1024} // 100MB
  showPreview={false}
/>
```

## Accessibility

- **Keyboard Navigation**: Full keyboard support with Enter/Space to trigger file selection
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Clear focus indicators
- **Screen Reader Announcements**: File selection and removal announced
- **Drag and Drop**: Accessible with keyboard alternatives

## Styling

The FileInput component uses CVA (Class Variance Authority) for styling. Customize it:

```tsx
<FileInput
  value={files}
  onChange={setFiles}
  wrapperClassName="custom-wrapper"
  dropzoneClassName="custom-dropzone"
  fileListClassName="custom-file-list"
/>
```

## Best Practices

1. **Set appropriate file type restrictions**: Use `accept` prop to limit file types
2. **Set reasonable size limits**: Consider your use case and server limits
3. **Provide clear feedback**: Show upload progress and status
4. **Handle errors gracefully**: Display clear error messages
5. **Validate on both client and server**: Client-side validation improves UX, but always validate server-side
6. **Clean up preview URLs**: Remember to revoke object URLs when components unmount
7. **Consider chunked uploads**: For very large files, implement chunked uploads
8. **Show file information**: Display file name, size, and type
9. **Allow file removal**: Let users remove files before upload
10. **Add loading states**: Show when files are being processed

## Common Patterns

### With Form Integration

```tsx
import { useForm } from 'react-hook-form';

function UploadForm() {
  const { setValue, watch } = useForm();
  const files = watch('files', []);

  return (
    <form>
      <FileInput
        value={files}
        onChange={(files) => setValue('files', files)}
        multiple
      />
    </form>
  );
}
```

### With Validation Feedback

```tsx
function ValidatedUpload() {
  const [files, setFiles] = useState<FileInputFile[]>([]);
  const [error, setError] = useState('');

  const handleChange = (newFiles: FileInputFile[]) => {
    setFiles(newFiles);
    if (newFiles.length === 0) {
      setError('At least one file is required');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <FileInput
        value={files}
        onChange={handleChange}
        error={!!error}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
```

## Related Components

- [Upload](../Upload/README.md) - Alternative upload component
- [Button](../Button/README.md) - Button component
- [Progress](../Progress/README.md) - Progress indicator
- [Image](../Image/README.md) - Image display component

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- Preview URLs are automatically created for image files
- Memory is managed by revoking object URLs when files are removed
- Drag and drop works with files from file explorer and desktop
- Multiple file selection respects `maxFiles` limit