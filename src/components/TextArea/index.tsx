import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { TextAreaProps } from "./TextArea.types";
import { X, Loader2 } from "lucide-react";

/**
 * TextArea Component
 *
 * Advanced multi-line text input with auto-resize, character count,
 * validation, and beautiful styling.
 *
 * @variant default | primary | secondary | accent | success | warning | error | info | outline | ghost | glass
 * @size sm | md | lg
 */

/**
 * TextArea variants
 */
const textAreaVariants = cva(
  [
    "w-full rounded-lg border-2 transition-all duration-300 resize-none",
    "focus:outline-none focus:ring-4 focus:ring-offset-2",
    "placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background text-foreground",
          "focus:border-primary focus:ring-primary/50",
          "hover:border-foreground/60",
        ],
        primary: [
          "border-primary/40 bg-primary/5 text-foreground",
          "focus:border-primary focus:ring-primary/50",
          "hover:border-primary/60",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/5 text-foreground",
          "focus:border-secondary focus:ring-secondary/50",
          "hover:border-secondary/60",
        ],
        accent: [
          "border-accent/40 bg-accent/5 text-foreground",
          "focus:border-accent focus:ring-accent/50",
          "hover:border-accent/60",
        ],
        success: [
          "border-success/40 bg-success/5 text-foreground",
          "focus:border-success focus:ring-success/50",
          "hover:border-success/60",
        ],
        warning: [
          "border-warning/40 bg-warning/5 text-foreground",
          "focus:border-warning focus:ring-warning/50",
          "hover:border-warning/60",
        ],
        error: [
          "border-destructive/40 bg-destructive/5 text-foreground",
          "focus:border-destructive focus:ring-destructive/50",
          "hover:border-destructive/60",
        ],
        info: [
          "border-info/40 bg-info/5 text-foreground",
          "focus:border-info focus:ring-info/50",
          "hover:border-info/60",
        ],
        outline: [
          "border-border bg-transparent text-foreground",
          "focus:border-primary focus:ring-primary/50",
          "hover:border-foreground/60",
        ],
        ghost: [
          "border-transparent bg-muted/30 text-foreground",
          "focus:border-primary focus:ring-primary/50",
          "hover:bg-muted/50",
        ],
        glass: [
          "border-white/20 bg-white/10 text-foreground backdrop-blur-xl",
          "focus:border-primary/50 focus:ring-primary/30",
          "hover:border-white/30",
        ],
      },
      size: {
        sm: "px-3 py-2 text-sm min-h-[80px]",
        md: "px-4 py-2.5 text-base min-h-[120px]",
        lg: "px-5 py-3 text-lg min-h-[160px]",
      },
      rounded: {
        default: "rounded-lg",
        full: "rounded-2xl",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
    },
  }
);

/**
 * Character count variants
 */
const countVariants = cva(
  ["absolute text-xs font-medium transition-colors duration-200"],
  {
    variants: {
      position: {
        "top-right": "top-2 right-2",
        "bottom-right": "bottom-2 right-2",
        "bottom-left": "bottom-2 left-2",
      },
      status: {
        normal: "text-muted-foreground",
        warning: "text-warning",
        error: "text-destructive",
      },
    },
    defaultVariants: {
      position: "bottom-right",
      status: "normal",
    },
  }
);

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
