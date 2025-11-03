// src/components/code-editor/vscodeOptions.ts
// Drop your VS Code-like JSON into VSCODE_LIKE_CONFIG below or import it from a JSON file.
// If you import JSON, ensure tsconfig "resolveJsonModule": true.

export const VSCODE_LIKE_CONFIG = {} as const;
// Paste your JSON here or import it:
// import VSCODE_LIKE_CONFIG from "./vscode-editor.json";

type AnyObj = Record<string, any>;

export function mapVsCodeConfigToMonacoOptions(cfg: AnyObj): AnyObj {
  const o: AnyObj = {};

  // 1) Direct 1:1 keys Monaco understands
  const direct = [
    "acceptSuggestionOnCommitCharacter",
    "acceptSuggestionOnEnter",
    "accessibilitySupport",
    "accessibilityPageSize",
    "ariaLabel",
    "ariaRequired",
    "autoClosingBrackets",
    "autoClosingComments",
    "autoClosingDelete",
    "autoClosingOvertype",
    "autoClosingQuotes",
    "autoIndent",
    "autoSurround",
    "codeLens",
    "codeLensFontFamily",
    "codeLensFontSize",
    "colorDecorators",
    "columnSelection",
    "contextmenu",
    "copyWithSyntaxHighlighting",
    "cursorBlinking",
    "cursorSmoothCaretAnimation",
    "cursorStyle",
    "cursorSurroundingLines",
    "cursorSurroundingLinesStyle",
    "cursorWidth",
    "disableLayerHinting",
    "disableMonospaceOptimizations",
    "domReadOnly",
    "dragAndDrop",
    "emptySelectionClipboard",
    "fastScrollSensitivity",
    "fixedOverflowWidgets",
    "folding",
    "foldingStrategy",
    "foldingHighlight",
    "foldingImportsByDefault",
    "foldingMaximumRegions",
    "unfoldOnClickAfterEndOfLine",
    "fontFamily",
    "fontLigatures",
    "fontSize",
    "fontWeight",
    "fontVariations",
    "formatOnPaste",
    "formatOnType",
    "glyphMargin",
    "hideCursorInOverviewRuler",
    "inDiffEditor",
    "letterSpacing",
    "lightbulb",
    "lineDecorationsWidth",
    "lineHeight",
    "lineNumbers",
    "lineNumbersMinChars",
    "linkedEditing",
    "links",
    "matchBrackets",
    "mouseStyle",
    "mouseWheelScrollSensitivity",
    "mouseWheelZoom",
    "multiCursorMergeOverlapping",
    "multiCursorModifier",
    "multiCursorPaste",
    "overviewRulerBorder",
    "overviewRulerLanes",
    "parameterHints",
    "peekWidgetDefaultFocus",
    "definitionLinkOpensInPeek",
    "quickSuggestions",
    "quickSuggestionsDelay",
    "renameOnType",
    "renderControlCharacters",
    "renderLineHighlight",
    "renderLineHighlightOnlyWhenFocus",
    "renderValidationDecorations",
    "renderWhitespace",
    "revealHorizontalRightPadding",
    "roundedSelection",
    "rulers",
    "scrollbar",
    "scrollBeyondLastColumn",
    "scrollBeyondLastLine",
    "scrollPredominantAxis",
    "selectionClipboard",
    "selectionHighlight",
    "selectOnLineNumbers",
    "showFoldingControls",
    "showUnused",
    "showDeprecated",
    "snippetSuggestions",
    "smoothScrolling",
    "stopRenderingLineAfter",
    "suggest",
    "suggestFontSize",
    "suggestLineHeight",
    "suggestOnTriggerCharacters",
    "suggestSelection",
    "tabCompletion",
    "tabIndex",
    "unicodeHighlight",
    "unusualLineTerminators",
    "useShadowDOM",
    "useTabStops",
    "wordBreak",
    "wordSeparators",
    "wordWrap",
    "wordWrapBreakAfterCharacters",
    "wordWrapBreakBeforeCharacters",
    "wordWrapColumn",
    "wordWrapOverride1",
    "wordWrapOverride2",
  ] as const;

  for (const k of direct) {
    if (cfg[k] !== undefined) o[k] = cfg[k];
  }

  // 2) Known nested or renamed groups

  // VS Code -> Monaco guides
  if (cfg.bracketPairGuides) {
    o.guides = {
      ...(o.guides || {}),
      bracketPairs: cfg.bracketPairGuides.bracketPairs,
      bracketPairsHorizontal: cfg.bracketPairGuides.bracketPairsHorizontal,
      highlightActiveBracketPair:
        cfg.bracketPairGuides.highlightActiveBracketPair,
      indentation: cfg.bracketPairGuides.indentation,
      // VS Code: highlightActiveIndentation -> Monaco: highlightActiveIndentGuide
      highlightActiveIndentGuide:
        cfg.bracketPairGuides.highlightActiveIndentation,
    };
  }

  // Monaco also accepts a colorization group
  if (cfg.bracketPairColorization) {
    o.bracketPairColorization = {
      enabled: !!cfg.bracketPairColorization.enabled,
      independentColorPoolPerBracketType:
        !!cfg.bracketPairColorization.independentColorPoolPerBracketType,
    };
  }

  if (cfg.comments) {
    o.comments = {
      insertSpace: cfg.comments.insertSpace,
      ignoreEmptyLines: cfg.comments.ignoreEmptyLines,
    };
  }

  if (cfg.dropIntoEditor) {
    o.dropIntoEditor = {
      enabled: cfg.dropIntoEditor.enabled,
      showDropSelector: cfg.dropIntoEditor.showDropSelector,
    };
  }

  if (cfg.stickyScroll) {
    o.stickyScroll = {
      enabled: cfg.stickyScroll.enabled,
      maxLineCount: cfg.stickyScroll.maxLineCount,
      scrollWithEditor: cfg.stickyScroll.scrollWithEditor,
    };
  }

  if (cfg.find) {
    o.find = {
      cursorMoveOnType: cfg.find.cursorMoveOnType,
      seedSearchStringFromSelection: cfg.find.seedSearchStringFromSelection,
      autoFindInSelection: cfg.find.autoFindInSelection,
      globalFindClipboard: cfg.find.globalFindClipboard,
      addExtraSpaceOnTop: cfg.find.addExtraSpaceOnTop,
      loop: cfg.find.loop,
    };
  }

  if (cfg.gotoLocation) {
    o.gotoLocation = { ...cfg.gotoLocation };
  }

  if (cfg.hover) {
    o.hover = {
      enabled: cfg.hover.enabled,
      delay: cfg.hover.delay,
      sticky: cfg.hover.sticky,
      above: cfg.hover.above,
      // Note: hidingDelay not in Monaco -> ignored
    };
  }

  if (cfg.inlayHints) {
    o.inlayHints = {
      enabled: cfg.inlayHints.enabled,
      fontSize: cfg.inlayHints.fontSize,
      fontFamily: cfg.inlayHints.fontFamily,
      padding: cfg.inlayHints.padding,
    };
  }

  if (cfg.minimap) {
    const m = cfg.minimap;
    o.minimap = {
      enabled: m.enabled,
      autohide: m.autohide,
      size: m.size,
      side: m.side,
      showSlider: m.showSlider,
      scale: m.scale,
      renderCharacters: m.renderCharacters,
      maxColumn: m.maxColumn,
      // non-Monaco keys like showRegionSectionHeaders are ignored
    };
  }

  // occurrencesHighlight: VS Code may use "singleFile"
  if (cfg.occurrencesHighlight !== undefined) {
    o.occurrencesHighlight =
      cfg.occurrencesHighlight === "singleFile"
        ? true
        : !!cfg.occurrencesHighlight;
  }

  if (cfg.pasteAs) {
    o.pasteAs = {
      enabled: cfg.pasteAs.enabled,
      showPasteSelector: cfg.pasteAs.showPasteSelector,
    };
  }

  if (cfg.parameterHints) {
    o.parameterHints = { ...cfg.parameterHints };
  }

  if (cfg.inlineSuggest) {
    o.inlineSuggest = { ...cfg.inlineSuggest };
  }

  // Normalize wrappers
  if (cfg.wrappingIndent) {
    o.wrappingIndent =
      typeof cfg.wrappingIndent === "string"
        ? cfg.wrappingIndent
        : cfg.wrappingIndent.wrappingIndent;
  }
  if (cfg.wrappingStrategy) {
    o.wrappingStrategy =
      typeof cfg.wrappingStrategy === "string"
        ? cfg.wrappingStrategy
        : cfg.wrappingStrategy.wrappingStrategy;
  }

  // VS Code has 'fontLigatures2' — map to Monaco 'fontLigatures' if not set
  if (cfg.fontLigatures2 !== undefined && o.fontLigatures === undefined) {
    o.fontLigatures = cfg.fontLigatures2;
  }

  // renderFinalNewline: VS Code uses "on" | "off"
  if (cfg.renderFinalNewline !== undefined) {
    o.renderFinalNewline = cfg.renderFinalNewline === "on";
  }

  return o;
}

export function getVsCodeBaseOptions(): AnyObj {
  return mapVsCodeConfigToMonacoOptions(VSCODE_LIKE_CONFIG);
}
