import { cva } from "class-variance-authority";

/**
 * Item container variants
 */
export const itemVariants = cva(
  "relative flex items-start transition-all duration-200 group",
  {
    variants: {
      variant: {
        default:
          "bg-background/50 hover:bg-accent/20 rounded-xl border border-transparent hover:border-border/50",
        bordered:
          "bg-card border border-border hover:border-primary/50 rounded-xl",
        elevated:
          "bg-card shadow-sm hover:shadow-md rounded-xl border border-border/30",
        ghost: "bg-transparent hover:bg-muted/50 rounded-xl",
        glass:
          "bg-background/30 backdrop-blur-md border border-border/40 hover:bg-background/40 hover:border-border/60 rounded-xl",
        soft: "bg-accent/5 hover:bg-accent/15 rounded-xl border border-accent/10 hover:border-accent/20",
        // Color variants
        primary:
          "bg-primary/10 border border-primary/20 hover:bg-primary/15 hover:border-primary/30 rounded-xl",
        secondary:
          "bg-secondary/10 border border-secondary/20 hover:bg-secondary/15 hover:border-secondary/30 rounded-xl",
        accent:
          "bg-accent/10 border border-accent/20 hover:bg-accent/15 hover:border-accent/30 rounded-xl",
        success:
          "bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 hover:border-green-500/30 rounded-xl",
        warning:
          "bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 hover:border-amber-500/30 rounded-xl",
        error:
          "bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 hover:border-red-500/30 rounded-xl",
        info: "bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 hover:border-blue-500/30 rounded-xl",
      },
      size: {
        xs: "gap-1.5 p-2",
        sm: "gap-2 p-2.5",
        md: "gap-3 p-3.5",
        lg: "gap-4 p-4.5",
        xl: "gap-5 p-5.5",
        "2xl": "gap-6 p-6.5",
        "3xl": "gap-7 p-7.5",
        "4xl": "gap-8 p-8.5",
      },
      clickable: {
        true: "cursor-pointer select-none",
        false: "",
      },
      active: {
        true: "",
        false: "",
      },
      disabled: {
        true: "opacity-50 pointer-events-none grayscale",
        false: "",
      },
    },
    compoundVariants: [
      // Default variant active states
      {
        variant: "default",
        active: true,
        className: "bg-accent/30 border-accent/40",
      },
      // Bordered variant active states
      {
        variant: "bordered",
        active: true,
        className: "border-primary bg-primary/5",
      },
      // Color variant active states
      {
        variant: "primary",
        active: true,
        className: "bg-primary/20 border-primary/40",
      },
      {
        variant: "success",
        active: true,
        className: "bg-green-500/20 border-green-500/40",
      },
      {
        variant: "warning",
        active: true,
        className: "bg-amber-500/20 border-amber-500/40",
      },
      {
        variant: "error",
        active: true,
        className: "bg-red-500/20 border-red-500/40",
      },
      {
        variant: "info",
        active: true,
        className: "bg-blue-500/20 border-blue-500/40",
      },
      // Subtle hover effects (no 3D scaling)
      {
        clickable: true,
        className: "hover:translate-y-[-1px] active:translate-y-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      clickable: false,
      active: false,
      disabled: false,
    },
  }
);

/**
 * Item media variants
 */
export const itemMediaVariants = cva(
  "flex-shrink-0 flex items-center justify-center transition-all duration-200",
  {
    variants: {
      variant: {
        icon: "rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 group-hover:from-primary/10 group-hover:to-primary/5 group-hover:text-primary border border-border/50",
        avatar:
          "rounded-full overflow-hidden ring-2 ring-background group-hover:ring-primary/20",
        image:
          "rounded-lg overflow-hidden border border-border/50 group-hover:border-border",
        thumbnail:
          "rounded-xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 border border-border/40",
      },
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
        xl: "",
        "2xl": "",
        "3xl": "",
        "4xl": "",
      },
    },
    compoundVariants: [
      {
        variant: "icon",
        size: "sm",
        className: "w-8 h-8 text-sm",
      },
      {
        variant: "icon",
        size: "md",
        className: "w-10 h-10 text-base",
      },
      {
        variant: "icon",
        size: "lg",
        className: "w-12 h-12 text-lg",
      },
      {
        variant: "avatar",
        size: "sm",
        className: "w-8 h-8",
      },
      {
        variant: "avatar",
        size: "md",
        className: "w-10 h-10",
      },
      {
        variant: "avatar",
        size: "lg",
        className: "w-12 h-12",
      },
      {
        variant: "image",
        size: "sm",
        className: "w-12 h-12",
      },
      {
        variant: "image",
        size: "md",
        className: "w-16 h-16",
      },
      {
        variant: "image",
        size: "lg",
        className: "w-20 h-20",
      },
      {
        variant: "thumbnail",
        size: "sm",
        className: "w-16 h-12",
      },
      {
        variant: "thumbnail",
        size: "md",
        className: "w-20 h-16",
      },
      {
        variant: "thumbnail",
        size: "lg",
        className: "w-24 h-20",
      },
    ],
    defaultVariants: {
      variant: "icon",
      size: "md",
    },
  }
);

/**
 * Item content variants
 */
export const itemContentVariants = cva("flex-1 min-w-0", {
  variants: {
    align: {
      start: "self-start",
      center: "self-center",
      end: "self-end",
    },
  },
  defaultVariants: {
    align: "start",
  },
});

/**
 * Item title variants
 */
export const itemTitleVariants = cva(
  "font-semibold text-foreground leading-tight transition-colors duration-200 group-hover:text-primary",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Item description variants
 */
export const itemDescriptionVariants = cva(
  "text-muted-foreground mt-0.5 leading-relaxed",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Item actions variants
 */
export const itemActionsVariants = cva(
  "flex-shrink-0 flex items-center gap-2 transition-opacity duration-200",
  {
    variants: {
      align: {
        start: "self-start",
        center: "self-center",
        end: "self-end",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
);

/**
 * Item header variants
 */
export const itemHeaderVariants = cva(
  "pb-2 mb-2 border-b border-border text-sm font-medium text-muted-foreground"
);

/**
 * Item footer variants
 */
export const itemFooterVariants = cva(
  "pt-2 mt-2 border-t border-border text-xs text-muted-foreground"
);

/**
 * Item group variants
 */
export const itemGroupVariants = cva("", {
  variants: {
    variant: {
      default: "space-y-1",
      bordered: "border border-border rounded-lg overflow-hidden",
      divided: "divide-y divide-border",
      cards: "space-y-2",
    },
    spacing: {
      none: "space-y-0",
      sm: "space-y-1",
      md: "space-y-2",
      lg: "space-y-4",
    },
  },
  defaultVariants: {
    variant: "default",
    spacing: "md",
  },
});

/**
 * Item separator variants
 */
export const itemSeparatorVariants = cva("bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full my-2",
      vertical: "w-px h-full mx-2",
    },
    decorative: {
      true: "relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    decorative: false,
  },
});

/**
 * Item badge variants
 */
export const itemBadgeVariants = cva(
  "inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary/10 text-primary",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        error: "bg-destructive/10 text-destructive",
        info: "bg-info/10 text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
