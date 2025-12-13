"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { GripVertical } from "lucide-react";
import type { DragHandleProps } from "./DragDrop.types";
import { dragHandleVariants } from "./DragDrop.styles";

export const DragHandle: React.FC<DragHandleProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={cn(dragHandleVariants(), className)}
      style={style}
      role="button"
      aria-label="Drag handle"
      data-drag-handle
    >
      {children || <GripVertical className="w-5 h-5" />}
    </div>
  );
};

DragHandle.displayName = "DragHandle";
