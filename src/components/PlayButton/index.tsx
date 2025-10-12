import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { PlayButtonProps } from "./PlayButton.types";

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
 * PlayButton variants using CVA
 */
export const playButtonVariants = cva(
  [
    "group relative inline-flex items-center justify-center",
    "rounded-full transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "overflow-hidden isolate cursor-pointer",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card text-foreground",
          "border-2 border-border",
          "shadow-lg hover:shadow-xl",
          "hover:scale-105 active:scale-95",
        ],
        primary: [
          "bg-primary text-primary-foreground",
          "border-2 border-primary/80",
          "shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/60",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-105 active:scale-95",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border-2 border-secondary/80",
          "shadow-lg shadow-secondary/40 hover:shadow-xl hover:shadow-secondary/60",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-105 active:scale-95",
        ],
        accent: [
          "bg-accent text-accent-foreground",
          "border-2 border-accent/80",
          "shadow-lg shadow-accent/40 hover:shadow-xl hover:shadow-accent/60",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-105 active:scale-95",
        ],
        info: [
          "bg-info text-info-foreground",
          "border-2 border-info/80",
          "shadow-lg shadow-info/40 hover:shadow-xl hover:shadow-info/60",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-105 active:scale-95",
        ],
        success: [
          "bg-success text-success-foreground",
          "border-2 border-success/80",
          "shadow-lg shadow-success/40 hover:shadow-xl hover:shadow-success/60",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-105 active:scale-95",
        ],
        warning: [
          "bg-warning text-warning-foreground",
          "border-2 border-warning/80",
          "shadow-lg shadow-warning/40 hover:shadow-xl hover:shadow-warning/60",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-105 active:scale-95",
        ],
        error: [
          "bg-destructive text-destructive-foreground",
          "border-2 border-destructive/80",
          "shadow-lg shadow-destructive/40 hover:shadow-xl hover:shadow-destructive/60",
          "hover:brightness-110 active:brightness-90",
          "hover:scale-105 active:scale-95",
        ],
        glass: [
          "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80",
          "border-2 border-white/40 dark:border-white/20",
          "shadow-xl hover:shadow-2xl",
          "hover:bg-white/90 dark:hover:bg-gray-900/90",
          "hover:scale-105 active:scale-95",
        ],
      },
      size: {
        sm: "w-12 h-12",
        md: "w-16 h-16",
        lg: "w-20 h-20",
        xl: "w-24 h-24",
      },
      pulse: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      pulse: false,
    },
  }
);

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
