"use client";

import React, { forwardRef, useState, useRef } from "react";
import { cn } from "../../lib/utils";
import type { DockProps, DockIconProps } from "./Dock.types";
import { dockVariants, dockIconVariants } from "./Dock.styles";

/**
 * Dock component
 *
 * An animated dock menu similar to macOS. The `DockIcon` children organically
 * magnify based on cursor proximity physics.
 *
 * @component
 * @example
 * // Basic usage
 * <Dock magnification={60} baseSize={40} distance={140}>
 *   <DockIcon><HomeIcon /></DockIcon>
 *   <DockIcon><SettingsIcon /></DockIcon>
 * </Dock>
 */
export const Dock = forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      magnification = 60,
      distance = 140,
      baseSize = 40,
      children,
      ...props
    },
    ref,
  ) => {
    const [mouseX, setMouseX] = useState<number | null>(null);

    return (
      <div
        ref={ref}
        className={cn(dockVariants(), className)}
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        {...props}
      >
        {/** Provide context to children via mapping since it's simple enough without full React Context */}
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child as React.ReactElement<any>, {
            mouseX,
            magnification,
            distance,
            baseSize,
          });
        })}
      </div>
    );
  },
);
Dock.displayName = "Dock";

/**
 * DockIcon component
 *
 * An individual icon wrapper within the Dock component. It scales dynamically
 * based on the cursor distance state passed down by the parent Dock.
 *
 * @component
 * @example
 * <DockIcon onClick={() => alert('Clicked!')}>
 *   <UserIcon />
 * </DockIcon>
 */
export const DockIcon = forwardRef<HTMLDivElement, DockIconProps>(
  (
    {
      className,
      mouseX,
      magnification = 60,
      distance = 140,
      baseSize = 40,
      children,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    let size = baseSize;

    // Calculate dynamic size based on cursor distance
    if (mouseX !== null && mouseX !== undefined && localRef.current) {
      const rect = localRef.current.getBoundingClientRect();
      const val = mouseX - (rect.x + rect.width / 2);
      const absVal = Math.abs(val);

      if (absVal < distance) {
        // Linear scale for simplicity
        const scale = 1 - absVal / distance;
        size = baseSize + (magnification - baseSize) * scale;
      }
    }

    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          (localRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
        }}
        style={{ width: size, height: size }}
        className={cn(dockIconVariants(), className)}
        {...props}
      >
        <span
          style={{
            transform: `scale(${size / baseSize})`,
            transition: "transform 0.2s ease-out",
          }}
        >
          {children}
        </span>
      </div>
    );
  },
);
DockIcon.displayName = "DockIcon";
