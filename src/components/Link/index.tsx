import React, { useEffect } from "react";
import { cn } from "../../lib/utils";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidString,
} from "../../lib/validation";
import { LinkProps } from "./Link.types";
import { linkVariants } from "./Link.styles";


/**
 * Link Component
 *
 * A versatile link component with multiple variants, external link detection,
 * and accessibility features.
 *
 * @example
 * ```tsx
 * // Basic link
 * <Link href="/about">About</Link>
 *
 * // Primary variant with animated underline
 * <Link variant="primary" href="/docs">
 *   Documentation
 * </Link>
 *
 * // External link (auto-detects and shows icon)
 * <Link external href="https://example.com">
 *   Visit Site
 * </Link>
 *
 * // Button style link
 * <Link variant="button" href="/get-started">
 *   Get Started
 * </Link>
 *
 * // With custom icon
 * <Link icon={<Star size={16} />} href="/featured">
 *   Featured Content
 * </Link>
 * ```
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = "default",
      size = "md",
      external = false,
      disabled = false,
      showUnderline = false,
      icon,
      children,
      className,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Link");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "primary",
        "secondary",
        "accent",
        "muted",
        "underline",
        "ghost",
        "button",
        "glass",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate boolean props
      validator.validateType("external", external, "boolean", isValidBoolean);
      validator.validateType("disabled", disabled, "boolean", isValidBoolean);
      validator.validateType(
        "showUnderline",
        showUnderline,
        "boolean",
        isValidBoolean
      );

      // Validate href
      if (href) {
        validator.validateType("href", href, "string", isValidString);
      }

      // Validate children
      if (!children) {
        validator.warn("Link should have children content for accessibility");
      }

      // Common validators
      commonValidators.className(validator, className);
      commonValidators.disabled(validator, disabled);
    }, [
      variant,
      size,
      external,
      disabled,
      showUnderline,
      href,
      children,
      className,
    ]);

    // Auto-set target and rel for external links
    const isExternal = external || target === "_blank";
    const finalTarget = isExternal ? "_blank" : target;
    const finalRel = isExternal ? rel || "noopener noreferrer" : rel;

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        target={finalTarget}
        rel={finalRel}
        className={cn(
          linkVariants({ variant, size, disabled }),
          showUnderline &&
            variant !== "primary" &&
            variant !== "secondary" &&
            variant !== "accent" &&
            "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full",
          className
        )}
        aria-disabled={disabled}
        {...props}
      >
        {/* Custom icon */}
        {icon && (
          <span className="inline-flex items-center justify-center transition-transform group-hover:scale-110">
            {icon}
          </span>
        )}

        {/* Link text */}
        <span className="relative">{children}</span>

        {/* External link icon */}
        {isExternal && !disabled && (
          <svg
            className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}

        {/* Glow effect for button variant */}
        {variant === "button" && (
          <span className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 -z-10 rounded-xl"></span>
        )}
      </a>
    );
  }
);

Link.displayName = "Link";

export default Link;
export { linkVariants };
