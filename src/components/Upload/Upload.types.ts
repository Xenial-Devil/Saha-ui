import React from "react";

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
  rotate: number;
}

export interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: "uploading" | "success" | "error" | "pending";
  progress?: number;
  error?: string;
  preview?: string;
  cropData?: CropData;
  croppedPreview?: string;
}

export interface UploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "type" | "size"
  > {
  // Styling
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "outline"
    | "ghost"
    | "glass";
  size?: "sm" | "md" | "lg";
  rounded?: "default" | "full" | "none";

  // Upload Type
  uploadType?: "button" | "dragger" | "avatar" | "image";

  // File Restrictions
  accept?: string; // e.g., "image/*", ".pdf,.doc", etc.
  maxSize?: number; // in bytes
  maxFiles?: number;
  minFiles?: number;

  // Validation
  validator?: (file: File) => boolean | string;

  // Labels & Messages
  label?: string;
  helperText?: string;
  error?: string;
  buttonText?: string;
  dragText?: string;
  dragActiveText?: string;

  // Features
  multiple?: boolean;
  showFileList?: boolean;
  showPreview?: boolean;
  allowRemove?: boolean;
  allowRetry?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  // Upload Control
  autoUpload?: boolean;
  customUpload?: (file: File) => Promise<void>;

  // File List
  fileList?: UploadFile[];
  defaultFileList?: UploadFile[];

  // Callbacks
  onChange?: (files: UploadFile[]) => void;
  onFileAdd?: (file: UploadFile) => void;
  onFileRemove?: (file: UploadFile) => void;
  onUploadStart?: (file: UploadFile) => void;
  onUploadProgress?: (file: UploadFile, progress: number) => void;
  onUploadSuccess?: (file: UploadFile) => void;
  onUploadError?: (file: UploadFile, error: string) => void;
  onValidationError?: (file: File, error: string) => void;

  // Preview
  previewImage?: (file: UploadFile) => void;

  // Image Editing (for images only)
  enableImageEdit?: boolean;
  cropAspectRatio?: number; // e.g., 1 for square, 16/9 for widescreen
  showImageEditor?: boolean;
  onImageCrop?: (file: UploadFile, cropData: CropData) => void;

  // Styling Classes
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  dropzoneClassName?: string;
  fileListClassName?: string;
}
