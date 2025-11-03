// src/components/code-editor/constants.ts

export const SIZE_TO_FONT = {
  sm: 12,
  default: 14,
  lg: 16,
  xl: 18,
} as const;

export const SIZE_TO_PADDING = {
  sm: { top: 6, bottom: 6 },
  default: { top: 10, bottom: 10 },
  lg: { top: 12, bottom: 12 },
  xl: { top: 14, bottom: 14 },
} as const;

export type LanguageOption = { id: string; label?: string };

// Updated full language list (with nice labels)
export const DEFAULT_LANG_OPTIONS: LanguageOption[] = [
  { id: "apex", label: "Apex" },
  { id: "azcli", label: "Azure CLI" },
  { id: "bat", label: "Batch" },
  { id: "c", label: "C" },
  { id: "clojure", label: "Clojure" },
  { id: "coffeescript", label: "CoffeeScript" },
  { id: "cpp", label: "C++" },
  { id: "csharp", label: "C#" },
  { id: "csp", label: "CSP" },
  { id: "css", label: "CSS" },
  { id: "dockerfile", label: "Dockerfile" },
  { id: "fsharp", label: "F#" },
  { id: "go", label: "Go" },
  { id: "graphql", label: "GraphQL" },
  { id: "handlebars", label: "Handlebars" },
  { id: "html", label: "HTML" },
  { id: "ini", label: "INI" },
  { id: "java", label: "Java" },
  { id: "javascript", label: "JavaScript" },
  { id: "json", label: "JSON" },
  { id: "kotlin", label: "Kotlin" },
  { id: "less", label: "Less" },
  { id: "lua", label: "Lua" },
  { id: "markdown", label: "Markdown" },
  { id: "msdax", label: "MSDAX" },
  { id: "mysql", label: "MySQL" },
  { id: "objective-c", label: "Objective-C" },
  { id: "pascal", label: "Pascal" },
  { id: "perl", label: "Perl" },
  { id: "pgsql", label: "PostgreSQL" },
  { id: "php", label: "PHP" },
  { id: "plaintext", label: "Plain Text" },
  { id: "postiats", label: "ATS Postiats" },
  { id: "powerquery", label: "Power Query" },
  { id: "powershell", label: "PowerShell" },
  { id: "pug", label: "Pug" },
  { id: "python", label: "Python" },
  { id: "r", label: "R" },
  { id: "razor", label: "Razor" },
  { id: "redis", label: "Redis" },
  { id: "redshift", label: "Redshift SQL" },
  { id: "ruby", label: "Ruby" },
  { id: "rust", label: "Rust" },
  { id: "sb", label: "Small Basic" },
  { id: "scheme", label: "Scheme" },
  { id: "scss", label: "SCSS" },
  { id: "shell", label: "Shell" },
  { id: "sol", label: "Solidity" },
  { id: "sql", label: "SQL" },
  { id: "st", label: "Structured Text" },
  { id: "swift", label: "Swift" },
  { id: "tcl", label: "Tcl" },
  { id: "typescript", label: "TypeScript" },
  { id: "vb", label: "VB" },
  { id: "xml", label: "XML" },
  { id: "yaml", label: "YAML" },
];

export function toMonacoLang(id: string): string {
  const key = id?.toLowerCase();

  // Map TSX/JSX to their base languages
  if (key === "tsx") return "typescript";
  if (key === "jsx") return "javascript";

  const found = DEFAULT_LANG_OPTIONS.find((opt) => opt.id === key);
  return found?.id ?? id;
}

export function normalizeLanguages(
  langs: readonly (string | LanguageOption)[]
): LanguageOption[] {
  return langs.map((l) =>
    typeof l === "string"
      ? { id: l, label: l.toUpperCase() }
      : { id: l.id, label: l.label ?? l.id.toUpperCase() }
  );
}
