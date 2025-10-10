// ListItem.tsx
import React from "react";
import { ListItemProps } from "./List.types";

// Note: This component expects 'item' prop as string, not 'children'
const ListItem: React.FC<ListItemProps & { item: string }> = ({
  item,
  className,
}) => {
  return <li className={className}>{item}</li>;
};

export default ListItem;
