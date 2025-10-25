import {
  forwardRef,
  useState,
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  useEffect,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { TagInputProps } from "./TagInput.types";
import { X } from "lucide-react";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";

/**
 * TagInput Component
 *
 * Input field where users can type and create tags by pressing Enter or Comma.
 * Tags are removable and the component supports validation, duplicates control, and more.
 *
 * @variant default | primary | secondary | accent | success | warning | error | info | outline | ghost | glass
 * @size sm | md | lg
 */

/**
 * Container variants
 */
const tagInputContainerVariants = cva(
  [
    "flex flex-wrap items-center gap-2 rounded-lg border-2 transition-all duration-300",
    "focus-within:ring-4 focus-within:ring-offset-2",
    "min-h-[2.5rem] p-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background",
          "focus-within:border-primary focus-within:ring-primary/50",
        ],
        primary: [
          "border-primary/40 bg-primary/5",
          "focus-within:border-primary focus-within:ring-primary/50",
        ],
        secondary: [
          "border-secondary/40 bg-secondary/5",
          "focus-within:border-secondary focus-within:ring-secondary/50",
        ],
        accent: [
          "border-accent/40 bg-accent/5",
          "focus-within:border-accent focus-within:ring-accent/50",
        ],
        success: [
          "border-success/40 bg-success/5",
          "focus-within:border-success focus-within:ring-success/50",
        ],
        warning: [
          "border-warning/40 bg-warning/5",
          "focus-within:border-warning focus-within:ring-warning/50",
        ],
        error: [
          "border-destructive/40 bg-destructive/5",
          "focus-within:border-destructive focus-within:ring-destructive/50",
        ],
        info: [
          "border-info/40 bg-info/5",
          "focus-within:border-info focus-within:ring-info/50",
        ],
        outline: [
          "border-border bg-transparent",
          "focus-within:border-primary focus-within:ring-primary/50",
        ],
        ghost: [
          "border-transparent bg-muted/30",
          "focus-within:border-primary focus-within:ring-primary/50",
        ],
        glass: [
          "border-white/20 bg-white/10 backdrop-blur-xl",
          "focus-within:border-primary/50 focus-within:ring-primary/30",
        ],
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
);

/**
 * Tag variants
 */
const tagVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-md font-medium transition-all duration-200",
    "animate-in fade-in zoom-in-95",
  ],
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground hover:bg-muted/80",
        primary: "bg-primary/20 text-primary hover:bg-primary/30",
        secondary: "bg-secondary/20 text-secondary hover:bg-secondary/30",
        accent: "bg-accent/20 text-accent hover:bg-accent/30",
        success: "bg-success/20 text-success hover:bg-success/30",
        warning: "bg-warning/20 text-warning hover:bg-warning/30",
        error: "bg-destructive/20 text-destructive hover:bg-destructive/30",
        info: "bg-info/20 text-info hover:bg-info/30",
        outline:
          "border-2 border-border bg-transparent text-foreground hover:bg-muted/50",
        ghost: "bg-transparent text-foreground hover:bg-muted/50",
        glass: "bg-white/10 text-foreground backdrop-blur-sm hover:bg-white/20",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
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
 * Input variants
 */
const inputVariants = cva(
  [
    "flex-1 min-w-[120px] bg-transparent outline-none text-foreground",
    "placeholder:text-muted-foreground",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const TagInput = forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      // Values
      value: controlledValue,
      defaultValue = [],
      onChange,

      // Input props
      placeholder = "Type and press Enter...",
      disabled = false,
      readOnly = false,

      // Validation
      max,
      maxLength,
      minLength,
      pattern,
      validator,
      duplicates = false,

      // Separators
      separators = ["Enter", ","],
      allowPaste = true,

      // Styling
      variant = "default",
      size = "md",
      rounded = "default",

      // Tag customization
      tagVariant,
      tagSize,

      // Labels & Messages
      label,
      helperText,
      error,

      // Callbacks
      onAdd,
      onRemove,
      onError,
      onBlur,
      onFocus,

      // Advanced
      autoFocus = false,
      clearOnBlur = false,
      addOnBlur = false,
      trim = true,
      caseSensitive = false,

      // Styling
      className,
      inputClassName,
      tagClassName,
      containerClassName,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("TagInput");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
        "info",
        "outline",
        "ghost",
        "glass",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate rounded
      validator.validateEnum("rounded", rounded, [
        "none",
        "sm",
        "default",
        "md",
        "lg",
        "xl",
        "full",
      ] as const);

      // Validate numeric props
      if (max !== undefined) {
        validator.validateType("max", max, "number", isValidNumber);
        if (max <= 0) {
          validator.error("max must be greater than 0");
        }
      }

      if (maxLength !== undefined) {
        validator.validateType("maxLength", maxLength, "number", isValidNumber);
        if (maxLength <= 0) {
          validator.error("maxLength must be greater than 0");
        }
      }

      if (minLength !== undefined) {
        validator.validateType("minLength", minLength, "number", isValidNumber);
        if (minLength < 0) {
          validator.error("minLength must be non-negative");
        }
      }

      // Validate boolean props
      validator.validateType("disabled", disabled, "boolean", isValidBoolean);
      validator.validateType("readOnly", readOnly, "boolean", isValidBoolean);
      validator.validateType(
        "duplicates",
        duplicates,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "allowPaste",
        allowPaste,
        "boolean",
        isValidBoolean
      );
      validator.validateType("autoFocus", autoFocus, "boolean", isValidBoolean);
      validator.validateType(
        "clearOnBlur",
        clearOnBlur,
        "boolean",
        isValidBoolean
      );
      validator.validateType("addOnBlur", addOnBlur, "boolean", isValidBoolean);
      validator.validateType("trim", trim, "boolean", isValidBoolean);
      validator.validateType(
        "caseSensitive",
        caseSensitive,
        "boolean",
        isValidBoolean
      );

      // Common validators
      commonValidators.className(validator, className);
    }, [
      variant,
      size,
      rounded,
      max,
      maxLength,
      minLength,
      disabled,
      readOnly,
      duplicates,
      allowPaste,
      autoFocus,
      clearOnBlur,
      addOnBlur,
      trim,
      caseSensitive,
      className,
    ]);

    const [uncontrolledTags, setUncontrolledTags] =
      useState<string[]>(defaultValue);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = controlledValue !== undefined;
    const tags = isControlled ? controlledValue : uncontrolledTags;

    const updateTags = (newTags: string[]) => {
      if (!isControlled) {
        setUncontrolledTags(newTags);
      }
      onChange?.(newTags);
    };

    const normalizeTag = (tag: string) => {
      let normalized = trim ? tag.trim() : tag;
      if (!caseSensitive) {
        normalized = normalized.toLowerCase();
      }
      return normalized;
    };

    const validateTag = (tag: string): boolean | string => {
      // Check if empty
      if (!tag) {
        return "Tag cannot be empty";
      }

      // Check min length
      if (minLength && tag.length < minLength) {
        return `Tag must be at least ${minLength} characters`;
      }

      // Check max length
      if (maxLength && tag.length > maxLength) {
        return `Tag must be at most ${maxLength} characters`;
      }

      // Check pattern
      if (pattern && !pattern.test(tag)) {
        return "Tag format is invalid";
      }

      // Check duplicates
      if (!duplicates) {
        const normalizedTag = normalizeTag(tag);
        const normalizedTags = tags.map((t) => normalizeTag(t));
        if (normalizedTags.includes(normalizedTag)) {
          return "Tag already exists";
        }
      }

      // Check max tags
      if (max && tags.length >= max) {
        return `Maximum ${max} tags allowed`;
      }

      // Custom validator
      if (validator) {
        const result = validator(tag);
        if (result !== true) {
          return typeof result === "string" ? result : "Tag is invalid";
        }
      }

      return true;
    };

    const addTag = (tag: string) => {
      if (disabled || readOnly) return;

      const processedTag = trim ? tag.trim() : tag;
      if (!processedTag) return;

      const validation = validateTag(processedTag);
      if (validation !== true) {
        onError?.(
          typeof validation === "string" ? validation : "Tag is invalid"
        );
        return;
      }

      const newTags = [...tags, processedTag];
      updateTags(newTags);
      setInputValue("");
      onAdd?.(processedTag);
    };

    const removeTag = (index: number) => {
      if (disabled || readOnly) return;

      const tag = tags[index];
      const newTags = tags.filter((_, i) => i !== index);
      updateTags(newTags);
      onRemove?.(tag, index);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;

      // Check if key is a separator
      if (separators.includes(key)) {
        e.preventDefault();
        if (inputValue) {
          addTag(inputValue);
        }
        return;
      }

      // Handle backspace
      if (key === "Backspace" && !inputValue && tags.length > 0) {
        e.preventDefault();
        removeTag(tags.length - 1);
      }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      if (!allowPaste) return;

      const pastedText = e.clipboardData.getData("text");
      const pastedTags = pastedText
        .split(/[,\n\t]/)
        .map((tag) => (trim ? tag.trim() : tag))
        .filter((tag) => tag);

      if (pastedTags.length > 0) {
        e.preventDefault();
        pastedTags.forEach((tag) => addTag(tag));
      }
    };

    const handleInputBlur = () => {
      if (addOnBlur && inputValue) {
        addTag(inputValue);
      } else if (clearOnBlur) {
        setInputValue("");
      }

      onBlur?.();
    };

    const handleInputFocus = () => {
      onFocus?.();
    };

    const handleContainerClick = () => {
      inputRef.current?.focus();
    };

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-semibold text-foreground">
            {label}
            {max && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({tags.length}/{max})
              </span>
            )}
          </label>
        )}

        {/* Container */}
        <div
          onClick={handleContainerClick}
          className={cn(
            tagInputContainerVariants({ variant, disabled }),
            error &&
              "border-destructive focus-within:border-destructive focus-within:ring-destructive/50",
            containerClassName
          )}
        >
          {/* Tags */}
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className={cn(
                tagVariants({
                  variant: tagVariant || variant,
                  size: tagSize || size,
                  rounded,
                }),
                tagClassName
              )}
            >
              <span>{tag}</span>
              {!disabled && !readOnly && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(index);
                  }}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full",
                    "hover:bg-black/10 dark:hover:bg-white/10",
                    "transition-colors duration-200",
                    size === "sm" && "h-3 w-3",
                    size === "md" && "h-4 w-4",
                    size === "lg" && "h-5 w-5"
                  )}
                  aria-label={`Remove ${tag}`}
                >
                  <X
                    className={cn(
                      size === "sm" && "h-2 w-2",
                      size === "md" && "h-3 w-3",
                      size === "lg" && "h-4 w-4"
                    )}
                  />
                </button>
              )}
            </span>
          ))}

          {/* Input */}
          {!disabled && !readOnly && (!max || tags.length < max) && (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              placeholder={tags.length === 0 ? placeholder : ""}
              disabled={disabled}
              readOnly={readOnly}
              autoFocus={autoFocus}
              className={cn(inputVariants({ size }), inputClassName)}
            />
          )}
        </div>

        {/* Error/Helper Text */}
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

TagInput.displayName = "TagInput";

export default TagInput;
