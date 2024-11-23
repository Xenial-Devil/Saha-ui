// ListItem.tsx
import React from "react";

interface ListItemProps {
  item: string;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ item, className }) => {
  return <li className={className}>{item}</li>;
};

export default ListItem;
