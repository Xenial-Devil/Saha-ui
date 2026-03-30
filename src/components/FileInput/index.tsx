"use client";

import React, { forwardRef, useState, useCallback, useRef } from "react";
import { cn } from "../../lib/utils";
import type { FileInputProps } from "./FileInput.types";
import {
  fileInputContainerVariants,
  fileInputLabelVariants,
  fileInputDropzoneVariants,
  fileInputIconVariants,
  filePreviewContainerVariants,
  filePreviewItemVariants,
  fileRemoveButtonVariants,
  fileHelperTextVariants,
} from "./FileInput.styles";

/** Upload icon @private */
const UploadIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

/** File icon @private */
const FileIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

/** X icon @private */
const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const isImageFile = (file: File): boolean => file.type.startsWith("image/");

/**
 * FileInput Component
 *
 * A drag-and-drop file input with validation, previews, and multi-file support.
 *
 * @component
 * @example
 * <FileInput label="Upload files" accept="image/*" multiple maxSize={5242880} />
 *
 * @example
 * <FileInput variant="glass" label="Documents" accept=".pdf,.doc,.docx" />
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      value,
      onChange,
      accept,
      multiple = false,
      maxFiles = Infinity,
      maxSize,
      minSize,
      variant = "default",
      size = "md",
      label,
      helperText,
      error: externalError,
      disabled = false,
      required = false,
      placeholder,
      description,
      showPreview = true,
      icon,
      fullWidth = false,
      className,
      containerClassName,
      onReject,
      validator,
      name,
      id,
    },
    ref,
  ) => {
    const [files, setFiles] = useState<File[]>(value || []);
    const [isDragActive, setIsDragActive] = useState(false);
    const [internalError, setInternalError] = useState<string | null>(null);
    const [previews, setPreviews] = useState<Map<string, string>>(new Map());
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = value !== undefined;
    const currentFiles = isControlled ? value : files;
    const error = externalError || internalError;
    const fallbackId = React.useId();
    const inputId = id || `file-input-${fallbackId}`;

    const generatePreview = useCallback(
      (file: File): Promise<string | undefined> => {
        if (!isImageFile(file)) return Promise.resolve(undefined);
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => resolve(undefined);
          reader.readAsDataURL(file);
        });
      },
      [],
    );

    const validateFile = useCallback(
      (file: File): string | null => {
        if (maxSize && file.size > maxSize) {
          return `File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`;
        }
        if (minSize && file.size < minSize) {
          return `File "${file.name}" is below minimum size of ${formatFileSize(minSize)}`;
        }
        if (accept) {
          const acceptedTypes = accept.split(",").map((t) => t.trim());
          const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
          const isAccepted = acceptedTypes.some((type) => {
            if (type.startsWith("."))
              return fileExtension === type.toLowerCase();
            if (type.endsWith("/*"))
              return file.type.startsWith(type.replace("/*", "/"));
            return file.type === type;
          });
          if (!isAccepted)
            return `File type "${file.type || fileExtension}" is not accepted`;
        }
        if (validator) return validator(file);
        return null;
      },
      [accept, maxSize, minSize, validator],
    );

    const processFiles = useCallback(
      async (newFiles: FileList | File[]) => {
        setInternalError(null);
        const fileArray = Array.from(newFiles);
        const totalFiles = (currentFiles?.length || 0) + fileArray.length;

        if (!multiple && fileArray.length > 1) {
          setInternalError("Only one file allowed");
          return;
        }
        if (totalFiles > maxFiles) {
          setInternalError(
            `Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed`,
          );
          return;
        }

        const accepted: File[] = [];
        const rejected: File[] = [];

        for (const file of fileArray) {
          const validationError = validateFile(file);
          if (validationError) {
            rejected.push(file);
            setInternalError(validationError);
          } else {
            accepted.push(file);
            // Generate preview
            const preview = await generatePreview(file);
            if (preview) {
              setPreviews((prev) =>
                new Map(prev).set(file.name + file.size, preview),
              );
            }
          }
        }

        if (rejected.length > 0) {
          onReject?.(rejected, internalError || "Validation failed");
        }

        if (accepted.length > 0) {
          const updated = multiple
            ? [...(currentFiles || []), ...accepted]
            : accepted;
          if (!isControlled) setFiles(updated);
          onChange?.(updated);
        }
      },
      [
        currentFiles,
        multiple,
        maxFiles,
        validateFile,
        generatePreview,
        isControlled,
        onChange,
        onReject,
        internalError,
      ],
    );

    const removeFile = useCallback(
      (index: number) => {
        const updated = [...(currentFiles || [])];
        const removed = updated.splice(index, 1)[0];
        if (removed) {
          setPreviews((prev) => {
            const next = new Map(prev);
            next.delete(removed.name + removed.size);
            return next;
          });
        }
        if (!isControlled) setFiles(updated);
        onChange?.(updated);
        setInternalError(null);
      },
      [currentFiles, isControlled, onChange],
    );

    const handleClick = () => inputRef.current?.click();

    const handleDragEnter = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (disabled) return;
        processFiles(e.dataTransfer.files);
      },
      [disabled, processFiles],
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          processFiles(e.target.files);
        }
        // Reset input so same file can be selected again
        e.target.value = "";
      },
      [processFiles],
    );

    const defaultPlaceholder = isDragActive
      ? "Drop files here..."
      : placeholder || "Click to upload or drag and drop";
    const defaultDescription =
      description ||
      (accept
        ? `Accepted: ${accept}`
        : maxSize
          ? `Max size: ${formatFileSize(maxSize)}`
          : undefined);

    return (
      <div
        className={cn(
          fileInputContainerVariants({ fullWidth }),
          containerClassName,
        )}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={fileInputLabelVariants({ disabled })}
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Dropzone */}
        <div
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            fileInputDropzoneVariants({
              variant,
              size,
              isDragActive,
              error: !!error,
              disabled,
            }),
            className,
          )}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={label || "File upload"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick();
          }}
        >
          {icon || (
            <UploadIcon
              className={fileInputIconVariants({ size, isDragActive })}
            />
          )}

          <div className="text-center">
            <p className="font-medium text-foreground">{defaultPlaceholder}</p>
            {defaultDescription && (
              <p className="text-muted-foreground text-xs mt-1">
                {defaultDescription}
              </p>
            )}
          </div>

          <input
            ref={(node) => {
              (
                inputRef as React.MutableRefObject<HTMLInputElement | null>
              ).current = node;
              if (typeof ref === "function") ref(node);
              else if (ref)
                (
                  ref as React.MutableRefObject<HTMLInputElement | null>
                ).current = node;
            }}
            id={inputId}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            name={name}
            onChange={handleInputChange}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>

        {/* File previews */}
        {showPreview && currentFiles && currentFiles.length > 0 && (
          <div className={filePreviewContainerVariants({ size })}>
            {currentFiles.map((file, index) => {
              const previewUrl = previews.get(file.name + file.size);
              return (
                <div
                  key={`${file.name}-${file.size}-${index}`}
                  className={filePreviewItemVariants({ size })}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="h-8 w-8 rounded object-cover shrink-0"
                    />
                  ) : (
                    <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate max-w-[150px]">
                      {file.name}
                    </span>
                    <span className="text-muted-foreground text-[10px]">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className={fileRemoveButtonVariants({ size })}
                    aria-label={`Remove ${file.name}`}
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {(error || helperText) && (
          <p
            className={fileHelperTextVariants({ error: !!error })}
            role={error ? "alert" : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

FileInput.displayName = "FileInput";

export default FileInput;
