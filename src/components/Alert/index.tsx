"use client";

import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { AlertProps } from "./Alert.types";
import { alertVariants } from "./Alert.styles";

// Status icon components
const StatusIcon: React.FC<{
  status: "info" | "success" | "warning" | "danger";
}> = ({ status }) => {
  const iconClasses = "w-6 h-6 flex-shrink-0";

  if (status === "success") {
    return (
      <svg
        className={iconClasses}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }

  if (status === "warning") {
    return (
      <svg
        className={iconClasses}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    );
  }

  if (status === "danger") {
    return (
      <svg
        className={iconClasses}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }

  // Info icon
  return (
    <svg
      className={iconClasses}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "default",
      message = "",
      title,
      status = "info",
      rounded = true,
      closeable = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    // Parse message for links
    const messageParts = message.split(/(https?:\/\/[^\s]+)/);
    const renderedMessage = messageParts.map((part, index) =>
      part.match(/(https?:\/\/[^\s]+)/) ? (
        <a
          key={index}
          className="underline hover:opacity-80 transition-opacity font-medium"
          href={part}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      ) : (
        <span key={index}>{part}</span>
      )
    );

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ variant, status, rounded }), className)}
        role="alert"
        {...props}
      >
        {/* Content wrapper */}
        <div className="relative z-10 flex items-start gap-3">
          {/* Status Icon */}
          <StatusIcon status={status} />

          {/* Message Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="font-semibold text-base mb-1 tracking-tight">
                {title}
              </h4>
            )}
            <div className="text-sm leading-relaxed opacity-95">
              {renderedMessage}
            </div>
          </div>

          {/* Close Button */}
          {closeable && (
            <button
              onClick={() => setIsOpen(false)}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-current/30"
              aria-label="Close alert"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export default Alert;
