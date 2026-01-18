import { cva } from "class-variance-authority";

export const affixVariants = cva("", {
  variants: {
    affixed: {
      true: "",
      false: "relative",
    },
    position: {
      top: "left-0 right-0",
      bottom: "left-0 right-0",
      left: "top-0 bottom-0",
      right: "top-0 bottom-0",
      none: "",
    },
    mode: {
      fixed: "fixed",
      sticky: "sticky",
      relative: "relative",
    },
    animated: {
      true: "transition-all duration-200",
      false: "transition-none",
    },
    hasBackdrop: {
      true: "backdrop-blur",
      false: "",
    },
    hasShadow: {
      true: "shadow-lg",
      false: "",
    },
  },
  compoundVariants: [
    {
      affixed: true,
      position: "top",
      hasShadow: true,
      className: "shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
    },
    {
      affixed: true,
      position: "bottom",
      hasShadow: true,
      className: "shadow-[0_-2px_8px_rgba(0,0,0,0.15)]",
    },
  ],
  defaultVariants: {
    affixed: false,
    position: "none",
    mode: "relative",
    animated: true,
    hasBackdrop: false,
    hasShadow: false,
  },
});

export const affixPlaceholderVariants = cva("pointer-events-none", {
  variants: {
    visible: {
      true: "block",
      false: "hidden",
    },
  },
  defaultVariants: {
    visible: false,
  },
});

export const affixContentVariants = cva("", {
  variants: {
    fullWidth: {
      true: "w-full",
      false: "",
    },
    useTransform: {
      true: "will-change-transform",
      false: "",
    },
  },
  defaultVariants: {
    fullWidth: true,
    useTransform: false,
  },
});

export const affixIndicatorVariants = cva(
  "absolute transition-opacity duration-200",
  {
    variants: {
      position: {
        top: "bottom-0 left-0 right-0 h-1",
        bottom: "top-0 left-0 right-0 h-1",
        left: "right-0 top-0 bottom-0 w-1",
        right: "left-0 top-0 bottom-0 w-1",
        none: "",
      },
      visible: {
        true: "opacity-100",
        false: "opacity-0",
      },
    },
    defaultVariants: {
      visible: false,
      position: "none",
    },
  }
);

export const affixDebugVariants = cva(
  "absolute pointer-events-none z-[9999] font-mono text-xs",
  {
    variants: {
      position: {
        topLeft: "top-2 left-2",
        topRight: "top-2 right-2",
        bottomLeft: "bottom-2 left-2",
        bottomRight: "bottom-2 right-2",
      },
    },
    defaultVariants: {
      position: "topRight",
    },
  }
);
