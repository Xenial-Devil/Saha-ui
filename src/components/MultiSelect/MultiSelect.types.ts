import type { ReactNode } from "react";
import type { SelectProps } from "../Select/Select.types";

/**
 * Props for MultiSelect
 * Extends SelectProps but forces multiple to true and uses an array of strings for value
 */
export interface MultiSelectProps 
  extends Omit<SelectProps, "multiple" | "value" | "defaultValue" | "onChange"> {
  /**
   * Selected values (controlled)
   */
  value?: string[];
  
  /**
   * Default selected values (uncontrolled)
   */
  defaultValue?: string[];
  
  /**
   * Callback fired when selection changes
   */
  onChange?: (value: string[]) => void;
  
  /**
   * Maximum number of selections allowed
   */
  maxSelections?: number;
  
  /**
   * Whether to show a "Select All" option
   * @default false
   */
  showSelectAll?: boolean;

  /**
   * Children components
   */
  children?: ReactNode;
}
