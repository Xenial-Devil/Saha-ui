// List.tsx
import React from "react";
import "./index.scss";
import { ListProps } from "./List.types";

const List: React.FC<ListProps> = ({ children, listType, className }) => {
  const listClass = `${className ? className : ""} ${listType}-list`;
  return (
    <>
      <ul className={`${listClass} w-full p-6`}>{children}</ul>
    </>
  );
};

export default List;
