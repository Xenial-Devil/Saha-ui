// List.tsx
import React from "react";
import ListItem from "./ListItemProps";
import "./index.scss"

interface ListProps {
  items: string[];
  listType: 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' | 'lower-roman' | 'upper-roman' | 'lower-alpha' | 'upper-alpha' | 'none';
  className?: string;
  itemClassName?: string;
}

const List: React.FC<ListProps> = ({
  items,
  listType,
  className,
  itemClassName,
}) => {
    const listClass = `${className ? className:""} ${listType}-list`;
  return (
    <>
      <ul className={`${listClass} w-full p-6`}>
        {items.map((item, index) => (
          <ListItem key={index} item={item} className={itemClassName} />
        ))}
      </ul>
    </>
  );
};

export default List;
