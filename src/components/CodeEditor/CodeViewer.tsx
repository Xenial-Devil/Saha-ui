"use client";

// src/components/code-editor/CodeViewer.tsx
import { CodeEditor, type CodeEditorProps } from "./CodeEditor";

type ViewerProps = Omit<CodeEditorProps, "readOnly"> & {
  status?: boolean; // alias for showStatusBar
  copy?: boolean; // show only a copy button
};

export function CodeViewer({
  status,
  copy,
  showToolbar, // ok now
  showStatusBar, // ok now
  ...rest
}: ViewerProps) {
  const resolvedShowStatus =
    typeof status === "boolean" ? status : showStatusBar ?? false;
  const resolvedShowToolbar =
    typeof showToolbar === "boolean" ? showToolbar : !!copy;

  return (
    <CodeEditor
      {...rest}
      readOnly
      showStatusBar={resolvedShowStatus}
      showToolbar={resolvedShowToolbar}
      showLanguageSelect={false}
      showFormat={false}
      showFind={false}
      showWrapToggle={false}
      showCopy={!!copy}
      toolbarPlacement="floating"
    />
  );
}
