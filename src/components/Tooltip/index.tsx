import React from "react";
import { TooltipProps } from "./Tooltip.types";

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  variant = "default",
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const variantClasses = {
    default: "bg-surface-active text-text border border-border shadow-lg",
    glass: "glass text-text",
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={`absolute whitespace-nowrap text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-base z-50 ${positionClasses[position]} ${variantClasses[variant]}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
