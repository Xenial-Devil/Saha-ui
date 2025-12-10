import React from "react";

// ===========================
// Optional React Hook Form Types
// ===========================

// Define fallback types when react-hook-form is not installed
export type FieldValues = Record<string, any>;
export type FieldPath<TFieldValues extends FieldValues> = keyof TFieldValues &
  string;
export type UseFormReturn<TFieldValues extends FieldValues = FieldValues> = {
  handleSubmit?: (
    onValid: (data: TFieldValues) => void,
    onInvalid?: (errors: any) => void
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  control?: any;
  reset?: () => void;
  [key: string]: any;
};

// ===========================
// Base Types
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

// ===========================
// Form Component Props
// ===========================

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /** React Hook Form instance */
  form?: UseFormReturn<TFieldValues>;
  /** Form submission handler - accepts either FormData (standalone) or typed data (React Hook Form) */
  onSubmit?:
    | ((data: TFieldValues) => void | Promise<void>)
    | ((e: React.FormEvent<HTMLFormElement>) => void);
  /** Form error handler */
  onError?: (errors: any) => void;
  /** Visual variant */
  variant?: FormVariant;
  /** Size variant */
  size?: FormSize;
  /** Layout orientation */
  layout?: FormLayout;
  /** Show loading state */
  loading?: boolean;
  /** Disable all fields */
  disabled?: boolean;
  /**
   * Add spacing between fields
   * Accepts predefined tokens, numbers (px), or string with units
   * @example
   * <Form spacing="md">Token spacing</Form>
   * <Form spacing={16}>16px spacing</Form>
   * <Form spacing="1.5rem">Custom spacing</Form>
   */
  spacing?: "none" | "sm" | "md" | "lg" | number | string;
  /** Additional class names */
  className?: string;
  /** Form children */
  children?: React.ReactNode;
}

// ===========================
// FormField Component Props
// ===========================

export interface FormFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** React Hook Form instance */
  form: UseFormReturn<TFieldValues>;
  /** Field name */
  name: FieldPath<TFieldValues>;
  /** Render function for the field */
  children: (props: FormFieldRenderProps<TFieldValues>) => React.ReactNode;
  /** Additional class names */
  className?: string;
}

export interface FormFieldRenderProps<
  TFieldValues extends FieldValues = FieldValues
> {
  /** Field value */
  value: any;
  /** Field onChange handler */
  onChange: (...event: any[]) => void;
  /** Field onBlur handler */
  onBlur: () => void;
  /** Field name */
  name: FieldPath<TFieldValues>;
  /** Field error */
  error?: string;
  /** Is field invalid */
  invalid?: boolean;
  /** Is field touched */
  touched?: boolean;
  /** Is field dirty */
  dirty?: boolean;
  /** Field ref */
  ref: React.Ref<any>;
}

// ===========================
// FormItem Component Props
// ===========================

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: FormVariant;
  /** Layout orientation */
  layout?: FormLayout;
  /** Additional class names */
  className?: string;
  /** Form item children */
  children?: React.ReactNode;
}

// ===========================
// FormLabel Component Props
// ===========================

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Show required indicator */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Visual variant */
  variant?: FormVariant;
  /** Size variant */
  size?: FormSize;
  /** Additional class names */
  className?: string;
  /** Label children */
  children?: React.ReactNode;
}

// ===========================
// FormControl Component Props
// ===========================

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  /** Control children */
  children?: React.ReactNode;
}

// ===========================
// FormDescription Component Props
// ===========================

export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Visual variant */
  variant?: FormVariant;
  /** Size variant */
  size?: FormSize;
  /** Additional class names */
  className?: string;
  /** Description children */
  children?: React.ReactNode;
}

// ===========================
// FormMessage Component Props
// ===========================

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Error message variant */
  variant?: "error" | "success" | "warning" | "info";
  /** Size variant */
  size?: FormSize;
  /** Show icon */
  showIcon?: boolean;
  /** Additional class names */
  className?: string;
  /** Message children */
  children?: React.ReactNode;
}

// ===========================
// FormCompact Component Props
// ===========================

export interface FormCompactProps<
  TFieldValues extends FieldValues = FieldValues
> extends Omit<FormProps<TFieldValues>, "children"> {
  /** Form title */
  title?: string;
  /** Form description */
  description?: string;
  /** Form fields configuration */
  fields: FormFieldConfig<TFieldValues>[];
  /** Submit button text */
  submitText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Show cancel button */
  showCancel?: boolean;
  /** Cancel handler */
  onCancel?: () => void;
  /** Show reset button */
  showReset?: boolean;
  /** Custom footer */
  footer?: React.ReactNode;
}

export interface FormFieldConfig<
  TFieldValues extends FieldValues = FieldValues
> {
  /** Field name */
  name: FieldPath<TFieldValues>;
  /** Field label */
  label?: string;
  /** Field description */
  description?: string;
  /** Field placeholder */
  placeholder?: string;
  /** Field type */
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
    | "date"
    | "time"
    | "datetime-local"
    | "file"
    | "custom";
  /** Is required field */
  required?: boolean;
  /** Is optional field */
  optional?: boolean;
  /** Default value */
  defaultValue?: any;
  /** Options for select/radio */
  options?: { label: string; value: any }[];
  /** Custom render function */
  render?: (props: FormFieldRenderProps<TFieldValues>) => React.ReactNode;
  /** Field variant */
  variant?: FormVariant;
  /** Field size */
  size?: FormSize;
  /** Additional class names */
  className?: string;
}

// ===========================
// FormSection Component Props
// ===========================

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Visual variant */
  variant?: FormVariant;
  /** Show divider */
  divider?: boolean;
  /** Additional class names */
  className?: string;
  /** Section children */
  children?: React.ReactNode;
}

// ===========================
// FormActions Component Props
// ===========================

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Actions alignment */
  align?: "left" | "center" | "right" | "between";
  /** Visual variant */
  variant?: FormVariant;
  /** Additional class names */
  className?: string;
  /** Actions children */
  children?: React.ReactNode;
}
