import * as React from "react";
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "../../lib/utils";
function ResizablePanelGroup({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup> & {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "outline"
    | "glass";
}) {
  const variantClasses = {
    default: "bg-background",
    primary: "bg-primary/5",
    secondary: "bg-secondary/5",
    accent: "bg-accent/5",
    success: "bg-success/5",
    warning: "bg-warning/5",
    error: "bg-error/5",
    info: "bg-info/5",
    outline: "bg-background border border-border",
    glass: "bg-background/20 backdrop-blur-xl border border-white/10 shadow-xl",
  };

  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
function ResizablePanel({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel> & {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "outline"
    | "glass";
}) {
  const variantClasses = {
    default: "bg-background",
    primary: "bg-primary/5",
    secondary: "bg-secondary/5",
    accent: "bg-accent/5",
    success: "bg-success/5",
    warning: "bg-warning/5",
    error: "bg-error/5",
    info: "bg-info/5",
    outline: "bg-background",
    glass: "bg-background/10 backdrop-blur-sm",
  };

  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      className={cn(variantClasses[variant], className)}
      {...props}
    />
  );
}
function ResizableHandle({
  withHandle,
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "outline"
    | "glass";
}) {
  const variantClasses = {
    default: "bg-border",
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    info: "bg-info",
    outline: "bg-border",
    glass: "bg-white/30",
  };

  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "focus-visible:ring-ring relative flex w-2 items-center justify-center focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-2 data-[panel-group-direction=vertical]:w-full [&[data-panel-group-direction=vertical]>div]:rotate-90 group hover:bg-accent/10 transition-colors",
        "before:absolute before:inset-y-0 before:left-1/2 before:w-px before:-translate-x-1/2 before:transition-all",
        "hover:before:w-1 data-[panel-group-direction=vertical]:hover:before:h-1",
        "data-[panel-group-direction=vertical]:before:inset-x-0 data-[panel-group-direction=vertical]:before:top-1/2 data-[panel-group-direction=vertical]:before:h-px data-[panel-group-direction=vertical]:before:w-full data-[panel-group-direction=vertical]:before:-translate-y-1/2 data-[panel-group-direction=vertical]:before:translate-x-0",
        `before:${variantClasses[variant].replace("bg-", "bg-")}`,
        className
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            "z-10 flex h-4 w-3 items-center justify-center rounded-xs border opacity-0 group-hover:opacity-100 transition-opacity duration-200",
            variantClasses[variant]
          )}
        >
          <GripVertical className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}
export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
