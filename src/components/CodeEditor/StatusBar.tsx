import { editorStatusBarVariants } from "./variants";
import type {
  CodeEditorTheme,
  CursorInfo,
  IndentInfo,
} from "./CodeEditor.types";

type Props = {
  theme: CodeEditorTheme;
  cursor: CursorInfo;
  selectionLength: number;
  language: string;
  indent: IndentInfo;
};

export function StatusBar({
  theme,
  cursor,
  selectionLength,
  language,
  indent,
}: Props) {
  return (
    <div className={editorStatusBarVariants({ theme })}>
      <div className="flex items-center gap-3">
        <span>
          Ln {cursor.line}, Col {cursor.column}
        </span>
        {selectionLength > 0 && <span>{selectionLength} chars selected</span>}
      </div>
      <div className="flex items-center gap-3">
        <span>{language}</span>
        <span>
          {indent.insertSpaces ? "Spaces" : "Tabs"}:{indent.tabSize}
        </span>
      </div>
    </div>
  );
}
