"use client";
import { CodeEditor } from "../components/CodeEditor";

export default function CodeEditorExample() {
  const initial = `function hello() {\n  console.log('Hello, world!');\n}`;

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Code Editor</h2>
        <p className="text-muted-foreground">
          Editable code pane with syntax highlighting.
        </p>
      </div>

      {/* Basic Use */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Use</h3>
        <div className="bg-muted/30 p-6 rounded-lg">
          <CodeEditor value={initial} language="javascript" />
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Variants</h3>
        <p className="text-sm text-muted-foreground">
          Switch language for syntax highlighting or enable readOnly mode.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <CodeEditor value={"<h1>Hello</h1>"} language="html" />
        </div>
      </section>

      {/* Size / Real World */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Size & Real World</h3>
        <p className="text-sm text-muted-foreground">
          Set height/width to fit embedding contexts (docs, editors).
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <CodeEditor value={initial} language="javascript" />
        </div>
      </section>
    </div>
  );
}
