"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { KanbanBoardProps, KanbanCard } from "./KanbanBoard.types";
import {
  kanbanBoardVariants,
  kanbanColumnVariants,
  kanbanColumnHeaderVariants,
  kanbanColumnCountVariants,
  kanbanColumnDropVariants,
  kanbanColumnFooterVariants,
  kanbanAddButtonVariants,
  kanbanCardVariants,
  kanbanCardHeaderVariants,
  kanbanCardTitleVariants,
  kanbanCardContentVariants,
} from "./KanbanBoard.styles";
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
      <Card className={kanbanCardVariants()}>
        <CardHeader className={kanbanCardHeaderVariants()}>
          <CardTitle className={kanbanCardTitleVariants()}>{card.title}</CardTitle>
        </CardHeader>
        {card.description && (
          <CardContent className={kanbanCardContentVariants()}>
            {card.description}
          </CardContent>
        )}
      </Card>
    );

    return (
      <div
        ref={ref}
        className={cn(kanbanBoardVariants(), className)}
        {...props}
      >
        <DragDropProvider>
          {columns.map((column) => (
            <div
              key={String(column.id)}
              className={kanbanColumnVariants()}
            >
              <div className={kanbanColumnHeaderVariants()}>
                <span className="truncate">{column.title}</span>
                <span className={kanbanColumnCountVariants()}>
                  {column.cards.length}
                </span>
              </div>

              <DroppableContainer
                id={column.id}
                items={column.cards}
                onDrop={handleDrop}
                className={kanbanColumnDropVariants()}
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
                <div className={kanbanColumnFooterVariants()}>
                  <button
                    onClick={() => onAddCard(column.id)}
                    className={kanbanAddButtonVariants()}
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
