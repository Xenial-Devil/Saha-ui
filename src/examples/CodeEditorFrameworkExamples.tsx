import { useState } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { CodeViewer } from "../components/CodeEditor/CodeViewer";
import Badge from "../components/Badge";

const SAMPLE_TSX: string = `import React from 'react';

export function HelloCard({ name }: { name: string }) {
  const [count, setCount] = React.useState(0);
  const inc = () => setCount((c) => c + 1);

  return (
    <section className="card">
      <MyHeader title="Hello" />
      <p>Hello, {name}! Clicks: {count}</p>
      <CustomButton onClick={inc}>Increment</CustomButton>
    </section>
  );
}
`;

const VARIANTS = [
  "default",
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
  "info",
  "outline",
  "ghost",
] as const;

const SIZES = ["sm", "default", "lg", "xl"] as const;

const THEMES = [
  "vscode",
  "dark",
  "light",
  "github",
  "monokai",
  "dracula",
  "nord",
  "solarized",
] as const;

export default function CodeEditorAllVariantsDemo() {
  const [theme, setTheme] = useState<(typeof THEMES)[number]>("vscode");

  return (
    <div className="space-y-10 p-6">
      {/* Global controls */}
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-semibold">
          CodeEditor / CodeViewer Variants
        </h2>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-slate-600 dark:text-gray-200">
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
            className="h-9 rounded-md border border-slate-300 bg-white dark:bg-gray-700 px-2 text-sm"
          >
            {THEMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1) All CVA variants (Editor + Viewer) */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">
          All variants (theme: <code>{theme}</code>, size: default)
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {VARIANTS.map((variant) => (
            <div key={variant} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{variant}</span>
                <Badge variant={variant as any}>Editor</Badge>
              </div>
              <CodeEditor
                className="h-[220px]"
                theme={theme}
                variant={variant as any}
                language="tsx"
                defaultValue={SAMPLE_TSX}
                showToolbar
                showStatusBar={false}
              />
              <div className="flex items-center gap-2">
                <span className="font-medium opacity-70">{variant}</span>
                <Badge variant={variant as any}>Viewer</Badge>
              </div>
              <CodeViewer
                className="h-[180px]"
                theme={theme}
                language="tsx"
                defaultValue={SAMPLE_TSX}
                status={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 2) Sizes matrix for Editor */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">
          Sizes (variant: default, theme: <code>{theme}</code>)
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {SIZES.map((size) => (
            <div key={size} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{size}</span>
                <Badge variant="default">Editor</Badge>
              </div>
              <CodeEditor
                className={
                  size === "sm"
                    ? "h-[180px]"
                    : size === "default"
                    ? "h-[220px]"
                    : "h-[260px]"
                }
                theme={theme}
                size={size as any}
                variant="default"
                language="tsx"
                defaultValue={SAMPLE_TSX}
                showToolbar
                showCopy
                showStatusBar
              />
            </div>
          ))}
        </div>
      </section>

      {/* 3) Themes gallery (Viewer only for quick scan) */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Themes (viewer)</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {THEMES.map((t) => (
            <div key={t} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{t}</span>
                <Badge variant="default">Viewer</Badge>
              </div>
              <CodeViewer
                className="h-[180px]"
                theme={t as any}
                language="tsx"
                defaultValue={SAMPLE_TSX}
                copy
                status={false}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
