import * as React from "react";
import type {
  TextEditorVariant,
  TextEditorSize,
  ToolbarButtonVariant,
} from "./TextEditor.styles";

// ============================================================================
// TEXT EDITOR TYPES
// ============================================================================

export interface TextEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * The variant style of the editor
   * @default "default"
   */
  variant?: TextEditorVariant;

  /**
   * The size of the editor
   * @default "default"
   */
  size?: TextEditorSize;

  /**
   * Whether the editor takes full width
   * @default true
   */
  fullWidth?: boolean;

  /**
   * The initial HTML content
   */
  defaultValue?: string;

  /**
   * The controlled HTML content
   */
  value?: string;

  /**
   * Callback when content changes
   */
  onChange?: (html: string) => void;

  /**
   * Placeholder text when editor is empty
   */
  placeholder?: string;

  /**
   * Whether the editor is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the editor is read-only
   * @default false
   */
  readOnly?: boolean;

  /**
   * Show toolbar
   * @default true
   */
  showToolbar?: boolean;

  /**
   * Make toolbar sticky
   * @default false
   */
  stickyToolbar?: boolean;

  /**
   * Toolbar button variant
   * @default "default"
   */
  toolbarVariant?: ToolbarButtonVariant;

  /**
   * Custom toolbar buttons to show
   */
  toolbarButtons?: ToolbarButton[];

  /**
   * Minimum height of editor content area
   */
  minHeight?: string;

  /**
   * Maximum height of editor content area
   */
  maxHeight?: string;

  /**
   * Auto-focus the editor on mount
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface ToolbarButton {
  /**
   * Button type/command
   */
  command: EditorCommand;

  /**
   * Icon component
   */
  icon?: React.ReactNode;

  /**
   * Button label
   */
  label?: string;

  /**
   * Tooltip text (shown on hover)
   */
  tooltip?: string;

  /**
   * Custom value for the command
   */
  value?: string;

  /**
   * Whether this is a separator
   */
  separator?: boolean;
}

export type EditorCommand =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "blockquote"
  | "code"
  | "ul"
  | "ol"
  | "link"
  | "image"
  | "alignLeft"
  | "alignCenter"
  | "alignRight"
  | "alignJustify"
  | "undo"
  | "redo"
  | "clear"
  | "hr"
  | "indent"
  | "outdent"
  | "subscript"
  | "superscript"
  | "highlight"
  | "table"
  | "codeblock";

// Re-export style types
export type { TextEditorVariant, TextEditorSize, ToolbarButtonVariant };
