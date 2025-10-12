import type { VariantProps } from "class-variance-authority";

export type TreeVariant = "default" | "glass" | "bordered" | "minimal";
export type TreeSize = "sm" | "md" | "lg";
export type TreeNodeIconPosition = "left" | "right";

export interface TreeNode {
  id: string | number;
  label: React.ReactNode;
  children?: TreeNode[];
  icon?: React.ReactNode;
  expanded?: boolean;
  disabled?: boolean;
  className?: string;
  iconPosition?: TreeNodeIconPosition;
}

export interface TreeProps extends VariantProps<any> {
  nodes: TreeNode[];
  variant?: TreeVariant;
  size?: TreeSize;
  className?: string;
  nodeClassName?: string;
  iconPosition?: TreeNodeIconPosition;
  showLines?: boolean;
  showIcons?: boolean;
  onNodeToggle?: (id: string | number, expanded: boolean) => void;
  onNodeClick?: (id: string | number) => void;
}
