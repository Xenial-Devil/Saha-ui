"use client";
import { useState } from "react";
import { CodeEditor } from "../components/CodeEditor";

export default function CodeEditorExample() {
  const jsSnippet = `function hello(name) {
  return 'Hello, ' + name + '!';
}`;

  const htmlSnippet = `<section class="hero">
  <h1>Launch Day</h1>
  <p>Build once, deploy everywhere.</p>
</section>`;

  const [editableCode, setEditableCode] =
    useState(`export async function fetchUsers() {
  const response = await fetch('/api/users');
  return response.json();
}`);
  const [lastSavedAt, setLastSavedAt] = useState<string>("Never");

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Code Editor</h2>
        <p className="text-muted-foreground">
          Editable code pane with language modes, toolbar actions, and save
          flow.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-6">
            <p className="mb-3 text-sm font-medium text-foreground">
              JavaScript starter
            </p>
            <CodeEditor value={jsSnippet} language="javascript" height={260} />
          </div>

          <div className="rounded-lg bg-muted/30 p-6">
            <p className="mb-3 text-sm font-medium text-foreground">
              HTML preview source
            </p>
            <CodeEditor
              value={htmlSnippet}
              language="html"
              height={260}
              showMinimap={false}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Normal Usage</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-6">
            <p className="mb-3 text-sm font-medium text-foreground">
              Read-only reviewer mode
            </p>
            <CodeEditor
              value={`type Ticket = {
  id: string;
  status: 'open' | 'closed';
};`}
              language="typescript"
              readOnly
              showLanguageSelect={false}
              showWrapToggle={false}
              height={230}
            />
          </div>

          <div className="rounded-lg bg-muted/30 p-6">
            <p className="mb-3 text-sm font-medium text-foreground">
              Inline compact editor
            </p>
            <CodeEditor
              value={`SELECT id, email
FROM users
WHERE active = true;`}
              language="sql"
              size="sm"
              lineNumbers="off"
              showToolbar={false}
              showStatusBar={false}
              showMinimap={false}
              height={180}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Advanced Usage</h3>
        <div className="rounded-lg bg-muted/30 p-6">
          <p className="mb-3 text-sm font-medium text-foreground">
            Feature-rich editor with tabs and wrapping
          </p>
          <CodeEditor
            value={`import { Button } from '../ui/button';

export function SaveButton() {
  return <Button>Save</Button>;
}`}
            language="tsx"
            showTabBar
            showToolbar
            showStatusBar
            toolbarPlacement="floating"
            wordWrap
            theme="saha-ui-dark"
            height={300}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real-Life Use Cases</h3>
        <div className="rounded-lg bg-muted/30 p-6 space-y-3">
          <CodeEditor
            value={editableCode}
            language="typescript"
            filename="api-client.ts"
            onChange={setEditableCode}
            onSave={() => {
              setLastSavedAt(new Date().toLocaleTimeString());
            }}
            showTabBar
            showToolbar
            showStatusBar
            showMinimap
            height={320}
          />
          <p className="text-xs text-muted-foreground">
            Last saved at: {lastSavedAt}. Typical use cases include docs
            snippets, query editors, and low-code script configuration.
          </p>
        </div>
      </section>
    </div>
  );
}
