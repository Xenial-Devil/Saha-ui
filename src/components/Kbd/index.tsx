import React from "react";
import { cn } from "../../lib/utils";
import type {
  KbdProps,
  KbdGroupProps,
  KbdKeyProps,
  KbdDescriptionProps,
  KbdVariant,
  KbdSize,
  KbdColor,
} from "./Kbd.types";
import {
  kbdVariants,
  kbdGroupVariants,
  kbdSeparatorVariants,
  kbdKeyVariants,
  kbdDescriptionVariants,
} from "./Kbd.styles";

// ===========================
// Validation Constants
// ===========================

const VALID_VARIANTS: KbdVariant[] = [
  "default",
  "bordered",
  "solid",
  "flat",
  "ghost",
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
  "info",
  "glass",
];

const VALID_SIZES: KbdSize[] = ["sm", "md", "lg"];

const VALID_COLORS: KbdColor[] = [
  "default",
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
  "info",
];

// ===========================
// Kbd Component
// ===========================

/**
 * Kbd - Keyboard key display component
 *
 * Displays keyboard keys with beautiful styling and semantic meaning.
 * Supports special characters, modifiers, and key combinations.
 *
 * @example
 * ```tsx
 * // Single key
 * <Kbd>K</Kbd>
 *
 * // Special character
 * <Kbd>⌘</Kbd>
 *
 * // With variant
 * <Kbd variant="solid">Ctrl</Kbd>
 *
 * // With description
 * <Kbd>
 *   <KbdKey>⌘</KbdKey>
 *   <KbdDescription>Command</KbdDescription>
 * </Kbd>
 * ```
 */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      color,
      pressed = false,
      disabled = false,
      className,
      abbr,
      title,
      ...props
    },
    ref
  ) => {
    // Use color variant if color is specified
    const effectiveVariant = color || variant;

    return (
      <kbd
        ref={ref}
        className={cn(
          kbdVariants({ variant: effectiveVariant, size, pressed, disabled }),
          className
        )}
        title={title}
        aria-label={
          abbr || (typeof children === "string" ? children : undefined)
        }
        aria-disabled={disabled}
        aria-pressed={pressed}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = "Kbd";

// ===========================
// KbdGroup Component
// ===========================

/**
 * KbdGroup - Groups multiple keyboard keys
 *
 * Displays key combinations with separators between keys.
 *
 * @example
 * ```tsx
 * <KbdGroup>
 *   <Kbd>⌘</Kbd>
 *   <Kbd>K</Kbd>
 * </KbdGroup>
 *
 * <KbdGroup separator="then">
 *   <Kbd>G</Kbd>
 *   <Kbd>G</Kbd>
 * </KbdGroup>
 * ```
 */
export const KbdGroup = React.forwardRef<HTMLDivElement, KbdGroupProps>(
  (
    {
      children,
      separator = "+",
      showSeparator = true,
      size,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    // Convert children to array and filter out falsy values
    const childArray = React.Children.toArray(children).filter(Boolean);

    // Clone children with size and variant if provided
    const clonedChildren = childArray.map((child, index) => {
      const isLast = index === childArray.length - 1;

      // Clone Kbd children with group props
      if (React.isValidElement(child) && child.type === Kbd) {
        const kbdElement = React.cloneElement(child, {
          // Group props take precedence over child props
          ...(size !== undefined && { size }),
          ...(variant !== undefined && { variant }),
        } as Partial<KbdProps>);

        // Add separator after each key except the last
        if (!isLast && showSeparator) {
          return (
            <React.Fragment key={index}>
              {kbdElement}
              <span className={kbdSeparatorVariants({ size })}>
                {separator}
              </span>
            </React.Fragment>
          );
        }

        return <React.Fragment key={index}>{kbdElement}</React.Fragment>;
      }

      return <React.Fragment key={index}>{child}</React.Fragment>;
    });

    return (
      <div
        ref={ref}
        className={cn(kbdGroupVariants(), className)}
        role="group"
        {...props}
      >
        {clonedChildren}
      </div>
    );
  }
);

KbdGroup.displayName = "KbdGroup";

// ===========================
// Sub-Components
// ===========================

/**
 * KbdKey - Key symbol/text inside Kbd
 *
 * @example
 * ```tsx
 * <Kbd>
 *   <KbdKey>⌘</KbdKey>
 * </Kbd>
 * ```
 */
export const KbdKey = React.forwardRef<HTMLSpanElement, KbdKeyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(kbdKeyVariants(), className)} {...props}>
        {children}
      </span>
    );
  }
);

KbdKey.displayName = "KbdKey";

/**
 * KbdDescription - Description text inside Kbd
 *
 * @example
 * ```tsx
 * <Kbd>
 *   <KbdKey>⌘</KbdKey>
 *   <KbdDescription>Command</KbdDescription>
 * </Kbd>
 * ```
 */
export const KbdDescription = React.forwardRef<
  HTMLSpanElement,
  KbdDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(kbdDescriptionVariants(), className)}
      {...props}
    >
      {children}
    </span>
  );
});

KbdDescription.displayName = "KbdDescription";

// ===========================
// Exports
// ===========================

export default Kbd;
export type { KbdProps, KbdGroupProps, KbdKeyProps, KbdDescriptionProps };
export { KEYBOARD_SYMBOLS } from "./Kbd.types";
export type {
  KbdVariant,
  KbdSize,
  KbdColor,
  KeyboardSymbol,
} from "./Kbd.types";
