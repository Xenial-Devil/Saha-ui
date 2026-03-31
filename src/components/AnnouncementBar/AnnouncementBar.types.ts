import type { ReactNode } from "react";
import type { AlertProps } from "../Alert";

export interface AnnouncementBarProps extends Omit<AlertProps, "variant"> {
  /** The variant of the announcement bar */
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "destructive"
    | "warning"
    | "success"
    | "info";
  /** Whether the bar can be closed */
  closable?: boolean;
  /** Callback when the close button is clicked */
  onClose?: () => void;
  /** Children nodes */
  children?: ReactNode;
}
