import { useState } from "react";
import Upload from "../components/Upload";
import type { UploadFile } from "../components/Upload/Upload.types";

export default function UploadExample() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [avatarFiles, setAvatarFiles] = useState<UploadFile[]>([]);
  const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);

  // Mock upload function
  const mockUpload = async (_file: File) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // 90% success rate for demo
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error("Upload failed"));
        }
      }, 2000);
    });
  };

  return (
    <div className="space-y-16 p-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold">Upload Component</h1>
        <p className="text-muted-foreground">
          Advanced file upload with drag & drop, preview, validation, and
          progress tracking.
        </p>
      </div>

      {/* Basic Upload */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Upload</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Upload
            label="Basic Dragger"
            helperText="Click or drag file to upload"
          />
          <Upload
            uploadType="button"
            buttonText="Choose File"
            label="Button Type"
            helperText="Click button to select file"
          />
        </div>
      </section>

      {/* All Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">All Variants</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Upload variant="default" label="Default" />
          <Upload variant="primary" label="Primary" />
          <Upload variant="secondary" label="Secondary" />
          <Upload variant="accent" label="Accent" />
          <Upload variant="success" label="Success" />
          <Upload variant="warning" label="Warning" />
          <Upload variant="error" label="Error" />
          <Upload variant="info" label="Info" />
          <Upload variant="outline" label="Outline" />
          <Upload variant="ghost" label="Ghost" />
          <Upload variant="glass" label="Glass" />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Upload
            size="sm"
            label="Small (sm)"
            variant="primary"
            dragText="Small upload area"
          />
          <Upload
            size="md"
            label="Medium (md)"
            variant="primary"
            dragText="Medium upload area"
          />
          <Upload
            size="lg"
            label="Large (lg)"
            variant="primary"
            dragText="Large upload area"
          />
        </div>
      </section>

      {/* Upload Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Upload Types</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Upload
            uploadType="dragger"
            label="Dragger (Default)"
            dragText="Drag and drop files here"
            variant="primary"
          />
          <Upload
            uploadType="button"
            buttonText="Select Files"
            label="Button Type"
            variant="accent"
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Upload
            uploadType="avatar"
            label="Avatar Upload"
            accept="image/*"
            variant="success"
            fileList={avatarFiles}
            onChange={setAvatarFiles}
          />
          <Upload
            uploadType="image"
            label="Image Upload"
            accept="image/*"
            variant="info"
            fileList={imageFiles}
            onChange={setImageFiles}
          />
        </div>
      </section>

      {/* Multiple Files */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Multiple Files</h2>
        <Upload
          multiple
          label="Upload Multiple Files"
          dragText="Drag and drop multiple files here"
          helperText="You can upload multiple files at once"
          variant="primary"
        />
      </section>

      {/* File Restrictions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">File Restrictions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Upload
            accept="image/*"
            label="Images Only"
            helperText="Only image files are allowed"
            variant="success"
          />
          <Upload
            accept=".pdf,.doc,.docx"
            label="Documents Only"
            helperText="PDF and Word documents only"
            variant="info"
          />
          <Upload
            maxSize={2 * 1024 * 1024}
            label="Max 2MB"
            helperText="File size must be less than 2MB"
            variant="warning"
          />
          <Upload
            multiple
            maxFiles={3}
            label="Max 3 Files"
            helperText="You can upload up to 3 files"
            variant="accent"
          />
        </div>
      </section>

      {/* Custom Validation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Validation</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Upload
            label="Image Validation"
            validator={(file) => {
              if (!file.type.startsWith("image/")) {
                return "Only image files are allowed";
              }
              if (file.size > 5 * 1024 * 1024) {
                return "Image must be less than 5MB";
              }
              return true;
            }}
            helperText="Images only, max 5MB"
            variant="primary"
          />
          <Upload
            label="Specific Extensions"
            validator={(file) => {
              const allowedExtensions = [".jpg", ".png", ".gif"];
              const extension = file.name
                .toLowerCase()
                .slice(file.name.lastIndexOf("."));
              if (!allowedExtensions.includes(extension)) {
                return "Only JPG, PNG, and GIF files are allowed";
              }
              return true;
            }}
            helperText="JPG, PNG, or GIF only"
            variant="accent"
          />
        </div>
      </section>

      {/* With Preview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Preview</h2>
        <Upload
          multiple
          accept="image/*"
          showPreview
          label="Image Upload with Preview"
          dragText="Upload images to see preview"
          helperText="Preview thumbnails will be shown for images"
          variant="primary"
        />
      </section>

      {/* Auto Upload */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Auto Upload</h2>
        <Upload
          multiple
          autoUpload
          customUpload={mockUpload}
          label="Auto Upload"
          dragText="Files will upload automatically"
          helperText="Upload starts immediately after file selection"
          variant="success"
          onUploadStart={(file) => console.log("Upload started:", file.name)}
          onUploadSuccess={(file) => console.log("Upload success:", file.name)}
          onUploadError={(file, error) =>
            console.log("Upload error:", file.name, error)
          }
        />
      </section>

      {/* Controlled Upload */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Controlled Upload</h2>
        <Upload
          multiple
          fileList={files}
          onChange={setFiles}
          label="Controlled Upload"
          dragText="Upload files with state control"
          variant="primary"
        />
        <div className="text-sm text-muted-foreground">
          Files uploaded: {files.length}
        </div>
      </section>

      {/* Without File List */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Without File List</h2>
        <Upload
          multiple
          showFileList={false}
          label="No File List"
          dragText="File list is hidden"
          helperText="Upload without showing file list"
          variant="ghost"
        />
      </section>

      {/* Disabled & Read-only */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">States</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Upload
            disabled
            label="Disabled"
            dragText="Upload is disabled"
            variant="default"
          />
          <Upload
            readOnly
            label="Read-only"
            dragText="Upload is read-only"
            variant="ghost"
            defaultFileList={[
              {
                id: "1",
                file: new File([""], "readonly-file.txt"),
                name: "readonly-file.txt",
                size: 1024,
                type: "text/plain",
                status: "success",
              },
            ]}
          />
        </div>
      </section>

      {/* Error State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Error State</h2>
        <Upload
          label="With Error"
          error="Failed to upload file. Please try again."
          variant="error"
        />
      </section>

      {/* Real-World Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Real-World Examples</h2>

        {/* Profile Picture Upload */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Profile Picture Upload</h3>
          <Upload
            uploadType="avatar"
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            label="Profile Picture"
            helperText="Upload your profile picture (max 5MB)"
            variant="primary"
            validator={(file) => {
              if (!file.type.startsWith("image/")) {
                return "Only image files allowed";
              }
              return true; // In real app, validate dimensions
            }}
          />
        </div>

        {/* Document Upload */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Document Upload</h3>
          <Upload
            multiple
            maxFiles={5}
            accept=".pdf,.doc,.docx,.txt"
            maxSize={10 * 1024 * 1024}
            label="Upload Documents"
            dragText="Drag and drop your documents here"
            helperText="PDF, DOC, DOCX, or TXT files (max 10MB each, up to 5 files)"
            variant="info"
          />
        </div>

        {/* Image Gallery Upload */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Image Gallery Upload</h3>
          <Upload
            multiple
            accept="image/*"
            showPreview
            autoUpload
            customUpload={mockUpload}
            maxFiles={10}
            maxSize={5 * 1024 * 1024}
            label="Upload Images"
            dragText="Upload multiple images for your gallery"
            helperText="Up to 10 images, max 5MB each"
            variant="success"
            size="lg"
          />
        </div>

        {/* Resume Upload */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Resume Upload</h3>
          <Upload
            accept=".pdf"
            maxSize={2 * 1024 * 1024}
            label="Upload Resume"
            dragText="Drop your resume here"
            helperText="PDF only, max 2MB"
            variant="accent"
            validator={(file) => {
              if (file.type !== "application/pdf") {
                return "Only PDF files are allowed";
              }
              if (file.size > 2 * 1024 * 1024) {
                return "File must be less than 2MB";
              }
              return true;
            }}
          />
        </div>
      </section>

      {/* Image Editing */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Image Editing</h2>
        <p className="text-muted-foreground">
          Crop and adjust images before uploading. Click the edit icon to open
          the image editor.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Free Crop */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Free Crop</h3>
            <Upload
              accept="image/*"
              enableImageEdit
              label="Upload & Edit Image"
              dragText="Drop image to upload and edit"
              helperText="Edit images with zoom, rotate, and crop"
              variant="primary"
              onImageCrop={(file, cropData) => {
                console.log("Image cropped:", file.name, cropData);
              }}
            />
          </div>

          {/* Square Aspect Ratio */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Square Crop (1:1)</h3>
            <Upload
              accept="image/*"
              enableImageEdit
              cropAspectRatio={1}
              uploadType="avatar"
              label="Profile Picture"
              helperText="Square crop for avatars"
              variant="accent"
              onImageCrop={(file, cropData) => {
                console.log("Avatar cropped:", file.name, cropData);
              }}
            />
          </div>

          {/* Wide Aspect Ratio */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Wide Crop (16:9)</h3>
            <Upload
              accept="image/*"
              enableImageEdit
              cropAspectRatio={16 / 9}
              uploadType="image"
              label="Banner Image"
              helperText="Wide format for banners and headers"
              variant="success"
              onImageCrop={(file, cropData) => {
                console.log("Banner cropped:", file.name, cropData);
              }}
            />
          </div>

          {/* Multiple Images with Editing */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Multiple Images</h3>
            <Upload
              accept="image/*"
              multiple
              maxFiles={5}
              enableImageEdit
              label="Gallery Upload"
              dragText="Upload up to 5 images"
              helperText="Edit each image individually"
              variant="info"
              onImageCrop={(file, cropData) => {
                console.log("Gallery image cropped:", file.name, cropData);
              }}
            />
          </div>
        </div>
      </section>

      {/* With Callbacks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">With Callbacks</h2>
        <Upload
          multiple
          autoUpload
          customUpload={mockUpload}
          label="Upload with Callbacks"
          dragText="Check console for callback logs"
          helperText="All callbacks are logged to console"
          variant="primary"
          onFileAdd={(file) => console.log("File added:", file)}
          onFileRemove={(file) => console.log("File removed:", file)}
          onUploadStart={(file) => console.log("Upload started:", file.name)}
          onUploadProgress={(file, progress) =>
            console.log(`${file.name}: ${progress}%`)
          }
          onUploadSuccess={(file) => console.log("Upload success:", file.name)}
          onUploadError={(file, error) =>
            console.log("Upload error:", file.name, error)
          }
          onValidationError={(file, error) =>
            console.log("Validation error:", file.name, error)
          }
        />
      </section>
    </div>
  );
}
