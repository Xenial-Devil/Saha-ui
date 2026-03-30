import { cva } from "class-variance-authority";

export const announcementBarVariants = cva(
  "rounded-none border-x-0 border-t-0 flex items-center justify-center p-2.5 shadow-none relative",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        accent: "",
        destructive: "",
        warning: "",
        success: "",
        info: "",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const announcementBarContentVariants = cva(
  "flex-1 text-center text-sm font-medium",
);

export const announcementBarCloseVariants = cva(
  "absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
);
