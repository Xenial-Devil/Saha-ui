"use client";

import { forwardRef, useEffect, useRef, useCallback } from "react";
import { cn } from "../../lib/utils";
import type { ConfettiProps } from "./Confetti.types";
import { confettiVariants } from "./Confetti.styles";

/**
 * Confetti component
 *
 * A high-performance HTML `<canvas>` based temporary confetti explosion effect.
 * Perfect for celebration states and success events.
 *
 * @component
 * @example
 * // Basic automatic usage
 * <Confetti duration={3000} particleCount={150} />
 *
 * @example
 * // Triggered based on state
 * {isSuccess && <Confetti colors={['#fff', '#000']} />}
 */
export const Confetti = forwardRef<HTMLCanvasElement, ConfettiProps>(
  (
    {
      particleCount = 100,
      colors = [
        "#ff0a54",
        "#ff477e",
        "#ff7096",
        "#ff85a1",
        "#fbb1bd",
        "#f9bec7",
      ],
      duration = 3000,
      autoStart = true,
      variant,
      className,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLCanvasElement>(null);

    /**
     * Internal function to handle the canvas ref assignment
     * @param {HTMLCanvasElement | null} node - The internal ref node
     * @private
     */
    const setRef = useCallback(
      (node: HTMLCanvasElement | null) => {
        (
          internalRef as React.MutableRefObject<HTMLCanvasElement | null>
        ).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    useEffect(() => {
      if (!autoStart || !internalRef.current) return;

      const canvas = internalRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      /**
       * Handle resize
       * @private
       */
      const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      setCanvasSize();
      window.addEventListener("resize", setCanvasSize);

      let animationFrameId: number;
      const startTime = Date.now();

      /**
       * Simple particle physics loop and rendering
       * @private
       */
      const particles = Array.from({ length: particleCount }).map(() => ({
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: Math.random() * 6 + 2,
        dx: Math.random() * 10 - 5,
        dy: Math.random() * -10 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngle: 0,
        tiltAngleInc: Math.random() * 0.07 + 0.05,
      }));

      /**
       * The continuous render loop function for the confetti animation
       * @private
       */
      const render = () => {
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const now = Date.now();
        const elapsed = now - startTime;

        if (elapsed > duration) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }

        particles.forEach((p) => {
          p.tiltAngle += p.tiltAngleInc;
          p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2;
          p.x += Math.sin(p.tiltAngle) * 2;
          p.x += p.dx;
          p.y += p.dy;
          p.dy += 0.2; // gravity

          ctx.beginPath();
          ctx.lineWidth = p.r;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt, p.y);
          ctx.lineTo(p.x, p.y + p.tilt);
          ctx.stroke();
        });

        animationFrameId = requestAnimationFrame(render);
      };

      render();

      return () => {
        window.removeEventListener("resize", setCanvasSize);
        cancelAnimationFrame(animationFrameId);
      };
    }, [autoStart, particleCount, colors, duration]);

    return (
      <canvas
        ref={setRef}
        className={cn(confettiVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Confetti.displayName = "Confetti";
