import {
  forwardRef,
  useState,
  useRef,
  DragEvent,
  ChangeEvent,
  useEffect,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { UploadProps, UploadFile, CropData } from "./Upload.types";
import {
  Upload as UploadIcon,
  File,
  Image as ImageIcon,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  RotateCcw,
  Eye,
  Edit,
} from "lucide-react";
import { ImageEditor } from "./ImageEditor";

/**
 * Upload Component
 *
 * Advanced file upload with drag & drop, preview, validation,
 * and beautiful styling.
 *
 * @variant default | primary | secondary | accent | success | warning | error | info | outline | ghost | glass
 * @size sm | md | lg
 * @uploadType button | dragger | avatar | image
 */

/**
 * Upload button/dropzone variants
 */
const uploadVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 rounded-lg",
    "border-2 border-dashed transition-all duration-300",
    "cursor-pointer hover:border-opacity-80",
    "focus-within:outline-none focus-within:ring-4 focus-within:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background text-foreground",
          "hover:bg-muted/30 focus-within:border-primary focus-within:ring-primary/50",
        ],
        primary: [
          "border-primary/40 bg-primary/5 text-foreground",
          "hover:bg-primary/10 focus-within:border-primary focus-within:ring-primary/50",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/5 text-foreground",
          "hover:bg-secondary/10 focus-within:border-secondary focus-within:ring-secondary/50",
        ],
        accent: [
          "border-accent/40 bg-accent/5 text-foreground",
          "hover:bg-accent/10 focus-within:border-accent focus-within:ring-accent/50",
        ],
        success: [
          "border-success/40 bg-success/5 text-foreground",
          "hover:bg-success/10 focus-within:border-success focus-within:ring-success/50",
        ],
        warning: [
          "border-warning/40 bg-warning/5 text-foreground",
          "hover:bg-warning/10 focus-within:border-warning focus-within:ring-warning/50",
        ],
        error: [
          "border-destructive/40 bg-destructive/5 text-foreground",
          "hover:bg-destructive/10 focus-within:border-destructive focus-within:ring-destructive/50",
        ],
        info: [
          "border-info/40 bg-info/5 text-foreground",
          "hover:bg-info/10 focus-within:border-info focus-within:ring-info/50",
        ],
        outline: [
          "border-border bg-transparent text-foreground",
          "hover:bg-muted/20 focus-within:border-primary focus-within:ring-primary/50",
        ],
        ghost: [
          "border-transparent bg-muted/30 text-foreground",
          "hover:bg-muted/50 focus-within:border-primary focus-within:ring-primary/50",
        ],
        glass: [
          "border-white/20 bg-white/10 text-foreground backdrop-blur-xl",
          "hover:bg-white/20 focus-within:border-primary/50 focus-within:ring-primary/30",
        ],
      },
      size: {
        sm: "px-4 py-3 text-sm min-h-[80px]",
        md: "px-6 py-4 text-base min-h-[120px]",
        lg: "px-8 py-6 text-lg min-h-[160px]",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-2xl",
        none: "rounded-none",
      },
      uploadType: {
        button: "min-h-0 py-2 px-4 inline-flex w-auto border-solid",
        dragger: "w-full flex-col",
        avatar: "w-32 h-32 rounded-full border-solid p-0 overflow-hidden",
        image: "w-full aspect-video border-solid overflow-hidden",
      },
      isDragActive: {
        true: "border-primary bg-primary/20 scale-[1.02]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
      uploadType: "dragger",
      isDragActive: false,
    },
  }
);

/**
 * File item variants
 */
const fileItemVariants = cva(
  [
    "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
    "hover:bg-muted/30",
  ],
  {
    variants: {
      status: {
        pending: "border-border bg-background",
        uploading: "border-primary/30 bg-primary/5",
        success: "border-success/30 bg-success/5",
        error: "border-destructive/30 bg-destructive/5",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

// Helper function to generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 11);

export const Upload = forwardRef<HTMLInputElement, UploadProps>(
  (
    {
      // Styling
      variant = "default",
      size = "md",
      rounded = "default",

      // Upload Type
      uploadType = "dragger",

      // File Restrictions
      accept,
      maxSize,
      maxFiles,
      minFiles,

      // Validation
      validator,

      // Labels & Messages
      label,
      helperText,
      error,
      buttonText = "Choose File",
      dragText = "Click or drag file to this area to upload",
      dragActiveText = "Drop the files here...",

      // Features
      multiple = false,
      showFileList = true,
      showPreview = true,
      allowRemove = true,
      allowRetry = true,
      disabled = false,
      readOnly = false,

      // Upload Control
      autoUpload = false,
      customUpload,

      // File List
      fileList: controlledFileList,
      defaultFileList = [],

      // Callbacks
      onChange,
      onFileAdd,
      onFileRemove,
      onUploadStart,
      onUploadProgress,
      onUploadSuccess,
      onUploadError,
      onValidationError,
      previewImage,

      // Image Editing
      enableImageEdit = false,
      cropAspectRatio,
      showImageEditor = true,
      onImageCrop,

      // Styling Classes
      className,
      containerClassName,
      labelClassName,
      dropzoneClassName,
      fileListClassName,

      ...props
    },
    ref
  ) => {
    const [uncontrolledFileList, setUncontrolledFileList] =
      useState<UploadFile[]>(defaultFileList);
    const [isDragActive, setIsDragActive] = useState(false);
    const [_dragCounter, setDragCounter] = useState(0);
    const [editingFile, setEditingFile] = useState<UploadFile | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isControlled = controlledFileList !== undefined;
    const fileList = isControlled ? controlledFileList : uncontrolledFileList;

    // Create preview URL for images
    const createPreview = (file: File): string | undefined => {
      if (file.type.startsWith("image/")) {
        return URL.createObjectURL(file);
      }
      return undefined;
    };

    // Validate file
    const validateFile = (file: File): string | null => {
      // Max size validation
      if (maxSize && file.size > maxSize) {
        return `File size must be less than ${formatFileSize(maxSize)}`;
      }

      // Custom validator
      if (validator) {
        const result = validator(file);
        if (result !== true) {
          return typeof result === "string" ? result : "Invalid file";
        }
      }

      return null;
    };

    // Process files
    const processFiles = (files: FileList | File[]) => {
      const filesArray = Array.from(files);

      // Check max files limit
      if (maxFiles && fileList.length + filesArray.length > maxFiles) {
        onValidationError?.(
          filesArray[0],
          `Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed`
        );
        return;
      }

      const newFiles: UploadFile[] = filesArray.map((file) => {
        const validationError = validateFile(file);

        const uploadFile: UploadFile = {
          id: generateId(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: validationError
            ? "error"
            : autoUpload
            ? "uploading"
            : "pending",
          error: validationError || undefined,
          preview: showPreview ? createPreview(file) : undefined,
          progress: 0,
        };

        if (validationError) {
          onValidationError?.(file, validationError);
        } else {
          onFileAdd?.(uploadFile);

          // Auto upload if enabled
          if (autoUpload && customUpload) {
            handleUpload(uploadFile);
          }
        }

        return uploadFile;
      });

      const updatedFileList = [...fileList, ...newFiles];

      if (!isControlled) {
        setUncontrolledFileList(updatedFileList);
      }

      onChange?.(updatedFileList);
    };

    // Handle file upload
    const handleUpload = async (uploadFile: UploadFile) => {
      if (!customUpload) return;

      onUploadStart?.(uploadFile);

      try {
        // Simulate progress (replace with real upload logic)
        const updateProgress = (progress: number) => {
          const updatedFiles = fileList.map((f) =>
            f.id === uploadFile.id ? { ...f, progress } : f
          );
          if (!isControlled) {
            setUncontrolledFileList(updatedFiles);
          }
          onUploadProgress?.(uploadFile, progress);
        };

        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          updateProgress(i);
        }

        await customUpload(uploadFile.file);

        const updatedFiles = fileList.map((f) =>
          f.id === uploadFile.id
            ? { ...f, status: "success" as const, progress: 100 }
            : f
        );

        if (!isControlled) {
          setUncontrolledFileList(updatedFiles);
        }

        onChange?.(updatedFiles);
        onUploadSuccess?.(uploadFile);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Upload failed";
        const updatedFiles = fileList.map((f) =>
          f.id === uploadFile.id
            ? { ...f, status: "error" as const, error: errorMessage }
            : f
        );

        if (!isControlled) {
          setUncontrolledFileList(updatedFiles);
        }

        onChange?.(updatedFiles);
        onUploadError?.(uploadFile, errorMessage);
      }
    };

    // Handle input change
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFiles(files);
      }
    };

    // Handle drag events (fixed with counter to prevent flickering)
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled && !readOnly) {
        setDragCounter((prev) => prev + 1);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
          setIsDragActive(true);
        }
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragCounter((prev) => {
        const newCount = prev - 1;
        if (newCount === 0) {
          setIsDragActive(false);
        }
        return newCount;
      });
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      setDragCounter(0);

      if (disabled || readOnly) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        processFiles(files);
      }
    };

    // Handle file remove
    const handleRemove = (fileToRemove: UploadFile) => {
      if (!allowRemove || readOnly) return;

      const updatedFiles = fileList.filter((f) => f.id !== fileToRemove.id);

      // Revoke preview URL
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      if (!isControlled) {
        setUncontrolledFileList(updatedFiles);
      }

      onChange?.(updatedFiles);
      onFileRemove?.(fileToRemove);
    };

    // Handle retry upload
    const handleRetry = (uploadFile: UploadFile) => {
      if (!allowRetry || !customUpload) return;
      handleUpload(uploadFile);
    };

    // Handle edit image
    const handleEditImage = (file: UploadFile) => {
      if (!enableImageEdit || !file.type.startsWith("image/")) return;
      setEditingFile(file);
    };

    // Handle save cropped image
    const handleSaveCrop = (cropData: CropData, croppedImage: string) => {
      if (!editingFile) return;

      const updatedFiles = fileList.map((f) =>
        f.id === editingFile.id
          ? { ...f, cropData, croppedPreview: croppedImage }
          : f
      );

      if (!isControlled) {
        setUncontrolledFileList(updatedFiles);
      }

      onChange?.(updatedFiles);
      onImageCrop?.(editingFile, cropData);
      setEditingFile(null);
    };

    // Handle cancel crop
    const handleCancelCrop = () => {
      setEditingFile(null);
    };

    // Handle click
    const handleClick = () => {
      if (!disabled && !readOnly) {
        inputRef.current?.click();
      }
    };

    // Combine refs
    const combinedRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Cleanup preview URLs on unmount
    useEffect(() => {
      return () => {
        fileList.forEach((file) => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview);
          }
        });
      };
    }, []);

    const renderFileIcon = (file: UploadFile) => {
      if (file.type.startsWith("image/")) {
        return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
      }
      return <File className="h-5 w-5 text-muted-foreground" />;
    };

    const renderFileStatus = (file: UploadFile) => {
      switch (file.status) {
        case "uploading":
          return (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">
                {file.progress}%
              </span>
            </div>
          );
        case "success":
          return <CheckCircle className="h-5 w-5 text-success" />;
        case "error":
          return (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              {allowRetry && (
                <button
                  type="button"
                  onClick={() => handleRetry(file)}
                  className="text-xs text-primary hover:underline"
                  title="Retry upload"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className={cn("space-y-3", containerClassName)}>
        {/* Label */}
        {label && (
          <label
            className={cn(
              "block text-sm font-semibold text-foreground",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        {/* Upload Area */}
        <div
          onClick={handleClick}
          onDragEnter={uploadType !== "button" ? handleDragEnter : undefined}
          onDragLeave={uploadType !== "button" ? handleDragLeave : undefined}
          onDragOver={uploadType !== "button" ? handleDragOver : undefined}
          onDrop={uploadType !== "button" ? handleDrop : undefined}
          className={cn(
            uploadVariants({
              variant,
              size: uploadType === "button" ? "sm" : size,
              rounded,
              uploadType,
              isDragActive,
            }),
            disabled && "pointer-events-none",
            className,
            dropzoneClassName
          )}
        >
          <input
            ref={combinedRef}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleInputChange}
            className="sr-only"
            {...props}
          />

          {/* Button Type */}
          {uploadType === "button" && (
            <div className="flex items-center gap-2">
              <UploadIcon className="h-4 w-4" />
              <span>{buttonText}</span>
            </div>
          )}

          {/* Dragger Type */}
          {uploadType === "dragger" && (
            <>
              <UploadIcon className="h-12 w-12 text-muted-foreground" />
              <p className="text-base font-medium">
                {isDragActive ? dragActiveText : dragText}
              </p>
              {helperText && !isDragActive && (
                <p className="text-sm text-muted-foreground">{helperText}</p>
              )}
            </>
          )}

          {/* Avatar/Image Type */}
          {(uploadType === "avatar" || uploadType === "image") && (
            <div className="relative flex h-full w-full items-center justify-center group">
              {fileList.length > 0 && fileList[0].preview ? (
                <>
                  <img
                    src={fileList[0].croppedPreview || fileList[0].preview}
                    alt={fileList[0].name}
                    className="h-full w-full object-cover"
                  />
                  {/* Edit/Remove Overlay */}
                  {!readOnly && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {enableImageEdit &&
                        fileList[0].type.startsWith("image/") && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditImage(fileList[0]);
                            }}
                            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            title="Edit image"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                        )}
                      {allowRemove && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(fileList[0]);
                          }}
                          className="p-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                          title="Remove"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 p-4">
                  <UploadIcon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {uploadType === "avatar" ? "Upload Avatar" : "Upload Image"}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}

        {/* File List */}
        {showFileList &&
          fileList.length > 0 &&
          uploadType !== "avatar" &&
          uploadType !== "image" && (
            <div className={cn("space-y-2", fileListClassName)}>
              {fileList.map((file) => (
                <div
                  key={file.id}
                  className={cn(fileItemVariants({ status: file.status }))}
                >
                  {/* Preview Thumbnail */}
                  {showPreview && file.preview && (
                    <img
                      src={file.croppedPreview || file.preview}
                      alt={file.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  )}

                  {/* File Icon */}
                  {(!showPreview || !file.preview) && renderFileIcon(file)}

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                    {file.error && (
                      <p className="text-xs text-destructive">{file.error}</p>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {file.status === "uploading" &&
                    file.progress !== undefined && (
                      <div className="flex-1 max-w-[150px]">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                  {/* Status */}
                  {renderFileStatus(file)}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {showPreview && file.preview && (
                      <button
                        type="button"
                        onClick={() => previewImage?.(file)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    {enableImageEdit &&
                      file.preview &&
                      file.type.startsWith("image/") &&
                      !readOnly && (
                        <button
                          type="button"
                          onClick={() => handleEditImage(file)}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="Edit image"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                    {allowRemove && !readOnly && (
                      <button
                        type="button"
                        onClick={() => handleRemove(file)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        title="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        {/* Image Editor Modal */}
        {showImageEditor && editingFile && editingFile.preview && (
          <ImageEditor
            imageUrl={editingFile.preview}
            onSave={handleSaveCrop}
            onCancel={handleCancelCrop}
            aspectRatio={cropAspectRatio}
          />
        )}
      </div>
    );
  }
);

Upload.displayName = "Upload";

export default Upload;
