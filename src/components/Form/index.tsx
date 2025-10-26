import React, { createContext, useContext, useCallback } from "react";
import { cn } from "../../lib/utils";
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";
import type {
  FormProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
  FormCompactProps,
  FormSectionProps,
  FormActionsProps,
  FormVariant,
  FormSize,
  FormLayout,
  FormFieldConfig,
} from "./Form.types";
import {
  formVariants,
  formItemVariants,
  formLabelVariants,
  formControlVariants,
  formDescriptionVariants,
  formMessageVariants,
  formSectionVariants,
  formSectionTitleVariants,
  formActionsVariants,
} from "./Form.styles";
import Button from "../Button";
import { Input } from "../Input";
import { TextArea } from "../TextArea";

// ===========================
// Optional React Hook Form Support
// ===========================

// Dynamically import Controller if react-hook-form is available
let Controller: any;
try {
  const rhf = require("react-hook-form");
  Controller = rhf.Controller;
} catch {
  // React Hook Form not installed - component will work in standalone mode
  Controller = null;
}

// ===========================
// Form Context
// ===========================

interface FormContextValue {
  variant?: FormVariant;
  size?: FormSize;
  layout?: FormLayout;
  disabled?: boolean;
}

const FormContext = createContext<FormContextValue>({});

const useFormConfig = () => useContext(FormContext);

// ===========================
// Form Component
// ===========================

/**
 * Form - Wrapper component for forms with React Hook Form integration
 *
 * @example
 * ```tsx
 * const form = useForm();
 *
 * <Form form={form} onSubmit={handleSubmit} variant="primary">
 *   <FormField form={form} name="email">
 *     {({ value, onChange, error }) => (
 *       <FormItem>
 *         <FormLabel>Email</FormLabel>
 *         <FormControl>
 *           <Input value={value} onChange={onChange} />
 *         </FormControl>
 *         <FormMessage>{error}</FormMessage>
 *       </FormItem>
 *     )}
 *   </FormField>
 * </Form>
 * ```
 */
export const Form = <
  TFieldValues extends Record<string, any> = Record<string, any>
>({
  form,
  onSubmit,
  onError,
  variant = "default",
  size = "md",
  layout = "vertical",
  loading = false,
  disabled = false,
  spacing = "md",
  className,
  children,
  ...props
}: FormProps<TFieldValues>) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (form && form.handleSubmit) {
        form.handleSubmit(
          (data: TFieldValues) => onSubmit(data),
          (errors: any) => {
            console.error("Form validation errors:", errors);
            onError?.(errors);
          }
        )(e);
      } else {
        // Handle non-React Hook Form submission
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as TFieldValues;
        onSubmit(data);
      }
    },
    [form, onSubmit, onError]
  );

  return (
    <FormContext.Provider value={{ variant, size, layout, disabled }}>
      <form
        onSubmit={handleSubmit}
        className={cn(formVariants({ variant, spacing, layout }), className)}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-[inherit]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        <fieldset disabled={disabled || loading} className="space-y-inherit">
          {children}
        </fieldset>
      </form>
    </FormContext.Provider>
  );
};

Form.displayName = "Form";

// ===========================
// FormField Component
// ===========================

/**
 * FormField - Connects form fields to React Hook Form
 *
 * @example
 * ```tsx
 * <FormField form={form} name="username">
 *   {({ value, onChange, error }) => (
 *     <FormItem>
 *       <FormLabel>Username</FormLabel>
 *       <FormControl>
 *         <Input value={value} onChange={onChange} />
 *       </FormControl>
 *       {error && <FormMessage>{error}</FormMessage>}
 *     </FormItem>
 *   )}
 * </FormField>
 * ```
 */
export const FormField = <
  TFieldValues extends Record<string, any> = Record<string, any>
>({
  form,
  name,
  children,
  className,
  ...props
}: FormFieldProps<TFieldValues>) => {
  // If Controller is not available or form doesn't have control, render without RHF
  if (!Controller || !form || !form.control) {
    return (
      <div className={cn("relative", className)} {...props}>
        {children({
          value: "",
          onChange: () => {},
          onBlur: () => {},
          name: name as any,
          error: undefined,
          invalid: false,
          touched: false,
          dirty: false,
          ref: null,
        })}
      </div>
    );
  }

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }: any) => {
        const error = fieldState.error?.message;
        const invalid = fieldState.invalid;
        const touched = fieldState.isTouched;
        const dirty = fieldState.isDirty;

        return (
          <div className={cn("relative", className)} {...props}>
            {children({
              value: field.value,
              onChange: field.onChange,
              onBlur: field.onBlur,
              name: field.name as any,
              error,
              invalid,
              touched,
              dirty,
              ref: field.ref,
            })}
          </div>
        );
      }}
    />
  );
};

FormField.displayName = "FormField";

// ===========================
// FormItem Component
// ===========================

/**
 * FormItem - Container for form field elements
 */
export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ variant, layout, className, children, ...props }, ref) => {
    const config = useFormConfig();

    return (
      <div
        ref={ref}
        className={cn(
          formItemVariants({
            variant: variant || config.variant,
            layout: layout || config.layout,
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormItem.displayName = "FormItem";

// ===========================
// FormLabel Component
// ===========================

/**
 * FormLabel - Label for form fields
 */
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (
    {
      required = false,
      optional = false,
      variant,
      size,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const config = useFormConfig();

    return (
      <label
        ref={ref}
        className={cn(
          formLabelVariants({
            variant: variant || config.variant,
            size: size || config.size,
            required,
          }),
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-error ml-1" aria-label="required">
            *
          </span>
        )}
        {optional && (
          <span className="text-muted-foreground ml-1 text-xs font-normal">
            (optional)
          </span>
        )}
      </label>
    );
  }
);

FormLabel.displayName = "FormLabel";

// ===========================
// FormControl Component
// ===========================

/**
 * FormControl - Wrapper for form control elements
 */
export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formControlVariants(), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormControl.displayName = "FormControl";

// ===========================
// FormDescription Component
// ===========================

/**
 * FormDescription - Helper text for form fields
 */
export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ variant, size, className, children, ...props }, ref) => {
  const config = useFormConfig();

  return (
    <p
      ref={ref}
      className={cn(
        formDescriptionVariants({
          variant: variant || config.variant,
          size: size || config.size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

FormDescription.displayName = "FormDescription";

// ===========================
// FormMessage Component
// ===========================

/**
 * FormMessage - Error/success/info messages for form fields
 */
export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(
  (
    { variant = "error", size, showIcon = true, className, children, ...props },
    ref
  ) => {
    const config = useFormConfig();

    if (!children) return null;

    const icons = {
      error: AlertCircle,
      success: CheckCircle2,
      warning: AlertTriangle,
      info: Info,
    };

    const Icon = icons[variant];

    return (
      <p
        ref={ref}
        className={cn(
          formMessageVariants({
            variant,
            size: size || config.size,
          }),
          className
        )}
        role="alert"
        {...props}
      >
        {showIcon && <Icon className="w-4 h-4 flex-shrink-0" />}
        <span>{children}</span>
      </p>
    );
  }
);

FormMessage.displayName = "FormMessage";

// ===========================
// FormSection Component
// ===========================

/**
 * FormSection - Group related form fields
 */
export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  (
    {
      title,
      description,
      variant = "default",
      divider = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(formSectionVariants({ variant, divider }), className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h3 className={formSectionTitleVariants({ variant })}>{title}</h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);

FormSection.displayName = "FormSection";

// ===========================
// FormActions Component
// ===========================

/**
 * FormActions - Container for form action buttons
 */
export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ align = "right", variant, className, children, ...props }, ref) => {
    const config = useFormConfig();

    return (
      <div
        ref={ref}
        className={cn(
          formActionsVariants({
            align,
            variant: variant || config.variant,
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormActions.displayName = "FormActions";

// ===========================
// FormCompact Component
// ===========================

/**
 * FormCompact - Simplified form with field configuration array
 *
 * @example
 * ```tsx
 * <FormCompact
 *   form={form}
 *   title="User Registration"
 *   onSubmit={handleSubmit}
 *   fields={[
 *     { name: "email", label: "Email", type: "email", required: true },
 *     { name: "password", label: "Password", type: "password", required: true },
 *   ]}
 * />
 * ```
 */
export const FormCompact = <
  TFieldValues extends Record<string, any> = Record<string, any>
>({
  form,
  title,
  description,
  fields,
  submitText = "Submit",
  cancelText = "Cancel",
  showCancel = false,
  onCancel,
  showReset = false,
  footer,
  ...formProps
}: FormCompactProps<TFieldValues>) => {
  const renderField = useCallback(
    (fieldConfig: FormFieldConfig<TFieldValues>) => {
      if (fieldConfig.render && form) {
        return (
          <FormField
            key={fieldConfig.name as string}
            form={form}
            name={fieldConfig.name}
          >
            {(props) => fieldConfig.render!(props)}
          </FormField>
        );
      }

      // Auto-render based on type
      const renderInput = (props: any) => {
        switch (fieldConfig.type) {
          case "textarea":
            return (
              <TextArea
                placeholder={fieldConfig.placeholder}
                value={props.value || ""}
                onChange={(e: any) => props.onChange(e.target.value)}
                onBlur={props.onBlur}
                ref={props.ref}
              />
            );
          case "select":
            return (
              <select
                className="w-full px-4 py-2 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={props.value || ""}
                onChange={(e) => props.onChange(e.target.value)}
                onBlur={props.onBlur}
                ref={props.ref}
              >
                <option value="">Select...</option>
                {fieldConfig.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            );
          case "checkbox":
            return (
              <input
                type="checkbox"
                checked={props.value || false}
                onChange={(e) => props.onChange(e.target.checked)}
                onBlur={props.onBlur}
                ref={props.ref}
                className="w-5 h-5 border-2 border-border rounded"
              />
            );
          default:
            return (
              <Input
                type={fieldConfig.type || "text"}
                placeholder={fieldConfig.placeholder}
                value={props.value || ""}
                onChange={(e: any) => props.onChange(e.target.value)}
                onBlur={props.onBlur}
                ref={props.ref}
                variant={fieldConfig.variant as any}
                size={fieldConfig.size}
              />
            );
        }
      };

      if (!form) {
        return (
          <FormItem key={fieldConfig.name as string}>
            {fieldConfig.label && (
              <FormLabel
                htmlFor={fieldConfig.name as string}
                required={fieldConfig.required}
                optional={fieldConfig.optional}
              >
                {fieldConfig.label}
              </FormLabel>
            )}
            <FormControl>
              {renderInput({
                value: fieldConfig.defaultValue,
                onChange: () => {},
                onBlur: () => {},
              })}
            </FormControl>
            {fieldConfig.description && (
              <FormDescription>{fieldConfig.description}</FormDescription>
            )}
          </FormItem>
        );
      }

      return (
        <FormField
          key={fieldConfig.name as string}
          form={form}
          name={fieldConfig.name}
        >
          {(props) => (
            <FormItem>
              {fieldConfig.label && (
                <FormLabel
                  htmlFor={fieldConfig.name as string}
                  required={fieldConfig.required}
                  optional={fieldConfig.optional}
                  variant={fieldConfig.variant}
                  size={fieldConfig.size}
                >
                  {fieldConfig.label}
                </FormLabel>
              )}
              <FormControl>{renderInput(props)}</FormControl>
              {fieldConfig.description && (
                <FormDescription
                  variant={fieldConfig.variant}
                  size={fieldConfig.size}
                >
                  {fieldConfig.description}
                </FormDescription>
              )}
              {props.error && <FormMessage>{props.error}</FormMessage>}
            </FormItem>
          )}
        </FormField>
      );
    },
    [form]
  );

  return (
    <Form form={form} {...formProps}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {fields.map(renderField)}

      {footer || (
        <FormActions>
          {showReset && form && (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset?.()}
            >
              Reset
            </Button>
          )}
          {showCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          <Button type="submit" variant="primary">
            {submitText}
          </Button>
        </FormActions>
      )}
    </Form>
  );
};

FormCompact.displayName = "FormCompact";

export type {
  FormProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
  FormCompactProps,
  FormSectionProps,
  FormActionsProps,
};
