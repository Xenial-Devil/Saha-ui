"use client";

import { forwardRef, useState } from "react";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem
} from "../Select";
import type { MultiSelectProps } from "./MultiSelect.types";
import {
  multiSelectContentVariants,
  multiSelectAllItemVariants,
  multiSelectSeparatorVariants,
} from "./MultiSelect.styles";

/**
 * MultiSelect Component
 *
 * A specialized instance of Select configured for multiple selections.
 * 
 * @example
 * ```tsx
 * <MultiSelect
 *   placeholder="Select colors..."
 *   onChange={(vals) => console.log(vals)}
 * >
 *   <SelectItem value="red">Red</SelectItem>
 *   <SelectItem value="green">Green</SelectItem>
 * </MultiSelect>
 * ```
 */
export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      maxSelections,
      showSelectAll = false,
      children,
      label,
      placeholder = "Select options...",
      ...props
    },
    ref
  ) => {
    // Determine controlled vs uncontrolled
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue || []);
    const currentValue = isControlled ? value : internalValue;

    const handleChange = (val: string | string[]) => {
      const arrayVal = Array.isArray(val) ? val : [val];
      
      // Enforce maxSelections if set
      if (maxSelections && arrayVal.length > maxSelections) {
        return;
      }

      if (!isControlled) {
        setInternalValue(arrayVal);
      }
      onChange?.(arrayVal);
    };

    return (
      <Select
        multiple={true}
        value={currentValue as any} // Cast needed due to Select generic typing
        onChange={handleChange as any}
        label={label}
        {...props}
      >
        <SelectTrigger ref={ref} className={props.className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <div className={multiSelectContentVariants()}>
            {showSelectAll && (
              <>
                <SelectItem value="_all" className={multiSelectAllItemVariants()}>
                  Select All
                </SelectItem>
                <div className={multiSelectSeparatorVariants()} />
              </>
            )}
            {children}
          </div>
        </SelectContent>
      </Select>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
