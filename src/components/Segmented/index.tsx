"use client";

import React, { useState, useRef, useEffect } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { SegmentedProps, SegmentedOption } from "./Segmented.types";
import {
  segmentedVariants,
  segmentedOptionVariants,
  segmentedIndicatorVariants,
} from "./Segmented.styles";
import { Slot } from "../../lib/Slot";

export type SegmentedVariantsProps = VariantProps<typeof segmentedVariants>;

/**
 * Segmented Component
 *
 * A segmented control component (iOS-style button group).
 * Perfect for switching between views or filtering options.
 * Features animated indicator and full keyboard support.
 *
 * @example
 * ```tsx
 * // Basic segmented control
 * <Segmented
 *   options={[
 *     { value: 'list', label: 'List' },
 *     { value: 'grid', label: 'Grid' },
 *   ]}
 *   value={view}
 *   onChange={setView}
 * />
 *
 * // With icons
 * <Segmented
 *   options={[
 *     { value: 'list', label: 'List', icon: <List /> },
 *     { value: 'grid', label: 'Grid', icon: <Grid /> },
 *   ]}
 *   value={view}
 *   onChange={setView}
 * />
 *
 * // Different variants
 * <Segmented
 *   options={options}
 *   value={value}
 *   onChange={setValue}
 *   variant="outlined"
 * />
 *
 * // Block (full width)
 * <Segmented
 *   options={options}
 *   value={value}
 *   onChange={setValue}
 *   block
 * />
 * ```
 */
const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      variant = "default",
      size = "md",
      block = false,
      disabled = false,
      className,
      optionClassName,
      indicatorClassName,
      animated = true,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<string>(
      defaultValue || options[0]?.value || "",
    );
    const [indicatorStyle, setIndicatorStyle] = useState<{
      left: number;
      width: number;
    }>({ left: 0, width: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const optionRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

    // Determine if component is controlled
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    // Update indicator position
    const updateIndicator = (value: string) => {
      const optionElement = optionRefs.current.get(value);
      const containerElement = containerRef.current;

      if (optionElement && containerElement) {
        const containerRect = containerElement.getBoundingClientRect();
        const optionRect = optionElement.getBoundingClientRect();

        setIndicatorStyle({
          left: optionRect.left - containerRect.left,
          width: optionRect.width,
        });
      }
    };

    // Update indicator when value changes
    useEffect(() => {
      if (currentValue) {
        updateIndicator(currentValue);
      }
    }, [currentValue, options]);

    // Update indicator on resize
    useEffect(() => {
      const handleResize = () => {
        if (currentValue) {
          updateIndicator(currentValue);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [currentValue]);

    // Handle option change
    const handleChange = (value: string) => {
      if (disabled) return;

      const option = options.find(
        (opt: SegmentedOption) => opt.value === value,
      );
      if (option?.disabled) return;

      if (!isControlled) {
        setUncontrolledValue(value);
      }

      onChange?.(value);
    };

    // Handle keyboard navigation
    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement>,
      currentIndex: number,
    ) => {
      const enabledOptions = options.filter(
        (opt: SegmentedOption) => !opt.disabled,
      );
      const currentEnabledIndex = enabledOptions.findIndex(
        (opt: SegmentedOption) => opt.value === options[currentIndex].value,
      );

      let nextIndex = currentEnabledIndex;

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex =
          currentEnabledIndex > 0
            ? currentEnabledIndex - 1
            : enabledOptions.length - 1;
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex =
          currentEnabledIndex < enabledOptions.length - 1
            ? currentEnabledIndex + 1
            : 0;
      } else if (event.key === "Home") {
        event.preventDefault();
        nextIndex = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        nextIndex = enabledOptions.length - 1;
      } else {
        return;
      }

      const nextOption = enabledOptions[nextIndex];
      if (nextOption) {
        handleChange(nextOption.value);
        optionRefs.current.get(nextOption.value)?.focus();
      }
    };

    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={(node: HTMLDivElement | null) => {
          // Handle both refs
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          (
            containerRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
        }}
        className={cn(
          segmentedVariants({ variant, size, block, disabled }),
          className,
        )}
        role="tablist"
        {...props}
      >
        {/* Animated indicator */}
        {currentValue && (
          <div
            className={cn(
              segmentedIndicatorVariants({ variant, size, animated }),
              indicatorClassName,
            )}
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Options */}
        {options.map((option: SegmentedOption, index: number) => {
          const isActive = option.value === currentValue;
          const isDisabled = disabled || option.disabled;

          return (
            <button
              key={option.value}
              ref={(el) => {
                if (el) {
                  optionRefs.current.set(option.value, el);
                } else {
                  optionRefs.current.delete(option.value);
                }
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-disabled={isDisabled}
              tabIndex={isActive ? 0 : -1}
              disabled={isDisabled}
              onClick={() => handleChange(option.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                segmentedOptionVariants({
                  variant,
                  size,
                  active: isActive,
                  disabled: isDisabled,
                  block,
                }),
                option.className,
                optionClassName,
              )}
            >
              {option.icon && (
                <span className="flex-shrink-0" aria-hidden="true">
                  {option.icon}
                </span>
              )}
              {option.label}
            </button>
          );
        })}
      </Comp>
    );
  },
);

Segmented.displayName = "Segmented";

export { Segmented };
export default Segmented;
export type { SegmentedProps, SegmentedOption };
