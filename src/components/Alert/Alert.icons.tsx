import React from "react";
import { AlertStatus, IconAnimation } from "./Alert.types";
import { getIconAnimationClass } from "./Alert.styles";
import { cn } from "../../lib/utils";

// Status icon paths
const iconPaths: Record<AlertStatus, string> = {
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  warning:
    "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  danger:
    "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  neutral: "M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

// Extra icon paths
export const extraIcons = {
  close: "M6 18L18 6M6 6l12 12",
  check: "M5 13l4 4L19 7",
  checkCircle: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  x: "M6 18L18 6M6 6l12 12",
  xCircle:
    "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  alertTriangle:
    "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  alertCircle: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  infoCircle: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  shield:
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  lightning: "M13 10V3L4 14h7v7l9-11h-7z",
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  heart:
    "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  fire: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
};

// Base SVG props
const baseSvgProps = {
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// Status Icon Component
export const StatusIcon: React.FC<{
  status: AlertStatus;
  animation?: IconAnimation;
  className?: string;
}> = ({ status, animation = "none", className }) => (
  <svg
    className={cn(
      "w-5 h-5 shrink-0",
      getIconAnimationClass(animation),
      className
    )}
    {...baseSvgProps}
  >
    <path d={iconPaths[status]} />
  </svg>
);

// Generic Icon Component
export const Icon: React.FC<{
  name: keyof typeof extraIcons;
  animation?: IconAnimation;
  className?: string;
}> = ({ name, animation = "none", className }) => (
  <svg
    className={cn(
      "w-5 h-5 shrink-0",
      getIconAnimationClass(animation),
      className
    )}
    {...baseSvgProps}
  >
    <path d={extraIcons[name]} />
  </svg>
);

// Spinner Component
export const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn(
      "w-5 h-5 shrink-0 animate-[spin_1s_linear_infinite]",
      className
    )}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Animated Check Component
export const AnimatedCheck: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    className={cn("w-5 h-5 shrink-0", className)}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      className="animate-[draw-circle_0.5s_ease-out_forwards]"
      style={{ strokeDasharray: 63, strokeDashoffset: 63 }}
    />
    <path
      d="M9 12l2 2 4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-[draw-check_0.3s_ease-out_0.4s_forwards]"
      style={{ strokeDasharray: 12, strokeDashoffset: 12 }}
    />
  </svg>
);

// Animated X Component
export const AnimatedX: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn("w-5 h-5 shrink-0", className)}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      className="animate-[draw-circle_0.5s_ease-out_forwards]"
      style={{ strokeDasharray: 63, strokeDashoffset: 63 }}
    />
    <path
      d="M15 9l-6 6M9 9l6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-[draw-x_0.3s_ease-out_0.4s_forwards]"
      style={{ strokeDasharray: 17, strokeDashoffset: 17 }}
    />
  </svg>
);
