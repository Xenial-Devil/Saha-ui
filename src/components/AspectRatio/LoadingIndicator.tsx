"use client";

import { cn } from "../../lib/utils";

interface LoadingIndicatorProps {
  /**
   * Visual variant of the loader
   * @default "spinner"
   */
  variant?:
    | "spinner"
    | "dots"
    | "pulse"
    | "bars"
    | "ring"
    | "orbit"
    | "wave"
    | "bounce"
    | "gradient"
    | "morphing"
    | "ripple"
    | "cube"
    | "infinity";

  /**
   * Size of the loader
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Color theme
   * @default "primary"
   */
  color?: "primary" | "secondary" | "accent" | "white" | "gradient";

  /**
   * Optional loading text
   */
  text?: string;

  /**
   * Text position
   * @default "bottom"
   */
  textPosition?: "bottom" | "right";

  /**
   * Additional CSS classes
   */
  className?: string;
}

// Size configurations
const sizeConfig = {
  xs: { container: 16, stroke: 2, dot: 4, text: "text-xs" },
  sm: { container: 24, stroke: 2.5, dot: 6, text: "text-xs" },
  md: { container: 36, stroke: 3, dot: 8, text: "text-sm" },
  lg: { container: 48, stroke: 3.5, dot: 10, text: "text-base" },
  xl: { container: 64, stroke: 4, dot: 12, text: "text-lg" },
};

// Color configurations
const colorConfig = {
  primary: {
    solid: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
    gradient: "from-primary via-primary/50 to-primary",
    stroke: "stroke-primary",
    fill: "fill-primary",
  },
  secondary: {
    solid: "text-secondary",
    bg: "bg-secondary",
    border: "border-secondary",
    gradient: "from-secondary via-secondary/50 to-secondary",
    stroke: "stroke-secondary",
    fill: "fill-secondary",
  },
  accent: {
    solid: "text-accent",
    bg: "bg-accent",
    border: "border-accent",
    gradient: "from-accent via-accent/50 to-accent",
    stroke: "stroke-accent",
    fill: "fill-accent",
  },
  white: {
    solid: "text-white",
    bg: "bg-white",
    border: "border-white",
    gradient: "from-white via-white/50 to-white",
    stroke: "stroke-white",
    fill: "fill-white",
  },
  gradient: {
    solid: "text-primary",
    bg: "bg-gradient-to-r from-primary via-accent to-secondary",
    border: "border-primary",
    gradient: "from-primary via-accent to-secondary",
    stroke: "stroke-primary",
    fill: "fill-primary",
  },
};

// CSS Keyframes - injected once
const keyframesCSS = `
@keyframes loader-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-100%); }
}

@keyframes loader-bars {
  0%, 100% { height: 20%; }
  50% { height: 100%; }
}

@keyframes loader-wave {
  0%, 100% { height: 30%; opacity: 0.5; }
  50% { height: 100%; opacity: 1; }
}

@keyframes loader-bounce-up {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-150%); }
}

@keyframes loader-shadow {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(0.5); opacity: 0.1; }
}

@keyframes loader-morphing {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: rotate(0deg);
  }
  25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50% {
    border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
    transform: rotate(180deg);
  }
  75% { border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%; }
}

@keyframes loader-ripple {
  0% { transform: scale(0.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}

@keyframes loader-cube {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

@keyframes loader-infinity {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -300; }
}
`;

// Inject styles once
let stylesInjected = false;
const injectStyles = () => {
  if (typeof document === "undefined" || stylesInjected) return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-loading-indicator", "true");
  styleEl.textContent = keyframesCSS;
  document.head.appendChild(styleEl);
  stylesInjected = true;
};

/**
 * Spinner Variant - Classic rotating spinner with gradient
 */
const SpinnerLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { container, stroke } = sizeConfig[size];
  const colors = colorConfig[color];

  return (
    <div className="relative" style={{ width: container, height: container }}>
      {/* Background ring */}
      <svg
        className="absolute inset-0 opacity-20"
        viewBox="0 0 50 50"
        fill="none"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth={stroke}
          className={colors.solid}
        />
      </svg>

      {/* Spinning gradient ring */}
      <svg
        className="absolute inset-0 animate-spin"
        style={{ animationDuration: "1s" }}
        viewBox="0 0 50 50"
        fill="none"
      >
        <defs>
          <linearGradient
            id={`spinner-gradient-${color}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke={`url(#spinner-gradient-${color})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          className={colors.solid}
          strokeDasharray="80 45"
        />
      </svg>

      {/* Center glow */}
      <div
        className={cn(
          "absolute inset-[30%] rounded-full blur-sm opacity-50",
          colors.bg
        )}
      />
    </div>
  );
};

/**
 * Dots Variant - Elegant bouncing dots
 */
const DotsLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { dot } = sizeConfig[size];
  const colors = colorConfig[color];

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full animate-bounce",
            color === "gradient"
              ? "bg-gradient-to-r from-primary via-accent to-secondary"
              : colors.bg
          )}
          style={{
            width: dot,
            height: dot,
            animationDelay: `${i * 0.15}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  );
};

/**
 * Pulse Variant - Expanding pulse rings
 */
const PulseLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { container } = sizeConfig[size];
  const colors = colorConfig[color];

  return (
    <div className="relative" style={{ width: container, height: container }}>
      {/* Outer pulse rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 rounded-full border-2 animate-ping",
            colors.border
          )}
          style={{
            animationDelay: `${i * 0.4}s`,
            animationDuration: "1.5s",
            opacity: 0.3 - i * 0.1,
          }}
        />
      ))}

      {/* Center dot */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "rounded-full animate-pulse",
          color === "gradient"
            ? "bg-gradient-to-r from-primary via-accent to-secondary"
            : colors.bg
        )}
        style={{
          width: container * 0.35,
          height: container * 0.35,
        }}
      />
    </div>
  );
};

/**
 * Bars Variant - Audio visualizer style bars
 */
const BarsLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { container, dot } = sizeConfig[size];
  const colors = colorConfig[color];
  const barWidth = Math.max(dot * 0.5, 3);

  return (
    <div
      className="flex items-end justify-center gap-[2px]"
      style={{ height: container, width: container }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full",
            color === "gradient"
              ? "bg-gradient-to-t from-primary via-accent to-secondary"
              : colors.bg
          )}
          style={{
            width: barWidth,
            animation: "loader-bars 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
            height: "20%",
          }}
        />
      ))}
    </div>
  );
};

/**
 * Ring Variant - Dual rotating rings
 */
const RingLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { container } = sizeConfig[size];
  const colors = colorConfig[color];

  return (
    <div className="relative" style={{ width: container, height: container }}>
      {/* Outer ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border-2 border-transparent animate-spin",
          colors.solid
        )}
        style={{
          borderTopColor: "currentColor",
          borderRightColor: "currentColor",
          animationDuration: "1s",
        }}
      />

      {/* Inner ring - opposite rotation */}
      <div
        className={cn(
          "absolute rounded-full border-2 border-transparent animate-spin opacity-70",
          colors.solid
        )}
        style={{
          inset: "20%",
          borderBottomColor: "currentColor",
          borderLeftColor: "currentColor",
          animationDuration: "0.8s",
          animationDirection: "reverse",
        }}
      />

      {/* Center glow */}
      <div
        className={cn(
          "absolute inset-[35%] rounded-full blur-[2px] opacity-60",
          colors.bg
        )}
      />
    </div>
  );
};

/**
 * Orbit Variant - Orbiting particles
 */
const OrbitLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { container, dot } = sizeConfig[size];
  const colors = colorConfig[color];
  const particleSize = dot * 0.6;

  return (
    <div className="relative" style={{ width: container, height: container }}>
      {/* Orbit paths */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border opacity-10",
          colors.border
        )}
      />
      <div
        className={cn(
          "absolute inset-[15%] rounded-full border opacity-10",
          colors.border
        )}
      />

      {/* Orbiting particles */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-0 animate-spin"
          style={{
            animationDuration: `${1.5 + i * 0.5}s`,
            animationTimingFunction: "linear",
          }}
        >
          <div
            className={cn(
              "absolute rounded-full shadow-lg",
              color === "gradient"
                ? "bg-gradient-to-r from-primary to-accent"
                : colors.bg
            )}
            style={{
              width: particleSize - i * 2,
              height: particleSize - i * 2,
              top: `${5 + i * 15}%`,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      ))}

      {/* Center core */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "rounded-full animate-pulse",
          color === "gradient"
            ? "bg-gradient-to-r from-primary via-accent to-secondary"
            : colors.bg
        )}
        style={{
          width: particleSize * 1.5,
          height: particleSize * 1.5,
        }}
      />
    </div>
  );
};

/**
 * Wave Variant - Smooth wave animation
 */
const WaveLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { container } = sizeConfig[size];
  const colors = colorConfig[color];

  return (
    <div
      className="flex items-center gap-[3px]"
      style={{ height: container, width: container * 1.5 }}
    >
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className={cn(
            "flex-1 rounded-full",
            color === "gradient"
              ? "bg-gradient-to-t from-primary via-accent to-secondary"
              : colors.bg
          )}
          style={{
            animation: "loader-wave 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
            height: "30%",
          }}
        />
      ))}
    </div>
  );
};

/**
 * Bounce Variant - Bouncing balls
 */
const BounceLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { container, dot } = sizeConfig[size];
  const colors = colorConfig[color];

  return (
    <div
      className="relative flex items-end justify-center gap-2"
      style={{ height: container, width: container * 1.5 }}
    >
      {/* Shadow */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-full bg-black/20 dark:bg-white/10 blur-[1px]"
            style={{
              width: dot,
              height: dot * 0.3,
              animation: "loader-shadow 0.6s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Balls */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full shadow-lg",
            color === "gradient"
              ? "bg-gradient-to-br from-primary via-accent to-secondary"
              : colors.bg
          )}
          style={{
            width: dot,
            height: dot,
            animation: "loader-bounce-up 0.6s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Gradient Variant - Rotating gradient ring
 */
const GradientLoader = ({ size }: { size: keyof typeof sizeConfig }) => {
  const { container, stroke } = sizeConfig[size];

  return (
    <div className="relative" style={{ width: container, height: container }}>
      {/* Gradient spinning ring */}
      <svg
        className="animate-spin"
        style={{ animationDuration: "1.5s" }}
        viewBox="0 0 50 50"
        fill="none"
      >
        <defs>
          <linearGradient
            id="gradient-loader"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="url(#gradient-loader)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray="94 31"
        />
      </svg>

      {/* Inner glow */}
      <div className="absolute inset-[25%] rounded-full bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30 blur-sm animate-pulse" />
    </div>
  );
};

/**
 * Morphing Variant - Shape morphing animation
 */
const MorphingLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { container } = sizeConfig[size];
  const colors = colorConfig[color];

  return (
    <div className="relative" style={{ width: container, height: container }}>
      <div
        className={cn(
          "w-full h-full",
          color === "gradient"
            ? "bg-gradient-to-br from-primary via-accent to-secondary"
            : colors.bg
        )}
        style={{
          animation: "loader-morphing 2s ease-in-out infinite",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        }}
      />
    </div>
  );
};

/**
 * Ripple Variant - Water ripple effect
 */
const RippleLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { container } = sizeConfig[size];
  const colors = colorConfig[color];

  return (
    <div className="relative" style={{ width: container, height: container }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 rounded-full border-2",
            colors.border
          )}
          style={{
            animation:
              "loader-ripple 1.5s cubic-bezier(0.21, 0.53, 0.56, 0.8) infinite",
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Center dot */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
          color === "gradient"
            ? "bg-gradient-to-br from-primary via-accent to-secondary"
            : colors.bg
        )}
        style={{
          width: container * 0.2,
          height: container * 0.2,
        }}
      />
    </div>
  );
};

/**
 * Cube Variant - 3D rotating cube
 */
const CubeLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { container } = sizeConfig[size];
  const colors = colorConfig[color];
  const cubeSize = container * 0.5;

  const faceTransforms: Record<string, string> = {
    front: `translateZ(${cubeSize / 2}px)`,
    back: `rotateY(180deg) translateZ(${cubeSize / 2}px)`,
    right: `rotateY(90deg) translateZ(${cubeSize / 2}px)`,
    left: `rotateY(-90deg) translateZ(${cubeSize / 2}px)`,
    top: `rotateX(90deg) translateZ(${cubeSize / 2}px)`,
    bottom: `rotateX(-90deg) translateZ(${cubeSize / 2}px)`,
  };

  return (
    <div
      className="relative"
      style={{
        width: container,
        height: container,
        perspective: "200px",
      }}
    >
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: cubeSize,
          height: cubeSize,
          marginLeft: -cubeSize / 2,
          marginTop: -cubeSize / 2,
          transformStyle: "preserve-3d",
          animation: "loader-cube 2s linear infinite",
        }}
      >
        {/* Cube faces */}
        {Object.entries(faceTransforms).map(([face, transform]) => (
          <div
            key={face}
            className={cn(
              "absolute w-full h-full border",
              colors.border,
              color === "gradient"
                ? "bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20"
                : `${colors.bg} opacity-20`
            )}
            style={{ transform }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Infinity Variant - Infinity symbol animation
 */
const InfinityLoader = ({
  size,
  color,
}: {
  size: keyof typeof sizeConfig;
  color: keyof typeof colorConfig;
}) => {
  const { container, stroke } = sizeConfig[size];
  const colors = colorConfig[color];

  return (
    <div style={{ width: container * 1.5, height: container }}>
      <svg viewBox="0 0 100 50" fill="none" className="w-full h-full">
        <defs>
          <linearGradient
            id="infinity-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>

        {/* Background path */}
        <path
          d="M25 25 C25 10, 45 10, 50 25 C55 40, 75 40, 75 25 C75 10, 55 10, 50 25 C45 40, 25 40, 25 25"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          className={cn(colors.solid, "opacity-20")}
        />

        {/* Animated path */}
        <path
          d="M25 25 C25 10, 45 10, 50 25 C55 40, 75 40, 75 25 C75 10, 55 10, 50 25 C45 40, 25 40, 25 25"
          stroke={
            color === "gradient" ? "url(#infinity-gradient)" : "currentColor"
          }
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          className={color !== "gradient" ? colors.solid : undefined}
          strokeDasharray="150"
          strokeDashoffset="0"
          style={{
            animation: "loader-infinity 2s linear infinite",
          }}
        />
      </svg>
    </div>
  );
};

/**
 * Main LoadingIndicator Component
 */
export function LoadingIndicator({
  variant = "spinner",
  size = "md",
  color = "primary",
  text,
  textPosition = "bottom",
  className,
}: LoadingIndicatorProps) {
  // Inject styles on first render
  if (typeof window !== "undefined") {
    injectStyles();
  }

  const { text: textSize } = sizeConfig[size];
  const colors = colorConfig[color];

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return <SpinnerLoader size={size} color={color} />;
      case "dots":
        return <DotsLoader size={size} color={color} />;
      case "pulse":
        return <PulseLoader size={size} color={color} />;
      case "bars":
        return <BarsLoader size={size} color={color} />;
      case "ring":
        return <RingLoader size={size} color={color} />;
      case "orbit":
        return <OrbitLoader size={size} color={color} />;
      case "wave":
        return <WaveLoader size={size} color={color} />;
      case "bounce":
        return <BounceLoader size={size} color={color} />;
      case "gradient":
        return <GradientLoader size={size} />;
      case "morphing":
        return <MorphingLoader size={size} color={color} />;
      case "ripple":
        return <RippleLoader size={size} color={color} />;
      case "cube":
        return <CubeLoader size={size} color={color} />;
      case "infinity":
        return <InfinityLoader size={size} color={color} />;
      default:
        return <SpinnerLoader size={size} color={color} />;
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        textPosition === "bottom" ? "flex-col gap-3" : "flex-row gap-3",
        colors.solid,
        className
      )}
      role="status"
      aria-label={text || "Loading"}
    >
      {renderLoader()}

      {text && (
        <span
          className={cn(
            "font-medium tracking-wide animate-pulse",
            textSize,
            color === "gradient"
              ? "bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
              : colors.solid
          )}
        >
          {text}
        </span>
      )}

      <span className="sr-only">{text || "Loading..."}</span>
    </div>
  );
}

export default LoadingIndicator;
