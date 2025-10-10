// List.tsx
import React from "react";
import "./index.scss"

interface ListProps {
  children: React.ReactNode;
  listType: 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' | 'lower-roman' | 'upper-roman' | 'lower-alpha' | 'upper-alpha' | 'none';
  className?: string;
}

const List: React.FC<ListProps> = ({ children, listType, className }) => {
  const listClass = `${className ? className : ""} ${listType}-list`;
  return (
    <>
      <ul className={`${listClass} w-full p-6`}>
        {children}
      </ul>
    </>
  );
};

export default List;
