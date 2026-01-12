// Form.types.ts
import type {
  FormHTMLAttributes,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  BaseSyntheticEvent,
  FormEvent,
} from "react";

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
export type FormSpacing = "none" | "sm" | "md" | "lg" | number | string;
export type MessageVariant = "error" | "success" | "warning" | "info";

// ===========================
// Loose Types for RHF Compatibility
// ===========================

export interface FieldError {
  type?: string | number;
  message?: string;
  [key: string]: unknown;
}

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

/**
 * Form submit handler type - accepts both standalone and RHF patterns
 */
export type FormSubmitHandler =
  | ((e: FormEvent<HTMLFormElement>) => void)
  | ((e: FormEvent<HTMLFormElement>) => Promise<void>)
  | ((e?: BaseSyntheticEvent) => void)
  | ((e?: BaseSyntheticEvent) => Promise<void>);

export interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /**
   * Form submission handler
   *
   * @example Standalone
   * ```tsx
   * onSubmit={(e) => { e.preventDefault(); console.log('submitted'); }}
   * ```
   *
   * @example React Hook Form
   * ```tsx
   * onSubmit={form.handleSubmit(onSubmit)}
   * ```
   */
  onSubmit?: FormSubmitHandler;

  // ===========================
  // RHF Spread Props (typed as unknown for maximum compatibility)
  // ===========================

  /** @internal RHF handleSubmit - ignored, use onSubmit instead */
  handleSubmit?: unknown;
  /** @internal RHF control */
  control?: unknown;
  /** @internal RHF formState - used for auto loading detection */
  formState?: {
    isSubmitting?: boolean;
    isLoading?: boolean;
    isDirty?: boolean;
    isValid?: boolean;
    errors?: unknown;
    [key: string]: unknown;
  };
  /** @internal RHF reset */
  reset?: unknown;
  /** @internal RHF watch */
  watch?: unknown;
  /** @internal RHF getValues */
  getValues?: unknown;
  /** @internal RHF setValue */
  setValue?: unknown;
  /** @internal RHF trigger */
  trigger?: unknown;
  /** @internal RHF clearErrors */
  clearErrors?: unknown;
  /** @internal RHF setError */
  setError?: unknown;
  /** @internal RHF register */
  register?: unknown;
  /** @internal RHF unregister */
  unregister?: unknown;
  /** @internal RHF getFieldState */
  getFieldState?: unknown;
  /** @internal RHF setFocus */
  setFocus?: unknown;
  /** @internal RHF resetField */
  resetField?: unknown;

  // ===========================
  // Form Component Props
  // ===========================

  /** Visual variant */
  variant?: FormVariant;
  /** Size variant */
  size?: FormSize;
  /** Layout orientation */
  layout?: FormLayout;
  /** Show loading state with overlay (auto-detected from formState.isSubmitting if not provided) */
  loading?: boolean;
  /** Disable all form fields */
  disabled?: boolean;
  /** Spacing between form items */
  spacing?: FormSpacing;
  /** Loading text shown in overlay */
  loadingText?: string;
  /** Children elements */
  children?: ReactNode;
}

// ===========================
// FormFieldContext Props
// ===========================

export interface FormFieldContextProps {
  name: string;
  error?: FieldError;
  isDirty?: boolean;
  isTouched?: boolean;
  children: ReactNode;
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
