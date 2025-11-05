"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { ComponentValidator, isValidBoolean } from "../../lib/validation";
import type {
  LabelProps,
  LabelGroupProps,
  LabelDescriptionProps,
  LabelErrorProps,
  LabelRequiredProps,
  LabelOptionalProps,
  LabelVariant,
  LabelSize,
  LabelPosition,
} from "./Label.types";
import {
  labelVariants,
  labelGroupVariants,
  labelDescriptionVariants,
  labelErrorVariants,
  labelRequiredVariants,
  labelOptionalVariants,
  labelHelpVariants,
} from "./Label.styles";

// ===========================
// Validation Constants
// ===========================

const VALID_VARIANTS: LabelVariant[] = [
  "default",
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
  "info",
  "muted",
  "outline",
  "glass",
];

const VALID_SIZES: LabelSize[] = ["sm", "md", "lg"];

const VALID_POSITIONS: LabelPosition[] = ["top", "left", "right", "floating"];

// ===========================
// Label Component
// ===========================

/**
 * Label - Form label component
 *
 * Accessible and beautiful form labels with support for required/optional indicators,
 * descriptions, errors, and floating label styles.
 *
 * @example
 * ```tsx
 * // Basic label
 * <Label htmlFor="email">Email Address</Label>
 *
 * // Required field
 * <Label htmlFor="username" required>Username</Label>
 *
 * // With description
 * <Label htmlFor="password">
 *   Password
 *   <LabelDescription>Must be at least 8 characters</LabelDescription>
 * </Label>
 *
 * // With error
 * <Label htmlFor="email" error>
 *   Email
 *   <LabelError>Email is required</LabelError>
 * </Label>
 * ```
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      position = "top",
      required = false,
      optional = false,
      disabled = false,
      error = false,
      className,
      htmlFor,
      requiredIndicator = "*",
      optionalIndicator = "(optional)",
      showHelp = false,
      helpText,
      ...props
    },
    ref
  ) => {
    // Runtime validation (development only)
    const validator = new ComponentValidator("Label");

    React.useEffect(() => {
      // Validate variant
      validator.validateEnum("variant", variant, VALID_VARIANTS);

      // Validate size
      validator.validateEnum("size", size, VALID_SIZES);

      // Validate position
      validator.validateEnum("position", position, VALID_POSITIONS);

      // Validate boolean props
      validator.validateType("required", required, "boolean", isValidBoolean);
      validator.validateType("optional", optional, "boolean", isValidBoolean);
      validator.validateType("disabled", disabled, "boolean", isValidBoolean);
      validator.validateType("error", error, "boolean", isValidBoolean);
      validator.validateType("showHelp", showHelp, "boolean", isValidBoolean);

      // Warn about conflicting states
      if (required && optional) {
        validator.warn(
          "Label has both 'required' and 'optional' props. Only one should be used."
        );
      }

      if (disabled && required) {
        validator.warn(
          "Label is both 'disabled' and 'required'. This might be confusing for users."
        );
      }

      // Validate htmlFor
      if (!htmlFor && position !== "top") {
        validator.warn(
          "Label without 'htmlFor' prop may not be properly associated with a form control."
        );
      }

      // Validate help text
      if (showHelp && !helpText) {
        validator.warn(
          "Label has 'showHelp' enabled but no 'helpText' provided."
        );
      }

      // Validate children
      if (!children) {
        validator.warn("Label has no children. Consider providing label text.");
      }
    }, [
      variant,
      size,
      position,
      required,
      optional,
      disabled,
      error,
      showHelp,
      helpText,
      htmlFor,
      children,
    ]);

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(
          labelVariants({ variant, size, position, disabled, error }),
          className
        )}
        {...props}
      >
        <span className="inline-flex items-center gap-1">
          {children}
          {required && <LabelRequired>{requiredIndicator}</LabelRequired>}
          {optional && <LabelOptional>{optionalIndicator}</LabelOptional>}
          {showHelp && helpText && (
            <span className={labelHelpVariants()} title={helpText}>
              ?
            </span>
          )}
        </span>
      </label>
    );
  }
);

Label.displayName = "Label";

// ===========================
// LabelGroup Component
// ===========================

/**
 * LabelGroup - Groups multiple labels
 *
 * Organizes multiple labels with consistent spacing and layout.
 *
 * @example
 * ```tsx
 * <LabelGroup direction="horizontal">
 *   <Label htmlFor="firstName">First Name</Label>
 *   <Label htmlFor="lastName">Last Name</Label>
 * </LabelGroup>
 * ```
 */
export const LabelGroup = React.forwardRef<HTMLDivElement, LabelGroupProps>(
  (
    { children, direction = "vertical", spacing = "md", className, ...props },
    ref
  ) => {
    // Runtime validation (development only)
    const validator = new ComponentValidator("LabelGroup");

    React.useEffect(() => {
      // Validate direction
      if (
        direction !== undefined &&
        !["horizontal", "vertical"].includes(direction)
      ) {
        validator.error(
          `Invalid prop 'direction': must be one of [horizontal, vertical], got '${direction}'.`
        );
      }

      // Validate spacing
      if (spacing !== undefined && !["sm", "md", "lg"].includes(spacing)) {
        validator.error(
          `Invalid prop 'spacing': must be one of [sm, md, lg], got '${spacing}'.`
        );
      }

      // Validate children
      if (!children) {
        validator.warn(
          "LabelGroup has no children. Consider providing Label components."
        );
      }
    }, [direction, spacing, children]);

    return (
      <div
        ref={ref}
        className={cn(labelGroupVariants({ direction, spacing }), className)}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);

LabelGroup.displayName = "LabelGroup";

// ===========================
// Sub-Components
// ===========================

/**
 * LabelDescription - Description text for labels
 *
 * @example
 * ```tsx
 * <Label>
 *   Email
 *   <LabelDescription>We'll never share your email</LabelDescription>
 * </Label>
 * ```
 */
export const LabelDescription = React.forwardRef<
  HTMLSpanElement,
  LabelDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(labelDescriptionVariants(), className)}
      {...props}
    >
      {children}
    </span>
  );
});

LabelDescription.displayName = "LabelDescription";

/**
 * LabelError - Error message for labels
 *
 * @example
 * ```tsx
 * <Label error>
 *   Email
 *   <LabelError>Email is required</LabelError>
 * </Label>
 * ```
 */
export const LabelError = React.forwardRef<HTMLSpanElement, LabelErrorProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(labelErrorVariants(), className)}
        role="alert"
        {...props}
      >
        {children}
      </span>
    );
  }
);

LabelError.displayName = "LabelError";

/**
 * LabelRequired - Required indicator for labels
 *
 * @example
 * ```tsx
 * <Label>
 *   Username
 *   <LabelRequired />
 * </Label>
 * ```
 */
export const LabelRequired = React.forwardRef<
  HTMLSpanElement,
  LabelRequiredProps
>(({ children = "*", className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(labelRequiredVariants(), className)}
      aria-label="required"
      {...props}
    >
      {children}
    </span>
  );
});

LabelRequired.displayName = "LabelRequired";

/**
 * LabelOptional - Optional indicator for labels
 *
 * @example
 * ```tsx
 * <Label>
 *   Phone Number
 *   <LabelOptional />
 * </Label>
 * ```
 */
export const LabelOptional = React.forwardRef<
  HTMLSpanElement,
  LabelOptionalProps
>(({ children = "(optional)", className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(labelOptionalVariants(), className)}
      {...props}
    >
      {children}
    </span>
  );
});

LabelOptional.displayName = "LabelOptional";

// ===========================
// Exports
// ===========================

export default Label;
export type {
  LabelProps,
  LabelGroupProps,
  LabelDescriptionProps,
  LabelErrorProps,
  LabelRequiredProps,
  LabelOptionalProps,
};
