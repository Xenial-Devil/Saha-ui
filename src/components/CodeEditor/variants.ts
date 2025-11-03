import { cva } from "class-variance-authority";

// Public types used across the editor components
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
    active: { true: "", false: "" },
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
    { active: true, theme: "light", class: "bg-gray-100/70" },
    { active: true, theme: "dark", class: "bg-slate-800/70" },
    { active: true, theme: "vscode", class: "bg-[#2a2d2e]" },
    { active: true, theme: "github", class: "bg-gray-100/70" },
    { active: true, theme: "monokai", class: "bg-[#3e3d32]/70" },
    { active: true, theme: "dracula", class: "bg-[#44475a]/50" },
    { active: true, theme: "nord", class: "bg-[#3b4252]/70" },
    { active: true, theme: "solarized", class: "bg-[#073642]/70" },
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
    defaultVariants: { theme: "dark" },
  }
);

// VS Code-like tab bar for file tabs
export const editorTabBarVariants = cva(["flex items-center border-b h-9"], {
  variants: {
    theme: {
      light: "bg-gray-100 border-gray-300",
      dark: "bg-[#252526] border-[#1e1e1e]",
      vscode: "bg-[#252526] border-[#1e1e1e]",
      github: "bg-gray-100 border-gray-300",
      monokai: "bg-[#2d2a2e] border-[#221f22]",
      dracula: "bg-[#21222c] border-[#191a21]",
      nord: "bg-[#2e3440] border-[#242933]",
      solarized: "bg-[#002b36] border-[#001e26]",
    },
  },
  defaultVariants: { theme: "dark" },
});

// Individual tab styling
export const editorTabVariants = cva(
  [
    "flex items-center gap-2 px-4 h-full border-r text-sm transition-colors cursor-pointer relative",
  ],
  {
    variants: {
      theme: {
        light: "border-gray-300 text-gray-700 hover:bg-white",
        dark: "border-[#1e1e1e] text-[#969696] hover:bg-[#2d2d30]",
        vscode: "border-[#1e1e1e] text-[#969696] hover:bg-[#2d2d30]",
        github: "border-gray-300 text-gray-700 hover:bg-white",
        monokai: "border-[#221f22] text-[#939293] hover:bg-[#3a3739]",
        dracula: "border-[#191a21] text-[#6272a4] hover:bg-[#282a36]",
        nord: "border-[#242933] text-[#4c566a] hover:bg-[#3b4252]",
        solarized: "border-[#001e26] text-[#586e75] hover:bg-[#073642]",
      },
      active: { true: "", false: "opacity-60" },
    },
    compoundVariants: [
      {
        active: true,
        theme: "vscode",
        class:
          "bg-[#1e1e1e] text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#007acc]",
      },
      {
        active: true,
        theme: "dark",
        class:
          "bg-[#1e1e1e] text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-500",
      },
      {
        active: true,
        theme: "light",
        class:
          "bg-white text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-600",
      },
    ],
    defaultVariants: { theme: "dark", active: false },
  }
);

// Toolbar container
export const editorToolbarVariants = cva(
  [
    "pointer-events-auto rounded-md shadow-md backdrop-blur",
    "flex items-center",
  ],
  {
    variants: {
      theme: {
        light: "bg-white/70 border border-gray-200 text-gray-800",
        dark: "bg-slate-800/60 border border-slate-700 text-slate-200",
        vscode: "bg-[#252526]/70 border border-[#1e1e1e] text-[#d4d4d4]",
        github: "bg-white/70 border border-gray-200 text-gray-800",
        monokai: "bg-[#2d2a2e]/70 border-[#221f22] text-[#f8f8f2]",
        dracula: "bg-[#21222c]/70 border border-[#191a21] text-[#f8f8f2]",
        nord: "bg-[#2e3440]/70 border border-[#242933] text-[#eceff4]",
        solarized: "bg-[#002b36]/70 border border-[#001e26] text-[#93a1a1]",
      } satisfies Record<CodeEditorTheme, string>,
      size: {
        sm: "gap-1 p-1 text-xs",
        default: "gap-2 px-2 py-1.5 text-xs",
        lg: "gap-2.5 px-2.5 py-2 text-sm",
        xl: "gap-3 px-3 py-2.5 text-base",
      } satisfies Record<CodeEditorSize, string>,
      placement: {
        floating: "absolute top-2 right-2 z-20",
        inline: "relative z-10",
      },
    },
    defaultVariants: {
      theme: "dark",
      size: "default",
      placement: "floating",
    },
  }
);

// Action button (copy, etc.)
export const editorActionVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none select-none",
  ],
  {
    variants: {
      size: {
        sm: "h-7 px-2 text-[11px] gap-1.5",
        default: "h-8 px-2.5 text-xs gap-1.5",
        lg: "h-9 px-3 text-sm gap-2",
        xl: "h-10 px-3.5 text-base gap-2",
      } satisfies Record<CodeEditorSize, string>,
      theme: {
        vscode: "bg-[#1e1e1e] !text-[#d4d4d4]",
        dark: "bg-[#282c34] !text-[#abb2bf]",
        light: "bg-white !text-[#24292e]",
        github: "bg-white !text-[#24292f]",
        monokai: "bg-[#272822] !text-[#f8f8f2]",
        dracula: "bg-[#282a36] !text-[#f8f8f2]",
        nord: "bg-[#2e3440] !text-[#eceff4]",
        solarized: "bg-[#002b36] !text-[#93a1a1]",
      } satisfies Record<CodeEditorTheme, string>,
      variant: { solid: "", outline: "border", ghost: "" },
      intent: {
        neutral: "transition-colors",
        primary: "transition-colors",
        secondary: "transition-colors",
        accent: "transition-colors",
        info: "transition-colors",
        success: "transition-colors",
        warning: "transition-colors",
        error: "transition-colors",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        intent: "neutral",
        class:
          "bg-muted text-foreground hover:brightness-110 active:brightness-95",
      },
      {
        variant: "solid",
        intent: "primary",
        class:
          "bg-primary text-primary-foreground hover:brightness-110 active:brightness-95",
      },
      {
        variant: "solid",
        intent: "secondary",
        class:
          "bg-secondary text-secondary-foreground hover:brightness-110 active:brightness-95",
      },
      {
        variant: "solid",
        intent: "accent",
        class:
          "bg-accent text-accent-foreground hover:brightness-110 active:brightness-95",
      },
      {
        variant: "solid",
        intent: "info",
        class:
          "bg-info text-info-foreground hover:brightness-110 active:brightness-95",
      },
      {
        variant: "solid",
        intent: "success",
        class:
          "bg-success text-success-foreground hover:brightness-110 active:brightness-95",
      },
      {
        variant: "solid",
        intent: "warning",
        class:
          "bg-warning text-warning-foreground hover:brightness-110 active:brightness-95",
      },
      {
        variant: "solid",
        intent: "error",
        class:
          "bg-destructive text-destructive-foreground hover:brightness-110 active:brightness-95",
      },
      {
        variant: "outline",
        intent: "neutral",
        class: "border-border/60 text-foreground hover:bg-foreground/5",
      },
      {
        variant: "outline",
        intent: "primary",
        class: "border-primary/60 text-primary hover:bg-primary/10",
      },
      {
        variant: "outline",
        intent: "secondary",
        class: "border-secondary/60 text-secondary hover:bg-secondary/10",
      },
      {
        variant: "outline",
        intent: "accent",
        class: "border-accent/60 text-accent hover:bg-accent/10",
      },
      {
        variant: "outline",
        intent: "info",
        class: "border-info/60 text-info hover:bg-info/10",
      },
      {
        variant: "outline",
        intent: "success",
        class: "border-success/60 text-success hover:bg-success/10",
      },
      {
        variant: "outline",
        intent: "warning",
        class: "border-warning/60 text-warning hover:bg-warning/10",
      },
      {
        variant: "outline",
        intent: "error",
        class: "border-destructive/60 text-destructive hover:bg-destructive/10",
      },
      {
        variant: "ghost",
        intent: "neutral",
        class: "text-foreground hover:bg-foreground/5",
      },
      {
        variant: "ghost",
        intent: "primary",
        class: "text-primary hover:bg-primary/10",
      },
      {
        variant: "ghost",
        intent: "secondary",
        class: "text-secondary hover:bg-secondary/10",
      },
      {
        variant: "ghost",
        intent: "accent",
        class: "text-accent hover:bg-accent/10",
      },
      { variant: "ghost", intent: "info", class: "text-info hover:bg-info/10" },
      {
        variant: "ghost",
        intent: "success",
        class: "text-success hover:bg-success/10",
      },
      {
        variant: "ghost",
        intent: "warning",
        class: "text-warning hover:bg-warning/10",
      },
      {
        variant: "ghost",
        intent: "error",
        class: "text-destructive hover:bg-destructive/10",
      },
      // Theme-specific colors for neutral outline buttons
      {
        theme: "vscode",
        variant: "outline",
        intent: "neutral",
        class: "border-[#3e3e3e] text-[#d4d4d4] hover:bg-[#2d2d2d]",
      },
      {
        theme: "dark",
        variant: "outline",
        intent: "neutral",
        class: "border-[#3e3e3e] text-[#abb2bf] hover:bg-[#2d2d2d]",
      },
      {
        theme: "light",
        variant: "outline",
        intent: "neutral",
        class: "border-[#d0d0d0] text-[#24292e] hover:bg-[#f6f8fa]",
      },
      {
        theme: "github",
        variant: "outline",
        intent: "neutral",
        class: "border-[#d0d7de] text-[#24292f] hover:bg-[#f6f8fa]",
      },
      {
        theme: "monokai",
        variant: "outline",
        intent: "neutral",
        class: "border-[#49483e] text-[#f8f8f2] hover:bg-[#3e3d32]",
      },
      {
        theme: "dracula",
        variant: "outline",
        intent: "neutral",
        class: "border-[#6272a4] text-[#f8f8f2] hover:bg-[#44475a]",
      },
      {
        theme: "nord",
        variant: "outline",
        intent: "neutral",
        class: "border-[#4c566a] text-[#eceff4] hover:bg-[#3b4252]",
      },
      {
        theme: "solarized",
        variant: "outline",
        intent: "neutral",
        class: "border-[#586e75] text-[#93a1a1] hover:bg-[#073642]",
      },
      // Theme-specific colors for primary outline buttons
      {
        theme: "vscode",
        variant: "outline",
        intent: "primary",
        class: "border-[#569cd6] text-[#569cd6] hover:bg-[#569cd6]/10",
      },
      {
        theme: "dark",
        variant: "outline",
        intent: "primary",
        class: "border-[#61afef] text-[#61afef] hover:bg-[#61afef]/10",
      },
      {
        theme: "light",
        variant: "outline",
        intent: "primary",
        class: "border-[#005cc5] text-[#005cc5] hover:bg-[#005cc5]/10",
      },
      {
        theme: "github",
        variant: "outline",
        intent: "primary",
        class: "border-[#0969da] text-[#0969da] hover:bg-[#0969da]/10",
      },
      {
        theme: "monokai",
        variant: "outline",
        intent: "primary",
        class: "border-[#66d9ef] text-[#66d9ef] hover:bg-[#66d9ef]/10",
      },
      {
        theme: "dracula",
        variant: "outline",
        intent: "primary",
        class: "border-[#8be9fd] text-[#8be9fd] hover:bg-[#8be9fd]/10",
      },
      {
        theme: "nord",
        variant: "outline",
        intent: "primary",
        class: "border-[#88c0d0] text-[#88c0d0] hover:bg-[#88c0d0]/10",
      },
      {
        theme: "solarized",
        variant: "outline",
        intent: "primary",
        class: "border-[#268bd2] text-[#268bd2] hover:bg-[#268bd2]/10",
      },
    ],
    defaultVariants: {
      size: "default",
      variant: "outline",
      intent: "neutral",
      theme: "dark",
    },
  }
);

// Icon-only button
export const editorIconButtonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md",
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: "h-7 w-7 text-[11px]",
        default: "h-8 w-8 text-xs",
        lg: "h-9 w-9 text-sm",
        xl: "h-10 w-10 text-base",
      } satisfies Record<CodeEditorSize, string>,
      style: {
        ghost: "hover:bg-foreground/5",
        subtle: "bg-muted/60 hover:bg-muted/80",
        outline: "border border-border/60 hover:bg-foreground/5",
      },
    },
    defaultVariants: {
      size: "default",
      style: "ghost",
    },
  }
);

// Language select
export const editorSelectVariants = cva(
  [
    "inline-flex items-center rounded-md border bg-transparent outline-none ring-0 transition-colors",
  ],
  {
    variants: {
      size: {
        sm: "h-7 px-2 text-[11px]",
        default: "h-8 px-2 text-xs",
        lg: "h-9 px-2.5 text-sm",
        xl: "h-10 px-3 text-base",
      } satisfies Record<CodeEditorSize, string>,
      theme: {
        light: "border-gray-300 text-gray-800 hover:bg-gray-100",
        dark: "border-slate-700 text-slate-200 hover:bg-slate-800/70",
        vscode: "border-[#3e3e3e] text-[#d4d4d4] hover:bg-[#2d2d2d]",
        github: "border-gray-300 text-gray-800 hover:bg-gray-100",
        monokai: "border-[#3e3d32] text-[#f8f8f2] hover:bg-[#3a3739]",
        dracula: "border-[#44475a] text-[#f8f8f2] hover:bg-[#343746]",
        nord: "border-[#3b4252] text-[#eceff4] hover:bg-[#3b4252]",
        solarized: "border-[#073642] text-[#93a1a1] hover:bg-[#073642]/70",
      } satisfies Record<CodeEditorTheme, string>,
    },
    defaultVariants: {
      size: "default",
      theme: "dark",
    },
  }
);

// Find bar
export const editorFindBarVariants = cva(
  ["rounded-md shadow-md border", "flex items-center gap-2"],
  {
    variants: {
      theme: {
        light: "bg-white/90 border-gray-200 text-gray-800",
        dark: "bg-slate-800/90 border-slate-700 text-slate-200",
        vscode: "bg-[#252526]/90 border-[#1e1e1e] text-[#d4d4d4]",
        github: "bg-white/90 border-gray-200 text-gray-800",
        monokai: "bg-[#2d2a2e]/90 border-[#221f22] text-[#f8f8f2]",
        dracula: "bg-[#21222c]/90 border-[#191a21] text-[#f8f8f2]",
        nord: "bg-[#2e3440]/90 border-[#242933] text-[#eceff4]",
        solarized: "bg-[#002b36]/90 border-[#001e26] text-[#93a1a1]",
      } satisfies Record<CodeEditorTheme, string>,
      size: {
        sm: "px-2 py-1",
        default: "px-2.5 py-1.5",
        lg: "px-3 py-2",
        xl: "px-3.5 py-2.5",
      } satisfies Record<CodeEditorSize, string>,
    },
    defaultVariants: {
      theme: "dark",
      size: "default",
    },
  }
);

export const editorFindInputVariants = cva(
  [
    "rounded-md bg-transparent outline-none",
    "placeholder:opacity-60",
    "border focus:border-primary focus:ring-2 focus:ring-primary/30",
  ],
  {
    variants: {
      size: {
        sm: "h-7 px-2 text-[11px] min-w=[8rem]",
        default: "h-8 px-2 text-xs min-w-[10rem]",
        lg: "h-9 px-2.5 text-sm min-w-[12rem]",
        xl: "h-10 px-3 text-base min-w-[14rem]",
      } satisfies Record<CodeEditorSize, string>,
      theme: {
        light: "border-gray-300 text-gray-800",
        dark: "border-slate-700 text-slate-200",
        vscode: "border-[#3e3e3e] text-[#d4d4d4]",
        github: "border-gray-300 text-gray-800",
        monokai: "border-[#3e3d32] text-[#f8f8f2]",
        dracula: "border-[#44475a] text-[#f8f8f2]",
        nord: "border-[#3b4252] text-[#eceff4]",
        solarized: "border-[#073642] text-[#93a1a1]",
      } satisfies Record<CodeEditorTheme, string>,
    },
    defaultVariants: {
      size: "default",
      theme: "dark",
    },
  }
);

// Minimap rail
export const editorMinimapVariants = cva(
  ["hidden md:block border-l shrink-0"],
  {
    variants: {
      theme: {
        light: "bg-gray-50 border-gray-200",
        dark: "bg-slate-800 border-slate-700",
        vscode: "bg-[#1e1e1e] border-[#3e3e3e]",
        github: "bg-gray-50 border-gray-200",
        monokai: "bg-[#2d2a2e] border-[#221f22]",
        dracula: "bg-[#21222c] border-[#191a21]",
        nord: "bg-[#2e3440] border-[#242933]",
        solarized: "bg-[#002b36] border-[#001e26]",
      } satisfies Record<CodeEditorTheme, string>,
      size: {
        sm: "w-10",
        default: "w-12",
        lg: "w-14",
        xl: "w-16",
      } satisfies Record<CodeEditorSize, string>,
    },
    defaultVariants: {
      theme: "dark",
      size: "default",
    },
  }
);

// Tooltip/badge
export const editorTooltipVariants = cva(
  [
    "inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium",
    "shadow-sm border",
  ],
  {
    variants: {
      theme: {
        light: "bg-white text-gray-800 border-gray-200",
        dark: "bg-slate-800 text-slate-100 border-slate-700",
        vscode: "bg-[#252526] text-[#d4d4d4] border-[#1e1e1e]",
        github: "bg-white text-gray-800 border-gray-200",
        monokai: "bg-[#2d2a2e] text-[#f8f8f2] border-[#221f22]",
        dracula: "bg-[#21222c] text-[#f8f8f2] border-[#191a21]",
        nord: "bg-[#2e3440] text-[#eceff4] border-[#242933]",
        solarized: "bg-[#002b36] text-[#93a1a1] border-[#001e26]",
      } satisfies Record<CodeEditorTheme, string>,
      tone: {
        neutral: "",
        primary: "text-primary border-primary/50",
        accent: "text-accent border-accent/50",
        success: "text-success border-success/50",
        warning: "text-warning border-warning/50",
        error: "text-destructive border-destructive/50",
        info: "text-info border-info/50",
      },
    },
    defaultVariants: { theme: "dark", tone: "neutral" },
  }
);

// Gutter markers
export const editorGutterMarkerVariants = cva(
  [
    "relative",
    "after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1.5 after:h-2.5 after:w-2.5 after:rounded-full",
  ],
  {
    variants: {
      kind: {
        breakpoint: "after:bg-primary",
        error: "after:bg-destructive",
        warning: "after:bg-warning",
        info: "after:bg-info",
        success: "after:bg-success",
        accent: "after:bg-accent",
      },
      hollow: {
        true: "after:bg-transparent after:ring-2 after:ring-current",
        false: "",
      },
    },
    defaultVariants: { kind: "info", hollow: false },
  }
);

// Extra types for actions
export type EditorActionSize = CodeEditorSize;
export type EditorActionVariant = "solid" | "outline" | "ghost";
export type EditorActionIntent =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

// Optional: Button + shimmer variants if you use them elsewhere in your UI
export const buttonVariants = cva(
  "group relative inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:saturate-50 overflow-hidden isolate",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_4px_14px_0] shadow-primary/40 hover:shadow-[0_6px_20px_0] hover:shadow-primary/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_4px_14px_0] shadow-secondary/40 hover:shadow-[0_6px_20px_0] hover:shadow-secondary/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        accent:
          "bg-accent text-accent-foreground shadow-[0_4px_14px_0] shadow-accent/40 hover:shadow-[0_6px_20px_0] hover:shadow-accent/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        info: "bg-info text-info-foreground shadow-[0_4px_14px_0] shadow-info/40 hover:shadow-[0_6px_20px_0] hover:shadow-info/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        success:
          "bg-success text-success-foreground shadow-[0_4px_14px_0] shadow-success/40 hover:shadow-[0_6px_20px_0] hover:shadow-success/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        warning:
          "bg-warning text-warning-foreground shadow-[0_4px_14px_0] shadow-warning/40 hover:shadow-[0_6px_20px_0] hover:shadow-warning/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        error:
          "bg-destructive text-destructive-foreground shadow-[0_4px_14px_0] shadow-destructive/40 hover:shadow-[0_6px_20px_0] hover:shadow-destructive/60 hover:brightness-110 active:brightness-90 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        outline:
          "border-2 border-primary/60 text-primary bg-transparent hover:text-primary-foreground shadow-sm hover:shadow-[0_4px_14px_0] hover:shadow-primary/30 before:absolute before:inset-0 before:bg-primary before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out before:origin-left active:before:scale-x-100",
        ghost:
          "bg-transparent hover:bg-accent/15 active:bg-accent/25 text-foreground shadow-sm hover:shadow-md transition-colors",
        glass:
          "glass backdrop-blur-2xl border-2 border-border/30 hover:border-primary/40 shadow-[0_8px_32px_0] shadow-black/10 hover:shadow-[0_12px_48px_0] hover:shadow-primary/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
      },
      size: {
        sm: "h-9 px-4 text-sm gap-2 min-w-[4rem] rounded-xl",
        md: "h-11 px-6 text-base gap-2.5 min-w-[5rem] rounded-xl",
        lg: "h-13 px-8 text-lg gap-3 min-w-[6rem] rounded-2xl",
        xl: "h-16 px-10 text-xl gap-3.5 min-w-[7rem] rounded-2xl",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export const shimmerVariants = cva("", {
  variants: {
    variant: {
      primary:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      secondary:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      accent:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      info: "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      success:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      warning:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      error:
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
      outline: "",
      ghost: "",
      glass: "",
    },
  },
  defaultVariants: { variant: "primary" },
});
