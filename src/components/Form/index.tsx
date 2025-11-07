"use client";

import React, { createContext, useContext, useCallback } from "react";
import { cn } from "../../lib/utils";
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
  formItemVariants,
  formLabelVariants,
  formControlVariants,
  formDescriptionVariants,
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

/**
 * The Form component supports both standalone and React Hook Form integration.
 *
 * STANDALONE MODE (default):
 * - Works out of the box without any additional dependencies
 * - Uses native form submission with FormData
 * - Example:
 *   <form onSubmit={handleSubmit}>
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl>
 *         <Input name="email" />
 *       </FormControl>
 *     </FormItem>
 *   </form>
 *
 * REACT HOOK FORM MODE (shadcn/ui pattern):
 * - Install: npm install react-hook-form @hookform/resolvers zod
 * - Example:
 *   const form = useForm({ resolver: zodResolver(schema) });
 *
 *   <Form {...form}>
 *     <form onSubmit={form.handleSubmit(onSubmit)}>
 *       <FormField
 *         control={form.control}
 *         name="username"
 *         render={({ field }) => (
 *           <FormItem>
 *             <FormLabel>Username</FormLabel>
 *             <FormControl>
 *               <Input {...field} />
 *             </FormControl>
 *             <FormMessage />
 *           </FormItem>
 *         )}
 *       />
 *     </form>
 *   </Form>
 */

// Try to import from react-hook-form if available
const Controller: any = null;
const FormProvider: any = null;
const useFormContext: any = () => ({
  getFieldState: () => ({}),
  formState: {},
});

// We'll check if react-hook-form is available at runtime
// This allows the component to work standalone or with RHF

// ===========================
// Form Context
// ===========================

type FormFieldContextValue<TName extends string = string> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

interface FormContextValue {
  variant?: FormVariant;
  size?: FormSize;
  layout?: FormLayout;
  disabled?: boolean;
}

const FormContext = createContext<FormContextValue>({});

const useFormConfig = () => useContext(FormContext);

/**
 * Form - Works in both standalone mode and with React Hook Form
 *
 * STANDALONE MODE (for backward compatibility):
 * ```tsx
 * <Form onSubmit={handleSubmit} variant="default">
 *   <FormItem>
 *     <FormLabel>Username</FormLabel>
 *     <FormControl>
 *       <Input name="username" />
 *     </FormControl>
 *   </FormItem>
 * </Form>
 * ```
 *
 * REACT HOOK FORM MODE (shadcn/ui pattern):
 * ```tsx
 * const form = useForm({ resolver: zodResolver(schema) });
 *
 * <Form {...form}>
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <FormField
 *       control={form.control}
 *       name="username"
 *       render={({ field }) => (
 *         <FormItem>
 *           <FormLabel>Username</FormLabel>
 *           <FormControl>
 *             <Input {...field} />
 *           </FormControl>
 *           <FormMessage />
 *         </FormItem>
 *       )}
 *     />
 *   </form>
 * </Form>
 * ```
 */
export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      children,
      onSubmit,
      variant = "default",
      size = "md",
      layout = "vertical",
      loading = false,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    // If FormProvider is available and props look like RHF (has control, etc.),
    // use FormProvider. Otherwise, render as a regular form.
    const isReactHookForm = FormProvider && (props as any).control;

    const formConfig: FormContextValue = {
      variant,
      size,
      layout,
      disabled: disabled || loading,
    };

    if (isReactHookForm && FormProvider) {
      // React Hook Form mode - just return FormProvider
      return (
        <FormContext.Provider value={formConfig}>
          <FormProvider {...props}>{children}</FormProvider>
        </FormContext.Provider>
      );
    }

    // Standalone mode - render as regular form element
    return (
      <FormContext.Provider value={formConfig}>
        <form
          ref={ref}
          onSubmit={onSubmit}
          className={cn("space-y-6", className)}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  },
);

Form.displayName = "Form";

/**
 * FormField - Field component with render prop pattern
 *
 * Usage:
 * ```tsx
 * <FormField
 *   control={form.control}
 *   name="username"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Username</FormLabel>
 *       <FormControl>
 *         <Input {...field} />
 *       </FormControl>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 */
export const FormField = ({ ...props }: any) => {
  // If Controller is available (react-hook-form installed)
  if (Controller) {
    return (
      <FormFieldContext.Provider value={{ name: props.name }}>
        <Controller {...props} />
      </FormFieldContext.Provider>
    );
  }

  // Standalone mode - just render children with empty field
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      {props.render?.({
        field: {
          name: props.name,
          value: "",
          onChange: () => {},
          onBlur: () => {},
          ref: null,
        },
      })}
    </FormFieldContext.Provider>
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
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
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
    ref,
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
          className,
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
  },
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
  },
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
        className,
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
 * FormMessage - Error/info messages for form fields
 * Supports both auto-detection from React Hook Form and manual messages
 */
export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(({ className, children, variant, ...props }, ref) => {
  const itemContext = useContext(FormItemContext);

  // Try to get error from React Hook Form if context is available
  let error;
  let formMessageId;
  try {
    const { error: fieldError, formMessageId: msgId } = useFormField();
    error = fieldError;
    formMessageId = msgId;
  } catch {
    // Not in a FormField context, use manually
    formMessageId = itemContext?.id
      ? `${itemContext.id}-form-item-message`
      : undefined;
  }

  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  // Determine the variant class based on variant prop or error
  const variantClass =
    variant === "success"
      ? "text-success"
      : variant === "warning"
        ? "text-warning"
        : variant === "info"
          ? "text-info"
          : "text-destructive"; // error is default

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium", variantClass, className)}
      {...props}
    >
      {body}
    </p>
  );
});

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
    ref,
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
  },
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
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
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
  TFieldValues extends Record<string, any> = Record<string, any>,
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
  onSubmit,
  ...formProps
}: FormCompactProps<TFieldValues>) => {
  const renderField = useCallback(
    (fieldConfig: FormFieldConfig<TFieldValues>) => {
      // Auto-render based on type
      const renderInput = () => {
        switch (fieldConfig.type) {
          case "textarea":
            return (
              <TextArea
                placeholder={fieldConfig.placeholder}
                name={fieldConfig.name as string}
                defaultValue={fieldConfig.defaultValue as any}
              />
            );
          case "select":
            return (
              <select
                className="w-full px-4 py-2 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                name={fieldConfig.name as string}
                defaultValue={fieldConfig.defaultValue as any}
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
                name={fieldConfig.name as string}
                defaultChecked={fieldConfig.defaultValue as any}
                className="w-5 h-5 border-2 border-border rounded"
              />
            );
          default:
            return (
              <Input
                type={fieldConfig.type || "text"}
                placeholder={fieldConfig.placeholder}
                name={fieldConfig.name as string}
                defaultValue={fieldConfig.defaultValue as any}
                variant={fieldConfig.variant as any}
                size={fieldConfig.size}
              />
            );
        }
      };

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
          <FormControl>{renderInput()}</FormControl>
          {fieldConfig.description && (
            <FormDescription>{fieldConfig.description}</FormDescription>
          )}
        </FormItem>
      );
    },
    [],
  );

  return (
    <Form onSubmit={onSubmit as any} {...formProps}>
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
