import React, { useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { SpinnerProps, SpinnerSize } from "./Spinner.types";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";

/**
 * CVA variants for Spinner
 */
const spinnerVariants = cva(
  "inline-block rounded-full border-solid border-t-transparent border-r-transparent",
  {
    variants: {
      variant: {
        default:
          "border-l-foreground/80 border-b-foreground/80 shadow-[0_0_12px_0] shadow-foreground/20",
        primary:
          "border-l-primary border-b-primary shadow-[0_0_12px_0] shadow-primary/40",
        secondary:
          "border-l-secondary border-b-secondary shadow-[0_0_12px_0] shadow-secondary/40",
        accent:
          "border-l-accent border-b-accent shadow-[0_0_12px_0] shadow-accent/40",
        info: "border-l-info border-b-info shadow-[0_0_12px_0] shadow-info/40",
        success:
          "border-l-success border-b-success shadow-[0_0_12px_0] shadow-success/40",
        warning:
          "border-l-warning border-b-warning shadow-[0_0_12px_0] shadow-warning/40",
        error:
          "border-l-destructive border-b-destructive shadow-[0_0_12px_0] shadow-destructive/40",
        glass:
          "border-l-primary/60 border-b-primary/60 backdrop-blur-xl bg-background/10 shadow-[0_8px_32px_0] shadow-primary/20",
        gradient:
          "border-l-transparent border-b-transparent bg-gradient-to-tr from-primary via-accent to-secondary bg-clip-border shadow-[0_0_16px_0] shadow-primary/50",
      },
      size: {
        xs: "w-4 h-4",
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-16 h-16",
        xl: "w-24 h-24",
        "2xl": "w-32 h-32",
      },
      thickness: {
        thin: "border-2",
        default: "border-4",
        thick: "border-[6px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      thickness: "default",
    },
  }
);

/**
 * Animation variants for different animation types
 */
const animationVariants = {
  spin: "animate-spin",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  ping: "animate-ping",
};

/**
 * Container variants for wrapper
 */
const containerVariants = cva(
  "flex flex-col items-center justify-center gap-3",
  {
    variants: {
      fullscreen: {
        true: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        false: "inline-flex",
      },
    },
    defaultVariants: {
      fullscreen: false,
    },
  }
);

/**
 * Label text variants
 */
const labelVariants = cva("text-sm font-medium animate-pulse", {
  variants: {
    variant: {
      default: "text-foreground/80",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      error: "text-destructive",
      glass: "text-primary/80",
      gradient:
        "bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

/**
 * Logo size variants relative to spinner size
 */
const logoSizeVariants = cva(
  "absolute inset-0 flex items-center justify-center",
  {
    variants: {
      logoSize: {
        xs: "[&>*]:w-[25%] [&>*]:h-[25%] [&>img]:w-[25%] [&>img]:h-[25%]",
        sm: "[&>*]:w-[35%] [&>*]:h-[35%] [&>img]:w-[35%] [&>img]:h-[35%]",
        md: "[&>*]:w-[50%] [&>*]:h-[50%] [&>img]:w-[50%] [&>img]:h-[50%]",
        lg: "[&>*]:w-[65%] [&>*]:h-[65%] [&>img]:w-[65%] [&>img]:h-[65%]",
        xl: "[&>*]:w-[80%] [&>*]:h-[80%] [&>img]:w-[80%] [&>img]:h-[80%]",
      },
    },
    defaultVariants: {
      logoSize: "md",
    },
  }
);

/**
 * Get color classes based on variant
 */
const getColorClasses = (variant: string) => {
  const colorMap: Record<string, string> = {
    default: "bg-foreground/80",
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-destructive",
    glass: "bg-primary/60",
    gradient: "bg-gradient-to-r from-primary via-accent to-secondary",
  };
  return colorMap[variant] || colorMap.primary;
};

/**
 * Get size dimensions for spinners
 */
const getSizeClasses = (size: SpinnerSize = "md") => {
  const sizeMap = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    "2xl": "w-32 h-32",
  };
  return sizeMap[size] || sizeMap.md;
};

/**
 * Get dot/bar size for different spinner types
 */
const getDotSize = (size: SpinnerSize = "md") => {
  const dotMap = {
    xs: "w-1 h-1",
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
    "2xl": "w-8 h-8",
  };
  return dotMap[size] || dotMap.md;
};

/**
 * Spinner Component
 *
 * A versatile loading spinner with multiple variants, sizes, and animations.
 * Perfect for indicating loading states with modern effects.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner variant="success" size="lg" label="Loading..." />
 * <Spinner variant="gradient" animation="pulse" fullscreen />
 * <Spinner logo="/logo.png" variant="primary" size="xl" />
 * <Spinner logo={<YourIcon />} variant="success" />
 * <Spinner type="dots" variant="primary" />
 * <Spinner type="bars" variant="accent" size="lg" />
 * ```
 */
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      variant = "primary",
      size = "md",
      animation = "spin",
      type = "ring",
      label,
      fullscreen = false,
      speed = 1,
      thickness = "default",
      logo,
      logoSize = "md",
      className,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Spinner");

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
        "gradient",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
      ] as const);

      // Validate animation
      validator.validateEnum("animation", animation, [
        "spin",
        "pulse",
        "bounce",
        "ping",
      ] as const);

      // Validate type
      validator.validateEnum("type", type, [
        "ring",
        "dots",
        "dashed",
        "bars",
        "orbit",
        "square",
        "triangle",
        "logo",
        "dotRing",
        "pulse",
        "wave",
        "spiral",
        "infinity",
        "flower",
        "grid",
        "bounce",
      ] as const);

      // Validate thickness
      validator.validateEnum("thickness", thickness, [
        "thin",
        "default",
        "thick",
      ] as const);

      // Validate logoSize
      validator.validateEnum("logoSize", logoSize, [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
      ] as const);

      // Validate numeric props
      validator.validateType("speed", speed, "number", isValidNumber);

      if (speed <= 0) {
        validator.error("speed must be greater than 0");
      }

      // Validate boolean props
      validator.validateType(
        "fullscreen",
        fullscreen,
        "boolean",
        isValidBoolean
      );

      // Common validators
      commonValidators.className(validator, className);
    }, [
      variant,
      size,
      animation,
      type,
      thickness,
      logoSize,
      speed,
      fullscreen,
      className,
    ]);

    const animationClass = animationVariants[animation];
    const animationStyle =
      speed !== 1 ? { animationDuration: `${1 / speed}s` } : {};
    const colorClass = getColorClasses(variant);
    const sizeClass = getSizeClasses(size);
    const dotSizeClass = getDotSize(size);

    const renderSpinner = () => {
      switch (type) {
        case "dots": {
          // Rotating dots in arc pattern (like iOS spinner)
          const dots = 8;
          const radius =
            size === "xs"
              ? 6
              : size === "sm"
              ? 10
              : size === "md"
              ? 16
              : size === "lg"
              ? 28
              : size === "xl"
              ? 44
              : 60;

          return (
            <div
              className={cn(sizeClass, "relative", animationClass)}
              style={animationStyle}
              aria-hidden="true"
            >
              {Array.from({ length: dots }).map((_, i) => {
                const angle = (i * 360) / dots;
                const radian = (angle * Math.PI) / 180;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                return (
                  <div
                    key={i}
                    className={cn(
                      "absolute top-1/2 left-1/2",
                      dotSizeClass,
                      colorClass,
                      "rounded-full"
                    )}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      opacity: 1 - i * 0.1,
                    }}
                  />
                );
              })}
            </div>
          );
        }

        case "dashed": {
          // Dashed circular border
          return (
            <div
              className={cn(
                spinnerVariants({ variant, size, thickness }),
                animationClass,
                "border-dashed"
              )}
              style={animationStyle}
              aria-hidden="true"
            />
          );
        }

        case "bars": {
          // Rotating bars radiating from center
          const bars = 8;
          const barHeight =
            size === "xs"
              ? 8
              : size === "sm"
              ? 12
              : size === "md"
              ? 16
              : size === "lg"
              ? 24
              : size === "xl"
              ? 32
              : 48;
          const barWidth =
            size === "xs"
              ? 2
              : size === "sm"
              ? 2
              : size === "md"
              ? 4
              : size === "lg"
              ? 4
              : size === "xl"
              ? 6
              : 8;

          return (
            <div
              className={cn(sizeClass, "relative", animationClass)}
              style={animationStyle}
              aria-hidden="true"
            >
              {Array.from({ length: bars }).map((_, i) => {
                const angle = (i * 360) / bars;

                return (
                  <div
                    key={i}
                    className={cn(
                      "absolute top-1/2 left-1/2 rounded-full",
                      colorClass
                    )}
                    style={{
                      width: `${barWidth}px`,
                      height: `${barHeight}px`,
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${
                        barHeight / 2
                      }px)`,
                      transformOrigin: "center center",
                      opacity: 1 - i * 0.1,
                    }}
                  />
                );
              })}
            </div>
          );
        }

        case "dotRing": {
          // Complete circle of evenly-spaced dots
          const dots = 12;
          const radius =
            size === "xs"
              ? 6
              : size === "sm"
              ? 10
              : size === "md"
              ? 14
              : size === "lg"
              ? 20
              : size === "xl"
              ? 28
              : 56;

          return (
            <div
              className={cn(sizeClass, "relative", animationClass)}
              style={animationStyle}
              aria-hidden="true"
            >
              {Array.from({ length: dots }).map((_, i) => {
                const angle = (i * 360) / dots;
                const radian = (angle * Math.PI) / 180;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                return (
                  <div
                    key={i}
                    className={cn(
                      "absolute top-1/2 left-1/2",
                      dotSizeClass,
                      colorClass,
                      "rounded-full"
                    )}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  />
                );
              })}
            </div>
          );
        }

        case "orbit": {
          // Orbiting dots with different orbit sizes
          const orbits = 3;
          const dotsPerOrbit = 4;
          return (
            <div
              className={cn(sizeClass, "relative", animationClass)}
              style={animationStyle}
              aria-hidden="true"
            >
              {Array.from({ length: orbits }).map((_, orbitIndex) => {
                const radius =
                  (orbitIndex + 1) *
                  (size === "xs"
                    ? 4
                    : size === "sm"
                    ? 6
                    : size === "md"
                    ? 10
                    : size === "lg"
                    ? 14
                    : size === "xl"
                    ? 18
                    : 24);

                return Array.from({ length: dotsPerOrbit }).map(
                  (_, dotIndex) => {
                    const angle =
                      (dotIndex * 360) / dotsPerOrbit + orbitIndex * 45;
                    const radian = (angle * Math.PI) / 180;
                    const x = Math.cos(radian) * radius;
                    const y = Math.sin(radian) * radius;

                    return (
                      <div
                        key={`${orbitIndex}-${dotIndex}`}
                        className={cn(
                          "absolute top-1/2 left-1/2",
                          dotSizeClass,
                          colorClass,
                          "rounded-full"
                        )}
                        style={{
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          opacity: 1 - orbitIndex * 0.2,
                        }}
                      />
                    );
                  }
                );
              })}
            </div>
          );
        }

        case "pulse": {
          // Pulsing concentric circles
          const circles = 3;

          return (
            <div className={cn(sizeClass, "relative")} aria-hidden="true">
              {Array.from({ length: circles }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4",
                    colorClass.replace("bg-", "border-")
                  )}
                  style={{
                    width: `${100 - i * 20}%`,
                    height: `${100 - i * 20}%`,
                    animation: `ping ${
                      2 + i * 0.5
                    }s cubic-bezier(0, 0, 0.2, 1) infinite`,
                    animationDelay: `${i * 0.3}s`,
                    opacity: 0.6 - i * 0.15,
                  }}
                />
              ))}
            </div>
          );
        }

        case "square": {
          // Rotating square corners
          const corners = 4;
          const cornerSize =
            size === "xs"
              ? 3
              : size === "sm"
              ? 4
              : size === "md"
              ? 6
              : size === "lg"
              ? 8
              : size === "xl"
              ? 10
              : 12;
          const offset =
            size === "xs"
              ? 6
              : size === "sm"
              ? 10
              : size === "md"
              ? 16
              : size === "lg"
              ? 24
              : size === "xl"
              ? 32
              : 48;

          return (
            <div
              className={cn(sizeClass, "relative", animationClass)}
              style={animationStyle}
              aria-hidden="true"
            >
              {Array.from({ length: corners }).map((_, i) => {
                const positions = [
                  { x: offset, y: -offset },
                  { x: offset, y: offset },
                  { x: -offset, y: offset },
                  { x: -offset, y: -offset },
                ];
                const pos = positions[i];

                return (
                  <div
                    key={i}
                    className={cn(
                      "absolute top-1/2 left-1/2 rounded-sm",
                      colorClass
                    )}
                    style={{
                      width: `${cornerSize}px`,
                      height: `${cornerSize}px`,
                      transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                      opacity: 1 - i * 0.2,
                    }}
                  />
                );
              })}
            </div>
          );
        }

        case "triangle": {
          // Rotating triangular pattern
          const points = 3;
          const radius =
            size === "xs"
              ? 8
              : size === "sm"
              ? 12
              : size === "md"
              ? 18
              : size === "lg"
              ? 26
              : size === "xl"
              ? 36
              : 54;

          return (
            <div
              className={cn(sizeClass, "relative", animationClass)}
              style={animationStyle}
              aria-hidden="true"
            >
              {Array.from({ length: points }).map((_, i) => {
                const angle = (i * 360) / points - 90;
                const radian = (angle * Math.PI) / 180;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                return (
                  <div
                    key={i}
                    className={cn("absolute top-1/2 left-1/2", colorClass)}
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: `${
                        size === "xs"
                          ? 4
                          : size === "sm"
                          ? 6
                          : size === "md"
                          ? 8
                          : size === "lg"
                          ? 10
                          : size === "xl"
                          ? 12
                          : 16
                      }px solid transparent`,
                      borderRight: `${
                        size === "xs"
                          ? 4
                          : size === "sm"
                          ? 6
                          : size === "md"
                          ? 8
                          : size === "lg"
                          ? 10
                          : size === "xl"
                          ? 12
                          : 16
                      }px solid transparent`,
                      borderBottom: `${
                        size === "xs"
                          ? 6
                          : size === "sm"
                          ? 10
                          : size === "md"
                          ? 14
                          : size === "lg"
                          ? 18
                          : size === "xl"
                          ? 22
                          : 28
                      }px solid currentColor`,
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${
                        i * 120
                      }deg)`,
                      opacity: 1 - i * 0.25,
                    }}
                  />
                );
              })}
            </div>
          );
        }

        case "wave": {
          // Wave-like bars with sequential animation
          const bars = 5;
          const barHeight =
            size === "xs"
              ? 12
              : size === "sm"
              ? 16
              : size === "md"
              ? 24
              : size === "lg"
              ? 32
              : size === "xl"
              ? 40
              : 56;
          const barWidth =
            size === "xs"
              ? 2
              : size === "sm"
              ? 3
              : size === "md"
              ? 4
              : size === "lg"
              ? 5
              : size === "xl"
              ? 6
              : 8;

          return (
            <div
              className={cn(
                sizeClass,
                "relative flex items-center justify-center gap-1"
              )}
              aria-hidden="true"
            >
              {Array.from({ length: bars }).map((_, i) => (
                <div
                  key={i}
                  className={cn("rounded-full", colorClass)}
                  style={{
                    width: `${barWidth}px`,
                    height: `${barHeight}px`,
                    animation: `bounce 1s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          );
        }

        case "spiral": {
          // Spiral rotating pattern
          const dots = 12;

          return (
            <div
              className={cn(sizeClass, "relative", animationClass)}
              style={animationStyle}
              aria-hidden="true"
            >
              {Array.from({ length: dots }).map((_, i) => {
                const angle = (i * 360) / dots;
                const radian = (angle * Math.PI) / 180;
                const spiralRadius =
                  (i / dots) *
                  (size === "xs"
                    ? 8
                    : size === "sm"
                    ? 12
                    : size === "md"
                    ? 18
                    : size === "lg"
                    ? 26
                    : size === "xl"
                    ? 36
                    : 54);
                const x = Math.cos(radian) * spiralRadius;
                const y = Math.sin(radian) * spiralRadius;

                return (
                  <div
                    key={i}
                    className={cn(
                      "absolute top-1/2 left-1/2",
                      dotSizeClass,
                      colorClass,
                      "rounded-full"
                    )}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      opacity: (i / dots) * 0.8 + 0.2,
                    }}
                  />
                );
              })}
            </div>
          );
        }

        case "infinity": {
          // Infinity symbol pattern
          const dots = 20;
          const scale =
            size === "xs"
              ? 0.3
              : size === "sm"
              ? 0.5
              : size === "md"
              ? 0.7
              : size === "lg"
              ? 1
              : size === "xl"
              ? 1.3
              : 1.8;

          return (
            <div
              className={cn(sizeClass, "relative", animationClass)}
              style={animationStyle}
              aria-hidden="true"
            >
              {Array.from({ length: dots }).map((_, i) => {
                const t = (i / dots) * Math.PI * 2;
                const x =
                  ((20 * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t))) *
                  scale;
                const y =
                  ((20 * Math.cos(t) * Math.sin(t)) /
                    (1 + Math.sin(t) * Math.sin(t))) *
                  scale;

                return (
                  <div
                    key={i}
                    className={cn(
                      "absolute top-1/2 left-1/2",
                      dotSizeClass,
                      colorClass,
                      "rounded-full"
                    )}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      opacity: 1 - (i / dots) * 0.5,
                    }}
                  />
                );
              })}
            </div>
          );
        }

        case "flower": {
          // Flower petal pattern
          const petals = 6;
          const radius =
            size === "xs"
              ? 8
              : size === "sm"
              ? 12
              : size === "md"
              ? 18
              : size === "lg"
              ? 26
              : size === "xl"
              ? 36
              : 54;

          return (
            <div
              className={cn(sizeClass, "relative", animationClass)}
              style={animationStyle}
              aria-hidden="true"
            >
              {Array.from({ length: petals }).map((_, i) => {
                const angle = (i * 360) / petals;
                const radian = (angle * Math.PI) / 180;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                return (
                  <div
                    key={i}
                    className={cn(
                      "absolute top-1/2 left-1/2",
                      colorClass,
                      "rounded-full"
                    )}
                    style={{
                      width: `${
                        size === "xs"
                          ? 6
                          : size === "sm"
                          ? 10
                          : size === "md"
                          ? 14
                          : size === "lg"
                          ? 18
                          : size === "xl"
                          ? 24
                          : 32
                      }px`,
                      height: `${
                        size === "xs"
                          ? 12
                          : size === "sm"
                          ? 18
                          : size === "md"
                          ? 24
                          : size === "lg"
                          ? 30
                          : size === "xl"
                          ? 40
                          : 56
                      }px`,
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle}deg)`,
                      opacity: 1 - i * 0.1,
                      borderRadius: "50% 50% 50% 0",
                    }}
                  />
                );
              })}
              <div
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                  colorClass
                )}
                style={{
                  width: `${
                    size === "xs"
                      ? 6
                      : size === "sm"
                      ? 10
                      : size === "md"
                      ? 14
                      : size === "lg"
                      ? 18
                      : size === "xl"
                      ? 24
                      : 32
                  }px`,
                  height: `${
                    size === "xs"
                      ? 6
                      : size === "sm"
                      ? 10
                      : size === "md"
                      ? 14
                      : size === "lg"
                      ? 18
                      : size === "xl"
                      ? 24
                      : 32
                  }px`,
                }}
              />
            </div>
          );
        }

        case "grid": {
          // Grid loading pattern
          const gridSize = 3;
          const cellSize =
            size === "xs"
              ? 3
              : size === "sm"
              ? 4
              : size === "md"
              ? 6
              : size === "lg"
              ? 8
              : size === "xl"
              ? 10
              : 14;
          const gap =
            size === "xs"
              ? 1
              : size === "sm"
              ? 2
              : size === "md"
              ? 3
              : size === "lg"
              ? 4
              : size === "xl"
              ? 5
              : 6;

          return (
            <div
              className={cn(sizeClass, "relative grid gap-1")}
              style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gap: `${gap}px`,
              }}
              aria-hidden="true"
            >
              {Array.from({ length: gridSize * gridSize }).map((_, i) => (
                <div
                  key={i}
                  className={cn("rounded-sm", colorClass)}
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    animation: `pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          );
        }

        case "bounce": {
          // Bouncing dots
          const dots = 3;
          const dotSize =
            size === "xs"
              ? 4
              : size === "sm"
              ? 6
              : size === "md"
              ? 8
              : size === "lg"
              ? 12
              : size === "xl"
              ? 16
              : 20;
          const gap =
            size === "xs"
              ? 2
              : size === "sm"
              ? 3
              : size === "md"
              ? 4
              : size === "lg"
              ? 6
              : size === "xl"
              ? 8
              : 10;

          return (
            <div
              className={cn(
                sizeClass,
                "relative flex items-center justify-center"
              )}
              style={{ gap: `${gap}px` }}
              aria-hidden="true"
            >
              {Array.from({ length: dots }).map((_, i) => (
                <div
                  key={i}
                  className={cn("rounded-full", colorClass)}
                  style={{
                    width: `${dotSize}px`,
                    height: `${dotSize}px`,
                    animation: `bounce 1.4s ease-in-out infinite`,
                    animationDelay: `${i * 0.16}s`,
                  }}
                />
              ))}
            </div>
          );
        }

        case "ring":
        default: {
          // Classic circular border spinner (default)
          return (
            <div
              className={cn(
                spinnerVariants({ variant, size, thickness }),
                animationClass
              )}
              style={animationStyle}
              aria-hidden="true"
            />
          );
        }
      }
    };

    return (
      <div
        ref={ref}
        className={cn(containerVariants({ fullscreen }), className)}
        role="status"
        aria-live="polite"
        aria-label={label || "Loading"}
        {...props}
      >
        <div className="relative">
          {renderSpinner()}
          {logo && (
            <div className={cn(logoSizeVariants({ logoSize }))}>
              {typeof logo === "string" ? (
                <img src={logo} alt="Loading logo" className="object-contain" />
              ) : (
                logo
              )}
            </div>
          )}
        </div>
        {label && (
          <span className={cn(labelVariants({ variant }))}>{label}</span>
        )}
        <span className="sr-only">{label || "Loading..."}</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export default Spinner;
export { spinnerVariants };
