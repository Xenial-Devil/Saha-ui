import * as React from "react";
import type {
  CodeEditorVariant,
  CodeEditorSize,
  CodeEditorTheme,
} from "./CodeEditor.styles";

// ============================================================================
// CODE EDITOR TYPES
// ============================================================================

export interface CodeEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * The variant style of the editor
   * @default "default"
   */
  variant?: CodeEditorVariant;

  /**
   * The size of the editor
   * @default "default"
   */
  size?: CodeEditorSize;

  /**
   * The theme of the editor
   * @default "dark"
   */
  theme?: CodeEditorTheme;

  /**
   * Programming language for syntax highlighting
   * @default "javascript"
   */
  language?: CodeLanguage;

  /**
   * Whether the editor takes full width
   * @default true
   */
  fullWidth?: boolean;

  /**
   * The initial code content
   */
  defaultValue?: string;

  /**
   * The controlled code content
   */
  value?: string;

  /**
   * Callback when content changes
   */
  onChange?: (code: string) => void;

  /**
   * Placeholder text when editor is empty
   * @default "// Start coding..."
   */
  placeholder?: string;

  /**
   * Disable editing
   * @default false
   */
  disabled?: boolean;

  /**
   * Read-only mode
   * @default false
   */
  readOnly?: boolean;

  /**
   * Show line numbers
   * @default true
   */
  showLineNumbers?: boolean;

  /**
   * Show gutter
   * @default true
   */
  showGutter?: boolean;

  /**
   * Enable line highlighting
   * @default true
   */
  highlightActiveLine?: boolean;

  /**
   * Show minimap
   * @default false
   */
  showMinimap?: boolean;

  /**
   * Tab size in spaces
   * @default 2
   */
  tabSize?: number;

  /**
   * Use soft tabs (spaces)
   * @default true
   */
  useSoftTabs?: boolean;

  /**
   * Enable word wrap
   * @default false
   */
  wordWrap?: boolean;

  /**
   * Minimum height of editor
   */
  minHeight?: string;

  /**
   * Maximum height of editor
   */
  maxHeight?: string;

  /**
   * Auto-focus the editor on mount
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Enable auto-complete
   * @default true
   */
  autoComplete?: boolean;

  /**
   * Enable bracket matching
   * @default true
   */
  matchBrackets?: boolean;

  /**
   * Show invisible characters
   * @default false
   */
  showInvisibles?: boolean;

  /**
   * Callback when cursor position changes
   */
  onCursorChange?: (line: number, column: number) => void;

  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedText: string) => void;

  /**
   * Callback when language changes (if language selector is enabled)
   */
  onLanguageChange?: (language: CodeLanguage) => void;

  /**
   * Show language selector dropdown
   * @default false
   */
  showLanguageSelector?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export type CodeLanguage =
  // JavaScript & TypeScript
  | "javascript"
  | "typescript"

  // React
  | "jsx"
  | "tsx"
  | "reactjs"
  | "reactts"

  // Vue
  | "vue"
  | "vuejs"
  | "vuets"

  // Django
  | "django"
  | "django-html"
  | "htmldjango"

  // Laravel
  | "blade"
  | "laravel"
  | "blade.php"

  // Angular
  | "angular"
  | "angular-html"

  // Svelte
  | "svelte"

  // Markup & Styles
  | "html"
  | "css"
  | "scss"
  | "json"
  | "markdown"

  // Backend Languages
  | "python"
  | "java"
  | "c"
  | "cpp"
  | "csharp"
  | "go"
  | "rust"
  | "php"
  | "ruby"
  | "swift"
  | "kotlin"
  | "dart"

  // Database & Shell
  | "sql"
  | "bash"
  | "shell"
  | "yaml"
  | "xml"

  // Scientific
  | "r"
  | "matlab"
  | "julia"

  // Other
  | "plaintext";

// Re-export style types
export type { CodeEditorVariant, CodeEditorSize, CodeEditorTheme };
