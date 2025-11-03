// Adjust path if your variants live elsewhere
import type {
  CodeEditorVariant,
  CodeEditorSize,
  CodeEditorTheme,
} from "./variants";

export type { CodeEditorVariant, CodeEditorSize, CodeEditorTheme };

export type LineNumbersSetting = "on" | "off" | "relative" | "interval";

export type IndentInfo = { insertSpaces: boolean; tabSize: number };
export type CursorInfo = { line: number; column: number };
