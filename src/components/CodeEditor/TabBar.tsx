"use client";

import * as React from "react";
import { editorTabBarVariants, editorTabVariants } from "./variants";
import type { CodeEditorTheme } from "./CodeEditor.types";

type Props = {
  theme: CodeEditorTheme;
  filename: string;
  onClose?: () => void;
  showClose?: boolean;
};

// Modern icon components
const FileIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0 opacity-70"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function TabBar({ theme, filename, onClose, showClose = false }: Props) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  // Extract file extension for badge
  const getFileExtension = (name: string) => {
    const parts = name.split(".");
    return parts.length > 1 ? parts[parts.length - 1] : "";
  };

  const extension = getFileExtension(filename);

  return (
    <div className={editorTabBarVariants({ theme })}>
      <div className={editorTabVariants({ theme, active: true })}>
        {/* File icon */}
        <FileIcon />

        {/* Filename */}
        <span className="text-sm font-medium select-none truncate max-w-[200px]">
          {filename}
        </span>

        {/* File extension badge (optional visual enhancement) */}
        {extension && (
          <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded opacity-60 bg-current/10">
            {extension}
          </span>
        )}

        {/* Close button */}
        {showClose && onClose && (
          <button
            type="button"
            onClick={handleClose}
            className="ml-2 p-0.5 rounded hover:bg-current/10 transition-colors opacity-50 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-current"
            aria-label="Close file"
            title="Close file"
          >
            <CloseIcon />
          </button>
        )}

        {/* Modified indicator (could be extended for unsaved changes) */}
        {/* <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> */}
      </div>

      {/* Placeholder for additional tabs (could be extended) */}
      <div className="flex-1" />

      {/* Tab actions area (could add more tabs, split view, etc.) */}
      <div className="flex items-center gap-1 px-2">
        {/* Could add additional actions here */}
      </div>
    </div>
  );
}
