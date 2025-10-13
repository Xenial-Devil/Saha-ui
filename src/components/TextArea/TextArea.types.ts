export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
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

  // Labels & Messages
  label?: string;
  helperText?: string;
  error?: string;

  // Character Count
  maxLength?: number;
  showCount?: boolean;
  countPosition?: "top-right" | "bottom-right" | "bottom-left";

  // Auto-resize
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;

  // Advanced Features
  clearable?: boolean;
  onClear?: () => void;

  // Validation
  required?: boolean;
  pattern?: RegExp;
  validator?: (value: string) => boolean | string;

  // Loading & States
  loading?: boolean;
  readOnly?: boolean;

  // Styling Classes
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;

  // Callbacks
  onValueChange?: (value: string) => void;
}
