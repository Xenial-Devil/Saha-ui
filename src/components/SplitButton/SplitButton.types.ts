import React from "react";
import type { ButtonProps } from "../Button/Button.types";

export interface SplitButtonAction {
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export interface SplitButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  /**
   * The main action callback when the left side of the button is clicked
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Extends the button label
   */
  children?: React.ReactNode;

  /**
   * The dropdown actions triggered by the right side (chevron)
   */
  actions: SplitButtonAction[];

  /**
   * Custom dropdown icon
   */
  dropdownIcon?: React.ReactNode;
}
