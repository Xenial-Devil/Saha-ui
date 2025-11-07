import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";
import {
  resultStyles,
  resultIconStyles,
  resultIconInnerStyles,
  resultTitleStyles,
  resultSubTitleStyles,
  resultExtraStyles,
} from "./Result.styles";
import type { ResultProps, ResultStatus } from "./Result.types";

// Default icons for each status
const CheckCircleIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const XCircleIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const InfoCircleIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ExclamationTriangleIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const NotFoundIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ForbiddenIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
    />
  </svg>
);

const ServerErrorIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
    />
  </svg>
);

const statusIcons: Record<ResultStatus, () => React.JSX.Element> = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  info: InfoCircleIcon,
  warning: ExclamationTriangleIcon,
  "404": NotFoundIcon,
  "403": ForbiddenIcon,
  "500": ServerErrorIcon,
};

const defaultTitles: Record<ResultStatus, string> = {
  success: "Success",
  error: "Error",
  info: "Information",
  warning: "Warning",
  "404": "404 Not Found",
  "403": "403 Forbidden",
  "500": "500 Server Error",
};

const defaultSubTitles: Record<ResultStatus, string> = {
  success: "Your operation has been completed successfully.",
  error: "An error occurred while processing your request.",
  info: "Here is some information for you.",
  warning: "Please pay attention to this warning.",
  "404": "Sorry, the page you visited does not exist.",
  "403": "Sorry, you do not have permission to access this page.",
  "500": "Sorry, something went wrong on our end.",
};

export const Result = forwardRef<HTMLDivElement, ResultProps>(
  (
    {
      status = "info",
      icon,
      title,
      subTitle,
      extra,
      size = "md",
      className,
      iconClassName,
      titleClassName,
      subTitleClassName,
      extraClassName,
      ...props
    },
    ref,
  ) => {
    const IconComponent = statusIcons[status];
    const displayTitle = title ?? defaultTitles[status];
    const displaySubTitle = subTitle ?? defaultSubTitles[status];

    return (
      <div
        ref={ref}
        className={cn(resultStyles({ size }), className)}
        {...props}
      >
        <div className={cn(resultIconStyles({ status, size }), iconClassName)}>
          {icon || (
            <div className={resultIconInnerStyles({ size })}>
              <IconComponent />
            </div>
          )}
        </div>

        {displayTitle && (
          <div className={cn(resultTitleStyles({ size }), titleClassName)}>
            {displayTitle}
          </div>
        )}

        {displaySubTitle && (
          <div
            className={cn(resultSubTitleStyles({ size }), subTitleClassName)}
          >
            {displaySubTitle}
          </div>
        )}

        {extra && (
          <div className={cn(resultExtraStyles(), extraClassName)}>{extra}</div>
        )}
      </div>
    );
  },
);

Result.displayName = "Result";

export type { ResultProps };
