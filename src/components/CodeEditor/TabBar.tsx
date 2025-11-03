import { editorTabBarVariants, editorTabVariants } from "./variants";
import type { CodeEditorTheme } from "./CodeEditor.types";

type Props = {
  theme: CodeEditorTheme;
  filename: string;
};

export function TabBar({ theme, filename }: Props) {
  return (
    <div className={editorTabBarVariants({ theme })}>
      <div className={editorTabVariants({ theme, active: true })}>
        <span>{filename}</span>
      </div>
    </div>
  );
}
