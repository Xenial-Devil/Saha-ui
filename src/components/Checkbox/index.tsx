
"use client";

import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useId,
  useCallback,
} from "react";
import { cn } from "../../lib/utils";
import type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxCheckStyle,
  CheckboxShape,
  CheckboxAnimation,
  CheckboxColorScheme,
  CheckboxFillStyle,
} from "./Checkbox.types";
import {
  Check,
  Minus,
  X,
  Circle,
  Plus,
  Star,
  Heart,
  Loader2,
  Diamond,
  Square,
  Shield,
  ThumbsUp,
  Zap,
  Flame,
  Leaf,
  Eye,
  Lock,
  Unlock,
  Bookmark,
  Flag,
  Bell,
  Crown,
  Target,
  Award,
  CheckCircle2,
  CheckCheck,
} from "lucide-react";
import {
  checkboxVariants,
  checkboxLabelVariants,
  checkboxTextVariants,
  checkboxDescriptionVariants,
  colorSchemes,
  getColorScheme,
  shapeClasses,
  sizeClasses,
  animationClasses,
  gapClasses,
  columnClasses,
  fillStyleClasses,
  glowIntensityClasses,
  shadowIntensityClasses,
} from "./Checkbox.styles";

// ============================================
// Utility Functions
// ============================================

/**
 * Check if a color scheme is a gradient type
 */
const isGradientColorScheme = (scheme: CheckboxColorScheme): boolean => {
  return scheme.startsWith("gradient") && !!colorSchemes[scheme]?.gradient;
};

/**
 * Get all available color scheme names
 */
export const getAvailableColorSchemes = (): CheckboxColorScheme[] => {
  return Object.keys(colorSchemes) as CheckboxColorScheme[];
};

/**
 * Get gradient color schemes only
 */
export const getGradientColorSchemes = (): CheckboxColorScheme[] => {
  return (Object.keys(colorSchemes) as CheckboxColorScheme[]).filter(
    (scheme) => colorSchemes[scheme]?.gradient
  );
};

// ============================================
// Context
// ============================================

interface CheckboxContextValue {
  name?: string;
  value?: string[];
  onChange?: (value: string, checked: boolean) => void;
  variant?: CheckboxProps["variant"];
  size?: CheckboxProps["size"];
  colorScheme?: CheckboxColorScheme;
  shape?: CheckboxShape;
  checkStyle?: CheckboxCheckStyle;
  fillStyle?: CheckboxFillStyle;
  animation?: CheckboxAnimation;
  disabled?: boolean;
  maxReached?: boolean;
}

const CheckboxContext = createContext<CheckboxContextValue | undefined>(
  undefined
);
const useCheckboxContext = () => useContext(CheckboxContext);

// ============================================
// Check Icon Component
// ============================================

interface CheckIconProps {
  checkStyle: CheckboxCheckStyle;
  className?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ checkStyle, className }) => {
  const iconMap: Record<CheckboxCheckStyle, React.ReactNode> = {
    check: <Check className={cn(className, "stroke-[3]")} />,
    cross: <X className={cn(className, "stroke-[3]")} />,
    dot: <Circle className={cn(className, "fill-current")} />,
    dash: <Minus className={cn(className, "stroke-[3]")} />,
    plus: <Plus className={cn(className, "stroke-[3]")} />,
    star: <Star className={cn(className, "fill-current")} />,
    heart: <Heart className={cn(className, "fill-current")} />,
    // New check styles
    diamond: <Diamond className={cn(className, "fill-current")} />,
    square: <Square className={cn(className, "fill-current")} />,
    ring: <Circle className={cn(className, "stroke-[3]")} />,
    shield: <Shield className={cn(className, "fill-current")} />,
    thumbsUp: <ThumbsUp className={cn(className, "fill-current")} />,
    lightning: <Zap className={cn(className, "fill-current")} />,
    fire: <Flame className={cn(className, "fill-current")} />,
    leaf: <Leaf className={cn(className, "fill-current")} />,
    eye: <Eye className={cn(className, "stroke-[2]")} />,
    lock: <Lock className={cn(className, "stroke-[2]")} />,
    unlock: <Unlock className={cn(className, "stroke-[2]")} />,
    bookmark: <Bookmark className={cn(className, "fill-current")} />,
    flag: <Flag className={cn(className, "fill-current")} />,
    bell: <Bell className={cn(className, "fill-current")} />,
    crown: <Crown className={cn(className, "fill-current")} />,
    zap: <Zap className={cn(className, "stroke-[2]")} />,
    target: <Target className={cn(className, "stroke-[2]")} />,
    award: <Award className={cn(className, "stroke-[2]")} />,
    checkCircle: <CheckCircle2 className={cn(className, "stroke-[2]")} />,
    checkDouble: <CheckCheck className={cn(className, "stroke-[3]")} />,
  };

  return <>{iconMap[checkStyle] || iconMap.check}</>;
};

// ============================================
// Checkbox Icon Component
// ============================================

interface CheckboxIconProps {
  checked: boolean;
  indeterminate?: boolean;
  loading?: boolean;
  size: keyof typeof sizeClasses;
  checkStyle: CheckboxCheckStyle;
  animation: CheckboxAnimation;
  customIcon?: React.ReactNode;
}

const CheckboxIconDisplay: React.FC<CheckboxIconProps> = ({
  checked,
  indeterminate,
  loading,
  size,
  checkStyle,
  animation,
  customIcon,
}) => {
  const iconClass = sizeClasses[size]?.icon || sizeClasses.md.icon;
  const isVisible = checked || indeterminate || loading;

  // Animation classes for the icon
  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case "scale":
          return "scale-0 opacity-0";
        case "bounce":
          return "scale-0 opacity-0";
        case "slide":
          return "-translate-y-1 opacity-0";
        case "fade":
          return "opacity-0";
        case "spin":
          return "rotate-180 opacity-0";
        case "flip":
          return "rotateY-180 opacity-0";
        case "pulse":
          return "scale-0 opacity-0";
        case "shake":
          return "scale-0 opacity-0";
        case "jelly":
          return "scale-0 opacity-0";
        case "rubberBand":
          return "scale-0 opacity-0";
        case "swing":
          return "scale-0 opacity-0";
        case "tada":
          return "scale-0 opacity-0";
        case "heartbeat":
          return "scale-0 opacity-0";
        default:
          return "opacity-0";
      }
    }
    switch (animation) {
      case "bounce":
        return "scale-100 opacity-100 animate-bounce-in";
      case "pulse":
        return "scale-100 opacity-100 animate-pulse";
      case "shake":
        return "scale-100 opacity-100 animate-shake";
      case "jelly":
        return "scale-100 opacity-100 animate-jelly";
      case "rubberBand":
        return "scale-100 opacity-100 animate-rubber-band";
      case "swing":
        return "scale-100 opacity-100 animate-swing";
      case "tada":
        return "scale-100 opacity-100 animate-tada";
      case "heartbeat":
        return "scale-100 opacity-100 animate-heartbeat";
      default:
        return "scale-100 opacity-100 translate-y-0 rotate-0";
    }
  };

  return (
    <span
      className={cn(
        "absolute inset-0 flex items-center justify-center text-white",
        "transition-all duration-200",
        animationClasses[animation],
        getAnimationClass()
      )}
    >
      {loading ? (
        <Loader2 className={cn(iconClass, "animate-spin")} />
      ) : customIcon ? (
        <span
          className={cn("flex shrink-0 items-center justify-center", iconClass)}
        >
          {customIcon}
        </span>
      ) : indeterminate ? (
        <Minus className={cn(iconClass, "stroke-[3]")} />
      ) : (
        <CheckIcon checkStyle={checkStyle} className={iconClass} />
      )}
    </span>
  );
};

// ============================================
// Main Checkbox Component
// ============================================

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      error,
      helperText,
      labelPosition = "right",
      variant = "default",
      size = "md",
      className,
      disabled,
      checked: controlledChecked,
      defaultChecked,
      onChange,
      onCheckedChange,
      icon,
      checkStyle = "check",
      shape = "rounded",
      animation = "scale",
      fillStyle = "filled",
      colorScheme = "primary",
      checkedColor,
      borderColor,
      checkColor,
      uncheckedColor,
      hoverColor,
      focusColor,
      indeterminate = false,
      badge,
      card = false,
      hoverEffect = true,
      recommended = false,
      image,
      loading = false,
      readOnly = false,
      required = false,
      showRequiredIndicator = true,
      tooltip,
      ringEffect = true,
      wrapperClassName,
      labelClassName,
      boxClassName,
      gradient,
      shadowIntensity = "md",
      glowIntensity = "md",
      ...props
    },
    ref
  ) => {
    const context = useCheckboxContext();
    const uniqueId = useId();
    const inputId = props.id || `checkbox-${uniqueId}`;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    // Controlled vs Uncontrolled
    const isControlled = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = useState(
      defaultChecked || false
    );
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    // Refs
    const internalRef = useRef<HTMLInputElement>(null);

    // Combined ref handler
    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        // Handle internal ref
        (
          internalRef as React.MutableRefObject<HTMLInputElement | null>
        ).current = node;

        // Handle forwarded ref
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
        }
      },
      [ref]
    );

    // Set indeterminate state
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Get final values from context or props
    const finalVariant = context?.variant || variant;
    const finalSize = (context?.size || size) as keyof typeof sizeClasses;
    const finalColorScheme = context?.colorScheme || colorScheme;
    const finalShape = context?.shape || shape;
    const finalCheckStyle = context?.checkStyle || checkStyle;
    const finalFillStyle = context?.fillStyle || fillStyle;
    const finalAnimation = context?.animation || animation;
    const finalDisabled =
      context?.disabled || disabled || (context?.maxReached && !checked);
    const name = context?.name || props.name;

    // Check if using a gradient color scheme
    const isGradient = isGradientColorScheme(finalColorScheme);

    // Get color scheme
    const colors = useMemo(() => {
      return getColorScheme(finalColorScheme);
    }, [finalColorScheme]);

    // Determine if there's an error state
    const hasError = !!error;

    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly || loading) {
        e.preventDefault();
        return;
      }

      const newChecked = e.target.checked;

      if (context) {
        context.onChange?.(props.value as string, newChecked);
      } else {
        if (!isControlled) {
          setUncontrolledChecked(newChecked);
        }
        onChange?.(e);
        onCheckedChange?.(newChecked);
      }
    };

    // Size classes
    const boxSize = sizeClasses[finalSize] || sizeClasses.md;

    // Get fill style classes
    const fillClasses =
      fillStyleClasses[finalFillStyle] || fillStyleClasses.filled;

    // Get variant-specific classes
    const getVariantClasses = () => {
      switch (finalVariant) {
        case "glass":
          return "border-white/20 bg-white/10 backdrop-blur-xl dark:bg-black/10";
        case "neon":
          return checked || indeterminate
            ? `shadow-[0_0_10px_currentColor,0_0_20px_currentColor] ${colors.glow}`
            : "";
        case "gradient":
          return "";
        case "minimal":
          return "border";
        case "bold":
          return "border-[3px]";
        default:
          return "";
      }
    };

    // Build checkbox box classes
    const boxClasses = cn(
      // Base
      "relative inline-flex items-center justify-center border-2",
      "transition-all duration-200 ease-out",
      boxSize.box,
      shapeClasses[finalShape],

      // Variant classes
      getVariantClasses(),
      className,

      // Unchecked state
      !checked &&
        !indeterminate && [
          colors.bg,
          hasError ? "border-destructive" : colors.border,
          "hover:border-opacity-60",
          fillClasses.unchecked,
        ],

      // Checked/Indeterminate state
      (checked || indeterminate) && [
        !isGradient && (hasError ? "bg-destructive" : colors.checked),
        "border-transparent",
        fillClasses.checked,

        // Fill style specific classes
        finalFillStyle === "outline" && [
          "bg-transparent border-2",
          hasError
            ? "border-destructive text-destructive"
            : `${colors.border} text-current`,
        ],
        finalFillStyle === "soft" && [colors.bg, colors.border],
        finalFillStyle === "ghost" && ["bg-transparent border-transparent"],
        finalFillStyle === "neon" && [
          colors.glow && glowIntensityClasses[glowIntensity],
        ],
        finalFillStyle === "glow" && [
          colors.glow,
          glowIntensityClasses[glowIntensity],
        ],
        finalFillStyle === "shadow" && [
          shadowIntensityClasses[shadowIntensity],
        ],
        finalFillStyle === "3d" && [
          "shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)] translate-y-0.5",
        ],
        finalFillStyle === "raised" && ["shadow-lg -translate-y-0.5"],
      ],

      // Focus ring
      ringEffect && [
        "focus-within:ring-2 focus-within:ring-offset-2",
        focusColor ? "" : colors.ring,
      ],

      // Hover effect
      hoverEffect && !finalDisabled && "hover:scale-105 active:scale-95",

      // Disabled
      finalDisabled && "opacity-50 cursor-not-allowed",

      // Custom classes
      boxClassName
    );

    // Custom inline styles for colors
    const boxStyle: React.CSSProperties = {
      // Gradient backgrounds (from color scheme or custom)
      ...((isGradient || finalFillStyle === "gradient") &&
        (checked || indeterminate) && {
          background: gradient || colors.gradient,
        }),
      // Custom colors
      ...(checkedColor &&
        (checked || indeterminate) && {
          backgroundColor:
            finalFillStyle === "filled" ? checkedColor : undefined,
          borderColor:
            finalFillStyle !== "filled" ? checkedColor : "transparent",
        }),
      ...(borderColor &&
        !checked &&
        !indeterminate && {
          borderColor: borderColor,
        }),
      ...(uncheckedColor &&
        !checked &&
        !indeterminate && {
          backgroundColor: uncheckedColor,
        }),
      ...(hoverColor &&
        ({
          "--hover-color": hoverColor,
        } as React.CSSProperties)),
      ...(focusColor &&
        ({
          "--tw-ring-color": focusColor,
        } as React.CSSProperties)),
    };

    const iconStyle: React.CSSProperties = {
      ...(checkColor && { color: checkColor }),
      ...(finalFillStyle === "outline" &&
        checkedColor && { color: checkedColor }),
    };

    // Apply diamond shape counter-rotation to icon
    const iconWrapperStyle: React.CSSProperties = {
      ...(finalShape === "diamond" && { transform: "rotate(-45deg)" }),
    };

    // Checkbox input + visual box
    const checkboxElement = (
      <span className="relative inline-flex items-center">
        <input
          ref={setRefs}
          type="checkbox"
          id={inputId}
          name={name}
          checked={checked}
          disabled={finalDisabled}
          readOnly={readOnly}
          required={required}
          onChange={handleChange}
          className={cn(
            "peer sr-only",
            checkboxVariants({ variant: finalVariant, size: finalSize })
          )}
          aria-describedby={cn(descriptionId, errorId) || undefined}
          aria-invalid={hasError}
          {...props}
        />
        <span className={boxClasses} style={boxStyle} aria-hidden="true">
          <span style={{ ...iconStyle, ...iconWrapperStyle }}>
            <CheckboxIconDisplay
              checked={!!checked}
              indeterminate={indeterminate}
              loading={loading}
              size={finalSize}
              checkStyle={finalCheckStyle}
              animation={finalAnimation}
              customIcon={icon}
            />
          </span>
        </span>
      </span>
    );

    // Label content
    const labelContent = (label || description) && (
      <div className="flex flex-col gap-0.5">
        {label && (
          <span
            className={cn(
              checkboxTextVariants({
                size: finalSize,
                disabled: finalDisabled,
              }),
              hasError && "text-destructive",
              labelClassName
            )}
          >
            {label}
            {required && showRequiredIndicator && (
              <span className="text-destructive ml-1">*</span>
            )}
          </span>
        )}
        {description && (
          <span
            id={descriptionId}
            className={cn(
              checkboxDescriptionVariants({
                size: finalSize,
                disabled: finalDisabled,
              })
            )}
          >
            {description}
          </span>
        )}
      </div>
    );

    // Badge element
    const badgeElement = badge && (
      <span className="px-1.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded">
        {badge}
      </span>
    );

    // Recommended badge
    const recommendedBadge = recommended && (
      <span className="px-1.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded">
        Recommended
      </span>
    );

    // Card mode
    if (card) {
      return (
        <div className={cn("group", wrapperClassName)} title={tooltip}>
          <label
            htmlFor={inputId}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer",
              "transition-all duration-200",
              checked
                ? [colors.border, colors.bg, "shadow-md"]
                : hasError
                ? "border-destructive bg-destructive/5"
                : "border-border hover:border-muted-foreground/30",
              hoverEffect && !finalDisabled && "hover:shadow-lg",
              finalDisabled && "opacity-50 pointer-events-none"
            )}
          >
            {image && (
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                <img
                  src={image}
                  alt={typeof label === "string" ? label : "Option"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  {label && (
                    <span
                      className={cn(
                        checkboxTextVariants({
                          size: finalSize,
                          disabled: finalDisabled,
                        }),
                        "font-semibold",
                        hasError && "text-destructive"
                      )}
                    >
                      {label}
                      {required && showRequiredIndicator && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </span>
                  )}
                  {description && (
                    <span
                      className={cn(
                        checkboxDescriptionVariants({
                          size: finalSize,
                          disabled: finalDisabled,
                        })
                      )}
                    >
                      {description}
                    </span>
                  )}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {recommendedBadge}
                    {badgeElement}
                  </div>
                </div>
                {checkboxElement}
              </div>
            </div>
          </label>
          {error && (
            <p
              id={errorId}
              className="mt-1 text-sm text-destructive font-medium"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      );
    }

    // Standard mode
    return (
      <div
        className={cn("flex flex-col gap-1.5", wrapperClassName)}
        title={tooltip}
      >
        <label
          htmlFor={inputId}
          className={cn(
            checkboxLabelVariants({
              disabled: finalDisabled,
              labelPosition: labelPosition as
                | "left"
                | "right"
                | "top"
                | "bottom",
            })
          )}
        >
          {checkboxElement}
          {labelContent}
          {(badge || recommended) && (
            <div className="flex gap-2">
              {recommendedBadge}
              {badgeElement}
            </div>
          )}
        </label>

        {error && (
          <p
            id={errorId}
            className="text-sm text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

// ============================================
// CheckboxGroup Component
// ============================================

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      name,
      label,
      description,
      error,
      helperText,
      value: controlledValue,
      defaultValue,
      onChange,
      direction = "vertical",
      columns,
      variant = "primary",
      size = "md",
      colorScheme = "primary",
      shape = "rounded",
      checkStyle = "check",
      fillStyle = "filled",
      animation = "scale",
      card = false,
      options,
      children,
      className,
      showSelectAll = false,
      selectAllLabel = "Select All",
      minSelection,
      maxSelection,
      showCount = false,
      required = false,
      gap = "md",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const groupLabelId = label ? `checkbox-group-${uniqueId}-label` : undefined;

    // Controlled vs Uncontrolled
    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(
      defaultValue || []
    );
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    // Calculate selection state
    const totalOptions = options?.length || React.Children.count(children);
    const selectedCount = value.length;
    const allSelected = selectedCount === totalOptions && totalOptions > 0;
    const someSelected = selectedCount > 0 && selectedCount < totalOptions;
    const maxReached =
      maxSelection !== undefined && selectedCount >= maxSelection;

    // Determine if there's an error state
    const hasError = !!error || (required && selectedCount === 0);
    const showMinError =
      minSelection !== undefined && selectedCount < minSelection;
    const displayError =
      error ||
      (showMinError ? `Select at least ${minSelection} option(s)` : undefined);

    // Handle individual checkbox change
    const handleChange = (itemValue: string, checked: boolean) => {
      let newValue: string[];

      if (checked) {
        // Check max selection
        if (maxSelection !== undefined && value.length >= maxSelection) {
          return;
        }
        newValue = [...value, itemValue];
      } else {
        // Check min selection
        if (minSelection !== undefined && value.length <= minSelection) {
          return;
        }
        newValue = value.filter((v) => v !== itemValue);
      }

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    };

    // Handle select all
    const handleSelectAll = (checked: boolean) => {
      if (!options) return;

      let newValue: string[];
      if (checked) {
        const allValues = options
          .filter((opt) => !opt.disabled)
          .map((opt) => opt.value);

        // Respect max selection
        if (maxSelection !== undefined) {
          newValue = allValues.slice(0, maxSelection);
        } else {
          newValue = allValues;
        }
      } else {
        // Respect min selection
        if (minSelection !== undefined) {
          newValue = value.slice(0, minSelection);
        } else {
          newValue = [];
        }
      }

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    };

    // Context value
    const contextValue: CheckboxContextValue = {
      name,
      value,
      onChange: handleChange,
      variant,
      size,
      colorScheme,
      shape,
      checkStyle,
      fillStyle,
      animation,
      disabled,
      maxReached,
    };

    // Grid/Layout classes
    const layoutClasses = cn(
      columns ? "grid" : "flex",
      !columns &&
        (direction === "horizontal" ? "flex-row flex-wrap" : "flex-col"),
      columns && columnClasses[columns],
      card && !columns && "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      gapClasses[gap],
      hasError &&
        "p-2 border border-destructive/20 rounded-lg bg-destructive/5",
      className
    );

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={groupLabelId}
        aria-invalid={hasError}
        className="flex flex-col gap-3"
        {...props}
      >
        {/* Group Header */}
        {(label || description || showCount) && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              {label && (
                <label
                  id={groupLabelId}
                  className={cn(
                    "text-sm font-semibold",
                    hasError ? "text-destructive" : "text-foreground"
                  )}
                >
                  {label}
                  {required && <span className="text-destructive ml-1">*</span>}
                </label>
              )}
              {showCount && (
                <span className="text-sm text-muted-foreground">
                  {selectedCount}/{totalOptions} selected
                  {maxSelection && ` (max ${maxSelection})`}
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {/* Select All */}
        {showSelectAll && options && (
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onCheckedChange={handleSelectAll}
            label={selectAllLabel}
            size={size}
            colorScheme={colorScheme}
            shape={shape}
            fillStyle={fillStyle}
            animation={animation}
            disabled={disabled}
          />
        )}

        {/* Checkboxes */}
        <CheckboxContext.Provider value={contextValue}>
          <div className={layoutClasses}>
            {options
              ? options.map((option) => (
                  <Checkbox
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    description={option.description}
                    disabled={option.disabled || disabled}
                    checked={value.includes(option.value)}
                    card={card}
                    icon={option.icon}
                    badge={option.badge}
                    image={option.image}
                    recommended={option.recommended}
                    tooltip={option.tooltip}
                  />
                ))
              : children}
          </div>
        </CheckboxContext.Provider>

        {/* Error/Helper Text */}
        {displayError && (
          <p className="text-sm text-destructive font-medium" role="alert">
            {displayError}
          </p>
        )}
        {!displayError && helperText && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

export default Checkbox;
