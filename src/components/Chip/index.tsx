import React, { useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import type { ChipProps } from "./Chip.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";

/**
 * Chip component variants using CVA
 *
 * Provides 5 modern chip variants with flexible colors,
 * deletable functionality, icon/avatar support, and interactive states.
 *
 * @variant filled - Solid background with color (default)
 * @variant outlined - Border with transparent background
 * @variant soft - Soft background with subtle color
 * @variant gradient - Gradient color background
 * @variant glass - Glassmorphism effect with backdrop blur
 *
 * @color default | primary | secondary | success | warning | error | info
 * @size sm | md | lg - Size variations
 */
export const chipVariants = cva(
  "inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-300 select-none whitespace-nowrap relative overflow-hidden isolate before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
  {
    variants: {
      variant: {
        filled: "shadow-lg hover:shadow-xl",
        outlined: "border-2 bg-transparent hover:shadow-md",
        soft: "backdrop-blur-sm hover:shadow-lg",
        gradient: "shadow-lg hover:shadow-xl",
        glass: "backdrop-blur-md border shadow-xl hover:shadow-2xl",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      size: {
        sm: "text-xs px-2 py-1 h-6 rounded-full",
        md: "text-sm px-3 py-1.5 h-8 rounded-full",
        lg: "text-base px-4 py-2 h-10 rounded-full",
      },
      clickable: {
        true: "cursor-pointer hover:scale-110 active:scale-95 hover:rotate-1 active:rotate-0 transition-transform duration-300",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    compoundVariants: [
      // Filled variant colors
      {
        variant: "filled",
        color: "default",
        className:
          "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600",
      },
      {
        variant: "filled",
        color: "primary",
        className:
          "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
      },
      {
        variant: "filled",
        color: "secondary",
        className:
          "bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/70 shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40",
      },
      {
        variant: "filled",
        color: "success",
        className:
          "bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40",
      },
      {
        variant: "filled",
        color: "warning",
        className:
          "bg-yellow-500 text-white hover:bg-yellow-600 shadow-yellow-500/20 hover:shadow-md hover:shadow-yellow-500/30",
      },
      {
        variant: "filled",
        color: "error",
        className:
          "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20 hover:shadow-md hover:shadow-red-500/30",
      },
      {
        variant: "filled",
        color: "info",
        className:
          "bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30",
      },
      // Outlined variant colors
      {
        variant: "outlined",
        color: "default",
        className:
          "border-gray-400 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
      },
      {
        variant: "outlined",
        color: "primary",
        className:
          "border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
      },
      {
        variant: "outlined",
        color: "secondary",
        className:
          "border-secondary text-secondary hover:bg-secondary/10 dark:hover:bg-secondary/20",
      },
      {
        variant: "outlined",
        color: "success",
        className:
          "border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950",
      },
      {
        variant: "outlined",
        color: "warning",
        className:
          "border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950",
      },
      {
        variant: "outlined",
        color: "error",
        className:
          "border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950",
      },
      {
        variant: "outlined",
        color: "info",
        className:
          "border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950",
      },
      // Soft variant colors
      {
        variant: "soft",
        color: "default",
        className:
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700",
      },
      {
        variant: "soft",
        color: "primary",
        className:
          "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground hover:bg-primary/20 dark:hover:bg-primary/30",
      },
      {
        variant: "soft",
        color: "secondary",
        className:
          "bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary-foreground hover:bg-secondary/20 dark:hover:bg-secondary/30",
      },
      {
        variant: "soft",
        color: "success",
        className:
          "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900",
      },
      {
        variant: "soft",
        color: "warning",
        className:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900",
      },
      {
        variant: "soft",
        color: "error",
        className:
          "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900",
      },
      {
        variant: "soft",
        color: "info",
        className:
          "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900",
      },
      // Gradient variant colors
      {
        variant: "gradient",
        color: "default",
        className:
          "bg-gradient-to-r from-gray-400 to-gray-600 text-white hover:from-gray-500 hover:to-gray-700",
      },
      {
        variant: "gradient",
        color: "primary",
        className:
          "bg-gradient-to-r from-primary/90 to-primary text-primary-foreground hover:from-primary hover:to-primary/90 shadow-primary/20 hover:shadow-primary/40",
      },
      {
        variant: "gradient",
        color: "secondary",
        className:
          "bg-gradient-to-r from-secondary/90 to-secondary text-secondary-foreground hover:from-secondary hover:to-secondary/90 shadow-secondary/20 hover:shadow-secondary/40",
      },
      {
        variant: "gradient",
        color: "success",
        className:
          "bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 shadow-green-500/20 hover:shadow-green-500/40",
      },
      {
        variant: "gradient",
        color: "warning",
        className:
          "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700 shadow-yellow-500/20 hover:shadow-yellow-500/40",
      },
      {
        variant: "gradient",
        color: "error",
        className:
          "bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 shadow-red-500/20 hover:shadow-red-500/40",
      },
      {
        variant: "gradient",
        color: "info",
        className:
          "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 shadow-blue-500/20 hover:shadow-blue-500/40",
      },
      // Glass variant colors
      {
        variant: "glass",
        color: "default",
        className:
          "bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-black/20",
      },
      {
        variant: "glass",
        color: "primary",
        className:
          "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20",
      },
      {
        variant: "glass",
        color: "secondary",
        className:
          "bg-secondary/10 border-secondary/30 text-secondary hover:bg-secondary/20",
      },
      {
        variant: "glass",
        color: "success",
        className:
          "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20",
      },
      {
        variant: "glass",
        color: "warning",
        className:
          "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20",
      },
      {
        variant: "glass",
        color: "error",
        className:
          "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/20",
      },
      {
        variant: "glass",
        color: "info",
        className:
          "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20",
      },
    ],
    defaultVariants: {
      variant: "filled",
      color: "default",
      size: "md",
      clickable: false,
      disabled: false,
    },
  }
);

export type ChipVariantsProps = VariantProps<typeof chipVariants>;

/**
 * Chip Component
 *
 * A compact, interactive element for tags, selections, filters, and user input.
 * Supports icons, avatars, deletable functionality, and multiple visual styles.
 *
 * @example
 * ```tsx
 * // Basic chip
 * <Chip>JavaScript</Chip>
 *
 * // With color and variant
 * <Chip color="primary" variant="filled">Premium</Chip>
 *
 * // Deletable chip
 * <Chip deletable onDelete={() => console.log('deleted')}>
 *   Remove me
 * </Chip>
 *
 * // With icon
 * <Chip icon={<Tag size={14} />} color="success">
 *   Tagged
 * </Chip>
 *
 * // With avatar
 * <Chip avatar={<Avatar size="xs" src="..." />}>
 *   John Doe
 * </Chip>
 *
 * // Clickable chip
 * <Chip clickable onClick={() => console.log('clicked')}>
 *   Click me
 * </Chip>
 *
 * // Different sizes
 * <Chip size="sm">Small</Chip>
 * <Chip size="lg">Large</Chip>
 * ```
 */
const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      variant = "filled",
      color = "default",
      size = "md",
      children,
      className,
      icon,
      avatar,
      deletable = false,
      onDelete,
      disabled = false,
      clickable = false,
      onClick,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Chip");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "filled",
        "outlined",
        "soft",
        "gradient",
        "glass",
      ] as const);

      // Validate color
      validator.validateEnum("color", color, [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "info",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate boolean props
      validator.validateType("deletable", deletable, "boolean", isValidBoolean);
      validator.validateType("disabled", disabled, "boolean", isValidBoolean);
      validator.validateType("clickable", clickable, "boolean", isValidBoolean);

      // Validate deletable logic
      if (deletable && !onDelete) {
        validator.warn(
          "deletable is true but onDelete callback is not provided"
        );
      }

      // Validate children
      if (!children) {
        validator.warn("Chip should have children content for accessibility");
      }

      // Common validators
      commonValidators.className(validator, className);
      commonValidators.disabled(validator, disabled);
    }, [
      variant,
      color,
      size,
      deletable,
      disabled,
      clickable,
      onDelete,
      children,
      className,
    ]);

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete?.();
    };

    const isClickable = clickable || !!onClick;

    return (
      <div
        ref={ref}
        className={cn(
          chipVariants({
            variant,
            color,
            size,
            clickable: isClickable,
            disabled,
          }),
          className
        )}
        onClick={disabled ? undefined : onClick}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        {...props}
      >
        {/* Avatar */}
        {avatar && <span className="flex-shrink-0 -ml-1">{avatar}</span>}

        {/* Icon */}
        {icon && !avatar && <span className="flex-shrink-0">{icon}</span>}

        {/* Label */}
        <span className="truncate">{children}</span>

        {/* Delete button */}
        {deletable && onDelete && (
          <button
            type="button"
            className={cn(
              "flex-shrink-0 rounded-full p-0.5 transition-all duration-200",
              "hover:bg-black/10 dark:hover:bg-white/10 active:scale-90",
              "-mr-1"
            )}
            onClick={handleDelete}
            disabled={disabled}
            aria-label="Delete"
          >
            <X size={size === "sm" ? 12 : size === "lg" ? 18 : 14} />
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = "Chip";

export { Chip };
