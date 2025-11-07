import { cva } from "class-variance-authority";

export const tourVariants = cva(
  "fixed inset-0 pointer-events-none z-[1000]",
  {
    variants: {
      open: {
        true: "block",
        false: "hidden",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

export const tourMaskVariants = cva(
  "fixed inset-0 bg-black/50 transition-opacity duration-300 pointer-events-auto",
  {
    variants: {
      open: {
        true: "opacity-100",
        false: "opacity-0",
      },
      closable: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      open: false,
      closable: true,
    },
  }
);

export const tourSpotlightVariants = cva(
  "absolute transition-all duration-300 pointer-events-none",
  {
    variants: {
      maskStyle: {
        default: "rounded-lg",
        rounded: "rounded-2xl",
        rect: "rounded-none",
      },
    },
    defaultVariants: {
      maskStyle: "default",
    },
  }
);

export const tourPopoverVariants = cva(
  "absolute bg-card border rounded-lg shadow-xl p-4 pointer-events-auto max-w-md animate-in fade-in-0 zoom-in-95",
  {
    variants: {
      placement: {
        top: "slide-in-from-bottom-2",
        "top-start": "slide-in-from-bottom-2",
        "top-end": "slide-in-from-bottom-2",
        bottom: "slide-in-from-top-2",
        "bottom-start": "slide-in-from-top-2",
        "bottom-end": "slide-in-from-top-2",
        left: "slide-in-from-right-2",
        "left-start": "slide-in-from-right-2",
        "left-end": "slide-in-from-right-2",
        right: "slide-in-from-left-2",
        "right-start": "slide-in-from-left-2",
        "right-end": "slide-in-from-left-2",
        center: "",
      },
    },
    defaultVariants: {
      placement: "bottom",
    },
  }
);

export const tourHeaderVariants = cva(
  "flex items-start justify-between gap-4 mb-3",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const tourTitleVariants = cva(
  "text-lg font-semibold text-foreground",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const tourStepNumberVariants = cva(
  "inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 mb-2",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const tourDescriptionVariants = cva(
  "text-sm text-muted-foreground mb-4",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const tourCoverVariants = cva(
  "w-full rounded-md overflow-hidden mb-4",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const tourFooterVariants = cva(
  "flex items-center justify-between gap-2 pt-3 border-t",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const tourProgressVariants = cva(
  "flex items-center gap-1",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const tourProgressDotVariants = cva(
  "w-2 h-2 rounded-full transition-all duration-200",
  {
    variants: {
      active: {
        true: "bg-primary w-6",
        false: "bg-muted-foreground/30 hover:bg-muted-foreground/50 cursor-pointer",
      },
      completed: {
        true: "bg-primary/60",
        false: "",
      },
    },
    compoundVariants: [
      {
        active: false,
        completed: true,
        className: "bg-primary/60",
      },
    ],
    defaultVariants: {
      active: false,
      completed: false,
    },
  }
);

export const tourButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const tourArrowVariants = cva(
  "absolute w-3 h-3 bg-card border rotate-45",
  {
    variants: {
      placement: {
        top: "-bottom-1.5 border-b border-r",
        "top-start": "-bottom-1.5 border-b border-r",
        "top-end": "-bottom-1.5 border-b border-r",
        bottom: "-top-1.5 border-t border-l",
        "bottom-start": "-top-1.5 border-t border-l",
        "bottom-end": "-top-1.5 border-t border-l",
        left: "-right-1.5 border-r border-t",
        "left-start": "-right-1.5 border-r border-t",
        "left-end": "-right-1.5 border-r border-t",
        right: "-left-1.5 border-l border-b",
        "right-start": "-left-1.5 border-l border-b",
        "right-end": "-left-1.5 border-l border-b",
        center: "hidden",
      },
    },
    defaultVariants: {
      placement: "bottom",
    },
  }
);

export const tourCloseButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {},
    defaultVariants: {},
  }
);
