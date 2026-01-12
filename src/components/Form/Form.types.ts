// Form.types.ts
import type {
  FormHTMLAttributes,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";

// ===========================
// Base Types (No RHF dependency)
// ===========================

export type FormVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "glass";

export type FormSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export type FormLayout = "vertical" | "horizontal" | "inline";
export type FormSpacing = "none" | "sm" | "md" | "lg" | number | string;
export type MessageVariant = "error" | "success" | "warning" | "info";

// ===========================
// Fallback Types (when RHF not installed)
// ===========================

export type FieldValues = Record<string, unknown>;

export interface FieldError {
  type: string;
  message?: string;
}

export type FieldErrors<T = FieldValues> = Partial<Record<keyof T, FieldError>>;

// ===========================
// Context Types
// ===========================

export interface FormContextValue {
  variant: FormVariant;
  size: FormSize;
  layout: FormLayout;
  disabled: boolean;
  loading: boolean;
}

export interface FormFieldContextValue {
  name: string;
  id: string;
  error?: FieldError;
  isDirty?: boolean;
  isTouched?: boolean;
}

export interface FormItemContextValue {
  id: string;
  hasError: boolean;
  isDisabled: boolean;
}

// ===========================
// Form Component Props
// ===========================

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "onError"> {
  form?: {
    handleSubmit: (
      onValid: (data: TFieldValues) => void | Promise<void>,
      onInvalid?: (errors: FieldErrors<TFieldValues>) => void
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    formState: {
      isSubmitting: boolean;
      errors: FieldErrors<TFieldValues>;
      isDirty: boolean;
    };
    reset: () => void;
    watch: () => TFieldValues;
    getValues: () => TFieldValues;
    [key: string]: unknown;
  };
  onSubmit?:
    | ((data: TFieldValues) => void | Promise<void>)
    | ((e: React.FormEvent<HTMLFormElement>) => void);
  onError?: (errors: FieldErrors<TFieldValues>) => void;
  variant?: FormVariant;
  size?: FormSize;
  layout?: FormLayout;
  loading?: boolean;
  disabled?: boolean;
  spacing?: FormSpacing;
  loadingText?: string;
  children?: ReactNode;
}

// ===========================
// FormField Component Props (RHF Integration)
// ===========================

export interface FormFieldRenderProps {
  field: {
    name: string;
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    disabled?: boolean;
  };
  fieldState: {
    invalid: boolean;
    isTouched: boolean;
    isDirty: boolean;
    error?: FieldError;
  };
  formState: {
    isSubmitting: boolean;
    isSubmitted: boolean;
    isDirty: boolean;
    errors: FieldErrors;
  };
}

export interface FormFieldProps {
  control: unknown;
  name: string;
  defaultValue?: unknown;
  rules?: Record<string, unknown>;
  shouldUnregister?: boolean;
  render: (props: FormFieldRenderProps) => ReactNode;
}

// ===========================
// FormItem Component Props
// ===========================

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  variant?: FormVariant;
  layout?: FormLayout;
  disableAnimation?: boolean;
  children?: ReactNode;
}

// ===========================
// FormLabel Component Props
// ===========================

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
  variant?: FormVariant;
  size?: FormSize;
  tooltip?: ReactNode;
  srOnly?: boolean;
  children?: ReactNode;
}

// ===========================
// FormControl Component Props
// ===========================

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

// ===========================
// FormDescription Component Props
// ===========================

export interface FormDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  variant?: FormVariant;
  size?: FormSize;
  children?: ReactNode;
}

// ===========================
// FormMessage Component Props
// ===========================

export interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: MessageVariant;
  size?: FormSize;
  showIcon?: boolean;
  disableAnimation?: boolean;
  error?: string | FieldError;
  children?: ReactNode;
}

// ===========================
// FormSection Component Props
// ===========================

export interface FormSectionProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: FormVariant;
  divider?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  icon?: ReactNode;
  children?: ReactNode;
}

// ===========================
// FormActions Component Props
// ===========================

export interface FormActionsProps extends HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right" | "between" | "around";
  sticky?: boolean;
  bordered?: boolean;
  children?: ReactNode;
}

// ===========================
// FormError Component Props
// ===========================

export interface FormErrorProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  errors?: string[] | Record<string, string | undefined>;
  dismissible?: boolean;
  onDismiss?: () => void;
  variant?: "error" | "warning";
}

// ===========================
// FormProgress Component Props
// ===========================

export interface FormProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
  steps?: string[];
  showPercentage?: boolean;
  variant?: FormVariant;
  size?: "sm" | "md" | "lg";
}

// ===========================
// FormCompact Component Props
// ===========================

export interface FormFieldConfig<
  TFieldValues extends FieldValues = FieldValues
> {
  name: keyof TFieldValues & string;
  label?: string;
  description?: string;
  placeholder?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "switch"
    | "date"
    | "time"
    | "datetime-local"
    | "file"
    | "color"
    | "range"
    | "hidden"
    | "custom";
  required?: boolean;
  optional?: boolean;
  defaultValue?: unknown;
  options?: Array<{
    label: string;
    value: string | number | boolean;
    disabled?: boolean;
  }>;
  rules?: Record<string, unknown>;
  render?: (props: FormFieldRenderProps) => ReactNode;
  disabled?: boolean;
  hidden?: boolean | ((values: TFieldValues) => boolean);
  colSpan?: 1 | 2 | 3 | 4;
  className?: string;
  inputProps?: Record<string, unknown>;
}

export interface FormCompactProps<
  TFieldValues extends FieldValues = FieldValues
> extends Omit<FormProps<TFieldValues>, "children"> {
  form: NonNullable<FormProps<TFieldValues>["form"]> & {
    control: unknown;
  };
  title?: string;
  description?: string;
  fields: FormFieldConfig<TFieldValues>[];
  columns?: 1 | 2 | 3 | 4;
  submitText?: string;
  showCancel?: boolean;
  cancelText?: string;
  onCancel?: () => void;
  showReset?: boolean;
  resetText?: string;
  showProgress?: boolean;
  footer?: ReactNode;
}
