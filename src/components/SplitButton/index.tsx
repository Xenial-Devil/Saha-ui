"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { SplitButtonProps } from "./SplitButton.types";
import Button from "../Button";
import { ButtonGroup } from "../ButtonGroup";
// Ensure Dropdown is exported from Dropdown
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "../Dropdown";

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

/**
 * SplitButton Component
 *
 * Composes a Button and a Dropdown menu into a single ButtonGroup.
 * 
 * @example
 * ```tsx
 * <SplitButton 
 *   onClick={() => deploy()}
 *   actions={[
 *     { label: "Deploy to Staging", onClick: () => deployStaging() },
 *     { label: "Deploy to Prod", onClick: () => deployProd() }
 *   ]}
 * >
 *   Deploy
 * </SplitButton>
 * ```
 */
export const SplitButton = forwardRef<HTMLDivElement, SplitButtonProps>(
  (
    {
      children,
      onClick,
      actions,
      dropdownIcon,
      variant = "primary",
      size = "md",
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const { className: propsClassName, ...restProps } = props as any;
    
    return (
      <ButtonGroup ref={ref} className={className}>
        {/* Main Action Button */}
        <Button
          variant={variant}
          size={size}
          onClick={onClick}
          disabled={disabled}
          {...restProps}
          className={cn("rounded-r-none border-r-0 focus:z-10", className, propsClassName)}
        >
          {children}
        </Button>

        {/* Dropdown Toggle Button */}
        <Dropdown>
          <DropdownTrigger asChild>
            <Button
              variant={variant}
              size={size}
              disabled={disabled}
              className="rounded-l-none px-2 focus:z-10 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 border-l border-white/20 dark:border-black/20"
              aria-label="More options"
              aria-haspopup="true"
            >
              {dropdownIcon || <ChevronDownIcon className="h-4 w-4" />}
            </Button>
          </DropdownTrigger>
          <DropdownContent align="end" className="min-w-[160px]">
            {actions.map((action, index) => (
              <DropdownItem
                key={`split-btn-action-${index}`}
                onSelect={action.onClick}
                disabled={action.disabled}
                className="flex items-center gap-2 cursor-pointer"
              >
                {action.icon && <span className="h-4 w-4 shrink-0">{action.icon}</span>}
                <span>{action.label}</span>
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </ButtonGroup>
    );
  }
);

SplitButton.displayName = "SplitButton";

export default SplitButton;
