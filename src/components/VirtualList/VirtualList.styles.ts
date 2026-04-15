import { cva } from "class-variance-authority";

// VirtualList delegates most styling to internal DragDrop components,
// but we define an explicit contract for completeness.
export const virtualListVariants = cva("relative w-full h-full overflow-hidden");
