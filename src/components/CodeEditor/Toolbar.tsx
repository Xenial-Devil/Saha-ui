"use client";

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

// Modern icon components using SVG
const CopyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const FormatIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const WrapIcon = ({ enabled }: { enabled: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {enabled ? (
      <>
        <polyline points="17 11 21 7 17 3" />
        <line x1="21" y1="7" x2="9" y2="7" />
        <polyline points="7 21 3 17 7 13" />
        <line x1="3" y1="17" x2="15" y2="17" />
      </>
    ) : (
      <>
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </>
    )}
  </svg>
);

const CodeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block mr-1.5"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const Toolbar = React.memo(function Toolbar({
  theme,
  size,
  placement = "inline",
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
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={editorToolbarVariants({ theme, size, placement })}>
      {/* Language selector with icon */}
      {showLanguageSelect && (
        <div className="flex items-center gap-1.5">
          <CodeIcon />
          <select
            className={editorSelectVariants({ theme, size })}
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            aria-label="Select programming language"
          >
            {languages.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label ?? l.id}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Divider */}
      {showLanguageSelect && (showCopy || showFormat || showFind) && (
        <div className="h-4 w-px bg-border/50" />
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-0.5">
        {showCopy && (
          <button
            type="button"
            className={editorIconButtonVariants({ size })}
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy code"}
            aria-label={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-success"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <CopyIcon />
            )}
          </button>
        )}

        {showFormat && (
          <button
            type="button"
            className={editorIconButtonVariants({ size })}
            onClick={onFormat}
            title="Format code (Shift+Alt+F)"
            aria-label="Format code"
          >
            <FormatIcon />
          </button>
        )}

        {showFind && (
          <button
            type="button"
            className={editorIconButtonVariants({ size })}
            onClick={onFind}
            title="Find in code (Ctrl+F)"
            aria-label="Find in code"
          >
            <SearchIcon />
          </button>
        )}
      </div>

      {/* Word wrap toggle */}
      {showWrapToggle && (
        <>
          <div className="h-4 w-px bg-border/50" />
          <button
            type="button"
            className={editorActionVariants({
              theme,
              size,
              variant: "ghost",
              intent: wrap ? "primary" : "neutral",
            })}
            onClick={onToggleWrap}
            aria-pressed={wrap}
            aria-label={wrap ? "Disable word wrap" : "Enable word wrap"}
            title={wrap ? "Disable word wrap" : "Enable word wrap"}
          >
            <WrapIcon enabled={wrap} />
            <span className="ml-1.5 font-medium">
              {wrap ? "Wrap" : "No Wrap"}
            </span>
          </button>
        </>
      )}
    </div>
  );
});
