"use client";

// src/components/code-editor/CodeEditor.tsx
import * as React from "react";
import Editor, { OnMount, useMonaco } from "@monaco-editor/react";
import type { editor as MonacoNS } from "monaco-editor";
import { codeEditorVariants } from "./variants";
import { Toolbar } from "./Toolbar";
import { StatusBar } from "./StatusBar";
import { TabBar } from "./TabBar";
import { useMonacoTheme } from "./useMonacoTheme";
import {
  DEFAULT_LANG_OPTIONS,
  SIZE_TO_FONT,
  SIZE_TO_PADDING,
  normalizeLanguages,
  toMonacoLang,
  type LanguageOption,
} from "./constants";
import type {
  CodeEditorVariant,
  CodeEditorSize,
  CodeEditorTheme,
  LineNumbersSetting,
  CursorInfo,
  IndentInfo,
} from "./CodeEditor.types";
import { cn } from "../../lib/utils";

export type CodeEditorProps = {
  value?: string;
  defaultValue?: string;
  language?: string; // accepts aliases like "tsx", "js", "py"
  filename?: string;
  placeholder?: string;
  height?: number | string; // if omitted, fills container height via className
  className?: string;
  style?: React.CSSProperties;

  readOnly?: boolean; // editable by default

  // Monaco/basic options
  lineNumbers?: LineNumbersSetting;
  showToolbar?: boolean;
  showStatusBar?: boolean;
  showTabBar?: boolean;
  showMinimap?: boolean;
  options?: Record<string, any>;
  onChange?: (code: string) => void;
  onSave?: (code: string) => void;

  // Toolbar controls
  toolbarPlacement?: "floating" | "inline";
  languages?: readonly (string | LanguageOption)[];
  showLanguageSelect?: boolean;
  showCopy?: boolean;
  showFormat?: boolean;
  showFind?: boolean;
  showWrapToggle?: boolean;

  // CVA variants
  variant?: CodeEditorVariant;
  size?: CodeEditorSize;
  fullWidth?: boolean;
  theme?: CodeEditorTheme;
  wordWrap?: boolean;
};

export function CodeEditor({
  value,
  defaultValue = "",
  onChange,
  onSave,
  language = "typescript",
  filename = "index.ts",
  placeholder,
  height, // if undefined -> use container height
  readOnly = false,
  lineNumbers = "on",
  showToolbar = true,
  showStatusBar = true,
  showTabBar = false,
  showMinimap = true,
  options,

  toolbarPlacement = "inline",
  languages: languagesProp,
  showLanguageSelect = true,
  showCopy = true,
  showFormat = true,
  showFind = true,
  showWrapToggle = true,

  variant = "default",
  size = "default",
  fullWidth = true,
  theme = "saha-ui-dark",
  wordWrap = false,

  className,
  style,
}: CodeEditorProps) {
  const monaco = useMonaco();
  const themeName = useMonacoTheme(theme);

  const editorRef = React.useRef<MonacoNS.IStandaloneCodeEditor | null>(null);
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = typeof value === "string";
  const code = isControlled ? (value as string) : internal;

  // UI language id (can be alias like "tsx", "jsx", etc.)
  const [uiLang, setUiLang] = React.useState(language);
  // Monaco needs normalized language (tsx->typescript, jsx->javascript)
  const monacoLang = React.useMemo(() => toMonacoLang(uiLang), [uiLang]);

  const [wrap, setWrap] = React.useState<boolean>(wordWrap);
  const [cursor, setCursor] = React.useState<CursorInfo>({
    line: 1,
    column: 1,
  });
  const [selectionLen, setSelectionLen] = React.useState<number>(0);
  const [indent, setIndent] = React.useState<IndentInfo>({
    insertSpaces: true,
    tabSize: 2,
  });

  const fontSize = SIZE_TO_FONT[size];
  const padding = SIZE_TO_PADDING[size];

  const languageOptions = React.useMemo(
    () => normalizeLanguages(languagesProp ?? DEFAULT_LANG_OPTIONS),
    [languagesProp],
  );

  // Sync prop changes
  React.useEffect(() => {
    setWrap(wordWrap);
    editorRef.current?.updateOptions({ wordWrap: wordWrap ? "on" : "off" });
  }, [wordWrap]);

  React.useEffect(() => {
    editorRef.current?.updateOptions({ readOnly });
  }, [readOnly]);

  React.useEffect(() => {
    editorRef.current?.updateOptions({
      minimap: { enabled: showMinimap },
      lineNumbers,
      fontSize,
      padding,
    });
  }, [showMinimap, lineNumbers, fontSize, padding]);

  const handleMount: OnMount = (editor, m) => {
    editorRef.current = editor;

    editor.updateOptions({
      wordWrap: wrap ? "on" : "off",
      readOnly,
      minimap: { enabled: showMinimap },
      lineNumbers,
      fontSize,
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
      padding,
      smoothScrolling: true,
      renderLineHighlight: "all",
      scrollBeyondLastLine: false,
      automaticLayout: true,
      ...options,
    });

    const d1 = editor.onDidChangeCursorPosition((e) => {
      setCursor({ line: e.position.lineNumber, column: e.position.column });
    });

    const d2 = editor.onDidChangeCursorSelection((e) => {
      const len = editor.getModel()?.getValueLengthInRange(e.selection) ?? 0;
      setSelectionLen(len);
    });

    const model = editor.getModel();
    if (model) {
      setIndent({
        insertSpaces: model.getOptions().insertSpaces,
        tabSize: model.getOptions().tabSize,
      });
      // Ensure model language matches our alias mapping at mount
      if (monacoLang) {
        m.editor.setModelLanguage(model, monacoLang);
      }
    }
    const d3 = model?.onDidChangeOptions?.(() => {
      setIndent({
        insertSpaces: model.getOptions().insertSpaces,
        tabSize: model.getOptions().tabSize,
      });
    });

    // Ctrl/Cmd+S
    const d4 = editor.addCommand(m.KeyMod.CtrlCmd | m.KeyCode.KeyS, () => {
      onSave?.(editor.getValue());
    });

    return () => {
      d1.dispose();
      d2.dispose();
      d3?.dispose?.();
       
      (editor as any)._standaloneKeybindingService?.removeCommand?.(d4);
    };
  };

  const handleChange = (val?: string) => {
    const next = val ?? "";
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const doCopy = async () => {
    const editor = editorRef.current;
    if (!editor) return;
    const sel = editor.getModel()?.getValueInRange(editor.getSelection()!);
    const text = sel && sel.length > 0 ? sel : editor.getValue();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  const doFormat = async () => {
    const action = editorRef.current?.getAction("editor.action.formatDocument");
    if (action) await action.run();
  };

  const doFind = () => {
    editorRef.current?.getAction("actions.find")?.run();
  };

  const toggleWrap = () => {
    const next = !wrap;
    setWrap(next);
    editorRef.current?.updateOptions({ wordWrap: next ? "on" : "off" });
  };

  const changeLanguage = (lang: string) => {
    setUiLang(lang);
    const model = editorRef.current?.getModel();
    const mLang = toMonacoLang(lang);
    if (monaco && model) {
      monaco.editor.setModelLanguage(model, mLang);
    }
  };

  const containerClasses = cn(
    codeEditorVariants({ variant, size, fullWidth, theme }),
    className,
  );

  return (
    <div className={cn(containerClasses, "flex flex-col")} style={style}>
      <style>
        {`
          .monaco-editor .monaco-scrollable-element > .scrollbar > .slider {
            border-radius: 10px !important;
            transition: background-color 0.2s ease, width 0.2s ease, height 0.2s ease !important;
          }
          .monaco-editor .monaco-scrollable-element > .scrollbar.vertical > .slider {
            width: 10px !important;
            margin-left: 2px !important;
          }
          .monaco-editor .monaco-scrollable-element > .scrollbar.horizontal > .slider {
            height: 10px !important;
            margin-top: 2px !important;
          }
          .monaco-editor .monaco-scrollable-element > .scrollbar.vertical > .slider:hover,
          .monaco-editor .monaco-scrollable-element > .scrollbar.horizontal > .slider:hover {
            width: 14px !important;
            height: 14px !important;
          }
          .monaco-editor .monaco-scrollable-element > .scrollbar {
            background: transparent !important;
          }
        `}
      </style>
      {showTabBar && <TabBar theme={theme} filename={filename} />}

      {showToolbar && (
        <Toolbar
          theme={theme}
          size={size}
          placement={toolbarPlacement}
          language={uiLang}
          languages={languageOptions}
          showLanguageSelect={showLanguageSelect}
          showCopy={showCopy}
          showFormat={showFormat}
          showFind={showFind}
          showWrapToggle={showWrapToggle}
          onLanguageChange={changeLanguage}
          wrap={wrap}
          onToggleWrap={toggleWrap}
          onCopy={doCopy}
          onFormat={doFormat}
          onFind={doFind}
        />
      )}

      <div
        className={cn("relative flex-1 overflow-hidden")}
        style={
          height
            ? { height: typeof height === "number" ? `${height}px` : height }
            : undefined
        }
      >
        <Editor
          value={code}
          defaultValue={defaultValue}
          language={monacoLang}
          theme={themeName}
          onChange={handleChange}
          onMount={handleMount}
          options={{
            wordWrap: wrap ? "on" : "off",
            minimap: { enabled: showMinimap },
            lineNumbers,
            fontSize,
            padding,
            renderLineHighlight: "all",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            ...options,
          }}
        />

        {placeholder && (!code || code.length === 0) && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 select-none p-4 text-xs opacity-60"
          >
            {placeholder}
          </div>
        )}
      </div>

      {showStatusBar && (
        <StatusBar
          theme={theme}
          cursor={cursor}
          selectionLength={selectionLen}
          language={uiLang}
          indent={indent}
        />
      )}
    </div>
  );
}
