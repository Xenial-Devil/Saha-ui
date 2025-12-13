import React, { useState } from "react";
import { DragDropProvider, TreeView } from "../components/DragDrop";
import type { TreeItem } from "../components/DragDrop/DragDrop.types";

/**
 * Tree Drag and Drop Example
 *
 * Demonstrates:
 * - Nested hierarchical structures
 * - Expand/collapse functionality
 * - Depth constraints
 * - Parent-child relationships
 */
export const TreeExample: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeItem[]>([
    {
      id: "1",
      content: "Root Folder",
      children: [
        {
          id: "1-1",
          content: "Subfolder 1",
          children: [
            { id: "1-1-1", content: "File 1.txt" },
            { id: "1-1-2", content: "File 2.txt" },
          ],
        },
        {
          id: "1-2",
          content: "Subfolder 2",
          children: [{ id: "1-2-1", content: "Document.pdf" }],
        },
      ],
    },
    {
      id: "2",
      content: "Projects",
      children: [
        { id: "2-1", content: "Project A" },
        { id: "2-2", content: "Project B" },
      ],
    },
    {
      id: "3",
      content: "Documents",
      children: [],
    },
  ]);

  return (
    <DragDropProvider>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">File System Tree</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TreeView
            items={treeData}
            constraints={{ maxDepth: 4 }}
            showLines={true}
            className="space-y-1"
            onReorder={(newTree) => setTreeData(newTree)}
          />
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Features:</h3>
          <ul className="list-disc list-inside text-blue-800 space-y-1">
            <li>Drag items to reorganize the tree</li>
            <li>Click arrows to expand/collapse folders</li>
            <li>Maximum depth of 4 levels enforced</li>
            <li>Visual indentation shows hierarchy</li>
            <li>Drag handles on the left of each item</li>
          </ul>
        </div>
      </div>
    </DragDropProvider>
  );
};

export default TreeExample;
