import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { AlertProps } from "./Alert.types";

// CVA variants for Alert
const alertVariants = cva(
  "relative w-full p-4 transition-all duration-300 ease-out overflow-hidden isolate",
  {
    variants: {
      variant: {
        solid:
          "shadow-lg before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-50",
        subtle:
          "backdrop-blur-sm bg-opacity-10 border border-current/20 shadow-md",
        "left-accent":
          "border-l-4 bg-opacity-10 backdrop-blur-sm shadow-md before:absolute before:left-0 before:inset-y-0 before:w-1 before:bg-gradient-to-b before:from-transparent before:via-current before:to-transparent",
        "top-accent":
          "border-t-4 bg-opacity-10 backdrop-blur-sm shadow-md before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-transparent before:via-current before:to-transparent",
        outline:
          "bg-card/50 backdrop-blur-sm border-2 border-current/30 shadow-md hover:border-current/50 hover:shadow-lg",
        glass:
          "bg-background/30 backdrop-blur-xl border border-white/10 shadow-2xl",
      },
      status: {
        info: "",
        success: "",
        warning: "",
        danger: "",
      },
      rounded: {
        true: "rounded-xl",
        false: "rounded-none",
      },
    },
    compoundVariants: [
      // Solid variant colors
      {
        variant: "solid",
        status: "info",
        className: "bg-info text-info-foreground",
      },
      {
        variant: "solid",
        status: "success",
        className: "bg-success text-success-foreground",
      },
      {
        variant: "solid",
        status: "warning",
        className: "bg-warning text-warning-foreground",
      },
      {
        variant: "solid",
        status: "danger",
        className: "bg-destructive text-destructive-foreground",
      },
      // Subtle variant colors
      {
        variant: "subtle",
        status: "info",
        className: "bg-info/10 text-info border-info/20",
      },
      {
        variant: "subtle",
        status: "success",
        className: "bg-success/10 text-success border-success/20",
      },
      {
        variant: "subtle",
        status: "warning",
        className: "bg-warning/10 text-warning border-warning/20",
      },
      {
        variant: "subtle",
        status: "danger",
        className: "bg-destructive/10 text-destructive border-destructive/20",
      },
      // Left-accent variant colors
      {
        variant: "left-accent",
        status: "info",
        className: "bg-info/5 text-foreground border-info",
      },
      {
        variant: "left-accent",
        status: "success",
        className: "bg-success/5 text-foreground border-success",
      },
      {
        variant: "left-accent",
        status: "warning",
        className: "bg-warning/5 text-foreground border-warning",
      },
      {
        variant: "left-accent",
        status: "danger",
        className: "bg-destructive/5 text-foreground border-destructive",
      },
      // Top-accent variant colors
      {
        variant: "top-accent",
        status: "info",
        className: "bg-info/5 text-foreground border-info",
      },
      {
        variant: "top-accent",
        status: "success",
        className: "bg-success/5 text-foreground border-success",
      },
      {
        variant: "top-accent",
        status: "warning",
        className: "bg-warning/5 text-foreground border-warning",
      },
      {
        variant: "top-accent",
        status: "danger",
        className: "bg-destructive/5 text-foreground border-destructive",
      },
      // Outline variant colors
      {
        variant: "outline",
        status: "info",
        className: "border-info/30 text-foreground hover:border-info/50",
      },
      {
        variant: "outline",
        status: "success",
        className: "border-success/30 text-foreground hover:border-success/50",
      },
      {
        variant: "outline",
        status: "warning",
        className: "border-warning/30 text-foreground hover:border-warning/50",
      },
      {
        variant: "outline",
        status: "danger",
        className:
          "border-destructive/30 text-foreground hover:border-destructive/50",
      },
      // Glass variant colors
      {
        variant: "glass",
        status: "info",
        className: "text-info",
      },
      {
        variant: "glass",
        status: "success",
        className: "text-success",
      },
      {
        variant: "glass",
        status: "warning",
        className: "text-warning",
      },
      {
        variant: "glass",
        status: "danger",
        className: "text-destructive",
      },
    ],
    defaultVariants: {
      variant: "solid",
      status: "info",
      rounded: true,
    },
  }
);

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
      variant = "solid",
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
