import { Tree, TreeItem } from "../components/Tree";
import { Folder, FileText, Image as ImageIcon, Code } from "lucide-react";

export const TreeExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Tree Component</h3>

      {/* Basic Tree */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          File System Tree
        </h4>
        <Tree>
          <TreeItem label="src" icon={<Folder size={16} />} expanded>
            <TreeItem label="components" icon={<Folder size={16} />} expanded>
              <TreeItem label="Button.tsx" icon={<FileText size={16} />} />
              <TreeItem label="Card.tsx" icon={<FileText size={16} />} />
            </TreeItem>
            <TreeItem label="utils" icon={<Folder size={16} />}>
              <TreeItem label="helpers.ts" icon={<Code size={16} />} />
            </TreeItem>
          </TreeItem>
          <TreeItem label="public" icon={<Folder size={16} />}>
            <TreeItem label="logo.png" icon={<ImageIcon size={16} />} />
          </TreeItem>
        </Tree>
      </div>

      {/* Collapsed Tree */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Collapsed by Default
        </h4>
        <Tree>
          <TreeItem label="src" icon={<Folder size={16} />}>
            <TreeItem label="components" icon={<Folder size={16} />}>
              <TreeItem label="Button.tsx" icon={<FileText size={16} />} />
              <TreeItem label="Card.tsx" icon={<FileText size={16} />} />
            </TreeItem>
          </TreeItem>
        </Tree>
      </div>

      {/* Tree Variants */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-3">Bordered</p>
            <Tree variant="bordered">
              <TreeItem label="Folder" icon={<Folder size={16} />} expanded>
                <TreeItem label="File 1" icon={<FileText size={16} />} />
                <TreeItem label="File 2" icon={<FileText size={16} />} />
              </TreeItem>
            </Tree>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Glass</p>
            <Tree variant="glass">
              <TreeItem label="Documents" icon={<Folder size={16} />} expanded>
                <TreeItem label="Report.pdf" icon={<FileText size={16} />} />
                <TreeItem label="Notes.txt" icon={<FileText size={16} />} />
              </TreeItem>
            </Tree>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Minimal</p>
            <Tree variant="minimal">
              <TreeItem label="Root" icon={<Folder size={16} />} expanded>
                <TreeItem label="Item 1" />
                <TreeItem label="Item 2" />
              </TreeItem>
            </Tree>
          </div>
        </div>
      </div>

      {/* Tree Sizes */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-3">Small</p>
            <Tree size="sm">
              <TreeItem label="Small Tree" expanded>
                <TreeItem label="Child Item" />
              </TreeItem>
            </Tree>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Large</p>
            <Tree size="lg">
              <TreeItem label="Large Tree" icon={<Folder size={20} />} expanded>
                <TreeItem label="Child Item" icon={<FileText size={20} />} />
              </TreeItem>
            </Tree>
          </div>
        </div>
      </div>

      {/* Show Lines */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          With Connection Lines
        </h4>
        <Tree showLines>
          <TreeItem label="Root" icon={<Folder size={16} />} expanded>
            <TreeItem label="Subfolder" icon={<Folder size={16} />} expanded>
              <TreeItem label="File" icon={<FileText size={16} />} />
            </TreeItem>
            <TreeItem label="Another File" icon={<FileText size={16} />} />
          </TreeItem>
        </Tree>
      </div>
    </div>
  );
};
