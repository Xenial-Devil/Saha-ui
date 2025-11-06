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
  "saha-ui-light": "vs",
  "saha-ui-dark": "vs-dark",
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
    scrollbar?: string;
    scrollbarHover?: string;
    scrollbarActive?: string;
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
    scrollbar: "#e5e7eb40",
    scrollbarHover: "#d1d5db80",
    scrollbarActive: "#9ca3afcc",
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
    scrollbar: "#d0d7de40",
    scrollbarHover: "#afb8c180",
    scrollbarActive: "#8c959fcc",
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
    scrollbar: "#475569cc",
    scrollbarHover: "#64748bdd",
    scrollbarActive: "#94a3b8ff",
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
    scrollbar: "#3e3e3ecc",
    scrollbarHover: "#4d4d4ddd",
    scrollbarActive: "#5a5a5aff",
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
    scrollbar: "#49483ecc",
    scrollbarHover: "#75715edd",
    scrollbarActive: "#a59f85ff",
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
    scrollbar: "#44475acc",
    scrollbarHover: "#6272a4dd",
    scrollbarActive: "#bd93f9ff",
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
    scrollbar: "#3b4252cc",
    scrollbarHover: "#4c566add",
    scrollbarActive: "#88c0d0ff",
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
    scrollbar: "#073642cc",
    scrollbarHover: "#586e75dd",
    scrollbarActive: "#268bd2ff",
  },
  "saha-ui-light": {
    background: "#fafbfc", // --background light (oklch(0.98 0.003 200))
    foreground: "#262829", // --foreground light (oklch(0.15 0.01 200))
    lineHighlight: "#f5f6f7", // subtle highlight (oklch(0.96 0.005 200))
    selection: "#6366f140", // --primary with opacity (oklch(48.151% 0.23085 269.463 / 0.25))
    inactiveSelection: "#e5e7eb80", // --border with opacity (oklch(0.92 0.005 200 / 0.5))
    cursor: "#6366f1", // --primary (oklch(48.151% 0.23085 269.463))
    lineNumber: "#9ca3af", // muted (oklch(0.60 0.01 200))
    lineNumberActive: "#262829", // --foreground (oklch(0.15 0.01 200))
    scrollbar: "#e5e7eb40", // light scrollbar with transparency
    scrollbarHover: "#6366f160", // primary color on hover
    scrollbarActive: "#6366f1cc", // primary color when active
  },
  "saha-ui-dark": {
    background: "#141517", // --background dark (oklch(0.08 0.005 200))
    foreground: "#f1f3f4", // --foreground dark (oklch(0.95 0.005 200))
    lineHighlight: "#1e2022cc", // --card with opacity (oklch(0.12 0.01 200 / 0.8))
    selection: "#818cf84d", // --primary dark with opacity (oklch(41.145% 0.14945 272.396 / 0.3))
    inactiveSelection: "#31333580", // --border dark with opacity (oklch(0.20 0.01 200 / 0.5))
    cursor: "#818cf8", // --primary dark (oklch(41.145% 0.14945 272.396))
    lineNumber: "#6b7280", // muted (oklch(0.50 0.01 200))
    lineNumberActive: "#f1f3f4", // --foreground dark (oklch(0.95 0.005 200))
    scrollbar: "#31333580", // dark scrollbar with transparency
    scrollbarHover: "#818cf860", // primary color on hover
    scrollbarActive: "#818cf8cc", // primary color when active
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
          "scrollbarSlider.background": c.scrollbar ?? "#ffffff22",
          "scrollbarSlider.hoverBackground": c.scrollbarHover ?? "#ffffff33",
          "scrollbarSlider.activeBackground": c.scrollbarActive ?? "#ffffff55",
          "scrollbar.shadow": c.background + "99",
          "editorOverviewRuler.border": "transparent",
        },
      });
      registered.add(name);
    }
    monaco.editor.setTheme(name);
  }, [monaco, name, theme]);

  return name;
}
