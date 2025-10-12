import React, { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type { TreeProps, TreeNode } from "./Tree.types";
import { ChevronDown, ChevronRight, Folder, File } from "lucide-react";

const treeVariants = cva("relative w-full", {
  variants: {
    variant: {
      default: "bg-card border border-border/40 rounded-lg p-2",
      glass:
        "glass-strong backdrop-blur-lg p-2 rounded-xl border border-border/30",
      bordered: "border border-border/60 rounded-lg p-2",
      minimal: "p-2",
    },
    size: {
      sm: "text-xs gap-1",
      md: "text-sm gap-2",
      lg: "text-base gap-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const treeNodeVariants = cva(
  "flex items-center gap-2 py-1 px-2 rounded transition-colors cursor-pointer select-none",
  {
    variants: {
      expanded: {
        true: "bg-accent/10",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
      size: {
        sm: "text-xs py-0.5",
        md: "text-sm py-1",
        lg: "text-base py-2",
      },
    },
    defaultVariants: {
      expanded: false,
      disabled: false,
      size: "md",
    },
  }
);

function TreeNodeItem({
  node,
  size,
  showLines,
  showIcons,
  iconPosition,
  nodeClassName,
  onNodeToggle,
  onNodeClick,
}: {
  node: TreeNode;
  size: "sm" | "md" | "lg";
  showLines?: boolean;
  showIcons?: boolean;
  iconPosition?: "left" | "right";
  nodeClassName?: string;
  onNodeToggle?: (id: string | number, expanded: boolean) => void;
  onNodeClick?: (id: string | number) => void;
}) {
  const [expanded, setExpanded] = useState(node.expanded ?? false);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => {
      onNodeToggle?.(node.id, !prev);
      return !prev;
    });
  };

  return (
    <div className="relative">
      <div
        className={cn(
          treeNodeVariants({
            expanded,
            disabled: node.disabled,
            size,
          }),
          node.className,
          nodeClassName
        )}
        onClick={() => {
          if (!node.disabled) {
            onNodeClick?.(node.id);
          }
        }}
      >
        {/* Chevron */}
        {hasChildren && (
          <span onClick={handleToggle} className="mr-1 cursor-pointer">
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        {/* Icon left */}
        {showIcons && iconPosition !== "right" && (
          <span className="text-muted-foreground">
            {node.icon ? (
              node.icon
            ) : hasChildren ? (
              <Folder size={16} />
            ) : (
              <File size={16} />
            )}
          </span>
        )}
        {/* Label */}
        <span>{node.label}</span>
        {/* Icon right */}
        {showIcons && iconPosition === "right" && (
          <span className="ml-2 text-muted-foreground">
            {node.icon ? (
              node.icon
            ) : hasChildren ? (
              <Folder size={16} />
            ) : (
              <File size={16} />
            )}
          </span>
        )}
      </div>
      {/* Children */}
      {hasChildren && expanded && (
        <div className={cn("ml-5 border-l border-border/30")}>
          {" "}
          {/* lines */}
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              size={size}
              showLines={showLines}
              showIcons={showIcons}
              iconPosition={iconPosition}
              nodeClassName={nodeClassName}
              onNodeToggle={onNodeToggle}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const Tree: React.FC<TreeProps> = ({
  nodes,
  variant = "default",
  size = "md",
  className,
  nodeClassName,
  iconPosition = "left",
  showLines = true,
  showIcons = true,
  onNodeToggle,
  onNodeClick,
}) => {
  return (
    <div className={cn(treeVariants({ variant, size }), className)}>
      {nodes.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          size={size}
          showLines={showLines}
          showIcons={showIcons}
          iconPosition={iconPosition}
          nodeClassName={nodeClassName}
          onNodeToggle={onNodeToggle}
          onNodeClick={onNodeClick}
        />
      ))}
    </div>
  );
};

Tree.displayName = "Tree";

export default Tree;
export { treeVariants, treeNodeVariants };
