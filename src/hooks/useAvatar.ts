import { useState, useMemo, useCallback } from "react";

/**
 * Props for the useAvatar hook
 */
export interface UseAvatarProps {
  /**
   * Image source URL
   */
  src?: string;

  /**
   * Alt text for the avatar (used for initials fallback)
   */
  alt?: string;

  /**
   * Custom initials to display (overrides alt text)
   */
  initials?: string;
}

/**
 * Return type for the useAvatar hook
 */
export interface UseAvatarReturn {
  /**
   * Whether to show initials instead of image
   */
  showInitials: boolean;

  /**
   * Background color class for initials display
   */
  bgColor: string;

  /**
   * Generated initials text
   */
  initialsText: string;

  /**
   * Whether the image has loaded
   */
  imageLoaded: boolean;

  /**
   * Whether the image failed to load
   */
  imageError: boolean;

  /**
   * Handler for image load event
   */
  handleImageLoad: () => void;

  /**
   * Handler for image error event
   */
  handleImageError: () => void;
}

/**
 * Available background colors for avatar initials
 */
const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-indigo-500",
  "bg-teal-500",
] as const;

/**
 * Generate a consistent background color from text
 * Uses character code to ensure same text always gets same color
 */
const generateBackgroundColor = (text: string): string => {
  if (!text) return AVATAR_COLORS[0];
  const index = text.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

/**
 * Extract initials from a name or text
 * - If custom initials provided, use those (max 2 chars)
 * - If text has multiple words, use first letter of first two words
 * - Otherwise, use first 2 characters
 */
const extractInitials = (text: string, customInitials?: string): string => {
  if (customInitials) {
    return customInitials.slice(0, 2).toUpperCase();
  }

  if (!text) return "??";

  const words = text.trim().split(/\s+/);

  if (words.length >= 2) {
    // Use first letter of first two words
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  // Use first 2 characters
  return text.slice(0, 2).toUpperCase();
};

/**
 * Custom hook for managing Avatar component logic
 *
 * This hook handles image loading states, error handling,
 * initials generation, and background color assignment for avatars.
 *
 * @example
 * ```tsx
 * const {
 *   showInitials,
 *   bgColor,
 *   initialsText,
 *   imageLoaded,
 *   handleImageLoad,
 *   handleImageError
 * } = useAvatar({
 *   src: "/avatar.jpg",
 *   alt: "John Doe",
 *   initials: "JD"
 * });
 * ```
 */
export function useAvatar({
  src,
  alt = "Avatar",
  initials,
}: UseAvatarProps = {}): UseAvatarReturn {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine if we should show initials (no src or image failed to load)
  const showInitials = useMemo(() => {
    return imageError || !src;
  }, [imageError, src]);

  // Generate initials text
  const initialsText = useMemo(() => {
    return extractInitials(alt, initials);
  }, [alt, initials]);

  // Generate background color based on initials or alt text
  const bgColor = useMemo(() => {
    const text = initials || alt;
    return generateBackgroundColor(text);
  }, [initials, alt]);

  // Handle successful image load
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  // Handle image load error
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  return {
    showInitials,
    bgColor,
    initialsText,
    imageLoaded,
    imageError,
    handleImageLoad,
    handleImageError,
  };
}
