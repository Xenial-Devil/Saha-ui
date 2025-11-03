import React, { useEffect } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import type { ChipProps } from "./Chip.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";
import { chipVariants } from "./Chip.styles";


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
