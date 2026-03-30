"use client";

import { forwardRef, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../Card";
import Button from "../Button";
import type { CookieConsentProps } from "./CookieConsent.types";
import { cookieConsentVariants } from "./CookieConsent.styles";

/**
 * CookieConsent component
 *
 * A customizable cookie consent dialog designed to float at the bottom of the viewport.
 * Compliant with standard data privacy requirements.
 *
 * @component
 * @example
 * // Basic usage
 * <CookieConsent
 *   onAccept={() => console.log('Accepted')}
 *   onDecline={() => console.log('Declined')}
 * />
 *
 * @example
 * // Custom positioning and text
 * <CookieConsent
 *   position="bottom-right"
 *   title="Cookie Policy"
 *   description="Custom cookie policy text here."
 *   acceptLabel="Got it"
 *   declineLabel="No thanks"
 * />
 */
export const CookieConsent = forwardRef<HTMLDivElement, CookieConsentProps>(
  (
    {
      title = "We use cookies",
      description = "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.",
      acceptLabel = "Accept All",
      declineLabel = "Decline",
      onAccept,
      onDecline,
      position = "bottom-left",
      className,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      // In a real implementation, you'd check localStorage/cookies here
      // For the component, we just show it after a tiny delay
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }, []);

    /**
     * Internal function to handle the accept button click
     * @private
     */
    const handleAccept = () => {
      setIsVisible(false);
      onAccept?.();
    };

    /**
     * Internal function to handle the decline button click
     * @private
     */
    const handleDecline = () => {
      setIsVisible(false);
      onDecline?.();
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(cookieConsentVariants({ position }), className)}
        {...props}
      >
        <Card className="shadow-lg border-border/60">
          <CardHeader className="pb-3 text-left">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-xs sm:text-sm mt-1">
              {description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-2 pt-2 justify-end">
            <Button variant="outline" size="sm" onClick={handleDecline}>
              {declineLabel}
            </Button>
            <Button variant="primary" size="sm" onClick={handleAccept}>
              {acceptLabel}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  },
);
CookieConsent.displayName = "CookieConsent";
