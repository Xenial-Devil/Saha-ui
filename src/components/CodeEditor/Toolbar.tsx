import * as React from "react";
import {
  editorToolbarVariants,
  editorSelectVariants,
  editorIconButtonVariants,
  editorActionVariants,
} from "./variants";
import type { CodeEditorSize, CodeEditorTheme } from "./CodeEditor.types";
import type { LanguageOption } from "./constants";

type Props = {
  theme: CodeEditorTheme;
  size: CodeEditorSize;
  placement?: "floating" | "inline";
  language: string;
  languages: readonly LanguageOption[];

  showLanguageSelect?: boolean;
  showCopy?: boolean;
  showFormat?: boolean;
  showFind?: boolean;
  showWrapToggle?: boolean;

  onLanguageChange: (lang: string) => void;
  wrap: boolean;
  onToggleWrap: () => void;
  onCopy: () => void;
  onFormat: () => void;
  onFind: () => void;
};

export const Toolbar = React.memo(function Toolbar({
  theme,
  size,
  placement = "floating",
  language,
  languages,
  showLanguageSelect = true,
  showCopy = true,
  showFormat = true,
  showFind = true,
  showWrapToggle = true,
  onLanguageChange,
  wrap,
  onToggleWrap,
  onCopy,
  onFormat,
  onFind,
}: Props) {
  return (
    <div className={editorToolbarVariants({ theme, size, placement })}>
      {showLanguageSelect && (
        <select
          className={editorSelectVariants({ theme, size })}
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          aria-label="Language"
        >
          {languages.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label ?? l.id}
            </option>
          ))}
        </select>
      )}

      {showCopy && (
        <button
          type="button"
          className={editorIconButtonVariants({ size })}
          onClick={onCopy}
          title="Copy"
          aria-label="Copy"
        >
          📋
        </button>
      )}

      {showFormat && (
        <button
          type="button"
          className={editorIconButtonVariants({ size })}
          onClick={onFormat}
          title="Format"
          aria-label="Format"
        >
          ✨
        </button>
      )}

      {showFind && (
        <button
          type="button"
          className={editorIconButtonVariants({ size })}
          onClick={onFind}
          title="Find"
          aria-label="Find"
        >
          🔎
        </button>
      )}

      {showWrapToggle && (
        <button
          type="button"
          className={editorActionVariants({
            theme,
            size,
            variant: "outline",
            intent: wrap ? "primary" : "neutral",
          })}
          onClick={onToggleWrap}
          aria-pressed={wrap}
          aria-label="Toggle word wrap"
        >
          Wrap: {wrap ? "On" : "Off"}
        </button>
      )}
    </div>
  );
});
