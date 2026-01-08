import React from "react";
import type {
  TransitionConfig,
  ShadowConfig,
  BackdropConfig,
  PhysicsConfig,
  DebugConfig,
  WidthMode,
} from "./Affix.types";

/**
 * Get element by selector, ref, or function
 */
export function getElement(
  target: HTMLElement | (() => HTMLElement | null) | string | null | undefined
): HTMLElement | null {
  if (!target) return null;

  if (typeof target === "string") {
    return document.querySelector(target);
  }

  if (typeof target === "function") {
    return target();
  }

  return target;
}

/**
 * Build transition CSS string
 */
export function buildTransitionStyle(
  config: TransitionConfig | false | undefined,
  reducedMotion: boolean
): string {
  if (config === false || reducedMotion) {
    return "none";
  }

  const {
    duration = 200,
    easing = "ease-out",
    delay = 0,
    property = "all",
  } = config || {};

  const properties = Array.isArray(property) ? property.join(", ") : property;
  return `${properties} ${duration}ms ${easing} ${delay}ms`;
}

/**
 * Build shadow CSS string
 */
export function buildShadowStyle(
  config: boolean | ShadowConfig | undefined,
  affixed: boolean
): string {
  if (!config || !affixed) return "none";

  if (config === true) {
    return "0 2px 8px rgba(0, 0, 0, 0.15)";
  }

  const {
    color = "rgba(0, 0, 0, 0.15)",
    blur = 8,
    spread = 0,
    offsetX = 0,
    offsetY = 2,
  } = config;

  return `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`;
}

/**
 * Build backdrop filter CSS string
 */
export function buildBackdropStyle(
  config: boolean | BackdropConfig | undefined,
  affixed: boolean
): string {
  if (!config || !affixed) return "none";

  if (config === true) {
    return "blur(8px)";
  }

  const filters: string[] = [];
  const { blur = 8, saturate, brightness } = config;

  if (blur) filters.push(`blur(${blur}px)`);
  if (saturate !== undefined) filters.push(`saturate(${saturate})`);
  if (brightness !== undefined) filters.push(`brightness(${brightness})`);

  return filters.join(" ") || "none";
}

/**
 * Calculate spring physics animation
 */
export function calculateSpringValue(
  current: number,
  target: number,
  velocity: number,
  config: PhysicsConfig = {}
): { value: number; velocity: number } {
  const { stiffness = 100, damping = 10, mass = 1 } = config;

  const springForce = -stiffness * (current - target);
  const dampingForce = -damping * velocity;
  const acceleration = (springForce + dampingForce) / mass;

  const dt = 1 / 60; // Assuming 60fps
  const newVelocity = velocity + acceleration * dt;
  const newValue = current + newVelocity * dt;

  return { value: newValue, velocity: newVelocity };
}

/**
 * Check if spring animation is settled
 */
export function isSpringSettled(
  current: number,
  target: number,
  velocity: number,
  threshold: number = 0.01
): boolean {
  return (
    Math.abs(current - target) < threshold && Math.abs(velocity) < threshold
  );
}

/**
 * Parse debug config
 */
export function parseDebugConfig(
  config: boolean | DebugConfig | undefined
): DebugConfig {
  if (!config) {
    return { enabled: false };
  }

  if (config === true) {
    return {
      enabled: true,
      showBoundaries: true,
      showScrollInfo: true,
      showPositionInfo: true,
      logStateChanges: true,
      highlightColor: "rgba(255, 0, 0, 0.3)",
    };
  }

  return {
    enabled: config.enabled ?? true,
    showBoundaries: config.showBoundaries ?? false,
    showScrollInfo: config.showScrollInfo ?? false,
    showPositionInfo: config.showPositionInfo ?? false,
    logStateChanges: config.logStateChanges ?? false,
    highlightColor: config.highlightColor ?? "rgba(255, 0, 0, 0.3)",
  };
}

/**
 * Calculate width based on width mode
 */
export function calculateWidth(
  mode: WidthMode,
  originalWidth: number,
  containerWidth: number
): string | undefined {
  switch (mode) {
    case "inherit":
      return `${originalWidth}px`;
    case "auto":
      return "auto";
    case "full":
      return `${containerWidth}px`;
    case "content":
      return "fit-content";
    default:
      if (typeof mode === "number") {
        return `${mode}px`;
      }
      return undefined;
  }
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = "affix"): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Merge refs
 */
export function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Get scroll parent
 */
export function getScrollParent(element: HTMLElement): HTMLElement | Window {
  let parent = element.parentElement;

  while (parent) {
    const { overflow, overflowY, overflowX } = getComputedStyle(parent);
    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return window;
}

/**
 * Create announcement for screen readers
 */
export function announceToScreenReader(message: string): void {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `;
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Check if browser supports sticky positioning
 */
export function supportsStickyPosition(): boolean {
  if (typeof CSS === "undefined" || !CSS.supports) {
    return false;
  }
  return (
    CSS.supports("position", "sticky") ||
    CSS.supports("position", "-webkit-sticky")
  );
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const output = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (
        typeof sourceValue === "object" &&
        sourceValue !== null &&
        !Array.isArray(sourceValue) &&
        typeof targetValue === "object" &&
        targetValue !== null &&
        !Array.isArray(targetValue)
      ) {
        (output as Record<string, unknown>)[key] = deepMerge(
          targetValue as object,
          sourceValue as object
        );
      } else {
        (output as Record<string, unknown>)[key] = sourceValue;
      }
    }
  }

  return output;
}

/**
 * Calculate snap position
 */
export function calculateSnapPosition(
  scrollTop: number,
  elementTop: number,
  elementHeight: number,
  threshold: number
): boolean {
  const scrolledPast = scrollTop - elementTop;
  const percentScrolled = scrolledPast / elementHeight;
  return percentScrolled >= threshold;
}

/**
 * Check if element is within container bounds
 */
export function isWithinContainerBounds(
  elementRect: DOMRect,
  containerRect: DOMRect
): boolean {
  return (
    elementRect.top >= containerRect.top &&
    elementRect.bottom <= containerRect.bottom &&
    elementRect.left >= containerRect.left &&
    elementRect.right <= containerRect.right
  );
}

/**
 * Calculate aspect ratio
 */
export function calculateAspectRatio(
  width: number,
  height: number
): { width: number; height: number; ratio: number } {
  const ratio = width / height;
  return { width, height, ratio };
}

/**
 * Apply aspect ratio constraint
 */
export function applyAspectRatioConstraint(
  targetWidth: number,
  originalWidth: number,
  originalHeight: number
): { width: number; height: number } {
  const ratio = originalWidth / originalHeight;
  return {
    width: targetWidth,
    height: targetWidth / ratio,
  };
}
