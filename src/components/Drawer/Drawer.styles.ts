import { cva } from "class-variance-authority";
/**
 * Overlay variants with smooth animations
 */
const overlayVariants = cva(
  [
    "fixed inset-0 z-50",
    // Smooth transitions
    "transition-all duration-300 ease-in-out",
  ],
  {
    variants: {
      backdrop: {
        default: "bg-black/50",
        blur: "bg-black/30 backdrop-blur-md",
        transparent: "bg-transparent",
        dark: "bg-black/80",
      },
      state: {
        open: "opacity-100",
        closed: "opacity-0 pointer-events-none",
      },
    },
    defaultVariants: {
      backdrop: "default",
      state: "closed",
    },
  }
);
/**
 * Content variants with smooth slide animations
 */
const contentVariants = cva(
  [
    "fixed z-50",
    "flex flex-col",
    "bg-background border-border",
    "shadow-2xl",
    // Smooth transitions
    "transition-all duration-500 ease-out",
  ],
  {
    variants: {
      position: {
        left: "top-0 left-0 h-full border-r",
        right: "top-0 right-0 h-full border-l",
        top: "top-0 left-0 w-full border-b",
        bottom: "bottom-0 left-0 w-full border-t",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        full: "",
      },
      animation: {
        slide: "",
        fade: "",
        scale: "",
        none: "transition-none",
      },
      state: {
        open: "",
        closed: "pointer-events-none",
      },
    },
    compoundVariants: [
      // Size variants for left/right drawers
      { position: "left", size: "sm", className: "w-64" },
      { position: "left", size: "md", className: "w-80" },
      { position: "left", size: "lg", className: "w-96" },
      { position: "left", size: "xl", className: "w-[32rem]" },
      { position: "left", size: "full", className: "w-full" },
      { position: "right", size: "sm", className: "w-64" },
      { position: "right", size: "md", className: "w-80" },
      { position: "right", size: "lg", className: "w-96" },
      { position: "right", size: "xl", className: "w-[32rem]" },
      { position: "right", size: "full", className: "w-full" },
      // Size variants for top/bottom drawers
      { position: "top", size: "sm", className: "h-48" },
      { position: "top", size: "md", className: "h-64" },
      { position: "top", size: "lg", className: "h-80" },
      { position: "top", size: "xl", className: "h-96" },
      { position: "top", size: "full", className: "h-full" },
      { position: "bottom", size: "sm", className: "h-48" },
      { position: "bottom", size: "md", className: "h-64" },
      { position: "bottom", size: "lg", className: "h-80" },
      { position: "bottom", size: "xl", className: "h-96" },
      { position: "bottom", size: "full", className: "h-full" },

      // Slide animations - left drawer
      {
        position: "left",
        animation: "slide",
        state: "open",
        className: "translate-x-0 opacity-100",
      },
      {
        position: "left",
        animation: "slide",
        state: "closed",
        className: "-translate-x-full opacity-0",
      },
      // Slide animations - right drawer
      {
        position: "right",
        animation: "slide",
        state: "open",
        className: "translate-x-0 opacity-100",
      },
      {
        position: "right",
        animation: "slide",
        state: "closed",
        className: "translate-x-full opacity-0",
      },
      // Slide animations - top drawer
      {
        position: "top",
        animation: "slide",
        state: "open",
        className: "translate-y-0 opacity-100",
      },
      {
        position: "top",
        animation: "slide",
        state: "closed",
        className: "-translate-y-full opacity-0",
      },
      // Slide animations - bottom drawer
      {
        position: "bottom",
        animation: "slide",
        state: "open",
        className: "translate-y-0 opacity-100",
      },
      {
        position: "bottom",
        animation: "slide",
        state: "closed",
        className: "translate-y-full opacity-0",
      },

      // Fade animation
      {
        animation: "fade",
        state: "open",
        className: "opacity-100",
      },
      {
        animation: "fade",
        state: "closed",
        className: "opacity-0",
      },

      // Scale animation
      {
        animation: "scale",
        state: "open",
        className: "opacity-100 scale-100",
      },
      {
        animation: "scale",
        state: "closed",
        className: "opacity-0 scale-95",
      },
    ],
    defaultVariants: {
      position: "right",
      size: "md",
      animation: "slide",
      state: "closed",
    },
  }
);
export { overlayVariants, contentVariants };