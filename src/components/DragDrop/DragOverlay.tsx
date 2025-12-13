"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import type { DragOverlayProps } from "./DragDrop.types";
import { dragOverlayVariants } from "./DragDrop.styles";
import { useDragDropContext } from "./DragDropContext";

export const DragOverlay: React.FC<DragOverlayProps> = ({
  children,
  className,
  style,
  dropAnimation = { duration: 200, easing: "ease-out" },
}) => {
  const context = useDragDropContext();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isDropping, setIsDropping] = useState(false);
  const dropTargetRef = useRef<{ x: number; y: number } | null>(null);

  // Update position to follow mouse cursor with smooth animation
  useEffect(() => {
    if (overlayRef.current && context.dragPosition) {
      if (!isDropping) {
        // Offset by half the width and height to center on cursor
        const rect = overlayRef.current.getBoundingClientRect();
        const offsetX = context.dragPosition.x - rect.width / 2;
        const offsetY = context.dragPosition.y - rect.height / 2;

        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          if (overlayRef.current) {
            overlayRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(1.05)`;
          }
        });
      }
    }
  }, [context.dragPosition, isDropping]);

  // Handle drop animation
  useEffect(() => {
    if (!context.isDragging && overlayRef.current && dropTargetRef.current) {
      setIsDropping(true);

      // Animate to drop target position with smooth spring-like effect
      overlayRef.current.style.transition = `transform ${dropAnimation.duration}ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${dropAnimation.duration}ms ease-out, filter ${dropAnimation.duration}ms ease-out`;
      overlayRef.current.style.transform = `translate3d(${dropTargetRef.current.x}px, ${dropTargetRef.current.y}px, 0) scale(0.95)`;
      overlayRef.current.style.opacity = "0";
      overlayRef.current.style.filter =
        "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))";

      const timeout = setTimeout(() => {
        setIsDropping(false);
        dropTargetRef.current = null;
      }, dropAnimation.duration);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [context.isDragging, dropAnimation.duration]);

  // Store drop target position before drag ends
  useEffect(() => {
    if (context.isDragging && context.dragPosition) {
      dropTargetRef.current = {
        x:
          context.dragPosition.x -
          (overlayRef.current?.getBoundingClientRect().width || 0) / 2,
        y:
          context.dragPosition.y -
          (overlayRef.current?.getBoundingClientRect().height || 0) / 2,
      };
    }
  }, [context.isDragging, context.dragPosition]);

  if (!context.isDragging || !context.dragPosition) {
    return null;
  }

  const overlay = (
    <div
      ref={overlayRef}
      className={cn(dragOverlayVariants(), className)}
      style={{
        ...style,
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transition:
          context.isDragging && !isDropping
            ? "transform 0ms, filter 150ms cubic-bezier(0.4, 0, 0.2, 1)"
            : `transform ${dropAnimation.duration}ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${dropAnimation.duration}ms ease-out, filter ${dropAnimation.duration}ms ease-out`,
        // Enhanced elevation effect with smooth shadows
        filter: isDropping
          ? "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))"
          : "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.15)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1))",
        opacity: isDropping ? 0 : 1,
        willChange: "transform, opacity, filter",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          transform: isDropping ? "scale(1)" : "scale(1)",
          transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};

DragOverlay.displayName = "DragOverlay";
