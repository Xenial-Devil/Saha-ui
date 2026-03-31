import React from "react";

export interface FileInputFile {
  file: File;
  id: string;
  preview?: string;
  progress?: number;
  error?: string;
}

export interface FileInputProps {
  /** Selected files (controlled) */
  value?: File[];

  /** Callback when files change */
  onChange?: (files: File[]) => void;

  /** Accepted file types (e.g., "image/*,.pdf") */
  accept?: string;

  /** Allow multiple file selection @default false */
  multiple?: boolean;

  /** Maximum number of files @default Infinity */
  maxFiles?: number;

  /** Maximum file size in bytes */
  maxSize?: number;

  /** Minimum file size in bytes */
  minSize?: number;

  /** Visual variant @default "default" */
  variant?: "default" | "outline" | "filled" | "glass";

  /** Component size @default "md" */
  size?: "sm" | "md" | "lg";

  /** Label text */
  label?: string;

  /** Helper text */
  helperText?: string;

  /** Error message */
  error?: string;

  /** Disabled state */
  disabled?: boolean;

  /** Required field */
  required?: boolean;

  /** Placeholder text */
  placeholder?: string;

  /** Description text shown in dropzone */
  description?: string;

  /** Show file previews @default true */
  showPreview?: boolean;

  /** Custom dropzone icon */
  icon?: React.ReactNode;

  /** Full width mode @default false */
  fullWidth?: boolean;

  /** Additional className */
  className?: string;

  /** Container className */
  containerClassName?: string;

  /** Callback on file rejection */
  onReject?: (files: File[], reason: string) => void;

  /** Custom file validator */
  validator?: (file: File) => string | null;

  /** Name attribute for form submission */
  name?: string;

  /** ID attribute */
  id?: string;
}
