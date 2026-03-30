import React from "react";


/**
 * Basic card interface for Kanban
 */
export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  [key: string]: any;
}

/**
 * Basic column interface for Kanban
 */
export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The list of columns and their cards
   */
  columns: KanbanColumn[];
  
  /**
   * Callback fired when a card's position changes
   */
  onCardMove?: (
    cardId: string, 
    sourceColumnId: string, 
    destinationColumnId: string,
    newIndex: number
  ) => void;
  
  /**
   * Render custom card component
   */
  renderCard?: (card: KanbanCard) => React.ReactNode;
  
  /**
   * Add a new card callback
   */
  onAddCard?: (columnId: string) => void;
  
  /**
   * Disable dragging
   */
  disabled?: boolean;
}
