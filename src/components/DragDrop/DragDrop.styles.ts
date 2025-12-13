import { cva } from "class-variance-authority";

// ============================================
// Draggable Item Styles
// ============================================

export const draggableItemVariants = cva(
  "relative touch-none transition-all duration-150 ease-out",
  {
    variants: {
      isDragging: {
        true: "cursor-grabbing z-50 opacity-50",
        false:
          "cursor-grab hover:shadow-lg hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      },
      isOver: {
        true: "ring-2 ring-primary ring-offset-2",
        false: "",
      },
      disabled: {
        true: "opacity-40 cursor-not-allowed hover:shadow-none hover:scale-100",
        false: "",
      },
      axis: {
        x: "",
        y: "",
        both: "",
      },
    },
    defaultVariants: {
      isDragging: false,
      isOver: false,
      disabled: false,
      axis: "y",
    },
  }
);

// ============================================
// Droppable Container Styles
// ============================================

export const droppableContainerVariants = cva(
  "relative transition-all duration-150 ease-out",
  {
    variants: {
      direction: {
        vertical: "flex flex-col gap-2",
        horizontal: "flex flex-row gap-2 overflow-x-auto",
        grid: "grid gap-2",
      },
      isOver: {
        true: "bg-primary/5 border-2 border-primary border-dashed rounded-lg shadow-inner scale-[1.01]",
        false: "border-2 border-transparent",
      },
      isEmpty: {
        true: "min-h-[200px] border-2 border-dashed border-border rounded-lg flex items-center justify-center hover:border-primary/30 hover:bg-primary/5",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:border-border",
        false: "",
      },
    },
    defaultVariants: {
      direction: "vertical",
      isOver: false,
      isEmpty: false,
      disabled: false,
    },
  }
);

// ============================================
// Drag Handle Styles
// ============================================

export const dragHandleVariants = cva(
  "inline-flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors",
  {
    variants: {
      variant: {
        default:
          "text-muted-foreground hover:text-foreground hover:bg-accent rounded p-1",
        ghost: "text-muted-foreground hover:text-foreground",
        outline: "border-2 border-border hover:border-primary rounded p-1",
      },
      size: {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
      },
      disabled: {
        true: "opacity-40 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false,
    },
  }
);

// ============================================
// Drag Overlay Styles
// ============================================

export const dragOverlayVariants = cva(
  "fixed pointer-events-none z-[9999] will-change-transform",
  {
    variants: {
      animation: {
        smooth: "transition-transform duration-150 ease-out",
        instant: "",
        spring: "transition-transform duration-300 ease-spring",
      },
    },
    defaultVariants: {
      animation: "smooth",
    },
  }
);

// ============================================
// Drop Indicator Styles
// ============================================

export const dropIndicatorVariants = cva(
  "absolute left-0 right-0 h-0.5 bg-primary transition-all duration-150",
  {
    variants: {
      position: {
        top: "top-0 -translate-y-1",
        bottom: "bottom-0 translate-y-1",
        before: "-translate-y-1",
        after: "translate-y-1",
      },
      orientation: {
        horizontal: "h-0.5 w-full",
        vertical: "w-0.5 h-full",
      },
      visible: {
        true: "opacity-100 scale-100",
        false: "opacity-0 scale-0",
      },
    },
    defaultVariants: {
      position: "top",
      orientation: "horizontal",
      visible: false,
    },
  }
);

// ============================================
// Placeholder Styles
// ============================================

export const placeholderVariants = cva(
  "bg-accent/50 border-2 border-dashed border-primary rounded transition-all duration-200",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-12",
        lg: "h-16",
        auto: "h-auto",
      },
      visible: {
        true: "opacity-100 scale-100",
        false: "opacity-0 scale-95",
      },
    },
    defaultVariants: {
      size: "auto",
      visible: false,
    },
  }
);

// ============================================
// Animation Classes
// ============================================

export const animations = {
  dragStart: "animate-in fade-in zoom-in duration-150",
  dragEnd: "animate-out fade-out zoom-out duration-150",
  dropSuccess: "animate-in slide-in-from-top-2 duration-200",
  dropCancel: "animate-out slide-out-to-top-2 duration-200",
  reorder: "transition-all duration-200 ease-out",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
};

// ============================================
// Cursor Classes
// ============================================

export const cursors = {
  grab: "cursor-grab",
  grabbing: "cursor-grabbing",
  notAllowed: "cursor-not-allowed",
  move: "cursor-move",
  default: "cursor-default",
};
