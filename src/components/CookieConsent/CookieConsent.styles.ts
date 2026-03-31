import { cva } from "class-variance-authority";

export const cookieConsentVariants = cva(
  "fixed z-50 p-4 w-full sm:p-0 transition-all duration-300 ease-in-out",
  {
    variants: {
      position: {
        "bottom-left": "bottom-4 left-4 sm:max-w-sm",
        "bottom-right": "bottom-4 right-4 sm:max-w-sm",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 sm:max-w-md",
        center:
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-md",
      },
    },
    defaultVariants: {
      position: "bottom-left",
    },
  },
);
