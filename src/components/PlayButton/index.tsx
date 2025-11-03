import React, { useState, useEffect } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidFunction,
} from "../../lib/validation";
import type { PlayButtonProps } from "./PlayButton.types";
import { playButtonVariants } from "./PlayButton.styles";

/**
 * Play Button Component
 *
 * An animated play/pause button with modern effects and multiple variants.
 * Features smooth icon transitions, glow effects, and pulse animations.
 *
 * @variant default - Standard style
 * @variant primary - Primary color theme
 * @variant secondary - Secondary color theme
 * @variant accent - Accent color theme
 * @variant info - Info color theme
 * @variant success - Success color theme
 * @variant warning - Warning color theme
 * @variant error - Error color theme
 * @variant glass - Glassmorphism effect
 *
 * @size sm | md | lg | xl - Size variations
 */

/**
 * Icon size mapping
 */
const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
};

/**
 * Play icon SVG
 */
const PlayIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

/**
 * Pause icon SVG
 */
const PauseIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="transition-transform duration-300 group-hover:scale-110"
  >
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </svg>
);

export type PlayButtonVariantsProps = VariantProps<typeof playButtonVariants>;

/**
 * PlayButton Component
 *
 * A beautiful play/pause button with smooth animations.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <PlayButton />
 *
 * // Controlled with callback
 * <PlayButton
 *   isPlaying={playing}
 *   onToggle={(isPlaying) => setPlaying(isPlaying)}
 * />
 *
 * // With variants and effects
 * <PlayButton variant="primary" size="lg" pulse glow />
 * ```
 */
const PlayButton = React.forwardRef<HTMLButtonElement, PlayButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      isPlaying: controlledIsPlaying,
      onToggle,
      pulse = false,
      glow = true,
      className,
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalIsPlaying, setInternalIsPlaying] = useState(false);

    // Development-only validation
    useEffect(() => {
      const validator = createValidator("PlayButton");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "primary",
        "secondary",
        "accent",
        "info",
        "success",
        "warning",
        "error",
        "glass",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg", "xl"] as const);

      // Validate boolean props
      validator.validateType("pulse", pulse, "boolean", isValidBoolean);
      validator.validateType("glow", glow, "boolean", isValidBoolean);

      if (controlledIsPlaying !== undefined) {
        validator.validateType(
          "isPlaying",
          controlledIsPlaying,
          "boolean",
          isValidBoolean
        );
      }

      // Validate callbacks
      if (onToggle) {
        validator.validateType(
          "onToggle",
          onToggle,
          "function",
          isValidFunction
        );
      }

      // Common validators
      commonValidators.className(validator, className);
      commonValidators.disabled(validator, disabled);
    }, [
      variant,
      size,
      pulse,
      glow,
      controlledIsPlaying,
      onToggle,
      disabled,
      className,
    ]);

    // Use controlled state if provided, otherwise use internal state
    const isPlaying = controlledIsPlaying ?? internalIsPlaying;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newState = !isPlaying;
      setInternalIsPlaying(newState);
      onToggle?.(newState);
      onClick?.(e);
    };

    const iconSize = iconSizes[size];
    const hasGlow = glow && variant !== "glass";

    return (
      <button
        ref={ref}
        className={cn(playButtonVariants({ variant, size, pulse }), className)}
        onClick={handleClick}
        disabled={disabled}
        aria-label={isPlaying ? "Pause" : "Play"}
        {...props}
      >
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full overflow-hidden">
          <span className="absolute inset-0 bg-white/0 group-active:bg-white/20 transition-colors duration-150 rounded-full"></span>
        </span>

        {/* Icon with smooth transition */}
        <span className="relative z-10 flex items-center justify-center transition-all duration-300">
          {isPlaying ? (
            <PauseIcon size={iconSize} />
          ) : (
            <PlayIcon size={iconSize} />
          )}
        </span>

        {/* Glow effect */}
        {hasGlow && (
          <span className="absolute -inset-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"></span>
        )}

        {/* Pulsing ring effect when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-20"></span>
        )}

        {/* Gradient overlay */}
        {variant !== "glass" && (
          <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
        )}
      </button>
    );
  }
);

PlayButton.displayName = "PlayButton";

export default PlayButton;
