import { TextEditor } from "../components/TextEditor/index";
import { useState } from "react";

/**
 * TextEditorExample Component
 *
 * Demonstrates all features and variants of the TextEditor component.
 */
export default function TextEditorExample() {
  const [content1, setContent1] = useState(
    "<p>This is a controlled editor. Type something...</p>"
  );
  const [content2, setContent2] = useState("");

  return (
    <div className="space-y-12 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">TextEditor Component</h1>
        <p className="text-muted-foreground">
          Advanced rich text editor with formatting toolbar and multiple
          variants.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <p className="text-sm text-muted-foreground">
          Simple editor with default settings
        </p>
        <TextEditor placeholder="Start writing your content..." />
      </section>

      {/* Controlled Mode */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Controlled Mode</h2>
        <p className="text-sm text-muted-foreground">
          Editor with controlled value and change handler
        </p>
        <TextEditor
          value={content1}
          onChange={setContent1}
          placeholder="Type here..."
        />
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Current HTML:</p>
          <pre className="text-xs overflow-x-auto">{content1}</pre>
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <p className="text-sm text-muted-foreground">
          Different color schemes for various contexts
        </p>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Default</h3>
            <TextEditor
              variant="default"
              placeholder="Default variant..."
              defaultValue="<p>This is the <strong>default</strong> variant.</p>"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Primary</h3>
            <TextEditor
              variant="primary"
              placeholder="Primary variant..."
              defaultValue="<p>This is the <strong>primary</strong> variant with a blue accent.</p>"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Secondary</h3>
            <TextEditor
              variant="secondary"
              placeholder="Secondary variant..."
              defaultValue="<p>This is the <strong>secondary</strong> variant.</p>"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Success</h3>
            <TextEditor
              variant="success"
              placeholder="Success variant..."
              defaultValue="<p>This is the <strong>success</strong> variant with green accent.</p>"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Warning</h3>
            <TextEditor
              variant="warning"
              placeholder="Warning variant..."
              defaultValue="<p>This is the <strong>warning</strong> variant with yellow accent.</p>"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Error</h3>
            <TextEditor
              variant="error"
              placeholder="Error variant..."
              defaultValue="<p>This is the <strong>error</strong> variant with red accent.</p>"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Outline</h3>
            <TextEditor
              variant="outline"
              placeholder="Outline variant..."
              defaultValue="<p>This is the <strong>outline</strong> variant with border shadow.</p>"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Ghost</h3>
            <TextEditor
              variant="ghost"
              placeholder="Ghost variant..."
              defaultValue="<p>This is the <strong>ghost</strong> variant with minimal styling.</p>"
            />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <p className="text-sm text-muted-foreground">
          Different sizes for various use cases
        </p>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Small</h3>
            <TextEditor
              size="sm"
              placeholder="Small editor..."
              defaultValue="<p>Small size editor with compact toolbar</p>"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Default</h3>
            <TextEditor
              size="default"
              placeholder="Default editor..."
              defaultValue="<p>Default size editor</p>"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Large</h3>
            <TextEditor
              size="lg"
              placeholder="Large editor..."
              defaultValue="<p>Large size editor with spacious toolbar</p>"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Extra Large</h3>
            <TextEditor
              size="xl"
              placeholder="Extra large editor..."
              defaultValue="<p>Extra large editor with maximum spacing</p>"
            />
          </div>
        </div>
      </section>

      {/* Sticky Toolbar */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sticky Toolbar</h2>
        <p className="text-sm text-muted-foreground">
          Toolbar stays visible when scrolling
        </p>
        <TextEditor
          stickyToolbar
          placeholder="Scroll down to see sticky toolbar..."
          defaultValue="<h1>Sticky Toolbar Demo</h1><p>Scroll down to see the toolbar stick to the top.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"
          minHeight="400px"
        />
      </section>

      {/* Read-Only Mode */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Read-Only Mode</h2>
        <p className="text-sm text-muted-foreground">
          Display formatted content without editing
        </p>
        <TextEditor
          readOnly
          showToolbar={false}
          defaultValue="<h2>Read-Only Content</h2><p>This editor is in <strong>read-only</strong> mode. You cannot edit this content.</p><ul><li>No toolbar shown</li><li>Content cannot be modified</li><li>Perfect for displaying formatted text</li></ul>"
        />
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Disabled State</h2>
        <p className="text-sm text-muted-foreground">
          Editor in disabled state
        </p>
        <TextEditor
          disabled
          defaultValue="<p>This editor is <strong>disabled</strong>. All interactions are blocked.</p>"
        />
      </section>

      {/* Rich Content Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Rich Content Example</h2>
        <p className="text-sm text-muted-foreground">
          Editor with various formatting options
        </p>
        <TextEditor
          variant="outline"
          defaultValue={`
            <h1>Welcome to the Rich Text Editor</h1>
            <p>This editor supports various formatting options:</p>
            
            <h2>Text Formatting</h2>
            <p>You can make text <strong>bold</strong>, <em>italic</em>, <u>underlined</u>, or <s>strikethrough</s>.</p>
            
            <h3>Lists</h3>
            <ul>
              <li>Unordered list item 1</li>
              <li>Unordered list item 2</li>
              <li>Unordered list item 3</li>
            </ul>
            
            <ol>
              <li>Ordered list item 1</li>
              <li>Ordered list item 2</li>
              <li>Ordered list item 3</li>
            </ol>
            
            <h3>Blockquote</h3>
            <blockquote>
              This is a blockquote. Use it for citations or important quotes.
            </blockquote>
            
            <h3>Code</h3>
            <pre>const greeting = "Hello, World!";</pre>
            
            <h3>Alignment</h3>
            <p style="text-align: center;">This text is centered</p>
            <p style="text-align: right;">This text is right-aligned</p>
            
            <hr>
            
            <p>Try using the toolbar to format your text!</p>
          `}
          minHeight="500px"
        />
      </section>

      {/* Custom Height */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Height</h2>
        <p className="text-sm text-muted-foreground">
          Editor with custom minimum and maximum height
        </p>
        <TextEditor
          placeholder="This editor has custom height constraints..."
          minHeight="300px"
          maxHeight="400px"
        />
      </section>

      {/* Auto Focus */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Auto Focus</h2>
        <p className="text-sm text-muted-foreground">
          Editor automatically focused on mount
        </p>
        <TextEditor
          autoFocus
          placeholder="This editor is auto-focused..."
          value={content2}
          onChange={setContent2}
        />
      </section>

      {/* Full Width Control */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Width Control</h2>
        <p className="text-sm text-muted-foreground">Control editor width</p>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Full Width (Default)</h3>
            <TextEditor fullWidth placeholder="Full width editor..." />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Auto Width</h3>
            <TextEditor fullWidth={false} placeholder="Auto width editor..." />
          </div>
        </div>
      </section>

      {/* Toolbar Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Toolbar Variants</h2>
        <p className="text-sm text-muted-foreground">
          Different toolbar button styles
        </p>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Default Toolbar</h3>
            <TextEditor
              toolbarVariant="default"
              placeholder="Default toolbar buttons..."
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Primary Toolbar</h3>
            <TextEditor
              toolbarVariant="primary"
              placeholder="Primary toolbar buttons..."
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Ghost Toolbar</h3>
            <TextEditor
              toolbarVariant="ghost"
              placeholder="Ghost toolbar buttons..."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
