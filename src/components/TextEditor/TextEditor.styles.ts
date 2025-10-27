import { cva } from "class-variance-authority";

// ============================================================================
// TEXT EDITOR VARIANTS
// ============================================================================

export const textEditorVariants = cva(
  [
    "relative w-full rounded-lg border transition-all duration-200",
    "focus-within:ring-2 focus-within:ring-offset-2",
    "bg-background",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input",
          "focus-within:border-primary focus-within:ring-primary/20",
        ],
        primary: [
          "border-primary/50",
          "focus-within:border-primary focus-within:ring-primary/30",
        ],
        secondary: [
          "border-secondary/50",
          "focus-within:border-secondary focus-within:ring-secondary/30",
        ],
        accent: [
          "border-accent/50",
          "focus-within:border-accent focus-within:ring-accent/30",
        ],
        success: [
          "border-success/50",
          "focus-within:border-success focus-within:ring-success/30",
        ],
        warning: [
          "border-warning/50",
          "focus-within:border-warning focus-within:ring-warning/30",
        ],
        error: [
          "border-error/50",
          "focus-within:border-error focus-within:ring-error/30",
        ],
        info: [
          "border-info/50",
          "focus-within:border-info focus-within:ring-info/30",
        ],
        outline: [
          "border-input shadow-sm",
          "focus-within:border-primary focus-within:ring-primary/20",
        ],
        ghost: [
          "border-transparent",
          "focus-within:border-accent/50 focus-within:ring-accent/20",
        ],
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto min-w-[400px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: true,
    },
  }
);

export const toolbarVariants = cva(
  ["flex items-center gap-0.5 p-2.5 border-b", "flex-wrap backdrop-blur-sm"],
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-b from-muted/40 to-muted/20",
          "border-border",
        ],
        primary: [
          "bg-gradient-to-b from-primary/10 to-primary/5",
          "border-primary/20",
        ],
        secondary: [
          "bg-gradient-to-b from-secondary/10 to-secondary/5",
          "border-secondary/20",
        ],
        accent: [
          "bg-gradient-to-b from-accent/10 to-accent/5",
          "border-accent/20",
        ],
        success: [
          "bg-gradient-to-b from-success/10 to-success/5",
          "border-success/20",
        ],
        warning: [
          "bg-gradient-to-b from-warning/10 to-warning/5",
          "border-warning/20",
        ],
        error: ["bg-gradient-to-b from-error/10 to-error/5", "border-error/20"],
        info: ["bg-gradient-to-b from-info/10 to-info/5", "border-info/20"],
        outline: [
          "bg-gradient-to-b from-muted/30 to-muted/10",
          "border-border/50",
        ],
        ghost: [
          "bg-gradient-to-b from-accent/5 to-transparent",
          "border-transparent",
        ],
      },
      size: {
        sm: "min-h-10 gap-0.5",
        default: "min-h-12 gap-1",
        lg: "min-h-14 gap-1",
        xl: "min-h-16 gap-1.5",
      },
      sticky: {
        true: "sticky top-0 z-10 bg-background/95 backdrop-blur-md shadow-sm",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      sticky: false,
    },
  }
);

export const editorContentVariants = cva(
  [
    "outline-none p-4 min-h-[200px] max-h-[600px] overflow-y-auto",
    "prose prose-sm dark:prose-invert max-w-none",
    "[&_*]:transition-colors [&_*]:duration-200",
    // Headings
    "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4",
    "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3",
    "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2",
    "[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mb-2",
    "[&_h5]:text-base [&_h5]:font-semibold [&_h5]:mb-1",
    "[&_h6]:text-sm [&_h6]:font-semibold [&_h6]:mb-1",
    // Paragraphs
    "[&_p]:mb-3 [&_p]:leading-relaxed",
    // Lists
    "[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-3",
    "[&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-3",
    "[&_li]:mb-1",
    // Blockquote
    "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4",
    // Code
    "[&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono",
    "[&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4",
    "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
    // Links
    "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80",
    // Images
    "[&_img]:rounded-lg [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4",
    // Tables
    "[&_table]:w-full [&_table]:border-collapse [&_table]:my-4",
    "[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold",
    "[&_td]:border [&_td]:border-border [&_td]:p-2",
    // Horizontal rule
    "[&_hr]:my-6 [&_hr]:border-border",
    // Focus styles
    "focus:outline-none",
  ],
  {
    variants: {
      size: {
        sm: "text-sm [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg",
        default: "text-base [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl",
        lg: "text-lg [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl",
        xl: "text-xl [&_h1]:text-5xl [&_h2]:text-4xl [&_h3]:text-3xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const toolbarButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5",
    "rounded-md font-medium transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "whitespace-nowrap select-none cursor-pointer",
    "hover:scale-105 active:scale-95",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-transparent hover:bg-accent/20 text-foreground",
          "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[active=true]:shadow-sm",
          "focus-visible:ring-accent/50",
        ],
        primary: [
          "bg-transparent hover:bg-primary/20 text-foreground",
          "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-md",
          "focus-visible:ring-primary/50",
        ],
        secondary: [
          "bg-transparent hover:bg-secondary/20 text-foreground",
          "data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground data-[active=true]:shadow-md",
          "focus-visible:ring-secondary/50",
        ],
        accent: [
          "bg-transparent hover:bg-accent/20 text-foreground",
          "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[active=true]:shadow-md",
          "focus-visible:ring-accent/50",
        ],
        success: [
          "bg-transparent hover:bg-success/20 text-foreground",
          "data-[active=true]:bg-success data-[active=true]:text-success-foreground data-[active=true]:shadow-md",
          "focus-visible:ring-success/50",
        ],
        warning: [
          "bg-transparent hover:bg-warning/20 text-foreground",
          "data-[active=true]:bg-warning data-[active=true]:text-warning-foreground data-[active=true]:shadow-md",
          "focus-visible:ring-warning/50",
        ],
        error: [
          "bg-transparent hover:bg-error/20 text-foreground",
          "data-[active=true]:bg-error data-[active=true]:text-error-foreground data-[active=true]:shadow-md",
          "focus-visible:ring-error/50",
        ],
        info: [
          "bg-transparent hover:bg-info/20 text-foreground",
          "data-[active=true]:bg-info data-[active=true]:text-info-foreground data-[active=true]:shadow-md",
          "focus-visible:ring-info/50",
        ],
        outline: [
          "bg-transparent hover:bg-primary/15 text-foreground border border-transparent",
          "data-[active=true]:bg-primary/10 data-[active=true]:border-primary/30 data-[active=true]:shadow-sm",
          "focus-visible:ring-primary/50",
        ],
        ghost: [
          "bg-transparent hover:bg-accent/15 text-foreground",
          "data-[active=true]:bg-accent/30 data-[active=true]:shadow-inner",
          "focus-visible:ring-accent/50",
        ],
      },
      size: {
        sm: "h-7 px-2 text-xs gap-1",
        default: "h-8 px-2.5 text-sm gap-1.5",
        lg: "h-9 px-3 gap-2",
        xl: "h-10 px-4 text-base gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const toolbarSeparatorVariants = cva(
  "bg-border/60 mx-1.5 my-1 shrink-0",
  {
    variants: {
      orientation: {
        vertical: "h-6 w-px",
        horizontal: "h-px w-6",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

export const toolbarGroupVariants = cva(
  "flex items-center gap-0.5 p-1 rounded-md bg-muted/20 border border-transparent",
  {
    variants: {
      hover: {
        true: "hover:bg-muted/30 hover:border-border/30 transition-colors duration-200",
        false: "",
      },
    },
    defaultVariants: {
      hover: false,
    },
  }
);

export type TextEditorVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "ghost";

export type TextEditorSize = "sm" | "default" | "lg" | "xl";

export type ToolbarButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline"
  | "ghost";
