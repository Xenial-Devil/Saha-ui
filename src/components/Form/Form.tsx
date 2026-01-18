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
  FormFieldContextProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
  FormSectionProps,
  FormActionsProps,
  FormErrorProps,
  FormProgressProps,
  FormContextValue,
  FormFieldContextValue,
  FormItemContextValue,
  FormVariant,
  FormSize,
  FormLayout,
  FormSpacing,
  FieldError,
} from "./Form.types";

// ===========================
// Icons
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

export const useFormConfig = () => useContext(FormContext);

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

// ===========================
// Form Component
// ===========================

/**
 * Form - Root form component
 *
 * Supports both standalone and React Hook Form modes via spread pattern.
 *
 * @example Standalone
 * ```tsx
 * <Form onSubmit={(e) => { e.preventDefault(); console.log('submitted'); }} variant="outline">
 *   <FormItem>
 *     <FormLabel>Email</FormLabel>
 *     <FormControl>
 *       <input name="email" type="email" />
 *     </FormControl>
 *   </FormItem>
 * </Form>
 * ```
 *
 * @example With React Hook Form
 * ```tsx
 * const form = useForm<MyData>();
 *
 * <Form {...form} onSubmit={form.handleSubmit(onSubmit)} variant="primary">
 *   <Controller ... />
 * </Form>
 * ```
 */
export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      // RHF spread props (destructured to prevent passing to DOM)
      handleSubmit: _handleSubmit,
      control: _control,
      formState,
      reset: _reset,
      watch: _watch,
      getValues: _getValues,
      setValue: _setValue,
      trigger: _trigger,
      clearErrors: _clearErrors,
      setError: _setError,
      register: _register,
      unregister: _unregister,
      getFieldState: _getFieldState,
      setFocus: _setFocus,
      resetField: _resetField,
      // Our props
      children,
      onSubmit,
      variant = "default",
      size = "md",
      layout = "vertical",
      loading,
      disabled = false,
      spacing = "md",
      loadingText = "Processing...",
      className,
      ...props
    },
    ref
  ) => {
    // Auto-detect loading from formState.isSubmitting if loading prop not explicitly set
    const isLoading = loading ?? formState?.isSubmitting ?? false;
    const isDisabled = disabled || isLoading;

    const contextValue = useMemo<FormContextValue>(
      () => ({
        variant,
        size,
        layout,
        disabled: isDisabled,
        loading: isLoading,
      }),
      [variant, size, layout, isDisabled, isLoading]
    );

    const handleFormSubmit = useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        // Don't prevent default here - let the handler decide
        // RHF's handleSubmit will call preventDefault internally
        // Standalone handlers should call it themselves

        if (isDisabled) {
          e.preventDefault();
          return;
        }

        if (onSubmit) {
          // Cast to any to allow both standalone and RHF handlers
          (onSubmit as (e: React.FormEvent<HTMLFormElement>) => void)(e);
        }
      },
      [onSubmit, isDisabled]
    );

    return (
      <FormContext.Provider value={contextValue}>
        <form
          ref={ref}
          onSubmit={handleFormSubmit}
          className={cn(
            formVariants({ variant, layout }),
            getSpacingClass(spacing),
            className
          )}
          aria-busy={isLoading}
          aria-disabled={isDisabled}
          {...props}
        >
          {/* Loading Overlay */}
          <div
            className={loadingOverlayVariants({ visible: isLoading })}
            aria-hidden={!isLoading}
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
);

Form.displayName = "Form";

// ===========================
// FormFieldProvider Component
// ===========================

/**
 * FormFieldProvider - Provides field context for error display
 *
 * @example
 * ```tsx
 * <Controller
 *   control={form.control}
 *   name="email"
 *   render={({ field, fieldState }) => (
 *     <FormFieldProvider name={field.name} error={fieldState.error}>
 *       <FormItem>
 *         <FormLabel>Email</FormLabel>
 *         <FormControl>
 *           <input {...field} />
 *         </FormControl>
 *         <FormMessage />
 *       </FormItem>
 *     </FormFieldProvider>
 *   )}
 * />
 * ```
 */
export function FormFieldProvider({
  name,
  error,
  isDirty,
  isTouched,
  children,
}: FormFieldContextProps) {
  const id = useId();

  const contextValue = useMemo<FormFieldContextValue>(
    () => ({
      name,
      id,
      error,
      isDirty,
      isTouched,
    }),
    [name, id, error, isDirty, isTouched]
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      {children}
    </FormFieldContext.Provider>
  );
}

FormFieldProvider.displayName = "FormFieldProvider";

// ===========================
// FormItem Component
// ===========================

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  (
    {
      variant: _variant,
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

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, children, ...props }, ref) => {
    const { formItemId, formDescriptionId, formMessageId, error, isDisabled } =
      useFormField();

    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      const childProps = child.props as Record<string, unknown>;

      return React.cloneElement(
        child as React.ReactElement<Record<string, unknown>>,
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

    // Extract message from various error formats
    const getMessage = (): string | undefined => {
      if (children) return String(children);

      if (typeof errorProp === "string") return errorProp;
      if (errorProp?.message) return String(errorProp.message);

      if (contextError?.message) return String(contextError.message);

      return undefined;
    };

    const message = getMessage();

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
        <span>{message}</span>
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
// Exports
// ===========================

export { FormContext, FormFieldContext, FormItemContext };

export type {
  FormProps,
  FormFieldContextProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
  FormSectionProps,
  FormActionsProps,
  FormErrorProps,
  FormProgressProps,
  FormContextValue,
  FormFieldContextValue,
  FormItemContextValue,
  FormVariant,
  FormSize,
  FormLayout,
  FormSpacing,
  FieldError,
};
