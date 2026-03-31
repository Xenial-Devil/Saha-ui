import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { floatingToolbarVariants } from "./FloatingToolbar.styles";
import type { ButtonGroupProps } from "../ButtonGroup/ButtonGroup.types";

export interface FloatingToolbarProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof floatingToolbarVariants> {
  /** Props to pass to the inner ButtonGroup */
  buttonGroupProps?: ButtonGroupProps;
}
