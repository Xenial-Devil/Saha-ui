import React, { useCallback, useEffect, useRef, useState } from "react";
import cx from "clsx";
import {
  codeEditorVariants,
  editorGutterVariants,
  editorContentVariants,
  editorStatusBarVariants,
} from "./CodeEditor.styles";
import type { CodeEditorProps } from "./CodeEditor.types";

// Comprehensive syntax highlighter for multiple languages
const escapeHtml = (unsafe = "") =>
  unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// Language-specific keyword sets
const KEYWORDS = {
  javascript: [
    "const",
    "let",
    "var",
    "function",
    "if",
    "else",
    "return",
    "for",
    "while",
    "do",
    "switch",
    "case",
    "break",
    "continue",
    "new",
    "class",
    "extends",
    "import",
    "from",
    "export",
    "default",
    "async",
    "await",
    "try",
    "catch",
    "throw",
    "finally",
    "typeof",
    "instanceof",
    "delete",
    "in",
    "of",
    "with",
    "yield",
    "static",
    "super",
    "this",
  ],
  typescript: [
    "const",
    "let",
    "var",
    "function",
    "if",
    "else",
    "return",
    "for",
    "while",
    "do",
    "switch",
    "case",
    "break",
    "continue",
    "new",
    "class",
    "extends",
    "import",
    "from",
    "export",
    "default",
    "async",
    "await",
    "try",
    "catch",
    "throw",
    "finally",
    "typeof",
    "instanceof",
    "delete",
    "in",
    "of",
    "with",
    "yield",
    "static",
    "super",
    "this",
    "interface",
    "type",
    "enum",
    "namespace",
    "module",
    "declare",
    "public",
    "private",
    "protected",
    "readonly",
    "abstract",
    "implements",
    "as",
    "is",
  ],
  python: [
    "def",
    "class",
    "if",
    "elif",
    "else",
    "for",
    "while",
    "return",
    "import",
    "from",
    "as",
    "try",
    "except",
    "finally",
    "raise",
    "with",
    "pass",
    "break",
    "continue",
    "lambda",
    "yield",
    "global",
    "nonlocal",
    "assert",
    "del",
    "and",
    "or",
    "not",
    "in",
    "is",
  ],
  java: [
    "public",
    "private",
    "protected",
    "class",
    "interface",
    "extends",
    "implements",
    "new",
    "if",
    "else",
    "for",
    "while",
    "do",
    "switch",
    "case",
    "break",
    "continue",
    "return",
    "try",
    "catch",
    "finally",
    "throw",
    "throws",
    "static",
    "final",
    "abstract",
    "synchronized",
    "volatile",
    "transient",
    "native",
    "strictfp",
    "this",
    "super",
    "package",
    "import",
  ],
  csharp: [
    "public",
    "private",
    "protected",
    "internal",
    "class",
    "struct",
    "interface",
    "enum",
    "namespace",
    "using",
    "new",
    "if",
    "else",
    "for",
    "foreach",
    "while",
    "do",
    "switch",
    "case",
    "break",
    "continue",
    "return",
    "try",
    "catch",
    "finally",
    "throw",
    "static",
    "readonly",
    "const",
    "virtual",
    "override",
    "abstract",
    "sealed",
    "async",
    "await",
    "this",
    "base",
    "ref",
    "out",
    "in",
    "var",
  ],
  cpp: [
    "auto",
    "class",
    "struct",
    "enum",
    "namespace",
    "using",
    "template",
    "typename",
    "public",
    "private",
    "protected",
    "if",
    "else",
    "for",
    "while",
    "do",
    "switch",
    "case",
    "break",
    "continue",
    "return",
    "try",
    "catch",
    "throw",
    "new",
    "delete",
    "const",
    "static",
    "virtual",
    "override",
    "inline",
    "explicit",
    "friend",
    "this",
    "nullptr",
  ],
  go: [
    "package",
    "import",
    "func",
    "var",
    "const",
    "type",
    "struct",
    "interface",
    "if",
    "else",
    "for",
    "range",
    "switch",
    "case",
    "break",
    "continue",
    "return",
    "go",
    "defer",
    "select",
    "chan",
    "map",
    "make",
    "new",
    "len",
    "cap",
    "append",
    "copy",
    "delete",
  ],
  rust: [
    "fn",
    "let",
    "mut",
    "const",
    "static",
    "if",
    "else",
    "match",
    "loop",
    "while",
    "for",
    "in",
    "return",
    "break",
    "continue",
    "struct",
    "enum",
    "trait",
    "impl",
    "type",
    "mod",
    "use",
    "pub",
    "crate",
    "self",
    "super",
    "async",
    "await",
    "move",
    "ref",
    "where",
  ],
  swift: [
    "func",
    "var",
    "let",
    "class",
    "struct",
    "enum",
    "protocol",
    "extension",
    "if",
    "else",
    "guard",
    "switch",
    "case",
    "for",
    "in",
    "while",
    "repeat",
    "return",
    "break",
    "continue",
    "import",
    "public",
    "private",
    "fileprivate",
    "internal",
    "static",
    "lazy",
    "mutating",
    "self",
    "super",
    "init",
    "deinit",
  ],
  kotlin: [
    "fun",
    "val",
    "var",
    "class",
    "interface",
    "object",
    "companion",
    "if",
    "else",
    "when",
    "for",
    "while",
    "do",
    "return",
    "break",
    "continue",
    "try",
    "catch",
    "finally",
    "throw",
    "import",
    "package",
    "public",
    "private",
    "protected",
    "internal",
    "abstract",
    "open",
    "override",
    "suspend",
    "this",
    "super",
  ],
  ruby: [
    "def",
    "class",
    "module",
    "if",
    "elsif",
    "else",
    "unless",
    "case",
    "when",
    "for",
    "while",
    "until",
    "do",
    "end",
    "return",
    "break",
    "next",
    "redo",
    "retry",
    "rescue",
    "ensure",
    "raise",
    "yield",
    "self",
    "super",
    "begin",
    "and",
    "or",
    "not",
    "in",
  ],
  php: [
    "function",
    "class",
    "interface",
    "trait",
    "namespace",
    "use",
    "if",
    "else",
    "elseif",
    "switch",
    "case",
    "for",
    "foreach",
    "while",
    "do",
    "return",
    "break",
    "continue",
    "try",
    "catch",
    "finally",
    "throw",
    "new",
    "public",
    "private",
    "protected",
    "static",
    "abstract",
    "final",
    "this",
    "self",
    "parent",
    "echo",
    "print",
    "require",
    "include",
  ],
  dart: [
    "void",
    "var",
    "final",
    "const",
    "class",
    "abstract",
    "interface",
    "enum",
    "if",
    "else",
    "switch",
    "case",
    "for",
    "in",
    "while",
    "do",
    "return",
    "break",
    "continue",
    "try",
    "catch",
    "finally",
    "throw",
    "async",
    "await",
    "sync",
    "yield",
    "this",
    "super",
    "new",
    "factory",
    "static",
    "extends",
    "implements",
    "with",
  ],
  r: [
    "function",
    "if",
    "else",
    "for",
    "while",
    "repeat",
    "break",
    "next",
    "return",
    "in",
    "TRUE",
    "FALSE",
    "NULL",
    "NA",
    "Inf",
    "NaN",
    "library",
    "require",
    "source",
  ],
  sql: [
    "SELECT",
    "FROM",
    "WHERE",
    "INSERT",
    "UPDATE",
    "DELETE",
    "CREATE",
    "ALTER",
    "DROP",
    "TABLE",
    "INDEX",
    "VIEW",
    "JOIN",
    "INNER",
    "LEFT",
    "RIGHT",
    "OUTER",
    "ON",
    "AND",
    "OR",
    "NOT",
    "IN",
    "LIKE",
    "BETWEEN",
    "IS",
    "NULL",
    "ORDER",
    "BY",
    "GROUP",
    "HAVING",
    "LIMIT",
    "OFFSET",
    "AS",
    "DISTINCT",
    "COUNT",
    "SUM",
    "AVG",
    "MIN",
    "MAX",
  ],
  matlab: [
    "function",
    "if",
    "else",
    "elseif",
    "end",
    "for",
    "while",
    "switch",
    "case",
    "otherwise",
    "break",
    "continue",
    "return",
    "try",
    "catch",
    "classdef",
    "properties",
    "methods",
    "events",
    "global",
    "persistent",
  ],
  julia: [
    "function",
    "end",
    "if",
    "else",
    "elseif",
    "for",
    "while",
    "do",
    "begin",
    "return",
    "break",
    "continue",
    "try",
    "catch",
    "finally",
    "struct",
    "mutable",
    "abstract",
    "type",
    "module",
    "using",
    "import",
    "export",
    "const",
    "global",
    "local",
    "let",
    "macro",
  ],
  c: [
    "auto",
    "break",
    "case",
    "char",
    "const",
    "continue",
    "default",
    "do",
    "double",
    "else",
    "enum",
    "extern",
    "float",
    "for",
    "goto",
    "if",
    "int",
    "long",
    "register",
    "return",
    "short",
    "signed",
    "sizeof",
    "static",
    "struct",
    "switch",
    "typedef",
    "union",
    "unsigned",
    "void",
    "volatile",
    "while",
  ],
  haskell: [
    "module",
    "import",
    "where",
    "let",
    "in",
    "case",
    "of",
    "if",
    "then",
    "else",
    "data",
    "type",
    "newtype",
    "class",
    "instance",
    "deriving",
    "do",
  ],
  erlang: [
    "after",
    "and",
    "andalso",
    "band",
    "begin",
    "bnot",
    "bor",
    "bsl",
    "bsr",
    "bxor",
    "case",
    "catch",
    "cond",
    "div",
    "end",
    "fun",
    "if",
    "let",
    "not",
    "of",
    "or",
    "orelse",
    "receive",
    "rem",
    "try",
    "when",
    "xor",
  ],
  lisp: [
    "defun",
    "defmacro",
    "defvar",
    "defparameter",
    "let",
    "let*",
    "lambda",
    "if",
    "cond",
    "case",
    "when",
    "unless",
    "loop",
    "do",
    "dotimes",
    "dolist",
    "progn",
    "setq",
    "quote",
    "function",
  ],
  perl: [
    "my",
    "our",
    "local",
    "sub",
    "if",
    "elsif",
    "else",
    "unless",
    "while",
    "until",
    "for",
    "foreach",
    "do",
    "next",
    "last",
    "redo",
    "return",
    "package",
    "use",
    "require",
    "new",
  ],
  scala: [
    "def",
    "val",
    "var",
    "class",
    "object",
    "trait",
    "case",
    "if",
    "else",
    "match",
    "for",
    "while",
    "do",
    "yield",
    "return",
    "try",
    "catch",
    "finally",
    "throw",
    "new",
    "this",
    "super",
    "extends",
    "with",
    "type",
    "import",
    "package",
    "private",
    "protected",
    "override",
    "abstract",
    "sealed",
    "implicit",
    "lazy",
  ],
  cobol: [
    "ACCEPT",
    "ADD",
    "CALL",
    "COMPUTE",
    "CONTINUE",
    "DISPLAY",
    "DIVIDE",
    "ELSE",
    "END",
    "EVALUATE",
    "IF",
    "MOVE",
    "MULTIPLY",
    "PERFORM",
    "READ",
    "STOP",
    "SUBTRACT",
    "WHEN",
    "WRITE",
  ],
  ada: [
    "abort",
    "abs",
    "abstract",
    "accept",
    "access",
    "aliased",
    "all",
    "and",
    "array",
    "at",
    "begin",
    "body",
    "case",
    "constant",
    "declare",
    "delay",
    "delta",
    "digits",
    "do",
    "else",
    "elsif",
    "end",
    "entry",
    "exception",
    "exit",
    "for",
    "function",
    "generic",
    "goto",
    "if",
    "in",
    "interface",
    "is",
    "limited",
    "loop",
    "mod",
    "new",
    "not",
    "null",
    "of",
    "or",
    "others",
    "out",
    "overriding",
    "package",
    "pragma",
    "private",
    "procedure",
    "protected",
    "raise",
    "range",
    "record",
    "rem",
    "renames",
    "requeue",
    "return",
    "reverse",
    "select",
    "separate",
    "some",
    "subtype",
    "synchronized",
    "tagged",
    "task",
    "terminate",
    "then",
    "type",
    "until",
    "use",
    "when",
    "while",
    "with",
    "xor",
  ],
};

const TYPES = {
  javascript: ["true", "false", "null", "undefined", "NaN", "Infinity"],
  typescript: [
    "string",
    "number",
    "boolean",
    "any",
    "void",
    "unknown",
    "never",
    "bigint",
    "symbol",
    "object",
    "true",
    "false",
    "null",
    "undefined",
  ],
  python: [
    "True",
    "False",
    "None",
    "int",
    "float",
    "str",
    "list",
    "dict",
    "tuple",
    "set",
    "bool",
  ],
  java: [
    "boolean",
    "byte",
    "char",
    "short",
    "int",
    "long",
    "float",
    "double",
    "void",
    "true",
    "false",
    "null",
    "String",
    "Integer",
    "Boolean",
    "Double",
    "Float",
    "Long",
    "Character",
    "Byte",
    "Short",
  ],
  csharp: [
    "bool",
    "byte",
    "sbyte",
    "char",
    "decimal",
    "double",
    "float",
    "int",
    "uint",
    "long",
    "ulong",
    "short",
    "ushort",
    "object",
    "string",
    "void",
    "true",
    "false",
    "null",
  ],
  cpp: [
    "bool",
    "char",
    "short",
    "int",
    "long",
    "float",
    "double",
    "void",
    "true",
    "false",
    "nullptr",
    "wchar_t",
    "char16_t",
    "char32_t",
  ],
  go: [
    "bool",
    "byte",
    "rune",
    "int",
    "int8",
    "int16",
    "int32",
    "int64",
    "uint",
    "uint8",
    "uint16",
    "uint32",
    "uint64",
    "float32",
    "float64",
    "complex64",
    "complex128",
    "string",
    "true",
    "false",
    "nil",
  ],
  rust: [
    "bool",
    "char",
    "i8",
    "i16",
    "i32",
    "i64",
    "i128",
    "u8",
    "u16",
    "u32",
    "u64",
    "u128",
    "f32",
    "f64",
    "isize",
    "usize",
    "str",
    "String",
    "true",
    "false",
    "Some",
    "None",
    "Ok",
    "Err",
  ],
  swift: [
    "Int",
    "Double",
    "Float",
    "Bool",
    "String",
    "Character",
    "true",
    "false",
    "nil",
  ],
  kotlin: [
    "Boolean",
    "Byte",
    "Short",
    "Int",
    "Long",
    "Float",
    "Double",
    "Char",
    "String",
    "true",
    "false",
    "null",
  ],
  dart: ["bool", "int", "double", "num", "String", "true", "false", "null"],
};

// ============================================================================
// FRAMEWORK SUPPORT - React, Vue, Django, Laravel, Angular, Svelte
// ============================================================================

const REACT_HOOKS = [
  "useState",
  "useEffect",
  "useContext",
  "useReducer",
  "useCallback",
  "useMemo",
  "useRef",
  "useImperativeHandle",
  "useLayoutEffect",
  "useDebugValue",
  "useTransition",
  "useDeferredValue",
  "useId",
  "useSyncExternalStore",
];

const VUE_DIRECTIVES = [
  "v-if",
  "v-else",
  "v-else-if",
  "v-for",
  "v-show",
  "v-bind",
  "v-model",
  "v-on",
  "v-slot",
  "v-pre",
  "v-once",
  "v-memo",
  "v-cloak",
  "v-html",
  "v-text",
];

const VUE_COMPOSITION = [
  "ref",
  "reactive",
  "computed",
  "watch",
  "watchEffect",
  "onMounted",
  "onUpdated",
  "onUnmounted",
  "onBeforeMount",
  "onBeforeUpdate",
  "onBeforeUnmount",
  "provide",
  "inject",
];

const DJANGO_TAGS = [
  "autoescape",
  "block",
  "comment",
  "csrf_token",
  "cycle",
  "debug",
  "extends",
  "filter",
  "firstof",
  "for",
  "if",
  "ifchanged",
  "include",
  "load",
  "now",
  "regroup",
  "spaceless",
  "templatetag",
  "url",
  "verbatim",
  "widthratio",
  "with",
  "empty",
  "elif",
  "else",
  "endif",
  "endfor",
  "endblock",
  "endwith",
];

const DJANGO_FILTERS = [
  "add",
  "addslashes",
  "capfirst",
  "center",
  "cut",
  "date",
  "default",
  "dictsort",
  "divisibleby",
  "escape",
  "filesizeformat",
  "first",
  "floatformat",
  "get_digit",
  "join",
  "last",
  "length",
  "linebreaks",
  "linebreaksbr",
  "linenumbers",
  "ljust",
  "lower",
  "make_list",
  "phone2numeric",
  "pluralize",
  "pprint",
  "random",
  "rjust",
  "safe",
  "slice",
  "slugify",
  "stringformat",
  "striptags",
  "time",
  "timesince",
  "timeuntil",
  "title",
  "truncatechars",
  "truncatewords",
  "unordered_list",
  "upper",
  "urlencode",
  "urlize",
  "wordcount",
  "wordwrap",
  "yesno",
];

const LARAVEL_DIRECTIVES = [
  "@if",
  "@elseif",
  "@else",
  "@endif",
  "@unless",
  "@endunless",
  "@isset",
  "@endisset",
  "@empty",
  "@endempty",
  "@auth",
  "@endauth",
  "@guest",
  "@endguest",
  "@production",
  "@endproduction",
  "@env",
  "@endenv",
  "@switch",
  "@case",
  "@break",
  "@default",
  "@endswitch",
  "@for",
  "@endfor",
  "@foreach",
  "@endforeach",
  "@forelse",
  "@empty",
  "@endforelse",
  "@while",
  "@endwhile",
  "@continue",
  "@break",
  "@each",
  "@once",
  "@endonce",
  "@push",
  "@endpush",
  "@prepend",
  "@endprepend",
  "@stack",
  "@inject",
  "@yield",
  "@section",
  "@endsection",
  "@show",
  "@parent",
  "@extends",
  "@include",
  "@includeIf",
  "@includeWhen",
  "@includeUnless",
  "@includeFirst",
  "@component",
  "@endcomponent",
  "@slot",
  "@endslot",
  "@componentFirst",
  "@props",
  "@aware",
  "@csrf",
  "@method",
  "@error",
  "@enderror",
  "@json",
  "@can",
  "@endcan",
  "@cannot",
  "@endcannot",
  "@canany",
  "@endcanany",
  "@php",
  "@endphp",
  "@verbatim",
  "@endverbatim",
  "@lang",
  "@endlang",
  "@choice",
];

function highlightGeneric(code: string, lang: string) {
  let out = escapeHtml(code);

  // Comments (single line and multi-line)
  out = out.replace(
    /(\/\/.*?$)/gim,
    '<span class="text-slate-500 italic">$1</span>'
  );
  out = out.replace(
    /(\/\*[\s\S]*?\*\/)/gim,
    '<span class="text-slate-500 italic">$1</span>'
  );
  out = out.replace(
    /(#.*?$)/gim,
    '<span class="text-slate-500 italic">$1</span>'
  ); // Python, Ruby, Perl, Shell
  out = out.replace(/(--.*)/g, '<span class="text-slate-500 italic">$1</span>'); // SQL, Ada, Haskell
  out = out.replace(
    /(;.*?$)/gim,
    '<span class="text-slate-500 italic">$1</span>'
  ); // Lisp
  out = out.replace(
    /(%.*?$)/gim,
    '<span class="text-slate-500 italic">$1</span>'
  ); // Erlang, MATLAB
  out = out.replace(
    /(\*&gt;.*?$)/gim,
    '<span class="text-slate-500 italic">$1</span>'
  ); // COBOL

  // Strings (double quotes, single quotes, backticks)
  out = out.replace(
    /("(?:[^"\\]|\\.)*")/g,
    '<span class="text-emerald-400">$1</span>'
  );
  out = out.replace(
    /('(?:[^'\\]|\\.)*')/g,
    '<span class="text-emerald-400">$1</span>'
  );
  out = out.replace(
    /(`(?:[^`\\]|\\.)*`)/g,
    '<span class="text-emerald-400">$1</span>'
  );
  out = out.replace(
    /("""[\s\S]*?""")/g,
    '<span class="text-emerald-400">$1</span>'
  ); // Python docstrings
  out = out.replace(
    /('''[\s\S]*?''')/g,
    '<span class="text-emerald-400">$1</span>'
  );

  // Numbers (integers, floats, hex, binary, scientific notation)
  out = out.replace(
    /\b(0x[0-9a-fA-F]+|0b[01]+|0o[0-7]+)\b/g,
    '<span class="text-violet-400">$1</span>'
  );
  out = out.replace(
    /\b(\d+\.?\d*(?:[eE][+-]?\d+)?[fFdDlL]?)\b/g,
    '<span class="text-violet-400">$1</span>'
  );

  // Keywords
  const keywords = KEYWORDS[lang as keyof typeof KEYWORDS] || [];
  if (keywords.length) {
    const keywordPattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
    out = out.replace(
      keywordPattern,
      '<span class="text-sky-400 font-semibold">$1</span>'
    );
  }

  // Types and built-ins
  const types = TYPES[lang as keyof typeof TYPES] || [];
  if (types.length) {
    const typePattern = new RegExp(`\\b(${types.join("|")})\\b`, "g");
    out = out.replace(typePattern, '<span class="text-rose-400">$1</span>');
  }

  // Function calls
  out = out.replace(
    /\b([a-zA-Z_]\w*)\s*\(/g,
    '<span class="text-yellow-300">$1</span>('
  );

  // Decorators/Annotations
  out = out.replace(
    /@([a-zA-Z_]\w*)/g,
    '<span class="text-pink-400">@$1</span>'
  );

  return out;
}

// ============================================================================
// FRAMEWORK-SPECIFIC HIGHLIGHTING
// ============================================================================

function highlightReact(code: string, isTypescript = false) {
  let out = highlightGeneric(code, isTypescript ? "typescript" : "javascript");

  // React Hooks
  const hooksPattern = new RegExp(`\\b(${REACT_HOOKS.join("|")})\\b`, "g");
  out = out.replace(hooksPattern, '<span class="text-fuchsia-400">$1</span>');

  // JSX Custom Component tags (PascalCase) - <MyComponent>, <UserButton>, etc.
  out = out.replace(
    /(&lt;\/?)([A-Z][a-zA-Z0-9_]*)/g,
    '$1<span class="text-cyan-300 font-semibold">$2</span>'
  );

  // JSX Standard HTML tags (lowercase)
  out = out.replace(
    /(&lt;\/?)([a-z][a-z0-9]*(?:-[a-z0-9]+)*)(?=[\s&>])/g,
    '$1<span class="text-blue-400">$2</span>'
  );

  // JSX Props and attributes
  out = out.replace(
    /\s([a-zA-Z][a-zA-Z0-9_-]*)=/g,
    ' <span class="text-amber-300">$1</span>='
  );

  // JSX Spread operator {...props}
  out = out.replace(
    /\{\.\.\.([a-zA-Z_]\w*)\}/g,
    '{<span class="text-orange-400">...$1</span>}'
  );

  // JSX Expressions in curly braces {value}
  out = out.replace(
    /\{([a-zA-Z_]\w*)\}/g,
    '{<span class="text-purple-300">$1</span>}'
  );

  // React Fragment shorthand <>
  out = out.replace(
    /(&lt;&gt;|&lt;\/&gt;)/g,
    '<span class="text-cyan-400 font-semibold">$1</span>'
  );

  return out;
}

function highlightVue(code: string) {
  let out = escapeHtml(code);

  // Vue directives (v-if, v-for, v-model, etc.)
  const directivePattern = new RegExp(`(${VUE_DIRECTIVES.join("|")})`, "g");
  out = out.replace(
    directivePattern,
    '<span class="text-emerald-400 font-semibold">$1</span>'
  );

  // Vue Composition API functions
  const compositionPattern = new RegExp(
    `\\b(${VUE_COMPOSITION.join("|")})\\b`,
    "g"
  );
  out = out.replace(
    compositionPattern,
    '<span class="text-fuchsia-400">$1</span>'
  );

  // Mustache syntax {{ expression }}
  out = out.replace(
    /(\{\{[\s\S]*?\}\})/g,
    '<span class="text-yellow-300">$1</span>'
  );

  // Template tags
  out = out.replace(
    /(&lt;template&gt;|&lt;\/template&gt;|&lt;script&gt;|&lt;\/script&gt;|&lt;style&gt;|&lt;\/style&gt;)/g,
    '<span class="text-fuchsia-400 font-semibold">$1</span>'
  );

  // Custom Vue components (PascalCase) - <MyComponent>, <UserCard>, etc.
  out = out.replace(
    /(&lt;\/?)([A-Z][a-zA-Z0-9_]*)/g,
    '$1<span class="text-cyan-300 font-semibold">$2</span>'
  );

  // Custom Vue components (kebab-case) - <my-component>, <user-card>, etc.
  out = out.replace(
    /(&lt;\/?)([a-z]+-[a-z0-9-]+)/g,
    '$1<span class="text-teal-400 font-semibold">$2</span>'
  );

  // Standard HTML tags
  out = out.replace(
    /(&lt;\/?)([a-z]+)(?=[\s&>])/g,
    '$1<span class="text-blue-400">$1</span>'
  );

  // Attributes and props
  out = out.replace(
    /\s([a-zA-Z:@][a-zA-Z0-9:@.-]*)=/g,
    ' <span class="text-amber-300">$1</span>='
  );

  // Strings
  out = out.replace(
    /("(?:[^"\\]|\\.)*")/g,
    '<span class="text-emerald-400">$1</span>'
  );
  out = out.replace(
    /('(?:[^'\\]|\\.)*')/g,
    '<span class="text-emerald-400">$1</span>'
  );

  return out;
}

function highlightDjango(code: string) {
  let out = escapeHtml(code);

  // Django template tags {% tag %}
  const tagPattern = new RegExp(`\\{%\\s*(${DJANGO_TAGS.join("|")})`, "g");
  out = out.replace(
    tagPattern,
    '{%<span class="text-fuchsia-400 font-semibold"> $1</span>'
  );
  out = out.replace(/(\{%|\%\})/g, '<span class="text-pink-400">$1</span>');

  // Django variables {{ var }}
  out = out.replace(
    /(\{\{[\s\S]*?\}\})/g,
    '<span class="text-yellow-300">$1</span>'
  );

  // Django filters |filter
  const filterPattern = new RegExp(`\\|(${DJANGO_FILTERS.join("|")})`, "g");
  out = out.replace(filterPattern, '|<span class="text-cyan-400">$1</span>');

  // Custom Django components/includes (PascalCase or kebab-case)
  out = out.replace(
    /(&lt;\/?)([A-Z][a-zA-Z0-9_]*|[a-z]+-[a-z0-9-]+)/g,
    '$1<span class="text-teal-400 font-semibold">$2</span>'
  );

  // Standard HTML tags
  out = out.replace(
    /(&lt;\/?[a-z]+)([^&]*?)(&gt;)/gim,
    '<span class="text-orange-400">$1</span><span class="text-amber-300">$2</span><span class="text-orange-300">$3</span>'
  );

  // Strings
  out = out.replace(
    /("(?:[^"\\]|\\.)*")/g,
    '<span class="text-emerald-400">$1</span>'
  );
  out = out.replace(
    /('(?:[^'\\]|\\.)*')/g,
    '<span class="text-emerald-400">$1</span>'
  );

  return out;
}

function highlightLaravel(code: string) {
  let out = escapeHtml(code);

  // Laravel Blade directives
  const directivePattern = new RegExp(`(${LARAVEL_DIRECTIVES.join("|")})`, "g");
  out = out.replace(
    directivePattern,
    '<span class="text-fuchsia-400 font-semibold">$1</span>'
  );

  // Blade {{ }} and {!! !!}
  out = out.replace(
    /(\{\{[\s\S]*?\}\})/g,
    '<span class="text-yellow-300">$1</span>'
  );
  out = out.replace(
    /(\{!![\s\S]*?!!\})/g,
    '<span class="text-orange-400">$1</span>'
  );

  // Blade comments {{-- --}}
  out = out.replace(
    /(\{\{--[\s\S]*?--\}\})/g,
    '<span class="text-slate-500 italic">$1</span>'
  );

  // Blade components <x-component-name>
  out = out.replace(
    /(&lt;\/?)x-([a-z][a-z0-9._-]*)/g,
    '$1<span class="text-cyan-400 font-semibold">x-$2</span>'
  );

  // Custom Laravel components (PascalCase)
  out = out.replace(
    /(&lt;\/?)([A-Z][a-zA-Z0-9_]*)/g,
    '$1<span class="text-teal-400 font-semibold">$2</span>'
  );

  // Standard HTML tags
  out = out.replace(
    /(&lt;\/?[a-z]+)([^&]*?)(&gt;)/gim,
    '<span class="text-orange-400">$1</span><span class="text-amber-300">$2</span><span class="text-orange-300">$3</span>'
  );

  // Strings
  out = out.replace(
    /("(?:[^"\\]|\\.)*")/g,
    '<span class="text-emerald-400">$1</span>'
  );
  out = out.replace(
    /('(?:[^'\\]|\\.)*')/g,
    '<span class="text-emerald-400">$1</span>'
  );

  return out;
}

function highlightHTML(code: string) {
  let out = escapeHtml(code);
  // HTML comments
  out = out.replace(
    /(&lt;!--[\s\S]*?--&gt;)/gim,
    '<span class="text-slate-500 italic">$1</span>'
  );
  // Tags and attributes
  out = out.replace(
    /(&lt;\/?[a-zA-Z0-9-]+)([^&]*?)(&gt;)/gim,
    '<span class="text-fuchsia-400">$1</span><span class="text-amber-300">$2</span><span class="text-fuchsia-300">$3</span>'
  );
  return out;
}

function highlightCSS(code: string) {
  let out = escapeHtml(code);
  // Comments
  out = out.replace(
    /(\/\*[\s\S]*?\*\/)/gim,
    '<span class="text-slate-500 italic">$1</span>'
  );
  // Selectors
  out = out.replace(
    /(^[^{\n]+)(?=\{)/gm,
    '<span class="text-amber-300">$1</span>'
  );
  // Properties
  out = out.replace(
    /([a-z-]+)(\s*:\s*)([^;\n]+)/gim,
    '<span class="text-sky-300">$1</span>$2<span class="text-emerald-300">$3</span>'
  );
  return out;
}

function highlightSQL(code: string) {
  let out = escapeHtml(code);
  // Comments
  out = out.replace(/(--.*)/g, '<span class="text-slate-500 italic">$1</span>');
  out = out.replace(
    /(\/\*[\s\S]*?\*\/)/gim,
    '<span class="text-slate-500 italic">$1</span>'
  );
  // Keywords (case insensitive)
  const keywords = KEYWORDS.sql;
  const keywordPattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  out = out.replace(
    keywordPattern,
    '<span class="text-sky-400 font-semibold">$1</span>'
  );
  // Strings
  out = out.replace(
    /('(?:[^'\\]|\\.)*')/g,
    '<span class="text-emerald-400">$1</span>'
  );
  // Numbers
  out = out.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="text-violet-400">$1</span>'
  );
  return out;
}

function highlightCode(code: string, lang?: string) {
  if (!code) return "";
  const language = (lang || "").toLowerCase();

  switch (language) {
    case "html":
    case "xml":
      return highlightHTML(code);
    case "css":
    case "scss":
    case "sass":
    case "less":
      return highlightCSS(code);
    case "sql":
      return highlightSQL(code);

    // React with JSX - ONLY when explicitly set
    case "jsx":
    case "reactjs":
      return highlightReact(code, false);
    case "tsx":
    case "reactts":
      return highlightReact(code, true);

    // Vue - ONLY when explicitly set
    case "vue":
    case "vuejs":
    case "vuets":
      return highlightVue(code);

    // Django templates - ONLY when explicitly set
    case "django":
    case "django-html":
    case "htmldjango":
      return highlightDjango(code);

    // Laravel Blade templates - ONLY when explicitly set
    case "blade":
    case "laravel":
    case "blade.php":
      return highlightLaravel(code);

    // Angular - similar to Vue
    case "angular":
    case "angular-html":
      return highlightVue(code); // Reuse Vue highlighter for now

    // Svelte
    case "svelte":
      return highlightVue(code); // Reuse Vue highlighter for now

    // Regular JavaScript/TypeScript - NO framework highlighting
    case "javascript":
    case "js":
      return highlightGeneric(code, "javascript");
    case "typescript":
    case "ts":
      return highlightGeneric(code, "typescript");
    case "python":
    case "py":
      return highlightGeneric(code, "python");
    case "java":
      return highlightGeneric(code, "java");
    case "c":
      return highlightGeneric(code, "c");
    case "cpp":
    case "c++":
    case "cc":
    case "cxx":
      return highlightGeneric(code, "cpp");
    case "csharp":
    case "cs":
    case "c#":
      return highlightGeneric(code, "csharp");
    case "go":
    case "golang":
      return highlightGeneric(code, "go");
    case "rust":
    case "rs":
      return highlightGeneric(code, "rust");
    case "swift":
      return highlightGeneric(code, "swift");
    case "kotlin":
    case "kt":
      return highlightGeneric(code, "kotlin");
    case "ruby":
    case "rb":
      return highlightGeneric(code, "ruby");
    case "php":
      return highlightGeneric(code, "php");
    case "dart":
      return highlightGeneric(code, "dart");
    case "r":
      return highlightGeneric(code, "r");
    case "matlab":
      return highlightGeneric(code, "matlab");
    case "julia":
    case "jl":
      return highlightGeneric(code, "julia");
    case "haskell":
    case "hs":
      return highlightGeneric(code, "haskell");
    case "erlang":
    case "erl":
      return highlightGeneric(code, "erlang");
    case "lisp":
    case "commonlisp":
    case "cl":
      return highlightGeneric(code, "lisp");
    case "perl":
    case "pl":
      return highlightGeneric(code, "perl");
    case "scala":
      return highlightGeneric(code, "scala");
    case "cobol":
    case "cob":
      return highlightGeneric(code, "cobol");
    case "ada":
    case "adb":
    case "ads":
      return highlightGeneric(code, "ada");
    case "assembly":
    case "asm":
      return highlightGeneric(code, "c"); // Basic highlighting
    case "bash":
    case "shell":
    case "sh":
      return highlightGeneric(code, "python"); // Similar comment style
    case "json":
    case "yaml":
    case "yml":
    case "markdown":
    case "md":
    case "plaintext":
    case "text":
    default:
      return escapeHtml(code);
  }
}

const computeLineCount = (value = "") => value.split("\n").length || 1;

// Language groups for the selector
const LANGUAGE_GROUPS = {
  "Web Frameworks": [
    { value: "reactjs", label: "React JS (JSX)" },
    { value: "reactts", label: "React TS (TSX)" },
    { value: "vuejs", label: "Vue.js" },
    { value: "vuets", label: "Vue + TypeScript" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ],
  "Backend Frameworks": [
    { value: "django", label: "Django Templates" },
    { value: "blade", label: "Laravel Blade" },
    { value: "php", label: "PHP" },
  ],
  "JavaScript/TypeScript": [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "jsx", label: "JSX" },
    { value: "tsx", label: "TSX" },
  ],
  "Markup & Styles": [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "scss", label: "SCSS" },
    { value: "json", label: "JSON" },
    { value: "markdown", label: "Markdown" },
  ],
  "Programming Languages": [
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "ruby", label: "Ruby" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "dart", label: "Dart" },
  ],
  "Database & Shell": [
    { value: "sql", label: "SQL" },
    { value: "bash", label: "Bash" },
    { value: "shell", label: "Shell" },
  ],
  Other: [
    { value: "r", label: "R" },
    { value: "matlab", label: "MATLAB" },
    { value: "julia", label: "Julia" },
    { value: "plaintext", label: "Plain Text" },
  ],
} as const;

// Get display label for language
const getLanguageLabel = (lang: string): string => {
  for (const group of Object.values(LANGUAGE_GROUPS)) {
    const found = group.find((l) => l.value === lang);
    if (found) return found.label;
  }
  return lang.toUpperCase();
};

export const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
  (
    {
      variant = "default",
      size = "default",
      theme = "dark",
      language = "javascript",
      defaultValue,
      value,
      onChange,
      onLanguageChange,
      showLanguageSelector = false,
      placeholder = "// Start coding...",
      disabled = false,
      readOnly = false,
      showLineNumbers = true,
      showGutter = true,
      highlightActiveLine = true,
      showMinimap = false,
      tabSize = 2,
      useSoftTabs = true,
      wordWrap = false,
      minHeight = "200px",
      maxHeight = "600px",
      autoFocus = false,
      onCursorChange,
      onSelectionChange,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const controlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string>(
      controlled ? (value as string) : defaultValue || ""
    );
    const [currentLanguage, setCurrentLanguage] = useState<string>(language);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
      if (controlled) setInternalValue((value as string) || "");
    }, [value, controlled]);

    useEffect(() => {
      setCurrentLanguage(language);
    }, [language]);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const highlightRef = useRef<HTMLPreElement | null>(null);
    const gutterRef = useRef<HTMLDivElement | null>(null);

    // sync scroll
    const handleScroll = () => {
      if (!textareaRef.current || !highlightRef.current) return;
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      if (gutterRef.current)
        gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    };

    useEffect(() => {
      const ta = textareaRef.current;
      if (!ta) return;
      ta.addEventListener("scroll", handleScroll);
      return () => ta.removeEventListener("scroll", handleScroll);
    }, []);

    // update highlighted content
    const updateHighlight = useCallback(() => {
      if (!highlightRef.current) return;
      highlightRef.current.innerHTML = highlightCode(
        internalValue || placeholder,
        currentLanguage
      );
    }, [internalValue, currentLanguage, placeholder]);

    useEffect(() => {
      updateHighlight();
    }, [updateHighlight]);

    // Handle language change
    const handleLanguageChange = (newLang: string) => {
      setCurrentLanguage(newLang);
      setShowDropdown(false);
      onLanguageChange?.(newLang as any);
    };

    // Tab handling and indentation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = textareaRef.current;
        if (!ta) return;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const tab = useSoftTabs ? " ".repeat(tabSize) : "\t";
        const newValue =
          internalValue.substring(0, start) +
          tab +
          internalValue.substring(end);
        if (!controlled) setInternalValue(newValue);
        onChange?.(newValue);
        // restore caret
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + tab.length;
        });
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const next = e.target.value;
      if (!controlled) setInternalValue(next);
      onChange?.(next);
    };

    // compute lines
    const lineCount = computeLineCount(internalValue || defaultValue || "");
    const lines = new Array(lineCount).fill(0).map((_, i) => i + 1);

    // cursor/selection reporting
    const handleCursor = () => {
      const ta = textareaRef.current;
      if (!ta) return;
      const upTo = ta.value.substring(0, ta.selectionStart);
      const line = upTo.split("\n").length;
      const col = upTo.split("\n").pop()?.length ?? 0;
      onCursorChange?.(line, col);
      onSelectionChange?.(
        ta.value.substring(ta.selectionStart, ta.selectionEnd)
      );
    };

    useEffect(() => {
      const ta = textareaRef.current;
      if (!ta) return;
      ta.addEventListener("keyup", handleCursor);
      ta.addEventListener("click", handleCursor);
      ta.addEventListener("select", handleCursor);
      return () => {
        ta.removeEventListener("keyup", handleCursor);
        ta.removeEventListener("click", handleCursor);
        ta.removeEventListener("select", handleCursor);
      };
    }, [onCursorChange, onSelectionChange]);

    // sync scroll initially
    useEffect(() => {
      handleScroll();
    }, [internalValue]);

    // autofocus
    useEffect(() => {
      if (autoFocus && textareaRef.current) textareaRef.current.focus();
    }, [autoFocus]);

    const wrapperClass = cx(
      codeEditorVariants({ variant, size, theme, fullWidth: true }),
      className
    );

    return (
      <div
        ref={(node) => {
          // allow ref forwarding
          (containerRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={wrapperClass}
        style={{ minHeight, maxHeight, ...style }}
        {...rest}
      >
        <div className="flex">
          {showGutter && (
            <div
              className={editorGutterVariants({ theme, size })}
              ref={gutterRef}
            >
              <div className="px-2">
                {lines.map((n) => (
                  <div key={n} className="leading-6 select-none">
                    {n}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative flex-1">
            {/* Highlighted layer */}
            <pre
              aria-hidden
              ref={highlightRef}
              className={
                editorContentVariants({ theme, size, wordWrap }) +
                " pointer-events-none absolute inset-0 p-4 whitespace-pre overflow-auto"
              }
            />

            {/* Textarea on top */}
            <textarea
              ref={textareaRef}
              value={internalValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              onClick={handleCursor}
              onKeyUp={handleCursor}
              spellCheck={false}
              placeholder={placeholder}
              readOnly={readOnly || disabled}
              disabled={disabled}
              className={
                "relative w-full bg-transparent resize-none outline-none font-mono p-4 h-full min-h-0 leading-6"
              }
              style={{
                whiteSpace: wordWrap ? "pre-wrap" : "pre",
                height: "100%",
                minHeight,
                maxHeight,
              }}
            />
          </div>
        </div>

        <div className={editorStatusBarVariants({ theme })}>
          {/* Language Selector or Display */}
          {showLanguageSelector ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-1 rounded hover:bg-white/10 transition-colors"
                disabled={disabled || readOnly}
              >
                <span className="font-semibold">
                  {getLanguageLabel(currentLanguage)}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute bottom-full left-0 mb-2 w-64 max-h-96 overflow-y-auto bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                  {Object.entries(LANGUAGE_GROUPS).map(
                    ([groupName, languages]) => (
                      <div key={groupName} className="py-2">
                        <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                          {groupName}
                        </div>
                        {languages.map((lang) => (
                          <button
                            key={lang.value}
                            onClick={() => handleLanguageChange(lang.value)}
                            className={`w-full text-left px-4 py-2 hover:bg-slate-700 transition-colors ${
                              currentLanguage === lang.value
                                ? "bg-blue-600 text-white font-semibold"
                                : "text-slate-300"
                            }`}
                          >
                            {lang.label}
                          </button>
                        ))}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="font-semibold">
              {getLanguageLabel(currentLanguage)}
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-slate-400">
              {computeLineCount(internalValue)} lines
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;
export type {
  CodeEditorProps,
  CodeEditorVariant,
  CodeEditorSize,
  CodeEditorTheme,
  CodeLanguage,
} from "./CodeEditor.types";
