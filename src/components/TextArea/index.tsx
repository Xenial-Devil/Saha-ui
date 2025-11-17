"use client";

import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { cn } from "../../lib/utils";
// validation removed
import type { TextAreaProps } from "./TextArea.types";
import { X, Loader2 } from "lucide-react";
import { textAreaVariants, countVariants } from "./TextArea.styles";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      // Styling
      variant = "default",
      size = "md",
      rounded = "default",

      // Labels & Messages
      label,
      helperText,
      error,

      // Character Count
      maxLength,
      showCount = false,
      countPosition = "bottom-right",

      // Auto-resize
      autoResize = false,
      minRows = 3,
      maxRows,

      // Advanced Features
      clearable = false,
      onClear,

      // Validation
      required = false,
      pattern,
      validator,

      // Loading & States
      loading = false,
      readOnly = false,
      disabled = false,

      // Styling Classes
      className,
      containerClassName,
      labelClassName,
      textareaClassName,

      // Native props
      value: controlledValue,
      defaultValue,
      onChange,
      rows,

      // Callbacks
      onValueChange,

      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue || ""
    );
    const [validationError, setValidationError] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;
    const currentLength = String(value).length;

    // Calculate character count status
    const getCountStatus = () => {
      if (!maxLength) return "normal";
      const percentage = (currentLength / maxLength) * 100;
      if (percentage >= 100) return "error";
      if (percentage >= 90) return "warning";
      return "normal";
    };

    // Auto-resize functionality
    useEffect(() => {
      if (!autoResize || !textareaRef.current) return;

      const textarea = textareaRef.current;
      textarea.style.height = "auto";

      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const minHeight = minRows ? lineHeight * minRows : 0;
      const maxHeight = maxRows ? lineHeight * maxRows : Infinity;

      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);

      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
    }, [value, autoResize, minRows, maxRows]);

    // development-only validation removed

    // Validation
    const validateValue = (val: string): boolean => {
      if (required && !val.trim()) {
        setValidationError("This field is required");
        return false;
      }

      if (pattern && !pattern.test(val)) {
        setValidationError("Invalid format");
        return false;
      }

      if (validator) {
        const result = validator(val);
        if (result !== true) {
          setValidationError(
            typeof result === "string" ? result : "Invalid value"
          );
          return false;
        }
      }

      setValidationError("");
      return true;
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      // Check maxLength
      if (maxLength && newValue.length > maxLength) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }

      validateValue(newValue);
      onChange?.(e);
      onValueChange?.(newValue);
    };

    const handleClear = () => {
      const newValue = "";
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      setValidationError("");
      onClear?.();
      onValueChange?.(newValue);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      // Prevent input if maxLength reached
      if (
        maxLength &&
        currentLength >= maxLength &&
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        e.preventDefault();
      }
    };

    const combinedRef = (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const displayError = error || validationError;

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {/* Label & Count (Top) */}
        {(label || (showCount && countPosition === "top-right")) && (
          <div className="flex items-center justify-between">
            {label && (
              <label
                className={cn(
                  "block text-sm font-semibold text-foreground",
                  labelClassName
                )}
              >
                {label}
                {required && <span className="ml-1 text-destructive">*</span>}
              </label>
            )}
            {showCount && countPosition === "top-right" && (
              <span
                className={cn(
                  countVariants({
                    position: "top-right",
                    status: getCountStatus(),
                  }),
                  "relative top-auto right-auto"
                )}
              >
                {currentLength}
                {maxLength && `/${maxLength}`}
              </span>
            )}
          </div>
        )}

        {/* TextArea Container */}
        <div className={cn("relative", className)}>
          <textarea
            ref={combinedRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled || loading}
            readOnly={readOnly}
            required={required}
            rows={autoResize ? minRows : rows}
            maxLength={maxLength}
            className={cn(
              textAreaVariants({ variant, size, rounded }),
              displayError &&
                "border-destructive focus:border-destructive focus:ring-destructive/50",
              clearable && "pr-10",
              showCount &&
                countPosition !== "top-right" &&
                (countPosition === "bottom-right" ? "pb-8" : "pb-8 pl-20"),
              textareaClassName
            )}
            {...props}
          />

          {/* Loading Spinner */}
          {loading && (
            <div className="absolute right-3 top-3">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Clear Button */}
          {clearable && value && !disabled && !readOnly && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                "absolute right-3 top-3 rounded-md p-1",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-muted/50 transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
              aria-label="Clear"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Character Count (Inside) */}
          {showCount && countPosition !== "top-right" && (
            <span
              className={cn(
                countVariants({
                  position: countPosition,
                  status: getCountStatus(),
                })
              )}
            >
              {currentLength}
              {maxLength && `/${maxLength}`}
            </span>
          )}
        </div>

        {/* Error/Helper Text */}
        {displayError && (
          <p className="text-sm font-medium text-destructive">{displayError}</p>
        )}
        {!displayError && helperText && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
