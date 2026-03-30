import type { HTMLAttributes, ReactNode } from "react";

export interface CookieConsentProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** The title of the consent dialog */
  title?: ReactNode;
  /** The description or body text */
  description?: ReactNode;
  /** Primary action label */
  acceptLabel?: string;
  /** Secondary action label */
  declineLabel?: string;
  /** Callback when user accepts */
  onAccept?: () => void;
  /** Callback when user declines */
  onDecline?: () => void;
  /** Position of the dialog */
  position?: "bottom-left" | "bottom-right" | "bottom-center" | "center";
}
