import { cva } from "class-variance-authority";

// ============================================================================
// TEXT EDITOR VARIANTS
// ============================================================================

export const textEditorVariants = cva(
  [
    "relative w-full rounded-xl border-2 transition-all duration-300 ease-out",
    "focus-within:ring-4 focus-within:ring-offset-0",
    "bg-background shadow-sm",
    "backdrop-blur-sm",
    "hover:shadow-md",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input/80",
          "focus-within:border-primary focus-within:ring-primary/10",
          "hover:border-input",
        ],
        primary: [
          "border-primary/30",
          "focus-within:border-primary focus-within:ring-primary/15",
          "hover:border-primary/50",
        ],
        secondary: [
          "border-secondary/30",
          "focus-within:border-secondary focus-within:ring-secondary/15",
          "hover:border-secondary/50",
        ],
        accent: [
          "border-accent/30",
          "focus-within:border-accent focus-within:ring-accent/15",
          "hover:border-accent/50",
        ],
        success: [
          "border-success/30",
          "focus-within:border-success focus-within:ring-success/15",
          "hover:border-success/50",
        ],
        warning: [
          "border-warning/30",
          "focus-within:border-warning focus-within:ring-warning/15",
          "hover:border-warning/50",
        ],
        error: [
          "border-error/30",
          "focus-within:border-error focus-within:ring-error/15",
          "hover:border-error/50",
        ],
        info: [
          "border-info/30",
          "focus-within:border-info focus-within:ring-info/15",
          "hover:border-info/50",
        ],
        outline: [
          "border-input/60 shadow-md",
          "focus-within:border-primary focus-within:ring-primary/10",
          "hover:shadow-lg hover:border-input/80",
        ],
        ghost: [
          "border-transparent shadow-none",
          "focus-within:border-accent/30 focus-within:ring-accent/10",
          "hover:border-accent/20 hover:shadow-sm",
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
  },
);

export const toolbarVariants = cva(
  [
    "flex items-center gap-0.5 p-2 border-b-2",
    "flex-wrap backdrop-blur-md",
    "transition-all duration-300",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-br from-muted/60 via-muted/40 to-muted/30",
          "border-border/60",
        ],
        primary: [
          "bg-gradient-to-br from-primary/8 via-primary/5 to-primary/3",
          "border-primary/20",
        ],
        secondary: [
          "bg-gradient-to-br from-secondary/8 via-secondary/5 to-secondary/3",
          "border-secondary/20",
        ],
        accent: [
          "bg-gradient-to-br from-accent/8 via-accent/5 to-accent/3",
          "border-accent/20",
        ],
        success: [
          "bg-gradient-to-br from-success/8 via-success/5 to-success/3",
          "border-success/20",
        ],
        warning: [
          "bg-gradient-to-br from-warning/8 via-warning/5 to-warning/3",
          "border-warning/20",
        ],
        error: [
          "bg-gradient-to-br from-error/8 via-error/5 to-error/3",
          "border-error/20",
        ],
        info: [
          "bg-gradient-to-br from-info/8 via-info/5 to-info/3",
          "border-info/20",
        ],
        outline: [
          "bg-gradient-to-br from-muted/40 via-muted/25 to-muted/15",
          "border-border/40",
        ],
        ghost: [
          "bg-gradient-to-br from-accent/4 via-transparent to-transparent",
          "border-transparent",
        ],
      },
      size: {
        sm: "min-h-9 gap-0.5 p-1.5",
        default: "min-h-10 gap-0.5 p-2",
        lg: "min-h-12 gap-1 p-2.5",
        xl: "min-h-14 gap-1.5 p-3",
      },
      sticky: {
        true: "sticky top-0 z-20 bg-background/98 backdrop-blur-xl shadow-lg border-b-2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      sticky: false,
    },
  },
);

export const editorContentVariants = cva(
  [
    "outline-none p-5 min-h-[200px] max-h-[600px] overflow-y-auto",
    "prose prose-sm dark:prose-invert max-w-none",
    "[&_*]:transition-all [&_*]:duration-200",
    "scroll-smooth",
    "selection:bg-primary/20 selection:text-primary-foreground",
    // Custom scrollbar
    "scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent",
    "hover:scrollbar-thumb-muted-foreground/30",
    // Headings with modern styling
    "[&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:mb-6 [&_h1]:mt-8 [&_h1]:tracking-tight",
    "[&_h1]:bg-gradient-to-r [&_h1]:from-foreground [&_h1]:to-foreground/80 [&_h1]:bg-clip-text",
    "[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-5 [&_h2]:mt-6 [&_h2]:tracking-tight",
    "[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-4 [&_h3]:mt-5",
    "[&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mb-3 [&_h4]:mt-4",
    "[&_h5]:text-lg [&_h5]:font-semibold [&_h5]:mb-2 [&_h5]:mt-3",
    "[&_h6]:text-base [&_h6]:font-semibold [&_h6]:mb-2 [&_h6]:mt-2",
    // Paragraphs with better spacing
    "[&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-foreground/90",
    // Lists with modern markers
    "[&_ul]:list-disc [&_ul]:ml-7 [&_ul]:mb-4 [&_ul]:space-y-2",
    "[&_ol]:list-decimal [&_ol]:ml-7 [&_ol]:mb-4 [&_ol]:space-y-2",
    "[&_li]:leading-relaxed [&_li]:pl-1",
    "[&_li::marker]:text-primary/70",
    // Enhanced blockquote with border accent
    "[&_blockquote]:border-l-4 [&_blockquote]:border-primary/60",
    "[&_blockquote]:pl-6 [&_blockquote]:pr-4 [&_blockquote]:py-3",
    "[&_blockquote]:italic [&_blockquote]:my-6",
    "[&_blockquote]:bg-muted/30 [&_blockquote]:rounded-r-lg",
    "[&_blockquote]:text-foreground/80",
    "[&_blockquote]:shadow-sm",
    // Modern code styling
    "[&_code]:bg-muted/80 [&_code]:px-2 [&_code]:py-1",
    "[&_code]:rounded-md [&_code]:text-sm [&_code]:font-mono",
    "[&_code]:text-foreground [&_code]:border [&_code]:border-border/50",
    "[&_code]:shadow-sm",
    "[&_pre]:bg-muted/50 [&_pre]:p-5 [&_pre]:rounded-xl",
    "[&_pre]:overflow-x-auto [&_pre]:my-6",
    "[&_pre]:border-2 [&_pre]:border-border/50",
    "[&_pre]:shadow-lg",
    "[&_pre]:backdrop-blur-sm",
    "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:border-0 [&_pre_code]:shadow-none",
    // Links with smooth hover
    "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
    "[&_a]:decoration-primary/40 [&_a]:decoration-2",
    "hover:[&_a]:text-primary/80 hover:[&_a]:decoration-primary/60",
    "[&_a]:transition-all [&_a]:duration-200",
    // Images with modern presentation
    "[&_img]:rounded-xl [&_img]:max-w-full [&_img]:h-auto",
    "[&_img]:my-6 [&_img]:shadow-lg [&_img]:border-2 [&_img]:border-border/30",
    "hover:[&_img]:shadow-xl [&_img]:transition-all [&_img]:duration-300",
    // Tables with modern styling
    "[&_table]:w-full [&_table]:border-collapse [&_table]:my-6",
    "[&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:shadow-md",
    "[&_th]:border [&_th]:border-border/60 [&_th]:bg-muted/60",
    "[&_th]:p-3 [&_th]:text-left [&_th]:font-semibold",
    "[&_th]:text-foreground",
    "[&_td]:border [&_td]:border-border/40 [&_td]:p-3",
    "[&_td]:text-foreground/90",
    "[&_tr]:transition-colors hover:[&_tr]:bg-muted/20",
    // Horizontal rule with gradient
    "[&_hr]:my-8 [&_hr]:border-0 [&_hr]:h-px",
    "[&_hr]:bg-gradient-to-r [&_hr]:from-transparent [&_hr]:via-border [&_hr]:to-transparent",
    // Strong and emphasis
    "[&_strong]:font-bold [&_strong]:text-foreground",
    "[&_em]:italic",
    "[&_u]:underline [&_u]:decoration-2 [&_u]:underline-offset-2",
    "[&_s]:line-through [&_s]:opacity-70",
    // Focus styles
    "focus:outline-none",
    // Placeholder styling
    "empty:before:content-[attr(data-placeholder)]",
    "empty:before:text-muted-foreground/50",
    "empty:before:pointer-events-none",
    "empty:before:absolute",
  ],
  {
    variants: {
      size: {
        sm: "text-sm p-4 [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg",
        default:
          "text-base p-5 [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl",
        lg: "text-lg p-6 [&_h1]:text-5xl [&_h2]:text-4xl [&_h3]:text-3xl",
        xl: "text-xl p-7 [&_h1]:text-6xl [&_h2]:text-5xl [&_h3]:text-4xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const toolbarButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5",
    "rounded-lg font-medium transition-all duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-40",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200",
    "whitespace-nowrap select-none cursor-pointer",
    "hover:scale-105 active:scale-95",
    "relative overflow-hidden",
    "before:absolute before:inset-0 before:rounded-lg",
    "before:opacity-0 before:transition-opacity before:duration-200",
    "hover:before:opacity-100",
    "shadow-sm hover:shadow-md",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-background/50 hover:bg-accent/30 text-foreground",
          "border border-transparent hover:border-border/30",
          "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
          "data-[active=true]:shadow-md data-[active=true]:border-accent/20",
          "data-[active=true]:scale-[0.98]",
          "focus-visible:ring-accent/50",
          "before:bg-gradient-to-br before:from-accent/20 before:to-accent/5",
        ],
        primary: [
          "bg-background/50 hover:bg-primary/25 text-foreground",
          "border border-transparent hover:border-primary/20",
          "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
          "data-[active=true]:shadow-lg data-[active=true]:shadow-primary/20",
          "data-[active=true]:border-primary/30",
          "data-[active=true]:scale-[0.98]",
          "focus-visible:ring-primary/50",
          "before:bg-gradient-to-br before:from-primary/20 before:to-primary/5",
        ],
        secondary: [
          "bg-background/50 hover:bg-secondary/25 text-foreground",
          "border border-transparent hover:border-secondary/20",
          "data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground",
          "data-[active=true]:shadow-lg data-[active=true]:shadow-secondary/20",
          "data-[active=true]:border-secondary/30",
          "data-[active=true]:scale-[0.98]",
          "focus-visible:ring-secondary/50",
          "before:bg-gradient-to-br before:from-secondary/20 before:to-secondary/5",
        ],
        accent: [
          "bg-background/50 hover:bg-accent/25 text-foreground",
          "border border-transparent hover:border-accent/20",
          "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
          "data-[active=true]:shadow-lg data-[active=true]:shadow-accent/20",
          "data-[active=true]:border-accent/30",
          "data-[active=true]:scale-[0.98]",
          "focus-visible:ring-accent/50",
          "before:bg-gradient-to-br before:from-accent/20 before:to-accent/5",
        ],
        success: [
          "bg-background/50 hover:bg-success/25 text-foreground",
          "border border-transparent hover:border-success/20",
          "data-[active=true]:bg-success data-[active=true]:text-success-foreground",
          "data-[active=true]:shadow-lg data-[active=true]:shadow-success/20",
          "data-[active=true]:border-success/30",
          "data-[active=true]:scale-[0.98]",
          "focus-visible:ring-success/50",
          "before:bg-gradient-to-br before:from-success/20 before:to-success/5",
        ],
        warning: [
          "bg-background/50 hover:bg-warning/25 text-foreground",
          "border border-transparent hover:border-warning/20",
          "data-[active=true]:bg-warning data-[active=true]:text-warning-foreground",
          "data-[active=true]:shadow-lg data-[active=true]:shadow-warning/20",
          "data-[active=true]:border-warning/30",
          "data-[active=true]:scale-[0.98]",
          "focus-visible:ring-warning/50",
          "before:bg-gradient-to-br before:from-warning/20 before:to-warning/5",
        ],
        error: [
          "bg-background/50 hover:bg-error/25 text-foreground",
          "border border-transparent hover:border-error/20",
          "data-[active=true]:bg-error data-[active=true]:text-error-foreground",
          "data-[active=true]:shadow-lg data-[active=true]:shadow-error/20",
          "data-[active=true]:border-error/30",
          "data-[active=true]:scale-[0.98]",
          "focus-visible:ring-error/50",
          "before:bg-gradient-to-br before:from-error/20 before:to-error/5",
        ],
        info: [
          "bg-background/50 hover:bg-info/25 text-foreground",
          "border border-transparent hover:border-info/20",
          "data-[active=true]:bg-info data-[active=true]:text-info-foreground",
          "data-[active=true]:shadow-lg data-[active=true]:shadow-info/20",
          "data-[active=true]:border-info/30",
          "data-[active=true]:scale-[0.98]",
          "focus-visible:ring-info/50",
          "before:bg-gradient-to-br before:from-info/20 before:to-info/5",
        ],
        outline: [
          "bg-background/80 hover:bg-primary/15 text-foreground",
          "border-2 border-border/40 hover:border-primary/40",
          "data-[active=true]:bg-primary/15 data-[active=true]:border-primary/50",
          "data-[active=true]:shadow-md data-[active=true]:scale-[0.98]",
          "focus-visible:ring-primary/50",
          "before:bg-gradient-to-br before:from-primary/15 before:to-primary/5",
        ],
        ghost: [
          "bg-transparent hover:bg-accent/20 text-foreground",
          "border border-transparent hover:border-accent/10",
          "data-[active=true]:bg-accent/30 data-[active=true]:shadow-inner",
          "data-[active=true]:border-accent/20",
          "data-[active=true]:scale-[0.98]",
          "focus-visible:ring-accent/50",
          "before:bg-gradient-to-br before:from-accent/15 before:to-transparent",
        ],
      },
      size: {
        sm: "h-7 px-2 text-xs gap-1 [&_svg]:size-3.5",
        default: "h-8 px-2.5 text-sm gap-1 [&_svg]:size-3.5",
        lg: "h-9 px-3 text-sm gap-1.5 [&_svg]:size-4",
        xl: "h-10 px-3.5 text-base gap-1.5 [&_svg]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const toolbarSeparatorVariants = cva(
  "bg-gradient-to-b from-transparent via-border/50 to-transparent mx-2 my-1.5 shrink-0",
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
  },
);

export const toolbarGroupVariants = cva(
  [
    "flex items-center gap-1 p-1 rounded-lg",
    "bg-muted/10 border border-transparent",
    "transition-all duration-200",
  ],
  {
    variants: {
      hover: {
        true: ["hover:bg-muted/20 hover:border-border/20", "hover:shadow-sm"],
        false: "",
      },
    },
    defaultVariants: {
      hover: false,
    },
  },
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
