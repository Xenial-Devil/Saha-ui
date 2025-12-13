import React, { useState } from "react";
import {
  DragDropProvider,
  DroppableContainer,
  DraggableItem,
} from "../components/DragDrop";
import { Button, Card, Typography, Input, Badge } from "../index";
import { cn } from "../lib/utils";

// Component Library Categories
const componentCategories = {
  layout: [
    {
      id: "section",
      type: "section",
      name: "Section",
      icon: "📐",
      defaultProps: { className: "py-12", children: [] },
    },
    {
      id: "container",
      type: "container",
      name: "Container",
      icon: "📦",
      defaultProps: { className: "max-w-7xl mx-auto px-4", children: [] },
    },
    {
      id: "grid",
      type: "grid",
      name: "Grid",
      icon: "▦",
      defaultProps: { cols: 2, gap: 4, children: [] },
    },
    {
      id: "flex",
      type: "flex",
      name: "Flex",
      icon: "⬌",
      defaultProps: { direction: "row", gap: 4, children: [] },
    },
  ],
  content: [
    {
      id: "heading",
      type: "heading",
      name: "Heading",
      icon: "📝",
      defaultProps: { children: "Heading Text", variant: "h2", align: "left" },
    },
    {
      id: "text",
      type: "text",
      name: "Text",
      icon: "📄",
      defaultProps: { children: "Your text here", size: "base" },
    },
    {
      id: "image",
      type: "image",
      name: "Image",
      icon: "🖼️",
      defaultProps: {
        src: "https://via.placeholder.com/400x300",
        alt: "Placeholder",
        width: "100%",
      },
    },
    {
      id: "video",
      type: "video",
      name: "Video",
      icon: "🎥",
      defaultProps: { src: "", poster: "https://via.placeholder.com/400x300" },
    },
  ],
  forms: [
    {
      id: "button",
      type: "button",
      name: "Button",
      icon: "🔘",
      defaultProps: { children: "Click me", variant: "default", size: "md" },
    },
    {
      id: "input",
      type: "input",
      name: "Input",
      icon: "✏️",
      defaultProps: { placeholder: "Enter text...", type: "text" },
    },
    {
      id: "textarea",
      type: "textarea",
      name: "Text Area",
      icon: "📝",
      defaultProps: { placeholder: "Enter text...", rows: 4 },
    },
    {
      id: "select",
      type: "select",
      name: "Select",
      icon: "📋",
      defaultProps: {
        placeholder: "Select option",
        options: ["Option 1", "Option 2"],
      },
    },
  ],
  display: [
    {
      id: "card",
      type: "card",
      name: "Card",
      icon: "🎴",
      defaultProps: { className: "p-6", children: [] },
    },
    {
      id: "badge",
      type: "badge",
      name: "Badge",
      icon: "🏷️",
      defaultProps: { children: "Badge", variant: "default" },
    },
    {
      id: "alert",
      type: "alert",
      name: "Alert",
      icon: "⚠️",
      defaultProps: { children: "Alert message", variant: "info" },
    },
    {
      id: "divider",
      type: "divider",
      name: "Divider",
      icon: "➖",
      defaultProps: { orientation: "horizontal" },
    },
  ],
};

const componentLibrary = Object.values(componentCategories).flat();

// Render component based on type
const ComponentRenderer = ({
  component,
  isSelected,
  onSelect,
}: {
  component: any;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const baseClasses = cn(
    "relative transition-all duration-200",
    isSelected && "ring-2 ring-blue-500 ring-offset-2"
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  switch (component.type) {
    // Layout Components
    case "section":
      return (
        <div
          className={cn(
            baseClasses,
            "min-h-[120px] border-2 border-dashed border-blue-300 rounded-lg",
            component.props.className
          )}
          onClick={handleClick}
        >
          <div className="text-xs text-blue-600 font-semibold mb-2">
            Section
          </div>
          {component.props.children?.length > 0 ? (
            <div className="space-y-2">{component.props.children}</div>
          ) : (
            <div className="text-gray-400 text-center">Drop items here</div>
          )}
        </div>
      );
    case "container":
      return (
        <div
          className={cn(
            baseClasses,
            "min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-4",
            component.props.className
          )}
          onClick={handleClick}
        >
          <div className="text-xs text-gray-600 font-semibold mb-2">
            Container
          </div>
          {component.props.children?.length > 0 ? (
            component.props.children
          ) : (
            <div className="text-gray-400 text-center">Drop items here</div>
          )}
        </div>
      );
    case "grid":
      return (
        <div
          className={cn(
            baseClasses,
            "min-h-[100px] border-2 border-dashed border-purple-300 rounded-lg p-4"
          )}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${component.props.cols || 2}, 1fr)`,
            gap: `${component.props.gap || 4 * 0.25}rem`,
          }}
          onClick={handleClick}
        >
          <div className="col-span-full text-xs text-purple-600 font-semibold mb-2">
            Grid {component.props.cols}x
          </div>
          {component.props.children?.length > 0 ? (
            component.props.children
          ) : (
            <div className="col-span-full text-gray-400 text-center">
              Drop items here
            </div>
          )}
        </div>
      );
    case "flex":
      return (
        <div
          className={cn(
            baseClasses,
            "min-h-[100px] border-2 border-dashed border-green-300 rounded-lg p-4"
          )}
          style={{
            display: "flex",
            flexDirection:
              component.props.direction === "column" ? "column" : "row",
            gap: `${component.props.gap || 4 * 0.25}rem`,
          }}
          onClick={handleClick}
        >
          <div className="text-xs text-green-600 font-semibold mb-2">
            Flex {component.props.direction}
          </div>
          {component.props.children?.length > 0 ? (
            component.props.children
          ) : (
            <div className="text-gray-400 text-center">Drop items here</div>
          )}
        </div>
      );

    // Content Components
    case "heading":
      return (
        <div
          className={baseClasses}
          onClick={handleClick}
          style={{ textAlign: component.props.align }}
        >
          <Typography variant={component.props.variant}>
            {component.props.children}
          </Typography>
        </div>
      );
    case "text":
      return (
        <div className={baseClasses} onClick={handleClick}>
          <Typography className={cn(`text-${component.props.size || "base"}`)}>
            {component.props.children}
          </Typography>
        </div>
      );
    case "image":
      return (
        <div className={baseClasses} onClick={handleClick}>
          <img
            src={component.props.src}
            alt={component.props.alt || "Image"}
            style={{
              width: component.props.width || "100%",
              borderRadius: "8px",
            }}
          />
        </div>
      );
    case "video":
      return (
        <div className={baseClasses} onClick={handleClick}>
          <video
            src={component.props.src}
            poster={component.props.poster}
            controls
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
      );

    // Form Components
    case "button":
      return (
        <div className={baseClasses} onClick={handleClick}>
          <Button variant={component.props.variant} size={component.props.size}>
            {component.props.children}
          </Button>
        </div>
      );
    case "input":
      return (
        <div className={baseClasses} onClick={handleClick}>
          <Input
            placeholder={component.props.placeholder}
            type={component.props.type}
          />
        </div>
      );
    case "textarea":
      return (
        <div className={baseClasses} onClick={handleClick}>
          <textarea
            placeholder={component.props.placeholder}
            rows={component.props.rows}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      );
    case "select":
      return (
        <div className={baseClasses} onClick={handleClick}>
          <select className="w-full border border-gray-300 rounded-md p-2">
            <option>{component.props.placeholder}</option>
            {component.props.options?.map((opt: string, i: number) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
      );

    // Display Components
    case "card":
      return (
        <div className={baseClasses} onClick={handleClick}>
          <Card className={component.props.className || "p-6"}>
            {component.props.children?.length > 0
              ? component.props.children
              : "Card Content"}
          </Card>
        </div>
      );
    case "badge":
      return (
        <div className={baseClasses} onClick={handleClick}>
          <Badge variant={component.props.variant}>
            {component.props.children}
          </Badge>
        </div>
      );
    case "alert":
      return (
        <div className={baseClasses} onClick={handleClick}>
          <div
            className={cn(
              "p-4 rounded-lg",
              component.props.variant === "info" &&
                "bg-blue-50 text-blue-900 border border-blue-200",
              component.props.variant === "success" &&
                "bg-green-50 text-green-900 border border-green-200",
              component.props.variant === "warning" &&
                "bg-yellow-50 text-yellow-900 border border-yellow-200",
              component.props.variant === "error" &&
                "bg-red-50 text-red-900 border border-red-200"
            )}
          >
            {component.props.children}
          </div>
        </div>
      );
    case "divider":
      return (
        <div className={baseClasses} onClick={handleClick}>
          <hr
            className={cn(
              component.props.orientation === "horizontal"
                ? "w-full"
                : "h-full",
              "border-gray-300"
            )}
          />
        </div>
      );

    default:
      return null;
  }
};

export const DragDropWebsiteBuilder: React.FC = () => {
  const [canvasItems, setCanvasItems] = useState<any[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [componentCounter, setComponentCounter] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("layout");
  const [history, setHistory] = useState<any[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [viewportMode, setViewportMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [showLayers, setShowLayers] = useState(true);
  const [showProperties, setShowProperties] = useState(true);

  const saveToHistory = (items: any[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(items);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCanvasItems(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCanvasItems(history[historyIndex + 1]);
    }
  };

  const handleDelete = () => {
    if (selectedComponent) {
      const newItems = canvasItems.filter(
        (item) => item.id !== selectedComponent
      );
      setCanvasItems(newItems);
      saveToHistory(newItems);
      setSelectedComponent(null);
    }
  };

  const handleDuplicate = () => {
    if (selectedComponent) {
      const component = canvasItems.find(
        (item) => item.id === selectedComponent
      );
      if (component) {
        const newComponent = {
          ...component,
          id: `${component.type}-${componentCounter}`,
        };
        const newItems = [...canvasItems, newComponent];
        setCanvasItems(newItems);
        saveToHistory(newItems);
        setComponentCounter(componentCounter + 1);
      }
    }
  };

  const handleExportHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Website</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Generated by Website Builder -->
  ${JSON.stringify(canvasItems, null, 2)}
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(canvasItems, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Temporary no-op references to silence unused local warnings
  // (these are used by the UI but may be wired later)
  void activeCategory;
  void setActiveCategory;
  void viewportMode;
  void setViewportMode;
  void showLayers;
  void setShowLayers;
  void showProperties;
  void setShowProperties;
  void handleUndo;
  void handleRedo;
  void handleExportHTML;
  void handleExportJSON;

  const selectedComponentData = canvasItems.find(
    (item) => item.id === selectedComponent
  );

  return (
    <DragDropProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Component Library Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <Typography variant="h3" className="font-semibold">
              Components
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Drag to canvas
            </Typography>
          </div>

          <DroppableContainer
            id="component-library"
            items={componentLibrary}
            disabled={true}
            className="p-4 space-y-2"
          >
            {(component, index) => (
              <DraggableItem
                key={component.id}
                id={component.id}
                index={index}
                item={component}
                className="cursor-move"
              >
                <Card className="p-3 hover:shadow-md transition-shadow cursor-move">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{component.icon}</span>
                    <div>
                      <Typography variant="small" className="font-medium">
                        {component.name}
                      </Typography>
                    </div>
                  </div>
                </Card>
              </DraggableItem>
            )}
          </DroppableContainer>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <Typography variant="h3" className="font-semibold">
                Website Canvas
              </Typography>
              <div className="flex gap-2">
                {selectedComponent && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDuplicate}
                    >
                      Duplicate
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCanvasItems([])}
                >
                  Clear All
                </Button>
                <Button variant="default" size="sm">
                  Preview
                </Button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg min-h-[800px]">
              <DroppableContainer
                id="canvas"
                items={
                  canvasItems.length === 0 ? [{ id: "empty" }] : canvasItems
                }
                className="p-8 space-y-4 min-h-[800px]"
                style={{
                  minHeight: "800px",
                }}
              >
                {(component, index) => {
                  if (component.id === "empty") {
                    return (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🎨</div>
                          <Typography variant="h3">
                            Drag components here to start building
                          </Typography>
                          <Typography variant="small" className="text-gray-400">
                            Select components from the left sidebar
                          </Typography>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <DraggableItem
                      key={component.id}
                      id={component.id}
                      index={index}
                      item={component}
                    >
                      <div
                        className={cn(
                          "transition-all duration-200",
                          selectedComponent === component.id &&
                            "ring-2 ring-blue-500"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedComponent(component.id);
                        }}
                      >
                        <ComponentRenderer
                          component={component}
                          isSelected={selectedComponent === component.id}
                          onSelect={() => setSelectedComponent(component.id)}
                        />
                      </div>
                    </DraggableItem>
                  );
                }}
              </DroppableContainer>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        {selectedComponent && selectedComponentData && (
          <div className="w-80 bg-white border-l border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <Typography variant="h3" className="font-semibold">
                Properties
              </Typography>
              <Typography variant="small" className="text-gray-500">
                {selectedComponentData.type}
              </Typography>
            </div>
            <div className="p-4 space-y-4">
              {selectedComponentData.type === "button" && (
                <>
                  <div>
                    <Typography variant="small" className="mb-2 font-medium">
                      Button Text
                    </Typography>
                    <Input
                      value={selectedComponentData.props.children}
                      onChange={(e) => {
                        const newItems = canvasItems.map((item) =>
                          item.id === selectedComponent
                            ? {
                                ...item,
                                props: {
                                  ...item.props,
                                  children: e.target.value,
                                },
                              }
                            : item
                        );
                        setCanvasItems(newItems);
                      }}
                    />
                  </div>
                  <div>
                    <Typography variant="small" className="mb-2 font-medium">
                      Variant
                    </Typography>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={selectedComponentData.props.variant}
                      onChange={(e) => {
                        const newItems = canvasItems.map((item) =>
                          item.id === selectedComponent
                            ? {
                                ...item,
                                props: {
                                  ...item.props,
                                  variant: e.target.value,
                                },
                              }
                            : item
                        );
                        setCanvasItems(newItems);
                      }}
                    >
                      <option value="default">Default</option>
                      <option value="destructive">Destructive</option>
                      <option value="outline">Outline</option>
                      <option value="secondary">Secondary</option>
                      <option value="ghost">Ghost</option>
                      <option value="link">Link</option>
                    </select>
                  </div>
                </>
              )}

              {selectedComponentData.type === "heading" && (
                <>
                  <div>
                    <Typography variant="small" className="mb-2 font-medium">
                      Heading Text
                    </Typography>
                    <Input
                      value={selectedComponentData.props.children}
                      onChange={(e) => {
                        const newItems = canvasItems.map((item) =>
                          item.id === selectedComponent
                            ? {
                                ...item,
                                props: {
                                  ...item.props,
                                  children: e.target.value,
                                },
                              }
                            : item
                        );
                        setCanvasItems(newItems);
                      }}
                    />
                  </div>
                  <div>
                    <Typography variant="small" className="mb-2 font-medium">
                      Size
                    </Typography>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={selectedComponentData.props.variant}
                      onChange={(e) => {
                        const newItems = canvasItems.map((item) =>
                          item.id === selectedComponent
                            ? {
                                ...item,
                                props: {
                                  ...item.props,
                                  variant: e.target.value,
                                },
                              }
                            : item
                        );
                        setCanvasItems(newItems);
                      }}
                    >
                      <option value="h1">H1</option>
                      <option value="h2">H2</option>
                      <option value="h3">H3</option>
                      <option value="h4">H4</option>
                    </select>
                  </div>
                </>
              )}

              {selectedComponentData.type === "text" && (
                <div>
                  <Typography variant="small" className="mb-2 font-medium">
                    Text Content
                  </Typography>
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2 min-h-[100px]"
                    value={selectedComponentData.props.children}
                    onChange={(e) => {
                      const newItems = canvasItems.map((item) =>
                        item.id === selectedComponent
                          ? {
                              ...item,
                              props: {
                                ...item.props,
                                children: e.target.value,
                              },
                            }
                          : item
                      );
                      setCanvasItems(newItems);
                    }}
                  />
                </div>
              )}

              {selectedComponentData.type === "input" && (
                <div>
                  <Typography variant="small" className="mb-2 font-medium">
                    Placeholder
                  </Typography>
                  <Input
                    value={selectedComponentData.props.placeholder}
                    onChange={(e) => {
                      const newItems = canvasItems.map((item) =>
                        item.id === selectedComponent
                          ? {
                              ...item,
                              props: {
                                ...item.props,
                                placeholder: e.target.value,
                              },
                            }
                          : item
                      );
                      setCanvasItems(newItems);
                    }}
                  />
                </div>
              )}

              {selectedComponentData.type === "badge" && (
                <>
                  <div>
                    <Typography variant="small" className="mb-2 font-medium">
                      Badge Text
                    </Typography>
                    <Input
                      value={selectedComponentData.props.children}
                      onChange={(e) => {
                        const newItems = canvasItems.map((item) =>
                          item.id === selectedComponent
                            ? {
                                ...item,
                                props: {
                                  ...item.props,
                                  children: e.target.value,
                                },
                              }
                            : item
                        );
                        setCanvasItems(newItems);
                      }}
                    />
                  </div>
                  <div>
                    <Typography variant="small" className="mb-2 font-medium">
                      Variant
                    </Typography>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={selectedComponentData.props.variant}
                      onChange={(e) => {
                        const newItems = canvasItems.map((item) =>
                          item.id === selectedComponent
                            ? {
                                ...item,
                                props: {
                                  ...item.props,
                                  variant: e.target.value,
                                },
                              }
                            : item
                        );
                        setCanvasItems(newItems);
                      }}
                    >
                      <option value="default">Default</option>
                      <option value="secondary">Secondary</option>
                      <option value="destructive">Destructive</option>
                      <option value="outline">Outline</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </DragDropProvider>
  );
};

export default DragDropWebsiteBuilder;
