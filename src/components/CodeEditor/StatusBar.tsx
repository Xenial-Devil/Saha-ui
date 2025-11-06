"use client";

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

// Icon components
const LocationIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block opacity-60"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CodeLanguageIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block opacity-60"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IndentIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block opacity-60"
  >
    <polyline points="3 8 7 12 3 16" />
    <line x1="21" y1="12" x2="11" y2="12" />
    <line x1="21" y1="6" x2="11" y2="6" />
    <line x1="21" y1="18" x2="11" y2="18" />
  </svg>
);

const SelectIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block opacity-60"
  >
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

export function StatusBar({
  theme,
  cursor,
  selectionLength,
  language,
  indent,
}: Props) {
  return (
    <div className={editorStatusBarVariants({ theme })}>
      {/* Left section - Position info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <LocationIcon />
          <span className="font-medium">
            Ln {cursor.line}, Col {cursor.column}
          </span>
        </div>

        {selectionLength > 0 && (
          <>
            <div className="h-3 w-px bg-current opacity-20" />
            <div className="flex items-center gap-1.5">
              <SelectIcon />
              <span className="font-medium">
                {selectionLength} {selectionLength === 1 ? "char" : "chars"}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Right section - Language and indent info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <CodeLanguageIcon />
          <span className="font-medium uppercase tracking-wide">
            {language}
          </span>
        </div>

        <div className="h-3 w-px bg-current opacity-20" />

        <div className="flex items-center gap-1.5">
          <IndentIcon />
          <span className="font-medium">
            {indent.insertSpaces ? "Spaces" : "Tabs"}: {indent.tabSize}
          </span>
        </div>
      </div>
    </div>
  );
}
