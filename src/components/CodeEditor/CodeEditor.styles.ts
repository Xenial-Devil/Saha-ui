import { cva } from "class-variance-authority";

// ============================================================================
// CODE EDITOR VARIANTS
// ============================================================================

export const codeEditorVariants = cva(
  [
    "relative w-full rounded-lg border transition-all duration-200",
    "focus-within:ring-2 focus-within:ring-offset-2",
    "overflow-hidden",
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
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto min-w-[600px]",
      },
      theme: {
        light: "bg-white",
        dark: "bg-slate-900",
        vscode: "bg-[#1e1e1e]",
        github: "bg-white",
        monokai: "bg-[#272822]",
        dracula: "bg-[#282a36]",
        nord: "bg-[#2e3440]",
        solarized: "bg-[#002b36]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: true,
      theme: "dark",
    },
  }
);

export const editorGutterVariants = cva(
  ["select-none font-mono text-right pr-3 border-r", "sticky left-0 z-10"],
  {
    variants: {
      theme: {
        light: "bg-gray-50 border-gray-200 text-gray-500",
        dark: "bg-slate-800 border-slate-700 text-slate-500",
        vscode: "bg-[#1e1e1e] border-[#3e3e3e] text-[#858585]",
        github: "bg-gray-50 border-gray-200 text-gray-500",
        monokai: "bg-[#272822] border-[#3e3d32] text-[#75715e]",
        dracula: "bg-[#282a36] border-[#44475a] text-[#6272a4]",
        nord: "bg-[#2e3440] border-[#3b4252] text-[#4c566a]",
        solarized: "bg-[#002b36] border-[#073642] text-[#586e75]",
      },
      size: {
        sm: "text-xs min-w-[2.5rem] py-0.5",
        default: "text-sm min-w-[3rem] py-1",
        lg: "text-base min-w-[3.5rem] py-1.5",
        xl: "text-lg min-w-[4rem] py-2",
      },
    },
    defaultVariants: {
      theme: "dark",
      size: "default",
    },
  }
);

export const editorContentVariants = cva(
  ["outline-none font-mono overflow-auto", "whitespace-pre"],
  {
    variants: {
      theme: {
        light: "bg-white text-gray-900",
        dark: "bg-slate-900 text-gray-100",
        vscode: "bg-[#1e1e1e] text-[#d4d4d4]",
        github: "bg-white text-gray-900",
        monokai: "bg-[#272822] text-[#f8f8f2]",
        dracula: "bg-[#282a36] text-[#f8f8f2]",
        nord: "bg-[#2e3440] text-[#eceff4]",
        solarized: "bg-[#002b36] text-[#839496]",
      },
      size: {
        sm: "text-xs p-3 leading-5",
        default: "text-sm p-4 leading-6",
        lg: "text-base p-5 leading-7",
        xl: "text-lg p-6 leading-8",
      },
      wordWrap: {
        true: "whitespace-pre-wrap break-words",
        false: "whitespace-pre",
      },
    },
    defaultVariants: {
      theme: "dark",
      size: "default",
      wordWrap: false,
    },
  }
);

export const editorLineVariants = cva("relative", {
  variants: {
    active: {
      true: "",
      false: "",
    },
    theme: {
      light: "hover:bg-gray-100/50",
      dark: "hover:bg-slate-800/50",
      vscode: "hover:bg-[#2a2d2e]",
      github: "hover:bg-gray-100/50",
      monokai: "hover:bg-[#3e3d32]/50",
      dracula: "hover:bg-[#44475a]/30",
      nord: "hover:bg-[#3b4252]/50",
      solarized: "hover:bg-[#073642]/50",
    },
  },
  compoundVariants: [
    {
      active: true,
      theme: "light",
      class: "bg-gray-100/70",
    },
    {
      active: true,
      theme: "dark",
      class: "bg-slate-800/70",
    },
    {
      active: true,
      theme: "vscode",
      class: "bg-[#2a2d2e]",
    },
    {
      active: true,
      theme: "github",
      class: "bg-gray-100/70",
    },
    {
      active: true,
      theme: "monokai",
      class: "bg-[#3e3d32]/70",
    },
    {
      active: true,
      theme: "dracula",
      class: "bg-[#44475a]/50",
    },
    {
      active: true,
      theme: "nord",
      class: "bg-[#3b4252]/70",
    },
    {
      active: true,
      theme: "solarized",
      class: "bg-[#073642]/70",
    },
  ],
  defaultVariants: {
    active: false,
    theme: "dark",
  },
});

export const editorStatusBarVariants = cva(
  ["flex items-center justify-between px-4 py-1.5 border-t text-xs font-mono"],
  {
    variants: {
      theme: {
        light: "bg-gray-50 border-gray-200 text-gray-600",
        dark: "bg-slate-800 border-slate-700 text-slate-400",
        vscode: "bg-[#007acc] border-[#007acc] text-white",
        github: "bg-gray-50 border-gray-200 text-gray-600",
        monokai: "bg-[#272822] border-[#3e3d32] text-[#75715e]",
        dracula: "bg-[#21222c] border-[#44475a] text-[#6272a4]",
        nord: "bg-[#2e3440] border-[#3b4252] text-[#4c566a]",
        solarized: "bg-[#073642] border-[#073642] text-[#586e75]",
      },
    },
    defaultVariants: {
      theme: "dark",
    },
  }
);

export type CodeEditorVariant =
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

export type CodeEditorSize = "sm" | "default" | "lg" | "xl";

export type CodeEditorTheme =
  | "light"
  | "dark"
  | "vscode"
  | "github"
  | "monokai"
  | "dracula"
  | "nord"
  | "solarized";
