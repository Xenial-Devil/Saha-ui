"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { Alert } from "../Alert";
import type { AnnouncementBarProps } from "./AnnouncementBar.types";
import {
  announcementBarVariants,
  announcementBarContentVariants,
  announcementBarCloseVariants,
} from "./AnnouncementBar.styles";

/**
 * AnnouncementBar Component
 *
 * A prominent, dismissible banner usually displayed at the top or bottom
 * of the page for important announcements. Composes the Alert component.
 *
 * @component
 * @example
 * // Basic usage
 * <AnnouncementBar variant="primary" closable={true}>
 *   We have updated our privacy policy.
 * </AnnouncementBar>
 *
 * @example
 * // With custom action
 * <AnnouncementBar
 *   variant="info"
 *   action={{ label: "Learn More", onClick: () => console.log('clicked') }}
 * >
 *   New feature available!
 * </AnnouncementBar>
 */
export const AnnouncementBar = forwardRef<HTMLDivElement, AnnouncementBarProps>(
  (
    {
      className,
      variant = "primary",
      closable = true,
      onClose,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Alert
        ref={ref}
        role="alert"
        aria-live="polite"
        variant={variant as any}
        className={cn(announcementBarVariants({ variant }), className)}
        message={
          <div className={announcementBarContentVariants()}>
            {children}
            {closable && (
              <button
                type="button"
                onClick={onClose}
                className={announcementBarCloseVariants()}
                aria-label="Close announcement"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>
        }
        {...props}
      />
    );
  },
);
AnnouncementBar.displayName = "AnnouncementBar";
