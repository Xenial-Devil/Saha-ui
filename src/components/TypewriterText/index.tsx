"use client";

import { forwardRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Typography } from "../Typography";
import type { TypewriterTextProps } from "./TypewriterText.types";
import {
  typewriterTextVariants,
  typewriterCursorVariants,
} from "./TypewriterText.styles";

/**
 * TypewriterText component
 *
 * An animated text component that types out text character-by-character,
 * optionally displaying a blinking cursor and looping continuously.
 *
 * @component
 * @example
 * // Basic usage
 * <TypewriterText text="Welcome to Saha UI!" speed={50} />
 *
 * @example
 * // Looping with delay
 * <TypewriterText
 *   text="Repeating text..."
 *   loop={true}
 *   loopDelay={3000}
 * />
 */
export const TypewriterText = forwardRef<
  HTMLParagraphElement,
  TypewriterTextProps
>(
  (
    {
      text,
      speed = 50,
      loop = false,
      loopDelay = 2000,
      cursor = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout>;
      let currentIndex = 0;

      /**
       * Internal function to handle the typing effect loop
       * @private
       */
      const type = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = setTimeout(type, speed);
        } else {
          if (loop) {
            timeout = setTimeout(() => {
              setDisplayedText("");
              currentIndex = 0;
              type();
            }, loopDelay);
          }
        }
      };

      setDisplayedText("");
      type();

      return () => clearTimeout(timeout);
    }, [text, speed, loop, loopDelay]);

    return (
      <Typography
        ref={ref}
        className={cn(typewriterTextVariants(), className)}
        {...props}
      >
        {displayedText}
        {cursor && <span className={typewriterCursorVariants()}></span>}
      </Typography>
    );
  },
);
TypewriterText.displayName = "TypewriterText";
