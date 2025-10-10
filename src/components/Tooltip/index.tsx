import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { TooltipProps } from "./Tooltip.types";

// CVA variants for Tooltip
const tooltipVariants = cva(
  "absolute whitespace-nowrap z-50 pointer-events-none transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        default:
          "bg-card text-foreground border border-border/50 shadow-xl backdrop-blur-sm",
        dark: "bg-gray-900 text-white border border-gray-700 shadow-xl",
        light: "bg-white text-gray-900 border border-gray-200 shadow-xl",
        glass:
          "glass-strong backdrop-blur-2xl text-foreground shadow-[0_8px_32px_0] shadow-black/20",
        primary:
          "bg-primary text-primary-foreground shadow-[0_8px_24px_0] shadow-primary/40 border border-primary/50",
      },
      size: {
        sm: "text-xs px-2 py-1 rounded-md",
        md: "text-sm px-3 py-1.5 rounded-lg",
        lg: "text-base px-4 py-2 rounded-xl",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      position: "top",
    },
  }
);

// Arrow variants
const arrowVariants = cva("absolute w-2 h-2 rotate-45", {
  variants: {
    variant: {
      default: "bg-card border-l border-t border-border/50",
      dark: "bg-gray-900 border-l border-t border-gray-700",
      light: "bg-white border-l border-t border-gray-200",
      glass:
        "glass-strong backdrop-blur-2xl border-l border-t border-border/30",
      primary: "bg-primary border-l border-t border-primary/50",
    },
    position: {
      top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
      bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
      left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
      right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "top",
  },
});

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      position = "top",
      variant = "default",
      size = "md",
      delay = 200,
      arrow = true,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
      const id = setTimeout(() => setIsVisible(true), delay);
      setTimeoutId(id);
    };

    const handleMouseLeave = () => {
      if (timeoutId) clearTimeout(timeoutId);
      setIsVisible(false);
    };

    return (
      <div
        ref={ref}
        className="relative inline-flex group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}

        {/* Tooltip */}
        <div
          className={cn(
            tooltipVariants({ variant, size, position }),
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          role="tooltip"
        >
          {/* Content */}
          <div className="relative z-10">{content}</div>

          {/* Arrow */}
          {arrow && (
            <div className={cn(arrowVariants({ variant, position }))} />
          )}

          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-inherit bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
