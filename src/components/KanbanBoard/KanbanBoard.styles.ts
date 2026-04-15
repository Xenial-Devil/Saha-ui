import { cva } from "class-variance-authority";

export const kanbanBoardVariants = cva("flex flex-1 items-start gap-4 overflow-x-auto overflow-y-hidden pb-4 w-full h-full");
export const kanbanColumnVariants = cva("flex flex-col flex-shrink-0 w-80 bg-muted/30 rounded-xl max-h-full border border-border/50");
export const kanbanColumnHeaderVariants = cva("flex items-center justify-between p-3 border-b border-border/50 font-semibold bg-muted/40 rounded-t-xl select-none");
export const kanbanColumnCountVariants = cva("text-xs text-muted-foreground font-medium bg-background px-2 py-0.5 rounded-full shadow-sm");
export const kanbanColumnDropVariants = cva("flex-1 p-2 overflow-y-auto min-h-[150px]");
export const kanbanColumnFooterVariants = cva("p-2 border-t border-border/50 bg-muted/20 rounded-b-xl");
export const kanbanAddButtonVariants = cva("w-full flex items-center justify-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-md transition-colors");
export const kanbanCardVariants = cva("mb-2 shadow-sm border border-border/50 hover:border-primary/50 transition-colors w-full bg-card");
export const kanbanCardHeaderVariants = cva("p-3 pb-1");
export const kanbanCardTitleVariants = cva("text-sm font-medium");
export const kanbanCardContentVariants = cva("p-3 pt-1 text-xs text-muted-foreground line-clamp-2");
