import React from "react";

export type TreeVariant = "default" | "glass" | "bordered" | "minimal";
export type TreeSize = "sm" | "md" | "lg";
export type TreeNodeIconPosition = "left" | "right";

export interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TreeVariant;
  size?: TreeSize;
  iconPosition?: TreeNodeIconPosition;
  showLines?: boolean;
  showIcons?: boolean;
  children?: React.ReactNode;
}

export interface TreeItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  label: React.ReactNode;
  icon?: React.ReactNode;
  expanded?: boolean;
  disabled?: boolean;
  onToggle?: (expanded: boolean) => void;
  children?: React.ReactNode;
}
