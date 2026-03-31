"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { KanbanBoardProps, KanbanCard } from "./KanbanBoard.types";
import { DragDropProvider } from "../DragDrop/DragDropContext";
import { DroppableContainer } from "../DragDrop/DroppableContainer";
import { DraggableItem } from "../DragDrop/DraggableItem";
import { Card, CardHeader, CardTitle, CardContent } from "../Card";
import type { DropEvent } from "../DragDrop/DragDrop.types";

/**
 * KanbanBoard Component
 *
 * A specialized composition of DragDrop to create a Kanban-style board.
 *
 * @example
 * ```tsx
 * const columns = [
 *   { id: "todo", title: "To Do", cards: [{ id: "1", title: "Task 1" }] }
 * ];
 *
 * <KanbanBoard
 *   columns={columns}
 *   onCardMove={(cardId, sourceCol, targetCol, index) => {}}
 * />
 * ```
 */
export const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(
  (
    {
      columns,
      onCardMove,
      renderCard,
      onAddCard,
      disabled: _disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const handleDrop = (event: DropEvent) => {
      if (!onCardMove) return;
      const { item, targetContainerId, targetIndex } = event;

      const activeId = item.id;
      const overId = targetContainerId;

      if (!overId) return;

      // Find source column and card index
      let sourceColId: string = "";

      for (const col of columns) {
        const index = col.cards.findIndex((c) => c.id === activeId);
        if (index !== -1) {
          sourceColId = col.id as string;
          break;
        }
      }

      if (sourceColId && overId) {
        onCardMove(
          String(activeId),
          sourceColId,
          String(overId),
          targetIndex !== -1
            ? targetIndex
            : columns.find((c) => String(c.id) === String(overId))?.cards
                .length || 0,
        );
      }
    };

    const defaultRenderCard = (card: KanbanCard) => (
      <Card className="mb-2 shadow-sm border border-border/50 hover:border-primary/50 transition-colors w-full bg-card">
        <CardHeader className="p-3 pb-1">
          <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
        </CardHeader>
        {card.description && (
          <CardContent className="p-3 pt-1 text-xs text-muted-foreground line-clamp-2">
            {card.description}
          </CardContent>
        )}
      </Card>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-1 items-start gap-4 overflow-x-auto overflow-y-hidden pb-4 w-full h-full",
          className,
        )}
        {...props}
      >
        <DragDropProvider>
          {columns.map((column) => (
            <div
              key={String(column.id)}
              className="flex flex-col flex-shrink-0 w-80 bg-muted/30 rounded-xl max-h-full border border-border/50"
            >
              <div className="flex items-center justify-between p-3 border-b border-border/50 font-semibold bg-muted/40 rounded-t-xl select-none">
                <span className="truncate">{column.title}</span>
                <span className="text-xs text-muted-foreground font-medium bg-background px-2 py-0.5 rounded-full shadow-sm">
                  {column.cards.length}
                </span>
              </div>

              <DroppableContainer
                id={column.id}
                items={column.cards}
                onDrop={handleDrop}
                className="flex-1 p-2 overflow-y-auto min-h-[150px]"
              >
                {(card, index) => (
                  <DraggableItem
                    key={String(card.id)}
                    id={card.id}
                    index={index}
                    item={card}
                    data={{ type: "KANBAN_CARD", card, columnId: column.id }}
                  >
                    {renderCard ? renderCard(card) : defaultRenderCard(card)}
                  </DraggableItem>
                )}
              </DroppableContainer>

              {onAddCard && (
                <div className="p-2 border-t border-border/50 bg-muted/20 rounded-b-xl">
                  <button
                    onClick={() => onAddCard(column.id)}
                    className="w-full flex items-center justify-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-md transition-colors"
                  >
                    <span>+</span> Add Card
                  </button>
                </div>
              )}
            </div>
          ))}
        </DragDropProvider>
      </div>
    );
  },
);

KanbanBoard.displayName = "KanbanBoard";

export default KanbanBoard;
