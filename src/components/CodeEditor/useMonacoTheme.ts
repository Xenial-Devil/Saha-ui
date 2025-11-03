import { useEffect, useMemo } from "react";
import { useMonaco } from "@monaco-editor/react";
import type { CodeEditorTheme } from "./CodeEditor.types";

const THEME_BASE: Record<CodeEditorTheme, "vs" | "vs-dark"> = {
  light: "vs",
  github: "vs",
  dark: "vs-dark",
  vscode: "vs-dark",
  monokai: "vs-dark",
  dracula: "vs-dark",
  nord: "vs-dark",
  solarized: "vs-dark",
};

const THEME_COLORS: Record<
  CodeEditorTheme,
  {
    background: string;
    foreground: string;
    lineHighlight?: string;
    selection?: string;
    inactiveSelection?: string;
    cursor?: string;
    lineNumber?: string;
    lineNumberActive?: string;
  }
> = {
  light: {
    background: "#ffffff",
    foreground: "#111827",
    lineHighlight: "#f3f4f6",
    selection: "#bfdbfe80",
    inactiveSelection: "#e5e7eb80",
    cursor: "#1f2937",
    lineNumber: "#9ca3af",
    lineNumberActive: "#374151",
  },
  github: {
    background: "#ffffff",
    foreground: "#24292e",
    lineHighlight: "#f6f8fa",
    selection: "#0366d640",
    inactiveSelection: "#d1e9ff40",
    cursor: "#24292e",
    lineNumber: "#8b949e",
    lineNumberActive: "#57606a",
  },
  dark: {
    background: "#0f172a",
    foreground: "#e5e7eb",
    lineHighlight: "#1e293b80",
    selection: "#1d4ed880",
    inactiveSelection: "#33415560",
    cursor: "#f8fafc",
    lineNumber: "#64748b",
    lineNumberActive: "#cbd5e1",
  },
  vscode: {
    background: "#1e1e1e",
    foreground: "#d4d4d4",
    lineHighlight: "#2a2d2e",
    selection: "#264f7880",
    inactiveSelection: "#3a3d4180",
    cursor: "#aeafad",
    lineNumber: "#858585",
    lineNumberActive: "#c6c6c6",
  },
  monokai: {
    background: "#272822",
    foreground: "#f8f8f2",
    lineHighlight: "#3e3d32aa",
    selection: "#49483e80",
    inactiveSelection: "#3a3a3a60",
    cursor: "#f8f8f0",
    lineNumber: "#75715e",
    lineNumberActive: "#f8f8f2",
  },
  dracula: {
    background: "#282a36",
    foreground: "#f8f8f2",
    lineHighlight: "#44475a7a",
    selection: "#6272a440",
    inactiveSelection: "#44475a60",
    cursor: "#f8f8f2",
    lineNumber: "#6272a4",
    lineNumberActive: "#f8f8f2",
  },
  nord: {
    background: "#2e3440",
    foreground: "#eceff4",
    lineHighlight: "#3b42527a",
    selection: "#88c0d040",
    inactiveSelection: "#3b425260",
    cursor: "#eceff4",
    lineNumber: "#4c566a",
    lineNumberActive: "#eceff4",
  },
  solarized: {
    background: "#002b36",
    foreground: "#93a1a1",
    lineHighlight: "#0736427a",
    selection: "#268bd240",
    inactiveSelection: "#07364260",
    cursor: "#93a1a1",
    lineNumber: "#586e75",
    lineNumberActive: "#93a1a1",
  },
};

const registered = new Set<string>();
const getThemeName = (theme: CodeEditorTheme) => `code-theme-${theme}`;

export function useMonacoTheme(theme: CodeEditorTheme) {
  const monaco = useMonaco();

  const name = useMemo(() => getThemeName(theme), [theme]);

  useEffect(() => {
    if (!monaco) return;
    if (!registered.has(name)) {
      const base = THEME_BASE[theme];
      const c = THEME_COLORS[theme];
      monaco.editor.defineTheme(name, {
        base,
        inherit: true,
        rules: [],
        colors: {
          "editor.background": c.background,
          "editor.foreground": c.foreground,
          "editor.lineHighlightBackground": c.lineHighlight ?? c.background,
          "editor.selectionBackground": c.selection ?? "#264f7880",
          "editor.inactiveSelectionBackground":
            c.inactiveSelection ?? c.selection ?? "#3a3d4180",
          "editorCursor.foreground": c.cursor ?? c.foreground,
          "editorLineNumber.foreground": c.lineNumber ?? "#858585",
          "editorLineNumber.activeForeground":
            c.lineNumberActive ?? c.foreground,
          "minimap.background": c.background,
          "scrollbarSlider.background": "#ffffff22",
          "scrollbarSlider.hoverBackground": "#ffffff33",
          "scrollbarSlider.activeBackground": "#ffffff55",
        },
      });
      registered.add(name);
    }
    monaco.editor.setTheme(name);
  }, [monaco, name, theme]);

  return name;
}
