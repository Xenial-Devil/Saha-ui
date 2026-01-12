// Form.tsx
"use client";

import React, {
  createContext,
  useContext,
  useId,
  useMemo,
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactElement,
  type ForwardedRef,
  type ChangeEvent,
} from "react";
import { cn } from "../../lib/utils";
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
  loadingOverlayVariants,
  progressVariants,
  progressBarVariants,
  progressFillVariants,
} from "./Form.styles";
import type {
  FormProps,
  FormFieldProps,
  FormFieldRenderProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
  FormSectionProps,
  FormActionsProps,
  FormErrorProps,
  FormProgressProps,
  FormCompactProps,
  FormFieldConfig,
  FormContextValue,
  FormFieldContextValue,
  FormItemContextValue,
  FormVariant,
  FormSize,
  FormLayout,
  FormSpacing,
  FieldValues,
  FieldError,
} from "./Form.types";

// ===========================
// Icons (Inline SVG Components)
// ===========================

const IconAlertCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-4 shrink-0", className)}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconCheckCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-4 shrink-0", className)}
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconInfo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-4 shrink-0", className)}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const IconWarning = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-4 shrink-0", className)}
    aria-hidden="true"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(
      "size-4 shrink-0 transition-transform duration-200",
      className
    )}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconLoader = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-5 animate-spin", className)}
    aria-hidden="true"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const IconX = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-4 shrink-0", className)}
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const messageIcons = {
  error: IconAlertCircle,
  success: IconCheckCircle,
  warning: IconWarning,
  info: IconInfo,
} as const;

// ===========================
// Contexts
// ===========================

const FormContext = createContext<FormContextValue>({
  variant: "default",
  size: "md",
  layout: "vertical",
  disabled: false,
  loading: false,
});

const FormFieldContext = createContext<FormFieldContextValue | null>(null);
const FormItemContext = createContext<FormItemContextValue | null>(null);

// ===========================
// Hooks
// ===========================

/**
 * Hook to access form configuration from context
 */
export const useFormConfig = () => useContext(FormContext);

/**
 * Hook to access current form field information
 */
export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);

  const id = itemContext?.id ?? fieldContext?.id ?? "";

  return {
    id,
    name: fieldContext?.name ?? "",
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: fieldContext?.error,
    invalid: !!fieldContext?.error || itemContext?.hasError,
    isDirty: fieldContext?.isDirty ?? false,
    isTouched: fieldContext?.isTouched ?? false,
    isDisabled: itemContext?.isDisabled ?? false,
  };
};

// ===========================
// Utility Functions
// ===========================

const getSpacingClass = (spacing: FormSpacing): string => {
  if (typeof spacing === "number") {
    return `space-y-[${spacing}px]`;
  }

  const spacingMap: Record<string, string> = {
    none: "space-y-0",
    sm: "space-y-3",
    md: "space-y-4",
    lg: "space-y-6",
  };

  if (typeof spacing === "string" && spacing in spacingMap) {
    return spacingMap[spacing];
  }

  if (typeof spacing === "string") {
    return `space-y-[${spacing}]`;
  }

  return "space-y-4";
};

const getGridClass = (columns: 1 | 2 | 3 | 4): string => {
  const gridMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };
  return gridMap[columns] ?? "grid-cols-1";
};

const getColSpanClass = (span?: 1 | 2 | 3 | 4): string => {
  if (!span || span === 1) return "";
  const spanMap: Record<number, string> = {
    2: "sm:col-span-2",
    3: "sm:col-span-2 lg:col-span-3",
    4: "sm:col-span-2 lg:col-span-4",
  };
  return spanMap[span] ?? "";
};

// ===========================
// Form Component
// ===========================

function FormInner<TFieldValues extends FieldValues = FieldValues>(
  {
    form,
    children,
    onSubmit,
    onError,
    variant = "default",
    size = "md",
    layout = "vertical",
    loading = false,
    disabled = false,
    spacing = "md",
    loadingText = "Processing...",
    className,
    ...props
  }: FormProps<TFieldValues>,
  ref: ForwardedRef<HTMLFormElement>
) {
  const isDisabled = disabled || loading;

  const contextValue = useMemo<FormContextValue>(
    () => ({
      variant,
      size,
      layout,
      disabled: isDisabled,
      loading,
    }),
    [variant, size, layout, isDisabled, loading]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isDisabled) return;

      if (form && onSubmit) {
        form.handleSubmit(
          (data) => (onSubmit as (data: TFieldValues) => void)(data),
          (errors) => onError?.(errors)
        )(e);
        return;
      }

      if (onSubmit) {
        (onSubmit as (e: React.FormEvent<HTMLFormElement>) => void)(e);
      }
    },
    [form, onSubmit, onError, isDisabled]
  );

  return (
    <FormContext.Provider value={contextValue}>
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn(
          formVariants({ variant, layout }),
          getSpacingClass(spacing),
          className
        )}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        <div
          className={loadingOverlayVariants({ visible: loading })}
          aria-hidden={!loading}
        >
          <IconLoader className="size-8 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            {loadingText}
          </span>
        </div>

        {children}
      </form>
    </FormContext.Provider>
  );
}

export const Form = forwardRef(FormInner) as <
  TFieldValues extends FieldValues = FieldValues
>(
  props: FormProps<TFieldValues> & { ref?: ForwardedRef<HTMLFormElement> }
) => ReactElement;

(Form as React.FC).displayName = "Form";

// ===========================
// FormField Component (RHF Integration)
// ===========================

// FormField Component - Fixed
export function FormField({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  render,
}: FormFieldProps) {
  const id = useId();

  // Fix: Use 'any' type for Controller to avoid complex generic type issues
  const [Controller, setController] = useState<React.ComponentType<any> | null>(
    null
  );
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    import("react-hook-form")
      .then((module) => {
        // Fix: Cast to any to resolve type incompatibility
        setController(() => module.Controller as React.ComponentType<any>);
      })
      .catch(() => {
        setLoadError(
          "react-hook-form is required for FormField. Install: npm install react-hook-form"
        );
      });
  }, []);

  if (loadError) {
    return (
      <div className="text-destructive text-sm p-2 border border-destructive/20 rounded bg-destructive/10">
        {loadError}
      </div>
    );
  }

  if (!Controller) {
    return null;
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({
        field,
        fieldState,
        formState,
      }: {
        field: FormFieldRenderProps["field"];
        fieldState: FormFieldRenderProps["fieldState"];
        formState: FormFieldRenderProps["formState"];
      }) => (
        <FormFieldContext.Provider
          value={{
            name,
            id,
            error: fieldState.error,
            isDirty: fieldState.isDirty,
            isTouched: fieldState.isTouched,
          }}
        >
          {render({ field, fieldState, formState })}
        </FormFieldContext.Provider>
      )}
    />
  );
}

FormField.displayName = "FormField";

// ===========================
// FormItem Component
// ===========================

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  (
    {
      variant,
      layout,
      disableAnimation = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const formConfig = useFormConfig();
    const fieldContext = useContext(FormFieldContext);

    const hasError = !!fieldContext?.error;
    const id = fieldContext?.id ?? generatedId;

    const contextValue = useMemo<FormItemContextValue>(
      () => ({
        id,
        hasError,
        isDisabled: formConfig.disabled,
      }),
      [id, hasError, formConfig.disabled]
    );

    return (
      <FormItemContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            formItemVariants({
              layout: layout ?? formConfig.layout,
              hasError,
              animate: !disableAnimation,
            }),
            className
          )}
          {...props}
        >
          {children}
        </div>
      </FormItemContext.Provider>
    );
  }
);

FormItem.displayName = "FormItem";

// ===========================
// FormLabel Component
// ===========================

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  (
    {
      required = false,
      optional = false,
      variant,
      size,
      tooltip,
      srOnly = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const formConfig = useFormConfig();
    const { formItemId, error, isDisabled } = useFormField();

    return (
      <label
        ref={ref}
        htmlFor={formItemId}
        className={cn(
          formLabelVariants({
            variant: variant ?? formConfig.variant,
            size: size ?? formConfig.size,
            hasError: !!error,
            disabled: isDisabled,
            srOnly,
          }),
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {required && (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        )}
        {optional && (
          <span className="text-muted-foreground text-xs font-normal">
            (optional)
          </span>
        )}
        {tooltip && (
          <span
            className="ml-0.5 cursor-help text-muted-foreground hover:text-foreground transition-colors"
            title={typeof tooltip === "string" ? tooltip : undefined}
          >
            <IconInfo className="size-3.5" />
          </span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>
    );
  }
);

FormLabel.displayName = "FormLabel";

// ===========================
// FormControl Component
// ===========================

// FormControl Component - Fixed (removed unused variable)
export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, children, ...props }, ref) => {
    // Removed: const formConfig = useFormConfig();
    const { formItemId, formDescriptionId, formMessageId, error, isDisabled } =
      useFormField();

    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      const childProps = child.props as Record<string, unknown>;

      return React.cloneElement(
        child as ReactElement<Record<string, unknown>>,
        {
          id: formItemId,
          "aria-describedby": error
            ? `${formDescriptionId} ${formMessageId}`
            : formDescriptionId || undefined,
          "aria-invalid": error ? true : undefined,
          "aria-disabled": isDisabled || undefined,
          disabled: isDisabled || childProps.disabled,
        }
      );
    });

    return (
      <div
        ref={ref}
        className={cn(
          formControlVariants({
            hasError: !!error,
            disabled: isDisabled,
          }),
          className
        )}
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);

FormControl.displayName = "FormControl";

// ===========================
// FormDescription Component
// ===========================

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ variant, size, className, children, ...props }, ref) => {
  const formConfig = useFormConfig();
  const { formDescriptionId } = useFormField();

  if (!children) return null;

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(
        formDescriptionVariants({
          variant: variant ?? formConfig.variant,
          size: size ?? "sm",
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

export const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  (
    {
      variant = "error",
      size = "sm",
      showIcon = true,
      disableAnimation = false,
      error: errorProp,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { formMessageId, error: contextError } = useFormField();

    const errorFromProp =
      typeof errorProp === "string"
        ? errorProp
        : (errorProp as FieldError)?.message;

    const message = children ?? errorFromProp ?? contextError?.message;

    if (!message) return null;

    const hasError = !!contextError || !!errorProp;
    const displayVariant = hasError ? "error" : variant;
    const Icon = messageIcons[displayVariant];

    return (
      <p
        ref={ref}
        id={formMessageId}
        role={hasError ? "alert" : undefined}
        aria-live={hasError ? "polite" : undefined}
        className={cn(
          formMessageVariants({
            variant: displayVariant,
            size,
            animate: !disableAnimation,
          }),
          className
        )}
        {...props}
      >
        {showIcon && <Icon />}
        <span>{String(message)}</span>
      </p>
    );
  }
);

FormMessage.displayName = "FormMessage";

// ===========================
// FormSection Component
// ===========================

export const FormSection = forwardRef<HTMLDivElement, FormSectionProps>(
  (
    {
      title,
      description,
      variant = "default",
      divider = false,
      collapsible = false,
      defaultCollapsed = false,
      collapsed: controlledCollapsed,
      onCollapsedChange,
      icon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] =
      useState(defaultCollapsed);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | "auto">("auto");

    const isCollapsed = controlledCollapsed ?? internalCollapsed;

    const toggleCollapsed = useCallback(() => {
      const newValue = !isCollapsed;
      setInternalCollapsed(newValue);
      onCollapsedChange?.(newValue);
    }, [isCollapsed, onCollapsedChange]);

    useEffect(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    }, [children]);

    return (
      <div
        ref={ref}
        className={cn(formSectionVariants({ variant, divider }), className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <button
                type="button"
                onClick={collapsible ? toggleCollapsed : undefined}
                disabled={!collapsible}
                className={cn(
                  formSectionTitleVariants({ variant, collapsible }),
                  "w-full text-left flex items-center justify-between",
                  !collapsible && "pointer-events-none"
                )}
                aria-expanded={collapsible ? !isCollapsed : undefined}
              >
                <span className="flex items-center gap-2">
                  {icon}
                  {title}
                </span>
                {collapsible && (
                  <IconChevronDown
                    className={cn(isCollapsed && "-rotate-90")}
                  />
                )}
              </button>
            )}
            {description && !isCollapsed && (
              <p className="text-sm text-muted-foreground mt-1.5">
                {description}
              </p>
            )}
          </div>
        )}

        <div
          ref={contentRef}
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isCollapsed ? "opacity-0" : "opacity-100"
          )}
          style={{
            height: isCollapsed ? 0 : height,
          }}
          aria-hidden={isCollapsed}
        >
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    );
  }
);

FormSection.displayName = "FormSection";

// ===========================
// FormActions Component
// ===========================

export const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(
  (
    {
      align = "right",
      sticky = false,
      bordered = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          formActionsVariants({
            align,
            bordered,
            sticky,
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
// FormProgress Component
// ===========================

export const FormProgress = forwardRef<HTMLDivElement, FormProgressProps>(
  (
    {
      value,
      max,
      steps,
      showPercentage = false,
      variant = "default",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.round((value / max) * 100));

    return (
      <div
        ref={ref}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        {steps && steps.length > 0 && (
          <div className="flex justify-between mb-3">
            {steps.map((step, index) => {
              const isCompleted = index < value;
              const isCurrent = index === value;

              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-2 text-sm transition-colors",
                    isCompleted && "text-primary",
                    isCurrent && "text-foreground font-medium",
                    !isCompleted && !isCurrent && "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "size-6 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                      isCompleted && "bg-primary text-primary-foreground",
                      isCurrent &&
                        "bg-primary/20 text-primary border-2 border-primary",
                      !isCompleted &&
                        !isCurrent &&
                        "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <IconCheckCircle className="size-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="hidden sm:inline">{step}</span>
                </div>
              );
            })}
          </div>
        )}

        <div className={progressBarVariants({ size })}>
          <div
            className={progressFillVariants({ variant })}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={`${percentage}% complete`}
          />
        </div>

        {showPercentage && (
          <p className="text-right text-xs text-muted-foreground mt-1.5">
            {percentage}% complete
          </p>
        )}
      </div>
    );
  }
);

FormProgress.displayName = "FormProgress";

// ===========================
// FormError Component
// ===========================

export const FormError = forwardRef<HTMLDivElement, FormErrorProps>(
  (
    {
      title = "There were errors with your submission",
      errors,
      dismissible = true,
      onDismiss,
      variant = "error",
      className,
      ...props
    },
    ref
  ) => {
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
      setIsDismissed(false);
    }, [errors]);

    const errorList = useMemo(() => {
      if (!errors) return [];
      if (Array.isArray(errors)) return errors;
      return Object.entries(errors)
        .filter(([, msg]) => msg !== undefined && msg !== null)
        .map(([field, msg]) => `${field}: ${msg}`);
    }, [errors]);

    if (isDismissed || errorList.length === 0) return null;

    const Icon = variant === "error" ? IconAlertCircle : IconWarning;
    const colorClasses =
      variant === "error"
        ? "bg-destructive/10 border-destructive/20 text-destructive"
        : "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400";

    const handleDismiss = () => {
      setIsDismissed(true);
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        className={cn(
          "rounded-lg border-2 p-4 animate-in fade-in-0 slide-in-from-top-2 duration-300",
          colorClasses,
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <Icon className="size-5 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium">{title}</h4>
            <ul className="mt-2 space-y-1 text-sm">
              {errorList.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Dismiss error"
            >
              <IconX />
            </button>
          )}
        </div>
      </div>
    );
  }
);

FormError.displayName = "FormError";

// ===========================
// FormCompact Component (Requires RHF)
// ===========================

export function FormCompact<TFieldValues extends FieldValues = FieldValues>({
  form,
  title,
  description,
  fields,
  columns = 1,
  submitText = "Submit",
  showCancel = false,
  cancelText = "Cancel",
  onCancel,
  showReset = false,
  resetText = "Reset",
  showProgress = false,
  footer,
  onSubmit,
  variant = "default",
  disabled,
  ...formProps
}: FormCompactProps<TFieldValues>) {
  const { formState, watch, reset } = form;
  const { isSubmitting, errors } = formState;

  const watchedValues = watch();

  const visibleFields = useMemo(() => {
    return fields.filter((field) => {
      if (typeof field.hidden === "function") {
        return !field.hidden(watchedValues as TFieldValues);
      }
      return !field.hidden;
    });
  }, [fields, watchedValues]);

  const filledFields = useMemo(() => {
    return visibleFields.filter((field) => {
      const value = watchedValues[field.name];
      return value !== undefined && value !== "" && value !== null;
    }).length;
  }, [visibleFields, watchedValues]);

  const baseInputClasses = cn(
    "w-full px-3 py-2 rounded-md border border-input bg-background",
    "placeholder:text-muted-foreground",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "transition-colors"
  );

  const renderFieldInput = useCallback(
    (
      fieldConfig: FormFieldConfig<TFieldValues>,
      field: FormFieldRenderProps["field"]
    ) => {
      const isFieldDisabled = fieldConfig.disabled || disabled;
      const fieldValue = field.value;

      switch (fieldConfig.type) {
        case "textarea":
          return (
            <textarea
              name={field.name}
              value={String(fieldValue ?? "")}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              placeholder={fieldConfig.placeholder}
              disabled={isFieldDisabled}
              rows={4}
              className={cn(baseInputClasses, "resize-none min-h-[100px]")}
            />
          );

        case "select":
          return (
            <select
              name={field.name}
              value={String(fieldValue ?? "")}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              disabled={isFieldDisabled}
              className={baseInputClasses}
            >
              <option value="">Select...</option>
              {fieldConfig.options?.map((opt) => (
                <option
                  key={String(opt.value)}
                  value={String(opt.value)}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          );

        case "checkbox":
          return (
            <input
              type="checkbox"
              name={field.name}
              checked={Boolean(fieldValue)}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.checked)
              }
              onBlur={field.onBlur}
              disabled={isFieldDisabled}
              className="size-4 rounded border-input accent-primary"
            />
          );

        case "switch":
          return (
            <button
              type="button"
              role="switch"
              aria-checked={Boolean(fieldValue)}
              onClick={() => field.onChange(!fieldValue)}
              disabled={isFieldDisabled}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full",
                "border-2 border-transparent transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                fieldValue ? "bg-primary" : "bg-input"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
                  fieldValue ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          );

        case "radio":
          return (
            <div className="space-y-2">
              {fieldConfig.options?.map((opt) => (
                <label
                  key={String(opt.value)}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer",
                    opt.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={String(opt.value)}
                    checked={fieldValue === opt.value}
                    onChange={() => field.onChange(opt.value)}
                    disabled={isFieldDisabled || opt.disabled}
                    className="size-4 border-input accent-primary"
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          );

        case "hidden":
          return (
            <input
              type="hidden"
              name={field.name}
              value={String(fieldValue ?? "")}
            />
          );

        case "custom":
          return null;

        default:
          return (
            <input
              type={fieldConfig.type ?? "text"}
              name={field.name}
              value={String(fieldValue ?? "")}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              placeholder={fieldConfig.placeholder}
              disabled={isFieldDisabled}
              className={baseInputClasses}
            />
          );
      }
    },
    [baseInputClasses, disabled]
  );

  const renderField = useCallback(
    (fieldConfig: FormFieldConfig<TFieldValues>) => {
      if (typeof fieldConfig.hidden === "function") {
        if (fieldConfig.hidden(watchedValues as TFieldValues)) return null;
      } else if (fieldConfig.hidden) {
        return null;
      }

      return (
        <FormField
          key={fieldConfig.name}
          control={form.control}
          name={fieldConfig.name}
          rules={fieldConfig.rules}
          defaultValue={fieldConfig.defaultValue}
          render={({ field, fieldState, formState: fieldFormState }) => {
            if (fieldConfig.render) {
              return (
                <FormItem
                  className={cn(
                    getColSpanClass(fieldConfig.colSpan),
                    fieldConfig.className
                  )}
                >
                  {fieldConfig.label && fieldConfig.type !== "checkbox" && (
                    <FormLabel
                      required={fieldConfig.required}
                      optional={fieldConfig.optional}
                    >
                      {fieldConfig.label}
                    </FormLabel>
                  )}
                  <FormControl>
                    {
                      fieldConfig.render({
                        field,
                        fieldState,
                        formState: fieldFormState,
                      }) as ReactElement
                    }
                  </FormControl>
                  {fieldConfig.description && (
                    <FormDescription>{fieldConfig.description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }

            if (fieldConfig.type === "checkbox") {
              return (
                <FormItem
                  layout="inline"
                  className={cn(
                    getColSpanClass(fieldConfig.colSpan),
                    fieldConfig.className
                  )}
                >
                  <FormControl>
                    {renderFieldInput(fieldConfig, field)}
                  </FormControl>
                  {fieldConfig.label && (
                    <FormLabel>{fieldConfig.label}</FormLabel>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }

            return (
              <FormItem
                className={cn(
                  getColSpanClass(fieldConfig.colSpan),
                  fieldConfig.className
                )}
              >
                {fieldConfig.label && (
                  <FormLabel
                    required={fieldConfig.required}
                    optional={fieldConfig.optional}
                  >
                    {fieldConfig.label}
                  </FormLabel>
                )}
                <FormControl>
                  {renderFieldInput(fieldConfig, field)}
                </FormControl>
                {fieldConfig.description && (
                  <FormDescription>{fieldConfig.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    },
    [form.control, watchedValues, renderFieldInput]
  );

  const formErrors = useMemo((): Record<string, string> | undefined => {
    const errorEntries = Object.entries(errors);
    if (errorEntries.length === 0) return undefined;

    const result: Record<string, string> = {};
    for (const [key, value] of errorEntries) {
      const errorMessage = (value as FieldError)?.message;
      if (errorMessage) {
        result[key] = errorMessage;
      }
    }
    return Object.keys(result).length > 0 ? result : undefined;
  }, [errors]);

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      variant={variant}
      disabled={disabled}
      {...formProps}
    >
      {(title || description) && (
        <header className="mb-6">
          {title && (
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </header>
      )}

      {showProgress && (
        <FormProgress
          value={filledFields}
          max={visibleFields.length}
          variant={variant}
          showPercentage
        />
      )}

      {formErrors && <FormError errors={formErrors} className="mb-4" />}

      <div className={cn("grid gap-4", getGridClass(columns))}>
        {fields.map(renderField)}
      </div>

      {footer ?? (
        <FormActions>
          {showReset && (
            <button
              type="button"
              onClick={() => reset()}
              disabled={isSubmitting}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md",
                "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "transition-colors"
              )}
            >
              {resetText}
            </button>
          )}
          {showCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md",
                "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "transition-colors"
              )}
            >
              {cancelText}
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md inline-flex items-center gap-2",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              "transition-colors"
            )}
          >
            {isSubmitting && <IconLoader className="size-4" />}
            {submitText}
          </button>
        </FormActions>
      )}
    </Form>
  );
}

FormCompact.displayName = "FormCompact";

// ===========================
// Exports
// ===========================

export { FormContext, FormFieldContext, FormItemContext };

export type {
  FormProps,
  FormFieldProps,
  FormFieldRenderProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
  FormSectionProps,
  FormActionsProps,
  FormErrorProps,
  FormProgressProps,
  FormCompactProps,
  FormFieldConfig,
  FormContextValue,
  FormFieldContextValue,
  FormItemContextValue,
  FormVariant,
  FormSize,
  FormLayout,
  FormSpacing,
  FieldValues,
  FieldError,
};
