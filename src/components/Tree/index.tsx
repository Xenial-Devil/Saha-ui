"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import type {
  TreeProps,
  TreeItemProps,
  TreeVariant,
  TreeSize,
  TreeNodeIconPosition,
} from "./Tree.types";
import { ChevronDown, ChevronRight, Folder, File } from "lucide-react";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
} from "../../lib/validation";
import { treeVariants, treeNodeVariants } from "./Tree.styles";

interface TreeContextValue {
  variant: TreeVariant;
  size: TreeSize;
  iconPosition: TreeNodeIconPosition;
  showLines: boolean;
  showIcons: boolean;
}

const TreeContext = createContext<TreeContextValue | undefined>(undefined);

const useTree = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("TreeItem must be used within a Tree");
  }
  return context;
};

const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      variant = "default",
      size = "md",
      iconPosition = "left",
      showLines = true,
      showIcons = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Tree");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "glass",
        "bordered",
        "minimal",
      ] as const);

      // Validate size
      validator.validateEnum("size", size, ["sm", "md", "lg"] as const);

      // Validate iconPosition
      validator.validateEnum("iconPosition", iconPosition, [
        "left",
        "right",
      ] as const);

      // Validate boolean props
      validator.validateType("showLines", showLines, "boolean", isValidBoolean);
      validator.validateType("showIcons", showIcons, "boolean", isValidBoolean);

      // Common validators
      commonValidators.className(validator, className);
    }, [variant, size, iconPosition, showLines, showIcons, className]);

    const contextValue: TreeContextValue = {
      variant,
      size,
      iconPosition,
      showLines,
      showIcons,
    };

    return (
      <TreeContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(treeVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </div>
      </TreeContext.Provider>
    );
  }
);

Tree.displayName = "Tree";

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      label,
      icon,
      expanded: controlledExpanded,
      disabled = false,
      onToggle,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const { size, showIcons, iconPosition, showLines } = useTree();
    const [internalExpanded, setInternalExpanded] = useState(false);

    const expanded = controlledExpanded ?? internalExpanded;
    const hasChildren = React.Children.count(children) > 0;

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newExpanded = !expanded;
      if (controlledExpanded === undefined) {
        setInternalExpanded(newExpanded);
      }
      onToggle?.(newExpanded);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled) {
        onClick?.(e);
      }
    };

    return (
      <div ref={ref} className="relative">
        <div
          className={cn(
            treeNodeVariants({
              expanded,
              disabled,
              size,
            }),
            className
          )}
          onClick={handleClick}
          {...props}
        >
          {hasChildren && (
            <span onClick={handleToggle} className="mr-1 cursor-pointer">
              {expanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          )}

          {showIcons && iconPosition !== "right" && (
            <span className="text-muted-foreground">
              {icon ? (
                icon
              ) : hasChildren ? (
                <Folder size={16} />
              ) : (
                <File size={16} />
              )}
            </span>
          )}

          <span>{label}</span>

          {showIcons && iconPosition === "right" && (
            <span className="ml-2 text-muted-foreground">
              {icon ? (
                icon
              ) : hasChildren ? (
                <Folder size={16} />
              ) : (
                <File size={16} />
              )}
            </span>
          )}
        </div>

        {hasChildren && expanded && (
          <div className={cn("ml-5", showLines && "border-l border-border/30")}>
            {children}
          </div>
        )}
      </div>
    );
  }
);

TreeItem.displayName = "TreeItem";

export { Tree, TreeItem };
