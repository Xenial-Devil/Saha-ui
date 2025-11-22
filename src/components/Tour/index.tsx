"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type {
  TourProps,
  TourStep,
  TourState,
  TourPlacement,
} from "./Tour.types";
import {
  tourVariants,
  tourMaskVariants,
  tourSpotlightVariants,
  tourPopoverVariants,
  tourHeaderVariants,
  tourTitleVariants,
  tourStepNumberVariants,
  tourDescriptionVariants,
  tourCoverVariants,
  tourFooterVariants,
  tourProgressVariants,
  tourProgressDotVariants,
  tourButtonVariants,
  tourArrowVariants,
  tourCloseButtonVariants,
} from "./Tour.styles";
import { createPortal } from "react-dom";
import usePortalPosition from "../../lib/usePortalPosition";

export type TourVariantsProps = VariantProps<typeof tourVariants>;

/**
 * Tour Component
 *
 * A guided tour component for onboarding and feature highlights.
 * Displays step-by-step instructions with spotlight effect on target elements.
 * Perfect for user onboarding and feature discovery.
 *
 * @example
 * ```tsx
 * // Basic tour
 * <Tour
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   steps={[
 *     {
 *       id: '1',
 *       target: '#welcome',
 *       title: 'Welcome',
 *       description: 'Get started with our app',
 *     },
 *     {
 *       id: '2',
 *       target: '#features',
 *       title: 'Features',
 *       description: 'Explore our amazing features',
 *     },
 *   ]}
 * />
 *
 * // With custom placement
 * <Tour
 *   open={isOpen}
 *   onClose={handleClose}
 *   steps={steps}
 *   placement="right"
 * />
 *
 * // With callbacks
 * <Tour
 *   open={isOpen}
 *   onClose={handleClose}
 *   onFinish={handleFinish}
 *   onChange={handleStepChange}
 *   steps={steps}
 * />
 * ```
 */
const Tour = React.forwardRef<HTMLDivElement, TourProps>(
  (
    {
      steps,
      open,
      onClose,
      current: controlledCurrent,
      onChange,
      onFinish,
      placement = "bottom",
      mask = true,
      maskStyle = "default",
      maskClosable = true,
      closeOnEsc = true,
      showProgress = true,
      showStepNumbers = true,
      showArrow = true,
      gap = 8,
      offset = {},
      scrollToTarget = true,
      zIndex = 1000,
      className,
      popoverClassName,
      maskClassName,
      nextButtonContent = "Next",
      prevButtonContent = "Previous",
      skipButtonContent = "Skip",
      finishButtonContent = "Finish",
      ...props
    },
    ref
  ) => {
    const [uncontrolledCurrent, setUncontrolledCurrent] = useState(0);
    const [state, setState] = useState<TourState>({
      currentStep: 0,
      targetRect: null,
      popoverPosition: { top: 0, left: 0 },
      arrowPosition: { top: 0, left: 0 },
      placement: placement,
    });

    const popoverRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLElement | null>(null);

    // Determine if component is controlled
    const isControlled = controlledCurrent !== undefined;
    const currentStep = isControlled ? controlledCurrent : uncontrolledCurrent;

    const step = steps[currentStep];

    // Get target element
    const getTargetElement = useCallback(
      (step: TourStep): HTMLElement | null => {
        if (!step.target) return null;

        if (typeof step.target === "string") {
          return document.querySelector(step.target);
        }

        if (typeof step.target === "function") {
          return step.target();
        }

        return step.target;
      },
      []
    );

    // Calculate positions
    const calculatePositions = useCallback(() => {
      if (!step || !open) return;

      const targetElement = getTargetElement(step);
      if (!targetElement || !popoverRef.current) return;

      const targetRect = targetElement.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const stepPlacement = step.placement || placement;

      let top = 0;
      let left = 0;
      let arrowTop = 0;
      let arrowLeft = 0;

      const offsetX = offset.x || 0;
      const offsetY = offset.y || 0;

      switch (stepPlacement) {
        case "top":
          top = targetRect.top - popoverRect.height - gap + offsetY;
          left =
            targetRect.left +
            targetRect.width / 2 -
            popoverRect.width / 2 +
            offsetX;
          arrowLeft = popoverRect.width / 2;
          break;
        case "top-start":
          top = targetRect.top - popoverRect.height - gap + offsetY;
          left = targetRect.left + offsetX;
          arrowLeft = 20;
          break;
        case "top-end":
          top = targetRect.top - popoverRect.height - gap + offsetY;
          left = targetRect.right - popoverRect.width + offsetX;
          arrowLeft = popoverRect.width - 20;
          break;
        case "bottom":
          top = targetRect.bottom + gap + offsetY;
          left =
            targetRect.left +
            targetRect.width / 2 -
            popoverRect.width / 2 +
            offsetX;
          arrowLeft = popoverRect.width / 2;
          break;
        case "bottom-start":
          top = targetRect.bottom + gap + offsetY;
          left = targetRect.left + offsetX;
          arrowLeft = 20;
          break;
        case "bottom-end":
          top = targetRect.bottom + gap + offsetY;
          left = targetRect.right - popoverRect.width + offsetX;
          arrowLeft = popoverRect.width - 20;
          break;
        case "left":
          top =
            targetRect.top +
            targetRect.height / 2 -
            popoverRect.height / 2 +
            offsetY;
          left = targetRect.left - popoverRect.width - gap + offsetX;
          arrowTop = popoverRect.height / 2;
          break;
        case "left-start":
          top = targetRect.top + offsetY;
          left = targetRect.left - popoverRect.width - gap + offsetX;
          arrowTop = 20;
          break;
        case "left-end":
          top = targetRect.bottom - popoverRect.height + offsetY;
          left = targetRect.left - popoverRect.width - gap + offsetX;
          arrowTop = popoverRect.height - 20;
          break;
        case "right":
          top =
            targetRect.top +
            targetRect.height / 2 -
            popoverRect.height / 2 +
            offsetY;
          left = targetRect.right + gap + offsetX;
          arrowTop = popoverRect.height / 2;
          break;
        case "right-start":
          top = targetRect.top + offsetY;
          left = targetRect.right + gap + offsetX;
          arrowTop = 20;
          break;
        case "right-end":
          top = targetRect.bottom - popoverRect.height + offsetY;
          left = targetRect.right + gap + offsetX;
          arrowTop = popoverRect.height - 20;
          break;
        case "center":
          top = window.innerHeight / 2 - popoverRect.height / 2 + offsetY;
          left = window.innerWidth / 2 - popoverRect.width / 2 + offsetX;
          break;
      }

      // Ensure popover stays within viewport
      if (top < 10) top = 10;
      if (left < 10) left = 10;
      if (top + popoverRect.height > window.innerHeight - 10) {
        top = window.innerHeight - popoverRect.height - 10;
      }
      if (left + popoverRect.width > window.innerWidth - 10) {
        left = window.innerWidth - popoverRect.width - 10;
      }

      setState({
        currentStep,
        targetRect,
        popoverPosition: { top, left },
        arrowPosition: { top: arrowTop, left: arrowLeft },
        placement: stepPlacement,
      });
    }, [step, open, currentStep, placement, gap, offset, getTargetElement]);

    // Update positions when step changes or window resizes
    useEffect(() => {
      if (!open || !step) return;

      calculatePositions();

      const handleResize = () => calculatePositions();
      const handleScroll = () => calculatePositions();

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll, true);
      };
    }, [open, step, calculatePositions]);

    // Scroll to target
    useEffect(() => {
      if (!open || !step || !scrollToTarget) return;

      const targetElement = getTargetElement(step);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, [open, step, scrollToTarget, getTargetElement]);

    // Handle ESC key
    useEffect(() => {
      if (!open || !closeOnEsc) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, closeOnEsc, onClose]);

    // Call onEnter/onLeave callbacks
    useEffect(() => {
      if (!open || !step) return;

      step.onEnter?.();

      return () => {
        step.onLeave?.();
      };
    }, [open, step]);

    const handleNext = () => {
      if (currentStep < steps.length - 1) {
        const newStep = currentStep + 1;
        if (!isControlled) {
          setUncontrolledCurrent(newStep);
        }
        onChange?.(newStep);
      }
    };

    const handlePrev = () => {
      if (currentStep > 0) {
        const newStep = currentStep - 1;
        if (!isControlled) {
          setUncontrolledCurrent(newStep);
        }
        onChange?.(newStep);
      }
    };

    const handleFinish = () => {
      onFinish?.();
      onClose();
    };

    const handleSkip = () => {
      onClose();
    };

    const handleMaskClick = () => {
      if (maskClosable) {
        onClose();
      }
    };

    const handleDotClick = (index: number) => {
      if (!isControlled) {
        setUncontrolledCurrent(index);
      }
      onChange?.(index);
    };

    if (!open || !step) return null;

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;
    const showSkipButton = step.showSkip !== false;

    // set anchorRef to the target element so the portal can anchor to it
    const targetElement = getTargetElement(step);
    useEffect(() => {
      anchorRef.current = targetElement as HTMLElement | null;
    }, [targetElement]);

    const { portalContainer, portalRef, portalPos } = usePortalPosition(
      anchorRef,
      open,
      { position: state.placement }
    );

    const node = (
      <div
        ref={ref}
        className={cn(tourVariants({ open }), className)}
        style={{ zIndex }}
        {...props}
      >
        {/* Mask */}
        {mask && (
          <div
            className={cn(
              tourMaskVariants({ open, closable: maskClosable }),
              maskClassName
            )}
            onClick={handleMaskClick}
            aria-hidden="true"
          />
        )}

        {/* Spotlight */}
        {mask && state.targetRect && (
          <div
            className={cn(tourSpotlightVariants({ maskStyle }))}
            style={{
              top: state.targetRect.top - 4,
              left: state.targetRect.left - 4,
              width: state.targetRect.width + 8,
              height: state.targetRect.height + 8,
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
            }}
            aria-hidden="true"
          />
        )}

        {/* Popover (portal) */}
        <div
          ref={(node) => {
            // popoverRef is a local ref object; assign to .current
            if (popoverRef) popoverRef.current = node as HTMLDivElement | null;
            portalRef.current = node as HTMLDivElement | null;
          }}
          className={cn(
            tourPopoverVariants({ placement: state.placement }),
            popoverClassName
          )}
          style={{
            top: portalPos.top,
            left: portalPos.left,
            position: "absolute",
          }}
          role="dialog"
          aria-labelledby="tour-title"
          aria-describedby="tour-description"
        >
          {/* Arrow */}
          {showArrow && state.placement !== "center" && (
            <div
              className={cn(tourArrowVariants({ placement: state.placement }))}
              style={{
                top: state.arrowPosition.top
                  ? `${state.arrowPosition.top}px`
                  : undefined,
                left: state.arrowPosition.left
                  ? `${state.arrowPosition.left}px`
                  : undefined,
              }}
              aria-hidden="true"
            />
          )}

          {/* Header */}
          <div className={cn(tourHeaderVariants())}>
            <div className="flex-1">
              {showStepNumbers && (
                <div className={cn(tourStepNumberVariants())}>
                  Step {currentStep + 1} of {steps.length}
                </div>
              )}
              <h2 id="tour-title" className={cn(tourTitleVariants())}>
                {step.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={cn(tourCloseButtonVariants())}
              aria-label="Close tour"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Cover */}
          {step.cover && (
            <div className={cn(tourCoverVariants())}>{step.cover}</div>
          )}

          {/* Description */}
          <div id="tour-description" className={cn(tourDescriptionVariants())}>
            {step.description}
          </div>

          {/* Footer */}
          <div className={cn(tourFooterVariants())}>
            {/* Progress Dots */}
            {showProgress && (
              <div className={cn(tourProgressVariants())}>
                {steps.map((_: TourStep, index: number) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDotClick(index)}
                    className={cn(
                      tourProgressDotVariants({
                        active: index === currentStep,
                        completed: index < currentStep,
                      })
                    )}
                    aria-label={`Go to step ${index + 1}`}
                    aria-current={index === currentStep ? "step" : undefined}
                  />
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              {showSkipButton && !isLastStep && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className={cn(tourButtonVariants({ variant: "ghost" }))}
                >
                  {skipButtonContent}
                </button>
              )}
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className={cn(tourButtonVariants({ variant: "outline" }))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  {step.prevButtonText || prevButtonContent}
                </button>
              )}
              {!isLastStep ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className={cn(tourButtonVariants({ variant: "default" }))}
                >
                  {step.nextButtonText || nextButtonContent}
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  className={cn(tourButtonVariants({ variant: "default" }))}
                >
                  {finishButtonContent}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    if (!portalContainer) return node;
    return createPortal(node, portalContainer);
  }
);

Tour.displayName = "Tour";

export { Tour };
export default Tour;
export type { TourProps, TourStep, TourPlacement };
