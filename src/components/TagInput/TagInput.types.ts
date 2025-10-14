export interface TagInputProps {
  // Values
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;

  // Input props
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;

  // Validation
  max?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  validator?: (tag: string) => boolean | string;
  duplicates?: boolean;

  // Separators
  separators?: string[];
  allowPaste?: boolean;

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

  // Tag customization
  tagVariant?: TagInputProps["variant"];
  tagSize?: TagInputProps["size"];

  // Labels & Messages
  label?: string;
  helperText?: string;
  error?: string;

  // Callbacks
  onAdd?: (tag: string) => void;
  onRemove?: (tag: string, index: number) => void;
  onError?: (error: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;

  // Advanced
  autoFocus?: boolean;
  clearOnBlur?: boolean;
  addOnBlur?: boolean;
  trim?: boolean;
  caseSensitive?: boolean;

  // Styling
  className?: string;
  inputClassName?: string;
  tagClassName?: string;
  containerClassName?: string;
}
