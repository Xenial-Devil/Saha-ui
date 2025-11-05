"use client";
import * as React from "react";
import { cn } from "../../lib/utils";
import {
  textEditorVariants,
  toolbarVariants,
  editorContentVariants,
  toolbarButtonVariants,
  toolbarSeparatorVariants,
  toolbarGroupVariants,
} from "./TextEditor.styles";
import type { TextEditorProps, EditorCommand } from "./TextEditor.types";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Eraser,
  Minus,
  IndentIncrease,
  IndentDecrease,
  Type,
  Highlighter,
  Subscript,
  Superscript,
  Table2,
  FileCode2,
} from "lucide-react";

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Save the current cursor position
 */
const saveCursorPosition = (element: HTMLElement) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  const caretOffset = preCaretRange.toString().length;

  return caretOffset;
};

/**
 * Restore the cursor position
 */
const restoreCursorPosition = (element: HTMLElement, offset: number) => {
  const selection = window.getSelection();
  if (!selection) return;

  let charCount = 0;
  let foundNode: Node | null = null;
  let foundOffset = 0;

  const walk = (node: Node): boolean => {
    if (node.nodeType === Node.TEXT_NODE) {
      const textLength = node.textContent?.length || 0;
      if (charCount + textLength >= offset) {
        foundNode = node;
        foundOffset = offset - charCount;
        return true;
      }
      charCount += textLength;
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        if (walk(node.childNodes[i])) return true;
      }
    }
    return false;
  };

  walk(element);

  if (foundNode) {
    const range = document.createRange();
    range.setStart(foundNode, foundOffset);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

// ============================================================================
// DEFAULT TOOLBAR CONFIGURATION
// ============================================================================

const defaultToolbarButtons = [
  // Text Formatting Group
  {
    command: "bold" as EditorCommand,
    icon: <Bold className="h-4 w-4" />,
    label: "Bold",
    tooltip: "Bold (Ctrl+B)",
    group: "text-format",
  },
  {
    command: "italic" as EditorCommand,
    icon: <Italic className="h-4 w-4" />,
    label: "Italic",
    tooltip: "Italic (Ctrl+I)",
    group: "text-format",
  },
  {
    command: "underline" as EditorCommand,
    icon: <Underline className="h-4 w-4" />,
    label: "Underline",
    tooltip: "Underline (Ctrl+U)",
    group: "text-format",
  },
  {
    command: "strikethrough" as EditorCommand,
    icon: <Strikethrough className="h-4 w-4" />,
    label: "Strike",
    tooltip: "Strikethrough",
    group: "text-format",
  },
  {
    command: "highlight" as EditorCommand,
    icon: <Highlighter className="h-4 w-4" />,
    label: "Highlight",
    tooltip: "Highlight Text",
    group: "text-format",
  },
  { separator: true },

  // Script & Special Characters Group
  {
    command: "subscript" as EditorCommand,
    icon: <Subscript className="h-4 w-4" />,
    label: "Sub",
    tooltip: "Subscript",
    group: "script",
  },
  {
    command: "superscript" as EditorCommand,
    icon: <Superscript className="h-4 w-4" />,
    label: "Super",
    tooltip: "Superscript",
    group: "script",
  },
  { separator: true },

  // Heading & Paragraph Group
  {
    command: "h1" as EditorCommand,
    icon: <Heading1 className="h-4 w-4" />,
    label: "H1",
    tooltip: "Heading 1",
    group: "headings",
  },
  {
    command: "h2" as EditorCommand,
    icon: <Heading2 className="h-4 w-4" />,
    label: "H2",
    tooltip: "Heading 2",
    group: "headings",
  },
  {
    command: "h3" as EditorCommand,
    icon: <Heading3 className="h-4 w-4" />,
    label: "H3",
    tooltip: "Heading 3",
    group: "headings",
  },
  {
    command: "p" as EditorCommand,
    icon: <Type className="h-4 w-4" />,
    label: "P",
    tooltip: "Paragraph",
    group: "headings",
  },
  { separator: true },

  // Text Alignment Group
  {
    command: "alignLeft" as EditorCommand,
    icon: <AlignLeft className="h-4 w-4" />,
    label: "Left",
    tooltip: "Align Left",
    group: "alignment",
  },
  {
    command: "alignCenter" as EditorCommand,
    icon: <AlignCenter className="h-4 w-4" />,
    label: "Center",
    tooltip: "Align Center",
    group: "alignment",
  },
  {
    command: "alignRight" as EditorCommand,
    icon: <AlignRight className="h-4 w-4" />,
    label: "Right",
    tooltip: "Align Right",
    group: "alignment",
  },
  {
    command: "alignJustify" as EditorCommand,
    icon: <AlignJustify className="h-4 w-4" />,
    label: "Justify",
    tooltip: "Justify",
    group: "alignment",
  },
  { separator: true },

  // Lists & Indentation Group
  {
    command: "ul" as EditorCommand,
    icon: <List className="h-4 w-4" />,
    label: "Bullet",
    tooltip: "Bullet List",
    group: "lists",
  },
  {
    command: "ol" as EditorCommand,
    icon: <ListOrdered className="h-4 w-4" />,
    label: "Numbered",
    tooltip: "Numbered List",
    group: "lists",
  },
  {
    command: "indent" as EditorCommand,
    icon: <IndentIncrease className="h-4 w-4" />,
    label: "Indent",
    tooltip: "Increase Indent",
    group: "lists",
  },
  {
    command: "outdent" as EditorCommand,
    icon: <IndentDecrease className="h-4 w-4" />,
    label: "Outdent",
    tooltip: "Decrease Indent",
    group: "lists",
  },
  { separator: true },

  // Special Formatting Group
  {
    command: "blockquote" as EditorCommand,
    icon: <Quote className="h-4 w-4" />,
    label: "Quote",
    tooltip: "Block Quote",
    group: "special",
  },
  {
    command: "code" as EditorCommand,
    icon: <Code className="h-4 w-4" />,
    label: "Code",
    tooltip: "Code Block",
    group: "special",
  },
  {
    command: "codeblock" as EditorCommand,
    icon: <FileCode2 className="h-4 w-4" />,
    label: "Pre",
    tooltip: "Preformatted Code",
    group: "special",
  },
  { separator: true },

  // Insert Group
  {
    command: "link" as EditorCommand,
    icon: <LinkIcon className="h-4 w-4" />,
    label: "Link",
    tooltip: "Insert Link",
    group: "insert",
  },
  {
    command: "image" as EditorCommand,
    icon: <ImageIcon className="h-4 w-4" />,
    label: "Image",
    tooltip: "Insert Image",
    group: "insert",
  },
  {
    command: "table" as EditorCommand,
    icon: <Table2 className="h-4 w-4" />,
    label: "Table",
    tooltip: "Insert Table",
    group: "insert",
  },
  {
    command: "hr" as EditorCommand,
    icon: <Minus className="h-4 w-4" />,
    label: "HR",
    tooltip: "Horizontal Rule",
    group: "insert",
  },
  { separator: true },

  // History Group
  {
    command: "undo" as EditorCommand,
    icon: <Undo className="h-4 w-4" />,
    label: "Undo",
    tooltip: "Undo (Ctrl+Z)",
    group: "history",
  },
  {
    command: "redo" as EditorCommand,
    icon: <Redo className="h-4 w-4" />,
    label: "Redo",
    tooltip: "Redo (Ctrl+Y)",
    group: "history",
  },
  { separator: true },

  // Clear Formatting
  {
    command: "clear" as EditorCommand,
    icon: <Eraser className="h-4 w-4" />,
    label: "Clear",
    tooltip: "Clear Formatting",
  },
]; // ============================================================================
// TEXT EDITOR COMPONENT
// ============================================================================

/**
 * TextEditor Component
 *
 * An advanced rich text editor with toolbar for formatting text.
 * Supports headings, lists, links, images, alignment, and more.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TextEditor
 *   placeholder="Start writing..."
 *   onChange={(html) => console.log(html)}
 * />
 *
 * // With variants and custom toolbar
 * <TextEditor
 *   variant="primary"
 *   size="lg"
 *   defaultValue="<p>Hello world!</p>"
 *   stickyToolbar
 * />
 *
 * // Read-only mode
 * <TextEditor
 *   value={content}
 *   readOnly
 *   showToolbar={false}
 * />
 * ```
 */
export const TextEditor = React.forwardRef<HTMLDivElement, TextEditorProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      fullWidth = true,
      defaultValue = "",
      value: controlledValue,
      onChange,
      placeholder = "Start writing...",
      disabled = false,
      readOnly = false,
      showToolbar = true,
      stickyToolbar = false,
      toolbarVariant = "default",
      toolbarButtons = defaultToolbarButtons,
      minHeight,
      maxHeight,
      autoFocus = false,
      ...props
    },
    ref
  ) => {
    const editorRef = React.useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [activeCommands, setActiveCommands] = React.useState<
      Set<EditorCommand>
    >(new Set());

    // Determine if we're in controlled mode
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Auto-focus on mount
    React.useEffect(() => {
      if (autoFocus && editorRef.current) {
        editorRef.current.focus();
      }
    }, [autoFocus]);

    // Update active commands based on cursor position
    const updateActiveCommands = React.useCallback(() => {
      const active = new Set<EditorCommand>();

      if (document.queryCommandState("bold")) active.add("bold");
      if (document.queryCommandState("italic")) active.add("italic");
      if (document.queryCommandState("underline")) active.add("underline");
      if (document.queryCommandState("strikeThrough"))
        active.add("strikethrough");
      if (document.queryCommandState("subscript")) active.add("subscript");
      if (document.queryCommandState("superscript")) active.add("superscript");
      if (document.queryCommandState("hiliteColor")) active.add("highlight");
      if (document.queryCommandState("insertUnorderedList")) active.add("ul");
      if (document.queryCommandState("insertOrderedList")) active.add("ol");
      if (document.queryCommandState("justifyLeft")) active.add("alignLeft");
      if (document.queryCommandState("justifyCenter"))
        active.add("alignCenter");
      if (document.queryCommandState("justifyRight")) active.add("alignRight");
      if (document.queryCommandState("justifyFull")) active.add("alignJustify");

      setActiveCommands(active);
    }, []);

    // Execute editor command
    const executeCommand = React.useCallback(
      (command: EditorCommand, _value?: string) => {
        if (disabled || readOnly) return;

        editorRef.current?.focus();

        switch (command) {
          case "bold":
            document.execCommand("bold", false);
            break;
          case "italic":
            document.execCommand("italic", false);
            break;
          case "underline":
            document.execCommand("underline", false);
            break;
          case "strikethrough":
            document.execCommand("strikeThrough", false);
            break;
          case "h1":
            document.execCommand("formatBlock", false, "<h1>");
            break;
          case "h2":
            document.execCommand("formatBlock", false, "<h2>");
            break;
          case "h3":
            document.execCommand("formatBlock", false, "<h3>");
            break;
          case "h4":
            document.execCommand("formatBlock", false, "<h4>");
            break;
          case "h5":
            document.execCommand("formatBlock", false, "<h5>");
            break;
          case "h6":
            document.execCommand("formatBlock", false, "<h6>");
            break;
          case "p":
            document.execCommand("formatBlock", false, "<p>");
            break;
          case "blockquote":
            document.execCommand("formatBlock", false, "<blockquote>");
            break;
          case "code":
            document.execCommand("formatBlock", false, "<pre>");
            break;
          case "ul":
            document.execCommand("insertUnorderedList", false);
            break;
          case "ol":
            document.execCommand("insertOrderedList", false);
            break;
          case "link": {
            const url = prompt("Enter URL:");
            if (url) {
              document.execCommand("createLink", false, url);
            }
            break;
          }
          case "image": {
            const imageUrl = prompt("Enter image URL:");
            if (imageUrl) {
              document.execCommand("insertImage", false, imageUrl);
            }
            break;
          }
          case "alignLeft":
            document.execCommand("justifyLeft", false);
            break;
          case "alignCenter":
            document.execCommand("justifyCenter", false);
            break;
          case "alignRight":
            document.execCommand("justifyRight", false);
            break;
          case "alignJustify":
            document.execCommand("justifyFull", false);
            break;
          case "indent":
            document.execCommand("indent", false);
            break;
          case "outdent":
            document.execCommand("outdent", false);
            break;
          case "undo":
            document.execCommand("undo", false);
            break;
          case "redo":
            document.execCommand("redo", false);
            break;
          case "clear":
            document.execCommand("removeFormat", false);
            break;
          case "hr":
            document.execCommand("insertHorizontalRule", false);
            break;
          case "subscript":
            document.execCommand("subscript", false);
            break;
          case "superscript":
            document.execCommand("superscript", false);
            break;
          case "highlight":
            document.execCommand("hiliteColor", false, "#ffff00");
            break;
          case "table": {
            const rows = prompt("Number of rows:", "3");
            const cols = prompt("Number of columns:", "3");
            if (rows && cols) {
              let tableHTML =
                '<table border="1" style="border-collapse: collapse; width: 100%;">';
              for (let i = 0; i < parseInt(rows); i++) {
                tableHTML += "<tr>";
                for (let j = 0; j < parseInt(cols); j++) {
                  tableHTML +=
                    '<td style="border: 1px solid #ccc; padding: 8px;">&nbsp;</td>';
                }
                tableHTML += "</tr>";
              }
              tableHTML += "</table>";
              document.execCommand("insertHTML", false, tableHTML);
            }
            break;
          }
          case "codeblock":
            document.execCommand("formatBlock", false, "<pre>");
            break;
        }

        updateActiveCommands();
        handleInput();
      },
      [disabled, readOnly, updateActiveCommands]
    );

    // Handle content changes
    const handleInput = React.useCallback(() => {
      if (editorRef.current) {
        const html = editorRef.current.innerHTML;
        if (!isControlled) {
          setInternalValue(html);
        }
        // Call onChange without triggering re-render
        onChange?.(html);
      }
    }, [isControlled, onChange]);

    // Handle selection change
    React.useEffect(() => {
      const handleSelectionChange = () => {
        updateActiveCommands();
      };

      document.addEventListener("selectionchange", handleSelectionChange);
      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
      };
    }, [updateActiveCommands]);

    // Set initial value
    React.useEffect(() => {
      if (editorRef.current && editorRef.current.innerHTML === "") {
        editorRef.current.innerHTML = defaultValue;
      }
    }, []);

    // Sync controlled value (only when external value changes)
    React.useEffect(() => {
      if (
        isControlled &&
        editorRef.current &&
        controlledValue !== editorRef.current.innerHTML
      ) {
        // Check if the editor is focused
        const isFocused = document.activeElement === editorRef.current;

        if (isFocused) {
          // Save cursor position before updating
          const cursorPosition = saveCursorPosition(editorRef.current);

          // Update content
          editorRef.current.innerHTML = controlledValue;

          // Restore cursor position after update
          if (cursorPosition !== null) {
            // Use requestAnimationFrame for better timing
            requestAnimationFrame(() => {
              if (editorRef.current) {
                restoreCursorPosition(editorRef.current, cursorPosition);
              }
            });
          }
        } else {
          // If not focused, just update the content
          editorRef.current.innerHTML = controlledValue;
        }
      }
    }, [isControlled, controlledValue]);

    return (
      <div
        ref={ref}
        className={cn(
          textEditorVariants({ variant, size, fullWidth }),
          className
        )}
        {...props}
      >
        {/* Toolbar */}
        {showToolbar && !disabled && !readOnly && (
          <div
            className={cn(
              toolbarVariants({
                variant: toolbarVariant,
                size,
                sticky: stickyToolbar,
              })
            )}
          >
            {toolbarButtons.map((button, index) => {
              if (button.separator) {
                return (
                  <div
                    key={`separator-${index}`}
                    className={toolbarSeparatorVariants()}
                  />
                );
              }

              if (!button.command) return null;

              const isActive = activeCommands.has(button.command);

              return (
                <button
                  key={button.command}
                  type="button"
                  onClick={() => executeCommand(button.command!)}
                  className={cn(
                    toolbarButtonVariants({ variant: toolbarVariant, size })
                  )}
                  data-active={isActive}
                  title={button.tooltip || button.label}
                  disabled={disabled}
                  aria-label={button.tooltip || button.label}
                >
                  {button.icon}
                  {button.label && size !== "sm" && (
                    <span className="hidden xl:inline ml-1">
                      {button.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Editor Content */}
        <div
          ref={editorRef}
          contentEditable={!disabled && !readOnly}
          onInput={handleInput}
          onPaste={(e) => {
            if (!readOnly && !disabled) {
              e.preventDefault();
              const text = e.clipboardData.getData("text/plain");
              document.execCommand("insertText", false, text);
            }
          }}
          className={cn(editorContentVariants({ size }))}
          style={{
            minHeight: minHeight || "200px",
            maxHeight: maxHeight || "600px",
          }}
          data-placeholder={!currentValue ? placeholder : undefined}
          suppressContentEditableWarning
        />
      </div>
    );
  }
);

TextEditor.displayName = "TextEditor";

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  TextEditorProps,
  TextEditorVariant,
  TextEditorSize,
  ToolbarButtonVariant,
  EditorCommand,
} from "./TextEditor.types";

export {
  textEditorVariants,
  toolbarVariants,
  editorContentVariants,
  toolbarButtonVariants,
  toolbarGroupVariants,
  toolbarSeparatorVariants,
};
