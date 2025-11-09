"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
      backdropClassName,
      "aria-label": ariaLabel = "Speed dial actions",
      ...props
    },
    ref,
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
      [isControlled, onOpenChange],
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
      event: React.MouseEvent<HTMLButtonElement>,
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
        {/* Backdrop */}
        {showBackdrop && (
          <div
            className={cn(
              speedDialBackdropVariants({ open: isOpen }),
              backdropClassName,
            )}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

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
          {/* Actions */}
          <div
            className={cn(
              speedDialActionsVariants({ direction, open: isOpen }),
              actionsClassName,
            )}
            role="menu"
            aria-orientation={
              direction === "up" || direction === "down"
                ? "vertical"
                : "horizontal"
            }
          >
            {actions.map((action: SpeedDialAction, index: number) => (
              <div
                key={action.id}
                className="relative"
                style={{
                  transitionDelay: isOpen
                    ? `${index * 50}ms`
                    : `${(actions.length - index - 1) * 30}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={(e) => handleActionClick(action, e)}
                  disabled={action.disabled}
                  className={cn(
                    speedDialActionVariants({
                      color: action.color || "default",
                    }),
                    action.className,
                    actionClassName,
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

                {/* Label/Tooltip */}
                {showLabels && action.label && (
                  <span
                    className={cn(
                      speedDialActionLabelVariants({
                        direction: labelDirection,
                        show: hoveredAction === action.id,
                      }),
                    )}
                    aria-hidden="true"
                  >
                    {action.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Main FAB Button */}
          <button
            type="button"
            onClick={toggleOpen}
            disabled={disabled}
            className={cn(
              speedDialButtonVariants({ color, size, open: isOpen }),
              buttonClassName,
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
      </>
    );
  },
);

SpeedDial.displayName = "SpeedDial";

export { SpeedDial };
export default SpeedDial;
export type { SpeedDialProps, SpeedDialAction };
