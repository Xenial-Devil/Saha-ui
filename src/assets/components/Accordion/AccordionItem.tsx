import React, { memo } from "react";
import "./index.scss";

interface AccordionItemProps {
  isOpen: boolean;
  onClick: () => void;
  title: string;
  content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  isOpen,
  onClick,
  title,
  content,
}) => {
  return (
    <div className="w-full box-border Accordion relative bg-gray-200 text-gray-600 dark:text-gray-100 dark:bg-gray-900 border-b border-b-gray-500 last:border-0">
      <div
        className="w-full flex justify-between items-center cursor-pointer bg-gray-300 dark:bg-gray-700 px-8 py-3"
        onClick={onClick}
      >
        <h2>{title}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
          className={`fill-current transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            fill="currentColor"
            d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
          />
        </svg>
      </div>
      <div
        className={`w-full px-8 content bg-gray-200 dark:bg-gray-800 ${
          isOpen && "open"
        }`}
      >
        <p className="w-full py-4"> {content}</p>
      </div>
    </div>
  );
};

export default memo(AccordionItem);
