import type { VariantProps } from "class-variance-authority";
import { speedDialVariants } from "./SpeedDial.styles";

/**
 * SpeedDial position types
 * Determines where the SpeedDial is positioned on the screen
 */
export type SpeedDialPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/**
 * SpeedDial direction types
 * Defines the direction in which action buttons expand
 */
export type SpeedDialDirection = "up" | "down" | "left" | "right";

/**
 * SpeedDial action item
 */
export interface SpeedDialAction {
  /**
   * Unique identifier for the action
   */
  id: string;

  /**
   * Icon to display for the action
   */
  icon: React.ReactNode;

  /**
   * Label/tooltip text for the action
   */
  label: string;

  /**
   * Click handler for the action
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Whether the action is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom className for the action button
   */
  className?: string;

  /**
   * Color variant for the action button
   */
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info";
}

/**
 * Props for the SpeedDial component
 *
 * @example
 * ```tsx
 * // Basic speed dial
 * <SpeedDial
 *   icon={<Plus />}
 *   actions={[
 *     { id: '1', icon: <Edit />, label: 'Edit', onClick: handleEdit },
 *     { id: '2', icon: <Share />, label: 'Share', onClick: handleShare },
 *     { id: '3', icon: <Delete />, label: 'Delete', onClick: handleDelete },
 *   ]}
 * />
 *
 * // With custom position
 * <SpeedDial
 *   icon={<Menu />}
 *   position="bottom-right"
 *   direction="up"
 *   actions={actions}
 * />
 *
 * // With custom colors
 * <SpeedDial
 *   icon={<Add />}
 *   color="primary"
 *   actions={[
 *     { id: '1', icon: <File />, label: 'New File', color: 'primary' },
 *     { id: '2', icon: <Folder />, label: 'New Folder', color: 'secondary' },
 *   ]}
 * />
 *
 * // Controlled open state
 * <SpeedDial
 *   icon={<Plus />}
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   actions={actions}
 * />
 * ```
 */
export interface SpeedDialProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof speedDialVariants> {
  /**
   * The icon to display in the main FAB button
   */
  icon: React.ReactNode;

  /**
   * Array of action items to display when expanded
   */
  actions: SpeedDialAction[];

  /**
   * Position of the SpeedDial on the screen
   * @default "bottom-right"
   */
  position?: SpeedDialPosition;

  /**
   * Direction in which actions expand
   * @default "up"
   */
  direction?: SpeedDialDirection;

  /**
   * Color scheme of the main button
   * @default "primary"
   */
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info";

  /**
   * Size of the SpeedDial button
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the SpeedDial is open (controlled mode)
   */
  open?: boolean;

  /**
   * Callback when open state changes (controlled mode)
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether to show labels for actions
   * @default true
   */
  showLabels?: boolean;

  /**
   * Whether to close the SpeedDial after an action is clicked
   * @default true
   */
  closeOnActionClick?: boolean;

  /**
   * Whether to close when clicking outside
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * Whether the SpeedDial is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom icon to display when open (defaults to X or rotated icon)
   */
  openIcon?: React.ReactNode;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Custom className for the main button
   */
  buttonClassName?: string;

  /**
   * Custom className for the actions container
   */
  actionsClassName?: string;

  /**
   * Custom className for individual action items
   */
  actionClassName?: string;

  /**
   * Accessible label for the main button
   */
  "aria-label"?: string;

  /**
   * Whether to show a backdrop when open
   * @default false
   */
  showBackdrop?: boolean;

  /**
   * Custom backdrop className
   */
  backdropClassName?: string;
}
