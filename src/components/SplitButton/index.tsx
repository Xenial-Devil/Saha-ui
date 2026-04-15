"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { SplitButtonProps } from "./SplitButton.types";
import Button from "../Button";
import { ButtonGroup } from "../ButtonGroup";
// Ensure Dropdown is exported from Dropdown
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "../Dropdown";
import {
  splitButtonMainVariants,
  splitButtonToggleVariants,
  splitButtonDropdownContentVariants,
  splitButtonDropdownItemVariants,
} from "./SplitButton.styles";

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
    const restProps = props;
    
    return (
      <ButtonGroup ref={ref} className={className}>
        {/* Main Action Button */}
        <Button
          variant={variant}
          size={size}
          onClick={onClick}
          disabled={disabled}
          {...restProps}
          className={cn(splitButtonMainVariants(), className)}
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
              className={splitButtonToggleVariants()}
              aria-label="More options"
              aria-haspopup="true"
            >
              {dropdownIcon || <ChevronDownIcon className="h-4 w-4" />}
            </Button>
          </DropdownTrigger>
          <DropdownContent align="end" className={splitButtonDropdownContentVariants()}>
            {actions.map((action, index) => (
              <DropdownItem
                key={`split-btn-action-${index}`}
                onSelect={action.onClick}
                disabled={action.disabled}
                className={splitButtonDropdownItemVariants()}
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
