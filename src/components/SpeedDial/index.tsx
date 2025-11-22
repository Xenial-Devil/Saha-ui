"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import usePortalPosition from "../../lib/usePortalPosition";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import type { SpeedDialProps, SpeedDialAction } from "./SpeedDial.types";
import {
  speedDialVariants,
  speedDialButtonVariants,
  speedDialActionsVariants,
  speedDialActionVariants,
  speedDialActionLabelVariants,
  speedDialBackdropVariants,
} from "./SpeedDial.styles";

export type SpeedDialVariantsProps = VariantProps<typeof speedDialVariants>;

/**
 * SpeedDial Component
 *
 * A floating action button that expands to reveal multiple action buttons.
 * Perfect for providing quick access to common actions in your application.
 * Supports multiple positions, directions, and customizable actions.
 *
 * @example
 * ```tsx
 * // Basic speed dial
 * <SpeedDial
 *   icon={<Plus />}
 *   actions={[
 *     { id: '1', icon: <Edit />, label: 'Edit', onClick: handleEdit },
 *     { id: '2', icon: <Share />, label: 'Share', onClick: handleShare },
 *     { id: '3', icon: <Delete />, label: 'Delete', onClick: handleDelete },
 *   ]}
 * />
 *
 * // With custom position and direction
 * <SpeedDial
 *   icon={<Menu />}
 *   position="bottom-right"
 *   direction="up"
 *   actions={actions}
 *   aria-label="Quick actions"
 * />
 *
 * // With custom colors
 * <SpeedDial
 *   icon={<Add />}
 *   color="primary"
 *   actions={[
 *     { id: '1', icon: <File />, label: 'New File', color: 'primary' },
 *     { id: '2', icon: <Folder />, label: 'New Folder', color: 'secondary' },
 *   ]}
 * />
 *
 * // Controlled mode
 * const [isOpen, setIsOpen] = useState(false);
 * <SpeedDial
 *   icon={<Plus />}
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   actions={actions}
 * />
 *
 * // With backdrop
 * <SpeedDial
 *   icon={<Plus />}
 *   actions={actions}
 *   showBackdrop={true}
 * />
 * ```
 */
const SpeedDial = React.forwardRef<HTMLDivElement, SpeedDialProps>(
  (
    {
      icon,
      actions,
      position = "bottom-right",
      direction = "up",
      color = "primary",
      size = "md",
      open: controlledOpen,
      onOpenChange,
      showLabels = true,
      closeOnActionClick = true,
      closeOnClickOutside = true,
      disabled = false,
      openIcon,
      className,
      buttonClassName,
      actionsClassName,
      actionClassName,
      showBackdrop = false,
      disablePortal = false,
      backdropClassName,
      "aria-label": ariaLabel = "Speed dial actions",
      ...props
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const [hoveredAction, setHoveredAction] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Determine if component is controlled
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    // Set open state
    const setIsOpen = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isControlled, onOpenChange]
    );

    // Toggle open state
    const toggleOpen = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    // Handle action click
    const handleActionClick = (
      action: SpeedDialAction,
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      if (action.disabled) return;

      action.onClick?.(event);

      if (closeOnActionClick) {
        setIsOpen(false);
      }
    };

    // Handle click outside
    useEffect(() => {
      if (!closeOnClickOutside || !isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, closeOnClickOutside, setIsOpen]);

    // Handle escape key
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, setIsOpen]);

    // Determine label position based on direction
    const getLabelDirection = () => {
      switch (direction) {
        case "up":
        case "down":
          return "left";
        case "left":
          return "left";
        case "right":
          return "right";
        default:
          return "left";
      }
    };

    const labelDirection = getLabelDirection();

    return (
      <>
        {/* SpeedDial Container */}
        <div
          ref={(node) => {
            // Handle both refs
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            (
              containerRef as React.MutableRefObject<HTMLDivElement | null>
            ).current = node;
          }}
          className={cn(speedDialVariants({ position }), className)}
          {...props}
        >
          {/* Main FAB Button */}
          <button
            type="button"
            onClick={toggleOpen}
            disabled={disabled}
            className={cn(
              speedDialButtonVariants({ color, size, open: isOpen }),
              buttonClassName
            )}
            aria-label={ariaLabel}
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            {isOpen && openIcon ? (
              openIcon
            ) : isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              icon
            )}
          </button>
        </div>

        {/* Actions + Backdrop Portal (optional) */}
        <PortalSpeedDial
          anchorRef={containerRef}
          open={isOpen}
          actions={actions}
          direction={direction}
          actionClassName={actionClassName}
          actionsClassName={actionsClassName}
          actionLabelDirection={labelDirection}
          showLabels={showLabels}
          hoveredAction={hoveredAction}
          setHoveredAction={setHoveredAction}
          handleActionClick={handleActionClick}
          showBackdrop={showBackdrop}
          backdropClassName={backdropClassName}
          disablePortal={disablePortal}
          onClose={() => setIsOpen(false)}
        />
      </>
    );
  }
);

SpeedDial.displayName = "SpeedDial";

export { SpeedDial };
export default SpeedDial;
export type { SpeedDialProps, SpeedDialAction };

function PortalSpeedDial({
  anchorRef,
  open,
  actions,
  direction,
  actionClassName,
  actionsClassName,
  actionLabelDirection,
  showLabels,
  hoveredAction,
  setHoveredAction,
  handleActionClick,
  showBackdrop,
  backdropClassName,
  disablePortal,
  onClose,
}: any) {
  const { portalContainer, portalRef, portalPos } = usePortalPosition(
    anchorRef as React.RefObject<HTMLElement>,
    open,
    { position: "bottom", offset: 8 }
  );

  // compute per-action positions when portaled to avoid relying on internal
  // CSS offsets which assume a different containing context
  const [actionPositions, setActionPositions] = useState<
    Array<{ top: number; left: number }>
  >([]);

  useEffect(() => {
    if (!open || !portalContainer || !anchorRef.current) {
      setActionPositions([]);
      return;
    }

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const actionSize = 40; // matches h-10 w-10
    const gap = 8; // gap-2 = 8
    const step = actionSize + gap;

    const baseCenterX = anchorRect.left + anchorRect.width / 2;
    const baseCenterY = anchorRect.top + anchorRect.height / 2;

    const positions: Array<{ top: number; left: number }> = actions.map(
      (_a: any, i: number) => {
        if (direction === "up") {
          const left = baseCenterX - actionSize / 2 + window.scrollX;
          const top = anchorRect.top + window.scrollY - (i + 1) * step;
          return { top, left };
        }
        if (direction === "down") {
          const left = baseCenterX - actionSize / 2 + window.scrollX;
          const top = anchorRect.bottom + window.scrollY + i * step;
          return { top, left };
        }
        if (direction === "left") {
          const top = baseCenterY - actionSize / 2 + window.scrollY;
          const left = anchorRect.left + window.scrollX - (i + 1) * step;
          return { top, left };
        }
        // right
        const top = baseCenterY - actionSize / 2 + window.scrollY;
        const left = anchorRect.right + window.scrollX + i * step;
        return { top, left };
      }
    );

    setActionPositions(positions);
  }, [open, portalContainer, anchorRef, direction, actions]);

  const [positionReady, setPositionReady] = useState(false);
  useEffect(() => {
    if (!open) {
      setPositionReady(false);
      return;
    }
    const t = setTimeout(() => setPositionReady(true), 20);
    return () => clearTimeout(t);
  }, [open, portalPos.left, portalPos.top]);

  const backdropNode = showBackdrop ? (
    <div
      className={cn(speedDialBackdropVariants({ open }), backdropClassName)}
      onClick={() => onClose?.()}
      aria-hidden="true"
      style={
        portalContainer && !disablePortal && !positionReady
          ? { visibility: "hidden" }
          : undefined
      }
    />
  ) : null;

  const nonPortalActionsNode = (
    <div
      ref={(node) => {
        // non-portal container is relative inside the SpeedDial wrapper
        if (portalRef) portalRef.current = node;
      }}
      className={cn(
        speedDialActionsVariants({ direction, open }),
        actionsClassName
      )}
      role="menu"
      aria-orientation={
        direction === "up" || direction === "down" ? "vertical" : "horizontal"
      }
    >
      {actions.map((action: SpeedDialAction, index: number) => (
        <div
          key={action.id}
          className="relative"
          style={{
            transitionDelay: open
              ? `${index * 50}ms`
              : `${(actions.length - index - 1) * 30}ms`,
          }}
        >
          <button
            type="button"
            onClick={(e) => handleActionClick(action, e)}
            disabled={action.disabled}
            className={cn(
              speedDialActionVariants({ color: action.color || "default" }),
              action.className,
              actionClassName
            )}
            onMouseEnter={() => setHoveredAction(action.id)}
            onMouseLeave={() => setHoveredAction(null)}
            onFocus={() => setHoveredAction(action.id)}
            onBlur={() => setHoveredAction(null)}
            aria-label={action.label}
            role="menuitem"
          >
            {action.icon}
          </button>

          {showLabels && action.label && (
            <span
              className={cn(
                speedDialActionLabelVariants({
                  direction: actionLabelDirection,
                  show: hoveredAction === action.id,
                })
              )}
              aria-hidden="true"
            >
              {action.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );

  const portalActionsNode = (
    <div
      ref={(node) => {
        if (portalRef) portalRef.current = node;
      }}
      className={cn(
        positionReady ? undefined : "transition-none",
        actionsClassName
      )}
      role="menu"
      aria-orientation={
        direction === "up" || direction === "down" ? "vertical" : "horizontal"
      }
      style={
        portalContainer && !disablePortal
          ? {
              position: "absolute",
              top: (direction === "up" || direction === "down"
                  ? "vertical"
                  : "horizontal") === "vertical" && (direction === "down")
                  ? 10
                  : 0,
              left:
                (direction === "up" || direction === "down"
                  ? "vertical"
                  : "horizontal") === "horizontal" && (direction === "right")
                  ? 10
                  : 0,
              pointerEvents: "none",
              zIndex:22
            }
          : undefined
      }
    >
      {actions.map((action: SpeedDialAction, index: number) => {
        const pos = actionPositions && actionPositions[index];
        const visible = !portalContainer || disablePortal || positionReady;
        return (
          <div
            key={action.id}
            className="absolute"
            style={{
              top: portalContainer && pos ? pos.top : undefined,
              left: portalContainer && pos ? pos.left : undefined,
              transitionDelay: open
                ? `${index * 50}ms`
                : `${(actions.length - index - 1) * 30}ms`,
              pointerEvents: visible ? undefined : "none",
              opacity: visible ? undefined : 0,
            }}
          >
            <button
              type="button"
              onClick={(e) => handleActionClick(action, e)}
              disabled={action.disabled}
              className={cn(
                speedDialActionVariants({ color: action.color || "default" }),
                action.className,
                actionClassName
              )}
              onMouseEnter={() => setHoveredAction(action.id)}
              onMouseLeave={() => setHoveredAction(null)}
              onFocus={() => setHoveredAction(action.id)}
              onBlur={() => setHoveredAction(null)}
              aria-label={action.label}
              role="menuitem"
            >
              {action.icon}
            </button>

            {showLabels && action.label && (
              <span
                className={cn(
                  speedDialActionLabelVariants({
                    direction: actionLabelDirection,
                    show: hoveredAction === action.id,
                  })
                )}
                aria-hidden="true"
              >
                {action.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );

  if (disablePortal || !portalContainer)
    return (
      <>
        {backdropNode}
        {nonPortalActionsNode}
      </>
    );

  return (
    <>
      {backdropNode &&
        positionReady &&
        createPortal(backdropNode, portalContainer)}
      {createPortal(portalActionsNode, portalContainer)}
    </>
  );
}
