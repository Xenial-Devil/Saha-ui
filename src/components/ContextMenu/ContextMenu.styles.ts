import { cva } from "class-variance-authority";

/**
 * Context Menu Content Variants - Beautiful, Clean, No Scrollbars
 */
export const contextMenuContentVariants = cva(
  [
    "z-50 min-w-[16rem] max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-visible",
    "rounded-2xl border-2 p-2.5",
    "bg-popover/98 backdrop-blur-2xl",
    "text-popover-foreground shadow-2xl",
    "animate-in fade-in-0 zoom-in-95 duration-200",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
    "data-[side=top]:slide-in-from-bottom-2",
    // Hide scrollbar but keep functionality
    "scrollbar-none",
    "[&::-webkit-scrollbar]:hidden",
    "[-ms-overflow-style:none]",
    "[scrollbar-width:none]",
  ],
  {
    variants: {
      variant: {
        default: ["border-border/60", "shadow-xl shadow-foreground/10"],
        primary: ["border-primary/50", "shadow-2xl shadow-primary/25"],
        secondary: ["border-secondary/50", "shadow-2xl shadow-secondary/25"],
        accent: ["border-accent/50", "shadow-2xl shadow-accent/25"],
        success: ["border-success/50", "shadow-2xl shadow-success/25"],
        warning: ["border-warning/50", "shadow-2xl shadow-warning/25"],
        error: ["border-error/50", "shadow-2xl shadow-error/25"],
        info: ["border-info/50", "shadow-2xl shadow-info/25"],
        outline: ["border-2 border-border", "bg-transparent", "shadow-lg"],
        glass: [
          "border-white/20",
          "bg-white/10 backdrop-blur-xl",
          "shadow-2xl shadow-black/10",
          "dark:bg-black/10",
        ],
      },
      size: {
        sm: "text-xs min-w-[14rem]",
        md: "text-sm min-w-[16rem]",
        lg: "text-base min-w-[18rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Context Menu Item Variants - Ultra Beautiful
 */
export const contextMenuItemVariants = cva(
  [
    "relative flex cursor-pointer select-none items-center rounded-xl",
    "outline-none transition-all duration-200 ease-out",
    "focus:bg-accent/90 focus:text-accent-foreground focus:scale-[1.01]",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
    "hover:scale-[1.01]",
    "active:scale-[0.99]",
    "group",
  ],
  {
    variants: {
      variant: {
        default: [
          "hover:bg-gradient-to-r hover:from-accent/80 hover:to-accent/70",
          "hover:shadow-lg hover:shadow-accent/20",
        ],
        destructive: [
          "text-destructive",
          "hover:bg-gradient-to-r hover:from-destructive/15 hover:to-destructive/10",
          "hover:text-destructive-foreground hover:shadow-lg hover:shadow-destructive/20",
          "focus:bg-destructive/15 focus:text-destructive-foreground",
        ],
        success: [
          "text-success",
          "hover:bg-gradient-to-r hover:from-success/15 hover:to-success/10",
          "hover:text-success-foreground hover:shadow-lg hover:shadow-success/20",
          "focus:bg-success/15 focus:text-success-foreground",
        ],
        warning: [
          "text-warning",
          "hover:bg-gradient-to-r hover:from-warning/15 hover:to-warning/10",
          "hover:text-warning-foreground hover:shadow-lg hover:shadow-warning/20",
          "focus:bg-warning/15 focus:text-warning-foreground",
        ],
      },
      size: {
        sm: "px-3 py-2 text-xs gap-2.5",
        md: "px-3.5 py-2.5 text-sm gap-3",
        lg: "px-4 py-3 text-base gap-3.5",
      },
      inset: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        inset: true,
        className: "pl-9",
      },
      {
        size: "md",
        inset: true,
        className: "pl-10",
      },
      {
        size: "lg",
        inset: true,
        className: "pl-12",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      inset: false,
    },
  }
);

/**
 * Context Menu Checkbox/Radio Item Variants - Beautiful
 */
export const contextMenuCheckItemVariants = cva(
  [
    "relative flex cursor-pointer select-none items-center rounded-xl",
    "outline-none transition-all duration-200 ease-out",
    "focus:bg-accent/80 focus:text-accent-foreground focus:scale-[1.02]",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "hover:bg-accent/70 hover:scale-[1.02] hover:shadow-md",
    "group",
  ],
  {
    variants: {
      size: {
        sm: "pl-8 pr-3 py-2 text-xs gap-2",
        md: "pl-9 pr-4 py-2.5 text-sm gap-2.5",
        lg: "pl-11 pr-5 py-3 text-base gap-3",
      },
      inset: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        inset: true,
        className: "pl-13",
      },
      {
        size: "md",
        inset: true,
        className: "pl-15",
      },
      {
        size: "lg",
        inset: true,
        className: "pl-17",
      },
    ],
    defaultVariants: {
      size: "md",
      inset: false,
    },
  }
);

/**
 * Context Menu Label Variants - Beautiful
 */
export const contextMenuLabelVariants = cva(
  ["font-semibold text-muted-foreground uppercase tracking-wider"],
  {
    variants: {
      size: {
        sm: "px-3 py-2 text-[10px]",
        md: "px-4 py-2.5 text-xs",
        lg: "px-5 py-3 text-sm",
      },
      inset: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        inset: true,
        className: "pl-9",
      },
      {
        size: "md",
        inset: true,
        className: "pl-11",
      },
      {
        size: "lg",
        inset: true,
        className: "pl-13",
      },
    ],
    defaultVariants: {
      size: "md",
      inset: false,
    },
  }
);

/**
 * Context Menu Separator Variants - Subtle and Beautiful
 */
export const contextMenuSeparatorVariants = cva(
  [
    "-mx-1 my-1.5 h-px",
    "bg-gradient-to-r from-transparent via-border/40 to-transparent",
  ],
  {
    variants: {},
    defaultVariants: {},
  }
);

/**
 * Context Menu Shortcut Variants - Beautiful
 */
export const contextMenuShortcutVariants = cva(
  [
    "absolute right-3 tracking-widest opacity-50",
    "group-hover:opacity-100 transition-all duration-200",
    "font-mono",
  ],
  {
    variants: {
      size: {
        sm: "text-[10px] right-2.5",
        md: "text-xs right-3",
        lg: "text-sm right-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Context Menu Sub Trigger Variants - Beautiful
 */
export const contextMenuSubTriggerVariants = cva(
  [
    "relative flex cursor-pointer select-none items-center rounded-xl",
    "outline-none transition-all duration-200 ease-out",
    "focus:bg-accent/80 focus:text-accent-foreground focus:scale-[1.02]",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "data-[state=open]:bg-accent/90 data-[state=open]:scale-[1.02]",
    "hover:bg-accent/70 hover:scale-[1.02] hover:shadow-md",
    "group",
  ],
  {
    variants: {
      size: {
        sm: "px-3 py-2 text-xs gap-2",
        md: "px-4 py-2.5 text-sm gap-2.5",
        lg: "px-5 py-3 text-base gap-3",
      },
      inset: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        inset: true,
        className: "pl-9",
      },
      {
        size: "md",
        inset: true,
        className: "pl-11",
      },
      {
        size: "lg",
        inset: true,
        className: "pl-13",
      },
    ],
    defaultVariants: {
      size: "md",
      inset: false,
    },
  }
);

/**
 * Context Menu Indicator (Check/Radio) Variants - Beautiful
 */
export const contextMenuIndicatorVariants = cva(
  [
    "absolute left-0 inline-flex items-center justify-center",
    "transition-transform duration-200",
    "group-hover:scale-110",
  ],
  {
    variants: {
      size: {
        sm: "w-8 h-4",
        md: "w-9 h-5",
        lg: "w-11 h-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
