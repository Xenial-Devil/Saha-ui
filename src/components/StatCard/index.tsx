"use client";

import React, { useEffect, useState, useRef } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { StatCardProps } from "./StatCard.types";
import {
  statCardVariants,
  statCardHeaderVariants,
  statCardTitleVariants,
  statCardIconVariants,
  statCardValueVariants,
  statCardDescriptionVariants,
  statCardTrendVariants,
  statCardFooterVariants,
  statCardSkeletonVariants,
} from "./StatCard.styles";
import { Slot } from "../../lib/Slot";

export type StatCardVariantsProps = VariantProps<typeof statCardVariants>;

/**
 * AnimatedCounter Component (internal)
 * Animates numeric values when they change
 */
const AnimatedCounter: React.FC<{
  value: string | number;
  duration?: number;
}> = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Extract numeric value
    const numericValue =
      typeof value === "number"
        ? value
        : parseFloat(String(value).replace(/[^0-9.-]/g, ""));

    if (isNaN(numericValue)) {
      return;
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * numericValue;

      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = null;
    };
  }, [value, duration]);

  // Format the display value to match the original format
  const formatValue = () => {
    const valueStr = String(value);
    const hasDecimals = valueStr.includes(".");
    const decimalPlaces = hasDecimals ? valueStr.split(".")[1]?.length || 0 : 0;

    return displayValue.toFixed(decimalPlaces);
  };

  return <>{formatValue()}</>;
};

AnimatedCounter.displayName = "AnimatedCounter";

/**
 * StatCard Component
 *
 * A statistics card component for displaying key metrics and KPIs.
 * Perfect for dashboards, analytics, and data visualization.
 * Supports trends, icons, custom colors, and animated counters.
 *
 * @example
 * ```tsx
 * // Basic stat card
 * <StatCard
 *   title="Total Revenue"
 *   value="$45,231"
 *   icon={<DollarSign />}
 * />
 *
 * // With trend indicator
 * <StatCard
 *   title="Active Users"
 *   value="2,543"
 *   trend="up"
 *   trendValue="+12.5%"
 *   icon={<Users />}
 *   color="success"
 * />
 *
 * // With custom variant
 * <StatCard
 *   title="Sales"
 *   value="$12,345"
 *   color="primary"
 *   variant="gradient"
 *   trend="up"
 *   trendValue="+23%"
 *   description="From last month"
 * />
 *
 * // With animated counter
 * <StatCard
 *   title="Total Orders"
 *   value={1234}
 *   animateValue={true}
 *   icon={<ShoppingCart />}
 * />
 *
 * // Clickable card
 * <StatCard
 *   title="Pending Tasks"
 *   value="42"
 *   clickable={true}
 *   onClick={() => console.log('Card clicked')}
 *   icon={<CheckSquare />}
 * />
 * ```
 */
const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      icon,
      description,
      trend,
      trendValue,
      trendDescription,
      variant = "default",
      color = "default",
      size = "md",
      footer,
      loading = false,
      loadingComponent,
      animateValue = false,
      animationDuration = 1000,
      className,
      headerClassName,
      valueClassName,
      iconClassName,
      trendClassName,
      footerClassName,
      asChild = false,
      onClick,
      clickable = false,
      ...props
    },
    ref,
  ) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const Comp = asChild ? Slot : "div";

    // Render loading state
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            statCardVariants({ variant, color, size, loading: true }),
            className,
          )}
          {...props}
        >
          {loadingComponent || (
            <>
              <div
                className={cn(
                  statCardHeaderVariants({ size }),
                  headerClassName,
                )}
              >
                <div className="flex-1">
                  <div
                    className={cn(
                      statCardSkeletonVariants({ size }),
                      "w-24 mb-2",
                    )}
                  />
                </div>
                {icon && (
                  <div
                    className={cn(
                      statCardSkeletonVariants({ size }),
                      "w-10 h-10 rounded-lg",
                    )}
                  />
                )}
              </div>
              <div
                className={cn(statCardSkeletonVariants({ size }), "w-32 h-8")}
              />
            </>
          )}
        </div>
      );
    }

    // Get trend icon
    const getTrendIcon = () => {
      switch (trend) {
        case "up":
          return <TrendingUp className="h-4 w-4" />;
        case "down":
          return <TrendingDown className="h-4 w-4" />;
        case "neutral":
          return <Minus className="h-4 w-4" />;
        default:
          return null;
      }
    };

    // Determine if value is numeric for animation
    const isNumericValue =
      typeof value === "number" ||
      !isNaN(parseFloat(String(value).replace(/[^0-9.-]/g, "")));

    return (
      <Comp
        ref={ref}
        className={cn(
          statCardVariants({
            variant,
            color,
            size,
            clickable: clickable || !!onClick,
            loading: false,
          }),
          className,
        )}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick(e as any);
                }
              }
            : undefined
        }
        {...props}
      >
        {/* Header with title and icon */}
        <div className={cn(statCardHeaderVariants({ size }), headerClassName)}>
          <div className="flex-1">
            <h3 className={cn(statCardTitleVariants({ size }))}>{title}</h3>
          </div>
          {icon && (
            <div
              className={cn(
                statCardIconVariants({ color, size }),
                iconClassName,
              )}
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
        </div>

        {/* Main value */}
        <div className={cn(statCardValueVariants({ size }), valueClassName)}>
          {animateValue && mounted && isNumericValue ? (
            <AnimatedCounter
              value={value as string | number}
              duration={animationDuration}
            />
          ) : (
            value
          )}
        </div>

        {/* Description */}
        {description && (
          <div className={cn(statCardDescriptionVariants({ size }))}>
            {description}
          </div>
        )}

        {/* Trend indicator */}
        {(trend || trendValue) && (
          <div className={cn("mt-3 flex items-center gap-2", trendClassName)}>
            {trendValue && (
              <div className={cn(statCardTrendVariants({ trend, size }))}>
                {getTrendIcon()}
                <span>{trendValue}</span>
              </div>
            )}
            {trendDescription && (
              <span className="text-xs text-muted-foreground">
                {trendDescription}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div
            className={cn(statCardFooterVariants({ size }), footerClassName)}
          >
            {footer}
          </div>
        )}
      </Comp>
    );
  },
);

StatCard.displayName = "StatCard";

export { StatCard };
export default StatCard;
export type { StatCardProps };
