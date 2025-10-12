import Tree from "../components/Tree";
import { Folder, FileText, Image as ImageIcon } from "lucide-react";

export const TreeExample = () => {
  const fileTree = [
    {
      id: "1",
      label: "src",
      icon: <Folder size={16} />,
      expanded: true,
      children: [
        {
          id: "1-1",
          label: "components",
          icon: <Folder size={16} />,
          expanded: true,
          children: [
            {
              id: "1-1-1",
              label: "Button.tsx",
              icon: <FileText size={16} />,
            },
            {
              id: "1-1-2",
              label: "Card.tsx",
              icon: <FileText size={16} />,
            },
          ],
        },
        {
          id: "1-2",
          label: "utils",
          icon: <Folder size={16} />,
          children: [
            {
              id: "1-2-1",
              label: "helpers.ts",
              icon: <FileText size={16} />,
            },
          ],
        },
      ],
    },
    {
      id: "2",
      label: "public",
      icon: <Folder size={16} />,
      children: [
        {
          id: "2-1",
          label: "logo.png",
          icon: <ImageIcon size={16} />,
        },
      ],
    },
  ];

  const collapsedTree = [
    {
      id: "1",
      label: "src",
      icon: <Folder size={16} />,
      children: [
        {
          id: "1-1",
          label: "components",
          icon: <Folder size={16} />,
          children: [
            {
              id: "1-1-1",
              label: "Button.tsx",
              icon: <FileText size={16} />,
            },
            {
              id: "1-1-2",
              label: "Card.tsx",
              icon: <FileText size={16} />,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Tree Component</h3>

      {/* Basic Tree */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">File Tree</h4>
        <Tree nodes={collapsedTree} />
      </div>

      {/* Expanded by Default */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Expanded by Default
        </h4>
        <Tree nodes={fileTree} />
      </div>

      {/* With Lines */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Lines</h4>
        <Tree nodes={fileTree} showLines />
      </div>

      {/* Different Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Glass</p>
            <Tree nodes={fileTree} variant="glass" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Bordered</p>
            <Tree nodes={fileTree} variant="bordered" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Minimal</p>
            <Tree nodes={fileTree} variant="minimal" />
          </div>
        </div>
      </div>

      {/* With Click Handler */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          With Click Handler
        </h4>
        <Tree
          nodes={fileTree}
          onNodeClick={(id) => console.log("Clicked node:", id)}
        />
      </div>
    </div>
  );
};
